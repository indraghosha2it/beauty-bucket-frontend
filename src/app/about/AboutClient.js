// // app/about/page.jsx
// 'use client';

// import { motion, useInView } from 'framer-motion';
// import { useRef, useEffect, useState } from 'react';
// import Link from 'next/link';
// import {
//   Shield,
//   Truck,
//   Headphones,
//   Users,
//   Star,
//   Award,
//   Clock,
//   Globe,
//   ArrowRight,
//   Zap,
//   Package,
//   Heart,
//   Sparkles,
//   Target,
//   Eye,
//   TrendingUp
// } from 'lucide-react';
// import Footer from '../components/layout/Footer';
// import Navbar from '../components/layout/Navbar';

// export default function AboutPage() {
//   const sectionRefs = {
//     hero: useRef(null),
//     mission: useRef(null),
//     stats: useRef(null),
//     values: useRef(null),
//   };

//   const inView = {
//     hero: useInView(sectionRefs.hero, { once: true, amount: 0.3 }),
//     mission: useInView(sectionRefs.mission, { once: true, amount: 0.3 }),
//     stats: useInView(sectionRefs.stats, { once: true, amount: 0.3 }),
//     values: useInView(sectionRefs.values, { once: true, amount: 0.3 }),
//   };

//   // Counter animation
//   const [counters, setCounters] = useState({
//     customers: 0,
//     products: 0,
//     satisfaction: 0,
//     support: 0
//   });

//   useEffect(() => {
//     if (inView.stats) {
//       const targetValues = {
//         customers: 10000,
//         products: 500,
//         satisfaction: 98,
//         support: 24
//       };

//       const duration = 2000;
//       const steps = 60;
//       const interval = duration / steps;

//       let currentStep = 0;
//       const timer = setInterval(() => {
//         currentStep++;
//         const progress = currentStep / steps;
        
//         setCounters({
//           customers: Math.round(targetValues.customers * progress),
//           products: Math.round(targetValues.products * progress),
//           satisfaction: Math.round(targetValues.satisfaction * progress),
//           support: Math.round(targetValues.support * progress)
//         });

//         if (currentStep >= steps) {
//           clearInterval(timer);
//           setCounters(targetValues);
//         }
//       }, interval);

//       return () => clearInterval(timer);
//     }
//   }, [inView.stats]);

//   const values = [
//     {
//       icon: <Shield className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Quality Assurance",
//       description: "Every product undergoes rigorous testing to ensure it meets our high standards before reaching your hands."
//     },
//     {
//       icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Customer First",
//       description: "Your satisfaction is our priority. We listen, adapt, and go the extra mile for every customer."
//     },
//     {
//       icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Innovation Driven",
//       description: "We stay ahead of trends, bringing you the latest and most innovative gadgets on the market."
//     },
//     {
//       icon: <Truck className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Fast & Reliable",
//       description: "Quick delivery and hassle-free returns make shopping with us smooth and worry-free."
//     }
//   ];

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
//     <Navbar />
//     <div className="min-h-screen bg-white">
//       {/* ============================================
//       HERO SECTION - Reduced Height with Better Overlay
//       ============================================ */}
//       <section 
//         ref={sectionRefs.hero}
//         className="relative min-h-[220px] sm:min-h-[320px] md:min-h-[280px] lg:min-h-[320px] overflow-hidden"
//         style={{
//           backgroundImage: 'url("https://i.ibb.co.com/SXv2zphh/top-view-vr-glasses-earphones-arrangement.jpg")',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         {/* Dark Overlay - Better transparency */}
//         <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/80" />
        
//         {/* Secondary overlay for depth */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        
//         {/* Gradient Accent Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10" />

//         {/* Subtle Pattern Overlay */}
//         <div className="absolute inset-0 opacity-[0.03]">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30v-6h-3v6h-6v3h6v6h3v-6h6v-3h-6zm0-45V0h-3v6h-6v3h6v6h3V9h6V6h-6zM9 30v-6H6v6H0v3h6v6h3v-6h6v-3H9zM9 6V0H6v6H0v3h6v6h3V9h6V6H9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//             backgroundRepeat: 'repeat'
//           }} />
//         </div>

