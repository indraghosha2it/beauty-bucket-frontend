// app/register/page.js
import { Suspense } from 'react';
import RegisterClient from './RegisterClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Register page
function RegisterLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <Footer />
    </>
  );
}

// Smart Gadget Register Page SEO Metadata
export const metadata = {
  title: "Create Account | Join Smart Gadget - Premium Tech Store Bangladesh",
  description: "Create your Smart Gadget account today! Get exclusive tech deals, track orders, save wishlist, and access premium gadgets. Join thousands of satisfied tech enthusiasts in Bangladesh.",
  keywords: [
    // Registration specific
    "create account smart gadget",
    "sign up gadget store bd",
    "register electronics bangladesh",
    "smart gadget account creation",
    "new customer registration tech",
    
    // Benefits
    "first purchase discount gadgets",
    "tech membership benefits",
    "premium gadget club bd",
    "gadget loyalty program",
    "exclusive tech deals members",
    
    // Account features
    "track gadget orders online",
    "save favorite electronics",
    "gadget wishlist account",
    "fast checkout gadgets",
    "tech purchase history",
    
    // User intent
    "join tech community bd",
    "become gadget member",
    "sign up for tech deals",
    "create electronics account bd",
    "register for gadget shopping",
    
    // Trust signals
    "safe gadget shopping account",
    "secure registration tech",
    "verified electronics store bd",
    "trusted gadget store",
    
    // Device specific
    "smartphone account registration",
    "laptop store sign up bd",
    "smartwatch account create",
    "headphones store register",
    "gaming gear sign up bd",
    
    // Local keywords
    "premium tech account bd",
    "gadget store registration",
    "electronics shopping account",
    "tech store member sign up"
  ],
  openGraph: {
    title: "Join Smart Gadget - Create Your Premium Tech Account | Bangladesh",
    description: "Sign up for Smart Gadget and get exclusive tech deals! Shop premium smartphones, laptops, smartwatches, headphones, gaming accessories & more. Official warranty & best prices.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/register' || 'https://smartgadget.com.bd/register',
    siteName: "Smart Gadget",
    images: [
      {
        url: '/register-og-smartgadget.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Gadget Register - Join Thousands of Tech Enthusiasts',
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
    title: "Join Smart Gadget - Create Your Account | Premium Tech Store Bangladesh",
    description: "Get exclusive tech deals! Track orders, save favorites, and access premium gadgets. Join thousands of satisfied tech enthusiasts today!",
    images: ['/register-twitter-smartgadget.jpg'],
  },
  alternates: {
    canonical: '/register',
    languages: {
      'en': '/register',
      'bn': '/bn/register',
    },
  },
  robots: {
    index: false,  // Registration pages should not be indexed
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Additional metadata
  other: {
    'application-name': 'Smart Gadget Registration',
    'msapplication-TileColor': '#2563EB',
    'theme-color': '#2563EB',
    'page-type': 'registration',
    'user-action': 'signup',
    'business-name': 'Smart Gadget Bangladesh',
    'business-type': 'E-commerce Gadget Store',
    'secure-registration': '256-bit SSL Encrypted',
    'welcome-offer': 'Exclusive Deals for New Members',
  },
};

// Generate JSON-LD structured data
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': process.env.NEXT_PUBLIC_BASE_URL + '/register' || 'https://smartgadget.com.bd/register',
    name: 'Register - Smart Gadget',
    description: 'Create your Smart Gadget account to shop premium gadgets and electronics.',
    url: process.env.NEXT_PUBLIC_BASE_URL + '/register' || 'https://smartgadget.com.bd/register',
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
          name: 'Register',
          item: process.env.NEXT_PUBLIC_BASE_URL + '/register' || 'https://smartgadget.com.bd/register'
        }
      ]
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: 'Customer Registration System',
      description: 'Create account to shop premium gadgets',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern browser'
    }
  };
};

// Server component with Suspense
export default function RegisterPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<RegisterLoading />}>
        <RegisterClient />
      </Suspense>
    </>
  );
}