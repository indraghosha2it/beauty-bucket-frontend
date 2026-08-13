
// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { useState, useEffect, useRef } from 'react';
// import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

// export default function Categories() {
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(false);
//   const [pageWidth, setPageWidth] = useState(0);
//   const scrollContainerRef = useRef(null);
//   const wrapperRef = useRef(null);

//   const CARDS_PER_VIEW = 7;

//   // Fetch categories from API
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setIsLoading(true);
//     try {
//       // Use the LIGHTWEIGHT endpoint
//       const response = await fetch('http://localhost:5000/api/categories/light');
//       const data = await response.json();
      
//       if (data.success) {
//         const formattedCategories = data.data.map((cat, index) => ({
//           _id: cat._id,
//           name: cat.name,
//           image: cat.image?.url || getDefaultImage(index),
//           slug: cat.slug,
//           productCount: cat.productCount || Math.floor(Math.random() * 50) + 10,
//         }));
//         setCategories(formattedCategories);
//         setTimeout(() => {
//           calculatePageWidth();
//           checkScroll();
//         }, 150);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       // Fallback data
//       const fallbackCategories = [
//         { _id: '1', name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', productCount: 42 },
//         { _id: '2', name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', productCount: 38 },
//         { _id: '3', name: 'Smartwatches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', productCount: 25 },
//         { _id: '4', name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', productCount: 31 },
//         { _id: '5', name: 'Cameras', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop', productCount: 19 },
//         { _id: '6', name: 'Gaming Gear', image: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=400&h=400&fit=crop', productCount: 27 },
//         { _id: '7', name: 'Audio Speakers', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop', productCount: 22 },
//         { _id: '8', name: 'Accessories', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop', productCount: 45 },
//         { _id: '9', name: 'Tablets', image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop', productCount: 30 },
//       ];
//       setCategories(fallbackCategories);
//       setTimeout(() => {
//         calculatePageWidth();
//         checkScroll();
//       }, 150);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getDefaultImage = (index) => {
//     const images = [
//       'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
//       'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
//       'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
//       'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
//     ];
//     return images[index % images.length];
//   };

//   // Calculates the exact pixel width of N full cards + gaps
//   const calculatePageWidth = () => {
//     if (!scrollContainerRef.current || !wrapperRef.current) return;
//     const firstCard = scrollContainerRef.current.children[0];
//     if (!firstCard) return;

//     const cardWidth = firstCard.offsetWidth;
//     const style = window.getComputedStyle(scrollContainerRef.current);
//     const gap = parseFloat(style.columnGap || style.gap) || 16;

//     const parentWidth = wrapperRef.current.parentElement.offsetWidth;
//     const maxFit = Math.floor((parentWidth + gap) / (cardWidth + gap));
//     const cardsToShow = Math.max(1, Math.min(CARDS_PER_VIEW, maxFit));

//     const width = cardsToShow * cardWidth + (cardsToShow - 1) * gap;
//     setPageWidth(width);
//   };

//   const checkScroll = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftArrow(scrollLeft > 20);
//       setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
//     }
//   };

//   // Scroll by exactly one page (N full cards)
//   const scroll = (direction) => {
//     if (scrollContainerRef.current && pageWidth) {
//       const newScrollLeft = direction === 'left'
//         ? scrollContainerRef.current.scrollLeft - pageWidth
//         : scrollContainerRef.current.scrollLeft + pageWidth;

//       scrollContainerRef.current.scrollTo({
//         left: newScrollLeft,
//         behavior: 'smooth'
//       });
//     }
//   };

//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (container) {
//       calculatePageWidth();
//       container.addEventListener('scroll', checkScroll);
//       checkScroll();
      
//       const handleResize = () => {
//         calculatePageWidth();
//         checkScroll();
//       };
      
//       window.addEventListener('resize', handleResize);
      
//       return () => {
//         container.removeEventListener('scroll', checkScroll);
//         window.removeEventListener('resize', handleResize);
//       };
//     }
//   }, [categories]);

