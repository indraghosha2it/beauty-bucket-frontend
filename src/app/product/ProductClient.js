

// 'use client';

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useSearchParams, useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Star,
//   ShoppingCart,
//   Truck,
//   ShieldCheck,
//   RotateCcw,
//   AlertCircle,
//   CheckCircle,
//   Minus,
//   Plus,
//   ZoomIn,
//   Sparkles,
//   Play,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Package,
//   Tag,
//   Clock,
//   Copy,
//   Check,
//   Loader2,
//   Eye,
//   FolderTree,
//   Maximize2,
//   Zap,
//   Info,
//   Award,
//   TrendingUp,
//   Flame,
//   Clock as ClockIcon,
//   Building2,
//   Box,
//   Scale,
//   List,
//   FileText,
//   AlertTriangle,
//   Palette,
//   HelpCircle,
//   ChevronDown,
//   Share2,
//   Heart,
//   Link as LinkIcon,
//   ShoppingBag,
//   MessageSquare,
//   ThumbsUp,
//   Filter,
//   Image as ImageIcon,
//   Video
// } from 'lucide-react';

// import { toast } from 'sonner';
// import Footer from '../components/layout/Footer';
// import Navbar from '../components/layout/Navbar';
// import MetadataUpdater from '../product/MetadataUpdater';
// import CartSidebar from '../components/CartSidebar';
// import ReviewModal from '../components/home/ReviewModal';
// import ReviewMediaModal from '../components/ReviewMediaModal';

// // ========== HELPER FUNCTIONS ==========

// // Helper function to get tag name safely from object or string
// const getTagName = (tag) => {
//   if (!tag) return '';
//   if (typeof tag === 'string') {
//     if (/^[0-9a-fA-F]{24}$/.test(tag)) {
//       return '';
//     }
//     return tag;
//   }
//   if (typeof tag === 'object') {
//     if (tag.name) return tag.name;
//     if (tag._id && typeof tag._id === 'object' && tag._id.name) {
//       return tag._id.name;
//     }
//     if (tag.title) return tag.title;
//     if (tag.label) return tag.label;
//     if (Array.isArray(tag) && tag.length > 0) {
//       return getTagName(tag[0]);
//     }
//     if (tag._id) {
//       if (typeof tag._id === 'string' && /^[0-9a-fA-F]{24}$/.test(tag._id)) {
//         return '';
//       }
//       if (typeof tag._id === 'object' && tag._id.name) {
//         return tag._id.name;
//       }
//     }
//     for (const key of ['value', 'text', 'display', 'title', 'label', 'name']) {
//       if (tag[key] && typeof tag[key] === 'string') {
//         return tag[key];
//       }
//     }
//   }
//   return String(tag);
// };

// const getTagStyles = (tag) => {
//   const tagName = getTagName(tag);
//   const styles = {
//     'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
//     'Trending': 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30',
//     'New Release': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30',
//     'Limited Offer': 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30',
//     'Flash Sale': 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/30',
//     'Clearance': 'bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg shadow-gray-500/30',
//   };
//   return styles[tagName] || 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30';
// };

// const formatPrice = (price) => {
//   return (price || 0).toFixed(2);
// };

// const calculateDiscount = (regular, discount) => {
//   if (regular && discount && discount < regular) {
//     return Math.round(((regular - discount) / regular) * 100);
//   }
//   return 0;
// };

// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// const getUnitLabel = (unit) => {
//   const units = {
//     'pcs': 'pcs',
//     'ton': 'ton',
//     'other': 'unit'
//   };
//   return units[unit] || unit;
// };

// const getStockStatus = (quantity, alertQuantity) => {
//   if (quantity <= 0) return { label: 'Out of Stock', color: 'red', icon: AlertCircle };
//   if (alertQuantity > 0 && quantity <= alertQuantity) return { label: 'Low Stock', color: 'orange', icon: AlertCircle };
//   return { label: 'In Stock', color: 'green', icon: CheckCircle };
// };

// const truncateText = (text, limit = 35) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// // ========== VIDEO HELPER FUNCTIONS ==========

// const getYouTubeThumbnail = (url) => {
//   if (!url) return null;
  
//   const patterns = [
//     /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\s?#]+)/,
//     /youtube\.com\/v\/([^&\s?#]+)/,
//     /youtube\.com\/live\/([^&\s?#]+)/
//   ];
  
//   for (const pattern of patterns) {
//     const match = url.match(pattern);
//     if (match && match[1]) {
//       return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
//     }
//   }
//   return null;
// };

// const generateVideoThumbnail = (videoUrl, callback) => {
//   const video = document.createElement('video');
//   video.crossOrigin = 'Anonymous';
//   video.src = videoUrl;
//   video.currentTime = 1.5;
  
//   video.addEventListener('loadeddata', () => {
//     setTimeout(() => {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
      
//       canvas.width = 160;
//       canvas.height = 160;
      
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
//       const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
//       callback(thumbnailUrl);
//     }, 100);
//   });
  
//   video.addEventListener('error', () => {
//     console.error('Error loading video for thumbnail generation');
//     callback(null);
//   });
  
//   video.load();
// };

// const processHtmlLinks = (html) => {
//   if (!html) return '';
  
//   const div = document.createElement('div');
//   div.innerHTML = html;
  
//   const links = div.querySelectorAll('a');
//   links.forEach(link => {
//     link.setAttribute('target', '_blank');
//     link.setAttribute('rel', 'noopener noreferrer');
//   });
  
//   return div.innerHTML;
// };

// // ========== LOADING SKELETON ==========

// const ProductSkeleton = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
//         <div className="animate-pulse">
//           <div className="bg-gray-200 rounded-2xl h-64 sm:h-80 md:h-96 w-full"></div>
//           <div className="flex gap-2 mt-3 md:mt-4">
//             {[1, 2, 3, 4].map(i => (
//               <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-lg"></div>
//             ))}
//           </div>
//         </div>
//         <div className="space-y-3 md:space-y-4 animate-pulse">
//           <div className="h-6 sm:h-7 md:h-8 bg-gray-200 rounded w-3/4"></div>
//           <div className="h-5 sm:h-5 md:h-6 bg-gray-200 rounded w-1/2"></div>
//           <div className="h-20 sm:h-24 md:h-24 bg-gray-200 rounded"></div>
//           <div className="h-10 bg-gray-200 rounded w-full"></div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // ========== ZOOM MODAL ==========

// const ZoomModal = ({ images, currentIndex, onClose, onImageChange }) => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
//     onClick={onClose}
//   >
//     <div className="relative w-full h-full flex items-center justify-center">
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
//       >
//         <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//       </button>
      
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onImageChange((currentIndex - 1 + images.length) % images.length);
//         }}
//         className="absolute left-2 sm:left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
//       >
//         <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//       </button>
      
//       <motion.div
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.9 }}
//         className="relative max-w-5xl w-full mx-2 sm:mx-4"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <img
//           src={images[currentIndex]?.url}
//           alt="Zoomed product"
//           className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-2xl"
//         />
//       </motion.div>
      
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onImageChange((currentIndex + 1) % images.length);
//         }}
//         className="absolute right-2 sm:right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
//       >
//         <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//       </button>
      
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
//         {currentIndex + 1} / {images.length}
//       </div>
//     </div>
//   </motion.div>
// );

// // ========== RELATED PRODUCT CARD ==========

// const RelatedProductCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
  
//   const isInCart = propIsInCart || false;
//   const productImages = product.images || [];
//   const hasMultipleImages = productImages.length > 1;
//   const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
//   const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
//   const originalPrice = product.regularPrice;
  
//   const isLowStock = product.stockAlertQuantity > 0 && product.stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = product.stockQuantity <= 0;
  
//   // ✅ FIXED: Safe tag extraction
//   const productTags = product.tags || [];
//   const tagNames = productTags.map(tag => {
//     if (typeof tag === 'string') return tag;
//     if (tag?.name) return tag.name;
//     if (tag && typeof tag === 'object' && tag.name) return tag.name;
//     return null;
//   }).filter(Boolean);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const navigateToProduct = () => {
//     router.push(`/product/${product.slug || product._id}`);
//   };

//   const addToCart = async (e) => {
//     e.stopPropagation();
//     e.preventDefault();
    
//     if (isInCart) {
//       onViewInCart();
//       return;
//     }
    
//     if (isOutOfStock) {
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
//         body: JSON.stringify({ productId: product._id, quantity: 1 })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         toast.success('Added to cart!', { id: toastId });
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

//   const getTagColor = (tagName) => {
//     const colors = {
//       'Best Seller': 'bg-yellow-500',
//       'Trending': 'bg-blue-500',
//       'New Release': 'bg-green-500',
//       'Limited Offer': 'bg-orange-500',
//       'Flash Sale': 'bg-red-500',
//       'Clearance': 'bg-pink-500'
//     };
//     return colors[tagName] || 'bg-gray-600';
//   };

//   const stripHtml = (html) => {
//     if (!html) return '';
//     const tmp = document.createElement('div');
//     tmp.innerHTML = html;
//     return tmp.textContent || tmp.innerText || '';
//   };

//   const shortDescription = product.shortDescription 
//     ? stripHtml(product.shortDescription).substring(0, 40) 
//     : '';

//   return (
//     <Link
//       href={`/product/${product.slug || product._id}`}
//       className="block group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
//     >
//       <div className="relative w-full h-40 overflow-hidden bg-gray-50">
//         <img
//           src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300?text=Product'}
//           alt={product.productName}
//           className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://via.placeholder.com/300?text=Product';
//           }}
//           loading="lazy"
//         />
        
//         {/* Discount Badge */}
//         {discountPercent > 0 && (
//           <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 z-20 flex items-center gap-0.5">
//             <Zap className="w-2.5 h-2.5" />
//             {discountPercent}%
//           </div>
//         )}
        
//         {/* Brand Badge on Image */}
//         {product.brand && (
//           <div className="absolute top-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 font-medium z-20 flex items-center gap-0.5">
//             <Building2 className="w-2 h-2" />
//             {product.brand}
//           </div>
//         )}
        
//         {/* ✅ FIXED: Tag Badges - Using extracted tag names */}
//         {tagNames.length > 0 && (
//           <div className="absolute top-2 right-2 flex flex-col gap-0.5 items-end">
//             {tagNames.slice(0, 2).map((tag, idx) => (
//               <span 
//                 key={idx}
//                 className={`${getTagColor(tag)} text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg uppercase tracking-wider`}
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}
        
//         {/* Out of Stock Overlay */}
//         {isOutOfStock && (
//           <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
//             <span className="bg-black text-white text-xs font-medium px-2 py-1">Out of Stock</span>
//           </div>
//         )}
        
//         {/* Low Stock Badge */}
//         {!isOutOfStock && isLowStock && (
//           <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-[9px] font-medium px-1.5 py-0.5 z-20 flex items-center gap-0.5">
//             <AlertTriangle className="w-2 h-2" />
//             Only {product.stockQuantity} left
//           </div>
//         )}
        
//         {/* Mobile: Always visible icons at bottom center */}
//         {isMobile && (
//           <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-30">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 e.preventDefault();
//                 navigateToProduct();
//               }}
//               className="bg-white p-1.5 shadow-md inline-flex items-center justify-center"
//             >
//               <Eye className="w-3.5 h-3.5 text-gray-700" />
//             </button>
//             <button
//               onClick={addToCart}
//               disabled={isOutOfStock}
//               className={`p-1.5 shadow-md ${isOutOfStock ? 'bg-gray-100' : 'bg-white'}`}
//             >
//               {cartStatusLoading ? (
//                 <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-500" />
//               ) : isInCart ? (
//                 <ShoppingCart className="w-3.5 h-3.5 text-black" />
//               ) : (
//                 <ShoppingCart className="w-3.5 h-3.5 text-black" />
//               )}
//             </button>
//           </div>
//         )}
        
//         {/* Desktop: Hover Icons */}
//         {!isMobile && (
//           <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 e.preventDefault();
//                 navigateToProduct();
//               }}
//               className="w-7 h-7 bg-white shadow-md hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-200"
//             >
//               <Eye className="w-3.5 h-3.5 text-gray-700 hover:text-white transition-colors" />
//             </button>
            
//             <button
//               onClick={addToCart}
//               disabled={isOutOfStock}
//               className="w-7 h-7 bg-white shadow-md hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-200"
//             >
//               {cartStatusLoading ? (
//                 <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-700" />
//               ) : isInCart ? (
//                 <ShoppingCart className="w-3.5 h-3.5 text-black hover:text-white transition-colors" />
//               ) : (
//                 <ShoppingCart className="w-3.5 h-3.5 text-gray-700 hover:text-white transition-colors" />
//               )}
//             </button>
//           </div>
//         )}
//       </div>
      
//       {/* Thumbnail Images - 4 thumbnails */}
//       {hasMultipleImages && !isMobile && (
//         <div className="flex justify-center items-center gap-1 py-1.5 bg-gray-50 border-b border-gray-100">
//           {productImages.slice(0, 4).map((image, index) => (
//             <button
//               key={index}
//               className={`w-6 h-6 overflow-hidden transition-all duration-200 ${
//                 activeIndex === index ? 'ring-1 ring-black ring-offset-1' : 'opacity-60 hover:opacity-100'
//               }`}
//               onMouseEnter={() => setActiveIndex(index)}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 e.preventDefault();
//                 setActiveIndex(index);
//               }}
//             >
//               <img src={image.url} alt="" className="w-full h-full object-cover" />
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Content - Centered */}
//       <div className="p-2.5 text-center">
//         {/* Product Name */}
//         <h3 className="text-xs font-medium text-gray-900 truncate mb-1" title={product.productName}>
//           {truncateText(product.productName, 35)}
//         </h3>

//         {/* Price with Unit */}
//         <div className="flex items-baseline justify-center gap-1.5 mb-1.5">
//           <span className="text-sm font-bold text-black">
//             ৳{formatPrice(currentPrice)}
//           </span>
//           {discountPercent > 0 && (
//             <>
//               <span className="text-[9px] text-gray-400 line-through">
//                 ৳{formatPrice(originalPrice)}
//               </span>
//             </>
//           )}
//           <span className="text-[9px] text-gray-500">/{getUnitLabel(product.unit)}</span>
//         </div>

//         {/* Stock Status - Centered */}
//         <div className="mb-1.5 flex justify-center">
//           {isOutOfStock ? (
//             <span className="inline-flex items-center gap-1 text-red-600 text-[9px] font-medium">
//               <div className="w-1 h-1 bg-red-500 rounded-full"></div>
//               Out of Stock
//             </span>
//           ) : isLowStock ? (
//             <span className="inline-flex items-center gap-1 text-orange-600 text-[9px] font-medium">
//               <AlertTriangle className="w-2 h-2" />
//               Only {product.stockQuantity} left
//             </span>
//           ) : (
//             <span className="inline-flex items-center gap-1 text-green-600 text-[9px] font-medium">
//               <div className="w-1 h-1 bg-green-500 rounded-full"></div>
//               In Stock 
//             </span>
//           )}
//         </div>
//       </div>

//       {/* ✅ FIXED: Different colors for Add to Cart vs View in Cart */}
//       <button
//         onClick={addToCart}
//         disabled={isOutOfStock}
//         className={`w-full py-1.5 text-center text-[10px] font-medium transition-colors flex items-center justify-center gap-1 ${
//           isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 
//           isInCart ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-700' : 
//           'bg-black text-white hover:bg-gray-800'
//         }`}
//       >
//         {cartStatusLoading ? (
//           <Loader2 className="w-3 h-3 animate-spin" />
//         ) : isInCart ? (
//           <>
//             <ShoppingCart className="w-3 h-3" />
//             View in Cart
//           </>
//         ) : (
//           <>
//             <ShoppingCart className="w-3 h-3" />
//             Add to Cart
//           </>
//         )}
//       </button>
//     </Link>
//   );
// };

// // ========== REVIEW COMPONENT ==========

// const ReviewItem = ({ review, isOwner }) => {
//   const [helpfulCount, setHelpfulCount] = useState(review.helpful || 0);
//   const [isHelpful, setIsHelpful] = useState(false);
//   const [markingHelpful, setMarkingHelpful] = useState(false);
//   const [mediaModalOpen, setMediaModalOpen] = useState(false);
//   const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
//   const [videoThumbnails, setVideoThumbnails] = useState({});
//   const [generatingThumbnails, setGeneratingThumbnails] = useState({});
//   const [mediaItems, setMediaItems] = useState([]);
//   const thumbnailGeneratedRef = useRef({});

//   const handleHelpful = async () => {
//     if (isHelpful) return;
    
//     setMarkingHelpful(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast.error('Please login to mark reviews as helpful');
//         return;
//       }
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${review._id}/helpful`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setHelpfulCount(prev => prev + 1);
//         setIsHelpful(true);
//         toast.success('Thanks for your feedback!');
//       }
//     } catch (error) {
//       console.error('Error marking helpful:', error);
//     } finally {
//       setMarkingHelpful(false);
//     }
//   };

//   const getInitials = (name) => {
//     if (!name) return 'U';
//     return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const renderStars = (rating) => {
//     return (
//       <div className="flex gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`w-3.5 h-3.5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
//           />
//         ))}
//       </div>
//     );
//   };

//   // Get YouTube thumbnail for video
//   const getYouTubeThumbnail = (url) => {
//     if (!url) return null;
//     const patterns = [
//       /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\s?#]+)/,
//       /youtube\.com\/v\/([^&\s?#]+)/,
//       /youtube\.com\/live\/([^&\s?#]+)/
//     ];
//     for (const pattern of patterns) {
//       const match = url.match(pattern);
//       if (match && match[1]) {
//         return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
//       }
//     }
//     return null;
//   };

//   // Generate video thumbnail from uploaded video
//   const generateVideoThumbnail = useCallback((videoUrl, videoId) => {
//     if (thumbnailGeneratedRef.current[videoId] || generatingThumbnails[videoId]) {
//       return;
//     }
    
//     thumbnailGeneratedRef.current[videoId] = true;
//     setGeneratingThumbnails(prev => ({ ...prev, [videoId]: true }));
    
//     const video = document.createElement('video');
//     video.crossOrigin = 'Anonymous';
//     video.src = videoUrl;
//     video.currentTime = 1.5;
    
//     const handleLoadedData = () => {
//       setTimeout(() => {
//         try {
//           const canvas = document.createElement('canvas');
//           const ctx = canvas.getContext('2d');
          
//           canvas.width = 160;
//           canvas.height = 160;
          
//           ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
//           const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
//           setVideoThumbnails(prev => ({ ...prev, [videoId]: thumbnailUrl }));
//           setGeneratingThumbnails(prev => ({ ...prev, [videoId]: false }));
//         } catch (error) {
//           console.error('Error generating thumbnail:', error);
//           setGeneratingThumbnails(prev => ({ ...prev, [videoId]: false }));
//         }
//       }, 100);
//     };
    
//     const handleError = () => {
//       console.error('Error loading video for thumbnail generation');
//       setGeneratingThumbnails(prev => ({ ...prev, [videoId]: false }));
//     };
    
//     video.addEventListener('loadeddata', handleLoadedData);
//     video.addEventListener('error', handleError);
    
//     video.load();
    
//     return () => {
//       video.removeEventListener('loadeddata', handleLoadedData);
//       video.removeEventListener('error', handleError);
//     };
//   }, [generatingThumbnails]);

//   useEffect(() => {
//     const items = [];
    
//     if (review.images && review.images.length > 0) {
//       review.images.forEach(img => {
//         items.push({
//           type: 'image',
//           url: img.url,
//           thumbnail: img.url,
//           id: `img-${Date.now()}-${Math.random()}`
//         });
//       });
//     }
    
//     if (review.video && review.video.url) {
//       const videoId = `video-${Date.now()}-${Math.random()}`;
//       const isYouTube = review.videoType === 'youtube' || review.video.url?.includes('youtube.com') || review.video.url?.includes('youtu.be');
      
//       items.push({
//         type: 'video',
//         url: review.video.url,
//         videoType: review.videoType || 'upload',
//         thumbnail: review.video.thumbnail || review.video.url,
//         id: videoId,
//         isYouTube: isYouTube
//       });
      
//       if (!isYouTube && !videoThumbnails[videoId] && !thumbnailGeneratedRef.current[videoId]) {
//         generateVideoThumbnail(review.video.url, videoId);
//       }
//     }
    
