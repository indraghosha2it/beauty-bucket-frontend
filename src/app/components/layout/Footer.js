// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';
// import { 
//   FaFacebookF, 
//   FaInstagram, 
//   FaTwitter, 
//   FaWhatsapp,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaClock,
//   FaTruck,
//   FaShieldAlt,
//   FaYoutube,
//   FaLinkedinIn,
//   FaCcVisa,
//   FaCcMastercard,
//   FaPaypal,
//   FaApplePay,
//   FaBolt,
//   FaBatteryFull
// } from 'react-icons/fa';
// import { HiOutlineBadgeCheck, HiOutlineChip } from 'react-icons/hi';
// import { IoIosFlash } from 'react-icons/io';

// // Icon mapping for social platforms
// const SOCIAL_ICONS = {
//   facebook: FaFacebookF,
//   instagram: FaInstagram,
//   twitter: FaTwitter,
//   whatsapp: FaWhatsapp,
//   youtube: FaYoutube,
//   linkedin: FaLinkedinIn,
// };

// // Icon mapping for trust badges
// const TRUST_BADGE_ICONS = {
//   authentic: HiOutlineBadgeCheck,
//   warranty: FaShieldAlt,
//   delivery: FaBolt,
//   secure: FaShieldAlt,
//   trusted: HiOutlineBadgeCheck,
//   return: FaTruck,
//   support: FaPhone,
// };

// export default function Footer() {
//   const router = useRouter();
//   const currentYear = new Date().getFullYear();
//   const [footerData, setFooterData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch footer data from backend
//   useEffect(() => {
//     const fetchFooterData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('http://localhost:5000/api/footer');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch footer data');
//         }
        
//         const data = await response.json();
        
//         if (data.success && data.data) {
//           setFooterData(data.data);
//         } else {
//           throw new Error('Invalid footer data');
//         }
//       } catch (err) {
//         console.error('Error fetching footer data:', err);
//         setError(err.message);
//         // Fallback to default data if API fails
//         setFooterData(getDefaultFooterData());
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFooterData();
//   }, []);

//   // Default fallback data if API fails
//   const getDefaultFooterData = () => ({
//     company: {
//       name: "HyperVolt",
//       tagline: "Power Your World",
//       description: "Discover premium power banks and charging solutions with cutting-edge technology, fast delivery, and reliable support across Bangladesh.",
//       address: "Dhaka, Bangladesh",
//       phone: "+880 1XXXXXXXXX",
//       email: "support@hypervolt.com",
//       hours: "Always Open • 24/7 Online Ordering • Quick Response",
//       logoUrl: "",
//     },
//     columns: [
//       {
//         id: 'default_1',
//         title: 'Quick Links',
//         type: 'links',
//         items: [
//           { id: 'dl1', label: 'Home', url: '/' },
//           { id: 'dl2', label: 'Power Banks', url: '/products?category=power-banks' },
//           { id: 'dl3', label: 'Chargers', url: '/products?category=chargers' },
//           { id: 'dl4', label: 'Track Order', url: '/track' },
//         ]
//       },
//       {
//         id: 'default_2',
//         title: 'Support',
//         type: 'support',
//         items: [
//           { id: 'ds1', label: 'Contact Us', url: '/contact' },
//           { id: 'ds2', label: 'Terms & Conditions', url: '/terms' },
//           { id: 'ds3', label: 'Privacy Policy', url: '/privacy' },
//           { id: 'ds4', label: 'Warranty Policy', url: '/warranty' },
//         ],
//         socialLinks: [
//           { platform: 'facebook', url: 'https://facebook.com/hypervolt', active: true },
//           { platform: 'instagram', url: 'https://instagram.com/hypervolt', active: true },
//           { platform: 'youtube', url: 'https://youtube.com/hypervolt', active: true },
//         ]
//       },
//       {
//         id: 'default_3',
//         title: 'Contact Us',
//         type: 'contact',
//         items: [
//           { id: 'dc1', type: 'address', label: 'Address', value: 'Dhaka, Bangladesh' },
//           { id: 'dc2', type: 'phone', label: 'Phone', value: '+880 1XXXXXXXXX' },
//           { id: 'dc3', type: 'email', label: 'Email', value: 'support@hypervolt.com' },
//           { id: 'dc4', type: 'hours', label: 'Hours', value: 'Always Open • 24/7 Online Ordering' },
//         ]
//       },
//       {
//         id: 'default_4',
//         title: 'Connect With Us',
//         type: 'social',
//         items: [],
//         socialLinks: [
//           { platform: 'facebook', url: 'https://facebook.com/hypervolt', active: true },
//           { platform: 'instagram', url: 'https://instagram.com/hypervolt', active: true },
//           { platform: 'youtube', url: 'https://youtube.com/hypervolt', active: true },
//         ]
//       }
//     ],
//     trustBadges: [
//       { type: 'authentic', label: '100% Authentic', active: true },
//       { type: 'warranty', label: 'Official Warranty', active: true },
//       { type: 'delivery', label: 'Fast Delivery', active: true },
//     ],
//     showTrustBadges: true,
//     showPaymentMethods: true,
//     footerText: 'All rights reserved.',
//     showCopyright: true,
//   });

