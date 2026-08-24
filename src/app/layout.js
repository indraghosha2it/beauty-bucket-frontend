
// // app/layout.js
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "sonner";
// import LayoutContent from "./components/layout/LayoutContent";

// import ScrollToTop from "./components/layout/ScrollToTop";
// import PromotionalModalWrapper from "./components/PromotionalModalWrapper";
// import NewsletterPopup from "./components/NewsletterPopup";
// import UnifiedPopupManager from "./components/UnifiedPopupManager";
// import PixelTracker from "./components/PixelTracker";
// import CustomCodeInjector from "./components/CustomCodeInjector";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   // Base metadata
//   metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'),
//   title: {
//     default: "Smart Gadget | Premium Gadget Store in Bangladesh - Smartphones, Laptops, Accessories & More",
//     template: "%s | Smart Gadget Bangladesh"
//   },
//   description: "Smart Gadget - Bangladesh's trusted online gadget store. Shop premium smartphones, laptops, smartwatches, headphones, gaming accessories & electronics. ✓COD ✓bKash/Nagad ✓Warranty ✓Best Prices",
  
//   // Keywords optimized for Bangladesh gadget market
//   keywords: [
//     // Primary keywords
//     "online gadget store bangladesh",
//     "smart gadget bd",
//     "gadget shop dhaka",
//     "best electronics store bangladesh",
    
//     // Smartphones
//     "smartphone price in bangladesh",
//     "best android phone bd",
//     "iphone price bangladesh",
//     "xiaomi mobile price bd",
//     "samsung galaxy price bangladesh",
//     "oneplus bangladesh",
//     "realme price bd",
//     "vivo mobile bangladesh",
//     "oppo phone price bd",
//     "nothing phone price bangladesh",
    
//     // Laptops & Computers
//     "laptop price in bangladesh",
//     "gaming laptop bd",
//     "macbook price bangladesh",
//     "lenovo laptop price bd",
//     "hp laptop price bangladesh",
//     "asus laptop price bd",
//     "dell laptop price bangladesh",
//     "acer laptop price bd",
//     "desktop pc price bangladesh",
//     "monitor price bd",
    
//     // Smartwatches & Wearables
//     "smartwatch price in bangladesh",
//     "apple watch bd",
//     "samsung galaxy watch price bangladesh",
//     "fitness tracker bd",
//     "huawei watch price bangladesh",
//     "amazfit smartwatch bd",
//     "noise smartwatch price bangladesh",
    
//     // Audio & Headphones
//     "wireless headphones bangladesh",
//     "best earbuds price bd",
//     "sony headphones price bangladesh",
//     "boat earbuds bd",
//     "jbl speaker price bangladesh",
//     "airpods price bd",
//     "gaming headset bangladesh",
    
//     // Gaming Accessories
//     "gaming accessories bangladesh",
//     "gaming mouse price bd",
//     "mechanical keyboard price bangladesh",
//     "gaming controller bd",
//     "gaming chair price bangladesh",
//     "rgb gaming accessories bd",
    
//     // Smart Home
//     "smart home devices bangladesh",
//     "smart tv price bd",
//     "security camera price bangladesh",
//     "smart bulb price bd",
//     "robot vacuum cleaner bangladesh",
//     "smart speaker price bd",
    
//     // Accessories
//     "phone accessories bangladesh",
//     "phone cases bd",
//     "screen protector price bangladesh",
//     "power bank price bd",
//     "fast charger bangladesh",
//     "data cable price bd",
//     "bluetooth speaker price bangladesh",
    
//     // Shopping intent
//     "buy gadgets online bangladesh",
//     "best gadget price in bd",
//     "electronics shop dhaka",
//     "authentic gadgets bangladesh",
//     "gadget store near me",
//     "tech shop bd",
    
//     // Payment & Delivery
//     "cod electronics bangladesh",
//     "bkash payment gadget",
//     "nagad tech store",
//     "free delivery gadgets dhaka",
//     "warranty electronics bangladesh"
//   ],
  