//     setMediaItems(items);
//   }, [review]);

//   const handleMediaClick = (index) => {
//     setSelectedMediaIndex(index);
//     setMediaModalOpen(true);
//   };

//   return (
//     <>
//       <div className={`border-b border-gray-100 last:border-0 py-4 last:pb-0 ${review.status === 'pending' ? 'opacity-80 bg-yellow-50/50 rounded-lg px-3 -mx-3' : ''}`}>
//         <div className="flex items-start gap-3">
//           <div className="flex-shrink-0">
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
//               review.status === 'pending' 
//                 ? 'bg-yellow-500' 
//                 : 'bg-black'
//             }`}>
//               {review.isAnonymous ? 'A' : getInitials(review.userName)}
//             </div>
//           </div>
          
//           <div className="flex-1 min-w-0">
//             <div className="flex items-start justify-between gap-2">
//               <div>
//                 <p className="font-medium text-gray-900 text-sm">
//                   {review.isAnonymous ? 'Anonymous User' : review.userName}
//                 </p>
//                 <div className="flex items-center gap-2 mt-0.5 flex-wrap">
//                   {renderStars(review.rating)}
//                   <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
//                   {review.isVerifiedPurchase && (
//                     <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
//                       Verified
//                     </span>
//                   )}
//                   {isOwner && (
//                     <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">
//                       Your Review
//                     </span>
//                   )}
//                   {review.status === 'pending' && (
//                     <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-medium flex items-center gap-1">
//                       <Clock className="w-3 h-3" />
//                       Pending Approval
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             {review.title && (
//               <h4 className="font-semibold text-gray-800 text-sm mt-1.5">{review.title}</h4>
//             )}
            
//             <p className="text-gray-600 text-sm mt-1 leading-relaxed">{review.comment}</p>
            
//             {review.status === 'pending' && isOwner && (
//               <div className="mt-2 text-xs text-yellow-600 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
//                 <Clock className="w-3 h-3 inline mr-1" />
//                 This review is awaiting moderation. It will be visible to others once approved.
//               </div>
//             )}
            
//             {review.status === 'approved' && mediaItems.length > 0 && (
//               <div className="mt-2 flex flex-wrap gap-2">
//                 {mediaItems.map((item, idx) => {
//                   if (item.type === 'image') {
//                     return (
//                       <img
//                         key={item.id || idx}
//                         src={item.url}
//                         alt={`Review image ${idx + 1}`}
//                         className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-gray-200 hover:border-black"
//                         onClick={() => handleMediaClick(idx)}
//                       />
//                     );
//                   } else if (item.type === 'video') {
//                     const isYouTube = item.isYouTube;
//                     const thumbUrl = isYouTube 
//                       ? getYouTubeThumbnail(item.url) 
//                       : (videoThumbnails[item.id] || item.thumbnail);
                    
//                     return (
//                       <button
//                         key={item.id || idx}
//                         onClick={() => handleMediaClick(idx)}
//                         className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 relative border-gray-200 hover:border-black`}
//                       >
//                         {thumbUrl ? (
//                           <img 
//                             src={thumbUrl} 
//                             alt="Video thumbnail" 
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.style.display = 'none';
//                               e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
//                             }}
//                           />
//                         ) : null}
                        
//                         <div 
//                           className="fallback-icon w-full h-full bg-gray-100 flex flex-col items-center justify-center"
//                           style={{ 
//                             display: thumbUrl ? 'none' : 'flex' 
//                           }}
//                         >
//                           {generatingThumbnails[item.id] ? (
//                             <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
//                           ) : (
//                             <Play className="w-4 h-4 text-gray-500" />
//                           )}
//                         </div>
                        
//                         <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
//                           <Play className="w-5 h-5 text-white" />
//                         </div>
//                       </button>
//                     );
//                   }
//                   return null;
//                 })}
//               </div>
//             )}
            
//             {review.status === 'approved' && review.reply?.text && (
//               <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
//                 <p className="text-xs font-medium text-gray-700 mb-1">Seller Response</p>
//                 <p className="text-sm text-gray-600">{review.reply.text}</p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   {new Date(review.reply.repliedAt).toLocaleDateString()}
//                 </p>
//               </div>
//             )}
            
//             {review.status === 'approved' && (
//               <button
//                 onClick={handleHelpful}
//                 disabled={markingHelpful || isHelpful}
//                 className={`mt-2 flex items-center gap-1.5 text-xs transition-colors ${
//                   isHelpful 
//                     ? 'text-black' 
//                     : 'text-gray-400 hover:text-black'
//                 } disabled:opacity-50`}
//               >
//                 <ThumbsUp className={`w-3.5 h-3.5 ${isHelpful ? 'fill-black' : ''}`} />
//                 <span>Helpful ({helpfulCount})</span>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <ReviewMediaModal
//         isOpen={mediaModalOpen}
//         onClose={() => setMediaModalOpen(false)}
//         mediaItems={mediaItems}
//         initialIndex={selectedMediaIndex}
//         reviewTitle={review.title || review.comment?.slice(0, 50)}
//       />
//     </>
//   );
// };

// // ========== MAIN PRODUCT CLIENT COMPONENT ==========

// export default function ProductClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
  
//   const [productIdentifier, setProductIdentifier] = useState(null);
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [isInCart, setIsInCart] = useState(false);
//   const [addingToCart, setAddingToCart] = useState(false);
//   const [showZoom, setShowZoom] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
//   const [imageLoaded, setImageLoaded] = useState({});
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [videoThumbnail, setVideoThumbnail] = useState(null);
//   const [generatingThumbnail, setGeneratingThumbnail] = useState(false);
//   const [checkingCart, setCheckingCart] = useState(true);
//   const [carouselIndex, setCarouselIndex] = useState(0);
//   const [carouselItemsPerView, setCarouselItemsPerView] = useState(5);
//   const [isAutoScrolling, setIsAutoScrolling] = useState(true);
//   const autoScrollIntervalRef = useRef(null);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [activeTab, setActiveTab] = useState('description');
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [faqOpenStates, setFaqOpenStates] = useState({});
  
//   // ========== REVIEW STATE ==========
//   const [reviews, setReviews] = useState([]);
//   const [reviewStats, setReviewStats] = useState(null);
//   const [loadingReviews, setLoadingReviews] = useState(false);
//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//   const [reviewPage, setReviewPage] = useState(1);
//   const [reviewTotalPages, setReviewTotalPages] = useState(1);
//   const [reviewTotal, setReviewTotal] = useState(0);
//   const [reviewFilter, setReviewFilter] = useState('all');
//   const [reviewSort, setReviewSort] = useState('newest');
//   const [userReview, setUserReview] = useState(null);
//   const [checkingUserReview, setCheckingUserReview] = useState(false);
  
//   // ========== COLOR SELECTION STATE ==========
//   const [selectedColors, setSelectedColors] = useState([]);
//   const [colorQuantities, setColorQuantities] = useState({});
//   const [colorError, setColorError] = useState(null);
  
//   // For single product without colors
//   const [singleQuantity, setSingleQuantity] = useState(1);
  
//   const galleryRef = useRef(null);

//   const openCartSidebar = () => {
//     setIsCartOpen(true);
//   };

//   const closeCartSidebar = () => {
//     setIsCartOpen(false);
//   };

//   // ========== CART STATUS FUNCTIONS ==========
//   const checkCartStatus = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       } else {
//         setIsInCart(false);
//         setCheckingCart(false);
//         return;
//       }
      
//       if (!product || !product._id) {
//         setCheckingCart(false);
//         return;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/cart/check/${product._id}`, { headers });
//       const data = await response.json();
      
//       if (data.success) {
//         setIsInCart(data.data.inCart || false);
//       } else {
//         setIsInCart(false);
//       }
//     } catch (error) {
//       console.error('Error checking cart status:', error);
//       setIsInCart(false);
//     } finally {
//       setCheckingCart(false);
//     }
//   };

//   const toggleFaq = (index) => {
//     setFaqOpenStates(prev => ({
//       ...prev,
//       [index]: !prev[index]
//     }));
//   };

//   // ========== REVIEW FUNCTIONS ==========
  
//   const fetchReviews = async (page = 1) => {
//     if (!product?._id) return;
    
//     setLoadingReviews(true);
//     try {
//       const token = localStorage.getItem('token');
//       const headers = {};
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       }
      
//       const params = new URLSearchParams({
//         productId: product._id,
//         page: page,
//         limit: 5,
//         status: 'approved'
//       });
      
//       if (reviewSort === 'newest') params.append('sort', '-createdAt');
//       else if (reviewSort === 'oldest') params.append('sort', 'createdAt');
//       else if (reviewSort === 'highest') params.append('sort', '-rating');
//       else if (reviewSort === 'lowest') params.append('sort', 'rating');
      
//       if (token) {
//         params.append('includeUserPending', 'true');
//       }
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews?${params}`, {
//         headers
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         let reviewData = data.data || [];
        
//         if (reviewFilter === 'with_media') {
//           reviewData = reviewData.filter(r => 
//             (r.images && r.images.length > 0) || (r.video && r.video.url)
//           );
//         }
        
//         reviewData.sort((a, b) => {
//           if (a.status === 'pending' && b.status !== 'pending') return -1;
//           if (a.status !== 'pending' && b.status === 'pending') return 1;
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         });
        
//         setReviews(reviewData);
//         setReviewStats(data.stats || null);
//         setReviewTotal(data.pagination?.total || 0);
//         setReviewTotalPages(data.pagination?.pages || 1);
//       }
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//     } finally {
//       setLoadingReviews(false);
//     }
//   };

//   const checkUserReview = async () => {
//     const token = localStorage.getItem('token');
//     if (!token || !product?._id) return;
    
//     setCheckingUserReview(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews?productId=${product._id}&userId=me`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       if (data.success && data.data.length > 0) {
//         setUserReview(data.data[0]);
//       } else {
//         setUserReview(null);
//       }
//     } catch (error) {
//       console.error('Error checking user review:', error);
//     } finally {
//       setCheckingUserReview(false);
//     }
//   };

//   // ========== EFFECTS ==========
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     let id = searchParams.get('id');
    
//     if (!id) {
//       const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
//       const segments = cleanPath.split('/');
      
//       if (segments[0] === 'product' && segments[1]) {
//         id = segments[1];
//       }
//     }
    
//     if (id && id !== productIdentifier) {
//       setProductIdentifier(id);
//     }
//   }, [searchParams, pathname]);

//   useEffect(() => {
//     if (productIdentifier) {
//       fetchProductDetails();
//     }
//   }, [productIdentifier]);

//   useEffect(() => {
//     if (product) {
//       setSelectedColors([]);
//       setColorQuantities({});
//       setColorError(null);
//       setSingleQuantity(1);
//     }
//   }, [product]);

//   useEffect(() => {
//     if (product?.videoUrl && product?.videoType !== 'youtube' && !videoThumbnail && !generatingThumbnail) {
//       setGeneratingThumbnail(true);
//       generateVideoThumbnail(product.videoUrl, (thumbnail) => {
//         if (thumbnail) {
//           setVideoThumbnail(thumbnail);
//         }
//         setGeneratingThumbnail(false);
//       });
//     }
//   }, [product?.videoUrl, product?.videoType]);

//   useEffect(() => {
//     if (product && product._id) {
//       checkCartStatus();
//       checkUserReview();
//     }
//   }, [product]);

//   useEffect(() => {
//     const handleCartUpdate = () => {
//       if (product && product._id) {
//         setCheckingCart(true);
//         checkCartStatus();
//       }
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, [product]);

//   useEffect(() => {
//     const handleAuthChange = () => {
//       if (product && product._id) {
//         setIsInCart(false);
//         setCheckingCart(true);
//         setTimeout(() => {
//           checkCartStatus();
//           checkUserReview();
//         }, 100);
//       }
//     };
    
//     window.addEventListener('auth-change', handleAuthChange);
//     return () => {
//       window.removeEventListener('auth-change', handleAuthChange);
//     };
//   }, [product]);

//   useEffect(() => {
//     const handleFocus = () => {
//       if (product && product._id) {
//         checkCartStatus();
//       }
//     };
    
//     window.addEventListener('focus', handleFocus);
//     return () => {
//       window.removeEventListener('focus', handleFocus);
//     };
//   }, [product]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setCarouselItemsPerView(2);
//       } else if (window.innerWidth < 768) {
//         setCarouselItemsPerView(2);
//       } else if (window.innerWidth < 1024) {
//         setCarouselItemsPerView(3);
//       } else {
//         setCarouselItemsPerView(5);
//       }
//     };
    
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//  useEffect(() => {
//   if (isAutoScrolling && relatedProducts.length > carouselItemsPerView) {
//     autoScrollIntervalRef.current = setInterval(() => {
//       setCarouselIndex((prev) => {
//         const totalSlides = Math.ceil(relatedProducts.length / carouselItemsPerView);
//         if (prev >= totalSlides - 1) {
//           return 0;
//         }
//         return prev + 1;
//       });
//     }, 5000);
//   }
  
//   return () => {
//     if (autoScrollIntervalRef.current) {
//       clearInterval(autoScrollIntervalRef.current);
//     }
//   };
// }, [isAutoScrolling, relatedProducts.length, carouselItemsPerView]);

//   useEffect(() => {
//     if (product && product.faqs && product.faqs.length > 0) {
//       const initialStates = {};
//       product.faqs.forEach((_, index) => {
//         initialStates[index] = false;
//       });
//       setFaqOpenStates(initialStates);
//     }
//   }, [product]);

//   useEffect(() => {
//     const refreshRelatedProductsStatus = async () => {
//       if (relatedProducts.length === 0) return;
      
//       const productIds = relatedProducts.map(p => p._id);
//       const token = localStorage.getItem('token');
//       const cartSessionId = localStorage.getItem('cartSessionId');
      
//       const cartHeaders = {};
//       if (token) cartHeaders['Authorization'] = `Bearer ${token}`;
//       else if (cartSessionId) cartHeaders['x-session-id'] = cartSessionId;
      
//       try {
//         const cartResponse = await fetch('http://localhost:5000/api/cart/check-status', {
//           method: 'POST',
//           headers: { ...cartHeaders, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds })
//         });
//         const cartData = await cartResponse.json();
//         if (cartData.success) setProductsInCart(cartData.data);
//       } catch (error) {
//         console.error('Error refreshing cart status:', error);
//       }
//     };
    
//     refreshRelatedProductsStatus();
    
//     const handleCartUpdate = () => refreshRelatedProductsStatus();
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, [relatedProducts]);

//   useEffect(() => {
//     if (product?._id && activeTab === 'reviews') {
//       fetchReviews(reviewPage);
//     }
//   }, [product?._id, activeTab, reviewPage, reviewFilter, reviewSort]);

//   const handleCarouselInteraction = () => {
//     setIsAutoScrolling(false);
//     setTimeout(() => {
//       setIsAutoScrolling(true);
//     }, 5000);
//   };

//   // const handlePrevSlide = () => {
//   //   handleCarouselInteraction();
//   //   setCarouselIndex((prev) => Math.max(0, prev - 1));
//   // };

//   // const handleNextSlide = () => {
//   //   handleCarouselInteraction();
//   //   const maxIndex = Math.max(0, relatedProducts.length - carouselItemsPerView);
//   //   setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
//   // };

//   const handlePrevSlide = () => {
//   handleCarouselInteraction();
//   setCarouselIndex((prev) => Math.max(0, prev - 1));
// };

// const handleNextSlide = () => {
//   handleCarouselInteraction();
//   const totalSlides = Math.ceil(relatedProducts.length / carouselItemsPerView);
//   setCarouselIndex((prev) => Math.min(prev + 1, totalSlides - 1));
// };

//   // ========== FETCH PRODUCT DETAILS ==========
//   const fetchProductDetails = async () => {
//     if (!productIdentifier) {
//       toast.error('Product not found');
//       router.push('/products');
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${encodeURIComponent(productIdentifier)}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const productData = data.data.product;
//         setProduct(productData);
//         setRelatedProducts(data.data.relatedProducts || []);
        
//         if (productData.slug) {
//           const currentPath = window.location.pathname;
//           const normalizedCurrentPath = currentPath.replace(/\/+$/, '');
//           const expectedPath = `/product/${productData.slug}`;
          
//           if (normalizedCurrentPath !== expectedPath) {
//             window.history.replaceState({}, '', expectedPath);
//           }
//         }
        
