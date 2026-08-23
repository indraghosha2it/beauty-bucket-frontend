
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ShoppingBag,
  Loader2,
  ShoppingCart,
  Zap,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Flame,
  Star,
  Sparkles,
  Package,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Tag,
  Hash,
  Heart,
  Truck
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../CartSidebar';

// Font constants matching Navbar and Categories
const FONT_FAMILY = " serif";

// Helper functions
const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

const truncateText = (text, limit = 25) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const formatPrice = (price) => {
  return price?.toFixed(2) || '0.00';
};

const getUnitLabel = (unit) => {
  const units = {
    'pcs': 'pcs',
    'ton': 'ton',
    'other': 'unit'
  };
  return units[unit] || unit;
};

// Product Card Component
// const FeaturedProductCard = ({ 
//   product, 
//   isInCart: propIsInCart, 
//   onCartStatusChange, 
//   onViewInCart 
// }) => {
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [imageErrors, setImageErrors] = useState({});
//   const [isCartHovered, setIsCartHovered] = useState(false);
  
//   // Safe data extraction
//   const productId = product?._id || product?.id || 'unknown';
//   const productName = product?.productName || product?.name || 'Product';
//   const regularPrice = product?.regularPrice || product?.price || 0;
//   const discountPrice = product?.discountPrice || 0;
//   const stockQuantity = product?.stockQuantity || 0;
//   const unit = product?.unit || 'pcs';
  
//   // Safe category extraction - handle object case
//   const category = product?.category 
//     ? (typeof product.category === 'string' 
//         ? product.category 
//         : product.category?.name || product.category?.title || 'General')
//     : product?.categoryName || 'General';
  
//   // Safe image extraction
//   let productImages = [];
//   if (product?.images && Array.isArray(product.images)) {
//     productImages = product.images.map(img => {
//       if (typeof img === 'string') return img;
//       if (img?.url) return img.url;
//       return null;
//     }).filter(Boolean);
//   }
//   if (productImages.length === 0 && product?.image) {
//     productImages = [typeof product.image === 'string' ? product.image : product.image?.url || ''].filter(Boolean);
//   }
//   if (productImages.length === 0) {
//     productImages = ['/placeholder-product.jpg'];
//   }
  
//   // Safe tags extraction
//   let tagNames = [];
//   if (product?.tags && Array.isArray(product.tags)) {
//     tagNames = product.tags.map(tag => {
//       if (typeof tag === 'string') return tag;
//       if (tag?.name) return tag.name;
//       if (tag && typeof tag === 'object') {
//         if (tag.name) return tag.name;
//       }
//       return null;
//     }).filter(Boolean);
//   }

//   // Safe brand extraction
// const brand = product?.brand 
//   ? (typeof product.brand === 'string' 
//       ? product.brand 
//       : product.brand?.name || product.brand?.title || 'General')
//   : product?.brandName || 'General';
  
//   const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
//   const hasMultipleImages = productImages.length > 1;
//   const currentPrice = discountPrice && discountPrice < regularPrice ? discountPrice : regularPrice;
//   const originalPrice = regularPrice;
//   const primaryTag = tagNames[0] || null;
  
//   const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = stockQuantity <= 0;
  
//   // Get rating from backend or generate random
//   const rating = product?.rating || (3.5 + Math.random() * 1.5).toFixed(1);
//   const fullStars = Math.floor(parseFloat(rating));
//   const hasHalfStar = parseFloat(rating) - fullStars >= 0.5;

//   // Image navigation functions
//   const nextImage = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (hasMultipleImages) {
//       setActiveIndex((prev) => (prev + 1) % productImages.length);
//     }
//   };

//   const prevImage = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (hasMultipleImages) {
//       setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
//     }
//   };

//   const goToImage = (e, index) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setActiveIndex(index);
//   };

//   const handleImageError = (index) => {
//     setImageErrors(prev => ({
//       ...prev,
//       [index]: true
//     }));
//   };

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     setIsInCart(propIsInCart || false);
//   }, [propIsInCart]);

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (isInCart) {
//       onViewInCart();
//       return;
//     }
    
//     if (stockQuantity <= 0) {
//       toast.error('Product is out of stock!');
//       return;
//     }
    
//     setCartStatusLoading(true);
//     const toastId = toast.loading('Adding to cart...');
    
//     try {
//       const token = localStorage.getItem('token');
//       let sessionId = localStorage.getItem('cartSessionId');
      
//       const headers = { 'Content-Type': 'application/json' };
      
//       if (!token && !sessionId) {
//         sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//         localStorage.setItem('cartSessionId', sessionId);
//       }
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify({ productId: productId, quantity: 1 })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         toast.success('Added to cart!', { id: toastId });
//         setIsInCart(true);
//         if (onCartStatusChange) {
//           onCartStatusChange(productId, true);
//         }
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error(data.error || 'Failed to add to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error. Please try again.', { id: toastId });
//     } finally {
//       setCartStatusLoading(false);
//     }
//   };

//   const handleLike = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsLiked(!isLiked);
//   };

//   // Render stars for rating
//   const renderStars = () => {
//     const stars = [];
//     const numFullStars = Math.floor(parseFloat(rating));
    
//     for (let i = 0; i < 5; i++) {
//       if (i < numFullStars) {
//         stars.push(<Star key={i} className="size-3 fill-current text-yellow-400" />);
//       } else if (i === numFullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative">
//             <Star className="size-3 text-yellow-400" />
//             <div className="absolute inset-0 overflow-hidden w-1/2">
//               <Star className="size-3 fill-current text-yellow-400" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} className="size-3 text-[#F7C7D3]" />);
//       }
//     }
//     return stars;
//   };

//   // Get the current image with error handling
//   const getCurrentImage = () => {
//     const img = productImages[activeIndex] || productImages[0];
//     if (imageErrors[activeIndex]) {
//       return '/placeholder-product.jpg';
//     }
//     return img;
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4 }}
//       className="group w-full"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Link href={`/product/${product?.slug || productId}`} className="block">
//         <article className="relative flex flex-col rounded-2xl border border-[#F7C7D3]/30 bg-white p-2 shadow-[0_2px_9px_rgba(238,66,117,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(238,66,117,0.14)]">
     

//           {/* Product Image Section */}
//           <div className="relative overflow-hidden rounded-xl bg-[#F7C7D3]/10">
//             <div className="relative w-full aspect-[1/1] overflow-hidden">
//               <Image
//                 src={getCurrentImage()}
//                 alt={productName}
//                 fill
//                 sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
//                 className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
//                 onError={() => handleImageError(activeIndex)}
//                 priority={activeIndex === 0}
//                 quality={85}
//               />
              
