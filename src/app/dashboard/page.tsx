import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock purchased products - akan diganti dengan data dari Supabase
const mockPurchases = [
    {
        id: "order-1",
        product: {
            id: "1",
            title: "Notion Ultimate Productivity Template",
            slug: "notion-ultimate-productivity",
            thumbnail_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
            file_type: "ZIP",
            file_size: "2.5 MB",
            category: "Templates",
        },
        purchased_at: "2025-01-05T10:30:00Z",
        amount: 29.00,
    },
    {
        id: "order-2",
        product: {
            id: "3",
            title: "UI/UX Design System Kit",
            slug: "uiux-design-system",
            thumbnail_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
            file_type: "FIG",
            file_size: "45 MB",
            category: "Design",
        },
        purchased_at: "2025-01-03T14:20:00Z",
        amount: 49.00,
    },
];

export default function DashboardPage() {
    // TODO: Check authentication and redirect if not logged in
    // const user = await getUser();

    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="pt-24 pb-16">
                <div className="container-custom">
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Pembelian Saya
                        </h1>
                        <p className="text-slate-400">
                            Kelola dan download produk digital yang sudah Anda beli
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                        <div className="glass-card p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">{mockPurchases.length}</p>
                                    <p className="text-sm text-slate-400">Produk Dibeli</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">{mockPurchases.length}</p>
                                    <p className="text-sm text-slate-400">Total Downloads</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">
                                        ${mockPurchases.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                                    </p>
                                    <p className="text-sm text-slate-400">Total Pembelian</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Purchases List */}
                    {mockPurchases.length > 0 ? (
                        <div className="space-y-4">
                            {mockPurchases.map((purchase) => (
                                <div key={purchase.id} className="glass-card p-4 md:p-6">
                                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                        {/* Thumbnail */}
                                        <div className="relative w-full md:w-48 aspect-video md:aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={purchase.product.thumbnail_url}
                                                alt={purchase.product.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <div>
                                                    <span className="badge badge-primary text-xs mb-2">
                                                        {purchase.product.category}
                                                    </span>
                                                    <h3 className="text-lg font-semibold text-white">
                                                        {purchase.product.title}
                                                    </h3>
                                                </div>
                                                <span className="text-lg font-bold text-cyan-400">
                                                    ${purchase.amount.toFixed(2)}
                                                </span>
                                            </div>

                                            {/* Meta Info */}
                                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {new Date(purchase.purchased_at).toLocaleDateString("id-ID", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    {purchase.product.file_type} • {purchase.product.file_size}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-wrap gap-3 mt-auto">
                                                <button className="btn btn-primary group">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                    Download File
                                                </button>
                                                <Link
                                                    href={`/products/${purchase.product.slug}`}
                                                    className="btn btn-secondary"
                                                >
                                                    Lihat Produk
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Empty State
                        <div className="glass-card p-16 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-800 flex items-center justify-center">
                                <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Belum ada pembelian
                            </h3>
                            <p className="text-slate-400 mb-6">
                                Anda belum membeli produk apapun. Mulai jelajahi koleksi kami!
                            </p>
                            <Link href="/#products" className="btn btn-primary">
                                Jelajahi Produk
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
