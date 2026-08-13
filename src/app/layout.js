
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
//   metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
//   title: {
//     default: "HyperVolt | Premium Power Banks & Charging Solutions in Bangladesh - Fast Charging, High Capacity",
//     template: "%s | HyperVolt Bangladesh"
//   },
//   description: "HyperVolt - Bangladesh's trusted premium power bank store. Shop high-capacity power banks, fast chargers, wireless charging, portable power solutions. ✓COD ✓bKash/Nagad ✓100% Authentic ✓Best Prices",
  
//   // Keywords optimized for Bangladesh power bank market
//   keywords: [
//     // Primary keywords
//     "power bank bangladesh",
//     "hypervolt power bank",
//     "fast charging power bank bd",
//     "best power bank price bangladesh",
//     "portable charger bangladesh",
//     "mobile charger price bd",
    
//     // Capacity keywords
//     "10000mah power bank bangladesh",
//     "20000mah power bank price bd",
//     "30000mah power bank bangladesh",
//     "50000mah power bank price bd",
//     "high capacity power bank bangladesh",
//     "large battery power bank bd",
    
//     // Fast Charging
//     "fast charging power bank bd",
//     "quick charge power bank bangladesh",
//     "pd power bank price bd",
//     "power delivery power bank bangladesh",
//     "type c fast charger bd",
//     "qc 3.0 power bank bangladesh",
//     "super fast charging power bank bd",
    
//     // Wireless Charging
//     "wireless power bank bangladesh",
//     "qi wireless charger bd",
//     "magsafe power bank price bangladesh",
//     "wireless charging power bank bd",
    
//     // Brand Specific
//     "hypervolt power bank price bd",
//     "hypervolt charger bangladesh",
//     "hypervolt official store bd",
//     "hypervolt original power bank",
    
//     // Category
//     "portable power bank bangladesh",
//     "phone charger power bank bd",
//     "laptop power bank bangladesh",
//     "solar power bank price bd",
//     "mini power bank bangladesh",
//     "slim power bank bd",
//     "rugged power bank bangladesh",
    
//     // Features
//     "dual output power bank bd",
//     "led display power bank bangladesh",
//     "digital power bank price bd",
//     "waterproof power bank bangladesh",
//     "shockproof power bank bd",
    
//     // Compatibility
//     "iphone power bank bangladesh",
//     "samsung power bank price bd",
//     "xiaomi power bank bangladesh",
//     "oppo power bank bd",
//     "vivo power bank price bangladesh",
//     "huawei power bank bd",
//     "realme power bank bangladesh",
//     "oneplus power bank price bd",
    
//     // Shopping intent
//     "buy power bank online bangladesh",
//     "best power bank price in bd",
//     "power bank shop dhaka",
//     "original power bank bangladesh",
//     "power bank store near me",
//     "electronic shop bd",
    
//     // Payment & Delivery
//     "cod power bank bangladesh",
//     "bkash payment power bank",
//     "nagad power bank store",
//     "free delivery power bank dhaka",
//     "warranty power bank bangladesh",
    
//     // Trending
//     "best power bank 2024 bangladesh",
//     "top power bank bd",
//     "affordable power bank bangladesh",
//     "premium power bank bd",
//     "gadget store bangladesh"
//   ],
  
//   authors: [{ name: "HyperVolt", url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' }],
//   creator: "HyperVolt",
//   publisher: "HyperVolt Bangladesh",
  
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
//     title: "HyperVolt - Bangladesh's Premium Power Bank Store | Fast Charging, High Capacity",
//     description: "✓COD Available ✓bKash/Nagad ✓100% Authentic ✓Best Prices. Shop high-capacity power banks, fast chargers, wireless charging & portable power solutions at HyperVolt Bangladesh.",
//     url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
//     siteName: "HyperVolt",
//     images: [
//       {
//         url: '/og-image-hypervolt.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'HyperVolt - Premium Power Bank Store in Bangladesh | Shop Chargers Online',
//       },
//     ],
//     locale: 'en_BD',
//     alternateLocale: ['bn_BD'],
//     type: 'website',
//     emails: ['support@hypervolt.com'],
//     phoneNumbers: ['+880123456789'],
//     countryName: 'Bangladesh',
//   },
  
