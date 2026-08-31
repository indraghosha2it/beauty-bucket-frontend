

// // components/home/HeroBannerCarousel.js
// 'use client';

// import { AnimatePresence, motion } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import {
//   FaArrowRight,
//   FaChevronLeft,
//   FaChevronRight,
//   FaLeaf,
// } from 'react-icons/fa';

// // Fonts
// const FONT_FAMILY = "'Courgette', cursive";
// const FONT_FAMILY_INTER = "'Inter', sans-serif";

// // Default slides in case API fails
// const DEFAULT_SLIDES = [
//   {
//     id: 'default-1',
//     eyebrow: 'New In — Autumn Edit',
//     title: (
//       <>
//         Skin that speaks
//         <br />
//         before you do
//       </>
//     ),
//     subtitle:
//       'Dermatologist-formulated skincare, curated for the way your skin actually changes through the year.',
//     description:
//       'Dermatologist-formulated skincare, curated for the way your skin actually changes through the year.',
//     badgeText: 'Up to 30% off',
//     leftPanelBgImage: '/images/lbg9.PNG',
//     circleImage: '/images/f.PNG',
//     rightPanelBgImage: '/images/login.jpg',
//     ctaLabel: 'Shop the edit',
//     ctaHref: '/products?collection=autumn',
//     secondaryLabel: 'Our story',
//     secondaryHref: '/about',
//   },
//   {
//     id: 'default-2',
//     eyebrow: 'Limited Time',
//     title: (
//       <>
//         Buy two,
//         <br />
//         gift a third
//       </>
//     ),
//     subtitle:
//       'Stock your routine and share it. Applies automatically on every serum and moisturizer this week.',
//     description:
//       'Stock your routine and share it. Applies automatically on every serum and moisturizer this week.',
//     badgeText: '2+1 free',
//     leftPanelBgImage: '/images/lbg9.PNG',
//     circleImage: '/images/hero-2.jpg',
//     rightPanelBgImage: '/images/right-2.jpg',
//     ctaLabel: 'Shop the offer',
//     ctaHref: '/products?promo=bogo',
//     secondaryLabel: 'Our story',
//     secondaryHref: '/about',
//   },
// ];

// const AUTOPLAY_MS = 6000;

// export default function HeroBannerCarousel({
//   slides: propSlides,
//   secondaryLabel = 'Our story',
//   secondaryHref = '/about',
//   leftPanelBgImage = '/images/lbg9.PNG',
// }) {
//   const [slides, setSlides] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const timerRef = useRef(null);

//   // Fetch banners from API
//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         setIsLoading(true);

//         const apiUrl =
//           process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

//         const response = await fetch(`${apiUrl}/api/banners/homepage`, {
//           cache: 'no-store',
//         });

//         if (response.ok) {
//           const result = await response.json();

//           if (
//             result.success &&
//             result.data &&
//             result.data.length > 0
//           ) {
//             setSlides(result.data);
//             setIsLoading(false);
//             return;
//           }
//         }

//         if (propSlides && propSlides.length > 0) {
//           setSlides(propSlides);
//         } else {
//           setSlides(DEFAULT_SLIDES);
//         }
//       } catch (error) {
//         console.error('Error fetching banners:', error);

//         if (propSlides && propSlides.length > 0) {
//           setSlides(propSlides);
//         } else {
//           setSlides(DEFAULT_SLIDES);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBanners();
//   }, [propSlides]);

//   const total = slides.length;
//   const slide = slides[index] || slides[0];

//   const goTo = useCallback(
//     (next) => {
//       if (total <= 1) return;

//       setDirection(
//         next > index ||
//           (index === total - 1 && next === 0)
//           ? 1
//           : -1
//       );

//       setIndex(((next % total) + total) % total);
//     },
//     [index, total]
//   );

//   const goNext = useCallback(
//     () => goTo(index + 1),
//     [goTo, index]
//   );

//   const goPrev = useCallback(
//     () => goTo(index - 1),
//     [goTo, index]
//   );

