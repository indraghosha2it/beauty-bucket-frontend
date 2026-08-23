
// 'use client';

// import Link from 'next/link';
// import { useState, useEffect, useRef } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   LogOut, 
//   User, 
//   LayoutDashboard, 
//   ShoppingCart,
//   Search,
//   X,
//   Home,
//   Package,
//   Info,
//   Phone,
//   Menu,
//   UserCircle,
//   ChevronDown,
//   MapPin,
//   Zap,
//   Heart,
//   Sparkles,
//   Settings,
//   Flower2
// } from 'lucide-react';
// import { toast } from 'sonner';
// import CartSidebar from '../CartSidebar';

// // Icon mapping for navbar items
// const ICON_MAP = {
//   Home: Home,
//   Zap: Zap,
//   MapPin: MapPin,
//   Info: Info,
//   Phone: Phone,
//   Package: Package,
//   User: User,
//   Heart: Heart,
//   Sparkles: Sparkles,
//   Flower2: Flower2,
// };

// export default function Navbar() {
//   const [navbarData, setNavbarData] = useState(null);
//   const [navbarLoading, setNavbarLoading] = useState(true);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [user, setUser] = useState(null);
//   const [cartCount, setCartCount] = useState(0);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [scrolled, setScrolled] = useState(false);
//   const [profileImageError, setProfileImageError] = useState(false);
//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const searchRef = useRef(null);
//   const mobileSearchRef = useRef(null);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Fetch navbar data from PUBLIC endpoint (no auth required)
//   useEffect(() => {
//     const fetchNavbar = async () => {
//       try {
//         // ✅ PUBLIC endpoint - no token needed
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://http://localhost:3000'}/api/navbar`);
        
//         if (response.ok) {
//           const data = await response.json();
//           if (data.success) {
//             setNavbarData(data.data);
//           } else {
//             // Set default values if API fails
//             setNavbarData({
//               items: [
//                 { id: '1', name: 'Home', href: '/', icon: 'Home', isActive: true },
//                 { id: '2', name: 'Products', href: '/products', icon: 'Package', isActive: true },
//                 { id: '3', name: 'Track Order', href: '/track', icon: 'MapPin', isActive: true },
//                 { id: '4', name: 'About', href: '/about', icon: 'Flower2', isActive: true },
//                 { id: '5', name: 'Contact', href: '/contact', icon: 'Phone', isActive: true }
//               ],
//               logo: {
//                 text: 'Glow&Co',
//                 highlightText: '',
//                 icon: 'Package',
//                 logoUrl: '/logo.png'
//               }
//             });
//           }
//         } else {
//           // Fallback to defaults
//           setNavbarData({
//             items: [
//               { id: '1', name: 'Home', href: '/', icon: 'Home', isActive: true },
//               { id: '2', name: 'Products', href: '/products', icon: 'Sparkles', isActive: true },
//               { id: '3', name: 'Track Order', href: '/track', icon: 'MapPin', isActive: true },
//               { id: '4', name: 'About', href: '/about', icon: 'Flower2', isActive: true },
//               { id: '5', name: 'Contact', href: '/contact', icon: 'Phone', isActive: true }
//             ],
//             logo: {
//               text: 'Glow&Co',
//               highlightText: 'BEAUTY',
//               icon: 'Package',
//               logoUrl: '/logo.png'
//             }
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching navbar:', error);
//         // Set default values if API fails
//         setNavbarData({
//           items: [
//             { id: '1', name: 'Home', href: '/', icon: 'Home', isActive: true },
//             { id: '2', name: 'Products', href: '/products', icon: 'Sparkles', isActive: true },
//             { id: '3', name: 'Track Order', href: '/track', icon: 'MapPin', isActive: true },
//             { id: '4', name: 'About', href: '/about', icon: 'Flower2', isActive: true },
//             { id: '5', name: 'Contact', href: '/contact', icon: 'Phone', isActive: true }
//           ],
//           logo: {
//             text: 'Glow&Co',
//             highlightText: 'BEAUTY',
//             icon: 'Package',
//             logoUrl: '/logo.png'
//           }
//         });
//       } finally {
//         setNavbarLoading(false);
//       }
//     };

//     fetchNavbar();
//   }, []);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close search on click outside (desktop)
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowResults(false);
//         if (!event.target.closest('.search-trigger')) {
//           setSearchOpen(false);
//         }
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Close mobile search on click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target) && !event.target.closest('.mobile-search-trigger')) {
//         setMobileSearchOpen(false);
//         setShowResults(false);
//         setSearchQuery('');
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMenuOpen]);

//   useEffect(() => {
//     if (!authLoading) {
//       fetchCartCount();
//     }
//   }, [user, authLoading]);
  
//   // Check user state
//   const checkUserState = () => {
//     if (typeof window !== 'undefined') {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           setUser(parsedUser);
//           setProfileImageError(false);
//         } catch (error) {
//           console.error('Error parsing user data:', error);
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }
//       setAuthLoading(false);
//     }
//   };

//   // Fetch cart count
//   const fetchCartCount = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else {
//         const sessionId = localStorage.getItem('cartSessionId');
//         if (sessionId) {
//           headers['x-session-id'] = sessionId;
//         }
//       }
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://http://localhost:3000'}/api/cart`, { headers });
      
//       if (response.ok) {
//         const data = await response.json();
//         setCartCount(data.data?.totalItems || 0);
//       } else {
//         setCartCount(0);
//       }
//     } catch (error) {
//       console.error('Fetch cart count error:', error);
//       setCartCount(0);
//     }
//   };

//   useEffect(() => {
//     checkUserState();
//     fetchCartCount();

//     const handleAuthChange = () => {
//       checkUserState();
//       fetchCartCount();
//     };

//     window.addEventListener('auth-change', handleAuthChange);
//     window.addEventListener('focus', handleAuthChange);
//     window.addEventListener('cart-update', fetchCartCount);

//     return () => {
//       window.removeEventListener('auth-change', handleAuthChange);
//       window.removeEventListener('focus', handleAuthChange);
//       window.removeEventListener('cart-update', fetchCartCount);
//     };
//   }, []);

//   useEffect(() => {
//     fetchCartCount();
//   }, [pathname]);

//   useEffect(() => {
//     const handleCartUpdate = () => {
//       fetchCartCount();
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
    
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, []);

//   // Get icon component from name
//   const getIcon = (iconName) => {
//     const Icon = ICON_MAP[iconName];
//     return Icon || Package;
//   };

