
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
//     subtitle: 'Dermatologist-formulated skincare, curated for the way your skin actually changes through the year.',
//     description: 'Dermatologist-formulated skincare, curated for the way your skin actually changes through the year.',
//     badgeText: 'Up to 30% off',
//     leftPanelBgImage: '/images/lbg9.PNG',
//     circleImage: '/images/f.PNG',
//     rightPanelBgImage: '/images/login.jpg',
//     ctaLabel: 'Shop the edit',
//     ctaHref: '/products?collection=autumn',
//     secondaryLabel: 'Our story',
//     secondaryHref: '/about'
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
//     subtitle: 'Stock your routine and share it. Applies automatically on every serum and moisturizer this week.',
//     description: 'Stock your routine and share it. Applies automatically on every serum and moisturizer this week.',
//     badgeText: '2+1 free',
//     leftPanelBgImage: '/images/lbg9.PNG',
//     circleImage: '/images/hero-2.jpg',
//     rightPanelBgImage: '/images/right-2.jpg',
//     ctaLabel: 'Shop the offer',
//     ctaHref: '/products?promo=bogo',
//     secondaryLabel: 'Our story',
//     secondaryHref: '/about'
//   }
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
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//         const response = await fetch(`${apiUrl}/api/banners/homepage`, { cache: 'no-store' });
        
//         if (response.ok) {
//           const result = await response.json();
//           if (result.success && result.data && result.data.length > 0) {
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
//       setDirection(next > index || (index === total - 1 && next === 0) ? 1 : -1);
//       setIndex(((next % total) + total) % total);
//     },
//     [index, total]
//   );

//   const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
//   const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

//   useEffect(() => {
//     if (isPaused || total <= 1 || isLoading) return undefined;
//     timerRef.current = setInterval(goNext, AUTOPLAY_MS);
//     return () => clearInterval(timerRef.current);
//   }, [goNext, isPaused, total, isLoading]);

//   if (isLoading) {
//     return (
//       <section className="relative overflow-hidden bg-[#F8F1F4]">
//         <div className="relative grid lg:grid-cols-[1.05fr_1fr] min-h-[470px] lg:min-h-[540px]">
//           <div className="flex items-center justify-center bg-gray-200 animate-pulse">
//             <div className="text-gray-400">Loading banners...</div>
//           </div>
//           <div className="bg-gray-300 animate-pulse"></div>
//         </div>
//       </section>
//     );
//   }

//   if (!slide) return null;

//   const currentSlide = {
//     ...slide,
//     title: typeof slide.title === 'string' ? (
//       slide.title.includes('\n') ? (
//         slide.title.split('\n').map((line, i) => (
//           <span key={i}>
//             {line}
//             {i < slide.title.split('\n').length - 1 && <br />}
//           </span>
//         ))
//       ) : slide.title
//     ) : slide.title
//   };

//   return (
//     <section
//       className="relative overflow-hidden bg-[#F8F1F4] -mt-16"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       {/* ✅ INCREASED HEIGHT: min-h-[520px] lg:min-h-[600px] */}
//       <div className="relative grid lg:grid-cols-[1.05fr_1fr] min-h-[520px] lg:min-h-[600px]">

//         {/* LEFT PANEL */}
//         <div
//           className="relative flex items-center px-6 sm:px-10 lg:px-16 py-16 lg:py-0 z-10 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: `url('${currentSlide.leftPanelBgImage || leftPanelBgImage}')`,
//           }}
//         >
//           {/* Dark overlay for text readability */}
//           <div className="absolute inset-0 bg-black/50" />

//           {/* Soft pink glow */}
//           <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-[#EE4275]/20 blur-3xl pointer-events-none" />

//           {/* Dotted pattern */}
//           <div
//             className="absolute inset-0 opacity-[0.04] pointer-events-none"
//             style={{
//               backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
//               backgroundSize: '28px 28px',
//             }}
//           />

//           {/* LEFT SLIDE CONTENT */}
//           <AnimatePresence mode="wait" custom={direction}>
//             <motion.div
//               key={index}
//               custom={direction}
//               initial={{ opacity: 0, x: direction * 24 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: direction * -24 }}
//               transition={{ duration: 0.5, ease: 'easeOut' }}
//               className="relative z-10 w-full max-w-[620px] pr-0 sm:pr-[70px] lg:pr-[100px]"
//             >
//               {/* Eyebrow */}
//               <div className="inline-flex items-center gap-2 mb-4">
//                 <span className="h-px w-8 bg-[#EE4275]" />
//                 <span
//                   className="text-xs font-medium tracking-[0.2em] uppercase text-[#F0A6BE]"
//                   style={{ fontFamily: FONT_FAMILY_INTER }}
//                 >
//                   {currentSlide.eyebrow}
//                 </span>
//               </div>