//               {/* Discount Badge with Zigzag Bottom - with shimmer effect on hover */}
//               {discountPercent > 0 && (
//                 <motion.div 
//                   className="absolute left-2 top-2 z-10"
//                   animate={isHovered ? {
//                     scale: [1, 1.05, 1],
//                     rotate: [0, -2, 2, 0]
//                   } : {}}
//                   transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
//                 >
//                   <div 
//                     className="relative flex h-12 w-10 items-start justify-center bg-[#EE4275] px-1 pt-2 text-center text-[9px] font-bold uppercase leading-[0.9] tracking-wide text-white overflow-hidden"
//                     style={{
//                       clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 91%, 70% 100%, 55% 91%, 40% 100%, 25% 91%, 0 100%)',
//                       fontFamily: FONT_FAMILY
//                     }}
//                   >
//                     {/* Shimmer effect */}
//                     {isHovered && (
//                       <motion.div 
//                         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
//                         initial={{ x: '-100%' }}
//                         animate={{ x: '200%' }}
//                         transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//                       />
//                     )}
//                     <span className="leading-tight block relative z-10">
//                       {discountPercent}%<br />OFF
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
              
//               {/* Tag Badge */}
//               {primaryTag && (
//                 <div className="absolute top-2 right-2 bg-black/80 text-white text-[9px] px-2 py-1 font-medium z-10 flex items-center gap-1 backdrop-blur-sm rounded">
//                   <Sparkles className="w-2.5 h-2.5" />
//                   <span style={{ fontFamily: FONT_FAMILY }}>{primaryTag}</span>
//                 </div>
//               )}
              
//               {/* Out of Stock Overlay */}
//               {isOutOfStock && (
//                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 rounded-xl">
//                   <span className="bg-black text-white text-xs font-medium px-3 py-1.5 rounded-full" style={{ fontFamily: FONT_FAMILY }}>
//                     Out of Stock
//                   </span>
//                 </div>
//               )}
              
//               {/* Low Stock Badge */}
//               {!isOutOfStock && isLowStock && (
//                 <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-[9px] font-medium px-2 py-1 rounded z-10 flex items-center gap-1">
//                   <AlertTriangle className="w-2.5 h-2.5" />
//                   <span style={{ fontFamily: FONT_FAMILY }}>Only {stockQuantity} left</span>
//                 </div>
//               )}

//               {/* Hover Icons - Right Side Center */}
//               {!isMobile && (
//                 <div className={`absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30 transition-all duration-300 ${
//                   isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
//                 }`}>
//                   <motion.div 
//                     className="w-8 h-8 bg-white shadow-md hover:bg-[#EE4275] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 border border-[#F7C7D3]/30 group/icon"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <Eye className="w-3.5 h-3.5 text-gray-700 group-hover/icon:text-white transition-colors" />
//                   </motion.div>
//                   <motion.div 
//                     onClick={handleAddToCart}
//                     className={`w-8 h-8 bg-white shadow-md hover:bg-[#EE4275] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 border border-[#F7C7D3]/30 group/icon ${
//                       cartStatusLoading ? 'opacity-50 pointer-events-none' : ''
//                     }`}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     animate={isCartHovered ? { rotate: [0, -15, 15, -10, 10, 0] } : {}}
//                     transition={{ duration: 0.5 }}
//                   >
//                     {cartStatusLoading ? (
//                       <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-700" />
//                     ) : isInCart ? (
//                       <ShoppingCart className="w-3.5 h-3.5 text-[#EE4275] group-hover/icon:text-white transition-colors" />
//                     ) : (
//                       <ShoppingCart className="w-3.5 h-3.5 text-gray-700 group-hover/icon:text-white transition-colors" />
//                     )}
//                   </motion.div>
//                 </div>
//               )}
              
//               {/* Mobile Icons - Bottom Center */}
//               {isMobile && (
//                 <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-30">
//                   <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-[#F7C7D3]/30">
//                     <Eye className="w-3.5 h-3.5 text-gray-700" />
//                   </div>
//                   <div 
//                     onClick={handleAddToCart}
//                     className={`w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border ${
//                       isOutOfStock ? 'border-gray-200 bg-gray-100' : 'border-[#F7C7D3]/30'
//                     }`}
//                   >
//                     {cartStatusLoading ? (
//                       <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-500" />
//                     ) : isInCart ? (
//                       <ShoppingCart className="w-3.5 h-3.5 text-[#EE4275]" />
//                     ) : (
//                       <ShoppingCart className="w-3.5 h-3.5 text-black" />
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Navigation - Left/Right Arrows + Dots at Bottom Center - No BG, Pink-Purple Gradient */}
//               {hasMultipleImages && (
//                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
//                   {/* Left Arrow - Pink-Purple Gradient */}
//                   <motion.button
//                     onClick={prevImage}
//                     className="p-0.5 rounded-full transition-colors"
//                     aria-label="Previous image"
//                     whileHover={{ scale: 1.2 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <ChevronLeft className="w-4 h-4 text-transparent bg-gradient-to-r from-[#EE4275] to-[#9B59B6] bg-clip-text" stroke="url(#pinkPurpleGradient)" />
//                   </motion.button>

//                   {/* Dots - Pink-Purple Gradient */}
//                   <div className="flex items-center gap-1.5">
//                     {productImages.map((_, index) => (
//                       <motion.button
//                         key={index}
//                         onClick={(e) => goToImage(e, index)}
//                         className={`transition-all duration-200 rounded-full ${
//                           activeIndex === index 
//                             ? 'w-2 h-2 bg-gradient-to-r from-[#EE4275] to-[#9B59B6]' 
//                             : 'w-1.5 h-1.5 bg-[#F7C7D3]/50 hover:bg-[#EE4275]/50'
//                         }`}
//                         whileHover={{ scale: 1.3 }}
//                         aria-label={`Go to image ${index + 1}`}
//                       />
//                     ))}
//                   </div>

//                   {/* Right Arrow - Pink-Purple Gradient */}
//                   <motion.button
//                     onClick={nextImage}
//                     className="p-0.5 rounded-full transition-colors"
//                     aria-label="Next image"
//                     whileHover={{ scale: 1.2 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <ChevronRight className="w-4 h-4 text-transparent bg-gradient-to-r from-[#EE4275] to-[#9B59B6] bg-clip-text" stroke="url(#pinkPurpleGradient)" />
//                   </motion.button>
//                 </div>
//               )}