//   // Get navbar items from backend or use defaults
//   const getNavItems = () => {
//     if (navbarData?.items && navbarData.items.length > 0) {
//       return navbarData.items.filter(item => item.isActive !== false);
//     }
//     return [
//       { id: '1', name: 'Home', href: '/', icon: 'Home' },
//       { id: '2', name: 'Products', href: '/products', icon: 'Sparkles' },
//       { id: '3', name: 'Track Order', href: '/track', icon: 'MapPin' },
//       { id: '4', name: 'About', href: '/about', icon: 'Flower2' },
//       { id: '5', name: 'Contact', href: '/contact', icon: 'Phone' },
//     ];
//   };

//   const navItems = getNavItems();

//   const isActive = (path) => {
//     if (path === '/') return pathname === '/';
//     return pathname.startsWith(path);
//   };

//   const performSearch = async (query) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       setShowResults(false);
//       return;
//     }
    
//     setSearchLoading(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://http://localhost:3000'}/api/products?search=${encodeURIComponent(query)}&limit=5`);
//       const data = await response.json();
      
//       if (data.success && data.data && data.data.length > 0) {
//         setSearchResults(data.data);
//         setShowResults(true);
//       } else {
//         setSearchResults([]);
//         setShowResults(false);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setSearchResults([]);
//       setShowResults(false);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchQuery) {
//         performSearch(searchQuery);
//       } else {
//         setSearchResults([]);
//         setShowResults(false);
//       }
//     }, 300);
//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchOpen(false);
//       setMobileSearchOpen(false);
//       setSearchQuery('');
//       setShowResults(false);
//     }
//   };

//   // ✅ FIXED: Updated handleResultClick with timeout and proper state management
//   const handleResultClick = (result) => {
//     const productId = result._id;
//     const productSlug = result.slug || productId;
    
//     if (productSlug) {
//       // Close all search UI first
//       setSearchOpen(false);
//       setMobileSearchOpen(false);
//       setSearchQuery('');
//       setShowResults(false);
      
//       // Use setTimeout to ensure state updates complete before navigation
//       setTimeout(() => {
//         router.push(`/product/${productSlug}`);
//       }, 50);
//     } else {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };
  
//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     setCartCount(0);
//     setUserMenuOpen(false);
//     window.dispatchEvent(new Event('cart-update'));
//     window.dispatchEvent(new Event('auth-change'));
//     toast.success('Logged out successfully!');
//     router.push('/');
//   };

//   // ========== GET DASHBOARD LINK BASED ON ROLE ==========
//   const getDashboardLink = () => {
//     if (!user) return '/';
    
//     if (['admin', 'super_admin', 'moderator'].includes(user.role)) {
//       return '/authorize/dashboard';
//     }
    
//     if (user.role === 'call_center_agent') {
//       return '/agent/dashboard';
//     }
    
//     return '/customer/dashboard';
//   };

//   // ========== GET SETTINGS LINK BASED ON ROLE ==========
//   const getSettingsLink = () => {
//     if (!user) return '/';
    
//     if (['admin', 'super_admin', 'moderator'].includes(user.role)) {
//       return '/authorize/settings';
//     }
    
//     if (user.role === 'call_center_agent') {
//       return '/agent/settings';
//     }
    
//     return '/customer/settings';
//   };

//   const getDisplayName = () => {
//     if (!user) return '';
//     return user.companyName || user.contactPerson || user.email?.split('@')[0] || 'User';
//   };

//   const getInitials = () => {
//     if (!user) return 'U';
//     const name = getDisplayName();
//     return name.charAt(0).toUpperCase();
//   };

//   const getProfilePicture = () => {
//     return user?.profilePicture || user?.photoURL || null;
//   };

//   // Get logo URL with proper quality settings
//   const getLogoUrl = (url) => {
//     if (!url) return '/logo.png';
    
//     // If it's a Cloudinary URL, add optimization params for quality
//     if (url.includes('cloudinary.com')) {
//       const parts = url.split('/upload/');
//       if (parts.length === 2) {
//         // Better quality settings - no forced height
//         return `${parts[0]}/upload/f_auto,q_auto:good,fl_preserve_transparency/${parts[1]}`;
//       }
//     }
//     return url;
//   };

//   // Check if user has authorize role
//   const isAuthorizeRole = user && ['admin', 'super_admin', 'moderator'].includes(user.role);

//   if (authLoading || navbarLoading) {
//     return (
//       <div className="fixed top-0 z-50 w-full bg-white border-b border-[#F7C7D3]">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             <div className="w-10 h-10 bg-[#F7C7D3] rounded animate-pulse"></div>
//             <div className="flex gap-4">
//               <div className="w-8 h-8 bg-[#F7C7D3] rounded animate-pulse"></div>
//               <div className="w-8 h-8 bg-[#F7C7D3] rounded animate-pulse"></div>
//               <div className="w-16 h-8 bg-[#F7C7D3] rounded animate-pulse"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Main Navbar */}
//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
//       }`}>
//       <div className="container mx-auto px-4">
//   <div className="flex items-center justify-between h-16">

//     {/* Left Group: Menu Button + Logo (tight together on mobile) */}
//     <div className="flex items-center gap-1 md:gap-0">
//       <button
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//         className="md:hidden p-2 -ml-1 rounded-lg hover:bg-[#F7C7D3]/30 transition-all duration-200"
//       >
//         <Menu className="w-5 h-5 text-[#EE4275]" />
//       </button>

//       <Link href="/" className="flex items-center flex-shrink-0 group">
//         <div className="relative w-24 h-11 -ml-5 lg:-ml-0 md:w-32 md:h-14 transition-transform group-hover:scale-105 duration-300">
//           {navbarData?.logo?.logoUrl ? (
//             <img 
//               src={getLogoUrl(navbarData.logo.logoUrl)}
//               alt={navbarData.logo.text || 'Glow&Co'}
//               className="w-full h-full object-contain"
//               style={{ background: 'transparent' }}
//             />
//           ) : (
//             <img 
//               src="/logo.png"
//               alt="Glow&Co Logo"
//               className="w-full h-full object-contain"
//             />
//           )}
//         </div>
//       </Link>
//     </div>

//     {/* Desktop Navigation - Center */}
//     <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
//       {navItems.map((item) => {
//         const Icon = getIcon(item.icon);
//         return (
//           <Link
//             key={item.id || item.name}
//             href={item.href}
//             className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//               isActive(item.href)
//                 ? 'text-[#EE4275]'
//                 : 'text-gray-600 hover:text-[#EE4275]'
//             }`}
//             style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
//           >
//             {item.name}
//             {isActive(item.href) && (
//               <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-[#EE4275] rounded-full"></span>
//             )}
//           </Link>
//         );
//       })}
//     </div>

//     {/* Right Section - Search Icon, Cart, Sign In */}
//     <div className="flex items-center gap-1 sm:gap-2">
      