//               {/* Title */}
//               <h1
//                 className="text-3xl sm:text-4xl lg:text-[3rem] leading-[1.08] font-bold text-white mb-4 max-w-[520px] line-clamp-2"
//                 style={{ fontFamily: FONT_FAMILY }}
//               >
//                 {currentSlide.title}
//               </h1>

//               {/* Description */}
//              <p
//   className="text-white/80 text-base lg:text-lg leading-relaxed max-w-[400px] mb-6 line-clamp-2"
//   style={{ fontFamily: FONT_FAMILY }}
// >
//   {currentSlide.subtitle || currentSlide.description}
// </p>

//               {/* Buttons */}
//               <div className="flex flex-wrap items-center gap-4">
//                 <Link href={currentSlide.ctaHref || '/products'}>
//                   <button
//                     className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EE4275] text-white rounded-full font-medium text-sm hover:bg-[#d63868] transition-colors"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     {currentSlide.ctaLabel || 'Shop Now'}
//                     <FaArrowRight className="w-3.5 h-3.5" />
//                   </button>
//                 </Link>

//                 <Link
//                   href={currentSlide.secondaryHref || secondaryHref}
//                   className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium border-b border-white/20 hover:border-white/60 pb-0.5 transition-colors"
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   {currentSlide.secondaryLabel || secondaryLabel}
//                 </Link>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Bottom information */}
//           <div
//             className="absolute left-6 sm:left-10 lg:left-16 bottom-6 flex items-center gap-2 z-10"
//             style={{ fontFamily: FONT_FAMILY_INTER }}
//           >
//             <FaLeaf className="w-3.5 h-3.5 text-[#EE4275]" />
//             <span className="text-white/50 text-xs">
//               Cruelty-free &amp; dermatologically tested
//             </span>
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="relative min-h-[280px] lg:min-h-0 overflow-hidden">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={`right-bg-${index}`}
//               initial={{ opacity: 0, scale: 1.03 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 1 }}
//               transition={{ duration: 0.6, ease: 'easeOut' }}
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
//               <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/60" />
//             ))}
//           </div>

//           {/* Navigation arrows */}
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

//         {/* CENTER CIRCLE */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.94 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
//           className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 hidden sm:block pointer-events-none"
//           style={{ left: '51.22%' }}
//         >
//           {/* ✅ INCREASED CIRCLE SIZE: w-[280px] lg:w-[380px] */}
//           <div className="w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/20 shadow-2xl">
//             <div className="w-[88%] h-[88%] rounded-full overflow-hidden relative bg-black/10">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={`circle-${index}`}
//                   initial={{ opacity: 0, scale: 1.08 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.96 }}
//                   transition={{ duration: 0.5, ease: 'easeOut' }}
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

