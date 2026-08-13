
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
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
//   ChevronRight
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

// // Product Card Component
// const ProductCard = ({ 
//   product, 
//   isInCart: propIsInCart, 
//   onCartStatusChange, 
//   onViewInCart 
// }) => {
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
  
//   const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
//   const productImages = product.images?.map(img => img.url || img) || [];
//   const mainImage = productImages[0] || 'https://via.placeholder.com/400?text=Product';
//   const thumbnails = productImages.slice(0, 4);
  
//   const productTags = product.tags || [];
//   const tagNames = productTags.map(tag => tag.name || tag);
//   const isInStock = product.stockQuantity > 0;
//   const stockColor = isInStock ? 'text-green-600' : 'text-red-500';

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

//   // Listen for cart update events to refresh cart status
//   useEffect(() => {
//     const handleCartUpdate = async () => {
//       // Re-check cart status for this product
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
//             onCartStatusChange(product._id, false);
//           }
//           return;
//         }
        
//         const response = await fetch('http://localhost:5000/api/cart/check-status', {
//           method: 'POST',
//           headers: { ...headers, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds: [product._id] })
//         });
        
//         const data = await response.json();
//         if (data.success) {
//           const inCart = data.data[product._id] || false;
//           setIsInCart(inCart);
//           if (onCartStatusChange) {
//             onCartStatusChange(product._id, inCart);
//           }
//         }
//       } catch (error) {
//         console.error('Error checking cart status:', error);
//       }
//     };

//     // Listen for cart-update events
//     window.addEventListener('cart-update', handleCartUpdate);
    
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, [product._id, onCartStatusChange]);

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

//   const handleThumbnailHover = (index) => {
//     setCurrentImageIndex(index);
//   };

//   const handleThumbnailLeave = () => {
//     setCurrentImageIndex(0);
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

//   const getTagColor = (tagName) => {
//     const colors = {
//       'Best Seller': 'bg-yellow-500',
//       'Trending': 'bg-purple-500',
//       'New Release': 'bg-green-500',
//       'Limited Offer': 'bg-orange-500',
//       'Flash Sale': 'bg-red-500',
//       'Clearance': 'bg-pink-500'
//     };
//     return colors[tagName] || 'bg-[#06B6D4]';
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
// <Link href={`/product?id=${product.slug || product._id}`} className="block">        <div className="bg-[#E2E7EA] rounded-xl overflow-hidden border border-[#DCE7EC] hover:border-[#06B6D4] transition-all duration-300 hover:shadow-xl hover:shadow-[#06B6D4]/10 h-full flex flex-col">
//           <div className="relative bg-[#004767]/5 p-1.5 md:p-2">
//             <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-white/50">
//               <img
//                 src={productImages[currentImageIndex] || mainImage}
//                 alt={product.productName}
//                 className="w-full h-full object-contain transition-all duration-300"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = 'https://via.placeholder.com/400?text=Product';
//                 }}
//               />
              
//               {!isMobile ? (
//                 <div className={`absolute inset-0 bg-[#004767]/50 flex items-center justify-center gap-3 md:gap-4 transition-opacity duration-300 ${
//                   isHovered ? 'opacity-100' : 'opacity-0'
//                 }`}>
//                   <div className="bg-white rounded-full p-2 sm:p-2.5 md:p-2.5 shadow-lg hover:bg-[#06B6D4] hover:text-white transition-all duration-300 transform hover:scale-110 cursor-pointer">
//                     <Eye className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-[#004767] hover:text-white transition-colors" />
//                   </div>
//                   <div 
//                     onClick={handleAddToCart}
//                     className={`bg-white rounded-full p-2 sm:p-2.5 md:p-2.5 shadow-lg hover:bg-[#06B6D4] hover:text-white transition-all duration-300 transform hover:scale-110 cursor-pointer ${
//                       cartStatusLoading ? 'opacity-50 pointer-events-none' : ''
//                     }`}
//                   >
//                     {cartStatusLoading ? (
//                       <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-[#004767] animate-spin" />
//                     ) : isInCart ? (
//                       <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-[#06B6D4] hover:text-white transition-colors" />
//                     ) : (
//                       <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-[#004767] hover:text-white transition-colors" />
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-1.5 py-1">
//                   <div className="bg-white/90 rounded-full p-1 shadow-lg">
//                     <Eye className="w-3 h-3 text-[#004767]" />
//                   </div>
//                   <div 
//                     onClick={handleAddToCart}
//                     className={`bg-white/90 rounded-full p-1 shadow-lg ${
//                       cartStatusLoading ? 'opacity-50 pointer-events-none' : ''
//                     }`}
//                   >
//                     {cartStatusLoading ? (
//                       <Loader2 className="w-3 h-3 text-[#004767] animate-spin" />
//                     ) : isInCart ? (
//                       <ShoppingCart className="w-3 h-3 text-[#06B6D4]" />
//                     ) : (
//                       <ShoppingBag className="w-3 h-3 text-[#004767]" />
//                     )}
//                   </div>
//                 </div>
//               )}
              
