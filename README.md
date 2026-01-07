# DigiMart 🛒

Premium Digital Asset Marketplace - Platform jual beli aset digital dengan berbagai metode pembayaran.

## 🌐 Live Demo

**Production URL:** [https://digi-mart-peach.vercel.app](https://digi-mart-peach.vercel.app)

## ✨ Features

- 🎨 **Modern UI** - Glassmorphism design dengan dark mode
- 🛍️ **Product Catalog** - Showcase produk digital dengan kategori
- 💳 **Multiple Payment Methods**:
  - QRIS (Scan & Pay)
  - Virtual Account (BCA, BNI, Mandiri, BRI)
  - E-Wallet (GoPay, OVO, DANA, ShopeePay)
  - Kartu Kredit/Debit (Visa, Mastercard, JCB)
- 🔐 **Authentication** - Login, Register, Forgot Password
- 📱 **Responsive** - Mobile-first design
- 💰 **Indonesian Rupiah** - Harga dalam format Rupiah

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Payment:** Stripe
- **Deployment:** Vercel

## 📁 Project Structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── auth/         # Auth pages (login, signup, forgot-password)
│   ├── dashboard/    # User dashboard
│   ├── products/     # Products listing & detail
│   └── page.tsx      # Homepage
├── components/       # Reusable components
├── lib/              # Utilities & configs
└── types/            # TypeScript types
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/manSu-hr/DigiMart.git
cd digimart
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example.txt .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌍 Deployment

The app is automatically deployed to Vercel on every push to the `main` branch.

**Live URL:** [https://digi-mart-peach.vercel.app](https://digi-mart-peach.vercel.app)

## 📝 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_SITE_URL=https://digi-mart-peach.vercel.app
```

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Made with ❤️ for UAS Project
