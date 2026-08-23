
// // components/home/OfferSection.jsx
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ArrowRight, 
//   Percent,
//   ChevronLeft,
//   ChevronRight,
//   ShoppingBag,
//   Loader2,
//   ShoppingCart,
//   Zap,
//   Flame,
//   Sparkles,
//   Star
// } from 'lucide-react';
// import { toast } from 'sonner';
// import CartSidebar from '../CartSidebar';

// // Helper functions
// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// // Small Product Card - Horizontal Layout with animations
// const SmallProductCard = ({ 
//   product, 
//   isInCart: propIsInCart, 
//   onCartStatusChange, 
//   onViewInCart 
// }) => {
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);
//   const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
//   const productImage = product.images?.[0]?.url || product.images?.[0] || 'https://via.placeholder.com/300?text=Product';

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
    
//     if (product.stockQuantity <= 0) {
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
//         setIsInCart(true);
//         if (onCartStatusChange) {
//           onCartStatusChange(product._id, true);
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

//   // Strip HTML tags for short description
//   const stripHtml = (html) => {
//     if (!html) return '';
//     const tmp = document.createElement('div');
//     tmp.innerHTML = html;
//     return tmp.textContent || tmp.innerText || '';
//   };

//   const shortDescription = product.shortDescription 
//     ? stripHtml(product.shortDescription).substring(0, 50) 
//     : '';

//   return (
//     <Link href={`/product/${product.slug || product._id}`} className="block h-full">
//       <motion.div
//         className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-row"
//         whileHover={{ y: -2 }}
//         transition={{ duration: 0.2 }}
//       >
//         {/* Left - Product Image */}
//         <div className="relative w-20 sm:w-24 md:w-28 flex-shrink-0 bg-gray-50 overflow-hidden">
//           <div className="aspect-square w-full h-full">
//             <img
//               src={productImage}
//               alt={product.productName}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/150?text=Product';
//               }}
//               loading="lazy"
//             />
//           </div>
          
//           {/* Discount Badge - Top Left */}
//           {discountPercent > 0 && (
//             <div className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1">
//               <Percent className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//               {discountPercent}% OFF
//             </div>
//           )}
//         </div>

//         {/* Right - Product Details */}
//         <div className="flex-1 p-2 sm:p-3 md:p-4 flex flex-col justify-center min-w-0">
//           {/* Product Name */}
//           <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
//             {product.productName}
//           </h3>
          
//           {/* Rating - Optional */}
//           {product.rating > 0 && (
//             <div className="flex items-center gap-1 mt-0.5">
//               <div className="flex items-center gap-0.5">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
//                       i < Math.round(product.rating)
//                         ? 'fill-yellow-400 text-yellow-400'
//                         : 'text-gray-300'
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-[8px] sm:text-[10px] text-gray-500">({product.rating})</span>
//             </div>
//           )}
          
//           {/* Only Show Discount Percentage */}
//           {discountPercent > 0 && (
//             <div className="flex items-center gap-1 sm:gap-2 mt-1">
//               <span className="text-xs sm:text-sm font-bold text-red-600 bg-red-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
//                 {discountPercent}% OFF
//               </span>
//             </div>
//           )}
          
//           {/* Add to Cart Button - Simple */}
//           <button 
//             onClick={handleAddToCart}
//             className={`mt-1.5 sm:mt-2 w-full py-1 sm:py-1.5 rounded-lg text-[8px] sm:text-[10px] md:text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
//               cartStatusLoading 
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : isInCart
//                 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-700'
//                 : 'bg-gray-900 text-white hover:bg-gray-800'
//             }`}
//             disabled={cartStatusLoading}
//           >
//             {cartStatusLoading ? (
//               <>
//                 <Loader2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-spin" />
//                 <span>Adding...</span>
//               </>
//             ) : isInCart ? (
//               <>
//                 <ShoppingCart className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                 <span>View Cart</span>
//               </>
//             ) : (
//               <>
//                 <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                 <span>Add to Cart</span>
//               </>
//             )}
//           </button>

//           {/* Arrow indicator on hover */}
//           <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
//           </div>
//         </div>
//       </motion.div>
//     </Link>
//   );
// };

// // Main Offer Section - Grid Layout with Pagination
// export default function OfferSection() {
//   const [allProducts, setAllProducts] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [productsInCart, setProductsInCart] = useState({});
//   const itemsPerPage = 4;

//   // Check cart status for products
//   const checkCartStatus = async (productsList) => {
//     if (!productsList || productsList.length === 0) return;
    
//     const productIds = productsList.map(p => p._id);
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

