

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
  Truck,
  Flower2
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../CartSidebar';

// Font constants matching Navbar and Categories
const FONT_FAMILY = " serif";
const FONT_FAMILY_CURSIVE = "'Courgette', cursive";

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

// Product Card Component - KEEP EXACTLY AS IS
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

//   // =========================================================
//   // SAFE PRODUCT DATA
//   // =========================================================

//   const productId =
//     product?._id ||
//     product?.id ||
//     'unknown';

//   const productName =
//     product?.productName ||
//     product?.name ||
//     'Product';

//   const regularPrice =
//     Number(
//       product?.regularPrice ||
//       product?.price ||
//       0
//     );

//   const discountPrice =
//     Number(
//       product?.discountPrice || 0
//     );

//   const stockQuantity =
//     Number(
//       product?.stockQuantity || 0
//     );

//   // =========================================================
//   // CATEGORY
//   // =========================================================

//   const category = product?.category
//     ? typeof product.category === 'string'
//       ? product.category
//       : product.category?.name ||
//         product.category?.title ||
//         'General'
//     : product?.categoryName ||
//       'General';

//   // =========================================================
//   // BRAND
//   // =========================================================

//   const brand = product?.brand
//     ? typeof product.brand === 'string'
//       ? product.brand
//       : product.brand?.name ||
//         product.brand?.title ||
//         'General'
//     : product?.brandName ||
//       'General';

//   // =========================================================
//   // IMAGES
//   // =========================================================

//   let productImages = [];

//   if (
//     product?.images &&
//     Array.isArray(product.images)
//   ) {
//     productImages = product.images
//       .map((img) => {
//         if (typeof img === 'string') {
//           return img;
//         }

//         if (img?.url) {
//           return img.url;
//         }

//         return null;
//       })
//       .filter(Boolean);
//   }

//   if (
//     productImages.length === 0 &&
//     product?.image
//   ) {
//     productImages = [
//       typeof product.image === 'string'
//         ? product.image
//         : product.image?.url || ''
//     ].filter(Boolean);
//   }

//   if (
//     productImages.length === 0
//   ) {
//     productImages = [
//       '/placeholder-product.jpg'
//     ];
//   }

//   // =========================================================
//   // TAGS
//   // =========================================================

//   let tagNames = [];

//   if (
//     product?.tags &&
//     Array.isArray(product.tags)
//   ) {
//     tagNames = product.tags
//       .map((tag) => {
//         if (typeof tag === 'string') {
//           return tag;
//         }

//         if (tag?.name) {
//           return tag.name;
//         }

//         return null;
//       })
//       .filter(Boolean);
//   }

//   const primaryTag =
//     tagNames[0] || null;

//   // =========================================================
//   // PRICE
//   // =========================================================

//   const discountPercent =
//     calculateDiscountPercentage(
//       regularPrice,
//       discountPrice
//     );

//   const currentPrice =
//     discountPrice > 0 &&
//     discountPrice < regularPrice
//       ? discountPrice
//       : regularPrice;

//   const originalPrice =
//     regularPrice;

//   // =========================================================
//   // STOCK
//   // =========================================================

//   const isLowStock =
//     product?.stockAlertQuantity > 0 &&
//     stockQuantity <=
//       product.stockAlertQuantity;

//   const isOutOfStock =
//     stockQuantity <= 0;

//   // =========================================================
//   // RATING
//   // =========================================================

//   const rating = product?.rating
//     ? Number(product.rating)
//     : 4.7;

//   const reviewCount =
//     product?.reviewStats?.totalReviews ||
//     product?.reviews?.length ||
//     0;

//   const fullStars =
//     Math.floor(rating);

//   const hasHalfStar =
//     rating - fullStars >= 0.5;

//   // =========================================================
//   // MULTIPLE IMAGES
//   // =========================================================

//   const hasMultipleImages =
//     productImages.length > 1;

