import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/server";

const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;

// Verify Lemon Squeezy webhook signature
function verifySignature(payload: string, signature: string): boolean {
    const hmac = crypto.createHmac("sha256", webhookSecret);
    const digest = hmac.update(payload).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

interface LemonSqueezyWebhookPayload {
    meta: {
        event_name: string;
        custom_data?: {
            user_id?: string;
            product_id?: string;
        };
    };
    data: {
        id: string;
        type: string;
        attributes: {
            order_number: number;
            status: string;
            total: number;
            currency: string;
            user_email: string;
            created_at: string;
        };
    };
}

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get("x-signature");

    if (!signature) {
        return NextResponse.json(
            { error: "Missing x-signature header" },
            { status: 400 }
        );
    }

    // Verify webhook signature
    if (!verifySignature(body, signature)) {
        console.error("Webhook signature verification failed");
        return NextResponse.json(
            { error: "Invalid signature" },
            { status: 400 }
        );
    }

    let payload: LemonSqueezyWebhookPayload;

    try {
        payload = JSON.parse(body);
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON payload" },
            { status: 400 }
        );
    }

    const eventName = payload.meta.event_name;

    switch (eventName) {
        case "order_created": {
            const { data, meta } = payload;
            const customData = meta.custom_data;

            if (!customData?.product_id || !customData?.user_id) {
                console.error("Missing custom_data in webhook payload");
                return NextResponse.json(
                    { error: "Missing custom_data" },
                    { status: 400 }
                );
            }

            try {
                const supabase = createAdminClient();

                // Create order record
                const { error } = await supabase.from("orders").insert({
                    user_id: customData.user_id,
                    product_id: customData.product_id,
                    payment_provider: "lemonsqueezy",
                    payment_id: data.id,
                    payment_status: data.attributes.status === "paid" ? "completed" : "pending",
                    amount: data.attributes.total / 100, // Convert from cents
                    currency: data.attributes.currency.toUpperCase(),
                    customer_email: data.attributes.user_email,
                    metadata: {
                        order_number: data.attributes.order_number,
                        lemon_squeezy_order_id: data.id,
                    },
                });

                if (error) {
                    console.error("Failed to create order:", error);
                    return NextResponse.json(
                        { error: "Failed to create order" },
                        { status: 500 }
                    );
                }

                console.log(`Order created for user ${customData.user_id}, product ${customData.product_id}`);
            } catch (err) {
                console.error("Database error:", err);
                return NextResponse.json(
                    { error: "Database error" },
                    { status: 500 }
                );
            }
            break;
        }

        case "order_refunded": {
            const { data } = payload;

            try {
                const supabase = createAdminClient();

                // Update order status to refunded
                const { error } = await supabase
                    .from("orders")
                    .update({ payment_status: "refunded", updated_at: new Date().toISOString() })
                    .eq("payment_id", data.id);

                if (error) {
                    console.error("Failed to update order:", error);
                }
            } catch (err) {
                console.error("Database error:", err);
            }
            break;
        }

        default:
            console.log(`Unhandled event: ${eventName}`);
    }

    return NextResponse.json({ received: true });
}
