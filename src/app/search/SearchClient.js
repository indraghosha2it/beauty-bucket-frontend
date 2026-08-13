'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
  SlidersHorizontal
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { toast } from 'sonner';
import CartSidebar from '../components/CartSidebar';

// ========== LOADING BAR COMPONENT ==========
const LoadingBar = ({ isVisible }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-0.5 bg-gray-200 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="h-full bg-black animate-loading-bar"></div>
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

// ========== PRODUCT GRID CARD - MATCHES PRODUCTS PAGE ==========
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

// ========== CATEGORY CARD ==========
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
          className="cursor-pointer group/card flex h-32 sm:h-40 md:h-38 overflow-hidden rounded-xl border border-gray-200"
          style={{
            background: isHovered 
              ? 'linear-gradient(135deg, #000000 0%, #333333 100%)'
              : 'linear-gradient(135deg, #F8FAFB 0%, #EDF1F3 100%)',
            boxShadow: isHovered 
              ? '0 12px 40px rgba(0, 0, 0, 0.15)' 
              : '0 2px 8px rgba(0,0,0,0.06)',
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
                  color: isHovered ? '#FFFFFF' : '#1A1A1A',
                  fontWeight: 700 
                }}
              >
                {category.name}
              </h3>
              <p 
                className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 line-clamp-3 transition-colors duration-300"
                style={{
                  color: isHovered ? 'rgba(255,255,255,0.7)' : '#64748B',
                }}
              >
                {category.description || 'Premium products for your needs'}
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-2 sm:mt-3">
              <span 
                className="text-[10px] sm:text-xs font-medium flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
                style={{
                  color: isHovered ? '#FFFFFF' : '#2563EB',
                }}
              >
                Browse
                <ArrowRight 
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-1" 
                  style={{
                    color: isHovered ? '#FFFFFF' : '#2563EB',
                  }}
                />
              </span>
              <div 
                className="w-6 sm:w-8 h-0.5 rounded-full transition-all duration-300"
                style={{
                  background: isHovered 
                    ? 'linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0.1))'
                    : 'linear-gradient(to right, #2563EB, rgba(37, 99, 235, 0.1))',
                }}
              />
            </div>
          </div>

          {/* Right - Image (40%) with padding */}
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
            
            {/* Subtle gradient overlay on image */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isHovered 
                  ? 'linear-gradient(to left, rgba(0, 0, 0, 0.15), transparent)'
                  : 'linear-gradient(to left, rgba(0,0,0,0.05), transparent)',
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
      className={`absolute top-1/2 -translate-y-1/2 z-20 text-black hover:text-blue-600 transition-all duration-300 p-1 ${
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
      
      {/* Hero Section - Black/White with Blue accent */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-3">
              <Search className="w-6 h-6 text-black" />
              <h1 className="text-2xl md:text-4xl font-bold text-black text-center">Search Results</h1>
              <Search className="w-6 h-6 text-black" />
            </div>
            <p className="text-gray-500 text-center text-sm mt-1">
              {loading ? 'Searching...' : `Found ${results.length} ${results.length === 1 ? 'result' : 'results'} for`}
            </p>
            
            {/* Search Bar */}
            <div className="w-full max-w-2xl mt-4 md:mt-5">
              <form onSubmit={handleSearchSubmit}>
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
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchInput('');
                        setResults([]);
                        setCategories([]);
                        router.push('/search');
                      }} 
                      className="absolute right-12 p-1.5 text-gray-400 hover:text-black rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors"
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
                  className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm"
                >
                  <span className="text-[10px] text-gray-500">Showing results for:</span>
                  <span className="font-semibold text-black text-xs">"{query}"</span>
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
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gray-700" />
                <span className="text-sm text-gray-500">
                  {results.length} {results.length === 1 ? 'result' : 'results'} found
                </span>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 md:py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="mt-4 text-base text-gray-500 animate-pulse">Searching through our collection...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && results.length === 0 && searchInput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white border border-gray-200 rounded-xl"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">No results found</h2>
              <p className="text-base text-gray-500 mb-6 max-w-md mx-auto px-4">
                We couldn't find anything matching "{searchInput}". Try different keywords or browse our categories.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/products"
                  className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all"
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
              className="text-center py-16 bg-white border border-gray-200 rounded-xl"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">Search for Products</h2>
              <p className="text-base text-gray-500 mb-6 max-w-md mx-auto px-4">
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
              <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                Products ({results.length})
              </h2>
              
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
                      className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2"
                    >
                      <span>Show More Products</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                  
                  {displayCount > 8 && (
                    <button
                      onClick={handleShowLess}
                      className="px-6 py-2 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
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
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-3">
                  <FolderOpen className="w-3.5 h-3.5 text-gray-700" />
                  <span className="text-[10px] font-medium text-gray-600 tracking-widest uppercase">
                    Related Categories
                  </span>
                </div>
                <h2 className="text-xl font-bold text-black">
                  Browse <span className="text-blue-600">Categories</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">
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
          <Loader2 className="w-8 h-8 animate-spin text-black" />
        </div>
        <Footer />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}