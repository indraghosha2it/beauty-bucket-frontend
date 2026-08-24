// 'use client';

// import { useState, useEffect, Suspense, useRef } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { 
//   Search, 
//   Package, 
//   Loader2,
//   ChevronRight,
//   TrendingUp,
//   ArrowRight,
//   ShoppingBag,
//   FolderOpen,
//   Eye,
//   ShoppingCart,
//   ChevronUp,
//   Zap,
//   CheckCircle,
//   Clock,
//   Star,
//   ChevronLeft,
//   Building2,
//   AlertTriangle,
//   X,
//   Filter,
//   SlidersHorizontal
// } from 'lucide-react';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import { toast } from 'sonner';
// import CartSidebar from '../components/CartSidebar';

// // ========== LOADING BAR COMPONENT ==========
// const LoadingBar = ({ isVisible }) => {
//   return (
//     <div className={`fixed top-0 left-0 w-full h-0.5 bg-gray-200 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//       <div className="h-full bg-black animate-loading-bar"></div>
//     </div>
//   );
// };

// // ========== HELPER FUNCTIONS ==========
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

// const stripHtml = (html) => {
//   if (!html) return '';
//   if (typeof window !== 'undefined') {
//     const tmp = document.createElement('div');
//     tmp.innerHTML = html;
//     return tmp.textContent || tmp.innerText || '';
//   }
//   return html.replace(/<[^>]*>/g, '');
// };

// // ========== PRODUCT GRID CARD - MATCHES PRODUCTS PAGE ==========
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

// // ========== CATEGORY CARD ==========
// function CategoryCard({ category, index }) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4) }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       className="flex-shrink-0 w-56 sm:w-72 md:w-80 lg:w-96"
//     >
//       <Link href={`/products?category=${category._id}`}>
//         <motion.div 
//           className="cursor-pointer group/card flex h-32 sm:h-40 md:h-38 overflow-hidden rounded-xl border border-gray-200"
//           style={{
//             background: isHovered 
//               ? 'linear-gradient(135deg, #000000 0%, #333333 100%)'
//               : 'linear-gradient(135deg, #F8FAFB 0%, #EDF1F3 100%)',
//             boxShadow: isHovered 
//               ? '0 12px 40px rgba(0, 0, 0, 0.15)' 
//               : '0 2px 8px rgba(0,0,0,0.06)',
//             transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
//             transition: 'all 0.3s ease',
//           }}
//         >
//           {/* Left - Content (60%) */}
//           <div className="flex-1 p-3 sm:p-4 md:p-5 flex flex-col justify-between">
//             <div>
//               <h3 
//                 className="text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 line-clamp-2"
//                 style={{
//                   color: isHovered ? '#FFFFFF' : '#1A1A1A',
//                   fontWeight: 700 
//                 }}
//               >
//                 {category.name}
//               </h3>
//               <p 
//                 className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 line-clamp-3 transition-colors duration-300"
//                 style={{
//                   color: isHovered ? 'rgba(255,255,255,0.7)' : '#64748B',
//                 }}
//               >
//                 {category.description || 'Premium products for your needs'}
//               </p>
//             </div>
            
//             <div className="flex items-center gap-2 mt-2 sm:mt-3">
//               <span 
//                 className="text-[10px] sm:text-xs font-medium flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
//                 style={{
//                   color: isHovered ? '#FFFFFF' : '#2563EB',
//                 }}
//               >
//                 Browse
//                 <ArrowRight 
//                   className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-1" 
//                   style={{
//                     color: isHovered ? '#FFFFFF' : '#2563EB',
//                   }}
//                 />
//               </span>
//               <div 
//                 className="w-6 sm:w-8 h-0.5 rounded-full transition-all duration-300"
//                 style={{
//                   background: isHovered 
//                     ? 'linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0.1))'
//                     : 'linear-gradient(to right, #2563EB, rgba(37, 99, 235, 0.1))',
//                 }}
//               />
//             </div>
//           </div>

//           {/* Right - Image (40%) with padding */}
//           <div className="w-[40%] h-full flex-shrink-0 overflow-hidden relative p-1.5 sm:p-2">
//             <div className="w-full h-full overflow-hidden rounded-lg">
//               <img
//                 src={category.image}
//                 alt={category.name}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 loading="lazy"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = 'https://images.unsplash.com/photo-1609091839311-d34b4f9d9c3a?w=400&h=400&fit=crop';
//                 }}
//               />
//             </div>
            
