"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/currency";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    productTitle: string;
    amount: number;
    orderId?: string;
}

type PaymentMethod = "qris" | "va_bca" | "va_bni" | "va_mandiri" | "va_bri" | "ewallet_gopay" | "ewallet_ovo" | "ewallet_dana" | "ewallet_shopeepay" | "credit_card";

interface PaymentMethodOption {
    id: PaymentMethod;
    name: string;
    category: "qris" | "va" | "ewallet" | "card";
    icon: string;
    description: string;
}

const paymentMethods: PaymentMethodOption[] = [
    // QRIS
    { id: "qris", name: "QRIS", category: "qris", icon: "🔲", description: "Bayar dengan scan QR dari e-wallet manapun" },
    // Virtual Account
    { id: "va_bca", name: "BCA Virtual Account", category: "va", icon: "🏦", description: "Transfer via ATM/Mobile/Internet Banking BCA" },
    { id: "va_bni", name: "BNI Virtual Account", category: "va", icon: "🏦", description: "Transfer via ATM/Mobile/Internet Banking BNI" },
    { id: "va_mandiri", name: "Mandiri Virtual Account", category: "va", icon: "🏦", description: "Transfer via ATM/Mobile/Internet Banking Mandiri" },
    { id: "va_bri", name: "BRI Virtual Account", category: "va", icon: "🏦", description: "Transfer via ATM/Mobile/Internet Banking BRI" },
    // E-Wallet
    { id: "ewallet_gopay", name: "GoPay", category: "ewallet", icon: "💚", description: "Bayar langsung dari aplikasi Gojek" },
    { id: "ewallet_ovo", name: "OVO", category: "ewallet", icon: "💜", description: "Bayar langsung dari aplikasi OVO" },
    { id: "ewallet_dana", name: "DANA", category: "ewallet", icon: "💙", description: "Bayar langsung dari aplikasi DANA" },
    { id: "ewallet_shopeepay", name: "ShopeePay", category: "ewallet", icon: "🧡", description: "Bayar langsung dari aplikasi Shopee" },
    // Credit Card
    { id: "credit_card", name: "Kartu Kredit/Debit", category: "card", icon: "💳", description: "Visa, Mastercard, JCB" },
];

const categoryLabels = {
    qris: "QRIS (Scan QR)",
    va: "Virtual Account",
    ewallet: "E-Wallet",
    card: "Kartu Kredit/Debit",
};

