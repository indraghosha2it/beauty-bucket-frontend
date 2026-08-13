// // app/products/page.js
// import { Suspense } from 'react';
// import ProductsClient from './ProductsClient';

// // Loading fallback for HyperVolt products page
// function ProductsLoading() {
//   return (
//     <div className="min-h-screen bg-[#f0f7fa]">
//       <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
//         {/* Loading Skeleton - HyperVolt themed */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
//           {[...Array(12)].map((_, index) => (
//             <div key={index} className="bg-white rounded-xl border border-[#06B6D4]/20 overflow-hidden animate-pulse shadow-sm hover:shadow-md transition-shadow">
//               <div className="h-32 sm:h-40 bg-gradient-to-br from-[#E0F7FA] to-[#06B6D4]/20"></div>
//               <div className="p-2 sm:p-3">
//                 <div className="h-3 sm:h-4 bg-[#06B6D4]/30 rounded mb-2 w-3/4"></div>
//                 <div className="h-5 sm:h-6 bg-[#06B6D4]/30 rounded mb-2 w-1/2"></div>
//                 <div className="h-2 sm:h-3 bg-[#06B6D4]/20 rounded mb-2"></div>
//                 <div className="h-6 sm:h-8 bg-[#004767]/20 rounded"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // HyperVolt - Premium Power Banks & Charging Solutions SEO Metadata
// export const metadata = {
//   title: "Shop All Premium Power Banks & Chargers | Fast Charging, High Capacity Solutions",
//   description: "Browse 100+ premium power banks at HyperVolt Bangladesh. ✓ High Capacity ✓ Fast Charging ✓ Wireless Charging ✓ Portable Power Solutions. 100% authentic with COD & bKash/Nagad payment.",
//   keywords: [
//     // Primary keywords
//     "buy power bank online bangladesh",
//     "premium power bank shop dhaka",
//     "hypervolt power bank products",
//     "best power bank for phone bd",
//     "portable charger bangladesh",
//     "power bank price in bd",
    
//     // Capacity Keywords
//     "10000mah power bank bangladesh",
//     "20000mah power bank price bd",
//     "30000mah power bank bangladesh",
//     "50000mah power bank price bd",
//     "high capacity power bank bangladesh",
//     "large battery power bank bd",
//     "mini power bank bangladesh",
//     "slim power bank bd",
//     "pocket power bank bangladesh",
//     "compact power bank bd",
    
//     // Fast Charging
//     "fast charging power bank bd",
//     "quick charge power bank bangladesh",
//     "pd power bank price bd",
//     "power delivery power bank bangladesh",
//     "type c fast charger bd",
//     "qc 3.0 power bank bangladesh",
//     "qc 4.0 power bank bd",
//     "super fast charging power bank bangladesh",
//     "vooc power bank bd",
//     "dash charge power bank bangladesh",
//     "warp charge power bank bd",
    
//     // Wireless Charging
//     "wireless power bank bangladesh",
//     "qi wireless charger bd",
//     "magsafe power bank price bangladesh",
//     "wireless charging power bank bd",
//     "10w wireless charger bangladesh",
//     "15w wireless charger bd",
//     "magsafe compatible power bank bangladesh",
//     "wireless power bank for iphone bd",
    
//     // Brand Specific
//     "hypervolt power bank price bd",
//     "hypervolt charger bangladesh",
//     "hypervolt official store bd",
//     "hypervolt original power bank",
//     "hypervolt 20000mah price bd",
//     "hypervolt 10000mah bangladesh",
//     "hypervolt wireless charger bd",
    
//     // Compatibility
//     "iphone power bank bangladesh",
//     "samsung power bank price bd",
//     "xiaomi power bank bangladesh",
//     "oppo power bank bd",
//     "vivo power bank price bangladesh",
//     "huawei power bank bd",
//     "realme power bank bangladesh",
//     "oneplus power bank price bd",
//     "google pixel power bank bd",
//     "laptop power bank bangladesh",
//     "macbook power bank bd",
//     "tablet power bank bangladesh",
//     "ipad power bank bd",
    
//     // Features
//     "dual output power bank bd",
//     "triple output power bank bangladesh",
//     "led display power bank price bd",
//     "digital power bank bangladesh",
//     "waterproof power bank bd",
//     "shockproof power bank bangladesh",
//     "durable power bank bd",
//     "lightweight power bank bangladesh",
//     "travel power bank bd",
//     "camping power bank bangladesh",
//     "emergency power bank bd",
    