//   // Get social links from columns (support type or social type)
//   const getSocialLinks = () => {
//     if (!footerData) return [];
    
//     const supportColumn = footerData.columns?.find(col => col.type === 'support' || col.type === 'social');
//     if (supportColumn?.socialLinks) {
//       return supportColumn.socialLinks.filter(link => link.active);
//     }
//     return [];
//   };

//   // Get trust badges
//   const getTrustBadges = () => {
//     if (!footerData) return [];
//     return footerData.trustBadges?.filter(badge => badge.active) || [];
//   };

//   // Get column items by column title
//   const getColumnItems = (title) => {
//     if (!footerData) return [];
//     const column = footerData.columns?.find(col => col.title === title);
//     return column?.items || [];
//   };

//   // Get contact column items
//   const getContactItems = () => {
//     if (!footerData) return [];
//     const contactColumn = footerData.columns?.find(col => col.type === 'contact');
//     return contactColumn?.items || [];
//   };

//   // Open Gmail
//   const openGmail = (email) => {
//     window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
//   };

//   // Render contact item based on type
//   const renderContactItem = (item) => {
//     const icons = {
//       address: FaMapMarkerAlt,
//       phone: FaPhone,
//       email: FaEnvelope,
//       hours: FaClock,
//     };
//     const Icon = icons[item.type];
    
//     if (!Icon) return null;

//     if (item.type === 'email') {
//       return (
//         <motion.button 
//           key={item.id}
//           onClick={() => openGmail(item.value)}
//           className="flex items-center gap-2 text-white/70 hover:text-[#06B6D4] transition-colors group w-full text-left text-xs"
//           whileHover={{ x: 2 }}
//         >
//           <div className="w-5 h-5 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#06B6D4]/30 transition-colors">
//             <Icon className="text-[#06B6D4] text-xs" />
//           </div>
//           <span className="text-xs">{item.value}</span>
//         </motion.button>
//       );
//     }

//     if (item.type === 'address') {
//       return (
//         <motion.a 
//           key={item.id}
//           href={`https://maps.google.com/?q=${encodeURIComponent(item.value)}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-start gap-2 text-white/70 hover:text-[#06B6D4] transition-colors group text-xs"
//           whileHover={{ x: 2 }}
//         >
//           <div className="w-5 h-5 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#06B6D4]/30 transition-colors">
//             <Icon className="text-[#06B6D4] text-xs" />
//           </div>
//           <span className="text-xs leading-tight">{item.value}</span>
//         </motion.a>
//       );
//     }

//     if (item.type === 'phone') {
//       return (
//         <motion.a 
//           key={item.id}
//           href={`tel:${item.value}`}
//           className="flex items-center gap-2 text-white/70 hover:text-[#06B6D4] transition-colors group text-xs"
//           whileHover={{ x: 2 }}
//         >
//           <div className="w-5 h-5 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#06B6D4]/30 transition-colors">
//             <Icon className="text-[#06B6D4] text-xs" />
//           </div>
//           <span className="text-xs">{item.value}</span>
//         </motion.a>
//       );
//     }

