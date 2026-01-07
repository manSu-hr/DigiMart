"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentModal from "@/components/PaymentModal";
import { formatRupiah } from "@/lib/currency";

// Mock product data dengan harga Rupiah
const mockProduct = {
    id: "1",
    title: "Notion Ultimate Productivity Template",
    slug: "notion-ultimate-productivity",
    description: `
    <h3>Tingkatkan Produktivitas Anda dengan Template Notion All-in-One</h3>
    <p>Template Notion lengkap yang dirancang untuk membantu Anda mengelola kehidupan sehari-hari dengan lebih efektif. Dari manajemen tugas hingga tracking kebiasaan, semuanya ada dalam satu workspace yang terintegrasi.</p>
    
    <h4>Fitur Utama:</h4>
    <ul>
      <li><strong>Daily Planner</strong> - Rencanakan hari Anda dengan detail</li>
      <li><strong>Weekly Review</strong> - Evaluasi pencapaian mingguan</li>
      <li><strong>Goal Tracker</strong> - Pantau progress tujuan jangka panjang</li>
      <li><strong>Habit Tracker</strong> - Bangun kebiasaan positif</li>
      <li><strong>Project Management</strong> - Kelola proyek dengan Kanban board</li>
      <li><strong>Note-taking System</strong> - Sistem catatan terorganisir</li>
    </ul>
    
    <h4>Bonus:</h4>
    <ul>
      <li>Video tutorial setup (30 menit)</li>
      <li>Template database siap pakai</li>
      <li>Free updates selamanya</li>
    </ul>
  `,
    short_description: "Template produktivitas all-in-one untuk Notion",
    price: 149000,
    original_price: 249000,
    thumbnail_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    preview_images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&h=800&fit=crop",
    ],
    file_path: "products/notion-template.zip",
    file_size: "2.5 MB",
    file_type: "ZIP",
    category: "Templates",
    tags: ["notion", "productivity", "template", "planner"],
    is_featured: true,
    is_active: true,
    download_count: 1250,
};

export default function ProductDetailPage() {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const product = mockProduct;

    const hasDiscount = product.original_price && product.original_price > product.price;
    const discountPercent = hasDiscount
        ? Math.round((1 - product.price / product.original_price!) * 100)
        : 0;

    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="pt-24 pb-16">
                <div className="container-custom">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 flex-wrap">
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-white transition-colors">
                            Produk
                        </Link>
                        <span>/</span>
                        <span className="text-slate-300">{product.title}</span>
                    </nav>

                    {/* Product Detail */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                        {/* Left: Images */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass">
                                <Image
                                    src={product.preview_images[0] || product.thumbnail_url}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {hasDiscount && (
                                    <div className="absolute top-4 left-4">
                                        <span className="badge badge-success text-sm">
                                            -{discountPercent}% OFF
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="grid grid-cols-3 gap-3">
                                {product.preview_images.slice(0, 3).map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative aspect-video rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity border-2 border-transparent hover:border-cyan-500"
                                    >
                                        <Image
                                            src={image}
                                            alt={`Preview ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Product Info */}
                        <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
                            {/* Category & Tags */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="badge badge-primary">{product.category}</span>
                                {product.is_featured && (
                                    <span className="badge badge-accent">⭐ Unggulan</span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                {product.title}
                            </h1>

                            {/* Short Description */}
                            <p className="text-lg text-slate-400">{product.short_description}</p>

                            {/* Stats */}
                            <div className="flex items-center gap-6 py-4 border-y border-slate-800">
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-cyan-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        />
                                    </svg>
                                    <span className="text-slate-300">
                                        {product.download_count.toLocaleString()} downloads
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-cyan-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <span className="text-slate-300">
                                        {product.file_type} • {product.file_size}
                                    </span>
                                </div>
                            </div>

                            {/* Price in Rupiah */}
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-bold text-cyan-400">
                                    {formatRupiah(product.price)}
                                </span>
                                {hasDiscount && (
                                    <span className="text-xl text-slate-500 line-through">
                                        {formatRupiah(product.original_price!)}
                                    </span>
                                )}
                            </div>

                            {/* Buy Button */}
                            <div className="space-y-4">
                                <button
                                    onClick={() => setShowPaymentModal(true)}
                                    className="btn btn-primary btn-lg w-full group"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    Beli Sekarang
                                    <svg
                                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </button>

                                {/* Payment Methods */}
                                <div className="text-center">
                                    <p className="text-sm text-slate-500 mb-3">
                                        Metode Pembayaran:
                                    </p>
                                    <div className="flex items-center justify-center gap-2 flex-wrap">
                                        {["QRIS", "Bank Transfer", "E-Wallet", "Kartu Kredit"].map((method) => (
                                            <span
                                                key={method}
                                                className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-slate-300 border border-slate-700"
                                            >
                                                {method}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="glass-card p-6 space-y-4">
                                <h3 className="font-semibold text-white">Termasuk dalam paket:</h3>
                                <ul className="space-y-3">
                                    {[
                                        "File download langsung",
                                        "Akses selamanya",
                                        "Free updates",
                                        "Dokumentasi lengkap",
                                        "Dukungan via email",
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3 text-slate-300">
                                            <svg
                                                className="w-5 h-5 text-green-500 flex-shrink-0"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2">
                            <div className="glass-card p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">Deskripsi Produk</h2>
                                <div
                                    className="prose prose-invert prose-lg max-w-none 
                    prose-headings:text-white prose-headings:font-semibold
                    prose-p:text-slate-300 prose-li:text-slate-300
                    prose-strong:text-cyan-400"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="lg:col-span-1">
                            <div className="glass-card p-6 lg:sticky lg:top-24">
                                <h3 className="font-semibold text-white mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/products?tag=${tag}`}
                                            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 hover:text-white transition-colors"
                                        >
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* Payment Modal with Multiple Methods */}
            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                productTitle={product.title}
                amount={product.price}
                orderId={`ORD-${Date.now()}`}
            />
        </main>
    );
}