//       {/* Desktop Search - Full width input that doesn't overlap */}
//       <div className="hidden md:block relative" ref={searchRef}>
//         <div className="flex items-center">
//           {!searchOpen ? (
//             <button
//               onClick={() => setSearchOpen(true)}
//               className="search-trigger p-2 rounded-lg hover:bg-[#F7C7D3]/30 transition-all duration-200"
//             >
//               <Search className="w-4.5 h-4.5 text-[#EE4275]" />
//             </button>
//           ) : (
//             <div className="relative">
//               <form onSubmit={handleSearchSubmit} className="relative">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search beauty products..."
//                   className="w-80 px-4 py-2 pr-20 text-sm text-gray-700 bg-[#F7C7D3]/10 border border-[#EE4275]/20 rounded-lg focus:outline-none focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all shadow-sm"
//                   style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
//                   autoFocus
//                 />
//                 <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
//                   <button type="submit" className="p-1">
//                     {searchLoading ? (
//                       <div className="w-3.5 h-3.5 border-2 border-[#EE4275] border-t-transparent rounded-full animate-spin"></div>
//                     ) : (
//                       <Search className="w-3.5 h-3.5 text-[#EE4275]" />
//                     )}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setSearchOpen(false);
//                       setSearchQuery('');
//                       setShowResults(false);
//                     }}
//                     className="p-1 text-gray-400 hover:text-[#EE4275] transition-colors"
//                   >
//                     <X className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               </form>

//               {/* Search Results Dropdown */}
//               {showResults && searchResults.length > 0 && (
//                 <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-[#EE4275]/10 max-h-96 overflow-y-auto z-50">
//                   <div className="py-2">
//                     {searchResults.map((product) => (
//                       <button
//                         key={product._id}
//                         onMouseDown={(e) => {
//                           e.preventDefault();
//                           handleResultClick(product);
//                         }}
//                         className="w-full px-4 py-3 text-left hover:bg-[#F7C7D3]/20 transition-colors flex items-center gap-3 border-b border-[#F7C7D3]/30 last:border-0"
//                       >
//                         {product.images && product.images.length > 0 ? (
//                           <img 
//                             src={product.images[0]?.url || product.images[0]} 
//                             alt={product.productName || product.name} 
//                             className="w-10 h-10 rounded-lg object-cover bg-[#F7C7D3]/20"
//                           />
//                         ) : (
//                           <div className="w-10 h-10 rounded-lg bg-[#F7C7D3]/20 flex items-center justify-center">
//                             <Package className="w-5 h-5 text-[#EE4275]" />
//                           </div>
//                         )}
//                         <div className="flex-1">
//                           <p className="font-medium text-gray-700 text-sm line-clamp-1" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
//                             {product.productName || product.name || product.title}
//                           </p>
//                           <div className="flex items-center gap-2 mt-0.5">
//                             <p className="text-sm font-semibold text-[#EE4275]" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
//                               ৳{product.discountPrice || product.regularPrice || product.price}
//                             </p>
//                             {product.discountPrice && product.regularPrice && (
//                               <p className="text-xs text-gray-400 line-through">
//                                 ৳{product.regularPrice}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                     <button
//                       onClick={handleSearchSubmit}
//                       className="w-full px-4 py-2.5 text-center text-sm text-[#EE4275] hover:bg-[#F7C7D3]/20 font-medium border-t border-[#F7C7D3]/30 transition-colors"
//                       style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
//                     >
//                       View all results for "{searchQuery}" →
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Search Trigger */}
//       <button
//         onClick={() => setMobileSearchOpen(true)}
//         className="mobile-search-trigger md:hidden p-2 rounded-lg hover:bg-[#F7C7D3]/30 transition-all duration-200"
//       >
//         <Search className="w-4.5 h-4.5 text-[#EE4275]" />
//       </button>

//       {/* Cart Icon - Opens Sidebar */}
//       <button 
//         onClick={() => setIsCartOpen(true)} 
//         className="relative p-2 rounded-lg hover:bg-[#F7C7D3]/30 transition-all duration-200 group"
//       >
//         <ShoppingCart className="w-4.5 h-4.5 text-[#EE4275] group-hover:scale-105 transition-transform" />
//         {cartCount > 0 && (
//           <span className="absolute -top-1 -right-1 bg-[#EE4275] text-white text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 shadow-sm" style={{ fontFamily: '"Playfair Display"' }}>
//             {cartCount > 9 ? '9+' : cartCount}
//           </span>
//         )}
//       </button>

//       {/* Sign In / User Menu */}
//       {user ? (
//         <div className="relative">
//           <button
//             onClick={() => setUserMenuOpen(!userMenuOpen)}
//             className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#F7C7D3]/30 transition-all duration-200 text-sm"
//           >
//             {getProfilePicture() && !profileImageError ? (
//               <img 
//                 src={getProfilePicture()} 
//                 alt={getDisplayName()}
//                 className="w-7 h-7 rounded-full object-cover border-2 border-[#EE4275]/30"
//               />
//             ) : (
//               <div className="w-7 h-7 rounded-full bg-[#EE4275] flex items-center justify-center text-white font-semibold text-xs shadow-sm">
//                 {getInitials()}
//               </div>
//             )}
//             <span className="hidden sm:inline text-gray-600 font-medium text-sm max-w-[100px] truncate" style={{ fontFamily: '"Playfair Display"' }}>
//               {getDisplayName()}
//             </span>
//             <ChevronDown className={`w-3.5 h-3.5 text-[#EE4275] transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
//           </button>

//           {userMenuOpen && (
//             <>
//               <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#EE4275]/10 overflow-hidden z-50 animate-fadeIn">
//                 <div className="px-4 py-3 border-b border-[#F7C7D3]/30 bg-[#F7C7D3]/10">
//                   <p className="text-gray-700 font-semibold text-sm truncate" style={{ fontFamily: '"Playfair Display"' }}>{getDisplayName()}</p>
//                   <p className="text-[#EE4275] text-xs truncate mt-0.5" style={{ fontFamily: '"Playfair Display"' }}>{user.email}</p>
//                   <div className="mt-1.5">
//                     <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
//                       user.role === 'super_admin' ? 'bg-yellow-500/20 text-yellow-600' :
//                       user.role === 'admin' ? 'bg-[#EE4275]/20 text-[#EE4275]' :
//                       user.role === 'moderator' ? 'bg-green-500/20 text-green-600' :
//                       user.role === 'call_center_agent' ? 'bg-purple-500/20 text-purple-600' :
//                       'bg-[#F7C7D3]/30 text-gray-600'
//                     }`} style={{ fontFamily: '"Playfair Display"' }}>
//                       {user.role === 'call_center_agent' ? 'Call Center Agent' :
//                        user.role === 'super_admin' ? 'Super Admin' :
//                        user.role === 'admin' ? 'Admin' :
//                        user.role === 'moderator' ? 'Moderator' :
//                        'Customer'}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="py-2">
//                   {/* Dashboard Link - Force full page reload */}
//                   <div
//                     onClick={() => {
//                       setUserMenuOpen(false);
//                       window.location.href = getDashboardLink();
//                     }}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#F7C7D3]/20 transition-colors cursor-pointer"
//                     style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
//                   >
//                     <LayoutDashboard className="w-4 h-4 text-[#EE4275]" />
//                     <span>Dashboard</span>
//                   </div>

