// // app/contact/page.jsx
// 'use client';

// import { motion } from 'framer-motion';
// import { useRef, useEffect, useState } from 'react';
// import Link from 'next/link';
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Send,
//   CheckCircle,
//   Clock,
//   Headphones,
//   MessageCircle,
//   ArrowRight,
//   Users,
//   Sparkles,
//   Shield,
//   Truck,
//   Zap,
//   Star,
//   Package,
//   Award,
//   Globe,
//   TrendingUp,
//   Loader2,
//   Info
// } from 'lucide-react';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // ✅ Real brand icons from react-icons/fa (same as admin page)
// import {
//   FaFacebookF,
//   FaInstagram as FaInstagramIcon,
//   FaTwitter as FaTwitterIcon,
//   FaLinkedinIn,
//   FaYoutube as FaYoutubeIcon,
//   FaTiktok,
//   FaPinterest,
//   FaSnapchat,
//   FaTelegram,
//   FaGithub,
//   FaViber,
//   FaFacebookMessenger
// } from 'react-icons/fa';

// // Icon mapping for dynamic icons
// const ICON_MAP = {
//   FaUsers: Users,
//   FaStar: Star,
//   Award: Award,
//   FaClock: Clock,
//   FaBolt: Zap,
//   FaShieldAlt: Shield,
//   FaTruck: Truck,
//   FaHeadset: Headphones,
//   CheckCircle: CheckCircle,
//   Shield: Shield,
//   Truck: Truck,
//   Headphones: Headphones,
//   Clock: Clock,
//   FaPhone: Phone,
//   FaEnvelope: Mail,
//   FaMapMarkerAlt: MapPin,
//   FaWhatsapp: MessageCircle,
// };

// // ✅ Fixed SOCIAL_ICON_MAP with real brand icons
// const SOCIAL_ICON_MAP = {
//   FaFacebookF: FaFacebookF,
//   FaInstagram: FaInstagramIcon,
//   FaTwitter: FaTwitterIcon,
//   FaLinkedinIn: FaLinkedinIn,
//   FaYoutube: FaYoutubeIcon,
//   FaTiktok: FaTiktok,
//   FaPinterest: FaPinterest,
//   FaSnapchat: FaSnapchat,
//   FaTelegram: FaTelegram,
//   FaGithub: FaGithub,
//   FaViber: FaViber,
//   FaFacebookMessenger: FaFacebookMessenger,
// };

// const getIcon = (iconName) => {
//   const Icon = ICON_MAP[iconName];
//   return Icon || Shield;
// };

// const getSocialIcon = (iconName) => {
//   if (!iconName) return FaFacebookF;
  
//   // Try exact match
//   if (SOCIAL_ICON_MAP[iconName]) {
//     return SOCIAL_ICON_MAP[iconName];
//   }
  
//   // Try lowercase
//   const lowerName = iconName.toLowerCase();
//   if (SOCIAL_ICON_MAP[lowerName]) {
//     return SOCIAL_ICON_MAP[lowerName];
//   }
  
//   // Fallback to Facebook
//   return FaFacebookF;
// };

// export default function ContactPage() {
//   const [contactData, setContactData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
  
//   const sectionRef = useRef(null);
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

// // app/contact/page.jsx - Update the handleSubmit function

// const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   setFormStatus({ submitted: true, success: false, message: 'Sending...' });
//   setIsSubmitting(true);

//   try {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
//     // ✅ Use the correct endpoint: /api/contact (POST)
//     // Your backend has router.post('/', submitContactForm)
//     const response = await fetch(`${apiUrl}/api/contact`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         subject: formData.subject || 'General Inquiry',
//         message: formData.message
//       }),
//     });

//     const data = await response.json();

//     if (response.ok && data.success) {
//       setFormStatus({
//         submitted: true,
//         success: true,
//         message: data.message || 'Thank you! We\'ll get back to you within 24 hours.'
//       });
      
//       setFormData({ 
//         name: '', 
//         email: '', 
//         phone: '',
//         subject: '', 
//         message: '' 
//       });
      
//       setTimeout(() => {
//         setFormStatus({ submitted: false, success: false, message: '' });
//       }, 5000);
//     } else {
//       throw new Error(data.error || 'Failed to send message');
//     }
//   } catch (error) {
//     console.error('Contact form error:', error);
//     setFormStatus({
//       submitted: true,
//       success: false,
//       message: error.message || 'Failed to send message. Please try again later.'
//     });
    