//               {discountPercent > 0 && (
//                 <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white text-[7px] sm:text-[9px] md:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-1">
//                   <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
//                   <span>{discountPercent}% OFF</span>
//                 </div>
//               )}
//             </div>

//             {thumbnails.length > 1 && (
//               <div className="flex justify-center gap-1 sm:gap-1.5 mt-1 sm:mt-1.5">
//                 {thumbnails.map((img, idx) => (
//                   <div
//                     key={idx}
//                     onMouseEnter={() => handleThumbnailHover(idx)}
//                     onMouseLeave={handleThumbnailLeave}
//                     className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
//                       currentImageIndex === idx 
//                         ? 'border-[#06B6D4] shadow-md shadow-[#06B6D4]/20' 
//                         : 'border-[#DCE7EC] hover:border-[#06B6D4]/50'
//                     }`}
//                   >
//                     <img
//                       src={img}
//                       alt={`${product.productName} view ${idx + 1}`}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = 'https://via.placeholder.com/50?text=Img';
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="p-1.5 sm:p-2 md:p-2.5 flex-1 flex flex-col">
//             {product.brand && (
//               <p className="text-[7px] sm:text-[8px] md:text-[9px] font-medium text-[#06B6D4] uppercase tracking-wider mb-0.5">
//                 {product.brand}
//               </p>
//             )}
            
//             <h3 className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold text-[#0F172A] line-clamp-1 group-hover:text-[#06B6D4] transition-colors">
//               {product.productName}
//             </h3>
            
//             {shortDescription && (
//               <p className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] text-[#64748B] line-clamp-1 mt-0.5 hidden xs:block">
//                 {shortDescription}
//               </p>
//             )}
            
//             <div className="flex items-center justify-between mt-0.5 sm:mt-1">
//               <div className="flex items-center gap-1 sm:gap-2">
//                 {product.discountPrice > 0 && product.discountPrice < product.regularPrice ? (
//                   <>
//                     <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-[#06B6D4]">
//                       ৳{product.discountPrice}
//                     </span>
//                     <span className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[10px] text-[#64748B] line-through">
//                       ৳{product.regularPrice}
//                     </span>
//                   </>
//                 ) : (
//                   <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-[#0F172A]">
//                     ৳{product.regularPrice}
//                   </span>
//                 )}
//               </div>
              
//               <div className={`flex items-center gap-0.5 sm:gap-1 ${stockColor}`}>
//                 {isInStock ? (
//                   <CheckCircle className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
//                 ) : (
//                   <Clock className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
//                 )}
//                 <span className="text-[5px] sm:text-[6px] md:text-[7px] lg:text-[8px] font-medium">
//                   {isInStock ? 'In Stock' : 'Out of Stock'}
//                 </span>
//               </div>
//             </div>

