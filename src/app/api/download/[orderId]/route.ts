import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ orderId: string }> }
) {
    const { orderId } = await params;

    try {
        // Get current user
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: "Unauthorized. Please login to download." },
                { status: 401 }
            );
        }

        // Verify ownership: check if user owns this order
        const { data: order, error: orderError } = await supabase
            .from("orders")
            .select(`
        id,
        user_id,
        payment_status,
        product:products (
          id,
          title,
          file_path
        )
      `)
            .eq("id", orderId)
            .single();

        if (orderError || !order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        // Verify the order belongs to the current user
        if (order.user_id !== user.id) {
            return NextResponse.json(
                { error: "Access denied. This order does not belong to you." },
                { status: 403 }
            );
        }

        // Verify payment is completed
        if (order.payment_status !== "completed") {
            return NextResponse.json(
                { error: "Payment not completed for this order." },
                { status: 403 }
            );
        }

        // Get file path from product (Supabase returns array for nested relations)
        const productArray = order.product as unknown as { id: string; title: string; file_path: string }[] | null;
        const product = productArray?.[0];

        if (!product?.file_path) {
            return NextResponse.json(
                { error: "File not found for this product" },
                { status: 404 }
            );
        }

        // Generate signed URL using admin client (service role)
        const adminSupabase = createAdminClient();
        const { data: signedUrlData, error: storageError } = await adminSupabase
            .storage
            .from("digital-assets")
            .createSignedUrl(product.file_path, 60); // Expires in 60 seconds

        if (storageError || !signedUrlData?.signedUrl) {
            console.error("Failed to create signed URL:", storageError);
            return NextResponse.json(
                { error: "Failed to generate download link" },
                { status: 500 }
            );
        }

        // Update download count (optional)
        await supabase
            .from("products")
            .update({
                download_count: (await supabase
                    .from("products")
                    .select("download_count")
                    .eq("id", product.id)
                    .single()
                ).data?.download_count + 1 || 1
            })
            .eq("id", product.id);

        // Redirect to signed URL
        return NextResponse.redirect(signedUrlData.signedUrl);

    } catch (error) {
        console.error("Download error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