//   authors: [{ name: "Smart Gadget", url: "https://smartproductbuy.com" }],
//   creator: "Smart Gadget",
//   publisher: "Smart Gadget Bangladesh",
  
//   // Robots configuration
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
  
//   // Canonical URL
//   alternates: {
//     canonical: '/',
//     languages: {
//       'en-US': '/en',
//       'bn-BD': '/bn',
//     },
//   },
  
//   // Open Graph for social sharing (Facebook, WhatsApp, LinkedIn)
//   openGraph: {
//     title: "Smart Gadget - Bangladesh's Premium Gadget Store | Smartphones, Laptops, Accessories",
//     description: "✓COD Available ✓bKash/Nagad ✓Warranty ✓Best Prices. Shop smartphones, laptops, smartwatches, headphones, gaming accessories & more at Smart Gadget Bangladesh.",
//     url: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com',
//     siteName: "Smart Gadget",
//     images: [
//       {
//         url: '/og-image-smartgadget.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Smart Gadget - Premium Gadget Store in Bangladesh | Shop Electronics Online',
//       },
//     ],
//     locale: 'en_BD',
//     alternateLocale: ['bn_BD'],
//     type: 'website',
//     emails: ['support@smartgadget.com.bd'],
//     phoneNumbers: ['+880123456789'],
//     countryName: 'Bangladesh',
//   },
  
//   // Twitter Card optimization
//   twitter: {
//     card: 'summary_large_image',
//     site: '@SmartGadgetBD',
//     siteId: 'smartgadget_bangladesh',
//     creator: '@SmartGadgetBD',
//     creatorId: 'smartgadget',
//     title: "Smart Gadget - Premium Gadget Store Bangladesh | Smartphones, Laptops & All Electronics",
//     description: "Bangladesh's trusted premium gadget store. Shop authentic smartphones, laptops, wearables, accessories. COD & bKash/Nagad available. Warranty included.",
//     images: ['/twitter-card-smartgadget.jpg'],
//   },
  
//   // Verification (add your actual verification codes)
//   verification: {
//     google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
//     facebook: process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || '',
//     me: 'smartgadget@contact',
//   },
  
//   // Additional metadata
//   category: "Premium Gadget & Electronics E-commerce",
//   classification: "Online Gadget Store | Electronics Bangladesh | Tech Products",
  
//   // App links for mobile
//   appleWebApp: {
//     title: "Smart Gadget",
//     statusBarStyle: "default",
//     capable: true,
//   },
  
//   // Format detection
//   formatDetection: {
//     email: true,
//     address: true,
//     telephone: true,
//   },
  
//   // Theme & Viewport - Smart Gadget brand colors (Blue-600 + Cyan-600)
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "#2563EB" },
//     { media: "(prefers-color-scheme: dark)", color: "#1E40AF" },
//   ],
//   viewport: {
//     width: "device-width",
//     initialScale: 1,
//     maximumScale: 5,
//     userScalable: true,
//   },
  
//   // Manifest for PWA
//   manifest: "/manifest.json",
  
//   // Other important SEO tags
//   other: {
//     'geo.region': 'BD',
//     'geo.placename': 'Dhaka',
//     'geo.position': '23.8103;90.4125',
//     'ICBM': '23.8103, 90.4125',
//     'copyright': `Smart Gadget ${new Date().getFullYear()}`,
//     'distribution': 'global',
//     'rating': 'General',
//     'revisit-after': '1 day',
//     'language': 'English, Bengali',
//     'audience': 'Tech Enthusiasts, Professionals, Students, Gadget Buyers in Bangladesh',
//     'target_country': 'Bangladesh',
//     'price_range': '500-200000 BDT',
//     'currency': 'BDT',
//     'delivery': 'Cash on Delivery, Free Delivery over 3000 BDT',
//     'payment_methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
//     'warranty': 'Official Brand Warranty Available',
//   },
// };