//     if (item.type === 'hours') {
//       return (
//         <div key={item.id} className="flex items-start gap-2 text-white/70 text-xs">
//           <div className="w-5 h-5 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center flex-shrink-0">
//             <Icon className="text-[#06B6D4] text-xs" />
//           </div>
//           <span className="text-xs leading-tight">{item.value}</span>
//         </div>
//       );
//     }

//     return null;
//   };

//   // Show loading state
//   if (isLoading) {
//     return (
//       <footer className="relative text-white overflow-hidden" style={{ backgroundColor: '#004767' }}>
//         <div className="container mx-auto px-4 py-6 lg:py-5 relative z-10">
//           <div className="flex items-center justify-center min-h-[200px]">
//             <div className="text-center">
//               <div className="inline-block w-8 h-8 border-4 border-white/20 border-t-[#06B6D4] rounded-full animate-spin"></div>
//               <p className="text-white/50 text-sm mt-2">Loading footer...</p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     );
//   }

//   if (!footerData) {
//     return null;
//   }

//   const company = footerData.company || {};
//   const socialLinks = getSocialLinks();
//   const trustBadges = getTrustBadges();
//   const quickLinks = getColumnItems('Quick Links');
//   const supportLinks = getColumnItems('Support');
//   const contactItems = getContactItems();
//   const showTrustBadges = footerData.showTrustBadges !== false;
//   const showCopyright = footerData.showCopyright !== false;
  
//   // Check if logo exists
//   const hasLogo = company.logoUrl && company.logoUrl.trim() !== '';

//   return (
//     <footer className="relative text-white overflow-hidden" style={{ backgroundColor: '#004767' }}>
//       {/* Top Gradient Bar - HyperVolt colors */}
//       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#06B6D4] via-[#004767] to-[#06B6D4]"></div>
      
//       {/* Decorative Pattern Overlay */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-0 left-0 w-64 h-64 bg-[#06B6D4] rounded-full filter blur-3xl"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#06B6D4] rounded-full filter blur-3xl"></div>
//       </div>
      
//       {/* Main Footer */}
//       <div className="container mx-auto px-4 py-8 lg:py-6 relative z-10">
        
//         {/* Main Grid - 4 Columns Layout */}
//         <div className="lg:grid lg:grid-cols-4 lg:gap-8 flex flex-col space-y-6 lg:space-y-0 mb-3">
          
//           {/* Column 1: Company Info */}
//           <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
//             <div className="flex flex-col items-center lg:items-start gap-1 mb-3">
//               {/* Logo - if available */}
//               {hasLogo ? (
//                 <img 
//                   src={company.logoUrl} 
//                   alt={company.name || 'HyperVolt'} 
//                   className="h-12 w-auto mb-1 object-contain"
//                 />
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <FaBolt className="text-2xl text-[#06B6D4]" />
//                   <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
//                     Hyper<span className="text-[#06B6D4]">Volt</span>
//                   </h2>
//                 </div>
//               )}
              
//               {/* Tagline */}
//               {company.tagline && (
//                 <p className="text-[#06B6D4]/80 text-xs mt-0.5 font-medium tracking-wider">
//                   {company.tagline}
//                 </p>
//               )}
//             </div>
            
//             <p className="text-white/60 text-xs mb-4 leading-relaxed max-w-xs">
//               {company.description || 'Premium power banks and charging solutions for your daily needs.'}
//             </p>