//                   {/* Settings Link - Force full page reload */}
//                   <div
//                     onClick={() => {
//                       setUserMenuOpen(false);
//                       window.location.href = getSettingsLink();
//                     }}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#F7C7D3]/20 transition-colors cursor-pointer"
//                     style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
//                   >
//                     <Settings className="w-4 h-4 text-[#EE4275]" />
//                     <span>Settings</span>
//                   </div>
                  
//                   <div className="border-t border-[#F7C7D3]/30 my-1"></div>
                  
//                   <button 
//                     onClick={() => { setUserMenuOpen(false); logout(); }} 
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full"
//                     style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       ) : (
//         <Link 
//           href="/login" 
//           className="hidden sm:block px-5 py-1.5 rounded-lg text-sm font-medium text-white bg-[#EE4275] hover:bg-[#EE4275]/80 transition-all duration-200 shadow-sm hover:shadow-md"
//           style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
//         >
//           Sign In
//         </Link>
//       )}
//     </div>

//   </div>
// </div>
//       </nav>

//       {/* Mobile Search Overlay - Opens below navbar */}
//       {mobileSearchOpen && (
//         <div className="fixed top-16 left-0 right-0 z-40 bg-white shadow-lg border-b border-[#EE4275]/10 animate-slideDown md:hidden">
//           <div className="container mx-auto px-4 py-3" ref={mobileSearchRef}>
//             <form onSubmit={handleSearchSubmit} className="relative">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search beauty products..."
//                 className="w-full px-4 py-3 pr-20 text-sm text-gray-700 bg-[#F7C7D3]/10 border border-[#EE4275]/20 rounded-lg focus:outline-none focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all"
//                 style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
//                 autoFocus
//               />
//               <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
//                 <button type="submit" className="p-1.5">
//                   {searchLoading ? (
//                     <div className="w-4 h-4 border-2 border-[#EE4275] border-t-transparent rounded-full animate-spin"></div>
//                   ) : (
//                     <Search className="w-4 h-4 text-[#EE4275]" />
//                   )}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setMobileSearchOpen(false);
//                     setSearchQuery('');
//                     setShowResults(false);
//                   }}
//                   className="p-1.5 text-gray-400 hover:text-[#EE4275] transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             </form>

//             {/* Mobile Search Results */}
//             {showResults && searchResults.length > 0 && (
//               <div className="mt-3 bg-white rounded-lg border border-[#EE4275]/10 max-h-96 overflow-y-auto">
//                 {searchResults.map((product) => (
//                   <button
//                     key={product._id}
//                     onMouseDown={(e) => {
//                       e.preventDefault();
//                       handleResultClick(product);
//                     }}
//                     className="w-full px-3 py-3 text-left hover:bg-[#F7C7D3]/20 transition-colors flex items-center gap-3 border-b border-[#F7C7D3]/30 last:border-0"
//                   >
//                     {product.images && product.images.length > 0 ? (
//                       <img 
//                         src={product.images[0]?.url || product.images[0]} 
//                         alt={product.productName || product.name} 
//                         className="w-12 h-12 rounded-lg object-cover bg-[#F7C7D3]/20"
//                       />
//                     ) : (
//                       <div className="w-12 h-12 rounded-lg bg-[#F7C7D3]/20 flex items-center justify-center">
//                         <Package className="w-6 h-6 text-[#EE4275]" />
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-700 text-sm line-clamp-1" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
//                         {product.productName || product.name || product.title}
//                       </p>
//                       <p className="text-sm font-semibold text-[#EE4275] mt-0.5" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
//                         ৳{product.discountPrice || product.regularPrice || product.price}
//                       </p>
//                     </div>
//                   </button>
//                 ))}
//                 <button
//                   onClick={handleSearchSubmit}
//                   className="w-full px-4 py-3 text-center text-sm text-[#EE4275] hover:bg-[#F7C7D3]/20 font-medium border-t border-[#F7C7D3]/30"
//                   style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
//                 >
//                   View all results for "{searchQuery}" →
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Mobile Menu Sidebar */}
//       <div className={`fixed inset-0 z-50 md:hidden ${isMenuOpen ? 'visible' : 'invisible'}`}>
//         <div className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
        
//         <div className={`absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//           <div className="flex flex-col h-full">
//             {/* Header */}
//             <div className="flex items-center justify-between p-5 border-b border-[#F7C7D3]/30">
//               <div className="flex items-center space-x-2.5">
//                 <div className="w-8 h-8">
//                   {navbarData?.logo?.logoUrl ? (
//                     <img 
//                       src={getLogoUrl(navbarData.logo.logoUrl)} 
//                       alt={navbarData.logo.text || 'Glow&Co'} 
//                       className="w-full h-full object-contain"
//                     />
//                   ) : (
//                     <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
//                   )}
//                 </div>
//                 <div>
//                   <span className="font-bold text-gray-700 text-base" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
//                     {navbarData?.logo?.text || 'Glow&Co'}
//                     {navbarData?.logo?.highlightText && (
//                       <span className="text-[#EE4275]">{navbarData.logo.highlightText}</span>
//                     )}
//                   </span>
//                   <span className="text-[10px] text-[#EE4275] block -mt-1 tracking-wider" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>BEAUTY</span>
//                 </div>
//               </div>
//               <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#F7C7D3]/20 transition-colors">
//                 <X className="w-5 h-5 text-[#EE4275]" />
//               </button>
//             </div>

