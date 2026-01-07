"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import { getProducts, PRODUCT_CATEGORIES } from "@/services/products";

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                // Pass filters to the service
                const data = await getProducts(
                    selectedCategory === "all" ? undefined : selectedCategory,
                    searchQuery
                );
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Debounce search slightly
        const timeoutId = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [selectedCategory, searchQuery]);

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
                                {PRODUCT_CATEGORIES.map((category) => (
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
                        Menampilkan {products.length} produk
                    </p>

                    {/* Products Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="glass-card h-[400px] animate-pulse">
                                    <div className="h-48 bg-slate-800 rounded-t-xl mb-4"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="h-6 bg-slate-800 rounded w-3/4"></div>
                                        <div className="h-4 bg-slate-800 rounded w-full"></div>
                                        <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
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
