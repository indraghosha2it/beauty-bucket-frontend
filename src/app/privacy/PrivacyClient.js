

// // app/privacy/page.jsx
// 'use client';

// import { motion } from 'framer-motion';
// import { useRef, useEffect, useState } from 'react';
// import Link from 'next/link';
// import {
//   Shield,
//   Mail,
//   Phone,
//   MapPin,
//   Clock,
//   ArrowRight,
//   Sparkles,
//   Lock,
//   Eye,
//   FileText,
//   CheckCircle,
//   Users,
//   Globe,
//   Server,
//   Cookie,
//   AlertCircle,
//   Loader2,
//   Info
// } from 'lucide-react';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Icon mapping for dynamic icons
// const ICON_MAP = {
//   FaUsers: Users,
//   FaEye: Eye,
//   FaShield: Shield,
//   FaLock: Lock,
//   FaCookie: Cookie,
//   FaAlertCircle: AlertCircle,
//   FaGlobe: Globe,
//   FaServer: Server,
//   FaClock: Clock
// };

// const getIcon = (iconName) => {
//   const Icon = ICON_MAP[iconName];
//   return Icon || Shield;
// };

// export default function PrivacyPage() {
//   const [privacyData, setPrivacyData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const sectionRef = useRef(null);

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

//   // Smart Gadget Default Data
//   const defaultData = {
//     heroTitle: 'Your Privacy',
//     heroSubtitle: 'Matters to Us',
//     heroDescription: 'We are committed to protecting your personal data and being transparent about how we collect, use, and safeguard your information.',
//     heroImage: 'https://i.ibb.co.com/SXv2zphh/top-view-vr-glasses-earphones-arrangement.jpg',
//     ctaImage: 'https://i.ibb.co.com/0RHQ0thP/jh.png',
//     introText: 'Last updated: August 4, 2026 — We value your trust and are committed to protecting your privacy.',
//     sections: [
//       {
//         title: 'Information We Collect',
//         icon: 'FaUsers',
//         description: 'We collect information to provide and improve our services to you.',
//         details: [
//           'Name, email address, phone number, and shipping/billing address',
//           'Payment information (processed securely through our payment partners)',
//           'IP address, browser type, device information, and usage data',
//           'Cookies and similar tracking technologies'
//         ],
//         isActive: true
//       },
//       {
//         title: 'How We Use Your Information',
//         icon: 'FaEye',
//         description: 'Your data helps us serve you better and improve our platform.',
//         details: [
//           'Process and fulfill your orders and deliveries',
//           'Communicate with you about orders, products, and promotions',
//           'Improve our website, products, and customer service',
//           'Prevent fraud and ensure the security of our platform',
//           'Comply with legal obligations and regulatory requirements'
//         ],
//         isActive: true
//       },
//       {
//         title: 'Data Sharing & Disclosure',
//         icon: 'FaShield',
//         description: 'We respect your privacy and limit data sharing to trusted partners.',
//         details: [
//           'We never sell or rent your personal data to third parties',
//           'Share data with trusted service providers (payment processors, delivery partners)',
//           'May disclose data when required by law or to protect our rights',
//           'Third-party services have their own privacy policies'
//         ],
//         isActive: true
//       },
//       {
//         title: 'Data Security',
//         icon: 'FaLock',
//         description: 'We implement industry-standard security measures to protect your data.',
//         details: [
//           'SSL encryption for all data transmission',
//           'Regular security audits and vulnerability assessments',
//           'Access controls and authentication measures',
//           'Secure data storage with industry-standard practices'
//         ],
//         isActive: true
//       },
//       {
//         title: 'Cookies & Tracking',
//         icon: 'FaCookie',
//         description: 'We use cookies to enhance your browsing experience.',
//         details: [
//           'Essential cookies for site functionality',
//           'Analytics cookies to understand user behavior',
//           'Preference cookies to remember your settings',
//           'You can manage cookie preferences in your browser settings'
//         ],
//         isActive: true
//       },
//       {
//         title: 'Your Rights',
//         icon: 'FaAlertCircle',
//         description: 'You have control over your personal data.',
//         details: [
//           'Access, correct, or delete your personal data',
//           'Withdraw consent for marketing communications',
//           'Request data portability',
//           'Lodge a complaint with data protection authorities'
//         ],
//         isActive: true
//       }
//     ],
//     additionalInfo: [
//       {
//         title: 'International Data Transfers',
//         icon: 'FaGlobe',
//         description: 'Smart Gadget operates primarily in Bangladesh. However, we may use service providers located in other countries. When we transfer your data internationally, we ensure that appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.',
//         isActive: true
//       },
//       {
//         title: "Children's Privacy",
//         icon: 'FaUsers',
//         description: 'Our services are not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal data, please contact us immediately. We will take steps to remove such information from our systems.',
//         isActive: true
//       },
//       {
//         title: 'Updates to This Policy',
//         icon: 'FaClock',
//         description: 'We may update this Privacy Policy periodically. The latest version will always be posted on this page with the effective date. We encourage you to review this policy regularly.',
//         isActive: true
//       }
//     ],
//     quickInfo: {
//       email: 'privacy@smartgadget.com',
//       phone: '+880 1871-733305',
//       responseTime: 'Within 24 hours'
//     },
//     lastUpdated: 'August 4, 2026'
//   };

