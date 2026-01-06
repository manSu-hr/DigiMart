"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
            <div className="container-custom">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/30 transition-shadow">
                            <span className="text-white font-bold text-xl">D</span>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity blur-lg -z-10" />
                        </div>
                        <span className="text-xl font-bold">
                            <span className="text-gradient">Digi</span>
                            <span className="text-white">Mart</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/#products"
                            className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                        >
                            Produk
                        </Link>
                        <Link
                            href="/#categories"
                            className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                        >
                            Kategori
                        </Link>
                        <Link
                            href="/#featured"
                            className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                        >
                            Unggulan
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/auth/login"
                            className="btn btn-secondary"
                        >
                            Masuk
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="btn btn-primary"
                        >
                            Daftar
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-800 animate-fade-in">
                        <div className="flex flex-col gap-4">
                            <Link
                                href="/#products"
                                className="text-slate-300 hover:text-white transition-colors py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Produk
                            </Link>
                            <Link
                                href="/#categories"
                                className="text-slate-300 hover:text-white transition-colors py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Kategori
                            </Link>
                            <Link
                                href="/#featured"
                                className="text-slate-300 hover:text-white transition-colors py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Unggulan
                            </Link>
                            <div className="flex gap-3 pt-4 border-t border-slate-800">
                                <Link href="/auth/login" className="btn btn-secondary flex-1">
                                    Masuk
                                </Link>
                                <Link href="/auth/signup" className="btn btn-primary flex-1">
                                    Daftar
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