//     // Charging Solutions
//     "wall charger bangladesh",
//     "car charger price bd",
//     "multi port charger bangladesh",
//     "gan charger bd",
//     "usb c charger bangladesh",
//     "lightning cable bd",
//     "fast charging cable bangladesh",
//     "wireless charging pad bd",
//     "charging station bangladesh",
//     "power strip with usb bd",
    
//     // Solar
//     "solar power bank bangladesh",
//     "solar charger price bd",
//     "solar portable charger bangladesh",
//     "outdoor power bank bd",
    
//     // Shopping intent
//     "online power bank store bd",
//     "best power bank deals dhaka",
//     "premium power bank bangladesh",
//     "authentic power bank bd",
//     "gift power bank for him",
//     "gift power bank for her",
//     "tech gadgets bangladesh",
//     "power bank shop near me",
//     "electronics store bd",
    
//     // Payment & Delivery
//     "cod power bank bangladesh",
//     "bkash payment power bank",
//     "nagad power bank store",
//     "free delivery power bank dhaka",
//     "authentic products bd",
//     "trusted electronics store",
//     "100% original power bank bd",
//     "warranty power bank bangladesh",
//     "1 year warranty power bank bd",
//     "official warranty bd",
    
//     // Trending
//     "best power bank 2024 bangladesh",
//     "latest power bank bd",
//     "new power bank bangladesh",
//     "top power bank 2025 bd",
//     "premium charger bangladesh",
//     "fastest charging power bank bd",
//     "best value power bank bangladesh",
    
//     // Accessories
//     "power bank case bangladesh",
//     "charger cable bd",
//     "usb hub bangladesh",
//     "adapter price bd",
//     "travel charger bangladesh",
//     "universal charger bd"
//   ],
//   openGraph: {
//     title: "HyperVolt Products - Bangladesh's Premium Collection of Power Banks & Chargers",
//     description: "Shop high-capacity power banks, fast chargers, wireless charging solutions & portable power devices. 100% authentic products with free delivery across Bangladesh. COD and bKash/Nagad accepted.",
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/products' || 'https://hypervolt.com.bd/products',
//     siteName: "HyperVolt",
//     images: [
//       {
//         url: '/products-og-hypervolt.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'HyperVolt Premium Collection - Power Banks, Fast Chargers, Wireless Charging, Portable Power',
//       },
//     ],
//     type: 'website',
//     locale: 'en_BD',
//     alternateLocale: ['bn_BD'],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     site: '@HyperVoltBD',
//     creator: '@HyperVoltBD',
//     title: "HyperVolt Products - Premium Power Banks & Chargers in Bangladesh",
//     description: "Shop 100+ premium power banks, fast chargers, wireless charging solutions. 100% authentic. COD & bKash/Nagad available.",
//     images: ['/products-twitter-hypervolt.jpg'],
//   },
//   alternates: {
//     canonical: '/products',
//     languages: {
//       'en': '/products',
//       'bn': '/bn/products',
//     },
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-snippet': -1,
//       'max-image-preview': 'large',
//       'max-video-preview': -1,
//     },
//   },
//   // Additional metadata for better SEO
//   other: {
//     'application-name': 'HyperVolt Products',
//     'msapplication-TileColor': '#06B6D4',
//     'theme-color': '#06B6D4',
//     'price-range': '500-5000 BDT',
//     'target-audience': 'Tech Enthusiasts, Mobile Users, Professionals, Travelers, Students, Gamers',
//     'product-category': 'Power Banks, Chargers, Wireless Chargers, Cables, Accessories',
//     'authenticity': '100% Authentic Products',
//     'return-policy': '7 Days Return Policy',
//     'product-types': 'Power Banks, Fast Chargers, Wireless Chargers, Cables, Adapters',
//     'condition': 'New, Original',
//     'capacity-range': '10000mAh - 50000mAh',
//     'charging-technology': 'PD 3.0, QC 4.0, SuperVOOC, Dash Charge, Wireless Charging',
//     'battery-type': 'Li-Polymer, Li-Ion',
//     'safety-features': 'Overcharge Protection, Short Circuit Protection, Overheat Protection, Surge Protection',
//     'durability': 'Shockproof, Water-Resistant, Durable Design',
//     'warranty': '1 Year Official Warranty',
//   },
// };