//             <button 
//               onClick={handleAddToCart}
//               className={`mt-1 sm:mt-1.5 w-full py-1 sm:py-1.5 md:py-2 rounded-lg text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1.5 ${
//                 cartStatusLoading 
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : isInCart
//                   ? 'bg-[#004767] text-white hover:bg-[#00364F]'
//                   : 'bg-[#06B6D4] text-white hover:bg-[#0891B2] hover:shadow-lg hover:shadow-[#06B6D4]/30'
//               }`}
//               disabled={cartStatusLoading || product.stockQuantity <= 0}
//             >
//               {cartStatusLoading ? (
//                 <>
//                   <Loader2 className="w-2 h-2 sm:w-3 sm:h-3 animate-spin" />
//                   <span className="hidden xs:inline">Adding...</span>
//                   <span className="xs:hidden">...</span>
//                 </>
//               ) : isInCart ? (
//                 <>
//                   <ShoppingCart className="w-2 h-2 sm:w-3 sm:h-3" />
//                   <span className="hidden xs:inline">View in Cart</span>
//                   <span className="xs:hidden">View in Cart</span>
//                 </>
//               ) : (
//                 <>
//                   <ShoppingBag className="w-2 h-2 sm:w-3 sm:h-3" />
//                   <span className="hidden xs:inline">Add to Cart</span>
//                   <span className="xs:hidden">Add to Cart</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// };

// // Main Product Grid Section Component
// export default function ProductGridSection({ 
//   title, 
//   description, 
//   products = [], 
//   layout = 'grid',
//   itemsPerRow = 5,
//   showViewAll = true,
//   viewAllLink = '/products'
// }) {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = itemsPerRow * 2;

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

//   // Listen for cart update events to refresh all products
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

//   if (!products || products.length === 0) {
//     return null;
//   }

//   const gridCols = {
//     2: 'grid-cols-2',
//     3: 'grid-cols-2 md:grid-cols-3',
//     4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
//     5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
//   }[itemsPerRow] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';

//   return (
//     <>
//       <section className="py-6 sm:py-8 md:py-12 lg:py-6 bg-white overflow-hidden relative">
//         <div className="absolute inset-0 opacity-5 pointer-events-none">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-[#06B6D4] rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#004767] rounded-full blur-3xl"></div>
//         </div>

//         <div className="container mx-auto px-3 sm:px-4 max-w-7xl relative z-10">
//           <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
//             <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 bg-[#06B6D4]/10 rounded-full mb-1.5 sm:mb-2 md:mb-3">
//               <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#06B6D4]" />
//               <span className="text-[8px] sm:text-[9px] md:text-xs font-medium text-[#06B6D4] tracking-widest uppercase">
//                 {title || 'Products'}
//               </span>
//               <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#06B6D4]" />
//             </div>
            
//             <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#004767] tracking-tight leading-[1.1]" style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif", fontWeight: 700 }}>
//               {title || 'Our Products'}
//             </h2>
            
//             {description && (
//               <p className="text-[#64748B] mt-0.5 sm:mt-1 md:mt-2 text-[10px] sm:text-xs md:text-sm max-w-2xl mx-auto">
//                 {description}
//               </p>
//             )}
//           </div>

//           {products.length > itemsPerPage && (
//             <div className="flex items-center justify-end gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-6">
//               <button
//                 onClick={handlePrev}
//                 disabled={currentPage === 0}
//                 className={`p-1 sm:p-1.5 md:p-2 rounded-lg border transition-all ${
//                   currentPage > 0
//                     ? 'border-[#06B6D4]/30 text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white'
//                     : 'border-gray-200 text-gray-300 cursor-not-allowed'
//                 }`}
//               >
//                 <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
//               </button>
//               <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-[#64748B]">
//                 {currentPage + 1} / {totalPages}
//               </span>
//               <button
//                 onClick={handleNext}
//                 disabled={currentPage === totalPages - 1}
//                 className={`p-1 sm:p-1.5 md:p-2 rounded-lg border transition-all ${
//                   currentPage < totalPages - 1
//                     ? 'border-[#06B6D4]/30 text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white'
//                     : 'border-gray-200 text-gray-300 cursor-not-allowed'
//                 }`}
//               >
//                 <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
//               </button>
//             </div>
//           )}

