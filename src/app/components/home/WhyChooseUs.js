
// // app/components/WhyChooseUs.jsx
// 'use client';

// import { motion } from 'framer-motion';
// import { 
//   Shield, Truck, Leaf, Award, Sparkles, 
//   Heart, Star, Clock, Gift, Flower2,
//   Droplets, Sun, Moon, ThumbsUp, CheckCircle2, Crown,
//   Users, Smile, Gem, Hand
// } from 'lucide-react';
// import { useState, useEffect } from 'react';

// // Font family constants - Updated to match site theme
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// // Icon mapping for dynamic rendering
// const iconMap = {
//   Shield, Truck, Leaf, Award, Sparkles,
//   Heart, Star, Clock, Gift, Flower2,
//   Droplets, Sun, Moon, ThumbsUp, CheckCircle2,
//   Crown, Users, Smile, Gem, Hand
// };

// // State Card Component - Left Side (Glassmorphism Style)
// const StateCardLeft = ({ icon: Icon, title, description, delay }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -30 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay }}
//       className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#8B9D83]/50 cursor-default hover:scale-[1.02]"
//     >
//       {/* Subtle glow effect */}
//       <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8B9D83]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
//       <div className="flex items-start gap-3 md:gap-4 relative z-10">
//         {/* Icon Container - Glass effect */}
//         <div className="flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_30px_rgba(139,157,131,0.3)]">
//           <Icon className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#8B9D83] group-hover:text-white transition-colors duration-300" />
//         </div>
        
//         {/* Text Content */}
//         <div className="flex-1 min-w-0">
//           <h4 className="text-xs md:text-sm font-semibold text-white mb-0.5 text-left" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//             {title}
//           </h4>
//           <p className="text-[10px] md:text-xs text-white/70 leading-relaxed text-left group-hover:text-white/90 transition-colors duration-300" style={{ fontFamily: FONT_FAMILY }}>
//             {description}
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // State Card Component - Right Side (Glassmorphism Style)
// const StateCardRight = ({ icon: Icon, title, description, delay }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 30 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay }}
//       className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#8B9D83]/50 cursor-default hover:scale-[1.02]"
//     >
//       {/* Subtle glow effect */}
//       <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8B9D83]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
//       <div className="flex items-start gap-3 md:gap-4 relative z-10">
//         {/* Icon Container - Glass effect */}
//         <div className="flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_30px_rgba(139,157,131,0.3)]">
//           <Icon className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#8B9D83] group-hover:text-white transition-colors duration-300" />
//         </div>
        
//         {/* Text Content - Left Aligned */}
//         <div className="flex-1 min-w-0">
//           <h4 className="text-xs md:text-sm font-semibold text-white mb-0.5 text-left" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//             {title}
//           </h4>
//           <p className="text-[10px] md:text-xs text-white/70 leading-relaxed text-left group-hover:text-white/90 transition-colors duration-300" style={{ fontFamily: FONT_FAMILY }}>
//             {description}
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Main Component
// export default function WhyChooseUs() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/why-choose-us/public');
      
//       if (response.ok) {
//         const result = await response.json();
//         if (result.success) {
//           setData(result.data);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching why choose us data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <section className="py-10 md:py-14 lg:py-16 relative">
//         <div className="container mx-auto px-4 text-center">
//           <div className="w-8 h-8 border-2 border-[#8B9D83] border-t-transparent rounded-full animate-spin mx-auto"></div>
//         </div>
//       </section>
//     );
//   }

//   // Use data from API or fallback to defaults
//   const section = data?.section || {
//     badge: 'Why Choose Us',
//     title: 'Why Choose Us',
//     subtitle: 'Discover why thousands of beauty enthusiasts trust us for their skincare and makeup needs'
//   };

//   const leftCards = data?.leftCards || [];
//   const rightCards = data?.rightCards || [];
//   const centerImage = data?.centerImage || '/images/choose.jpg';
//   const trustBadges = data?.trustBadges || [];

//   // Combine all cards for mobile
//   const allCards = [...leftCards, ...rightCards];

//   // Get icon component
//   const getIcon = (iconName) => {
//     const Icon = iconMap[iconName];
//     return Icon || Shield;
//   };