// // Structured Data for better SEO (JSON-LD)
// export const generateJsonLd = () => {
//   return {
//     '@context': 'https://schema.org',
//     '@graph': [
//       {
//         '@type': 'Organization',
//         '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/#organization`,
//         name: 'Smart Gadget Bangladesh',
//         url: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com',
//         logo: 'https://smartproductbuy.com/logo.png',
//         sameAs: [
//           'https://facebook.com/smartgadgetbd',
//           'https://instagram.com/smartgadget.bd',
//           'https://twitter.com/SmartGadgetBD',
//           'https://youtube.com/smartgadgetbd',
//         ],
//         description: 'Premium gadgets, smartphones, laptops, and electronics store in Bangladesh.',
//         address: {
//           '@type': 'PostalAddress',
//           addressCountry: 'BD',
//           addressLocality: 'Dhaka',
//           addressRegion: 'Dhaka',
//           postalCode: '1212',
//           streetAddress: 'Gulshan Avenue',
//         },
//         contactPoint: {
//           '@type': 'ContactPoint',
//           telephone: '+880123456789',
//           contactType: 'customer service',
//           availableLanguage: ['English', 'Bengali'],
//           hoursAvailable: {
//             '@type': 'OpeningHoursSpecification',
//             dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//             opens: '10:00',
//             closes: '22:00',
//           },
//         },
//       },
//       {
//         '@type': 'WebSite',
//         '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/#website`,
//         url: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com',
//         name: 'Smart Gadget - Premium Gadget E-commerce Bangladesh',
//         description: 'Best online gadget store in Bangladesh. Shop smartphones, laptops, smartwatches, headphones, gaming accessories & electronics.',
//         publisher: { '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/#organization` },
//         potentialAction: {
//           '@type': 'SearchAction',
//           target: {
//             '@type': 'EntryPoint',
//             urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/search?q={search_term_string}`,
//           },
//           'query-input': 'required name=search_term_string',
//         },
//         inLanguage: ['en', 'bn'],
//       },
//       {
//         '@type': 'Store',
//         '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/#store`,
//         name: 'Smart Gadget Online Store',
//         url: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com',
//         image: 'https://smartproductbuy.com/store-image.jpg',
//         priceRange: '৳500 - ৳200000',
//         currenciesAccepted: 'BDT',
//         paymentAccepted: 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
//         openingHours: 'Mo-Su 10:00-22:00',
//         telephone: '+880123456789',
//         email: 'support@smartgadget.com.bd',
//         description: 'Premium gadgets, smartphones, laptops, and electronics products.',
//         address: {
//           '@type': 'PostalAddress',
//           addressCountry: 'BD',
//           addressLocality: 'Dhaka',
//         },
//         // Product-specific schema for gadgets
//         product: {
//           '@type': 'Product',
//           name: 'Premium Gadgets & Electronics',
//           description: 'Smartphones, laptops, smartwatches, headphones, gaming accessories, and more',
//           brand: {
//             '@type': 'Brand',
//             name: 'Smart Gadget',
//           },
//           offers: {
//             '@type': 'AggregateOffer',
//             priceCurrency: 'BDT',
//             availability: 'https://schema.org/InStock',
//             priceSpecification: {
//               '@type': 'PriceSpecification',
//               minPrice: '500',
//               maxPrice: '200000',
//               priceCurrency: 'BDT',
//             },
//           },
//         },
//       },
//       // Add ItemList for product categories
//       {
//         '@type': 'ItemList',
//         name: 'Gadget Categories',
//         description: 'Browse our wide selection of gadgets and electronics',
//         numberOfItems: 8,
//         itemListElement: [
//           {
//             '@type': 'ListItem',
//             position: 1,
//             name: 'Smartphones',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/smartphones`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 2,
//             name: 'Laptops & Computers',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/laptops`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 3,
//             name: 'Smartwatches & Wearables',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/smartwatches`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 4,
//             name: 'Headphones & Audio',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/audio`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 5,
//             name: 'Gaming Accessories',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/gaming`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 6,
//             name: 'Smart Home Devices',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/smart-home`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 7,
//             name: 'Phone Accessories',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/accessories`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 8,
//             name: 'Power Banks & Chargers',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/power-banks`,
//           },
//         ],
//       },
//       // BreadcrumbList for navigation
//       {
//         '@type': 'BreadcrumbList',
//         name: 'Breadcrumb',
//         itemListElement: [
//           {
//             '@type': 'ListItem',
//             position: 1,
//             name: 'Home',
//             item: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com',
//           },
//           {
//             '@type': 'ListItem',
//             position: 2,
//             name: 'Gadgets',
//             item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/gadgets`,
//           },
//         ],
//       },
//     ],
//   };
// };