//   // Fetch privacy data from backend
//   useEffect(() => {
//     const fetchPrivacyData = async () => {
//       try {
//         setIsLoading(true);
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

//         const response = await fetch(`${apiUrl}/api/privacy`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch privacy policy: ${response.status}`);
//         }

//         const result = await response.json();

//         if (result.success && result.data) {
//           // ✅ FILTER ONLY ACTIVE SECTIONS
//           const activeSections = (result.data.sections || []).filter(section => section.isActive !== false);
//           const activeAdditionalInfo = (result.data.additionalInfo || []).filter(info => info.isActive !== false);
          
//           const mergedData = {
//             heroTitle: result.data.heroTitle || defaultData.heroTitle,
//             heroSubtitle: result.data.heroSubtitle || defaultData.heroSubtitle,
//             heroDescription: result.data.heroDescription || defaultData.heroDescription,
//             heroImage: result.data.heroImage || defaultData.heroImage,
//             ctaImage: result.data.ctaImage || defaultData.ctaImage,
//             introText: result.data.introText || defaultData.introText,
//             sections: activeSections.length > 0 ? activeSections : defaultData.sections.filter(s => s.isActive !== false),
//             additionalInfo: activeAdditionalInfo.length > 0 ? activeAdditionalInfo : defaultData.additionalInfo.filter(a => a.isActive !== false),
//             quickInfo: result.data.quickInfo || defaultData.quickInfo,
//             lastUpdated: result.data.lastUpdated || defaultData.lastUpdated
//           };

//           setPrivacyData(mergedData);
//         } else {
//           // ✅ Use only active default sections
//           const activeDefaultSections = defaultData.sections.filter(s => s.isActive !== false);
//           const activeDefaultAdditional = defaultData.additionalInfo.filter(a => a.isActive !== false);
//           setPrivacyData({
//             ...defaultData,
//             sections: activeDefaultSections,
//             additionalInfo: activeDefaultAdditional
//           });
//         }
//       } catch (err) {
//         console.error('❌ Error fetching privacy policy:', err);
//         // ✅ Use only active default sections
//         const activeDefaultSections = defaultData.sections.filter(s => s.isActive !== false);
//         const activeDefaultAdditional = defaultData.additionalInfo.filter(a => a.isActive !== false);
//         setPrivacyData({
//           ...defaultData,
//           sections: activeDefaultSections,
//           additionalInfo: activeDefaultAdditional
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPrivacyData();
//   }, []);

//   // Show loading state
//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-white flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
//             <p className="text-gray-500 mt-2">Loading privacy policy...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const data = privacyData || defaultData;
//   const { 
//     heroTitle, 
//     heroSubtitle, 
//     heroDescription, 
//     heroImage, 
//     ctaImage, 
//     introText, 
//     sections, 
//     additionalInfo, 
//     quickInfo,
//     lastUpdated 
//   } = data;