//   return (
//     <section className="relative py-10 md:py-14 lg:py-10 overflow-hidden">
//       {/* ============================================================
//           BACKGROUND IMAGE WITH OVERLAY
//           ============================================================ */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ 
//           backgroundImage: `url('/images/wbg-2.png')`,
//           backgroundAttachment: 'fixed'
//         }}
//       />
      
//       {/* Dark Overlay - Black with gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75" />
      
//       {/* Subtle green gradient overlay for depth */}
//       <div className="absolute inset-0 bg-gradient-to-t from-[#8B9D83]/10 via-transparent to-[#8B9D83]/5" />

//       {/* Background Decorative Elements */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         {/* Glowing orbs - Green */}
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8B9D83]/10 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8B9D83]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
//         {/* Decorative floating elements */}
//         <div className="absolute top-20 left-[10%] opacity-20 hidden lg:block">
//           <Flower2 className="w-6 h-6 text-[#8B9D83]" />
//         </div>
//         <div className="absolute bottom-20 right-[10%] opacity-20 hidden lg:block">
//           <Droplets className="w-6 h-6 text-[#8B9D83]" />
//         </div>
//         <div className="absolute top-1/2 left-[3%] opacity-10 hidden lg:block">
//           <Leaf className="w-8 h-8 text-[#8B9D83]" />
//         </div>
//         <div className="absolute top-1/2 right-[3%] opacity-10 hidden lg:block">
//           <Sun className="w-8 h-8 text-[#8B9D83]" />
//         </div>

//         {/* Subtle pattern overlay */}
//         <div 
//           className="absolute inset-0 opacity-[0.03]"
//           style={{
//             backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
//             backgroundSize: '28px 28px',
//           }}
//         />
//       </div>

//       <div className="container mx-auto px-4 max-w-7xl relative z-10">
//         {/* Section Header - White text for dark background */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-6 md:mb-10"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#8B9D83]/20 backdrop-blur-sm rounded-full mb-3 border border-[#8B9D83]/30">
//             <Sparkles className="w-3.5 h-3.5 text-[#8B9D83]" />
//             <span className="text-xs font-medium text-[#8B9D83] tracking-wider uppercase" style={{ fontFamily: FONT_FAMILY }}>
//               {section.badge}
//             </span>
//             <Sparkles className="w-3.5 h-3.5 text-[#8B9D83]" />
//           </div>
          
//           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white" style={{ fontFamily: FONT_FAMILY }}>
//             {section.title}
//           </h2>
          
//           <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto mt-2" style={{ fontFamily: FONT_FAMILY }}>
//             {section.subtitle}
//           </p>
//         </motion.div>

//         {/* MOBILE VIEW - 2 Columns Grid */}
//         <div className="lg:hidden grid grid-cols-2 gap-3 md:gap-4">
//           {allCards.map((card, index) => {
//             const Icon = getIcon(card.icon);
//             return (
//               <motion.div
//                 key={card.id || index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.4, delay: index * 0.05 }}
//                 className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#8B9D83]/50 cursor-default hover:scale-[1.02]"
//               >
//                 <div className="flex flex-col items-center text-center relative z-10">
//                   <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_30px_rgba(139,157,131,0.3)] mb-2">
//                     <Icon className="w-4.5 h-4.5 md:w-5 md:h-5 text-[#8B9D83] group-hover:text-white transition-colors duration-300" />
//                   </div>
//                   <h4 className="text-xs md:text-sm font-semibold text-white mb-0.5 text-center" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     {card.title}
//                   </h4>
//                   <p className="text-[10px] md:text-xs text-white/70 leading-relaxed text-center group-hover:text-white/90 transition-colors duration-300" style={{ fontFamily: FONT_FAMILY }}>
//                     {card.description}
//                   </p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* DESKTOP VIEW - 3 Column Layout */}
//         <div className="hidden lg:grid lg:grid-cols-3 gap-6 md:gap-8 items-start">
//           {/* LEFT COLUMN */}
//           <div className="space-y-3 md:space-y-4">
//             {leftCards.map((card, index) => {
//               const Icon = getIcon(card.icon);
//               return (
//                 <StateCardLeft
//                   key={card.id || index}
//                   icon={Icon}
//                   title={card.title}
//                   description={card.description}
//                   delay={0.1 + index * 0.08}
//                 />
//               );
//             })}
//           </div>