//   // Autoplay
//   useEffect(() => {
//     if (isPaused || total <= 1 || isLoading) {
//       return undefined;
//     }

//     timerRef.current = setInterval(goNext, AUTOPLAY_MS);

//     return () => clearInterval(timerRef.current);
//   }, [goNext, isPaused, total, isLoading]);

//   // Loading state
//   if (isLoading) {
//     return (
//       <section className="relative overflow-hidden bg-[#F8F1F4]">
//         <div className="relative grid grid-cols-[1.05fr_1fr] min-h-[280px] sm:min-h-[390px] lg:grid-cols-[1.05fr_1fr] lg:min-h-[540px]">
//           <div className="flex items-center justify-center bg-gray-200 animate-pulse">
//             <div className="text-gray-400 text-xs sm:text-sm">
//               Loading banners...
//             </div>
//           </div>

//           <div className="bg-gray-300 animate-pulse"></div>
//         </div>
//       </section>
//     );
//   }

//   if (!slide) return null;

//   // Format title coming from API
//   const currentSlide = {
//     ...slide,
//     title:
//       typeof slide.title === 'string'
//         ? slide.title.includes('\n')
//           ? slide.title.split('\n').map((line, i, arr) => (
//               <span key={i}>
//                 {line}
//                 {i < arr.length - 1 && <br />}
//               </span>
//             ))
//           : slide.title
//         : slide.title,
//   };

//   return (
//     <section
//       className="relative overflow-hidden bg-[#F8F1F4] -mt-16"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       {/* =========================================================
//           MAIN BANNER
//           Mobile = reduced height
//           Desktop = original layout
//       ========================================================== */}

//       {/* <div className="relative grid grid-cols-[1.05fr_1fr] min-h-[280px] sm:min-h-[390px] lg:grid-cols-[1.05fr_1fr] lg:min-h-[600px]"> */}

//       <div className="relative grid grid-cols-[1.05fr_1fr] min-h-[250px] sm:min-h-[350px] lg:grid-cols-[1.05fr_1fr] lg:min-h-[600px]">

//         {/* =====================================================
//             LEFT PANEL
//         ====================================================== */}

//         <div
//           className="
//             relative
//             flex
//             items-center
//             px-3
//             sm:px-6
//             lg:px-16
//             py-8
//             sm:py-10
//             lg:py-0
//             z-10
//             bg-cover
//             bg-center
//             bg-no-repeat
//           "
//           style={{
//             backgroundImage: `url('${
//               currentSlide.leftPanelBgImage || leftPanelBgImage
//             }')`,
//           }}
//         >
//           {/* Dark overlay */}
//           <div className="absolute inset-0 bg-black/50" />

//           {/* Soft pink glow */}
//           <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-[#EE4275]/20 blur-3xl pointer-events-none" />

//           {/* Dotted pattern */}
//           <div
//             className="absolute inset-0 opacity-[0.04] pointer-events-none"
//             style={{
//               backgroundImage:
//                 'radial-gradient(circle, #fff 1px, transparent 1px)',
//               backgroundSize: '28px 28px',
//             }}
//           />

//           {/* LEFT SLIDE CONTENT */}
//           <AnimatePresence mode="wait" custom={direction}>
//             <motion.div
//               key={index}
//               custom={direction}
//               initial={{
//                 opacity: 0,
//                 x: direction * 24,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 x: direction * -24,
//               }}
//               transition={{
//                 duration: 0.5,
//                 ease: 'easeOut',
//               }}
//               className="
//                 relative
//                 z-10
//                 w-full
//                 max-w-[620px]
//                 pr-[25px]
//                 sm:pr-[50px]
//                 lg:pr-[100px]
//               "
//             >
//               {/* Eyebrow */}
//               <div className="inline-flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
//                 <span className="h-px w-4 sm:w-8 bg-[#EE4275]" />