//   // Twitter Card optimization
//   twitter: {
//     card: 'summary_large_image',
//     site: '@HyperVoltBD',
//     siteId: 'hypervolt_bangladesh',
//     creator: '@HyperVoltBD',
//     creatorId: 'hypervolt',
//     title: "HyperVolt - Premium Power Bank Store Bangladesh | Fast Charging & High Capacity",
//     description: "Bangladesh's trusted premium power bank store. Shop high-capacity power banks, fast chargers, wireless charging. COD & bKash/Nagad available. 100% authentic products.",
//     images: ['/twitter-card-hypervolt.jpg'],
//   },
  
//   // Verification (add your actual verification codes)
//   verification: {
//     google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
//     facebook: process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || '',
//     me: 'hypervolt@contact',
//   },
  
//   // Additional metadata
//   category: "Premium Power Banks & Charging Solutions",
//   classification: "Power Bank Store | Chargers Bangladesh | Portable Power",
  
//   // App links for mobile
//   appleWebApp: {
//     title: "HyperVolt",
//     statusBarStyle: "default",
//     capable: true,
//   },
  
//   // Format detection
//   formatDetection: {
//     email: true,
//     address: true,
//     telephone: true,
//   },
  
//   // Theme & Viewport - HyperVolt brand colors (Cyan/Teal theme)
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "#06B6D4" },
//     { media: "(prefers-color-scheme: dark)", color: "#0891B2" },
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
//     'copyright': `HyperVolt ${new Date().getFullYear()}`,
//     'distribution': 'global',
//     'rating': 'General',
//     'revisit-after': '1 day',
//     'language': 'English, Bengali',
//     'audience': 'Tech Enthusiasts, Mobile Users, Professionals, Travelers in Bangladesh',
//     'target_country': 'Bangladesh',
//     'price_range': '500-5000 BDT',
//     'currency': 'BDT',
//     'delivery': 'Cash on Delivery, Free Delivery over 1500 BDT',
//     'payment_methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
//     'warranty': '1 Year Official Warranty on All Power Banks',
//   },
// };

