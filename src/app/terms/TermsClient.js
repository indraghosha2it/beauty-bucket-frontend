
// // app/terms/page.jsx
// 'use client';

// import { motion } from 'framer-motion';
// import { useRef, useEffect, useState } from 'react';
// import Link from 'next/link';
// import {
//   Shield,
//   Mail,
//   Phone,
//   Clock,
//   ArrowRight,
//   Sparkles,
//   FileText,
//   CheckCircle,
//   Users,
//   ShoppingBag,
//   Truck,
//   RefreshCw,
//   AlertCircle,
//   Scale,
//   Gavel,
//   Package,
//   CreditCard,
//   MapPin,
//   Globe,
//   Loader2
// } from 'lucide-react';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Icon mapping for dynamic icons
// const ICON_MAP = {
//   FaFileContract: FileText,
//   FaShoppingBag: ShoppingBag,
//   FaCreditCard: CreditCard,
//   FaTruck: Truck,
//   FaHands: RefreshCw,
//   FaUserShield: Shield,
//   FaLock: Shield,
//   FaBalanceScale: Scale,
//   FaExclamationTriangle: AlertCircle,
//   Scale: Scale,
//   Users: Users,
//   Gavel: Gavel,
//   Package: Package,
//   Globe: Globe,
//   AlertCircle: AlertCircle
// };

// const getIcon = (iconName) => {
//   const Icon = ICON_MAP[iconName];
//   return Icon || FileText;
// };

// export default function TermsPage() {
//   const [termsData, setTermsData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const heroRef = useRef(null);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.12,
//         delayChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.4, ease: "easeOut" }
//     }
//   };

//   // Default data with images
//   const defaultData = {
//     heroTitle: 'Terms & Conditions',
//     heroDescription: 'Please read these terms carefully before using our website and services. By accessing our platform, you agree to be bound by these terms.',
//     introText: 'Welcome to Smart Gadget. These Terms & Conditions govern your use of our website and services.',
//     heroImage: 'https://i.ibb.co.com/XkF8TGQZ/jn.png',
//     ctaImage: 'https://i.ibb.co.com/0RHQ0thP/jh.png',
//     sections: [
//       {
//         title: 'Acceptance of Terms',
//         icon: 'FaFileContract',
//         description: 'By using Smart Gadget\'s website and services, you agree to these Terms & Conditions',
//         details: [
//           'If you do not agree with any part of these terms, please do not use our platform',
//           'We reserve the right to update these terms at any time without prior notice',
//           'Continued use of our services constitutes acceptance of any changes'
//         ],
//         isActive: true
//       },
//       {
//         title: 'Account Registration',
//         icon: 'FaUserShield',
//         description: 'You must be at least 18 years old to create an account or make purchases',
//         details: [
//           'Provide accurate, complete, and up-to-date registration information',
//           'You are responsible for maintaining the confidentiality of your account credentials',
//           'Notify us immediately of any unauthorized use of your account'
//         ],
//         isActive: true
//       },
//       {
//         title: 'Products & Pricing',
//         icon: 'FaShoppingBag',
//         description: 'We strive to display accurate product descriptions, images, and specifications',
//         details: [
//           'Prices are listed in Bangladeshi Taka (BDT) and include applicable VAT',
//           'We reserve the right to modify prices, products, or availability without notice',
//           'In case of pricing errors, we may cancel or refuse orders at our discretion'
//         ],
//         isActive: true
//       },
//       {
//         title: 'Orders & Payment',
//         icon: 'FaCreditCard',
//         description: 'All orders are subject to acceptance and product availability',
//         details: [
//           'We accept bKash, Nagad, credit/debit cards, and cash on delivery',
//           'Payment must be received in full before order processing begins',
//           'We reserve the right to cancel orders suspected of fraud or unauthorized activity'
//         ],
//         isActive: true
//       },
//       {
//         title: 'Shipping & Delivery',
//         icon: 'FaTruck',
//         description: 'We offer delivery services across all districts of Bangladesh',
//         details: [
//           'Estimated delivery times are provided as guidelines and are not guaranteed',
//           'Risk of loss or damage passes to you upon delivery of the products',
//           'Please inspect your order immediately and report any issues within 48 hours'
//         ],
//         isActive: true
//       },
//       {
//         title: 'Returns & Refunds',
//         icon: 'FaHands',
//         description: 'You may return most items within 7 days of delivery for a full refund or exchange',
//         details: [
//           'Items must be unused, in original packaging, and with proof of purchase',
//           'Certain items (e.g., opened electronics, personalized items) are non-returnable',
//           'Refunds will be processed within 5-7 business days of receiving returned items'
//         ],
//         isActive: true
//       },
//       {
//         title: 'Intellectual Property',
//         icon: 'FaLock',
//         description: 'All content on this site (text, graphics, logos, images, software) is our property',
//         details: [
//           'Content is protected by Bangladesh and international copyright laws',
//           'You may not reproduce, distribute, or create derivative works without permission',
//           'Trademarks and service marks displayed on our site are our registered property'
//         ],
//         isActive: true
//       },
//       {
//         title: 'Limitation of Liability',
//         icon: 'FaExclamationTriangle',
//         description: 'Smart Gadget is not liable for indirect, incidental, or consequential damages',
//         details: [
//           'Our total liability is limited to the purchase price of the product in question',
//           'We are not responsible for delays or failures caused by circumstances beyond our control',
//           'Some jurisdictions do not allow limitations on liability, so this may not apply to you'
//         ],
//         isActive: true
//       },
//       {
//         title: 'Governing Law & Disputes',
//         icon: 'FaBalanceScale',
//         description: 'These terms are governed by the laws of the People\'s Republic of Bangladesh',
//         details: [
//           'Any disputes shall be subject to the exclusive jurisdiction of courts in Dhaka',
//           'Disputes may first be attempted to be resolved through informal negotiations',
//           'If mediation fails, disputes will be settled through binding arbitration'
//         ],
//         isActive: true
//       }
//     ],
//     lastUpdated: 'August 4, 2026'
//   };

