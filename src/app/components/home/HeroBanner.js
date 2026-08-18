

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

// // ✅ Fonts - Courgette for all text elements
// const FONT_FAMILY = "'Courgette', cursive";
// const FONT_FAMILY_INTER = "'Inter', sans-serif";

// /**
//  * Rotating promotional hero banner for the storefront homepage.
//  *
//  * LEFT:
//  * - Fixed background image for ALL slides
//  * - Pink + Black overlay mix (increased intensity)
//  * - Slide-specific content
//  *
//  * RIGHT:
//  * - Background image changes with every slide
//  *
//  * CENTER CIRCLE:
//  * - Main image changes with every slide
//  */

// const DEFAULT_SLIDES = [
//   {
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
//     ctaLabel: 'Shop the edit',
//     ctaHref: '/products?collection=autumn',
//     badgeText: 'Up to 30% off',
//     image: '/images/f.PNG',
//     rightPanelImage: '/images/login.jpg',
//   },
//   {
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
//     ctaLabel: 'Shop the offer',
//     ctaHref: '/products?promo=bogo',
//     badgeText: '2+1 free',
//     image: '/images/hero-2.jpg',
//     rightPanelImage: '/images/right-2.jpg',
//   },
//   {
//     eyebrow: 'Just Landed',
//     title: (
//       <>
//         Meet your new
//         <br />
//         morning ritual
//       </>
//     ),
//     subtitle:
//       'A five-minute routine built around three products your skin will actually notice.',
//     ctaLabel: 'Discover the ritual',
//     ctaHref: '/products?collection=morning-ritual',
//     badgeText: 'New arrival',
//     image: '/images/f.PNG',
//     rightPanelImage: '/images/bg2.jpg',
//   },
// ];

// const AUTOPLAY_MS = 6000;

// export default function HeroBannerCarousel({
//   slides = DEFAULT_SLIDES,
//   secondaryLabel = 'Our story',
//   secondaryHref = '/about',
//   leftPanelBgImage = '/images/lbg9.PNG',
// }) {
//   const [index, setIndex] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const [isPaused, setIsPaused] = useState(false);

//   const timerRef = useRef(null);

//   const total = slides.length;
//   const slide = slides[index];

//   const goTo = useCallback(
//     (next) => {
//       setDirection(
//         next > index || (index === total - 1 && next === 0)
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

//   useEffect(() => {
//     if (isPaused || total <= 1) return undefined;

//     timerRef.current = setInterval(goNext, AUTOPLAY_MS);

//     return () => clearInterval(timerRef.current);
//   }, [goNext, isPaused, total]);

//   return (
//     <section
//       className="relative overflow-hidden bg-[#F8F1F4]"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       {/* Height: min-h-[470px] lg:min-h-[540px] */}
//       <div className="relative grid lg:grid-cols-[1.05fr_1fr] min-h-[470px] lg:min-h-[540px]">

//         {/* =====================================================
//             LEFT PANEL
//             Fixed background image for ALL slides
//             ✅ INCREASED PINK + BLACK OVERLAY MIX
//         ===================================================== */}
//         <div
//           className="relative flex items-center px-6 sm:px-10 lg:px-16 py-14 lg:py-0 z-10 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: `url('${leftPanelBgImage}')`,
//           }}
//         >

//           {/* ✅ Increased Pink + Black gradient overlay */}
//           <div className="absolute inset-0 bg-gradient-to-br from-[#2D1B2E]/85 via-[#EE4275]/30 to-[#2D1B2E]/80 pointer-events-none" />

//           {/* ✅ Increased Pink glow overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/25 via-transparent to-[#EE4275]/10 pointer-events-none" />

//           {/* ✅ Increased dark vignette effect */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 pointer-events-none" />

//           {/* ✅ Stronger pink glow */}
//           <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-[#EE4275]/25 blur-3xl pointer-events-none" />

//           {/* ✅ Stronger dark glow */}
//           <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-black/40 blur-3xl pointer-events-none" />

//           {/* Dotted pattern */}
//           <div
//             className="absolute inset-0 opacity-[0.06] pointer-events-none"
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
//               className="relative z-10 max-w-xl"
//             >