//   const quickInfoItems = [
//     {
//       icon: <Mail className="w-4 h-4 md:w-5 md:h-5" />,
//       label: "Privacy Email",
//       value: quickInfo?.email || 'privacy@smartgadget.com',
//       link: `mailto:${quickInfo?.email || 'privacy@smartgadget.com'}`
//     },
//     {
//       icon: <Phone className="w-4 h-4 md:w-5 md:h-5" />,
//       label: "Privacy Hotline",
//       value: quickInfo?.phone || '+880 1871-733305',
//       link: `tel:${quickInfo?.phone?.replace(/\s/g, '') || '+8801871733305'}`
//     },
//     {
//       icon: <Clock className="w-4 h-4 md:w-5 md:h-5" />,
//       label: "Response Time",
//       value: quickInfo?.responseTime || 'Within 24 hours'
//     }
//   ];

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-white" ref={sectionRef}>
//         {/* HERO SECTION */}
//         <section className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[300px] overflow-hidden">
//           <div 
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `url("${heroImage || 'https://i.ibb.co.com/SXv2zphh/top-view-vr-glasses-earphones-arrangement.jpg'}")`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           />
          
//           <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/80" />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10" />

//           <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 md:h-64 bg-blue-600/15 rounded-full blur-3xl" />
//           <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 md:h-64 bg-purple-600/15 rounded-full blur-3xl" />

//           <div className="container mx-auto px-4 max-w-7xl relative z-10 h-full flex items-center">
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.2 }}
//               className="w-full max-w-4xl mx-auto text-center py-6 md:py-8"
//             >
//               <motion.div 
//                 variants={itemVariants} 
//                 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-3 md:mb-4 border border-white/10"
//               >
//                 <Shield className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
//                 <span className="text-[10px] md:text-xs lg:text-sm font-medium text-gray-300">Privacy Policy</span>
//               </motion.div>

//               <motion.h1 
//                 variants={itemVariants}
//                 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 md:mb-3 leading-tight"
//               >
//                 <span className="text-white">{heroTitle || 'Your Privacy'}</span>
//                 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
//                   {heroSubtitle || 'Matters to Us'}
//                 </span>
//               </motion.h1>

//               <motion.p 
//                 variants={itemVariants}
//                 className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2"
//               >
//                 {heroDescription || 'We are committed to protecting your personal data and being transparent about how we collect, use, and safeguard your information.'}
//               </motion.p>

//               <motion.div 
//                 variants={itemVariants}
//                 className="flex flex-wrap gap-2.5 sm:gap-3 md:gap-4 justify-center mt-4 md:mt-6"
//               >
//                 <a href="#privacy-policy">
//                   <button className="group bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 sm:py-2.5 md:px-6 md:py-3 py-1.5 rounded-full font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-blue-600/30 text-[10px] sm:text-sm md:text-base whitespace-nowrap">
//                     Read Policy
//                     <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </a>
//                 <Link href="/contact">
//                   <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-3 sm:px-5 sm:py-2.5 md:px-6 md:py-3 py-1.5 rounded-full font-semibold transition-all text-[10px] sm:text-sm md:text-base whitespace-nowrap">
//                     Contact Us
//                   </button>
//                 </Link>
//               </motion.div>
//             </motion.div>
//           </div>
//         </section>

//         {/* PRIVACY POLICY CONTENT */}
//         <section id="privacy-policy" className="py-10 md:py-14 lg:py-20 bg-gray-50">
//           <div className="container mx-auto px-4 max-w-7xl">
//             {/* Header */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{ duration: 0.5 }}
//               className="text-center mb-8 md:mb-12"
//             >
//               <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4">
//                 <FileText className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
//                 <span className="text-[10px] md:text-sm font-medium text-blue-700">Privacy Policy</span>
//               </div>
//               <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
//                 How We Protect Your Data
//               </h2>
//               <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-1.5 md:mt-2 max-w-2xl mx-auto px-4">
//                 {introText || `Last updated: ${lastUpdated || 'August 4, 2026'} — We value your trust and are committed to protecting your privacy.`}
//               </p>
//             </motion.div>