//             {/* Subtle gradient overlay on image */}
//             <div 
//               className="absolute inset-0 pointer-events-none"
//               style={{
//                 background: isHovered 
//                   ? 'linear-gradient(to left, rgba(0, 0, 0, 0.15), transparent)'
//                   : 'linear-gradient(to left, rgba(0,0,0,0.05), transparent)',
//                 transition: 'all 0.3s ease',
//               }}
//             />
//           </div>
//         </motion.div>
//       </Link>
//     </motion.div>
//   );
// }

// // ========== ANIMATED ARROW ==========
// function AnimatedArrow({ show, direction, onClick, Icon }) {
//   if (!show) return null;

//   return (
//     <motion.button
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       onClick={onClick}
//       className={`absolute top-1/2 -translate-y-1/2 z-20 text-black hover:text-blue-600 transition-all duration-300 p-1 ${
//         direction === 'left' ? '-left-5' : '-right-5'
//       }`}
//       whileHover={{ scale: 1.2 }}
//       whileTap={{ scale: 0.9 }}
//     >
//       <Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9" strokeWidth={1.5} />
//     </motion.button>
//   );
// }

// // ========== SEARCH CONTENT ==========
// function SearchContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const query = searchParams.get('q') || '';
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchInput, setSearchInput] = useState(query);
//   const [displayCount, setDisplayCount] = useState(8);
//   const [showAll, setShowAll] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [forceFetch, setForceFetch] = useState(0);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(false);
//   const scrollContainerRef = useRef(null);
//   const searchTimeoutRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Initial search on page load
//   useEffect(() => {
//     if (query) {
//       performSearch(query);
//     } else {
//       setLoading(false);
//     }
//   }, [query]);

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
    
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }
    
//     if (!value.trim()) {
//       setResults([]);
//       setCategories([]);
//       router.push('/search');
//       return;
//     }
    
//     searchTimeoutRef.current = setTimeout(() => {
//       router.push(`/search?q=${encodeURIComponent(value)}`);
//       performSearch(value);
//     }, 500);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (searchInput.trim()) {
//       if (searchTimeoutRef.current) {
//         clearTimeout(searchTimeoutRef.current);
//       }
//       router.push(`/search?q=${encodeURIComponent(searchInput)}`);
//       performSearch(searchInput);
//     }
//   };

//   const performSearch = async (searchQuery) => {
//     if (!searchQuery || !searchQuery.trim()) {
//       setResults([]);
//       setCategories([]);
//       setLoading(false);
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(searchQuery)}&limit=50`);
//       const data = await response.json();
      
//       if (data.success) {
//         setResults(data.data);
//         await fetchRelatedCategories(searchQuery);
//       } else {
//         setResults([]);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchRelatedCategories = async (searchQuery) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/categories`);
//       const data = await response.json();
      
//       if (data.success) {
//         const matchedCategories = data.data
//           .filter(category => 
//             category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             category.description?.toLowerCase().includes(searchQuery.toLowerCase())
//           )
//           .map((cat, index) => ({
//             _id: cat._id,
//             name: cat.name,
//             description: cat.description || 'Premium products for your needs',
//             image: cat.image?.url || `https://images.unsplash.com/photo-1609091839311-d34b4f9d9c3a?w=400&h=400&fit=crop`,
//             slug: cat.slug,
//             productCount: cat.productCount || 0,
//           }));
        
//         setCategories(matchedCategories.slice(0, 8));
//         setTimeout(() => checkScroll(), 100);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setCategories([]);
//     }
//   };

//   const checkScroll = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftArrow(scrollLeft > 20);
//       setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
//     }
//   };

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const cardWidth = scrollContainerRef.current.children[0]?.offsetWidth || 200;
//       const gap = 16;
//       const scrollAmount = (cardWidth + gap) * 2;
      
//       const newScrollLeft = direction === 'left' 
//         ? scrollContainerRef.current.scrollLeft - scrollAmount
//         : scrollContainerRef.current.scrollLeft + scrollAmount;
      
