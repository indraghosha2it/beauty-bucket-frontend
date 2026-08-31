


// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ArrowRight, 
//   ShoppingBag,
//   Loader2,
//   ShoppingCart,
//   Zap,
//   Eye,
//   CheckCircle,
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   AlertTriangle,
//   Sparkles,
//   Star,
//   Flame,
//   Flower2,
//   Building2,
//   Package,
//   Tag,
//   ChevronDown,
//   ChevronUp
// } from 'lucide-react';
// import { toast } from 'sonner';
// import CartSidebar from '../CartSidebar';

// // Font constants - Beauty Bucket Style
// const FONT_FAMILY = "'Playfair Display', Georgia, serif";
// const FONT_FAMILY_CURSIVE = "'Courgette', cursive";

// // Helper functions
// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// const truncateText = (text, limit = 35) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// const formatPrice = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// const getUnitLabel = (unit) => {
//   const units = {
//     'pcs': 'pcs',
//     'ton': 'ton',
//     'other': 'unit'
//   };
//   return units[unit] || unit;
// };

// // Product Card Component - Beauty Bucket Style
// const ProductCard = ({ 
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
//   const [imageErrors, setImageErrors] = useState({});
//   const [isCartHovered, setIsCartHovered] = useState(false);
  
//   // Safe data extraction
//   const productId = product?._id || product?.id || 'unknown';
//   const productName = product?.productName || product?.name || 'Product';
//   const regularPrice = Number(product?.regularPrice || product?.price || 0);
//   const discountPrice = Number(product?.discountPrice || 0);
//   const stockQuantity = Number(product?.stockQuantity || 0);
//   const unit = product?.unit || 'pcs';
  
//   // Brand
//   const brand = product?.brand
//     ? typeof product.brand === 'string'
//       ? product.brand
//       : product.brand?.name || product.brand?.title || 'General'
//     : product?.brandName || 'General';
  
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
//       return null;
//     }).filter(Boolean);
//   }
  
//   const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
//   const hasMultipleImages = productImages.length > 1;
//   const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
//   const originalPrice = regularPrice;
//   const primaryTag = tagNames[0] || null;
  
//   const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = stockQuantity <= 0;

//   // Rating
//   const rating = product?.rating ? Number(product.rating) : 4.7;
//   const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating - fullStars >= 0.5;

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

//   // Listen for cart update events
//   useEffect(() => {
//     const handleCartUpdate = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const sessionId = localStorage.getItem('cartSessionId');
        
//         const headers = {};
//         if (token) {
//           headers['Authorization'] = `Bearer ${token}`;
//         } else if (sessionId) {
//           headers['x-session-id'] = sessionId;
//         } else {
//           setIsInCart(false);
//           if (onCartStatusChange) {
//             onCartStatusChange(productId, false);
//           }
//           return;
//         }
        
//         const response = await fetch('http://localhost:5000/api/cart/check-status', {
//           method: 'POST',
//           headers: { ...headers, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds: [productId] })
//         });
        
//         const data = await response.json();
//         if (data.success) {
//           const inCart = data.data[productId] || false;
//           setIsInCart(inCart);
//           if (onCartStatusChange) {
//             onCartStatusChange(productId, inCart);
//           }
//         }
//       } catch (error) {
//         console.error('Error checking cart status:', error);
//       }
//     };

//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, [productId, onCartStatusChange]);

//   // Image navigation
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
//     setImageErrors((prev) => ({ ...prev, [index]: true }));
//   };

//   const getCurrentImage = () => {
//     const image = productImages[activeIndex] || productImages[0];
//     if (imageErrors[activeIndex]) {
//       return '/placeholder-product.jpg';
//     }
//     return image;
//   };

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
//       const sessionId = localStorage.getItem('cartSessionId');
      
//       const headers = { 'Content-Type': 'application/json' };
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

//   // Render stars
//   const renderStars = () => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<Star key={i} className="h-2.5 w-2.5 fill-current text-yellow-400" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative h-2.5 w-2.5">
//             <Star className="absolute h-2.5 w-2.5 text-gray-200" />
//             <div className="absolute left-0 top-0 h-2.5 w-1/2 overflow-hidden">
//               <Star className="h-2.5 w-2.5 fill-current text-yellow-400" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} className="h-2.5 w-2.5 text-[#F7C7D3]" />);
//       }
//     }
//     return stars;
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
//       <Link href={`/product/${product?.slug || productId}`} className="block h-full">
//         <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#F7C7D3]/30 bg-white p-1.5 shadow-[0_2px_9px_rgba(238,66,117,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#EE4275]/50 hover:shadow-[0_18px_40px_rgba(238,66,117,0.12)]">
          
//           {/* ===== PRODUCT IMAGE SECTION ===== */}
//           <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#F7C7D3]/10 to-[#EE4275]/5">
//             <div className="relative aspect-[4/3] w-full overflow-hidden">
//               <img
//                 src={getCurrentImage()}
//                 alt={productName}
//                 className="w-full h-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
//                 onError={() => handleImageError(activeIndex)}
//                 loading="lazy"
//               />
              