//             {/* Trust Badges */}
//             {showTrustBadges && trustBadges.length > 0 && (
//               <div className="flex flex-wrap gap-1.5 mb-2 justify-center lg:justify-start">
//                 {trustBadges.map((badge) => {
//                   const IconComponent = TRUST_BADGE_ICONS[badge.type] || HiOutlineBadgeCheck;
//                   return (
//                     <div key={badge.type} className="flex items-center gap-1 bg-[#06B6D4]/10 rounded-full px-3 py-1.5 border border-[#06B6D4]/20">
//                       <IconComponent className="text-[#06B6D4] text-xs" />
//                       <span className="text-xs font-medium text-white/80">{badge.label}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Mobile Layout - Quick Links & Support */}
//           <div className="grid grid-cols-2 gap-4 lg:hidden w-full">
//             {/* Quick Links - Mobile */}
//             {quickLinks.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-semibold text-white mb-3 relative inline-block" style={{ fontFamily: "'Inter', sans-serif" }}>
//                   Quick Links
//                   <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#06B6D4] to-transparent"></span>
//                 </h3>
//                 <ul className="space-y-2">
//                   {quickLinks.map((link) => (
//                     <li key={link.id}>
//                       <Link 
//                         href={link.url}
//                         className="text-white/60 hover:text-[#06B6D4] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
//                       >
//                         <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#06B6D4] transition-colors"></span>
//                         {link.label}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Support - Mobile */}
//             {supportLinks.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-semibold text-white mb-3 relative inline-block" style={{ fontFamily: "'Inter', sans-serif" }}>
//                   Support
//                   <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#06B6D4] to-transparent"></span>
//                 </h3>
//                 <ul className="space-y-2">
//                   {supportLinks.map((link) => (
//                     <li key={link.id}>
//                       <Link 
//                         href={link.url}
//                         className="text-white/60 hover:text-[#06B6D4] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
//                       >
//                         <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#06B6D4] transition-colors"></span>
//                         {link.label}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Contact Us - Mobile */}
//           {contactItems.length > 0 && (
//             <div className="lg:hidden w-full">
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block" style={{ fontFamily: "'Inter', sans-serif" }}>
//                 Contact Us
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#06B6D4] to-transparent"></span>
//               </h3>
              
//               <div className="space-y-2">
//                 {contactItems.map((item) => renderContactItem(item))}
//               </div>
//             </div>
//           )}

//           {/* Connect With Us - Mobile */}
//           {socialLinks.length > 0 && (
//             <div className="lg:hidden w-full">
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block" style={{ fontFamily: "'Inter', sans-serif" }}>
//                 Connect With Us
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#06B6D4] to-transparent"></span>
//               </h3>
              
//               {/* Social Links */}
//               <div className="flex flex-wrap gap-1.5">
//                 {socialLinks.map((social, index) => {
//                   const IconComponent = SOCIAL_ICONS[social.platform];
//                   if (!IconComponent) return null;
//                   return (
//                     <motion.a
//                       key={social.platform || index}
//                       href={social.url || '#'}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#06B6D4]/20 transition-all duration-300 group"
//                       whileHover={{ y: -2, scale: 1.05 }}
//                       title={social.platform}
//                     >
//                       <span className="text-white/70 group-hover:text-[#06B6D4] transition-colors text-sm">
//                         <IconComponent />
//                       </span>
//                     </motion.a>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Desktop Layout */}
          
//           {/* Column 2: Quick Links (Desktop) */}
//           {quickLinks.length > 0 && (
//             <div className="hidden lg:block">
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block" style={{ fontFamily: "'Inter', sans-serif" }}>
//                 Quick Links
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#06B6D4] to-transparent"></span>
//               </h3>
//               <ul className="space-y-2">
//                 {quickLinks.map((link) => (
//                   <li key={link.id}>
//                     <Link 
//                       href={link.url}
//                       className="text-white/60 hover:text-[#06B6D4] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#06B6D4] transition-colors"></span>
//                       {link.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Column 3: Support & Connect With Us (Desktop) */}
//           {(supportLinks.length > 0 || socialLinks.length > 0) && (
//             <div className="hidden lg:block">
//               {/* Support Links */}
//               {supportLinks.length > 0 && (
//                 <div className="mb-4">
//                   <h3 className="text-sm font-semibold text-white mb-3 relative inline-block" style={{ fontFamily: "'Inter', sans-serif" }}>
//                     Support
//                     <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#06B6D4] to-transparent"></span>
//                   </h3>
//                   <ul className="space-y-2">
//                     {supportLinks.map((link) => (
//                       <li key={link.id}>
//                         <Link 
//                           href={link.url}
//                           className="text-white/60 hover:text-[#06B6D4] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
//                         >
//                           <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#06B6D4] transition-colors"></span>
//                           {link.label}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Connect With Us - Desktop */}
//               {socialLinks.length > 0 && (
//                 <div>
//                   <h3 className="text-sm font-semibold text-white mb-3 relative inline-block" style={{ fontFamily: "'Inter', sans-serif" }}>
//                     Connect With Us
//                     <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#06B6D4] to-transparent"></span>
//                   </h3>
                  
