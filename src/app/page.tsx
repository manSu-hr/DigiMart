import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { Product } from "@/types";

// Mock data dengan harga Rupiah
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Notion Ultimate Productivity Template",
    slug: "notion-ultimate-productivity",
    description: "Template Notion lengkap untuk produktivitas harian, mingguan, dan bulanan.",
    short_description: "Template produktivitas all-in-one untuk Notion",
    price: 149000,
    original_price: 249000,
    thumbnail_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    preview_images: [],
    file_path: "products/notion-template.zip",
    file_size: "2.5 MB",
    file_type: "ZIP",
    category: "Templates",
    tags: ["notion", "productivity"],
    is_featured: true,
    is_active: true,
    download_count: 1250,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Lightroom Cinematic Preset Pack",
    slug: "lightroom-cinematic-presets",
    description: "Koleksi 50+ preset Lightroom untuk tampilan sinematik profesional.",
    short_description: "50+ preset Lightroom untuk look sinematik",
    price: 99000,
    original_price: undefined,
    thumbnail_url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop",
    preview_images: [],
    file_path: "products/lr-cinematic.zip",
    file_size: "15 MB",
    file_type: "ZIP",
    category: "Presets",
    tags: ["lightroom", "photography"],
    is_featured: true,
    is_active: true,
    download_count: 890,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "UI/UX Design System Kit",
    slug: "uiux-design-system",
    description: "Design system lengkap dengan 200+ komponen Figma.",
    short_description: "Design system Figma dengan 200+ komponen",
    price: 249000,
    original_price: 399000,
    thumbnail_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    preview_images: [],
    file_path: "products/design-system.fig",
    file_size: "45 MB",
    file_type: "FIG",
    category: "Design",
    tags: ["figma", "ui", "ux"],
    is_featured: true,
    is_active: true,
    download_count: 567,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "E-Book: Mastering Digital Marketing",
    slug: "ebook-digital-marketing",
    description: "Panduan lengkap digital marketing dari A-Z.",
    short_description: "Panduan digital marketing dari A-Z",
    price: 79000,
    original_price: undefined,
    thumbnail_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop",
    preview_images: [],
    file_path: "products/digital-marketing.pdf",
    file_size: "8 MB",
    file_type: "PDF",
    category: "E-Books",
    tags: ["ebook", "marketing"],
    is_featured: false,
    is_active: true,
    download_count: 234,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Stock Illustration Pack - Abstract",
    slug: "illustration-abstract-pack",
    description: "Koleksi 100+ ilustrasi abstract berkualitas tinggi.",
    short_description: "100+ ilustrasi abstract SVG & PNG",
    price: 179000,
    original_price: 279000,
    thumbnail_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    preview_images: [],
    file_path: "products/abstract-illustrations.zip",
    file_size: "120 MB",
    file_type: "ZIP",
    category: "Illustrations",
    tags: ["illustration", "abstract"],
    is_featured: true,
    is_active: true,
    download_count: 456,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Podcast Audio Intro Pack",
    slug: "podcast-audio-intro",
    description: "20+ intro musik dan sound effects untuk podcast.",
    short_description: "20+ intro musik untuk podcast",
    price: 129000,
    original_price: undefined,
    thumbnail_url: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=600&fit=crop",
    preview_images: [],
    file_path: "products/podcast-intros.zip",
    file_size: "50 MB",
    file_type: "ZIP",
    category: "Audio",
    tags: ["audio", "podcast"],
    is_featured: false,
    is_active: true,
    download_count: 189,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    title: "React Component Library",
    slug: "react-component-library",
    description: "50+ komponen React siap pakai dengan TypeScript.",
    short_description: "50+ komponen React + TypeScript",
    price: 299000,
    original_price: 449000,
    thumbnail_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    preview_images: [],
    file_path: "products/react-components.zip",
    file_size: "25 MB",
    file_type: "ZIP",
    category: "Code",
    tags: ["react", "typescript"],
    is_featured: true,
    is_active: true,
    download_count: 678,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Minimal Blog Template",
    slug: "minimal-blog-template",
    description: "Template blog minimalis untuk Next.js + MDX.",
    short_description: "Template blog Next.js + MDX",
    price: 199000,
    original_price: undefined,
    thumbnail_url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    preview_images: [],
    file_path: "products/blog-template.zip",
    file_size: "15 MB",
    file_type: "ZIP",
    category: "Templates",
    tags: ["nextjs", "blog"],
    is_featured: false,
    is_active: true,
    download_count: 345,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function HomePage() {
  const featuredProducts = mockProducts.filter(p => p.is_featured);
  const latestProducts = mockProducts.slice(0, 8);

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Featured Products */}
      <section id="featured">
        <ProductGrid
          products={featuredProducts}
          title="Produk Unggulan"
          subtitle="Produk-produk terpopuler yang dipilih oleh ribuan pelanggan"
          showViewAll
        />
      </section>

      {/* All Products */}
      <ProductGrid
        products={latestProducts}
        title="Produk Terbaru"
        subtitle="Temukan koleksi produk digital terbaru dari kreator berbakat"
        showViewAll
      />

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-white">Siap untuk memulai?</span>
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Daftar gratis dan mulai jelajahi ribuan produk digital berkualitas tinggi
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/auth/signup" className="btn btn-primary btn-lg">
                  Daftar Sekarang
                </a>
                <a href="/#products" className="btn btn-secondary btn-lg">
                  Lihat Produk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
