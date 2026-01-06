import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="hero-orb hero-orb-cyan absolute -top-48 -left-24 animate-float"
                    style={{ animationDelay: '0s' }}
                />
                <div
                    className="hero-orb hero-orb-purple absolute top-1/3 -right-32 animate-float"
                    style={{ animationDelay: '1s' }}
                />
                <div
                    className="hero-orb hero-orb-cyan absolute -bottom-24 left-1/3 w-64 h-64 animate-float"
                    style={{ animationDelay: '2s' }}
                />
            </div>

            {/* Grid Overlay */}
            <div className="hero-gradient absolute inset-0" />

            {/* Content */}
            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-sm text-slate-300">
                            Marketplace Produk Digital Premium
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
                        <span className="text-white">Temukan </span>
                        <span className="text-gradient">Aset Digital</span>
                        <br />
                        <span className="text-white">Berkualitas </span>
                        <span className="text-gradient-accent">Premium</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
                        Template Notion, preset Lightroom, e-book, ilustrasi, dan ribuan
                        produk digital lainnya dari kreator terbaik di seluruh dunia.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
                        <Link href="/#products" className="btn btn-primary btn-lg group">
                            Jelajahi Produk
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
                        </Link>
                        <Link href="/auth/signup" className="btn btn-secondary btn-lg">
                            Mulai Gratis
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
                        {[
                            { value: "1,000+", label: "Produk Digital" },
                            { value: "50K+", label: "Pelanggan" },
                            { value: "4.9", label: "Rating" },
                            { value: "100%", label: "Aman" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg
                    className="w-6 h-6 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </section>
    );
}