//     setTimeout(() => {
//       setFormStatus({ submitted: false, success: false, message: '' });
//     }, 5000);
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   // Default data (Smart Gadget)
//   const defaultData = {
//     hero: {
//       bgImage: 'https://i.ibb.co.com/XkF8TGQZ/jn.png',
//       badge: 'Get in Touch',
//       title: "We'd Love to",
//       highlightText: 'Hear From You',
//       description: 'Have questions about products, orders, or anything else? We\'re here to help and respond within 24 hours.'
//     },
//     stats: [
//       { icon: 'FaUsers', value: '10K+', label: 'Happy Customers' },
//       { icon: 'FaStar', value: '4.9/5', label: 'Average Rating' },
//       { icon: 'Award', value: '100%', label: 'Authentic Products' },
//       { icon: 'FaClock', value: '24/7', label: 'Support Available' }
//     ],
//     quickContacts: [
//       { icon: 'FaPhone', label: 'Phone', value: '+880 1XXXXXXX', link: 'tel:+8801XXXXXXX' },
//       { icon: 'FaEnvelope', label: 'Email', value: 'info@smartgadget.com', link: 'mailto:info@smartgadget.com' },
//       { icon: 'FaMapMarkerAlt', label: 'Address', value: 'Mirpur DOHS, Dhaka', link: 'https://maps.google.com' },
//       { icon: 'FaWhatsapp', label: 'WhatsApp', value: '+880 1XXXXXXX', link: 'https://wa.me/8801XXXXXXX' }
//     ],
//     leftSide: {
//       badge: 'Why Contact Us',
//       title: "We're Here to",
//       subtitle: 'Help You',
//       description: 'Whether you have questions about a product, need assistance with an order, or just want some tech advice - our team is ready to help you.',
//       quickContactTitle: 'Quick Contact',
//       socialTitle: 'Follow Us',
//       features: [
//         { icon: 'CheckCircle', title: 'Quick Response', description: 'We reply within 24 hours' },
//         { icon: 'Shield', title: 'Expert Advice', description: 'Get guidance from tech experts' },
//         { icon: 'Truck', title: 'Order Support', description: 'Track and manage your orders' }
//       ]
//     },
//     socialLinks: [
//       { platform: 'facebook', url: '#', icon: 'FaFacebookF', color: 'hover:bg-[#1877F2]' },
//       { platform: 'youtube', url: '#', icon: 'FaYoutube', color: 'hover:bg-[#FF0000]' },
//       { platform: 'tiktok', url: '#', icon: 'FaTiktok', color: 'hover:bg-[#000000]' },
//       { platform: 'pinterest', url: '#', icon: 'FaPinterest', color: 'hover:bg-[#E60023]' }
//     ],
//     faq: {
//       badge: 'FAQ',
//       title: 'Frequently Asked Questions',
//       description: 'Find quick answers to common questions about our products and services.',
//       items: []
//     },
//     map: {
//       title: 'Find Us',
//       embedCode: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5029279808477!2d90.3686038739732!3d23.83626858547701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14a38f924d3%3A0x39a8c038652ae720!2sHouse%20470%2C%20R9PC%2BHGM%2C%206%20Avenue%206%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1781765267904!5m2!1sen!2sbd'
//     },
//     cta: {
//       bgImage: 'https://i.ibb.co.com/0RHQ0thP/jh.png',
//       badge: 'Still Have Questions?',
//       title: "We're Here to Help",
//       description: 'Our team is ready to assist you with any questions about products, orders, or tech advice.',
//       buttonText: 'Call Now',
//       buttonLink: 'tel:+8801871733305',
//       secondaryButtonText: 'Browse Products',
//       secondaryButtonLink: '/products'
//     },
//     form: {
//       title: 'Send Us a Message',
//       description: "Fill in the form and we'll get back to you within 24 hours",
//       successMessage: "Thank you! We'll get back to you within 24 hours."
//     }
//   };

//   // Fetch contact data from backend
//   useEffect(() => {
//     const fetchContactData = async () => {
//       try {
//         setIsLoading(true);
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

//         const response = await fetch(`${apiUrl}/api/contact`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch contact data: ${response.status}`);
//         }

//         const result = await response.json();

//         if (result.success && result.data) {
//           const mergedData = {
//             hero: { ...defaultData.hero, ...result.data.hero },
//             stats: result.data.stats || defaultData.stats,
//             quickContacts: result.data.quickContacts || defaultData.quickContacts,
//             leftSide: { ...defaultData.leftSide, ...result.data.leftSide },
//             socialLinks: result.data.socialLinks || defaultData.socialLinks,
//             faq: { ...defaultData.faq, ...result.data.faq },
//             map: { ...defaultData.map, ...result.data.map },
//             cta: { ...defaultData.cta, ...result.data.cta },
//             form: { ...defaultData.form, ...result.data.form }
//           };
//           setContactData(mergedData);
//         } else {
//           setContactData(defaultData);
//         }
//       } catch (err) {
//         console.error('❌ Error fetching contact data:', err);
//         setContactData(defaultData);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchContactData();
//   }, []);

//   // Show loading state
//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-white flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
//             <p className="text-gray-500 mt-2">Loading contact page...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const data = contactData || defaultData;
//   const { hero, stats, quickContacts, leftSide, socialLinks, faq, map, cta, form } = data;

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

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-white" ref={sectionRef}>
//         {/* ============================================
//         HERO SECTION
//         ============================================ */}
//         <section className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[300px] overflow-hidden">
//           <div 
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `url("${hero?.bgImage || 'https://i.ibb.co.com/XkF8TGQZ/jn.png'}")`,
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
//                 <MessageCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
//                 <span className="text-[10px] md:text-xs lg:text-sm font-medium text-gray-300">{hero?.badge || 'Get in Touch'}</span>
//               </motion.div>

