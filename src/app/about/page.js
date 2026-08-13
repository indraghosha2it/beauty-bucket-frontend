import { Suspense } from 'react';
import AboutClient from './AboutClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for About page
function AboutLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#1E3A5F] via-[#2563EB] to-[#60A5FA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-white/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-white/20 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-64 bg-white/20 rounded mx-auto mt-3 animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Smart Gadget About Us Page SEO Metadata
export const metadata = {
  title: "About Smart Gadget | Bangladesh's Trusted Premium Gadget Store",
  description: "Learn about Smart Gadget - Bangladesh's premier online gadget store. We provide authentic smartphones, laptops, smartwatches, headphones, gaming accessories & electronics with official warranty and best prices.",
  keywords: [
    // About us specific
    "about smart gadget",
    "premium gadget store bangladesh",
    "electronics company bd",
    "smart gadget story",
    "gadget shop dhaka about",
    
    // Mission & values
    "tech company mission",
    "gadget store values",
    "authentic electronics bangladesh",
    "quality gadgets bd",
    "official warranty products",
    
    // Trust signals
    "why choose smart gadget",
    "trusted electronics store bd",
    "verified products bd",
    "genuine gadgets bangladesh",
    "premium tech store bd",
    
    // Team & milestones
    "smart gadget team",
    "tech company milestones",
    "electronics store journey bd",
    "gadget industry bangladesh",
    
    // Company info
    "online gadget store about",
    "tech product company bd",
    "electronics retailer bangladesh",
    "premium gadget store dhaka",
    "authorized tech seller bd",
    
    // Social proof
    "happy customers gadgets bd",
    "tech enthusiast bangladesh",
    "smart gadget reviews",
    "customer trust electronics bd",
    "satisfied buyers bd",
    "recommended tech store bd",
    
    // Additional keywords
    "best electronics price bd",
    "original products warranty bd",
    "certified tech seller bangladesh",
    "trusted gadget provider dhaka",
    "quality assurance electronics bd",
    "after sales service bd"
  ],
  openGraph: {
    title: "About Smart Gadget - Our Story | Premium Gadget Store Bangladesh",
    description: "Discover the Smart Gadget story. We're on a mission to provide authentic premium gadgets at the best prices across Bangladesh. Official warranty, quality assurance, and exceptional service.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/about' || 'https://smartgadget.com.bd/about',
    siteName: "Smart Gadget",
    images: [
      {
        url: '/about-og-smartgadget.jpg',
        width: 1200,
        height: 630,
        alt: 'About Smart Gadget - Bangladesh\'s Premium Gadget Store',
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
    title: "About Smart Gadget | Premium Gadget Store Bangladesh",
    description: "Learn about our mission to provide authentic premium gadgets with official warranty. Join 10,000+ satisfied customers!",
    images: ['/about-twitter-smartgadget.jpg'],
  },
  alternates: {
    canonical: '/about',
    languages: {
      'en': '/about',
      'bn': '/bn/about',
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
    'application-name': 'Smart Gadget About',
    'msapplication-TileColor': '#2563EB',
    'theme-color': '#2563EB',
    'page-type': 'about-us',
    'business-type': 'ecommerce-gadget-store',
    'founded-year': '2020',
    'headquarters': 'Dhaka, Bangladesh',
    'service-area': 'Nationwide Delivery',
    'product-categories': 'Smartphones, Laptops, Smartwatches, Audio, Gaming, Smart Home',
    'warranty': 'Official Brand Warranty Available',
    'authenticity': '100% Genuine Products',
    'certifications': 'Authorized Seller, Certified Tech Store',
    'employee-count': '50+',
    'customer-count': '10,000+ Satisfied Customers',
    'social-responsibility': 'Supporting Digital Bangladesh',
    'contact-email': 'support@smartgadget.com.bd',
    'contact-phone': '+880123456789',
    'business-hours': '10:00 AM - 10:00 PM (Everyday)',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
  },
};

// Server component with Suspense
export default function AboutPage() {
  return (
    <Suspense fallback={<AboutLoading />}>
      <AboutClient />
    </Suspense>
  );
}