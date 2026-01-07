
import { createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = createAdminClient();

    const productsToSeed = [
        // === PRESETS ===
        {
            title: "Jedag Jedug Alight Motion Preset 2025",
            slug: "jedag-jedug-alight-motion-preset-2025",
            description: "Preset Alight Motion Jedag Jedug viral 2025. Full effect, smooth shake, dan color grading. Cocok untuk editor pemula maupun pro.",
            short_description: "Preset AM Jedag Jedug Viral 2025",
            price: 15000,
            original_price: 25000,
            thumbnail_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
            file_path: "presets/am-jedag-jedug-2025.xml",
            file_size: "2 MB",
            file_type: "XML",
            category: "Presets",
            tags: ["alight motion", "jedag jedug", "preset", "am"],
            is_featured: true,
            is_active: true,
        },
        {
            title: "Anime Vibe AM Preset Bundle",
            slug: "anime-vibe-am-preset-bundle",
            description: "Bundle preset Alight Motion dengan gaya anime vibe. Termasuk coloring, shake, dan transisi smooth.",
            short_description: "Bundle Preset Anime Vibe",
            price: 50000,
            original_price: 75000,
            thumbnail_url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=300&fit=crop",
            file_path: "presets/anime-vibe-bundle.zip",
            file_size: "15 MB",
            file_type: "ZIP",
            category: "Presets",
            tags: ["anime", "alight motion", "bundle", "wibu"],
            is_featured: false,
            is_active: true,
        },
        {
            title: "Lightroom Mobile Preset - Moody Dark",
            slug: "lightroom-preset-moody-dark",
            description: "Preset Lightroom Mobile dengan tone moody dark aesthetic. Cocok untuk foto portrait dan landscape.",
            short_description: "LR Preset Moody Dark Aesthetic",
            price: 20000,
            original_price: 35000,
            thumbnail_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
            file_path: "presets/lr-moody-dark.dng",
            file_size: "5 MB",
            file_type: "DNG",
            category: "Presets",
            tags: ["lightroom", "preset", "moody", "dark"],
            is_featured: true,
            is_active: true,
        },

        // === TEMPLATES ===
        {
            title: "Notion Ultimate Productivity Template",
            slug: "notion-ultimate-productivity",
            description: "Template Notion lengkap untuk produktivitas: habit tracker, project management, daily planner, dan goal setting.",
            short_description: "Template Notion All-in-One",
            price: 149000,
            original_price: 250000,
            thumbnail_url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop",
            file_path: "templates/notion-productivity.zip",
            file_size: "2 MB",
            file_type: "ZIP",
            category: "Templates",
            tags: ["notion", "template", "productivity", "planner"],
            is_featured: true,
            is_active: true,
        },
        {
            title: "Instagram Story Templates Pack",
            slug: "instagram-story-templates",
            description: "50+ template Instagram Story aesthetic untuk berbagai niche: fashion, food, travel, dan lifestyle.",
            short_description: "50+ IG Story Template Pack",
            price: 45000,
            original_price: 80000,
            thumbnail_url: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=300&fit=crop",
            file_path: "templates/ig-story-pack.zip",
            file_size: "120 MB",
            file_type: "PSD",
            category: "Templates",
            tags: ["instagram", "story", "template", "social media"],
            is_featured: false,
            is_active: true,
        },
        {
            title: "PowerPoint Business Presentation",
            slug: "ppt-business-presentation",
            description: "Template presentasi PowerPoint profesional untuk bisnis. 50+ slide dengan design modern dan clean.",
            short_description: "PPT Template Bisnis Pro",
            price: 75000,
            original_price: 120000,
            thumbnail_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
            file_path: "templates/ppt-business.pptx",
            file_size: "25 MB",
            file_type: "PPTX",
            category: "Templates",
            tags: ["powerpoint", "presentation", "business", "template"],
            is_featured: false,
            is_active: true,
        },

        // === UI KIT ===
        {
            title: "Mobile App UI Kit - Finance",
            slug: "mobile-ui-kit-finance",
            description: "UI Kit lengkap untuk aplikasi mobile finance/fintech. Termasuk 100+ komponen Figma dengan dark & light mode.",
            short_description: "Finance App UI Kit Figma",
            price: 199000,
            original_price: 350000,
            thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
            file_path: "ui-kits/finance-app-ui.fig",
            file_size: "45 MB",
            file_type: "FIG",
            category: "UI Kit",
            tags: ["ui kit", "figma", "mobile", "finance"],
            is_featured: true,
            is_active: true,
        },
        {
            title: "Dashboard Admin UI Components",
            slug: "dashboard-admin-ui",
            description: "Komponen UI untuk dashboard admin lengkap. Charts, tables, forms, dan widgets siap pakai.",
            short_description: "Admin Dashboard Components",
            price: 125000,
            original_price: 200000,
            thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
            file_path: "ui-kits/dashboard-admin.fig",
            file_size: "30 MB",
            file_type: "FIG",
            category: "UI Kit",
            tags: ["dashboard", "admin", "ui kit", "components"],
            is_featured: false,
            is_active: true,
        },

        // === ICONS ===
        {
            title: "3D Animated Icons Pack",
            slug: "3d-animated-icons",
            description: "500+ 3D icons dengan animasi Lottie. Tersedia dalam berbagai format: SVG, PNG, dan JSON.",
            short_description: "500+ 3D Animated Icons",
            price: 89000,
            original_price: 150000,
            thumbnail_url: "https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=400&h=300&fit=crop",
            file_path: "icons/3d-animated-pack.zip",
            file_size: "250 MB",
            file_type: "ZIP",
            category: "Icons",
            tags: ["icons", "3d", "animated", "lottie"],
            is_featured: true,
            is_active: true,
        },

        // === MOTION ===
        {
            title: "Smooth Transition Pack - Premiere Pro",
            slug: "smooth-transition-premiere",
            description: "100+ transisi smooth untuk Adobe Premiere Pro. Zoom, slide, glitch, dan seamless transition.",
            short_description: "100+ Premiere Pro Transitions",
            price: 95000,
            original_price: 175000,
            thumbnail_url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
            file_path: "motion/premiere-transitions.prproj",
            file_size: "500 MB",
            file_type: "PRPROJ",
            category: "Motion",
            tags: ["premiere pro", "transition", "video editing"],
            is_featured: false,
            is_active: true,
        },
        {
            title: "After Effects Logo Reveal Pack",
            slug: "ae-logo-reveal-pack",
            description: "25 template logo reveal untuk After Effects. Elegant, modern, dan mudah di-customize.",
            short_description: "25 AE Logo Reveal Templates",
            price: 65000,
            original_price: 100000,
            thumbnail_url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
            file_path: "motion/ae-logo-reveal.zip",
            file_size: "800 MB",
            file_type: "AEP",
            category: "Motion",
            tags: ["after effects", "logo", "reveal", "intro"],
            is_featured: true,
            is_active: true,
        },

        // === FONTS ===
        {
            title: "Aesthetic Display Font Bundle",
            slug: "aesthetic-font-bundle",
            description: "10 font display aesthetic untuk desain modern. Cocok untuk poster, branding, dan social media.",
            short_description: "10 Font Display Aesthetic",
            price: 55000,
            original_price: 100000,
            thumbnail_url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
            file_path: "fonts/aesthetic-fonts.zip",
            file_size: "15 MB",
            file_type: "OTF/TTF",
            category: "Fonts",
            tags: ["font", "typography", "display", "aesthetic"],
            is_featured: false,
            is_active: true,
        },
    ];

    const results = [];

    for (const product of productsToSeed) {
        // Check if product already exists
        const { data: existing } = await supabase
            .from("products")
            .select("id")
            .eq("slug", product.slug)
            .single();

        if (existing) {
            results.push({ slug: product.slug, status: "skipped (exists)" });
            continue;
        }

        const { error } = await supabase.from("products").insert([product]);

        if (error) {
            console.error(`Error seeding ${product.title}:`, error);
            results.push({ slug: product.slug, status: "failed", error: error.message });
        } else {
            results.push({ slug: product.slug, status: "success" });
        }
    }

    return NextResponse.json({ message: "Seeding process completed", results });
}