//         {/* Gradient Orbs - Subtle */}
//         <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 md:h-64 bg-blue-600/15 rounded-full blur-3xl" />
//         <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 md:h-64 bg-purple-600/15 rounded-full blur-3xl" />

//         <div className="container mx-auto px-4 max-w-7xl relative z-10 h-full flex items-center">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate={inView.hero ? "visible" : "hidden"}
//             className="w-full max-w-4xl mx-auto text-center py-6 md:py-8"
//           >
//             <motion.div 
//               variants={itemVariants} 
//               className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-3 md:mb-4 border border-white/10"
//             >
//               <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
//               <span className="text-[10px] md:text-xs lg:text-sm font-medium text-gray-300">About Smart Gadget</span>
//             </motion.div>

//             <motion.h1 
//               variants={itemVariants}
//               className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 md:mb-3 leading-tight"
//             >
//               <span className="text-white">Trusted Tech Partner</span>
            
//             </motion.h1>

//             <motion.p 
//               variants={itemVariants}
//               className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2"
//             >
//               We're on a mission to make premium technology accessible to everyone 
//               in Bangladesh, offering authentic products with exceptional service.
//             </motion.p>

//       <motion.div 
//   variants={itemVariants}
//   className="flex flex-wrap gap-2.5 sm:gap-3 md:gap-4 justify-center mt-4 md:mt-6"
// >
//   <Link href="/products">
//     <button className="group bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 sm:py-2.5 md:px-6 md:py-3 py-1.5 rounded-full font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-blue-600/30 text-[10px] sm:text-sm md:text-base whitespace-nowrap">
//       Explore Products
//       <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
//     </button>
//   </Link>
//   <Link href="/contact">
//     <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-3 sm:px-5 sm:py-2.5 md:px-6 md:py-3 py-1.5 rounded-full font-semibold transition-all text-[10px] sm:text-sm md:text-base whitespace-nowrap">
//       Contact Us
//     </button>
//   </Link>
// </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ============================================
//       MISSION & VISION SECTION
//       ============================================ */}
//       <section 
//         ref={sectionRefs.mission}
//         className="py-10 md:py-14 lg:py-20 bg-gray-50"
//       >
//         <div className="container mx-auto px-4 max-w-7xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={inView.mission ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.5 }}
//             className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
//           >
//             {/* Mission Card */}
//             <div className="group relative bg-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-500">
//               <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 transition-all duration-500" />
//               <div className="relative">
//                 <div className="w-11 h-11 md:w-14 md:h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
//                   <Target className="w-5 h-5 md:w-7 md:h-7 text-blue-600" />
//                 </div>
//                 <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1.5 md:mb-3">Our Mission</h3>
//                 <p className="text-gray-600 text-sm md:text-base leading-relaxed">
//                   To empower people with cutting-edge technology by providing authentic, 
//                   high-quality gadgets at competitive prices, backed by exceptional customer 
//                   service that builds lasting trust.
//                 </p>
//               </div>
//             </div>

//             {/* Vision Card */}
//             <div className="group relative bg-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-500">
//               <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 transition-all duration-500" />
//               <div className="relative">
//                 <div className="w-11 h-11 md:w-14 md:h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
//                   <Eye className="w-5 h-5 md:w-7 md:h-7 text-purple-600" />
//                 </div>
//                 <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1.5 md:mb-3">Our Vision</h3>
//                 <p className="text-gray-600 text-sm md:text-base leading-relaxed">
//                   To become Bangladesh's most trusted tech retailer, creating a seamless 
//                   bridge between global innovation and local needs, making advanced 
//                   technology accessible to every household.
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ============================================
//       STATS SECTION
//       ============================================ */}
//       <section 
//         ref={sectionRefs.stats}
//         className="py-10 md:py-14 lg:py-20 bg-white"
//       >
//         <div className="container mx-auto px-4 max-w-7xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={inView.stats ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.5 }}
//             className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
//           >
//             {[
//               { value: counters.customers, label: "Happy Customers", icon: Users, suffix: "+", color: "from-blue-500 to-blue-600" },
//               { value: counters.products, label: "Premium Products", icon: Package, suffix: "+", color: "from-green-500 to-green-600" },
//               { value: counters.satisfaction, label: "Satisfaction Rate", icon: Star, suffix: "%", color: "from-yellow-500 to-yellow-600" },
//               { value: counters.support, label: "24/7 Support", icon: Headphones, suffix: "", color: "from-purple-500 to-purple-600" }
//             ].map((stat, idx) => {
//               const Icon = stat.icon;
//               return (
//                 <div key={idx} className="text-center p-3 md:p-4 lg:p-6 bg-gray-50 rounded-lg md:rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-md group">
//                   <div className={`w-9 h-9 md:w-12 md:h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-1.5 md:mb-3 group-hover:scale-110 transition-transform duration-300`}>
//                     <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
//                   </div>
//                   <div className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-gray-900">
//                     {stat.value.toLocaleString()}{stat.suffix}
//                   </div>
//                   <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">{stat.label}</p>
//                 </div>
//               );
//             })}
//           </motion.div>
//         </div>
//       </section>