//               {/* Eyebrow */}
//               <div className="inline-flex items-center gap-2 mb-4">
//                 <span className="h-px w-8 bg-[#EE4275]" />

//                 <span
//                   className="text-xs font-medium tracking-[0.2em] uppercase text-[#F0A6BE]"
//                   style={{
//                     fontFamily: FONT_FAMILY_INTER,
//                   }}
//                 >
//                   {slide.eyebrow}
//                 </span>
//               </div>

//               {/* Title - Courgette */}
//               <h1
//                 className="text-3xl sm:text-4xl lg:text-[3rem] leading-[1.08] font-bold text-white mb-4"
//                 style={{
//                   fontFamily: FONT_FAMILY,
//                 }}
//               >
//                 {slide.title}
//               </h1>

//               {/* Subtitle - Courgette */}
//               <p
//                 className="text-white/80 text-base lg:text-lg leading-relaxed max-w-md mb-6"
//                 style={{
//                   fontFamily: FONT_FAMILY,
//                 }}
//               >
//                 {slide.subtitle}
//               </p>

//               {/* Buttons - Courgette */}
//               <div className="flex flex-wrap items-center gap-4">

//                 <Link href={slide.ctaHref}>
//                   <button
//                     className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EE4275] text-white rounded-full font-medium text-sm hover:bg-[#d63868] transition-colors"
//                     style={{
//                       fontFamily: FONT_FAMILY,
//                     }}
//                   >
//                     {slide.ctaLabel}
//                     <FaArrowRight className="w-3.5 h-3.5" />
//                   </button>
//                 </Link>

//                 <Link
//                   href={secondaryHref}
//                   className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium border-b border-white/20 hover:border-white/60 pb-0.5 transition-colors"
//                   style={{
//                     fontFamily: FONT_FAMILY,
//                   }}
//                 >
//                   {secondaryLabel}
//                 </Link>

//               </div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Bottom information */}
//           <div
//             className="absolute left-6 sm:left-10 lg:left-16 bottom-6 flex items-center gap-2 z-10"
//             style={{
//               fontFamily: FONT_FAMILY_INTER,
//             }}
//           >
//             <FaLeaf className="w-3.5 h-3.5 text-[#EE4275]" />
//             <span className="text-white/60 text-xs">
//               Cruelty-free &amp; dermatologically tested
//             </span>
//           </div>

//         </div>

//         {/* =====================================================
//             RIGHT PANEL
//             Background image CHANGES with every slide
//             NO OVERLAY
//         ===================================================== */}
//         <div className="relative min-h-[260px] lg:min-h-0 overflow-hidden">

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
//                 src={slide.rightPanelImage}
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

//           {/* Previous / Next arrows */}
//           {total > 1 && (
//             <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
//               <button
//                 onClick={goPrev}
//                 aria-label="Previous offer"
//                 className="w-8 h-8 rounded-full bg-white/90 text-[#2D1B2E] flex items-center justify-center hover:bg-white transition-colors"
//               >
//                 <FaChevronLeft className="w-3 h-3" />
//               </button>

//               <button
//                 onClick={goNext}
//                 aria-label="Next offer"
//                 className="w-8 h-8 rounded-full bg-white/90 text-[#2D1B2E] flex items-center justify-center hover:bg-white transition-colors"
//               >
//                 <FaChevronRight className="w-3 h-3" />
//               </button>
//             </div>
//           )}

//         </div>

//         {/* =====================================================
//             CENTER CIRCLE
//         ===================================================== */}
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
//           className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 hidden sm:block"
//           style={{
//             left: '51.22%',
//           }}
//         >
//           {/* Circle size: w-[260px] lg:w-[340px] */}
//           <div className="w-[260px] h-[260px] lg:w-[340px] lg:h-[340px] rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/30 shadow-2xl">

//             <div className="w-[88%] h-[88%] rounded-full overflow-hidden relative bg-[#EE4275]/15">

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
//                     src={slide.image}
//                     alt="Featured product"
//                     fill
//                     sizes="340px"
//                     className="object-cover object-center"
//                     priority={index === 0}
//                   />
//                 </motion.div>
//               </AnimatePresence>

