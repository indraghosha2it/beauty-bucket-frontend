

// 'use client';

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import Link from 'next/link';
// import { 
//   Search, 
//   Grid, 
//   List, 
//   SlidersHorizontal, 
//   X, 
//   Filter,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
//   Tag,
//   Users,
//   DollarSign,
//   Sparkles,
//   Eye, 
//   ShoppingCart,
//   ArrowLeft,
//   Package,
//   TrendingUp,
//   Palette,
//   Ruler,
//   FolderTree,
//   Gift,
//   Heart,
//   Truck,
//   Star,
//   Clock,
//   Zap,
//   Building2,
//   Box,
//   Scale,
//   AlertTriangle
// } from 'lucide-react';
// import { toast } from 'sonner';
// import CartSidebar from '../components/CartSidebar';

// // Loading Bar Component
// const LoadingBar = ({ isVisible }) => {
//   return (
//     <div className={`fixed top-0 left-0 w-full h-0.5 bg-gray-200 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//       <div className="h-full bg-blue-600 animate-loading-bar"></div>
//     </div>
//   );
// };

// // Helper functions
// const getUnitLabel = (unit) => {
//   const units = {
//     'pcs': 'pcs',
//     'ton': 'ton',
//     'other': 'unit'
//   };
//   return units[unit] || unit;
// };

// const formatPrice = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// const truncateText = (text, limit = 40) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// // Product Grid Card - Updated with Link
// // Product Grid Card - Fixed (no nested Link)
// const ProductGridCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
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

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Navigate in same tab using router
//   const navigateToProduct = () => {
//     router.push(`/productDetails?id=${product._id}`);
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

//   return (
//     <Link
//       // href={`/productDetails?id=${product._id}`}
//        href={`/productDetails?id=${product.slug}`}
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
//                 <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
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
//                 <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
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
//                 activeIndex === index ? 'ring-1 ring-blue-500 ring-offset-1' : 'opacity-60 hover:opacity-100'
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

//       {/* Add to Cart / View in Cart Button */}
//       <button
//         onClick={addToCart}
//         disabled={isOutOfStock}
//         className={`w-full py-1.5 text-center text-[10px] font-medium transition-colors flex items-center justify-center gap-1 ${
//           isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : isInCart ? 'bg-cyan-600 text-white hover:bg-cyan-700' : 'bg-black text-white hover:bg-gray-800'
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

// // Product List Card - Fixed (no nested Link)
// const ProductListCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
  
//   const isInCart = propIsInCart || false;
//   const productImages = product.images || [];
//   const hasMultipleImages = productImages.length > 1;
//   const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
//   const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
//   const originalPrice = product.regularPrice;
  
//   const isLowStock = product.stockAlertQuantity > 0 && product.stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = product.stockQuantity <= 0;

//   // Navigate in same tab using router
//   const navigateToProduct = () => {
//     router.push(`/productDetails?id=${product._id}`);
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

//   return (
//     <Link
//       // href={`/productDetails?id=${product._id}`}
//        href={`/productDetails?id=${product.slug}`}
//       className="block group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
//     >
//       <div className="flex flex-col sm:flex-row">
//         {/* Image Section */}
//         <div className="sm:w-32 relative">
//           <div className="relative h-32 overflow-hidden bg-gray-50">
//             <img
//               src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/150?text=Product'}
//               alt={product.productName}
//               className="w-full h-full object-contain p-2"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/150?text=Product';
//               }}
//               loading="lazy"
//             />
            
//             {discountPercent > 0 && (
//               <div className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 z-20 flex items-center gap-0.5">
//                 <Zap className="w-2 h-2" />
//                 {discountPercent}%
//               </div>
//             )}
            
//             {product.brand && (
//               <div className="absolute top-1 right-1 bg-black/70 text-white text-[8px] px-1.5 py-0.5 font-medium z-20 flex items-center gap-0.5">
//                 <Building2 className="w-2 h-2" />
//                 {product.brand}
//               </div>
//             )}
            
//             {isOutOfStock && (
//               <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
//                 <span className="bg-black text-white text-[10px] font-medium px-1.5 py-0.5">Out of Stock</span>
//               </div>
//             )}
//           </div>
          
//           {/* Thumbnails */}
//           {hasMultipleImages && (
//             <div className="flex justify-center gap-0.5 py-1 bg-gray-50">
//               {productImages.slice(0, 4).map((image, idx) => (
//                 <div
//                   key={idx}
//                   className={`w-5 h-5 overflow-hidden cursor-pointer transition-all ${
//                     activeIndex === idx ? 'ring-1 ring-blue-500' : 'opacity-60 hover:opacity-100'
//                   }`}
//                   onMouseEnter={() => setActiveIndex(idx)}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     e.preventDefault();
//                     setActiveIndex(idx);
//                   }}
//                 >
//                   <img src={image.url} alt="" className="w-full h-full object-cover" />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Content Section - Vertical layout */}
//         <div className="flex-1 p-3">
//           {/* Product Name */}
//           <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">{product.productName}</h3>
          
//           {/* Description */}
//           <p className="text-[10px] text-gray-500 mb-2 line-clamp-2">
//             {product.fullDescription?.replace(/<[^>]*>/g, '').substring(0, 100) || product.shortDescription?.replace(/<[^>]*>/g, '').substring(0, 100) || 'No description available'}
//           </p>
          
//           {/* Price and Discount Row */}
//           <div className="flex flex-wrap items-center gap-2 mb-2">
//             <div className="flex items-baseline gap-1.5">
//               <span className="text-base font-bold text-black">৳{formatPrice(currentPrice)}</span>
//               {discountPercent > 0 && (
//                 <>
//                   <span className="text-[9px] text-gray-400 line-through">৳{formatPrice(originalPrice)}</span>
//                   <span className="text-[8px] font-medium text-red-600 bg-red-50 px-1 py-0.5">-{discountPercent}%</span>
//                 </>
//               )}
//               <span className="text-[9px] text-gray-500">/{getUnitLabel(product.unit)}</span>
//             </div>
//           </div>
          
//           {/* Stock Status and Rating Row */}
//           <div className="flex flex-wrap items-center gap-3 mb-3">
//             {isOutOfStock ? (
//               <span className="inline-flex items-center gap-1 text-red-600 text-[9px] font-medium">
//                 <div className="w-1 h-1 bg-red-500 rounded-full"></div>
//                 Out of Stock
//               </span>
//             ) : isLowStock ? (
//               <span className="inline-flex items-center gap-1 text-orange-600 text-[9px] font-medium">
//                 <AlertTriangle className="w-2 h-2" />
//                 Only {product.stockQuantity} left
//               </span>
//             ) : (
//               <span className="inline-flex items-center gap-1 text-green-600 text-[9px] font-medium">
//                 <div className="w-1 h-1 bg-green-500 rounded-full"></div>
//                 In Stock ({product.stockQuantity})
//               </span>
//             )}
            
//             {product.rating > 0 && (
//               <div className="flex items-center gap-1">
//                 <div className="flex items-center">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <Star key={star} className={`w-2.5 h-2.5 ${star <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
//                   ))}
//                 </div>
//                 <span className="text-[8px] text-gray-500">({product.rating})</span>
//               </div>
//             )}
//           </div>
          
//           {/* Add to Cart / View in Cart Button */}
//           <button
//             onClick={addToCart}
//             disabled={isOutOfStock}
//             className={`w-full sm:w-auto px-4 py-1.5 text-[10px] font-medium transition-colors flex items-center justify-center gap-1 ${
//               isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : isInCart ? 'bg-cyan-600 text-white hover:bg-cyan-700' : 'bg-black text-white hover:bg-gray-800'
//             }`}
//           >
//             {cartStatusLoading ? (
//               <Loader2 className="w-3 h-3 animate-spin" />
//             ) : isInCart ? (
//               <>
//                 <ShoppingCart className="w-3 h-3" />
//                 View in Cart
//               </>
//             ) : (
//               <>
//                 <ShoppingCart className="w-3 h-3" />
//                 Add to Cart
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </Link>
//   );
// };
// // Filter Sidebar Component
// const FilterSidebar = ({ 
//   expandedSections, 
//   toggleSection, 
//   categories, 
//   subcategories,
//   childSubcategories,
//   brands,
//   filters, 
//   handleCategoryChange, 
//   handleRemoveCategory,
//   handleSubcategoryChange,
//   handleRemoveSubcategory,
//   handleChildSubcategoryChange,
//   handleRemoveChildSubcategory,
//   handleBrandChange,
//   handleRemoveBrand,
//   handleUnitChange,
//   handleRemoveUnit,
//   minPriceInput,
//   maxPriceInput,
//   setMinPriceInput,
//   setMaxPriceInput,
//   applyPriceRange,
//   clearPriceRange,
//   getActiveFilterCount,
//   clearFilters,
//   selectedCategory,
//   selectedSubcategory,
//   showChildSubcategory,
//   availableUnits,      
//   unitsLoading   
// }) => (
//   <div className="bg-white border border-gray-200 p-4 sticky top-24">
//     <div className="flex items-center justify-between mb-4">
//       <h3 className="text-base font-semibold text-black flex items-center gap-2">
//         <Filter className="w-4 h-4" />
//         Filters
//       </h3>
//       {getActiveFilterCount() > 0 && (
//         <button onClick={clearFilters} className="text-[11px] text-gray-500 hover:text-black">
//           Clear All ({getActiveFilterCount()})
//         </button>
//       )}
//     </div>

//     {/* Price Range */}
//     <div className="mb-4 border-b border-gray-100 pb-4">
//       <button onClick={() => toggleSection('price')} className="flex items-center justify-between w-full text-left mb-3">
//         <h4 className="font-medium text-sm text-black flex items-center gap-2">
//           <DollarSign className="w-3.5 h-3.5" />
//           Price Range
//         </h4>
//         {expandedSections.price ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//       </button>
      
//       {expandedSections.price && (
//         <div className="space-y-3">
//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="text-xs text-gray-500">Min (৳)</span>
//               <input
//                 type="text"
//                 inputMode="decimal"
//                 value={minPriceInput}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (value === '' || /^\d*\.?\d*$/.test(value)) setMinPriceInput(value);
//                 }}
//                 placeholder="0"
//                 className="w-24 px-2 py-1 text-right text-xs border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black"
//               />
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-xs text-gray-500">Max (৳)</span>
//               <input
//                 type="text"
//                 inputMode="decimal"
//                 value={maxPriceInput}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (value === '' || /^\d*\.?\d*$/.test(value)) setMaxPriceInput(value);
//                 }}
//                 placeholder="Any"
//                 className="w-24 px-2 py-1 text-right text-xs border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black"
//               />
//             </div>
//           </div>
          