//       scrollContainerRef.current.scrollTo({
//         left: newScrollLeft,
//         behavior: 'smooth'
//       });
//     }
//   };

//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (container) {
//       container.addEventListener('scroll', checkScroll);
//       checkScroll();
//       window.addEventListener('resize', checkScroll);
//       return () => {
//         container.removeEventListener('scroll', checkScroll);
//         window.removeEventListener('resize', checkScroll);
//       };
//     }
//   }, [categories]);

//   useEffect(() => {
//     return () => {
//       if (searchTimeoutRef.current) {
//         clearTimeout(searchTimeoutRef.current);
//       }
//     };
//   }, []);

//   const handleShowMore = () => {
//     setDisplayCount(prev => prev + 8);
//     setShowAll(true);
//   };

//   const handleShowLess = () => {
//     setDisplayCount(8);
//     setShowAll(false);
//     const productsSection = document.getElementById('products-section');
//     if (productsSection) {
//       productsSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   // Check cart status for products
//   useEffect(() => {
//     const checkAllProductsCartStatus = async () => {
//       if (results.length === 0) return;
//       const productIds = results.map(p => p._id);
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
//       } catch (error) {
//         console.error('Error checking cart status:', error);
//       }
//     };
//     checkAllProductsCartStatus();
//   }, [results, forceFetch]);

//   useEffect(() => {
//     const handleCartUpdate = async () => {
//       if (results.length === 0) return;
//       const productIds = results.map(p => p._id);
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
//       } catch (error) {
//         console.error('Error refreshing cart status:', error);
//       }
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, [results]);

//   const openCartSidebar = () => setIsCartOpen(true);
//   const closeCartSidebar = () => setIsCartOpen(false);

//   const displayedProducts = results.slice(0, displayCount);

//   return (
//     <>
//       <LoadingBar isVisible={loading} />
//       <Navbar />
      
//       {/* Hero Section - Black/White with Blue accent */}
//       <div className="bg-gray-50 border-b border-gray-200">
//         <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
//           <div className="flex flex-col items-center">
//             <div className="flex items-center justify-center gap-3">
//               <Search className="w-6 h-6 text-black" />
//               <h1 className="text-2xl md:text-4xl font-bold text-black text-center">Search Results</h1>
//               <Search className="w-6 h-6 text-black" />
//             </div>
//             <p className="text-gray-500 text-center text-sm mt-1">
//               {loading ? 'Searching...' : `Found ${results.length} ${results.length === 1 ? 'result' : 'results'} for`}
//             </p>
            
//             {/* Search Bar */}
//             <div className="w-full max-w-2xl mt-4 md:mt-5">
//               <form onSubmit={handleSearchSubmit}>
//                 <div className="relative flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden focus-within:border-black focus-within:ring-2 focus-within:ring-black/10 transition-all">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchInput}
//                     onChange={handleSearchChange}
//                     className="w-full pl-10 pr-24 py-2.5 text-sm border-0 focus:outline-none bg-transparent text-black placeholder:text-gray-400"
//                   />
//                   {searchInput && (
//                     <button 
//                       type="button"
//                       onClick={() => {
//                         setSearchInput('');
//                         setResults([]);
//                         setCategories([]);
//                         router.push('/search');
//                       }} 
//                       className="absolute right-12 p-1.5 text-gray-400 hover:text-black rounded-lg transition-colors"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   )}
//                   <button
//                     type="submit"
//                     className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors"
//                   >
//                     Search
//                   </button>
//                 </div>
//               </form>
              
//               {query && !loading && results.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm"
//                 >
//                   <span className="text-[10px] text-gray-500">Showing results for:</span>
//                   <span className="font-semibold text-black text-xs">"{query}"</span>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Results Section */}
//       <div className="py-8 md:py-12 bg-white">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Result Stats */}
//           {!loading && results.length > 0 && (
//             <div className="mb-4">
//               <div className="flex items-center gap-2">
//                 <TrendingUp className="w-4 h-4 text-gray-700" />
//                 <span className="text-sm text-gray-500">
//                   {results.length} {results.length === 1 ? 'result' : 'results'} found
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Loading State */}
//           {loading && (
//             <div className="flex flex-col items-center justify-center py-16 md:py-20">
//               <div className="relative">
//                 <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
//                 <div className="absolute top-0 left-0 w-16 h-16 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
//               </div>
//               <p className="mt-4 text-base text-gray-500 animate-pulse">Searching through our collection...</p>
//             </div>
//           )}

