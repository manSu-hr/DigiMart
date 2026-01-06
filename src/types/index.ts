// Product type definitions

export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    short_description: string;
    price: number;
    original_price?: number;
    thumbnail_url: string;
    preview_images: string[];
    file_path: string;
    file_size: string;
    file_type: string;
    category: string;
    tags: string[];
    is_featured: boolean;
    is_active: boolean;
    download_count: number;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: string;
    user_id: string;
    product_id: string;
    payment_provider: 'stripe' | 'lemonsqueezy';
    payment_id: string;
    payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
    amount: number;
    currency: string;
    customer_email: string;
    metadata: Record<string, unknown>;
    created_at: string;
    updated_at: string;
}

export interface Profile {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
}

export interface PurchasedProduct extends Order {
    product: Product;
}