//               <motion.h1 
//                 variants={itemVariants}
//                 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 md:mb-3 leading-tight"
//               >
//                 <span className="text-white">{hero?.title || "We'd Love to"}</span>
//                 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
//                   {hero?.highlightText || 'Hear From You'}
//                 </span>
//               </motion.h1>

//               <motion.p 
//                 variants={itemVariants}
//                 className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2"
//               >
//                 {hero?.description || 'Have questions about products, orders, or anything else? We\'re here to help and respond within 24 hours.'}
//               </motion.p>
//             </motion.div>
//           </div>
//         </section>

//         {/* ============================================
//         CONTACT INFO - Quick Contacts
//         ============================================ */}
//      <section className="py-6 md:py-10 lg:py-14 bg-gradient-to-b from-gray-50 to-white border-y border-gray-100">
//   <div className="container mx-auto max-w-7xl px-3 sm:px-4">
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.5 }}
//       className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
//     >
//       {quickContacts?.map((info, idx) => {
//         const Icon = getIcon(info.icon);

//         return (
//           <div
//             key={idx}
//             className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-gray-200 p-3 sm:p-4 md:p-5 lg:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
//           >
//             {/* Top Accent - Hidden on very small screens */}
//             <div className="absolute left-0 top-0 h-0.5 sm:h-1 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />

//             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 md:gap-4 text-center sm:text-left">
//               {/* Icon */}
//               <div className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white flex-shrink-0">
//                 <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
//               </div>

//               {/* Content */}
//               <div className="min-w-0 flex-1">
//                 <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">
//                   {info.label}
//                 </h4>

//                 {info.link ? (
//                   <a
//                     href={info.link}
//                     className="text-[10px] sm:text-xs md:text-sm text-gray-600 transition-colors hover:text-blue-600 break-words"
//                   >
//                     {info.value}
//                   </a>
//                 ) : (
//                   <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 break-words">
//                     {info.value}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </motion.div>
//   </div>
// </section>

//         {/* ============================================
//         CONTACT FORM & LEFT CONTENT
//         ============================================ */}
//         <section className="py-10 md:py-14 lg:py-20 bg-gray-50">
//           <div className="container mx-auto px-4 max-w-7xl">
//             <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
//               {/* Left Side - Content */}
//               <motion.div
//                 variants={containerVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.2 }}
//                 className="lg:col-span-2"
//               >
//                 <motion.div variants={itemVariants}>
//                   <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-4">
//                     <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
//                     <span className="text-[10px] md:text-xs font-medium text-blue-700">{leftSide?.badge || 'Why Contact Us'}</span>
//                   </div>
//                 </motion.div>

//                 <motion.h2 
//                   variants={itemVariants}
//                   className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
//                 >
//                   {leftSide?.title || "We're Here to"}
//                   <span className="block text-blue-600">{leftSide?.subtitle || 'Help You'}</span>
//                 </motion.h2>

//                 <motion.p 
//                   variants={itemVariants}
//                   className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed"
//                 >
//                   {leftSide?.description || 'Whether you have questions about a product, need assistance with an order, or just want some tech advice - our team is ready to help you.'}
//                 </motion.p>

//                 <motion.div variants={itemVariants} className="space-y-3 mb-6">
//                   {leftSide?.features && leftSide.features.map((feature, idx) => {
//                     const Icon = getIcon(feature.icon);
//                     return (
//                       <div key={idx} className="flex items-start gap-3">
//                         <div className="w-6 h-6 mt-0.5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
//                           <Icon className="w-3.5 h-3.5 text-green-600" />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
//                           <p className="text-gray-500 text-xs md:text-sm">{feature.description}</p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <div className="flex flex-wrap gap-3">
//                     {socialLinks && socialLinks.map((social, idx) => {
//                       // ✅ Use getSocialIcon to get the correct brand icon
//                       const Icon = getSocialIcon(social.icon);
//                       return (
//                         <a
//                           key={idx}
//                           href={social.url || '#'}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className={`w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center transition-all duration-300 hover:text-white shadow-sm ${social.color || 'hover:bg-[#1877F2]'}`}
//                           aria-label={social.platform}
//                         >
//                           <Icon className="w-4 h-4" />
//                         </a>
//                       );
//                     })}
//                   </div>
//                 </motion.div>
//               </motion.div>

//               {/* Right Side - Contact Form */}
//               <motion.div
//                 initial={{ opacity: 0, x: 30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true, amount: 0.2 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 className="lg:col-span-3"
//               >
//                 <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
//                   <div className="mb-5 md:mb-6">
//                     <h3 className="text-xl md:text-2xl font-bold text-gray-900">{form?.title || 'Send Us a Message'}</h3>
//                     <p className="text-sm text-gray-500">{form?.description || "Fill in the form and we'll get back to you within 24 hours"}</p>
//                   </div>