//   // Fetch terms data from backend
//   useEffect(() => {
//     const fetchTermsData = async () => {
//       try {
//         setIsLoading(true);
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

//         console.log('📡 Fetching terms from:', `${apiUrl}/api/terms`);

//         const response = await fetch(`${apiUrl}/api/terms`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         console.log('📡 Response status:', response.status);

//         if (!response.ok) {
//           throw new Error(`Failed to fetch terms: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log('📦 Full API response:', result);

//         if (result.success && result.data) {
//           const activeSections = result.data.sections || [];
          
//           const mergedData = {
//             heroTitle: result.data.heroTitle || defaultData.heroTitle,
//             heroDescription: result.data.heroDescription || defaultData.heroDescription,
//             introText: result.data.introText || defaultData.introText,
//             heroImage: result.data.heroImage || defaultData.heroImage,
//             ctaImage: result.data.ctaImage || defaultData.ctaImage,
//             sections: activeSections.length > 0 ? activeSections : defaultData.sections,
//             lastUpdated: result.data.lastUpdated || defaultData.lastUpdated
//           };

//           console.log('🔄 Merged data:', mergedData);
//           setTermsData(mergedData);
//         } else {
//           console.warn('⚠️ Invalid response structure, using default data');
//           setTermsData(defaultData);
//         }
//       } catch (err) {
//         console.error('❌ Error fetching terms:', err);
//         setTermsData(defaultData);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTermsData();
//   }, []);

//   // Show loading state
//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-white flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
//             <p className="text-gray-500 mt-2">Loading terms...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const data = termsData || defaultData;
//   const { heroTitle, heroDescription, heroImage, ctaImage, sections, lastUpdated } = data;

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-white">
//         {/* ============================================
//         HERO SECTION - Using heroImage from backend
//         ============================================ */}
//         <section 
//           ref={heroRef}
//           className="relative min-h-[200px] sm:min-h-[280px] md:min-h-[300px] overflow-hidden"
//         >
//           <div 
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `url("${heroImage || 'https://i.ibb.co.com/XkF8TGQZ/jn.png'}")`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           />
          