//               {/* Discount Badge - Zigzag with shimmer */}
//               {discountPercent > 0 && (
//                 <motion.div
//                   className="absolute left-1.5 top-1.5 z-10"
//                   animate={isHovered ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}
//                   transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
//                 >
//                   <div
//                     className="relative flex h-9 w-7 items-start justify-center overflow-hidden bg-[#EE4275] px-0.5 pt-1 text-center text-[7px] font-bold uppercase leading-[0.8] tracking-wide text-white"
//                     style={{
//                       clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 91%, 70% 100%, 55% 91%, 40% 100%, 25% 91%, 0 100%)',
//                       fontFamily: FONT_FAMILY
//                     }}
//                   >
//                     {isHovered && (
//                       <motion.div
//                         className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//                         initial={{ x: '-100%' }}
//                         animate={{ x: '200%' }}
//                         transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
//                       />
//                     )}
//                     <span className="relative z-10 block leading-tight">
//                       {discountPercent}%<br />OFF
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
              
//               {/* Tag Badge */}
//               {primaryTag && (
//                 <div className="absolute right-1.5 top-1.5 z-10 flex items-center gap-0.5 rounded bg-gradient-to-r from-[#EE4275]/80 to-[#FF6B9D]/80 px-1 py-0.5 text-[7px] font-medium text-white backdrop-blur-sm">
//                   <Sparkles className="h-1.5 w-1.5" />
//                   <span className="truncate max-w-[25px]" style={{ fontFamily: FONT_FAMILY }}>
//                     {primaryTag}
//                   </span>
//                 </div>
//               )}
              
//               {/* Out of Stock Overlay */}
//               {isOutOfStock && (
//                 <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-black/60">
//                   <span className="rounded-full bg-black px-2 py-1 text-[10px] font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>
//                     Out of Stock
//                   </span>
//                 </div>
//               )}
              
//               {/* Low Stock Badge */}
//               {!isOutOfStock && isLowStock && (
//                 <div className="absolute bottom-2 left-2 z-10 flex items-center gap-0.5 rounded bg-orange-500 px-1 py-0.5 text-[7px] font-medium text-white">
//                   <AlertTriangle className="h-1.5 w-1.5" />
//                   <span className="hidden xs:inline" style={{ fontFamily: FONT_FAMILY }}>Only {stockQuantity} left</span>
//                   <span className="xs:hidden" style={{ fontFamily: FONT_FAMILY }}>{stockQuantity} left</span>
//                 </div>
//               )}
              
//               {/* Desktop Hover Actions */}
//               {!isMobile && (
//                 <div className={`absolute right-1.5 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1.5 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`}>
//                   <button
//                     type="button"
//                     onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
//                     className="flex h-6 w-6 items-center justify-center rounded-full border border-[#F7C7D3]/30 bg-white text-gray-700 shadow-md transition-all hover:bg-[#EE4275] hover:text-white"
//                     aria-label="View product"
//                   >
//                     <Eye className="h-2.5 w-2.5" />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleAddToCart}
//                     disabled={isOutOfStock || cartStatusLoading}
//                     className={`flex h-6 w-6 items-center justify-center rounded-full border border-[#F7C7D3]/30 bg-white shadow-md transition-all hover:bg-[#EE4275] hover:text-white ${cartStatusLoading ? 'pointer-events-none opacity-50' : ''}`}
//                     aria-label="Add to cart"
//                   >
//                     {cartStatusLoading ? (
//                       <Loader2 className="h-2.5 w-2.5 animate-spin" />
//                     ) : isInCart ? (
//                       <ShoppingCart className="h-2.5 w-2.5 text-green-500" />
//                     ) : (
//                       <ShoppingCart className="h-2.5 w-2.5" />
//                     )}
//                   </button>
//                 </div>
//               )}
              
//               {/* Mobile Actions - Smaller & Lower */}
//               {isMobile && (
//                 <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 gap-2">
//                   <button
//                     type="button"
//                     className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm border border-[#F7C7D3]/30"
//                     aria-label="View product"
//                   >
//                     <Eye className="h-2.5 w-2.5 text-gray-700" />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleAddToCart}
//                     disabled={isOutOfStock || cartStatusLoading}
//                     className={`flex h-6 w-6 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm border ${isOutOfStock ? 'border-gray-200 bg-gray-100/80' : 'border-[#F7C7D3]/30'}`}
//                     aria-label="Add to cart"
//                   >
//                     {cartStatusLoading ? (
//                       <Loader2 className="h-2.5 w-2.5 animate-spin text-gray-500" />
//                     ) : (
//                       <ShoppingCart className={`h-2.5 w-2.5 ${isInCart ? 'text-[#EE4275]' : 'text-gray-700'}`} />
//                     )}
//                   </button>
//                 </div>
//               )}
              
