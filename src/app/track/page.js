
// // app/track/page.js
// import { Suspense } from 'react';
// import TrackClient from './TrackClient';

// // Import for loading state
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Loading fallback component for Track page
// function TrackLoading() {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 mx-auto bg-[#06B6D4]/20 rounded-full animate-pulse mb-4"></div>
//           <div className="h-6 w-48 bg-[#06B6D4]/20 rounded mx-auto animate-pulse"></div>
//           <div className="h-4 w-64 bg-[#06B6D4]/20 rounded mx-auto mt-3 animate-pulse"></div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// // HyperVolt Track Page SEO Metadata
// export const metadata = {
//   title: "Track Your Orders",
//   description: "Track your power bank and charger orders easily with your phone number. Check order status, delivery updates, and tracking information for all your purchases from HyperVolt Bangladesh.",
//   keywords: [
//     // Primary tracking keywords
//     "track order bangladesh",
//     "power bank order tracking",
//     "hypervolt track",
//     "order status check bd",
//     "track my order",
//     "charger delivery tracking",
//     "power bank delivery status",
//     "electronics order tracking",
    
//     // Delivery tracking
//     "track order by phone",
//     "bangladesh electronics delivery",
//     "order tracking system",
//     "delivery status bd",
//     "power bank tracking",
//     "hypervolt order status",
//     "online gadget tracking",
//     "premium electronics delivery",
    
//     // Customer support
//     "power bank order help",
//     "tracking support bd",
//     "delivery inquiry bangladesh",
//     "order status support",
//     "electronics shipping tracking",
//     "charger delivery tracking",
    
//     // Local keywords
//     "track order dhaka",
//     "power bank tracking bangladesh",
//     "order status bangladesh",
//     "hypervolt delivery",
//     "electronics order tracking bd",
//     "premium gadget tracking",
    
//     // Power bank specific tracking
//     "power bank order tracking",
//     "charger delivery status",
//     "wireless charger tracking",
//     "fast charger order status",
//     "portable power delivery tracking",
//     "gadget accessories tracking",
    
//     // Customer service
//     "electronics customer support",
//     "order inquiry gadgets",
//     "delivery status electronics",
//     "power bank product tracking bd",
    
//     // Tech specific
//     "tech order tracking bangladesh",
//     "gadget order status bd",
//     "mobile accessories tracking",
//     "charging solutions delivery",
//     "power bank shipment tracking",
//     "courier status power bank bd"
//   ],
//   openGraph: {
//     title: "Track Your Orders - HyperVolt | Power Bank Delivery Tracking",
//     description: "Enter your phone number to track all your power bank and charger orders. Get real-time updates on delivery status and order progress from HyperVolt Bangladesh.",
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://hypervolt.com.bd/track',
//     siteName: "HyperVolt",
//     images: [
//       {
//         url: '/track-og-hypervolt.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Track Your Orders - HyperVolt Bangladesh',
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
//     title: "Track Your Orders | HyperVolt",
//     description: "Track all your power bank and charger orders with your phone number. Check delivery status and order updates.",
//     images: ['/track-twitter-hypervolt.jpg'],
//   },
//   alternates: {
//     canonical: '/track',
//     languages: {
//       'en': '/track',
//       'bn': '/bn/track',
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
//   // Additional metadata
//   other: {
//     'application-name': 'HyperVolt Track',
//     'msapplication-TileColor': '#06B6D4',
//     'theme-color': '#06B6D4',
//     'page-type': 'order-tracking',
//     'user-action': 'track-orders',
//     'service-type': 'order-tracking',
//     'product-category': 'Power Banks, Fast Chargers, Wireless Chargers, Cables, Adapters, Accessories',
    
//     // Tracking service info
//     'tracking-method': 'Phone Number',
//     'tracking-status': 'Real-time Updates',
//     'order-history': 'Available',
//     'delivery-updates': 'Live Tracking',
    
//     // Support information
//     'customer-support-phone': '+880123456789',
//     'customer-support-email': 'support@hypervolt.com',
//     'support-hours': '10:00 AM - 10:00 PM (Everyday)',
//     'tech-support': 'Available via Support',
    
//     // Business info
//     'business-name': 'HyperVolt Bangladesh',
//     'business-type': 'E-commerce Power Bank & Electronics Store',
//     'service-area': 'Nationwide Delivery',
//     'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    
//     // Delivery info
//     'delivery-time': '1-3 Business Days',
//     'free-delivery': 'Orders over 1500 BDT',
//     'cod-charge': 'Free for all orders',
//     'delivery-partners': 'Multiple Delivery Partners',
    