//               {/* SVG Gradient Definition for Arrows */}
//               <svg width="0" height="0" style={{ position: 'absolute' }}>
//                 <defs>
//                   <linearGradient id="pinkPurpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor="#EE4275" />
//                     <stop offset="100%" stopColor="#9B59B6" />
//                   </linearGradient>
//                 </defs>
//               </svg>
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="flex flex-col px-1 pb-1 pt-2">
//             {/* Product Name - 1 line only */}
//             <h3 
//               className="text-[13px] font-semibold text-gray-800 truncate"
//               style={{ fontFamily: FONT_FAMILY }}
//               title={productName}
//             >
//               {truncateText(productName, 25)}
//             </h3>

//             {/* Rating Stars - from backend */}
//             <div className="mt-1 flex items-center gap-1">
//               <div className="flex items-center gap-0.5">
//                 {renderStars()}
//               </div>
//               <span className="text-[9px] text-gray-400" style={{ fontFamily: FONT_FAMILY }}>
//                 ({parseFloat(rating).toFixed(1)})
//               </span>
//             </div>

//             {/* brand and Stock Status */}
//           <div className="mt-1.5 flex items-center justify-between text-[10px]">
//   <span className="px-1.5 py-0.5 rounded-full text-[8px] font-medium bg-[#F7C7D3]/30 text-[#EE4275]" style={{ fontFamily: FONT_FAMILY }}>
//     {brand}
//   </span>
//   <span className={`font-medium ${stockQuantity > 0 ? 'text-[#EE4275]' : 'text-red-500'}`} style={{ fontFamily: FONT_FAMILY }}>
//     {stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
//   </span>
// </div>

//             {/* Price and Cart */}
//           <div className="mt-auto flex items-center justify-between pt-2">
//   <div className="flex items-center gap-1.5 flex-wrap">
//     <span className="text-sm font-bold text-gray-800" style={{ fontFamily: FONT_FAMILY }}>
//       ৳{formatPrice(currentPrice)}
//     </span>
//     {discountPercent > 0 && (
//       <>
//         <span className="text-[9px] text-gray-400 line-through" style={{ fontFamily: FONT_FAMILY }}>
//           ৳{formatPrice(originalPrice)}
//         </span>
//         <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-[#EE4275]/10 text-[#EE4275]" style={{ fontFamily: FONT_FAMILY }}>
//           -{discountPercent}%
//         </span>
//       </>
//     )}
//   </div>
//   <motion.button
//     type="button"
//     onClick={handleAddToCart}
//     disabled={isOutOfStock}
//     onMouseEnter={() => setIsCartHovered(true)}
//     onMouseLeave={() => setIsCartHovered(false)}
//     aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
//     className={`flex size-8 items-center justify-center rounded-full border transition ${
//       isInCart 
//         ? 'border-[#EE4275] bg-[#EE4275] text-white' 
//         : isOutOfStock
//         ? 'border-[#F7C7D3]/30 text-[#b0c0bf] cursor-not-allowed'
//         : 'border-[#F7C7D3]/50 text-[#EE4275] hover:bg-[#F7C7D3]/20'
//     }`}
//     whileHover={!isOutOfStock ? { scale: 1.15, rotate: [0, -10, 10, -5, 5, 0] } : {}}
//     whileTap={!isOutOfStock ? { scale: 0.9 } : {}}
//     animate={isCartHovered && !isOutOfStock ? { 
//       rotate: [0, -15, 15, -10, 10, -5, 5, 0],
//       transition: { duration: 0.6, repeat: 1 }
//     } : {}}
//     transition={{ duration: 0.3 }}
//   >
//     {cartStatusLoading ? (
//       <Loader2 className="size-3.5 animate-spin" />
//     ) : (
//       <ShoppingCart className="size-3.5" />
//     )}
//   </motion.button>
// </div>
//           </div>
//         </article>
//       </Link>
//     </motion.div>
//   );
// };