// // Structured Data for better SEO (JSON-LD)
// export const generateJsonLd = () => {
//   return {
//     '@context': 'https://schema.org',
//     '@graph': [
//       {
//         '@type': 'Organization',
//         '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/#organization`,
//         name: 'HyperVolt Bangladesh',
//         url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
//         logo: 'http://localhost:3000/logo.png',
//         sameAs: [
//           'https://facebook.com/hypervoltbd',
//           'https://instagram.com/hypervolt.bd',
//           'https://twitter.com/HyperVoltBD',
//           'https://youtube.com/hypervoltbd',
//         ],
//         description: 'Premium power banks and charging solutions provider in Bangladesh.',
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
//         '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/#website`,
//         url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
//         name: 'HyperVolt - Premium Power Bank E-commerce Bangladesh',
//         description: 'Best online power bank store in Bangladesh. Shop high-capacity power banks, fast chargers, wireless charging & portable power solutions.',
//         publisher: { '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/#organization` },
//         potentialAction: {
//           '@type': 'SearchAction',
//           target: {
//             '@type': 'EntryPoint',
//             urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/search?q={search_term_string}`,
//           },
//           'query-input': 'required name=search_term_string',
//         },
//         inLanguage: ['en', 'bn'],
//       },
//       {
//         '@type': 'Store',
//         '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/#store`,
//         name: 'HyperVolt Online Store',
//         url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
//         image: 'http://localhost:3000/store-image.jpg',
//         priceRange: '৳500 - ৳5000',
//         currenciesAccepted: 'BDT',
//         paymentAccepted: 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
//         openingHours: 'Mo-Su 10:00-22:00',
//         telephone: '+880123456789',
//         email: 'support@hypervolt.com',
//         description: 'Premium power banks, fast chargers, and portable charging solutions.',
//         address: {
//           '@type': 'PostalAddress',
//           addressCountry: 'BD',
//           addressLocality: 'Dhaka',
//         },
//         // Product-specific schema for power banks
//         product: {
//           '@type': 'Product',
//           name: 'Premium Power Banks & Chargers',
//           description: 'High-capacity power banks, fast chargers, wireless charging solutions, and portable power devices',
//           brand: {
//             '@type': 'Brand',
//             name: 'HyperVolt',
//           },
//           offers: {
//             '@type': 'AggregateOffer',
//             priceCurrency: 'BDT',
//             availability: 'https://schema.org/InStock',
//             priceSpecification: {
//               '@type': 'PriceSpecification',
//               minPrice: '500',
//               maxPrice: '5000',
//               priceCurrency: 'BDT',
//             },
//           },
//         },
//       },
//       // Add ItemList for product categories
//       {
//         '@type': 'ItemList',
//         name: 'Power Bank Categories',
//         description: 'Browse our wide selection of power banks and charging solutions',
//         numberOfItems: 6,
//         itemListElement: [
//           {
//             '@type': 'ListItem',
//             position: 1,
//             name: '10000mAh Power Banks',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/category/10000mah-power-banks`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 2,
//             name: '20000mAh Power Banks',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/category/20000mah-power-banks`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 3,
//             name: 'Fast Chargers',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/category/fast-chargers`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 4,
//             name: 'Wireless Chargers',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/category/wireless-chargers`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 5,
//             name: 'Laptop Power Banks',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/category/laptop-power-banks`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 6,
//             name: 'Solar Power Banks',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/category/solar-power-banks`,
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
//             item: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
//           },
//           {
//             '@type': 'ListItem',
//             position: 2,
//             name: 'Power Banks',
//             item: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/power-banks`,
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
//         <meta name="description" content="HyperVolt - Bangladesh's premium power bank store. Shop high-capacity power banks, fast chargers, wireless charging & portable power solutions. ✓COD ✓bKash/Nagad ✓100% Authentic ✓Best Prices" />
//         <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
//         <meta name="googlebot" content="index, follow" />
        
//         {/* Geo Tags for Bangladesh */}
//         <meta name="geo.region" content="BD" />
//         <meta name="geo.placename" content="Dhaka" />
//         <meta name="geo.position" content="23.8103;90.4125" />
//         <meta name="ICBM" content="23.8103, 90.4125" />
        
//         {/* Business Meta Tags */}
//         <meta name="business:contact_data:country_name" content="Bangladesh" />
//         <meta name="business:contact_data:website" content={process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'} />
//         <meta name="business:contact_data:email" content="support@hypervolt.com" />
        
//         {/* Power Bank & Tech E-commerce Meta Tags */}
//         <meta name="og:availability" content="in stock" />
//         <meta name="product:retailer_item_id" content="global" />
//         <meta name="shopping:price_currency" content="BDT" />
//         <meta name="shopping:authorized_seller" content="true" />
//         <meta name="shopping:return_policy" content="7 days return" />
//         <meta name="shopping:authenticity" content="100% authentic products" />
//         <meta name="power:capacity" content="10000mAh-50000mAh" />
//         <meta name="power:fast_charging" content="PD, QC 3.0, SuperVOOC" />
//         <meta name="power:wireless" content="Qi Compatible" />
        
//         {/* Favicon & App Icons */}
//         <link rel="icon" href="/favicon.ico" sizes="any" />
//         <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
//         <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
//         <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
//         <link rel="manifest" href="/site.webmanifest" />
        
//         {/* Theme Color - HyperVolt Brand Color (Cyan/Teal) */}
//         <meta name="theme-color" content="#06B6D4" />
//         <meta name="msapplication-TileColor" content="#06B6D4" />
        
//         {/* Structured Data JSON-LD */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//         />
        
//         {/* Preconnect for Performance */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
//         {/* Google Fonts - Tech/Sleek fonts for HyperVolt brand */}
//         <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        
//         {/* Canonical URL */}
//         <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'} />
        
