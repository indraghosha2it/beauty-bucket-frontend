


// // app/products/page.js
// import { Suspense } from 'react';
// import ProductsClient from './ProductsClient';

// // Loading fallback for Smart Gadget products page
// function ProductsLoading() {
//   return (
//     <div className="min-h-screen bg-[#F1F5F9]">
//       <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
//         {/* Loading Skeleton - Smart Gadget themed */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
//           {[...Array(12)].map((_, index) => (
//             <div key={index} className="bg-white rounded-xl border border-[#2563EB]/20 overflow-hidden animate-pulse shadow-sm hover:shadow-md transition-shadow">
//               <div className="h-32 sm:h-40 bg-gradient-to-br from-[#EFF6FF] to-[#2563EB]/20"></div>
//               <div className="p-2 sm:p-3">
//                 <div className="h-3 sm:h-4 bg-[#2563EB]/30 rounded mb-2 w-3/4"></div>
//                 <div className="h-5 sm:h-6 bg-[#2563EB]/30 rounded mb-2 w-1/2"></div>
//                 <div className="h-2 sm:h-3 bg-[#2563EB]/20 rounded mb-2"></div>
//                 <div className="h-6 sm:h-8 bg-[#0F172A]/20 rounded"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Smart Gadget - Premium Gadgets & Electronics SEO Metadata
// export const metadata = {
//   title: "Shop All Premium Gadgets & Electronics | Smartphones, Laptops, All Electronic Accessories",
//   description: "Browse 100+ premium gadgets at Smart Gadget Bangladesh. ✓ Smartphones ✓ Laptops ✓ Smartwatches ✓ Headphones ✓ Gaming Accessories. 100% authentic with COD & bKash/Nagad payment.",
//   keywords: [
//     // Primary keywords
//     "buy gadgets online bangladesh",
//     "premium gadget shop dhaka",
//     "smart gadget products",
//     "best electronics store bd",
//     "online gadget store bangladesh",
//     "gadget price in bd",
    
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
//     "google pixel price bd",
//     "tecno phone bangladesh",
//     "infinix mobile price bd",
//     "itel phone bangladesh",
    
//     // Laptops & Computers
//     "laptop price in bangladesh",
//     "gaming laptop bd",
//     "macbook price bangladesh",
//     "lenovo laptop price bd",
//     "hp laptop price bangladesh",
//     "asus laptop price bd",
//     "dell laptop price bangladesh",
//     "acer laptop price bd",
//     "msi gaming laptop bangladesh",
//     "razer laptop price bd",
//     "chromebook price bangladesh",
//     "desktop pc price bd",
//     "monitor price bangladesh",
//     "all in one pc bd",
    
//     // Smartwatches & Wearables
//     "smartwatch price in bangladesh",
//     "apple watch bd",
//     "samsung galaxy watch price bangladesh",
//     "fitness tracker bd",
//     "huawei watch price bangladesh",
//     "amazfit smartwatch bd",
//     "noise smartwatch price bangladesh",
//     "boAt smartwatch bd",
//     "fire boltt smartwatch bangladesh",
//     "fitbit price bd",
//     "garmin watch bangladesh",
//     "tizen smartwatch bd",
    
//     // Audio & Headphones
//     "wireless headphones bangladesh",
//     "best earbuds price bd",
//     "sony headphones price bangladesh",
//     "boAt earbuds bd",
//     "jbl speaker price bangladesh",
//     "airpods price bd",
//     "gaming headset bangladesh",
//     "noise cancelling headphones bd",
//     "true wireless earbuds bangladesh",
//     "neckband price bd",
//     "bluetooth speaker price bangladesh",
//     "soundbar price bd",
    
//     // Gaming Accessories
//     "gaming accessories bangladesh",
//     "gaming mouse price bd",
//     "mechanical keyboard price bangladesh",
//     "gaming controller bd",
//     "gaming chair price bangladesh",
//     "rgb gaming accessories bd",
//     "gaming monitor bangladesh",
//     "gaming headset price bd",
//     "gaming mouse pad bd",
//     "streaming accessories bangladesh",
    
//     // Smart Home
//     "smart home devices bangladesh",
//     "smart tv price bd",
//     "security camera price bangladesh",
//     "smart bulb price bd",
//     "robot vacuum cleaner bangladesh",
//     "smart speaker price bd",
//     "smart doorbell bangladesh",
//     "smart plug price bd",
//     "home automation bangladesh",
//     "smart lock price bd",
    
//     // Accessories
//     "phone accessories bangladesh",
//     "phone cases bd",
//     "screen protector price bangladesh",
//     "power bank price bd",
//     "fast charger bangladesh",
//     "data cable price bd",
//     "bluetooth speaker price bangladesh",
//     "selfie stick bd",
//     "tripod price bangladesh",
//     "gimbal stabilizer bd",
//     "vr headset price bangladesh",
//     "drone price bd",
    
