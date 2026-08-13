
// // components/home/HeroBanner.js
// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import Link from 'next/link';
// import { ChevronLeft, ChevronRight, Clock, Shield, Truck, Star, TrendingUp, Headphones, ArrowRight } from 'lucide-react';
// import { getHomepageBanners, trackBannerClick } from '@/app/services/bannerService';

// // Icon mapping
// const ICON_MAP = {
//   Truck: Truck,
//   Shield: Shield,
//   Clock: Clock,
//   Star: Star,
//   TrendingUp: TrendingUp,
//   Headphones: Headphones
// };

// // ✅ Local storage cache configuration
// const CACHE_KEY = 'homepage_banners_cache';
// const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// // ✅ Image optimization helper
// const getOptimizedImageUrl = (url, width = 1200, quality = 80) => {
//   if (!url) return '';
  
//   // If it's a Cloudinary URL, add optimization params
//   if (url.includes('cloudinary.com')) {
//     const parts = url.split('/upload/');
//     if (parts.length === 2) {
//       return `${parts[0]}/upload/f_auto,q_${quality},w_${width}/c_limit/${parts[1]}`;
//     }
//   }
//   return url;
// };

// export default function BannerCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [touchStart, setTouchStart] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [banners, setBanners] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isCacheUsed, setIsCacheUsed] = useState(false);
//   const autoPlayRef = useRef(null);

//   // ✅ Fetch banners with cache
//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         // ✅ Check local cache first
//         const cachedData = localStorage.getItem(CACHE_KEY);
//         if (cachedData) {
//           try {
//             const { data, timestamp } = JSON.parse(cachedData);
//             if (data && data.length > 0 && (Date.now() - timestamp < CACHE_DURATION)) {
//               console.log('📦 Using cached banners');
//               setBanners(data);
//               setIsCacheUsed(true);
//               setIsLoading(false);
//               return;
//             }
//           } catch (e) {
//             console.log('Cache parse error, fetching fresh');
//           }
//         }

//         console.log('🔄 Fetching fresh banners from API');
//         const response = await getHomepageBanners();
        
//         if (response.success && response.data && response.data.length > 0) {
//           setBanners(response.data);
//           // ✅ Store in cache
//           localStorage.setItem(CACHE_KEY, JSON.stringify({
//             data: response.data,
//             timestamp: Date.now()
//           }));
//           setIsCacheUsed(false);
//         } else {
//           // ✅ Try to use cache even if expired
//           const cachedData = localStorage.getItem(CACHE_KEY);
//           if (cachedData) {
//             try {
//               const { data } = JSON.parse(cachedData);
//               if (data && data.length > 0) {
//                 console.log('📦 Using expired cache as fallback');
//                 setBanners(data);
//                 setIsCacheUsed(true);
//                 setIsLoading(false);
//                 return;
//               }
//             } catch (e) {}
//           }
//           setBanners(getFallbackBanners());
//         }
//       } catch (error) {
//         console.error('Error fetching banners:', error);
//         // ✅ Try to use cache on error
//         const cachedData = localStorage.getItem(CACHE_KEY);
//         if (cachedData) {
//           try {
//             const { data } = JSON.parse(cachedData);
//             if (data && data.length > 0) {
//               console.log('📦 Using cache on error');
//               setBanners(data);
//               setIsCacheUsed(true);
//               setIsLoading(false);
//               return;
//             }
//           } catch (e) {}
//         }
//         setBanners(getFallbackBanners());
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchBanners();
//   }, []);

