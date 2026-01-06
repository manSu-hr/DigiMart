"use client";

import { useState } from "react";
import Image from "next/image";

interface QRPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    productTitle: string;
    amount: number;
    orderId?: string;
}

export default function QRPaymentModal({
    isOpen,
    onClose,
    productTitle,
    amount,
    orderId,
}: QRPaymentModalProps) {
    const [paymentStatus, setPaymentStatus] = useState<"pending" | "checking" | "success" | "failed">("pending");

    if (!isOpen) return null;

    // Format ke Rupiah
    const formatRupiah = (num: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(num);
    };

    const handleCheckPayment = async () => {
        setPaymentStatus("checking");

        // TODO: Implement actual payment verification with your payment gateway
        // Simulasi pengecekan pembayaran
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Untuk demo, kita set success
        setPaymentStatus("success");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative glass-card p-6 md:p-8 w-full max-w-md animate-scale-in">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {paymentStatus === "success" ? (
                    // Success State
                    <div className="text-center py-8">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Pembayaran Berhasil!</h3>
                        <p className="text-slate-400 mb-6">
                            Terima kasih! Produk Anda sudah siap didownload di halaman Dashboard.
                        </p>
                        <a href="/dashboard" className="btn btn-primary w-full">
                            Ke Dashboard
                        </a>
                    </div>
                ) : (
                    // Payment State
                    <>
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-white mb-2">Pembayaran QRIS</h3>
                            <p className="text-slate-400 text-sm">
                                Scan QR code di bawah untuk membayar
                            </p>
                        </div>

                        {/* Product Info */}
                        <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                            <p className="text-sm text-slate-400 mb-1">Produk:</p>
                            <p className="font-medium text-white mb-3">{productTitle}</p>
                            <p className="text-sm text-slate-400 mb-1">Total Pembayaran:</p>
                            <p className="text-2xl font-bold text-cyan-400">{formatRupiah(amount)}</p>
                        </div>

                        {/* QR Code */}
                        <div className="bg-white rounded-2xl p-4 mb-6 mx-auto w-fit">
                            {/* Placeholder QR - Ganti dengan QR code asli dari payment gateway */}
                            <div className="w-48 h-48 bg-gray-100 flex items-center justify-center relative">
                                {/* SVG QR Pattern - ini placeholder, ganti dengan image QR asli */}
                                <svg viewBox="0 0 200 200" className="w-full h-full">
                                    <rect fill="black" x="10" y="10" width="30" height="30" />
                                    <rect fill="black" x="50" y="10" width="10" height="10" />
                                    <rect fill="black" x="70" y="10" width="10" height="10" />
                                    <rect fill="black" x="90" y="10" width="10" height="10" />
                                    <rect fill="black" x="110" y="10" width="10" height="10" />
                                    <rect fill="black" x="160" y="10" width="30" height="30" />
                                    <rect fill="black" x="10" y="50" width="10" height="10" />
                                    <rect fill="black" x="30" y="50" width="10" height="10" />
                                    <rect fill="black" x="60" y="50" width="20" height="20" />
                                    <rect fill="black" x="100" y="50" width="30" height="10" />
                                    <rect fill="black" x="160" y="50" width="10" height="10" />
                                    <rect fill="black" x="180" y="50" width="10" height="10" />
                                    <rect fill="black" x="10" y="70" width="30" height="10" />
                                    <rect fill="black" x="50" y="70" width="10" height="30" />
                                    <rect fill="black" x="80" y="80" width="40" height="40" />
                                    <rect fill="black" x="140" y="70" width="20" height="20" />
                                    <rect fill="black" x="170" y="70" width="20" height="10" />
                                    <rect fill="black" x="10" y="100" width="10" height="30" />
                                    <rect fill="black" x="30" y="110" width="10" height="20" />
                                    <rect fill="black" x="60" y="130" width="20" height="10" />
                                    <rect fill="black" x="130" y="100" width="10" height="30" />
                                    <rect fill="black" x="150" y="110" width="20" height="10" />
                                    <rect fill="black" x="180" y="100" width="10" height="20" />
                                    <rect fill="black" x="10" y="160" width="30" height="30" />
                                    <rect fill="black" x="50" y="150" width="10" height="20" />
                                    <rect fill="black" x="70" y="160" width="20" height="10" />
                                    <rect fill="black" x="100" y="150" width="30" height="20" />
                                    <rect fill="black" x="150" y="160" width="20" height="30" />
                                    <rect fill="black" x="180" y="150" width="10" height="40" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white p-1 rounded">
                                        <span className="text-xs font-bold text-gray-800">QRIS</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                            <span className="text-xs text-slate-500">Didukung oleh:</span>
                            <div className="flex gap-2">
                                {["GoPay", "OVO", "DANA", "ShopeePay", "LinkAja"].map((method) => (
                                    <span
                                        key={method}
                                        className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300"
                                    >
                                        {method}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Order ID */}
                        {orderId && (
                            <p className="text-center text-xs text-slate-500 mb-4">
                                Order ID: <span className="font-mono">{orderId}</span>
                            </p>
                        )}

                        {/* Check Payment Button */}
                        <button
                            onClick={handleCheckPayment}
                            disabled={paymentStatus === "checking"}
                            className="btn btn-primary w-full"
                        >
                            {paymentStatus === "checking" ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Mengecek Pembayaran...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Saya Sudah Bayar
                                </>
                            )}
                        </button>

                        <p className="text-center text-xs text-slate-500 mt-4">
                            Pembayaran akan diverifikasi otomatis dalam 1-3 menit
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