//     // Shopping intent
//     "buy gadgets online bd",
//     "best gadget deals dhaka",
//     "premium gadget bangladesh",
//     "authentic gadgets bd",
//     "gift gadgets for him",
//     "gift gadgets for her",
//     "tech gifts bangladesh",
//     "gadget shop near me",
//     "electronics store bd",
//     "trusted tech store bangladesh",
    
//     // Payment & Delivery
//     "cod electronics bangladesh",
//     "bkash payment gadget",
//     "nagad tech store",
//     "free delivery gadgets dhaka",
//     "authentic products bd",
//     "trusted electronics store",
//     "100% original gadgets bd",
//     "warranty electronics bangladesh",
//     "official warranty bd",
//     "brand warranty bangladesh",
    
//     // Trending
//     "best gadgets 2024 bangladesh",
//     "latest gadgets bd",
//     "new electronics bangladesh",
//     "top gadgets 2025 bd",
//     "premium tech bangladesh",
//     "best value gadgets bangladesh",
//     "tech accessories bd",
    
//     // Brands
//     "apple products bangladesh",
//     "samsung products bd",
//     "xiaomi gadgets bangladesh",
//     "realme tech bd",
//     "oneplus bangladesh",
//     "lenovo products bd",
//     "hp products bangladesh",
//     "asus gadgets bd",
//     "dell products bangladesh",
//     "sony electronics bangladesh",
//     "jbl audio bd",
//     "boAt lifestyle bangladesh"
//   ],
//   openGraph: {
//     title: "Smart Gadget Products - Bangladesh's Premium Collection of Gadgets & Electronics",
//     description: "Shop smartphones, laptops, smartwatches, headphones, gaming accessories & more. 100% authentic products with free delivery across Bangladesh. COD and bKash/Nagad accepted.",
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/products' || 'https://smartgadget.com.bd/products',
//     siteName: "Smart Gadget",
//     images: [
//       {
//         url: '/products-og-smartgadget.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Smart Gadget Premium Collection - Smartphones, Laptops, Smartwatches, Headphones, Gaming Accessories',
//       },
//     ],
//     type: 'website',
//     locale: 'en_BD',
//     alternateLocale: ['bn_BD'],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     site: '@SmartGadgetBD',
//     creator: '@SmartGadgetBD',
//     title: "Smart Gadget Products - Premium Gadgets & Electronics in Bangladesh",
//     description: "Shop 100+ premium gadgets, smartphones, laptops, smartwatches, headphones. 100% authentic. COD & bKash/Nagad available.",
//     images: ['/products-twitter-smartgadget.jpg'],
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
//     'application-name': 'Smart Gadget Products',
//     'msapplication-TileColor': '#2563EB',
//     'theme-color': '#2563EB',
//     'price-range': '500-200000 BDT',
//     'target-audience': 'Tech Enthusiasts, Professionals, Students, Gamers, Home Users, Travelers',
//     'product-category': 'Smartphones, Laptops, Smartwatches, Headphones, Gaming Accessories, Smart Home, Accessories',
//     'authenticity': '100% Authentic Products',
//     'return-policy': '7 Days Return Policy',
//     'product-types': 'Smartphones, Laptops, Smartwatches, Headphones, Gaming Gear, Smart Home Devices, Accessories',
//     'condition': 'New, Original, Brand New',
//     'brands-available': 'Apple, Samsung, Xiaomi, OnePlus, Realme, Lenovo, HP, ASUS, Dell, Acer, Sony, JBL, boAt',
//     'technology': '5G, WiFi 6, Bluetooth 5.3, USB-C, Fast Charging, Wireless Charging',
//     'safety-features': 'Overcharge Protection, Short Circuit Protection, Overheat Protection, Surge Protection',
//     'durability': 'Durable Design, Premium Build Quality',
//     'warranty': 'Official Brand Warranty Available',
//     'operating-systems': 'Android, iOS, Windows, macOS, ChromeOS',
//     'connectivity': 'Bluetooth, WiFi, NFC, USB-C, Lightning, 3.5mm Audio',
//   },
// };

// // Server component with Suspense for Smart Gadget products page
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