//                   <div className="flex flex-wrap gap-1.5">
//                     {socialLinks.map((social, index) => {
//                       const IconComponent = SOCIAL_ICONS[social.platform];
//                       if (!IconComponent) return null;
//                       return (
//                         <motion.a
//                           key={social.platform || index}
//                           href={social.url || '#'}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#06B6D4]/20 transition-all duration-300 group"
//                           whileHover={{ y: -2, scale: 1.05 }}
//                           title={social.platform}
//                         >
//                           <span className="text-white/70 group-hover:text-[#06B6D4] transition-colors text-sm">
//                             <IconComponent />
//                           </span>
//                         </motion.a>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Column 4: Contact Us (Desktop) */}
//           {contactItems.length > 0 && (
//             <div className="hidden lg:block">
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block" style={{ fontFamily: "'Inter', sans-serif" }}>
//                 Contact Us
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#06B6D4] to-transparent"></span>
//               </h3>
              
//               <div className="space-y-2">
//                 {contactItems.map((item) => renderContactItem(item))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-4 mt-2 border-t border-white/10">
//           <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
//             {showCopyright && (
//               <p className="text-white/40 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
//                 © {currentYear} <span className="text-[#06B6D4] font-medium">{company.name || 'HyperVolt'}</span>. {footerData.footerText || 'All rights reserved.'}
//               </p>
//             )}
            
//             {/* Payment Methods - if enabled */}
//             {footerData.showPaymentMethods !== false && footerData.paymentMethods && footerData.paymentMethods.length > 0 && (
//               <div className="flex items-center gap-2 flex-wrap justify-center">
//                 <span className="text-white/40 text-xs">Secure:</span>
//                 <div className="flex gap-1 flex-wrap">
//                   {footerData.paymentMethods
//                     .filter(pm => pm.active)
//                     .map((pm) => {
//                       const icons = {
//                         visa: FaCcVisa,
//                         mastercard: FaCcMastercard,
//                         paypal: FaPaypal,
//                         applepay: FaApplePay,
//                       };
//                       const Icon = icons[pm.method];
//                       if (!Icon) return null;
//                       return (
//                         <div key={pm.method} className="px-2 py-0.5 bg-white/10 rounded text-[9px] font-medium text-white/60 border border-white/20 flex items-center gap-0.5">
//                           <Icon className="inline text-xs" />
//                           <span>{pm.method}</span>
//                         </div>
//                       );
//                     })}
                  
//                   {/* Free Shipping badge - if in trust badges */}
//                   {trustBadges.some(b => b.type === 'delivery') && (
//                     <div className="px-2 py-0.5 bg-[#06B6D4]/10 rounded text-[9px] font-medium text-[#06B6D4] border border-[#06B6D4]/20">
//                       <FaBolt className="inline mr-0.5" /> Free Shipping
//                     </div>
//                   )}
                  
               
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }



'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
  FaShieldAlt,
  FaYoutube,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaApplePay
} from 'react-icons/fa';
import { HiOutlineBadgeCheck, HiOutlineChip } from 'react-icons/hi';
import { IoIosFlash } from 'react-icons/io';

// Icon mapping for social platforms
const SOCIAL_ICONS = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: FaTwitter,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
};

// Icon mapping for trust badges
const TRUST_BADGE_ICONS = {
  authentic: HiOutlineBadgeCheck,
  warranty: FaShieldAlt,
  delivery: IoIosFlash,
  secure: FaShieldAlt,
  trusted: HiOutlineBadgeCheck,
  return: FaTruck,
  support: FaPhone,
};