//                 <span
//                   className="
//                     text-[7px]
//                     sm:text-[10px]
//                     lg:text-xs
//                     font-medium
//                     tracking-[0.12em]
//                     sm:tracking-[0.2em]
//                     uppercase
//                     text-[#F0A6BE]
//                   "
//                   style={{
//                     fontFamily: FONT_FAMILY_INTER,
//                   }}
//                 >
//                   {currentSlide.eyebrow}
//                 </span>
//               </div>

//               {/* Title */}
//               <h1
//                 className="
//                   text-[17px]
//                   sm:text-3xl
//                   lg:text-[3rem]
//                   leading-[1.08]
//                   font-bold
//                   text-white
//                   mb-2
//                   sm:mb-4
//                   max-w-[520px]
//                   line-clamp-2
//                 "
//                 style={{
//                   fontFamily: FONT_FAMILY,
//                 }}
//               >
//                 {currentSlide.title}
//               </h1>

//               {/* Description */}
//               <p
//                 className="
//                   text-white/80
//                   text-[8px]
//                   sm:text-sm
//                   lg:text-lg
//                   leading-[1.4]
//                   sm:leading-relaxed
//                   max-w-[400px]
//                   mb-3
//                   sm:mb-6
//                   line-clamp-2
//                 "
//                 style={{
//                   fontFamily: FONT_FAMILY,
//                 }}
//               >
//                 {currentSlide.subtitle ||
//                   currentSlide.description}
//               </p>

//               {/* Buttons */}
//               <div className="flex flex-wrap items-center gap-2 sm:gap-4">
//                 <Link
//                   href={
//                     currentSlide.ctaHref || '/products'
//                   }
//                 >
//                   <button
//                     className="
//                       inline-flex
//                       items-center
//                       gap-1
//                       sm:gap-2
//                       px-2.5
//                       sm:px-5
//                       py-1.5
//                       sm:py-2.5
//                       bg-[#EE4275]
//                       text-white
//                       rounded-full
//                       font-medium
//                       text-[8px]
//                       sm:text-sm
//                       hover:bg-[#d63868]
//                       transition-colors
//                     "
//                     style={{
//                       fontFamily: FONT_FAMILY,
//                     }}
//                   >
//                     {currentSlide.ctaLabel || 'Shop Now'}

//                     <FaArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                   </button>
//                 </Link>

//                 <Link
//                   href={
//                     currentSlide.secondaryHref ||
//                     secondaryHref
//                   }
//                   className="
//                     inline-flex
//                     items-center
//                     gap-1
//                     sm:gap-2
//                     text-white/70
//                     hover:text-white
//                     text-[8px]
//                     sm:text-sm
//                     font-medium
//                     border-b
//                     border-white/20
//                     hover:border-white/60
//                     pb-0.5
//                     transition-colors
//                   "
//                   style={{
//                     fontFamily: FONT_FAMILY,
//                   }}
//                 >
//                   {currentSlide.secondaryLabel ||
//                     secondaryLabel}
//                 </Link>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Bottom information */}
//           <div
//             className="
//               absolute
//               left-3
//               sm:left-6
//               lg:left-16
//               bottom-2
//               sm:bottom-4
//               lg:bottom-6
//               flex
//               items-center
//               gap-1
//               sm:gap-2
//               z-10
//             "
//             style={{
//               fontFamily: FONT_FAMILY_INTER,
//             }}
//           >
//             <FaLeaf className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#EE4275]" />

//             <span className="text-white/50 text-[6px] sm:text-xs">
//               Cruelty-free &amp; dermatologically tested
//             </span>
//           </div>
//         </div>

//         {/* =====================================================
//             RIGHT PANEL
//         ====================================================== */}