//         {/* Alternate Language Versions */}
//         <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/en`} />
//         <link rel="alternate" hrefLang="bn" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/bn`} />
//         <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'} />
        
//         {/* CSS Variables for HyperVolt Theme */}
//         <style>{`
//           :root {
//             color-scheme: light only;
//             --primary-color: #06B6D4;
//             --secondary-color: #0891B2;
//             --accent-color: #22D3EE;
//             --hypervolt-cyan: #06B6D4;
//             --hypervolt-teal: #0891B2;
//             --hypervolt-light: #E0F7FA;
//             --hypervolt-dark: #004767;
//             --hypervolt-gradient: linear-gradient(135deg, #06B6D4, #004767);
//           }
//         `}</style>
//       </head>
//       <body 
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         suppressHydrationWarning
//       >
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
//               border: '1px solid #06B6D4',
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

export const metadata = {
  // Base metadata
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'),
  title: {
    default: "Smart Gadget | Premium Gadget Store in Bangladesh - Smartphones, Laptops, Accessories & More",
    template: "%s | Smart Gadget Bangladesh"
  },
  description: "Smart Gadget - Bangladesh's trusted online gadget store. Shop premium smartphones, laptops, smartwatches, headphones, gaming accessories & electronics. ✓COD ✓bKash/Nagad ✓Warranty ✓Best Prices",
  
  // Keywords optimized for Bangladesh gadget market
  keywords: [
    // Primary keywords
    "online gadget store bangladesh",
    "smart gadget bd",
    "gadget shop dhaka",
    "best electronics store bangladesh",
    
    // Smartphones
    "smartphone price in bangladesh",
    "best android phone bd",
    "iphone price bangladesh",
    "xiaomi mobile price bd",
    "samsung galaxy price bangladesh",
    "oneplus bangladesh",
    "realme price bd",
    "vivo mobile bangladesh",
    "oppo phone price bd",
    "nothing phone price bangladesh",
    
    // Laptops & Computers
    "laptop price in bangladesh",
    "gaming laptop bd",
    "macbook price bangladesh",
    "lenovo laptop price bd",
    "hp laptop price bangladesh",
    "asus laptop price bd",
    "dell laptop price bangladesh",
    "acer laptop price bd",
    "desktop pc price bangladesh",
    "monitor price bd",
    
    // Smartwatches & Wearables
    "smartwatch price in bangladesh",
    "apple watch bd",
    "samsung galaxy watch price bangladesh",
    "fitness tracker bd",
    "huawei watch price bangladesh",
    "amazfit smartwatch bd",
    "noise smartwatch price bangladesh",
    
    // Audio & Headphones
    "wireless headphones bangladesh",
    "best earbuds price bd",
    "sony headphones price bangladesh",
    "boat earbuds bd",
    "jbl speaker price bangladesh",
    "airpods price bd",
    "gaming headset bangladesh",
    
    // Gaming Accessories
    "gaming accessories bangladesh",
    "gaming mouse price bd",
    "mechanical keyboard price bangladesh",
    "gaming controller bd",
    "gaming chair price bangladesh",
    "rgb gaming accessories bd",
    
    // Smart Home
    "smart home devices bangladesh",
    "smart tv price bd",
    "security camera price bangladesh",
    "smart bulb price bd",
    "robot vacuum cleaner bangladesh",
    "smart speaker price bd",
    
    // Accessories
    "phone accessories bangladesh",
    "phone cases bd",
    "screen protector price bangladesh",
    "power bank price bd",
    "fast charger bangladesh",
    "data cable price bd",
    "bluetooth speaker price bangladesh",
    
    // Shopping intent
    "buy gadgets online bangladesh",
    "best gadget price in bd",
    "electronics shop dhaka",
    "authentic gadgets bangladesh",
    "gadget store near me",
    "tech shop bd",
    
    // Payment & Delivery
    "cod electronics bangladesh",
    "bkash payment gadget",
    "nagad tech store",
    "free delivery gadgets dhaka",
    "warranty electronics bangladesh"
  ],
  
  authors: [{ name: "Smart Gadget", url: "https://smartproductbuy.com" }],
  creator: "Smart Gadget",
  publisher: "Smart Gadget Bangladesh",
  
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
    title: "Smart Gadget - Bangladesh's Premium Gadget Store | Smartphones, Laptops, Accessories",
    description: "✓COD Available ✓bKash/Nagad ✓Warranty ✓Best Prices. Shop smartphones, laptops, smartwatches, headphones, gaming accessories & more at Smart Gadget Bangladesh.",
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com',
    siteName: "Smart Gadget",
    images: [
      {
        url: '/og-image-smartgadget.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Gadget - Premium Gadget Store in Bangladesh | Shop Electronics Online',
      },
    ],
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
    type: 'website',
    emails: ['support@smartgadget.com.bd'],
    phoneNumbers: ['+880123456789'],
    countryName: 'Bangladesh',
  },
  
  // Twitter Card optimization
  twitter: {
    card: 'summary_large_image',
    site: '@SmartGadgetBD',
    siteId: 'smartgadget_bangladesh',
    creator: '@SmartGadgetBD',
    creatorId: 'smartgadget',
    title: "Smart Gadget - Premium Gadget Store Bangladesh | Smartphones, Laptops & All Electronics",
    description: "Bangladesh's trusted premium gadget store. Shop authentic smartphones, laptops, wearables, accessories. COD & bKash/Nagad available. Warranty included.",
    images: ['/twitter-card-smartgadget.jpg'],
  },
  
  // Verification (add your actual verification codes)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || '',
    me: 'smartgadget@contact',
  },
  
  // Additional metadata
  category: "Premium Gadget & Electronics E-commerce",
  classification: "Online Gadget Store | Electronics Bangladesh | Tech Products",
  
  // App links for mobile
  appleWebApp: {
    title: "Smart Gadget",
    statusBarStyle: "default",
    capable: true,
  },
  
  // Format detection
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  
  // Theme & Viewport - Smart Gadget brand colors (Blue-600 + Cyan-600)
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563EB" },
    { media: "(prefers-color-scheme: dark)", color: "#1E40AF" },
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
    'copyright': `Smart Gadget ${new Date().getFullYear()}`,
    'distribution': 'global',
    'rating': 'General',
    'revisit-after': '1 day',
    'language': 'English, Bengali',
    'audience': 'Tech Enthusiasts, Professionals, Students, Gadget Buyers in Bangladesh',
    'target_country': 'Bangladesh',
    'price_range': '500-200000 BDT',
    'currency': 'BDT',
    'delivery': 'Cash on Delivery, Free Delivery over 3000 BDT',
    'payment_methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'warranty': 'Official Brand Warranty Available',
  },
};