//       } else {
//         toast.error('Product not found');
//         router.push('/products');
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       toast.error('Failed to load product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ========== COLOR MANAGEMENT FUNCTIONS ==========
  
//   const addColorSelection = (color) => {
//     if (selectedColors.includes(color)) {
//       toast.warning(`${color} is already selected`);
//       return;
//     }
    
//     const totalSelectedQuantity = Object.values(colorQuantities).reduce((sum, qty) => sum + qty, 0);
//     if (totalSelectedQuantity + 1 > product.stockQuantity) {
//       toast.error(`Only ${product.stockQuantity} items available in total`);
//       return;
//     }
    
//     setSelectedColors([...selectedColors, color]);
//     setColorQuantities(prev => ({ ...prev, [color]: 1 }));
//     setColorError(null);
//   };

//   const removeColorSelection = (color) => {
//     setSelectedColors(selectedColors.filter(c => c !== color));
//     const newQuantities = { ...colorQuantities };
//     delete newQuantities[color];
//     setColorQuantities(newQuantities);
//   };

//   const updateColorQuantity = (color, newQuantity) => {
//     if (newQuantity === '') {
//       setColorQuantities(prev => ({ ...prev, [color]: '' }));
//       return;
//     }
    
//     const quantity = parseInt(newQuantity);
//     if (isNaN(quantity) || quantity < 1) {
//       return;
//     }
    
//     const totalOtherQuantities = Object.entries(colorQuantities)
//       .filter(([c]) => c !== color)
//       .reduce((sum, [, qty]) => sum + (typeof qty === 'string' ? parseInt(qty) || 0 : qty || 0), 0);
    
//     if (totalOtherQuantities + quantity > product.stockQuantity) {
//       toast.error(`Only ${product.stockQuantity - totalOtherQuantities} more items available`);
//       return;
//     }
    
//     setColorQuantities(prev => ({ ...prev, [color]: quantity }));
//   };

//   const getTotalColorQuantity = () => {
//     return Object.values(colorQuantities).reduce((sum, qty) => sum + qty, 0);
//   };

//   const hasSelectedColors = () => {
//     return selectedColors.length > 0;
//   };

//   // ========== QUANTITY HANDLERS ==========
  
//   const handleSingleQuantityChange = (delta) => {
//     const newQuantity = singleQuantity + delta;
//     if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 10)) {
//       setSingleQuantity(newQuantity);
//     }
//   };

//   const handleSingleQuantityInput = (e) => {
//     const rawValue = e.target.value;
    
//     if (rawValue === '') {
//       setSingleQuantity('');
//       return;
//     }
    
//     let value = parseInt(rawValue);
    
//     if (isNaN(value)) {
//       setSingleQuantity(1);
//       return;
//     }
    
//     if (value < 1) {
//       value = 1;
//     } else if (value > product.stockQuantity) {
//       value = product.stockQuantity;
//       toast.error(`Maximum quantity available is ${product.stockQuantity}`);
//     }
    
//     setSingleQuantity(value);
//   };

//   // ========== ADD TO CART ==========
  
//   const handleAddToCart = async () => {
//     const hasColors = product?.colors && product.colors.length > 0;
    
//     if (hasColors && !hasSelectedColors()) {
//       setColorError('Please select at least one color');
//       toast.error('Please select at least one color before adding to cart');
//       return;
//     }
    
//     if (product.stockQuantity <= 0) {
//       toast.error('Out of stock');
//       return;
//     }
    
//     setAddingToCart(true);
//     const toastId = toast.loading('Adding items to cart...');
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;

//       let successCount = 0;
//       let errorCount = 0;
//       let lastResponseData = null;

//       if (!hasColors) {
//         const finalQuantity = singleQuantity === '' || singleQuantity === null ? 1 : singleQuantity;
//         const response = await fetch('http://localhost:5000/api/cart', {
//           method: 'POST',
//           headers,
//           body: JSON.stringify({ 
//             productId: product._id, 
//             quantity: finalQuantity,
//             selectedColor: null 
//           })
//         });
//         const data = await response.json();
//         lastResponseData = data;
//         if (data.success) {
//           successCount++;
//         } else {
//           errorCount++;
//         }
//       } else {
//         for (const color of selectedColors) {
//           const quantity = colorQuantities[color] || 1;
//           const response = await fetch('http://localhost:5000/api/cart', {
//             method: 'POST',
//             headers,
//             body: JSON.stringify({ 
//               productId: product._id, 
//               quantity: quantity,
//               selectedColor: color 
//             })
//           });
//           const data = await response.json();
//           lastResponseData = data;
//           if (data.success) {
//             successCount++;
//           } else {
//             errorCount++;
//             console.error(`Failed to add ${color}:`, data.error);
//           }
//         }
//       }

//       if (successCount > 0) {
//         if (lastResponseData?.sessionId && !token) {
//           localStorage.setItem('cartSessionId', lastResponseData.sessionId);
//         }
//         setIsInCart(true);
//         toast.success(`${successCount} item(s) added to cart!`, { id: toastId });
//         window.dispatchEvent(new Event('cart-update'));
//         setTimeout(() => window.dispatchEvent(new Event('cart-update')), 500);
        
//         if (hasColors) {
//           setSelectedColors([]);
//           setColorQuantities({});
//         } else {
//           setSingleQuantity(1);
//         }
//       } else {
//         toast.error('Failed to add items to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error', { id: toastId });
//     } finally {
//       setAddingToCart(false);
//     }
//   };

//   // ========== BUY NOW ==========
  
//   // const handleBuyNow = async () => {
//   //   const hasColors = product?.colors && product.colors.length > 0;
    
//   //   if (hasColors && !hasSelectedColors()) {
//   //     setColorError('Please select at least one color');
//   //     toast.error('Please select a color before proceeding');
//   //     return;
//   //   }
    
//   //   if (product.stockQuantity <= 0) {
//   //     toast.error('Out of stock');
//   //     return;
//   //   }
    
//   //   setAddingToCart(true);
//   //   const toastId = toast.loading('Processing...');
    
//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     const sessionId = localStorage.getItem('cartSessionId');
//   //     const headers = { 'Content-Type': 'application/json' };
//   //     if (token) headers['Authorization'] = `Bearer ${token}`;
//   //     else if (sessionId) headers['x-session-id'] = sessionId;

//   //     let successCount = 0;

//   //     if (!hasColors) {
//   //       const finalQuantity = singleQuantity === '' || singleQuantity === null ? 1 : singleQuantity;
//   //       const response = await fetch('http://localhost:5000/api/cart', {
//   //         method: 'POST',
//   //         headers,
//   //         body: JSON.stringify({ 
//   //           productId: product._id, 
//   //           quantity: finalQuantity,
//   //           selectedColor: null 
//   //         })
//   //       });
//   //       const data = await response.json();
//   //       if (data.success) successCount++;
//   //     } else {
//   //       for (const color of selectedColors) {
//   //         const quantity = colorQuantities[color] || 1;
//   //         const response = await fetch('http://localhost:5000/api/cart', {
//   //           method: 'POST',
//   //           headers,
//   //           body: JSON.stringify({ 
//   //             productId: product._id, 
//   //             quantity: quantity,
//   //             selectedColor: color 
//   //           })
//   //         });
//   //         const data = await response.json();
//   //         if (data.success) successCount++;
//   //       }
//   //     }

//   //     if (successCount > 0) {
//   //       setIsInCart(true);
//   //       window.dispatchEvent(new Event('cart-update'));
//   //       toast.success('Redirecting to checkout...', { id: toastId });
//   //       setTimeout(() => router.push('/checkout'), 500);
//   //     } else {
//   //       toast.error('Failed to process', { id: toastId });
//   //     }
//   //   } catch (error) {
//   //     console.error('Buy now error:', error);
//   //     toast.error('Network error', { id: toastId });
//   //   } finally {
//   //     setAddingToCart(false);
//   //   }
//   // };

//   // ========== BUY NOW ==========
// const handleBuyNow = async () => {
//   const hasColors = product?.colors && product.colors.length > 0;
  
//   if (hasColors && !hasSelectedColors()) {
//     setColorError('Please select at least one color');
//     toast.error('Please select a color before proceeding');
//     return;
//   }
  
//   if (product.stockQuantity <= 0) {
//     toast.error('Out of stock');
//     return;
//   }
  
//   setAddingToCart(true);
//   const toastId = toast.loading('Processing...');
  
//   try {
//     const token = localStorage.getItem('token');
//     let sessionId = localStorage.getItem('cartSessionId');
    
//     // ✅ FIX: If no sessionId exists for guest, generate one
//     if (!token && !sessionId) {
//       sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//       localStorage.setItem('cartSessionId', sessionId);
//       console.log('🆕 Generated new session ID for guest:', sessionId);
//     }
    
//     const headers = { 'Content-Type': 'application/json' };
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     }

//     let successCount = 0;
//     let lastResponseData = null;

//     if (!hasColors) {
//       const finalQuantity = singleQuantity === '' || singleQuantity === null ? 1 : singleQuantity;
//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ 
//           productId: product._id, 
//           quantity: finalQuantity,
//           selectedColor: null 
//         })
//       });
//       const data = await response.json();
//       lastResponseData = data;
//       if (data.success) {
//         successCount++;
//         // ✅ Store the sessionId from response if provided
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//       }
//     } else {
//       for (const color of selectedColors) {
//         const quantity = colorQuantities[color] || 1;
//         const response = await fetch('http://localhost:5000/api/cart', {
//           method: 'POST',
//           headers,
//           body: JSON.stringify({ 
//             productId: product._id, 
//             quantity: quantity,
//             selectedColor: color 
//           })
//         });
//         const data = await response.json();
//         lastResponseData = data;
//         if (data.success) {
//           successCount++;
//           if (data.sessionId && !token) {
//             localStorage.setItem('cartSessionId', data.sessionId);
//           }
//         }
//       }
//     }

//     if (successCount > 0) {
//       setIsInCart(true);
//       window.dispatchEvent(new Event('cart-update'));
//       toast.success('Redirecting to checkout...', { id: toastId });
      
//       // ✅ Small delay to ensure cart is saved
//       setTimeout(() => router.push('/checkout'), 500);
//     } else {
//       toast.error(lastResponseData?.error || 'Failed to process', { id: toastId });
//     }
//   } catch (error) {
//     console.error('Buy now error:', error);
//     toast.error('Network error', { id: toastId });
//   } finally {
//     setAddingToCart(false);
//   }
// };

//   const preloadImage = (src) => {
//     const img = new Image();
//     img.src = src;
//   };

//   // ========== RENDER REVIEW STARS ==========
//   const renderStarsForReview = (rating, size = 'small') => {
//     const starSize = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';
//     return (
//       <div className="flex gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`${starSize} ${
//               star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
//             }`}
//           />
//         ))}
//       </div>
//     );
//   };

//   if (!productIdentifier) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-700 mb-2">Product Not Found</h2>
//           <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
//           <Link href="/products" className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (loading) return <ProductSkeleton />;
//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-700 mb-2">Product Not Found</h2>
//           <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
//           <Link href="/products" className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const discountPercent = calculateDiscount(product.regularPrice, product.discountPrice);
//   const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
//   const stockStatus = getStockStatus(product.stockQuantity, product.stockAlertQuantity);
//   const StockIcon = stockStatus.icon;
//   const productImages = product.images || [];
//   const hasVideo = product.videoUrl && product.videoUrl.trim() !== '';
//   const mediaItems = [...productImages];
//   if (hasVideo) {
//     mediaItems.push({ type: 'video', url: product.videoUrl, videoType: product.videoType });
//   }
//   const mainMedia = mediaItems[activeImageIndex];
//   const isMainVideo = mainMedia?.type === 'video';
//   const mainImage = !isMainVideo ? mainMedia?.url : null;
//   const mainVideoUrl = isMainVideo ? mainMedia?.url : null;
//   const mainVideoType = isMainVideo ? mainMedia?.videoType : null;

//   const categoryHierarchy = [];
//   if (product.categoryName) categoryHierarchy.push(product.categoryName);
//   if (product.subcategoryName) categoryHierarchy.push(product.subcategoryName);
//   if (product.childSubcategoryName) categoryHierarchy.push(product.childSubcategoryName);

//   const hasDeliveryInfo = product.deliveryInfo && product.deliveryInfo !== '<p></p>' && product.deliveryInfo.trim() !== '';

//   const specifications = [
//     { label: 'Brand', value: product.brand, icon: Building2 },
//     { label: 'SKU', value: product.skuCode, icon: Package },
//     { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
//     { label: 'Category', value: product.categoryName, icon: FolderTree },
//     { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
//     { label: 'Unit', value: product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A', icon: Scale },
//   ].filter(item => item.value);

//   if (product.additionalInfo && product.additionalInfo.length > 0) {
//     product.additionalInfo.forEach(info => {
//       if (info.fieldName && info.fieldValue) {
//         specifications.push({
//           label: info.fieldName,
//           value: info.fieldValue,
//           icon: Info
//         });
//       }
//     });
//   }

//   const hasColors = product.colors && product.colors.length > 0;
//   const totalSelectedQuantity = getTotalColorQuantity();
//   const remainingStock = product.stockQuantity - totalSelectedQuantity;

//   const primaryTag = product.tags?.[0];
//   const primaryTagName = getTagName(primaryTag);

//   const averageRating = product.rating || 0;
//   const totalReviews = product.reviewStats?.totalReviews || 0;

//   return (
//     <>
//       {product && <MetadataUpdater product={product} />}
//       <Navbar />
//       <div className="min-h-screen bg-gray-50">
//         <div className="container mx-auto px-3 sm:px-4 py-4 md:py-6 lg:py-8 max-w-7xl">
//           {/* Breadcrumb */}
//           <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-4 md:mb-6 overflow-x-auto pb-2">
//             <Link href="/" className="text-gray-500 hover:text-black transition whitespace-nowrap">Home</Link>
//             <span className="text-gray-400">/</span>
//             <Link href="/products" className="text-gray-500 hover:text-black transition whitespace-nowrap">Products</Link>
//             {categoryHierarchy.map((cat, idx) => (
//               <React.Fragment key={idx}>
//                 <span className="text-gray-400">/</span>
//                 <span className="text-gray-500 truncate max-w-[100px] sm:max-w-none">{cat}</span>
//               </React.Fragment>
//             ))}
//             <span className="text-gray-400">/</span>
//             <span className="text-black font-medium truncate max-w-[150px] sm:max-w-none">{product.productName}</span>
//           </nav>

//            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
//             {/* Left Column - Product Gallery */}
//             <div className="lg:col-span-3" ref={galleryRef}>
//               <div className="sticky top-20 lg:top-24">
//                 <div className="relative bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-md">
//                   <div 
//                     className="relative bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden cursor-crosshair"
//                     style={{ height: 'auto', minHeight: '280px' }}
//                     onMouseEnter={() => !isMainVideo && !isMobile && setIsZoomed(true)}
//                     onMouseLeave={() => setIsZoomed(false)}
//                     onMouseMove={(e) => {
//                       if (!isZoomed || isMainVideo || isMobile) return;
//                       const rect = e.currentTarget.getBoundingClientRect();
//                       const x = ((e.clientX - rect.left) / rect.width) * 100;
//                       const y = ((e.clientY - rect.top) / rect.height) * 100;
//                       setZoomPosition({
//                         x: Math.min(Math.max(x, 0), 100),
//                         y: Math.min(Math.max(y, 0), 100)
//                       });
//                     }}
//                   >
//                     <div className="relative w-full pt-[100%] sm:pt-[100%]">
//                       {(isTransitioning || !imageLoaded[activeImageIndex]) && !isMainVideo && (
//                         <div className="absolute inset-0 bg-gray-200 animate-pulse z-10">
//                           <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
//                         </div>
//                       )}
                      
//                       <div className="absolute inset-0 w-full h-full overflow-hidden">
//                         {!isMainVideo && mainImage ? (
//                           <img
//                             key={activeImageIndex}
//                             src={mainImage}
//                             alt={product.productName}
//                             className={`w-full h-full object-contain p-3 sm:p-4 bg-gray-50 transition-opacity duration-300 ${
//                               imageLoaded[activeImageIndex] ? 'opacity-100' : 'opacity-0'
//                             }`}
//                             style={{
//                               transform: isZoomed && !isMobile ? 'scale(2.2)' : 'scale(1)',
//                               transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                               transition: 'transform 0.15s ease-out'
//                             }}
//                             onLoad={() => {
//                               setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
//                               setTimeout(() => setIsTransitioning(false), 100);
//                             }}
//                             loading={activeImageIndex === 0 ? "eager" : "lazy"}
//                             fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
//                             decoding="async"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Available';
//                               setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
//                             }}
//                           />
//                         ) : isMainVideo && mainVideoUrl && (
//                           mainVideoType === 'youtube' ? (
//                             <iframe 
//                               src={mainVideoUrl} 
//                               className="w-full h-full aspect-square" 
//                               allowFullScreen 
//                               title="Product Video"
//                             />
//                           ) : (
//                             <video 
//                               src={mainVideoUrl} 
//                               controls 
//                               className="w-full h-full object-contain bg-gray-50"
//                             />
//                           )
//                         )}
//                       </div>
//                     </div>

//                     {!isMainVideo && !isMobile && !isZoomed && (
//                       <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none">
//                         <div className="bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                           <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
//                           </svg>
//                           <span className="hidden xs:inline">Hover to zoom</span>
//                         </div>
//                       </div>
//                     )}

//                     <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex gap-1 sm:gap-2 z-20">
//                       {!isMainVideo && (
//                         <button
//                           onClick={() => setShowZoom(true)}
//                           className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-105"
//                           aria-label="View fullscreen"
//                         >
//                           <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
//                         </button>
//                       )}
//                     </div>

//                     <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-20">
//                       {activeImageIndex + 1} / {productImages.length}
//                     </div>
//                   </div>
                  
//                   {discountPercent > 0 && (
//                     <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] sm:text-xs md:text-sm font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1">
//                       <Tag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                       {discountPercent}% OFF
//                     </div>
//                   )}
//                 {product.tags?.[0] && (
//   <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${getTagStyles(product.tags[0])} text-[8px] sm:text-[10px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1`}>
//     <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//     {getTagName(product.tags[0])}
//   </div>
// )}
//                 </div>

//                 <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 overflow-x-auto pb-2 scrollbar-thin justify-start sm:justify-center">
//                   {productImages.map((img, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => {
//                         if (activeImageIndex !== idx) {
//                           setActiveImageIndex(idx);
//                           setImageLoaded(prev => ({ ...prev, [idx]: false }));
//                           setIsZoomed(false);
//                         }
//                       }}
//                       onMouseEnter={() => {
//                         preloadImage(img.url);
//                         if (activeImageIndex !== idx) {
//                           setActiveImageIndex(idx);
//                           setImageLoaded(prev => ({ ...prev, [idx]: false }));
//                           setIsZoomed(false);
//                         }
//                       }}
//                       className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
//                         activeImageIndex === idx ? 'border-black shadow-md ring-2 ring-black/20' : 'border-gray-200 hover:border-black'
//                       }`}
//                     >
//                       <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
//                     </button>
//                   ))}
                  
//                   {hasVideo && (
//                     <button
//                       onClick={() => {
//                         if (activeImageIndex !== productImages.length) {
//                           setActiveImageIndex(productImages.length);
//                           setIsZoomed(false);
//                         }
//                       }}
//                       onMouseEnter={() => {
//                         if (activeImageIndex !== productImages.length) {
//                           setActiveImageIndex(productImages.length);
//                           setIsZoomed(false);
//                         }
//                       }}
//                       className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
//                         activeImageIndex === productImages.length ? 'border-black shadow-md ring-2 ring-black/20' : 'border-gray-200 hover:border-black'
//                       }`}
//                     >
//                       {product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl) ? (
//                         <img 
//                           src={getYouTubeThumbnail(product.videoUrl)} 
//                           alt="Video thumbnail" 
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.style.display = 'none';
//                             e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
//                           }}
//                         />
//                       ) : 
//                       product.videoType !== 'youtube' && videoThumbnail ? (
//                         <img 
//                           src={videoThumbnail} 
//                           alt="Video thumbnail" 
//                           className="w-full h-full object-cover"
//                         />
//                       ) : null}
                      
//                       <div 
//                         className="fallback-icon w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col items-center justify-center"
//                         style={{ 
//                           display: (product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl)) || 
//                                    (product.videoType !== 'youtube' && videoThumbnail) ? 'none' : 'flex' 
//                         }}
//                       >
//                         {generatingThumbnail ? (
//                           <>
//                             <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-500 animate-spin" />
//                             <span className="text-[6px] sm:text-[8px] text-purple-500 mt-0.5">Loading</span>
//                           </>
//                         ) : (
//                           <>
//                             <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-500" />
//                             <span className="text-[6px] sm:text-[8px] text-purple-500 mt-0.5">Video</span>
//                           </>
//                         )}
//                       </div>
                      
//                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                         <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
//                       </div>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Product Info */}
//             <div className="lg:col-span-4 bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl shadow-sm border border-gray-200">
//               {/* Category Hierarchy */}
//               <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
//                 {categoryHierarchy.map((cat, idx) => (
//                   <span 
//                     key={idx} 
//                     className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200"
//                   >
//                     <FolderTree className="w-2 h-2 sm:w-3 sm:h-3" />
//                     {cat}
//                   </span>
//                 ))}
                
//                 {product.brand && (
//                   <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200">
//                     <Building2 className="w-2 h-2 sm:w-3 sm:h-3" />
//                     {product.brand}
//                   </span>
//                 )}
//               </div>

//               {/* Title */}
//               <div className="mb-3 sm:mb-4">
//                 <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
//                   {product.productName}
//                 </h1>
//               </div>

//               {/* Price Card */}
//               <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
//                 <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
//                   <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">৳{formatPrice(currentPrice)}</span>
//                   {discountPercent > 0 && (
//                     <>
//                       <span className="text-sm sm:text-base text-gray-400 line-through">৳{formatPrice(product.regularPrice)}</span>
//                       <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-red-500 bg-red-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
//                         <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
//                         Save {discountPercent}%
//                       </span>
//                     </>
//                   )}
//                 </div>
//                 {product.codAvailable && (
//                   <div className="flex items-center gap-1.5 mt-2 sm:mt-3 text-green-600 text-xs sm:text-sm bg-green-50 inline-flex px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
//                     <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                     <span>Cash on Delivery available</span>
//                   </div>
//                 )}
//               </div>

//               {/* Short Description */}
//               <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-white rounded-xl border border-gray-200">
//                 {product.shortDescription && product.shortDescription !== '<p></p>' ? (
//                   <div 
//                     className="text-xs sm:text-sm text-gray-600 prose-short"
//                     dangerouslySetInnerHTML={{ __html: product.shortDescription }} 
//                   />
//                 ) : (
//                   <p className="text-xs sm:text-sm text-gray-400 italic">
//                     No short description available.
//                   </p>
//                 )}
//               </div>

// {hasColors ? (
//   <div className="mb-4 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
//     <div className="flex items-center justify-between mb-2">
//       <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
//         <Palette className="w-3.5 h-3.5 text-gray-500" />
//         Select Colors:
//         <span className="text-red-500 text-xs">*</span>
//       </label>
//       <span className="text-xs text-gray-500">
//         {totalSelectedQuantity > 0 ? (
//           <span className="text-green-600">Selected: {totalSelectedQuantity} items</span>
//         ) : (
//           <span>Click a color to add</span>
//         )}
//       </span>
//     </div>
    
//     <div className="flex flex-wrap gap-2 mb-3">
//       {product.colors.map((color, idx) => {
//         const isSelected = selectedColors.includes(color);
//         const quantity = colorQuantities[color] || 0;
//         return (
//           <button
//             key={idx}
//             onClick={() => {
//               if (isSelected) {
//                 removeColorSelection(color);
//               } else {
//                 addColorSelection(color);
//               }
//             }}
//             disabled={remainingStock <= 0 && !isSelected}
//             className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
//               isSelected 
//                 ? 'border-black shadow-md ring-2 ring-black/20' 
//                 : 'border-gray-300 hover:border-gray-400'
//             } ${remainingStock <= 0 && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
//             style={{ backgroundColor: color }}
//           >
//             {isSelected && (
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white drop-shadow-md" />
//               </div>
//             )}
//             {isSelected && quantity > 0 && (
//               <div className="absolute -top-2 -right-2 bg-black text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
//                 {quantity}
//               </div>
//             )}
//           </button>
//         );
//       })}
//     </div>