// Product Card Component
const FeaturedProductCard = ({
  product,
  isInCart: propIsInCart,
  onCartStatusChange,
  onViewInCart
}) => {
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [isCartHovered, setIsCartHovered] = useState(false);

  // =========================================================
  // SAFE PRODUCT DATA
  // =========================================================

  const productId =
    product?._id ||
    product?.id ||
    'unknown';

  const productName =
    product?.productName ||
    product?.name ||
    'Product';

  const regularPrice =
    Number(
      product?.regularPrice ||
      product?.price ||
      0
    );

  const discountPrice =
    Number(
      product?.discountPrice || 0
    );

  const stockQuantity =
    Number(
      product?.stockQuantity || 0
    );

  // =========================================================
  // CATEGORY
  // =========================================================

  const category = product?.category
    ? typeof product.category === 'string'
      ? product.category
      : product.category?.name ||
        product.category?.title ||
        'General'
    : product?.categoryName ||
      'General';

  // =========================================================
  // BRAND
  // =========================================================

  const brand = product?.brand
    ? typeof product.brand === 'string'
      ? product.brand
      : product.brand?.name ||
        product.brand?.title ||
        'General'
    : product?.brandName ||
      'General';

  // =========================================================
  // IMAGES
  // =========================================================

  let productImages = [];

  if (
    product?.images &&
    Array.isArray(product.images)
  ) {
    productImages = product.images
      .map((img) => {
        if (typeof img === 'string') {
          return img;
        }

        if (img?.url) {
          return img.url;
        }

        return null;
      })
      .filter(Boolean);
  }

  if (
    productImages.length === 0 &&
    product?.image
  ) {
    productImages = [
      typeof product.image === 'string'
        ? product.image
        : product.image?.url || ''
    ].filter(Boolean);
  }

  if (
    productImages.length === 0
  ) {
    productImages = [
      '/placeholder-product.jpg'
    ];
  }

  // =========================================================
  // TAGS
  // =========================================================

  let tagNames = [];

  if (
    product?.tags &&
    Array.isArray(product.tags)
  ) {
    tagNames = product.tags
      .map((tag) => {
        if (typeof tag === 'string') {
          return tag;
        }

        if (tag?.name) {
          return tag.name;
        }

        return null;
      })
      .filter(Boolean);
  }

  const primaryTag =
    tagNames[0] || null;

  // =========================================================
  // PRICE
  // =========================================================

  const discountPercent =
    calculateDiscountPercentage(
      regularPrice,
      discountPrice
    );

  const currentPrice =
    discountPrice > 0 &&
    discountPrice < regularPrice
      ? discountPrice
      : regularPrice;

  const originalPrice =
    regularPrice;

  // =========================================================
  // STOCK
  // =========================================================

  const isLowStock =
    product?.stockAlertQuantity > 0 &&
    stockQuantity <=
      product.stockAlertQuantity;

  const isOutOfStock =
    stockQuantity <= 0;

  // =========================================================
  // RATING
  // =========================================================

  const rating = product?.rating
    ? Number(product.rating)
    : 4.7;

  const reviewCount =
    product?.reviewStats?.totalReviews ||
    product?.reviews?.length ||
    0;

  const fullStars =
    Math.floor(rating);

  const hasHalfStar =
    rating - fullStars >= 0.5;

  // =========================================================
  // MULTIPLE IMAGES
  // =========================================================

  const hasMultipleImages =
    productImages.length > 1;

  // =========================================================
  // MOBILE DETECTION
  // =========================================================

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768
      );
    };

    checkMobile();

    window.addEventListener(
      'resize',
      checkMobile
    );

    return () => {
      window.removeEventListener(
        'resize',
        checkMobile
      );
    };
  }, []);

  // =========================================================
  // CART PROP SYNC
  // =========================================================

  useEffect(() => {
    setIsInCart(
      propIsInCart || false
    );
  }, [propIsInCart]);

  // =========================================================
  // IMAGE NAVIGATION
  // =========================================================

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasMultipleImages) {
      setActiveIndex(
        (prev) =>
          (prev + 1) %
          productImages.length
      );
    }
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasMultipleImages) {
      setActiveIndex(
        (prev) =>
          (prev -
            1 +
            productImages.length) %
          productImages.length
      );
    }
  };

  const goToImage = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    setActiveIndex(index);
  };

  const handleImageError = (index) => {
    setImageErrors((prev) => ({
      ...prev,
      [index]: true
    }));
  };

  const getCurrentImage = () => {
    const image =
      productImages[activeIndex] ||
      productImages[0];

    if (
      imageErrors[activeIndex]
    ) {
      return '/placeholder-product.jpg';
    }

    return image;
  };

  // =========================================================
  // ADD TO CART
  // =========================================================

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) {
      if (onViewInCart) {
        onViewInCart();
      }

      return;
    }

    if (isOutOfStock) {
      toast.error(
        'Product is out of stock!'
      );

      return;
    }

    setCartStatusLoading(true);

    const toastId =
      toast.loading(
        'Adding to cart...'
      );

    try {
      const token =
        localStorage.getItem(
          'token'
        );

      let sessionId =
        localStorage.getItem(
          'cartSessionId'
        );

      const headers = {
        'Content-Type':
          'application/json'
      };

      // Guest session
      if (
        !token &&
        !sessionId
      ) {
        sessionId =
          `guest_${Date.now()}_${Math.random()
            .toString(36)
            .substring(7)}`;

        localStorage.setItem(
          'cartSessionId',
          sessionId
        );
      }

      // Authentication
      if (token) {
        headers.Authorization =
          `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] =
          sessionId;
      }

      // API request
      const response =
        await fetch(
          'http://localhost:5000/api/cart',
          {
            method: 'POST',
            headers,
            body: JSON.stringify({
              productId:
                productId,
              quantity: 1
            })
          }
        );

      const data =
        await response.json();

      if (data.success) {
        if (
          data.sessionId &&
          !token
        ) {
          localStorage.setItem(
            'cartSessionId',
            data.sessionId
          );
        }

        toast.success(
          'Added to cart!',
          {
            id: toastId
          }
        );

        setIsInCart(true);

        if (
          onCartStatusChange
        ) {
          onCartStatusChange(
            productId,
            true
          );
        }

        window.dispatchEvent(
          new Event(
            'cart-update'
          )
        );
      } else {
        toast.error(
          data.error ||
            'Failed to add to cart',
          {
            id: toastId
          }
        );
      }
    } catch (error) {
      console.error(
        'Add to cart error:',
        error
      );

      toast.error(
        'Network error. Please try again.',
        {
          id: toastId
        }
      );
    } finally {
      setCartStatusLoading(
        false
      );
    }
  };

  // =========================================================
  // WISHLIST
  // =========================================================

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLiked(
      (prev) => !prev
    );
  };

  // =========================================================
  // RATING STARS
  // =========================================================

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className="
              h-3
              w-3
              fill-current
              text-yellow-400
            "
          />
        );
      } else if (
        i === fullStars &&
        hasHalfStar
      ) {
        stars.push(
          <div
            key={i}
            className="
              relative
              h-3
              w-3
            "
          >
            <Star
              className="
                absolute
                h-3
                w-3
                text-gray-200
              "
            />

            <div
              className="
                absolute
                left-0
                top-0
                h-3
                w-1/2
                overflow-hidden
              "
            >
              <Star
                className="
                  h-3
                  w-3
                  fill-current
                  text-yellow-400
                "
              />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star
            key={i}
            className="
              h-3
              w-3
              text-[#F7C7D3]
            "
          />
        );
      }
    }

    return stars;
  };

  // =========================================================
  // TAG ICON
  // =========================================================

  const getTagIcon = () => {
    if (!primaryTag) {
      return null;
    }

    const name =
      primaryTag.toLowerCase();

    if (
      name.includes('best') ||
      name.includes('seller')
    ) {
      return (
        <Star className="
          h-2.5
          w-2.5
          fill-current
        " />
      );
    }

    if (
      name.includes('trend')
    ) {
      return (
        <Flame className="
          h-2.5
          w-2.5
        " />
      );
    }

    if (
      name.includes('new')
    ) {
      return (
        <Sparkles className="
          h-2.5
          w-2.5
        " />
      );
    }

    if (
      name.includes('sale') ||
      name.includes('offer')
    ) {
      return (
        <Zap className="
          h-2.5
          w-2.5
        " />
      );
    }

    return (
      <Tag className="
        h-2.5
        w-2.5
      " />
    );
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true
      }}
      transition={{
        duration: 0.4
      }}
      className="group w-full"
      onMouseEnter={() =>
        setIsHovered(true)
      }
      onMouseLeave={() =>
        setIsHovered(false)
      }
    >
      <Link
        href={`/product/${
          product?.slug ||
          productId
        }`}
        className="block h-full"
      >
        <article
          className="
            relative
            flex
            h-full
            flex-col
            overflow-hidden
            rounded-2xl
            border
            border-[#F7C7D3]/30
            bg-white
            p-2
            shadow-[0_2px_9px_rgba(238,66,117,0.06)]
            transition-all
            duration-300
            hover:-translate-y-1.5
            hover:border-[#F7C7D3]
            hover:shadow-[0_18px_40px_rgba(238,66,117,0.12)]
          "
        >

          {/* =====================================================
              PRODUCT IMAGE SECTION
          ====================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-xl
              bg-[#F7C7D3]/10
            "
          >

            <div
              className="
                relative
                aspect-square
                w-full
                overflow-hidden
              "
            >

              {/* PRODUCT IMAGE */}

              <Image
                src={getCurrentImage()}
                alt={productName}
                fill
                sizes="
                  (max-width: 640px) 50vw,
                  (max-width: 768px) 33vw,
                  (max-width: 1024px) 25vw,
                  20vw
                "
                className="
                  object-contain
                  p-4
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:scale-[1.06]
                "
                onError={() =>
                  handleImageError(
                    activeIndex
                  )
                }
                priority={
                  activeIndex === 0
                }
                quality={90}
              />

              {/* =================================================
                  DISCOUNT BADGE
              ================================================== */}

              {discountPercent > 0 && (
                <motion.div
                  className="
                    absolute
                    left-2
                    top-2
                    z-10
                  "
                  animate={
                    isHovered
                      ? {
                          scale: [
                            1,
                            1.05,
                            1
                          ],
                          rotate: [
                            0,
                            -2,
                            2,
                            0
                          ]
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    repeat:
                      isHovered
                        ? Infinity
                        : 0,
                    repeatDelay: 1
                  }}
                >
                  <div
                    className="
                      relative
                      flex
                      h-12
                      w-10
                      items-start
                      justify-center
                      overflow-hidden
                      bg-[#EE4275]
                      px-1
                      pt-2
                      text-center
                      text-[9px]
                      font-bold
                      uppercase
                      leading-[0.9]
                      tracking-wide
                      text-white
                    "
                    style={{
                      clipPath:
                        'polygon(0 0, 100% 0, 100% 100%, 85% 91%, 70% 100%, 55% 91%, 40% 100%, 25% 91%, 0 100%)',
                      fontFamily:
                        FONT_FAMILY
                    }}
                  >

                    {/* SHIMMER */}

                    {isHovered && (
                      <motion.div
                        className="
                          absolute
                          inset-0
                          -skew-x-12
                          bg-gradient-to-r
                          from-transparent
                          via-white/30
                          to-transparent
                        "
                        initial={{
                          x: '-100%'
                        }}
                        animate={{
                          x: '200%'
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      />
                    )}

                    <span
                      className="
                        relative
                        z-10
                        block
                        leading-tight
                      "
                    >
                      {discountPercent}%
                      <br />
                      OFF
                    </span>

                  </div>
                </motion.div>
              )}

              {/* =================================================
                  TAG BADGE
              ================================================== */}

              {primaryTag && (
                <div
                  className="
                    absolute
                    right-2
                    top-2
                    z-10
                    flex
                    items-center
                    gap-1
                    rounded
                    bg-black/80
                    px-2
                    py-1
                    text-[9px]
                    font-medium
                    text-white
                    backdrop-blur-sm
                  "
                >
                  <Sparkles
                    className="
                      h-2.5
                      w-2.5
                    "
                  />

                  <span
                    style={{
                      fontFamily:
                        FONT_FAMILY
                    }}
                  >
                    {primaryTag}
                  </span>
                </div>
              )}

              {/* =================================================
                  OUT OF STOCK
              ================================================== */}

              {isOutOfStock && (
                <div
                  className="
                    absolute
                    inset-0
                    z-20
                    flex
                    items-center
                    justify-center
                    rounded-xl
                    bg-black/60
                  "
                >
                  <span
                    className="
                      rounded-full
                      bg-black
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-white
                    "
                    style={{
                      fontFamily:
                        FONT_FAMILY
                    }}
                  >
                    Out of Stock
                  </span>
                </div>
              )}

              {/* =================================================
                  LOW STOCK
              ================================================== */}

              {!isOutOfStock &&
                isLowStock && (
                  <div
                    className="
                      absolute
                      bottom-2
                      left-2
                      z-10
                      flex
                      items-center
                      gap-1
                      rounded
                      bg-orange-500
                      px-2
                      py-1
                      text-[9px]
                      font-medium
                      text-white
                    "
                  >
                    <AlertTriangle
                      className="
                        h-2.5
                        w-2.5
                      "
                    />

                    <span
                      style={{
                        fontFamily:
                          FONT_FAMILY
                      }}
                    >
                      Only {stockQuantity} left
                    </span>
                  </div>
                )}

              {/* =================================================
                  DESKTOP HOVER ACTIONS
              ================================================== */}

              {!isMobile && (
                <div
                  className={`
                    absolute
                    right-2
                    top-1/2
                    z-30
                    flex
                    -translate-y-1/2
                    flex-col
                    gap-2
                    transition-all
                    duration-300
                    ${
                      isHovered
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-2 opacity-0'
                    }
                  `}
                >

                  {/* VIEW */}

                  <motion.button
                    type="button"
                    whileHover={{
                      scale: 1.1
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#F7C7D3]/30
                      bg-white
                      text-gray-700
                      shadow-md
                      transition-all
                      hover:bg-[#EE4275]
                      hover:text-white
                    "
                    aria-label="View product"
                  >
                    <Eye
                      className="
                        h-3.5
                        w-3.5
                      "
                    />
                  </motion.button>

                  {/* CART */}

                  <motion.button
                    type="button"
                    onClick={
                      handleAddToCart
                    }
                    disabled={
                      isOutOfStock ||
                      cartStatusLoading
                    }
                    whileHover={{
                      scale: 1.1
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    className={`
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#F7C7D3]/30
                      bg-white
                      shadow-md
                      transition-all
                      hover:bg-[#EE4275]
                      hover:text-white
                      ${
                        cartStatusLoading
                          ? 'pointer-events-none opacity-50'
                          : ''
                      }
                    `}
                    aria-label="Add to cart"
                  >
                    {cartStatusLoading ? (
                      <Loader2
                        className="
                          h-3.5
                          w-3.5
                          animate-spin
                        "
                      />
                    ) : (
                      <ShoppingCart
                        className="
                          h-3.5
                          w-3.5
                        "
                      />
                    )}
                  </motion.button>

                </div>
              )}

              {/* =================================================
                  MOBILE ACTIONS
              ================================================== */}

              {isMobile && (
                <div
                  className="
                    absolute
                    bottom-10
                    left-1/2
                    z-30
                    flex
                    -translate-x-1/2
                    gap-2
                  "
                >

                  {/* VIEW */}

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#F7C7D3]/30
                      bg-white/90
                      shadow-md
                      backdrop-blur-sm
                    "
                  >
                    <Eye
                      className="
                        h-3.5
                        w-3.5
                        text-gray-700
                      "
                    />
                  </div>

                  {/* CART */}

                  <div
                    onClick={
                      handleAddToCart
                    }
                    className={`
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      bg-white/90
                      shadow-md
                      backdrop-blur-sm
                      ${
                        isOutOfStock
                          ? 'border-gray-200 bg-gray-100'
                          : 'border-[#F7C7D3]/30'
                      }
                    `}
                  >
                    {cartStatusLoading ? (
                      <Loader2
                        className="
                          h-3.5
                          w-3.5
                          animate-spin
                          text-gray-500
                        "
                      />
                    ) : (
                      <ShoppingCart
                        className={`
                          h-3.5
                          w-3.5
                          ${
                            isInCart
                              ? 'text-[#EE4275]'
                              : 'text-black'
                          }
                        `}
                      />
                    )}
                  </div>

                </div>
              )}

              {/* =================================================
                  IMAGE NAVIGATION
              ================================================== */}

              {hasMultipleImages && (
                <div
                  className="
                    absolute
                    bottom-2
                    left-1/2
                    z-20
                    flex
                    -translate-x-1/2
                    items-center
                    gap-2
                  "
                >

                  {/* PREVIOUS */}

                  <motion.button
                    type="button"
                    onClick={
                      prevImage
                    }
                    className="
                      rounded-full
                      p-0.5
                    "
                    aria-label="Previous image"
                    whileHover={{
                      scale: 1.2
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                  >
                    <ChevronLeft
                      className="
                        h-4
                        w-4
                        text-[#EE4275]
                      "
                    />
                  </motion.button>

                  {/* DOTS */}

                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                    "
                  >
                    {productImages.map(
                      (_, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={(e) =>
                            goToImage(
                              e,
                              index
                            )
                          }
                          className={`
                            rounded-full
                            transition-all
                            duration-200
                            ${
                              activeIndex ===
                              index
                                ? 'h-2 w-2 bg-gradient-to-r from-[#EE4275] to-[#9B59B6]'
                                : 'h-1.5 w-1.5 bg-[#F7C7D3]/60 hover:bg-[#EE4275]/50'
                            }
                          `}
                          whileHover={{
                            scale: 1.3
                          }}
                          aria-label={`Go to image ${
                            index + 1
                          }`}
                        />
                      )
                    )}
                  </div>

                  {/* NEXT */}

                  <motion.button
                    type="button"
                    onClick={
                      nextImage
                    }
                    className="
                      rounded-full
                      p-0.5
                    "
                    aria-label="Next image"
                    whileHover={{
                      scale: 1.2
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                  >
                    <ChevronRight
                      className="
                        h-4
                        w-4
                        text-[#9B59B6]
                      "
                    />
                  </motion.button>

                </div>
              )}

            </div>
          </div>

          {/* =====================================================
              PRODUCT INFORMATION
          ====================================================== */}

          <div
            className="
              flex
              flex-1
              flex-col
              px-1.5
              pb-1
              pt-3
            "
          >

            {/* BRAND */}

          {/* BRAND + STOCK STATUS */}

<div
  className="
    mb-1
    flex
    items-center
    justify-between
    gap-2
  "
>
  {/* BRAND */}
  <span
    className="
      min-w-0
      truncate
      text-[8px]
      font-semibold
      uppercase
      tracking-[0.12em]
      text-[#EE4275]
    "
    style={{
      fontFamily: FONT_FAMILY
    }}
  >
    {brand}
  </span>

  {/* STOCK STATUS */}
  <div
    className="
      flex
      shrink-0
      items-center
      gap-1
    "
  >
    <span
      className={`
        h-1.5
        w-1.5
        rounded-full
        ${
          stockQuantity > 0
            ? 'bg-emerald-500'
            : 'bg-red-500'
        }
      `}
    />

    <span
      className={`
        text-[8px]
        font-medium
        ${
          stockQuantity > 0
            ? 'text-emerald-600'
            : 'text-red-500'
        }
      `}
      style={{
        fontFamily: FONT_FAMILY
      }}
    >
      {stockQuantity > 0
        ? 'In Stock'
        : 'Out of Stock'}
    </span>
  </div>
</div>

            {/* PRODUCT NAME */}

            <h3
              className="
                min-h-[34px]
                line-clamp-2
                text-[13px]
                font-semibold
                leading-[1.3]
                text-gray-800
                transition-colors
                group-hover:text-[#EE4275]
              "
              style={{
                fontFamily:
                  FONT_FAMILY
              }}
              title={productName}
            >
              {truncateText(
                productName,
                45
              )}
            </h3>

            {/* RATING */}

            <div
              className="
                mt-2
                flex
                items-center
                gap-1.5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-0.5
                "
              >
                {renderStars()}
              </div>

              <span
                className="
                  text-[9px]
                  font-medium
                  text-gray-500
                "
                style={{
                  fontFamily:
                    FONT_FAMILY
                }}
              >
                {rating.toFixed(1)}
              </span>

              {reviewCount > 0 && (
                <>
                  <span className="text-gray-300">
                    •
                  </span>

                  <span
                    className="
                      text-[9px]
                      text-gray-400
                    "
                    style={{
                      fontFamily:
                        FONT_FAMILY
                    }}
                  >
                    {reviewCount} reviews
                  </span>
                </>
              )}
            </div>


            {/* DIVIDER */}

            <div
              className="
                my-2.5
                h-px
                bg-gray-100
              "
            />

            {/* PRICE */}
{/* =====================================================
    PRICE + CART
====================================================== */}

<div
  className="
    mt-auto
    flex
    items-center
    justify-between
    gap-2
    pt-1
  "
>
  {/* PRICE */}
  <div
    className="
      flex
      min-w-0
      items-center
      gap-1.5
      whitespace-nowrap
    "
  >
    {/* CURRENT PRICE */}
    <span
      className="
        text-[15px]
        font-bold
        tracking-tight
        text-gray-900
      "
      style={{
        fontFamily: FONT_FAMILY
      }}
    >
      ৳{formatPrice(currentPrice)}
    </span>

    {/* ORIGINAL PRICE */}
    {discountPercent > 0 && (
      <span
        className="
          text-[8px]
          text-gray-400
          line-through
        "
        style={{
          fontFamily: FONT_FAMILY
        }}
      >
        ৳{formatPrice(originalPrice)}
      </span>
    )}

    {/* SAVE */}
    {discountPercent > 0 && (
      <span
        className="
          text-[8px]
          font-semibold
          text-[#EE4275]
        "
        style={{
          fontFamily: FONT_FAMILY
        }}
      >
        Save {discountPercent}%
      </span>
    )}
  </div>

  {/* CART BUTTON */}
  <motion.button
    type="button"
    onClick={handleAddToCart}
    disabled={isOutOfStock || cartStatusLoading}
    onMouseEnter={() =>
      setIsCartHovered(true)
    }
    onMouseLeave={() =>
      setIsCartHovered(false)
    }
    whileHover={
      !isOutOfStock
        ? { scale: 1.08 }
        : {}
    }
    whileTap={
      !isOutOfStock
        ? { scale: 0.92 }
        : {}
    }
    animate={
      isCartHovered && !isOutOfStock
        ? {
            rotate: [
              0,
              -10,
              10,
              -6,
              6,
              0
            ]
          }
        : {}
    }
    transition={{
      duration: 0.5
    }}
    aria-label={
      isInCart
        ? 'View cart'
        : 'Add to cart'
    }
    className={`
      flex
      h-8
      w-8
      shrink-0
      items-center
      justify-center
      rounded-full
      transition-all
      duration-200

      ${
        isInCart
          ? 'bg-[#EE4275] text-white shadow-[0_4px_12px_rgba(238,66,117,0.22)]'
          : isOutOfStock
          ? 'cursor-not-allowed bg-gray-100 text-gray-300'
          : 'border border-[#F7C7D3] bg-white text-[#EE4275] hover:border-[#EE4275] hover:bg-[#EE4275] hover:text-white hover:shadow-[0_4px_12px_rgba(238,66,117,0.18)]'
      }
    `}
  >
    {cartStatusLoading ? (
      <Loader2
        className="
          h-3.5
          w-3.5
          animate-spin
        "
      />
    ) : (
      <ShoppingCart
        className="
          h-3.5
          w-3.5
        "
      />
    )}
  </motion.button>
</div>

          </div>

        </article>
      </Link>
    </motion.div>
  );
};

// Main Featured Products Component
export default function FeaturedProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const [activeTag, setActiveTag] = useState('all');
  const [visibleCount, setVisibleCount] = useState(5);
  const [availableTags, setAvailableTags] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [allTags, setAllTags] = useState([]);
  
  const itemsPerLoad = 5;
  const itemsPerLoadMobile = 4;
  
  const [tagContainerRef, setTagContainerRef] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisibleCount(mobile ? 4 : 5);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkScrollButtons = () => {
    if (tagContainerRef) {
      const { scrollLeft, scrollWidth, clientWidth } = tagContainerRef;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const scrollLeft = () => {
    if (tagContainerRef) {
      const scrollAmount = tagContainerRef.clientWidth * 0.7;
      tagContainerRef.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tagContainerRef) {
      const scrollAmount = tagContainerRef.clientWidth * 0.7;
      tagContainerRef.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const fetchAllTags = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tags');
      const data = await response.json();
      
      if (data.success) {
        return data.data.filter(tag => tag.isActive !== false);
      }
      return [];
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productsResponse = await fetch('http://localhost:5000/api/products?limit=100&populateTags=true');
        const productsData = await productsResponse.json();
        
        if (productsData.success) {
          const products = productsData.data.filter(p => p.isActive !== false);
          setAllProducts(products);
          setFilteredProducts(products);
          
          const tags = await fetchAllTags();
          setAllTags(tags);
          
          const availableTagIds = new Set();
          products.forEach(product => {
            if (product.tags && Array.isArray(product.tags)) {
              product.tags.forEach(tag => {
                if (tag && typeof tag === 'object' && tag._id) {
                  availableTagIds.add(tag._id.toString());
                } else if (typeof tag === 'string') {
                  availableTagIds.add(tag);
                }
              });
            }
          });
          
          const availableTagsFromBackend = tags.filter(tag => 
            availableTagIds.has(tag._id.toString())
          );
          
          const allOption = {
            _id: 'all',
            name: 'All Products',
            isActive: true
          };
          
          setAvailableTags([allOption, ...availableTagsFromBackend]);
          
          await checkCartStatus(products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const checkCartStatus = async (productsList) => {
    if (!productsList || productsList.length === 0) return;
    
    const productIds = productsList.map(p => p._id || p.id).filter(Boolean);
    if (productIds.length === 0) return;
    
    const token = localStorage.getItem('token');
    let sessionId = localStorage.getItem('cartSessionId');
    
    const headers = {};
    
    if (!token && !sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('cartSessionId', sessionId);
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (sessionId) {
      headers['x-session-id'] = sessionId;
    } else {
      const emptyCartStatus = {};
      productIds.forEach(id => { emptyCartStatus[id] = false; });
      setProductsInCart(emptyCartStatus);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/cart/check-status', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds })
      });
      
      const data = await response.json();
      if (data.success) {
        setProductsInCart(data.data);
      } else {
        const emptyCartStatus = {};
        productIds.forEach(id => { emptyCartStatus[id] = false; });
        setProductsInCart(emptyCartStatus);
      }
    } catch (error) {
      console.error('Error checking cart status:', error);
      const emptyCartStatus = {};
      productIds.forEach(id => { emptyCartStatus[id] = false; });
      setProductsInCart(emptyCartStatus);
    }
  };

  const updateCartStatus = useCallback(async () => {
    if (allProducts.length === 0) return;
    
    const productIds = allProducts.map(p => p._id || p.id).filter(Boolean);
    if (productIds.length === 0) return;
    
    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('cartSessionId');
    
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (sessionId) {
      headers['x-session-id'] = sessionId;
    } else {
      const emptyCartStatus = {};
      productIds.forEach(id => { emptyCartStatus[id] = false; });
      setProductsInCart(emptyCartStatus);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/cart/check-status', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds })
      });
      
      const data = await response.json();
      if (data.success) {
        setProductsInCart(data.data);
      } else {
        const emptyCartStatus = {};
        productIds.forEach(id => { emptyCartStatus[id] = false; });
        setProductsInCart(emptyCartStatus);
      }
    } catch (error) {
      console.error('Error refreshing cart status:', error);
    }
  }, [allProducts]);

  useEffect(() => {
    const handleCartUpdate = () => {
      updateCartStatus();
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    window.addEventListener('auth-change', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-update', handleCartUpdate);
      window.removeEventListener('auth-change', handleCartUpdate);
    };
  }, [updateCartStatus]);

  useEffect(() => {
    if (activeTag === 'all') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(p => {
        const tags = p.tags || [];
        return tags.some(t => {
          if (typeof t === 'object' && t._id) {
            return t._id.toString() === activeTag;
          }
          if (typeof t === 'string') {
            return t === activeTag;
          }
          return false;
        });
      }));
    }
    setVisibleCount(isMobile ? 4 : 5);
  }, [activeTag, allProducts, isMobile]);

  const onCartStatusChange = useCallback((productId, isInCart) => {
    setProductsInCart(prev => ({
      ...prev,
      [productId]: isInCart
    }));
  }, []);

  const openCartSidebar = () => {
    setIsCartOpen(true);
  };

  const closeCartSidebar = () => {
    setIsCartOpen(false);
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;
  const hasLess = visibleCount > (isMobile ? 4 : 5);

  const showMore = () => {
    const increment = isMobile ? itemsPerLoadMobile : itemsPerLoad;
    setVisibleCount(prev => Math.min(prev + increment, filteredProducts.length));
  };

  const showLess = () => {
    setVisibleCount(isMobile ? 4 : 5);
  };

  const getTagIcon = (tagName) => {
    const name = tagName.toLowerCase();
    if (name.includes('best seller') || name.includes('bestseller')) return <Star className="w-3.5 h-3.5" />;
    if (name.includes('trending')) return <Flame className="w-3.5 h-3.5" />;
    if (name.includes('new')) return <Sparkles className="w-3.5 h-3.5" />;
    if (name.includes('limited') || name.includes('offer')) return <Clock className="w-3.5 h-3.5" />;
    if (name.includes('flash') || name.includes('sale')) return <Zap className="w-3.5 h-3.5" />;
    if (name.includes('clearance')) return <Tag className="w-3.5 h-3.5" />;
    return <Hash className="w-3.5 h-3.5" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-16 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#EE4275]" />
      </div>
    );
  }

  if (allProducts.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-gradient-to-b from-[#F7C7D3]/5 via-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EE4275]/10 rounded-full mb-3">
              <Flame className="w-3.5 h-3.5 text-[#EE4275]" />
              <span 
                className="text-xs font-medium text-[#EE4275] tracking-wider uppercase"
                style={{ fontFamily: FONT_FAMILY }}
              >
                Trending Now
              </span>
              <Flame className="w-3.5 h-3.5 text-[#EE4275]" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h2 
                  className="text-balance text-2xl md:text-3xl font-bold tracking-tight text-gray-900"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  Featured <span className="text-[#EE4275]">Products</span>
                </h2>
                <p 
                  className="text-gray-500 mt-1.5 text-sm"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  Discover our handpicked selection of trending gadgets and electronics, curated just for you.
                </p>
              </div>
              <button 
                type="button" 
                className="text-xs font-semibold text-[#EE4275] underline-offset-4 hover:underline hidden sm:block"
                style={{ fontFamily: FONT_FAMILY }}
                onClick={() => setActiveTag('all')}
              >
                View all
              </button>
            </div>
          </div>

          {/* Tag Filters */}
          {availableTags.length > 0 && (
            <div className="relative mb-6 md:mb-8">
              {canScrollLeft && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 md:p-2 border border-[#F7C7D3]/30 hover:bg-gray-50 transition-colors lg:flex hidden"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
                </button>
              )}

              <div
                ref={(el) => {
                  setTagContainerRef(el);
                  if (el) {
                    checkScrollButtons();
                    el.addEventListener('scroll', checkScrollButtons);
                  }
                }}
                className="flex gap-2 overflow-x-auto scrollbar-hide px-8 md:px-10 py-1 scroll-smooth lg:justify-center"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {availableTags.map((tag) => {
                  const isActive = activeTag === tag._id;
                  const tagName = tag.name || 'Unknown';
                  
                  return (
                    <button
                      key={tag._id}
                      onClick={() => setActiveTag(tag._id)}
                      className={`flex items-center gap-1 md:gap-2 px-3 md:px-5 py-1.5 md:py-2 rounded-full transition-all duration-300 text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                        isActive
                          ? 'bg-[#EE4275] text-white shadow-md'
                          : 'bg-white text-[#EE4275] hover:bg-[#F7C7D3]/20 border border-[#F7C7D3]/30'
                      }`}
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      <span className="flex items-center">
                        {tag._id === 'all' ? <Package className="w-3.5 h-3.5" /> : getTagIcon(tagName)}
                      </span>
                      <span>{tagName}</span>
                    </button>
                  );
                })}
              </div>

              {canScrollRight && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 md:p-2 border border-[#F7C7D3]/30 hover:bg-gray-50 transition-colors lg:flex hidden"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
                </button>
              )}
            </div>
          )}

          {/* Products Grid */}
          <div className="mb-2">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#F7C7D3]/30">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500" style={{ fontFamily: FONT_FAMILY }}>No products found with this tag</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                  <AnimatePresence mode="wait">
                    {visibleProducts.map((product) => (
                      <FeaturedProductCard
                        key={product._id || product.id}
                        product={product}
                        isInCart={productsInCart[product._id || product.id] || false}
                        onCartStatusChange={onCartStatusChange}
                        onViewInCart={openCartSidebar}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Show More / Show Less */}
                <div className="flex justify-center gap-3 mt-8">
                  {hasLess && (
                    <button
                      onClick={showLess}
                      className="flex items-center gap-2 px-5 py-2 border border-[#F7C7D3]/30 text-[#EE4275] rounded-full hover:bg-[#F7C7D3]/20 transition-colors text-xs md:text-sm font-medium"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />
                      Show Less
                    </button>
                  )}
                  
                  {hasMore && (
                    <button
                      onClick={showMore}
                      className="flex items-center gap-2 px-5 py-2 bg-[#EE4275] text-white rounded-full hover:bg-[#EE4275]/80 transition-colors text-xs md:text-sm font-medium"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      Show More
                      <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
    </>
  );
}