// // Server component with Suspense for HyperVolt products page
// export default function ProductsPage() {
//   return (
//     <Suspense fallback={<ProductsLoading />}>
//       <ProductsClient />
//     </Suspense>
//   );
// }


// app/products/page.js
import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

// Loading fallback for Smart Gadget products page
function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
        {/* Loading Skeleton - Smart Gadget themed */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl border border-[#2563EB]/20 overflow-hidden animate-pulse shadow-sm hover:shadow-md transition-shadow">
              <div className="h-32 sm:h-40 bg-gradient-to-br from-[#EFF6FF] to-[#2563EB]/20"></div>
              <div className="p-2 sm:p-3">
                <div className="h-3 sm:h-4 bg-[#2563EB]/30 rounded mb-2 w-3/4"></div>
                <div className="h-5 sm:h-6 bg-[#2563EB]/30 rounded mb-2 w-1/2"></div>
                <div className="h-2 sm:h-3 bg-[#2563EB]/20 rounded mb-2"></div>
                <div className="h-6 sm:h-8 bg-[#0F172A]/20 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Smart Gadget - Premium Gadgets & Electronics SEO Metadata
export const metadata = {
  title: "Shop All Premium Gadgets & Electronics | Smartphones, Laptops, All Electronic Accessories",
  description: "Browse 100+ premium gadgets at Smart Gadget Bangladesh. ✓ Smartphones ✓ Laptops ✓ Smartwatches ✓ Headphones ✓ Gaming Accessories. 100% authentic with COD & bKash/Nagad payment.",
  keywords: [
    // Primary keywords
    "buy gadgets online bangladesh",
    "premium gadget shop dhaka",
    "smart gadget products",
    "best electronics store bd",
    "online gadget store bangladesh",
    "gadget price in bd",
    
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
    "google pixel price bd",
    "tecno phone bangladesh",
    "infinix mobile price bd",
    "itel phone bangladesh",
    
    // Laptops & Computers
    "laptop price in bangladesh",
    "gaming laptop bd",
    "macbook price bangladesh",
    "lenovo laptop price bd",
    "hp laptop price bangladesh",
    "asus laptop price bd",
    "dell laptop price bangladesh",
    "acer laptop price bd",
    "msi gaming laptop bangladesh",
    "razer laptop price bd",
    "chromebook price bangladesh",
    "desktop pc price bd",
    "monitor price bangladesh",
    "all in one pc bd",
    
    // Smartwatches & Wearables
    "smartwatch price in bangladesh",
    "apple watch bd",
    "samsung galaxy watch price bangladesh",
    "fitness tracker bd",
    "huawei watch price bangladesh",
    "amazfit smartwatch bd",
    "noise smartwatch price bangladesh",
    "boAt smartwatch bd",
    "fire boltt smartwatch bangladesh",
    "fitbit price bd",
    "garmin watch bangladesh",
    "tizen smartwatch bd",
    
    // Audio & Headphones
    "wireless headphones bangladesh",
    "best earbuds price bd",
    "sony headphones price bangladesh",
    "boAt earbuds bd",
    "jbl speaker price bangladesh",
    "airpods price bd",
    "gaming headset bangladesh",
    "noise cancelling headphones bd",
    "true wireless earbuds bangladesh",
    "neckband price bd",
    "bluetooth speaker price bangladesh",
    "soundbar price bd",
    
    // Gaming Accessories
    "gaming accessories bangladesh",
    "gaming mouse price bd",
    "mechanical keyboard price bangladesh",
    "gaming controller bd",
    "gaming chair price bangladesh",
    "rgb gaming accessories bd",
    "gaming monitor bangladesh",
    "gaming headset price bd",
    "gaming mouse pad bd",
    "streaming accessories bangladesh",
    
    // Smart Home
    "smart home devices bangladesh",
    "smart tv price bd",
    "security camera price bangladesh",
    "smart bulb price bd",
    "robot vacuum cleaner bangladesh",
    "smart speaker price bd",
    "smart doorbell bangladesh",
    "smart plug price bd",
    "home automation bangladesh",
    "smart lock price bd",
    
    // Accessories
    "phone accessories bangladesh",
    "phone cases bd",
    "screen protector price bangladesh",
    "power bank price bd",
    "fast charger bangladesh",
    "data cable price bd",
    "bluetooth speaker price bangladesh",
    "selfie stick bd",
    "tripod price bangladesh",
    "gimbal stabilizer bd",
    "vr headset price bangladesh",
    "drone price bd",
    
    // Shopping intent
    "buy gadgets online bd",
    "best gadget deals dhaka",
    "premium gadget bangladesh",
    "authentic gadgets bd",
    "gift gadgets for him",
    "gift gadgets for her",
    "tech gifts bangladesh",
    "gadget shop near me",
    "electronics store bd",
    "trusted tech store bangladesh",
    
    // Payment & Delivery
    "cod electronics bangladesh",
    "bkash payment gadget",
    "nagad tech store",
    "free delivery gadgets dhaka",
    "authentic products bd",
    "trusted electronics store",
    "100% original gadgets bd",
    "warranty electronics bangladesh",
    "official warranty bd",
    "brand warranty bangladesh",
    
    // Trending
    "best gadgets 2024 bangladesh",
    "latest gadgets bd",
    "new electronics bangladesh",
    "top gadgets 2025 bd",
    "premium tech bangladesh",
    "best value gadgets bangladesh",
    "tech accessories bd",
    
    // Brands
    "apple products bangladesh",
    "samsung products bd",
    "xiaomi gadgets bangladesh",
    "realme tech bd",
    "oneplus bangladesh",
    "lenovo products bd",
    "hp products bangladesh",
    "asus gadgets bd",
    "dell products bangladesh",
    "sony electronics bangladesh",
    "jbl audio bd",
    "boAt lifestyle bangladesh"
  ],
  openGraph: {
    title: "Smart Gadget Products - Bangladesh's Premium Collection of Gadgets & Electronics",
    description: "Shop smartphones, laptops, smartwatches, headphones, gaming accessories & more. 100% authentic products with free delivery across Bangladesh. COD and bKash/Nagad accepted.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/products' || 'https://smartgadget.com.bd/products',
    siteName: "Smart Gadget",
    images: [
      {
        url: '/products-og-smartgadget.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Gadget Premium Collection - Smartphones, Laptops, Smartwatches, Headphones, Gaming Accessories',
      },
    ],
    type: 'website',
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SmartGadgetBD',
    creator: '@SmartGadgetBD',
    title: "Smart Gadget Products - Premium Gadgets & Electronics in Bangladesh",
    description: "Shop 100+ premium gadgets, smartphones, laptops, smartwatches, headphones. 100% authentic. COD & bKash/Nagad available.",
    images: ['/products-twitter-smartgadget.jpg'],
  },
  alternates: {
    canonical: '/products',
    languages: {
      'en': '/products',
      'bn': '/bn/products',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Additional metadata for better SEO
  other: {
    'application-name': 'Smart Gadget Products',
    'msapplication-TileColor': '#2563EB',
    'theme-color': '#2563EB',
    'price-range': '500-200000 BDT',
    'target-audience': 'Tech Enthusiasts, Professionals, Students, Gamers, Home Users, Travelers',
    'product-category': 'Smartphones, Laptops, Smartwatches, Headphones, Gaming Accessories, Smart Home, Accessories',
    'authenticity': '100% Authentic Products',
    'return-policy': '7 Days Return Policy',
    'product-types': 'Smartphones, Laptops, Smartwatches, Headphones, Gaming Gear, Smart Home Devices, Accessories',
    'condition': 'New, Original, Brand New',
    'brands-available': 'Apple, Samsung, Xiaomi, OnePlus, Realme, Lenovo, HP, ASUS, Dell, Acer, Sony, JBL, boAt',
    'technology': '5G, WiFi 6, Bluetooth 5.3, USB-C, Fast Charging, Wireless Charging',
    'safety-features': 'Overcharge Protection, Short Circuit Protection, Overheat Protection, Surge Protection',
    'durability': 'Durable Design, Premium Build Quality',
    'warranty': 'Official Brand Warranty Available',
    'operating-systems': 'Android, iOS, Windows, macOS, ChromeOS',
    'connectivity': 'Bluetooth, WiFi, NFC, USB-C, Lightning, 3.5mm Audio',
  },
};

// Server component with Suspense for Smart Gadget products page
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsClient />
    </Suspense>
  );
}