
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
//   ChevronLeft,
//   ChevronRight,
//   CheckCircle,
//   Clock,
//   Flame,
//   Star,
//   Sparkles,
//   Package,
//   AlertTriangle,
//   ChevronDown,
//   ChevronUp,
//   Tag,
//   Hash
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

// // Product Card Component
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
  
//   // Safe data extraction
//   const productId = product?._id || product?.id || 'unknown';
//   const productName = product?.productName || product?.name || 'Product';
//   const regularPrice = product?.regularPrice || product?.price || 0;
//   const discountPrice = product?.discountPrice || 0;
//   const stockQuantity = product?.stockQuantity || 0;
//   const unit = product?.unit || 'pcs';
  
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
//     productImages = ['https://via.placeholder.com/400?text=Product'];
//   }
  
//   // Safe tags extraction - now tags are ObjectId references
//   let tagNames = [];
//   if (product?.tags && Array.isArray(product.tags)) {
//     tagNames = product.tags.map(tag => {
//       if (typeof tag === 'string') return tag;
//       if (tag?.name) return tag.name;
//       if (tag && typeof tag === 'object') {
//         // If tag is populated, it will have name property
//         if (tag.name) return tag.name;
//       }
//       return null;
//     }).filter(Boolean);
//   }
  
//   const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
//   const hasMultipleImages = productImages.length > 1;
//   const currentPrice = discountPrice && discountPrice < regularPrice ? discountPrice : regularPrice;
//   const originalPrice = regularPrice;
//   const primaryTag = tagNames[0] || null;
  
//   const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = stockQuantity <= 0;

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
//         <div className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md h-full flex flex-col">
//           {/* Product Image Section */}
//           <div className="relative bg-gray-50 p-1.5">
//             <div className="relative w-full aspect-[4/3] overflow-hidden">
//               <img
//                 src={productImages[activeIndex] || productImages[0]}
//                 alt={productName}
//                 className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = 'https://via.placeholder.com/400?text=Product';
//                 }}
//               />
              
//               {/* Discount Badge */}
//               {discountPercent > 0 && (
//                 <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 z-10 flex items-center gap-0.5">
//                   <Zap className="w-2.5 h-2.5" />
//                   {discountPercent}%
//                 </div>
//               )}
              
//               {/* Tag Badge */}
//               {primaryTag && (
//                 <div className="absolute top-2 right-2 bg-black text-white text-[9px] px-1.5 py-0.5 font-medium z-10 flex items-center gap-0.5">
//                   <Sparkles className="w-2 h-2" />
//                   {primaryTag}
//                 </div>
//               )}
              
//               {/* Out of Stock Overlay */}
//               {isOutOfStock && (
//                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
//                   <span className="bg-black text-white text-xs font-medium px-2 py-1">Out of Stock</span>
//                 </div>
//               )}
              
//               {/* Low Stock Badge */}
//               {!isOutOfStock && isLowStock && (
//                 <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-[9px] font-medium px-1.5 py-0.5 z-10 flex items-center gap-0.5">
//                   <AlertTriangle className="w-2 h-2" />
//                   Only {stockQuantity} left
//                 </div>
//               )}
              
//               {/* Desktop Hover Icons */}
//               {!isMobile && (
//                 <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                   <div className="w-7 h-7 bg-white shadow-md hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-200">
//                     <Eye className="w-3.5 h-3.5 text-gray-700 hover:text-white transition-colors" />
//                   </div>
//                   <div 
//                     onClick={handleAddToCart}
//                     className={`w-7 h-7 bg-white shadow-md hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-200 ${
//                       cartStatusLoading ? 'opacity-50 pointer-events-none' : ''
//                     }`}
//                   >
//                     {cartStatusLoading ? (
//                       <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-700" />
//                     ) : isInCart ? (
//                       <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
//                     ) : (
//                       <ShoppingCart className="w-3.5 h-3.5 text-gray-700 hover:text-white transition-colors" />
//                     )}
//                   </div>
//                 </div>
//               )}
              