//             </div>
//           </div>

//         </motion.div>
//       </div>

//       {/* Dot indicators */}
//       {total > 1 && (
//         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:left-16 lg:translate-x-0 z-40 flex items-center gap-2">
//           {slides.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => goTo(i)}
//               aria-label={`Go to offer ${i + 1}`}
//               className={`h-1.5 rounded-full transition-all ${
//                 i === index
//                   ? 'w-6 bg-[#EE4275]'
//                   : 'w-1.5 bg-white/30 hover:bg-white/50'
//               }`}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


// components/home/HeroBannerCarousel.js
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaLeaf,
} from 'react-icons/fa';

// Fonts
const FONT_FAMILY = "'Courgette', cursive";
const FONT_FAMILY_INTER = "'Inter', sans-serif";

// Default slides in case API fails
const DEFAULT_SLIDES = [
  {
    id: 'default-1',
    eyebrow: 'New In — Autumn Edit',
    title: (
      <>
        Skin that speaks
        <br />
        before you do
      </>
    ),
    subtitle: 'Dermatologist-formulated skincare, curated for the way your skin actually changes through the year.',
    description: 'Dermatologist-formulated skincare, curated for the way your skin actually changes through the year.',
    badgeText: 'Up to 30% off',
    leftPanelBgImage: '/images/lbg9.PNG',
    circleImage: '/images/f.PNG',
    rightPanelBgImage: '/images/login.jpg',
    ctaLabel: 'Shop the edit',
    ctaHref: '/products?collection=autumn',
    secondaryLabel: 'Our story',
    secondaryHref: '/about'
  },
  {
    id: 'default-2',
    eyebrow: 'Limited Time',
    title: (
      <>
        Buy two,
        <br />
        gift a third
      </>
    ),
    subtitle: 'Stock your routine and share it. Applies automatically on every serum and moisturizer this week.',
    description: 'Stock your routine and share it. Applies automatically on every serum and moisturizer this week.',
    badgeText: '2+1 free',
    leftPanelBgImage: '/images/lbg9.PNG',
    circleImage: '/images/hero-2.jpg',
    rightPanelBgImage: '/images/right-2.jpg',
    ctaLabel: 'Shop the offer',
    ctaHref: '/products?promo=bogo',
    secondaryLabel: 'Our story',
    secondaryHref: '/about'
  }
];

const AUTOPLAY_MS = 6000;