//   // =========================================================
//   // MOBILE DETECTION
//   // =========================================================

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(
//         window.innerWidth < 768
//       );
//     };

//     checkMobile();

//     window.addEventListener(
//       'resize',
//       checkMobile
//     );

//     return () => {
//       window.removeEventListener(
//         'resize',
//         checkMobile
//       );
//     };
//   }, []);

//   // =========================================================
//   // CART PROP SYNC
//   // =========================================================

//   useEffect(() => {
//     setIsInCart(
//       propIsInCart || false
//     );
//   }, [propIsInCart]);

//   // =========================================================
//   // IMAGE NAVIGATION
//   // =========================================================

//   const nextImage = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (hasMultipleImages) {
//       setActiveIndex(
//         (prev) =>
//           (prev + 1) %
//           productImages.length
//       );
//     }
//   };

//   const prevImage = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (hasMultipleImages) {
//       setActiveIndex(
//         (prev) =>
//           (prev -
//             1 +
//             productImages.length) %
//           productImages.length
//       );
//     }
//   };

//   const goToImage = (e, index) => {
//     e.preventDefault();
//     e.stopPropagation();

//     setActiveIndex(index);
//   };

//   const handleImageError = (index) => {
//     setImageErrors((prev) => ({
//       ...prev,
//       [index]: true
//     }));
//   };

//   const getCurrentImage = () => {
//     const image =
//       productImages[activeIndex] ||
//       productImages[0];

//     if (
//       imageErrors[activeIndex]
//     ) {
//       return '/placeholder-product.jpg';
//     }

//     return image;
//   };

//   // =========================================================
//   // ADD TO CART
//   // =========================================================

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (isInCart) {
//       if (onViewInCart) {
//         onViewInCart();
//       }

//       return;
//     }

//     if (isOutOfStock) {
//       toast.error(
//         'Product is out of stock!'
//       );

//       return;
//     }

//     setCartStatusLoading(true);

//     const toastId =
//       toast.loading(
//         'Adding to cart...'
//       );

//     try {
//       const token =
//         localStorage.getItem(
//           'token'
//         );

//       let sessionId =
//         localStorage.getItem(
//           'cartSessionId'
//         );

//       const headers = {
//         'Content-Type':
//           'application/json'
//       };

//       // Guest session
//       if (
//         !token &&
//         !sessionId
//       ) {
//         sessionId =
//           `guest_${Date.now()}_${Math.random()
//             .toString(36)
//             .substring(7)}`;

//         localStorage.setItem(
//           'cartSessionId',
//           sessionId
//         );
//       }

//       // Authentication
//       if (token) {
//         headers.Authorization =
//           `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] =
//           sessionId;
//       }

//       // API request
//       const response =
//         await fetch(
//           'http://localhost:5000/api/cart',
//           {
//             method: 'POST',
//             headers,
//             body: JSON.stringify({
//               productId:
//                 productId,
//               quantity: 1
//             })
//           }
//         );

//       const data =
//         await response.json();

//       if (data.success) {
//         if (
//           data.sessionId &&
//           !token
//         ) {
//           localStorage.setItem(
//             'cartSessionId',
//             data.sessionId
//           );
//         }

//         toast.success(
//           'Added to cart!',
//           {
//             id: toastId
//           }
//         );

//         setIsInCart(true);

//         if (
//           onCartStatusChange
//         ) {
//           onCartStatusChange(
//             productId,
//             true
//           );
//         }

//         window.dispatchEvent(
//           new Event(
//             'cart-update'
//           )
//         );
//       } else {
//         toast.error(
//           data.error ||
//             'Failed to add to cart',
//           {
//             id: toastId
//           }
//         );
//       }
//     } catch (error) {
//       console.error(
//         'Add to cart error:',
//         error
//       );

//       toast.error(
//         'Network error. Please try again.',
//         {
//           id: toastId
//         }
//       );
//     } finally {
//       setCartStatusLoading(
//         false
//       );
//     }
//   };

//   // =========================================================
//   // WISHLIST
//   // =========================================================

//   const handleLike = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     setIsLiked(
//       (prev) => !prev
//     );
//   };

//   // =========================================================
//   // RATING STARS
//   // =========================================================

//   const renderStars = () => {
//     const stars = [];

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(
//           <Star
//             key={i}
//             className="
//               h-3
//               w-3
//               fill-current
//               text-yellow-400
//             "
//           />
//         );
//       } else if (
//         i === fullStars &&
//         hasHalfStar
//       ) {
//         stars.push(
//           <div
//             key={i}
//             className="
//               relative
//               h-3
//               w-3
//             "
//           >
//             <Star
//               className="
//                 absolute
//                 h-3
//                 w-3
//                 text-gray-200
//               "
//             />

//             <div
//               className="
//                 absolute
//                 left-0
//                 top-0
//                 h-3
//                 w-1/2
//                 overflow-hidden
//               "
//             >
//               <Star
//                 className="
//                   h-3
//                   w-3
//                   fill-current
//                   text-yellow-400
//                 "
//               />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(
//           <Star
//             key={i}
//             className="
//               h-3
//               w-3
//               text-[#F7C7D3]
//             "
//           />
//         );
//       }
//     }

//     return stars;
//   };

//   // =========================================================
//   // TAG ICON
//   // =========================================================

//   const getTagIcon = () => {
//     if (!primaryTag) {
//       return null;
//     }

//     const name =
//       primaryTag.toLowerCase();

//     if (
//       name.includes('best') ||
//       name.includes('seller')
//     ) {
//       return (
//         <Star className="
//           h-2.5
//           w-2.5
//           fill-current
//         " />
//       );
//     }

//     if (
//       name.includes('trend')
//     ) {
//       return (
//         <Flame className="
//           h-2.5
//           w-2.5
//         " />
//       );
//     }

//     if (
//       name.includes('new')
//     ) {
//       return (
//         <Sparkles className="
//           h-2.5
//           w-2.5
//         " />
//       );
//     }

//     if (
//       name.includes('sale') ||
//       name.includes('offer')
//     ) {
//       return (
//         <Zap className="
//           h-2.5
//           w-2.5
//         " />
//       );
//     }

//     return (
//       <Tag className="
//         h-2.5
//         w-2.5
//       " />
//     );
//   };

//   // =========================================================
//   // RETURN
//   // =========================================================

//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 20
//       }}
//       whileInView={{
//         opacity: 1,
//         y: 0
//       }}
//       viewport={{
//         once: true
//       }}
//       transition={{
//         duration: 0.4
//       }}
//       className="group w-full"
//       onMouseEnter={() =>
//         setIsHovered(true)
//       }
//       onMouseLeave={() =>
//         setIsHovered(false)
//       }
//     >
//       <Link
//         href={`/product/${
//           product?.slug ||
//           productId
//         }`}
//         className="block h-full"
//       >
//         <article
//           className="
//             relative
//             flex
//             h-full
//             flex-col
//             overflow-hidden
//             rounded-2xl
//             border
//             border-[#F7C7D3]/30
//             bg-white
//             p-2
//             shadow-[0_2px_9px_rgba(238,66,117,0.06)]
//             transition-all
//             duration-300
//             hover:-translate-y-1.5
//             hover:border-[#F7C7D3]
//             hover:shadow-[0_18px_40px_rgba(238,66,117,0.12)]
//           "
//         >

//           {/* =====================================================
//               PRODUCT IMAGE SECTION
//           ====================================================== */}

//           <div
//             className="
//               relative
//               overflow-hidden
//               rounded-xl
//               bg-[#F7C7D3]/10
//             "
//           >

//             <div
//               className="
//                 relative
//                 aspect-square
//                 w-full
//                 overflow-hidden
//               "
//             >

//               {/* PRODUCT IMAGE */}

//               <Image
//                 src={getCurrentImage()}
//                 alt={productName}
//                 fill
//                 sizes="
//                   (max-width: 640px) 50vw,
//                   (max-width: 768px) 33vw,
//                   (max-width: 1024px) 25vw,
//                   20vw
//                 "
//                 className="
//                   object-contain
//                   p-4
//                   transition-transform
//                   duration-500
//                   ease-out
//                   group-hover:scale-[1.06]
//                 "
//                 onError={() =>
//                   handleImageError(
//                     activeIndex
//                   )
//                 }
//                 priority={
//                   activeIndex === 0
//                 }
//                 quality={90}
//               />

//               {/* =================================================
//                   DISCOUNT BADGE
//               ================================================== */}

//               {discountPercent > 0 && (
//                 <motion.div
//                   className="
//                     absolute
//                     left-2
//                     top-2
//                     z-10
//                   "
//                   animate={
//                     isHovered
//                       ? {
//                           scale: [
//                             1,
//                             1.05,
//                             1
//                           ],
//                           rotate: [
//                             0,
//                             -2,
//                             2,
//                             0
//                           ]
//                         }
//                       : {}
//                   }
//                   transition={{
//                     duration: 0.5,
//                     repeat:
//                       isHovered
//                         ? Infinity
//                         : 0,
//                     repeatDelay: 1
//                   }}
//                 >
//                   <div
//                     className="
//                       relative
//                       flex
//                       h-12
//                       w-10
//                       items-start
//                       justify-center
//                       overflow-hidden
//                       bg-[#EE4275]
//                       px-1
//                       pt-2
//                       text-center
//                       text-[9px]
//                       font-bold
//                       uppercase
//                       leading-[0.9]
//                       tracking-wide
//                       text-white
//                     "
//                     style={{
//                       clipPath:
//                         'polygon(0 0, 100% 0, 100% 100%, 85% 91%, 70% 100%, 55% 91%, 40% 100%, 25% 91%, 0 100%)',
//                       fontFamily:
//                         FONT_FAMILY
//                     }}
//                   >

//                     {/* SHIMMER */}

//                     {isHovered && (
//                       <motion.div
//                         className="
//                           absolute
//                           inset-0
//                           -skew-x-12
//                           bg-gradient-to-r
//                           from-transparent
//                           via-white/30
//                           to-transparent
//                         "
//                         initial={{
//                           x: '-100%'
//                         }}
//                         animate={{
//                           x: '200%'
//                         }}
//                         transition={{
//                           duration: 1.5,
//                           repeat: Infinity,
//                           ease: 'easeInOut'
//                         }}
//                       />
//                     )}

//                     <span
//                       className="
//                         relative
//                         z-10
//                         block
//                         leading-tight
//                       "
//                     >
//                       {discountPercent}%
//                       <br />
//                       OFF
//                     </span>

//                   </div>
//                 </motion.div>
//               )}

//               {/* =================================================
//                   TAG BADGE
//               ================================================== */}

//               {primaryTag && (
//                 <div
//                   className="
//                     absolute
//                     right-2
//                     top-2
//                     z-10
//                     flex
//                     items-center
//                     gap-1
//                     rounded
//                     bg-black/80
//                     px-2
//                     py-1
//                     text-[9px]
//                     font-medium
//                     text-white
//                     backdrop-blur-sm
//                   "
//                 >
//                   <Sparkles
//                     className="
//                       h-2.5
//                       w-2.5
//                     "
//                   />

//                   <span
//                     style={{
//                       fontFamily:
//                         FONT_FAMILY
//                     }}
//                   >
//                     {primaryTag}
//                   </span>
//                 </div>
//               )}

//               {/* =================================================
//                   OUT OF STOCK
//               ================================================== */}

//               {isOutOfStock && (
//                 <div
//                   className="
//                     absolute
//                     inset-0
//                     z-20
//                     flex
//                     items-center
//                     justify-center
//                     rounded-xl
//                     bg-black/60
//                   "
//                 >
//                   <span
//                     className="
//                       rounded-full
//                       bg-black
//                       px-3
//                       py-1.5
//                       text-xs
//                       font-medium
//                       text-white
//                     "
//                     style={{
//                       fontFamily:
//                         FONT_FAMILY
//                     }}
//                   >
//                     Out of Stock
//                   </span>
//                 </div>
//               )}

//               {/* =================================================
//                   LOW STOCK
//               ================================================== */}

//               {!isOutOfStock &&
//                 isLowStock && (
//                   <div
//                     className="
//                       absolute
//                       bottom-2
//                       left-2
//                       z-10
//                       flex
//                       items-center
//                       gap-1
//                       rounded
//                       bg-orange-500
//                       px-2
//                       py-1
//                       text-[9px]
//                       font-medium
//                       text-white
//                     "
//                   >
//                     <AlertTriangle
//                       className="
//                         h-2.5
//                         w-2.5
//                       "
//                     />

//                     <span
//                       style={{
//                         fontFamily:
//                           FONT_FAMILY
//                       }}
//                     >
//                       Only {stockQuantity} left
//                     </span>
//                   </div>
//                 )}

//               {/* =================================================
//                   DESKTOP HOVER ACTIONS
//               ================================================== */}

//               {!isMobile && (
//                 <div
//                   className={`
//                     absolute
//                     right-2
//                     top-1/2
//                     z-30
//                     flex
//                     -translate-y-1/2
//                     flex-col
//                     gap-2
//                     transition-all
//                     duration-300
//                     ${
//                       isHovered
//                         ? 'translate-x-0 opacity-100'
//                         : 'translate-x-2 opacity-0'
//                     }
//                   `}
//                 >

//                   {/* VIEW */}

//                   <motion.button
//                     type="button"
//                     whileHover={{
//                       scale: 1.1
//                     }}
//                     whileTap={{
//                       scale: 0.9
//                     }}
//                     className="
//                       flex
//                       h-8
//                       w-8
//                       items-center
//                       justify-center
//                       rounded-full
//                       border
//                       border-[#F7C7D3]/30
//                       bg-white
//                       text-gray-700
//                       shadow-md
//                       transition-all
//                       hover:bg-[#EE4275]
//                       hover:text-white
//                     "
//                     aria-label="View product"
//                   >
//                     <Eye
//                       className="
//                         h-3.5
//                         w-3.5
//                       "
//                     />
//                   </motion.button>

//                   {/* CART */}

//                   <motion.button
//                     type="button"
//                     onClick={
//                       handleAddToCart
//                     }
//                     disabled={
//                       isOutOfStock ||
//                       cartStatusLoading
//                     }
//                     whileHover={{
//                       scale: 1.1
//                     }}
//                     whileTap={{
//                       scale: 0.9
//                     }}
//                     className={`
//                       flex
//                       h-8
//                       w-8
//                       items-center
//                       justify-center
//                       rounded-full
//                       border
//                       border-[#F7C7D3]/30
//                       bg-white
//                       shadow-md
//                       transition-all
//                       hover:bg-[#EE4275]
//                       hover:text-white
//                       ${
//                         cartStatusLoading
//                           ? 'pointer-events-none opacity-50'
//                           : ''
//                       }
//                     `}
//                     aria-label="Add to cart"
//                   >
//                     {cartStatusLoading ? (
//                       <Loader2
//                         className="
//                           h-3.5
//                           w-3.5
//                           animate-spin
//                         "
//                       />
//                     ) : (
//                       <ShoppingCart
//                         className="
//                           h-3.5
//                           w-3.5
//                         "
//                       />
//                     )}
//                   </motion.button>

//                 </div>
//               )}

//               {/* =================================================
//                   MOBILE ACTIONS
//               ================================================== */}

//               {isMobile && (
//                 <div
//                   className="
//                     absolute
//                     bottom-10
//                     left-1/2
//                     z-30
//                     flex
//                     -translate-x-1/2
//                     gap-2
//                   "
//                 >

//                   {/* VIEW */}

//                   <div
//                     className="
//                       flex
//                       h-8
//                       w-8
//                       items-center
//                       justify-center
//                       rounded-full
//                       border
//                       border-[#F7C7D3]/30
//                       bg-white/90
//                       shadow-md
//                       backdrop-blur-sm
//                     "
//                   >
//                     <Eye
//                       className="
//                         h-3.5
//                         w-3.5
//                         text-gray-700
//                       "
//                     />
//                   </div>

//                   {/* CART */}

//                   <div
//                     onClick={
//                       handleAddToCart
//                     }
//                     className={`
//                       flex
//                       h-8
//                       w-8
//                       items-center
//                       justify-center
//                       rounded-full
//                       border
//                       bg-white/90
//                       shadow-md
//                       backdrop-blur-sm
//                       ${
//                         isOutOfStock
//                           ? 'border-gray-200 bg-gray-100'
//                           : 'border-[#F7C7D3]/30'
//                       }
//                     `}
//                   >
//                     {cartStatusLoading ? (
//                       <Loader2
//                         className="
//                           h-3.5
//                           w-3.5
//                           animate-spin
//                           text-gray-500
//                         "
//                       />
//                     ) : (
//                       <ShoppingCart
//                         className={`
//                           h-3.5
//                           w-3.5
//                           ${
//                             isInCart
//                               ? 'text-[#EE4275]'
//                               : 'text-black'
//                           }
//                         `}
//                       />
//                     )}
//                   </div>

//                 </div>
//               )}

//               {/* =================================================
//                   IMAGE NAVIGATION
//               ================================================== */}

//               {hasMultipleImages && (
//                 <div
//                   className="
//                     absolute
//                     bottom-2
//                     left-1/2
//                     z-20
//                     flex
//                     -translate-x-1/2
//                     items-center
//                     gap-2
//                   "
//                 >

//                   {/* PREVIOUS */}

//                   <motion.button
//                     type="button"
//                     onClick={
//                       prevImage
//                     }
//                     className="
//                       rounded-full
//                       p-0.5
//                     "
//                     aria-label="Previous image"
//                     whileHover={{
//                       scale: 1.2
//                     }}
//                     whileTap={{
//                       scale: 0.9
//                     }}
//                   >
//                     <ChevronLeft
//                       className="
//                         h-4
//                         w-4
//                         text-[#EE4275]
//                       "
//                     />
//                   </motion.button>

//                   {/* DOTS */}

//                   <div
//                     className="
//                       flex
//                       items-center
//                       gap-1.5
//                     "
//                   >
//                     {productImages.map(
//                       (_, index) => (
//                         <motion.button
//                           key={index}
//                           type="button"
//                           onClick={(e) =>
//                             goToImage(
//                               e,
//                               index
//                             )
//                           }
//                           className={`
//                             rounded-full
//                             transition-all
//                             duration-200
//                             ${
//                               activeIndex ===
//                               index
//                                 ? 'h-2 w-2 bg-gradient-to-r from-[#EE4275] to-[#9B59B6]'
//                                 : 'h-1.5 w-1.5 bg-[#F7C7D3]/60 hover:bg-[#EE4275]/50'
//                             }
//                           `}
//                           whileHover={{
//                             scale: 1.3
//                           }}
//                           aria-label={`Go to image ${
//                             index + 1
//                           }`}
//                         />
//                       )
//                     )}
//                   </div>

//                   {/* NEXT */}

//                   <motion.button
//                     type="button"
//                     onClick={
//                       nextImage
//                     }
//                     className="
//                       rounded-full
//                       p-0.5
//                     "
//                     aria-label="Next image"
//                     whileHover={{
//                       scale: 1.2
//                     }}
//                     whileTap={{
//                       scale: 0.9
//                     }}
//                   >
//                     <ChevronRight
//                       className="
//                         h-4
//                         w-4
//                         text-[#9B59B6]
//                       "
//                     />
//                   </motion.button>

//                 </div>
//               )}

//             </div>
//           </div>

//           {/* =====================================================
//               PRODUCT INFORMATION
//           ====================================================== */}

//           <div
//             className="
//               flex
//               flex-1
//               flex-col
//               px-1.5
//               pb-1
//               pt-3
//             "
//           >

//             {/* BRAND + STOCK STATUS */}

//             <div
//               className="
//                 mb-1
//                 flex
//                 items-center
//                 justify-between
//                 gap-2
//               "
//             >
//               {/* BRAND */}
//               <span
//                 className="
//                   min-w-0
//                   truncate
//                   text-[8px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.12em]
//                   text-[#EE4275]
//                 "
//                 style={{
//                   fontFamily: FONT_FAMILY
//                 }}
//               >
//                 {brand}
//               </span>

//               {/* STOCK STATUS */}
//               <div
//                 className="
//                   flex
//                   shrink-0
//                   items-center
//                   gap-1
//                 "
//               >
//                 <span
//                   className={`
//                     h-1.5
//                     w-1.5
//                     rounded-full
//                     ${
//                       stockQuantity > 0
//                         ? 'bg-emerald-500'
//                         : 'bg-red-500'
//                     }
//                   `}
//                 />

//                 <span
//                   className={`
//                     text-[8px]
//                     font-medium
//                     ${
//                       stockQuantity > 0
//                         ? 'text-emerald-600'
//                         : 'text-red-500'
//                     }
//                   `}
//                   style={{
//                     fontFamily: FONT_FAMILY
//                   }}
//                 >
//                   {stockQuantity > 0
//                     ? 'In Stock'
//                     : 'Out of Stock'}
//                 </span>
//               </div>
//             </div>

//             {/* PRODUCT NAME */}

//             <h3
//               className="
//                 min-h-[34px]
//                 line-clamp-2
//                 text-[13px]
//                 font-semibold
//                 leading-[1.3]
//                 text-gray-800
//                 transition-colors
//                 group-hover:text-[#EE4275]
//               "
//               style={{
//                 fontFamily:
//                   FONT_FAMILY
//               }}
//               title={productName}
//             >
//               {truncateText(
//                 productName,
//                 45
//               )}
//             </h3>

//             {/* RATING */}

//             <div
//               className="
//                 mt-2
//                 flex
//                 items-center
//                 gap-1.5
//               "
//             >
//               <div
//                 className="
//                   flex
//                   items-center
//                   gap-0.5
//                 "
//               >
//                 {renderStars()}
//               </div>

//               <span
//                 className="
//                   text-[9px]
//                   font-medium
//                   text-gray-500
//                 "
//                 style={{
//                   fontFamily:
//                     FONT_FAMILY
//                 }}
//               >
//                 {rating.toFixed(1)}
//               </span>

//               {reviewCount > 0 && (
//                 <>
//                   <span className="text-gray-300">
//                     •
//                   </span>

//                   <span
//                     className="
//                       text-[9px]
//                       text-gray-400
//                     "
//                     style={{
//                       fontFamily:
//                         FONT_FAMILY
//                     }}
//                   >
//                     {reviewCount} reviews
//                   </span>
//                 </>
//               )}
//             </div>

//             {/* DIVIDER */}

//             <div
//               className="
//                 my-2.5
//                 h-px
//                 bg-gray-100
//               "
//             />

//             {/* PRICE + CART */}

//             <div
//               className="
//                 mt-auto
//                 flex
//                 items-center
//                 justify-between
//                 gap-2
//                 pt-1
//               "
//             >
//               {/* PRICE */}
//               <div
//                 className="
//                   flex
//                   min-w-0
//                   items-center
//                   gap-1.5
//                   whitespace-nowrap
//                 "
//               >
//                 {/* CURRENT PRICE */}
//                 <span
//                   className="
//                     text-[15px]
//                     font-bold
//                     tracking-tight
//                     text-gray-900
//                   "
//                   style={{
//                     fontFamily: FONT_FAMILY
//                   }}
//                 >
//                   ৳{formatPrice(currentPrice)}
//                 </span>

//                 {/* ORIGINAL PRICE */}
//                 {discountPercent > 0 && (
//                   <span
//                     className="
//                       text-[8px]
//                       text-gray-400
//                       line-through
//                     "
//                     style={{
//                       fontFamily: FONT_FAMILY
//                     }}
//                   >
//                     ৳{formatPrice(originalPrice)}
//                   </span>
//                 )}

//                 {/* SAVE */}
//                 {discountPercent > 0 && (
//                   <span
//                     className="
//                       text-[8px]
//                       font-semibold
//                       text-[#EE4275]
//                     "
//                     style={{
//                       fontFamily: FONT_FAMILY
//                     }}
//                   >
//                     Save {discountPercent}%
//                   </span>
//                 )}
//               </div>

//               {/* CART BUTTON */}
//               <motion.button
//                 type="button"
//                 onClick={handleAddToCart}
//                 disabled={isOutOfStock || cartStatusLoading}
//                 onMouseEnter={() =>
//                   setIsCartHovered(true)
//                 }
//                 onMouseLeave={() =>
//                   setIsCartHovered(false)
//                 }
//                 whileHover={
//                   !isOutOfStock
//                     ? { scale: 1.08 }
//                     : {}
//                 }
//                 whileTap={
//                   !isOutOfStock
//                     ? { scale: 0.92 }
//                     : {}
//                 }
//                 animate={
//                   isCartHovered && !isOutOfStock
//                     ? {
//                         rotate: [
//                           0,
//                           -10,
//                           10,
//                           -6,
//                           6,
//                           0
//                         ]
//                       }
//                     : {}
//                 }
//                 transition={{
//                   duration: 0.5
//                 }}
//                 aria-label={
//                   isInCart
//                     ? 'View cart'
//                     : 'Add to cart'
//                 }
//                 className={`
//                   flex
//                   h-8
//                   w-8
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-full
//                   transition-all
//                   duration-200

//                   ${
//                     isInCart
//                       ? 'bg-[#EE4275] text-white shadow-[0_4px_12px_rgba(238,66,117,0.22)]'
//                       : isOutOfStock
//                       ? 'cursor-not-allowed bg-gray-100 text-gray-300'
//                       : 'border border-[#F7C7D3] bg-white text-[#EE4275] hover:border-[#EE4275] hover:bg-[#EE4275] hover:text-white hover:shadow-[0_4px_12px_rgba(238,66,117,0.18)]'
//                   }
//                 `}
//               >
//                 {cartStatusLoading ? (
//                   <Loader2
//                     className="
//                       h-3.5
//                       w-3.5
//                       animate-spin
//                     "
//                   />
//                 ) : (
//                   <ShoppingCart
//                     className="
//                       h-3.5
//                       w-3.5
//                     "
//                   />
//                 )}
//               </motion.button>
//             </div>

//           </div>

//         </article>
//       </Link>
//     </motion.div>
//   );
// };

// Product Card Component - Updated for mobile
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
              h-2.5 sm:h-3
              w-2.5 sm:w-3
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
              h-2.5 sm:h-3
              w-2.5 sm:w-3
            "
          >
            <Star
              className="
                absolute
                h-2.5 sm:h-3
                w-2.5 sm:w-3
                text-gray-200
              "
            />

            <div
              className="
                absolute
                left-0
                top-0
                h-2.5 sm:h-3
                w-1/2
                overflow-hidden
              "
            >
              <Star
                className="
                  h-2.5 sm:h-3
                  w-2.5 sm:w-3
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
              h-2.5 sm:h-3
              w-2.5 sm:w-3
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
            p-1.5 sm:p-2
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
                  p-2 sm:p-4
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
                  DISCOUNT BADGE - Smaller on mobile
              ================================================== */}

              {discountPercent > 0 && (
                <motion.div
                  className="
                    absolute
                    left-1.5 sm:left-2
                    top-1.5 sm:top-2
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
                      h-9 sm:h-12
                      w-7 sm:w-10
                      items-start
                      justify-center
                      overflow-hidden
                      bg-[#EE4275]
                      px-0.5 sm:px-1
                      pt-1 sm:pt-2
                      text-center
                      text-[7px] sm:text-[9px]
                      font-bold
                      uppercase
                      leading-[0.8] sm:leading-[0.9]
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
                  TAG BADGE - Smaller on mobile
              ================================================== */}

              {primaryTag && (
                <div
                  className="
                    absolute
                    right-1.5 sm:right-2
                    top-1.5 sm:top-2
                    z-10
                    flex
                    items-center
                    gap-0.5 sm:gap-1
                    rounded
                    bg-black/80
                    px-1 sm:px-2
                    py-0.5 sm:py-1
                    text-[7px] sm:text-[9px]
                    font-medium
                    text-white
                    backdrop-blur-sm
                  "
                >
                  <Sparkles
                    className="
                      h-1.5 w-1.5 sm:h-2.5 sm:w-2.5
                    "
                  />

                  <span
                    className="truncate max-w-[25px] sm:max-w-none"
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
                      px-2 sm:px-3
                      py-1 sm:py-1.5
                      text-[10px] sm:text-xs
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
                  LOW STOCK - Smaller on mobile
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
                      gap-0.5 sm:gap-1
                      rounded
                      bg-orange-500
                      px-1 sm:px-2
                      py-0.5 sm:py-1
                      text-[7px] sm:text-[9px]
                      font-medium
                      text-white
                    "
                  >
                    <AlertTriangle
                      className="
                        h-1.5 w-1.5 sm:h-2.5 sm:w-2.5
                      "
                    />

                    <span
                      className="hidden xs:inline"
                      style={{
                        fontFamily:
                          FONT_FAMILY
                      }}
                    >
                      Only {stockQuantity} left
                    </span>
                    <span
                      className="xs:hidden"
                      style={{
                        fontFamily:
                          FONT_FAMILY
                      }}
                    >
                      {stockQuantity} left
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
                    ) : isInCart ? (
                      <ShoppingCart
                        className="
                          h-3.5
                          w-3.5
                          text-green-500
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
                  MOBILE ACTIONS - Smaller & Lower
              ================================================== */}

              {isMobile && (
                <div
                  className="
                    absolute
                    bottom-2
                    left-1/2
                    z-30
                    flex
                    -translate-x-1/2
                    gap-2
                  "
                >

                  {/* VIEW */}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.location.href = `/product/${product?.slug || productId}`;
                    }}
                    className="
                      flex
                      h-6 w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-white/80
                      shadow-md
                      backdrop-blur-sm
                      border
                      border-[#F7C7D3]/30
                    "
                    aria-label="View product"
                  >
                    <Eye
                      className="
                        h-2.5 w-2.5
                        text-gray-700
                      "
                    />
                  </button>

                  {/* CART */}

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || cartStatusLoading}
                    className={`
                      flex
                      h-6 w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-white/80
                      shadow-md
                      backdrop-blur-sm
                      border
                      ${
                        isOutOfStock
                          ? 'border-gray-200 bg-gray-100/80'
                          : 'border-[#F7C7D3]/30'
                      }
                    `}
                    aria-label="Add to cart"
                  >
                    {cartStatusLoading ? (
                      <Loader2
                        className="
                          h-2.5 w-2.5
                          animate-spin
                          text-gray-500
                        "
                      />
                    ) : (
                      <ShoppingCart
                        className={`
                          h-2.5 w-2.5
                          ${
                            isInCart
                              ? 'text-[#EE4275]'
                              : 'text-gray-700'
                          }
                        `}
                      />
                    )}
                  </button>

                </div>
              )}

              {/* =================================================
                  IMAGE NAVIGATION - Smaller on mobile
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
                    gap-1 sm:gap-2
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
                        h-3 w-3 sm:h-4 sm:w-4
                        text-[#EE4275]
                      "
                    />
                  </motion.button>

                  {/* DOTS - Smaller on mobile */}

                  <div
                    className="
                      flex
                      items-center
                      gap-0.5 sm:gap-1.5
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
                                ? 'h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]'
                                : 'h-1 w-1 sm:h-1.5 sm:w-1.5 bg-[#F7C7D3]/60 hover:bg-[#EE4275]/50'
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
                        h-3 w-3 sm:h-4 sm:w-4
                        text-[#FF6B9D]
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
              px-1 sm:px-1.5
              pb-1
              pt-1.5 sm:pt-3
            "
          >

            {/* BRAND + STOCK STATUS - Smaller on mobile */}

            <div
              className="
                mb-0.5 sm:mb-1
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
                  text-[7px] sm:text-[8px]
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
                  gap-0.5 sm:gap-1
                "
              >
                <span
                  className={`
                    h-1 w-1 sm:h-1.5 sm:w-1.5
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
                    text-[6px] sm:text-[8px]
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

            {/* PRODUCT NAME - Smaller on mobile */}

            <h3
              className="
                min-h-[26px] sm:min-h-[34px]
                line-clamp-2
                text-[11px] sm:text-[13px]
                font-semibold
                leading-[1.2] sm:leading-[1.3]
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
                35
              )}
            </h3>

            {/* RATING - Smaller on mobile */}

            <div
              className="
                mt-1 sm:mt-2
                flex
                items-center
                gap-0.5 sm:gap-1.5
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
                  text-[8px] sm:text-[9px]
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
                  <span className="text-gray-300 hidden xs:inline">
                    •
                  </span>

                  <span
                    className="
                      text-[7px] sm:text-[9px]
                      text-gray-400
                      hidden xs:inline
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

            {/* DIVIDER - Thinner on mobile */}

            <div
              className="
                my-1.5 sm:my-2.5
                h-px
                bg-gradient-to-r
                from-[#F7C7D3]/30
                to-transparent
              "
            />

            {/* PRICE + CART - Smaller on mobile */}

            <div
              className="
                mt-auto
                flex
                items-center
                justify-between
                gap-2
                pt-0.5 sm:pt-1
              "
            >
              {/* PRICE */}
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-1 sm:gap-1.5
                  whitespace-nowrap
                "
              >
                {/* CURRENT PRICE */}
                <span
                  className="
                    text-[13px] sm:text-[15px]
                    font-bold
                    tracking-tight
                    text-[#EE4275]
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
                      text-[6px] sm:text-[8px]
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

                {/* SAVE - Hide on mobile */}
                {discountPercent > 0 && (
                  <span
                    className="
                      text-[6px] sm:text-[8px]
                      font-semibold
                      text-white
                      bg-gradient-to-r
                      from-[#EE4275]
                      to-[#FF6B9D]
                      px-0.5 sm:px-1
                      py-0.5
                      rounded
                      hidden sm:inline-block
                    "
                    style={{
                      fontFamily: FONT_FAMILY
                    }}
                  >
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* CART BUTTON - Smaller on mobile */}
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
                  h-6 w-6 sm:h-8 sm:w-8
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
                      h-2.5 w-2.5 sm:h-3.5 sm:w-3.5
                      animate-spin
                    "
                  />
                ) : (
                  <ShoppingCart
                    className="
                      h-2.5 w-2.5 sm:h-3.5 sm:w-3.5
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

// Main Featured Products Component - WITH PAGINATION
export default function FeaturedProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const [activeTag, setActiveTag] = useState('all');
  const [availableTags, setAvailableTags] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const productsPerPage = 4; // Same as beauty featured products

  // Default banner image
  const DEFAULT_BANNER_IMAGE = '/images/featured-banner2.jpg';

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Get tag image for banner
  const getTagImage = (tagId) => {
    if (tagId === 'all') return DEFAULT_BANNER_IMAGE;
    const tag = availableTags.find(t => t._id === tagId);
    if (tag && typeof tag === 'object' && tag.image) {
      return tag.image.url || tag.image || DEFAULT_BANNER_IMAGE;
    }
    return DEFAULT_BANNER_IMAGE;
  };

  const getCurrentTagName = () => {
    if (activeTag === 'all') return 'All Products';
    const tag = availableTags.find(t => t._id === activeTag);
    return tag?.name || 'Products';
  };

  const getCurrentTagImage = () => {
    return getTagImage(activeTag);
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
    setCurrentPage(1); // Reset to first page when tag changes
  }, [activeTag, allProducts]); 
 
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

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
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
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF5F6]/30 to-white"> 
        <div className="container mx-auto px-4 py-16 flex justify-center items-center"> 
          <Loader2 className="w-8 h-8 animate-spin text-[#EE4275]" /> 
        </div> 
      </div> 
    ); 
  } 
 
  if (allProducts.length === 0) { 
    return null; 
  } 
 
  return ( 
    <> 
      {/* NEW LAYOUT - Matching Beauty Featured Products Style */}
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF5F6]/30 to-white">
        {/* Top Decorative Border */}
        <div className="w-full h-3 bg-gradient-to-r from-[#EE4275]/20 via-[#F7C7D3]/40 to-[#EE4275]/20"></div>

        {/* Main Content */}
        <div className="bg-white min-h-screen px-3 sm:px-8 pt-4 sm:pt-2 pb-0">
          <div className="container mx-auto max-w-7xl">
            
            {/* Header with Dynamic Tags - Professional Style */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-12 gap-3 sm:gap-4">
              <div className="flex flex-col items-start gap-1 -mb-1 lg:-mb-6">
                {/* Trending Badge - Separate line above */}
                <div className="inline-flex items-center gap-2 px-3 py-1 mt-2 md:mt-6 bg-[#F7C7D3]/30 rounded-full border border-[#F7C7D3]/40">
                  <Flame className="w-3.5 h-3.5 text-[#EE4275]" />
                  <span className="text-xs font-medium text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
                    Trending Now
                  </span>
                </div>
                {/* Featured Products - One line */}
                <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#2D1B2E] leading-none" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
                  <span className="text-[#EE4275]">Featured</span> Products
                </h1>
              </div>
               
              {/* Professional Tabs */}
              <nav className="flex gap-0 sm:gap-1 text-xs sm:text-sm font-medium overflow-x-auto pb-0 w-full sm:w-auto scrollbar-hide border-b border-[#F7C7D3]/30">
                {availableTags.map((tag) => (
                  <button
                    key={tag._id}
                    onClick={() => setActiveTag(tag._id)}
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 transition-all duration-300 whitespace-nowrap relative flex items-center gap-1.5 ${
                      activeTag === tag._id
                        ? 'text-[#EE4275] font-semibold'
                        : 'text-[#8B7A8C] hover:text-[#2D1B2E]'
                    }`}
                    style={{ fontFamily: FONT_FAMILY_CURSIVE }}
                  >
                    <span>{tag.name}</span>
                    {activeTag === tag._id && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE4275] rounded-full"></span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Container - Left Banner + Right Products */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mb-16 items-stretch">
              {/* Left Side - Featured Banner with Dynamic Tag Image */}
              <div className="w-[27.5%] lg:w-[27.5%] flex-shrink-0 h-[380px] hidden lg:block">
                <div
                  className="relative rounded-3xl w-full h-full overflow-hidden shadow-xl"
                  style={{
                    backgroundImage: `url(${getCurrentTagImage()})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Pink Gradient Overlay - Soft and elegant */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EE4275]/15 via-[#FF6B9D]/5 to-transparent z-10"></div>

                  {/* Pink Border Frame */}
                  <div className="absolute inset-2 rounded-2xl border border-[#EE4275]/20 z-10"></div>

                  {/* Inner Pink Glow */}
                  <div className="absolute inset-0 rounded-3xl shadow-inner shadow-[#EE4275]/10 z-10"></div>

                  {/* Floating Sparkles - Subtle animation */}
                  <motion.div
                    className="absolute top-1/3 right-8 z-20"
                    animate={{
                      y: [0, -8, 0],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-[#EE4275]/40" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-1/3 left-8 z-20"
                    animate={{
                      y: [0, 8, 0],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    <Sparkles className="w-2.5 h-2.5 text-[#FF6B9D]/40" />
                  </motion.div>

                  {/* Bottom overlay with tag name - Elegant pink gradient */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#EE4275]/80 via-[#EE4275]/40 to-transparent p-5 z-20"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-semibold" style={{ fontFamily: FONT_FAMILY }}>
                        {getCurrentTagName()}
                      </span>
                      <motion.div
                        animate={{
                          x: [0, 4, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <ArrowRight className="w-3 h-3 text-white/60" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Decorative line - Pink */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#EE4275]/40 to-transparent z-20"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#EE4275]/40 to-transparent z-20"></div>
                </div>
              </div>

              {/* Right Side - Product Grid */}
              <div className="flex-1">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl border border-[#F7C7D3]/40">
                    <Package className="w-12 h-12 text-[#F7C7D3] mx-auto mb-3" />
                    <p className="text-[#8B7A8C]" style={{ fontFamily: FONT_FAMILY }}>No products found in this category</p>
                  </div>
                ) : (
                  <>
                    {/* Grid: 2 columns on mobile, 4 columns on desktop */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-2 lg:grid-cols-4">
                      <AnimatePresence mode="wait">
                        {currentProducts.map((product) => (
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

                    {/* Pagination - Same as Beauty Featured Products */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-1 sm:gap-2 mt-6 sm:mt-8">
                        <button
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="p-1.5 sm:p-2 rounded-lg bg-white border border-[#F7C7D3]/40 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFF5F6] transition-colors"
                        >
                          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-[#EE4275]" />
                        </button>
                        <div className="flex gap-0.5 sm:gap-1">
                          {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                              return (
                                <button
                                  key={i}
                                  onClick={() => goToPage(pageNum)}
                                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                                    currentPage === pageNum
                                      ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-md shadow-[#EE4275]/25'
                                      : 'bg-white border border-[#F7C7D3]/40 text-[#8B7A8C] hover:text-[#EE4275] hover:border-[#EE4275]/50'
                                  }`}
                                  style={{ fontFamily: FONT_FAMILY }}
                                >
                                  {pageNum}
                                </button>
                              );
                            } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                              return <span key={i} className="text-[#C4B5C5] text-xs sm:text-sm">...</span>;
                            }
                            return null;
                          })}
                        </div>
                        <button
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="p-1.5 sm:p-2 rounded-lg bg-white border border-[#F7C7D3]/40 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFF5F6] transition-colors"
                        >
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#EE4275]" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Border */}
        <div className="w-full h-3 bg-gradient-to-r from-[#EE4275]/20 via-[#F7C7D3]/40 to-[#EE4275]/20"></div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
    </>
  );
}