//           {/* No Results */}
//           {!loading && results.length === 0 && searchInput && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-16 bg-white border border-gray-200 rounded-xl"
//             >
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
//                 <Search className="w-10 h-10 text-gray-400" />
//               </div>
//               <h2 className="text-2xl font-bold text-black mb-2">No results found</h2>
//               <p className="text-base text-gray-500 mb-6 max-w-md mx-auto px-4">
//                 We couldn't find anything matching "{searchInput}". Try different keywords or browse our categories.
//               </p>
//               <div className="flex flex-wrap items-center justify-center gap-4">
//                 <Link
//                   href="/products"
//                   className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all"
//                 >
//                   Browse Products
//                 </Link>
//               </div>
//             </motion.div>
//           )}

//           {/* Initial State - No search query */}
//           {!loading && results.length === 0 && !searchInput && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-16 bg-white border border-gray-200 rounded-xl"
//             >
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
//                 <Search className="w-10 h-10 text-gray-400" />
//               </div>
//               <h2 className="text-2xl font-bold text-black mb-2">Search for Products</h2>
//               <p className="text-base text-gray-500 mb-6 max-w-md mx-auto px-4">
//                 Type in the search box above to find products and categories.
//               </p>
//             </motion.div>
//           )}

//           {/* Products Grid */}
//           {!loading && results.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="mb-8"
//               id="products-section"
//             >
//               <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
//                 <ShoppingBag className="w-5 h-5 text-gray-700" />
//                 Products ({results.length})
//               </h2>
              
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
//                 {displayedProducts.map((product) => (
//                   <ProductGridCard 
//                     key={product._id} 
//                     product={product} 
//                     router={router}
//                     isInCart={productsInCart[product._id] || false} 
//                     onViewInCart={openCartSidebar}
//                   />
//                 ))}
//               </div>

//               {/* Show More / Show Less Buttons */}
//               {results.length > 8 && (
//                 <div className="flex justify-center mt-6 gap-4">
//                   {displayCount < results.length && (
//                     <button
//                       onClick={handleShowMore}
//                       className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2"
//                     >
//                       <span>Show More Products</span>
//                       <ChevronRight className="w-4 h-4" />
//                     </button>
//                   )}
                  
//                   {displayCount > 8 && (
//                     <button
//                       onClick={handleShowLess}
//                       className="px-6 py-2 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
//                     >
//                       <ChevronUp className="w-4 h-4" />
//                       <span>Show Less</span>
//                     </button>
//                   )}
//                 </div>
//               )}
//             </motion.div>
//           )}

//           {/* Categories Section */}
//           {!loading && categories.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <div className="mb-4">
//                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-3">
//                   <FolderOpen className="w-3.5 h-3.5 text-gray-700" />
//                   <span className="text-[10px] font-medium text-gray-600 tracking-widest uppercase">
//                     Related Categories
//                   </span>
//                 </div>
//                 <h2 className="text-xl font-bold text-black">
//                   Browse <span className="text-blue-600">Categories</span>
//                 </h2>
//                 <p className="text-sm text-gray-500 mt-1">
//                   {categories.length} categories related to your search
//                 </p>
//               </div>

//               {/* Categories Row with Scroll Arrows */}
//               <div className="relative group px-2">
//                 <AnimatedArrow
//                   show={showLeftArrow}
//                   direction="left"
//                   onClick={() => scroll('left')}
//                   Icon={ChevronLeft}
//                 />

//                 <AnimatedArrow
//                   show={showRightArrow}
//                   direction="right"
//                   onClick={() => scroll('right')}
//                   Icon={ChevronRight}
//                 />

//                 <div
//                   ref={scrollContainerRef}
//                   className="flex overflow-x-auto gap-3 sm:gap-5 pb-4 scroll-smooth"
//                   style={{ 
//                     scrollbarWidth: 'none', 
//                     msOverflowStyle: 'none',
//                     WebkitOverflowScrolling: 'touch'
//                   }}
//                 >
//                   {categories.map((category, index) => (
//                     <CategoryCard 
//                       key={category._id || index} 
//                       category={category} 
//                       index={index}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>

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
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </>
//   );
// }

