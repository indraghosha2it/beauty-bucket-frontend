// app/product/[id]/page.js
import { Suspense } from 'react';
import ProductClient from './ProductClient';

// Loading fallback component for Smart Gadget product page
function ProductLoading() {
  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl py-4 sm:py-8 mt-16">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {/* Image Skeleton */}
            <div>
              <div className="bg-gradient-to-br from-[#EFF6FF] to-[#2563EB]/20 rounded-2xl h-64 sm:h-80 md:h-96"></div>
              <div className="flex gap-2 mt-3 sm:mt-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-[#2563EB]/20 rounded-lg"></div>
                ))}
              </div>
            </div>
            
            {/* Content Skeleton */}
            <div className="space-y-3 sm:space-y-4">
              <div className="h-6 sm:h-8 bg-[#2563EB]/30 rounded w-3/4"></div>
              <div className="h-4 sm:h-6 bg-[#2563EB]/20 rounded w-1/2"></div>
              <div className="h-16 sm:h-24 bg-[#2563EB]/20 rounded"></div>
              <div className="h-10 sm:h-12 bg-[#2563EB]/30 rounded w-full"></div>
              <div className="flex gap-3">
                <div className="h-8 sm:h-10 bg-[#2563EB]/20 rounded w-24"></div>
                <div className="h-8 sm:h-10 bg-[#2563EB]/20 rounded w-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Smart Gadget Product Details Page SEO Metadata