// export default function RootLayout({ children }) {
//   // Generate JSON-LD structured data
//   const jsonLd = generateJsonLd();
  
//   return (
//     <html 
//       lang="en" 
//       data-scroll-behavior="smooth" 
//       data-theme="light" 
//       suppressHydrationWarning
//       style={{ colorScheme: 'light' }}
//       dir="ltr"
//     >
//       <head>
//         {/* Basic Meta Tags */}
//         <meta charSet="utf-8" />
//         <meta name="color-scheme" content="light only" />
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        
//         {/* SEO Meta Tags */}
//         <meta name="description" content="Smart Gadget - Bangladesh's trusted online gadget store. Shop premium smartphones, laptops, smartwatches, headphones, gaming accessories & electronics. ✓COD ✓bKash/Nagad ✓Warranty ✓Best Prices" />
//         <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
//         <meta name="googlebot" content="index, follow" />
        
//         {/* Geo Tags for Bangladesh */}
//         <meta name="geo.region" content="BD" />
//         <meta name="geo.placename" content="Dhaka" />
//         <meta name="geo.position" content="23.8103;90.4125" />
//         <meta name="ICBM" content="23.8103, 90.4125" />
        
//         {/* Business Meta Tags */}
//         <meta name="business:contact_data:country_name" content="Bangladesh" />
//         <meta name="business:contact_data:website" content={process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'} />
//         <meta name="business:contact_data:email" content="support@smartgadget.com.bd" />
        
//         {/* Gadget & Electronics E-commerce Meta Tags */}
//         <meta name="og:availability" content="in stock" />
//         <meta name="product:retailer_item_id" content="global" />
//         <meta name="shopping:price_currency" content="BDT" />
//         <meta name="shopping:authorized_seller" content="true" />
//         <meta name="shopping:return_policy" content="7 days return" />
//         <meta name="shopping:authenticity" content="100% authentic products" />
//         <meta name="gadget:categories" content="Smartphones, Laptops, Smartwatches, Audio, Gaming" />
//         <meta name="tech:brands" content="Apple, Samsung, Xiaomi, OnePlus, Realme, Lenovo, HP, ASUS" />
        
//         {/* Favicon & App Icons */}
//         <link rel="icon" href="/favicon.ico" sizes="any" />
//         <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
//         <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
//         <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
//         <link rel="manifest" href="/site.webmanifest" />
        
//         {/* Theme Color - Smart Gadget Brand Color (Blue-600) */}
//         <meta name="theme-color" content="#2563EB" />
//         <meta name="msapplication-TileColor" content="#2563EB" />
        
//         {/* Structured Data JSON-LD */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//         />
        
//         {/* Preconnect for Performance */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
//         {/* Google Fonts - Tech/Sleek fonts for Smart Gadget brand */}
//         {/* <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" /> */}

//         <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Courgette&display=swap" rel="stylesheet" />
        
//         {/* Canonical URL */}
//         <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'} />
        