//   // Fallback banners if API fails
//   const getFallbackBanners = () => {
//     return [
//       {
//         id: 'fallback-1',
//         title: 'Premium Gadgets',
//         subtitle: 'Latest Technology',
//         mainText: 'Experience the Future Today',
//         description: 'Discover cutting-edge electronics with premium quality and unmatched performance',
//         badge: 'Limited Edition',
//         discount: '40% OFF',
//         category: 'Electronics',
//         bgImage: 'https://i.ibb.co.com/WWQ097yx/Gemini-Generated-Image-3wcrdr3wcrdr3wcr.png',
//         productImage: 'https://res.cloudinary.com/dta5ahuh9/image/upload/v1781580462/rt3xpskc6vmqj5oieltz.jpg',
//         features: [
//           { icon: 'Truck', text: 'Free Shipping' },
//           { icon: 'Shield', text: '2 Year Warranty' },
//           { icon: 'Clock', text: '24/7 Support' }
//         ],
//         buttons: [
//           { text: 'Shop Now', link: '/products', isPrimary: true },
//           { text: 'Learn More', link: '/about', isPrimary: false }
//         ]
//       }
//     ];
//   };

//   const nextSlide = useCallback(() => {
//     if (isTransitioning || banners.length === 0) return;
//     setIsTransitioning(true);
//     setCurrentSlide((prev) => (prev + 1) % banners.length);
//     setTimeout(() => setIsTransitioning(false), 600);
//   }, [isTransitioning, banners.length]);

//   const prevSlide = useCallback(() => {
//     if (isTransitioning || banners.length === 0) return;
//     setIsTransitioning(true);
//     setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
//     setTimeout(() => setIsTransitioning(false), 600);
//   }, [isTransitioning, banners.length]);

//   const goToSlide = (index) => {
//     if (isTransitioning || index === currentSlide || banners.length === 0) return;
//     setIsTransitioning(true);
//     setCurrentSlide(index);
//     setTimeout(() => setIsTransitioning(false), 600);
//   };

//   const handleBannerClick = async (bannerId) => {
//     try {
//       await trackBannerClick(bannerId);
//     } catch (error) {
//       console.error('Error tracking banner click:', error);
//     }
//   };

//   const handleTouchStart = (e) => {
//     setTouchStart(e.touches[0].clientX);
//   };

//   const handleTouchEnd = (e) => {
//     const touchEnd = e.changedTouches[0].clientX;
//     const diff = touchStart - touchEnd;
//     if (Math.abs(diff) > 40) {
//       if (diff > 0) {
//         nextSlide();
//       } else {
//         prevSlide();
//       }
//     }
//   };

//   // Auto-play logic
//   useEffect(() => {
//     if (isAutoPlaying && banners.length > 1) {
//       autoPlayRef.current = setInterval(() => {
//         nextSlide();
//       }, 5000);
//     } else if (autoPlayRef.current) {
//       clearInterval(autoPlayRef.current);
//     }
//     return () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     };
//   }, [isAutoPlaying, nextSlide, banners.length]);

//   const handleMouseEnter = () => setIsAutoPlaying(false);
//   const handleMouseLeave = () => setIsAutoPlaying(true);

//   // ✅ Show loading state with animation
//   if (isLoading) {
//     return (
//       <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[520px] xl:h-[530px] bg-gray-200 animate-pulse flex items-center justify-center">
//         <div className="flex flex-col items-center gap-2">
//           <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
//           <span className="text-gray-500 text-sm">Loading banners...</span>
//         </div>
//       </div>
//     );
//   }

//   if (banners.length === 0) {
//     return null;
//   }

//   return (
//     <div 
//       className="relative w-full overflow-hidden"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onTouchStart={handleTouchStart}
//       onTouchEnd={handleTouchEnd}
//     >
//       {isCacheUsed && (
//         <div className="absolute top-2 right-2 z-30  text-white text-[8px] px-2 py-0.5 rounded-full opacity-70">
         
//         </div>
//       )}
      
//       <div className="relative min-h-[200px] sm:min-h-[400px] md:min-h-[480px] lg:h-[530px]">
//         {banners.map((slide, index) => {
//           const IconComponent = (iconName) => {
//             const Icon = ICON_MAP[iconName];
//             return Icon ? <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-blue-600 group-hover:scale-110 transition-transform" /> : null;
//           };