//               {/* Mobile Icons */}
//               {isMobile && (
//                 <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-30">
//                   <div className="bg-white p-1.5 shadow-md">
//                     <Eye className="w-3.5 h-3.5 text-gray-700" />
//                   </div>
//                   <div 
//                     onClick={handleAddToCart}
//                     className={`p-1.5 shadow-md ${isOutOfStock ? 'bg-gray-100' : 'bg-white'}`}
//                   >
//                     {cartStatusLoading ? (
//                       <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-500" />
//                     ) : isInCart ? (
//                       <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
//                     ) : (
//                       <ShoppingCart className="w-3.5 h-3.5 text-black" />
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Thumbnails */}
//             {hasMultipleImages && !isMobile && (
//               <div className="flex justify-center items-center gap-1 py-1.5 bg-gray-50 border-b border-gray-100">
//                 {productImages.slice(0, 4).map((image, index) => (
//                   <button
//                     key={index}
//                     className={`w-6 h-6 overflow-hidden transition-all duration-200 ${
//                       activeIndex === index ? 'ring-1 ring-blue-500 ring-offset-1' : 'opacity-60 hover:opacity-100'
//                     }`}
//                     onMouseEnter={() => setActiveIndex(index)}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       e.preventDefault();
//                       setActiveIndex(index);
//                     }}
//                   >
//                     <img src={image} alt="" className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Product Info */}
//           <div className="p-2.5 text-center flex-1 flex flex-col">
//             {/* Product Name */}
//             <h3 className="text-xs font-medium text-gray-900 truncate mb-1" title={productName}>
//               {truncateText(productName, 35)}
//             </h3>

//             {/* Price */}
//             <div className="flex items-baseline justify-center gap-1.5 mb-1.5">
//               <span className="text-sm font-bold text-black">
//                 ৳{formatPrice(currentPrice)}
//               </span>
//               {discountPercent > 0 && (
//                 <span className="text-[9px] text-gray-400 line-through">
//                   ৳{formatPrice(originalPrice)}
//                 </span>
//               )}
//               <span className="text-[9px] text-gray-500">/{getUnitLabel(unit)}</span>
//             </div>

//             {/* Stock Status */}
//             <div className="mb-1.5 flex justify-center">
//               {isOutOfStock ? (
//                 <span className="inline-flex items-center gap-1 text-red-600 text-[9px] font-medium">
//                   <div className="w-1 h-1 bg-red-500 rounded-full"></div>
//                   Out of Stock
//                 </span>
//               ) : isLowStock ? (
//                 <span className="inline-flex items-center gap-1 text-orange-600 text-[9px] font-medium">
//                   <AlertTriangle className="w-2 h-2" />
//                   Only {stockQuantity} left
//                 </span>
//               ) : (
//                 <span className="inline-flex items-center gap-1 text-green-600 text-[9px] font-medium">
//                   <div className="w-1 h-1 bg-green-500 rounded-full"></div>
//                   In Stock
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Add to Cart Button */}
//           <button
//             onClick={handleAddToCart}
//             disabled={isOutOfStock}
//             className={`w-full py-1.5 text-center text-[10px] font-medium transition-colors flex items-center justify-center gap-1 ${
//               isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 
//               isInCart ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-700' : 
//               'bg-black text-white hover:bg-gray-800'
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
//       </Link>
//     </motion.div>
//   );
// };

// // Main Featured Products Component
// export default function FeaturedProducts() {
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [activeTag, setActiveTag] = useState('all');
//   const [visibleCount, setVisibleCount] = useState(5);
//   const [availableTags, setAvailableTags] = useState([]);
//   const [isMobile, setIsMobile] = useState(false);
//   const [allTags, setAllTags] = useState([]);
  
//   const itemsPerLoad = 5;
//   const itemsPerLoadMobile = 4;
  
//   // Refs for scroll container
//   const [tagContainerRef, setTagContainerRef] = useState(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(false);

//   // Check mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       setVisibleCount(mobile ? 4 : 5);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Check scroll position
//   const checkScrollButtons = () => {
//     if (tagContainerRef) {
//       const { scrollLeft, scrollWidth, clientWidth } = tagContainerRef;
//       setCanScrollLeft(scrollLeft > 5);
//       setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
//     }
//   };

//   // Scroll functions
//   const scrollLeft = () => {
//     if (tagContainerRef) {
//       const scrollAmount = tagContainerRef.clientWidth * 0.7;
//       tagContainerRef.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//     }
//   };