//           <div className={`grid ${gridCols} gap-2 sm:gap-3 md:gap-4 lg:gap-5`}>
//             {currentProducts.map((product) => (
//               <ProductCard 
//                 key={product._id}
//                 product={product}
//                 isInCart={productsInCart[product._id] || false}
//                 onCartStatusChange={onCartStatusChange}
//                 onViewInCart={openCartSidebar}
//               />
//             ))}
//           </div>

//           {showViewAll && products.length > itemsPerPage && (
//             <div className="text-center mt-6 sm:mt-8 md:mt-10">
//               <Link 
//                 href={viewAllLink} 
//                 className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3 border-2 border-[#06B6D4] text-[#06B6D4] rounded-lg hover:bg-[#06B6D4] hover:text-white transition-all duration-300 font-medium text-[10px] sm:text-xs md:text-sm lg:text-base"
//               >
//                 View All
//                 <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
//               </Link>
//             </div>
//           )}
//         </div>
//       </section>

//       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
//     </>
//   );
// }


'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  Sparkles
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

const truncateText = (text, limit = 35) => {
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

// Product Card Component - Matching FeaturedProducts style
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
  
  // Safe data extraction
  const productId = product?._id || product?.id || 'unknown';
  const productName = product?.productName || product?.name || 'Product';
  const regularPrice = product?.regularPrice || product?.price || 0;
  const discountPrice = product?.discountPrice || 0;
  const stockQuantity = product?.stockQuantity || 0;
  const unit = product?.unit || 'pcs';
  
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
    productImages = ['https://via.placeholder.com/400?text=Product'];
  }
  
  // ✅ FIXED: Safe tags extraction - matches FeaturedProducts logic
  let tagNames = [];
  if (product?.tags && Array.isArray(product.tags)) {
    tagNames = product.tags.map(tag => {
      if (typeof tag === 'string') return tag;
      if (tag?.name) return tag.name;
      return null;
    }).filter(Boolean);
  }
  
  const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
  const hasMultipleImages = productImages.length > 1;
  const currentPrice = discountPrice && discountPrice < regularPrice ? discountPrice : regularPrice;
  const originalPrice = regularPrice;
  const primaryTag = tagNames[0] || null;
  
  const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
  const isOutOfStock = stockQuantity <= 0;

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
      <Link href={`/product/${product?.slug || productId}`} className="block">
        <div className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md h-full flex flex-col">
          {/* Product Image Section */}
          <div className="relative bg-gray-50 p-1.5">
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <img
                src={productImages[activeIndex] || productImages[0]}
                alt={productName}
                className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400?text=Product';
                }}
              />
              
              {/* Discount Badge */}
              {discountPercent > 0 && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 z-10 flex items-center gap-0.5">
                  <Zap className="w-2.5 h-2.5" />
                  {discountPercent}%
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
                <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-[9px] font-medium px-1.5 py-0.5 z-10 flex items-center gap-0.5">
                  <AlertTriangle className="w-2 h-2" />
                  Only {stockQuantity} left
                </div>
              )}
              
              {/* Desktop Hover Icons */}
              {!isMobile && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-7 h-7 bg-white shadow-md hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-200">
                    <Eye className="w-3.5 h-3.5 text-gray-700 hover:text-white transition-colors" />
                  </div>
                  <div 
                    onClick={handleAddToCart}
                    className={`w-7 h-7 bg-white shadow-md hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      cartStatusLoading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                  >
                    {cartStatusLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-700" />
                    ) : isInCart ? (
                      <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ShoppingCart className="w-3.5 h-3.5 text-gray-700 hover:text-white transition-colors" />
                    )}
                  </div>
                </div>
              )}
              
              {/* Mobile Icons */}
              {isMobile && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-30">
                  <div className="bg-white p-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5 text-gray-700" />
                  </div>
                  <div 
                    onClick={handleAddToCart}
                    className={`p-1.5 shadow-md ${isOutOfStock ? 'bg-gray-100' : 'bg-white'}`}
                  >
                    {cartStatusLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-500" />
                    ) : isInCart ? (
                      <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ShoppingCart className="w-3.5 h-3.5 text-black" />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {hasMultipleImages && !isMobile && (
              <div className="flex justify-center items-center gap-1 py-1.5 bg-gray-50 border-b border-gray-100">
                {productImages.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    className={`w-6 h-6 overflow-hidden transition-all duration-200 ${
                      activeIndex === index ? 'ring-1 ring-blue-500 ring-offset-1' : 'opacity-60 hover:opacity-100'
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setActiveIndex(index);
                    }}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-2.5 text-center flex-1 flex flex-col">
            {/* Product Name */}
            <h3 className="text-xs font-medium text-gray-900 truncate mb-1" title={productName}>
              {truncateText(productName, 35)}
            </h3>

            {/* Price */}
            <div className="flex items-baseline justify-center gap-1.5 mb-1.5">
              <span className="text-sm font-bold text-black">
                ৳{formatPrice(currentPrice)}
              </span>
              {discountPercent > 0 && (
                <span className="text-[9px] text-gray-400 line-through">
                  ৳{formatPrice(originalPrice)}
                </span>
              )}
              <span className="text-[9px] text-gray-500">/{getUnitLabel(unit)}</span>
            </div>

            {/* Stock Status */}
            <div className="mb-1.5 flex justify-center">
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-1 text-red-600 text-[9px] font-medium">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  Out of Stock
                </span>
              ) : isLowStock ? (
                <span className="inline-flex items-center gap-1 text-orange-600 text-[9px] font-medium">
                  <AlertTriangle className="w-2 h-2" />
                  Only {stockQuantity} left
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-green-600 text-[9px] font-medium">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  In Stock
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
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
        </div>
      </Link>
    </motion.div>
  );
};