//           <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/80" />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10" />

//           <div className="absolute -top-20 -right-20 w-36 h-36 md:w-64 md:h-64 bg-blue-600/15 rounded-full blur-3xl" />
//           <div className="absolute -bottom-20 -left-20 w-36 h-36 md:w-64 md:h-64 bg-purple-600/15 rounded-full blur-3xl" />

//           <div className="container mx-auto px-4 max-w-7xl relative z-10 h-full flex items-center">
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.2 }}
//               className="w-full max-w-4xl mx-auto text-center py-4 md:py-8"
//             >
//               <motion.div 
//                 variants={itemVariants} 
//                 className="inline-flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4 border border-white/10"
//               >
//                 <FileText className="w-2.5 h-2.5 md:w-4 md:h-4 text-blue-400" />
//                 <span className="text-[8px] md:text-xs lg:text-sm font-medium text-gray-300">Terms & Conditions</span>
//               </motion.div>

//               <motion.h1 
//                 variants={itemVariants}
//                 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1.5 md:mb-3 leading-tight"
//               >
//                 <span className="text-white">Terms &</span>
//                 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
//                   Conditions
//                 </span>
//               </motion.h1>

//               <motion.p 
//                 variants={itemVariants}
//                 className="text-gray-300 text-[10px] sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2"
//               >
//                 {heroDescription || 'Please read these terms carefully before using our website and services. By accessing our platform, you agree to be bound by these terms.'}
//               </motion.p>

//               <motion.div 
//                 variants={itemVariants}
//                 className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center mt-3 md:mt-6"
//               >
//                 <a href="#terms-policy">
//                   <button className="group bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 py-1.5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-blue-600/30 text-[9px] sm:text-sm md:text-base whitespace-nowrap">
//                     Read Full Policy
//                     <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </a>
//                 <Link href="/contact">
//                   <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-3 sm:px-5 py-1.5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-semibold transition-all text-[9px] sm:text-sm md:text-base whitespace-nowrap">
//                     Contact Support
//                   </button>
//                 </Link>
//               </motion.div>
//             </motion.div>
//           </div>
//         </section>

//         {/* ============================================
//         TERMS & CONDITIONS CONTENT
//         ============================================ */}
//         <section id="terms-policy" className="py-6 md:py-14 lg:py-20 bg-gray-50">
//           <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{ duration: 0.5 }}
//               className="text-center mb-6 md:mb-12"
//             >
//               <div className="inline-flex items-center gap-1.5 md:gap-2 bg-blue-100 rounded-full px-2.5 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4">
//                 <Gavel className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
//                 <span className="text-[8px] md:text-sm font-medium text-blue-700">Legal Agreement</span>
//               </div>
//               <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
//                 Our Terms & Conditions
//               </h2>
//               <p className="text-gray-500 text-[10px] sm:text-sm md:text-base mt-1.5 md:mt-2 max-w-2xl mx-auto px-4">
//                 Last updated: {lastUpdated || 'August 4, 2026'} — These terms govern your use of our website and services.
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
//               {sections && sections.length > 0 ? sections.map((section, idx) => {
//                 const Icon = getIcon(section.icon);
//                 return (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true, amount: 0.2 }}
//                     transition={{ duration: 0.4, delay: idx * 0.06 }}
//                     className="group bg-white rounded-lg md:rounded-2xl p-4 md:p-6 lg:p-8 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="flex items-start gap-2.5 md:gap-4">
//                       <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
//                         <Icon className="w-4 h-4 md:w-6 md:h-6 text-blue-600 group-hover:scale-110 transition-transform" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-sm md:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 md:mb-3">
//                           {section.title}
//                         </h3>
//                         {section.description && (
//                           <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-2 md:mb-3 leading-relaxed">
//                             {section.description}
//                           </p>
//                         )}
//                         <ul className="space-y-1 md:space-y-2">
//                           {section.details && section.details.map((item, itemIdx) => (
//                             <li key={itemIdx} className="flex items-start gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-base text-gray-600">
//                               <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0 mt-0.5" />
//                               <span className="leading-relaxed">{item}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               }) : (
//                 <div className="col-span-2 text-center py-8 text-gray-500">
//                   No terms sections available.
//                 </div>
//               )}
//             </div>