//   const scrollRight = () => {
//     if (tagContainerRef) {
//       const scrollAmount = tagContainerRef.clientWidth * 0.7;
//       tagContainerRef.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   // Fetch tags from backend
//   const fetchAllTags = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/tags');
//       const data = await response.json();
      
//       if (data.success) {
//         return data.data.filter(tag => tag.isActive !== false);
//       }
//       return [];
//     } catch (error) {
//       console.error('Error fetching tags:', error);
//       return [];
//     }
//   };

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//         // Fetch products with tags populated
//         const productsResponse = await fetch('http://localhost:5000/api/products?limit=100&populateTags=true');
//         const productsData = await productsResponse.json();
        
//         if (productsData.success) {
//           const products = productsData.data.filter(p => p.isActive !== false);
//           setAllProducts(products);
//           setFilteredProducts(products);
          
//           // Fetch all tags from backend
//           const tags = await fetchAllTags();
//           setAllTags(tags);
          
//           // Extract available tag IDs from products
//           const availableTagIds = new Set();
//           products.forEach(product => {
//             if (product.tags && Array.isArray(product.tags)) {
//               product.tags.forEach(tag => {
//                 if (tag && typeof tag === 'object' && tag._id) {
//                   availableTagIds.add(tag._id.toString());
//                 } else if (typeof tag === 'string') {
//                   availableTagIds.add(tag);
//                 }
//               });
//             }
//           });
          
//           // Filter tags to only show those that are associated with products
//           const availableTagsFromBackend = tags.filter(tag => 
//             availableTagIds.has(tag._id.toString())
//           );
          
//           // Add "All Products" option
//           const allOption = {
//             _id: 'all',
//             name: 'All Products',
//             isActive: true
//           };
          
//           setAvailableTags([allOption, ...availableTagsFromBackend]);
          
//           await checkCartStatus(products);
//         }
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchProducts();
//   }, []);

//   // Check cart status
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
//       productIds.forEach(id => { emptyCartStatus[id] = false; });
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
//         productIds.forEach(id => { emptyCartStatus[id] = false; });
//         setProductsInCart(emptyCartStatus);
//       }
//     } catch (error) {
//       console.error('Error checking cart status:', error);
//       const emptyCartStatus = {};
//       productIds.forEach(id => { emptyCartStatus[id] = false; });
//       setProductsInCart(emptyCartStatus);
//     }
//   };

//   // Update cart status
//   const updateCartStatus = useCallback(async () => {
//     if (allProducts.length === 0) return;
    
//     const productIds = allProducts.map(p => p._id || p.id).filter(Boolean);
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
//       productIds.forEach(id => { emptyCartStatus[id] = false; });
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
//         productIds.forEach(id => { emptyCartStatus[id] = false; });
//         setProductsInCart(emptyCartStatus);
//       }
//     } catch (error) {
//       console.error('Error refreshing cart status:', error);
//     }
//   }, [allProducts]);

//   // Listen for cart updates
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       updateCartStatus();
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     window.addEventListener('auth-change', handleCartUpdate);
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//       window.removeEventListener('auth-change', handleCartUpdate);
//     };
//   }, [updateCartStatus]);

//   // Filter by tag
//   useEffect(() => {
//     if (activeTag === 'all') {
//       setFilteredProducts(allProducts);
//     } else {
//       setFilteredProducts(allProducts.filter(p => {
//         const tags = p.tags || [];
//         return tags.some(t => {
//           // Check if tag matches by ID or name
//           if (typeof t === 'object' && t._id) {
//             return t._id.toString() === activeTag;
//           }
//           if (typeof t === 'string') {
//             return t === activeTag;
//           }
//           return false;
//         });
//       }));
//     }
//     setVisibleCount(isMobile ? 4 : 5);
//   }, [activeTag, allProducts, isMobile]);

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

//   const visibleProducts = filteredProducts.slice(0, visibleCount);
//   const hasMore = visibleCount < filteredProducts.length;
//   const hasLess = visibleCount > (isMobile ? 4 : 5);

//   const showMore = () => {
//     const increment = isMobile ? itemsPerLoadMobile : itemsPerLoad;
//     setVisibleCount(prev => Math.min(prev + increment, filteredProducts.length));
//   };

//   const showLess = () => {
//     setVisibleCount(isMobile ? 4 : 5);
//   };