//         {/* <div className="relative min-h-[280px] sm:min-h-[390px] lg:min-h-0 overflow-hidden"> */}
//         <div className="relative min-h-[250px] sm:min-h-[350px] lg:min-h-0 overflow-hidden">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={`right-bg-${index}`}
//               initial={{
//                 opacity: 0,
//                 scale: 1.03,
//               }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//               }}
//               exit={{
//                 opacity: 0,
//                 scale: 1,
//               }}
//               transition={{
//                 duration: 0.6,
//                 ease: 'easeOut',
//               }}
//               className="absolute inset-0"
//             >
//               <Image
//                 src={currentSlide.rightPanelBgImage}
//                 alt=""
//                 fill
//                 sizes="50vw"
//                 className="object-cover object-center"
//                 priority={index === 0}
//               />
//             </motion.div>
//           </AnimatePresence>

//           {/* Decorative dot cluster */}
//           <div className="absolute bottom-8 right-8 grid grid-cols-3 gap-2 opacity-40 hidden lg:grid z-10">
//             {Array.from({ length: 9 }).map((_, i) => (
//               <span
//                 key={i}
//                 className="w-1.5 h-1.5 rounded-full bg-white/60"
//               />
//             ))}
//           </div>

//           {/* Navigation arrows */}
//           {total > 1 && (
//             <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-30 flex items-center gap-1.5 sm:gap-2">
//               <button
//                 onClick={goPrev}
//                 aria-label="Previous offer"
//                 className="
//                   w-6
//                   h-6
//                   sm:w-8
//                   sm:h-8
//                   rounded-full
//                   bg-white/90
//                   text-[#2D1B2E]
//                   flex
//                   items-center
//                   justify-center
//                   hover:bg-white
//                   transition-colors
//                 "
//               >
//                 <FaChevronLeft className="w-2 h-2 sm:w-3 sm:h-3" />
//               </button>

//               <button
//                 onClick={goNext}
//                 aria-label="Next offer"
//                 className="
//                   w-6
//                   h-6
//                   sm:w-8
//                   sm:h-8
//                   rounded-full
//                   bg-white/90
//                   text-[#2D1B2E]
//                   flex
//                   items-center
//                   justify-center
//                   hover:bg-white
//                   transition-colors
//                 "
//               >
//                 <FaChevronRight className="w-2 h-2 sm:w-3 sm:h-3" />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* =====================================================
//             CENTER PRODUCT CIRCLE
//             Smaller on mobile/tablet
//             Original size preserved on large devices
//         ====================================================== */}

//         <motion.div
//           initial={{
//             opacity: 0,
//             scale: 0.94,
//           }}
//           animate={{
//             opacity: 1,
//             scale: 1,
//           }}
//           transition={{
//             duration: 0.8,
//             ease: 'easeOut',
//             delay: 0.15,
//           }}
//           className="
//             absolute
//             top-1/2
//             -translate-y-1/2
//             -translate-x-1/2
//             z-20
//             block
//             pointer-events-none
//           "
//           style={{
//             left: '51.22%',
//           }}
//         >
//           {/* Circle */}
//           <div
//             className="
//               w-[90px]
//               h-[90px]
//               sm:w-[160px]
//               sm:h-[160px]
//               lg:w-[380px]
//               lg:h-[380px]
//               rounded-full
//               border
//               border-white/30
//               flex
//               items-center
//               justify-center
//               backdrop-blur-sm
//               bg-black/20
//               shadow-2xl
//             "
//           >
//             <div className="w-[88%] h-[88%] rounded-full overflow-hidden relative bg-black/10">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={`circle-${index}`}
//                   initial={{
//                     opacity: 0,
//                     scale: 1.08,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     scale: 1,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     scale: 0.96,
//                   }}
//                   transition={{
//                     duration: 0.5,
//                     ease: 'easeOut',
//                   }}
//                   className="absolute inset-0"
//                 >
//                   <Image
//                     src={currentSlide.circleImage}
//                     alt="Featured product"
//                     fill
//                     sizes="380px"
//                     className="object-cover object-center"
//                     priority={index === 0}
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* =========================================================
//           DOT INDICATORS
//       ========================================================== */}