export default function PaymentModal({
    isOpen,
    onClose,
    productTitle,
    amount,
    orderId,
}: PaymentModalProps) {
    const [step, setStep] = useState<"select" | "process" | "success">("select");
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState<{
        vaNumber?: string;
        qrCode?: string;
        deepLink?: string;
    } | null>(null);

    if (!isOpen) return null;

    const handleSelectMethod = (method: PaymentMethod) => {
        setSelectedMethod(method);
    };

    const handleProceedPayment = async () => {
        if (!selectedMethod) return;

        setIsProcessing(true);

        // Simulate API call to payment gateway
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate mock payment details based on method
        const methodInfo = paymentMethods.find(m => m.id === selectedMethod);

        if (methodInfo?.category === "va") {
            setPaymentDetails({
                vaNumber: `${Math.floor(Math.random() * 9000000000000) + 1000000000000}`,
            });
        } else if (selectedMethod === "qris") {
            setPaymentDetails({
                qrCode: "mock-qr-code",
            });
        } else if (methodInfo?.category === "ewallet") {
            setPaymentDetails({
                deepLink: `https://example.com/pay/${orderId}`,
            });
        }

        setIsProcessing(false);
        setStep("process");
    };

    const handleConfirmPayment = async () => {
        setIsProcessing(true);
        // Simulate payment verification
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessing(false);
        setStep("success");
    };

    const handleClose = () => {
        setStep("select");
        setSelectedMethod(null);
        setPaymentDetails(null);
        onClose();
    };

    const selectedMethodInfo = paymentMethods.find(m => m.id === selectedMethod);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative glass-card p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {step === "success" ? (
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
                ) : step === "process" ? (
                    // Process Payment State
                    <div>
                        {/* Back Button */}
                        <button
                            onClick={() => setStep("select")}
                            className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Ganti Metode
                        </button>

                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-white mb-2">
                                {selectedMethodInfo?.name}
                            </h3>
                            <p className="text-slate-400 text-sm">
                                {selectedMethodInfo?.description}
                            </p>
                        </div>

                        {/* Product Info */}
                        <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                            <p className="text-sm text-slate-400 mb-1">Produk:</p>
                            <p className="font-medium text-white mb-3">{productTitle}</p>
                            <p className="text-sm text-slate-400 mb-1">Total Pembayaran:</p>
                            <p className="text-2xl font-bold text-cyan-400">{formatRupiah(amount)}</p>
                        </div>

                        {/* Payment Details based on method */}
                        {selectedMethodInfo?.category === "va" && paymentDetails?.vaNumber && (
                            <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                                <p className="text-sm text-slate-400 mb-2">Nomor Virtual Account:</p>
                                <div className="flex items-center justify-between bg-slate-900 rounded-lg p-3">
                                    <span className="font-mono text-lg text-white">{paymentDetails.vaNumber}</span>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(paymentDetails.vaNumber!)}
                                        className="text-cyan-400 hover:text-cyan-300 text-sm"
                                    >
                                        Salin
                                    </button>
                                </div>
                                <div className="mt-4 text-sm text-slate-400 space-y-2">
                                    <p>Instruksi:</p>
                                    <ol className="list-decimal list-inside space-y-1">
                                        <li>Buka aplikasi m-Banking atau ATM</li>
                                        <li>Pilih menu Transfer &gt; Virtual Account</li>
                                        <li>Masukkan nomor VA di atas</li>
                                        <li>Verifikasi nominal dan konfirmasi pembayaran</li>
                                    </ol>
                                </div>
                            </div>
                        )}

                        {selectedMethod === "qris" && (
                            <div className="mb-6">
                                <div className="bg-white rounded-2xl p-4 mx-auto w-fit">
                                    <div className="w-48 h-48 bg-gray-100 flex items-center justify-center relative">
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
                                <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
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
                        )}

                        {selectedMethodInfo?.category === "ewallet" && (
                            <div className="bg-slate-800/50 rounded-xl p-4 mb-6 text-center">
                                <div className="text-4xl mb-4">{selectedMethodInfo.icon}</div>
                                <p className="text-white mb-4">
                                    Anda akan diarahkan ke aplikasi {selectedMethodInfo.name}
                                </p>
                                <button
                                    onClick={() => window.open(paymentDetails?.deepLink, '_blank')}
                                    className="btn btn-primary"
                                >
                                    Buka {selectedMethodInfo.name}
                                </button>
                            </div>
                        )}

                        {selectedMethodInfo?.category === "card" && (
                            <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">Nomor Kartu</label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="input w-full"
                                            maxLength={19}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-2">Exp Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="input w-full"
                                                maxLength={5}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-2">CVV</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="input w-full"
                                                maxLength={4}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">Nama di Kartu</label>
                                        <input
                                            type="text"
                                            placeholder="JOHN DOE"
                                            className="input w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Order ID */}
                        {orderId && (
                            <p className="text-center text-xs text-slate-500 mb-4">
                                Order ID: <span className="font-mono">{orderId}</span>
                            </p>
                        )}

                        {/* Confirm Button */}
                        <button
                            onClick={handleConfirmPayment}
                            disabled={isProcessing}
                            className="btn btn-primary w-full"
                        >
                            {isProcessing ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Memverifikasi Pembayaran...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {selectedMethodInfo?.category === "card" ? "Bayar Sekarang" : "Saya Sudah Bayar"}
                                </>
                            )}
                        </button>

                        <p className="text-center text-xs text-slate-500 mt-4">
                            Pembayaran akan diverifikasi otomatis dalam 1-3 menit
                        </p>
                    </div>
                ) : (
                    // Select Payment Method State
                    <div>
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-white mb-2">Pilih Metode Pembayaran</h3>
                            <p className="text-slate-400 text-sm">
                                Pilih metode pembayaran yang Anda inginkan
                            </p>
                        </div>

                        {/* Product Info */}
                        <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">Produk:</p>
                                    <p className="font-medium text-white">{productTitle}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-400 mb-1">Total:</p>
                                    <p className="text-xl font-bold text-cyan-400">{formatRupiah(amount)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods by Category */}
                        <div className="space-y-4 mb-6">
                            {(["qris", "va", "ewallet", "card"] as const).map((category) => {
                                const methods = paymentMethods.filter(m => m.category === category);

                                return (
                                    <div key={category}>
                                        <h4 className="text-sm font-medium text-slate-400 mb-2">
                                            {categoryLabels[category]}
                                        </h4>
                                        <div className="space-y-2">
                                            {methods.map((method) => (
                                                <button
                                                    key={method.id}
                                                    onClick={() => handleSelectMethod(method.id)}
                                                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${selectedMethod === method.id
                                                            ? "border-cyan-500 bg-cyan-500/10"
                                                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                                                        }`}
                                                >
                                                    <span className="text-2xl">{method.icon}</span>
                                                    <div className="text-left flex-1">
                                                        <p className="font-medium text-white">{method.name}</p>
                                                        <p className="text-xs text-slate-400">{method.description}</p>
                                                    </div>
                                                    {selectedMethod === method.id && (
                                                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Proceed Button */}
                        <button
                            onClick={handleProceedPayment}
                            disabled={!selectedMethod || isProcessing}
                            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Memproses...
                                </>
                            ) : (
                                "Lanjutkan Pembayaran"
                            )}
                        </button>

                        {/* Security Notice */}
                        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Pembayaran aman dan terenkripsi
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
