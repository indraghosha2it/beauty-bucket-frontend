// app/privacy/page.js
import { Suspense } from 'react';
import PrivacyClient from './PrivacyClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Privacy page
function PrivacyLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] via-[#EFF6FF] to-[#DBEAFE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#2563EB]/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#2563EB]/20 rounded mx-auto animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Smart Gadget Privacy Policy Page SEO Metadata
export const metadata = {
  title: "Privacy Policy | Protecting Your Personal & Gadget Information",
  description: "Read Smart Gadget's privacy policy to understand how we collect, use, and protect your personal information. Learn about data security, cookies, and your privacy rights in Bangladesh.",
  keywords: [
    // Privacy policy specific
    "privacy policy smart gadget",
    "electronics store privacy policy bd",
    "gadget data protection",
    "smart gadget privacy practices",
    "online tech store privacy bangladesh",
    
    // Data collection
    "personal information collection electronics",
    "customer data protection tech",
    "smartphone purchase privacy",
    "shopping data security electronics",
    "gadget store data collection",
    
    // Security measures
    "ssl encryption tech",
    "secure payment electronics bd",
    "data security gadget store",
    "smart gadget security policy",
    "encryption standards bd",
    
    // User rights
    "data access rights tech",
    "delete my data electronics",
    "opt out marketing smart gadget",
    "gdpr compliance tech bd",
    "ccpa rights bangladesh",
    
    // Cookies & tracking
    "cookie policy tech",
    "website tracking electronics",
    "analytics privacy gadget",
    "user tracking consent bd",
    
    // Tech specific privacy
    "device data privacy",
    "product preferences data",
    "gadget purchase history",
    "tech product recommendations privacy",
    "personalized gadget suggestions",
    
    // Device & product data
    "device compatibility data protection",
    "product usage information privacy",
    "tech consultation data",
    "electronic device data privacy",
    "gadget warranty data",
    
    // Legal compliance
    "data protection bangladesh tech",
    "privacy compliance electronics",
    "ccpa rights tech bd",
    "gdpr rights tech customers",
    "bangladesh data protection act",
    
    // Marketing & communications
    "tech newsletter privacy",
    "promotional emails privacy",
    "gadget offers data usage",
    "marketing consent tech",
    "email marketing opt out",
    
    // Smartphone specific
    "smartphone data protection",
    "mobile device privacy bd",
    "phone purchase data security",
    "device model privacy",
    
    // Laptop & computer
    "laptop data privacy",
    "computer purchase information",
    "tech device data protection",
    "product compatibility privacy",
    
    // Additional
    "smart gadget data security",
    "electronics customer privacy",
    "gadget data protection bd",
    "tech purchase privacy",
    "online gadget store privacy"
  ],
  openGraph: {
    title: "Privacy Policy - Smart Gadget | Your Tech Data Protection & Privacy Rights",
    description: "Learn how Smart Gadget protects your personal information. We're committed to transparent data practices, secure payments, and respecting your privacy rights in Bangladesh.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/privacy' || 'https://smartgadget.com.bd/privacy',
    siteName: "Smart Gadget",
    images: [
      {
        url: '/privacy-og-smartgadget.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Gadget Privacy Policy - Your Tech Data Protection',
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
    title: "Privacy Policy | Smart Gadget",
    description: "How we collect, use, and protect your personal information. Your privacy rights and tech data security explained.",
    images: ['/privacy-twitter-smartgadget.jpg'],
  },
  alternates: {
    canonical: '/privacy',
    languages: {
      'en': '/privacy',
      'bn': '/bn/privacy',
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
  // Privacy page specific metadata
  other: {
    'application-name': 'Smart Gadget Privacy',
    'msapplication-TileColor': '#2563EB',
    'theme-color': '#2563EB',
    'page-type': 'privacy-policy',
    'privacy-policy-version': '2.0',
    'last-updated': '2024-01-01',
    'data-controller': 'Smart Gadget Bangladesh',
    'privacy-contact': 'privacy@smartgadget.com.bd',
    'gdpr-compliant': 'true',
    'ccpa-compliant': 'true',
    'data-retention-period': '2 years',
    'cookie-policy': 'opt-in',
    
    // Tech specific data collection
    'data-collection-types': 'Name, Email, Phone, Address, Purchase History, Device Preferences, Product Interests',
    'sensitive-data': 'Device Type, Product Compatibility Preferences (Optional)',
    'data-usage': 'Order Processing, Product Recommendations, Marketing (with consent)',
    'third-party-sharing': 'Only with Delivery Partners and Payment Processors',
    
    // Security measures
    'encryption-standard': '256-bit SSL Encryption',
    'payment-security': 'PCI DSS Compliant',
    'data-storage': 'Secure Cloud Storage',
    'access-control': 'Role-Based Access Control',
    
    // User rights
    'rights-access': 'Access Personal Data',
    'rights-correction': 'Correct Inaccurate Data',
    'rights-deletion': 'Request Data Deletion',
    'rights-opt-out': 'Opt-out of Marketing',
    'rights-portability': 'Data Portability',
    
    // Children's privacy
    'children-privacy': 'COPPA Compliant',
    'age-restriction': '13+ with Parental Consent',
    'parental-consent': 'Required for Under 18',
    
    // Cookie policy
    'cookie-types': 'Essential, Analytics, Marketing (optional)',
    'cookie-retention': 'Session and Persistent',
    'third-party-cookies': 'Google Analytics, Social Media',
    
    // Tech marketing
    'marketing-consent': 'Explicit Opt-in Required',
    'email-marketing': 'Opt-out Available',
    'personalized-recommendations': 'Based on Purchase History',
    'tech-newsletters': 'Optional Subscription',
    
    // Gadget specific privacy
    'product-data': 'Product Preferences and Interests (Anonymous)',
    'device-compatibility': 'Device Model Information (Optional)',
    'product-preferences': 'Gadget Preferences (Optional)',
    'warranty-data': 'Warranty Registration Information',
    'product-feedback': 'Product Review and Feedback Data',
    
    // Smartphone specific
    'smartphone-data': 'Device Model, OS Version (Optional)',
    'mobile-preferences': 'Phone Preferences (Optional)',
    
    // Laptop & computer
    'laptop-data': 'Laptop Model, Specifications (Optional)',
    'computer-preferences': 'Computer Preferences (Optional)',
    
    // Legal compliance
    'compliance-standard': 'Bangladesh Data Protection Act',
    'international-compliance': 'GDPR, CCPA',
    'data-breach-notification': '72 Hours',
    'dispute-resolution': 'Customer Support + Regulatory',
    
    // Product safety
    'product-safety-data': 'Safety Certification Records',
    'quality-control': 'Quality Assurance Data',
    'gadget-safety': 'Product Safety Test Data',
    
    // Brands & products
    'brands-covered': 'Apple, Samsung, Xiaomi, OnePlus, Realme, Lenovo, HP, ASUS, Dell, Acer, Sony, JBL, boAt',
    'product-categories': 'Smartphones, Laptops, Smartwatches, Headphones, Gaming Accessories, Smart Home, Accessories',
  },
};

// Generate JSON-LD structured data for Privacy page
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': process.env.NEXT_PUBLIC_BASE_URL + '/privacy' || 'https://smartgadget.com.bd/privacy',
    name: 'Privacy Policy - Smart Gadget',
    description: 'Read Smart Gadget\'s privacy policy to understand how we collect, use, and protect your personal information.',
    url: process.env.NEXT_PUBLIC_BASE_URL + '/privacy' || 'https://smartgadget.com.bd/privacy',
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
          name: 'Privacy Policy',
          item: process.env.NEXT_PUBLIC_BASE_URL + '/privacy' || 'https://smartgadget.com.bd/privacy'
        }
      ]
    },
    mainEntity: {
      '@type': 'PrivacyPolicy',
      name: 'Smart Gadget Privacy Policy',
      description: 'This privacy policy explains how Smart Gadget collects, uses, and protects your personal information.',
      datePublished: '2024-01-01',
      dateModified: '2024-01-01',
      jurisdiction: 'Bangladesh',
      appliesTo: {
        '@type': 'Organization',
        name: 'Smart Gadget Bangladesh',
      },
      privacyPolicy: {
        '@type': 'CreativeWork',
        name: 'Smart Gadget Privacy Policy',
        text: 'Smart Gadget is committed to protecting your privacy. We collect personal information to process orders, provide customer service, and improve your shopping experience.',
      },
      dataCollection: {
        '@type': 'DataCollection',
        dataType: ['Personal Information', 'Purchase History', 'Product Preferences', 'Device Preferences'],
        method: 'User Provided, Automatic Collection',
        usage: 'Order Processing, Customer Service, Product Recommendations, Marketing (with consent)'
      },
      dataSecurity: {
        '@type': 'DataSecurity',
        description: 'We use 256-bit SSL encryption and PCI DSS compliant payment processing to protect your data.',
      },
      userRights: {
        '@type': 'DigitalDocument',
        name: 'User Rights',
        description: 'You have the right to access, correct, delete, and opt-out of marketing communications.',
      },
      productCategories: {
        '@type': 'ItemList',
        name: 'Product Categories Covered',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Smartphones' },
          { '@type': 'ListItem', position: 2, name: 'Laptops' },
          { '@type': 'ListItem', position: 3, name: 'Smartwatches' },
          { '@type': 'ListItem', position: 4, name: 'Headphones' },
          { '@type': 'ListItem', position: 5, name: 'Gaming Accessories' },
          { '@type': 'ListItem', position: 6, name: 'Smart Home Devices' },
        ]
      }
    },
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      name: 'Smart Gadget Bangladesh',
    }
  };
};

// Server component with Suspense
export default function PrivacyPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<PrivacyLoading />}>
        <PrivacyClient />
      </Suspense>
    </>
  );
}