//             {/* Additional Important Clauses */}
          

//             {/* Contact for Disputes */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{ duration: 0.5, delay: 0.5 }}
//               className="mt-4 md:mt-6 bg-blue-50 rounded-lg md:rounded-2xl p-4 md:p-8 lg:p-10 border border-blue-200"
//             >
//               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
//                 <div className="flex items-start gap-2.5 md:gap-4 w-full sm:w-auto">
//                   <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-100 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
//                     <AlertCircle className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-sm md:text-lg lg:text-xl font-bold text-gray-900">
//                       Have Questions or Disputes?
//                     </h3>
//                     <p className="text-[10px] sm:text-xs md:text-base text-gray-600 leading-relaxed">
//                       We aim to resolve all issues fairly and promptly. Please contact our legal team 
//                       for any concerns regarding these terms or your rights as a customer.
//                     </p>
//                   </div>
//                 </div>
//                 <Link href="/contact" className="w-full sm:w-auto">
//                   <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
//                     Contact Legal Team
//                     <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
//                   </button>
//                 </Link>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* ============================================
//         CTA BANNER - Using ctaImage from backend
//         ============================================ */}
//         <section className="relative py-8 md:py-14 lg:py-20 overflow-hidden">
//           <div 
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `url("${ctaImage || 'https://i.ibb.co.com/0RHQ0thP/jh.png'}")`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               backgroundRepeat: 'no-repeat'
//             }}
//           />
//           <div className="absolute -top-20 -right-20 w-36 h-36 md:w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
//           <div className="absolute -bottom-20 -left-20 w-36 h-36 md:w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
//           <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

//           <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4 border border-white/10">
//                 <Sparkles className="w-2.5 h-2.5 md:w-4 md:h-4 text-blue-400" />
//                 <span className="text-[8px] md:text-xs font-medium text-gray-300">Agreement</span>
//               </div>
              
//               <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-1.5 md:mb-4 leading-tight">
//                 Ready to Shop with Confidence?
//               </h2>
              
//               <p className="text-gray-200 text-[10px] sm:text-sm md:text-base mb-4 md:mb-8 max-w-2xl mx-auto px-4">
//                 Browse our collection of premium gadgets and enjoy a secure shopping experience with clear terms.
//               </p>
              
//               <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
//                 <Link href="/products">
//                   <button className="group bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-1.5 md:gap-2 shadow-lg shadow-blue-600/30 transition-all text-[10px] sm:text-sm md:text-base">
//                     Explore Products
//                     <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </Link>
//                 <Link href="/privacy">
//                   <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-4 py-1.5 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-1.5 md:gap-2 transition-all text-[10px] sm:text-sm md:text-base">
//                     View Privacy Policy
//                   </button>
//                 </Link>
//               </div>
//             </motion.div>
//           </div>
//         </section>
//       </div>
//       <Footer />
//     </>
//   );
// }

// app/terms/page.js
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaArrowRight,
  FaFileContract,
  FaUserShield,
  FaCreditCard,
  FaTruck,
  FaShoppingBag,
  FaHands,
  FaLock,
  FaExclamationTriangle,
  FaBalanceScale,
  FaPrint,
  FaListUl,
  FaHeart,
  FaSparkles
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Font constants
const FONT_FAMILY = "'Courgette', cursive";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";
const FONT_FAMILY_INTER = "'Inter', sans-serif";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// Icon mapping
const ICON_MAP = {
  FaFileContract: FaFileContract,
  FaShoppingBag: FaShoppingBag,
  FaCreditCard: FaCreditCard,
  FaTruck: FaTruck,
  FaHands: FaHands,
  FaUserShield: FaUserShield,
  FaLock: FaLock,
  FaBalanceScale: FaBalanceScale,
  FaExclamationTriangle: FaExclamationTriangle,
};

