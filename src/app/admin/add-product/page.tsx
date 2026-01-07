
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createProduct, PRODUCT_CATEGORIES } from "@/services/products";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        short_description: "",
        price: "",
        original_price: "",
        thumbnail_url: "",
        file_path: "placeholder/path", // Fallback for now since we don't have file upload UI yet
        file_size: "",
        file_type: "",
        category: "Presets",
        tags: "",
        is_featured: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await createProduct({
                ...formData,
                price: Number(formData.price),
                original_price: formData.original_price ? Number(formData.original_price) : undefined,
                preview_images: [],
                tags: formData.tags.split(",").map((tag) => tag.trim()),
                is_active: true,
            });

            alert("Produk berhasil ditambahkan!");
            router.push("/products");
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Gagal menambahkan produk.");
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-generate slug from title
    const handleTitleBlur = () => {
        if (!formData.slug) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");
            setFormData((prev) => ({ ...prev, slug }));
        }
    };

    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="pt-24 pb-16 px-4">
                <div className="container-custom max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-8">Tambah Produk Baru</h1>

                    <div className="glass-card p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Judul Produk</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        onBlur={handleTitleBlur}
                                        required
                                        className="input w-full"
                                        placeholder="Contoh: Alight Motion Preset 2025"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Slug</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        required
                                        className="input w-full"
                                        placeholder="alight-motion-preset-2025"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Deskripsi Singkat</label>
                                <input
                                    type="text"
                                    name="short_description"
                                    value={formData.short_description}
                                    onChange={handleChange}
                                    required
                                    className="input w-full"
                                    placeholder="Deskripsi pendek untuk card preview"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Deskripsi Lengkap</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="input w-full resize-y"
                                    placeholder="Jelaskan detail produk Anda..."
                                />
                            </div>

                            {/* Pricing & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Harga (Rp)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        className="input w-full"
                                        min="0"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Harga Inst (Coret)</label>
                                    <input
                                        type="number"
                                        name="original_price"
                                        value={formData.original_price}
                                        onChange={handleChange}
                                        className="input w-full"
                                        min="0"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Kategori</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="input w-full"
                                    >
                                        {PRODUCT_CATEGORIES.filter(c => c.value !== 'all').map((cat) => (
                                            <option key={cat.value} value={cat.value}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* File Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">File Type</label>
                                    <input
                                        type="text"
                                        name="file_type"
                                        value={formData.file_type}
                                        onChange={handleChange}
                                        required
                                        className="input w-full"
                                        placeholder="ZIP, XML, PRESET"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">File Size</label>
                                    <input
                                        type="text"
                                        name="file_size"
                                        value={formData.file_size}
                                        onChange={handleChange}
                                        required
                                        className="input w-full"
                                        placeholder="Example: 5 MB"
                                    />
                                </div>
                            </div>

                            {/* Image & Tags */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Thumbnail URL</label>
                                <input
                                    type="url"
                                    name="thumbnail_url"
                                    value={formData.thumbnail_url}
                                    onChange={handleChange}
                                    required
                                    className="input w-full"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Tags (pisahkan dengan koma)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    className="input w-full"
                                    placeholder="jedag jedug, am, preset"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="is_featured"
                                    checked={formData.is_featured}
                                    onChange={handleCheckboxChange}
                                    id="is_featured"
                                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
                                />
                                <label htmlFor="is_featured" className="text-sm font-medium text-slate-300">
                                    Jadikan Produk Unggulan
                                </label>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn btn-primary w-full"
                                >
                                    {isLoading ? "Menyimpan..." : "Simpan Produk"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