//     // Power bank specific
//     'authenticity-guarantee': '100% Genuine Products',
//     'quality-check': 'Pre-shipment Quality Check',
//     'warranty': '1 Year Official Warranty',
//     'battery-safety': 'Overcharge & Short Circuit Protection',
//     'satisfaction-guarantee': 'Money Back Guarantee',
    
//     // Product specs
//     'capacity-range': '10000mAh - 50000mAh',
//     'charging-technology': 'PD 3.0, QC 4.0, SuperVOOC, Wireless Charging',
//     'battery-type': 'Li-Polymer, Li-Ion',
//   },
// };

// // Generate JSON-LD structured data
// export const generateJsonLd = () => {
//   return {
//     '@context': 'https://schema.org',
//     '@type': 'WebPage',
//     '@id': process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://hypervolt.com.bd/track',
//     name: 'Track Your Orders - HyperVolt',
//     description: 'Track your power bank and charger orders easily with your phone number. Check order status, delivery updates, and tracking information.',
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://hypervolt.com.bd/track',
//     inLanguage: 'en',
//     about: {
//       '@type': 'Thing',
//       name: 'Order Tracking',
//       description: 'Track power banks, chargers, and electronics orders'
//     },
//     breadcrumb: {
//       '@type': 'BreadcrumbList',
//       itemListElement: [
//         {
//           '@type': 'ListItem',
//           position: 1,
//           name: 'Home',
//           item: process.env.NEXT_PUBLIC_BASE_URL || 'https://hypervolt.com.bd'
//         },
//         {
//           '@type': 'ListItem',
//           position: 2,
//           name: 'Track Orders',
//           item: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://hypervolt.com.bd/track'
//         }
//       ]
//     },
//     mainEntity: {
//       '@type': 'WebApplication',
//       name: 'HyperVolt Order Tracking System',
//       description: 'Track power bank, charger, and electronics orders by phone number',
//       applicationCategory: 'BusinessApplication',
//       operatingSystem: 'All',
//       browserRequirements: 'Requires modern browser'
//     }
//   };
// };

// // Server component with Suspense
// export default function TrackPage() {
//   // Generate JSON-LD
//   const jsonLd = generateJsonLd();
  
//   return (
//     <>
//       {/* JSON-LD Structured Data */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//       <Suspense fallback={<TrackLoading />}>
//         <TrackClient />
//       </Suspense>
//     </>
//   );
// }