//           // Get bgImage URL (handle both string and object)
//           const bgImageUrl = typeof slide.bgImage === 'string' 
//             ? slide.bgImage 
//             : slide.bgImage?.url || '';

//           // Get product image
//           const productImageUrl = typeof slide.productImage === 'string' 
//             ? slide.productImage 
//             : slide.productImage?.url || '';

//           // ✅ Optimize images
//           const optimizedBgImage = getOptimizedImageUrl(bgImageUrl, 1920);
//           const optimizedProductImage = getOptimizedImageUrl(productImageUrl, 400);

//           return (
//             <div
//               key={slide.id || index}
//               className={`absolute inset-0 transition-opacity duration-600 ${
//                 currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
//               }`}
//               style={{
//                 transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
//               }}
//             >
//               {/* Background Image */}
//               <div 
//                 className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//                 style={{ 
//                   backgroundImage: `url(${optimizedBgImage})`,
//                   backgroundPosition: 'center',
//                   transform: `scale(${currentSlide === index ? 1 : 1.05})`,
//                   transition: 'transform 8s ease-out',
//                 }}
//               />
              
//               {/* Gradient Overlay - Same for all devices */}
//               <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent" />
              
//               {/* Decorative Elements - Responsive */}
//               <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px] bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//               <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[400px] xl:h-[400px] bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
//               {/* Content Container - Optimized padding for all devices */}
//               <div className="relative h-full flex items-center py-2 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
//                 <div className="w-full mx-auto px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 2xl:px-10">
//                   <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10">
//                     {/* Left Content */}
//                     <div className="flex-1 min-w-0 max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
//                       {/* Badge */}
//                       <div className={`mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 xl:mb-4 inline-block transition-all duration-700 delay-100 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       }`}>
//                         <span className="px-2 sm:px-2.5 md:px-3 lg:px-4 xl:px-5 py-0.5 sm:py-0.5 md:py-1 lg:py-1.5 xl:py-2 text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 shadow-sm">
//                           {slide.badge}
//                         </span>
//                       </div>
                      
//                       {/* Main Title */}
//                       <h1 className={`text-base sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-serif text-gray-900 mb-0.5 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 tracking-tight leading-[1.1] transition-all duration-700 delay-200 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       } line-clamp-2 sm:line-clamp-none`}>
//                         {slide.title}
//                       </h1>
                      
//                       {/* Subtitle */}
//                       <h2 className={`text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-0.5 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent transition-all duration-700 delay-300 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       }`}>
//                         {slide.subtitle}
//                       </h2>
                      
//                       {/* Description */}
//                       <p className={`text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl text-gray-600 mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl leading-relaxed transition-all duration-700 delay-500 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       } line-clamp-2 sm:line-clamp-none`}>
//                         {slide.description}
//                       </p>
                      
//                       {/* Features */}
//                       {slide.features && slide.features.length > 0 && (
//                         <div className={`flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5 transition-all duration-700 delay-600 ${
//                           currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                         }`}>
//                           {slide.features.map((feature, idx) => (
//                             <div 
//                               key={idx} 
//                               className="group flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 xl:gap-2.5 px-1.5 sm:px-2 md:px-2.5 lg:px-3 xl:px-4 py-0.5 sm:py-0.5 md:py-1 lg:py-1.5 xl:py-2 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300"
//                             >
//                               {IconComponent(feature.icon)}
//                               <span className="text-gray-700 text-[8px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base font-medium">{feature.text}</span>
//                             </div>
//                           ))}
//                         </div>
//                       )}
                      