// // ========== MAIN PAGE WITH SUSPENSE ==========
// export default function SearchPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-white">
//         <Navbar />
//         <div className="flex justify-center items-center h-64">
//           <Loader2 className="w-8 h-8 animate-spin text-black" />
//         </div>
//         <Footer />
//       </div>
//     }>
//       <SearchContent />
//     </Suspense>
//   );
// }


'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  Package, 
  Loader2,
  ChevronRight,
  TrendingUp,
  ArrowRight,
  ShoppingBag,
  FolderOpen,
  Eye,
  ShoppingCart,
  ChevronUp,
  Zap,
  CheckCircle,
  Clock,
  Star,
  ChevronLeft,
  Building2,
  AlertTriangle,
  X,
  Filter,
  SlidersHorizontal,
  Flower2,
  Flame,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { toast } from 'sonner';
import CartSidebar from '../components/CartSidebar';

// Font constants - Beauty Bucket Style
const FONT_FAMILY = "'Playfair Display', Georgia, serif";
const FONT_FAMILY_CURSIVE = "'Courgette', cursive";

// ========== LOADING BAR COMPONENT ==========
const LoadingBar = ({ isVisible }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-0.5 bg-gray-200 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="h-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] animate-loading-bar"></div>
    </div>
  );
};

// ========== HELPER FUNCTIONS ==========
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

