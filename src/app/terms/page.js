import { Suspense } from 'react';
import TermsClient from './TermsClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Terms page
function TermsLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] to-[#DBEAFE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#2563EB]/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#2563EB]/20 rounded mx-auto animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Smart Gadget Terms & Conditions Page SEO Metadata
export const metadata = {
  title: "Terms & Conditions - Smart Gadget | Legal Terms for Electronics Purchase",
  description: "Read Smart Gadget's terms and conditions for online electronics purchases in Bangladesh. Learn about pricing, shipping, returns, warranty, and legal policies for premium gadgets.",
  keywords: [
    // Legal terms specific
    "terms and conditions smart gadget",
    "gadget store legal terms bd",
    "electronics purchase terms",
    "smart gadget policies",
    "online electronics store terms bangladesh",
    "legal terms electronics bd",
    
    // Purchase terms
    "gadget purchase agreement",
    "tech products terms bd",
    "smart gadget return policy",
    "electronics warranty terms",
    "refund policy gadgets",
    "consumer electronics terms",
    
    // Shipping terms
    "gadget delivery terms",
    "shipping policy electronics bd",
    "cod terms gadgets",
    "smart gadget shipping policy",
    "electronics delivery policy bd",
    "express delivery terms",
    
    // Payment terms
    "gadget payment terms",
    "bkash payment policy",
    "nagad payment terms",
    "electronics pricing policy",
    "emi payment terms bd",
    "credit card payment policy",
    
    // Warranty & Service
    "electronics warranty policy",
    "gadget repair policy",
    "warranty claim terms bd",
    "after sales service policy",
    "tech support terms",
    "official warranty terms",
    
    // Legal compliance
    "electronics safety compliance",
    "consumer rights electronics bd",
    "product liability gadgets",
    "smart gadget legal information",
    "import compliance bd",
    "electronics standards bd",
    
    // Account terms
    "user account terms",
    "customer agreement electronics",
    "smart gadget account policy",
    "tech buyer agreement",
    
    // Privacy & Security
    "privacy policy gadgets",
    "data protection electronics bd",
    "secure transaction terms",
    "customer data policy bd",
    
    // Additional
    "consumer protection bd",
    "digital commerce terms",
    "online purchase policy bd",
    "gadget buyer protection",
    "electronics transaction terms"
  ],
  openGraph: {
    title: "Terms & Conditions - Smart Gadget | Legal Information for Electronics Purchases",
    description: "Review Smart Gadget's complete terms and conditions. Understand our policies on pricing, shipping, returns, warranty, privacy, and customer responsibilities for premium gadgets.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/terms' || 'https://smartgadget.com.bd/terms',
    siteName: "Smart Gadget",
    images: [
      {
        url: '/terms-og-smartgadget.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Gadget Terms & Conditions - Legal Information for Electronics',
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
    title: "Terms & Conditions | Smart Gadget",
    description: "Read Smart Gadget's terms for online electronics purchases in Bangladesh. Pricing, shipping, returns, warranty, and privacy policies.",
    images: ['/terms-twitter-smartgadget.jpg'],
  },
  alternates: {
    canonical: '/terms',
    languages: {
      'en': '/terms',
      'bn': '/bn/terms',
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
  // Terms page specific metadata
  other: {
    'application-name': 'Smart Gadget Terms',
    'msapplication-TileColor': '#2563EB',
    'theme-color': '#2563EB',
    'page-type': 'legal-terms',
    'last-updated': '2024-01-01',
    'jurisdiction': 'Bangladesh',
    'legal-entity': 'Smart Gadget BD',
    'company-registration': 'Registered in Bangladesh',
    'tax-id': 'TIN: 123456789',
    
    // Policy details
    'return-policy-period': '7 Days',
    'warranty-policy': 'Official Brand Warranty',
    'refund-policy': 'Within 7-14 business days',
    'replacement-policy': 'Within 7 days of delivery',
    'repair-policy': 'Warranty terms apply',
    
    // Consumer rights
    'consumer-protection': 'Bangladesh Consumer Rights Act',
    'dispute-resolution': 'Mediation and Arbitration',
    'governing-law': 'Laws of Bangladesh',
    
    // Shipping policy
    'shipping-policy': 'Nationwide Delivery',
    'delivery-time': '1-3 business days',
    'free-delivery': 'Orders over 3000 BDT',
    'shipping-charges': 'As per delivery location',
    'cod-charge': 'Free for all orders',
    
    // Payment policy
    'accepted-payments': 'COD, bKash, Nagad, Rocket, Credit Card',
    'payment-security': '256-bit SSL Encrypted',
    'refund-processing': '5-7 business days',
    
    // Warranty details
    'warranty-type': 'Official Manufacturer Warranty',
    'warranty-period': 'Brand-dependent (6-24 months)',
    'warranty-service': 'Service Center Support',
    'free-service': 'Within warranty period',
    
    // Data protection
    'privacy-policy': 'Data Protection Compliant',
    'data-collection': 'Order & Delivery Information Only',
    'data-sharing': 'Not shared with third parties',
    'data-security': 'Encrypted Storage',
    
    // Additional
    'business-hours': '10:00 AM - 10:00 PM (Everyday)',
    'customer-support': 'support@smartgadget.com.bd',
    'emergency-contact': '+880123456789',
    'terms-version': 'v2.0',
    'effective-date': 'January 1, 2024',
  },
};

// Server component with Suspense
export default function TermsPage() {
  return (
    <Suspense fallback={<TermsLoading />}>
      <TermsClient />
    </Suspense>
  );
}