//                       {/* Buttons */}
//                       <div className={`flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 xl:gap-4 transition-all duration-700 delay-700 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       }`}>
//                         {slide.buttons && slide.buttons.map((button, idx) => (
//                           <Link
//                             key={idx}
//                             href={button.link}
//                             onClick={() => handleBannerClick(slide.id)}
//                             className={`group relative overflow-hidden flex-1 sm:flex-none px-2 sm:px-3 md:px-5 lg:px-6 xl:px-8 2xl:px-10 py-1 sm:py-1.5 md:py-2 lg:py-2.5 xl:py-3 2xl:py-4 ${
//                               button.isPrimary 
//                                 ? 'bg-gray-900 text-white hover:shadow-2xl' 
//                                 : 'bg-white/80 backdrop-blur-md border border-gray-300 text-gray-700 hover:bg-white hover:shadow-lg'
//                             } font-semibold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg`}
//                           >
//                             <span className="relative z-10 flex items-center justify-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 xl:gap-2.5">
//                               {button.text}
//                               {button.isPrimary && (
//                                 <ArrowRight className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 group-hover:translate-x-0.5 transition-transform" />
//                               )}
//                             </span>
//                             {button.isPrimary && (
//                               <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
//                             )}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Product Image Container - Right Side */}
//                     {optimizedProductImage && (
//                       <div className="relative flex-shrink-0 ml-0.5 sm:ml-1 md:ml-2 lg:ml-3 xl:ml-4 2xl:ml-6">
//                         {/* Product Image */}
//                         <div className="relative">
//                           <img
//                             src={optimizedProductImage}
//                             alt={slide.title}
//                             className="w-20 sm:w-24 md:w-36 lg:w-52 xl:w-64 2xl:w-80 h-auto object-contain drop-shadow-2xl"
//                             style={{ 
//                               filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.12))',
//                               maxHeight: '80px sm:120px md:200px lg:900px'
//                             }}
//                             loading="lazy"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.style.display = 'none';
//                             }}
//                           />
//                           <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl -z-10 scale-150" />
//                         </div>

//                         {/* Discount Badge */}
//                         {slide.discount && (
//                           <div className={`absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:-top-3 md:-right-3 lg:-top-4 lg:-right-4 xl:-top-5 xl:-right-5 2xl:-top-6 2xl:-right-6 transition-all duration-700 delay-400 ${
//                             currentSlide === index && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
//                           }`}>
//                             <div className="relative">
//                               <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl border-2 border-white/20">
//                                 <div className="text-center">
//                                   <div className="text-white font-black text-[7px] sm:text-[9px] md:text-xs lg:text-lg xl:text-xl 2xl:text-2xl leading-tight">{slide.discount}</div>
//                                   <div className="text-white/90 text-[4px] sm:text-[5px] md:text-[7px] lg:text-[9px] xl:text-[11px] 2xl:text-xs font-medium">OFF</div>
//                                 </div>
//                               </div>
//                               {/* Glow effect */}
//                               <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-orange-500 blur-md opacity-40 -z-10" />
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Navigation Buttons - Perfectly positioned */}
//       {banners.length > 1 && (
//         <>
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 sm:left-1 md:left-2 lg:left-3 xl:left-4 2xl:left-6 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-11 lg:h-11 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-full bg-white/90 backdrop-blur-md border border-gray-300 text-gray-800 hover:bg-white hover:scale-110 transition-all duration-200 z-20 flex items-center justify-center shadow-lg group"
//             aria-label="Previous slide"
//           >
//             <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 group-hover:-translate-x-0.5 transition-transform" />
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute right-0 sm:right-1 md:right-2 lg:right-3 xl:right-4 2xl:right-6 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-11 lg:h-11 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-full bg-white/90 backdrop-blur-md border border-gray-300 text-gray-800 hover:bg-white hover:scale-110 transition-all duration-200 z-20 flex items-center justify-center shadow-lg group"
//             aria-label="Next slide"
//           >
//             <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 group-hover:translate-x-0.5 transition-transform" />
//           </button>
//         </>
//       )}

