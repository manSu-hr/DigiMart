import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatRupiah } from "@/lib/currency";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const hasDiscount = product.original_price && product.original_price > product.price;
    const discountPercent = hasDiscount
        ? Math.round((1 - product.price / product.original_price!) * 100)
        : 0;

    return (
        <Link href={`/products/${product.slug}`} className="group">
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

                        {/* File Info */}
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                            <span className="uppercase">{product.file_type}</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