//                   {formStatus.submitted && formStatus.success ? (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 text-center"
//                     >
//                       <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <CheckCircle className="text-green-600 w-7 h-7 md:w-8 md:h-8" />
//                       </div>
//                       <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Message Sent! 🎉</h4>
//                       <p className="text-sm md:text-base text-gray-600 mb-4">{formStatus.message}</p>
//                       <button
//                         onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
//                         className="text-blue-600 font-semibold hover:text-blue-700 text-sm md:text-base"
//                       >
//                         Send Another Message →
//                       </button>
//                     </motion.div>
//                   ) : (
//                     <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
//                       {/* Form fields - unchanged */}
//                       <div>
//                         <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
//                           Full Name <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
//                           <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                             className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
//                             placeholder="Enter your name"
//                           />
//                         </div>
//                       </div>

//                       <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
//                         <div>
//                           <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
//                             Email <span className="text-red-500">*</span>
//                           </label>
//                           <div className="relative">
//                             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
//                             <input
//                               type="email"
//                               name="email"
//                               value={formData.email}
//                               onChange={handleChange}
//                               required
//                               className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
//                               placeholder="info@email.com"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
//                             Phone <span className="text-red-500">*</span>
//                           </label>
//                           <div className="relative">
//                             <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
//                             <input
//                               type="tel"
//                               name="phone"
//                               value={formData.phone}
//                               onChange={handleChange}
//                               required
//                               className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
//                               placeholder="+880 1XXXXXXXXX"
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
//                           Subject
//                         </label>
//                         <div className="relative">
//                           <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
//                           <input
//                             type="text"
//                             name="subject"
//                             value={formData.subject}
//                             onChange={handleChange}
//                             className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
//                             placeholder="e.g. Product Inquiry"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
//                           Message <span className="text-red-500">*</span>
//                         </label>
//                         <textarea
//                           name="message"
//                           value={formData.message}
//                           onChange={handleChange}
//                           required
//                           rows={4}
//                           className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none bg-gray-50 hover:bg-white"
//                           placeholder="Tell us how we can help you..."
//                         />
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="w-full bg-black text-white font-semibold py-3 md:py-3.5 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 text-sm md:text-base shadow-sm hover:shadow-md"
//                       >
//                         {isSubmitting ? (
//                           <span className="flex items-center gap-2">
//                             <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                             Sending...
//                           </span>
//                         ) : (
//                           <>
//                             Send Message
//                             <Send className="w-4 h-4 md:w-5 md:h-5" />
//                           </>
//                         )}
//                       </button>

//                       <p className="text-center text-[10px] md:text-xs text-gray-400">
//                         🔒 Your information is safe with us. We'll never share your data.
//                       </p>
//                     </form>
//                   )}
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* ============================================
//         MAP SECTION
//         ============================================ */}
   

// {/* ============================================
// MAP SECTION
// ============================================ */}
// <section className="py-10 md:py-14 lg:py-20 bg-white">
//   <div className="container mx-auto px-4 max-w-7xl">
//       <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.5 }}
//       className="text-center mb-8 md:mb-10"
//     >
//       {/* Decorative Line Above */}
//       <div className="flex items-center justify-center gap-3 mb-4 -mt-10">
//         <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
//         <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full px-4 py-1.5 border border-blue-200/50 shadow-sm">
//           <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
//           <span className="text-[10px] md:text-xs font-semibold text-blue-700 uppercase tracking-wider">
//             {map?.title || 'Find Us'}
//           </span>
//         </div>
//         <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400"></div>
//       </div>

//       {/* Main Heading with Gradient */}
//       <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 font-['Playfair_Display']">
//         Visit Our{' '}
//         <span className="bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
//           Showroom
//         </span>
//       </h2>

//       {/* Subtitle */}
//       <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto font-['Inter']">
//         Come visit us at our physical location or reach out through any of our channels below
//       </p>
//     </motion.div>

//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="rounded-2xl overflow-hidden shadow-lg border border-gray-200"
//     >
//       {/* ✅ Extract URL from iframe if full code is provided */}
//       {(() => {
//         let mapSrc = map?.embedCode || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5029279808477!2d90.3686038739732!3d23.83626858547701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14a38f924d3%3A0x39a8c038652ae720!2sHouse%20470%2C%20R9PC%2BHGM%2C%206%20Avenue%206%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1781765267904!5m2!1sen!2sbd';
        
//         // If the embedCode contains iframe, extract the src
//         if (map?.embedCode) {
//           // Try to extract src from iframe
//           if (map.embedCode.includes('src="')) {
//             const srcMatch = map.embedCode.match(/src="([^"]+)"/);
//             if (srcMatch && srcMatch[1]) {
//               mapSrc = srcMatch[1];
//             }
//           } else if (map.embedCode.includes("src='")) {
//             const srcMatch = map.embedCode.match(/src='([^']+)'/);
//             if (srcMatch && srcMatch[1]) {
//               mapSrc = srcMatch[1];
//             }
//           } else if (map.embedCode.startsWith('http://') || map.embedCode.startsWith('https://')) {
//             // It's already a URL
//             mapSrc = map.embedCode;
//           }
//         }
        