//               {/* Image Navigation - Arrows & Dots */}
//               {hasMultipleImages && (
//                 <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1">
//                   <motion.button
//                     type="button"
//                     onClick={prevImage}
//                     className="rounded-full p-0.5"
//                     aria-label="Previous image"
//                     whileHover={{ scale: 1.2 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <ChevronLeft className="h-3 w-3 text-[#EE4275]" />
//                   </motion.button>
//                   <div className="flex items-center gap-0.5">
//                     {productImages.map((_, index) => (
//                       <motion.button
//                         key={index}
//                         type="button"
//                         onClick={(e) => goToImage(e, index)}
//                         className={`rounded-full transition-all duration-200 ${activeIndex === index ? 'h-1.5 w-1.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]' : 'h-1 w-1 bg-[#F7C7D3]/60 hover:bg-[#EE4275]/50'}`}
//                         whileHover={{ scale: 1.3 }}
//                         aria-label={`Go to image ${index + 1}`}
//                       />
//                     ))}
//                   </div>
//                   <motion.button
//                     type="button"
//                     onClick={nextImage}
//                     className="rounded-full p-0.5"
//                     aria-label="Next image"
//                     whileHover={{ scale: 1.2 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <ChevronRight className="h-3 w-3 text-[#FF6B9D]" />
//                   </motion.button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ===== PRODUCT INFO ===== */}
//           <div className="flex flex-1 flex-col px-1 pb-1 pt-1.5">
//             {/* Brand + Stock Status */}
//             <div className="mb-0.5 flex items-center justify-between gap-2">
//               <span className="min-w-0 truncate text-[7px] font-semibold uppercase tracking-[0.12em] text-[#EE4275]" style={{ fontFamily: FONT_FAMILY }}>
//                 {brand}
//               </span>
//               <div className="flex shrink-0 items-center gap-0.5">
//                 <span className={`h-1 w-1 rounded-full ${stockQuantity > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
//                 <span className={`text-[6px] font-medium ${stockQuantity > 0 ? 'text-emerald-600' : 'text-red-500'}`} style={{ fontFamily: FONT_FAMILY }}>
//                   {stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
//                 </span>
//               </div>
//             </div>

//             {/* Product Name */}
//             <h3
//               className="min-h-[24px] line-clamp-2 text-[11px] font-semibold leading-[1.2] text-gray-800 transition-colors group-hover:text-[#EE4275]"
//               style={{ fontFamily: FONT_FAMILY }}
//               title={productName}
//             >
//               {truncateText(productName, 30)}
//             </h3>

//             {/* Rating */}
//             <div className="mt-0.5 flex items-center gap-0.5">
//               <div className="flex items-center gap-0.5">{renderStars()}</div>
//               <span className="text-[8px] font-medium text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
//                 {rating.toFixed(1)}
//               </span>
//               {reviewCount > 0 && (
//                 <>
//                   <span className="text-gray-300 hidden xs:inline">•</span>
//                   <span className="text-[7px] text-gray-400 hidden xs:inline" style={{ fontFamily: FONT_FAMILY }}>
//                     {reviewCount}
//                   </span>
//                 </>
//               )}
//             </div>

//             {/* Divider */}
//             <div className="my-1 h-px bg-gradient-to-r from-[#F7C7D3]/30 to-transparent" />

//             {/* Price + Cart */}
//             <div className="mt-auto flex items-center justify-between gap-2 pt-0.5">
//               <div className="flex min-w-0 items-center gap-0.5 whitespace-nowrap">
//                 <span className="text-[13px] font-bold tracking-tight text-[#EE4275]" style={{ fontFamily: FONT_FAMILY }}>
//                   ৳{formatPrice(currentPrice)}
//                 </span>
//                 {discountPercent > 0 && (
//                   <>
//                     <span className="text-[6px] text-gray-400 line-through" style={{ fontFamily: FONT_FAMILY }}>
//                       ৳{formatPrice(originalPrice)}
//                     </span>
//                     <span className="text-[6px] font-semibold text-white bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-0.5 py-0.5 rounded hidden sm:inline-block" style={{ fontFamily: FONT_FAMILY }}>
//                       Save {discountPercent}%
//                     </span>
//                   </>
//                 )}
//               </div>
//               <motion.button
//                 type="button"
//                 onClick={handleAddToCart}
//                 disabled={isOutOfStock || cartStatusLoading}
//                 onMouseEnter={() => setIsCartHovered(true)}
//                 onMouseLeave={() => setIsCartHovered(false)}
//                 whileHover={!isOutOfStock ? { scale: 1.08 } : {}}
//                 whileTap={!isOutOfStock ? { scale: 0.92 } : {}}
//                 animate={isCartHovered && !isOutOfStock ? { rotate: [0, -10, 10, -6, 6, 0] } : {}}
//                 transition={{ duration: 0.5 }}
//                 aria-label={isInCart ? 'View cart' : 'Add to cart'}
//                 className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
//                   isInCart
//                     ? 'bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white shadow-[0_4px_12px_rgba(168,8,131,0.22)]'
//                     : isOutOfStock
//                     ? 'cursor-not-allowed bg-gray-100 text-gray-300'
//                     : 'border border-[#F7C7D3] bg-white text-[#EE4275] hover:border-[#EE4275] hover:bg-[#EE4275] hover:text-white hover:shadow-[0_4px_12px_rgba(238,66,117,0.18)]'
//                 }`}
//               >
//                 {cartStatusLoading ? (
//                   <Loader2 className="h-2.5 w-2.5 animate-spin" />
//                 ) : (
//                   <ShoppingCart className="h-2.5 w-2.5" />
//                 )}
//               </motion.button>
//             </div>
//           </div>
//         </article>
//       </Link>
//     </motion.div>
//   );
// };