//       {/* Dots Indicator */}
//       <div className="absolute bottom-1 sm:bottom-2 md:bottom-4 lg:bottom-6 xl:bottom-8 2xl:bottom-10 left-1/2 -translate-x-1/2 flex gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 xl:gap-2.5 2xl:gap-3 z-20">
//         {banners.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`transition-all duration-300 rounded-full ${
//               currentSlide === index
//                 ? 'w-3 sm:w-4 md:w-6 lg:w-8 xl:w-10 2xl:w-12 h-0.5 sm:h-0.5 md:h-0.5 lg:h-1 xl:h-1 2xl:h-1.5 bg-gray-800 shadow-lg'
//                 : 'w-2 sm:w-3 md:w-4 lg:w-5 xl:w-6 2xl:w-7 h-0.5 sm:h-0.5 md:h-0.5 lg:h-1 xl:h-1 2xl:h-1.5 bg-gray-400 hover:bg-gray-600'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Auto-play progress bar */}
//       {isAutoPlaying && banners.length > 1 && (
//         <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 z-20">
//           <div 
//             className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
//             style={{
//               width: '100%',
//               animation: 'progress 5s linear infinite',
//             }}
//           />
//         </div>
//       )}

//       {/* Cache indicator - subtle */}
//       {isCacheUsed && banners.length > 0 && (
//         <div className="absolute bottom-1 left-2 z-30">
//           <span className="text-[7px] text-gray-400 bg-white/70 px-1.5 py-0.5 rounded-full">
//             ⚡ Cached
//           </span>
//         </div>
//       )}

//       <style jsx global>{`
//         @keyframes progress {
//           from {
//             width: 100%;
//           }
//           to {
//             width: 0%;
//           }
//         }
        
//         .duration-600 {
//           transition-duration: 600ms;
//         }
        
//         /* Line clamp utilities */
//         .line-clamp-1 {
//           display: -webkit-box;
//           -webkit-line-clamp: 1;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
        
//         .line-clamp-none {
//           display: block;
//           -webkit-line-clamp: unset;
//           -webkit-box-orient: unset;
//           overflow: visible;
//         }
//       `}</style>
//     </div>
//   );
// }
// components/home/StaticHeroBanner.js
'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, ArrowRight, Sparkles, Flower2, ShoppingBag, Percent } from 'lucide-react';