//             {/* ✅ Main Sections - Only show active sections */}
//             <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
//               {sections && sections.length > 0 ? sections.map((section, idx) => {
//                 const Icon = getIcon(section.icon);
//                 return (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true, amount: 0.2 }}
//                     transition={{ duration: 0.4, delay: idx * 0.08 }}
//                     className="group bg-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="flex items-start gap-3 md:gap-4">
//                       <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
//                         <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600 group-hover:scale-110 transition-transform" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 md:mb-3">
//                           {section.title}
//                         </h3>
//                         {section.description && (
//                           <p className="text-xs sm:text-sm text-gray-500 mb-2 md:mb-3 leading-relaxed">
//                             {section.description}
//                           </p>
//                         )}
//                         <ul className="space-y-1.5 md:space-y-2">
//                           {section.details && section.details.map((item, itemIdx) => (
//                             <li key={itemIdx} className="flex items-start gap-2 text-xs sm:text-sm md:text-base text-gray-600">
//                               <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500 flex-shrink-0 mt-0.5" />
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
//                   No privacy sections available.
//                 </div>
//               )}
//             </div>

//             {/* ✅ Additional Info - Only show active items */}
//             <div className="mt-8 md:mt-12">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.2 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-center mb-6 md:mb-8"
//               >
//                 <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4">
//                   <Info className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-600" />
//                   <span className="text-[10px] md:text-sm font-medium text-purple-700">Additional Information</span>
//                 </div>
//                 <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
//                   Important Privacy Details
//                 </h3>
//                 <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-1.5 md:mt-2 max-w-2xl mx-auto px-4">
//                   Key information about how we handle your data across different scenarios
//                 </p>
//               </motion.div>

//               <div className="space-y-4 md:space-y-6">
//                 {additionalInfo && additionalInfo.length > 0 ? additionalInfo.map((info, idx) => {
//                   const Icon = getIcon(info.icon);
//                   return (
//                     <motion.div
//                       key={idx}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true, amount: 0.2 }}
//                       transition={{ duration: 0.4, delay: idx * 0.08 }}
//                       className="group bg-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
//                     >
//                       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
//                         <div className="flex-shrink-0">
//                           <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300">
//                             <Icon className="w-6 h-6 md:w-7 md:h-7 text-purple-600 group-hover:scale-110 transition-transform" />
//                           </div>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 md:mb-2">
//                             {info.title}
//                           </h4>
//                           <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
//                             {info.description}
//                           </p>
//                         </div>
                     
//                       </div>
//                     </motion.div>
//                   );
//                 }) : (
//                   <div className="text-center py-8 text-gray-500">
//                     <Info className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//                     <p>No additional information available.</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Quick Contact Info */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="mt-8 md:mt-12"
//             >
//               <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-blue-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
//                 <div className="text-center mb-6 md:mb-8">
//                   <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4">
//                     <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
//                     <span className="text-[10px] md:text-sm font-medium text-blue-700">Get in Touch</span>
//                   </div>
//                   <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
//                     Have Questions About Your Privacy?
//                   </h3>
//                   <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-1.5 md:mt-2 max-w-2xl mx-auto px-4">
//                     Our privacy team is ready to assist you with any questions or concerns
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
//                   {quickInfoItems.map((item, idx) => (
//                     <motion.div
//                       key={idx}
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true, amount: 0.2 }}
//                       transition={{ duration: 0.4, delay: idx * 0.1 + 0.4 }}
//                       className="group bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 text-center"
//                     >
//                       <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
//                         <div className="text-blue-600 group-hover:scale-110 transition-transform">
//                           {item.icon}
//                         </div>
//                       </div>
//                       <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 md:mb-2">
//                         {item.label}
//                       </p>
//                       {item.link ? (
//                         <a 
//                           href={item.link} 
//                           className="text-sm md:text-base lg:text-lg text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline"
//                         >
//                           {item.value}
//                         </a>
//                       ) : (
//                         <p className="text-sm md:text-base lg:text-lg text-gray-800 font-semibold">
//                           {item.value}
//                         </p>
//                       )}
//                       <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 mx-auto rounded-full"></div>
//                     </motion.div>
//                   ))}
//                 </div>