//             {/* Navigation Items */}
//             <div className="flex-1 overflow-y-auto py-3">
//               {navItems.map((item) => {
//                 const Icon = getIcon(item.icon);
//                 return (
//                   <Link
//                     key={item.id || item.name}
//                     href={item.href}
//                     onClick={() => setIsMenuOpen(false)}
//                     className={`flex items-center gap-3 px-5 py-3 mx-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                       isActive(item.href) 
//                         ? 'text-[#EE4275] font-semibold' 
//                         : 'text-gray-600 hover:text-[#EE4275] hover:bg-[#F7C7D3]/20'
//                     }`}
//                     style={{
//                       fontFamily: '"Playfair Display", "Georgia", serif',
//                       borderLeft: isActive(item.href) ? '3px solid #EE4275' : 'none',
//                       paddingLeft: isActive(item.href) ? '17px' : '20px',
//                     }}
//                   >
//                     <Icon className={`w-4.5 h-4.5 ${isActive(item.href) ? 'text-[#EE4275]' : 'text-gray-400'}`} />
//                     <span>{item.name}</span>
//                   </Link>
//                 );
//               })}

//               <div className="my-3 mx-5 h-px bg-gradient-to-r from-[#EE4275]/20 via-[#EE4275]/40 to-[#EE4275]/20"></div>

//               {/* Auth Section for Mobile */}
//               {!user ? (
//                 <div className="px-5 mt-3">
//                   <Link
//                     href="/login"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-[#EE4275] text-white hover:bg-[#EE4275]/80 transition-all shadow-sm"
//                     style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
//                   >
//                     Sign In
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="px-5 mt-3">
//                   <div className="flex items-center gap-3 p-3 bg-[#F7C7D3]/10 rounded-lg mb-3">
//                     {getProfilePicture() && !profileImageError ? (
//                       <img src={getProfilePicture()} alt={getDisplayName()} className="w-10 h-10 rounded-full object-cover border-2 border-[#EE4275]/30" />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-[#EE4275] flex items-center justify-center text-white font-semibold text-sm">
//                         {getInitials()}
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-700 text-sm" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>{getDisplayName()}</p>
//                       <p className="text-[#EE4275] text-xs truncate" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>{user.email}</p>
//                     </div>
//                   </div>
                  
//                   {/* Dashboard in Mobile Menu - Force full page reload */}
//                   <div
//                     onClick={() => {
//                       setIsMenuOpen(false);
//                       window.location.href = getDashboardLink();
//                     }}
//                     className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-[#F7C7D3]/20 transition-colors mb-1 cursor-pointer"
//                     style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
//                   >
//                     <LayoutDashboard className="w-4 h-4 text-[#EE4275]" />
//                     Dashboard
//                   </div>

//                   {/* Settings in Mobile Menu - Force full page reload */}
//                   <div
//                     onClick={() => {
//                       setIsMenuOpen(false);
//                       window.location.href = getSettingsLink();
//                     }}
//                     className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-[#F7C7D3]/20 transition-colors mb-2 cursor-pointer"
//                     style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
//                   >
//                     <Settings className="w-4 h-4 text-[#EE4275]" />
//                     Settings
//                   </div>
                  
//                   <button
//                     onClick={() => { setIsMenuOpen(false); logout(); }}
//                     className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
//                     style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
//                   >
//                     <LogOut className="w-4 h-4" />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Cart Sidebar */}
//       <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

//       {/* Spacer */}
//       {/* <div className="h-16"></div> */}