export const metadata = {
  title: "Premium Gadgets & Electronics | Smart Gadget Bangladesh",
  description: "Discover premium smartphones, laptops, smartwatches, headphones, gaming accessories at Smart Gadget. 100% authentic products with brand warranty. ✓COD ✓bKash/Nagad ✓Nationwide Delivery.",
  keywords: [
    // Primary
    "smart gadget bd",
    "premium gadget store bangladesh",
    "best electronics price bd",
    "online gadget shop bangladesh",
    "authentic tech products bd",
    "gadget store dhaka",
    
    // Smartphones
    "smartphone price in bangladesh",
    "best android phone bd",
    "iphone price bangladesh",
    "samsung galaxy price bd",
    "xiaomi mobile bangladesh",
    "oneplus price bd",
    "realme phone bangladesh",
    "vivo mobile price bd",
    "oppo phone bangladesh",
    "nothing phone bd",
    "google pixel bangladesh",
    "tecno mobile price bd",
    "infinix phone bangladesh",
    "itel price bd",
    
    // Laptops & Computers
    "laptop price in bangladesh",
    "gaming laptop bd",
    "macbook price bangladesh",
    "lenovo laptop price bd",
    "hp laptop bangladesh",
    "asus laptop price bd",
    "dell laptop bangladesh",
    "acer laptop price bd",
    "msi gaming laptop bangladesh",
    "razer laptop bd",
    "chromebook price bangladesh",
    "desktop pc price bd",
    "monitor price bangladesh",
    "all in one pc bd",
    
    // Smartwatches & Wearables
    "smartwatch price in bangladesh",
    "apple watch bd",
    "samsung galaxy watch price bd",
    "fitness tracker bangladesh",
    "huawei watch price bd",
    "amazfit smartwatch bangladesh",
    "noise smartwatch bd",
    "boAt smartwatch bangladesh",
    "fire boltt price bd",
    "fitbit bangladesh",
    "garmin watch bd",
    
    // Audio & Headphones
    "wireless headphones bangladesh",
    "best earbuds price bd",
    "sony headphones price bd",
    "boAt earbuds bangladesh",
    "jbl speaker price bd",
    "airpods price bangladesh",
    "gaming headset bd",
    "noise cancelling headphones bangladesh",
    "true wireless earbuds bd",
    "neckband price bangladesh",
    "bluetooth speaker bd",
    "soundbar price bangladesh",
    
    // Gaming Accessories
    "gaming accessories bangladesh",
    "gaming mouse price bd",
    "mechanical keyboard price bd",
    "gaming controller bangladesh",
    "gaming chair price bd",
    "rgb accessories bangladesh",
    "gaming monitor bd",
    "gaming headset price bangladesh",
    "gaming mouse pad bd",
    "streaming accessories bangladesh",
    
    // Smart Home
    "smart home devices bangladesh",
    "smart tv price bd",
    "security camera price bd",
    "smart bulb bangladesh",
    "robot vacuum price bd",
    "smart speaker bangladesh",
    "smart doorbell bd",
    "smart plug price bangladesh",
    "home automation bd",
    "smart lock price bd",
    
    // Accessories
    "phone accessories bangladesh",
    "phone cases bd",
    "screen protector price bd",
    "power bank price bangladesh",
    "fast charger bd",
    "data cable price bangladesh",
    "bluetooth speaker price bd",
    "selfie stick bangladesh",
    "tripod price bd",
    "gimbal stabilizer bangladesh",
    "vr headset price bd",
    
    // Smart Gadget Brand
    "smart gadget original price bd",
    "smart gadget smartphone bangladesh",
    "smart gadget laptop price bd",
    "smart gadget official store",
    "smart gadget product review",
    "smart gadget warranty bd",
    "smart gadget accessories",
    
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
    "sony electronics bd",
    "jbl audio bangladesh",
    "boAt lifestyle bd",
    
    // Shopping Intent
    "buy gadgets online bd",
    "best gadget price in dhaka",
    "authentic electronics bangladesh",
    "original tech products bd",
    "gadget shop bangladesh",
    "tech store dhaka bd",
    
    // Payment & Delivery
    "cod electronics bangladesh",
    "bkash payment gadgets",
    "nagad tech store",
    "free delivery gadgets dhaka",
    "warranty electronics bd",
    "brand warranty bangladesh",
    
    // Reviews & Ratings
    "best gadget review bd",
    "top rated electronics bangladesh",
    "customer reviews tech",
    "trusted electronics store",
    "gadget rating bangladesh"
  ],
  openGraph: {
    title: "Smart Gadget - Premium Gadgets & Electronics | Bangladesh's Trusted Tech Store",
    description: "Shop smartphones, laptops, smartwatches, headphones, gaming accessories & more. 100% authentic with brand warranty. ✓COD ✓bKash/Nagad ✓Free Delivery on 3000+ BDT",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/product' || 'https://smartgadget.com.bd/product',
    siteName: "Smart Gadget",
    images: [
      {
        url: '/product-og-smartgadget.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Gadget - Premium Gadgets and Electronics in Bangladesh',
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
    title: "Smart Gadget - Premium Gadgets & Electronics",
    description: "Discover premium smartphones, laptops, smartwatches, headphones, and gaming accessories. 100% authentic with brand warranty.",
    images: ['/product-twitter-smartgadget.jpg'],
  },
  alternates: {
    canonical: '/product',
    languages: {
      'en': '/product',
      'bn': '/bn/product',
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
  // Additional metadata for product pages
  other: {
    'application-name': 'Smart Gadget Products',
    'msapplication-TileColor': '#2563EB',
    'theme-color': '#2563EB',
    'page-type': 'product-details',
    'product-category': 'Smartphones, Laptops, Smartwatches, Headphones, Gaming Accessories, Smart Home, Accessories, Power Banks, Chargers',
    'authenticity': '100% Genuine Products',
    'warranty': 'Official Brand Warranty Available',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'delivery-time': '1-3 Business Days',
    'free-delivery': 'Orders over 3000 BDT',
    
    // Product Specifications
    'brands-available': 'Apple, Samsung, Xiaomi, OnePlus, Realme, Lenovo, HP, ASUS, Dell, Acer, Sony, JBL, boAt',
    'technology': '5G, WiFi 6, Bluetooth 5.3, USB-C, Fast Charging, Wireless Charging',
    'operating-systems': 'Android, iOS, Windows, macOS, ChromeOS',
    'connectivity': 'Bluetooth, WiFi, NFC, USB-C, Lightning, 3.5mm Audio',
    'safety-features': 'Overcharge Protection, Short Circuit Protection, Overheat Protection, Surge Protection',
    'durability': 'Premium Build Quality, Durable Design',
    'certification': 'CE, RoHS, FCC Certified',
    
    // Customer Service
    'customer-support': 'support@smartgadget.com.bd',
    'support-hours': '10:00 AM - 10:00 PM (Everyday)',
    'return-policy': '7 Days Return Policy',
    'satisfaction-guarantee': 'Money Back Guarantee',
    
    // Product Features
    'screen-size-range': '4.7" - 17.3"',
    'storage-range': '64GB - 2TB',
    'ram-range': '4GB - 64GB',
    'battery-range': '3000mAh - 100Wh',
    'processor-types': 'Intel Core, AMD Ryzen, Apple Silicon, MediaTek, Snapdragon',
    'display-types': 'OLED, AMOLED, IPS LCD, Mini-LED, Retina',
  },
};

// Generate JSON-LD structured data for Product page
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': process.env.NEXT_PUBLIC_BASE_URL + '/product' || 'https://smartgadget.com.bd/product',
        name: 'Product Details - Smart Gadget',
        description: 'View detailed information about our premium gadgets, electronics, and accessories.',
        url: process.env.NEXT_PUBLIC_BASE_URL + '/product' || 'https://smartgadget.com.bd/product',
        inLanguage: 'en',
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
              name: 'Products',
              item: process.env.NEXT_PUBLIC_BASE_URL + '/products' || 'https://smartgadget.com.bd/products'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Product Details',
              item: process.env.NEXT_PUBLIC_BASE_URL + '/product' || 'https://smartgadget.com.bd/product'
            }
          ]
        }
      },
      {
        '@type': 'Product',
        '@id': process.env.NEXT_PUBLIC_BASE_URL + '/product#product' || 'https://smartgadget.com.bd/product#product',
        name: 'Smart Gadget Premium Gadgets & Electronics',
        description: 'High-quality smartphones, laptops, smartwatches, headphones, and gaming accessories. 100% authentic with official brand warranty.',
        brand: {
          '@type': 'Brand',
          name: 'Smart Gadget'
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'BDT',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: '500',
            maxPrice: '200000',
            priceCurrency: 'BDT',
          },
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'Smart Gadget Bangladesh'
          }
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '500+',
          bestRating: '5',
          worstRating: '1'
        },
        review: {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '4.9',
            bestRating: '5'
          },
          author: {
            '@type': 'Person',
            name: 'Verified Customer'
          },
          reviewBody: 'Excellent quality gadgets with great features. Highly recommended!'
        },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Product Categories',
            value: 'Smartphones, Laptops, Smartwatches, Headphones, Gaming Accessories, Smart Home'
          },
          {
            '@type': 'PropertyValue',
            name: 'Brands Available',
            value: 'Apple, Samsung, Xiaomi, OnePlus, Realme, Lenovo, HP, ASUS, Dell, Acer, Sony, JBL, boAt'
          },
          {
            '@type': 'PropertyValue',
            name: 'Technology',
            value: '5G, WiFi 6, Bluetooth 5.3, USB-C, Fast Charging, Wireless Charging'
          },
          {
            '@type': 'PropertyValue',
            name: 'Operating Systems',
            value: 'Android, iOS, Windows, macOS, ChromeOS'
          },
          {
            '@type': 'PropertyValue',
            name: 'Warranty',
            value: 'Official Brand Warranty Available'
          },
          {
            '@type': 'PropertyValue',
            name: 'Connectivity',
            value: 'Bluetooth, WiFi, NFC, USB-C, Lightning, 3.5mm Audio'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': process.env.NEXT_PUBLIC_BASE_URL + '/product#faq' || 'https://smartgadget.com.bd/product#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Are Smart Gadget products authentic?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, all Smart Gadget products are 100% authentic and come with official brand warranty.'
            }
          },
          {
            '@type': 'Question',
            name: 'What types of products does Smart Gadget sell?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Smart Gadget sells premium smartphones, laptops, smartwatches, headphones, gaming accessories, smart home devices, and accessories from top brands like Apple, Samsung, Xiaomi, and more.'
            }
          },
          {
            '@type': 'Question',
            name: 'Do Smart Gadget products come with warranty?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, all products come with official brand warranty. Warranty period varies by product and brand.'
            }
          },
          {
            '@type': 'Question',
            name: 'What payment methods do you accept?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We accept Cash on Delivery, bKash, Nagad, Rocket, and Credit Card payments.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the delivery time for products?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Products are delivered within 1-3 business days across Bangladesh. Free delivery is available for orders over 3000 BDT.'
            }
          }
        ]
      }
    ]
  };
};

// Server component with Suspense
export default function ProductPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<ProductLoading />}>
        <ProductClient />
      </Suspense>
    </>
  );
}