//                 <div className="mt-6 md:mt-8 text-center">
//                   <Link href="/contact">
//                     <button className="group inline-flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 bg-black hover:bg-black text-white rounded-full font-semibold text-sm md:text-base transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:scale-105">
//                       <Mail className="w-4 h-4 md:w-5 md:h-5" />
//                       Send Privacy Inquiry
//                       <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* CTA BANNER */}
//         <section className="relative py-10 md:py-14 lg:py-20 overflow-hidden">
//           <div 
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `url("${ctaImage || 'https://i.ibb.co.com/0RHQ0thP/jh.png'}")`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               backgroundRepeat: 'no-repeat'
//             }}
//           />
//           <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
//           <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
//           <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

//           <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-3 md:mb-4 border border-white/10">
//                 <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" />
//                 <span className="text-[10px] md:text-xs font-medium text-gray-300">Trust & Transparency</span>
//               </div>
              
//               <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
//                 Your Privacy is Our Priority
//               </h2>
              
//               <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-5 md:mb-8 max-w-2xl mx-auto px-4">
//                 Have questions about how we handle your data? Our team is here to help.
//               </p>
              
//               <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
//                 <Link href="/contact">
//                   <button className="group bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all text-xs sm:text-sm md:text-base">
//                     Contact Privacy Team
//                     <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </Link>
//                 <Link href="/products">
//                   <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-2 transition-all text-xs sm:text-sm md:text-base">
//                     Browse Products
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
// app/privacy/PrivacyClient.js
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaUsers,
  FaEye,
  FaLock,
  FaCookie,
  FaExclamationTriangle,
  FaGlobe,
  FaServer,
  FaClock,
  FaPrint,
  FaListUl,
  FaShoppingBag,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Font constants
const FONT_FAMILY = "'Courgette', cursive";
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

// Icon mapping - Fixed: Using correct icon names
const ICON_MAP = {
  FaShieldAlt: FaShieldAlt,
  FaShield: FaShieldAlt,
  FaUsers: FaUsers,
  FaEye: FaEye,
  FaLock: FaLock,
  FaCookie: FaCookie,
  FaExclamationTriangle: FaExclamationTriangle,
  FaAlertCircle: FaExclamationTriangle,
  FaGlobe: FaGlobe,
  FaServer: FaServer,
  FaClock: FaClock,
};

const getIcon = (iconName) => {
  const Icon = ICON_MAP[iconName];
  return Icon || FaShieldAlt;
};