//         {/* Alternate Language Versions */}
//         <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/en`} />
//         <link rel="alternate" hrefLang="bn" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/bn`} />
//         <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'} />
        
//         {/* CSS Variables for Smart Gadget Theme - Black + Blue-600 + Cyan-600 */}
//         <style>{`
//           :root {
//             color-scheme: light only;
//             --primary-color: #2563EB;
//             --secondary-color: #06B6D4;
//             --accent-color: #3B82F6;
//             --smartgadget-blue: #2563EB;
//             --smartgadget-cyan: #06B6D4;
//             --smartgadget-black: #0F172A;
//             --smartgadget-light: #EFF6FF;
//             --smartgadget-dark: #1E3A5F;
//             --smartgadget-gradient: linear-gradient(135deg, #2563EB, #06B6D4);
//           }
//         `}</style>
//       </head>
//       <body 
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         suppressHydrationWarning
//       >
//          <div className="h-16"></div>
//         {children}

//         <PixelTracker />
//         <CustomCodeInjector />
        
//         {/* Toast Notifications */}
//         <Toaster 
//           position="top-right"
//           richColors
//           closeButton
//           expand={true}
//           duration={4000}
//           theme="light"
//           toastOptions={{
//             style: {
//               background: '#FFFFFF',
//               color: '#333333',
//               border: '1px solid #2563EB',
//               borderRadius: '12px',
//               marginTop: '40px',
//             },
//           }}
//         />
        
//         {/* UI Components */}
//         <ScrollToTop />
     
//       </body>
//     </html>
//   );
// }


// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LayoutContent from "./components/layout/LayoutContent";

import ScrollToTop from "./components/layout/ScrollToTop";
import PromotionalModalWrapper from "./components/PromotionalModalWrapper";
import NewsletterPopup from "./components/NewsletterPopup";
import UnifiedPopupManager from "./components/UnifiedPopupManager";
import PixelTracker from "./components/PixelTracker";
import CustomCodeInjector from "./components/CustomCodeInjector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ============================================
// BEAUTY BUCKET - Premium Beauty & Cosmetics E-commerce (Bangladesh)
// Complete SEO Optimization for Beauty Market
// ============================================