//   // Get icon for tag (can be customized based on tag name)
//   const getTagIcon = (tagName) => {
//     const name = tagName.toLowerCase();
//     if (name.includes('best seller') || name.includes('bestseller')) return <Star className="w-3.5 h-3.5" />;
//     if (name.includes('trending')) return <Flame className="w-3.5 h-3.5" />;
//     if (name.includes('new')) return <Sparkles className="w-3.5 h-3.5" />;
//     if (name.includes('limited') || name.includes('offer')) return <Clock className="w-3.5 h-3.5" />;
//     if (name.includes('flash') || name.includes('sale')) return <Zap className="w-3.5 h-3.5" />;
//     if (name.includes('clearance')) return <Tag className="w-3.5 h-3.5" />;
//     return <Hash className="w-3.5 h-3.5" />;
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white py-16 flex justify-center items-center">
//         <Loader2 className="w-8 h-8 animate-spin text-black" />
//       </div>
//     );
//   }

//   if (allProducts.length === 0) {
//     return null;
//   }

//   return (
//     <>
//       <div className=" bg-white py-2 md:py-2">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Header */}
//           <div className="text-center mb-6 md:mb-10">
//             <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-3 md:mb-4">
//               <Flame className="w-3.5 h-3.5 text-orange-500" />
//               <span className="text-xs font-medium text-gray-600">Trending Now</span>
//             </div>
//             <h2 className="text-2xl md:text-4xl font-bold text-black mb-2 md:mb-3">Featured Products</h2>
//             <p className="text-gray-500 text-xs md:text-sm max-w-2xl mx-auto px-4">
//               Discover our handpicked selection of trending gadgets and electronics,
//               curated just for you.
//             </p>
//           </div>

//           {/* Tag Filters - Scrollable Single Line from Backend */}
//           {availableTags.length > 0 && (
//             <div className="relative mb-6 md:mb-10">
//               {/* Left Scroll Button */}
//               {canScrollLeft && (
//                 <button
//                   onClick={scrollLeft}
//                   className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 md:p-2 border border-gray-200 hover:bg-gray-50 transition-colors"
//                   aria-label="Scroll left"
//                 >
//                   <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
//                 </button>
//               )}

//               {/* Scrollable Tags Container */}
//               <div
//                 ref={(el) => {
//                   setTagContainerRef(el);
//                   if (el) {
//                     checkScrollButtons();
//                     el.addEventListener('scroll', checkScrollButtons);
//                   }
//                 }}
//                 className="flex gap-2 overflow-x-auto scrollbar-hide px-8 md:px-10 py-1 scroll-smooth"
//                 style={{
//                   scrollbarWidth: 'none',
//                   msOverflowStyle: 'none',
//                   WebkitOverflowScrolling: 'touch'
//                 }}
//               >
//                 {availableTags.map((tag) => {
//                   const isActive = activeTag === tag._id;
//                   const tagName = tag.name || 'Unknown';
                  
//                   return (
//                     <button
//                       key={tag._id}
//                       onClick={() => setActiveTag(tag._id)}
//                       className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-300 text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0 ${
//                         isActive
//                           ? 'bg-black text-white shadow-md'
//                           : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
//                       }`}
//                     >
//                       <span className="flex items-center">
//                         {tag._id === 'all' ? <Package className="w-3.5 h-3.5" /> : getTagIcon(tagName)}
//                       </span>
//                       <span>{tagName}</span>
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* Right Scroll Button */}
//               {canScrollRight && (
//                 <button
//                   onClick={scrollRight}
//                   className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 md:p-2 border border-gray-200 hover:bg-gray-50 transition-colors"
//                   aria-label="Scroll right"
//                 >
//                   <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Products Grid */}
//           <div className="mb-2">
//             {filteredProducts.length === 0 ? (
//               <div className="text-center py-16 bg-white border border-gray-200">
//                 <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500">No products found with this tag</p>
//               </div>
//             ) : (
//               <>
//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
//                   <AnimatePresence mode="wait">
//                     {visibleProducts.map((product) => (
//                       <FeaturedProductCard
//                         key={product._id || product.id}
//                         product={product}
//                         isInCart={productsInCart[product._id || product.id] || false}
//                         onCartStatusChange={onCartStatusChange}
//                         onViewInCart={openCartSidebar}
//                       />
//                     ))}
//                   </AnimatePresence>
//                 </div>