//           <button
//             onClick={applyPriceRange}
//             disabled={!minPriceInput && !maxPriceInput}
//             className="w-full py-1.5 bg-black text-white text-xs font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Apply Price Range
//           </button>

//           {(filters.priceRange.min || filters.priceRange.max) && (
//             <div className="flex items-center justify-between bg-gray-50 p-2 border border-gray-200">
//               <span className="text-xs font-medium text-black">৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
//               <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>

//     {/* Categories */}
//     <div className="mb-4 border-b border-gray-100 pb-4">
//       <button onClick={() => toggleSection('categories')} className="flex items-center justify-between w-full text-left mb-3">
//         <h4 className="font-medium text-sm text-black flex items-center gap-2">
//           <Tag className="w-3.5 h-3.5" />
//           Categories
//         </h4>
//         {expandedSections.categories ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//       </button>
      
//       {expandedSections.categories && (
//         <div className="space-y-2">
//           {filters.categories.length > 0 && (
//             <div className="mb-2 p-2 bg-gray-50 border border-gray-100">
//               <p className="text-[10px] text-gray-500 mb-1.5">Selected Categories:</p>
//               {filters.categories.map(catId => {
//                 const category = categories.find(c => c._id === catId);
//                 return category ? (
//                   <div key={catId} className="flex items-center justify-between py-1">
//                     <span className="text-xs text-gray-700">{category.name}</span>
//                     <button onClick={() => handleRemoveCategory(catId)} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
//                   </div>
//                 ) : null;
//               })}
//             </div>
//           )}
          
//           <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5">
//             {categories.map(category => (
//               <label key={category._id} className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={filters.categories.includes(category._id)}
//                   onChange={() => handleCategoryChange(category._id)}
//                   className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-black"
//                 />
//                 <span className="text-xs text-gray-700 hover:text-black transition-colors">{category.name}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Brands */}
//     <div className="mb-4 border-b border-gray-100 pb-4">
//       <button onClick={() => toggleSection('brands')} className="flex items-center justify-between w-full text-left mb-3">
//         <h4 className="font-medium text-sm text-black flex items-center gap-2">
//           <Building2 className="w-3.5 h-3.5" />
//           Brands
//         </h4>
//         {expandedSections.brands ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//       </button>
      
//       {expandedSections.brands && (
//         <div className="space-y-2">
//           {filters.brands.length > 0 && (
//             <div className="mb-2 p-2 bg-gray-50 border border-gray-100">
//               <p className="text-[10px] text-gray-500 mb-1.5">Selected Brands:</p>
//               {filters.brands.map(brand => (
//                 <div key={brand} className="flex items-center justify-between py-1">
//                   <span className="text-xs text-gray-700">{brand}</span>
//                   <button onClick={() => handleRemoveBrand(brand)} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
//                 </div>
//               ))}
//             </div>
//           )}
          
//           <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5">
//             {brands.map(brand => (
//               <label key={brand._id} className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={filters.brands.includes(brand.name)}
//                   onChange={() => handleBrandChange(brand.name)}
//                   className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-black"
//                 />
//                 <span className="text-xs text-gray-700 hover:text-black transition-colors">{brand.name}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Unit Filter */}
//     <div className="mb-4">
//       <button onClick={() => toggleSection('unit')} className="flex items-center justify-between w-full text-left mb-3">
//         <h4 className="font-medium text-sm text-black flex items-center gap-2">
//           <Scale className="w-3.5 h-3.5" />
//           Unit
//         </h4>
//         {expandedSections.unit ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//       </button>
      
//       {expandedSections.unit && (
//         <div className="space-y-2">
//           {filters.units.length > 0 && (
//             <div className="mb-2 p-2 bg-gray-50 border border-gray-100">
//               <p className="text-[10px] text-gray-500 mb-1.5">Selected Units:</p>
//               {filters.units.map(unit => {
//                 const unitLabel = availableUnits.find(u => u.value === unit)?.label || unit;
//                 return (
//                   <div key={unit} className="flex items-center justify-between py-1">
//                     <span className="text-xs text-gray-700">{unitLabel}</span>
//                     <button onClick={() => handleRemoveUnit(unit)} className="text-gray-400 hover:text-gray-600">
//                       <X className="w-3 h-3" />
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
          
//           <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
//             {availableUnits.length === 0 ? (
//               <p className="text-xs text-gray-500">No units available</p>
//             ) : (
//               availableUnits.map(unit => (
//                 <label key={unit.value} className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={filters.units.includes(unit.value)}
//                     onChange={() => handleUnitChange(unit.value)}
//                     className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-black"
//                   />
//                   <span className="text-xs text-gray-700 hover:text-black transition-colors">
//                     {unit.label}
//                   </span>
//                 </label>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );

// export default function ProductsClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('grid');
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [subcategories, setSubcategories] = useState([]);
//   const [childSubcategories, setChildSubcategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [showChildSubcategory, setShowChildSubcategory] = useState(false);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [forceFetch, setForceFetch] = useState(0);
//   const [brands, setBrands] = useState([]);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const [availableUnits, setAvailableUnits] = useState([]);
//   const [unitsLoading, setUnitsLoading] = useState(true);
  
//   const [expandedSections, setExpandedSections] = useState({
//     price: true,
//     categories: true,
//     brands: true,
//     unit: true
//   });

//   const productsContainerRef = useRef(null);
//   const scrollPositionRef = useRef(0);
//   const searchTimerRef = useRef(null);

//   const [filters, setFilters] = useState({
//     search: '',
//     categories: [],
//     subcategories: [],
//     childSubcategories: [],
//     brands: [],
//     units: [],
//     priceRange: { min: '', max: '' },
//     sortBy: 'newest'
//   });

//   const [searchInput, setSearchInput] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [minPriceInput, setMinPriceInput] = useState('');
//   const [maxPriceInput, setMaxPriceInput] = useState('');
//   const [initialCategorySet, setInitialCategorySet] = useState(false);

//   // Functions to open/close cart sidebar
//   const openCartSidebar = () => {
//     setIsCartOpen(true);
//   };

//   const closeCartSidebar = () => {
//     setIsCartOpen(false);
//   };

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const saveScrollPosition = () => {
//     scrollPositionRef.current = window.scrollY;
//   };

//   const restoreScrollPosition = () => {
//     if (scrollPositionRef.current > 0) {
//       window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
//     }
//   };

//   const debouncedSearch = useCallback((searchValue) => {
//     if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
//     searchTimerRef.current = setTimeout(() => {
//       saveScrollPosition();
//       setFilters(prev => ({ ...prev, search: searchValue }));
//       setCurrentPage(1);
//     }, 500);
//   }, []);

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     debouncedSearch(value);
//   };

//   const handleClearSearch = () => {
//     setSearchInput('');
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, search: '' }));
//     setCurrentPage(1);
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchBrands();
//   }, []);

//   useEffect(() => {
//     const fetchUnits = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/products/units/all');
//         const data = await response.json();
//         if (data.success) {
//           setAvailableUnits(data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching units:', error);
//       } finally {
//         setUnitsLoading(false);
//       }
//     };
//     fetchUnits();
//   }, []);

//   const fetchBrands = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/brands');
//       const data = await response.json();
//       if (data.success) setBrands(data.data);
//     } catch (error) {
//       console.error('Error fetching brands:', error);
//     }
//   };

//   useEffect(() => {
//     if (categories.length > 0 && !initialCategorySet) {
//       const categoryParam = searchParams.get('category');
//       if (categoryParam && categories.some(cat => cat._id === categoryParam)) {
//         setFilters(prev => ({ ...prev, categories: [categoryParam] }));
//       }
//       setInitialCategorySet(true);
//     }
//   }, [categories, searchParams]);

//   useEffect(() => {
//     if (filters.categories.length === 1) {
//       const categoryId = filters.categories[0];
//       setSelectedCategory(categoryId);
//       fetchSubcategories(categoryId);
//     } else {
//       setSubcategories([]);
//       setSelectedCategory(null);
//       setChildSubcategories([]);
//       setSelectedSubcategory(null);
//       setShowChildSubcategory(false);
//       if (filters.subcategories.length > 0) setFilters(prev => ({ ...prev, subcategories: [] }));
//       if (filters.childSubcategories.length > 0) setFilters(prev => ({ ...prev, childSubcategories: [] }));
//     }
//   }, [filters.categories]);

//   useEffect(() => {
//     if (filters.subcategories.length === 1 && selectedCategory) {
//       const subcategoryId = filters.subcategories[0];
//       setSelectedSubcategory(subcategoryId);
//       fetchChildSubcategories(selectedCategory, subcategoryId);
//     } else {
//       setChildSubcategories([]);
//       setSelectedSubcategory(null);
//       setShowChildSubcategory(false);
//       if (filters.childSubcategories.length > 0) setFilters(prev => ({ ...prev, childSubcategories: [] }));
//     }
//   }, [filters.subcategories, selectedCategory]);

//   useEffect(() => {
//     if (initialCategorySet) fetchProducts();
//   }, [filters.categories, filters.subcategories, filters.childSubcategories, filters.brands, filters.units, filters.priceRange, filters.search, filters.sortBy, currentPage, initialCategorySet, forceFetch]);

//   useEffect(() => {
//     if (!loading) restoreScrollPosition();
//   }, [loading]);

//   useEffect(() => {
//     const checkAllProductsCartStatus = async () => {
//       if (products.length === 0) return;
//       const productIds = products.map(p => p._id);
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;
      
//       try {
//         const response = await fetch('http://localhost:5000/api/cart/check-status', {
//           method: 'POST',
//           headers: { ...headers, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds })
//         });
//         const data = await response.json();
//         if (data.success) setProductsInCart(data.data);
//       } catch (error) { console.error('Error checking cart status:', error); }
//     };
//     checkAllProductsCartStatus();
//   }, [products]);

//   useEffect(() => {
//     const refreshCartStatus = async () => {
//       if (products.length === 0) return;
//       const productIds = products.map(p => p._id);
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;
      
//       try {
//         const response = await fetch('http://localhost:5000/api/cart/check-status', {
//           method: 'POST',
//           headers: { ...headers, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds })
//         });
//         const data = await response.json();
//         if (data.success) setProductsInCart(data.data);
//       } catch (error) { console.error('Error refreshing cart status:', error); }
//     };
//     const handleCartUpdate = () => refreshCartStatus();
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, [products]);

