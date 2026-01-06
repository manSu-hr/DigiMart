import Link from "next/link";

const categories = [
    {
        id: "templates",
        name: "Templates",
        description: "Notion, Figma, dan template lainnya",
        icon: "📋",
        color: "from-cyan-500 to-blue-600",
        count: 150,
    },
    {
        id: "presets",
        name: "Presets",
        description: "Lightroom, Photoshop, dan preset foto",
        icon: "🎨",
        color: "from-purple-500 to-pink-600",
        count: 89,
    },
    {
        id: "ebooks",
        name: "E-Books",
        description: "PDF, panduan, dan tutorial",
        icon: "📚",
        color: "from-green-500 to-emerald-600",
        count: 67,
    },
    {
        id: "illustrations",
        name: "Illustrations",
        description: "SVG, PNG, dan grafis vektor",
        icon: "🖼️",
        color: "from-orange-500 to-red-600",
        count: 234,
    },
    {
        id: "audio",
        name: "Audio",
        description: "Musik, sound effects, dan loops",
        icon: "🎵",
        color: "from-indigo-500 to-violet-600",
        count: 45,
    },
    {
        id: "code",
        name: "Code & Scripts",
        description: "Snippets, plugins, dan tools",
        icon: "💻",
        color: "from-slate-500 to-gray-600",
        count: 78,
    },
];

export default function CategoriesSection() {
    return (
        <section className="section-padding" id="categories">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-gradient">Jelajahi Kategori</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Temukan produk digital sesuai kebutuhan Anda dari berbagai kategori pilihan
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category, index) => (
                        <Link
                            key={category.id}
                            href={`/products?category=${category.id}`}
                            className="group"
                        >
                            <div
                                className="glass-card p-6 text-center h-full animate-fade-in opacity-0"
                                style={{
                                    animationDelay: `${index * 80}ms`,
                                    animationFillMode: 'forwards'
                                }}
                            >
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                                    {category.icon}
                                </div>

                                {/* Name */}
                                <h3 className="font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                    {category.name}
                                </h3>

                                {/* Count */}
                                <p className="text-sm text-slate-500">
                                    {category.count} produk
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