//           {/* CENTER COLUMN - Image with glass frame */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="flex justify-center items-start"
//           >
//             <div className="relative w-full max-w-xs">
//               {/* Outer glow ring - Green */}
//               <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#8B9D83]/30 via-transparent to-[#8B9D83]/30 blur-xl" />
              
//               <div className="relative rounded-t-full overflow-hidden shadow-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm">
//                 <div className="relative w-full aspect-[3/4] min-h-[300px] md:min-h-[350px] overflow-hidden">
//                   <img
//                     src={centerImage}
//                     alt="Beauty products"
//                     className="w-full h-full object-cover"
//                     loading="lazy"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = '/images/choose.jpg';
//                     }}
//                   />
                  
//                   {/* Gradient overlay on image */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
//                   {/* Decorative elements on image */}
//                   <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md rounded-full p-1.5 shadow-lg border border-white/20">
//                     <Sparkles className="w-3.5 h-3.5 text-[#8B9D83]" />
//                   </div>
                  
//                   <div className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 shadow-lg border border-white/20">
//                     <span className="text-[10px] font-medium text-white" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       Beauty & Glow
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* RIGHT COLUMN */}
//           <div className="space-y-3 md:space-y-4">
//             {rightCards.map((card, index) => {
//               const Icon = getIcon(card.icon);
//               return (
//                 <StateCardRight
//                   key={card.id || index}
//                   icon={Icon}
//                   title={card.title}
//                   description={card.description}
//                   delay={0.1 + index * 0.08}
//                 />
//               );
//             })}
//           </div>
//         </div>

//         {/* Bottom Trust Badges - White text */}
//         {trustBadges.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//             className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10 flex flex-wrap justify-center gap-3 md:gap-6"
//           >
//             {trustBadges.map((badge, index) => {
//               const Icon = getIcon(badge.icon);
//               return (
//                 <div key={badge.id || index} className="flex items-center gap-2 group">
//                   <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#8B9D83] group-hover:scale-110 transition-transform duration-300" />
//                   <span className="text-[10px] md:text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300" style={{ fontFamily: FONT_FAMILY }}>
//                     {badge.label}
//                   </span>
//                 </div>
//               );
//             })}
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// }

// components/sections/TrustResultsSection.js
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  FlaskConical,
  Leaf,
  HeartHandshake,
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Icon mapping
const ICON_MAP = {
  ShieldCheck,
  FlaskConical,
  Leaf,
  HeartHandshake,
  Heart,
  Star,
  Users: Star,
  Award: Star,
};

