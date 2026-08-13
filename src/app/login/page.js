// app/login/page.js
import { Suspense } from 'react';
import LoginClient from './LoginClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Login page
function LoginLoading() {
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

// Smart Gadget Login Page SEO Metadata
export const metadata = {
  title: "Login to Smart Gadget | Sign In for Premium Gadgets in Bangladesh",
  description: "Login to your Smart Gadget account to shop premium smartphones, laptops, smartwatches, headphones & more. Track orders, save wishlist, and get exclusive tech deals.",
  keywords: [
    // Login specific
    "login smart gadget",
    "sign in gadget store bd",
    "customer login bangladesh",
    "smart gadget account access",
    "member login gadgets",
    
    // Account related
    "my gadget account",
    "tech shopping login",
    "electronics account bd",
    "premium gadgets login",
    "smart gadget member sign in",
    
    // Benefits
    "track gadget orders",
    "save wishlist login",
    "exclusive tech deals",
    "gadget discount for members",
    "tech purchase discount",
    
    // Authentication
    "secure login gadgets",
    "electronics store authentication",
    "online gadget shop login bd",
    "smart gadget customer portal",
    
    // User intent
    "access my gadget account",
    "login to buy electronics online",
    "tech shopping account bd",
    "gadget store sign in",
    
    // Device specific
    "smartphone account login",
    "laptop store login bd",
    "smartwatch account access",
    "headphones store sign in",
    "gaming gear login bd",
    
    // Local keywords
    "login bd gadget store",
    "premium electronics account",
    "tech store customer login",
    "gadget shopping account bd"
  ],
  openGraph: {
    title: "Login to Smart Gadget - Your Premium Tech Account | Bangladesh",
    description: "Sign in to your Smart Gadget account to shop premium smartphones, laptops, smartwatches, headphones, gaming accessories & more. Official warranty & best prices!",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/login' || 'https://smartgadget.com.bd/login',
    siteName: "Smart Gadget",
    images: [
      {
        url: '/login-og-smartgadget.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Gadget Login - Sign in to Your Premium Tech Account',
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
    title: "Login to Smart Gadget | Premium Tech Store Bangladesh",
    description: "Sign in to access your gadget account, track orders, save favorites, and get exclusive member deals!",
    images: ['/login-twitter-smartgadget.jpg'],
  },
  alternates: {
    canonical: '/login',
    languages: {
      'en': '/login',
      'bn': '/bn/login',
    },
  },
  robots: {
    index: false,  // Login pages should not be indexed
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
    'application-name': 'Smart Gadget Login',
    'msapplication-TileColor': '#2563EB',
    'theme-color': '#2563EB',
    'page-type': 'login',
    'user-action': 'authentication',
    'business-name': 'Smart Gadget Bangladesh',
    'business-type': 'E-commerce Gadget Store',
    'secure-login': '256-bit SSL Encrypted',
    'session-timeout': '7 days',
  },
};

// Generate JSON-LD structured data
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': process.env.NEXT_PUBLIC_BASE_URL + '/login' || 'https://smartgadget.com.bd/login',
    name: 'Login - Smart Gadget',
    description: 'Login to your Smart Gadget account to shop premium gadgets and electronics.',
    url: process.env.NEXT_PUBLIC_BASE_URL + '/login' || 'https://smartgadget.com.bd/login',
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
          name: 'Login',
          item: process.env.NEXT_PUBLIC_BASE_URL + '/login' || 'https://smartgadget.com.bd/login'
        }
      ]
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: 'Customer Login System',
      description: 'Login to access your gadget account',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern browser'
    }
  };
};

// Server component with Suspense
export default function LoginPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<LoginLoading />}>
        <LoginClient />
      </Suspense>
    </>
  );
}