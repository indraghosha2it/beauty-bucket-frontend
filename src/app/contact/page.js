// app/contact/page.js
import { Suspense } from 'react';
import ContactClient from './ContactClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Contact page
function ContactLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#EFF6FF] via-[#2563EB]/20 to-[#0F172A]/10 flex items-center justify-center">
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

// Smart Gadget Contact Us Page SEO Metadata
export const metadata = {
  title: "Contact Us | Get in Touch with Smart Gadget",
  description: "Contact Smart Gadget customer support for questions about smartphones, laptops, smartwatches, headphones, gaming accessories, orders, delivery, or warranty. Call, email, or visit us in Dhaka. We're here to help!",
  keywords: [
    // Contact specific
    "contact smart gadget",
    "gadget store customer care bd",
    "electronics support bangladesh",
    "smart gadget helpline",
    "customer service gadget bd",
    
    // Contact methods
    "gadget shop phone number",
    "smart gadget email address",
    "electronics store location dhaka",
    "customer care number smart gadget",
    "tech support bd",
    "gadget store helpline",
    
    // Support inquiries
    "smartphone order help",
    "laptop delivery support bangladesh",
    "smartwatch return contact",
    "product inquiry smart gadget",
    "warranty support electronics",
    "gaming accessories help",
    "audio device support bd",
    
    // Business inquiries
    "tech business contact",
    "gadget wholesale inquiry",
    "electronics supplier bangladesh",
    "partnership tech bd",
    "brand collaboration gadget",
    
    // Social media
    "smart gadget facebook",
    "smart gadget instagram",
    "tech store social media",
    "gadget store youtube",
    
    // Location
    "electronics store dhaka address",
    "gadget shop gulshan",
    "smart gadget office location",
    "tech store near me dhaka",
    "gadget showroom dhaka",
    
    // Tech specific
    "gadget consultation bd",
    "tech advice bangladesh",
    "smartphone help dhaka",
    "laptop support bd",
    "smartwatch inquiry bangladesh",
    
    // Customer service
    "gadget product support",
    "electronics helpline bd",
    "tech customer care",
    "smart gadget assistance",
    "tech expert help",
    "gadget support team",
    
    // Warranty & Service
    "smartphone warranty claim bd",
    "laptop repair dhaka",
    "battery replacement bangladesh",
    "tech service center bd",
    "smart gadget warranty support",
    "electronics repair service",
    "gadget maintenance bd",
    
    // Product categories
    "smartphone support bangladesh",
    "laptop service dhaka",
    "smartwatch help bd",
    "headphones support bangladesh",
    "gaming gear service",
    "smart home device support",
    "accessories help bd"
  ],
  openGraph: {
    title: "Contact Smart Gadget - We're Here to Help | Premium Gadget Store Bangladesh",
    description: "Need help with your gadget order? Have questions about smartphones, laptops, smartwatches, or warranty? Contact our friendly customer support team via phone, email, or visit our Dhaka store.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/contact' || 'https://smartgadget.com.bd/contact',
    siteName: "Smart Gadget",
    images: [
      {
        url: '/contact-og-smartgadget.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Smart Gadget - Customer Support for Premium Gadgets & Electronics',
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
    title: "Contact Smart Gadget | Customer Support",
    description: "Questions about gadgets, smartphones, laptops, or orders? Contact our friendly team. Call, email, or visit us in Dhaka.",
    images: ['/contact-twitter-smartgadget.jpg'],
  },
  alternates: {
    canonical: '/contact',
    languages: {
      'en': '/contact',
      'bn': '/bn/contact',
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
  // Contact page specific metadata
  other: {
    'application-name': 'Smart Gadget Contact',
    'msapplication-TileColor': '#2563EB',
    'theme-color': '#2563EB',
    'page-type': 'contact-us',
    'contact-email': 'support@smartgadget.com.bd',
    'contact-phone': '+8801234567890',
    'business-hours': 'Mon-Sat 9AM-9PM, Sun 10AM-6PM',
    'address-locality': 'Dhaka',
    'address-country': 'BD',
    'product-categories': 'Smartphones, Laptops, Smartwatches, Headphones, Gaming Accessories, Smart Home, Accessories, Power Banks, Chargers',
    'authenticity': '100% Genuine Products',
    'tech-consultation': 'Available via Chat & Phone',
    'customer-care-type': 'Tech Experts Support',
    'warranty-support': 'Official Brand Warranty Available',
    'service-available': 'Product Support, Warranty Claim, Product Exchange, Tech Consultation',
    'brands-available': 'Apple, Samsung, Xiaomi, OnePlus, Realme, Lenovo, HP, ASUS, Dell, Acer, Sony, JBL, boAt',
    'technology': '5G, WiFi 6, Bluetooth 5.3, USB-C, Fast Charging, Wireless Charging',
    'operating-systems': 'Android, iOS, Windows, macOS, ChromeOS',
    'connectivity': 'Bluetooth, WiFi, NFC, USB-C, Lightning, 3.5mm Audio',
    'return-policy': '7 Days Return Policy',
    'free-delivery': 'Free delivery over 3000 BDT',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
  },
};

// Generate JSON-LD structured data
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': process.env.NEXT_PUBLIC_BASE_URL + '/contact' || 'https://smartgadget.com.bd/contact',
    name: 'Contact Smart Gadget - Customer Support',
    description: 'Contact Smart Gadget customer support for questions about smartphones, laptops, smartwatches, headphones, gaming accessories, orders, delivery, or warranty.',
    url: process.env.NEXT_PUBLIC_BASE_URL + '/contact' || 'https://smartgadget.com.bd/contact',
    inLanguage: 'en',
    about: {
      '@type': 'Thing',
      name: 'Gadget Customer Support',
      description: 'Support for smartphones, laptops, smartwatches, headphones, gaming accessories, and electronics'
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
          name: 'Contact Us',
          item: process.env.NEXT_PUBLIC_BASE_URL + '/contact' || 'https://smartgadget.com.bd/contact'
        }
      ]
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'Smart Gadget Bangladesh',
      url: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartgadget.com.bd',
      email: 'support@smartgadget.com.bd',
      telephone: '+8801234567890',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Gulshan Avenue',
        addressLocality: 'Dhaka',
        addressRegion: 'Dhaka',
        postalCode: '1212',
        addressCountry: 'BD'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+8801234567890',
        contactType: 'customer service',
        availableLanguage: ['English', 'Bengali'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:00',
          closes: '21:00'
        }
      },
      sameAs: [
        'https://facebook.com/smartgadgetbd',
        'https://instagram.com/smartgadget.bd',
        'https://twitter.com/SmartGadgetBD',
        'https://youtube.com/smartgadgetbd'
      ],
      openingHours: ['Mo-Sa 09:00-21:00', 'Su 10:00-18:00']
    }
  };
};

// Server component with Suspense
export default function ContactPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<ContactLoading />}>
        <ContactClient />
      </Suspense>
    </>
  );
}