// app/track/page.js
import { Suspense } from 'react';
import TrackClient from './TrackClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Track page
function TrackLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#2563EB]/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#2563EB]/20 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-64 bg-[#2563EB]/20 rounded mx-auto mt-3 animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Smart Gadget Track Page SEO Metadata
export const metadata = {
  title: "Track Your Orders - Smart Gadget | Gadget Delivery Tracking",
  description: "Track your smartphones, laptops, smartwatches, headphones and gadget orders easily with your phone number. Check order status, delivery updates, and tracking information for all your purchases from Smart Gadget Bangladesh.",
  keywords: [
    // Primary tracking keywords
    "track order bangladesh",
    "gadget order tracking",
    "smart gadget track",
    "order status check bd",
    "track my order",
    "electronics delivery tracking",
    "gadget delivery status",
    "online order tracking bd",
    
    // Delivery tracking
    "track order by phone",
    "bangladesh electronics delivery",
    "order tracking system",
    "delivery status bd",
    "smartphone order tracking",
    "laptop delivery tracking",
    "smartwatch order status",
    "headphones tracking bd",
    "gaming accessories delivery",
    "tech gadget tracking",
    
    // Customer support
    "gadget order help",
    "tracking support bd",
    "delivery inquiry bangladesh",
    "order status support",
    "electronics shipping tracking",
    "product delivery tracking",
    "order inquiry gadgets",
    "delivery status electronics",
    
    // Local keywords
    "track order dhaka",
    "gadget tracking bangladesh",
    "order status bangladesh",
    "smart gadget delivery",
    "electronics order tracking bd",
    "premium gadget tracking",
    "tech order tracking dhaka",
    "gadget shop delivery status",
    
    // Product specific tracking
    "smartphone order tracking",
    "laptop delivery status",
    "smartwatch order tracking",
    "headphones delivery tracking",
    "gaming gear order status",
    "accessories delivery tracking",
    "power bank order status",
    "charger delivery tracking",
    
    // Customer service
    "electronics customer support",
    "tech product order inquiry",
    "gadget accessories tracking",
    "premium electronics support",
    "brand warranty tracking",
    "authentic product tracking",
    
    // Tech specific
    "tech order tracking bangladesh",
    "gadget order status bd",
    "mobile accessories tracking",
    "smart home devices tracking",
    "gaming console delivery",
    "wearable tech tracking",
    "audio devices order status",
    
    // Courier & Logistics
    "courier status gadgets bd",
    "delivery partner tracking",
    "shipment tracking bangladesh",
    "order dispatch status",
    "out for delivery tracking",
    "cod order tracking",
    "online payment order status"
  ],
  openGraph: {
    title: "Track Your Orders - Smart Gadget | Gadget Order Tracking",
    description: "Enter your phone number to track all your gadget orders. Get real-time updates on delivery status and order progress from Smart Gadget Bangladesh.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://smartgadget.com.bd/track',
    siteName: "Smart Gadget",
    images: [
      {
        url: '/track-og-smartgadget.jpg',
        width: 1200,
        height: 630,
        alt: 'Track Your Orders - Smart Gadget Bangladesh',
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
    title: "Track Your Orders | Smart Gadget",
    description: "Track all your gadget orders with your phone number. Check delivery status and order updates for smartphones, laptops, smartwatches and more.",
    images: ['/track-twitter-smartgadget.jpg'],
  },
  alternates: {
    canonical: '/track',
    languages: {
      'en': '/track',
      'bn': '/bn/track',
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
  // Additional metadata
  other: {
    'application-name': 'Smart Gadget Track',
    'msapplication-TileColor': '#2563EB',
    'theme-color': '#2563EB',
    'page-type': 'order-tracking',
    'user-action': 'track-orders',
    'service-type': 'order-tracking',
    'product-category': 'Smartphones, Laptops, Smartwatches, Headphones, Gaming Accessories, Smart Home, Accessories, Power Banks, Chargers',
    
    // Tracking service info
    'tracking-method': 'Phone Number',
    'tracking-status': 'Real-time Updates',
    'order-history': 'Available',
    'delivery-updates': 'Live Tracking',
    'tracking-accuracy': 'High Precision',
    
    // Support information
    'customer-support-phone': '+880123456789',
    'customer-support-email': 'support@smartgadget.com.bd',
    'support-hours': '10:00 AM - 10:00 PM (Everyday)',
    'tech-support': 'Available via Support',
    'live-chat': 'Available',
    
    // Business info
    'business-name': 'Smart Gadget Bangladesh',
    'business-type': 'E-commerce Gadget & Electronics Store',
    'service-area': 'Nationwide Delivery',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'established': '2024',
    
    // Delivery info
    'delivery-time': '1-3 Business Days',
    'free-delivery': 'Orders over 3000 BDT',
    'cod-charge': 'Free for all orders',
    'delivery-partners': 'Multiple Delivery Partners',
    'same-day-delivery': 'Available in Dhaka',
    'express-delivery': 'Available',
    
    // Product guarantees
    'authenticity-guarantee': '100% Genuine Products',
    'quality-check': 'Pre-shipment Quality Check',
    'warranty': 'Official Brand Warranty Available',
    'satisfaction-guarantee': 'Money Back Guarantee',
    'return-policy': '7 Days Return Policy',
    
    // Product specs
    'brands-available': 'Apple, Samsung, Xiaomi, OnePlus, Realme, Lenovo, HP, ASUS, Dell, Acer, Sony, JBL, boAt',
    'technology': '5G, WiFi 6, Bluetooth 5.3, USB-C, Fast Charging, Wireless Charging',
    'operating-systems': 'Android, iOS, Windows, macOS, ChromeOS',
    'connectivity': 'Bluetooth, WiFi, NFC, USB-C, Lightning, 3.5mm Audio',
  },
};

// Generate JSON-LD structured data
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://smartgadget.com.bd/track',
    name: 'Track Your Orders - Smart Gadget',
    description: 'Track your gadget orders easily with your phone number. Check order status, delivery updates, and tracking information for smartphones, laptops, smartwatches, and more.',
    url: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://smartgadget.com.bd/track',
    inLanguage: 'en',
    about: {
      '@type': 'Thing',
      name: 'Order Tracking',
      description: 'Track gadgets, electronics, and accessories orders'
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartgadget.com.bd'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Track Orders',
          item: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://smartgadget.com.bd/track'
        }
      ]
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: 'Smart Gadget Order Tracking System',
      description: 'Track gadgets, smartphones, laptops, and electronics orders by phone number',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern browser',
      offers: {
        '@type': 'Offer',
        description: 'Order tracking service for gadget and electronics purchases',
        category: 'E-commerce Tracking',
        availability: 'https://schema.org/InStock',
        price: '0',
        priceCurrency: 'BDT'
      }
    }
  };
};

// Server component with Suspense
export default function TrackPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<TrackLoading />}>
        <TrackClient />
      </Suspense>
    </>
  );
}