export default function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const [footerData, setFooterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch footer data from backend
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/footer');
        
        if (!response.ok) {
          throw new Error('Failed to fetch footer data');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          setFooterData(data.data);
        } else {
          throw new Error('Invalid footer data');
        }
      } catch (err) {
        console.error('Error fetching footer data:', err);
        setError(err.message);
        // Fallback to default data if API fails
        setFooterData(getDefaultFooterData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Default fallback data if API fails
  const getDefaultFooterData = () => ({
    company: {
      name: "Smart Gadget",
      tagline: "Premium Gadgets at Your Fingertips",
      description: "Discover the latest technology with premium quality gadgets, expert support, and fast delivery across Bangladesh.",
      address: "Dhaka, Bangladesh",
      phone: "+880 1XXXXXXXXX",
      email: "support@smartproductbuy.com",
      hours: "Always Open • 24/7 Online Ordering • Quick Response",
      logoUrl: "",
    },
    columns: [
      {
        id: 'default_1',
        title: 'Quick Links',
        type: 'links',
        items: [
          { id: 'dl1', label: 'Home', url: '/' },
          { id: 'dl2', label: 'Products', url: '/products' },
          { id: 'dl3', label: 'Track Order', url: '/track' },
          { id: 'dl4', label: 'About Us', url: '/about' },
        ]
      },
      {
        id: 'default_2',
        title: 'Support',
        type: 'support',
        items: [
          { id: 'ds1', label: 'Contact Us', url: '/contact' },
          { id: 'ds2', label: 'Terms & Conditions', url: '/terms' },
          { id: 'ds3', label: 'Privacy Policy', url: '/privacy' },
        ],
        socialLinks: [
          { platform: 'facebook', url: 'https://facebook.com', active: true },
          { platform: 'youtube', url: 'https://youtube.com', active: true },
        ]
      },
      {
        id: 'default_3',
        title: 'Contact Us',
        type: 'contact',
        items: [
          { id: 'dc1', type: 'address', label: 'Address', value: 'Dhaka, Bangladesh' },
          { id: 'dc2', type: 'phone', label: 'Phone', value: '+880 1XXXXXXXXX' },
          { id: 'dc3', type: 'email', label: 'Email', value: 'support@smartproductbuy.com' },
          { id: 'dc4', type: 'hours', label: 'Hours', value: 'Always Open • 24/7 Online Ordering' },
        ]
      },
      {
        id: 'default_4',
        title: 'Connect With Us',
        type: 'social',
        items: [],
        socialLinks: [
          { platform: 'facebook', url: 'https://facebook.com', active: true },
          { platform: 'youtube', url: 'https://youtube.com', active: true },
        ]
      }
    ],
    trustBadges: [
      { type: 'authentic', label: '100% Authentic', active: true },
      { type: 'warranty', label: 'Official Warranty', active: true },
      { type: 'delivery', label: 'Fast Delivery', active: true },
    ],
    showTrustBadges: true,
    showPaymentMethods: true,
    footerText: 'All rights reserved.',
    showCopyright: true,
  });

  // Get social links from columns (support type or social type)
  const getSocialLinks = () => {
    if (!footerData) return [];
    
    const supportColumn = footerData.columns?.find(col => col.type === 'support' || col.type === 'social');
    if (supportColumn?.socialLinks) {
      return supportColumn.socialLinks.filter(link => link.active);
    }
    return [];
  };

  // Get trust badges
  const getTrustBadges = () => {
    if (!footerData) return [];
    return footerData.trustBadges?.filter(badge => badge.active) || [];
  };

  // Get column items by column title
  const getColumnItems = (title) => {
    if (!footerData) return [];
    const column = footerData.columns?.find(col => col.title === title);
    return column?.items || [];
  };

  // Get contact column items
  const getContactItems = () => {
    if (!footerData) return [];
    const contactColumn = footerData.columns?.find(col => col.type === 'contact');
    return contactColumn?.items || [];
  };



  const openGmail = (email) => {
  // ✅ Use window.open instead of window.location.href
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
};

  // Render contact item based on type
  const renderContactItem = (item) => {
    const icons = {
      address: FaMapMarkerAlt,
      phone: FaPhone,
      email: FaEnvelope,
      hours: FaClock,
    };
    const Icon = icons[item.type];
    
    if (!Icon) return null;

    if (item.type === 'email') {
      return (
        <motion.button 
          key={item.id}
          onClick={() => openGmail(item.value)}
          className="flex items-center gap-2 text-white/70 hover:text-blue-400 transition-colors group w-full text-left text-xs"
          whileHover={{ x: 2 }}
        >
          <div className="w-5 h-5 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
            <Icon className="text-blue-400 text-xs" />
          </div>
          <span className="text-xs">{item.value}</span>
        </motion.button>
      );
    }

    if (item.type === 'address') {
      return (
        <motion.a 
          key={item.id}
          href={`https://maps.google.com/?q=${encodeURIComponent(item.value)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2 text-white/70 hover:text-blue-400 transition-colors group text-xs"
          whileHover={{ x: 2 }}
        >
          <div className="w-5 h-5 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
            <Icon className="text-blue-400 text-xs" />
          </div>
          <span className="text-xs leading-tight">{item.value}</span>
        </motion.a>
      );
    }

    if (item.type === 'phone') {
      return (
        <motion.a 
          key={item.id}
          href={`tel:${item.value}`}
          className="flex items-center gap-2 text-white/70 hover:text-blue-400 transition-colors group text-xs"
          whileHover={{ x: 2 }}
        >
          <div className="w-5 h-5 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
            <Icon className="text-blue-400 text-xs" />
          </div>
          <span className="text-xs">{item.value}</span>
        </motion.a>
      );
    }

    if (item.type === 'hours') {
      return (
        <div key={item.id} className="flex items-start gap-2 text-white/70 text-xs">
          <div className="w-5 h-5 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Icon className="text-blue-400 text-xs" />
          </div>
          <span className="text-xs leading-tight">{item.value}</span>
        </div>
      );
    }

    return null;
  };

  // Show loading state
  if (isLoading) {
    return (
      <footer className="relative text-white overflow-hidden" style={{ backgroundColor: '#111827' }}>
        <div className="container mx-auto px-4 py-6 lg:py-5 relative z-10">
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-white/50 text-sm mt-2">Loading footer...</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (!footerData) {
    return null;
  }

  const company = footerData.company || {};
  const socialLinks = getSocialLinks();
  const trustBadges = getTrustBadges();
  const quickLinks = getColumnItems('Quick Links');
  const supportLinks = getColumnItems('Support');
  const contactItems = getContactItems();
  const showTrustBadges = footerData.showTrustBadges !== false;
  const showCopyright = footerData.showCopyright !== false;
  
  // Check if logo exists
  const hasLogo = company.logoUrl && company.logoUrl.trim() !== '';

  return (
    <footer className="relative text-white overflow-hidden" style={{ backgroundColor: '#111827' }}>
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>
      
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-6 lg:py-5 relative z-10">
        
        {/* Main Grid - 4 Columns Layout */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8 flex flex-col space-y-6 lg:space-y-0 mb-2">
          
          {/* Column 1: Company Info */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <div className="flex flex-col items-center lg:items-start gap-1 mb-2">
              {/* Logo - if available */}
              {hasLogo ? (
                <img 
                  src={company.logoUrl} 
                  alt={company.name || 'Company Logo'} 
                  className="h-12 w-auto mb-1 object-contain"
                />
              ) : (
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {company.name || 'Smart Gadget'}
                </h2>
              )}
              
              {/* Tagline - ALWAYS show if it exists in the database */}
              {company.tagline && (
                <p className="text-white/50 text-xs mt-0.5">
                  {company.tagline}
                </p>
              )}
            </div>
            
            <p className="text-white/70 text-xs mb-3 leading-relaxed max-w-xs">
              {company.description || ''}
            </p>

            {/* Trust Badges */}
            {showTrustBadges && trustBadges.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2 justify-center lg:justify-start">
                {trustBadges.map((badge) => {
                  const IconComponent = TRUST_BADGE_ICONS[badge.type] || HiOutlineBadgeCheck;
                  return (
                    <div key={badge.type} className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
                      <IconComponent className="text-blue-400 text-xs" />
                      <span className="text-xs font-medium text-white/80">{badge.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mobile Layout - Quick Links & Support */}
          <div className="grid grid-cols-2 gap-4 lg:hidden w-full">
            {/* Quick Links - Mobile */}
            {quickLinks.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                  Quick Links
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
                </h3>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.id}>
                      <Link 
                        href={link.url}
                        className="text-white/60 hover:text-blue-400 transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-blue-400 transition-colors"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Support - Mobile */}
            {supportLinks.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                  Support
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
                </h3>
                <ul className="space-y-2">
                  {supportLinks.map((link) => (
                    <li key={link.id}>
                      <Link 
                        href={link.url}
                        className="text-white/60 hover:text-blue-400 transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-blue-400 transition-colors"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Contact Us - Mobile */}
          {contactItems.length > 0 && (
            <div className="lg:hidden w-full">
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Contact Us
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
              </h3>
              
              <div className="space-y-2">
                {contactItems.map((item) => renderContactItem(item))}
              </div>
            </div>
          )}

          {/* Connect With Us - Mobile */}
          {socialLinks.length > 0 && (
            <div className="lg:hidden w-full">
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Connect With Us
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
              </h3>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-1.5">
                {socialLinks.map((social, index) => {
                  const IconComponent = SOCIAL_ICONS[social.platform];
                  if (!IconComponent) return null;
                  return (
                    <motion.a
                      key={social.platform || index}
                      href={social.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-blue-500/20 transition-all duration-300 group"
                      whileHover={{ y: -1 }}
                      title={social.platform}
                    >
                      <span className="text-white/70 group-hover:text-blue-400 transition-colors text-xs">
                        <IconComponent />
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Desktop Layout */}
          
          {/* Column 2: Quick Links (Desktop) */}
          {quickLinks.length > 0 && (
            <div className="hidden lg:block">
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <Link 
                      href={link.url}
                      className="text-white/60 hover:text-blue-400 transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-blue-400 transition-colors"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 3: Support & Connect With Us (Desktop) */}
          {(supportLinks.length > 0 || socialLinks.length > 0) && (
            <div className="hidden lg:block">
              {/* Support Links */}
              {supportLinks.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                    Support
                    <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
                  </h3>
                  <ul className="space-y-2">
                    {supportLinks.map((link) => (
                      <li key={link.id}>
                        <Link 
                          href={link.url}
                          className="text-white/60 hover:text-blue-400 transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-blue-400 transition-colors"></span>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Connect With Us - Desktop */}
              {socialLinks.length > 0 && (
                <div className="mt-0 pt-0">
                  <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                    Connect With Us
                    <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
                  </h3>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {socialLinks.map((social, index) => {
                      const IconComponent = SOCIAL_ICONS[social.platform];
                      if (!IconComponent) return null;
                      return (
                        <motion.a
                          key={social.platform || index}
                          href={social.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-blue-500/20 transition-all duration-300 group"
                          whileHover={{ y: -1 }}
                          title={social.platform}
                        >
                          <span className="text-white/70 group-hover:text-blue-400 transition-colors text-xs">
                            <IconComponent />
                          </span>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Column 4: Contact Us (Desktop) */}
          {contactItems.length > 0 && (
            <div className="hidden lg:block">
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Contact Us
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
              </h3>
              
              <div className="space-y-2">
                {contactItems.map((item) => renderContactItem(item))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="pt-3 mt-1 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
            {showCopyright && (
              <p className="text-white/40 text-xs">
                © {currentYear} <span className="text-white/60 font-medium">{company.name || 'Smart Gadget'}</span>. {footerData.footerText || 'All rights reserved.'}
              </p>
            )}
            
            {/* Payment Methods - if enabled */}
            {footerData.showPaymentMethods !== false && footerData.paymentMethods && footerData.paymentMethods.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-xs">Secure:</span>
                <div className="flex gap-1">
                  {footerData.paymentMethods
                    .filter(pm => pm.active)
                    .map((pm) => {
                      const icons = {
                        visa: FaCcVisa,
                        mastercard: FaCcMastercard,
                        paypal: FaPaypal,
                        applepay: FaApplePay,
                      };
                      const Icon = icons[pm.method];
                      if (!Icon) return null;
                      return (
                        <div key={pm.method} className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-medium text-white/60 border border-white/20 flex items-center gap-0.5">
                          <Icon className="inline text-xs" />
                          <span>{pm.method}</span>
                        </div>
                      );
                    })}
                  
                  {/* Free Shipping badge - if in trust badges */}
                  {trustBadges.some(b => b.type === 'delivery') && (
                    <div className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-medium text-white/60 border border-white/20">
                      <FaTruck className="inline mr-0.5 text-blue-400" /> Free Shipping
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}