//       {total > 1 && (
//         <div
//           className="
//             absolute
//             bottom-2
//             sm:bottom-4
//             left-1/2
//             -translate-x-1/2
//             lg:left-16
//             lg:translate-x-0
//             z-40
//             flex
//             items-center
//             gap-1.5
//             sm:gap-2
//           "
//         >
//           {slides.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => goTo(i)}
//               aria-label={`Go to offer ${i + 1}`}
//               className={`
//                 h-1
//                 sm:h-1.5
//                 rounded-full
//                 transition-all
//                 ${
//                   i === index
//                     ? 'w-4 sm:w-6 bg-[#EE4275]'
//                     : 'w-1 sm:w-1.5 bg-white/30 hover:bg-white/50'
//                 }
//               `}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// components/home/HeroBannerCarousel.js
// components/home/HeroBannerCarousel.js
'use client';

import React, { useCallback, useEffect, useRef, useState, Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaLeaf,
} from 'react-icons/fa';

import FeatureBadges from './FeatureBadges';

const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";

// Default slides in case API fails
const DEFAULT_SLIDES = [
  {
    id: 'default-1',
    tagline: 'Timeless Collection',
    title: 'Timeless Comfort,',
    highlightedText: 'Modern Craftsmanship.',
    description: 'Heritage technique meets contemporary design — each piece crafted to last.',
    bgImage: '/images/hh.PNG',
    ctaLabel: 'Explore the Collection',
    ctaHref: '/collection',
    trustIndicators: ['Heirloom Quality', 'Sustainably Made', 'Lifetime Care']
  },
  {
    id: 'default-2',
    tagline: 'New Arrivals',
    title: 'Discover the',
    highlightedText: 'Art of Living.',
    description: 'Curated pieces that bring warmth and elegance to your everyday spaces.',
    bgImage: '/images/hh2.PNG',
    ctaLabel: 'Shop New Arrivals',
    ctaHref: '/new-arrivals',
    trustIndicators: ['Premium Quality', 'Handcrafted', 'Sustainably Sourced']
  },
];

const AUTOPLAY_MS = 6000;

