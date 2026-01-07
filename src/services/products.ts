
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types";

export const PRODUCT_CATEGORIES = [
    { name: "Semua", value: "all" },
    { name: "Presets", value: "Presets" },
    { name: "UI Kit", value: "UI Kit" },
    { name: "Icons", value: "Icons" },
    { name: "Templates", value: "Templates" },
    { name: "Motion", value: "Motion" },
    { name: "Fonts", value: "Fonts" },
];

export async function getProducts(category?: string, searchTerm?: string): Promise<Product[]> {
    const supabase = createClient();
    let query = supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

    if (category && category !== "all") {
        query = query.eq("category", category);
    }

    if (searchTerm) {
        query = query.ilike("title", `%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching products:", error);
        return [];
    }

    return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("Error fetching product:", error);
        return null;
    }

    return data as Product;
}

export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at" | "download_count">) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("products")
        .insert([product])
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

export async function uploadProductImage(file: File) {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('digital-assets') // Assuming the bucket name from schema.sql comments
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage.from('digital-assets').getPublicUrl(filePath);
    return data.publicUrl;
}