//       <style jsx>{`
//         @keyframes slideLeft {
//           from {
//             opacity: 0;
//             transform: translateX(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//         .animate-slideLeft {
//           animation: slideLeft 0.25s ease-out;
//         }
        
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-slideDown {
//           animation: slideDown 0.25s ease-out;
//         }
        
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
        
//         .w-4.5 {
//           width: 1.125rem;
//         }
//         .h-4.5 {
//           height: 1.125rem;
//         }
//       `}</style>
//     </>
//   );
// }

'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LogOut, 
  User, 
  LayoutDashboard, 
  ShoppingCart,
  Search,
  X,
  Home,
  Package,
  Info,
  Phone,
  Menu,
  UserCircle,
  ChevronDown,
  MapPin,
  Zap,
  Heart,
  Sparkles,
  Settings,
  Flower2
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../CartSidebar';

// Icon mapping for navbar items
const ICON_MAP = {
  Home: Home,
  Zap: Zap,
  MapPin: MapPin,
  Info: Info,
  Phone: Phone,
  Package: Package,
  User: User,
  Heart: Heart,
  Sparkles: Sparkles,
  Flower2: Flower2,
};

export default function Navbar() {
  const [navbarData, setNavbarData] = useState(null);
  const [navbarLoading, setNavbarLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [authLoading, setAuthLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on the home page
  const isHomePage = pathname === '/';

  // Fetch navbar data from PUBLIC endpoint (no auth required)
  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        // ✅ PUBLIC endpoint - no token needed
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://http://localhost:3000'}/api/navbar`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setNavbarData(data.data);
          } else {
            // Set default values if API fails
            setNavbarData({
              items: [
                { id: '1', name: 'Home', href: '/', icon: 'Home', isActive: true },
                { id: '2', name: 'Products', href: '/products', icon: 'Package', isActive: true },
                { id: '3', name: 'Track Order', href: '/track', icon: 'MapPin', isActive: true },
                { id: '4', name: 'About', href: '/about', icon: 'Flower2', isActive: true },
                { id: '5', name: 'Contact', href: '/contact', icon: 'Phone', isActive: true }
              ],
              logo: {
                text: 'Glow&Co',
                highlightText: '',
                icon: 'Package',
                logoUrl: '/logo.png'
              }
            });
          }
        } else {
          // Fallback to defaults
          setNavbarData({
            items: [
              { id: '1', name: 'Home', href: '/', icon: 'Home', isActive: true },
              { id: '2', name: 'Products', href: '/products', icon: 'Sparkles', isActive: true },
              { id: '3', name: 'Track Order', href: '/track', icon: 'MapPin', isActive: true },
              { id: '4', name: 'About', href: '/about', icon: 'Flower2', isActive: true },
              { id: '5', name: 'Contact', href: '/contact', icon: 'Phone', isActive: true }
            ],
            logo: {
              text: 'Glow&Co',
              highlightText: 'BEAUTY',
              icon: 'Package',
              logoUrl: '/logo.png'
            }
          });
        }
      } catch (error) {
        console.error('Error fetching navbar:', error);
        // Set default values if API fails
        setNavbarData({
          items: [
            { id: '1', name: 'Home', href: '/', icon: 'Home', isActive: true },
            { id: '2', name: 'Products', href: '/products', icon: 'Sparkles', isActive: true },
            { id: '3', name: 'Track Order', href: '/track', icon: 'MapPin', isActive: true },
            { id: '4', name: 'About', href: '/about', icon: 'Flower2', isActive: true },
            { id: '5', name: 'Contact', href: '/contact', icon: 'Phone', isActive: true }
          ],
          logo: {
            text: 'Glow&Co',
            highlightText: 'BEAUTY',
            icon: 'Package',
            logoUrl: '/logo.png'
          }
        });
      } finally {
        setNavbarLoading(false);
      }
    };

    fetchNavbar();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search on click outside (desktop)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        if (!event.target.closest('.search-trigger')) {
          setSearchOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile search on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target) && !event.target.closest('.mobile-search-trigger')) {
        setMobileSearchOpen(false);
        setShowResults(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!authLoading) {
      fetchCartCount();
    }
  }, [user, authLoading]);
  
  // Check user state
  const checkUserState = () => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setProfileImageError(false);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    }
  };

  // Fetch cart count
  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        const sessionId = localStorage.getItem('cartSessionId');
        if (sessionId) {
          headers['x-session-id'] = sessionId;
        }
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://http://localhost:3000'}/api/cart`, { headers });
      
      if (response.ok) {
        const data = await response.json();
        setCartCount(data.data?.totalItems || 0);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error('Fetch cart count error:', error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    checkUserState();
    fetchCartCount();

    const handleAuthChange = () => {
      checkUserState();
      fetchCartCount();
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('focus', handleAuthChange);
    window.addEventListener('cart-update', fetchCartCount);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('focus', handleAuthChange);
      window.removeEventListener('cart-update', fetchCartCount);
    };
  }, []);

  useEffect(() => {
    fetchCartCount();
  }, [pathname]);

  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartCount();
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cart-update', handleCartUpdate);
    };
  }, []);

  // Get icon component from name
  const getIcon = (iconName) => {
    const Icon = ICON_MAP[iconName];
    return Icon || Package;
  };

  // Get navbar items from backend or use defaults
  const getNavItems = () => {
    if (navbarData?.items && navbarData.items.length > 0) {
      return navbarData.items.filter(item => item.isActive !== false);
    }
    return [
      { id: '1', name: 'Home', href: '/', icon: 'Home' },
      { id: '2', name: 'Products', href: '/products', icon: 'Sparkles' },
      { id: '3', name: 'Track Order', href: '/track', icon: 'MapPin' },
      { id: '4', name: 'About', href: '/about', icon: 'Flower2' },
      { id: '5', name: 'Contact', href: '/contact', icon: 'Phone' },
    ];
  };

  const navItems = getNavItems();

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    setSearchLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://http://localhost:3000'}/api/products?search=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        setSearchResults(data.data);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowResults(false);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setMobileSearchOpen(false);
      setSearchQuery('');
      setShowResults(false);
    }
  };

  // ✅ FIXED: Updated handleResultClick with timeout and proper state management
  const handleResultClick = (result) => {
    const productId = result._id;
    const productSlug = result.slug || productId;
    
    if (productSlug) {
      // Close all search UI first
      setSearchOpen(false);
      setMobileSearchOpen(false);
      setSearchQuery('');
      setShowResults(false);
      
      // Use setTimeout to ensure state updates complete before navigation
      setTimeout(() => {
        router.push(`/product/${productSlug}`);
      }, 50);
    } else {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCartCount(0);
    setUserMenuOpen(false);
    window.dispatchEvent(new Event('cart-update'));
    window.dispatchEvent(new Event('auth-change'));
    toast.success('Logged out successfully!');
    router.push('/');
  };

  // ========== GET DASHBOARD LINK BASED ON ROLE ==========
  const getDashboardLink = () => {
    if (!user) return '/';
    
    if (['admin', 'super_admin', 'moderator'].includes(user.role)) {
      return '/authorize/dashboard';
    }
    
    if (user.role === 'call_center_agent') {
      return '/agent/dashboard';
    }
    
    return '/customer/dashboard';
  };

  // ========== GET SETTINGS LINK BASED ON ROLE ==========
  const getSettingsLink = () => {
    if (!user) return '/';
    
    if (['admin', 'super_admin', 'moderator'].includes(user.role)) {
      return '/authorize/settings';
    }
    
    if (user.role === 'call_center_agent') {
      return '/agent/settings';
    }
    
    return '/customer/settings';
  };

  const getDisplayName = () => {
    if (!user) return '';
    return user.companyName || user.contactPerson || user.email?.split('@')[0] || 'User';
  };

  const getInitials = () => {
    if (!user) return 'U';
    const name = getDisplayName();
    return name.charAt(0).toUpperCase();
  };

  const getProfilePicture = () => {
    return user?.profilePicture || user?.photoURL || null;
  };

  // Get logo URL with proper quality settings
  const getLogoUrl = (url) => {
    if (!url) return '/logo.png';
    
    // If it's a Cloudinary URL, add optimization params for quality
    if (url.includes('cloudinary.com')) {
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        // Better quality settings - no forced height
        return `${parts[0]}/upload/f_auto,q_auto:good,fl_preserve_transparency/${parts[1]}`;
      }
    }
    return url;
  };

  // Check if user has authorize role
  const isAuthorizeRole = user && ['admin', 'super_admin', 'moderator'].includes(user.role);

  // Determine if navbar should be transparent (only on home page when not scrolled)
  const isTransparent = isHomePage && !scrolled;

  if (authLoading || navbarLoading) {
    return (
      <div className={`fixed top-0 z-50 w-full ${isHomePage ? 'bg-white/80 backdrop-blur-sm' : 'bg-white'} border-b border-[#F7C7D3]`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="w-10 h-10 bg-[#F7C7D3] rounded animate-pulse"></div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#F7C7D3] rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-[#F7C7D3] rounded animate-pulse"></div>
              <div className="w-16 h-8 bg-[#F7C7D3] rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent 
          ? 'bg-transparent' 
          : isHomePage && scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-lg'
            : 'bg-white shadow-sm'
      }`}>
      <div className="container mx-auto px-4">
  <div className="flex items-center justify-between h-16">

    {/* Left Group: Menu Button + Logo (tight together on mobile) */}
    <div className="flex items-center gap-1 md:gap-0">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 -ml-1 rounded-lg transition-all duration-200"
      >
        <Menu className={`w-5 h-5 ${
          isTransparent ? 'text-white' : 'text-[#EE4275]'
        }`} />
      </button>

      <Link href="/" className="flex items-center flex-shrink-0 group">
        <div className="relative w-24 h-11 -ml-5 lg:-ml-0 md:w-32 md:h-14 transition-transform group-hover:scale-105 duration-300">
          {navbarData?.logo?.logoUrl ? (
            <img 
              src={getLogoUrl(navbarData.logo.logoUrl)}
              alt={navbarData.logo.text || 'Glow&Co'}
              className="w-full h-full object-contain"
              style={{ background: 'transparent' }}
            />
          ) : (
            <img 
              src="/logo.png"
              alt="Glow&Co Logo"
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </Link>
    </div>

    {/* Desktop Navigation - Center */}
    <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
      {navItems.map((item) => {
        const Icon = getIcon(item.icon);
        return (
          <Link
            key={item.id || item.name}
            href={item.href}
            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(item.href)
                ? isTransparent ? 'text-white' : 'text-[#EE4275]'
                : isTransparent ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-[#EE4275]'
            }`}
            style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
          >
            {item.name}
            {isActive(item.href) && (
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full ${
                isTransparent ? 'bg-white' : 'bg-[#EE4275]'
              }`}></span>
            )}
          </Link>
        );
      })}
    </div>

    {/* Right Section - Search Icon, Cart, Sign In */}
    <div className="flex items-center gap-1 sm:gap-2">
      
      {/* Desktop Search - Full width input that doesn't overlap */}
      <div className="hidden md:block relative" ref={searchRef}>
        <div className="flex items-center">
          {!searchOpen ? (
            <button
              onClick={() => setSearchOpen(true)}
              className="search-trigger p-2 rounded-lg transition-all duration-200"
            >
              <Search className={`w-4.5 h-4.5 ${
                isTransparent ? 'text-white' : 'text-[#EE4275]'
              }`} />
            </button>
          ) : (
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search beauty products..."
                  className="w-80 px-4 py-2 pr-20 text-sm text-gray-700 bg-white border border-[#EE4275]/20 rounded-lg focus:outline-none focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all shadow-lg"
                  style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
                  autoFocus
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button type="submit" className="p-1">
                    {searchLoading ? (
                      <div className="w-3.5 h-3.5 border-2 border-[#EE4275] border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Search className="w-3.5 h-3.5 text-[#EE4275]" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                      setShowResults(false);
                    }}
                    className="p-1 text-gray-400 hover:text-[#EE4275] transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-[#EE4275]/10 max-h-96 overflow-y-auto z-50">
                  <div className="py-2">
                    {searchResults.map((product) => (
                      <button
                        key={product._id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleResultClick(product);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-[#F7C7D3]/20 transition-colors flex items-center gap-3 border-b border-[#F7C7D3]/30 last:border-0"
                      >
                        {product.images && product.images.length > 0 ? (
                          <img 
                            src={product.images[0]?.url || product.images[0]} 
                            alt={product.productName || product.name} 
                            className="w-10 h-10 rounded-lg object-cover bg-[#F7C7D3]/20"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-[#F7C7D3]/20 flex items-center justify-center">
                            <Package className="w-5 h-5 text-[#EE4275]" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-700 text-sm line-clamp-1" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                            {product.productName || product.name || product.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-sm font-semibold text-[#EE4275]" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                              ৳{product.discountPrice || product.regularPrice || product.price}
                            </p>
                            {product.discountPrice && product.regularPrice && (
                              <p className="text-xs text-gray-400 line-through">
                                ৳{product.regularPrice}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full px-4 py-2.5 text-center text-sm text-[#EE4275] hover:bg-[#F7C7D3]/20 font-medium border-t border-[#F7C7D3]/30 transition-colors"
                      style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
                    >
                      View all results for "{searchQuery}" →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Trigger */}
      <button
        onClick={() => setMobileSearchOpen(true)}
        className="mobile-search-trigger md:hidden p-2 rounded-lg transition-all duration-200"
      >
        <Search className={`w-4.5 h-4.5 ${
          isTransparent ? 'text-white' : 'text-[#EE4275]'
        }`} />
      </button>

      {/* Cart Icon - Opens Sidebar */}
      <button 
        onClick={() => setIsCartOpen(true)} 
        className="relative p-2 rounded-lg transition-all duration-200 group"
      >
        <ShoppingCart className={`w-4.5 h-4.5 ${
          isTransparent ? 'text-white' : 'text-[#EE4275]'
        } group-hover:scale-105 transition-transform`} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#EE4275] text-white text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 shadow-sm" style={{ fontFamily: '"Playfair Display"' }}>
            {cartCount > 9 ? '9+' : cartCount}
          </span>
        )}
      </button>

      {/* Sign In / User Menu */}
      {user ? (
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 text-sm"
          >
            {getProfilePicture() && !profileImageError ? (
              <img 
                src={getProfilePicture()} 
                alt={getDisplayName()}
                className={`w-7 h-7 rounded-full object-cover border-2 ${
                  isTransparent ? 'border-white/30' : 'border-[#EE4275]/30'
                }`}
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#EE4275] flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                {getInitials()}
              </div>
            )}
            <span className={`hidden sm:inline font-medium text-sm max-w-[100px] truncate ${
              isTransparent ? 'text-white' : 'text-gray-600'
            }`} style={{ fontFamily: '"Playfair Display"' }}>
              {getDisplayName()}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''} ${
              isTransparent ? 'text-white' : 'text-[#EE4275]'
            }`} />
          </button>

          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#EE4275]/10 overflow-hidden z-50 animate-fadeIn">
                <div className="px-4 py-3 border-b border-[#F7C7D3]/30 bg-[#F7C7D3]/10">
                  <p className="text-gray-700 font-semibold text-sm truncate" style={{ fontFamily: '"Playfair Display"' }}>{getDisplayName()}</p>
                  <p className="text-[#EE4275] text-xs truncate mt-0.5" style={{ fontFamily: '"Playfair Display"' }}>{user.email}</p>
                  <div className="mt-1.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      user.role === 'super_admin' ? 'bg-yellow-500/20 text-yellow-600' :
                      user.role === 'admin' ? 'bg-[#EE4275]/20 text-[#EE4275]' :
                      user.role === 'moderator' ? 'bg-green-500/20 text-green-600' :
                      user.role === 'call_center_agent' ? 'bg-purple-500/20 text-purple-600' :
                      'bg-[#F7C7D3]/30 text-gray-600'
                    }`} style={{ fontFamily: '"Playfair Display"' }}>
                      {user.role === 'call_center_agent' ? 'Call Center Agent' :
                       user.role === 'super_admin' ? 'Super Admin' :
                       user.role === 'admin' ? 'Admin' :
                       user.role === 'moderator' ? 'Moderator' :
                       'Customer'}
                    </span>
                  </div>
                </div>
                <div className="py-2">
                  {/* Dashboard Link - Force full page reload */}
                  <div
                    onClick={() => {
                      setUserMenuOpen(false);
                      window.location.href = getDashboardLink();
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#F7C7D3]/20 transition-colors cursor-pointer"
                    style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#EE4275]" />
                    <span>Dashboard</span>
                  </div>

                  {/* Settings Link - Force full page reload */}
                  <div
                    onClick={() => {
                      setUserMenuOpen(false);
                      window.location.href = getSettingsLink();
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#F7C7D3]/20 transition-colors cursor-pointer"
                    style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
                  >
                    <Settings className="w-4 h-4 text-[#EE4275]" />
                    <span>Settings</span>
                  </div>
                  
                  <div className="border-t border-[#F7C7D3]/30 my-1"></div>
                  
                  <button 
                    onClick={() => { setUserMenuOpen(false); logout(); }} 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full"
                    style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <Link 
          href="/login" 
          className={`hidden sm:block px-5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
            isTransparent 
              ? 'text-[#EE4275] bg-white/90 backdrop-blur-sm hover:bg-white' 
              : 'text-white bg-[#EE4275] hover:bg-[#EE4275]/80'
          }`}
          style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
        >
          Sign In
        </Link>
      )}
    </div>

  </div>
</div>
      </nav>

      {/* Mobile Search Overlay - Opens below navbar */}
      {mobileSearchOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-lg border-b border-[#EE4275]/10 animate-slideDown md:hidden">
          <div className="container mx-auto px-4 py-3" ref={mobileSearchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search beauty products..."
                className="w-full px-4 py-3 pr-20 text-sm text-gray-700 bg-[#F7C7D3]/10 border border-[#EE4275]/20 rounded-lg focus:outline-none focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all"
                style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
                autoFocus
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button type="submit" className="p-1.5">
                  {searchLoading ? (
                    <div className="w-4 h-4 border-2 border-[#EE4275] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Search className="w-4 h-4 text-[#EE4275]" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileSearchOpen(false);
                    setSearchQuery('');
                    setShowResults(false);
                  }}
                  className="p-1.5 text-gray-400 hover:text-[#EE4275] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Mobile Search Results */}
            {showResults && searchResults.length > 0 && (
              <div className="mt-3 bg-white rounded-lg border border-[#EE4275]/10 max-h-96 overflow-y-auto">
                {searchResults.map((product) => (
                  <button
                    key={product._id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleResultClick(product);
                    }}
                    className="w-full px-3 py-3 text-left hover:bg-[#F7C7D3]/20 transition-colors flex items-center gap-3 border-b border-[#F7C7D3]/30 last:border-0"
                  >
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={product.images[0]?.url || product.images[0]} 
                        alt={product.productName || product.name} 
                        className="w-12 h-12 rounded-lg object-cover bg-[#F7C7D3]/20"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-[#F7C7D3]/20 flex items-center justify-center">
                        <Package className="w-6 h-6 text-[#EE4275]" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-700 text-sm line-clamp-1" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                        {product.productName || product.name || product.title}
                      </p>
                      <p className="text-sm font-semibold text-[#EE4275] mt-0.5" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                        ৳{product.discountPrice || product.regularPrice || product.price}
                      </p>
                    </div>
                  </button>
                ))}
                <button
                  onClick={handleSearchSubmit}
                  className="w-full px-4 py-3 text-center text-sm text-[#EE4275] hover:bg-[#F7C7D3]/20 font-medium border-t border-[#F7C7D3]/30"
                  style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
                >
                  View all results for "{searchQuery}" →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`fixed inset-0 z-50 md:hidden ${isMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
        
        <div className={`absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#F7C7D3]/30">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8">
                  {navbarData?.logo?.logoUrl ? (
                    <img 
                      src={getLogoUrl(navbarData.logo.logoUrl)} 
                      alt={navbarData.logo.text || 'Glow&Co'} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                  )}
                </div>
                <div>
                  <span className="font-bold text-gray-700 text-base" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                    {navbarData?.logo?.text || 'Glow&Co'}
                    {navbarData?.logo?.highlightText && (
                      <span className="text-[#EE4275]">{navbarData.logo.highlightText}</span>
                    )}
                  </span>
                  <span className="text-[10px] text-[#EE4275] block -mt-1 tracking-wider" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>BEAUTY</span>
                </div>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#F7C7D3]/20 transition-colors">
                <X className="w-5 h-5 text-[#EE4275]" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto py-3">
              {navItems.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <Link
                    key={item.id || item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-5 py-3 mx-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href) 
                        ? 'text-[#EE4275] font-semibold' 
                        : 'text-gray-600 hover:text-[#EE4275] hover:bg-[#F7C7D3]/20'
                    }`}
                    style={{
                      fontFamily: '"Playfair Display", "Georgia", serif',
                      borderLeft: isActive(item.href) ? '3px solid #EE4275' : 'none',
                      paddingLeft: isActive(item.href) ? '17px' : '20px',
                    }}
                  >
                    <Icon className={`w-4.5 h-4.5 ${isActive(item.href) ? 'text-[#EE4275]' : 'text-gray-400'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              <div className="my-3 mx-5 h-px bg-gradient-to-r from-[#EE4275]/20 via-[#EE4275]/40 to-[#EE4275]/20"></div>

              {/* Auth Section for Mobile */}
              {!user ? (
                <div className="px-5 mt-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-[#EE4275] text-white hover:bg-[#EE4275]/80 transition-all shadow-sm"
                    style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
                  >
                    Sign In
                  </Link>
                </div>
              ) : (
                <div className="px-5 mt-3">
                  <div className="flex items-center gap-3 p-3 bg-[#F7C7D3]/10 rounded-lg mb-3">
                    {getProfilePicture() && !profileImageError ? (
                      <img src={getProfilePicture()} alt={getDisplayName()} className="w-10 h-10 rounded-full object-cover border-2 border-[#EE4275]/30" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#EE4275] flex items-center justify-center text-white font-semibold text-sm">
                        {getInitials()}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-700 text-sm" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>{getDisplayName()}</p>
                      <p className="text-[#EE4275] text-xs truncate" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>{user.email}</p>
                    </div>
                  </div>
                  
                  {/* Dashboard in Mobile Menu - Force full page reload */}
                  <div
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.location.href = getDashboardLink();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-[#F7C7D3]/20 transition-colors mb-1 cursor-pointer"
                    style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#EE4275]" />
                    Dashboard
                  </div>

                  {/* Settings in Mobile Menu - Force full page reload */}
                  <div
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.location.href = getSettingsLink();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-[#F7C7D3]/20 transition-colors mb-2 cursor-pointer"
                    style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
                  >
                    <Settings className="w-4 h-4 text-[#EE4275]" />
                    Settings
                  </div>
                  
                  <button
                    onClick={() => { setIsMenuOpen(false); logout(); }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
                    style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Spacer */}
      {/* <div className="h-16"></div> */}

      <style jsx>{`
        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideLeft {
          animation: slideLeft 0.25s ease-out;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .w-4.5 {
          width: 1.125rem;
        }
        .h-4.5 {
          height: 1.125rem;
        }
      `}</style>
    </>
  );
}