//   if (isLoading) {
//     return (
//       <section className="py-10 md:py-14 bg-gradient-to-b from-[#F7C7D3]/5 to-white">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="mb-8">
//             <div className="h-8 w-48 bg-[#F7C7D3]/30 rounded animate-pulse"></div>
//             <div className="h-4 w-64 bg-[#F7C7D3]/20 rounded animate-pulse mt-2"></div>
//           </div>
//           <div className="flex gap-4 overflow-hidden">
//             {[...Array(7)].map((_, i) => (
//               <div key={i} className="animate-pulse flex-shrink-0">
//                 <div className="w-32 h-32 md:w-36 md:h-36 rounded-xl bg-[#F7C7D3]/30"></div>
//                 <div className="h-4 w-20 bg-[#F7C7D3]/20 rounded mx-auto mt-2"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-[#F7C7D3]/5 via-white to-white overflow-hidden relative">
//       {/* Background Decorative Elements */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#EE4275]/5 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#EE4275]/5 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-0 max-w-7xl relative z-10">
//         {/* Section Header - LEFT ALIGNED */}
//         <div className="mb-8 md:mb-10 px-4">
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-2 px-3 py-1 bg-[#EE4275]/10 rounded-full mb-3"
//           >
//             <Sparkles className="w-3.5 h-3.5 text-[#EE4275]" />
//             <span className="text-xs font-medium text-[#EE4275] tracking-wider uppercase">
//               Categories
//             </span>
//             <Sparkles className="w-3.5 h-3.5 text-[#EE4275]" />
//           </motion.div>
          
//           <motion.h2 
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//             className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
//             style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
//           >
//             Shop by <span className="text-[#EE4275]">Category</span>
//           </motion.h2>
          
//           <motion.p
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//             className="text-gray-500 mt-1.5 text-sm"
//           >
//             Discover cutting-edge gadgets and tech accessories
//           </motion.p>
//         </div>

//         {/* Categories Row with Scroll Arrows */}
//         <div className="relative group px-3 sm:px-6 md:px-6">
//           {/* Left Arrow */}
//           <AnimatedArrow
//             show={showLeftArrow}
//             direction="left"
//             onClick={() => scroll('left')}
//             Icon={ChevronLeft}
//           />

//           {/* Right Arrow */}
//           <AnimatedArrow
//             show={showRightArrow}
//             direction="right"
//             onClick={() => scroll('right')}
//             Icon={ChevronRight}
//           />

//           {/* Fixed-width wrapper that clips to exactly N full cards */}
//           <div
//             ref={wrapperRef}
//             className="mx-auto overflow-hidden"
//             style={{ width: pageWidth ? `${pageWidth}px` : '100%', maxWidth: '100%' }}
//           >
//             {/* Scrollable Container */}
//             <div
//               ref={scrollContainerRef}
//               className="flex overflow-x-auto gap-4 md:gap-5 pb-4 scroll-smooth"
//               style={{
//                 scrollbarWidth: 'none',
//                 msOverflowStyle: 'none',
//                 WebkitOverflowScrolling: 'touch'
//               }}
//             >
//               {categories.map((category, index) => (
//                 <CategoryCard 
//                   key={category._id || index} 
//                   category={category} 
//                   index={index}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // Animated Arrow Component
// function AnimatedArrow({ show, direction, onClick, Icon }) {
//   if (!show) return null;

//   return (
//     <motion.button
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       onClick={onClick}
//       className={`absolute top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 md:p-2.5 border-2 border-[#EE4275]/20 hover:border-[#EE4275] hover:shadow-[#EE4275]/20 transition-all duration-300 ${
//         direction === 'left' ? 'left-0 -ml-3 md:-ml-4' : 'right-0 -mr-3 md:-mr-4'
//       }`}
//       whileHover={{ scale: 1.1, backgroundColor: '#EE4275' }}
//       whileTap={{ scale: 0.95 }}
//     >
//       <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-300 text-[#EE4275]`} />
//     </motion.button>
//   );
// }

// // Category Card Component - Square with rounded corners
// function CategoryCard({ category, index }) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       className="flex-shrink-0"
//     >
//       <Link href={`/products?category=${category._id}`}>
//         <div className="cursor-pointer group/card w-32 sm:w-36 md:w-40 lg:w-44">
//           {/* Square Card with Rounded Corners */}
//           <motion.div 
//             className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F7C7D3]/10"
//             style={{
//               boxShadow: isHovered 
//                 ? '0 8px 30px rgba(238, 66, 117, 0.15)' 
//                 : '0 4px 12px rgba(0,0,0,0.06)',
//               border: isHovered 
//                 ? '2.5px solid #EE4275' 
//                 : '2.5px solid transparent',
//               transition: 'border 0.3s ease, box-shadow 0.3s ease'
//             }}
//           >
//             {/* Category Image */}
//             <img
//               src={category.image}
//               alt={category.name}
//               className="w-full h-full object-cover"
//               loading="lazy"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop';
//               }}
//             />
            
//             {/* Pink Gradient Overlay on Hover */}
//             <motion.div 
//               className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/60 via-[#EE4275]/30 to-[#EE4275]/10"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: isHovered ? 1 : 0 }}
//               transition={{ duration: 0.3 }}
//             />

//             {/* Explore Button - Appears on Hover with Pink Overlay */}
//             <motion.div
//               className="absolute inset-0 flex items-center justify-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: isHovered ? 1 : 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-[#EE4275]/20">
//                 <span className="text-xs font-medium text-[#EE4275]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
//                   Explore
//                 </span>
//                 <ArrowRight className="w-3.5 h-3.5 text-[#EE4275]" />
//               </div>
//             </motion.div>
//           </motion.div>
          
//           {/* Category Name - Under the image */}
//           <motion.div className="mt-2.5 text-center">
//             <motion.h3 
//               className="text-xs sm:text-sm font-semibold text-gray-800 px-1 truncate"
//               style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
//               animate={{ 
//                 color: isHovered ? '#EE4275' : '#1F2937',
//               }}
//               transition={{ duration: 0.2 }}
//             >
//               {category.name}
//             </motion.h3>
            
//             {/* Decorative Underline */}
//             <motion.div
//               className="h-0.5 bg-gradient-to-r from-[#EE4275] to-[#F7C7D3] rounded-full mx-auto mt-1"
//               initial={{ width: 0, opacity: 0 }}
//               animate={{ 
//                 width: isHovered ? '50%' : 0,
//                 opacity: isHovered ? 1 : 0
//               }}
//               transition={{ duration: 0.3 }}
//             />
//           </motion.div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }


'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

// Font family constant
const FONT_FAMILY = "'Courgette', cursive";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [pageWidth, setPageWidth] = useState(0);
  const scrollContainerRef = useRef(null);
  const wrapperRef = useRef(null);

  const CARDS_PER_VIEW = 7;

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      // Use the LIGHTWEIGHT endpoint
      const response = await fetch('http://localhost:5000/api/categories/light');
      const data = await response.json();
      
      if (data.success) {
        const formattedCategories = data.data.map((cat, index) => ({
          _id: cat._id,
          name: cat.name,
          image: cat.image?.url || getDefaultImage(index),
          slug: cat.slug,
          productCount: cat.productCount || Math.floor(Math.random() * 50) + 10,
        }));
        setCategories(formattedCategories);
        setTimeout(() => {
          calculatePageWidth();
          checkScroll();
        }, 150);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback data
      const fallbackCategories = [
        { _id: '1', name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', productCount: 42 },
        { _id: '2', name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', productCount: 38 },
        { _id: '3', name: 'Smartwatches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', productCount: 25 },
        { _id: '4', name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', productCount: 31 },
        { _id: '5', name: 'Cameras', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop', productCount: 19 },
        { _id: '6', name: 'Gaming Gear', image: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=400&h=400&fit=crop', productCount: 27 },
        { _id: '7', name: 'Audio Speakers', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop', productCount: 22 },
        { _id: '8', name: 'Accessories', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop', productCount: 45 },
        { _id: '9', name: 'Tablets', image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop', productCount: 30 },
      ];
      setCategories(fallbackCategories);
      setTimeout(() => {
        calculatePageWidth();
        checkScroll();
      }, 150);
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultImage = (index) => {
    const images = [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    ];
    return images[index % images.length];
  };

  // Calculates the exact pixel width of N full cards + gaps
  const calculatePageWidth = () => {
    if (!scrollContainerRef.current || !wrapperRef.current) return;
    const firstCard = scrollContainerRef.current.children[0];
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const style = window.getComputedStyle(scrollContainerRef.current);
    const gap = parseFloat(style.columnGap || style.gap) || 16;

    const parentWidth = wrapperRef.current.parentElement.offsetWidth;
    const maxFit = Math.floor((parentWidth + gap) / (cardWidth + gap));
    const cardsToShow = Math.max(1, Math.min(CARDS_PER_VIEW, maxFit));

    const width = cardsToShow * cardWidth + (cardsToShow - 1) * gap;
    setPageWidth(width);
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  // Scroll by exactly one page (N full cards)
  const scroll = (direction) => {
    if (scrollContainerRef.current && pageWidth) {
      const newScrollLeft = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - pageWidth
        : scrollContainerRef.current.scrollLeft + pageWidth;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      calculatePageWidth();
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      
      const handleResize = () => {
        calculatePageWidth();
        checkScroll();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [categories]);

  if (isLoading) {
    return (
      <section className="py-10 md:py-14 bg-gradient-to-b from-[#F7C7D3]/5 to-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <div className="h-8 w-48 bg-[#F7C7D3]/30 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-[#F7C7D3]/20 rounded animate-pulse mt-2"></div>
          </div>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="animate-pulse flex-shrink-0">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-xl bg-[#F7C7D3]/30"></div>
                <div className="h-4 w-20 bg-[#F7C7D3]/20 rounded mx-auto mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-[#F7C7D3]/5 via-white to-white overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#EE4275]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#EE4275]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-0 max-w-7xl relative z-10">
        {/* Section Header - LEFT ALIGNED */}
        <div className="mb-8 md:mb-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#EE4275]/10 rounded-full mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#EE4275]" />
            <span className="text-xs font-medium text-[#EE4275] tracking-wider uppercase" style={{ fontFamily: FONT_FAMILY }}>
              Categories
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#EE4275]" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
            style={{ fontFamily: FONT_FAMILY }}
          >
            Shop by <span className="text-[#EE4275]">Category</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mt-1.5 text-sm"
            style={{ fontFamily: FONT_FAMILY }}
          >
            Discover cutting-edge gadgets and tech accessories
          </motion.p>
        </div>

        {/* Categories Row with Scroll Arrows */}
        <div className="relative group px-3 sm:px-6 md:px-6">
          {/* Left Arrow */}
          <AnimatedArrow
            show={showLeftArrow}
            direction="left"
            onClick={() => scroll('left')}
            Icon={ChevronLeft}
          />

          {/* Right Arrow */}
          <AnimatedArrow
            show={showRightArrow}
            direction="right"
            onClick={() => scroll('right')}
            Icon={ChevronRight}
          />

          {/* Fixed-width wrapper that clips to exactly N full cards */}
          <div
            ref={wrapperRef}
            className="mx-auto overflow-hidden"
            style={{ width: pageWidth ? `${pageWidth}px` : '100%', maxWidth: '100%' }}
          >
            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 md:gap-5 pb-4 scroll-smooth"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {categories.map((category, index) => (
                <CategoryCard 
                  key={category._id || index} 
                  category={category} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated Arrow Component
function AnimatedArrow({ show, direction, onClick, Icon }) {
  if (!show) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 md:p-2.5 border-2 border-[#EE4275]/20 hover:border-[#EE4275] hover:shadow-[#EE4275]/20 transition-all duration-300 ${
        direction === 'left' ? 'left-0 -ml-3 md:-ml-4' : 'right-0 -mr-3 md:-mr-4'
      }`}
      whileHover={{ scale: 1.1, backgroundColor: '#EE4275' }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-300 text-[#EE4275]`} />
    </motion.button>
  );
}

// Category Card Component - Square with rounded corners
function CategoryCard({ category, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex-shrink-0"
    >
      <Link href={`/products?category=${category._id}`}>
        <div className="cursor-pointer group/card w-32 sm:w-36 md:w-40 lg:w-44">
          {/* Square Card with Rounded Corners */}
          <motion.div 
            className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F7C7D3]/10"
            style={{
              boxShadow: isHovered 
                ? '0 8px 30px rgba(238, 66, 117, 0.15)' 
                : '0 4px 12px rgba(0,0,0,0.06)',
              border: isHovered 
                ? '2.5px solid #EE4275' 
                : '2.5px solid transparent',
              transition: 'border 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            {/* Category Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop';
              }}
            />
            
            {/* Pink Gradient Overlay on Hover */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/60 via-[#EE4275]/30 to-[#EE4275]/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Explore Button - Appears on Hover with Pink Overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-[#EE4275]/20">
                <span className="text-xs font-medium text-[#EE4275]" style={{ fontFamily: FONT_FAMILY }}>
                  Explore
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#EE4275]" />
              </div>
            </motion.div>
          </motion.div>
          
          {/* Category Name - Under the image */}
          <motion.div className="mt-2.5 text-center">
            <motion.h3 
              className="text-xs sm:text-sm font-semibold text-gray-800 px-1 truncate"
              style={{ fontFamily: FONT_FAMILY }}
              animate={{ 
                color: isHovered ? '#EE4275' : '#1F2937',
              }}
              transition={{ duration: 0.2 }}
            >
              {category.name}
            </motion.h3>
            
            {/* Decorative Underline */}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-[#EE4275] to-[#F7C7D3] rounded-full mx-auto mt-1"
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: isHovered ? '50%' : 0,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}