//     {selectedColors.length > 0 && (
//       <div className="mt-3 pt-3 border-t border-gray-200">
//         <p className="text-xs font-medium text-gray-700 mb-2">Selected Colors:</p>
//         <div className="space-y-2">
//           {selectedColors.map((color) => (
//             <div key={color} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200">
//               <div 
//                 className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
//                 style={{ backgroundColor: color }}
//               />
              
//               <div className="flex items-center rounded-lg border-2 border-gray-200 overflow-hidden bg-white">
//                 <button
//                   onClick={() => updateColorQuantity(color, (colorQuantities[color] || 1) - 1)}
//                   className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
//                 >
//                   <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                 </button>
//                 <input
//                   type="text"
//                   value={colorQuantities[color] === '' ? '' : (colorQuantities[color] || 1)}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (value === '') {
//                       setColorQuantities(prev => ({ ...prev, [color]: '' }));
//                       return;
//                     }
//                     if (/^\d+$/.test(value)) {
//                       const numValue = parseInt(value);
//                       if (numValue >= 1) {
//                         const totalOtherQuantities = Object.entries(colorQuantities)
//                           .filter(([c]) => c !== color)
//                           .reduce((sum, [, qty]) => sum + (typeof qty === 'string' ? parseInt(qty) || 0 : qty || 0), 0);
                        
//                         if (totalOtherQuantities + numValue > product.stockQuantity) {
//                           toast.error(`Only ${product.stockQuantity - totalOtherQuantities} more items available`);
//                           return;
//                         }
//                         setColorQuantities(prev => ({ ...prev, [color]: numValue }));
//                       }
//                     }
//                   }}
//                   onBlur={() => {
//                     const value = colorQuantities[color];
//                     if (value === '' || value === null || value === undefined || parseInt(value) < 1) {
//                       setColorQuantities(prev => ({ ...prev, [color]: 1 }));
//                     }
//                   }}
//                   min="1"
//                   max={product.stockQuantity}
//                   className="w-12 sm:w-14 text-center font-medium text-gray-900 text-sm outline-none focus:ring-2 focus:ring-black/20 border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                 />
//                 <button
//                   onClick={() => updateColorQuantity(color, (colorQuantities[color] || 1) + 1)}
//                   disabled={remainingStock <= 0}
//                   className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
//                 >
//                   <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                 </button>
//               </div>
//               <button
//                 onClick={() => removeColorSelection(color)}
//                 className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//               >
//                 <X className="w-3.5 h-3.5" />
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
//           <span>
//             Total: <span className="font-medium">{totalSelectedQuantity}</span> items
//           </span>
//           {/* {remainingStock > 0 && (
//             <span className="text-gray-400">Remaining: {remainingStock}</span>
//           )} */}
//         </div>
//       </div>
//     )}

//     {colorError && (
//       <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
//         <AlertCircle className="w-3 h-3" />
//         {colorError}
//       </p>
//     )}
//     {!hasSelectedColors() && !colorError && (
//       <p className="text-[10px] text-gray-400 mt-1.5">
//         Click on color swatches to add them. You can select multiple colors with different quantities.
//       </p>
//     )}
//   </div>
// ) : (
//   <div className="mb-4 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
//     <label className="block text-xs font-medium text-gray-700 mb-2">
//       Quantity
//     </label>
//     <div className="flex items-center rounded-lg border-2 border-gray-200 overflow-hidden bg-white w-fit">
//       <button 
//         onClick={() => handleSingleQuantityChange(-1)} 
//         disabled={singleQuantity <= 1} 
//         className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
//       >
//         <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
//       </button>
//       <input
//         type="number"
//         value={singleQuantity === '' ? '' : singleQuantity}
//         onChange={handleSingleQuantityInput}
//         onBlur={() => {
//           if (singleQuantity === '' || singleQuantity === null) {
//             setSingleQuantity(1);
//           }
//         }}
//         min="1"
//         max={product.stockQuantity}
//         className="w-12 sm:w-14 md:w-16 text-center font-medium text-gray-900 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black/20 border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//       />
//       <button 
//         onClick={() => handleSingleQuantityChange(1)} 
//         disabled={singleQuantity >= product.stockQuantity} 
//         className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
//       >
//         <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
//       </button>
//     </div>
//     <p className="text-[10px] text-gray-400 mt-1.5">
//       {product.stockQuantity} items available
//     </p>
//   </div>
// )}

//               {/* Stock Status */}
//               <div className="flex items-center gap-2 mb-4">
//                 <div className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium text-${stockStatus.color}-600 bg-${stockStatus.color}-50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full`}>
//                   <StockIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${stockStatus.color}-500`} />
//                   <span>{stockStatus.label}</span>
//                   {stockStatus.label === 'In Stock' && <span className="text-[10px] sm:text-xs text-gray-500"></span>}
//                   {stockStatus.label === 'Low Stock' && <span className="text-[10px] sm:text-xs text-orange-500">(Only {product.stockQuantity} left)</span>}
//                 </div>
//               </div>

//               {/* Add to Cart / Buy Now Buttons */}
//               <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
//                 {isInCart ? (
//                   <button
//                     onClick={openCartSidebar}
//                     className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-700  font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
//                   >
//                     <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
//                     View in Cart
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={addingToCart || product.stockQuantity <= 0 || (hasColors && !hasSelectedColors())}
//                     className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 text-xs sm:text-sm"
//                   >
//                     {addingToCart ? <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> : <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
//                     {addingToCart ? 'Adding...' : hasColors ? 'Add Selected Colors' : 'Add to Cart'}
//                   </button>
//                 )}

//                 <button
//                   onClick={handleBuyNow}
//                   disabled={addingToCart || product.stockQuantity <= 0 || (hasColors && !hasSelectedColors())}
//                   className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-lg  hover:from-emerald-600 hover:to-green-600 transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 text-xs sm:text-sm"
//                 >
//                   <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   Buy Now
//                 </button>
//               </div>

//               {/* Delivery Info */}
//               {hasDeliveryInfo && (
//                 <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 sm:p-4 border border-gray-200">
//                   <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
//                     <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
//                     <span className="font-semibold text-gray-900 text-sm sm:text-base">Delivery Information</span>
//                   </div>
//                   <div 
//                     className="prose prose-sm max-w-none text-gray-600"
//                     style={{ fontSize: '0.875rem', lineHeight: '1.6' }}
//                     dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} 
//                   />
//                   <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
//                     <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
//                       <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                       <span>7 Days Return Policy</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
//                       <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                       <span>Safe & Secure</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
//                       <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                       <span>Genuine Products</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Tabs Section */}
//           <div className="mt-8 sm:mt-12">
//             <div className="flex flex-nowrap gap-1 sm:gap-2 border-b border-gray-200 overflow-x-auto pb-0.5 scrollbar-thin scrollbar-thumb-gray-300">
//               <button
//                 onClick={() => setActiveTab('description')}
//                 className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
//                   activeTab === 'description' 
//                     ? 'bg-white text-black border-t-2 border-l-2 border-r-2 border-gray-200 border-b-white' 
//                     : 'text-gray-500 hover:text-black'
//                 }`}
//               >
//                 <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 Description
//               </button>
//               <button
//                 onClick={() => setActiveTab('specifications')}
//                 className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
//                   activeTab === 'specifications' 
//                     ? 'bg-white text-black border-t-2 border-l-2 border-r-2 border-gray-200 border-b-white' 
//                     : 'text-gray-500 hover:text-black'
//                 }`}
//               >
//                 <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 Specifications
//               </button>
//               {hasDeliveryInfo && (
//                 <button
//                   onClick={() => setActiveTab('delivery')}
//                   className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
//                     activeTab === 'delivery' 
//                       ? 'bg-white text-black border-t-2 border-l-2 border-r-2 border-gray-200 border-b-white' 
//                       : 'text-gray-500 hover:text-black'
//                   }`}
//                 >
//                   <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   Delivery
//                 </button>
//               )}
//               {product.faqs && product.faqs.length > 0 && (
//                 <button
//                   onClick={() => setActiveTab('faqs')}
//                   className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
//                     activeTab === 'faqs' 
//                       ? 'bg-white text-black border-t-2 border-l-2 border-r-2 border-gray-200 border-b-white' 
//                       : 'text-gray-500 hover:text-black'
//                   }`}
//                 >
//                   <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   FAQs
//                 </button>
//               )}
//               <button
//                 onClick={() => setActiveTab('reviews')}
//                 className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
//                   activeTab === 'reviews' 
//                     ? 'bg-white text-black border-t-2 border-l-2 border-r-2 border-gray-200 border-b-white' 
//                     : 'text-gray-500 hover:text-black'
//                 }`}
//               >
//                 <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 Reviews
//               </button>
//             </div>

//             <div className="bg-white rounded-b-xl rounded-tr-xl border border-t-0 border-gray-200 p-4 sm:p-5 md:p-6">
//               {activeTab === 'description' && (
//                 <div className="prose prose-sm max-w-none text-gray-600">
//                   {product.fullDescription && product.fullDescription !== '<p></p>' ? (
//                     <div dangerouslySetInnerHTML={{ __html: processHtmlLinks(product.fullDescription) }} />
//                   ) : (
//                     <p className="text-gray-400 italic">No description available.</p>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'specifications' && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//                   {specifications.map((item, idx) => (
//                     <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-200">
//                       <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
//                       <div>
//                         <p className="text-[10px] sm:text-xs text-gray-500">{item.label}</p>
//                         <p className="font-medium text-gray-900 text-xs sm:text-sm">{item.value || 'N/A'}</p>
//                       </div>
//                     </div>
//                   ))}
                  
//                   {specifications.length === 0 && (
//                     <div className="col-span-2 text-center py-8 text-gray-400">
//                       <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
//                       <p>No specifications available</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'delivery' && hasDeliveryInfo && (
//                 <div className="prose prose-sm max-w-none text-gray-600">
//                   <div className="flex items-center gap-2 mb-4">
//                     <Truck className="w-5 h-5 text-gray-700" />
//                     <h3 className="text-lg font-semibold text-gray-900 m-0">Delivery Information</h3>
//                   </div>
//                   <div 
//                     className="text-sm leading-relaxed"
//                     dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} 
//                   />
//                   <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-200">
//                     <div className="flex items-center gap-1.5 text-sm text-gray-600">
//                       <RotateCcw className="w-4 h-4 text-gray-700" />
//                       <span>7 Days Return Policy</span>
//                     </div>
//                     <div className="flex items-center gap-1.5 text-sm text-gray-600">
//                       <ShieldCheck className="w-4 h-4 text-gray-700" />
//                       <span>Safe & Secure</span>
//                     </div>
//                     <div className="flex items-center gap-1.5 text-sm text-gray-600">
//                       <Award className="w-4 h-4 text-gray-700" />
//                       <span>Genuine Products</span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'faqs' && product.faqs && product.faqs.length > 0 && (
//                 <div>
//                   <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
//                     <div className="p-2 bg-black rounded-xl">
//                       <HelpCircle className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h3>
//                       <p className="text-sm text-gray-500">Everything you need to know about this product</p>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-3">
//                     {product.faqs.map((faq, index) => {
//                       const isOpen = faqOpenStates[index] || false;
                      
//                       return (
//                         <div 
//                           key={index} 
//                           className={`border rounded-xl transition-all duration-300 overflow-hidden ${
//                             isOpen 
//                               ? 'border-black shadow-md shadow-black/10' 
//                               : 'border-gray-200 hover:border-gray-300'
//                           }`}
//                         >
//                           <button
//                             onClick={() => toggleFaq(index)}
//                             className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
//                           >
//                             <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center text-sm font-bold">
//                               {index + 1}
//                             </span>
//                             <span className="flex-1 font-semibold text-gray-900 text-sm sm:text-base">
//                               {faq.question}
//                             </span>
//                             <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
//                               <ChevronDown className="w-5 h-5 text-gray-700" />
//                             </div>
//                           </button>
                          
//                           <div 
//                             className={`overflow-hidden transition-all duration-300 ${
//                               isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//                             }`}
//                           >
//                             <div className="px-5 pb-4 pt-1 border-t border-gray-200">
//                               <div className="flex items-start gap-3 pl-11">
//                                 <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>
//                                 <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
//                                   {faq.answer}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'reviews' && (
//                 <div>
//                   {/* Review Stats */}
//                   {reviewStats && reviewStats.totalReviews > 0 && (
//                     <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-gray-200">
//                       <div className="flex items-center gap-3">
//                         <div className="text-3xl font-bold text-gray-900">
//                           {reviewStats.averageRating.toFixed(1)}
//                         </div>
//                         <div>
//                           {renderStarsForReview(Math.round(reviewStats.averageRating), 'large')}
//                           <p className="text-sm text-gray-500 mt-0.5">
//                             Based on all reviews
//                           </p>
//                         </div>
//                       </div>
                      
//                       <div className="flex-1 max-w-xs">
//                         {[5, 4, 3, 2, 1].map((star) => {
//                           const count = reviewStats.ratingDistribution?.[star] || 0;
//                           const percentage = reviewStats.totalReviews > 0 
//                             ? (count / reviewStats.totalReviews) * 100 
//                             : 0;
//                           return (
//                             <div key={star} className="flex items-center gap-2 text-xs">
//                               <span className="w-5 text-gray-600">{star}</span>
//                               <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                               <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                                 <div 
//                                   className="h-full bg-yellow-400 rounded-full"
//                                   style={{ width: `${percentage}%` }}
//                                 />
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   )}

//                   {/* Write Review Button */}
//                   <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
//                     <div className="flex items-center gap-2">
//                       <Filter className="w-4 h-4 text-gray-400" />
//                       <select
//                         value={reviewFilter}
//                         onChange={(e) => setReviewFilter(e.target.value)}
//                         className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
//                       >
//                         <option value="all">All Reviews</option>
//                         <option value="with_media">With Photos/Videos</option>
//                       </select>
//                       <select
//                         value={reviewSort}
//                         onChange={(e) => setReviewSort(e.target.value)}
//                         className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
//                       >
//                         <option value="newest">Newest First</option>
//                         <option value="oldest">Oldest First</option>
//                         <option value="highest">Highest Rating</option>
//                         <option value="lowest">Lowest Rating</option>
//                       </select>
//                     </div>
                    
//                     <button
//                       onClick={() => setIsReviewModalOpen(true)}
//                       disabled={!!userReview}
//                       className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
//                         userReview
//                           ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                           : 'bg-black text-white hover:bg-gray-800'
//                       }`}
//                     >
//                       {userReview ? (
//                         <>
//                           {userReview.status === 'pending' ? (
//                             <>
//                               <Clock className="w-4 h-4" />
//                               Pending Review
//                             </>
//                           ) : (
//                             <>
//                               <CheckCircle className="w-4 h-4" />
//                               Already Reviewed
//                             </>
//                           )}
//                         </>
//                       ) : (
//                         <>
//                           <MessageSquare className="w-4 h-4" />
//                           Write a Review
//                         </>
//                       )}
//                     </button>
//                   </div>

//                   {/* Reviews List */}
//                   {loadingReviews ? (
//                     <div className="flex items-center justify-center py-12">
//                       <Loader2 className="w-8 h-8 animate-spin text-black" />
//                     </div>
//                   ) : reviews.length === 0 ? (
//                     <div className="text-center py-12 bg-gray-50 rounded-xl">
//                       <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-3" />
//                       <p className="text-gray-500">No reviews yet</p>
//                       <button
//                         onClick={() => setIsReviewModalOpen(true)}
//                         className="mt-3 text-black font-medium hover:underline"
//                       >
//                         Be the first to review this product
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="space-y-1">
//                       {reviews.map((review) => (
//                         <ReviewItem 
//                           key={review._id} 
//                           review={review}
//                           isOwner={userReview?._id === review._id}
//                         />
//                       ))}
//                     </div>
//                   )}

//                   {/* Pagination */}
//                   {reviewTotalPages > 1 && (
//                     <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
//                       <div className="text-sm text-gray-600">
//                         Showing {((reviewPage - 1) * 5) + 1} - {Math.min(reviewPage * 5, reviewTotal)} of {reviewTotal} reviews
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => setReviewPage(prev => Math.max(1, prev - 1))}
//                           disabled={reviewPage === 1}
//                           className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                         >
//                           <ChevronLeft className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => setReviewPage(prev => Math.min(reviewTotalPages, prev + 1))}
//                           disabled={reviewPage === reviewTotalPages}
//                           className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                         >
//                           <ChevronRight className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Related Products Section */}
//           {/* {relatedProducts.length > 0 && (
//             <div className="mt-8 sm:mt-12">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
//                   <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
//                     You May Also Like
//                   </h2>
//                 </div>
                
//                 {relatedProducts.length > carouselItemsPerView && (
//                   <div className="flex items-center gap-1 sm:gap-2">
//                     <button
//                       onClick={handlePrevSlide}
//                       disabled={carouselIndex === 0}
//                       className={`p-1.5 sm:p-2 rounded-full transition-all ${
//                         carouselIndex === 0 
//                           ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
//                           : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:scale-110'
//                       }`}
//                     >
//                       <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                     <button
//                       onClick={handleNextSlide}
//                       disabled={carouselIndex >= relatedProducts.length - carouselItemsPerView}
//                       className={`p-1.5 sm:p-2 rounded-full transition-all ${
//                         carouselIndex >= relatedProducts.length - carouselItemsPerView 
//                           ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
//                           : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:scale-110'
//                       }`}
//                     >
//                       <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                   </div>
//                 )}
//               </div>
              
//               <div className="relative overflow-hidden">
//                 <motion.div
//                   className="flex gap-2 sm:gap-3 md:gap-4"
//                   animate={{ x: `-${carouselIndex * (100 / carouselItemsPerView)}%` }}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   style={{ width: `${(relatedProducts.length / carouselItemsPerView) * 100}%` }}
//                 >
//                   {relatedProducts.map((relProduct) => (
//                     <div 
//                       key={relProduct._id} 
//                       className="flex-shrink-0"
//                       style={{ width: `${100 / relatedProducts.length}%` }}
//                     >
//                       <RelatedProductCard 
//                         product={relProduct} 
//                         router={router}
//                         isInCart={productsInCart[relProduct._id] || false}
//                         onViewInCart={openCartSidebar}
//                       />
//                     </div>
//                   ))}
//                 </motion.div>
//               </div>
              
//               {relatedProducts.length > carouselItemsPerView && (
//                 <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
//                   {Array.from({ length: Math.ceil(relatedProducts.length / carouselItemsPerView) }).map((_, idx) => {
//                     const pageIndex = idx * carouselItemsPerView;
//                     const isActive = carouselIndex >= pageIndex && carouselIndex < pageIndex + carouselItemsPerView;
//                     return (
//                       <button
//                         key={idx}
//                         onClick={() => {
//                           handleCarouselInteraction();
//                           setCarouselIndex(pageIndex);
//                         }}
//                         className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
//                           isActive ? 'w-4 sm:w-6 bg-black' : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
//                         }`}
//                       />
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           )} */}

//           {/* Related Products Section */}
// {relatedProducts.length > 0 && (
//   <div className="mt-8 sm:mt-12">
//     <div className="flex items-center justify-between mb-4">
//       <div className="flex items-center gap-2">
//         <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
//         <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
//           You May Also Like
//         </h2>
//       </div>
      
//       {relatedProducts.length > carouselItemsPerView && (
//         <div className="flex items-center gap-1 sm:gap-2">
//           <button
//             onClick={handlePrevSlide}
//             disabled={carouselIndex === 0}
//             className={`p-1.5 sm:p-2 rounded-full transition-all ${
//               carouselIndex === 0 
//                 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
//                 : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:scale-110'
//             }`}
//           >
//             <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//           </button>
//           <button
//             onClick={handleNextSlide}
//             disabled={carouselIndex >= Math.ceil(relatedProducts.length / carouselItemsPerView) - 1}
//             className={`p-1.5 sm:p-2 rounded-full transition-all ${
//               carouselIndex >= Math.ceil(relatedProducts.length / carouselItemsPerView) - 1
//                 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
//                 : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:scale-110'
//             }`}
//           >
//             <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
//           </button>
//         </div>
//       )}
//     </div>
    