//   // Update cart status
//   const updateCartStatus = useCallback(async () => {
//     if (allProducts.length === 0) return;
    
//     const productIds = allProducts.map(p => p._id);
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
//       console.error('Error refreshing cart status:', error);
//       const emptyCartStatus = {};
//       productIds.forEach(id => {
//         emptyCartStatus[id] = false;
//       });
//       setProductsInCart(emptyCartStatus);
//     }
//   }, [allProducts]);

//   // Fetch all discounted products
//   useEffect(() => {
//     const fetchSaleProducts = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           'http://localhost:5000/api/products?limit=100'
//         );
//         const data = await response.json();
        
//         if (data.success) {
//           const discountedProducts = data.data
//             .filter(p => p.discountPrice > 0 && p.discountPrice < p.regularPrice && p.isActive !== false)
//             .sort((a, b) => {
//               const discountA = calculateDiscountPercentage(a.regularPrice, a.discountPrice);
//               const discountB = calculateDiscountPercentage(b.regularPrice, b.discountPrice);
//               return discountB - discountA;
//             });
          
//           setAllProducts(discountedProducts);
//           setProducts(discountedProducts.slice(0, itemsPerPage));
//           await checkCartStatus(discountedProducts);
//         }
//       } catch (error) {
//         console.error('Error fetching sale products:', error);
//         setAllProducts([]);
//         setProducts([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchSaleProducts();
//   }, []);

//   // Listen for cart updates
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       updateCartStatus();
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, [updateCartStatus]);

//   // Navigate to next page
//   const handleNext = () => {
//     const nextStart = (currentPage + 1) * itemsPerPage;
//     if (nextStart < allProducts.length) {
//       setCurrentPage(currentPage + 1);
//       setProducts(allProducts.slice(nextStart, nextStart + itemsPerPage));
//     }
//   };

//   // Navigate to previous page
//   const handlePrev = () => {
//     if (currentPage > 0) {
//       const prevStart = (currentPage - 1) * itemsPerPage;
//       setCurrentPage(currentPage - 1);
//       setProducts(allProducts.slice(prevStart, prevStart + itemsPerPage));
//     }
//   };

//   // Navigate to specific page
//   const goToPage = (pageIndex) => {
//     setCurrentPage(pageIndex);
//     setProducts(allProducts.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage));
//   };

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

//   const hasNext = (currentPage + 1) * itemsPerPage < allProducts.length;
//   const hasPrev = currentPage > 0;
//   const totalPages = Math.ceil(allProducts.length / itemsPerPage);

//   // Get page range - shows 3 pages shifting by 1
//   const getPageRange = () => {
//     const total = totalPages;
//     const current = currentPage;
    
//     if (total <= 3) {
//       return Array.from({ length: total }, (_, i) => i);
//     }
    
//     let start, end;
    
//     if (current <= 1) {
//       start = 0;
//       end = 2;
//     } else if (current >= total - 2) {
//       start = total - 3;
//       end = total - 1;
//     } else {
//       start = current - 1;
//       end = current + 1;
//     }
    
//     const pages = [];
//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }
//     return pages;
//   };

//   if (isLoading) {
//     return (
//       <section className="py-8 md:py-12 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="animate-pulse">
//             <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
//             <div className="h-4 w-64 bg-gray-100 rounded mb-6"></div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className="bg-white rounded-xl h-24 w-full"></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (allProducts.length === 0) {
//     return null;
//   }

//   return (
//     <>
//       <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 overflow-hidden relative">
//         {/* Background Decorations */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-200/20 rounded-full blur-3xl"></div>
//           <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl"></div>
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl"></div>
//         </div>

//         <div className="container mx-auto px-4 max-w-7xl relative z-10">
//           {/* Section Header with Animation */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mb-6 md:mb-10"
//           >
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 mb-2 sm:mb-3">
//                   <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//                   <span className="text-[10px] sm:text-xs font-bold text-white tracking-wider uppercase">Power Deals</span>
//                   <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-yellow-300" />
//                 </div>
//                 <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
//                     Limited Time
//                   </span>
//                   {' '}Offers
//                 </h2>
//                 <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">
//                   Grab the best discounts on premium power products before they're gone!
//                 </p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Products Grid with Navigation Arrows */}
//           <div className="relative">
//             {/* Left Arrow - Desktop only */}
//             {hasPrev && (
//               <button
//                 onClick={handlePrev}
//                 className="hidden lg:flex absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
//               >
//                 <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
//               </button>
//             )}