const stripHtml = (html) => {
  if (!html) return '';
  if (typeof window !== 'undefined') {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
  return html.replace(/<[^>]*>/g, '');
};

// ========== PRODUCT GRID CARD - BEAUTY BUCKET STYLE ==========
const ProductGridCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
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

              {/* Discount Badge - Smaller on mobile */}
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
                      fontFamily: FONT_FAMILY
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
                  <span className="truncate max-w-[25px]" style={{ fontFamily: FONT_FAMILY }}>
                    {primaryTag}
                  </span>
                </div>
              )}

              {/* Out of Stock Overlay */}
              {isOutOfStock && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-black/60">
                  <span className="rounded-full bg-black px-2 py-1 text-[10px] font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>
                    Out of Stock
                  </span>
                </div>
              )}

              {/* Low Stock Badge */}
              {!isOutOfStock && isLowStock && (
                <div className="absolute bottom-2 left-2 z-10 flex items-center gap-0.5 rounded bg-orange-500 px-1 py-0.5 text-[7px] font-medium text-white">
                  <AlertTriangle className="h-1.5 w-1.5" />
                  <span className="hidden xs:inline" style={{ fontFamily: FONT_FAMILY }}>Only {stockQuantity} left</span>
                  <span className="xs:hidden" style={{ fontFamily: FONT_FAMILY }}>{stockQuantity} left</span>
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

              {/* Mobile Actions - Smaller & Lower */}
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

              {/* Image Navigation - Smaller on mobile */}
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
              <span className="min-w-0 truncate text-[7px] font-semibold uppercase tracking-[0.12em] text-[#EE4275]" style={{ fontFamily: FONT_FAMILY }}>
                {brand}
              </span>
              <div className="flex shrink-0 items-center gap-0.5">
                <span className={`h-1 w-1 rounded-full ${stockQuantity > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className={`text-[6px] font-medium ${stockQuantity > 0 ? 'text-emerald-600' : 'text-red-500'}`} style={{ fontFamily: FONT_FAMILY }}>
                  {stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Product Name */}
            <h3
              className="min-h-[24px] line-clamp-2 text-[11px] font-semibold leading-[1.2] text-gray-800 transition-colors group-hover:text-[#EE4275]"
              style={{ fontFamily: FONT_FAMILY }}
              title={productName}
            >
              {truncateText(productName, 30)}
            </h3>

            {/* Rating */}
            <div className="mt-0.5 flex items-center gap-0.5">
              <div className="flex items-center gap-0.5">{renderStars()}</div>
              <span className="text-[8px] font-medium text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
                {rating.toFixed(1)}
              </span>
              {reviewCount > 0 && (
                <>
                  <span className="text-gray-300 hidden xs:inline">•</span>
                  <span className="text-[7px] text-gray-400 hidden xs:inline" style={{ fontFamily: FONT_FAMILY }}>
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
                <span className="text-[13px] font-bold tracking-tight text-[#EE4275]" style={{ fontFamily: FONT_FAMILY }}>
                  ৳{formatPrice(currentPrice)}
                </span>
                {discountPercent > 0 && (
                  <>
                    <span className="text-[6px] text-gray-400 line-through" style={{ fontFamily: FONT_FAMILY }}>
                      ৳{formatPrice(originalPrice)}
                    </span>
                    <span className="text-[6px] font-semibold text-white bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-0.5 py-0.5 rounded hidden sm:inline-block" style={{ fontFamily: FONT_FAMILY }}>
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

// ========== CATEGORY CARD - BEAUTY BUCKET STYLE ==========
function CategoryCard({ category, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4) }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex-shrink-0 w-56 sm:w-72 md:w-80 lg:w-96"
    >
      <Link href={`/products?category=${category._id}`}>
        <motion.div 
          className="cursor-pointer group/card flex h-32 sm:h-40 md:h-38 overflow-hidden rounded-2xl border border-[#F7C7D3]/30"
          style={{
            background: isHovered 
              ? 'linear-gradient(135deg, #EE4275 0%, #FF6B9D 100%)'
              : 'linear-gradient(135deg, #FFF5F6 0%, #F7C7D3/30 100%)',
            boxShadow: isHovered 
              ? '0 12px 40px rgba(238, 66, 117, 0.25)' 
              : '0 2px 8px rgba(238, 66, 117, 0.06)',
            transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Left - Content (60%) */}
          <div className="flex-1 p-3 sm:p-4 md:p-5 flex flex-col justify-between">
            <div>
              <h3 
                className="text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 line-clamp-2"
                style={{
                  color: isHovered ? '#FFFFFF' : '#2D1B2E',
                  fontFamily: FONT_FAMILY
                }}
              >
                {category.name}
              </h3>
              <p 
                className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 line-clamp-3 transition-colors duration-300"
                style={{
                  color: isHovered ? 'rgba(255,255,255,0.8)' : '#8B7A8C',
                  fontFamily: FONT_FAMILY
                }}
              >
                {category.description || 'Premium products for your needs'}
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-2 sm:mt-3">
              <span 
                className="text-[10px] sm:text-xs font-medium flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
                style={{
                  color: isHovered ? '#FFFFFF' : '#EE4275',
                  fontFamily: FONT_FAMILY
                }}
              >
                Browse
                <ArrowRight 
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-1" 
                  style={{
                    color: isHovered ? '#FFFFFF' : '#EE4275',
                  }}
                />
              </span>
              <div 
                className="w-6 sm:w-8 h-0.5 rounded-full transition-all duration-300"
                style={{
                  background: isHovered 
                    ? 'linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0.1))'
                    : 'linear-gradient(to right, #EE4275, rgba(238, 66, 117, 0.1))',
                }}
              />
            </div>
          </div>

          {/* Right - Image (40%) */}
          <div className="w-[40%] h-full flex-shrink-0 overflow-hidden relative p-1.5 sm:p-2">
            <div className="w-full h-full overflow-hidden rounded-lg">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1609091839311-d34b4f9d9c3a?w=400&h=400&fit=crop';
                }}
              />
            </div>
            
            {/* Subtle gradient overlay */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isHovered 
                  ? 'linear-gradient(to left, rgba(238, 66, 117, 0.15), transparent)'
                  : 'linear-gradient(to left, rgba(238, 66, 117, 0.05), transparent)',
                transition: 'all 0.3s ease',
              }}
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ========== ANIMATED ARROW ==========
function AnimatedArrow({ show, direction, onClick, Icon }) {
  if (!show) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-20 text-[#EE4275] hover:text-[#FF6B9D] transition-all duration-300 p-1 ${
        direction === 'left' ? '-left-5' : '-right-5'
      }`}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9" strokeWidth={1.5} />
    </motion.button>
  );
}

