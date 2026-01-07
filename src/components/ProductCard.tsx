"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatRupiah } from "@/lib/currency";
import { useState } from "react";

interface ProductCardProps {
    product: Product;
    showDelete?: boolean;
    onDelete?: (productId: string) => void;
}

export default function ProductCard({ product, showDelete = true, onDelete }: ProductCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const hasDiscount = product.original_price && product.original_price > product.price;
    const discountPercent = hasDiscount
        ? Math.round((1 - product.price / product.original_price!) * 100)
        : 0;

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowConfirm(true);
    };

    const confirmDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDeleting(true);

        try {
            const response = await fetch(`/api/products/delete?id=${product.id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                if (onDelete) {
                    onDelete(product.id);
                }
                // Force page refresh to show updated list
                window.location.reload();
            } else {
                alert(`Gagal menghapus: ${data.error}`);
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Terjadi kesalahan saat menghapus produk");
        } finally {
            setIsDeleting(false);
            setShowConfirm(false);
        }
    };

    const cancelDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowConfirm(false);
    };

    return (
        <Link href={`/products/${product.slug}`} className="group relative">
            <article className="product-card h-full flex flex-col">
                {/* Thumbnail */}
                <div className="thumbnail">
                    <Image
                        src={product.thumbnail_url || "/images/placeholder.jpg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                        {product.is_featured && (
                            <span className="badge badge-accent">
                                ⭐ Unggulan
                            </span>
                        )}
                        {hasDiscount && (
                            <span className="badge badge-success">
                                -{discountPercent}%
                            </span>
                        )}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 z-10">
                        <span className="badge badge-primary">
                            {product.category}
                        </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 z-10">
                        <span className="btn btn-primary btn-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            Lihat Detail
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="content flex-1 flex flex-col">
                    <h3 className="font-semibold text-white mb-1 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                        {product.title}
                    </h3>

                    <p className="text-sm text-slate-400 mb-3 line-clamp-2 flex-1">
                        {product.short_description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                        {/* Price in Rupiah */}
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-cyan-400">
                                {formatRupiah(product.price)}
                            </span>
                            {hasDiscount && (
                                <span className="text-xs text-slate-500 line-through">
                                    {formatRupiah(product.original_price!)}
                                </span>
                            )}
                        </div>

                        {/* Delete Button & File Info */}
                        <div className="flex items-center gap-2">
                            {showDelete && (
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 hover:text-red-300 transition-all z-20"
                                    title="Hapus produk"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            )}
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                <span className="uppercase">{product.file_type}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Delete Confirmation Modal */}
            {showConfirm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onClick={cancelDelete}
                >
                    <div
                        className="glass-card p-6 max-w-sm w-full animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Hapus Produk?</h3>
                            <p className="text-slate-400 mb-6 text-sm">
                                Anda yakin ingin menghapus &quot;{product.title}&quot;? Aksi ini tidak bisa dibatalkan.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={cancelDelete}
                                    className="flex-1 btn bg-slate-700 hover:bg-slate-600 text-white"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    disabled={isDeleting}
                                    className="flex-1 btn bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                                >
                                    {isDeleting ? "Menghapus..." : "Ya, Hapus"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Link>
    );
}
