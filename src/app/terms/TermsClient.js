
// // app/terms/page.js
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { 
//   FaShieldAlt, 
//   FaCheckCircle, 
//   FaArrowRight,
//   FaGavel,
//   FaFileContract,
//   FaUserShield,
//   FaCreditCard,
//   FaTruck,
//   FaShoppingBag,
//   FaHands,
//   FaClipboardList,
//   FaLock,
//   FaExclamationTriangle,
//   FaScroll,
//   FaBalanceScale,
//   FaGlobe,
//   FaDatabase,
//   FaUsers,
//   FaStore,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaBolt,
//   FaBatteryFull
// } from 'react-icons/fa';
// import { GiSparkles } from 'react-icons/gi';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Icon mapping for dynamic icons
// const ICON_MAP = {
//   FaFileContract: FaFileContract,
//   FaShoppingBag: FaShoppingBag,
//   FaCreditCard: FaCreditCard,
//   FaTruck: FaTruck,
//   FaHands: FaHands,
//   FaUserShield: FaUserShield,
//   FaLock: FaLock,
//   FaBalanceScale: FaBalanceScale,
//   FaExclamationTriangle: FaExclamationTriangle,
// };

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.1
//     }
//   }
// };

// export default function TermsPage() {
//   const [activeSection, setActiveSection] = useState(1);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [termsData, setTermsData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch terms data from backend
//   useEffect(() => {
//     const fetchTerms = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/terms`);
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch terms: ${response.status}`);
//         }
        
//         const data = await response.json();
        
//         if (data.success && data.data) {
//           setTermsData(data.data);
//         } else {
//           throw new Error('Invalid terms data structure');
//         }
//       } catch (err) {
//         console.error('Error fetching terms:', err);
//         setError(err.message);
//         // Set fallback data
//         setTermsData(getDefaultTermsData());
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTerms();
//   }, []);

//   // Default fallback data
//   const getDefaultTermsData = () => ({
//     heroTitle: 'Terms & Conditions',
//     heroDescription: 'Please read these terms carefully before using our services. They govern your use of HyperVolt\'s platform and services.',
//     introText: 'Welcome to HyperVolt. These Terms & Conditions ("Terms") govern your use of the HyperVolt website, mobile application, and all related services (collectively, the "Platform"). By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Platform.',
//     sections: [
//       {
//         id: 1,
//         title: 'Acceptance of Terms',
//         icon: 'FaFileContract',
//         description: 'By using HyperVolt\'s website and services, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please do not use our services.',
//         details: [
//           'These terms apply to all users of the HyperVolt platform',
//           'By placing an order, you accept these terms in full',
//           'We reserve the right to update these terms at any time',
//           'Continued use constitutes acceptance of updated terms'
//         ]
//       }
//     ],
//     lastUpdated: 'July 06, 2024'
//   });

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 100);
      
//       const sections = document.querySelectorAll('section[id^="section-"]');
//       let current = 1;
//       sections.forEach(section => {
//         const rect = section.getBoundingClientRect();
//         if (rect.top <= 150) {
//           const id = parseInt(section.id.replace('section-', ''));
//           if (!isNaN(id)) current = id;
//         }
//       });
//       setActiveSection(current);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Show loading state
//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <main className="min-h-screen bg-white -mt-16 flex items-center justify-center">
//           <div className="text-center">
//             <div className="inline-block w-8 h-8 border-4 border-[#06B6D4] border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-gray-500 mt-2 font-['Inter']">Loading terms...</p>
//           </div>
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   if (!termsData) {
//     return null;
//   }

//   const { heroTitle, heroDescription, introText, sections, lastUpdated } = termsData;

//   // Get icon component dynamically
//   const getIcon = (iconName) => {
//     const Icon = ICON_MAP[iconName];
//     if (!Icon) return FaFileContract;
//     return Icon;
//   };

//   return (
//     <>
//       <Navbar />
      
//       <main className="min-h-screen bg-white -mt-16">
//         {/* Hero Section - Gradient BG */}
//         <section className="relative overflow-hidden pt-4 pb-4 lg:pt-6 lg:pb-6 bg-gradient-to-r from-[#004767] via-[#006080] to-[#06B6D4]">
//           {/* Decorative Elements */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full filter blur-3xl"></div>
          
//           <div className="container mx-auto px-4 relative z-10">
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={fadeInUp}
//               className="text-center max-w-3xl mx-auto"
//             >
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-2 border border-white/20">
//                 <FaBolt className="w-3 h-3" />
//                 <span className="font-['Inter']">Legal</span>
//               </div>
//               <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight font-['Playfair_Display']">
//                 {heroTitle}
//               </h1>
//               <p className="text-xs text-white/80 leading-relaxed max-w-2xl mx-auto font-['Inter'] mt-1">
//                 {heroDescription}
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Main Content with Left Sidebar Navigation */}
//         <section className="py-6 lg:py-8 bg-[#F0F7FA]">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col lg:flex-row gap-6 relative">
              
//               {/* Left Sidebar - Sticky Navigation */}
//               <div className="lg:w-72 flex-shrink-0">
//                 <div className="lg:sticky lg:top-24 transition-all duration-300">
//                   <div className="bg-[#F0F7FA] rounded-2xl border border-[#DCE7EC]/20 p-4 lg:p-5">
//                     <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3 font-['Inter']">
//                       Jump to Section
//                     </h3>
//                     <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1 custom-scroll">
//                       {sections.map((section) => {
//                         const Icon = getIcon(section.icon);
//                         return (
//                           <a
//                             key={section.id}
//                             href={`#section-${section.id}`}
//                             onClick={(e) => {
//                               e.preventDefault();
//                               document.getElementById(`section-${section.id}`)?.scrollIntoView({
//                                 behavior: 'smooth'
//                               });
//                               setActiveSection(section.id);
//                             }}
//                             className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
//                               activeSection === section.id
//                                 ? 'bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white shadow-md shadow-[#06B6D4]/20'
//                                 : 'text-[#004767] hover:bg-[#06B6D4]/10 hover:text-[#06B6D4]'
//                             } font-['Inter']`}
//                           >
//                             <span className={activeSection === section.id ? 'text-white' : 'text-[#06B6D4]'}>
//                               <Icon className="w-5 h-5" />
//                             </span>
//                             <span className="truncate">{section.title}</span>
//                             {activeSection === section.id && (
//                               <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></span>
//                             )}
//                           </a>
//                         );
//                       })}
//                     </nav>
                    
//                     {/* Sidebar Footer */}
                  
//                   </div>
//                 </div>
//               </div>

//               {/* Right Content Area */}
//               <div className="flex-1 min-w-0">
//                 <motion.div
//                   initial="hidden"
//                   whileInView="visible"
//                   viewport={{ once: true }}
//                   variants={staggerContainer}
//                 >
//                   <motion.div variants={fadeInUp}>
//                     <p className="text-[#64748B] mb-6 font-['Inter'] text-sm lg:text-base">
//                       {introText}
//                     </p>
//                   </motion.div>

//                   {sections.map((section) => {
//                     const Icon = getIcon(section.icon);
//                     return (
//                       <motion.div
//                         key={section.id}
//                         variants={fadeInUp}
//                         id={`section-${section.id}`}
//                         className="mb-6 lg:mb-8 scroll-mt-24"
//                       >
//                         <div 
//                           className="group bg-[#F0F7FA]/30 rounded-2xl p-5 lg:p-7 border border-[#DCE7EC]/20 hover:border-[#06B6D4]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#06B6D4]/5"
//                         >
//                           {/* Header with Icon */}
//                           <div className="flex items-center gap-3 mb-3">
//                             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06B6D4]/10 to-[#004767]/10 flex items-center justify-center text-[#06B6D4] flex-shrink-0">
//                               <Icon className="w-5 h-5" />
//                             </div>
//                             <div>
//                               <h2 className="text-lg lg:text-xl font-bold text-[#004767] font-['Playfair_Display']">
//                                 {section.title}
//                               </h2>
//                               <span className="text-xs text-[#64748B] font-['Inter']">Section {String(section.id).padStart(2, '0')}</span>
//                             </div>
//                           </div>

//                           {/* Description */}
//                           <p className="text-sm lg:text-base text-[#64748B] leading-relaxed mb-3 font-['Inter']">
//                             {section.description}
//                           </p>

//                           {/* Details List */}
//                           <ul className="space-y-2">
//                             {section.details.map((detail, idx) => (
//                               <li key={idx} className="flex items-start gap-2 text-sm lg:text-base text-[#004767] font-['Inter']">
//                                 <FaCheckCircle className="w-4 h-4 text-[#06B6D4] mt-0.5 flex-shrink-0" />
//                                 <span>{detail}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </motion.div>
//                     );
//                   })}

//                   {/* Important Notice */}
//                   <motion.div variants={fadeInUp} className="bg-gradient-to-r from-[#06B6D4]/10 to-[#004767]/10 rounded-2xl p-6 lg:p-8 border border-[#DCE7EC]/20 mt-6">
//                     <div className="flex items-start gap-3">
//                       <div className="w-10 h-10 rounded-full bg-[#06B6D4]/20 flex items-center justify-center flex-shrink-0">
//                         <FaExclamationTriangle className="w-5 h-5 text-[#06B6D4]" />
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-bold text-[#004767] font-['Playfair_Display'] mb-2">Important Notice</h3>
//                         <p className="text-sm text-[#64748B] leading-relaxed font-['Inter']">
//                           These Terms & Conditions are a legal agreement between you and HyperVolt. 
//                           By using our Platform, you acknowledge that you have read, understood, and agree to 
//                           be bound by these Terms. If you have any questions, please contact our support team.
//                         </p>
//                         <div className="flex flex-wrap gap-3 mt-4">
//                           <Link 
//                             href="/contact" 
//                             className="inline-flex items-center gap-2 text-[#06B6D4] hover:text-[#0891B2] font-medium text-sm font-['Inter']"
//                           >
//                             Contact Us
//                             <FaArrowRight className="w-3 h-3" />
//                           </Link>
//                           <Link 
//                             href="/privacy" 
//                             className="inline-flex items-center gap-2 text-[#06B6D4] hover:text-[#0891B2] font-medium text-sm font-['Inter']"
//                           >
//                             Privacy Policy
//                             <FaArrowRight className="w-3 h-3" />
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section - HyperVolt Theme */}
//         <section className="relative py-12 lg:py-16 overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-[#004767] to-[#06B6D4]"></div>
//           <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
          
//           <div className="container mx-auto px-4 relative z-10">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={fadeInUp}
//               className="text-center max-w-2xl mx-auto"
//             >
//               <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FaBolt className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 font-['Playfair_Display']">
//                 Have Questions About Our Terms?
//               </h2>
//               <p className="text-white/80 text-base lg:text-lg mb-6 font-['Inter']">
//                 Our team is here to help you understand our policies and ensure your experience is seamless.
//               </p>
//               <div className="flex flex-wrap gap-4 justify-center">
//                 <Link href="/contact">
//                   <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 bg-white text-[#004767] rounded-xl hover:shadow-lg hover:shadow-black/25 transition-all font-medium hover:-translate-y-0.5 font-['Inter']">
//                     Contact Support
//                     <FaArrowRight className="w-4 h-4" />
//                   </button>
//                 </Link>
//                 <Link href="/products">
//                   <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all font-medium hover:-translate-y-0.5 font-['Inter']">
//                     Start Shopping
//                     <FaShoppingBag className="w-4 h-4" />
//                   </button>
//                 </Link>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//       </main>

//       <Footer />

//       <style jsx>{`
//         .custom-scroll::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scroll::-webkit-scrollbar-track {
//           background: #F0F7FA;
//           border-radius: 10px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #06B6D4, #004767);
//           border-radius: 10px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #0891B2, #003a5a);
//         }
//       `}</style>
//     </>
//   );
// }
// app/terms/page.jsx
'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  Mail,
  Phone,
  Clock,
  ArrowRight,
  Sparkles,
  FileText,
  CheckCircle,
  Users,
  ShoppingBag,
  Truck,
  RefreshCw,
  AlertCircle,
  Scale,
  Gavel,
  Package,
  CreditCard,
  MapPin,
  Globe,
  Loader2
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Icon mapping for dynamic icons
const ICON_MAP = {
  FaFileContract: FileText,
  FaShoppingBag: ShoppingBag,
  FaCreditCard: CreditCard,
  FaTruck: Truck,
  FaHands: RefreshCw,
  FaUserShield: Shield,
  FaLock: Shield,
  FaBalanceScale: Scale,
  FaExclamationTriangle: AlertCircle,
  Scale: Scale,
  Users: Users,
  Gavel: Gavel,
  Package: Package,
  Globe: Globe,
  AlertCircle: AlertCircle
};

const getIcon = (iconName) => {
  const Icon = ICON_MAP[iconName];
  return Icon || FileText;
};

export default function TermsPage() {
  const [termsData, setTermsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const heroRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Default data with images
  const defaultData = {
    heroTitle: 'Terms & Conditions',
    heroDescription: 'Please read these terms carefully before using our website and services. By accessing our platform, you agree to be bound by these terms.',
    introText: 'Welcome to Smart Gadget. These Terms & Conditions govern your use of our website and services.',
    heroImage: 'https://i.ibb.co.com/XkF8TGQZ/jn.png',
    ctaImage: 'https://i.ibb.co.com/0RHQ0thP/jh.png',
    sections: [
      {
        title: 'Acceptance of Terms',
        icon: 'FaFileContract',
        description: 'By using Smart Gadget\'s website and services, you agree to these Terms & Conditions',
        details: [
          'If you do not agree with any part of these terms, please do not use our platform',
          'We reserve the right to update these terms at any time without prior notice',
          'Continued use of our services constitutes acceptance of any changes'
        ],
        isActive: true
      },
      {
        title: 'Account Registration',
        icon: 'FaUserShield',
        description: 'You must be at least 18 years old to create an account or make purchases',
        details: [
          'Provide accurate, complete, and up-to-date registration information',
          'You are responsible for maintaining the confidentiality of your account credentials',
          'Notify us immediately of any unauthorized use of your account'
        ],
        isActive: true
      },
      {
        title: 'Products & Pricing',
        icon: 'FaShoppingBag',
        description: 'We strive to display accurate product descriptions, images, and specifications',
        details: [
          'Prices are listed in Bangladeshi Taka (BDT) and include applicable VAT',
          'We reserve the right to modify prices, products, or availability without notice',
          'In case of pricing errors, we may cancel or refuse orders at our discretion'
        ],
        isActive: true
      },
      {
        title: 'Orders & Payment',
        icon: 'FaCreditCard',
        description: 'All orders are subject to acceptance and product availability',
        details: [
          'We accept bKash, Nagad, credit/debit cards, and cash on delivery',
          'Payment must be received in full before order processing begins',
          'We reserve the right to cancel orders suspected of fraud or unauthorized activity'
        ],
        isActive: true
      },
      {
        title: 'Shipping & Delivery',
        icon: 'FaTruck',
        description: 'We offer delivery services across all districts of Bangladesh',
        details: [
          'Estimated delivery times are provided as guidelines and are not guaranteed',
          'Risk of loss or damage passes to you upon delivery of the products',
          'Please inspect your order immediately and report any issues within 48 hours'
        ],
        isActive: true
      },
      {
        title: 'Returns & Refunds',
        icon: 'FaHands',
        description: 'You may return most items within 7 days of delivery for a full refund or exchange',
        details: [
          'Items must be unused, in original packaging, and with proof of purchase',
          'Certain items (e.g., opened electronics, personalized items) are non-returnable',
          'Refunds will be processed within 5-7 business days of receiving returned items'
        ],
        isActive: true
      },
      {
        title: 'Intellectual Property',
        icon: 'FaLock',
        description: 'All content on this site (text, graphics, logos, images, software) is our property',
        details: [
          'Content is protected by Bangladesh and international copyright laws',
          'You may not reproduce, distribute, or create derivative works without permission',
          'Trademarks and service marks displayed on our site are our registered property'
        ],
        isActive: true
      },
      {
        title: 'Limitation of Liability',
        icon: 'FaExclamationTriangle',
        description: 'Smart Gadget is not liable for indirect, incidental, or consequential damages',
        details: [
          'Our total liability is limited to the purchase price of the product in question',
          'We are not responsible for delays or failures caused by circumstances beyond our control',
          'Some jurisdictions do not allow limitations on liability, so this may not apply to you'
        ],
        isActive: true
      },
      {
        title: 'Governing Law & Disputes',
        icon: 'FaBalanceScale',
        description: 'These terms are governed by the laws of the People\'s Republic of Bangladesh',
        details: [
          'Any disputes shall be subject to the exclusive jurisdiction of courts in Dhaka',
          'Disputes may first be attempted to be resolved through informal negotiations',
          'If mediation fails, disputes will be settled through binding arbitration'
        ],
        isActive: true
      }
    ],
    lastUpdated: 'August 4, 2026'
  };

  // Fetch terms data from backend
  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        console.log('📡 Fetching terms from:', `${apiUrl}/api/terms`);

        const response = await fetch(`${apiUrl}/api/terms`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('📡 Response status:', response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch terms: ${response.status}`);
        }

        const result = await response.json();
        console.log('📦 Full API response:', result);

        if (result.success && result.data) {
          const activeSections = result.data.sections || [];
          
          const mergedData = {
            heroTitle: result.data.heroTitle || defaultData.heroTitle,
            heroDescription: result.data.heroDescription || defaultData.heroDescription,
            introText: result.data.introText || defaultData.introText,
            heroImage: result.data.heroImage || defaultData.heroImage,
            ctaImage: result.data.ctaImage || defaultData.ctaImage,
            sections: activeSections.length > 0 ? activeSections : defaultData.sections,
            lastUpdated: result.data.lastUpdated || defaultData.lastUpdated
          };

          console.log('🔄 Merged data:', mergedData);
          setTermsData(mergedData);
        } else {
          console.warn('⚠️ Invalid response structure, using default data');
          setTermsData(defaultData);
        }
      } catch (err) {
        console.error('❌ Error fetching terms:', err);
        setTermsData(defaultData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTermsData();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-500 mt-2">Loading terms...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const data = termsData || defaultData;
  const { heroTitle, heroDescription, heroImage, ctaImage, sections, lastUpdated } = data;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* ============================================
        HERO SECTION - Using heroImage from backend
        ============================================ */}
        <section 
          ref={heroRef}
          className="relative min-h-[200px] sm:min-h-[280px] md:min-h-[300px] overflow-hidden"
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${heroImage || 'https://i.ibb.co.com/XkF8TGQZ/jn.png'}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10" />

          <div className="absolute -top-20 -right-20 w-36 h-36 md:w-64 md:h-64 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-36 h-36 md:w-64 md:h-64 bg-purple-600/15 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 max-w-7xl relative z-10 h-full flex items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="w-full max-w-4xl mx-auto text-center py-4 md:py-8"
            >
              <motion.div 
                variants={itemVariants} 
                className="inline-flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4 border border-white/10"
              >
                <FileText className="w-2.5 h-2.5 md:w-4 md:h-4 text-blue-400" />
                <span className="text-[8px] md:text-xs lg:text-sm font-medium text-gray-300">Terms & Conditions</span>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1.5 md:mb-3 leading-tight"
              >
                <span className="text-white">Terms &</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  Conditions
                </span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-gray-300 text-[10px] sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2"
              >
                {heroDescription || 'Please read these terms carefully before using our website and services. By accessing our platform, you agree to be bound by these terms.'}
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center mt-3 md:mt-6"
              >
                <a href="#terms-policy">
                  <button className="group bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 py-1.5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-blue-600/30 text-[9px] sm:text-sm md:text-base whitespace-nowrap">
                    Read Full Policy
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </a>
                <Link href="/contact">
                  <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-3 sm:px-5 py-1.5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-semibold transition-all text-[9px] sm:text-sm md:text-base whitespace-nowrap">
                    Contact Support
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================
        TERMS & CONDITIONS CONTENT
        ============================================ */}
        <section id="terms-policy" className="py-6 md:py-14 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6 md:mb-12"
            >
              <div className="inline-flex items-center gap-1.5 md:gap-2 bg-blue-100 rounded-full px-2.5 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4">
                <Gavel className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                <span className="text-[8px] md:text-sm font-medium text-blue-700">Legal Agreement</span>
              </div>
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Our Terms & Conditions
              </h2>
              <p className="text-gray-500 text-[10px] sm:text-sm md:text-base mt-1.5 md:mt-2 max-w-2xl mx-auto px-4">
                Last updated: {lastUpdated || 'August 4, 2026'} — These terms govern your use of our website and services.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
              {sections && sections.length > 0 ? sections.map((section, idx) => {
                const Icon = getIcon(section.icon);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    className="group bg-white rounded-lg md:rounded-2xl p-4 md:p-6 lg:p-8 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-2.5 md:gap-4">
                      <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                        <Icon className="w-4 h-4 md:w-6 md:h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 md:mb-3">
                          {section.title}
                        </h3>
                        {section.description && (
                          <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-2 md:mb-3 leading-relaxed">
                            {section.description}
                          </p>
                        )}
                        <ul className="space-y-1 md:space-y-2">
                          {section.details && section.details.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-base text-gray-600">
                              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              }) : (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  No terms sections available.
                </div>
              )}
            </div>

            {/* Additional Important Clauses */}
          

            {/* Contact for Disputes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 md:mt-6 bg-blue-50 rounded-lg md:rounded-2xl p-4 md:p-8 lg:p-10 border border-blue-200"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
                <div className="flex items-start gap-2.5 md:gap-4 w-full sm:w-auto">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-100 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-lg lg:text-xl font-bold text-gray-900">
                      Have Questions or Disputes?
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-base text-gray-600 leading-relaxed">
                      We aim to resolve all issues fairly and promptly. Please contact our legal team 
                      for any concerns regarding these terms or your rights as a customer.
                    </p>
                  </div>
                </div>
                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                    Contact Legal Team
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================
        CTA BANNER - Using ctaImage from backend
        ============================================ */}
        <section className="relative py-8 md:py-14 lg:py-20 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${ctaImage || 'https://i.ibb.co.com/0RHQ0thP/jh.png'}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute -top-20 -right-20 w-36 h-36 md:w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-36 h-36 md:w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

          <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4 border border-white/10">
                <Sparkles className="w-2.5 h-2.5 md:w-4 md:h-4 text-blue-400" />
                <span className="text-[8px] md:text-xs font-medium text-gray-300">Agreement</span>
              </div>
              
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-1.5 md:mb-4 leading-tight">
                Ready to Shop with Confidence?
              </h2>
              
              <p className="text-gray-200 text-[10px] sm:text-sm md:text-base mb-4 md:mb-8 max-w-2xl mx-auto px-4">
                Browse our collection of premium gadgets and enjoy a secure shopping experience with clear terms.
              </p>
              
              <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
                <Link href="/products">
                  <button className="group bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-1.5 md:gap-2 shadow-lg shadow-blue-600/30 transition-all text-[10px] sm:text-sm md:text-base">
                    Explore Products
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/privacy">
                  <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-4 py-1.5 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-1.5 md:gap-2 transition-all text-[10px] sm:text-sm md:text-base">
                    View Privacy Policy
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}