//       {/* ============================================
//       VALUES SECTION
//       ============================================ */}
//    <section 
//   ref={sectionRefs.values}
//   className="py-10 md:py-14 lg:py-20 bg-gray-50"
// >
//   <div className="container mx-auto px-4 max-w-7xl">
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={inView.values ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.5 }}
//       className="text-center mb-6 md:mb-10 lg:mb-12"
//     >
//       <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4">
//         <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
//         <span className="text-[10px] md:text-sm font-medium text-blue-700">Core Values</span>
//       </div>
//       <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">What Drives Us</h2>
//       <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-1.5 md:mt-2 max-w-2xl mx-auto px-4">
//         These principles guide every decision we make and every product we offer.
//       </p>
//     </motion.div>

//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate={inView.values ? "visible" : "hidden"}
//       className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4 lg:gap-6"
//     >
//       {values.map((value, idx) => {
//         return (
//           <motion.div 
//             key={idx} 
//             variants={itemVariants}
//             className="group bg-white rounded-lg md:rounded-xl lg:rounded-2xl p-2.5 sm:p-3 md:p-5 lg:p-6 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center sm:block sm:text-left"
//           >
//             <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg md:rounded-xl flex items-center justify-center mb-1.5 sm:mb-2 md:mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300 mx-auto sm:mx-0">
//               <div className="text-blue-600 group-hover:scale-110 transition-transform">
//                 {value.icon}
//               </div>
//             </div>
//             <h4 className="text-[10px] sm:text-xs md:text-lg font-bold text-gray-900 mb-0.5 sm:mb-1 md:mb-2 leading-tight">
//               {value.title}
//             </h4>
//             <p className="text-gray-600 text-[8px] sm:text-[10px] md:text-sm leading-tight sm:leading-relaxed">
//               {value.description}
//             </p>
//           </motion.div>
//         );
//       })}
//     </motion.div>
//   </div>
// </section>

//       {/* ============================================
//       WHY CHOOSE US
//       ============================================ */}
// <section className="py-10 md:py-14 lg:py-20 bg-white">
//   <div className="container mx-auto px-4 max-w-7xl">
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="text-center mb-6 md:mb-10 lg:mb-12"
//     >
//       <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4">
//         <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" />
//         <span className="text-[10px] md:text-sm font-medium text-green-700">Why Smart Gadget</span>
//       </div>
//       <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Why Choose Us</h2>
//       <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-1.5 md:mt-2 max-w-2xl mx-auto px-4">
//         Here's why thousands of customers trust us for their tech needs
//       </p>
//     </motion.div>