// // Main Product Grid Section Component - Beauty Bucket Style
// export default function ProductGridSection({ 
//   title, 
//   description, 
//   products = [], 
//   layout = 'grid',
//   itemsPerRow = 5,
//   showViewAll = true,
//   viewAllLink = '/products',
//   sectionBadge = 'Products'
// }) {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = itemsPerRow * 1;

//   // Check cart status for products
//   const checkCartStatus = async (productsList) => {
//     if (!productsList || productsList.length === 0) return;
    
//     const productIds = productsList.map(p => p._id || p.id).filter(Boolean);
//     if (productIds.length === 0) return;
    
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('cartSessionId');
    
//     const headers = {};
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     } else {
//       const emptyCartStatus = {};
//       productIds.forEach(id => {
//         emptyCartStatus[id] = false;
//       });
//       setProductsInCart(emptyCartStatus);
//       return;
//     }
    
//     try {
//       const response = await fetch('http://localhost:5000/api/cart/check-status', {
//         method: 'POST',
//         headers: { ...headers, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ productIds })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setProductsInCart(data.data);
//       } else {
//         const emptyCartStatus = {};
//         productIds.forEach(id => {
//           emptyCartStatus[id] = false;
//         });
//         setProductsInCart(emptyCartStatus);
//       }
//     } catch (error) {
//       console.error('Error checking cart status:', error);
//       const emptyCartStatus = {};
//       productIds.forEach(id => {
//         emptyCartStatus[id] = false;
//       });
//       setProductsInCart(emptyCartStatus);
//     }
//   };

//   // Listen for cart update events
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       if (products.length > 0) {
//         checkCartStatus(products);
//       }
//     };

//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, [products]);

//   // Initial cart status check
//   useEffect(() => {
//     if (products.length > 0) {
//       checkCartStatus(products);
//     }
//   }, [products]);

//   const onCartStatusChange = useCallback((productId, isInCart) => {
//     setProductsInCart(prev => ({
//       ...prev,
//       [productId]: isInCart
//     }));
//   }, []);

//   const openCartSidebar = () => {
//     setIsCartOpen(true);
//   };

//   const closeCartSidebar = () => {
//     setIsCartOpen(false);
//   };

//   if (!products || products.length === 0) {
//     return null;
//   }

//   const totalPages = Math.ceil(products.length / itemsPerPage);
//   const currentProducts = products.slice(
//     currentPage * itemsPerPage,
//     (currentPage + 1) * itemsPerPage
//   );

//   const handleNext = () => {
//     if (currentPage < totalPages - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const gridCols = {
//     2: 'grid-cols-2',
//     3: 'grid-cols-2 md:grid-cols-3',
//     4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
//     5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
//   }[itemsPerRow] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';

//   return (
//     <>
//       <section className="py-6 sm:py-8 md:py-10 bg-gradient-to-b from-white via-[#FFF5F6]/30 to-white overflow-hidden relative">
//         <div className="container mx-auto px-3 sm:px-4 max-w-7xl relative z-10">
//           {/* Header - Beauty Bucket Style */}
//           <div className="text-center mb-4 sm:mb-6 md:mb-8">
//             <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 bg-[#F7C7D3]/30 rounded-full border border-[#F7C7D3]/40 mb-1.5 sm:mb-2 md:mb-3">
//               <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#EE4275]" />
//               <span className="text-[8px] sm:text-[9px] md:text-xs font-medium text-[#EE4275] tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
//                 {sectionBadge || 'Products'}
//               </span>
//               <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#EE4275]" />
//             </div>
            
//             <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D1B2E] tracking-tight leading-[1.1]" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
//               {title || 'Our Products'}
//             </h2>
            
//             {description && (
//               <p className="text-gray-500 mt-0.5 sm:mt-1 md:mt-2 text-[10px] sm:text-xs md:text-sm max-w-2xl mx-auto" style={{ fontFamily: FONT_FAMILY }}>
//                 {description}
//               </p>
//             )}
//           </div>

//           {/* Products Grid */}
//           <AnimatePresence mode="wait">
//             <div className={`grid ${gridCols} gap-2 sm:gap-3 md:gap-4`}>
//               {currentProducts.map((product) => {
//                 const productId = product._id || product.id;
//                 return (
//                   <ProductCard 
//                     key={productId}
//                     product={product}
//                     isInCart={productsInCart[productId] || false}
//                     onCartStatusChange={onCartStatusChange}
//                     onViewInCart={openCartSidebar}
//                   />
//                 );
//               })}
//             </div>
//           </AnimatePresence>

//           {/* Navigation Arrows - Beauty Bucket Style */}
//           {products.length > itemsPerPage && (
//             <div className="flex items-center justify-center mt-3 sm:mt-4 md:mt-6 gap-1.5 sm:gap-2">
//               <motion.button
//                 onClick={handlePrev}
//                 disabled={currentPage === 0}
//                 whileHover={currentPage > 0 ? { scale: 1.05 } : {}}
//                 whileTap={currentPage > 0 ? { scale: 0.95 } : {}}
//                 className={`p-1 sm:p-1.5 md:p-2 rounded-full border transition-all ${
//                   currentPage > 0
//                     ? 'border-[#F7C7D3]/50 text-[#EE4275] hover:bg-[#EE4275] hover:text-white hover:border-[#EE4275]'
//                     : 'border-gray-200 text-gray-300 cursor-not-allowed'
//                 }`}
//               >
//                 <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//               </motion.button>
//               <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
//                 {currentPage + 1} / {totalPages}
//               </span>
//               <motion.button
//                 onClick={handleNext}
//                 disabled={currentPage === totalPages - 1}
//                 whileHover={currentPage < totalPages - 1 ? { scale: 1.05 } : {}}
//                 whileTap={currentPage < totalPages - 1 ? { scale: 0.95 } : {}}
//                 className={`p-1 sm:p-1.5 md:p-2 rounded-full border transition-all ${
//                   currentPage < totalPages - 1
//                     ? 'border-[#F7C7D3]/50 text-[#EE4275] hover:bg-[#EE4275] hover:text-white hover:border-[#EE4275]'
//                     : 'border-gray-200 text-gray-300 cursor-not-allowed'
//                 }`}
//               >
//                 <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//               </motion.button>
//             </div>
//           )}

//           {/* View All Button - Beauty Bucket Style */}
//           {showViewAll && (
//             <div className="flex justify-center mt-4 sm:mt-5 md:mt-6">
//               <Link
//                 href={viewAllLink}
//                 className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[10px] sm:text-xs md:text-sm font-medium rounded-full hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all duration-300"
//                 style={{ fontFamily: FONT_FAMILY_CURSIVE }}
//               >
//                 View All Products
//                 <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
//               </Link>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Cart Sidebar */}
//       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
//     </>
//   );
// }
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ShoppingBag,
  Loader2,
  ShoppingCart,
  Zap,
  Eye,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Sparkles,
  Star,
  Flame,
  Flower2,
  Building2,
  Package,
  Tag,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../CartSidebar';

// Font constants - Beauty Bucket Style
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// Helper functions
const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

const truncateText = (text, limit = 35) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const formatPrice = (price) => {
  return price?.toFixed(2) || '0.00';
};

// Product Card Component - Beauty Bucket Style with Hover Functionality
const ProductCard = ({ 
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
  const [imageErrors, setImageErrors] = useState({});
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [hasUserNavigated, setHasUserNavigated] = useState(false);
  
  // Safe data extraction
  const productId = product?._id || product?.id || 'unknown';
  const productName = product?.productName || product?.name || 'Product';
  const regularPrice = Number(product?.regularPrice || product?.price || 0);
  const discountPrice = Number(product?.discountPrice || 0);
  const stockQuantity = Number(product?.stockQuantity || 0);
  
  // Brand
  const brand = product?.brand
    ? typeof product.brand === 'string'
      ? product.brand
      : product.brand?.name || product.brand?.title || 'General'
    : product?.brandName || 'General';
  
  // Safe image extraction
  let productImages = [];
  if (product?.images && Array.isArray(product.images)) {
    productImages = product.images.map(img => {
      if (typeof img === 'string') return img;
      if (img?.url) return img.url;
      return null;
    }).filter(Boolean);
  }
  if (productImages.length === 0 && product?.image) {
    productImages = [typeof product.image === 'string' ? product.image : product.image?.url || ''].filter(Boolean);
  }
  if (productImages.length === 0) {
    productImages = ['/placeholder-product.jpg'];
  }
  
  // Determine if we should show hover image (only if more than 1 image)
  const hasHoverImage = productImages.length > 1;
  
  const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
  const hasMultipleImages = productImages.length > 1;
  const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
  const originalPrice = regularPrice;
  
  const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
  const isOutOfStock = stockQuantity <= 0;

  // Rating - Get from backend
  const rating = product?.rating ? Number(product.rating) : 0;
  const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsInCart(propIsInCart || false);
  }, [propIsInCart]);

  // Reset navigation state and active index when hover ends
  useEffect(() => {
    if (!isHovered) {
      setHasUserNavigated(false);
      setActiveIndex(0);
    }
  }, [isHovered]);

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = async () => {
      try {
        const token = localStorage.getItem('token');
        const sessionId = localStorage.getItem('cartSessionId');
        
        const headers = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        } else if (sessionId) {
          headers['x-session-id'] = sessionId;
        } else {
          setIsInCart(false);
          if (onCartStatusChange) {
            onCartStatusChange(productId, false);
          }
          return;
        }
        
        const response = await fetch('http://localhost:5000/api/cart/check-status', {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds: [productId] })
        });
        
        const data = await response.json();
        if (data.success) {
          const inCart = data.data[productId] || false;
          setIsInCart(inCart);
          if (onCartStatusChange) {
            onCartStatusChange(productId, inCart);
          }
        }
      } catch (error) {
        console.error('Error checking cart status:', error);
      }
    };

    window.addEventListener('cart-update', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-update', handleCartUpdate);
    };
  }, [productId, onCartStatusChange]);

  // Image navigation
  const nextImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (hasMultipleImages) {
      setActiveIndex((prev) => (prev + 1) % productImages.length);
      setHasUserNavigated(true);
    }
  };

  const prevImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (hasMultipleImages) {
      setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
      setHasUserNavigated(true);
    }
  };

  const goToImage = (e, index) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveIndex(index);
    setHasUserNavigated(true);
  };

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const getCurrentImage = () => {
    // If hovered AND user hasn't manually navigated, show the second image
    if (isHovered && hasHoverImage && !isMobile && !hasUserNavigated) {
      const hoverIndex = 1;
      const image = productImages[hoverIndex] || productImages[0];
      if (imageErrors[hoverIndex]) {
        return productImages[0] || '/placeholder-product.jpg';
      }
      return image;
    }
    
    // Otherwise show the active index
    const image = productImages[activeIndex] || productImages[0];
    if (imageErrors[activeIndex]) {
      return '/placeholder-product.jpg';
    }
    return image;
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInCart) {
      onViewInCart();
      return;
    }
    
    if (stockQuantity <= 0) {
      toast.error('Product is out of stock!');
      return;
    }
    
    setCartStatusLoading(true);
    const toastId = toast.loading('Adding to cart...');
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ productId: productId, quantity: 1 })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        toast.success('Added to cart!', { id: toastId });
        setIsInCart(true);
        if (onCartStatusChange) {
          onCartStatusChange(productId, true);
        }
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error(data.error || 'Failed to add to cart', { id: toastId });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error. Please try again.', { id: toastId });
    } finally {
      setCartStatusLoading(false);
    }
  };

  // Render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-2.5 w-2.5 fill-current text-[#8B9D83]" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-2.5 w-2.5">
            <Star className="absolute h-2.5 w-2.5 text-gray-200" />
            <div className="absolute left-0 top-0 h-2.5 w-1/2 overflow-hidden">
              <Star className="h-2.5 w-2.5 fill-current text-[#8B9D83]" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-2.5 w-2.5 text-[#8B9D83]/30" />);
      }
    }
    return stars;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHasUserNavigated(false);
    setActiveIndex(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/product/${product?.slug || productId}`} className="block h-full">
        <article 
          className={`
            group
            relative
            flex
            w-full
            flex-col
            rounded-[3px]
            bg-[#FDF7EF]
            px-2.5
            pb-3
            pt-2
            transition-all
            duration-300
            ${isHovered ? '-translate-y-1 shadow-[0_5px_20px_rgba(139,157,131,0.15)]' : ''}
          `}
        >
          
          {/* =================================
              DISCOUNT PERCENT BADGE
          ================================== */}
          {discountPercent > 0 && (
            <motion.div
              className="absolute left-2.5 top-2 z-10"
              animate={isHovered ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}
              transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
            >
              <span className="relative flex items-center justify-center overflow-hidden rounded-full bg-[#8B9D83] px-2 py-[3px] text-[7px] font-semibold tracking-wide text-white sm:text-[8px]" style={{ fontFamily: FONT_FAMILY }}>
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <span className="relative z-10">{discountPercent}% OFF</span>
              </span>
            </motion.div>
          )}

          {/* =================================
              SHOPPING BAG ICON (Add to Cart)
          ================================== */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock || cartStatusLoading}
            aria-label="Add to cart"
            className={`
              absolute
              right-2.5
              top-2
              z-10
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              text-gray-500
              transition-all
              duration-200
              hover:bg-white
              hover:text-[#8B9D83]
              disabled:opacity-50
              disabled:cursor-not-allowed
              ${isHovered ? 'opacity-100' : 'opacity-70'}
            `}
          >
            {cartStatusLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ShoppingBag size={15} strokeWidth={1.7} />
            )}
          </button>

          {/* =================================
              PRODUCT IMAGE
          ================================== */}
          <div
            className="
              flex
              h-[145px]
              w-full
              items-center
              justify-center
              overflow-hidden
              rounded-sm
              bg-[#FDF7EF]
              relative
              sm:h-[165px]
              lg:h-[180px]
            "
          >
            <motion.img
              src={getCurrentImage()}
              alt={productName}
              className="
                h-full
                w-full
                object-contain
                p-2
                transition-transform
                duration-500
              "
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onError={() => handleImageError(isHovered && hasHoverImage && !isMobile && !hasUserNavigated ? 1 : activeIndex)}
              loading="lazy"
            />

            {/* Image Navigation Arrows - Only if multiple images */}
            {hasMultipleImages && (
              <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1">
                <motion.button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prevImage(e);
                  }}
                  className="rounded-full bg-white/80 p-0.5 shadow-sm hover:bg-white"
                  aria-label="Previous image"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-3 w-3 text-[#8B9D83]" />
                </motion.button>
                
                <div className="flex items-center gap-0.5">
                  {productImages.map((_, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        goToImage(e, index);
                      }}
                      className={`rounded-full transition-all duration-200 ${
                        activeIndex === index 
                          ? 'h-1.5 w-1.5 bg-[#8B9D83]' 
                          : 'h-1 w-1 bg-[#8B9D83]/30 hover:bg-[#8B9D83]/60'
                      }`}
                      whileHover={{ scale: 1.3 }}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
                
                <motion.button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nextImage(e);
                  }}
                  className="rounded-full bg-white/80 p-0.5 shadow-sm hover:bg-white"
                  aria-label="Next image"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-3 w-3 text-[#8B9D83]" />
                </motion.button>
              </div>
            )}

            {/* Out of Stock Overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-sm bg-black/50">
                <span className="rounded-full bg-black px-3 py-1 text-[10px] font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* =================================
              PRODUCT NAME
          ================================== */}
          <h3
            className="
              mt-1
              truncate
              text-center
              text-[11px]
              font-semibold
              text-[#2D1B2E]
              transition-colors
              duration-300
              group-hover:text-[#8B9D83]
              sm:text-xs
            "
            style={{ fontFamily: FONT_FAMILY }}
          >
            {truncateText(productName, 25)}
          </h3>

          {/* =================================
              RATING - Shows actual rating from backend
          ================================== */}
          <div className="mt-1 flex items-center justify-center gap-[2px]">
            <div className="flex">
              {renderStars()}
            </div>
            {reviewCount > 0 && (
              <span className="ml-1 text-[9px] text-[#8B9D83] sm:text-[10px]" style={{ fontFamily: FONT_FAMILY }}>
                ({reviewCount})
              </span>
            )}
          </div>

          {/* =================================
              PRICE
          ================================== */}
          <div className="mt-1 text-center">
            {discountPercent > 0 ? (
              <>
                <span className="text-[12px] font-bold text-[#8B9D83] sm:text-sm" style={{ fontFamily: FONT_FAMILY }}>
                  ৳{formatPrice(currentPrice)}
                </span>
                <span className="ml-1.5 text-[10px] text-gray-400 line-through sm:text-[11px]" style={{ fontFamily: FONT_FAMILY }}>
                  ৳{formatPrice(originalPrice)}
                </span>
              </>
            ) : (
              <span className="text-[12px] font-bold text-[#2D1B2E] sm:text-sm" style={{ fontFamily: FONT_FAMILY }}>
                ৳{formatPrice(currentPrice)}
              </span>
            )}
          </div>

          {/* =================================
              ADD TO BAG BUTTON
          ================================== */}
          <motion.button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock || cartStatusLoading}
            onMouseEnter={() => setIsCartHovered(true)}
            onMouseLeave={() => setIsCartHovered(false)}
            whileHover={!isOutOfStock ? { scale: 1.02 } : {}}
            whileTap={!isOutOfStock ? { scale: 0.98 } : {}}
            animate={isCartHovered && !isOutOfStock && !isInCart ? { rotate: [0, -5, 5, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
            className={`
              mt-2
              h-[29px]
              w-full
              rounded-[2px]
              border
              text-[9px]
              font-medium
              uppercase
              tracking-wide
              transition-all
              duration-200
              sm:h-[31px]
              sm:text-[10px]
              ${
                isInCart
                  ? 'border-[#8B9D83] bg-[#8B9D83] text-white'
                  : isOutOfStock
                  ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'border-[#8B9D83]/30 bg-white text-[#2D1B2E] hover:border-[#8B9D83] hover:bg-[#8B9D83] hover:text-white'
              }
            `}
            style={{ fontFamily: FONT_FAMILY }}
          >
            {cartStatusLoading ? (
              <Loader2 className="mx-auto h-3 w-3 animate-spin" />
            ) : isInCart ? (
              'IN CART'
            ) : isOutOfStock ? (
              'OUT OF STOCK'
            ) : (
              'ADD TO BAG'
            )}
          </motion.button>

        </article>
      </Link>
    </motion.div>
  );
};

// Main Product Grid Section Component - Horizontal Scroll with Arrow Navigation
export default function ProductGridSection({ 
  title, 
  description, 
  products = [], 
  layout = 'grid',
  itemsPerRow = 6,
  showViewAll = true,
  viewAllLink = '/products',
  sectionBadge = 'Products'
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check cart status for products
  const checkCartStatus = async (productsList) => {
    if (!productsList || productsList.length === 0) return;
    
    const productIds = productsList.map(p => p._id || p.id).filter(Boolean);
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
      productIds.forEach(id => {
        emptyCartStatus[id] = false;
      });
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
        productIds.forEach(id => {
          emptyCartStatus[id] = false;
        });
        setProductsInCart(emptyCartStatus);
      }
    } catch (error) {
      console.error('Error checking cart status:', error);
      const emptyCartStatus = {};
      productIds.forEach(id => {
        emptyCartStatus[id] = false;
      });
      setProductsInCart(emptyCartStatus);
    }
  };

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      if (products.length > 0) {
        checkCartStatus(products);
      }
    };

    window.addEventListener('cart-update', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-update', handleCartUpdate);
    };
  }, [products]);

  // Initial cart status check
  useEffect(() => {
    if (products.length > 0) {
      checkCartStatus(products);
    }
  }, [products]);

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

  if (!products || products.length === 0) {
    return null;
  }

  const totalPages = Math.ceil(products.length / itemsPerRow);
  const currentProducts = products.slice(
    currentIndex * itemsPerRow,
    (currentIndex + 1) * itemsPerRow
  );

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
      // Scroll to top of section on mobile
      if (isMobile && containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      // Scroll to top of section on mobile
      if (isMobile && containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
  }[itemsPerRow] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6';

  // Calculate responsive items per row for display
  const getResponsiveItemsPerRow = () => {
    if (isMobile) return 2;
    if (itemsPerRow <= 2) return 2;
    if (itemsPerRow <= 3) return 3;
    if (itemsPerRow <= 4) return 4;
    if (itemsPerRow <= 5) return 5;
    return 6;
  };

  const displayItemsPerRow = getResponsiveItemsPerRow();

  return (
    <>
      <section className="w-full bg-white py-4 sm:py-6 md:py-10" ref={containerRef}>
        <div className="mx-auto w-full max-w-[1450px] px-3 sm:px-4 lg:px-8">
          
          {/* =========================
              SECTION HEADER - Beauty Bucket Style
          ========================== */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div>
              {/* <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-[#8B9D83]/20 rounded-full border border-[#8B9D83]/30 mb-1 sm:mb-2">
                <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#8B9D83]" />
                <span className="text-[8px] sm:text-[9px] font-medium text-[#8B9D83] tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
                  {sectionBadge || 'Products'}
                </span>
                <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#8B9D83]" />
              </div> */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#252b23] tracking-tight leading-[1.1]" style={{ fontFamily: FONT_FAMILY }}>
                {title || 'Our Products'}
              </h2>
              {description && (
                <p className="text-[10px] sm:text-xs md:text-sm text-[#53645a] mt-0.5 sm:mt-1" style={{ fontFamily: FONT_FAMILY }}>
                  {description}
                </p>
              )}
            </div>
            
           
          </div>

          {/* =========================
              PRODUCTS CAROUSEL WITH ARROWS
          ========================== */}
          <div className="relative">
            {/* Left Arrow - Desktop */}
            {totalPages > 1 && (
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`
                  absolute left-0 top-1/2 -translate-y-1/2 z-10 
                  hidden md:flex
                  items-center justify-center -ml-8
                  w-8 h-8 rounded-full 
                  bg-white border border-[#8B9D83]/30 shadow-md 
                  transition-all duration-200
                  ${currentIndex > 0 
                    ? 'hover:bg-[#8B9D83] hover:text-white hover:border-[#8B9D83]' 
                    : 'opacity-40 cursor-not-allowed'
                  }
                `}
                aria-label="Previous products"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* Products Grid - Desktop */}
            <div className="hidden md:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className={`grid ${gridCols} gap-2 sm:gap-3`}
                >
                  {currentProducts.map((product) => {
                    const productId = product._id || product.id;
                    return (
                      <ProductCard 
                        key={productId}
                        product={product}
                        isInCart={productsInCart[productId] || false}
                        onCartStatusChange={onCartStatusChange}
                        onViewInCart={openCartSidebar}
                      />
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Products Grid - Mobile (Horizontal Scroll) */}
            <div className="md:hidden">
              <div 
                ref={sliderRef}
                className="flex gap-2 overflow-x-auto scroll-smooth pb-2"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {products.map((product) => {
                  const productId = product._id || product.id;
                  return (
                    <div key={productId} className="w-[48%] flex-shrink-0">
                      <ProductCard 
                        product={product}
                        isInCart={productsInCart[productId] || false}
                        onCartStatusChange={onCartStatusChange}
                        onViewInCart={openCartSidebar}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow - Desktop */}
            {totalPages > 1 && (
              <button
                onClick={handleNext}
                disabled={currentIndex === totalPages - 1}
                className={`
                  absolute right-0 top-1/2 -translate-y-1/2 z-10 
                  hidden md:flex
                  items-center justify-center
                  w-8 h-8 rounded-full 
                  bg-white border border-[#8B9D83]/30 shadow-md -mr-8
                  transition-all duration-200
                  ${currentIndex < totalPages - 1 
                    ? 'hover:bg-[#8B9D83] hover:text-white hover:border-[#8B9D83]' 
                    : 'opacity-40 cursor-not-allowed'
                  }
                `}
                aria-label="Next products"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Mobile Scroll Hint */}
            {isMobile && products.length > displayItemsPerRow && (
              <div className="text-center mt-3">
                <span className="text-[8px] text-gray-400 flex items-center justify-center gap-1" style={{ fontFamily: FONT_FAMILY }}>
                  <span>← Swipe to see more →</span>
                </span>
              </div>
            )}
          </div>

          {/* =========================
              PAGE INDICATOR - Desktop
          ========================== */}
          {totalPages > 1 && (
            <div className="hidden md:flex items-center justify-center mt-4 sm:mt-6 gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-5 h-1.5 bg-[#8B9D83]'
                      : 'w-1.5 h-1.5 bg-[#8B9D83]/30 hover:bg-[#8B9D83]/60'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
    </>
  );
}