// Main Product Grid Section Component
export default function ProductGridSection({ 
  title, 
  description, 
  products = [], 
  layout = 'grid',
  itemsPerRow = 5,
  showViewAll = true,
  viewAllLink = '/products'
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = itemsPerRow * 1;

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

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
  }[itemsPerRow] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';

  return (
    <>
      <section className="py-6 sm:py-8 md:py-12 lg:py-6 bg-white overflow-hidden relative">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl relative z-10">
         <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 bg-gray-100 rounded-full mb-1.5 sm:mb-2 md:mb-3">
    <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-orange-500" />
    <span className="text-[8px] sm:text-[9px] md:text-xs font-medium text-gray-600 tracking-widest uppercase">
      {title || 'Products'}
    </span>
    <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-orange-500" />
  </div>
  
  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black tracking-tight leading-[1.1]">
    {title || 'Our Products'}
  </h2>
  
  {description && (
    <p className="text-gray-500 mt-0.5 sm:mt-1 md:mt-2 text-[10px] sm:text-xs md:text-sm max-w-2xl mx-auto">
      {description}
    </p>
  )}
</div>

        

          {/* Products Grid */}
          <div className={`grid ${gridCols} gap-2 sm:gap-3 md:gap-4 lg:gap-5`}>
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
          </div>
         {/* Navigation Arrows - Centered */}
{products.length > itemsPerPage && (
  <div className="flex items-center justify-center mt-3 gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-6">
    <button
      onClick={handlePrev}
      disabled={currentPage === 0}
      className={`p-1 sm:p-1.5 md:p-2 rounded-lg border transition-all ${
        currentPage > 0
          ? 'border-gray-300 text-gray-700 hover:bg-black hover:text-white hover:border-black'
          : 'border-gray-200 text-gray-300 cursor-not-allowed'
      }`}
    >
      <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
    </button>
    <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-500">
      {currentPage + 1} / {totalPages}
    </span>
    <button
      onClick={handleNext}
      disabled={currentPage === totalPages - 1}
      className={`p-1 sm:p-1.5 md:p-2 rounded-lg border transition-all ${
        currentPage < totalPages - 1
          ? 'border-gray-300 text-gray-700 hover:bg-black hover:text-white hover:border-black'
          : 'border-gray-200 text-gray-300 cursor-not-allowed'
      }`}
    >
      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
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