//             {/* Products Grid with Animations */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
//               <AnimatePresence mode="wait">
//                 {products.map((product, index) => (
//                   <motion.div
//                     key={product._id}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.3, delay: index * 0.05 }}
//                     className="h-full"
//                   >
//                     <SmallProductCard 
//                       product={product}
//                       isInCart={productsInCart[product._id] || false}
//                       onCartStatusChange={onCartStatusChange}
//                       onViewInCart={openCartSidebar}
//                     />
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>

//             {/* Right Arrow - Desktop only */}
//             {hasNext && (
//               <button
//                 onClick={handleNext}
//                 className="hidden lg:flex absolute -right-6 md:-right-8 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
//               >
//                 <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
//               </button>
//             )}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 md:mt-8">
//               {/* Previous Button */}
//               <button
//                 onClick={handlePrev}
//                 disabled={!hasPrev}
//                 className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border transition-all ${
//                   hasPrev
//                     ? 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-md'
//                     : 'border-gray-200 text-gray-300 cursor-not-allowed'
//                 }`}
//               >
//                 <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//               </button>

//               {/* Page Numbers */}
//               <div className="flex items-center gap-1 sm:gap-1.5">
//                 {getPageRange().map((page) => (
//                   <button
//                     key={page}
//                     onClick={() => goToPage(page)}
//                     className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-medium transition-all ${
//                       currentPage === page
//                         ? 'bg-blue-600 text-white shadow-md'
//                         : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
//                     }`}
//                   >
//                     {page + 1}
//                   </button>
//                 ))}
//               </div>

//               {/* Next Button */}
//               <button
//                 onClick={handleNext}
//                 disabled={!hasNext}
//                 className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border transition-all ${
//                   hasNext
//                     ? 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-md'
//                     : 'border-gray-200 text-gray-300 cursor-not-allowed'
//                 }`}
//               >
//                 <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//               </button>
//             </div>
//           )}

        
//         </div>
//       </section>

//       {/* Cart Sidebar */}
//       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
//     </>
//   );
// }


// components/home/OfferSection.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Percent,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Loader2,
  ShoppingCart,
  Zap,
  Flame,
  Sparkles,
  Star,
  Clock,
  Gift
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../CartSidebar';

// Font constants
const FONT_FAMILY = "'Playfair Display', 'Georgia', serif";
const FONT_FAMILY_CURSIVE = "'Courgette', cursive";

// Helper functions
const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

// Format price
const formatPrice = (price) => {
  return price?.toFixed(2) || '0.00';
};