//     <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:gap-6">
//       {[
//         {
//           icon: <Shield className="w-3.5 h-3.5 md:w-5 md:h-5" />,
//           title: "100% Authentic Products",
//           description: "We source directly from authorized distributors to guarantee genuineness."
//         },
//         {
//           icon: <Truck className="w-3.5 h-3.5 md:w-5 md:h-5" />,
//           title: "Free & Fast Delivery",
//           description: "Free delivery on orders over ৳3,000 and same-day dispatch."
//         },
//         {
//           icon: <Headphones className="w-3.5 h-3.5 md:w-5 md:h-5" />,
//           title: "Expert Support",
//           description: "Our tech-savvy team is available 24/7 to help you choose the right product."
//         },
//         {
//           icon: <Clock className="w-3.5 h-3.5 md:w-5 md:h-5" />,
//           title: "Easy Returns",
//           description: "Hassle-free returns within 7 days if you're not completely satisfied."
//         },
//         {
//           icon: <Globe className="w-3.5 h-3.5 md:w-5 md:h-5" />,
//           title: "Wide Selection",
//           description: "From premium smartphones to smart home gadgets - we have it all."
//         },
//         {
//           icon: <TrendingUp className="w-3.5 h-3.5 md:w-5 md:h-5" />,
//           title: "Best Prices",
//           description: "We offer competitive pricing without compromising on quality."
//         }
//       ].map((feature, idx) => {
//         return (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: idx * 0.08 }}
//             className="group bg-gray-50 rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300 flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4"
//           >
//             <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
//               {feature.icon}
//             </div>
//             <div className="flex-1 min-w-0">
//               <h4 className="font-semibold text-gray-900 text-[10px] sm:text-xs md:text-sm lg:text-base mb-0.5 md:mb-1 leading-tight">
//                 {feature.title}
//               </h4>
//               <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-gray-500 leading-tight sm:leading-relaxed">
//                 {feature.description}
//               </p>
//             </div>
//           </motion.div>
//         );
//       })}
//     </div>
//   </div>
// </section>

//       {/* ============================================
//       CTA BANNER
//       ============================================ */}
//   <section className="relative py-10 md:py-14 lg:py-20 overflow-hidden">
//   {/* Background Image - No Overlay */}
//   <div 
//     className="absolute inset-0"
//     style={{
//       backgroundImage: `url("https://i.ibb.co.com/0RHQ0thP/jh.png")`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat'
//     }}
//   />

//   {/* Dark Overlay - Removed! */}
//   {/* The overlay div has been removed */}

//   {/* Gradient Orbs - Still visible for effect */}
//   <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
//   <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />

//   {/* Semi-transparent dark background for text readability */}
//   <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

//   <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-3 md:mb-4 border border-white/10">
//         <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" />
//         <span className="text-[10px] md:text-xs font-medium text-gray-300">Exclusive Deals</span>
//       </div>
      
//       <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
//         Ready to Upgrade Your Tech?
//       </h2>
      
//       <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-5 md:mb-8 max-w-2xl mx-auto px-4">
//         Explore our collection of premium gadgets and find the perfect match for your needs.
//       </p>
      
//       <Link href="/products">
//         <button className="group bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all text-xs sm:text-sm md:text-base">
//           Shop Now
//           <ArrowRight className="w-3.5 h-3.5 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
//         </button>
//       </Link>
//     </motion.div>
//   </div>
// </section>
//     </div>
 
//     <Footer />

//   </>

//   );  

// }

// app/about/page.jsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  Truck,
  Headphones,
  Users,
  Star,
  Award,
  Clock,
  Globe,
  ArrowRight,
  Zap,
  Package,
  Heart,
  Sparkles,
  Target,
  Eye,
  TrendingUp
} from 'lucide-react';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

// Icon mapping for dynamic icons
const ICON_MAP = {
  Shield: Shield,
  Truck: Truck,
  Headphones: Headphones,
  Users: Users,
  Star: Star,
  Award: Award,
  Clock: Clock,
  Globe: Globe,
  Zap: Zap,
  Package: Package,
  Heart: Heart,
  Sparkles: Sparkles,
  Target: Target,
  Eye: Eye,
  TrendingUp: TrendingUp
};