export const metadata = {
  // Base metadata
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'),
  title: {
    default: "Beauty Bucket | Premium Beauty & Cosmetics Store in Bangladesh - Skincare, Makeup, Fragrances & More",
    template: "%s | Beauty Bucket Bangladesh"
  },
  description: "Beauty Bucket - Bangladesh's trusted premium beauty store. Shop authentic skincare, makeup, fragrances, hair care, body care & beauty accessories. ✓COD ✓bKash/Nagad ✓100% Authentic ✓Best Prices",
  
  // Keywords optimized for Bangladesh beauty market
  keywords: [
    // Primary keywords
    "online beauty store bangladesh",
    "beauty bucket bd",
    "cosmetics shop dhaka",
    "best beauty products bangladesh",
    
    // Skincare
    "skincare products bangladesh",
    "best skincare routine bd",
    "face cream price bangladesh",
    "serum price bd",
    "vitamin c serum bangladesh",
    "hyaluronic acid serum bd",
    "sunscreen price bangladesh",
    "moisturizer price bd",
    "face wash price bangladesh",
    "toner price bd",
    "eye cream bangladesh",
    "retinol serum bd",
    "niacinamide serum price bangladesh",
    "face mask price bd",
    "sheet mask bangladesh",
    
    // Makeup
    "makeup products bangladesh",
    "foundation price bd",
    "concealer price bangladesh",
    "lipstick price bd",
    "liquid lipstick bangladesh",
    "mascara price bd",
    "eyeshadow palette bangladesh",
    "kajal price bd",
    "eyeliner price bangladesh",
    "blush price bd",
    "highlighter bangladesh",
    "bronzer price bd",
    "setting spray bangladesh",
    "makeup brushes bd",
    "primer price bangladesh",
    
    // Hair Care
    "hair care products bangladesh",
    "shampoo price bd",
    "conditioner price bangladesh",
    "hair serum bd",
    "hair oil price bangladesh",
    "hair mask bd",
    "hair spray price bangladesh",
    "dry shampoo bangladesh",
    "hair growth serum bd",
    
    // Fragrances
    "perfume price in bangladesh",
    "women perfume bd",
    "men perfume price bangladesh",
    "attar price bd",
    "fragrance oil bangladesh",
    "body mist price bd",
    "deodorant price bangladesh",
    "luxury perfume bd",
    
    // Body Care
    "body lotion price bangladesh",
    "body scrub bd",
    "body wash price bangladesh",
    "body butter bangladesh",
    "hand cream price bd",
    "foot cream bangladesh",
    
    // Natural & Organic
    "natural skincare bangladesh",
    "organic beauty products bd",
    "herbal cosmetics price bangladesh",
    "vegan beauty bd",
    "cruelty free makeup bangladesh",
    "clean beauty products bd",
    
    // Beauty Accessories
    "beauty accessories bangladesh",
    "makeup sponge bd",
    "beauty blender price bangladesh",
    "makeup bag bd",
    "mirror price bangladesh",
    "beauty tools bd",
    
    // Shopping intent
    "buy cosmetics online bangladesh",
    "best beauty price in bd",
    "beauty shop dhaka",
    "authentic makeup bangladesh",
    "beauty store near me",
    "cosmetics shop bd",
    
    // Payment & Delivery
    "cod beauty products bangladesh",
    "bkash payment cosmetics",
    "nagad beauty store",
    "free delivery beauty dhaka",
    "warranty cosmetics bangladesh",
    
    // Trending beauty
    "korean skincare bangladesh",
    "k beauty products bd",
    "vegan makeup bangladesh",
    "clean beauty bd",
    "cruelty free beauty products bangladesh",
    "sustainable beauty bd",
    "glow skincare bangladesh"
  ],
  
  authors: [{ name: "Beauty Bucket", url: "https://beautybucket.com.bd" }],
  creator: "Beauty Bucket",
  publisher: "Beauty Bucket Bangladesh",
  
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'bn-BD': '/bn',
    },
  },
  
  // Open Graph for social sharing (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: "Beauty Bucket - Bangladesh's Premium Beauty Store | Skincare, Makeup, Fragrances",
    description: "✓COD Available ✓bKash/Nagad ✓100% Authentic ✓Best Prices. Shop premium skincare, makeup, fragrances, hair care & beauty accessories at Beauty Bucket Bangladesh.",
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/og-image-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty Bucket - Premium Beauty Store in Bangladesh | Shop Cosmetics Online',
      },
    ],
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
    type: 'website',
    emails: ['support@beautybucket.com'],
    phoneNumbers: ['+880123456789'],
    countryName: 'Bangladesh',
  },
  
  // Twitter Card optimization
  twitter: {
    card: 'summary_large_image',
    site: '@BeautyBucketBD',
    siteId: 'beautybucket_bangladesh',
    creator: '@BeautyBucketBD',
    creatorId: 'beautybucket',
    title: "Beauty Bucket - Premium Beauty Store Bangladesh | Skincare, Makeup & Cosmetics",
    description: "Bangladesh's trusted premium beauty store. Shop authentic skincare, makeup, fragrances, hair care. COD & bKash/Nagad available. 100% authentic products.",
    images: ['/twitter-card-beautybucket.jpg'],
  },
  
  // Verification (add your actual verification codes)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || '',
    me: 'beautybucket@contact',
  },
  
  // Additional metadata
  category: "Premium Beauty & Cosmetics E-commerce",
  classification: "Online Beauty Store | Cosmetics Bangladesh | Skincare Products",
  
  // App links for mobile
  appleWebApp: {
    title: "Beauty Bucket",
    statusBarStyle: "default",
    capable: true,
  },
  
  // Format detection
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  
  // Theme & Viewport - Beauty Bucket brand colors (Pink theme)
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EE4275" },
    { media: "(prefers-color-scheme: dark)", color: "#CC3366" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  
  // Manifest for PWA
  manifest: "/manifest.json",
  
  // Other important SEO tags
  other: {
    'geo.region': 'BD',
    'geo.placename': 'Dhaka',
    'geo.position': '23.8103;90.4125',
    'ICBM': '23.8103, 90.4125',
    'copyright': `Beauty Bucket ${new Date().getFullYear()}`,
    'distribution': 'global',
    'rating': 'General',
    'revisit-after': '1 day',
    'language': 'English, Bengali',
    'audience': 'Beauty Enthusiasts, Skincare Lovers, Makeup Artists, Women in Bangladesh',
    'target_country': 'Bangladesh',
    'price_range': '200-20000 BDT',
    'currency': 'BDT',
    'delivery': 'Cash on Delivery, Free Delivery over 3000 BDT',
    'payment_methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'warranty': '100% Authentic Products Guaranteed',
  },
};