//   useEffect(() => {
//     const handleCategoryFilterChange = (event) => {
//       const categoryId = event.detail?.categoryId;
//       if (categoryId) {
//         saveScrollPosition();
//         setFilters(prev => ({ ...prev, categories: [categoryId], subcategories: [], childSubcategories: [] }));
//         setCurrentPage(1);
//         setForceFetch(prev => prev + 1);
//         const url = new URL(window.location.href);
//         url.searchParams.set('category', categoryId);
//         window.history.pushState({}, '', url);
//       } else if (event.detail?.categoryId === null) {
//         saveScrollPosition();
//         setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
//         setCurrentPage(1);
//         setForceFetch(prev => prev + 1);
//         const url = new URL(window.location.href);
//         url.searchParams.delete('category');
//         window.history.pushState({}, '', url);
//       }
//     };
//     window.addEventListener('categoryFilterChanged', handleCategoryFilterChange);
//     return () => window.removeEventListener('categoryFilterChanged', handleCategoryFilterChange);
//   }, []);

//   useEffect(() => {
//     const handlePopState = () => {
//       const categoryParam = new URLSearchParams(window.location.search).get('category');
//       if (categoryParam) setFilters(prev => ({ ...prev, categories: [categoryParam], subcategories: [], childSubcategories: [] }));
//       else setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
//       setCurrentPage(1);
//     };
//     window.addEventListener('popstate', handlePopState);
//     return () => window.removeEventListener('popstate', handlePopState);
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/categories');
//       const data = await response.json();
//       if (data.success) setCategories(data.data);
//       setCategoriesLoaded(true);
//     } catch (error) { console.error('Error fetching categories:', error); setCategoriesLoaded(true); }
//   };

//   const fetchSubcategories = async (categoryId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`);
//       const data = await response.json();
//       if (data.success && Array.isArray(data.data.subcategories)) {
//         setSubcategories(data.data.subcategories);
//         return data.data.subcategories;
//       } else {
//         setSubcategories([]);
//         return [];
//       }
//     } catch (error) { console.error('Error fetching subcategories:', error); setSubcategories([]); return []; }
//   };

//   const fetchChildSubcategories = async (categoryId, subcategoryId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`);
//       const data = await response.json();
//       if (data.success && Array.isArray(data.data.children)) {
//         setChildSubcategories(data.data.children);
//         setShowChildSubcategory(data.data.children.length > 0);
//         return data.data.children;
//       } else {
//         setChildSubcategories([]);
//         setShowChildSubcategory(false);
//         return [];
//       }
//     } catch (error) { console.error('Error fetching child subcategories:', error); setChildSubcategories([]); setShowChildSubcategory(false); return []; }
//   };

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams();
//       queryParams.append('page', currentPage);
//       queryParams.append('limit', 12);
//       if (filters.search) queryParams.append('search', filters.search);
//       if (filters.categories.length > 0) filters.categories.forEach(cat => queryParams.append('category', cat));
//       if (filters.subcategories.length > 0) filters.subcategories.forEach(sub => queryParams.append('subcategory', sub));
//       if (filters.childSubcategories.length > 0) filters.childSubcategories.forEach(child => queryParams.append('childSubcategory', child));
//       if (filters.brands.length > 0) filters.brands.forEach(brand => queryParams.append('brand', brand));
//       if (filters.units.length > 0) filters.units.forEach(unit => queryParams.append('unit', unit));
//       if (filters.priceRange.min) queryParams.append('minPrice', filters.priceRange.min);
//       if (filters.priceRange.max) queryParams.append('maxPrice', filters.priceRange.max);
      
//       let sortParam = '-createdAt';
//       switch (filters.sortBy) {
//         case 'price_low': sortParam = 'price_asc'; break;
//         case 'price_high': sortParam = 'price_desc'; break;
//         case 'name_asc': sortParam = 'name_asc'; break;
//         default: sortParam = 'newest';
//       }
//       queryParams.append('sort', sortParam);

//       const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
//       const data = await response.json();
//       if (data.success) {
//         setProducts(data.data || []);
//         setTotalPages(data.pagination?.pages || 1);
//         setTotalProducts(data.pagination?.total || 0);
//       }
//     } catch (error) { console.error('Error fetching products:', error); } finally { setLoading(false); }
//   };

//   const handleCategoryChange = (categoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newCategories = prev.categories.includes(categoryId) ? prev.categories.filter(id => id !== categoryId) : [...prev.categories, categoryId];
//       return { ...prev, categories: newCategories, subcategories: [], childSubcategories: [] };
//     });
//     setCurrentPage(1);
    
//     const isSelected = !filters.categories.includes(categoryId);
//     const newCategory = isSelected ? categoryId : null;
//     const params = new URLSearchParams(window.location.search);
//     if (newCategory) params.set('category', newCategory);
//     else params.delete('category');
//     window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
//     window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: newCategory } }));
//   };

//   const handleRemoveCategory = (categoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, categories: prev.categories.filter(id => id !== categoryId), subcategories: [], childSubcategories: [] }));
//     setCurrentPage(1);
//     const params = new URLSearchParams(window.location.search);
//     params.delete('category');
//     window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
//     window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
//   };

//   const handleSubcategoryChange = (subcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newSubcategories = prev.subcategories.includes(subcategoryId) ? prev.subcategories.filter(id => id !== subcategoryId) : [...prev.subcategories, subcategoryId];
//       return { ...prev, subcategories: newSubcategories, childSubcategories: [] };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveSubcategory = (subcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, subcategories: prev.subcategories.filter(id => id !== subcategoryId), childSubcategories: [] }));
//     setCurrentPage(1);
//   };

//   const handleChildSubcategoryChange = (childSubcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newChildSubcategories = prev.childSubcategories.includes(childSubcategoryId) ? prev.childSubcategories.filter(id => id !== childSubcategoryId) : [...prev.childSubcategories, childSubcategoryId];
//       return { ...prev, childSubcategories: newChildSubcategories };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveChildSubcategory = (childSubcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, childSubcategories: prev.childSubcategories.filter(id => id !== childSubcategoryId) }));
//     setCurrentPage(1);
//   };

//   const handleBrandChange = (brand) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newBrands = prev.brands.includes(brand) ? prev.brands.filter(b => b !== brand) : [...prev.brands, brand];
//       return { ...prev, brands: newBrands };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveBrand = (brand) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, brands: prev.brands.filter(b => b !== brand) }));
//     setCurrentPage(1);
//   };

//   const handleUnitChange = (unit) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newUnits = prev.units.includes(unit) ? prev.units.filter(u => u !== unit) : [...prev.units, unit];
//       return { ...prev, units: newUnits };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveUnit = (unit) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, units: prev.units.filter(u => u !== unit) }));
//     setCurrentPage(1);
//   };

//   const applyPriceRange = () => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, priceRange: { min: minPriceInput || '', max: maxPriceInput || '' } }));
//     setCurrentPage(1);
//   };

//   const clearPriceRange = () => {
//     saveScrollPosition();
//     setMinPriceInput('');
//     setMaxPriceInput('');
//     setFilters(prev => ({ ...prev, priceRange: { min: '', max: '' } }));
//   };

//   const clearFilters = () => {
//     saveScrollPosition();
//     setSearchInput('');
//     setFilters({
//       search: '',
//       categories: [],
//       subcategories: [],
//       childSubcategories: [],
//       brands: [],
//       units: [],
//       priceRange: { min: '', max: '' },
//       sortBy: 'newest'
//     });
//     setMinPriceInput('');
//     setMaxPriceInput('');
//     setCurrentPage(1);
//     window.history.pushState({}, '', window.location.pathname);
//     window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
//   };

//   const handleFilterChange = (filterType, value) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, [filterType]: value }));
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     saveScrollPosition();
//     setCurrentPage(newPage);
//   };

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
//   };

//   const getActiveFilterCount = () => {
//     let count = 0;
//     if (filters.search) count++;
//     if (filters.categories.length > 0) count += filters.categories.length;
//     if (filters.subcategories.length > 0) count += filters.subcategories.length;
//     if (filters.childSubcategories.length > 0) count += filters.childSubcategories.length;
//     if (filters.brands.length > 0) count += filters.brands.length;
//     if (filters.units.length > 0) count += filters.units.length;
//     if (filters.priceRange.min || filters.priceRange.max) count++;
//     return count;
//   };

//   useEffect(() => {
//     return () => { if (searchTimerRef.current) clearTimeout(searchTimerRef.current); };
//   }, []);

//   return (
//     <>
//       <LoadingBar isVisible={loading} />
//       <Navbar />
      
//       {/* Hero Section */}
//       <div className="bg-gray-50 border-b border-gray-200">
//         <div className="container mx-auto px-4 max-w-7xl py-2 md:py-6">
//           <h1 className="text-2xl md:text-4xl font-bold font-sans text-black text-center mb-1">All Products</h1>
//           <p className="text-gray-500 text-center text-sm">Discover our collection of premium gadgets</p>
//         </div>
//       </div>

//       <div className="min-h-screen bg-white">
//         <div className="container mx-auto px-4 max-w-7xl py-6">
//           {/* Filter and Sort Bar */}
//           <div className="mb-6">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setShowMobileFilters(true)}
//                   className="md:hidden flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700"
//                 >
//                   <SlidersHorizontal className="w-3.5 h-3.5" />
//                   Filters
//                   {getActiveFilterCount() > 0 && (
//                     <span className="ml-1 px-1 py-0.5 bg-black text-white text-[9px] rounded-full min-w-[16px] text-center">{getActiveFilterCount()}</span>
//                   )}
//                 </button>

//                 <select
//                   value={filters.sortBy}
//                   onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//                   className="px-3 py-1.5 text-xs border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-black"
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="price_low">Price: Low to High</option>
//                   <option value="price_high">Price: High to Low</option>
//                   <option value="name_asc">Name: A to Z</option>
//                 </select>

//                 {/* Desktop view toggle - hidden on mobile */}
//                 {!isMobile && (
//                   <div className="hidden md:flex items-center gap-1 bg-white border border-gray-200">
//                     <button onClick={() => setViewMode('grid')} className={`p-1.5 transition-all ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`} title="Grid View">
//                       <Grid className="w-3.5 h-3.5" />
//                     </button>
//                     <button onClick={() => setViewMode('list')} className={`p-1.5 transition-all ${viewMode === 'list' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`} title="List View">
//                       <List className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 )}
//               </div>
              