export default function PrivacyClient() {
  const [privacyData, setPrivacyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState(1);

  // Fetch privacy data from backend
  useEffect(() => {
    const fetchPrivacyData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        const response = await fetch(`${apiUrl}/api/privacy`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch privacy policy: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setPrivacyData(result.data);
          if (result.data.sections && result.data.sections.length > 0) {
            setActiveId(result.data.sections[0].id);
          }
        } else {
          setPrivacyData(getDefaultData());
        }
      } catch (err) {
        console.error('Error fetching privacy policy:', err);
        setPrivacyData(getDefaultData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrivacyData();
  }, []);

  const getDefaultData = () => ({
    heroTitle: 'Your Privacy',
    heroSubtitle: 'Matters to Us',
    heroDescription: 'We are committed to protecting your personal data and being transparent about how we collect, use, and safeguard your information.',
    heroImage: '/images/bg10.jpg',
    ctaImage: '/images/pattern.png',
    introText: 'Welcome to BeautyBucket. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.',
    lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    quickInfo: {
      email: 'privacy@beautybucket.com',
      phone: '+880 1XXXXXXXXX',
      responseTime: 'Within 24 hours'
    },
    sections: [
      {
        id: 1,
        title: 'Information We Collect',
        icon: 'FaUsers',
        description: 'We collect information to provide and improve our services to you.',
        details: [
          'Name, email address, phone number, and shipping/billing address',
          'Payment information (processed securely through our payment partners)',
          'IP address, browser type, device information, and usage data',
          'Cookies and similar tracking technologies'
        ]
      },
      {
        id: 2,
        title: 'How We Use Your Information',
        icon: 'FaEye',
        description: 'Your data helps us serve you better and improve our platform.',
        details: [
          'Process and fulfill your orders and deliveries',
          'Communicate with you about orders, products, and promotions',
          'Improve our website, products, and customer service',
          'Prevent fraud and ensure the security of our platform'
        ]
      },
      {
        id: 3,
        title: 'Data Sharing & Disclosure',
        icon: 'FaShieldAlt',
        description: 'We respect your privacy and limit data sharing to trusted partners.',
        details: [
          'We never sell or rent your personal data to third parties',
          'Share data with trusted service providers',
          'May disclose data when required by law',
          'Third-party services have their own privacy policies'
        ]
      },
      {
        id: 4,
        title: 'Data Security',
        icon: 'FaLock',
        description: 'We implement industry-standard security measures to protect your data.',
        details: [
          'SSL encryption for all data transmission',
          'Regular security audits and vulnerability assessments',
          'Access controls and authentication measures',
          'Secure data storage with industry-standard practices'
        ]
      },
      {
        id: 5,
        title: 'Cookies & Tracking',
        icon: 'FaCookie',
        description: 'We use cookies to enhance your browsing experience.',
        details: [
          'Essential cookies for site functionality',
          'Analytics cookies to understand user behavior',
          'Preference cookies to remember your settings',
          'You can manage cookie preferences in your browser settings'
        ]
      },
      {
        id: 6,
        title: 'Your Rights',
        icon: 'FaExclamationTriangle',
        description: 'You have control over your personal data.',
        details: [
          'Access, correct, or delete your personal data',
          'Withdraw consent for marketing communications',
          'Request data portability',
          'Lodge a complaint with data protection authorities'
        ]
      }
    ],
    additionalInfo: [
      {
        id: 1,
        title: 'International Data Transfers',
        icon: 'FaGlobe',
        description: 'BeautyBucket operates primarily in Bangladesh. However, we may use service providers located in other countries. When we transfer your data internationally, we ensure that appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.'
      },
      {
        id: 2,
        title: "Children's Privacy",
        icon: 'FaUsers',
        description: 'Our services are not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal data, please contact us immediately.'
      },
      {
        id: 3,
        title: 'Updates to This Policy',
        icon: 'FaClock',
        description: 'We may update this Privacy Policy periodically. The latest version will always be posted on this page with the effective date. We encourage you to review this policy regularly.'
      }
    ]
  });

  // Track which section is in view to highlight the sidebar TOC
  useEffect(() => {
    if (!privacyData?.sections) return;

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

    privacyData.sections.forEach((section) => {
      const el = document.getElementById(`section-${section.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [privacyData]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center -mt-20">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Loading privacy policy...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const data = privacyData || getDefaultData();
  const { heroTitle, heroSubtitle, heroDescription, heroImage, ctaImage, introText, sections, additionalInfo, lastUpdated, quickInfo } = data;

  const quickInfoItems = [
    {
      icon: <FaEnvelope className="w-4 h-4" />,
      label: "Privacy Email",
      value: quickInfo?.email || 'privacy@beautybucket.com',
      link: `mailto:${quickInfo?.email || 'privacy@beautybucket.com'}`
    },
    {
      icon: <FaPhone className="w-4 h-4" />,
      label: "Privacy Hotline",
      value: quickInfo?.phone || '+880 1XXXXXXXXX',
      link: `tel:${quickInfo?.phone?.replace(/\s/g, '') || '+8801XXXXXXXXX'}`
    },
    {
      icon: <FaClock className="w-4 h-4" />,
      label: "Response Time",
      value: quickInfo?.responseTime || 'Within 24 hours'
    }
  ];

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
                <span style={{ fontFamily: FONT_FAMILY }}>Privacy Policy</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: FONT_FAMILY }}>
                {heroTitle || 'Your Privacy'}
                <br />
                <span className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] bg-clip-text text-transparent">
                  {heroSubtitle || 'Matters to Us'}
                </span>
              </h1>
              <p className="text-white/70 leading-relaxed max-w-xl text-sm lg:text-base" style={{ fontFamily: FONT_FAMILY_INTER }}>
                {heroDescription || 'We are committed to protecting your personal data and being transparent about how we collect, use, and safeguard your information.'}
              </p>
            
            </motion.div>
          </div>
        </section>

        {/* Body */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
              {/* Sidebar TOC - Shows serial numbers based on order */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D1B2E] mb-4" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    <FaListUl className="w-3.5 h-3.5 text-[#EE4275]" />
                    On this page
                  </div>
                  <nav className="space-y-1 border-l border-[#EFE6E9]">
                    {sections && sections.map((section, index) => {
                      // Use the actual index + 1 as the serial number based on order
                      const serialNumber = index + 1;
                      return (
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
                          {String(serialNumber).padStart(2, '0')}. {section.title}
                        </a>
                      );
                    })}
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
                  {introText || 'Welcome to BeautyBucket. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.'}
                </motion.p>

                {sections && sections.map((section, index) => {
                  const Icon = getIcon(section.icon);
                  // Use the actual index + 1 as the serial number based on order
                  const serialNumber = index + 1;
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
                          {String(serialNumber).padStart(2, '0')}
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

                {/* Quick Contact Info */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-[#FCF7F8] rounded-xl p-6 lg:p-8 border border-[#EFE6E9] mt-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
                    <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>Get in Touch</span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-[#2D1B2E] mb-2" style={{ fontFamily: FONT_FAMILY }}>
                    Have Questions About Your Privacy?
                  </h3>
                  <p className="text-sm text-[#5B4B5C] mb-6" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Our privacy team is ready to assist you with any questions or concerns.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {quickInfoItems.map((item, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 border border-[#EFE6E9] text-center">
                        <div className="w-10 h-10 rounded-full bg-[#EE4275]/10 flex items-center justify-center mx-auto mb-2">
                          <span className="text-[#EE4275]">{item.icon}</span>
                        </div>
                        <p className="text-[10px] font-medium text-[#8B7A8C] uppercase tracking-wider mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                          {item.label}
                        </p>
                        {item.link ? (
                          <a href={item.link} className="text-sm text-[#EE4275] hover:text-[#c22f5c] font-semibold transition-colors" style={{ fontFamily: FONT_FAMILY_INTER }}>
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-[#2D1B2E] font-semibold" style={{ fontFamily: FONT_FAMILY_INTER }}>{item.value}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Link href="/contact">
                      <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#EE4275] hover:bg-[#c22f5c] text-white rounded-lg transition-colors font-medium text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Send Privacy Inquiry
                        <FaArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </motion.div>

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
                        This Privacy Policy is a legal agreement between you and BeautyBucket. By using our Platform, 
                        you acknowledge that you have read, understood, and agree to the practices described in this policy.
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
                          href="/terms"
                          className="inline-flex items-center gap-1.5 text-[#EE4275] hover:text-[#c22f5c] font-medium text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}
                        >
                          Terms & Conditions
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
                Your Privacy is Our Priority
              </h2>
              <p className="text-white/80 text-sm lg:text-base mb-8" style={{ fontFamily: FONT_FAMILY_INTER }}>
                Have questions about how we handle your data? Our team is here to help.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 bg-white text-[#EE4275] rounded-xl hover:shadow-lg hover:shadow-black/25 transition-all font-medium hover:-translate-y-0.5 text-sm lg:text-base" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Contact Privacy Team
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/products">
                  <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all font-medium hover:-translate-y-0.5 text-sm lg:text-base" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    <FaShoppingBag className="w-4 h-4" />
                    Browse Products
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