// ========== SEARCH CONTENT ==========
function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);
  const [displayCount, setDisplayCount] = useState(8);
  const [showAll, setShowAll] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsInCart, setProductsInCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [forceFetch, setForceFetch] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initial search on page load
  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setLoading(false);
    }
  }, [query]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (!value.trim()) {
      setResults([]);
      setCategories([]);
      router.push('/search');
      return;
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      router.push(`/search?q=${encodeURIComponent(value)}`);
      performSearch(value);
    }, 500);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (searchInput.trim()) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
      performSearch(searchInput);
    }
  };

  const performSearch = async (searchQuery) => {
    if (!searchQuery || !searchQuery.trim()) {
      setResults([]);
      setCategories([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(searchQuery)}&limit=50`);
      const data = await response.json();
      
      if (data.success) {
        setResults(data.data);
        await fetchRelatedCategories(searchQuery);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedCategories = async (searchQuery) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories`);
      const data = await response.json();
      
      if (data.success) {
        const matchedCategories = data.data
          .filter(category => 
            category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.description?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((cat, index) => ({
            _id: cat._id,
            name: cat.name,
            description: cat.description || 'Premium products for your needs',
            image: cat.image?.url || `https://images.unsplash.com/photo-1609091839311-d34b4f9d9c3a?w=400&h=400&fit=crop`,
            slug: cat.slug,
            productCount: cat.productCount || 0,
          }));
        
        setCategories(matchedCategories.slice(0, 8));
        setTimeout(() => checkScroll(), 100);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.offsetWidth || 200;
      const gap = 16;
      const scrollAmount = (cardWidth + gap) * 2;
      
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [categories]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleShowMore = () => {
    setDisplayCount(prev => prev + 8);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setDisplayCount(8);
    setShowAll(false);
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check cart status for products
  useEffect(() => {
    const checkAllProductsCartStatus = async () => {
      if (results.length === 0) return;
      const productIds = results.map(p => p._id);
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
      } catch (error) {
        console.error('Error checking cart status:', error);
      }
    };
    checkAllProductsCartStatus();
  }, [results, forceFetch]);

  useEffect(() => {
    const handleCartUpdate = async () => {
      if (results.length === 0) return;
      const productIds = results.map(p => p._id);
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
      } catch (error) {
        console.error('Error refreshing cart status:', error);
      }
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [results]);

  const openCartSidebar = () => setIsCartOpen(true);
  const closeCartSidebar = () => setIsCartOpen(false);

  const displayedProducts = results.slice(0, displayCount);

  return (
    <>
      <LoadingBar isVisible={loading} />
      <Navbar />
      
      {/* Hero Section - Beauty Bucket Style */}
      <div className="bg-gradient-to-r from-[#FFF5F6] via-white to-[#FFF5F6] border-b border-[#F7C7D3]/30">
        <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-3">
              <Flower2 className="w-6 h-6 text-[#EE4275]" />
              <h1 className="text-2xl md:text-4xl font-bold text-[#2D1B2E] text-center" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
                Search <span className="text-[#EE4275]">Results</span>
              </h1>
              <Flower2 className="w-6 h-6 text-[#EE4275]" />
            </div>
            <p className="text-gray-500 text-center text-sm mt-1" style={{ fontFamily: FONT_FAMILY }}>
              {loading ? 'Searching...' : `Found ${results.length} ${results.length === 1 ? 'result' : 'results'} for`}
            </p>
            
            {/* Search Bar */}
            <div className="w-full max-w-2xl mt-4 md:mt-5">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative flex items-center bg-white border border-[#F7C7D3]/30 rounded-full shadow-sm overflow-hidden focus-within:border-[#EE4275] focus-within:ring-2 focus-within:ring-[#EE4275]/20 transition-all">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search beauty products..."
                    value={searchInput}
                    onChange={handleSearchChange}
                    className="w-full pl-11 pr-28 py-2.5 text-sm border-0 focus:outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
                    style={{ fontFamily: FONT_FAMILY }}
                  />
                  {searchInput && (
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchInput('');
                        setResults([]);
                        setCategories([]);
                        router.push('/search');
                      }} 
                      className="absolute right-14 p-1.5 text-gray-400 hover:text-[#EE4275] rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-xs font-medium rounded-full hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    Search
                  </button>
                </div>
              </form>
              
              {query && !loading && results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#F7C7D3]/30 rounded-full shadow-sm"
                >
                  <span className="text-[10px] text-gray-500" style={{ fontFamily: FONT_FAMILY }}>Showing results for:</span>
                  <span className="font-semibold text-[#EE4275] text-xs" style={{ fontFamily: FONT_FAMILY }}>"{query}"</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Result Stats */}
          {!loading && results.length > 0 && (
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF5F6] rounded-full border border-[#F7C7D3]/30">
                <TrendingUp className="w-3.5 h-3.5 text-[#EE4275]" />
                <span className="text-[10px] text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
                  {results.length} {results.length === 1 ? 'result' : 'results'} found
                </span>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 md:py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-[#F7C7D3]/30 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#EE4275] rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="mt-4 text-base text-gray-500 animate-pulse" style={{ fontFamily: FONT_FAMILY }}>Searching through our collection...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && results.length === 0 && searchInput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-2xl border border-[#F7C7D3]/30"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFF5F6] rounded-full mb-4">
                <Search className="w-10 h-10 text-[#F7C7D3]" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D1B2E] mb-2" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>No results found</h2>
              <p className="text-base text-gray-500 mb-6 max-w-md mx-auto px-4" style={{ fontFamily: FONT_FAMILY }}>
                We couldn't find anything matching "{searchInput}". Try different keywords or browse our categories.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/products"
                  className="px-6 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-medium rounded-full hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  Browse Products
                </Link>
              </div>
            </motion.div>
          )}

          {/* Initial State - No search query */}
          {!loading && results.length === 0 && !searchInput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-2xl border border-[#F7C7D3]/30"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFF5F6] rounded-full mb-4">
                <Search className="w-10 h-10 text-[#F7C7D3]" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D1B2E] mb-2" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>Search for Products</h2>
              <p className="text-base text-gray-500 mb-6 max-w-md mx-auto px-4" style={{ fontFamily: FONT_FAMILY }}>
                Type in the search box above to find products and categories.
              </p>
            </motion.div>
          )}

          {/* Products Grid */}
          {!loading && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
              id="products-section"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF5F6] rounded-full border border-[#F7C7D3]/30">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#EE4275]" />
                  <span className="text-[10px] font-medium text-[#EE4275] tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
                    Products ({results.length})
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {displayedProducts.map((product) => (
                  <ProductGridCard 
                    key={product._id} 
                    product={product} 
                    router={router}
                    isInCart={productsInCart[product._id] || false} 
                    onViewInCart={openCartSidebar}
                  />
                ))}
              </div>

              {/* Show More / Show Less Buttons */}
              {results.length > 8 && (
                <div className="flex justify-center mt-6 gap-4">
                  {displayCount < results.length && (
                    <button
                      onClick={handleShowMore}
                      className="px-6 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-medium rounded-full hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all flex items-center gap-2"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      <span>Show More Products</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                  
                  {displayCount > 8 && (
                    <button
                      onClick={handleShowLess}
                      className="px-6 py-2 bg-[#FFF5F6] text-[#EE4275] font-medium rounded-full hover:bg-[#F7C7D3]/30 transition-all flex items-center gap-2 border border-[#F7C7D3]/30"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      <ChevronUp className="w-4 h-4" />
                      <span>Show Less</span>
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Categories Section */}
          {!loading && categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF5F6] rounded-full border border-[#F7C7D3]/30 mb-3">
                  <FolderOpen className="w-3.5 h-3.5 text-[#EE4275]" />
                  <span className="text-[10px] font-medium text-[#EE4275] tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
                    Related Categories
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
                  Browse <span className="text-[#EE4275]">Categories</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: FONT_FAMILY }}>
                  {categories.length} categories related to your search
                </p>
              </div>

              {/* Categories Row with Scroll Arrows */}
              <div className="relative group px-2">
                <AnimatedArrow
                  show={showLeftArrow}
                  direction="left"
                  onClick={() => scroll('left')}
                  Icon={ChevronLeft}
                />

                <AnimatedArrow
                  show={showRightArrow}
                  direction="right"
                  onClick={() => scroll('right')}
                  Icon={ChevronRight}
                />

                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto gap-3 sm:gap-5 pb-4 scroll-smooth"
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
            </motion.div>
          )}
        </div>
      </div>

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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}

// ========== MAIN PAGE WITH SUSPENSE ==========
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#EE4275]" />
        </div>
        <Footer />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}