export default function StaticHeroBanner() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Static banner data - you can customize this
  const bannerData = {
    badge: '✨ New Collection 2026',
    title: 'Discover Your Beauty',
    subtitle: 'Premium Skincare & Makeup',
    description: 'Experience luxury beauty with our curated collection of premium products.',
    discount: '40% OFF',
    ctaText: 'Shop Now',
    ctaLink: '/products',
    secondaryText: 'Explore Collection',
    secondaryLink: '/collections',
    videoUrl: '/hero-banner.mp4',
    posterImage: '/images/video-poster.jpg',
    bgImage: '/images/beauty-bg.jpg',
    features: [
      { icon: '✨', text: '100% Authentic' },
      { icon: '🚚', text: 'Free Shipping' },
      { icon: '💎', text: 'Premium Quality' }
    ]
  };

  // Pattern SVG as a separate constant to avoid JSX parsing issues
  const patternStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    opacity: '0.2'
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Container - Reduced height */}
      <div className="relative h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] xl:h-[460px] flex flex-col md:flex-row">
        
        {/* LEFT SIDE - Professional Background */}
        <div className="relative w-full md:w-[40%] lg:w-[42%] h-full flex items-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 overflow-hidden">
          {/* Background Image - Better positioning */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${bannerData.bgImage})`,
              backgroundPosition: 'center 30%',
              transform: 'scale(1.08)',
            }}
          />
          
          {/* Professional Gradient Overlay - Clean & Elegant */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/85 via-rose-800/75 to-purple-900/65" />
          
          {/* Secondary overlay for depth - Soft vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-pink-500/15" />
          
          {/* Professional pattern overlay - Using style prop instead */}
          <div 
            className="absolute inset-0 bg-repeat opacity-20"
            style={patternStyle}
          />
          
          {/* Professional lighting effects - Cleaner */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-500/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl" />
          
          {/* Professional decorative elements */}
          <div className="absolute top-5 left-5 opacity-20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="absolute bottom-5 right-5 opacity-15">
            <Flower2 className="w-8 h-8 text-white" />
          </div>
          
          {/* Professional accent lines */}
          <div className="absolute top-0 left-0 w-1 h-12 bg-gradient-to-b from-pink-400 to-transparent opacity-30" />
          <div className="absolute bottom-0 left-0 w-1 h-12 bg-gradient-to-t from-pink-400 to-transparent opacity-30" />
          
          {/* Professional shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-xl">
            {/* Badge - More professional */}
            <div className="mb-1.5 sm:mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-0.5 sm:py-1 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-[7px] sm:text-[10px] font-medium text-white shadow-sm hover:bg-white/25 transition-all duration-300">
                <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-pink-300 animate-pulse" />
                {bannerData.badge}
              </span>
            </div>

            {/* Title - Professional styling */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-0.5 sm:mb-1 leading-tight drop-shadow-lg">
              <span className="bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
                {bannerData.title}
              </span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 mb-0.5 sm:mb-1 font-light drop-shadow-md tracking-wide">
              {bannerData.subtitle}
            </h2>

            {/* Description */}
            <p className="text-[10px] sm:text-xs md:text-sm text-white/85 mb-2 sm:mb-2.5 max-w-lg leading-relaxed drop-shadow line-clamp-1 sm:line-clamp-2 font-light">
              {bannerData.description}
            </p>

            {/* Features - Professional styling */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-2.5">
              {bannerData.features.map((feature, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 text-[8px] sm:text-[10px] text-white/90 hover:bg-white/20 transition-all duration-300"
                >
                  <span className="text-[8px] sm:text-xs">{feature.icon}</span>
                  <span className="hidden sm:inline">{feature.text}</span>
                </span>
              ))}
            </div>

            {/* Buttons - Professional */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <Link
                href={bannerData.ctaLink}
                className="group inline-flex items-center gap-1.5 px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-pink-500/30 hover:scale-105 transition-all duration-300 text-[8px] sm:text-xs md:text-sm relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ShoppingBag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 relative z-10" />
                <span className="hidden xs:inline relative z-10">{bannerData.ctaText}</span>
                <span className="xs:hidden relative z-10">Shop</span>
                <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
              
              <Link
                href={bannerData.secondaryLink}
                className="group inline-flex items-center gap-1.5 px-4 sm:px-6 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 hover:border-white/40 hover:shadow-md transition-all duration-300 text-[8px] sm:text-xs md:text-sm"
              >
                {bannerData.secondaryText}
              </Link>
            </div>

            {/* Discount Badge - Professional */}
            <div className="mt-2 sm:mt-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:px-4 sm:py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full text-[8px] sm:text-xs shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Percent className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                {bannerData.discount}
                <span className="text-[6px] sm:text-[9px] opacity-80 font-normal hidden sm:inline">Limited Time</span>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Video */}
        <div className="relative w-full md:w-[60%] lg:w-[58%] h-full bg-gray-900 overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={bannerData.posterImage}
          >
            <source src={bannerData.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20" />
          <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-pink-900/60 to-transparent" />

          {/* Video Controls */}
          <button
            onClick={togglePlay}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-white/90 backdrop-blur-md hover:bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group z-10"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-800 group-hover:text-pink-500" />
            ) : (
              <Play className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-800 group-hover:text-pink-500 ml-0.5" />
            )}
          </button>

          {/* Video progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
            <div className="h-full w-full bg-gradient-to-r from-pink-400 to-rose-500 animate-[progress_10s_linear_infinite]" />
          </div>

          {/* Video mute indicator */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white/60 text-[8px] sm:text-[10px] flex items-center gap-0.5 bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
            <span className="text-[8px] sm:text-xs">🔊</span>
            <span className="hidden sm:inline text-[8px]">Auto</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @media (max-width: 400px) {
          .xs\\:inline { display: inline; }
          .xs\\:hidden { display: none; }
        }
      `}</style>
    </div>
  );
}