//         return (
//           <iframe
//             src={mapSrc}
//             width="100%"
//             height="400"
//             style={{ border: 0 }}
//             allowFullScreen
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             className="w-full h-[250px] sm:h-[300px] md:h-[400px]"
//             title="Smart Gadget Location"
//           />
//         );
//       })()}
//     </motion.div>

//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.5, delay: 0.3 }}
//       className="grid sm:grid-cols-3 gap-4 mt-6"
//     >
//       {quickContacts && quickContacts.slice(0, 3).map((info, idx) => {
//         const Icon = getIcon(info.icon);
//         return (
//           <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
//             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
//               <Icon className="w-5 h-5 text-blue-600" />
//             </div>
//             <p className="text-xs font-medium text-gray-500">{info.label}</p>
//             {info.link ? (
//               <a href={info.link} className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium">
//                 {info.value}
//               </a>
//             ) : (
//               <p className="text-xs md:text-sm text-gray-600">{info.value}</p>
//             )}
//           </div>
//         );
//       })}
//     </motion.div>
//   </div>
// </section>

//         {/* ============================================
//         CTA BANNER
//         ============================================ */}
//         <section className="relative py-10 md:py-14 lg:py-20 overflow-hidden">
//           <div 
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `url("${cta?.bgImage || 'https://i.ibb.co.com/0RHQ0thP/jh.png'}")`,
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
//                 <span className="text-[10px] md:text-xs font-medium text-gray-300">{cta?.badge || 'Still Have Questions?'}</span>
//               </div>
              
//               <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
//                 {cta?.title || "We're Here to Help"}
//               </h2>
              
//               <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-5 md:mb-8 max-w-2xl mx-auto px-4">
//                 {cta?.description || 'Our team is ready to assist you with any questions about products, orders, or tech advice.'}
//               </p>
              
//               <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
//                 <a href={cta?.buttonLink || 'tel:+8801871733305'}>
//                   <button className="group bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all text-xs sm:text-sm md:text-base">
//                     <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
//                     {cta?.buttonText || 'Call Now'}
//                   </button>
//                 </a>
//                 <Link href={cta?.secondaryButtonLink || '/products'}>
//                   <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-2 transition-all text-xs sm:text-sm md:text-base">
//                     {cta?.secondaryButtonText || 'Browse Products'}
//                     <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
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

// app/contact/ContactClient.js
'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Headphones,
  MessageCircle,
  ArrowRight,
  Users,
  Sparkles,
  Shield,
  Truck,
  Zap,
  Star,
  Package,
  Award,
  Globe,
  TrendingUp,
  Loader2,
  Info
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// ✅ Real brand icons from react-icons/fa (same as admin page)
import {
  FaFacebookF,
  FaInstagram as FaInstagramIcon,
  FaTwitter as FaTwitterIcon,
  FaLinkedinIn,
  FaYoutube as FaYoutubeIcon,
  FaTiktok,
  FaPinterest,
  FaSnapchat,
  FaTelegram,
  FaGithub,
  FaViber,
  FaFacebookMessenger
} from 'react-icons/fa';

// Icon mapping for dynamic icons
const ICON_MAP = {
  FaUsers: Users,
  FaStar: Star,
  Award: Award,
  FaClock: Clock,
  FaBolt: Zap,
  FaShieldAlt: Shield,
  FaTruck: Truck,
  FaHeadset: Headphones,
  CheckCircle: CheckCircle,
  Shield: Shield,
  Truck: Truck,
  Headphones: Headphones,
  Clock: Clock,
  FaPhone: Phone,
  FaEnvelope: Mail,
  FaMapMarkerAlt: MapPin,
  FaWhatsapp: MessageCircle,
};

// ✅ Fixed SOCIAL_ICON_MAP with real brand icons
const SOCIAL_ICON_MAP = {
  FaFacebookF: FaFacebookF,
  FaInstagram: FaInstagramIcon,
  FaTwitter: FaTwitterIcon,
  FaLinkedinIn: FaLinkedinIn,
  FaYoutube: FaYoutubeIcon,
  FaTiktok: FaTiktok,
  FaPinterest: FaPinterest,
  FaSnapchat: FaSnapchat,
  FaTelegram: FaTelegram,
  FaGithub: FaGithub,
  FaViber: FaViber,
  FaFacebookMessenger: FaFacebookMessenger,
};

const getIcon = (iconName) => {
  const Icon = ICON_MAP[iconName];
  return Icon || Shield;
};

const getSocialIcon = (iconName) => {
  if (!iconName) return FaFacebookF;
  
  // Try exact match
  if (SOCIAL_ICON_MAP[iconName]) {
    return SOCIAL_ICON_MAP[iconName];
  }
  
  // Try lowercase
  const lowerName = iconName.toLowerCase();
  if (SOCIAL_ICON_MAP[lowerName]) {
    return SOCIAL_ICON_MAP[lowerName];
  }
  
  // Fallback to Facebook
  return FaFacebookF;
};

