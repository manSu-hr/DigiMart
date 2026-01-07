"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { formatRupiah } from "@/lib/currency";
import { Product } from "@/types";

// Mock products data
const allProducts: Product[] = [
    {
        id: "1",
        title: "Premium UI Kit - Dashboard Pro",
        slug: "premium-ui-kit-dashboard-pro",
        description: "Koleksi lengkap komponen UI untuk dashboard modern",
        short_description: "500+ komponen UI premium",
        price: 299000,
        original_price: 599000,
        thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        preview_images: [],
        file_path: "",
        file_size: "125 MB",
        file_type: "Figma, Sketch",
        category: "UI Kit",
        tags: ["dashboard", "ui", "figma"],
        is_featured: true,
        is_active: true,
        download_count: 1250,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "2",
        title: "3D Icon Pack - Isometric Style",
        slug: "3d-icon-pack-isometric",
        description: "200+ ikon 3D berkualitas tinggi",
        short_description: "200+ ikon 3D isometric",
        price: 149000,
        original_price: 249000,
        thumbnail_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
        preview_images: [],
        file_path: "",
        file_size: "85 MB",
        file_type: "PNG, SVG",
        category: "Icons",
        tags: ["3d", "icons", "isometric"],
        is_featured: true,
        is_active: true,
        download_count: 890,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "3",
        title: "E-Commerce Template Bundle",
        slug: "ecommerce-template-bundle",
        description: "Template lengkap untuk toko online",
        short_description: "Complete e-commerce solution",
        price: 449000,
        original_price: 899000,
        thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        preview_images: [],
        file_path: "",
        file_size: "250 MB",
        file_type: "Next.js, React",
        category: "Templates",
        tags: ["ecommerce", "template", "nextjs"],
        is_featured: true,
        is_active: true,
        download_count: 567,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "4",
        title: "Motion Graphics Pack",
        slug: "motion-graphics-pack",
        description: "50+ animasi After Effects",
        short_description: "50+ animasi premium",
        price: 199000,
        original_price: 399000,
        thumbnail_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
        preview_images: [],
        file_path: "",
        file_size: "1.2 GB",
        file_type: "After Effects",
        category: "Motion",
        tags: ["motion", "animation", "after-effects"],
        is_featured: false,
        is_active: true,
        download_count: 432,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "5",
        title: "Font Family - Modern Sans",
        slug: "font-family-modern-sans",
        description: "Font family modern dengan 8 weights",
        short_description: "8 weights, 400+ glyphs",
        price: 99000,
        original_price: 199000,
        thumbnail_url: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?w=400&h=300&fit=crop",
        preview_images: [],
        file_path: "",
        file_size: "12 MB",
        file_type: "OTF, TTF, WOFF",
        category: "Fonts",
        tags: ["typography", "font", "sans-serif"],
        is_featured: false,
        is_active: true,
        download_count: 2100,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "6",
        title: "Mobile App UI Kit",
        slug: "mobile-app-ui-kit",
        description: "300+ komponen untuk aplikasi mobile",
        short_description: "iOS & Android ready",
        price: 349000,
        original_price: 699000,
        thumbnail_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
        preview_images: [],
        file_path: "",
        file_size: "180 MB",
        file_type: "Figma",
        category: "UI Kit",
        tags: ["mobile", "ios", "android", "ui"],
        is_featured: true,
        is_active: true,
        download_count: 756,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

const categories = [
    { name: "Semua", value: "all" },
    { name: "UI Kit", value: "UI Kit" },
    { name: "Icons", value: "Icons" },
    { name: "Templates", value: "Templates" },
    { name: "Motion", value: "Motion" },
    { name: "Fonts", value: "Fonts" },
];

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = allProducts.filter((product) => {
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gradient">Semua Produk</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Temukan berbagai aset digital premium untuk kebutuhan desain dan pengembangan Anda
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="glass-card p-6 mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Cari produk..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input w-full"
                                />
                            </div>

                            {/* Categories */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.value}
                                        onClick={() => setSelectedCategory(category.value)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === category.value
                                            ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <p className="text-slate-400 mb-6">
                        Menampilkan {filteredProducts.length} produk
                    </p>

                    {/* Products Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-white mb-2">Tidak ada produk ditemukan</h3>
                            <p className="text-slate-400">
                                Coba ubah filter atau kata kunci pencarian Anda
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
