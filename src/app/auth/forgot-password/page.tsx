"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // TODO: Implement Supabase password reset
            // const { createClient } = await import("@/lib/supabase/client");
            // const supabase = createClient();
            // await supabase.auth.resetPasswordForEmail(email);

            console.log("Reset password for:", email);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setIsSubmitted(true);
        } catch {
            setError("Gagal mengirim email reset password. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="hero-orb hero-orb-cyan absolute -top-48 -left-24 animate-float opacity-30" />
                <div className="hero-orb hero-orb-purple absolute bottom-0 right-0 animate-float opacity-30" style={{ animationDelay: '1s' }} />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">D</span>
                    </div>
                    <span className="text-2xl font-bold">
                        <span className="text-gradient">Digi</span>
                        <span className="text-white">Mart</span>
                    </span>
                </Link>

                {/* Card */}
                <div className="glass-card p-8">
                    {!isSubmitted ? (
                        <>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-white mb-2">Lupa Password?</h1>
                                <p className="text-slate-400">
                                    Masukkan email Anda dan kami akan mengirimkan link untuk reset password
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input"
                                        placeholder="nama@email.com"
                                        disabled={isLoading}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn btn-primary w-full btn-lg"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Mengirim...
                                        </>
                                    ) : (
                                        "Kirim Link Reset"
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Email Terkirim!</h2>
                            <p className="text-slate-400 mb-6">
                                Kami telah mengirimkan link reset password ke <strong className="text-white">{email}</strong>
                            </p>
                            <p className="text-sm text-slate-500">
                                Tidak menerima email? Cek folder spam atau{" "}
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-cyan-400 hover:text-cyan-300"
                                >
                                    kirim ulang
                                </button>
                            </p>
                        </div>
                    )}

                    {/* Back to Login */}
                    <p className="mt-6 text-center">
                        <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                            ← Kembali ke halaman login
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <p className="mt-8 text-center">
                    <Link href="/" className="text-slate-500 hover:text-white text-sm transition-colors">
                        ← Kembali ke beranda
                    </Link>
                </p>
            </div>
        </main>
    );
}