//               {/* Search Bar */}
//               <div className="relative w-full md:w-72">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchInput}
//                   onChange={handleSearchChange}
//                   className="w-full pl-9 pr-8 py-1.5 text-xs border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black bg-white"
//                 />
//                 {searchInput && (
//                   <button onClick={handleClearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
//                     <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Active Filters Display */}
//             {getActiveFilterCount() > 0 && (
//               <div className="mt-3 flex items-center gap-1.5 flex-wrap">
//                 {filters.search && (
//                   <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-[10px]">
//                     <span>🔍 "{filters.search}"</span>
//                     <button onClick={handleClearSearch} className="ml-1 hover:text-black"><X className="w-2.5 h-2.5" /></button>
//                   </div>
//                 )}
//                 {filters.categories.map(catId => {
//                   const category = categories.find(c => c._id === catId);
//                   return category ? (
//                     <div key={catId} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-[10px]">
//                       <Tag className="w-2.5 h-2.5" />
//                       <span>{category.name}</span>
//                       <button onClick={() => handleRemoveCategory(catId)} className="ml-1 hover:text-black"><X className="w-2.5 h-2.5" /></button>
//                     </div>
//                   ) : null;
//                 })}
//                 {filters.brands.map(brand => (
//                   <div key={brand} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-[10px]">
//                     <Building2 className="w-2.5 h-2.5" />
//                     <span>{brand}</span>
//                     <button onClick={() => handleRemoveBrand(brand)} className="ml-1 hover:text-black"><X className="w-2.5 h-2.5" /></button>
//                   </div>
//                 ))}
//                 {filters.units.map(unit => (
//                   <div key={unit} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-[10px]">
//                     <Scale className="w-2.5 h-2.5" />
//                     <span>{unit === 'pcs' ? 'Pieces' : 'Ton'}</span>
//                     <button onClick={() => handleRemoveUnit(unit)} className="ml-1 hover:text-black"><X className="w-2.5 h-2.5" /></button>
//                   </div>
//                 ))}
//                 {(filters.priceRange.min || filters.priceRange.max) && (
//                   <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-[10px]">
//                     <DollarSign className="w-2.5 h-2.5" />
//                     <span>৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
//                     <button onClick={clearPriceRange} className="ml-1 hover:text-black"><X className="w-2.5 h-2.5" /></button>
//                   </div>
//                 )}
//                 {getActiveFilterCount() > 0 && (
//                   <button onClick={clearFilters} className="px-2 py-1 text-[10px] text-gray-500 hover:text-black underline">
//                     Clear All
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Main Content */}
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Desktop Filters */}
//             {!isMobile && (
//               <div className="hidden md:block md:w-72 flex-shrink-0">
//                 <FilterSidebar 
//                   expandedSections={expandedSections}
//                   toggleSection={toggleSection}
//                   categories={categories}
//                   subcategories={subcategories}
//                   childSubcategories={childSubcategories}
//                   brands={brands}
//                   filters={filters}
//                   handleCategoryChange={handleCategoryChange}
//                   handleRemoveCategory={handleRemoveCategory}
//                   handleSubcategoryChange={handleSubcategoryChange}
//                   handleRemoveSubcategory={handleRemoveSubcategory}
//                   handleChildSubcategoryChange={handleChildSubcategoryChange}
//                   handleRemoveChildSubcategory={handleRemoveChildSubcategory}
//                   handleBrandChange={handleBrandChange}
//                   handleRemoveBrand={handleRemoveBrand}
//                   handleUnitChange={handleUnitChange}
//                   handleRemoveUnit={handleRemoveUnit}
//                   minPriceInput={minPriceInput}
//                   maxPriceInput={maxPriceInput}
//                   setMinPriceInput={setMinPriceInput}
//                   setMaxPriceInput={setMaxPriceInput}
//                   applyPriceRange={applyPriceRange}
//                   clearPriceRange={clearPriceRange}
//                   getActiveFilterCount={getActiveFilterCount}
//                   clearFilters={clearFilters}
//                   selectedCategory={selectedCategory}
//                   selectedSubcategory={selectedSubcategory}
//                   showChildSubcategory={showChildSubcategory}
//                   availableUnits={availableUnits}
//                   unitsLoading={unitsLoading}
//                 />
//               </div>
//             )}

//             {/* Products */}
//             <div className="flex-1" ref={productsContainerRef}>
//               {loading ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//                   {[...Array(12)].map((_, index) => (
//                     <div key={index} className="bg-white border border-gray-200 overflow-hidden animate-pulse">
//                       <div className="h-40 bg-gray-100"></div>
//                       <div className="p-3">
//                         <div className="h-3 bg-gray-100 rounded mb-2 w-3/4"></div>
//                         <div className="h-4 bg-gray-100 rounded mb-2 w-1/2"></div>
//                         <div className="h-2 bg-gray-100 rounded w-1/3"></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <>
//                   {products.length === 0 ? (
//                     <div className="text-center py-16 bg-white border border-gray-200">
//                       <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                       <p className="text-sm text-gray-500 mb-3">No products found</p>
//                       <button onClick={clearFilters} className="px-4 py-1.5 bg-black text-white text-xs font-medium hover:bg-gray-800">Clear Filters</button>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="mb-3 text-xs text-gray-500">Found {totalProducts} product{totalProducts !== 1 ? 's' : ''}</div>
                      
//                       {/* On mobile: always grid view with icons at bottom center */}
//                       {/* On desktop: show selected view mode */}
//                       {(isMobile || viewMode === 'grid') ? (
//                         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//                           {products.map(product => (
//                             <ProductGridCard key={product._id} product={product} router={router} isInCart={productsInCart[product._id] || false} onViewInCart={openCartSidebar} />
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="space-y-3">
//                           {products.map(product => (
//                             <ProductListCard key={product._id} product={product} router={router} isInCart={productsInCart[product._id] || false} onViewInCart={openCartSidebar} />
//                           ))}
//                         </div>
//                       )}

//                       {/* Pagination */}
//                       {totalPages > 1 && (
//                         <div className="flex justify-center items-center gap-1.5 mt-8">
//                           <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="px-2 py-1 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs">Prev</button>
//                           {[...Array(totalPages)].map((_, i) => {
//                             const pageNum = i + 1;
//                             if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
//                               return (
//                                 <button key={i} onClick={() => handlePageChange(pageNum)} className={`min-w-[28px] h-7 text-xs font-medium transition-all ${currentPage === pageNum ? 'bg-black text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
//                                   {pageNum}
//                                 </button>
//                               );
//                             } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
//                               return <span key={i} className="text-xs text-gray-400">...</span>;
//                             }
//                             return null;
//                           })}
//                           <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="px-2 py-1 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs">Next</button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filters Modal */}
//       {showMobileFilters && (
//         <div className="fixed inset-0 z-50 md:hidden">
//           <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
//           <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto shadow-xl">
//             <div className="sticky top-0 bg-white p-3 border-b border-gray-200 flex items-center justify-between">
//               <h3 className="text-sm font-semibold text-black">Filters</h3>
//               <button onClick={() => setShowMobileFilters(false)} className="p-1.5 hover:bg-gray-100">
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//             <div className="p-3">
//               <FilterSidebar 
//                 expandedSections={expandedSections}
//                 toggleSection={toggleSection}
//                 categories={categories}
//                 subcategories={subcategories}
//                 childSubcategories={childSubcategories}
//                 brands={brands}
//                 filters={filters}
//                 handleCategoryChange={handleCategoryChange}
//                 handleRemoveCategory={handleRemoveCategory}
//                 handleSubcategoryChange={handleSubcategoryChange}
//                 handleRemoveSubcategory={handleRemoveSubcategory}
//                 handleChildSubcategoryChange={handleChildSubcategoryChange}
//                 handleRemoveChildSubcategory={handleRemoveChildSubcategory}
//                 handleBrandChange={handleBrandChange}
//                 handleRemoveBrand={handleRemoveBrand}
//                 handleUnitChange={handleUnitChange}
//                 handleRemoveUnit={handleRemoveUnit}
//                 minPriceInput={minPriceInput}
//                 maxPriceInput={maxPriceInput}
//                 setMinPriceInput={setMinPriceInput}
//                 setMaxPriceInput={setMaxPriceInput}
//                 applyPriceRange={applyPriceRange}
//                 clearPriceRange={clearPriceRange}
//                 getActiveFilterCount={getActiveFilterCount}
//                 clearFilters={clearFilters}
//                 selectedCategory={selectedCategory}
//                 selectedSubcategory={selectedSubcategory}
//                 showChildSubcategory={showChildSubcategory}
//                 availableUnits={availableUnits}
//                 unitsLoading={unitsLoading}
//               />
//             </div>
//             <div className="sticky bottom-0 bg-white p-3 border-t border-gray-200">
//               <button onClick={() => setShowMobileFilters(false)} className="w-full py-2 bg-black text-white text-xs font-medium hover:bg-gray-800">Apply Filters</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cart Sidebar */}
//       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />

//       <Footer />

//       <style jsx>{`
//         @keyframes loading-bar {
//           0% { transform: translateX(-100%); }
//           50% { transform: translateX(0); }
//           100% { transform: translateX(100%); }
//         }
//         .animate-loading-bar {
//           animation: loading-bar 1.5s ease-in-out infinite;
//         }
//       `}</style>
//     </>
//   );
// }

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Link from 'next/link';
import { 
  Search, 
  Grid, 
  List, 
  SlidersHorizontal, 
  X, 
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Tag,
  Users,
  DollarSign,
  Sparkles,
  Eye, 
  ShoppingCart,
  ArrowLeft,
  Package,
  TrendingUp,
  Palette,
  Ruler,
  FolderTree,
  Gift,
  Heart,
  Truck,
  Star,
  Clock,
  Zap,
  Building2,
  Box,
  Scale,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../components/CartSidebar';

// Loading Bar Component
const LoadingBar = ({ isVisible }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-0.5 bg-gray-200 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="h-full bg-black animate-loading-bar"></div>
    </div>
  );
};

// Helper functions
const getUnitLabel = (unit) => {
  const units = {
    'pcs': 'pcs',
    'ton': 'ton',
    'other': 'unit'
  };
  return units[unit] || unit;
};

const formatPrice = (price) => {
  return price?.toFixed(2) || '0.00';
};

const truncateText = (text, limit = 40) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