// Structured Data for better SEO (JSON-LD)
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/#organization`,
        name: 'Beauty Bucket Bangladesh',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
        logo: 'https://beautybucket.com.bd/logo.png',
        sameAs: [
          'https://facebook.com/beautybucketbd',
          'https://instagram.com/beautybucket.bd',
          'https://twitter.com/BeautyBucketBD',
          'https://pinterest.com/beautybucketbd',
          'https://youtube.com/beautybucketbd',
          'https://tiktok.com/@beautybucketbd',
        ],
        description: 'Premium beauty, skincare, and cosmetics store in Bangladesh.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BD',
          addressLocality: 'Dhaka',
          addressRegion: 'Dhaka',
          postalCode: '1212',
          streetAddress: 'Gulshan Avenue',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+880123456789',
          contactType: 'customer service',
          availableLanguage: ['English', 'Bengali'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '10:00',
            closes: '22:00',
          },
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/#website`,
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
        name: 'Beauty Bucket - Premium Beauty E-commerce Bangladesh',
        description: 'Best online beauty store in Bangladesh. Shop premium skincare, makeup, fragrances, hair care & beauty accessories.',
        publisher: { '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: ['en', 'bn'],
      },
      {
        '@type': 'Store',
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/#store`,
        name: 'Beauty Bucket Online Store',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
        image: 'https://beautybucket.com.bd/store-image.jpg',
        priceRange: '৳200 - ৳20000',
        currenciesAccepted: 'BDT',
        paymentAccepted: 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
        openingHours: 'Mo-Su 10:00-22:00',
        telephone: '+880123456789',
        email: 'support@beautybucket.com',
        description: 'Premium beauty, skincare, makeup, and cosmetics products.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BD',
          addressLocality: 'Dhaka',
        },
        // Beauty-specific schema
        product: {
          '@type': 'Product',
          name: 'Premium Beauty Products',
          description: 'Authentic skincare, makeup, fragrances, hair care & body care products',
          brand: {
            '@type': 'Brand',
            name: 'Beauty Bucket',
          },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'BDT',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '200',
              maxPrice: '20000',
              priceCurrency: 'BDT',
            },
          },
        },
      },
      // Add ItemList for beauty categories
      {
        '@type': 'ItemList',
        name: 'Beauty Categories',
        description: 'Browse our wide selection of beauty and cosmetic products',
        numberOfItems: 8,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Skincare',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/skincare`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Makeup',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/makeup`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Fragrances',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/fragrances`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Hair Care',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/hair-care`,
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Body Care',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/body-care`,
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: 'Natural Beauty',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/natural-beauty`,
          },
          {
            '@type': 'ListItem',
            position: 7,
            name: 'Beauty Accessories',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/accessories`,
          },
          {
            '@type': 'ListItem',
            position: 8,
            name: 'K-Beauty',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/k-beauty`,
          },
        ],
      },
      // BreadcrumbList for navigation
      {
        '@type': 'BreadcrumbList',
        name: 'Breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Beauty',
            item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/beauty`,
          },
        ],
      },
    ],
  };
};