//                 {/* Show More / Show Less */}
//                 <div className="flex justify-center gap-3 mt-8">
//                   {hasLess && (
//                     <button
//                       onClick={showLess}
//                       className="flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs md:text-sm font-medium"
//                     >
//                       <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />
//                       Show Less
//                     </button>
//                   )}
                  
//                   {hasMore && (
//                     <button
//                       onClick={showMore}
//                       className="flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-xs md:text-sm font-medium"
//                     >
//                       Show More
//                       <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
//                     </button>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Cart Sidebar */}
//       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
//     </>
//   );
// }


'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
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
  Hash
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
  
  // Safe tags extraction - now tags are ObjectId references
  let tagNames = [];
  if (product?.tags && Array.isArray(product.tags)) {
    tagNames = product.tags.map(tag => {
      if (typeof tag === 'string') return tag;
      if (tag?.name) return tag.name;
      if (tag && typeof tag === 'object') {
        // If tag is populated, it will have name property
        if (tag.name) return tag.name;
      }
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

  // const handleAddToCart = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
    
  //   if (isInCart) {
  //     onViewInCart();
  //     return;
  //   }
    
  //   if (stockQuantity <= 0) {
  //     toast.error('Product is out of stock!');
  //     return;
  //   }
    
  //   setCartStatusLoading(true);
  //   const toastId = toast.loading('Adding to cart...');
    
  //   try {
  //     const token = localStorage.getItem('token');
  //     const sessionId = localStorage.getItem('cartSessionId');
      
  //     const headers = { 'Content-Type': 'application/json' };
  //     if (token) {
  //       headers['Authorization'] = `Bearer ${token}`;
  //     } else if (sessionId) {
  //       headers['x-session-id'] = sessionId;
  //     }
      
  //     const response = await fetch('http://localhost:5000/api/cart', {
  //       method: 'POST',
  //       headers: headers,
  //       body: JSON.stringify({ productId: productId, quantity: 1 })
  //     });
      
  //     const data = await response.json();
      
  //     if (data.success) {
  //       if (data.sessionId && !token) {
  //         localStorage.setItem('cartSessionId', data.sessionId);
  //       }
  //       toast.success('Added to cart!', { id: toastId });
  //       setIsInCart(true);
  //       if (onCartStatusChange) {
  //         onCartStatusChange(productId, true);
  //       }
  //       window.dispatchEvent(new Event('cart-update'));
  //     } else {
  //       toast.error(data.error || 'Failed to add to cart', { id: toastId });
  //     }
  //   } catch (error) {
  //     console.error('Add to cart error:', error);
  //     toast.error('Network error. Please try again.', { id: toastId });
  //   } finally {
  //     setCartStatusLoading(false);
  //   }
  // };

  // In FeaturedProducts.jsx - REPLACE the existing handleAddToCart function

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
    let sessionId = localStorage.getItem('cartSessionId');
    
    const headers = { 'Content-Type': 'application/json' };
    
    // ✅ FIX: Generate session ID if missing
    if (!token && !sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('cartSessionId', sessionId);
      console.log('🆕 Generated new session ID for add to cart:', sessionId);
    }
    
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
              
              {/* Tag Badge */}
              {primaryTag && (
                <div className="absolute top-2 right-2 bg-black text-white text-[9px] px-1.5 py-0.5 font-medium z-10 flex items-center gap-0.5">
                  <Sparkles className="w-2 h-2" />
                  {primaryTag}
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
  
  // Refs for scroll container
  const [tagContainerRef, setTagContainerRef] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check mobile
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

  // Check scroll position
  const checkScrollButtons = () => {
    if (tagContainerRef) {
      const { scrollLeft, scrollWidth, clientWidth } = tagContainerRef;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  // Scroll functions
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

  // Fetch tags from backend
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

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Fetch products with tags populated
        const productsResponse = await fetch('http://localhost:5000/api/products?limit=100&populateTags=true');
        const productsData = await productsResponse.json();
        
        if (productsData.success) {
          const products = productsData.data.filter(p => p.isActive !== false);
          setAllProducts(products);
          setFilteredProducts(products);
          
          // Fetch all tags from backend
          const tags = await fetchAllTags();
          setAllTags(tags);
          
          // Extract available tag IDs from products
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
          
          // Filter tags to only show those that are associated with products
          const availableTagsFromBackend = tags.filter(tag => 
            availableTagIds.has(tag._id.toString())
          );
          
          // Add "All Products" option
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

  // Check cart status
  // const checkCartStatus = async (productsList) => {
  //   if (!productsList || productsList.length === 0) return;
    
  //   const productIds = productsList.map(p => p._id || p.id).filter(Boolean);
  //   if (productIds.length === 0) return;
    
  //   const token = localStorage.getItem('token');
  //   const sessionId = localStorage.getItem('cartSessionId');
    
  //   const headers = {};
  //   if (token) {
  //     headers['Authorization'] = `Bearer ${token}`;
  //   } else if (sessionId) {
  //     headers['x-session-id'] = sessionId;
  //   } else {
  //     const emptyCartStatus = {};
  //     productIds.forEach(id => { emptyCartStatus[id] = false; });
  //     setProductsInCart(emptyCartStatus);
  //     return;
  //   }
    
  //   try {
  //     const response = await fetch('http://localhost:5000/api/cart/check-status', {
  //       method: 'POST',
  //       headers: { ...headers, 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ productIds })
  //     });
      
  //     const data = await response.json();
  //     if (data.success) {
  //       setProductsInCart(data.data);
  //     } else {
  //       const emptyCartStatus = {};
  //       productIds.forEach(id => { emptyCartStatus[id] = false; });
  //       setProductsInCart(emptyCartStatus);
  //     }
  //   } catch (error) {
  //     console.error('Error checking cart status:', error);
  //     const emptyCartStatus = {};
  //     productIds.forEach(id => { emptyCartStatus[id] = false; });
  //     setProductsInCart(emptyCartStatus);
  //   }
  // };

  // In FeaturedProducts.jsx - REPLACE the existing checkCartStatus function

const checkCartStatus = async (productsList) => {
  if (!productsList || productsList.length === 0) return;
  
  const productIds = productsList.map(p => p._id || p.id).filter(Boolean);
  if (productIds.length === 0) return;
  
  const token = localStorage.getItem('token');
  let sessionId = localStorage.getItem('cartSessionId');
  
  const headers = {};
  
  // ✅ FIX: Generate session ID if missing
  if (!token && !sessionId) {
    sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    localStorage.setItem('cartSessionId', sessionId);
    console.log('🆕 Generated new session ID for cart status:', sessionId);
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
  // Update cart status
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

  // Filter by tag
  useEffect(() => {
    if (activeTag === 'all') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(p => {
        const tags = p.tags || [];
        return tags.some(t => {
          // Check if tag matches by ID or name
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

  // Get icon for tag (can be customized based on tag name)
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
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  if (allProducts.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-white py-2 md:py-2">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-6 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-3 md:mb-4">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs font-medium text-gray-600">Trending Now</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-black mb-2 md:mb-3">Featured Products</h2>
            <p className="text-gray-500 text-xs md:text-sm max-w-2xl mx-auto px-4">
              Discover our handpicked selection of trending gadgets and electronics,
              curated just for you.
            </p>
          </div>

          {/* Tag Filters - Scrollable Single Line from Backend */}
          {availableTags.length > 0 && (
            <div className="relative mb-6 md:mb-10">
              {/* Only show scroll buttons when tags overflow */}
              {canScrollLeft && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 md:p-2 border border-gray-200 hover:bg-gray-50 transition-colors lg:flex hidden"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
                </button>
              )}

              {/* Scrollable Tags Container */}
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
                      className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-300 text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                        isActive
                          ? 'bg-black text-white shadow-md'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <span className="flex items-center">
                        {tag._id === 'all' ? <Package className="w-3.5 h-3.5" /> : getTagIcon(tagName)}
                      </span>
                      <span>{tagName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Only show scroll buttons when tags overflow */}
              {canScrollRight && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 md:p-2 border border-gray-200 hover:bg-gray-50 transition-colors lg:flex hidden"
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
              <div className="text-center py-16 bg-white border border-gray-200">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No products found with this tag</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
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
                      className="flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs md:text-sm font-medium"
                    >
                      <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />
                      Show Less
                    </button>
                  )}
                  
                  {hasMore && (
                    <button
                      onClick={showMore}
                      className="flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-xs md:text-sm font-medium"
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