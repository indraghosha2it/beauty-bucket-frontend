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
//   Zap
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

// // Small Product Card for Right Side - Responsive (Horizontal Layout)
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
// <Link href={`/product?id=${product.slug || product._id}`} className="block w-full">      <div className="group bg-[#E2E7EA] rounded-xl overflow-hidden border border-[#DCE7EC] hover:border-[#06B6D4] transition-all duration-300 cursor-pointer flex items-center p-2 md:p-3 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#06B6D4]/10">
//         {/* Left - Product Image - Responsive */}
//         <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-32 flex-shrink-0 bg-[#004767]/5 rounded-lg overflow-hidden">
//           <img
//             src={productImage}
//             alt={product.productName}
//             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = 'https://via.placeholder.com/300?text=Product';
//             }}
//             loading="lazy"
//           />
          
//           {/* Discount Badge - Responsive */}
//           {discountPercent > 0 && (
//             <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white text-[6px] sm:text-[7px] md:text-[9px] font-bold px-1 sm:px-1.5 py-0.5 rounded-full shadow-lg flex items-center gap-0.5">
//               <Percent className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5" />
//               {discountPercent}%
//             </div>
//           )}
//         </div>

//         {/* Right - Product Details - Responsive */}
//         <div className="flex-1 min-w-0 pl-2 md:pl-4">
//           <p className="text-[7px] sm:text-[8px] md:text-[10px] font-medium text-[#06B6D4] uppercase tracking-wider mb-0.5 truncate">
//             {product.brand || 'HyperVolt'}
//           </p>
//           <h3 className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-[#0F172A] line-clamp-1 sm:line-clamp-2 group-hover:text-[#06B6D4] transition-colors">
//             {product.productName}
//           </h3>
          
//           {/* Short Description - Hidden on very small screens */}
//           {shortDescription && (
//             <p className="text-[6px] sm:text-[7px] md:text-[9px] text-[#64748B] line-clamp-1 sm:line-clamp-2 mt-0.5 hidden xs:block">
//               {shortDescription}...
//             </p>
//           )}
          
//           <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1 flex-wrap">
//             {product.discountPrice > 0 && product.discountPrice < product.regularPrice ? (
//               <>
//                 <span className="text-[9px] sm:text-[10px] md:text-sm font-bold text-[#06B6D4]">
//                   ৳{product.discountPrice}
//                 </span>
//                 <span className="text-[6px] sm:text-[7px] md:text-[10px] text-[#64748B] line-through">
//                   ৳{product.regularPrice}
//                 </span>
//               </>
//             ) : (
//               <span className="text-[9px] sm:text-[10px] md:text-sm font-bold text-[#0F172A]">
//                 ৳{product.regularPrice}
//               </span>
//             )}
//           </div>

//           {/* Add to Cart Button - Responsive */}
//           <button 
//             onClick={handleAddToCart}
//             className={`mt-1 sm:mt-1.5 w-full py-0.5 sm:py-1 md:py-1.5 rounded-lg text-[7px] sm:text-[8px] md:text-[10px] font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
//               cartStatusLoading 
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : isInCart
//                 ? 'bg-[#004767] text-white hover:bg-[#00364F]'
//                 : 'bg-[#06B6D4] text-white hover:bg-[#0891B2]'
//             }`}
//             disabled={cartStatusLoading}
//           >
//             {cartStatusLoading ? (
//               <>
//                 <Loader2 className="w-2 h-2 sm:w-2.5 sm:h-2.5 animate-spin" />
//                 <span className="hidden xs:inline">Adding...</span>
//               </>
//             ) : isInCart ? (
//               <>
//                 <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//                 <span className="hidden xs:inline">View Cart</span>
//                 <span className="xs:hidden">Cart</span>
//               </>
//             ) : (
//               <>
//                 <ShoppingBag className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//                 <span className="hidden xs:inline">Add to Cart</span>
//                 <span className="xs:hidden">Add</span>
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </Link>
//   );
// };