export default function ContactClient() {
  const [contactData, setContactData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const sectionRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // ========== HELPER FUNCTIONS FOR CLICK HANDLING ==========

  // Handle phone click - opens dial pad
  const handlePhoneClick = (phoneNumber, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (phoneNumber) {
      const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');
      window.open(`tel:${cleanPhone}`, '_blank');
    }
  };

  // Handle email click - opens Gmail compose in new tab (same as TrackPage)
  const handleEmailClick = (email, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (email) {
      // Use the same Gmail compose URL format as TrackPage
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
    }
  };

  // Handle map click - opens in new tab
  const handleMapClick = (mapLink, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (mapLink) {
      window.open(mapLink, '_blank');
    }
  };

  // Handle WhatsApp click - opens in new tab
  const handleWhatsAppClick = (whatsappLink, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (whatsappLink) {
      window.open(whatsappLink, '_blank');
    }
  };

  // Handle social link click - opens in new tab
  const handleSocialClick = (url, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setFormStatus({ submitted: true, success: false, message: 'Sending...' });
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || 'General Inquiry',
          message: formData.message
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus({
          submitted: true,
          success: true,
          message: data.message || 'Thank you! We\'ll get back to you within 24 hours.'
        });
        
        setFormData({ 
          name: '', 
          email: '', 
          phone: '',
          subject: '', 
          message: '' 
        });
        
        setTimeout(() => {
          setFormStatus({ submitted: false, success: false, message: '' });
        }, 5000);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: error.message || 'Failed to send message. Please try again later.'
      });
      
      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, message: '' });
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Default data (Smart Gadget)
  const defaultData = {
    hero: {
      bgImage: 'https://i.ibb.co.com/XkF8TGQZ/jn.png',
      badge: 'Get in Touch',
      title: "We'd Love to",
      highlightText: 'Hear From You',
      description: 'Have questions about products, orders, or anything else? We\'re here to help and respond within 24 hours.'
    },
    stats: [
      { icon: 'FaUsers', value: '10K+', label: 'Happy Customers' },
      { icon: 'FaStar', value: '4.9/5', label: 'Average Rating' },
      { icon: 'Award', value: '100%', label: 'Authentic Products' },
      { icon: 'FaClock', value: '24/7', label: 'Support Available' }
    ],
    quickContacts: [
      { icon: 'FaPhone', label: 'Phone', value: '+880 1XXXXXXX', link: 'tel:+8801XXXXXXX' },
      { icon: 'FaEnvelope', label: 'Email', value: 'info@smartgadget.com', link: 'mailto:info@smartgadget.com' },
      { icon: 'FaMapMarkerAlt', label: 'Address', value: 'Mirpur DOHS, Dhaka', link: 'https://maps.google.com' },
      { icon: 'FaWhatsapp', label: 'WhatsApp', value: '+880 1XXXXXXX', link: 'https://wa.me/8801XXXXXXX' }
    ],
    leftSide: {
      badge: 'Why Contact Us',
      title: "We're Here to",
      subtitle: 'Help You',
      description: 'Whether you have questions about a product, need assistance with an order, or just want some tech advice - our team is ready to help you.',
      quickContactTitle: 'Quick Contact',
      socialTitle: 'Follow Us',
      features: [
        { icon: 'CheckCircle', title: 'Quick Response', description: 'We reply within 24 hours' },
        { icon: 'Shield', title: 'Expert Advice', description: 'Get guidance from tech experts' },
        { icon: 'Truck', title: 'Order Support', description: 'Track and manage your orders' }
      ]
    },
    socialLinks: [
      { platform: 'facebook', url: '#', icon: 'FaFacebookF', color: 'hover:bg-[#1877F2]' },
      { platform: 'youtube', url: '#', icon: 'FaYoutube', color: 'hover:bg-[#FF0000]' },
      { platform: 'tiktok', url: '#', icon: 'FaTiktok', color: 'hover:bg-[#000000]' },
      { platform: 'pinterest', url: '#', icon: 'FaPinterest', color: 'hover:bg-[#E60023]' }
    ],
    faq: {
      badge: 'FAQ',
      title: 'Frequently Asked Questions',
      description: 'Find quick answers to common questions about our products and services.',
      items: []
    },
    map: {
      title: 'Find Us',
      embedCode: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5029279808477!2d90.3686038739732!3d23.83626858547701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14a38f924d3%3A0x39a8c038652ae720!2sHouse%20470%2C%20R9PC%2BHGM%2C%206%20Avenue%206%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1781765267904!5m2!1sen!2sbd'
    },
    cta: {
      bgImage: 'https://i.ibb.co.com/0RHQ0thP/jh.png',
      badge: 'Still Have Questions?',
      title: "We're Here to Help",
      description: 'Our team is ready to assist you with any questions about products, orders, or tech advice.',
      buttonText: 'Call Now',
      buttonLink: 'tel:+8801871733305',
      secondaryButtonText: 'Browse Products',
      secondaryButtonLink: '/products'
    },
    form: {
      title: 'Send Us a Message',
      description: "Fill in the form and we'll get back to you within 24 hours",
      successMessage: "Thank you! We'll get back to you within 24 hours."
    }
  };

  // Fetch contact data from backend
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        const response = await fetch(`${apiUrl}/api/contact`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch contact data: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          const mergedData = {
            hero: { ...defaultData.hero, ...result.data.hero },
            stats: result.data.stats || defaultData.stats,
            quickContacts: result.data.quickContacts || defaultData.quickContacts,
            leftSide: { ...defaultData.leftSide, ...result.data.leftSide },
            socialLinks: result.data.socialLinks || defaultData.socialLinks,
            faq: { ...defaultData.faq, ...result.data.faq },
            map: { ...defaultData.map, ...result.data.map },
            cta: { ...defaultData.cta, ...result.data.cta },
            form: { ...defaultData.form, ...result.data.form }
          };
          setContactData(mergedData);
        } else {
          setContactData(defaultData);
        }
      } catch (err) {
        console.error('❌ Error fetching contact data:', err);
        setContactData(defaultData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-500 mt-2">Loading contact page...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const data = contactData || defaultData;
  const { hero, stats, quickContacts, leftSide, socialLinks, faq, map, cta, form } = data;

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white" ref={sectionRef}>
        {/* ============================================
        HERO SECTION
        ============================================ */}
        <section className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[300px] overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${hero?.bgImage || 'https://i.ibb.co.com/XkF8TGQZ/jn.png'}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10" />

          <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 md:h-64 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 md:h-64 bg-purple-600/15 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 max-w-7xl relative z-10 h-full flex items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="w-full max-w-4xl mx-auto text-center py-6 md:py-8"
            >
              <motion.div 
                variants={itemVariants} 
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-3 md:mb-4 border border-white/10"
              >
                <MessageCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                <span className="text-[10px] md:text-xs lg:text-sm font-medium text-gray-300">{hero?.badge || 'Get in Touch'}</span>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 md:mb-3 leading-tight"
              >
                <span className="text-white">{hero?.title || "We'd Love to"}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {hero?.highlightText || 'Hear From You'}
                </span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2"
              >
                {hero?.description || 'Have questions about products, orders, or anything else? We\'re here to help and respond within 24 hours.'}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ============================================
        CONTACT INFO - Quick Contacts
        ============================================ */}
        <section className="py-6 md:py-10 lg:py-14 bg-gradient-to-b from-gray-50 to-white border-y border-gray-100">
          <div className="container mx-auto max-w-7xl px-3 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
            >
              {quickContacts?.map((info, idx) => {
                const Icon = getIcon(info.icon);
                
                // Determine click handler based on icon type
                const handleClick = (e) => {
                  if (info.icon === 'FaPhone') {
                    handlePhoneClick(info.value, e);
                  } else if (info.icon === 'FaEnvelope') {
                    // ✅ FIXED: Uses Gmail compose URL (same as TrackPage)
                    handleEmailClick(info.value, e);
                  } else if (info.icon === 'FaMapMarkerAlt') {
                    handleMapClick(info.link || 'https://maps.google.com', e);
                  } else if (info.icon === 'FaWhatsapp') {
                    handleWhatsAppClick(info.link, e);
                  } else if (info.link) {
                    window.open(info.link, '_blank');
                  }
                };

                return (
                  <div
                    key={idx}
                    onClick={handleClick}
                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-gray-200 p-3 sm:p-4 md:p-5 lg:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl cursor-pointer"
                  >
                    {/* Top Accent */}
                    <div className="absolute left-0 top-0 h-0.5 sm:h-1 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 md:gap-4 text-center sm:text-left">
                      {/* Icon */}
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white flex-shrink-0">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">
                          {info.label}
                        </h4>
                        <p className="text-[10px] sm:text-xs md:text-sm text-blue-600 hover:text-blue-700 transition-colors break-words">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ============================================
        CONTACT FORM & LEFT CONTENT
        ============================================ */}
        <section className="py-10 md:py-14 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
              {/* Left Side - Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="lg:col-span-2"
              >
                <motion.div variants={itemVariants}>
                  <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-4">
                    <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
                    <span className="text-[10px] md:text-xs font-medium text-blue-700">{leftSide?.badge || 'Why Contact Us'}</span>
                  </div>
                </motion.div>

                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
                >
                  {leftSide?.title || "We're Here to"}
                  <span className="block text-blue-600">{leftSide?.subtitle || 'Help You'}</span>
                </motion.h2>

                <motion.p 
                  variants={itemVariants}
                  className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed"
                >
                  {leftSide?.description || 'Whether you have questions about a product, need assistance with an order, or just want some tech advice - our team is ready to help you.'}
                </motion.p>

                <motion.div variants={itemVariants} className="space-y-3 mb-6">
                  {leftSide?.features && leftSide.features.map((feature, idx) => {
                    const Icon = getIcon(feature.icon);
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 mt-0.5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                          <p className="text-gray-500 text-xs md:text-sm">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks && socialLinks.map((social, idx) => {
                      const Icon = getSocialIcon(social.icon);
                      return (
                        <a
                          key={idx}
                          href={social.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => handleSocialClick(social.url, e)}
                          className={`w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center transition-all duration-300 hover:text-white shadow-sm ${social.color || 'hover:bg-[#1877F2]'}`}
                          aria-label={social.platform}
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
                  <div className="mb-5 md:mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">{form?.title || 'Send Us a Message'}</h3>
                    <p className="text-sm text-gray-500">{form?.description || "Fill in the form and we'll get back to you within 24 hours"}</p>
                  </div>

                  {formStatus.submitted && formStatus.success ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 text-center"
                    >
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="text-green-600 w-7 h-7 md:w-8 md:h-8" />
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Message Sent! 🎉</h4>
                      <p className="text-sm md:text-base text-gray-600 mb-4">{formStatus.message}</p>
                      <button
                        onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
                        className="text-blue-600 font-semibold hover:text-blue-700 text-sm md:text-base"
                      >
                        Send Another Message →
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                      <div>
                        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                            placeholder="Enter your name"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                        <div>
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                              placeholder="info@email.com"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                              placeholder="+880 1XXXXXXXXX"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
                          Subject
                        </label>
                        <div className="relative">
                          <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                            placeholder="e.g. Product Inquiry"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none bg-gray-50 hover:bg-white"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white font-semibold py-3 md:py-3.5 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 text-sm md:text-base shadow-sm hover:shadow-md"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Sending...
                          </span>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 md:w-5 md:h-5" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-[10px] md:text-xs text-gray-400">
                        🔒 Your information is safe with us. We'll never share your data.
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================
        MAP SECTION
        ============================================ */}
        <section className="py-10 md:py-14 lg:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 md:mb-10"
            >
              <div className="flex items-center justify-center gap-3 mb-4 -mt-10">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full px-4 py-1.5 border border-blue-200/50 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
                  <span className="text-[10px] md:text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    {map?.title || 'Find Us'}
                  </span>
                </div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 font-['Playfair_Display']">
                Visit Our{' '}
                <span className="bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
                  Showroom
                </span>
              </h2>

              <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto font-['Inter']">
                Come visit us at our physical location or reach out through any of our channels below
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-200"
            >
              {(() => {
                let mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5029279808477!2d90.3686038739732!3d23.83626858547701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14a38f924d3%3A0x39a8c038652ae720!2sHouse%20470%2C%20R9PC%2BHGM%2C%206%20Avenue%206%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1781765267904!5m2!1sen!2sbd';
                
                if (map?.embedCode) {
                  if (map.embedCode.includes('<iframe')) {
                    const srcMatch = map.embedCode.match(/src="([^"]+)"/);
                    if (srcMatch && srcMatch[1]) {
                      mapSrc = srcMatch[1];
                    }
                  } else if (map.embedCode.startsWith('http://') || map.embedCode.startsWith('https://')) {
                    mapSrc = map.embedCode;
                  }
                }
                
                return (
                  <iframe
                    src={mapSrc}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[250px] sm:h-[300px] md:h-[400px]"
                    title="Smart Gadget Location"
                  />
                );
              })()}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid sm:grid-cols-3 gap-4 mt-6"
            >
              {quickContacts && quickContacts.slice(0, 3).map((info, idx) => {
                const Icon = getIcon(info.icon);
                
                const handleClick = (e) => {
                  if (info.icon === 'FaPhone') {
                    handlePhoneClick(info.value, e);
                  } else if (info.icon === 'FaEnvelope') {
                    // ✅ FIXED: Uses Gmail compose URL (same as TrackPage)
                    handleEmailClick(info.value, e);
                  } else if (info.icon === 'FaMapMarkerAlt') {
                    handleMapClick(info.link || 'https://maps.google.com', e);
                  } else if (info.icon === 'FaWhatsapp') {
                    handleWhatsAppClick(info.link, e);
                  } else if (info.link) {
                    window.open(info.link, '_blank');
                  }
                };

                return (
                  <div 
                    key={idx} 
                    onClick={handleClick}
                    className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-xs font-medium text-gray-500">{info.label}</p>
                    <p className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium">
                      {info.value}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ============================================
        CTA BANNER
        ============================================ */}
        <section className="relative py-10 md:py-14 lg:py-20 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${cta?.bgImage || 'https://i.ibb.co.com/0RHQ0thP/jh.png'}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

          <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-3 md:mb-4 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" />
                <span className="text-[10px] md:text-xs font-medium text-gray-300">{cta?.badge || 'Still Have Questions?'}</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
                {cta?.title || "We're Here to Help"}
              </h2>
              
              <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-5 md:mb-8 max-w-2xl mx-auto px-4">
                {cta?.description || 'Our team is ready to assist you with any questions about products, orders, or tech advice.'}
              </p>
              
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
                <a 
                  href={cta?.buttonLink || 'tel:+8801871733305'}
                  onClick={(e) => {
                    e.preventDefault();
                    const phoneNumber = cta?.buttonLink?.replace('tel:', '') || '+8801871733305';
                    const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');
                    window.open(`tel:${cleanPhone}`, '_blank');
                  }}
                  className="group bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all text-xs sm:text-sm md:text-base"
                >
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {cta?.buttonText || 'Call Now'}
                </a>
                <Link href={cta?.secondaryButtonLink || '/products'}>
                  <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-2 transition-all text-xs sm:text-sm md:text-base">
                    {cta?.secondaryButtonText || 'Browse Products'}
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
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