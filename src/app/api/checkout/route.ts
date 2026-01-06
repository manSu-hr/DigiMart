import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-11-20.acacia" as any,
});

export async function POST(request: NextRequest) {
    try {
        const { productId, priceInCents, productTitle } = await request.json();

        // Verify user is authenticated
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: "Please login to make a purchase" },
                { status: 401 }
            );
        }

        // Check if user already owns this product
        const { data: existingOrder } = await supabase
            .from("orders")
            .select("id")
            .eq("user_id", user.id)
            .eq("product_id", productId)
            .eq("payment_status", "completed")
            .single();

        if (existingOrder) {
            return NextResponse.json(
                { error: "You already own this product" },
                { status: 400 }
            );
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "idr",
                        product_data: {
                            name: productTitle,
                        },
                        unit_amount: priceInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/products?canceled=true`,
            customer_email: user.email,
            metadata: {
                product_id: productId,
                user_id: user.id,
            },
        });

        return NextResponse.json({
            sessionId: session.id,
            url: session.url
        });

    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}
