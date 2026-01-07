"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProducts } from "@/services/products";
import { formatRupiah } from "@/lib/currency";
import { Product } from "@/types";

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (productId: string, productTitle: string) => {
        if (!confirm(`Yakin hapus produk "${productTitle}"?`)) return;

        setDeletingId(productId);
        try {
            const res = await fetch(`/api/products/delete?id=${productId}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (data.success) {
                setProducts((prev) => prev.filter((p) => p.id !== productId));
                alert("Produk berhasil dihapus!");
            } else {
                alert("Gagal menghapus: " + data.error);
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Terjadi kesalahan saat menghapus produk.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="pt-24 pb-16 px-4">
                <div className="container-custom">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                            <p className="text-slate-400 mt-1">Kelola semua produk digital Anda</p>
                        </div>
                        <Link
                            href="/admin/add-product"
                            className="btn btn-primary inline-flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Produk Baru
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="glass-card p-6">
                            <p className="text-slate-400 text-sm">Total Produk</p>
                            <p className="text-3xl font-bold text-white mt-1">{products.length}</p>
                        </div>
                        <div className="glass-card p-6">
                            <p className="text-slate-400 text-sm">Produk Aktif</p>
                            <p className="text-3xl font-bold text-green-400 mt-1">
                                {products.filter((p) => p.is_active).length}
                            </p>
                        </div>
                        <div className="glass-card p-6">
                            <p className="text-slate-400 text-sm">Produk Unggulan</p>
                            <p className="text-3xl font-bold text-cyan-400 mt-1">
                                {products.filter((p) => p.is_featured).length}
                            </p>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="glass-card overflow-hidden">
                        <div className="p-4 border-b border-slate-700/50">
                            <h2 className="text-lg font-semibold text-white">Daftar Produk</h2>
                        </div>

                        {isLoading ? (
                            <div className="p-8 text-center">
                                <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto"></div>
                                <p className="text-slate-400 mt-4">Memuat produk...</p>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="p-8 text-center">
                                <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <p className="text-slate-400">Belum ada produk.</p>
                                <Link href="/admin/add-product" className="text-cyan-400 hover:underline mt-2 inline-block">
                                    Tambah produk pertama →
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-800/50">
                                        <tr>
                                            <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3">Produk</th>
                                            <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3">Kategori</th>
                                            <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3">Harga</th>
                                            <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3">Status</th>
                                            <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-3">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={product.thumbnail_url}
                                                            alt={product.title}
                                                            className="w-12 h-12 rounded-lg object-cover bg-slate-700"
                                                        />
                                                        <div>
                                                            <p className="font-medium text-white">{product.title}</p>
                                                            <p className="text-xs text-slate-400">{product.file_type} • {product.file_size}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">
                                                        {product.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="font-medium text-cyan-400">{formatRupiah(product.price)}</p>
                                                    {product.original_price && product.original_price > product.price && (
                                                        <p className="text-xs text-slate-500 line-through">{formatRupiah(product.original_price)}</p>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        {product.is_active ? (
                                                            <span className="inline-flex items-center gap-1 text-xs text-green-400">
                                                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                                                Aktif
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                                                                <span className="w-2 h-2 bg-slate-500 rounded-full"></span>
                                                                Nonaktif
                                                            </span>
                                                        )}
                                                        {product.is_featured && (
                                                            <span className="inline-flex items-center gap-1 text-xs text-yellow-400">
                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                                Unggulan
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDelete(product.id, product.title)}
                                                        disabled={deletingId === product.id}
                                                        className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                                    >
                                                        {deletingId === product.id ? "Menghapus..." : "Hapus"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