// Product Card Component - Grid Layout with Discount Badge
const OfferProductCard = ({ 
  product, 
  isInCart: propIsInCart, 
  onCartStatusChange, 
  onViewInCart,
  index 
}) => {
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);
  const [isHovered, setIsHovered] = useState(false);
  const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
  const productImage = product.images?.[0]?.url || product.images?.[0] || 'https://via.placeholder.com/400?text=Product';

  useEffect(() => {
    setIsInCart(propIsInCart || false);
  }, [propIsInCart]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInCart) {
      onViewInCart();
      return;
    }
    
    if (product.stockQuantity <= 0) {
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
        headers: headers,
        body: JSON.stringify({ productId: product._id, quantity: 1 })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        toast.success('Added to cart!', { id: toastId });
        setIsInCart(true);
        if (onCartStatusChange) {
          onCartStatusChange(product._id, true);
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

  // Get grid class based on index
  const getGridClass = (index) => {
    switch (index % 6) {
      case 0:
        return 'min-h-[160px] sm:min-h-[180px] md:min-h-[200px] lg:col-span-2 lg:row-span-1 lg:min-h-[220px]';
      case 1:
        return 'min-h-[140px] sm:min-h-[155px] md:min-h-[170px] lg:col-span-1 lg:row-span-1 lg:min-h-[180px]';
      case 2:
        return 'min-h-[140px] sm:min-h-[155px] md:min-h-[170px] lg:col-span-1 lg:row-span-1 lg:min-h-[180px]';
      case 3:
        return 'min-h-[150px] sm:min-h-[165px] md:min-h-[180px] lg:col-span-2 lg:row-span-1 lg:min-h-[220px]';
      case 4:
        return 'min-h-[150px] sm:min-h-[165px] md:min-h-[180px] lg:col-span-1 lg:row-span-1 lg:min-h-[180px]';
      case 5:
        return 'min-h-[150px] sm:min-h-[165px] md:min-h-[180px] lg:col-span-1 lg:row-span-1 lg:min-h-[180px]';
      default:
        return 'min-h-[150px] sm:min-h-[180px] md:min-h-[200px]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      className={`group relative overflow-hidden rounded-[6px] sm:rounded-[8px] bg-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 ${getGridClass(index)}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug || product._id}`} className="block h-full">
        {/* Product Image */}
        <img
          src={productImage}
          alt={product.productName}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400?text=Product';
          }}
          loading="lazy"
        />

        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Discount Badge - Top Left */}
        <div className="absolute top-1.5 left-1.5 z-10 sm:top-2 sm:left-2 md:top-3 md:left-3">
          <div className="bg-gradient-to-r from-[#EE4275] to-[#9B59B6] text-white px-1.5 py-0.5 rounded-full text-[6px] sm:text-[7px] md:text-[9px] font-bold shadow-lg flex items-center gap-0.5">
            <Percent className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5" />
            <span className="hidden xs:inline">{discountPercent}% OFF</span>
            <span className="xs:hidden">{discountPercent}%</span>
          </div>
        </div>

        {/* Product Info - Bottom Left */}
        <div className="absolute bottom-1.5 left-1.5 right-12 z-10 sm:bottom-2 sm:left-2 sm:right-14 md:bottom-3 md:left-3 md:right-20">
          {/* Product Name */}
          <h3 className="text-[8px] sm:text-[9px] md:text-[11px] lg:text-[12px] font-semibold text-white line-clamp-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" style={{ fontFamily: FONT_FAMILY }}>
            {product.productName}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[9px] sm:text-[10px] md:text-sm font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              ৳{formatPrice(product.discountPrice || product.regularPrice)}
            </span>
            {product.discountPrice > 0 && (
              <span className="text-[5px] sm:text-[6px] md:text-[8px] text-white/60 line-through drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                ৳{formatPrice(product.regularPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button - Desktop */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-1.5 right-1.5 z-20 bg-white/95 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          } hidden sm:flex items-center justify-center hover:bg-[#EE4275] hover:text-white border border-white/30 p-1 sm:p-1.5 md:p-1.5`}
          disabled={cartStatusLoading}
        >
          {cartStatusLoading ? (
            <Loader2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 animate-spin" />
          ) : isInCart ? (
            <ShoppingCart className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-[#EE4275] hover:text-white" />
          ) : (
            <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
          )}
        </button>

        {/* Mobile Add to Cart Button - Always visible */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-1.5 right-1.5 z-20 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex sm:hidden items-center justify-center border border-white/20 p-1"
          disabled={cartStatusLoading}
        >
          {cartStatusLoading ? (
            <Loader2 className="w-2 h-2 animate-spin" />
          ) : isInCart ? (
            <ShoppingCart className="w-2 h-2 text-[#EE4275]" />
          ) : (
            <ShoppingBag className="w-2 h-2" />
          )}
        </button>
      </Link>
    </motion.div>
  );
};

// Main Offer Section
export default function OfferSection() {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  
  const ITEMS_PER_PAGE = 6;

  // Check mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get current page products
  const getCurrentProducts = () => {
    if (allProducts.length === 0) return [];
    
    const start = currentPage * ITEMS_PER_PAGE;
    const end = Math.min(start + ITEMS_PER_PAGE, allProducts.length);
    return allProducts.slice(start, end);
  };

  // Calculate total pages
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

  // Check cart status for products
  const checkCartStatus = async (productsList) => {
    if (!productsList || productsList.length === 0) return;
    
    const productIds = productsList.map(p => p._id);
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

  // Update cart status
  const updateCartStatus = useCallback(async () => {
    if (allProducts.length === 0) return;
    
    const productIds = allProducts.map(p => p._id);
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
      console.error('Error refreshing cart status:', error);
      const emptyCartStatus = {};
      productIds.forEach(id => {
        emptyCartStatus[id] = false;
      });
      setProductsInCart(emptyCartStatus);
    }
  }, [allProducts]);

  // Fetch all discounted products sorted by highest discount
  useEffect(() => {
    const fetchSaleProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'http://localhost:5000/api/products?limit=100&populateTags=true'
        );
        const data = await response.json();
        
        if (data.success) {
          const discountedProducts = data.data
            .filter(p => p.discountPrice > 0 && p.discountPrice < p.regularPrice && p.isActive !== false)
            .map(p => ({
              ...p,
              discountPercent: calculateDiscountPercentage(p.regularPrice, p.discountPrice)
            }))
            .sort((a, b) => b.discountPercent - a.discountPercent);
          
          setAllProducts(discountedProducts);
          await checkCartStatus(discountedProducts);
        }
      } catch (error) {
        console.error('Error fetching sale products:', error);
        setAllProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSaleProducts();
  }, []);

  // Listen for cart updates
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

  // Navigation handlers
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const currentProducts = getCurrentProducts();
  const hasPrev = currentPage > 0;
  const hasNext = currentPage < totalPages - 1;

  if (isLoading) {
    return (
      <section className="py-4 sm:py-6 md:py-8 bg-gradient-to-br from-pink-50/50 via-rose-50/50 to-purple-50/50">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <div className="animate-pulse">
            <div className="flex items-start justify-between">
              <div>
                <div className="h-6 sm:h-8 w-32 sm:w-48 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 sm:h-4 w-40 sm:w-64 bg-gray-100 rounded"></div>
              </div>
              <div className="h-6 sm:h-8 w-20 sm:w-28 bg-gray-200 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-[6px] sm:rounded-[8px] h-[140px] sm:h-[160px] md:h-[200px] w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (allProducts.length === 0) {
    return null;
  }

  return (
    <>
      <section className="w-full px-3 sm:px-4 py-4 sm:py-6 md:py-8 md:px-6 lg:px-10 bg-gradient-to-br from-pink-50/50 via-rose-50/50 to-purple-50/50">
        {/* Section Header - Mobile Optimized with controls on right */}
        <div className="mx-auto max-w-[1500px] mb-3 sm:mb-4 md:mb-6">
          <div className="flex items-start justify-between gap-2">
            {/* Left - Title Section */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#EE4275] to-[#9B59B6] rounded-full px-2 sm:px-3 py-0.5 sm:py-1 mb-1 sm:mb-1.5">
                <Gift className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-white" />
                <span className="text-[7px] sm:text-[9px] md:text-[10px] font-bold text-white tracking-wider uppercase whitespace-nowrap"  style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
                  Special Offers
                </span>
                <Sparkles className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 text-yellow-200" />
              </div>
              <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 truncate" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EE4275] to-[#9B59B6]">
                  Best Deals
                </span>
                <span className=" xs:inline"> of the Week</span>
              </h2>
              <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm mt-0.5  sm:block truncate" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
                Grab the best discounts on premium beauty products
              </p>
            </div>

            {/* Right - Navigation Controls (Compact) */}
            <div className="flex items-center gap-1 sm:gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-2 sm:px-2.5 py-1 sm:py-1.5 shadow-sm flex-shrink-0 ml-2">
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                disabled={!hasPrev}
                className={`p-0.5 sm:p-1 rounded-full transition-colors duration-200 ${
                  hasPrev ? 'hover:bg-[#EE4275]/10 cursor-pointer' : 'opacity-40 cursor-not-allowed'
                }`}
                aria-label="Previous"
              >
                <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#EE4275]" />
              </button>
              
              <div className="flex items-center gap-1 px-1">
                <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#EE4275]" />
                <span className="text-[7px] sm:text-[9px] font-medium text-[#EE4275] whitespace-nowrap" style={{ fontFamily: FONT_FAMILY }}>
                  <span className="hidden xs:inline">More deals</span>
                  <span className="xs:hidden">More Deals</span>
                </span>
              </div>
              
              {/* Right Arrow */}
              <button
                onClick={handleNext}
                disabled={!hasNext}
                className={`p-0.5 sm:p-1 rounded-full transition-colors duration-200 ${
                  hasNext ? 'hover:bg-[#EE4275]/10 cursor-pointer' : 'opacity-40 cursor-not-allowed'
                }`}
                aria-label="Next"
              >
                <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#EE4275]" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid - Mobile Optimized */}
        <div className="mx-auto max-w-[1500px]">
          {currentProducts.length > 0 ? (
            <div className={`grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-2 lg:grid-cols-4 ${
              currentProducts.length >= 5 ? 'lg:grid-rows-2' : 'lg:auto-rows-fr'
            }`}>
              {currentProducts.map((product, index) => (
                <OfferProductCard
                  key={`${product._id}-${currentPage}-${index}`}
                  product={product}
                  index={index}
                  isInCart={productsInCart[product._id] || false}
                  onCartStatusChange={onCartStatusChange}
                  onViewInCart={openCartSidebar}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12 bg-white/50 rounded-lg">
              <p className="text-gray-500 text-sm sm:text-base" style={{ fontFamily: FONT_FAMILY }}>
                No deals available at the moment
              </p>
            </div>
          )}
        </div>

        {/* Page Indicator - Mobile Optimized */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1 sm:gap-1.5 mt-3 sm:mt-4">
            {Array.from({ length: Math.min(totalPages, 6) }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`h-1.5 sm:h-1.5 rounded-full transition-all duration-300 ${
                  currentPage === i 
                    ? 'w-3 sm:w-4 bg-gradient-to-r from-[#EE4275] to-[#9B59B6]' 
                    : 'w-1.5 sm:w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
    </>
  );
}