// Structured Data for better SEO (JSON-LD)
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/#organization`,
        name: 'Smart Gadget Bangladesh',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com',
        logo: 'https://smartproductbuy.com/logo.png',
        sameAs: [
          'https://facebook.com/smartgadgetbd',
          'https://instagram.com/smartgadget.bd',
          'https://twitter.com/SmartGadgetBD',
          'https://youtube.com/smartgadgetbd',
        ],
        description: 'Premium gadgets, smartphones, laptops, and electronics store in Bangladesh.',
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
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/#website`,
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com',
        name: 'Smart Gadget - Premium Gadget E-commerce Bangladesh',
        description: 'Best online gadget store in Bangladesh. Shop smartphones, laptops, smartwatches, headphones, gaming accessories & electronics.',
        publisher: { '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: ['en', 'bn'],
      },
      {
        '@type': 'Store',
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/#store`,
        name: 'Smart Gadget Online Store',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com',
        image: 'https://smartproductbuy.com/store-image.jpg',
        priceRange: '৳500 - ৳200000',
        currenciesAccepted: 'BDT',
        paymentAccepted: 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
        openingHours: 'Mo-Su 10:00-22:00',
        telephone: '+880123456789',
        email: 'support@smartgadget.com.bd',
        description: 'Premium gadgets, smartphones, laptops, and electronics products.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BD',
          addressLocality: 'Dhaka',
        },
        // Product-specific schema for gadgets
        product: {
          '@type': 'Product',
          name: 'Premium Gadgets & Electronics',
          description: 'Smartphones, laptops, smartwatches, headphones, gaming accessories, and more',
          brand: {
            '@type': 'Brand',
            name: 'Smart Gadget',
          },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'BDT',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '500',
              maxPrice: '200000',
              priceCurrency: 'BDT',
            },
          },
        },
      },
      // Add ItemList for product categories
      {
        '@type': 'ItemList',
        name: 'Gadget Categories',
        description: 'Browse our wide selection of gadgets and electronics',
        numberOfItems: 8,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Smartphones',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/smartphones`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Laptops & Computers',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/laptops`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Smartwatches & Wearables',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/smartwatches`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Headphones & Audio',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/audio`,
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Gaming Accessories',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/gaming`,
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: 'Smart Home Devices',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/smart-home`,
          },
          {
            '@type': 'ListItem',
            position: 7,
            name: 'Phone Accessories',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/accessories`,
          },
          {
            '@type': 'ListItem',
            position: 8,
            name: 'Power Banks & Chargers',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/category/power-banks`,
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
            item: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Gadgets',
            item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/gadgets`,
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
        <meta name="description" content="Smart Gadget - Bangladesh's trusted online gadget store. Shop premium smartphones, laptops, smartwatches, headphones, gaming accessories & electronics. ✓COD ✓bKash/Nagad ✓Warranty ✓Best Prices" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Geo Tags for Bangladesh */}
        <meta name="geo.region" content="BD" />
        <meta name="geo.placename" content="Dhaka" />
        <meta name="geo.position" content="23.8103;90.4125" />
        <meta name="ICBM" content="23.8103, 90.4125" />
        
        {/* Business Meta Tags */}
        <meta name="business:contact_data:country_name" content="Bangladesh" />
        <meta name="business:contact_data:website" content={process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'} />
        <meta name="business:contact_data:email" content="support@smartgadget.com.bd" />
        
        {/* Gadget & Electronics E-commerce Meta Tags */}
        <meta name="og:availability" content="in stock" />
        <meta name="product:retailer_item_id" content="global" />
        <meta name="shopping:price_currency" content="BDT" />
        <meta name="shopping:authorized_seller" content="true" />
        <meta name="shopping:return_policy" content="7 days return" />
        <meta name="shopping:authenticity" content="100% authentic products" />
        <meta name="gadget:categories" content="Smartphones, Laptops, Smartwatches, Audio, Gaming" />
        <meta name="tech:brands" content="Apple, Samsung, Xiaomi, OnePlus, Realme, Lenovo, HP, ASUS" />
        
        {/* Favicon & App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color - Smart Gadget Brand Color (Blue-600) */}
        <meta name="theme-color" content="#2563EB" />
        <meta name="msapplication-TileColor" content="#2563EB" />
        
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts - Tech/Sleek fonts for Smart Gadget brand */}
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'} />
        
        {/* Alternate Language Versions */}
        <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/en`} />
        <link rel="alternate" hrefLang="bn" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'}/bn`} />
        <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'} />
        
        {/* CSS Variables for Smart Gadget Theme - Black + Blue-600 + Cyan-600 */}
        <style>{`
          :root {
            color-scheme: light only;
            --primary-color: #2563EB;
            --secondary-color: #06B6D4;
            --accent-color: #3B82F6;
            --smartgadget-blue: #2563EB;
            --smartgadget-cyan: #06B6D4;
            --smartgadget-black: #0F172A;
            --smartgadget-light: #EFF6FF;
            --smartgadget-dark: #1E3A5F;
            --smartgadget-gradient: linear-gradient(135deg, #2563EB, #06B6D4);
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
              border: '1px solid #2563EB',
              borderRadius: '12px',
              marginTop: '40px',
            },
          }}
        />
        
        {/* UI Components */}
        <ScrollToTop />
     
      </body>
    </html>
  );
}