const getIcon = (iconName) => {
  const Icon = ICON_MAP[iconName];
  return Icon || FaFileContract;
};

export default function TermsPage() {
  const [termsData, setTermsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState(1);

  // Fetch terms data from backend
  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        const response = await fetch(`${apiUrl}/api/terms`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch terms: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setTermsData(result.data);
          if (result.data.sections && result.data.sections.length > 0) {
            setActiveId(result.data.sections[0].id);
          }
        } else {
          setTermsData(getDefaultData());
        }
      } catch (err) {
        console.error('Error fetching terms:', err);
        setTermsData(getDefaultData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchTermsData();
  }, []);

  const getDefaultData = () => ({
    heroTitle: 'Terms & Conditions',
    heroDescription: 'Please read these terms carefully before using our website and services. By accessing our platform, you agree to be bound by these terms.',
    introText: 'Welcome to BeautyBucket. These Terms & Conditions ("Terms") govern your use of the BeautyBucket website, mobile application, and all related services (collectively, the "Platform"). By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Platform.',
    heroImage: '/images/bg10.jpg',
    ctaImage: '/images/pattern.png',
    lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    sections: [
      {
        id: 1,
        title: 'Acceptance of Terms',
        icon: 'FaFileContract',
        description: 'By using BeautyBucket\'s website and services, you agree to comply with and be bound by these Terms & Conditions.',
        details: [
          'These terms apply to all users of the BeautyBucket platform',
          'By placing an order, you accept these terms in full',
          'We reserve the right to update these terms at any time',
          'Continued use constitutes acceptance of updated terms'
        ]
      },
      // ... more default sections
    ]
  });

  // Track which section is in view to highlight the sidebar TOC
  useEffect(() => {
    if (!termsData?.sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section-id');
            if (id) setActiveId(Number(id));
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    termsData.sections.forEach((section) => {
      const el = document.getElementById(`section-${section.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [termsData]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center -mt-20">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Loading terms...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const data = termsData || getDefaultData();
  const { heroTitle, heroDescription, introText, heroImage, ctaImage, sections, lastUpdated } = data;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white -mt-20">
        {/* Hero Section - With Background Image from Backend */}
        <section className="relative overflow-hidden pt-28 pb-14">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${heroImage || '/images/bg10.jpg'}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A0E14]/88 via-[#1A0E14]/78 to-[#1A0E14]/68"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/8 via-transparent to-[#FF6B9D]/8"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#EE4275]/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF6B9D]/10 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 -mt-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EE4275]/20 backdrop-blur-sm rounded-full text-[#FF6B9D] text-sm font-medium mb-4 border border-[#EE4275]/20">
                <GiSparkles className="w-4 h-4" />
                <span style={{ fontFamily: FONT_FAMILY }}>Legal Agreement</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: FONT_FAMILY }}>
                {heroTitle || 'Terms & Conditions'}
              </h1>
              <p className="text-white/70 leading-relaxed max-w-xl text-sm lg:text-base" style={{ fontFamily: FONT_FAMILY_INTER }}>
                {heroDescription || 'Please read these terms carefully before using our website and services. By accessing our platform, you agree to be bound by these terms.'}
              </p>
            
            </motion.div>
          </div>
        </section>

        {/* Body */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
              {/* Sidebar TOC */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D1B2E] mb-4" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    <FaListUl className="w-3.5 h-3.5 text-[#EE4275]" />
                    On this page
                  </div>
                  <nav className="space-y-1 border-l border-[#EFE6E9]">
                    {sections && sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#section-${section.id}`}
                        className={`block pl-4 pr-2 py-1.5 -ml-px border-l text-sm transition-colors ${
                          activeId === section.id
                            ? 'border-[#EE4275] text-[#EE4275] font-medium'
                            : 'border-transparent text-[#8B7A8C] hover:text-[#2D1B2E]'
                        }`}
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      >
                        {String(section.id).padStart(2, '0')}. {section.title}
                      </a>
                    ))}
                  </nav>

                
                </div>
              </aside>

              {/* Content */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.p
                  variants={fadeInUp}
                  className="text-[#5B4B5C] leading-relaxed text-sm lg:text-base pb-8 mb-8 border-b border-[#EFE6E9]" style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  {introText || 'Welcome to BeautyBucket. These Terms & Conditions govern your use of our website and services.'}
                </motion.p>

                {sections && sections.map((section) => {
                  const Icon = getIcon(section.icon);
                  return (
                    <motion.div
                      key={section.id}
                      variants={fadeInUp}
                      id={`section-${section.id}`}
                      data-section-id={section.id}
                      className="mb-10 lg:mb-12 scroll-mt-28"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#EFE6E9] bg-[#FCF7F8] text-[#EE4275] flex-shrink-0 text-xs font-semibold" style={{ fontFamily: FONT_FAMILY_INTER }}>
                          {String(section.id).padStart(2, '0')}
                        </div>
                        <div className="flex-1 pt-1">
                          <h2 className="text-lg lg:text-xl font-bold text-[#2D1B2E] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                            {section.title}
                          </h2>
                        </div>
                      </div>

                      <div className="pl-13 lg:pl-13">
                        <p className="text-sm lg:text-base text-[#5B4B5C] leading-relaxed mb-4" style={{ fontFamily: FONT_FAMILY_INTER }}>
                          {section.description}
                        </p>

                        <ul className="space-y-2.5">
                          {section.details && section.details.map((detail, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-sm text-[#2D1B2E] leading-relaxed" style={{ fontFamily: FONT_FAMILY_INTER }}
                            >
                              <FaCheckCircle className="w-3.5 h-3.5 text-[#EE4275] mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 border-t border-[#F5EEF0]" />
                    </motion.div>
                  );
                })}

                {/* Important Notice */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-[#FCF7F8] rounded-xl p-6 lg:p-8 border border-[#EFE6E9] mt-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#EE4275]/10 flex-shrink-0">
                      <FaExclamationTriangle className="w-4 h-4 text-[#EE4275]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#2D1B2E] mb-2" style={{ fontFamily: FONT_FAMILY }}>
                        Important Notice
                      </h3>
                      <p className="text-sm text-[#5B4B5C] leading-relaxed" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        These Terms & Conditions are a legal agreement between you and BeautyBucket.
                        By using our Platform, you acknowledge that you have read, understood, and agree
                        to be bound by these Terms. If you have any questions, please contact our support team.
                      </p>
                      <div className="flex flex-wrap gap-5 mt-4">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 text-[#EE4275] hover:text-[#c22f5c] font-medium text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}
                        >
                          Contact Us
                          <FaArrowRight className="w-3 h-3" />
                        </Link>
                        <Link
                          href="/privacy"
                          className="inline-flex items-center gap-1.5 text-[#EE4275] hover:text-[#c22f5c] font-medium text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}
                        >
                          Privacy Policy
                          <FaArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section - With Background Image from Backend */}
        <section className="relative py-14 lg:py-16 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${ctaImage || '/images/pattern.png'}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#EE4275] to-[#FF6B9D]"></div>
          </div>
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GiSparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4" style={{ fontFamily: FONT_FAMILY }}>
                Have Questions About Our Terms?
              </h2>
              <p className="text-white/80 text-sm lg:text-base mb-8" style={{ fontFamily: FONT_FAMILY_INTER }}>
                Our team is here to help you understand our policies and ensure your experience is seamless.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 bg-white text-[#EE4275] rounded-xl hover:shadow-lg hover:shadow-black/25 transition-all font-medium hover:-translate-y-0.5 text-sm lg:text-base" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Contact Support
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/products">
                  <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all font-medium hover:-translate-y-0.5 text-sm lg:text-base" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    <FaShoppingBag className="w-4 h-4" />
                    Start Shopping
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}