// // Main Offer Section - 30%/70% Layout
// export default function OfferSection() {
//   const [allProducts, setAllProducts] = useState([]);
//   const [displayProducts, setDisplayProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [productsInCart, setProductsInCart] = useState({});
//   const itemsPerPage = 6;

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
//           setDisplayProducts(discountedProducts.slice(0, itemsPerPage));
//           await checkCartStatus(discountedProducts);
//         }
//       } catch (error) {
//         console.error('Error fetching sale products:', error);
//         setAllProducts([]);
//         setDisplayProducts([]);
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

//   const handleNext = () => {
//     const nextStart = (currentPage + 1) * itemsPerPage;
//     if (nextStart < allProducts.length) {
//       setCurrentPage(currentPage + 1);
//       setDisplayProducts(allProducts.slice(nextStart, nextStart + itemsPerPage));
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 0) {
//       const prevStart = (currentPage - 1) * itemsPerPage;
//       setCurrentPage(currentPage - 1);
//       setDisplayProducts(allProducts.slice(prevStart, prevStart + itemsPerPage));
//     }
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

//   // Get product for left image (highest discount)
//   const featuredProduct = allProducts[0];
//   const featuredImage = featuredProduct?.images?.[0]?.url || featuredProduct?.images?.[0] || 'https://via.placeholder.com/400?text=Sale';
//   const featuredDiscount = featuredProduct ? calculateDiscountPercentage(featuredProduct.regularPrice, featuredProduct.discountPrice) : 0;

//   if (isLoading) {
//     return (
//       <section className="py-8 md:py-16 bg-white">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="text-center mb-6 md:mb-8">
//             <div className="h-6 w-32 bg-[#004767]/10 rounded animate-pulse mx-auto"></div>
//             <div className="h-8 w-56 bg-[#004767]/15 rounded animate-pulse mx-auto mt-3"></div>
//           </div>
//           <div className="flex flex-col gap-4 md:grid md:grid-cols-10 md:gap-6">
//             <div className="md:col-span-3">
//               <div className="h-48 sm:h-60 md:h-[450px] bg-[#E2E7EA] rounded-2xl animate-pulse"></div>
//             </div>
//             <div className="md:col-span-7">
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
//                 {[...Array(6)].map((_, i) => (
//                   <div key={i} className="h-20 md:h-24 bg-[#E2E7EA] rounded-xl animate-pulse"></div>
//                 ))}
//               </div>
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
//       <section className="py-2 md:py-2 lg:py-2 bg-white overflow-hidden relative">
//         <div className="container mx-auto px-4 max-w-7xl relative z-10">
//           {/* Section Header - Responsive */}
//           <div className="text-center mb-4 md:mb-4 lg:mb-6">
//             <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 bg-[#06B6D4]/10 rounded-full mb-1 md:mb-2">
//               <Zap className="w-3 h-3 md:w-4 md:h-4 text-[#06B6D4]" />
//               <span className="text-[10px] md:text-xs font-medium text-[#06B6D4] tracking-widest uppercase">Limited Time Offers</span>
//               <Zap className="w-3 h-3 md:w-4 md:h-4 text-[#06B6D4]" />
//             </div>
            
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#004767] tracking-tight leading-[1.1]" style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif", fontWeight: 700 }}>
//               Power Deals <span className="text-[#06B6D4]">Sale</span>
//             </h2>
            
//             <p className="text-[#64748B] mt-1 md:mt-2 text-xs sm:text-sm max-w-2xl mx-auto">
//               Grab the best discounts on premium power products
//             </p>
//           </div>

//           {/* 2 Column Layout - 30% / 70% - Responsive */}
//           <div className="flex flex-col md:grid md:grid-cols-10 gap-4 md:gap-5 lg:gap-6">
//             {/* Left Column - 30% (3/10) - Shown on top for mobile */}
//             <div className="w-full md:col-span-3">
//               <Link href={`/product?id=${featuredProduct?.slug || featuredProduct?._id}`} className="block h-full">
//                 <div className="relative h-48 sm:h-60 md:h-80 lg:h-[400px] rounded-2xl overflow-hidden group bg-[#004767]/5 border border-[#DCE7EC] hover:border-[#06B6D4] transition-all duration-300">
//                   <img
//                     src={featuredImage}
//                     alt="Featured Sale"
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1609091839311-d34b4f9d9c3a?w=400&h=400&fit=crop';
//                     }}
//                   />
                  
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#004767]/90 via-[#004767]/50 to-transparent flex flex-col items-center justify-end p-3 sm:p-4 md:p-6 text-center">
//                     <div className="bg-[#06B6D4]/20 backdrop-blur-sm px-2 md:px-3 py-0.5 md:py-1 rounded-full border border-[#06B6D4]/30 mb-1.5 md:mb-3">
//                       <span className="text-white text-[8px] sm:text-[10px] md:text-xs font-medium">Hot Deal</span>
//                     </div>
//                     <h3 className="text-white text-xs sm:text-sm md:text-lg font-bold">
//                       Flat <span className="text-[#06B6D4]">{featuredDiscount}% OFF</span>
//                     </h3>
//                     <p className="text-white/80 text-[8px] sm:text-[10px] md:text-sm mt-0.5 md:mt-1 line-clamp-1 sm:line-clamp-2">{featuredProduct?.productName || 'Selected items'}</p>
//                     <div className="mt-1.5 md:mt-3 bg-[#06B6D4] text-white px-2 sm:px-3 md:px-5 py-0.5 sm:py-1 md:py-1.5 rounded-full text-[8px] sm:text-[10px] md:text-sm font-medium hover:bg-[#0891B2] transition-colors">
//                       Shop Now
//                     </div>
//                   </div>

//                   {featuredDiscount > 0 && (
//                     <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white text-[8px] sm:text-[9px] md:text-xs font-bold px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 rounded-full shadow-lg">
//                       {featuredDiscount}% OFF
//                     </div>
//                   )}
//                 </div>
//               </Link>
//             </div>

//             {/* Right Column - 70% (7/10) */}
//          <div className="w-full md:col-span-7">
//   {/* Navigation Arrows - Top right on desktop, hidden on mobile (shown at bottom) */}
//   <div className="hidden md:flex items-center justify-end gap-1.5 md:gap-2 mb-3 lg:mb-4">
//     <button
//       onClick={handlePrev}
//       disabled={!hasPrev}
//       className={`p-1 md:p-1.5 rounded-full border transition-all ${
//         hasPrev
//           ? 'border-[#06B6D4]/30 text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white'
//           : 'border-gray-200 text-gray-300 cursor-not-allowed'
//       }`}
//     >
//       <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
//     </button>
//     <span className="text-[10px] md:text-xs text-[#64748B]">
//       {currentPage + 1} / {totalPages}
//     </span>
//     <button
//       onClick={handleNext}
//       disabled={!hasNext}
//       className={`p-1 md:p-1.5 rounded-full border transition-all ${
//         hasNext
//           ? 'border-[#06B6D4]/30 text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white'
//           : 'border-gray-200 text-gray-300 cursor-not-allowed'
//       }`}
//     >
//       <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
//     </button>
//   </div>

//   {/* Products Grid - 2 columns on mobile, 3 on desktop */}
//   <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 lg:gap-4">
//     {displayProducts.map((product) => (
//       <div key={product._id} className="w-full">
//         <SmallProductCard 
//           product={product}
//           isInCart={productsInCart[product._id] || false}
//           onCartStatusChange={onCartStatusChange}
//           onViewInCart={openCartSidebar}
//         />
//       </div>
//     ))}
//   </div>

//   {/* Navigation Arrows - Bottom center on mobile, hidden on desktop */}
//   <div className="flex md:hidden items-center justify-center gap-1.5 mt-3">
//     <button
//       onClick={handlePrev}
//       disabled={!hasPrev}
//       className={`p-1 rounded-full border transition-all ${
//         hasPrev
//           ? 'border-[#06B6D4]/30 text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white'
//           : 'border-gray-200 text-gray-300 cursor-not-allowed'
//       }`}
//     >
//       <ChevronLeft className="w-3.5 h-3.5" />
//     </button>
//     <span className="text-[10px] text-[#64748B]">
//       {currentPage + 1} / {totalPages}
//     </span>
//     <button
//       onClick={handleNext}
//       disabled={!hasNext}
//       className={`p-1 rounded-full border transition-all ${
//         hasNext
//           ? 'border-[#06B6D4]/30 text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white'
//           : 'border-gray-200 text-gray-300 cursor-not-allowed'
//       }`}
//     >
//       <ChevronRight className="w-3.5 h-3.5" />
//     </button>
//   </div>
// </div>
//           </div>

//           {/* View All Button - Responsive */}
//           {allProducts.length > itemsPerPage && (
//             <div className="text-center mt-6 md:mt-8">
//               <Link 
//                 href="/products?discount=true" 
//                 className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-1.5 md:py-2.5 border-2 border-[#06B6D4] text-[#06B6D4] rounded-lg hover:bg-[#06B6D4] hover:text-white transition-all duration-300 font-medium text-xs md:text-sm"
//               >
//                 View All Deals
//                 <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
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
  Star
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../CartSidebar';

// Helper functions
const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

// Small Product Card - Horizontal Layout with animations
const SmallProductCard = ({ 
  product, 
  isInCart: propIsInCart, 
  onCartStatusChange, 
  onViewInCart 
}) => {
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);
  const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
  const productImage = product.images?.[0]?.url || product.images?.[0] || 'https://via.placeholder.com/300?text=Product';

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

  // Strip HTML tags for short description
  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const shortDescription = product.shortDescription 
    ? stripHtml(product.shortDescription).substring(0, 50) 
    : '';

  return (
    <Link href={`/product/${product.slug || product._id}`} className="block h-full">
      <motion.div
        className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-row"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {/* Left - Product Image */}
        <div className="relative w-20 sm:w-24 md:w-28 flex-shrink-0 bg-gray-50 overflow-hidden">
          <div className="aspect-square w-full h-full">
            <img
              src={productImage}
              alt={product.productName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=Product';
              }}
              loading="lazy"
            />
          </div>
          
          {/* Discount Badge - Top Left */}
          {discountPercent > 0 && (
            <div className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1">
              <Percent className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
              {discountPercent}% OFF
            </div>
          )}
        </div>

        {/* Right - Product Details */}
        <div className="flex-1 p-2 sm:p-3 md:p-4 flex flex-col justify-center min-w-0">
          {/* Product Name */}
          <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.productName}
          </h3>
          
          {/* Rating - Optional */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 mt-0.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                      i < Math.round(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[8px] sm:text-[10px] text-gray-500">({product.rating})</span>
            </div>
          )}
          
          {/* Only Show Discount Percentage */}
          {discountPercent > 0 && (
            <div className="flex items-center gap-1 sm:gap-2 mt-1">
              <span className="text-xs sm:text-sm font-bold text-red-600 bg-red-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                {discountPercent}% OFF
              </span>
            </div>
          )}
          
          {/* Add to Cart Button - Simple */}
          <button 
            onClick={handleAddToCart}
            className={`mt-1.5 sm:mt-2 w-full py-1 sm:py-1.5 rounded-lg text-[8px] sm:text-[10px] md:text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
              cartStatusLoading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isInCart
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-700'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
            disabled={cartStatusLoading}
          >
            {cartStatusLoading ? (
              <>
                <Loader2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-spin" />
                <span>Adding...</span>
              </>
            ) : isInCart ? (
              <>
                <ShoppingCart className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>View Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* Arrow indicator on hover */}
          <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// Main Offer Section - Grid Layout with Pagination
export default function OfferSection() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const itemsPerPage = 4;

  // Check cart status for products
  const checkCartStatus = async (productsList) => {
    if (!productsList || productsList.length === 0) return;
    
    const productIds = productsList.map(p => p._id);
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

  // Update cart status
  const updateCartStatus = useCallback(async () => {
    if (allProducts.length === 0) return;
    
    const productIds = allProducts.map(p => p._id);
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
      console.error('Error refreshing cart status:', error);
      const emptyCartStatus = {};
      productIds.forEach(id => {
        emptyCartStatus[id] = false;
      });
      setProductsInCart(emptyCartStatus);
    }
  }, [allProducts]);

  // Fetch all discounted products
  useEffect(() => {
    const fetchSaleProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'http://localhost:5000/api/products?limit=100'
        );
        const data = await response.json();
        
        if (data.success) {
          const discountedProducts = data.data
            .filter(p => p.discountPrice > 0 && p.discountPrice < p.regularPrice && p.isActive !== false)
            .sort((a, b) => {
              const discountA = calculateDiscountPercentage(a.regularPrice, a.discountPrice);
              const discountB = calculateDiscountPercentage(b.regularPrice, b.discountPrice);
              return discountB - discountA;
            });
          
          setAllProducts(discountedProducts);
          setProducts(discountedProducts.slice(0, itemsPerPage));
          await checkCartStatus(discountedProducts);
        }
      } catch (error) {
        console.error('Error fetching sale products:', error);
        setAllProducts([]);
        setProducts([]);
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
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [updateCartStatus]);

  // Navigate to next page
  const handleNext = () => {
    const nextStart = (currentPage + 1) * itemsPerPage;
    if (nextStart < allProducts.length) {
      setCurrentPage(currentPage + 1);
      setProducts(allProducts.slice(nextStart, nextStart + itemsPerPage));
    }
  };

  // Navigate to previous page
  const handlePrev = () => {
    if (currentPage > 0) {
      const prevStart = (currentPage - 1) * itemsPerPage;
      setCurrentPage(currentPage - 1);
      setProducts(allProducts.slice(prevStart, prevStart + itemsPerPage));
    }
  };

  // Navigate to specific page
  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
    setProducts(allProducts.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage));
  };

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

  const hasNext = (currentPage + 1) * itemsPerPage < allProducts.length;
  const hasPrev = currentPage > 0;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  // Get page range - shows 3 pages shifting by 1
  const getPageRange = () => {
    const total = totalPages;
    const current = currentPage;
    
    if (total <= 3) {
      return Array.from({ length: total }, (_, i) => i);
    }
    
    let start, end;
    
    if (current <= 1) {
      start = 0;
      end = 2;
    } else if (current >= total - 2) {
      start = total - 3;
      end = total - 1;
    } else {
      start = current - 1;
      end = current + 1;
    }
    
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (isLoading) {
    return (
      <section className="py-8 md:py-12 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-64 bg-gray-100 rounded mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-24 w-full"></div>
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
      <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 overflow-hidden relative">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Section Header with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 mb-2 sm:mb-3">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  <span className="text-[10px] sm:text-xs font-bold text-white tracking-wider uppercase">Power Deals</span>
                  <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-yellow-300" />
                </div>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                    Limited Time
                  </span>
                  {' '}Offers
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">
                  Grab the best discounts on premium power products before they're gone!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Products Grid with Navigation Arrows */}
          <div className="relative">
            {/* Left Arrow - Desktop only */}
            {hasPrev && (
              <button
                onClick={handlePrev}
                className="hidden lg:flex absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </button>
            )}

            {/* Products Grid with Animations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              <AnimatePresence mode="wait">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="h-full"
                  >
                    <SmallProductCard 
                      product={product}
                      isInCart={productsInCart[product._id] || false}
                      onCartStatusChange={onCartStatusChange}
                      onViewInCart={openCartSidebar}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right Arrow - Desktop only */}
            {hasNext && (
              <button
                onClick={handleNext}
                className="hidden lg:flex absolute -right-6 md:-right-8 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </button>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 md:mt-8">
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                disabled={!hasPrev}
                className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border transition-all ${
                  hasPrev
                    ? 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-md'
                    : 'border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {getPageRange().map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={!hasNext}
                className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border transition-all ${
                  hasNext
                    ? 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-md'
                    : 'border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}

        
        </div>
      </section>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
    </>
  );
}