//       {/* Dot indicators */}
//       {total > 1 && (
//         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:left-16 lg:translate-x-0 z-40 flex items-center gap-2">
//           {slides.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => goTo(i)}
//               aria-label={`Go to offer ${i + 1}`}
//               className={`h-1.5 rounded-full transition-all ${
//                 i === index ? 'w-6 bg-[#EE4275]' : 'w-1.5 bg-white/30 hover:bg-white/50'
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
    subtitle:
      'Dermatologist-formulated skincare, curated for the way your skin actually changes through the year.',
    description:
      'Dermatologist-formulated skincare, curated for the way your skin actually changes through the year.',
    badgeText: 'Up to 30% off',
    leftPanelBgImage: '/images/lbg9.PNG',
    circleImage: '/images/f.PNG',
    rightPanelBgImage: '/images/login.jpg',
    ctaLabel: 'Shop the edit',
    ctaHref: '/products?collection=autumn',
    secondaryLabel: 'Our story',
    secondaryHref: '/about',
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
    subtitle:
      'Stock your routine and share it. Applies automatically on every serum and moisturizer this week.',
    description:
      'Stock your routine and share it. Applies automatically on every serum and moisturizer this week.',
    badgeText: '2+1 free',
    leftPanelBgImage: '/images/lbg9.PNG',
    circleImage: '/images/hero-2.jpg',
    rightPanelBgImage: '/images/right-2.jpg',
    ctaLabel: 'Shop the offer',
    ctaHref: '/products?promo=bogo',
    secondaryLabel: 'Our story',
    secondaryHref: '/about',
  },
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

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        const response = await fetch(`${apiUrl}/api/banners/homepage`, {
          cache: 'no-store',
        });

        if (response.ok) {
          const result = await response.json();

          if (
            result.success &&
            result.data &&
            result.data.length > 0
          ) {
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
        next > index ||
          (index === total - 1 && next === 0)
          ? 1
          : -1
      );

      setIndex(((next % total) + total) % total);
    },
    [index, total]
  );

  const goNext = useCallback(
    () => goTo(index + 1),
    [goTo, index]
  );

  const goPrev = useCallback(
    () => goTo(index - 1),
    [goTo, index]
  );

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
      <section className="relative overflow-hidden bg-[#F8F1F4]">
        <div className="relative grid grid-cols-[1.05fr_1fr] min-h-[280px] sm:min-h-[390px] lg:grid-cols-[1.05fr_1fr] lg:min-h-[540px]">
          <div className="flex items-center justify-center bg-gray-200 animate-pulse">
            <div className="text-gray-400 text-xs sm:text-sm">
              Loading banners...
            </div>
          </div>

          <div className="bg-gray-300 animate-pulse"></div>
        </div>
      </section>
    );
  }

  if (!slide) return null;

  // Format title coming from API
  const currentSlide = {
    ...slide,
    title:
      typeof slide.title === 'string'
        ? slide.title.includes('\n')
          ? slide.title.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))
          : slide.title
        : slide.title,
  };

  return (
    <section
      className="relative overflow-hidden bg-[#F8F1F4] -mt-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =========================================================
          MAIN BANNER
          Mobile = reduced height
          Desktop = original layout
      ========================================================== */}

      {/* <div className="relative grid grid-cols-[1.05fr_1fr] min-h-[280px] sm:min-h-[390px] lg:grid-cols-[1.05fr_1fr] lg:min-h-[600px]"> */}

      <div className="relative grid grid-cols-[1.05fr_1fr] min-h-[250px] sm:min-h-[350px] lg:grid-cols-[1.05fr_1fr] lg:min-h-[600px]">

        {/* =====================================================
            LEFT PANEL
        ====================================================== */}

        <div
          className="
            relative
            flex
            items-center
            px-3
            sm:px-6
            lg:px-16
            py-8
            sm:py-10
            lg:py-0
            z-10
            bg-cover
            bg-center
            bg-no-repeat
          "
          style={{
            backgroundImage: `url('${
              currentSlide.leftPanelBgImage || leftPanelBgImage
            }')`,
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Soft pink glow */}
          <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-[#EE4275]/20 blur-3xl pointer-events-none" />

          {/* Dotted pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* LEFT SLIDE CONTENT */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction * 24,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: direction * -24,
              }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
              }}
              className="
                relative
                z-10
                w-full
                max-w-[620px]
                pr-[25px]
                sm:pr-[50px]
                lg:pr-[100px]
              "
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
                <span className="h-px w-4 sm:w-8 bg-[#EE4275]" />

                <span
                  className="
                    text-[7px]
                    sm:text-[10px]
                    lg:text-xs
                    font-medium
                    tracking-[0.12em]
                    sm:tracking-[0.2em]
                    uppercase
                    text-[#F0A6BE]
                  "
                  style={{
                    fontFamily: FONT_FAMILY_INTER,
                  }}
                >
                  {currentSlide.eyebrow}
                </span>
              </div>

              {/* Title */}
              <h1
                className="
                  text-[17px]
                  sm:text-3xl
                  lg:text-[3rem]
                  leading-[1.08]
                  font-bold
                  text-white
                  mb-2
                  sm:mb-4
                  max-w-[520px]
                  line-clamp-2
                "
                style={{
                  fontFamily: FONT_FAMILY,
                }}
              >
                {currentSlide.title}
              </h1>

              {/* Description */}
              <p
                className="
                  text-white/80
                  text-[8px]
                  sm:text-sm
                  lg:text-lg
                  leading-[1.4]
                  sm:leading-relaxed
                  max-w-[400px]
                  mb-3
                  sm:mb-6
                  line-clamp-2
                "
                style={{
                  fontFamily: FONT_FAMILY,
                }}
              >
                {currentSlide.subtitle ||
                  currentSlide.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <Link
                  href={
                    currentSlide.ctaHref || '/products'
                  }
                >
                  <button
                    className="
                      inline-flex
                      items-center
                      gap-1
                      sm:gap-2
                      px-2.5
                      sm:px-5
                      py-1.5
                      sm:py-2.5
                      bg-[#EE4275]
                      text-white
                      rounded-full
                      font-medium
                      text-[8px]
                      sm:text-sm
                      hover:bg-[#d63868]
                      transition-colors
                    "
                    style={{
                      fontFamily: FONT_FAMILY,
                    }}
                  >
                    {currentSlide.ctaLabel || 'Shop Now'}

                    <FaArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  </button>
                </Link>

                <Link
                  href={
                    currentSlide.secondaryHref ||
                    secondaryHref
                  }
                  className="
                    inline-flex
                    items-center
                    gap-1
                    sm:gap-2
                    text-white/70
                    hover:text-white
                    text-[8px]
                    sm:text-sm
                    font-medium
                    border-b
                    border-white/20
                    hover:border-white/60
                    pb-0.5
                    transition-colors
                  "
                  style={{
                    fontFamily: FONT_FAMILY,
                  }}
                >
                  {currentSlide.secondaryLabel ||
                    secondaryLabel}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom information */}
          <div
            className="
              absolute
              left-3
              sm:left-6
              lg:left-16
              bottom-2
              sm:bottom-4
              lg:bottom-6
              flex
              items-center
              gap-1
              sm:gap-2
              z-10
            "
            style={{
              fontFamily: FONT_FAMILY_INTER,
            }}
          >
            <FaLeaf className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#EE4275]" />

            <span className="text-white/50 text-[6px] sm:text-xs">
              Cruelty-free &amp; dermatologically tested
            </span>
          </div>
        </div>

        {/* =====================================================
            RIGHT PANEL
        ====================================================== */}

        {/* <div className="relative min-h-[280px] sm:min-h-[390px] lg:min-h-0 overflow-hidden"> */}
        <div className="relative min-h-[250px] sm:min-h-[350px] lg:min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-bg-${index}`}
              initial={{
                opacity: 0,
                scale: 1.03,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
              }}
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
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-white/60"
              />
            ))}
          </div>

          {/* Navigation arrows */}
          {total > 1 && (
            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-30 flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={goPrev}
                aria-label="Previous offer"
                className="
                  w-6
                  h-6
                  sm:w-8
                  sm:h-8
                  rounded-full
                  bg-white/90
                  text-[#2D1B2E]
                  flex
                  items-center
                  justify-center
                  hover:bg-white
                  transition-colors
                "
              >
                <FaChevronLeft className="w-2 h-2 sm:w-3 sm:h-3" />
              </button>

              <button
                onClick={goNext}
                aria-label="Next offer"
                className="
                  w-6
                  h-6
                  sm:w-8
                  sm:h-8
                  rounded-full
                  bg-white/90
                  text-[#2D1B2E]
                  flex
                  items-center
                  justify-center
                  hover:bg-white
                  transition-colors
                "
              >
                <FaChevronRight className="w-2 h-2 sm:w-3 sm:h-3" />
              </button>
            </div>
          )}
        </div>

        {/* =====================================================
            CENTER PRODUCT CIRCLE
            Smaller on mobile/tablet
            Original size preserved on large devices
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
            delay: 0.15,
          }}
          className="
            absolute
            top-1/2
            -translate-y-1/2
            -translate-x-1/2
            z-20
            block
            pointer-events-none
          "
          style={{
            left: '51.22%',
          }}
        >
          {/* Circle */}
          <div
            className="
              w-[90px]
              h-[90px]
              sm:w-[160px]
              sm:h-[160px]
              lg:w-[380px]
              lg:h-[380px]
              rounded-full
              border
              border-white/30
              flex
              items-center
              justify-center
              backdrop-blur-sm
              bg-black/20
              shadow-2xl
            "
          >
            <div className="w-[88%] h-[88%] rounded-full overflow-hidden relative bg-black/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`circle-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 1.08,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeOut',
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentSlide.circleImage}
                    alt="Featured product"
                    fill
                    sizes="380px"
                    className="object-cover object-center"
                    priority={index === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          DOT INDICATORS
      ========================================================== */}

      {total > 1 && (
        <div
          className="
            absolute
            bottom-2
            sm:bottom-4
            left-1/2
            -translate-x-1/2
            lg:left-16
            lg:translate-x-0
            z-40
            flex
            items-center
            gap-1.5
            sm:gap-2
          "
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to offer ${i + 1}`}
              className={`
                h-1
                sm:h-1.5
                rounded-full
                transition-all
                ${
                  i === index
                    ? 'w-4 sm:w-6 bg-[#EE4275]'
                    : 'w-1 sm:w-1.5 bg-white/30 hover:bg-white/50'
                }
              `}
            />
          ))}
        </div>
      )}
    </section>
  );
}