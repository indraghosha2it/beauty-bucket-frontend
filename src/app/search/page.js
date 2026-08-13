// app/search/page.js
import { Suspense } from 'react';
import SearchClient from './SearchClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Search page
function SearchLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-blue-600/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-blue-600/20 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-64 bg-blue-600/20 rounded mx-auto mt-3 animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Smart Gadget Search Page SEO Metadata
export const metadata = {
  title: "Search Smart Gadgets ",
  description: "Search for premium smart gadgets, electronics, accessories, and tech products at Smart Gadget Bangladesh. Find the perfect gadget for your needs.",
  keywords: [
    "search smart gadgets bangladesh",
    "find electronics bd",
    "smart gadget search",
    "gadget finder",
    "search electronics bangladesh",
    "smart watch price in bd",
    "best smart watch bangladesh",
    "wireless earbuds price",
    "bluetooth headphones bangladesh",
    "smartphone accessories bd",
    "gadget store bangladesh",
    "tech accessories bd",
    "smart home devices bangladesh",
    "wearable tech bd",
    "fitness tracker price bangladesh",
    "smart band bangladesh",
    "tablet price bd",
    "power bank bangladesh",
    "fast charger bd",
    "usb cable bangladesh",
    "car charger price bd",
    "wireless charger bd",
    "smart gadget price",
    "original gadgets bangladesh",
    "premium gadget store",
    "authorized seller bd",
    "buy gadgets online bd",
    "cheapest gadgets bangladesh",
    "gadget shop near me",
    "electronics store dhaka",
    "tech accessories bangladesh",
    "gadget on sale bd",
    "discount gadgets bangladesh",
    "warranty gadgets bd",
    "cod gadgets bangladesh",
    "bkash payment electronics",
    "nagad payment gadgets",
    "free delivery gadgets",
    "smart gadget warranty",
    "1 year warranty gadgets"
  ],
  openGraph: {
    title: "Search Smart Gadgets & Electronics | Smart Gadget Bangladesh",
    description: "Find premium smart gadgets, electronics, accessories, and tech products. Search and discover the best gadgets at Smart Gadget Bangladesh.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/search' || 'https://smartproductbuy.com/search',
    siteName: "Smart Gadget",
    images: [
      {
        url: '/search-og-smartgadget.jpg',
        width: 1200,
        height: 630,
        alt: 'Search Smart Gadgets & Electronics - Smart Gadget Bangladesh',
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
    title: "Search Smart Gadgets & Electronics | Smart Gadget",
    description: "Find premium smart gadgets, electronics, and accessories. Search and discover the best tech products at Smart Gadget Bangladesh.",
    images: ['/search-twitter-smartgadget.jpg'],
  },
  alternates: {
    canonical: '/search',
    languages: {
      'en': '/search',
      'bn': '/bn/search',
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
  other: {
    'application-name': 'Smart Gadget Search',
    'msapplication-TileColor': '#2563EB',
    'theme-color': '#2563EB',
    'page-type': 'search-results',
    'user-action': 'search-products',
    'service-type': 'product-search',
    'product-categories': 'Smart Watches, Earbuds, Headphones, Power Banks, Chargers, Cables, Adapters, Accessories, Smart Home Devices, Wearables',
    'authenticity': '100% Genuine Products',
    'warranty': '1 Year Official Warranty',
    'search-capabilities': 'Product Name, Brand, Category, Features, Price Range',
    'gadget-types': 'Smart Watches, Wireless Earbuds, Bluetooth Headphones, Power Banks, Fast Chargers, Cables, Adapters',
    'technology': 'Bluetooth 5.0, Fast Charging, Wireless Charging, USB-C, PD 3.0, QC 4.0',
    'safety-features': 'Overcharge Protection, Short Circuit Protection, Overheat Protection, Surge Protection',
    'durability': 'Shockproof, Water-Resistant, Durable Design',
    'certification': 'CE, RoHS, FCC Certified',
    'search-method': 'Keyword Search',
    'filter-options': 'Price Range, Brand, Category, Rating',
    'sort-options': 'Relevance, Price Low to High, Price High to Low, Newest First',
    'result-count': 'Dynamic',
    'customer-support': 'support@smartgadget.com',
    'support-hours': '10:00 AM - 10:00 PM (Everyday)',
    'return-policy': '7 Days Return Policy',
    'satisfaction-guarantee': 'Money Back Guarantee',
  },
};

// Generate JSON-LD structured data for Search page
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': process.env.NEXT_PUBLIC_BASE_URL + '/search' || 'https://smartproductbuy.com/search',
    name: 'Search Smart Gadgets & Electronics - Smart Gadget',
    description: 'Search for premium smart gadgets, electronics, accessories, and tech products at Smart Gadget Bangladesh.',
    url: process.env.NEXT_PUBLIC_BASE_URL + '/search' || 'https://smartproductbuy.com/search',
    inLanguage: 'en',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Search',
          item: process.env.NEXT_PUBLIC_BASE_URL + '/search' || 'https://smartproductbuy.com/search'
        }
      ]
    },
    mainEntity: {
      '@type': 'SearchResultsPage',
      name: 'Smart Gadget Search Results',
      description: 'Search results for smart gadgets, electronics, and accessories',
      about: {
        '@type': 'Thing',
        name: 'Smart Gadget & Electronics Search',
        description: 'Search for smart gadgets, electronics, and tech accessories'
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: process.env.NEXT_PUBLIC_BASE_URL + '/search?q={search_term_string}' || 'https://smartproductbuy.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };
};

// Server component with Suspense
export default function SearchPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<SearchLoading />}>
        <SearchClient />  
      </Suspense>
    </>
  );
}