//     <div className="relative overflow-hidden">
//       <div className="flex gap-2 sm:gap-3 md:gap-4">
//         {relatedProducts
//           .slice(
//             carouselIndex * carouselItemsPerView,
//             carouselIndex * carouselItemsPerView + carouselItemsPerView
//           )
//           .map((relProduct) => (
//            <div 
//   key={relProduct._id} 
//   className="flex-shrink-0"
//   style={{
//     width: `calc((100% - ${(Math.min(carouselItemsPerView, relatedProducts.length) - 1) * 16}px) / ${Math.min(carouselItemsPerView, relatedProducts.length)})`
//   }}
// >
//               <RelatedProductCard 
//                 product={relProduct} 
//                 router={router}
//                 isInCart={productsInCart[relProduct._id] || false}
//                 onViewInCart={openCartSidebar}
//               />
//             </div>
//           ))}
//       </div>
//     </div>
    
//     {/* Pagination Dots */}
//     {relatedProducts.length > carouselItemsPerView && (
//       <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
//         {Array.from({ length: Math.ceil(relatedProducts.length / carouselItemsPerView) }).map((_, idx) => {
//           const isActive = carouselIndex === idx;
//           return (
//             <button
//               key={idx}
//               onClick={() => {
//                 handleCarouselInteraction();
//                 setCarouselIndex(idx);
//               }}
//               className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
//                 isActive ? 'w-4 sm:w-6 bg-black' : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
//               }`}
//             />
//           );
//         })}
//       </div>
//     )}
//   </div>
// )}
//         </div>
//       </div>

//       {/* Modals */}
//       <AnimatePresence>
//         {showZoom && (
//           <ZoomModal 
//             images={productImages} 
//             currentIndex={activeImageIndex}
//             onClose={() => setShowZoom(false)} 
//             onImageChange={(index) => {
//               setActiveImageIndex(index);
//               setShowZoom(true);
//             }}
//           />
//         )}
//       </AnimatePresence>

//       {/* Review Modal */}
//       <ReviewModal
//         isOpen={isReviewModalOpen}
//         onClose={() => {
//           setIsReviewModalOpen(false);
//           if (activeTab === 'reviews') {
//             fetchReviews(reviewPage);
//             checkUserReview();
//           }
//         }}
//         productId={product._id}
//         productName={product.productName}
//         onReviewSubmitted={() => {
//           fetchReviews(reviewPage);
//           checkUserReview();
//         }}
//       />

//       {/* Cart Sidebar */}
//       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />

//       <Footer />

//       <style jsx global>{`
//         .prose {
//           max-width: none;
//         }
        
//         .prose h1 {
//           font-size: 1.5em;
//           font-weight: 600;
//           margin: 0.75em 0 0.5em;
//           color: #1F2937;
//         }
        
//         .prose h2 {
//           font-size: 1.3em;
//           font-weight: 600;
//           margin: 0.7em 0 0.4em;
//           color: #1F2937;
//         }
        
//         .prose h3 {
//           font-size: 1.1em;
//           font-weight: 600;
//           margin: 0.6em 0 0.3em;
//           color: #1F2937;
//         }
        
//         .prose p {
//           margin: 0.5em 0;
//           line-height: 1.6;
//           color: #4B5563;
//         }
        
//         .prose ul {
//           list-style-type: disc;
//           padding-left: 1.5em;
//           margin: 0.5em 0;
//         }
        
//         .prose ol {
//           list-style-type: decimal;
//           padding-left: 1.5em;
//           margin: 0.5em 0;
//         }
        
//         .prose li {
//           margin: 0.2em 0;
//           color: #4B5563;
//         }
        
//         .prose a {
//           color: #2563EB;
//           text-decoration: underline;
//         }
        
//         .prose strong {
//           font-weight: 600;
//           color: #1F2937;
//         }
        
//         .prose em {
//           font-style: italic;
//         }
        
//         .prose blockquote {
//           border-left: 3px solid #2563EB;
//           padding-left: 1em;
//           margin: 0.5em 0;
//           color: #6B7280;
//           font-style: italic;
//         }
        
//         .prose img {
//           max-width: 100%;
//           height: auto;
//           border-radius: 0.5rem;
//         }
        
//         .prose table {
//           width: 100%;
//           border-collapse: collapse;
//           margin: 1em 0;
//         }
        
//         .prose th,
//         .prose td {
//           border: 1px solid #E5E7EB;
//           padding: 0.5em;
//           text-align: left;
//         }
        
//         .prose th {
//           background-color: #F9FAFB;
//           font-weight: 600;
//           color: #1F2937;
//         }
        
//         .scrollbar-thin::-webkit-scrollbar {
//           height: 2px;
//         }
        
//         .scrollbar-thin::-webkit-scrollbar-track {
//           background: transparent;
//         }
        
//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background: #D1D5DB;
//           border-radius: 10px;
//         }
        
//         .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
//           background: #D1D5DB;
//         }
//       `}</style>
//     </>
//   );
// }

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Minus,
  Plus,
  ZoomIn,
  Sparkles,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  Tag,
  Clock,
  Copy,
  Check,
  Loader2,
  Eye,
  FolderTree,
  Maximize2,
  Zap,
  Info,
  Award,
  TrendingUp,
  Flame,
  Clock as ClockIcon,
  Building2,
  Box,
  Scale,
  List,
  FileText,
  AlertTriangle,
  Palette,
  HelpCircle,
  ChevronDown,
  Share2,
  Heart,
  Link as LinkIcon,
  ShoppingBag,
  MessageSquare,
  ThumbsUp,
  Filter,
  Image as ImageIcon,
  Video,
  Flower2
} from 'lucide-react';

import { toast } from 'sonner';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import MetadataUpdater from '../product/MetadataUpdater';
import CartSidebar from '../components/CartSidebar';
import ReviewModal from '../components/home/ReviewModal';
import ReviewMediaModal from '../components/ReviewMediaModal';

// ========== FONT CONSTANTS - BEAUTY BUCKET STYLE ==========
const FONT_FAMILY_SERIF = "'Playfair Display', Georgia, serif";
const FONT_FAMILY_CURSIVE = "'Courgette', cursive";
const FONT_FAMILY_SANS = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

// ========== HELPER FUNCTIONS ==========

// Helper function to get tag name safely from object or string
const getTagName = (tag) => {
  if (!tag) return '';
  if (typeof tag === 'string') {
    if (/^[0-9a-fA-F]{24}$/.test(tag)) {
      return '';
    }
    return tag;
  }
  if (typeof tag === 'object') {
    if (tag.name) return tag.name;
    if (tag._id && typeof tag._id === 'object' && tag._id.name) {
      return tag._id.name;
    }
    if (tag.title) return tag.title;
    if (tag.label) return tag.label;
    if (Array.isArray(tag) && tag.length > 0) {
      return getTagName(tag[0]);
    }
    if (tag._id) {
      if (typeof tag._id === 'string' && /^[0-9a-fA-F]{24}$/.test(tag._id)) {
        return '';
      }
      if (typeof tag._id === 'object' && tag._id.name) {
        return tag._id.name;
      }
    }
    for (const key of ['value', 'text', 'display', 'title', 'label', 'name']) {
      if (tag[key] && typeof tag[key] === 'string') {
        return tag[key];
      }
    }
  }
  return String(tag);
};

const getTagStyles = (tag) => {
  const tagName = getTagName(tag);
  const styles = {
    'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
    'Trending': 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30',
    'New Release': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30',
    'Limited Offer': 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30',
    'Flash Sale': 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-lg shadow-[#EE4275]/30',
    'Clearance': 'bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg shadow-gray-500/30',
  };
  return styles[tagName] || 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-lg shadow-[#EE4275]/30';
};

const formatPrice = (price) => {
  return (price || 0).toFixed(2);
};

const calculateDiscount = (regular, discount) => {
  if (regular && discount && discount < regular) {
    return Math.round(((regular - discount) / regular) * 100);
  }
  return 0;
};

const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

const getUnitLabel = (unit) => {
  const units = {
    'pcs': 'pcs',
    'ton': 'ton',
    'other': 'unit'
  };
  return units[unit] || unit;
};

const getStockStatus = (quantity, alertQuantity) => {
  if (quantity <= 0) return { label: 'Out of Stock', color: 'red', icon: AlertCircle };
  if (alertQuantity > 0 && quantity <= alertQuantity) return { label: 'Low Stock', color: 'orange', icon: AlertCircle };
  return { label: 'In Stock', color: 'green', icon: CheckCircle };
};

const truncateText = (text, limit = 35) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

// ========== VIDEO HELPER FUNCTIONS ==========

const getYouTubeThumbnail = (url) => {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\s?#]+)/,
    /youtube\.com\/v\/([^&\s?#]+)/,
    /youtube\.com\/live\/([^&\s?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
    }
  }
  return null;
};

const generateVideoThumbnail = (videoUrl, callback) => {
  const video = document.createElement('video');
  video.crossOrigin = 'Anonymous';
  video.src = videoUrl;
  video.currentTime = 1.5;
  
  video.addEventListener('loadeddata', () => {
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = 160;
      canvas.height = 160;
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
      callback(thumbnailUrl);
    }, 100);
  });
  
  video.addEventListener('error', () => {
    console.error('Error loading video for thumbnail generation');
    callback(null);
  });
  
  video.load();
};

const processHtmlLinks = (html) => {
  if (!html) return '';
  
  const div = document.createElement('div');
  div.innerHTML = html;
  
  const links = div.querySelectorAll('a');
  links.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
  
  return div.innerHTML;
};

// ========== LOADING SKELETON ==========

const ProductSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-2xl h-80 sm:h-96 md:h-[500px] w-full"></div>
          <div className="flex gap-2 mt-3 md:mt-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="space-y-3 md:space-y-4 animate-pulse">
          <div className="h-6 sm:h-7 md:h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-5 sm:h-5 md:h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-20 sm:h-24 md:h-24 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  </div>
);

// ========== ZOOM MODAL ==========

const ZoomModal = ({ images, currentIndex, onClose, onImageChange }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <div className="relative w-full h-full flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onImageChange((currentIndex - 1 + images.length) % images.length);
        }}
        className="absolute left-2 sm:left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-5xl w-full mx-2 sm:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]?.url}
          alt="Zoomed product"
          className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-2xl"
        />
      </motion.div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onImageChange((currentIndex + 1) % images.length);
        }}
        className="absolute right-2 sm:right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  </motion.div>
);

// ========== RELATED PRODUCT CARD - BEAUTY BUCKET STYLE ==========

const RelatedProductCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);
  const [imageErrors, setImageErrors] = useState({});
  const [isCartHovered, setIsCartHovered] = useState(false);

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

  // Images
  let productImages = [];
  if (product?.images && Array.isArray(product.images)) {
    productImages = product.images
      .map((img) => {
        if (typeof img === 'string') return img;
        if (img?.url) return img.url;
        return null;
      })
      .filter(Boolean);
  }
  if (productImages.length === 0 && product?.image) {
    productImages = [typeof product.image === 'string' ? product.image : product.image?.url || ''].filter(Boolean);
  }
  if (productImages.length === 0) {
    productImages = ['/placeholder-product.jpg'];
  }

  // Tags
  let tagNames = [];
  if (product?.tags && Array.isArray(product.tags)) {
    tagNames = product.tags
      .map((tag) => {
        if (typeof tag === 'string') return tag;
        if (tag?.name) return tag.name;
        return null;
      })
      .filter(Boolean);
  }
  const primaryTag = tagNames[0] || null;

  // Price & discount
  const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
  const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
  const originalPrice = regularPrice;

  // Stock
  const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
  const isOutOfStock = stockQuantity <= 0;

  // Rating
  const rating = product?.rating ? Number(product.rating) : 4.7;
  const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const hasMultipleImages = productImages.length > 1;

  // Mobile detection
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

  // Image navigation
  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMultipleImages) {
      setActiveIndex((prev) => (prev + 1) % productImages.length);
    }
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMultipleImages) {
      setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
    }
  };

  const goToImage = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex(index);
  };

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const getCurrentImage = () => {
    const image = productImages[activeIndex] || productImages[0];
    if (imageErrors[activeIndex]) {
      return '/placeholder-product.jpg';
    }
    return image;
  };

  // Add to cart
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) {
      if (onViewInCart) onViewInCart();
      return;
    }

    if (isOutOfStock) {
      toast.error('Product is out of stock!');
      return;
    }

    setCartStatusLoading(true);
    const toastId = toast.loading('Adding to cart...');

    try {
      const token = localStorage.getItem('token');
      let sessionId = localStorage.getItem('cartSessionId');

      const headers = { 'Content-Type': 'application/json' };

      if (!token && !sessionId) {
        sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        localStorage.setItem('cartSessionId', sessionId);
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }

      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId: productId, quantity: 1 })
      });

      const data = await response.json();

      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        toast.success('Added to cart!', { id: toastId });
        setIsInCart(true);
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
        stars.push(<Star key={i} className="h-2.5 w-2.5 fill-current text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-2.5 w-2.5">
            <Star className="absolute h-2.5 w-2.5 text-gray-200" />
            <div className="absolute left-0 top-0 h-2.5 w-1/2 overflow-hidden">
              <Star className="h-2.5 w-2.5 fill-current text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-2.5 w-2.5 text-[#F7C7D3]" />);
      }
    }
    return stars;
  };

  // Navigate to product page
  const navigateToProduct = () => {
    router.push(`/product/${product.slug || product._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/product/${product.slug || product._id}`}
        className="block h-full"
      >
        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#F7C7D3]/30 bg-white p-1.5 shadow-[0_2px_9px_rgba(238,66,117,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#EE4275]/50 hover:shadow-[0_18px_40px_rgba(238,66,117,0.12)]">
          
          {/* ===== IMAGE SECTION ===== */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#F7C7D3]/10 to-[#EE4275]/5">
            <div className="relative aspect-square w-full overflow-hidden">
              <img
                src={getCurrentImage()}
                alt={productName}
                className="w-full h-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                onError={() => handleImageError(activeIndex)}
                loading="lazy"
              />

              {/* Discount Badge - Zigzag with shimmer */}
              {discountPercent > 0 && (
                <motion.div
                  className="absolute left-1.5 top-1.5 z-10"
                  animate={isHovered ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}
                  transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
                >
                  <div
                    className="relative flex h-9 w-7 items-start justify-center overflow-hidden bg-[#EE4275] px-0.5 pt-1 text-center text-[7px] font-bold uppercase leading-[0.8] tracking-wide text-white"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 91%, 70% 100%, 55% 91%, 40% 100%, 25% 91%, 0 100%)',
                      fontFamily: FONT_FAMILY_SERIF
                    }}
                  >
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                    <span className="relative z-10 block leading-tight">
                      {discountPercent}%<br />OFF
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Tag Badge */}
              {primaryTag && (
                <div className="absolute right-1.5 top-1.5 z-10 flex items-center gap-0.5 rounded bg-gradient-to-r from-[#EE4275]/80 to-[#FF6B9D]/80 px-1 py-0.5 text-[7px] font-medium text-white backdrop-blur-sm">
                  <Sparkles className="h-1.5 w-1.5" />
                  <span className="truncate max-w-[25px]" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                    {primaryTag}
                  </span>
                </div>
              )}

              {/* Out of Stock Overlay */}
              {isOutOfStock && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-black/60">
                  <span className="rounded-full bg-black px-2 py-1 text-[10px] font-medium text-white" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                    Out of Stock
                  </span>
                </div>
              )}

              {/* Low Stock Badge */}
              {!isOutOfStock && isLowStock && (
                <div className="absolute bottom-2 left-2 z-10 flex items-center gap-0.5 rounded bg-orange-500 px-1 py-0.5 text-[7px] font-medium text-white">
                  <AlertTriangle className="h-1.5 w-1.5" />
                  <span className="hidden xs:inline" style={{ fontFamily: FONT_FAMILY_SERIF }}>Only {stockQuantity} left</span>
                  <span className="xs:hidden" style={{ fontFamily: FONT_FAMILY_SERIF }}>{stockQuantity} left</span>
                </div>
              )}

              {/* Desktop Hover Actions */}
              {!isMobile && (
                <div className={`absolute right-1.5 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1.5 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`}>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateToProduct(); }}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-[#F7C7D3]/30 bg-white text-gray-700 shadow-md transition-all hover:bg-[#EE4275] hover:text-white"
                    aria-label="View product"
                  >
                    <Eye className="h-2.5 w-2.5" />
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || cartStatusLoading}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex h-6 w-6 items-center justify-center rounded-full border border-[#F7C7D3]/30 bg-white shadow-md transition-all hover:bg-[#EE4275] hover:text-white ${cartStatusLoading ? 'pointer-events-none opacity-50' : ''}`}
                    aria-label="Add to cart"
                  >
                    {cartStatusLoading ? (
                      <Loader2 className="h-2.5 w-2.5 animate-spin" />
                    ) : isInCart ? (
                      <ShoppingCart className="h-2.5 w-2.5 text-green-500" />
                    ) : (
                      <ShoppingCart className="h-2.5 w-2.5" />
                    )}
                  </motion.button>
                </div>
              )}

              {/* Mobile Actions */}
              {isMobile && (
                <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 gap-2">
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateToProduct(); }}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm border border-[#F7C7D3]/30"
                    aria-label="View product"
                  >
                    <Eye className="h-2.5 w-2.5 text-gray-700" />
                  </button>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || cartStatusLoading}
                    className={`flex h-6 w-6 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm border ${isOutOfStock ? 'border-gray-200 bg-gray-100/80' : 'border-[#F7C7D3]/30'}`}
                    aria-label="Add to cart"
                  >
                    {cartStatusLoading ? (
                      <Loader2 className="h-2.5 w-2.5 animate-spin text-gray-500" />
                    ) : (
                      <ShoppingCart className={`h-2.5 w-2.5 ${isInCart ? 'text-[#EE4275]' : 'text-gray-700'}`} />
                    )}
                  </button>
                </div>
              )}

              {/* Image Navigation */}
              {hasMultipleImages && (
                <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1">
                  <motion.button
                    type="button"
                    onClick={prevImage}
                    className="rounded-full p-0.5"
                    aria-label="Previous image"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="h-3 w-3 text-[#EE4275]" />
                  </motion.button>
                  <div className="flex items-center gap-0.5">
                    {productImages.map((_, index) => (
                      <motion.button
                        key={index}
                        type="button"
                        onClick={(e) => goToImage(e, index)}
                        className={`rounded-full transition-all duration-200 ${activeIndex === index ? 'h-1.5 w-1.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]' : 'h-1 w-1 bg-[#F7C7D3]/60 hover:bg-[#EE4275]/50'}`}
                        whileHover={{ scale: 1.3 }}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                  <motion.button
                    type="button"
                    onClick={nextImage}
                    className="rounded-full p-0.5"
                    aria-label="Next image"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="h-3 w-3 text-[#FF6B9D]" />
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* ===== PRODUCT INFO ===== */}
          <div className="flex flex-1 flex-col px-1 pb-1 pt-1.5">
            {/* Brand + Stock Status */}
            <div className="mb-0.5 flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-[7px] font-semibold uppercase tracking-[0.12em] text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                {brand}
              </span>
              <div className="flex shrink-0 items-center gap-0.5">
                <span className={`h-1 w-1 rounded-full ${stockQuantity > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className={`text-[6px] font-medium ${stockQuantity > 0 ? 'text-emerald-600' : 'text-red-500'}`} style={{ fontFamily: FONT_FAMILY_SERIF }}>
                  {stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Product Name */}
            <h3
              className="min-h-[24px] line-clamp-2 text-[11px] font-semibold leading-[1.2] text-gray-800 transition-colors group-hover:text-[#EE4275]"
              style={{ fontFamily: FONT_FAMILY_SERIF }}
              title={productName}
            >
              {truncateText(productName, 30)}
            </h3>

            {/* Rating */}
            <div className="mt-0.5 flex items-center gap-0.5">
              <div className="flex items-center gap-0.5">{renderStars()}</div>
              <span className="text-[8px] font-medium text-gray-500" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                {rating.toFixed(1)}
              </span>
              {reviewCount > 0 && (
                <>
                  <span className="text-gray-300 hidden xs:inline">•</span>
                  <span className="text-[7px] text-gray-400 hidden xs:inline" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                    {reviewCount}
                  </span>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="my-1 h-px bg-gradient-to-r from-[#F7C7D3]/30 to-transparent" />

            {/* Price + Cart */}
            <div className="mt-auto flex items-center justify-between gap-2 pt-0.5">
              <div className="flex min-w-0 items-center gap-0.5 whitespace-nowrap">
                <span className="text-[13px] font-bold tracking-tight text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                  ৳{formatPrice(currentPrice)}
                </span>
                {discountPercent > 0 && (
                  <>
                    <span className="text-[6px] text-gray-400 line-through" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                      ৳{formatPrice(originalPrice)}
                    </span>
                    <span className="text-[6px] font-semibold text-white bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-0.5 py-0.5 rounded hidden sm:inline-block" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>
              <motion.button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || cartStatusLoading}
                onMouseEnter={() => setIsCartHovered(true)}
                onMouseLeave={() => setIsCartHovered(false)}
                whileHover={!isOutOfStock ? { scale: 1.08 } : {}}
                whileTap={!isOutOfStock ? { scale: 0.92 } : {}}
                animate={isCartHovered && !isOutOfStock ? { rotate: [0, -10, 10, -6, 6, 0] } : {}}
                transition={{ duration: 0.5 }}
                aria-label={isInCart ? 'View cart' : 'Add to cart'}
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                  isInCart
                    ? 'bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white shadow-[0_4px_12px_rgba(168,8,131,0.22)]'
                    : isOutOfStock
                    ? 'cursor-not-allowed bg-gray-100 text-gray-300'
                    : 'border border-[#F7C7D3] bg-white text-[#EE4275] hover:border-[#EE4275] hover:bg-[#EE4275] hover:text-white hover:shadow-[0_4px_12px_rgba(238,66,117,0.18)]'
                }`}
              >
                {cartStatusLoading ? (
                  <Loader2 className="h-2.5 w-2.5 animate-spin" />
                ) : (
                  <ShoppingCart className="h-2.5 w-2.5" />
                )}
              </motion.button>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

// ========== REVIEW COMPONENT ==========

const ReviewItem = ({ review, isOwner }) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful || 0);
  const [isHelpful, setIsHelpful] = useState(false);
  const [markingHelpful, setMarkingHelpful] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [videoThumbnails, setVideoThumbnails] = useState({});
  const [generatingThumbnails, setGeneratingThumbnails] = useState({});
  const [mediaItems, setMediaItems] = useState([]);
  const thumbnailGeneratedRef = useRef({});

  const handleHelpful = async () => {
    if (isHelpful) return;
    
    setMarkingHelpful(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to mark reviews as helpful');
        return;
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${review._id}/helpful`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setHelpfulCount(prev => prev + 1);
        setIsHelpful(true);
        toast.success('Thanks for your feedback!');
      }
    } catch (error) {
      console.error('Error marking helpful:', error);
    } finally {
      setMarkingHelpful(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  // Get YouTube thumbnail for video
  const getYouTubeThumbnail = (url) => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\s?#]+)/,
      /youtube\.com\/v\/([^&\s?#]+)/,
      /youtube\.com\/live\/([^&\s?#]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
      }
    }
    return null;
  };

  // Generate video thumbnail from uploaded video
  const generateVideoThumbnail = useCallback((videoUrl, videoId) => {
    if (thumbnailGeneratedRef.current[videoId] || generatingThumbnails[videoId]) {
      return;
    }
    
    thumbnailGeneratedRef.current[videoId] = true;
    setGeneratingThumbnails(prev => ({ ...prev, [videoId]: true }));
    
    const video = document.createElement('video');
    video.crossOrigin = 'Anonymous';
    video.src = videoUrl;
    video.currentTime = 1.5;
    
    const handleLoadedData = () => {
      setTimeout(() => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          canvas.width = 160;
          canvas.height = 160;
          
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
          setVideoThumbnails(prev => ({ ...prev, [videoId]: thumbnailUrl }));
          setGeneratingThumbnails(prev => ({ ...prev, [videoId]: false }));
        } catch (error) {
          console.error('Error generating thumbnail:', error);
          setGeneratingThumbnails(prev => ({ ...prev, [videoId]: false }));
        }
      }, 100);
    };
    
    const handleError = () => {
      console.error('Error loading video for thumbnail generation');
      setGeneratingThumbnails(prev => ({ ...prev, [videoId]: false }));
    };
    
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    
    video.load();
    
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [generatingThumbnails]);

  useEffect(() => {
    const items = [];
    
    if (review.images && review.images.length > 0) {
      review.images.forEach(img => {
        items.push({
          type: 'image',
          url: img.url,
          thumbnail: img.url,
          id: `img-${Date.now()}-${Math.random()}`
        });
      });
    }
    
    if (review.video && review.video.url) {
      const videoId = `video-${Date.now()}-${Math.random()}`;
      const isYouTube = review.videoType === 'youtube' || review.video.url?.includes('youtube.com') || review.video.url?.includes('youtu.be');
      
      items.push({
        type: 'video',
        url: review.video.url,
        videoType: review.videoType || 'upload',
        thumbnail: review.video.thumbnail || review.video.url,
        id: videoId,
        isYouTube: isYouTube
      });
      
      if (!isYouTube && !videoThumbnails[videoId] && !thumbnailGeneratedRef.current[videoId]) {
        generateVideoThumbnail(review.video.url, videoId);
      }
    }
    
    setMediaItems(items);
  }, [review]);

  const handleMediaClick = (index) => {
    setSelectedMediaIndex(index);
    setMediaModalOpen(true);
  };

  return (
    <>
      <div className={`border-b border-[#F7C7D3]/20 last:border-0 py-4 last:pb-0 ${review.status === 'pending' ? 'opacity-80 bg-[#FFF5F6]/50 rounded-lg px-3 -mx-3' : ''}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
              review.status === 'pending' 
                ? 'bg-[#EE4275]' 
                : 'bg-[#2D1B2E]'
            }`}>
              {review.isAnonymous ? 'A' : getInitials(review.userName)}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-gray-900 text-sm" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                  {review.isAnonymous ? 'Anonymous User' : review.userName}
                </p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  {renderStars(review.rating)}
                  <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
                  {review.isVerifiedPurchase && (
                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                      Verified
                    </span>
                  )}
                  {isOwner && (
                    <span className="text-[10px] bg-[#EE4275]/10 text-[#EE4275] px-1.5 py-0.5 rounded-full font-medium">
                      Your Review
                    </span>
                  )}
                  {review.status === 'pending' && (
                    <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Pending Approval
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {review.title && (
              <h4 className="font-semibold text-gray-800 text-sm mt-1.5" style={{ fontFamily: FONT_FAMILY_SERIF }}>{review.title}</h4>
            )}
            
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">{review.comment}</p>
            
            {review.status === 'pending' && isOwner && (
              <div className="mt-2 text-xs text-yellow-600 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                <Clock className="w-3 h-3 inline mr-1" />
                This review is awaiting moderation. It will be visible to others once approved.
              </div>
            )}
            
            {review.status === 'approved' && mediaItems.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {mediaItems.map((item, idx) => {
                  if (item.type === 'image') {
                    return (
                      <img
                        key={item.id || idx}
                        src={item.url}
                        alt={`Review image ${idx + 1}`}
                        className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-[#F7C7D3]/30 hover:border-[#EE4275]"
                        onClick={() => handleMediaClick(idx)}
                      />
                    );
                  } else if (item.type === 'video') {
                    const isYouTube = item.isYouTube;
                    const thumbUrl = isYouTube 
                      ? getYouTubeThumbnail(item.url) 
                      : (videoThumbnails[item.id] || item.thumbnail);
                    
                    return (
                      <button
                        key={item.id || idx}
                        onClick={() => handleMediaClick(idx)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 relative border-[#F7C7D3]/30 hover:border-[#EE4275]`}
                      >
                        {thumbUrl ? (
                          <img 
                            src={thumbUrl} 
                            alt="Video thumbnail" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
                            }}
                          />
                        ) : null}
                        
                        <div 
                          className="fallback-icon w-full h-full bg-gray-100 flex flex-col items-center justify-center"
                          style={{ 
                            display: thumbUrl ? 'none' : 'flex' 
                          }}
                        >
                          {generatingThumbnails[item.id] ? (
                            <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
                          ) : (
                            <Play className="w-4 h-4 text-gray-500" />
                          )}
                        </div>
                        
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            )}
            
            {review.status === 'approved' && review.reply?.text && (
              <div className="mt-3 bg-[#FFF5F6] rounded-lg p-3 border border-[#F7C7D3]/30">
                <p className="text-xs font-medium text-[#EE4275] mb-1" style={{ fontFamily: FONT_FAMILY_SERIF }}>Seller Response</p>
                <p className="text-sm text-gray-600">{review.reply.text}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.reply.repliedAt).toLocaleDateString()}
                </p>
              </div>
            )}
            
            {review.status === 'approved' && (
              <button
                onClick={handleHelpful}
                disabled={markingHelpful || isHelpful}
                className={`mt-2 flex items-center gap-1.5 text-xs transition-colors ${
                  isHelpful 
                    ? 'text-[#EE4275]' 
                    : 'text-gray-400 hover:text-[#EE4275]'
                } disabled:opacity-50`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${isHelpful ? 'fill-[#EE4275]' : ''}`} />
                <span>Helpful ({helpfulCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <ReviewMediaModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        mediaItems={mediaItems}
        initialIndex={selectedMediaIndex}
        reviewTitle={review.title || review.comment?.slice(0, 50)}
      />
    </>
  );
};

// ========== MAIN PRODUCT CLIENT COMPONENT ==========

export default function ProductClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const [productIdentifier, setProductIdentifier] = useState(null);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [imageLoaded, setImageLoaded] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [generatingThumbnail, setGeneratingThumbnail] = useState(false);
  const [checkingCart, setCheckingCart] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselItemsPerView, setCarouselItemsPerView] = useState(5);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef(null);
  const [productsInCart, setProductsInCart] = useState({});
  const [activeTab, setActiveTab] = useState('description');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [faqOpenStates, setFaqOpenStates] = useState({});
  
  // ========== REVIEW STATE ==========
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewTotalPages, setReviewTotalPages] = useState(1);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [reviewSort, setReviewSort] = useState('newest');
  const [userReview, setUserReview] = useState(null);
  const [checkingUserReview, setCheckingUserReview] = useState(false);
  
  // ========== COLOR SELECTION STATE ==========
  const [selectedColors, setSelectedColors] = useState([]);
  const [colorQuantities, setColorQuantities] = useState({});
  const [colorError, setColorError] = useState(null);
  
  // For single product without colors
  const [singleQuantity, setSingleQuantity] = useState(1);
  
  const galleryRef = useRef(null);

  const openCartSidebar = () => {
    setIsCartOpen(true);
  };

  const closeCartSidebar = () => {
    setIsCartOpen(false);
  };

  // ========== CART STATUS FUNCTIONS ==========
  const checkCartStatus = async () => {
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
        setCheckingCart(false);
        return;
      }
      
      if (!product || !product._id) {
        setCheckingCart(false);
        return;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/check/${product._id}`, { headers });
      const data = await response.json();
      
      if (data.success) {
        setIsInCart(data.data.inCart || false);
      } else {
        setIsInCart(false);
      }
    } catch (error) {
      console.error('Error checking cart status:', error);
      setIsInCart(false);
    } finally {
      setCheckingCart(false);
    }
  };

  const toggleFaq = (index) => {
    setFaqOpenStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // ========== REVIEW FUNCTIONS ==========
  
  const fetchReviews = async (page = 1) => {
    if (!product?._id) return;
    
    setLoadingReviews(true);
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const params = new URLSearchParams({
        productId: product._id,
        page: page,
        limit: 5,
        status: 'approved'
      });
      
      if (reviewSort === 'newest') params.append('sort', '-createdAt');
      else if (reviewSort === 'oldest') params.append('sort', 'createdAt');
      else if (reviewSort === 'highest') params.append('sort', '-rating');
      else if (reviewSort === 'lowest') params.append('sort', 'rating');
      
      if (token) {
        params.append('includeUserPending', 'true');
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews?${params}`, {
        headers
      });
      const data = await response.json();
      
      if (data.success) {
        let reviewData = data.data || [];
        
        if (reviewFilter === 'with_media') {
          reviewData = reviewData.filter(r => 
            (r.images && r.images.length > 0) || (r.video && r.video.url)
          );
        }
        
        reviewData.sort((a, b) => {
          if (a.status === 'pending' && b.status !== 'pending') return -1;
          if (a.status !== 'pending' && b.status === 'pending') return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        setReviews(reviewData);
        setReviewStats(data.stats || null);
        setReviewTotal(data.pagination?.total || 0);
        setReviewTotalPages(data.pagination?.pages || 1);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const checkUserReview = async () => {
    const token = localStorage.getItem('token');
    if (!token || !product?._id) return;
    
    setCheckingUserReview(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews?productId=${product._id}&userId=me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        setUserReview(data.data[0]);
      } else {
        setUserReview(null);
      }
    } catch (error) {
      console.error('Error checking user review:', error);
    } finally {
      setCheckingUserReview(false);
    }
  };

  // ========== EFFECTS ==========
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let id = searchParams.get('id');
    
    if (!id) {
      const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
      const segments = cleanPath.split('/');
      
      if (segments[0] === 'product' && segments[1]) {
        id = segments[1];
      }
    }
    
    if (id && id !== productIdentifier) {
      setProductIdentifier(id);
    }
  }, [searchParams, pathname]);

  useEffect(() => {
    if (productIdentifier) {
      fetchProductDetails();
    }
  }, [productIdentifier]);

  useEffect(() => {
    if (product) {
      setSelectedColors([]);
      setColorQuantities({});
      setColorError(null);
      setSingleQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    if (product?.videoUrl && product?.videoType !== 'youtube' && !videoThumbnail && !generatingThumbnail) {
      setGeneratingThumbnail(true);
      generateVideoThumbnail(product.videoUrl, (thumbnail) => {
        if (thumbnail) {
          setVideoThumbnail(thumbnail);
        }
        setGeneratingThumbnail(false);
      });
    }
  }, [product?.videoUrl, product?.videoType]);

  useEffect(() => {
    if (product && product._id) {
      checkCartStatus();
      checkUserReview();
    }
  }, [product]);

  useEffect(() => {
    const handleCartUpdate = () => {
      if (product && product._id) {
        setCheckingCart(true);
        checkCartStatus();
      }
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-update', handleCartUpdate);
    };
  }, [product]);

  useEffect(() => {
    const handleAuthChange = () => {
      if (product && product._id) {
        setIsInCart(false);
        setCheckingCart(true);
        setTimeout(() => {
          checkCartStatus();
          checkUserReview();
        }, 100);
      }
    };
    
    window.addEventListener('auth-change', handleAuthChange);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, [product]);

  useEffect(() => {
    const handleFocus = () => {
      if (product && product._id) {
        checkCartStatus();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [product]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCarouselItemsPerView(2);
      } else if (window.innerWidth < 768) {
        setCarouselItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setCarouselItemsPerView(3);
      } else {
        setCarouselItemsPerView(5);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 useEffect(() => {
  if (isAutoScrolling && relatedProducts.length > carouselItemsPerView) {
    autoScrollIntervalRef.current = setInterval(() => {
      setCarouselIndex((prev) => {
        const totalSlides = Math.ceil(relatedProducts.length / carouselItemsPerView);
        if (prev >= totalSlides - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);
  }
  
  return () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
  };
}, [isAutoScrolling, relatedProducts.length, carouselItemsPerView]);

  useEffect(() => {
    if (product && product.faqs && product.faqs.length > 0) {
      const initialStates = {};
      product.faqs.forEach((_, index) => {
        initialStates[index] = false;
      });
      setFaqOpenStates(initialStates);
    }
  }, [product]);

  useEffect(() => {
    const refreshRelatedProductsStatus = async () => {
      if (relatedProducts.length === 0) return;
      
      const productIds = relatedProducts.map(p => p._id);
      const token = localStorage.getItem('token');
      const cartSessionId = localStorage.getItem('cartSessionId');
      
      const cartHeaders = {};
      if (token) cartHeaders['Authorization'] = `Bearer ${token}`;
      else if (cartSessionId) cartHeaders['x-session-id'] = cartSessionId;
      
      try {
        const cartResponse = await fetch('http://localhost:5000/api/cart/check-status', {
          method: 'POST',
          headers: { ...cartHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds })
        });
        const cartData = await cartResponse.json();
        if (cartData.success) setProductsInCart(cartData.data);
      } catch (error) {
        console.error('Error refreshing cart status:', error);
      }
    };
    
    refreshRelatedProductsStatus();
    
    const handleCartUpdate = () => refreshRelatedProductsStatus();
    window.addEventListener('cart-update', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-update', handleCartUpdate);
    };
  }, [relatedProducts]);

  useEffect(() => {
    if (product?._id && activeTab === 'reviews') {
      fetchReviews(reviewPage);
    }
  }, [product?._id, activeTab, reviewPage, reviewFilter, reviewSort]);

  const handleCarouselInteraction = () => {
    setIsAutoScrolling(false);
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 5000);
  };

  const handlePrevSlide = () => {
  handleCarouselInteraction();
  setCarouselIndex((prev) => Math.max(0, prev - 1));
};

const handleNextSlide = () => {
  handleCarouselInteraction();
  const totalSlides = Math.ceil(relatedProducts.length / carouselItemsPerView);
  setCarouselIndex((prev) => Math.min(prev + 1, totalSlides - 1));
};

  // ========== FETCH PRODUCT DETAILS ==========
  const fetchProductDetails = async () => {
    if (!productIdentifier) {
      toast.error('Product not found');
      router.push('/products');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products/${encodeURIComponent(productIdentifier)}`);
      const data = await response.json();
      
      if (data.success) {
        const productData = data.data.product;
        setProduct(productData);
        setRelatedProducts(data.data.relatedProducts || []);
        
        if (productData.slug) {
          const currentPath = window.location.pathname;
          const normalizedCurrentPath = currentPath.replace(/\/+$/, '');
          const expectedPath = `/product/${productData.slug}`;
          
          if (normalizedCurrentPath !== expectedPath) {
            window.history.replaceState({}, '', expectedPath);
          }
        }
        
      } else {
        toast.error('Product not found');
        router.push('/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  // ========== COLOR MANAGEMENT FUNCTIONS ==========
  
  const addColorSelection = (color) => {
    if (selectedColors.includes(color)) {
      toast.warning(`${color} is already selected`);
      return;
    }
    
    const totalSelectedQuantity = Object.values(colorQuantities).reduce((sum, qty) => sum + qty, 0);
    if (totalSelectedQuantity + 1 > product.stockQuantity) {
      toast.error(`Only ${product.stockQuantity} items available in total`);
      return;
    }
    
    setSelectedColors([...selectedColors, color]);
    setColorQuantities(prev => ({ ...prev, [color]: 1 }));
    setColorError(null);
  };

  const removeColorSelection = (color) => {
    setSelectedColors(selectedColors.filter(c => c !== color));
    const newQuantities = { ...colorQuantities };
    delete newQuantities[color];
    setColorQuantities(newQuantities);
  };

  const updateColorQuantity = (color, newQuantity) => {
    if (newQuantity === '') {
      setColorQuantities(prev => ({ ...prev, [color]: '' }));
      return;
    }
    
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) {
      return;
    }
    
    const totalOtherQuantities = Object.entries(colorQuantities)
      .filter(([c]) => c !== color)
      .reduce((sum, [, qty]) => sum + (typeof qty === 'string' ? parseInt(qty) || 0 : qty || 0), 0);
    
    if (totalOtherQuantities + quantity > product.stockQuantity) {
      toast.error(`Only ${product.stockQuantity - totalOtherQuantities} more items available`);
      return;
    }
    
    setColorQuantities(prev => ({ ...prev, [color]: quantity }));
  };

  const getTotalColorQuantity = () => {
    return Object.values(colorQuantities).reduce((sum, qty) => sum + qty, 0);
  };

  const hasSelectedColors = () => {
    return selectedColors.length > 0;
  };

  // ========== QUANTITY HANDLERS ==========
  
  const handleSingleQuantityChange = (delta) => {
    const newQuantity = singleQuantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 10)) {
      setSingleQuantity(newQuantity);
    }
  };

  const handleSingleQuantityInput = (e) => {
    const rawValue = e.target.value;
    
    if (rawValue === '') {
      setSingleQuantity('');
      return;
    }
    
    let value = parseInt(rawValue);
    
    if (isNaN(value)) {
      setSingleQuantity(1);
      return;
    }
    
    if (value < 1) {
      value = 1;
    } else if (value > product.stockQuantity) {
      value = product.stockQuantity;
      toast.error(`Maximum quantity available is ${product.stockQuantity}`);
    }
    
    setSingleQuantity(value);
  };

  // ========== ADD TO CART ==========
  
  const handleAddToCart = async () => {
    const hasColors = product?.colors && product.colors.length > 0;
    
    if (hasColors && !hasSelectedColors()) {
      setColorError('Please select at least one color');
      toast.error('Please select at least one color before adding to cart');
      return;
    }
    
    if (product.stockQuantity <= 0) {
      toast.error('Out of stock');
      return;
    }
    
    setAddingToCart(true);
    const toastId = toast.loading('Adding items to cart...');
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;

      let successCount = 0;
      let errorCount = 0;
      let lastResponseData = null;

      if (!hasColors) {
        const finalQuantity = singleQuantity === '' || singleQuantity === null ? 1 : singleQuantity;
        const response = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers,
          body: JSON.stringify({ 
            productId: product._id, 
            quantity: finalQuantity,
            selectedColor: null 
          })
        });
        const data = await response.json();
        lastResponseData = data;
        if (data.success) {
          successCount++;
        } else {
          errorCount++;
        }
      } else {
        for (const color of selectedColors) {
          const quantity = colorQuantities[color] || 1;
          const response = await fetch('http://localhost:5000/api/cart', {
            method: 'POST',
            headers,
            body: JSON.stringify({ 
              productId: product._id, 
              quantity: quantity,
              selectedColor: color 
            })
          });
          const data = await response.json();
          lastResponseData = data;
          if (data.success) {
            successCount++;
          } else {
            errorCount++;
            console.error(`Failed to add ${color}:`, data.error);
          }
        }
      }

      if (successCount > 0) {
        if (lastResponseData?.sessionId && !token) {
          localStorage.setItem('cartSessionId', lastResponseData.sessionId);
        }
        setIsInCart(true);
        toast.success(`${successCount} item(s) added to cart!`, { id: toastId });
        window.dispatchEvent(new Event('cart-update'));
        setTimeout(() => window.dispatchEvent(new Event('cart-update')), 500);
        
        if (hasColors) {
          setSelectedColors([]);
          setColorQuantities({});
        } else {
          setSingleQuantity(1);
        }
      } else {
        toast.error('Failed to add items to cart', { id: toastId });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error', { id: toastId });
    } finally {
      setAddingToCart(false);
    }
  };

  // ========== BUY NOW ==========