export default function HeroBannerCarousel({
  slides: propSlides,
  secondaryLabel = 'Our story',
  secondaryHref = '/about',
  leftPanelBgImage = '/images/lbg9.PNG',
}) {
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
        // components/home/HeroBannerCarousel.js — same fix in fetchBanners
const response = await fetch(`${apiUrl}/api/banners/homepage`, { cache: 'no-store' });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data && result.data.length > 0) {
            setSlides(result.data);
            setIsLoading(false);
            return;
          }
        }
        
        // If API fails or returns empty, use default or prop slides
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
      setDirection(next > index || (index === total - 1 && next === 0) ? 1 : -1);
      setIndex(((next % total) + total) % total);
    },
    [index, total]
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (isPaused || total <= 1 || isLoading) return undefined;
    timerRef.current = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [goNext, isPaused, total, isLoading]);

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-[#F8F1F4]">
        <div className="relative grid lg:grid-cols-[1.05fr_1fr] min-h-[470px] lg:min-h-[540px]">
          <div className="flex items-center justify-center bg-gray-200 animate-pulse">
            <div className="text-gray-400">Loading banners...</div>
          </div>
          <div className="bg-gray-300 animate-pulse"></div>
        </div>
      </section>
    );
  }

  if (!slide) return null;

  const currentSlide = {
    ...slide,
    title: typeof slide.title === 'string' ? (
      slide.title.includes('\n') ? (
        slide.title.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < slide.title.split('\n').length - 1 && <br />}
          </span>
        ))
      ) : slide.title
    ) : slide.title
  };

  return (
    <section
      className="relative overflow-hidden bg-[#F8F1F4]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative grid lg:grid-cols-[1.05fr_1fr] min-h-[470px] lg:min-h-[540px]">

        {/* LEFT PANEL */}
        <div
          className="relative flex items-center px-6 sm:px-10 lg:px-16 py-14 lg:py-0 z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${currentSlide.leftPanelBgImage || leftPanelBgImage}')`,
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Soft pink glow */}
          <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-[#EE4275]/20 blur-3xl pointer-events-none" />

          {/* Dotted pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* LEFT SLIDE CONTENT */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative z-10 max-w-xl"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-[#EE4275]" />
                <span
                  className="text-xs font-medium tracking-[0.2em] uppercase text-[#F0A6BE]"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  {currentSlide.eyebrow}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl lg:text-[3rem] leading-[1.08] font-bold text-white mb-4"
                style={{ fontFamily: FONT_FAMILY }}
              >
                {currentSlide.title}
              </h1>

              {/* Subtitle / Description */}
              <p
                className="text-white/80 text-base lg:text-lg leading-relaxed max-w-md mb-6"
                style={{ fontFamily: FONT_FAMILY }}
              >
                {currentSlide.subtitle || currentSlide.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link href={currentSlide.ctaHref || '/products'}>
                  <button
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EE4275] text-white rounded-full font-medium text-sm hover:bg-[#d63868] transition-colors"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    {currentSlide.ctaLabel || 'Shop Now'}
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>

                <Link
                  href={currentSlide.secondaryHref || secondaryHref}
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium border-b border-white/20 hover:border-white/60 pb-0.5 transition-colors"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  {currentSlide.secondaryLabel || secondaryLabel}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom information */}
          <div
            className="absolute left-6 sm:left-10 lg:left-16 bottom-6 flex items-center gap-2 z-10"
            style={{ fontFamily: FONT_FAMILY_INTER }}
          >
            <FaLeaf className="w-3.5 h-3.5 text-[#EE4275]" />
            <span className="text-white/50 text-xs">
              Cruelty-free &amp; dermatologically tested
            </span>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="relative min-h-[260px] lg:min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-bg-${index}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={currentSlide.rightPanelBgImage}
                alt=""
                fill
                sizes="50vw"
                className="object-cover object-center"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Decorative dot cluster */}
          <div className="absolute bottom-8 right-8 grid grid-cols-3 gap-2 opacity-40 hidden lg:grid z-10">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/60" />
            ))}
          </div>

          {/* Navigation arrows */}
          {total > 1 && (
            <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
              <button
                onClick={goPrev}
                aria-label="Previous offer"
                className="w-8 h-8 rounded-full bg-white/90 text-[#2D1B2E] flex items-center justify-center hover:bg-white transition-colors"
              >
                <FaChevronLeft className="w-3 h-3" />
              </button>
              <button
                onClick={goNext}
                aria-label="Next offer"
                className="w-8 h-8 rounded-full bg-white/90 text-[#2D1B2E] flex items-center justify-center hover:bg-white transition-colors"
              >
                <FaChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* CENTER CIRCLE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 hidden sm:block"
          style={{ left: '51.22%' }}
        >
          <div className="w-[260px] h-[260px] lg:w-[340px] lg:h-[340px] rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/20 shadow-2xl">
            <div className="w-[88%] h-[88%] rounded-full overflow-hidden relative bg-black/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`circle-${index}`}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentSlide.circleImage}
                    alt="Featured product"
                    fill
                    sizes="340px"
                    className="object-cover object-center"
                    priority={index === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Badge text */}
          {currentSlide.badgeText && (
            <div className="absolute z-30 -top-4 -right-6 lg:-right-8 bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center text-center shadow-sm rotate-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35 }}
                >
                  <span
                    className="block text-[#EE4275] font-bold text-sm leading-none"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    {currentSlide.badgeText.match(/[\d+]+%|\d\+\d/)?.[0] || currentSlide.badgeText.split(' ')[0]}
                  </span>
                  <span
                    className="block text-[9px] text-[#8B7A8C] uppercase tracking-wide mt-1"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    {currentSlide.badgeText.replace(/[\d+]+%|\d\+\d/, '').trim() || 'Limited time'}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:left-16 lg:translate-x-0 z-40 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to offer ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-[#EE4275]' : 'w-1.5 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}