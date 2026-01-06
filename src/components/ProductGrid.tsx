import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface ProductGridProps {
    products: Product[];
    title?: string;
    subtitle?: string;
    showViewAll?: boolean;
}

export default function ProductGrid({
    products,
    title,
    subtitle,
    showViewAll = false
}: ProductGridProps) {
    return (
        <section className="section-padding" id="products">
            <div className="container-custom">
                {/* Section Header */}
                {(title || subtitle) && (
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            {title && (
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                                    <span className="text-gradient">{title}</span>
                                </h2>
                            )}
                            {subtitle && (
                                <p className="text-slate-400 max-w-xl">{subtitle}</p>
                            )}
                        </div>

                        {showViewAll && (
                            <a
                                href="/products"
                                className="btn btn-secondary group"
                            >
                                Lihat Semua
                                <svg
                                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                            </a>
                        )}
                    </div>
                )}

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="animate-fade-in opacity-0"
                            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {products.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-800 flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-slate-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                            </svg>
                        </div>
                        <p className="text-slate-400 text-lg">Belum ada produk tersedia</p>
                    </div>
                )}
            </div>
        </section>
    );
}