export default function TrustResultsSection() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Auto-slide for featured products
    if (data?.featuredProducts && data.featuredProducts.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % data.featuredProducts.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [data?.featuredProducts]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/trust-results`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        // Reset testimonial index when data loads
        setTestimonialIndex(0);
      }
    } catch (error) {
      console.error('Error fetching trust results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextSlide = () => {
    if (!data?.featuredProducts) return;
    setCurrentSlide((prev) => (prev + 1) % data.featuredProducts.length);
  };

  const prevSlide = () => {
    if (!data?.featuredProducts) return;
    setCurrentSlide((prev) => (prev - 1 + data.featuredProducts.length) % data.featuredProducts.length);
  };

  const getVisibleTestimonials = (startIndex) => {
    if (!data?.testimonials || data.testimonials.length === 0) return [];
    const testimonials = data.testimonials;
    const result = [];
    const count = Math.min(3, testimonials.length);
    for (let i = 0; i < count; i++) {
      const index = (startIndex + i) % testimonials.length;
      result.push({
        ...testimonials[index],
        // Generate a unique key combining id and index to ensure uniqueness
        _key: testimonials[index].id || `${testimonials[index].name}_${index}_${Date.now()}`
      });
    }
    return result;
  };

  const visibleTestimonials = data?.testimonials ? getVisibleTestimonials(testimonialIndex) : [];

  const nextTestimonials = () => {
    if (!data?.testimonials || data.testimonials.length === 0) return;
    setTestimonialIndex((prev) => (prev + 1) % data.testimonials.length);
  };

  const previousTestimonials = () => {
    if (!data?.testimonials || data.testimonials.length === 0) return;
    setTestimonialIndex((prev) => (prev - 1 + data.testimonials.length) % data.testimonials.length);
  };

  if (isLoading) {
    return (
      <section className="relative w-full bg-[#fffafa] py-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-[#8B9D83] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!data || !data.featuredProducts || data.featuredProducts.length === 0) {
    return null;
  }

  const currentProduct = data.featuredProducts[currentSlide];
  const trustFeatures = data.trustFeatures || [];

  return (
    <section className="relative w-full bg-[#fffafa] py-3 sm:py-5 md:py-7 overflow-hidden">
      <div className="mx-auto w-full max-w-[1200px] px-3 sm:px-5">
        {/* Top Results Area */}
        <div className="rounded-[10px] border border-[#efdeda] bg-gradient-to-br from-[#fff8f7] via-[#fffdfc] to-[#fff4f4] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          
          {/* Mobile Heading */}
          <div className="mb-5 text-center lg:hidden">
            <h2 className="text-[13px] sm:text-[15px] font-semibold tracking-[0.12em] text-[#393535]">
              {data.sectionTitle || 'TRUSTED BY THOUSANDS'}
            </h2>
          </div>

          {/* Main Grid - Carousel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.15fr_1fr] gap-6 lg:gap-7 items-center">
            
            {/* LEFT - Product Info & Stats */}
            <motion.div
              key={`product-${currentSlide}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Desktop Heading */}
              <div className="hidden lg:block mb-3">
                <h2 className="text-[13px] font-semibold tracking-[0.12em] text-[#393535]">
                  {data.sectionTitle || 'TRUSTED BY THOUSANDS'}
                </h2>
              </div>

              {/* Main Heading */}
              <h3 className="font-serif text-[25px] sm:text-[28px] lg:text-[25px] xl:text-[27px] leading-[1.15] tracking-[0.02em] text-[#34302e]">
                {data.mainHeading || 'REAL RESULTS. REAL CONFIDENCE.'}
              </h3>

              {/* Featured Product */}
              <div className="mt-4 flex items-center gap-3">
                <div className="w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-full bg-white border border-[#ead9d5] flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                  <img
                    src={currentProduct.image || '/images/products/radiance-serum.png'}
                    alt={currentProduct.productName}
                    className="w-full h-full object-contain p-1.5"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#a87572] mb-1">
                    Featured Product
                  </p>
                  <h4 className="text-[13px] sm:text-[15px] text-[#332e2c] font-medium leading-tight">
                    {currentProduct.productName}
                  </h4>
                </div>
              </div>

              {/* Product Stats - Specific to this product */}
              {currentProduct.stats && currentProduct.stats.length > 0 && (
                <div className="mt-6 grid grid-cols-3 max-w-[330px]">
                  {currentProduct.stats.map((stat, index) => (
                    <div
                      key={`stat-${currentSlide}-${index}`}
                      className={`px-2 sm:px-3 ${index === 1 ? 'border-x border-[#ead9d5]' : ''}`}
                    >
                      <div className="font-serif text-[29px] sm:text-[32px] lg:text-[31px] leading-none text-[#c96f70]">
                        {stat.value}
                      </div>
                      <p className="mt-2 text-[8px] sm:text-[9px] leading-[1.5] text-[#554e4b]">
                        {stat.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Carousel Indicators */}
              {data.featuredProducts.length > 1 && (
                <div className="flex gap-1.5 mt-4">
                  {data.featuredProducts.map((_, index) => (
                    <button
                      key={`indicator-${index}`}
                      onClick={() => setCurrentSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentSlide
                          ? 'w-6 h-1.5 bg-[#c96f70]'
                          : 'w-1.5 h-1.5 bg-[#ead9d5] hover:bg-[#c96f70]/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* CENTER - Before/After Images */}
            <motion.div
              key={`images-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-[500px] mx-auto"
            >
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <div className="relative aspect-[0.82] overflow-hidden rounded-[8px] bg-[#eadbd5]">
                  <img
                    src={currentProduct.beforeAfter?.beforeImage || '/images/results-before.jpg'}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2.5 sm:left-3 text-white text-[9px] sm:text-[10px] font-semibold tracking-wide drop-shadow-md">
                    {currentProduct.beforeAfter?.beforeLabel || 'BEFORE'}
                  </div>
                </div>

                <div className="relative aspect-[0.82] overflow-hidden rounded-[8px] bg-[#eadbd5]">
                  <img
                    src={currentProduct.beforeAfter?.afterImage || '/images/results-after.jpg'}
                    alt="After"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2.5 sm:left-3 text-white text-[9px] sm:text-[10px] font-semibold tracking-wide drop-shadow-md">
                    {currentProduct.beforeAfter?.afterLabel || 'AFTER 4 WEEKS'}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT - Trust Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full"
            >
              <div className="flex flex-col gap-1.5 sm:gap-2">
                {trustFeatures.map((feature, index) => {
                  const IconComponent = ICON_MAP[feature.icon] || Heart;
                  return (
                    <motion.div
                      key={feature.id || `feature-${index}`}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + index * 0.07 }}
                      className="flex items-center gap-3 min-h-[45px] sm:min-h-[48px] rounded-[7px] border border-[#eedbd8] bg-white/45 px-3 sm:px-4"
                    >
                      <IconComponent className="w-[23px] h-[23px] sm:w-[25px] sm:h-[25px] flex-shrink-0 text-[#e87878] stroke-[1.3]" />
                      <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.03em] text-[#403b39]">
                        {feature.title}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Navigation Arrows for Carousel */}
          {data.featuredProducts.length > 1 && (
            <div className="flex justify-center gap-3 mt-4 lg:mt-0">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-white border border-[#ead9d5] flex items-center justify-center hover:bg-[#f5eeea] hover:border-[#c96f70] transition-all shadow-sm"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-4 h-4 text-[#554e4b]" />
              </button>
         
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-white border border-[#ead9d5] flex items-center justify-center hover:bg-[#f5eeea] hover:border-[#c96f70] transition-all shadow-sm"
                aria-label="Next product"
              >
                <ChevronRight className="w-4 h-4 text-[#554e4b]" />
              </button>
            </div>
          )}
        </div>

        {/* Testimonial Section */}
        {data.testimonials && data.testimonials.length > 0 && (
          <div className="relative mt-4 sm:mt-5">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-[13px] sm:text-[14px] md:text-[15px] font-semibold tracking-[0.1em] text-[#3d3937] mb-3"
            >
              {data.testimonialsTitle || 'LOVED BY OUR COMMUNITY'}
            </motion.h2>

            <div className="relative px-0 sm:px-10">
              {data.testimonials.length > 3 && (
                <>
                  <button
                    onClick={previousTestimonials}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#efd4c7] flex items-center justify-center text-[#514b48] shadow-sm hover:bg-[#e8c4b5] transition-colors duration-200 hidden sm:flex"
                    aria-label="Previous testimonials"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={nextTestimonials}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#efd4c7] flex items-center justify-center text-[#514b48] shadow-sm hover:bg-[#e8c4b5] transition-colors duration-200 hidden sm:flex"
                    aria-label="Next testimonials"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
                <AnimatePresence mode="popLayout">
                  {visibleTestimonials.map((testimonial) => (
                    <motion.div
                      key={testimonial._key || testimonial.id || `testimonial-${testimonial.name}-${Date.now()}`}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-[116px] sm:min-h-[120px] rounded-[8px] border border-[#eedbda] bg-gradient-to-r from-[#fff0f1] to-[#fff7f6] px-3 sm:px-4 py-3 flex items-center gap-3"
                    >
                      <div className="relative w-[67px] h-[67px] sm:w-[73px] sm:h-[73px] flex-shrink-0 rounded-full overflow-hidden bg-[#e8ddd7]">
                        <img
                          src={testimonial.image || '/images/avatar-placeholder.jpg'}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-[2px] mb-2">
                          {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-[12px] h-[12px] fill-[#e88b17] text-[#e88b17]" />
                          ))}
                        </div>
                        <p className="text-[9px] sm:text-[10px] italic leading-[1.4] text-[#403a38]">
                          {testimonial.review}
                        </p>
                        <p className="mt-0.5 text-[9px] sm:text-[10px] italic leading-[1.4] text-[#403a38]">
                          {testimonial.description}
                        </p>
                        <p className="mt-2 text-[9px] sm:text-[10px] font-medium text-[#514b48]">
                          — {testimonial.name}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#efb5b5] to-transparent" />
    </section>
  );
}