export default function HeroBannerCarousel({ slides: propSlides }) {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const timerRef = useRef(null);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/banners/homepage`, {
          cache: 'no-store',
        });

        if (response.ok) {
          const result = await response.json();

          if (result.success && result.data && result.data.length > 0) {
            setSlides(result.data);
            setIsLoading(false);
            return;
          }
        }

        if (propSlides && propSlides.length > 0) {
          setSlides(propSlides);
        } else {
          setSlides(DEFAULT_SLIDES);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);

        if (propSlides && propSlides.length > 0) {
          setSlides(propSlides);
        } else {
          setSlides(DEFAULT_SLIDES);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, [propSlides]);

  const total = slides.length;
  const slide = slides[index] || slides[0];

  const goTo = useCallback(
    (next) => {
      if (total <= 1) return;

      setDirection(
        next > index || (index === total - 1 && next === 0) ? 1 : -1
      );

      setIndex(((next % total) + total) % total);
    },
    [index, total]
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay
  useEffect(() => {
    if (isPaused || total <= 1 || isLoading) {
      return undefined;
    }

    timerRef.current = setInterval(goNext, AUTOPLAY_MS);

    return () => clearInterval(timerRef.current);
  }, [goNext, isPaused, total, isLoading]);

  // Loading state
  if (isLoading) {
    return (
      <section className="relative w-full h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading banners...</div>
        </div>
      </section>
    );
  }

  if (!slide) return null;

 const bgVariants = {
  enter: {
    opacity: 0,
    scale: 1.02,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: {
        duration: 0.9,
        ease: [0.4, 0, 0.2, 1],
      },
      scale: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    transition: {
      opacity: {
        duration: 0.9,
        ease: [0.4, 0, 0.2, 1],
      },
      scale: {
        duration: 0.9,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
};

  // Content variants - smooth fade with slight movement
  const contentVariants = {
    enter: (direction) => ({
      opacity: 0,
      y: 20,
    }),
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      }
    },
    exit: (direction) => ({
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }
    })
  };

  return (
    <>
    <section
      className="relative w-full h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image - Always present, smooth crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={`bg-${index}`}
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${slide.bgImage || '/images/hh.PNG'}')`,
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/5" />
            </div>

            {/* Decorative botanical elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-[8%] opacity-10 animate-float">
                <FaLeaf className="w-10 h-10 text-white/30" />
              </div>
              <div className="absolute bottom-20 right-[10%] opacity-8 animate-float-delayed">
                <FaLeaf className="w-12 h-12 text-white/20 rotate-45" />
              </div>
              <div className="absolute top-1/3 right-[5%] opacity-8 animate-float-slow">
                <FaLeaf className="w-8 h-8 text-white/20 -rotate-12" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Container - Smooth fade with stagger */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 h-full relative z-10">
        <div className="flex flex-col justify-end h-full pb-6 md:pb-8 lg:pb-10 max-w-2xl">
          
          {/* Tag/Badge */}
          {slide.tagline && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`tagline-${index}`}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, delay: 0.05 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-[#8B9D83]/30 mb-2 w-fit"
              >
                <span className="w-1 h-1 rounded-full bg-[#8B9D83]" />
                <span
                  className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase text-white/80"
                  style={{
                    fontFamily: FONT_FAMILY,
                    letterSpacing: '0.2em',
                  }}
                >
                  {slide.tagline}
                </span>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Main Heading */}
          {slide.title && (
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${index}`}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-[1.1] tracking-wide text-white mb-1.5"
                style={{
                  fontFamily: FONT_FAMILY,
                  letterSpacing: '0.02em',
                }}
              >
                {slide.title}
                {slide.highlightedText && (
                  <>
                    <br />
                    <span className="text-[#8B9D83] font-medium">
                      {slide.highlightedText}
                    </span>
                  </>
                )}
              </motion.h1>
            </AnimatePresence>
          )}

          {/* Description */}
          {slide.description && (
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${index}`}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-sm md:text-base text-white/70 max-w-lg leading-relaxed mb-4"
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                }}
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>
          )}

          {/* CTA Button */}
          {slide.ctaLabel && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`cta-${index}`}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href={slide.ctaHref || '/collection'}
                  className="group inline-flex items-center gap-1.5 px-5 py-2 md:px-6 md:py-2.5 bg-[#8B9D83] text-white text-xs md:text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  style={{
                    fontFamily: FONT_FAMILY,
                    letterSpacing: '0.06em',
                  }}
                >
                  {slide.ctaLabel}
                  <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Trust Indicators */}
          {slide.trustIndicators && slide.trustIndicators.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`trust-${index}`}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex items-center gap-4 mt-5 pt-4 border-t border-white/10 flex-wrap"
              >
                {slide.trustIndicators.map((indicator, i) => (
                  <Fragment key={i}>
                    <span
                      className="text-[10px] md:text-xs text-white/50 font-medium tracking-[0.15em] uppercase"
                      style={{
                        fontFamily: FONT_FAMILY,
                        letterSpacing: '0.15em',
                      }}
                    >
                      {indicator}
                    </span>
                    {i < slide.trustIndicators.length - 1 && (
                      <span className="w-px h-3 bg-white/15" />
                    )}
                  </Fragment>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Navigation Arrows - Bottom Right */}
      {total > 1 && (
        <div className="absolute bottom-24 md:bottom-28 lg:bottom-32 right-4 md:right-6 lg:right-8 z-30 flex items-center gap-2">
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-all border border-white/20 hover:border-white/40 hover:scale-105"
          >
            <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-all border border-white/20 hover:border-white/40 hover:scale-105"
          >
            <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      )}

      {/* Dot Indicators - Bottom Center */}
      {total > 1 && (
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`
                rounded-full transition-all duration-300
                ${i === index
                  ? 'w-8 h-2 bg-[#8B9D83]'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                }
              `}
            />
          ))}
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-3deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>

    <FeatureBadges />
    </>
  );
}