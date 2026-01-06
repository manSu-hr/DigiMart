import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-11-20.acacia" as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json(
            { error: "Missing stripe-signature header" },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json(
            { error: "Invalid signature" },
            { status: 400 }
        );
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;

            // Get product and user info from metadata
            const productId = session.metadata?.product_id;
            const userId = session.metadata?.user_id;

            if (!productId || !userId) {
                console.error("Missing metadata in checkout session");
                return NextResponse.json(
                    { error: "Missing metadata" },
                    { status: 400 }
                );
            }

            try {
                const supabase = createAdminClient();

                // Create order record
                const { error } = await supabase.from("orders").insert({
                    user_id: userId,
                    product_id: productId,
                    payment_provider: "stripe",
                    payment_id: session.id,
                    payment_status: "completed",
                    amount: (session.amount_total || 0) / 100, // Convert from cents
                    currency: session.currency?.toUpperCase() || "USD",
                    customer_email: session.customer_email,
                    metadata: {
                        checkout_session_id: session.id,
                        payment_intent: session.payment_intent,
                    },
                });

                if (error) {
                    console.error("Failed to create order:", error);
                    return NextResponse.json(
                        { error: "Failed to create order" },
                        { status: 500 }
                    );
                }

                console.log(`Order created for user ${userId}, product ${productId}`);
            } catch (err) {
                console.error("Database error:", err);
                return NextResponse.json(
                    { error: "Database error" },
                    { status: 500 }
                );
            }
            break;
        }

        case "checkout.session.expired": {
            // Optional: Handle expired sessions
            console.log("Checkout session expired:", event.data.object.id);
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