const handleBuyNow = async () => {
  const hasColors = product?.colors && product.colors.length > 0;
  
  if (hasColors && !hasSelectedColors()) {
    setColorError('Please select at least one color');
    toast.error('Please select a color before proceeding');
    return;
  }
  
  if (product.stockQuantity <= 0) {
    toast.error('Out of stock');
    return;
  }
  
  setAddingToCart(true);
  const toastId = toast.loading('Processing...');
  
  try {
    const token = localStorage.getItem('token');
    let sessionId = localStorage.getItem('cartSessionId');
    
    if (!token && !sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('cartSessionId', sessionId);
    }
    
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (sessionId) {
      headers['x-session-id'] = sessionId;
    }

    let successCount = 0;
    let lastResponseData = null;

    if (!hasColors) {
      const finalQuantity = singleQuantity === '' || singleQuantity === null ? 1 : singleQuantity;
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          productId: product._id, 
          quantity: finalQuantity,
          selectedColor: null 
        })
      });
      const data = await response.json();
      lastResponseData = data;
      if (data.success) {
        successCount++;
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
      }
    } else {
      for (const color of selectedColors) {
        const quantity = colorQuantities[color] || 1;
        const response = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers,
          body: JSON.stringify({ 
            productId: product._id, 
            quantity: quantity,
            selectedColor: color 
          })
        });
        const data = await response.json();
        lastResponseData = data;
        if (data.success) {
          successCount++;
          if (data.sessionId && !token) {
            localStorage.setItem('cartSessionId', data.sessionId);
          }
        }
      }
    }

    if (successCount > 0) {
      setIsInCart(true);
      window.dispatchEvent(new Event('cart-update'));
      toast.success('Redirecting to checkout...', { id: toastId });
      setTimeout(() => router.push('/checkout'), 500);
    } else {
      toast.error(lastResponseData?.error || 'Failed to process', { id: toastId });
    }
  } catch (error) {
    console.error('Buy now error:', error);
    toast.error('Network error', { id: toastId });
  } finally {
    setAddingToCart(false);
  }
};

  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
  };

  // ========== RENDER REVIEW STARS ==========
  const renderStarsForReview = (rating, size = 'small') => {
    const starSize = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!productIdentifier) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
          <Link href="/products" className="inline-block px-6 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-full hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (loading) return <ProductSkeleton />;
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
          <Link href="/products" className="inline-block px-6 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-full hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const discountPercent = calculateDiscount(product.regularPrice, product.discountPrice);
  const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
  const stockStatus = getStockStatus(product.stockQuantity, product.stockAlertQuantity);
  const StockIcon = stockStatus.icon;
  const productImages = product.images || [];
  const hasVideo = product.videoUrl && product.videoUrl.trim() !== '';
  const mediaItems = [...productImages];
  if (hasVideo) {
    mediaItems.push({ type: 'video', url: product.videoUrl, videoType: product.videoType });
  }
  const mainMedia = mediaItems[activeImageIndex];
  const isMainVideo = mainMedia?.type === 'video';
  const mainImage = !isMainVideo ? mainMedia?.url : null;
  const mainVideoUrl = isMainVideo ? mainMedia?.url : null;
  const mainVideoType = isMainVideo ? mainMedia?.videoType : null;

  const categoryHierarchy = [];
  if (product.categoryName) categoryHierarchy.push(product.categoryName);
  if (product.subcategoryName) categoryHierarchy.push(product.subcategoryName);
  if (product.childSubcategoryName) categoryHierarchy.push(product.childSubcategoryName);

  const hasDeliveryInfo = product.deliveryInfo && product.deliveryInfo !== '<p></p>' && product.deliveryInfo.trim() !== '';

  const specifications = [
    { label: 'Brand', value: product.brand, icon: Building2 },
    { label: 'SKU', value: product.skuCode, icon: Package },
    { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
    { label: 'Category', value: product.categoryName, icon: FolderTree },
    { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
    { label: 'Unit', value: product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A', icon: Scale },
  ].filter(item => item.value);

  if (product.additionalInfo && product.additionalInfo.length > 0) {
    product.additionalInfo.forEach(info => {
      if (info.fieldName && info.fieldValue) {
        specifications.push({
          label: info.fieldName,
          value: info.fieldValue,
          icon: Info
        });
      }
    });
  }

  const hasColors = product.colors && product.colors.length > 0;
  const totalSelectedQuantity = getTotalColorQuantity();
  const remainingStock = product.stockQuantity - totalSelectedQuantity;

  const primaryTag = product.tags?.[0];
  const primaryTagName = getTagName(primaryTag);

  const averageRating = product.rating || 0;
  const totalReviews = product.reviewStats?.totalReviews || 0;

  return (
    <>
      {product && <MetadataUpdater product={product} />}
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF5F6]/30 to-white">
        <div className="container mx-auto px-3 sm:px-4 py-4 md:py-6 lg:py-8 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-4 md:mb-6 overflow-x-auto pb-2">
            <Link href="/" className="text-gray-500 hover:text-[#EE4275] transition whitespace-nowrap" style={{ fontFamily: FONT_FAMILY_SERIF }}>Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-[#EE4275] transition whitespace-nowrap" style={{ fontFamily: FONT_FAMILY_SERIF }}>Products</Link>
            {categoryHierarchy.map((cat, idx) => (
              <React.Fragment key={idx}>
                <span className="text-gray-400">/</span>
                <span className="text-gray-500 truncate max-w-[100px] sm:max-w-none" style={{ fontFamily: FONT_FAMILY_SERIF }}>{cat}</span>
              </React.Fragment>
            ))}
            <span className="text-gray-400">/</span>
            <span className="text-[#EE4275] font-medium truncate max-w-[150px] sm:max-w-none" style={{ fontFamily: FONT_FAMILY_SERIF }}>{product.productName}</span>
          </nav>

           <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
            {/* Left Column - Product Gallery with Thumbnails on Left */}
           <div className="lg:col-span-3" ref={galleryRef}>
  <div className="sticky top-20 lg:top-24">
    <div className="relative bg-white rounded-2xl border border-[#F7C7D3]/30 overflow-hidden shadow-[0_2px_9px_rgba(238,66,117,0.06)]">
      {/* Flex container for thumbnails (left) + main image (right) */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-2 sm:p-3">
        {/* Thumbnails - Left side on desktop, top on mobile */}
        <div className="flex sm:flex-col gap-1.5 sm:gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[600px] order-2 sm:order-1 flex-shrink-0 sm:w-16 md:w-20">
          {productImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (activeImageIndex !== idx) {
                  setActiveImageIndex(idx);
                  setImageLoaded(prev => ({ ...prev, [idx]: false }));
                  setIsZoomed(false);
                }
              }}
              onMouseEnter={() => {
                preloadImage(img.url);
                if (activeImageIndex !== idx) {
                  setActiveImageIndex(idx);
                  setImageLoaded(prev => ({ ...prev, [idx]: false }));
                  setIsZoomed(false);
                }
              }}
              className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                activeImageIndex === idx 
                  ? 'border-[#EE4275] shadow-[0_0_0_2px_rgba(238,66,117,0.2)] sm:shadow-[0_0_0_3px_rgba(238,66,117,0.2)]' 
                  : 'border-[#F7C7D3]/30 hover:border-[#EE4275]/50'
              }`}
            >
              <img 
                src={img.url} 
                alt={`Thumb ${idx + 1}`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
          
          {hasVideo && (
            <button
              onClick={() => {
                if (activeImageIndex !== productImages.length) {
                  setActiveImageIndex(productImages.length);
                  setIsZoomed(false);
                }
              }}
              className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
                activeImageIndex === productImages.length 
                  ? 'border-[#EE4275] shadow-[0_0_0_2px_rgba(238,66,117,0.2)] sm:shadow-[0_0_0_3px_rgba(238,66,117,0.2)]' 
                  : 'border-[#F7C7D3]/30 hover:border-[#EE4275]/50'
              }`}
            >
              {product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl) ? (
                <img 
                  src={getYouTubeThumbnail(product.videoUrl)} 
                  alt="Video thumbnail" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
                  }}
                />
              ) : 
              product.videoType !== 'youtube' && videoThumbnail ? (
                <img 
                  src={videoThumbnail} 
                  alt="Video thumbnail" 
                  className="w-full h-full object-cover"
                />
              ) : null}
              
              <div 
                className="fallback-icon w-full h-full bg-gradient-to-br from-[#F7C7D3]/30 to-[#EE4275]/10 flex flex-col items-center justify-center"
                style={{ 
                  display: (product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl)) || 
                           (product.videoType !== 'youtube' && videoThumbnail) ? 'none' : 'flex' 
                }}
              >
                {generatingThumbnail ? (
                  <>
                    <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#EE4275] animate-spin" />
                    <span className="text-[6px] sm:text-[8px] text-[#EE4275] mt-0.5">Loading</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-[#EE4275]" />
                    <span className="text-[6px] sm:text-[8px] text-[#EE4275] mt-0.5">Video</span>
                  </>
                )}
              </div>
              
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </button>
          )}
        </div>

        {/* Main Image - Right side - INCREASED HEIGHT to match thumbnails */}
        <div className="flex-1 order-1 sm:order-2 relative">
          <div 
            className="relative bg-white rounded-xl overflow-hidden border border-[#F7C7D3]/30 shadow-sm w-full"
            style={{ height: 'auto', minHeight: '450px' }}
            onMouseEnter={() => !isMainVideo && !isMobile && setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={(e) => {
              if (!isZoomed || isMainVideo || isMobile) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              setZoomPosition({
                x: Math.min(Math.max(x, 0), 100),
                y: Math.min(Math.max(y, 0), 100)
              });
            }}
          >
            {/* Changed from pt-[75%] to pt-[100%] for taller image to match thumbnails height */}
            <div className="relative w-full pt-[100%]">
              {(isTransitioning || !imageLoaded[activeImageIndex]) && !isMainVideo && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#F7C7D3]/10 to-[#EE4275]/5 animate-pulse z-10" />
              )}
              
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {!isMainVideo && mainImage ? (
                  <>
                    <img
                      key={activeImageIndex}
                      src={mainImage}
                      alt={product.productName}
                      className={`w-full h-full object-contain p-3 sm:p-4 bg-white transition-opacity duration-300 ${
                        imageLoaded[activeImageIndex] ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        transform: isZoomed && !isMobile ? 'scale(1.8)' : 'scale(1)',
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        transition: 'transform 0.15s ease-out'
                      }}
                      onLoad={() => {
                        setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
                        setTimeout(() => setIsTransitioning(false), 100);
                      }}
                      loading={activeImageIndex === 0 ? "eager" : "lazy"}
                      fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
                      decoding="async"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Available';
                        setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
                      }}
                    />
                    
                    {isZoomed && !isMobile && !isMainVideo && (
                      <div className="absolute inset-0 bg-[#FFF5F6]/30 backdrop-blur-[1px] pointer-events-none z-10" />
                    )}
                  </>
                ) : isMainVideo && mainVideoUrl && (
                  mainVideoType === 'youtube' ? (
                    <iframe 
                      src={mainVideoUrl} 
                      className="w-full h-full aspect-square" 
                      allowFullScreen 
                      title="Product Video"
                    />
                  ) : (
                    <video 
                      src={mainVideoUrl} 
                      controls 
                      className="w-full h-full object-contain bg-white"
                    />
                  )
                )}
              </div>
            </div>

            {!isMainVideo && !isMobile && !isZoomed && (
              <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none z-20">
                <div className="bg-white/80 backdrop-blur-sm text-[#2D1B2E] text-[8px] sm:text-[10px] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 opacity-0 hover:opacity-100 transition-opacity shadow-lg border border-[#F7C7D3]/30">
                  <ZoomIn className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#EE4275]" />
                  <span className="hidden xs:inline font-medium">Hover to zoom</span>
                </div>
              </div>
            )}

            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex gap-1 sm:gap-2 z-30">
              {!isMainVideo && (
                <button
                  onClick={() => setShowZoom(true)}
                  className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-105"
                  aria-label="View fullscreen"
                >
                  <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#EE4275]" />
                </button>
              )}
            </div>

            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[8px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full z-30">
              {activeImageIndex + 1} / {productImages.length}
            </div>
          </div>
          
          {discountPercent > 0 && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[8px] sm:text-[10px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 z-40">
              <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
              {discountPercent}% OFF
            </div>
          )}
          {product.tags?.[0] && (
            <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${getTagStyles(product.tags[0])} text-[7px] sm:text-[9px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 z-40`}>
              <Sparkles className="w-2 h-2 sm:w-3 sm:h-3" />
              {getTagName(product.tags[0])}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

            {/* Right Column - Product Info */}
            <div className="lg:col-span-4 bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-2xl shadow-[0_2px_9px_rgba(238,66,117,0.06)] border border-[#F7C7D3]/30">
              {/* Category Hierarchy */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {categoryHierarchy.map((cat, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-[#FFF5F6] text-[#EE4275] border border-[#F7C7D3]/30"
                    style={{ fontFamily: FONT_FAMILY_SERIF }}
                  >
                    <FolderTree className="w-2 h-2 sm:w-3 sm:h-3" />
                    {cat}
                  </span>
                ))}
                
                {product.brand && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-[#FFF5F6] text-[#EE4275] border border-[#F7C7D3]/30">
                    <Building2 className="w-2 h-2 sm:w-3 sm:h-3" />
                    {product.brand}
                  </span>
                )}
              </div>

              {/* Title */}
              <div className="mb-3 sm:mb-4">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
                  {product.productName}
                </h1>
              </div>

              {/* Price Card */}
              <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-gradient-to-r from-[#FFF5F6] to-[#F7C7D3]/20 rounded-xl border border-[#F7C7D3]/30">
                <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_SERIF }}>৳{formatPrice(currentPrice)}</span>
                  {discountPercent > 0 && (
                    <>
                      <span className="text-sm sm:text-base text-gray-400 line-through">৳{formatPrice(product.regularPrice)}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-white bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                        <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
                        Save {discountPercent}%
                      </span>
                    </>
                  )}
                </div>
                {product.codAvailable && (
                  <div className="flex items-center gap-1.5 mt-2 sm:mt-3 text-green-600 text-xs sm:text-sm bg-green-50 inline-flex px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                    <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span style={{ fontFamily: FONT_FAMILY_SERIF }}>Cash on Delivery available</span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-white rounded-xl border border-[#F7C7D3]/30">
                {product.shortDescription && product.shortDescription !== '<p></p>' ? (
                  <div 
                    className="text-xs sm:text-sm text-gray-600 prose-short"
                    style={{ fontFamily: FONT_FAMILY_SERIF }}
                    dangerouslySetInnerHTML={{ __html: product.shortDescription }} 
                  />
                ) : (
                  <p className="text-xs sm:text-sm text-gray-400 italic" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                    No short description available.
                  </p>
                )}
              </div>

{hasColors ? (
  <div className="mb-4 p-3 sm:p-4 bg-[#FFF5F6] rounded-xl border border-[#F7C7D3]/30">
    <div className="flex items-center justify-between mb-2">
      <label className="text-xs font-medium text-[#2D1B2E] flex items-center gap-1.5" style={{ fontFamily: FONT_FAMILY_SERIF }}>
        <Palette className="w-3.5 h-3.5 text-[#EE4275]" />
        Select Colors:
        <span className="text-[#EE4275] text-xs">*</span>
      </label>
      <span className="text-xs text-gray-500">
        {totalSelectedQuantity > 0 ? (
          <span className="text-[#EE4275]">Selected: {totalSelectedQuantity} items</span>
        ) : (
          <span>Click a color to add</span>
        )}
      </span>
    </div>
    
    <div className="flex flex-wrap gap-2 mb-3">
      {product.colors.map((color, idx) => {
        const isSelected = selectedColors.includes(color);
        const quantity = colorQuantities[color] || 0;
        return (
          <button
            key={idx}
            onClick={() => {
              if (isSelected) {
                removeColorSelection(color);
              } else {
                addColorSelection(color);
              }
            }}
            disabled={remainingStock <= 0 && !isSelected}
            className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
              isSelected 
                ? 'border-[#EE4275] shadow-md ring-2 ring-[#EE4275]/20' 
                : 'border-gray-300 hover:border-[#EE4275]'
            } ${remainingStock <= 0 && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ backgroundColor: color }}
          >
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white drop-shadow-md" />
              </div>
            )}
            {isSelected && quantity > 0 && (
              <div className="absolute -top-2 -right-2 bg-[#EE4275] text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {quantity}
              </div>
            )}
          </button>
        );
      })}
    </div>

    {selectedColors.length > 0 && (
      <div className="mt-3 pt-3 border-t border-[#F7C7D3]/30">
        <p className="text-xs font-medium text-[#2D1B2E] mb-2" style={{ fontFamily: FONT_FAMILY_SERIF }}>Selected Colors:</p>
        <div className="space-y-2">
          {selectedColors.map((color) => (
            <div key={color} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#F7C7D3]/30">
              <div 
                className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              
              <div className="flex items-center rounded-lg border-2 border-[#F7C7D3]/30 overflow-hidden bg-white">
                <button
                  onClick={() => updateColorQuantity(color, (colorQuantities[color] || 1) - 1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-[#FFF5F6] disabled:opacity-50 transition"
                >
                  <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
                <input
                  type="text"
                  value={colorQuantities[color] === '' ? '' : (colorQuantities[color] || 1)}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      setColorQuantities(prev => ({ ...prev, [color]: '' }));
                      return;
                    }
                    if (/^\d+$/.test(value)) {
                      const numValue = parseInt(value);
                      if (numValue >= 1) {
                        const totalOtherQuantities = Object.entries(colorQuantities)
                          .filter(([c]) => c !== color)
                          .reduce((sum, [, qty]) => sum + (typeof qty === 'string' ? parseInt(qty) || 0 : qty || 0), 0);
                        
                        if (totalOtherQuantities + numValue > product.stockQuantity) {
                          toast.error(`Only ${product.stockQuantity - totalOtherQuantities} more items available`);
                          return;
                        }
                        setColorQuantities(prev => ({ ...prev, [color]: numValue }));
                      }
                    }
                  }}
                  onBlur={() => {
                    const value = colorQuantities[color];
                    if (value === '' || value === null || value === undefined || parseInt(value) < 1) {
                      setColorQuantities(prev => ({ ...prev, [color]: 1 }));
                    }
                  }}
                  min="1"
                  max={product.stockQuantity}
                  className="w-12 sm:w-14 text-center font-medium text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#EE4275]/20 border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => updateColorQuantity(color, (colorQuantities[color] || 1) + 1)}
                  disabled={remainingStock <= 0}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-[#FFF5F6] disabled:opacity-50 transition"
                >
                  <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
              <button
                onClick={() => removeColorSelection(color)}
                className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-500 flex items-center justify-between" style={{ fontFamily: FONT_FAMILY_SERIF }}>
          <span>
            Total: <span className="font-medium text-[#EE4275]">{totalSelectedQuantity}</span> items
          </span>
        </div>
      </div>
    )}

    {colorError && (
      <p className="text-xs text-[#EE4275] mt-1.5 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {colorError}
      </p>
    )}
    {!hasSelectedColors() && !colorError && (
      <p className="text-[10px] text-gray-400 mt-1.5" style={{ fontFamily: FONT_FAMILY_SERIF }}>
        Click on color swatches to add them. You can select multiple colors with different quantities.
      </p>
    )}
  </div>
) : (
  <div className="mb-4 p-3 sm:p-4 bg-[#FFF5F6] rounded-xl border border-[#F7C7D3]/30">
    <label className="block text-xs font-medium text-[#2D1B2E] mb-2" style={{ fontFamily: FONT_FAMILY_SERIF }}>
      Quantity
    </label>
    <div className="flex items-center rounded-lg border-2 border-[#F7C7D3]/30 overflow-hidden bg-white w-fit">
      <button 
        onClick={() => handleSingleQuantityChange(-1)} 
        disabled={singleQuantity <= 1} 
        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-600 hover:bg-[#FFF5F6] disabled:opacity-50 transition"
      >
        <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
      </button>
      <input
        type="number"
        value={singleQuantity === '' ? '' : singleQuantity}
        onChange={handleSingleQuantityInput}
        onBlur={() => {
          if (singleQuantity === '' || singleQuantity === null) {
            setSingleQuantity(1);
          }
        }}
        min="1"
        max={product.stockQuantity}
        className="w-12 sm:w-14 md:w-16 text-center font-medium text-gray-900 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#EE4275]/20 border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button 
        onClick={() => handleSingleQuantityChange(1)} 
        disabled={singleQuantity >= product.stockQuantity} 
        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-600 hover:bg-[#FFF5F6] disabled:opacity-50 transition"
      >
        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
      </button>
    </div>
    <p className="text-[10px] text-gray-400 mt-1.5" style={{ fontFamily: FONT_FAMILY_SERIF }}>
      {product.stockQuantity} items available
    </p>
  </div>
)}

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium text-${stockStatus.color}-600 bg-${stockStatus.color}-50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full`}>
                  <StockIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${stockStatus.color}-500`} />
                  <span style={{ fontFamily: FONT_FAMILY_SERIF }}>{stockStatus.label}</span>
                  {stockStatus.label === 'In Stock' && <span className="text-[10px] sm:text-xs text-gray-500"></span>}
                  {stockStatus.label === 'Low Stock' && <span className="text-[10px] sm:text-xs text-orange-500">(Only {product.stockQuantity} left)</span>}
                </div>
              </div>

              {/* Add to Cart / Buy Now Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                {isInCart ? (
                  <button
                    onClick={openCartSidebar}
                    className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm hover:shadow-lg hover:shadow-[#a80883]/25"
                    style={{ fontFamily: FONT_FAMILY_SERIF }}
                  >
                    <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    View in Cart
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart || product.stockQuantity <= 0 || (hasColors && !hasSelectedColors())}
                    className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 text-xs sm:text-sm"
                    style={{ fontFamily: FONT_FAMILY_SERIF }}
                  >
                    {addingToCart ? <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> : <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    {addingToCart ? 'Adding...' : hasColors ? 'Add Selected Colors' : 'Add to Cart'}
                  </button>
                )}

                <button
                  onClick={handleBuyNow}
                  disabled={addingToCart || product.stockQuantity <= 0 || (hasColors && !hasSelectedColors())}
                  className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 text-xs sm:text-sm"
                  style={{ fontFamily: FONT_FAMILY_SERIF }}
                >
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Buy Now
                </button>
              </div>

              {/* Delivery Info */}
              {hasDeliveryInfo && (
                <div className="bg-gradient-to-r from-[#FFF5F6] to-[#F7C7D3]/20 rounded-xl p-3 sm:p-4 border border-[#F7C7D3]/30">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#EE4275]" />
                    <span className="font-semibold text-[#2D1B2E] text-sm sm:text-base" style={{ fontFamily: FONT_FAMILY_SERIF }}>Delivery Information</span>
                  </div>
                  <div 
                    className="prose prose-sm max-w-none text-gray-600"
                    style={{ fontSize: '0.875rem', lineHeight: '1.6', fontFamily: FONT_FAMILY_SERIF }}
                    dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} 
                  />
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#F7C7D3]/30">
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                      <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#EE4275]" />
                      <span style={{ fontFamily: FONT_FAMILY_SERIF }}>7 Days Return Policy</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                      <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#EE4275]" />
                      <span style={{ fontFamily: FONT_FAMILY_SERIF }}>Safe & Secure</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                      <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#EE4275]" />
                      <span style={{ fontFamily: FONT_FAMILY_SERIF }}>Genuine Products</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-8 sm:mt-12">
            <div className="flex flex-nowrap gap-1 sm:gap-2 border-b border-[#F7C7D3]/30 overflow-x-auto pb-0.5 scrollbar-thin scrollbar-thumb-[#EE4275]">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                  activeTab === 'description' 
                    ? 'bg-white text-[#EE4275] border-t-2 border-l-2 border-r-2 border-[#EE4275]/30 border-b-white' 
                    : 'text-gray-500 hover:text-[#EE4275]'
                }`}
                style={{ fontFamily: FONT_FAMILY_SERIF }}
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                  activeTab === 'specifications' 
                    ? 'bg-white text-[#EE4275] border-t-2 border-l-2 border-r-2 border-[#EE4275]/30 border-b-white' 
                    : 'text-gray-500 hover:text-[#EE4275]'
                }`}
                style={{ fontFamily: FONT_FAMILY_SERIF }}
              >
                <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Specifications
              </button>
              {hasDeliveryInfo && (
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                    activeTab === 'delivery' 
                      ? 'bg-white text-[#EE4275] border-t-2 border-l-2 border-r-2 border-[#EE4275]/30 border-b-white' 
                      : 'text-gray-500 hover:text-[#EE4275]'
                  }`}
                  style={{ fontFamily: FONT_FAMILY_SERIF }}
                >
                  <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Delivery
                </button>
              )}
              {product.faqs && product.faqs.length > 0 && (
                <button
                  onClick={() => setActiveTab('faqs')}
                  className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                    activeTab === 'faqs' 
                      ? 'bg-white text-[#EE4275] border-t-2 border-l-2 border-r-2 border-[#EE4275]/30 border-b-white' 
                      : 'text-gray-500 hover:text-[#EE4275]'
                  }`}
                  style={{ fontFamily: FONT_FAMILY_SERIF }}
                >
                  <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  FAQs
                </button>
              )}
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                  activeTab === 'reviews' 
                    ? 'bg-white text-[#EE4275] border-t-2 border-l-2 border-r-2 border-[#EE4275]/30 border-b-white' 
                    : 'text-gray-500 hover:text-[#EE4275]'
                }`}
                style={{ fontFamily: FONT_FAMILY_SERIF }}
              >
                <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Reviews
              </button>
            </div>

            <div className="bg-white rounded-b-xl rounded-tr-xl border border-t-0 border-[#F7C7D3]/30 p-4 sm:p-5 md:p-6">
              {activeTab === 'description' && (
                <div className="prose prose-sm max-w-none text-gray-600">
                  {product.fullDescription && product.fullDescription !== '<p></p>' ? (
                    <div dangerouslySetInnerHTML={{ __html: processHtmlLinks(product.fullDescription) }} />
                  ) : (
                    <p className="text-gray-400 italic" style={{ fontFamily: FONT_FAMILY_SERIF }}>No description available.</p>
                  )}
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {specifications.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#FFF5F6] rounded-xl border border-[#F7C7D3]/30">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#EE4275]" />
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY_SERIF }}>{item.label}</p>
                        <p className="font-medium text-[#2D1B2E] text-xs sm:text-sm" style={{ fontFamily: FONT_FAMILY_SERIF }}>{item.value || 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                  
                  {specifications.length === 0 && (
                    <div className="col-span-2 text-center py-8 text-gray-400">
                      <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p style={{ fontFamily: FONT_FAMILY_SERIF }}>No specifications available</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'delivery' && hasDeliveryInfo && (
                <div className="prose prose-sm max-w-none text-gray-600">
                  <div className="flex items-center gap-2 mb-4">
                    <Truck className="w-5 h-5 text-[#EE4275]" />
                    <h3 className="text-lg font-semibold text-[#2D1B2E] m-0" style={{ fontFamily: FONT_FAMILY_SERIF }}>Delivery Information</h3>
                  </div>
                  <div 
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: FONT_FAMILY_SERIF }}
                    dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} 
                  />
                  <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-[#F7C7D3]/30">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <RotateCcw className="w-4 h-4 text-[#EE4275]" />
                      <span style={{ fontFamily: FONT_FAMILY_SERIF }}>7 Days Return Policy</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <ShieldCheck className="w-4 h-4 text-[#EE4275]" />
                      <span style={{ fontFamily: FONT_FAMILY_SERIF }}>Safe & Secure</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Award className="w-4 h-4 text-[#EE4275]" />
                      <span style={{ fontFamily: FONT_FAMILY_SERIF }}>Genuine Products</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'faqs' && product.faqs && product.faqs.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F7C7D3]/30">
                    <div className="p-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-xl">
                      <HelpCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>Frequently Asked Questions</h3>
                      <p className="text-sm text-gray-500" style={{ fontFamily: FONT_FAMILY_SERIF }}>Everything you need to know about this product</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {product.faqs.map((faq, index) => {
                      const isOpen = faqOpenStates[index] || false;
                      
                      return (
                        <div 
                          key={index} 
                          className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                            isOpen 
                              ? 'border-[#EE4275] shadow-md shadow-[#EE4275]/10' 
                              : 'border-[#F7C7D3]/30 hover:border-[#EE4275]/50'
                          }`}
                        >
                          <button
                            onClick={() => toggleFaq(index)}
                            className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#FFF5F6] transition-colors"
                          >
                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#EE4275]/10 text-[#EE4275] flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </span>
                            <span className="flex-1 font-semibold text-[#2D1B2E] text-sm sm:text-base" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                              {faq.question}
                            </span>
                            <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                              <ChevronDown className="w-5 h-5 text-[#EE4275]" />
                            </div>
                          </button>
                          
                          <div 
                            className={`overflow-hidden transition-all duration-300 ${
                              isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div className="px-5 pb-4 pt-1 border-t border-[#F7C7D3]/30">
                              <div className="flex items-start gap-3 pl-11">
                                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#EE4275] mt-2"></div>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  {/* Review Stats */}
                  {reviewStats && reviewStats.totalReviews > 0 && (
                    <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-[#F7C7D3]/30">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl font-bold text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                          {reviewStats.averageRating.toFixed(1)}
                        </div>
                        <div>
                          {renderStarsForReview(Math.round(reviewStats.averageRating), 'large')}
                          <p className="text-sm text-gray-500 mt-0.5" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                            Based on all reviews
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex-1 max-w-xs">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = reviewStats.ratingDistribution?.[star] || 0;
                          const percentage = reviewStats.totalReviews > 0 
                            ? (count / reviewStats.totalReviews) * 100 
                            : 0;
                          return (
                            <div key={star} className="flex items-center gap-2 text-xs">
                              <span className="w-5 text-gray-600">{star}</span>
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Write Review Button */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-[#EE4275]" />
                      <select
                        value={reviewFilter}
                        onChange={(e) => setReviewFilter(e.target.value)}
                        className="text-sm border border-[#F7C7D3]/30 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none bg-white"
                        style={{ fontFamily: FONT_FAMILY_SERIF }}
                      >
                        <option value="all">All Reviews</option>
                        <option value="with_media">With Photos/Videos</option>
                      </select>
                      <select
                        value={reviewSort}
                        onChange={(e) => setReviewSort(e.target.value)}
                        className="text-sm border border-[#F7C7D3]/30 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none bg-white"
                        style={{ fontFamily: FONT_FAMILY_SERIF }}
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="highest">Highest Rating</option>
                        <option value="lowest">Lowest Rating</option>
                      </select>
                    </div>
                    
                    <button
                      onClick={() => setIsReviewModalOpen(true)}
                      disabled={!!userReview}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                        userReview
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white hover:shadow-lg hover:shadow-[#EE4275]/25'
                      }`}
                      style={{ fontFamily: FONT_FAMILY_SERIF }}
                    >
                      {userReview ? (
                        <>
                          {userReview.status === 'pending' ? (
                            <>
                              <Clock className="w-4 h-4" />
                              Pending Review
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Already Reviewed
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4" />
                          Write a Review
                        </>
                      )}
                    </button>
                  </div>

                  {/* Reviews List */}
                  {loadingReviews ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-[#EE4275]" />
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-12 bg-[#FFF5F6] rounded-xl">
                      <MessageSquare className="w-16 h-16 text-[#F7C7D3] mx-auto mb-3" />
                      <p className="text-gray-500" style={{ fontFamily: FONT_FAMILY_SERIF }}>No reviews yet</p>
                      <button
                        onClick={() => setIsReviewModalOpen(true)}
                        className="mt-3 text-[#EE4275] font-medium hover:underline"
                        style={{ fontFamily: FONT_FAMILY_SERIF }}
                      >
                        Be the first to review this product
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {reviews.map((review) => (
                        <ReviewItem 
                          key={review._id} 
                          review={review}
                          isOwner={userReview?._id === review._id}
                        />
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {reviewTotalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#F7C7D3]/30">
                      <div className="text-sm text-gray-600" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                        Showing {((reviewPage - 1) * 5) + 1} - {Math.min(reviewPage * 5, reviewTotal)} of {reviewTotal} reviews
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setReviewPage(prev => Math.max(1, prev - 1))}
                          disabled={reviewPage === 1}
                          className="p-2 text-gray-600 hover:bg-[#FFF5F6] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setReviewPage(prev => Math.min(reviewTotalPages, prev + 1))}
                          disabled={reviewPage === reviewTotalPages}
                          className="p-2 text-gray-600 hover:bg-[#FFF5F6] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
{relatedProducts.length > 0 && (
  <div className="mt-8 sm:mt-12">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#EE4275]" />
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
          You May Also Like
        </h2>
      </div>
      
      {relatedProducts.length > carouselItemsPerView && (
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={handlePrevSlide}
            disabled={carouselIndex === 0}
            className={`p-1.5 sm:p-2 rounded-full transition-all ${
              carouselIndex === 0 
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                : 'bg-white border border-[#F7C7D3]/30 text-[#EE4275] hover:bg-[#EE4275] hover:text-white hover:scale-110'
            }`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNextSlide}
            disabled={carouselIndex >= Math.ceil(relatedProducts.length / carouselItemsPerView) - 1}
            className={`p-1.5 sm:p-2 rounded-full transition-all ${
              carouselIndex >= Math.ceil(relatedProducts.length / carouselItemsPerView) - 1
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                : 'bg-white border border-[#F7C7D3]/30 text-[#EE4275] hover:bg-[#EE4275] hover:text-white hover:scale-110'
            }`}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      )}
    </div>
    
    <div className="relative overflow-hidden">
      <div className="flex gap-2 sm:gap-3 md:gap-4">
        {relatedProducts
          .slice(
            carouselIndex * carouselItemsPerView,
            carouselIndex * carouselItemsPerView + carouselItemsPerView
          )
          .map((relProduct) => (
           <div 
  key={relProduct._id} 
  className="flex-shrink-0"
  style={{
    width: `calc((100% - ${(Math.min(carouselItemsPerView, relatedProducts.length) - 1) * 16}px) / ${Math.min(carouselItemsPerView, relatedProducts.length)})`
  }}
>
              <RelatedProductCard 
                product={relProduct} 
                router={router}
                isInCart={productsInCart[relProduct._id] || false}
                onViewInCart={openCartSidebar}
              />
            </div>
          ))}
      </div>
    </div>
    
    {/* Pagination Dots */}
    {relatedProducts.length > carouselItemsPerView && (
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
        {Array.from({ length: Math.ceil(relatedProducts.length / carouselItemsPerView) }).map((_, idx) => {
          const isActive = carouselIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                handleCarouselInteraction();
                setCarouselIndex(idx);
              }}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                isActive ? 'w-4 sm:w-6 bg-[#EE4275]' : 'w-1.5 sm:w-2 bg-[#F7C7D3]/50 hover:bg-[#EE4275]/50'
              }`}
            />
          );
        })}
      </div>
    )}
  </div>
)}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showZoom && (
          <ZoomModal 
            images={productImages} 
            currentIndex={activeImageIndex}
            onClose={() => setShowZoom(false)} 
            onImageChange={(index) => {
              setActiveImageIndex(index);
              setShowZoom(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          if (activeTab === 'reviews') {
            fetchReviews(reviewPage);
            checkUserReview();
          }
        }}
        productId={product._id}
        productName={product.productName}
        onReviewSubmitted={() => {
          fetchReviews(reviewPage);
          checkUserReview();
        }}
      />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />

      <Footer />

      <style jsx global>{`
        .prose {
          max-width: none;
        }
        
        .prose h1 {
          font-size: 1.5em;
          font-weight: 600;
          margin: 0.75em 0 0.5em;
          color: #2D1B2E;
          font-family: ${FONT_FAMILY_SERIF};
        }
        
        .prose h2 {
          font-size: 1.3em;
          font-weight: 600;
          margin: 0.7em 0 0.4em;
          color: #2D1B2E;
          font-family: ${FONT_FAMILY_SERIF};
        }
        
        .prose h3 {
          font-size: 1.1em;
          font-weight: 600;
          margin: 0.6em 0 0.3em;
          color: #2D1B2E;
          font-family: ${FONT_FAMILY_SERIF};
        }
        
        .prose p {
          margin: 0.5em 0;
          line-height: 1.6;
          color: #4B5563;
          font-family: ${FONT_FAMILY_SERIF};
        }
        
        .prose ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        
        .prose ol {
          list-style-type: decimal;
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        
        .prose li {
          margin: 0.2em 0;
          color: #4B5563;
          font-family: ${FONT_FAMILY_SERIF};
        }
        
        .prose a {
          color: #EE4275;
          text-decoration: underline;
        }
        
        .prose strong {
          font-weight: 600;
          color: #2D1B2E;
        }
        
        .prose em {
          font-style: italic;
        }
        
        .prose blockquote {
          border-left: 3px solid #EE4275;
          padding-left: 1em;
          margin: 0.5em 0;
          color: #6B7280;
          font-style: italic;
        }
        
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
        }
        
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1em 0;
        }
        
        .prose th,
        .prose td {
          border: 1px solid #E5E7EB;
          padding: 0.5em;
          text-align: left;
        }
        
        .prose th {
          background-color: #F9FAFB;
          font-weight: 600;
          color: #2D1B2E;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          height: 2px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #EE4275;
          border-radius: 10px;
        }
        
        .scrollbar-thumb-[#EE4275]::-webkit-scrollbar-thumb {
          background: #EE4275;
        }
      `}</style>
    </>
  );
}