// Loading fallback for Beauty Bucket products page
function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#FFF5F6]">
      <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
        {/* Loading Skeleton - Beauty Bucket themed */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl border border-[#FFD2DB]/40 overflow-hidden animate-pulse shadow-sm hover:shadow-md transition-shadow">
              <div className="h-32 sm:h-40 bg-gradient-to-br from-[#FFF5F6] to-[#EE4275]/20"></div>
              <div className="p-2 sm:p-3">
                <div className="h-3 sm:h-4 bg-[#EE4275]/30 rounded mb-2 w-3/4"></div>
                <div className="h-5 sm:h-6 bg-[#EE4275]/30 rounded mb-2 w-1/2"></div>
                <div className="h-2 sm:h-3 bg-[#EE4275]/20 rounded mb-2"></div>
                <div className="h-6 sm:h-8 bg-[#2D1B2E]/20 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Beauty Bucket - Premium Beauty & Cosmetics SEO Metadata
export const metadata = {
  title: "Shop All Premium Beauty Products & Cosmetics | Skincare, Makeup, Fragrances & More",
  description: "Browse 100+ premium beauty products at Beauty Bucket Bangladesh. ✓ Skincare ✓ Makeup ✓ Fragrances ✓ Hair Care ✓ Body Care. 100% authentic with COD & bKash/Nagad payment.",
  keywords: [
    // Primary keywords
    "buy beauty products online bangladesh",
    "premium cosmetics shop dhaka",
    "beauty bucket products",
    "best beauty store bd",
    "online cosmetics store bangladesh",
    "beauty product price in bd",
    
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
    "glycolic acid toner bd",
    "salicylic acid serum bangladesh",
    "alpha arbutin serum bd",
    "peptide serum bangladesh",
    "ceramide moisturizer bd",
    "squalane oil bangladesh",
    "rosehip oil price bd",
    "jade roller bangladesh",
    "gua sha tool bd",
    "under eye patches bangladesh",
    
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
    "bb cream bangladesh",
    "cc cream price bd",
    "compact powder bangladesh",
    "loose powder price bd",
    "makeup remover bangladesh",
    "micellar water bd",
    "eyebrow pencil price bangladesh",
    "lip liner bd",
    "lip gloss price bangladesh",
    "matte lipstick bd",
    "creamy lipstick bangladesh",
    "tinted moisturizer bd",
    "face palette bangladesh",
    
    // Fragrances
    "perfume price in bangladesh",
    "women perfume bd",
    "men perfume price bangladesh",
    "attar price bd",
    "fragrance oil bangladesh",
    "body mist price bd",
    "deodorant price bangladesh",
    "luxury perfume bd",
    "designer perfume bangladesh",
    "niche fragrance bd",
    "perfume gift set bangladesh",
    "travel size perfume bd",
    "oud perfume price bangladesh",
    "fruity fragrance bd",
    "floral perfume bangladesh",
    "woody fragrance bd",
    "fresh perfume bangladesh",
    "oriental fragrance bd",
    "unisex perfume bd",
    "perfume oil bangladesh",
    
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
    "scalp scrub bangladesh",
    "leave in conditioner bd",
    "heat protectant spray bangladesh",
    "hair tonic price bd",
    "anti dandruff shampoo bangladesh",
    "color protect shampoo bd",
    "volume shampoo bangladesh",
    "silk serum bd",
    "hair butter bangladesh",
    "curl cream price bd",
    "edge control gel bangladesh",
    
    // Body Care
    "body lotion price bangladesh",
    "body scrub bd",
    "body wash price bangladesh",
    "body butter bangladesh",
    "hand cream price bd",
    "foot cream bangladesh",
    "body oil bangladesh",
    "body mist price bd",
    "body serum bangladesh",
    "body exfoliator bd",
    "body moisturizer bangladesh",
    "after sun lotion bd",
    "tinted body lotion bangladesh",
    "firming cream bd",
    "stretch mark cream bangladesh",
    
    // Natural & Organic
    "natural skincare bangladesh",
    "organic beauty products bd",
    "herbal cosmetics price bangladesh",
    "vegan beauty bd",
    "cruelty free makeup bangladesh",
    "clean beauty products bd",
    "organic face cream bangladesh",
    "natural makeup bd",
    "chemical free skincare bangladesh",
    "eco friendly beauty bd",
    "sustainable beauty bangladesh",
    "plant based cosmetics bd",
    "botanical skincare bangladesh",
    "natural hair care bd",
    "organic lip balm bangladesh",
    
    // Beauty Accessories
    "beauty accessories bangladesh",
    "makeup sponge bd",
    "beauty blender price bangladesh",
    "makeup bag bd",
    "mirror price bangladesh",
    "beauty tools bd",
    "makeup brush set bangladesh",
    "beauty organizer bd",
    "vanity mirror bangladesh",
    "travel makeup bag bd",
    "beauty blender cleanser bangladesh",
    
    // K-Beauty & Trends
    "korean skincare bangladesh",
    "k beauty products bd",
    "korean makeup bangladesh",
    "glass skin routine bd",
    "korean face mask bangladesh",
    "korean toner bd",
    "korean serum bangladesh",
    "korean moisturizer bd",
    "korean sunscreen bangladesh",
    "japanese skincare bd",
    "j beauty products bangladesh",
    "japanese toner bd",
    
    // Shopping intent
    "buy cosmetics online bd",
    "best beauty deals dhaka",
    "premium beauty bangladesh",
    "authentic makeup bd",
    "gift beauty sets bangladesh",
    "beauty gifts for her",
    "luxury cosmetics bd",
    "beauty shop near me",
    "cosmetics store bd",
    "trusted beauty store bangladesh",
    
    // Payment & Delivery
    "cod beauty products bangladesh",
    "bkash payment cosmetics",
    "nagad beauty store",
    "free delivery beauty dhaka",
    "authentic products bd",
    "trusted cosmetics store",
    "100% original beauty bd",
    "brand warranty cosmetics",
    "genuine makeup bangladesh",
    
    // Trending
    "best beauty products 2024 bangladesh",
    "latest makeup bd",
    "new skincare bangladesh",
    "top beauty products 2025 bd",
    "premium beauty bangladesh",
    "best value beauty products",
    "beauty haul bangladesh",
    "skincare routine bd",
    "makeup tutorial products bd",
    
    // Brands
    "loreal products bangladesh",
    "maybelline cosmetics bd",
    "nyx makeup bangladesh",
    "mac cosmetics bd",
    "estee lauder bangladesh",
    "clinique products bd",
    "kiels bangladesh",
    "the ordinary serums bd",
    "cosrx skincare bangladesh",
    "innisfree products bd",
    "laneige bangladesh",
    "nivea beauty bd",
    "ponds products bangladesh",
    "garnier skincare bd",
    "vaseline beauty products bangladesh"
  ],
  openGraph: {
    title: "Beauty Bucket Products - Bangladesh's Premium Collection of Beauty & Cosmetics",
    description: "Shop premium skincare, makeup, fragrances, hair care, body care & beauty accessories. 100% authentic products with free delivery across Bangladesh. COD and bKash/Nagad accepted.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/products' || 'https://beautybucket.com.bd/products',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/products-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty Bucket Premium Collection - Skincare, Makeup, Fragrances, Hair Care, Body Care',
      },
    ],
    type: 'website',
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BeautyBucketBD',
    creator: '@BeautyBucketBD',
    title: "Beauty Bucket Products - Premium Beauty & Cosmetics in Bangladesh",
    description: "Shop 100+ premium beauty products, skincare, makeup, fragrances. 100% authentic. COD & bKash/Nagad available.",
    images: ['/products-twitter-beautybucket.jpg'],
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
    'application-name': 'Beauty Bucket Products',
    'msapplication-TileColor': '#EE4275',
    'theme-color': '#EE4275',
    'price-range': '200-20000 BDT',
    'target-audience': 'Beauty Enthusiasts, Skincare Lovers, Makeup Artists, Women, Men, Teenagers, Professionals',
    'product-category': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories, Natural Beauty, K-Beauty',
    'authenticity': '100% Authentic Products',
    'return-policy': '7 Days Return Policy',
    'product-types': 'Skincare Products, Makeup Products, Fragrances, Hair Care Products, Body Care Products, Beauty Accessories',
    'condition': 'New, Original, Brand New, Sealed',
    'brands-available': 'L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, Clinique, Kiehl\'s, The Ordinary, Cosrx, Innisfree, Laneige, Nivea, Pond\'s, Garnier, Vaseline',
    'skin-types': 'All Skin Types, Dry Skin, Oily Skin, Combination Skin, Sensitive Skin, Acne-Prone Skin, Mature Skin',
    'ingredients': 'Vitamin C, Hyaluronic Acid, Retinol, Niacinamide, Salicylic Acid, Glycolic Acid, Ceramides, Peptides, Squalane, Rosehip Oil, Shea Butter, Aloe Vera',
    'beauty-concerns': 'Acne, Aging, Hyperpigmentation, Dryness, Dullness, Fine Lines, Wrinkles, Dark Spots, Uneven Skin Tone',
    'safety-features': 'Dermatologically Tested, Hypoallergenic, Non-Comedogenic, Fragrance Free (Options Available), Paraben Free (Options Available)',
    'ethical-features': 'Cruelty Free Options, Vegan Options, Eco-Friendly Packaging Options',
    'warranty': '100% Genuine Products Guaranteed',
    'shades-available': 'Fair to Deep Skin Tones',
    'texture-types': 'Cream, Gel, Serum, Oil, Balm, Powder, Liquid, Stick',
  },
};

// Server component with Suspense for Beauty Bucket products page
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsClient />
    </Suspense>
  );
}