// ✅ FIXED: Product Grid Card - Black/White theme, correct link
const ProductGridCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const isInCart = propIsInCart || false;
  const productImages = product.images || [];
  const hasMultipleImages = productImages.length > 1;
  const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
  const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
  const originalPrice = product.regularPrice;
  
  const isLowStock = product.stockAlertQuantity > 0 && product.stockQuantity <= product.stockAlertQuantity;
  const isOutOfStock = product.stockQuantity <= 0;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigateToProduct = () => {
    router.push(`/product/${product.slug || product._id}`);
  };

  const addToCart = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (isInCart) {
      onViewInCart();
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
        body: JSON.stringify({ productId: product._id, quantity: 1 })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        toast.success('Added to cart!', { id: toastId });
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

  return (
    <Link
      href={`/product/${product.slug || product._id}`}
      className="block group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="relative w-full h-40 overflow-hidden bg-gray-50">
        <img
          src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300?text=Product'}
          alt={product.productName}
          className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300?text=Product';
          }}
          loading="lazy"
        />
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 z-20 flex items-center gap-0.5">
            <Zap className="w-2.5 h-2.5" />
            {discountPercent}%
          </div>
        )}
        
        {/* Brand Badge on Image */}
        {product.brand && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 font-medium z-20 flex items-center gap-0.5">
            <Building2 className="w-2 h-2" />
            {product.brand}
          </div>
        )}
        
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
            <span className="bg-black text-white text-xs font-medium px-2 py-1">Out of Stock</span>
          </div>
        )}
        
        {/* Low Stock Badge */}
        {!isOutOfStock && isLowStock && (
          <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-[9px] font-medium px-1.5 py-0.5 z-20 flex items-center gap-0.5">
            <AlertTriangle className="w-2 h-2" />
            Only {product.stockQuantity} left
          </div>
        )}
        
        {/* Mobile: Always visible icons at bottom center */}
        {isMobile && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-30">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigateToProduct();
              }}
              className="bg-white p-1.5 shadow-md inline-flex items-center justify-center"
            >
              <Eye className="w-3.5 h-3.5 text-gray-700" />
            </button>
            <button
              onClick={addToCart}
              disabled={isOutOfStock}
              className={`p-1.5 shadow-md ${isOutOfStock ? 'bg-gray-100' : 'bg-white'}`}
            >
              {cartStatusLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-500" />
              ) : isInCart ? (
                <ShoppingCart className="w-3.5 h-3.5 text-black" />
              ) : (
                <ShoppingCart className="w-3.5 h-3.5 text-black" />
              )}
            </button>
          </div>
        )}
        
        {/* Desktop: Hover Icons */}
        {!isMobile && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigateToProduct();
              }}
              className="w-7 h-7 bg-white shadow-md hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-200"
            >
              <Eye className="w-3.5 h-3.5 text-gray-700 hover:text-white transition-colors" />
            </button>
            
            <button
              onClick={addToCart}
              disabled={isOutOfStock}
              className="w-7 h-7 bg-white shadow-md hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-200"
            >
              {cartStatusLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-700" />
              ) : isInCart ? (
                <ShoppingCart className="w-3.5 h-3.5 text-black hover:text-white transition-colors" />
              ) : (
                <ShoppingCart className="w-3.5 h-3.5 text-gray-700 hover:text-white transition-colors" />
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* Thumbnail Images - 4 thumbnails */}
      {hasMultipleImages && !isMobile && (
        <div className="flex justify-center items-center gap-1 py-1.5 bg-gray-50 border-b border-gray-100">
          {productImages.slice(0, 4).map((image, index) => (
            <button
              key={index}
              className={`w-6 h-6 overflow-hidden transition-all duration-200 ${
                activeIndex === index ? 'ring-1 ring-black ring-offset-1' : 'opacity-60 hover:opacity-100'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setActiveIndex(index);
              }}
            >
              <img src={image.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Content - Centered */}
      <div className="p-2.5 text-center">
        {/* Product Name */}
        <h3 className="text-xs font-medium text-gray-900 truncate mb-1" title={product.productName}>
          {truncateText(product.productName, 35)}
        </h3>

        {/* Price with Unit */}
        <div className="flex items-baseline justify-center gap-1.5 mb-1.5">
          <span className="text-sm font-bold text-black">
            ৳{formatPrice(currentPrice)}
          </span>
          {discountPercent > 0 && (
            <>
              <span className="text-[9px] text-gray-400 line-through">
                ৳{formatPrice(originalPrice)}
              </span>
            </>
          )}
          <span className="text-[9px] text-gray-500">/{getUnitLabel(product.unit)}</span>
        </div>

        {/* Stock Status - Centered */}
        <div className="mb-1.5 flex justify-center">
          {isOutOfStock ? (
            <span className="inline-flex items-center gap-1 text-red-600 text-[9px] font-medium">
              <div className="w-1 h-1 bg-red-500 rounded-full"></div>
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="inline-flex items-center gap-1 text-orange-600 text-[9px] font-medium">
              <AlertTriangle className="w-2 h-2" />
              Only {product.stockQuantity} left
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-green-600 text-[9px] font-medium">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              In Stock 
            </span>
          )}
        </div>
      </div>

      {/* ✅ FIXED: Different colors for Add to Cart vs View in Cart */}
      <button
        onClick={addToCart}
        disabled={isOutOfStock}
        className={`w-full py-1.5 text-center text-[10px] font-medium transition-colors flex items-center justify-center gap-1 ${
          isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 
          isInCart ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-700' : 
          'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {cartStatusLoading ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : isInCart ? (
          <>
            <ShoppingCart className="w-3 h-3" />
            View in Cart
          </>
        ) : (
          <>
            <ShoppingCart className="w-3 h-3" />
            Add to Cart
          </>
        )}
      </button>
    </Link>
  );
};

// ✅ FIXED: Product List Card - Black/White theme, correct link, wider images
const ProductListCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const isInCart = propIsInCart || false;
  const productImages = product.images || [];
  const hasMultipleImages = productImages.length > 1;
  const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
  const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
  const originalPrice = product.regularPrice;
  
  const isLowStock = product.stockAlertQuantity > 0 && product.stockQuantity <= product.stockAlertQuantity;
  const isOutOfStock = product.stockQuantity <= 0;

  // Get category name
  const categoryName = product.category?.name || product.categoryName || '';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigateToProduct = () => {
    router.push(`/product/${product.slug || product._id}`);
  };

  const addToCart = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (isInCart) {
      onViewInCart();
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
        body: JSON.stringify({ productId: product._id, quantity: 1 })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        toast.success('Added to cart!', { id: toastId });
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

  return (
    <Link
      href={`/product/${product.slug || product._id}`}
      className="block group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image Section - Wider */}
        <div className="sm:w-44 md:w-52 lg:w-60 relative flex-shrink-0">
          <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-gray-50">
            <img
              src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/150?text=Product'}
              alt={product.productName}
              className="w-full h-full object-contain p-3"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=Product';
              }}
              loading="lazy"
            />
            
            {discountPercent > 0 && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 z-20 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {discountPercent}%
              </div>
            )}
            
            {product.brand && (
              <div className="absolute top-2 right-2 bg-black/70 text-white text-[9px] px-2 py-1 font-medium z-20 flex items-center gap-1">
                <Building2 className="w-2.5 h-2.5" />
                {product.brand}
              </div>
            )}
            
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                <span className="bg-black text-white text-xs font-medium px-3 py-1.5">Out of Stock</span>
              </div>
            )}

            {/* ✅ ADDED: Hover Icons - Same as Grid Card */}
            {!isMobile && (
              <div className={`absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-30 transition-opacity duration-200 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigateToProduct();
                  }}
                  className="w-7 h-7 bg-white shadow-md hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-200"
                >
                  <Eye className="w-3.5 h-3.5 text-gray-700 hover:text-white transition-colors" />
                </button>
                
                <button
                  onClick={addToCart}
                  disabled={isOutOfStock}
                  className="w-7 h-7 bg-white shadow-md hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-200"
                >
                  {cartStatusLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-700" />
                  ) : isInCart ? (
                    <ShoppingCart className="w-3.5 h-3.5 text-black hover:text-white transition-colors" />
                  ) : (
                    <ShoppingCart className="w-3.5 h-3.5 text-gray-700 hover:text-white transition-colors" />
                  )}
                </button>
              </div>
            )}

            {/* Mobile: Always visible icons at bottom center */}
            {isMobile && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-30">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigateToProduct();
                  }}
                  className="bg-white p-1.5 shadow-md inline-flex items-center justify-center"
                >
                  <Eye className="w-3.5 h-3.5 text-gray-700" />
                </button>
                <button
                  onClick={addToCart}
                  disabled={isOutOfStock}
                  className={`p-1.5 shadow-md ${isOutOfStock ? 'bg-gray-100' : 'bg-white'}`}
                >
                  {cartStatusLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-500" />
                  ) : isInCart ? (
                    <ShoppingCart className="w-3.5 h-3.5 text-black" />
                  ) : (
                    <ShoppingCart className="w-3.5 h-3.5 text-black" />
                  )}
                </button>
              </div>
            )}
          </div>
          
          {/* Thumbnails - Bigger */}
          {hasMultipleImages && (
            <div className="flex justify-center gap-1.5 py-2 bg-gray-50 border-t border-gray-100">
              {productImages.slice(0, 4).map((image, idx) => (
                <div
                  key={idx}
                  className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 overflow-hidden cursor-pointer transition-all rounded-md ${
                    activeIndex === idx ? 'ring-2 ring-black ring-offset-1' : 'opacity-60 hover:opacity-100'
                  }`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setActiveIndex(idx);
                  }}
                >
                  <img src={image.url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-3 sm:p-4 flex flex-col">
          {/* Category before product name */}
          {categoryName && (
            <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">
              {categoryName}
            </p>
          )}
          
          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-black transition-colors">
            {product.productName}
          </h3>
          
          {/* Description - 2 lines */}
          <p className="text-[10px] sm:text-xs text-gray-500 mb-2 line-clamp-2">
            {product.fullDescription?.replace(/<[^>]*>/g, '').substring(0, 250) || product.shortDescription?.replace(/<[^>]*>/g, '').substring(0, 150) || 'No description available'}
          </p>
          
          {/* Price and Discount Row */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-black">৳{formatPrice(currentPrice)}</span>
              {discountPercent > 0 && (
                <>
                  <span className="text-[9px] sm:text-xs text-gray-400 line-through">৳{formatPrice(originalPrice)}</span>
                  <span className="text-[8px] sm:text-[9px] font-medium text-red-600 bg-red-50 px-1.5 py-0.5 rounded">-{discountPercent}%</span>
                </>
              )}
              <span className="text-[9px] sm:text-xs text-gray-500">/{getUnitLabel(product.unit)}</span>
            </div>
          </div>
          
          {/* Stock Status and Rating Row */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1 text-red-600 text-[9px] sm:text-[10px] font-medium">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="inline-flex items-center gap-1 text-orange-600 text-[9px] sm:text-[10px] font-medium">
                <AlertTriangle className="w-3 h-3" />
                Only {product.stockQuantity} left
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-green-600 text-[9px] sm:text-[10px] font-medium">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                In Stock ({product.stockQuantity})
              </span>
            )}
            
            {product.rating > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${star <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-[8px] sm:text-[9px] text-gray-500">({product.rating})</span>
              </div>
            )}
          </div>
          
          {/* ✅ REMOVED: Action buttons row - Now icons are on image hover */}
          {/* Add to Cart button remains at bottom */}
          <button
            onClick={addToCart}
            disabled={isOutOfStock}
            className={`w-full sm:w-auto px-4 py-2 text-[10px] sm:text-xs md:text-sm font-medium transition-colors flex items-center justify-center gap-1.5 rounded-lg ${
              isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 
              isInCart ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-700' : 
              'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {cartStatusLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : isInCart ? (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                View in Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

// Filter Sidebar Component - Black/White theme
const FilterSidebar = ({ 
  expandedSections, 
  toggleSection, 
  categories, 
  subcategories,
  childSubcategories,
  brands,
  filters, 
  handleCategoryChange, 
  handleRemoveCategory,
  handleSubcategoryChange,
  handleRemoveSubcategory,
  handleChildSubcategoryChange,
  handleRemoveChildSubcategory,
  handleBrandChange,
  handleRemoveBrand,
  handleUnitChange,
  handleRemoveUnit,
  minPriceInput,
  maxPriceInput,
  setMinPriceInput,
  setMaxPriceInput,
  applyPriceRange,
  clearPriceRange,
  getActiveFilterCount,
  clearFilters,
  selectedCategory,
  selectedSubcategory,
  showChildSubcategory,
  availableUnits,      
  unitsLoading   
}) => (
  <div className="bg-white border border-gray-200 p-4 sticky top-24">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-base font-semibold text-black flex items-center gap-2">
        <Filter className="w-4 h-4" />
        Filters
      </h3>
      {getActiveFilterCount() > 0 && (
        <button onClick={clearFilters} className="text-[11px] text-gray-500 hover:text-black">
          Clear All ({getActiveFilterCount()})
        </button>
      )}
    </div>

    {/* Price Range */}
    <div className="mb-4 border-b border-gray-100 pb-4">
      <button onClick={() => toggleSection('price')} className="flex items-center justify-between w-full text-left mb-3">
        <h4 className="font-medium text-sm text-black flex items-center gap-2">
          <DollarSign className="w-3.5 h-3.5" />
          Price Range
        </h4>
        {expandedSections.price ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
      </button>
      
      {expandedSections.price && (
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Min (৳)</span>
              <input
                type="text"
                inputMode="decimal"
                value={minPriceInput}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) setMinPriceInput(value);
                }}
                placeholder="0"
                className="w-24 px-2 py-1 text-right text-xs border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Max (৳)</span>
              <input
                type="text"
                inputMode="decimal"
                value={maxPriceInput}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) setMaxPriceInput(value);
                }}
                placeholder="Any"
                className="w-24 px-2 py-1 text-right text-xs border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
          
          <button
            onClick={applyPriceRange}
            disabled={!minPriceInput && !maxPriceInput}
            className="w-full py-1.5 bg-black text-white text-xs font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Apply Price Range
          </button>

          {(filters.priceRange.min || filters.priceRange.max) && (
            <div className="flex items-center justify-between bg-gray-50 p-2 border border-gray-200">
              <span className="text-xs font-medium text-black">৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
              <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
            </div>
          )}
        </div>
      )}
    </div>

    {/* Categories */}
    <div className="mb-4 border-b border-gray-100 pb-4">
      <button onClick={() => toggleSection('categories')} className="flex items-center justify-between w-full text-left mb-3">
        <h4 className="font-medium text-sm text-black flex items-center gap-2">
          <Tag className="w-3.5 h-3.5" />
          Categories
        </h4>
        {expandedSections.categories ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
      </button>
      
      {expandedSections.categories && (
        <div className="space-y-2">
          {filters.categories.length > 0 && (
            <div className="mb-2 p-2 bg-gray-50 border border-gray-100">
              <p className="text-[10px] text-gray-500 mb-1.5">Selected Categories:</p>
              {filters.categories.map(catId => {
                const category = categories.find(c => c._id === catId);
                return category ? (
                  <div key={catId} className="flex items-center justify-between py-1">
                    <span className="text-xs text-gray-700">{category.name}</span>
                    <button onClick={() => handleRemoveCategory(catId)} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
                  </div>
                ) : null;
              })}
            </div>
          )}
          
          <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5">
            {categories.map(category => (
              <label key={category._id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category._id)}
                  onChange={() => handleCategoryChange(category._id)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-xs text-gray-700 hover:text-black transition-colors">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Brands */}
    <div className="mb-4 border-b border-gray-100 pb-4">
      <button onClick={() => toggleSection('brands')} className="flex items-center justify-between w-full text-left mb-3">
        <h4 className="font-medium text-sm text-black flex items-center gap-2">
          <Building2 className="w-3.5 h-3.5" />
          Brands
        </h4>
        {expandedSections.brands ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
      </button>
      
      {expandedSections.brands && (
        <div className="space-y-2">
          {filters.brands.length > 0 && (
            <div className="mb-2 p-2 bg-gray-50 border border-gray-100">
              <p className="text-[10px] text-gray-500 mb-1.5">Selected Brands:</p>
              {filters.brands.map(brand => (
                <div key={brand} className="flex items-center justify-between py-1">
                  <span className="text-xs text-gray-700">{brand}</span>
                  <button onClick={() => handleRemoveBrand(brand)} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
          )}
          
          <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5">
            {brands.map(brand => (
              <label key={brand.name} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand.name)}
                  onChange={() => handleBrandChange(brand.name)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-xs text-gray-700 hover:text-black transition-colors">{brand.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Unit Filter */}
    <div className="mb-4">
      <button onClick={() => toggleSection('unit')} className="flex items-center justify-between w-full text-left mb-3">
        <h4 className="font-medium text-sm text-black flex items-center gap-2">
          <Scale className="w-3.5 h-3.5" />
          Unit
        </h4>
        {expandedSections.unit ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
      </button>
      
      {expandedSections.unit && (
        <div className="space-y-2">
          {filters.units.length > 0 && (
            <div className="mb-2 p-2 bg-gray-50 border border-gray-100">
              <p className="text-[10px] text-gray-500 mb-1.5">Selected Units:</p>
              {filters.units.map(unit => {
                const unitLabel = availableUnits.find(u => u.value === unit)?.label || unit;
                return (
                  <div key={unit} className="flex items-center justify-between py-1">
                    <span className="text-xs text-gray-700">{unitLabel}</span>
                    <button onClick={() => handleRemoveUnit(unit)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {availableUnits.length === 0 ? (
              <p className="text-xs text-gray-500">No units available</p>
            ) : (
              availableUnits.map(unit => (
                <label key={unit.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.units.includes(unit.value)}
                    onChange={() => handleUnitChange(unit.value)}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-xs text-gray-700 hover:text-black transition-colors">
                    {unit.label}
                  </span>
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [childSubcategories, setChildSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showChildSubcategory, setShowChildSubcategory] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const [forceFetch, setForceFetch] = useState(0);
  const [brands, setBrands] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [availableUnits, setAvailableUnits] = useState([]);
  const [unitsLoading, setUnitsLoading] = useState(true);
  
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    categories: true,
    brands: true,
    unit: true
  });

  const productsContainerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const searchTimerRef = useRef(null);

  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    subcategories: [],
    childSubcategories: [],
    brands: [],
    units: [],
    priceRange: { min: '', max: '' },
    sortBy: 'newest'
  });

  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const [initialCategorySet, setInitialCategorySet] = useState(false);

  const openCartSidebar = () => {
    setIsCartOpen(true);
  };

  const closeCartSidebar = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const saveScrollPosition = () => {
    scrollPositionRef.current = window.scrollY;
  };

  const restoreScrollPosition = () => {
    if (scrollPositionRef.current > 0) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
    }
  };

  const debouncedSearch = useCallback((searchValue) => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      saveScrollPosition();
      setFilters(prev => ({ ...prev, search: searchValue }));
      setCurrentPage(1);
    }, 500);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    saveScrollPosition();
    setFilters(prev => ({ ...prev, search: '' }));
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/units/all');
        const data = await response.json();
        if (data.success) {
          setAvailableUnits(data.data);
        }
      } catch (error) {
        console.error('Error fetching units:', error);
      } finally {
        setUnitsLoading(false);
      }
    };
    fetchUnits();
  }, []);

//  const fetchBrands = async () => {
//   try {
//     // First fetch all brands
//     const brandsResponse = await fetch('http://localhost:5000/api/brands');
//     const brandsData = await brandsResponse.json();
    
//     if (brandsData.success) {
//       // Then fetch products to get unique brand names
//       const productsResponse = await fetch('http://localhost:5000/api/products?limit=1000');
//       const productsData = await productsResponse.json();
      
//       if (productsData.success) {
//         // Get unique brand names from products (only where brand exists)
//         const productBrands = new Set();
//         productsData.data.forEach(product => {
//           if (product.brand && product.brand.trim() !== '' && product.isActive !== false) {
//             productBrands.add(product.brand);
//           }
//         });
        
//         // Filter brands to only those that have products
//         const filteredBrands = brandsData.data.filter(brand => 
//           productBrands.has(brand.name)
//         );
        
//         setBrands(filteredBrands);
//       } else {
//         // If products fetch fails, show all brands
//         setBrands(brandsData.data);
//       }
//     }
//   } catch (error) {
//     console.error('Error fetching brands:', error);
//     // If error, try to fetch brands normally
//     try {
//       const response = await fetch('http://localhost:5000/api/brands');
//       const data = await response.json();
//       if (data.success) setBrands(data.data);
//     } catch (err) {
//       console.error('Error fetching brands fallback:', err);
//     }
//   }
// };

  useEffect(() => {
    if (categories.length > 0 && !initialCategorySet) {
      const categoryParam = searchParams.get('category');
      if (categoryParam && categories.some(cat => cat._id === categoryParam)) {
        setFilters(prev => ({ ...prev, categories: [categoryParam] }));
      }
      setInitialCategorySet(true);
    }
  }, [categories, searchParams]);

  useEffect(() => {
    if (filters.categories.length === 1) {
      const categoryId = filters.categories[0];
      setSelectedCategory(categoryId);
      fetchSubcategories(categoryId);
    } else {
      setSubcategories([]);
      setSelectedCategory(null);
      setChildSubcategories([]);
      setSelectedSubcategory(null);
      setShowChildSubcategory(false);
      if (filters.subcategories.length > 0) setFilters(prev => ({ ...prev, subcategories: [] }));
      if (filters.childSubcategories.length > 0) setFilters(prev => ({ ...prev, childSubcategories: [] }));
    }
  }, [filters.categories]);

  useEffect(() => {
    if (filters.subcategories.length === 1 && selectedCategory) {
      const subcategoryId = filters.subcategories[0];
      setSelectedSubcategory(subcategoryId);
      fetchChildSubcategories(selectedCategory, subcategoryId);
    } else {
      setChildSubcategories([]);
      setSelectedSubcategory(null);
      setShowChildSubcategory(false);
      if (filters.childSubcategories.length > 0) setFilters(prev => ({ ...prev, childSubcategories: [] }));
    }
  }, [filters.subcategories, selectedCategory]);

  useEffect(() => {
    if (initialCategorySet) fetchProducts();
  }, [filters.categories, filters.subcategories, filters.childSubcategories, filters.brands, filters.units, filters.priceRange, filters.search, filters.sortBy, currentPage, initialCategorySet, forceFetch]);

  useEffect(() => {
    if (!loading) restoreScrollPosition();
  }, [loading]);

  // useEffect(() => {
  //   const checkAllProductsCartStatus = async () => {
  //     if (products.length === 0) return;
  //     const productIds = products.map(p => p._id);
  //     const token = localStorage.getItem('token');
  //     const sessionId = localStorage.getItem('cartSessionId');
  //     const headers = {};
  //     if (token) headers['Authorization'] = `Bearer ${token}`;
  //     else if (sessionId) headers['x-session-id'] = sessionId;
      
  //     try {
  //       const response = await fetch('http://localhost:5000/api/cart/check-status', {
  //         method: 'POST',
  //         headers: { ...headers, 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ productIds })
  //       });
  //       const data = await response.json();
  //       if (data.success) setProductsInCart(data.data);
  //     } catch (error) { console.error('Error checking cart status:', error); }
  //   };
  //   checkAllProductsCartStatus();
  // }, [products]);

  // ProductsClient.js - Update the checkCartStatus function

const checkAllProductsCartStatus = async (productIds) => {
  if (!productIds || productIds.length === 0) return;
  
  const token = localStorage.getItem('token');
  let sessionId = localStorage.getItem('cartSessionId');
  
  // ✅ Generate session if missing
  if (!token && !sessionId) {
    sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    localStorage.setItem('cartSessionId', sessionId);
  }
  
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else if (sessionId) {
    headers['x-session-id'] = sessionId;
  }
  
  try {
    // ✅ Batch check all products in one call
    const response = await fetch('http://localhost:5000/api/cart/check-status', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ productIds })
    });
    const data = await response.json();
    if (data.success) {
      setProductsInCart(data.data);
    }
  } catch (error) {
    console.error('Error checking cart status:', error);
  }
};

// ✅ Call it after products load
useEffect(() => {
  if (products.length > 0) {
    const productIds = products.map(p => p._id);
    checkAllProductsCartStatus(productIds);
  }
}, [products]);
  useEffect(() => {
    const refreshCartStatus = async () => {
      if (products.length === 0) return;
      const productIds = products.map(p => p._id);
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      
      try {
        const response = await fetch('http://localhost:5000/api/cart/check-status', {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds })
        });
        const data = await response.json();
        if (data.success) setProductsInCart(data.data);
      } catch (error) { console.error('Error refreshing cart status:', error); }
    };
    const handleCartUpdate = () => refreshCartStatus();
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [products]);

  useEffect(() => {
    const handleCategoryFilterChange = (event) => {
      const categoryId = event.detail?.categoryId;
      if (categoryId) {
        saveScrollPosition();
        setFilters(prev => ({ ...prev, categories: [categoryId], subcategories: [], childSubcategories: [] }));
        setCurrentPage(1);
        setForceFetch(prev => prev + 1);
        const url = new URL(window.location.href);
        url.searchParams.set('category', categoryId);
        window.history.pushState({}, '', url);
      } else if (event.detail?.categoryId === null) {
        saveScrollPosition();
        setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
        setCurrentPage(1);
        setForceFetch(prev => prev + 1);
        const url = new URL(window.location.href);
        url.searchParams.delete('category');
        window.history.pushState({}, '', url);
      }
    };
    window.addEventListener('categoryFilterChanged', handleCategoryFilterChange);
    return () => window.removeEventListener('categoryFilterChanged', handleCategoryFilterChange);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const categoryParam = new URLSearchParams(window.location.search).get('category');
      if (categoryParam) setFilters(prev => ({ ...prev, categories: [categoryParam], subcategories: [], childSubcategories: [] }));
      else setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
      setCurrentPage(1);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

//  const fetchCategories = async () => {
//   try {
//     // First, fetch all categories
//     const categoriesResponse = await fetch('http://localhost:5000/api/categories');
//     const categoriesData = await categoriesResponse.json();
    
//     if (categoriesData.success) {
//       // Then, fetch products to get categories that have products
//       const productsResponse = await fetch('http://localhost:5000/api/products?limit=1000&fields=category,isActive');
//       const productsData = await productsResponse.json();
      
//       if (productsData.success && productsData.data) {
//         // Get unique category IDs from products
//         const productCategoryIds = new Set();
        
//         productsData.data.forEach(product => {
//           // Check if product has a category and is active
//           if (product.category && product.isActive !== false) {
//             // If category is an object with _id, use that, otherwise use the string
//             const categoryId = typeof product.category === 'object' 
//               ? product.category._id?.toString() 
//               : product.category.toString();
//             if (categoryId) {
//               productCategoryIds.add(categoryId);
//             }
//           }
//         });
        
//         // Filter categories - only show those that have products
//         const filteredCategories = categoriesData.data.filter(category => {
//           const categoryId = category._id.toString();
//           return productCategoryIds.has(categoryId);
//         });
        
//         setCategories(filteredCategories);
//       } else {
//         // If products fetch fails, show all categories
//         setCategories(categoriesData.data);
//       }
//       setCategoriesLoaded(true);
//     }
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     setCategoriesLoaded(true);
//   }
// };

// ProductsClient.js - Replace fetchCategories

const fetchCategories = async () => {
  try {
    // ✅ Use lightweight endpoint
    const response = await fetch('http://localhost:5000/api/categories/with-products');
    const data = await response.json();
    
    if (data.success) {
      setCategories(data.data);
    }
    setCategoriesLoaded(true);
  } catch (error) {
    console.error('Error fetching categories:', error);
    setCategoriesLoaded(true);
  }
};

// ProductsClient.js - Replace fetchBrands

const fetchBrands = async () => {
  try {
    // ✅ Use lightweight endpoint
    const response = await fetch('http://localhost:5000/api/products/brands/with-products');
    const data = await response.json();
    
    if (data.success) {
      setBrands(data.data);
    }
  } catch (error) {
    console.error('Error fetching brands:', error);
  }
};
  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data.subcategories)) {
        setSubcategories(data.data.subcategories);
        return data.data.subcategories;
      } else {
        setSubcategories([]);
        return [];
      }
    } catch (error) { console.error('Error fetching subcategories:', error); setSubcategories([]); return []; }
  };

  const fetchChildSubcategories = async (categoryId, subcategoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data.children)) {
        setChildSubcategories(data.data.children);
        setShowChildSubcategory(data.data.children.length > 0);
        return data.data.children;
      } else {
        setChildSubcategories([]);
        setShowChildSubcategory(false);
        return [];
      }
    } catch (error) { console.error('Error fetching child subcategories:', error); setChildSubcategories([]); setShowChildSubcategory(false); return []; }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage);
      queryParams.append('limit', 16);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.categories.length > 0) filters.categories.forEach(cat => queryParams.append('category', cat));
      if (filters.subcategories.length > 0) filters.subcategories.forEach(sub => queryParams.append('subcategory', sub));
      if (filters.childSubcategories.length > 0) filters.childSubcategories.forEach(child => queryParams.append('childSubcategory', child));
      if (filters.brands.length > 0) filters.brands.forEach(brand => queryParams.append('brand', brand));
      if (filters.units.length > 0) filters.units.forEach(unit => queryParams.append('unit', unit));
      if (filters.priceRange.min) queryParams.append('minPrice', filters.priceRange.min);
      if (filters.priceRange.max) queryParams.append('maxPrice', filters.priceRange.max);
      
      let sortParam = '-createdAt';
      switch (filters.sortBy) {
        case 'price_low': sortParam = 'price_asc'; break;
        case 'price_high': sortParam = 'price_desc'; break;
        case 'name_asc': sortParam = 'name_asc'; break;
        default: sortParam = 'newest';
      }
      queryParams.append('sort', sortParam);

      const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalProducts(data.pagination?.total || 0);
      }
    } catch (error) { console.error('Error fetching products:', error); } finally { setLoading(false); }
  };

  const handleCategoryChange = (categoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newCategories = prev.categories.includes(categoryId) ? prev.categories.filter(id => id !== categoryId) : [...prev.categories, categoryId];
      return { ...prev, categories: newCategories, subcategories: [], childSubcategories: [] };
    });
    setCurrentPage(1);
    
    const isSelected = !filters.categories.includes(categoryId);
    const newCategory = isSelected ? categoryId : null;
    const params = new URLSearchParams(window.location.search);
    if (newCategory) params.set('category', newCategory);
    else params.delete('category');
    window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
    window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: newCategory } }));
  };

  const handleRemoveCategory = (categoryId) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, categories: prev.categories.filter(id => id !== categoryId), subcategories: [], childSubcategories: [] }));
    setCurrentPage(1);
    const params = new URLSearchParams(window.location.search);
    params.delete('category');
    window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
    window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
  };

  const handleSubcategoryChange = (subcategoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newSubcategories = prev.subcategories.includes(subcategoryId) ? prev.subcategories.filter(id => id !== subcategoryId) : [...prev.subcategories, subcategoryId];
      return { ...prev, subcategories: newSubcategories, childSubcategories: [] };
    });
    setCurrentPage(1);
  };

  const handleRemoveSubcategory = (subcategoryId) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, subcategories: prev.subcategories.filter(id => id !== subcategoryId), childSubcategories: [] }));
    setCurrentPage(1);
  };

  const handleChildSubcategoryChange = (childSubcategoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newChildSubcategories = prev.childSubcategories.includes(childSubcategoryId) ? prev.childSubcategories.filter(id => id !== childSubcategoryId) : [...prev.childSubcategories, childSubcategoryId];
      return { ...prev, childSubcategories: newChildSubcategories };
    });
    setCurrentPage(1);
  };

  const handleRemoveChildSubcategory = (childSubcategoryId) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, childSubcategories: prev.childSubcategories.filter(id => id !== childSubcategoryId) }));
    setCurrentPage(1);
  };

  const handleBrandChange = (brand) => {
    saveScrollPosition();
    setFilters(prev => {
      const newBrands = prev.brands.includes(brand) ? prev.brands.filter(b => b !== brand) : [...prev.brands, brand];
      return { ...prev, brands: newBrands };
    });
    setCurrentPage(1);
  };

  const handleRemoveBrand = (brand) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, brands: prev.brands.filter(b => b !== brand) }));
    setCurrentPage(1);
  };

  const handleUnitChange = (unit) => {
    saveScrollPosition();
    setFilters(prev => {
      const newUnits = prev.units.includes(unit) ? prev.units.filter(u => u !== unit) : [...prev.units, unit];
      return { ...prev, units: newUnits };
    });
    setCurrentPage(1);
  };

  const handleRemoveUnit = (unit) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, units: prev.units.filter(u => u !== unit) }));
    setCurrentPage(1);
  };

  const applyPriceRange = () => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, priceRange: { min: minPriceInput || '', max: maxPriceInput || '' } }));
    setCurrentPage(1);
  };

  const clearPriceRange = () => {
    saveScrollPosition();
    setMinPriceInput('');
    setMaxPriceInput('');
    setFilters(prev => ({ ...prev, priceRange: { min: '', max: '' } }));
  };

  const clearFilters = () => {
    saveScrollPosition();
    setSearchInput('');
    setFilters({
      search: '',
      categories: [],
      subcategories: [],
      childSubcategories: [],
      brands: [],
      units: [],
      priceRange: { min: '', max: '' },
      sortBy: 'newest'
    });
    setMinPriceInput('');
    setMaxPriceInput('');
    setCurrentPage(1);
    window.history.pushState({}, '', window.location.pathname);
    window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
  };

  const handleFilterChange = (filterType, value) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    saveScrollPosition();
    setCurrentPage(newPage);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.subcategories.length > 0) count += filters.subcategories.length;
    if (filters.childSubcategories.length > 0) count += filters.childSubcategories.length;
    if (filters.brands.length > 0) count += filters.brands.length;
    if (filters.units.length > 0) count += filters.units.length;
    if (filters.priceRange.min || filters.priceRange.max) count++;
    return count;
  };

  useEffect(() => {
    return () => { if (searchTimerRef.current) clearTimeout(searchTimerRef.current); };
  }, []);

  return (
    <>
      <LoadingBar isVisible={loading} />
      <Navbar />
      
      {/* Hero Section - Black/White */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-3">
              <Package className="w-6 h-6 text-black" />
              <h1 className="text-2xl md:text-4xl font-bold text-black text-center">All Products</h1>
              <Package className="w-6 h-6 text-black" />
            </div>
            <p className="text-gray-500 text-center text-sm mt-1">Discover our collection of premium products</p>
            
            {/* Search Bar - Under the header */}
            <div className="w-full max-w-2xl mt-4 md:mt-5">
              <div className="relative flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden focus-within:border-black focus-within:ring-2 focus-within:ring-black/10 transition-all">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-24 py-2.5 text-sm border-0 focus:outline-none bg-transparent text-black placeholder:text-gray-400"
                />
                {searchInput && (
                  <button onClick={handleClearSearch} className="absolute right-3 p-1.5 text-gray-400 hover:text-black rounded-lg transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 max-w-7xl py-6">
          {/* Filter and Sort Bar */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="md:hidden flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-1 px-1 py-0.5 bg-black text-white text-[9px] rounded-full min-w-[16px] text-center">{getActiveFilterCount()}</span>
                  )}
                </button>

                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-3 py-1.5 text-xs border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                </select>

                {/* Desktop view toggle */}
                {!isMobile && (
                  <div className="hidden md:flex items-center gap-1 bg-white border border-gray-200">
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 transition-all ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`} title="Grid View">
                      <Grid className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-1.5 transition-all ${viewMode === 'list' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`} title="List View">
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="w-full pl-9 pr-8 py-1.5 text-xs border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black bg-white"
                />
                {searchInput && (
                  <button onClick={handleClearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {getActiveFilterCount() > 0 && (
              <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                {filters.search && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-[10px]">
                    <span>🔍 "{filters.search}"</span>
                    <button onClick={handleClearSearch} className="ml-1 hover:text-black"><X className="w-2.5 h-2.5" /></button>
                  </div>
                )}
                {filters.categories.map(catId => {
                  const category = categories.find(c => c._id === catId);
                  return category ? (
                    <div key={catId} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-[10px]">
                      <Tag className="w-2.5 h-2.5" />
                      <span>{category.name}</span>
                      <button onClick={() => handleRemoveCategory(catId)} className="ml-1 hover:text-black"><X className="w-2.5 h-2.5" /></button>
                    </div>
                  ) : null;
                })}
                {filters.brands.map(brand => (
                  <div key={brand} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-[10px]">
                    <Building2 className="w-2.5 h-2.5" />
                    <span>{brand}</span>
                    <button onClick={() => handleRemoveBrand(brand)} className="ml-1 hover:text-black"><X className="w-2.5 h-2.5" /></button>
                  </div>
                ))}
                {filters.units.map(unit => (
                  <div key={unit} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-[10px]">
                    <Scale className="w-2.5 h-2.5" />
                    <span>{unit === 'pcs' ? 'Pieces' : 'Ton'}</span>
                    <button onClick={() => handleRemoveUnit(unit)} className="ml-1 hover:text-black"><X className="w-2.5 h-2.5" /></button>
                  </div>
                ))}
                {(filters.priceRange.min || filters.priceRange.max) && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-[10px]">
                    <DollarSign className="w-2.5 h-2.5" />
                    <span>৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
                    <button onClick={clearPriceRange} className="ml-1 hover:text-black"><X className="w-2.5 h-2.5" /></button>
                  </div>
                )}
                {getActiveFilterCount() > 0 && (
                  <button onClick={clearFilters} className="px-2 py-1 text-[10px] text-gray-500 hover:text-black underline">
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Desktop Filters */}
            {!isMobile && (
              <div className="hidden md:block md:w-72 flex-shrink-0">
                <FilterSidebar 
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  categories={categories}
                  subcategories={subcategories}
                  childSubcategories={childSubcategories}
                  brands={brands}
                  filters={filters}
                  handleCategoryChange={handleCategoryChange}
                  handleRemoveCategory={handleRemoveCategory}
                  handleSubcategoryChange={handleSubcategoryChange}
                  handleRemoveSubcategory={handleRemoveSubcategory}
                  handleChildSubcategoryChange={handleChildSubcategoryChange}
                  handleRemoveChildSubcategory={handleRemoveChildSubcategory}
                  handleBrandChange={handleBrandChange}
                  handleRemoveBrand={handleRemoveBrand}
                  handleUnitChange={handleUnitChange}
                  handleRemoveUnit={handleRemoveUnit}
                  minPriceInput={minPriceInput}
                  maxPriceInput={maxPriceInput}
                  setMinPriceInput={setMinPriceInput}
                  setMaxPriceInput={setMaxPriceInput}
                  applyPriceRange={applyPriceRange}
                  clearPriceRange={clearPriceRange}
                  getActiveFilterCount={getActiveFilterCount}
                  clearFilters={clearFilters}
                  selectedCategory={selectedCategory}
                  selectedSubcategory={selectedSubcategory}
                  showChildSubcategory={showChildSubcategory}
                  availableUnits={availableUnits}
                  unitsLoading={unitsLoading}
                />
              </div>
            )}

            {/* Products */}
            <div className="flex-1" ref={productsContainerRef}>
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[...Array(12)].map((_, index) => (
                    <div key={index} className="bg-white border border-gray-200 overflow-hidden animate-pulse">
                      <div className="h-40 bg-gray-100"></div>
                      <div className="p-3">
                        <div className="h-3 bg-gray-100 rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-gray-100 rounded mb-2 w-1/2"></div>
                        <div className="h-2 bg-gray-100 rounded w-1/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {products.length === 0 ? (
                    <div className="text-center py-16 bg-white border border-gray-200">
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500 mb-3">No products found</p>
                      <button onClick={clearFilters} className="px-4 py-1.5 bg-black text-white text-xs font-medium hover:bg-gray-800">Clear Filters</button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-3 text-xs text-gray-500"></div>
                      
                      {(isMobile || viewMode === 'grid') ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {products.map(product => (
                            <ProductGridCard key={product._id} product={product} router={router} isInCart={productsInCart[product._id] || false} onViewInCart={openCartSidebar} />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {products.map(product => (
                            <ProductListCard key={product._id} product={product} router={router} isInCart={productsInCart[product._id] || false} onViewInCart={openCartSidebar} />
                          ))}
                        </div>
                      )}

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-1.5 mt-8">
                          <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="px-2 py-1 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs">Prev</button>
                          {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                              return (
                                <button key={i} onClick={() => handlePageChange(pageNum)} className={`min-w-[28px] h-7 text-xs font-medium transition-all ${currentPage === pageNum ? 'bg-black text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                                  {pageNum}
                                </button>
                              );
                            } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                              return <span key={i} className="text-xs text-gray-400">...</span>;
                            }
                            return null;
                          })}
                          <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="px-2 py-1 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs">Next</button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white p-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-black">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-1.5 hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3">
              <FilterSidebar 
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                categories={categories}
                subcategories={subcategories}
                childSubcategories={childSubcategories}
                brands={brands}
                filters={filters}
                handleCategoryChange={handleCategoryChange}
                handleRemoveCategory={handleRemoveCategory}
                handleSubcategoryChange={handleSubcategoryChange}
                handleRemoveSubcategory={handleRemoveSubcategory}
                handleChildSubcategoryChange={handleChildSubcategoryChange}
                handleRemoveChildSubcategory={handleRemoveChildSubcategory}
                handleBrandChange={handleBrandChange}
                handleRemoveBrand={handleRemoveBrand}
                handleUnitChange={handleUnitChange}
                handleRemoveUnit={handleRemoveUnit}
                minPriceInput={minPriceInput}
                maxPriceInput={maxPriceInput}
                setMinPriceInput={setMinPriceInput}
                setMaxPriceInput={setMaxPriceInput}
                applyPriceRange={applyPriceRange}
                clearPriceRange={clearPriceRange}
                getActiveFilterCount={getActiveFilterCount}
                clearFilters={clearFilters}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                showChildSubcategory={showChildSubcategory}
                availableUnits={availableUnits}
                unitsLoading={unitsLoading}
              />
            </div>
            <div className="sticky bottom-0 bg-white p-3 border-t border-gray-200">
              <button onClick={() => setShowMobileFilters(false)} className="w-full py-2 bg-black text-white text-xs font-medium hover:bg-gray-800">Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />

      <Footer />

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}