export default function RootLayout({ children }) {
  // Generate JSON-LD structured data
  const jsonLd = generateJsonLd();
  
  return (
    <html 
      lang="en" 
      data-scroll-behavior="smooth" 
      data-theme="light" 
      suppressHydrationWarning
      style={{ colorScheme: 'light' }}
      dir="ltr"
    >
      <head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="color-scheme" content="light only" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Beauty Bucket - Bangladesh's premium beauty store. Shop skincare, makeup, fragrances, hair care & beauty accessories. ✓COD ✓bKash/Nagad ✓100% Authentic ✓Best Prices" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Geo Tags for Bangladesh */}
        <meta name="geo.region" content="BD" />
        <meta name="geo.placename" content="Dhaka" />
        <meta name="geo.position" content="23.8103;90.4125" />
        <meta name="ICBM" content="23.8103, 90.4125" />
        
        {/* Business Meta Tags */}
        <meta name="business:contact_data:country_name" content="Bangladesh" />
        <meta name="business:contact_data:website" content={process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'} />
        <meta name="business:contact_data:email" content="support@beautybucket.com" />
        
        {/* Beauty E-commerce Meta Tags */}
        <meta name="og:availability" content="in stock" />
        <meta name="product:retailer_item_id" content="global" />
        <meta name="shopping:price_currency" content="BDT" />
        <meta name="shopping:authorized_seller" content="true" />
        <meta name="shopping:return_policy" content="7 days return" />
        <meta name="shopping:authenticity" content="100% authentic products" />
        <meta name="beauty:categories" content="Skincare, Makeup, Fragrances, Hair Care, Body Care" />
        <meta name="beauty:brands" content="Estée Lauder, L'Oréal, MAC, NARS, Clinique, Kiehl's, The Ordinary" />
        
        {/* Favicon & App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color - Beauty Bucket Brand Color (Pink) */}
        <meta name="theme-color" content="#EE4275" />
        <meta name="msapplication-TileColor" content="#EE4275" />
        
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts - Playfair Display + Courgette for Beauty Brand */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700;800;900&family=Courgette&display=swap" rel="stylesheet" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'} />
        
        {/* Alternate Language Versions */}
        <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/en`} />
        <link rel="alternate" hrefLang="bn" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/bn`} />
        <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'} />
        
        {/* CSS Variables for Beauty Bucket Theme - Pink + Rose + Blush */}
        <style>{`
          :root {
            color-scheme: light only;
            --primary-color: #EE4275;
            --secondary-color: #FF6B9D;
            --accent-color: #FF8FAB;
            --beauty-pink: #EE4275;
            --beauty-rose: #FF6B9D;
            --beauty-blush: #FFD2DB;
            --beauty-dark: #2D1B2E;
            --beauty-light: #FFF5F6;
            --beauty-gold: #FFD700;
            --beauty-gradient: linear-gradient(135deg, #EE4275, #FF6B9D);
          }
        `}</style>
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="h-16"></div>
        {children}

        <PixelTracker />
        <CustomCodeInjector />
        
        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          expand={true}
          duration={4000}
          theme="light"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#333333',
              border: '1px solid #EE4275',
              borderRadius: '12px',
              marginTop: '40px',
            },
          }}
        />
        
        {/* UI Components */}
        <ScrollToTop />
        {/* Optional Popup Components - Uncomment when ready */}
        {/* <PromotionalModalWrapper /> */}
        {/* <NewsletterPopup /> */}
        {/* <UnifiedPopupManager /> */}
      </body>
    </html>
  );
}