const getIcon = (iconName) => {
  const Icon = ICON_MAP[iconName];
  return Icon || Shield;
};

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // 🟢 We only need refs for sections that need to be observed manually
  // But with whileInView, we might not need any refs at all for animation triggers
  // Keep hero ref for background image if needed, but remove the others
  const heroRef = useRef(null);

  // Counter animation
  const [counters, setCounters] = useState({
    customers: 0,
    products: 0,
    satisfaction: 0,
    support: 0
  });

  // Default hardcoded data
  const defaultData = {
    hero: {
      image: 'https://i.ibb.co.com/SXv2zphh/top-view-vr-glasses-earphones-arrangement.jpg',
      badge: 'About Smart Gadget',
      title: 'Trusted Tech Partner',
      description: "We're on a mission to make premium technology accessible to everyone in Bangladesh, offering authentic products with exceptional service.",
      buttonText: 'Explore Products',
      buttonLink: '/products',
      secondaryButtonText: 'Contact Us',
      secondaryButtonLink: '/contact'
    },
    mission: {
      title: 'Our Mission',
      description: 'To empower people with cutting-edge technology by providing authentic, high-quality gadgets at competitive prices, backed by exceptional customer service that builds lasting trust.'
    },
    vision: {
      title: 'Our Vision',
      description: "To become Bangladesh's most trusted tech retailer, creating a seamless bridge between global innovation and local needs, making advanced technology accessible to every household."
    },
    stats: [
      { icon: 'Users', value: '10000', label: 'Happy Customers', suffix: '+', color: 'from-blue-500 to-blue-600' },
      { icon: 'Package', value: '500', label: 'Premium Products', suffix: '+', color: 'from-green-500 to-green-600' },
      { icon: 'Star', value: '98', label: 'Satisfaction Rate', suffix: '%', color: 'from-yellow-500 to-yellow-600' },
      { icon: 'Headphones', value: '24', label: '24/7 Support', suffix: '', color: 'from-purple-500 to-purple-600' }
    ],
    values: [
      {
        icon: 'Shield',
        title: 'Quality Assurance',
        description: 'Every product undergoes rigorous testing to ensure it meets our high standards before reaching your hands.'
      },
      {
        icon: 'Users',
        title: 'Customer First',
        description: 'Your satisfaction is our priority. We listen, adapt, and go the extra mile for every customer.'
      },
      {
        icon: 'Zap',
        title: 'Innovation Driven',
        description: 'We stay ahead of trends, bringing you the latest and most innovative gadgets on the market.'
      },
      {
        icon: 'Truck',
        title: 'Fast & Reliable',
        description: 'Quick delivery and hassle-free returns make shopping with us smooth and worry-free.'
      }
    ],
    features: [
      {
        icon: 'Shield',
        title: '100% Authentic Products',
        description: 'We source directly from authorized distributors to guarantee genuineness.'
      },
      {
        icon: 'Truck',
        title: 'Free & Fast Delivery',
        description: 'Free delivery on orders over ৳3,000 and same-day dispatch.'
      },
      {
        icon: 'Headphones',
        title: 'Expert Support',
        description: 'Our tech-savvy team is available 24/7 to help you choose the right product.'
      },
      {
        icon: 'Clock',
        title: 'Easy Returns',
        description: "Hassle-free returns within 7 days if you're not completely satisfied."
      },
      {
        icon: 'Globe',
        title: 'Wide Selection',
        description: 'From premium smartphones to smart home gadgets - we have it all.'
      },
      {
        icon: 'TrendingUp',
        title: 'Best Prices',
        description: 'We offer competitive pricing without compromising on quality.'
      }
    ],
    cta: {
      image: 'https://i.ibb.co.com/0RHQ0thP/jh.png',
      badge: 'Exclusive Deals',
      title: 'Ready to Upgrade Your Tech?',
      description: 'Explore our collection of premium gadgets and find the perfect match for your needs.',
      buttonText: 'Shop Now',
      buttonLink: '/products'
    },
    counters: {
      customers: 10000,
      products: 500,
      satisfaction: 98,
      support: 24
    }
  };

  // Fetch about data from backend
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        const response = await fetch(`${apiUrl}/api/about/page`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch about data: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          const statsWithValue = (result.data.stats || []).map(stat => ({
            ...stat,
            value: stat.value || '0'
          }));
          
          const mergedData = {
            hero: { ...defaultData.hero, ...result.data.hero },
            mission: { ...defaultData.mission, ...result.data.mission },
            vision: { ...defaultData.vision, ...result.data.vision },
            stats: statsWithValue.length > 0 ? statsWithValue : defaultData.stats,
            values: result.data.values && result.data.values.length > 0 ? result.data.values : defaultData.values,
            features: result.data.features && result.data.features.length > 0 ? result.data.features : defaultData.features,
            cta: { ...defaultData.cta, ...result.data.cta },
            counters: { ...defaultData.counters, ...result.data.counters }
          };
          
          setAboutData(mergedData);
        } else {
          setAboutData(defaultData);
        }
      } catch (err) {
        console.error('Error fetching about data:', err);
        setAboutData(defaultData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Counter animation effect - keep this as is
  useEffect(() => {
    if (aboutData) {
      const targetValues = {
        customers: aboutData.counters?.customers || 10000,
        products: aboutData.counters?.products || 500,
        satisfaction: aboutData.counters?.satisfaction || 98,
        support: aboutData.counters?.support || 24
      };

      // Start counter animation immediately when data loads
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          customers: Math.round(targetValues.customers * progress),
          products: Math.round(targetValues.products * progress),
          satisfaction: Math.round(targetValues.satisfaction * progress),
          support: Math.round(targetValues.support * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(targetValues);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [aboutData]);

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

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-2">Loading about page...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Use data from backend or fallback
  const data = aboutData || defaultData;
  const { hero, mission, vision, stats, values, features, cta } = data;

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-white">
      {/* ============================================
      HERO SECTION - Keep as is (it's already working)
      ============================================ */}
      <section 
        ref={heroRef}
        className="relative min-h-[220px] sm:min-h-[320px] md:min-h-[280px] lg:min-h-[320px] overflow-hidden"
        style={{
          backgroundImage: `url("${hero?.image || 'https://i.ibb.co.com/SXv2zphh/top-view-vr-glasses-earphones-arrangement.jpg'}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
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
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
              <span className="text-[10px] md:text-xs lg:text-sm font-medium text-gray-300">{hero?.badge || 'About Smart Gadget'}</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 md:mb-3 leading-tight"
            >
              <span className="text-white">{hero?.title || 'Trusted Tech Partner'}</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2"
            >
              {hero?.description || "We're on a mission to make premium technology accessible to everyone in Bangladesh, offering authentic products with exceptional service."}
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-2.5 sm:gap-3 md:gap-4 justify-center mt-4 md:mt-6"
            >
              <Link href={hero?.buttonLink || '/products'}>
                <button className="group bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 sm:py-2.5 md:px-6 md:py-3 py-1.5 rounded-full font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-blue-600/30 text-[10px] sm:text-sm md:text-base whitespace-nowrap">
                  {hero?.buttonText || 'Explore Products'}
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href={hero?.secondaryButtonLink || '/contact'}>
                <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-3 sm:px-5 sm:py-2.5 md:px-6 md:py-3 py-1.5 rounded-full font-semibold transition-all text-[10px] sm:text-sm md:text-base whitespace-nowrap">
                  {hero?.secondaryButtonText || 'Contact Us'}
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
      MISSION & VISION SECTION - FIXED with whileInView
      ============================================ */}
      <section className="py-10 md:py-14 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
          >
            {/* Mission Card */}
            <div className="group relative bg-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 transition-all duration-500" />
              <div className="relative">
                <div className="w-11 h-11 md:w-14 md:h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-5 h-5 md:w-7 md:h-7 text-blue-600" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1.5 md:mb-3">{mission?.title || 'Our Mission'}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {mission?.description || 'To empower people with cutting-edge technology by providing authentic, high-quality gadgets at competitive prices, backed by exceptional customer service that builds lasting trust.'}
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 transition-all duration-500" />
              <div className="relative">
                <div className="w-11 h-11 md:w-14 md:h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-5 h-5 md:w-7 md:h-7 text-purple-600" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1.5 md:mb-3">{vision?.title || 'Our Vision'}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {vision?.description || "To become Bangladesh's most trusted tech retailer, creating a seamless bridge between global innovation and local needs, making advanced technology accessible to every household."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
      STATS SECTION - FIXED with whileInView
      ============================================ */}
      <section className="py-10 md:py-14 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
          >
            {stats && stats.length > 0 ? stats.map((stat, idx) => {
              const Icon = getIcon(stat.icon);
              let displayValue;
              if (stat.label === 'Happy Customers') displayValue = counters.customers;
              else if (stat.label === 'Premium Products') displayValue = counters.products;
              else if (stat.label === 'Satisfaction Rate') displayValue = counters.satisfaction;
              else if (stat.label === '24/7 Support') displayValue = counters.support;
              else displayValue = parseInt(stat.value) || 0;
              
              return (
                <div key={idx} className="text-center p-3 md:p-4 lg:p-6 bg-gray-50 rounded-lg md:rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-md group">
                  <div className={`w-9 h-9 md:w-12 md:h-12 bg-gradient-to-br ${stat.color || 'from-blue-500 to-blue-600'} rounded-full flex items-center justify-center mx-auto mb-1.5 md:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                    {displayValue.toLocaleString()}{stat.suffix || ''}
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">{stat.label}</p>
                </div>
              );
            }) : (
              <div className="col-span-4 text-center py-8 text-gray-500">No stats available</div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============================================
      VALUES SECTION - FIXED with whileInView
      ============================================ */}
      <section className="py-10 md:py-14 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 md:mb-10 lg:mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4">
              <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
              <span className="text-[10px] md:text-sm font-medium text-blue-700">Core Values</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">What Drives Us</h2>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-1.5 md:mt-2 max-w-2xl mx-auto px-4">
              These principles guide every decision we make and every product we offer.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4 lg:gap-6"
          >
            {values && values.length > 0 ? values.map((value, idx) => {
              const Icon = getIcon(value.icon);
              return (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className="group bg-white rounded-lg md:rounded-xl lg:rounded-2xl p-2.5 sm:p-3 md:p-5 lg:p-6 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center sm:block sm:text-left"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg md:rounded-xl flex items-center justify-center mb-1.5 sm:mb-2 md:mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300 mx-auto sm:mx-0">
                    <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-6 md:h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-[10px] sm:text-xs md:text-lg font-bold text-gray-900 mb-0.5 sm:mb-1 md:mb-2 leading-tight">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 text-[8px] sm:text-[10px] md:text-sm leading-tight sm:leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            }) : (
              <div className="col-span-4 text-center py-8 text-gray-500">No values available</div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============================================
      WHY CHOOSE US (FEATURES) - Already working with whileInView
      ============================================ */}
      <section className="py-10 md:py-14 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 md:mb-10 lg:mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4">
              <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" />
              <span className="text-[10px] md:text-sm font-medium text-green-700">Why Smart Gadget</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Why Choose Us</h2>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-1.5 md:mt-2 max-w-2xl mx-auto px-4">
              Here's why thousands of customers trust us for their tech needs
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:gap-6">
            {features && features.length > 0 ? features.map((feature, idx) => {
              const Icon = getIcon(feature.icon);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="group bg-gray-50 rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300 flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                    <Icon className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-[10px] sm:text-xs md:text-sm lg:text-base mb-0.5 md:mb-1 leading-tight">
                      {feature.title}
                    </h4>
                    <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-gray-500 leading-tight sm:leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            }) : (
              <div className="col-span-3 text-center py-8 text-gray-500">No features available</div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================
      CTA BANNER - Already working with whileInView
      ============================================ */}
      <section className="relative py-10 md:py-14 lg:py-20 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${cta?.image || 'https://i.ibb.co.com/0RHQ0thP/jh.png'}")`,
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
              <span className="text-[10px] md:text-xs font-medium text-gray-300">{cta?.badge || 'Exclusive Deals'}</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
              {cta?.title || 'Ready to Upgrade Your Tech?'}
            </h2>
            
            <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-5 md:mb-8 max-w-2xl mx-auto px-4">
              {cta?.description || 'Explore our collection of premium gadgets and find the perfect match for your needs.'}
            </p>
            
            <Link href={cta?.buttonLink || '/products'}>
              <button className="group bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all text-xs sm:text-sm md:text-base">
                {cta?.buttonText || 'Shop Now'}
                <ArrowRight className="w-3.5 h-3.5 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
 
    <Footer />
    </>
  );
}