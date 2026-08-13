
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
//   Sparkles
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
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/navbar`);
        
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
//                 { id: '4', name: 'About', href: '/about', icon: 'Info', isActive: true },
//                 { id: '5', name: 'Contact', href: '/contact', icon: 'Phone', isActive: true }
//               ],
//               logo: {
//                 text: 'Smart Gadget',
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
//               { id: '2', name: 'Products', href: '/products', icon: 'Package', isActive: true },
//               { id: '3', name: 'Track Order', href: '/track', icon: 'MapPin', isActive: true },
//               { id: '4', name: 'About', href: '/about', icon: 'Info', isActive: true },
//               { id: '5', name: 'Contact', href: '/contact', icon: 'Phone', isActive: true }
//             ],
//             logo: {
//               text: 'Smart Gadget',
//               highlightText: '',
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
//             { id: '2', name: 'Products', href: '/products', icon: 'Package', isActive: true },
//             { id: '3', name: 'Track Order', href: '/track', icon: 'MapPin', isActive: true },
//             { id: '4', name: 'About', href: '/about', icon: 'Info', isActive: true },
//             { id: '5', name: 'Contact', href: '/contact', icon: 'Phone', isActive: true }
//           ],
//           logo: {
//             text: 'Smart Gadget',
//             highlightText: '',
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
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cart`, { headers });
      
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
//       { id: '2', name: 'Products', href: '/products', icon: 'Package' },
//       { id: '3', name: 'Track Order', href: '/track', icon: 'MapPin' },
//       { id: '4', name: 'About', href: '/about', icon: 'Info' },
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
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products?search=${encodeURIComponent(query)}&limit=5`);
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

//   const getDashboardLink = () => {
//     if (!user) return '/';
    
//     // Check if user has authorize role (admin, super_admin, moderator)
//     if (['admin', 'super_admin', 'moderator'].includes(user.role)) {
//       return '/authorize/dashboard';
//     }
    
//     if (user.role === 'call_center_agent') {
//       return '/agent/dashboard';
//     }
    
//     return '/customer/dashboard';
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

//   // Get logo URL (supports both local and Cloudinary)
//   const getLogoUrl = (url) => {
//     if (!url) return '/logo.png';
    
//     // If it's a Cloudinary URL, add optimization params
//     if (url.includes('cloudinary.com')) {
//       const parts = url.split('/upload/');
//       if (parts.length === 2) {
//         return `${parts[0]}/upload/f_auto,fl_preserve_transparency,w_auto,h_50,c_limit/${parts[1]}`;
//       }
//     }
//     return url;
//   };

//   // Check if user has authorize role
//   const isAuthorizeRole = user && ['admin', 'super_admin', 'moderator'].includes(user.role);

//   if (authLoading || navbarLoading) {
//     return (
//       <div className="fixed top-0 z-50 w-full bg-white border-b border-gray-100">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
//             <div className="flex gap-4">
//               <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
//               <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
//               <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
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
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
            
//             {/* Mobile Menu Button - Left Side for Mobile */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
//             >
//               <Menu className="w-5 h-5 text-gray-700" />
//             </button>

//             {/* Logo - Left Side */}
//             <Link href="/" className="flex items-center flex-shrink-0 group">
//               <div className={`relative w-32 h-14 transition-transform group-hover:scale-105 duration-300 ${
//                 !user ? '-ml-16 md:-ml-0' : ' -ml-4 md:-ml-0'
//               }`}>
//                 {navbarData?.logo?.logoUrl ? (
//                   <img 
//                     src={getLogoUrl(navbarData.logo.logoUrl)}
//                     alt={navbarData.logo.text || 'Smart Gadget'}
//                     className="w-full h-full object-contain"
//                     style={{ background: 'transparent' }}
//                   />
//                 ) : (
//                   <img 
//                     src="/logo.png"
//                     alt="Smart Gadget Logo"
//                     className="w-full h-full object-contain"
//                   />
//                 )}
//               </div>
//             </Link>

//             {/* Desktop Navigation - Center */}
//             <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
//               {navItems.map((item) => {
//                 const Icon = getIcon(item.icon);
//                 return (
//                   <Link
//                     key={item.id || item.name}
//                     href={item.href}
//                     className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                       isActive(item.href)
//                         ? 'text-blue-500'
//                         : 'text-gray-600 hover:text-gray-900'
//                     }`}
//                   >
//                     {item.name}
//                     {isActive(item.href) && (
//                       <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></span>
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* Right Section - Search Icon, Cart, Sign In */}
//             <div className="flex items-center gap-2">
              
//               {/* Desktop Search - Full width input that doesn't overlap */}
//               <div className="hidden md:block relative" ref={searchRef}>
//                 <div className="flex items-center">
//                   {!searchOpen ? (
//                     <button
//                       onClick={() => setSearchOpen(true)}
//                       className="search-trigger p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
//                     >
//                       <Search className="w-4.5 h-4.5 text-gray-600" />
//                     </button>
//                   ) : (
//                     <div className="relative">
//                       <form onSubmit={handleSearchSubmit} className="relative">
//                         <input
//                           type="text"
//                           value={searchQuery}
//                           onChange={(e) => setSearchQuery(e.target.value)}
//                           placeholder="Search products..."
//                           className="w-80 px-4 py-2 pr-20 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-sm"
//                           autoFocus
//                         />
//                         <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
//                           <button type="submit" className="p-1">
//                             {searchLoading ? (
//                               <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                             ) : (
//                               <Search className="w-3.5 h-3.5 text-gray-500" />
//                             )}
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setSearchOpen(false);
//                               setSearchQuery('');
//                               setShowResults(false);
//                             }}
//                             className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
//                           >
//                             <X className="w-3.5 h-3.5" />
//                           </button>
//                         </div>
//                       </form>

//                       {/* Search Results Dropdown */}
//                       {showResults && searchResults.length > 0 && (
//                         <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 max-h-96 overflow-y-auto z-50">
//                           <div className="py-2">
//                             {searchResults.map((product) => (
//                               <button
//                                 key={product._id}
//                                 // ✅ FIXED: Use onMouseDown with preventDefault for both desktop and mobile
//                                 onMouseDown={(e) => {
//                                   e.preventDefault();
//                                   handleResultClick(product);
//                                 }}
//                                 className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0"
//                               >
//                                 {product.images && product.images.length > 0 ? (
//                                   <img 
//                                     src={product.images[0]?.url || product.images[0]} 
//                                     alt={product.productName || product.name} 
//                                     className="w-10 h-10 rounded-lg object-cover bg-gray-100"
//                                   />
//                                 ) : (
//                                   <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
//                                     <Package className="w-5 h-5 text-gray-400" />
//                                   </div>
//                                 )}
//                                 <div className="flex-1">
//                                   <p className="font-medium text-gray-900 text-sm line-clamp-1">
//                                     {product.productName || product.name || product.title}
//                                   </p>
//                                   <div className="flex items-center gap-2 mt-0.5">
//                                     <p className="text-sm font-semibold text-blue-500">
//                                       ৳{product.discountPrice || product.regularPrice || product.price}
//                                     </p>
//                                     {product.discountPrice && product.regularPrice && (
//                                       <p className="text-xs text-gray-400 line-through">
//                                         ৳{product.regularPrice}
//                                       </p>
//                                     )}
//                                   </div>
//                                 </div>
//                               </button>
//                             ))}
//                             <button
//                               onClick={handleSearchSubmit}
//                               className="w-full px-4 py-2.5 text-center text-sm text-blue-500 hover:bg-blue-50 font-medium border-t border-gray-100 transition-colors"
//                             >
//                               View all results for "{searchQuery}" →
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Mobile Search Trigger */}
//               <button
//                 onClick={() => setMobileSearchOpen(true)}
//                 className="mobile-search-trigger md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
//               >
//                 <Search className="w-4.5 h-4.5 text-gray-600" />
//               </button>

//               {/* Cart Icon - Opens Sidebar */}
//               <button 
//                 onClick={() => setIsCartOpen(true)} 
//                 className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
//               >
//                 <ShoppingCart className="w-4.5 h-4.5 text-gray-700 group-hover:scale-105 transition-transform" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 shadow-sm">
//                     {cartCount > 9 ? '9+' : cartCount}
//                   </span>
//                 )}
//               </button>

//               {/* Sign In / User Menu */}
//               {user ? (
//                 <div className="relative">
//                   <button
//                     onClick={() => setUserMenuOpen(!userMenuOpen)}
//                     className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200 text-sm"
//                   >
//                     {getProfilePicture() && !profileImageError ? (
//                       <img 
//                         src={getProfilePicture()} 
//                         alt={getDisplayName()}
//                         className="w-7 h-7 rounded-full object-cover border-2 border-gray-200"
//                       />
//                     ) : (
//                       <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
//                         {getInitials()}
//                       </div>
//                     )}
//                     <span className="hidden sm:inline text-gray-700 font-medium text-sm max-w-[100px] truncate">
//                       {getDisplayName()}
//                     </span>
//                     <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
//                   </button>

//                   {userMenuOpen && (
//                     <>
//                       <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
//                       <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
//                         <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
//                           <p className="text-gray-900 font-semibold text-sm truncate">{getDisplayName()}</p>
//                           <p className="text-gray-500 text-xs truncate mt-0.5">{user.email}</p>
//                           <div className="mt-1.5">
//                             <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
//                               user.role === 'super_admin' ? 'bg-yellow-500/20 text-yellow-600' :
//                               user.role === 'admin' ? 'bg-blue-500/20 text-blue-600' :
//                               user.role === 'moderator' ? 'bg-green-500/20 text-green-600' :
//                               user.role === 'call_center_agent' ? 'bg-purple-500/20 text-purple-600' :
//                               'bg-gray-500/20 text-gray-600'
//                             }`}>
//                               {user.role === 'call_center_agent' ? 'Call Center Agent' :
//                                user.role === 'super_admin' ? 'Super Admin' :
//                                user.role === 'admin' ? 'Admin' :
//                                user.role === 'moderator' ? 'Moderator' :
//                                'Customer'}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="py-2">
//                           <Link href={getDashboardLink()} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setUserMenuOpen(false)}>
//                             <LayoutDashboard className="w-4 h-4 text-gray-500" />
//                             <span>Dashboard</span>
//                           </Link>
                       
                          
//                           <button onClick={() => { setUserMenuOpen(false); logout(); }} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full">
//                             <LogOut className="w-4 h-4" />
//                             <span>Logout</span>
//                           </button>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ) : (
//                 <Link 
//                   href="/login" 
//                   className="hidden sm:block px-4 py-1.5 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
//                 >
//                   Sign In
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Search Overlay - Opens below navbar */}
//       {mobileSearchOpen && (
//         <div className="fixed top-16 left-0 right-0 z-40 bg-white shadow-lg border-b border-gray-100 animate-slideDown md:hidden">
//           <div className="container mx-auto px-4 py-3" ref={mobileSearchRef}>
//             <form onSubmit={handleSearchSubmit} className="relative">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search products..."
//                 className="w-full px-4 py-3 pr-20 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
//                 autoFocus
//               />
//               <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
//                 <button type="submit" className="p-1.5">
//                   {searchLoading ? (
//                     <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                   ) : (
//                     <Search className="w-4 h-4 text-gray-500" />
//                   )}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setMobileSearchOpen(false);
//                     setSearchQuery('');
//                     setShowResults(false);
//                   }}
//                   className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             </form>

//             {/* Mobile Search Results */}
//             {showResults && searchResults.length > 0 && (
//               <div className="mt-3 bg-white rounded-lg border border-gray-100 max-h-96 overflow-y-auto">
//                 {searchResults.map((product) => (
//                   <button
//                     key={product._id}
//                     // ✅ FIXED: Use onMouseDown with preventDefault for mobile too
//                     onMouseDown={(e) => {
//                       e.preventDefault();
//                       handleResultClick(product);
//                     }}
//                     className="w-full px-3 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
//                   >
//                     {product.images && product.images.length > 0 ? (
//                       <img 
//                         src={product.images[0]?.url || product.images[0]} 
//                         alt={product.productName || product.name} 
//                         className="w-12 h-12 rounded-lg object-cover bg-gray-100"
//                       />
//                     ) : (
//                       <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
//                         <Package className="w-6 h-6 text-gray-400" />
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-900 text-sm line-clamp-1">
//                         {product.productName || product.name || product.title}
//                       </p>
//                       <p className="text-sm font-semibold text-blue-500 mt-0.5">
//                         ৳{product.discountPrice || product.regularPrice || product.price}
//                       </p>
//                     </div>
//                   </button>
//                 ))}
//                 <button
//                   onClick={handleSearchSubmit}
//                   className="w-full px-4 py-3 text-center text-sm text-blue-500 hover:bg-blue-50 font-medium border-t border-gray-100"
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
//         <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
        
//         <div className={`absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//           <div className="flex flex-col h-full">
//             {/* Header */}
//             <div className="flex items-center justify-between p-5 border-b border-gray-100">
//               <div className="flex items-center space-x-2.5">
//                 <div className="w-8 h-8">
//                   {navbarData?.logo?.logoUrl ? (
//                     <img 
//                       src={getLogoUrl(navbarData.logo.logoUrl)} 
//                       alt={navbarData.logo.text || 'Smart Gadget'} 
//                       className="w-full h-full object-contain"
//                     />
//                   ) : (
//                     <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
//                   )}
//                 </div>
//                 <div>
//                   <span className="font-bold text-gray-900 text-base">
//                     {navbarData?.logo?.text || 'Smart Gadget'}
//                     {navbarData?.logo?.highlightText && (
//                       <span className="text-blue-500">{navbarData.logo.highlightText}</span>
//                     )}
//                   </span>
//                 </div>
//               </div>
//               <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                 <X className="w-5 h-5 text-gray-700" />
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
//                         ? 'text-blue-500 bg-blue-50' 
//                         : 'text-gray-700 hover:bg-gray-50'
//                     }`}
//                   >
//                     <Icon className={`w-4.5 h-4.5 ${isActive(item.href) ? 'text-blue-500' : 'text-gray-500'}`} />
//                     <span>{item.name}</span>
//                   </Link>
//                 );
//               })}

//               <div className="my-3 mx-5 h-px bg-gray-100"></div>

//               {/* Auth Section for Mobile */}
//               {!user ? (
//                 <div className="px-5 mt-3">
//                   <Link
//                     href="/login"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-sm"
//                   >
//                     Sign In
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="px-5 mt-3">
//                   <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg mb-3">
//                     {getProfilePicture() && !profileImageError ? (
//                       <img src={getProfilePicture()} alt={getDisplayName()} className="w-10 h-10 rounded-full object-cover border-2 border-gray-200" />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
//                         {getInitials()}
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-900 text-sm">{getDisplayName()}</p>
//                       <p className="text-gray-500 text-xs truncate">{user.email}</p>
//                     </div>
//                   </div>
                  
                
                  
//                   <button
//                     onClick={() => { setIsMenuOpen(false); logout(); }}
//                     className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
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
//       <div className="h-16"></div>

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
  Settings
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

  // Fetch navbar data from PUBLIC endpoint (no auth required)
  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        // ✅ PUBLIC endpoint - no token needed
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/navbar`);
        
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
                { id: '4', name: 'About', href: '/about', icon: 'Info', isActive: true },
                { id: '5', name: 'Contact', href: '/contact', icon: 'Phone', isActive: true }
              ],
              logo: {
                text: 'Smart Gadget',
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
              { id: '2', name: 'Products', href: '/products', icon: 'Package', isActive: true },
              { id: '3', name: 'Track Order', href: '/track', icon: 'MapPin', isActive: true },
              { id: '4', name: 'About', href: '/about', icon: 'Info', isActive: true },
              { id: '5', name: 'Contact', href: '/contact', icon: 'Phone', isActive: true }
            ],
            logo: {
              text: 'Smart Gadget',
              highlightText: '',
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
            { id: '2', name: 'Products', href: '/products', icon: 'Package', isActive: true },
            { id: '3', name: 'Track Order', href: '/track', icon: 'MapPin', isActive: true },
            { id: '4', name: 'About', href: '/about', icon: 'Info', isActive: true },
            { id: '5', name: 'Contact', href: '/contact', icon: 'Phone', isActive: true }
          ],
          logo: {
            text: 'Smart Gadget',
            highlightText: '',
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
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cart`, { headers });
      
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
      { id: '2', name: 'Products', href: '/products', icon: 'Package' },
      { id: '3', name: 'Track Order', href: '/track', icon: 'MapPin' },
      { id: '4', name: 'About', href: '/about', icon: 'Info' },
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products?search=${encodeURIComponent(query)}&limit=5`);
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

  // Get logo URL (supports both local and Cloudinary)
  const getLogoUrl = (url) => {
    if (!url) return '/logo.png';
    
    // If it's a Cloudinary URL, add optimization params
    if (url.includes('cloudinary.com')) {
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        return `${parts[0]}/upload/f_auto,fl_preserve_transparency,w_auto,h_50,c_limit/${parts[1]}`;
      }
    }
    return url;
  };

  // Check if user has authorize role
  const isAuthorizeRole = user && ['admin', 'super_admin', 'moderator'].includes(user.role);

  if (authLoading || navbarLoading) {
    return (
      <div className="fixed top-0 z-50 w-full bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
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
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Mobile Menu Button - Left Side for Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>

            {/* Logo - Left Side */}
            <Link href="/" className="flex items-center flex-shrink-0 group">
              <div className={`relative w-32 h-14 transition-transform group-hover:scale-105 duration-300 ${
                !user ? '-ml-16 md:-ml-0' : ' -ml-4 md:-ml-0'
              }`}>
                {navbarData?.logo?.logoUrl ? (
                  <img 
                    src={getLogoUrl(navbarData.logo.logoUrl)}
                    alt={navbarData.logo.text || 'Smart Gadget'}
                    className="w-full h-full object-contain"
                    style={{ background: 'transparent' }}
                  />
                ) : (
                  <img 
                    src="/logo.png"
                    alt="Smart Gadget Logo"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </Link>

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
                        ? 'text-blue-500'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Section - Search Icon, Cart, Sign In */}
            <div className="flex items-center gap-2">
              
              {/* Desktop Search - Full width input that doesn't overlap */}
              <div className="hidden md:block relative" ref={searchRef}>
                <div className="flex items-center">
                  {!searchOpen ? (
                    <button
                      onClick={() => setSearchOpen(true)}
                      className="search-trigger p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                    >
                      <Search className="w-4.5 h-4.5 text-gray-600" />
                    </button>
                  ) : (
                    <div className="relative">
                      <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search products..."
                          className="w-80 px-4 py-2 pr-20 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-sm"
                          autoFocus
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <button type="submit" className="p-1">
                            {searchLoading ? (
                              <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Search className="w-3.5 h-3.5 text-gray-500" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery('');
                              setShowResults(false);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </form>

                      {/* Search Results Dropdown */}
                      {showResults && searchResults.length > 0 && (
                        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 max-h-96 overflow-y-auto z-50">
                          <div className="py-2">
                            {searchResults.map((product) => (
                              <button
                                key={product._id}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  handleResultClick(product);
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0"
                              >
                                {product.images && product.images.length > 0 ? (
                                  <img 
                                    src={product.images[0]?.url || product.images[0]} 
                                    alt={product.productName || product.name} 
                                    className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-gray-400" />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900 text-sm line-clamp-1">
                                    {product.productName || product.name || product.title}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <p className="text-sm font-semibold text-blue-500">
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
                              className="w-full px-4 py-2.5 text-center text-sm text-blue-500 hover:bg-blue-50 font-medium border-t border-gray-100 transition-colors"
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
                className="mobile-search-trigger md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <Search className="w-4.5 h-4.5 text-gray-600" />
              </button>

              {/* Cart Icon - Opens Sidebar */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
              >
                <ShoppingCart className="w-4.5 h-4.5 text-gray-700 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 shadow-sm">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {/* Sign In / User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200 text-sm"
                  >
                    {getProfilePicture() && !profileImageError ? (
                      <img 
                        src={getProfilePicture()} 
                        alt={getDisplayName()}
                        className="w-7 h-7 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                        {getInitials()}
                      </div>
                    )}
                    <span className="hidden sm:inline text-gray-700 font-medium text-sm max-w-[100px] truncate">
                      {getDisplayName()}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                          <p className="text-gray-900 font-semibold text-sm truncate">{getDisplayName()}</p>
                          <p className="text-gray-500 text-xs truncate mt-0.5">{user.email}</p>
                          <div className="mt-1.5">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              user.role === 'super_admin' ? 'bg-yellow-500/20 text-yellow-600' :
                              user.role === 'admin' ? 'bg-blue-500/20 text-blue-600' :
                              user.role === 'moderator' ? 'bg-green-500/20 text-green-600' :
                              user.role === 'call_center_agent' ? 'bg-purple-500/20 text-purple-600' :
                              'bg-gray-500/20 text-gray-600'
                            }`}>
                              {user.role === 'call_center_agent' ? 'Call Center Agent' :
                               user.role === 'super_admin' ? 'Super Admin' :
                               user.role === 'admin' ? 'Admin' :
                               user.role === 'moderator' ? 'Moderator' :
                               'Customer'}
                            </span>
                          </div>
                        </div>
                        <div className="py-2">
                          {/* Dashboard Link */}
                        {/* Dashboard Link - Force full page reload */}
<div
  onClick={() => {
    setUserMenuOpen(false);
    window.location.href = getDashboardLink();
  }}
  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
>
  <LayoutDashboard className="w-4 h-4 text-gray-500" />
  <span>Dashboard</span>
</div>

{/* Settings Link - Force full page reload */}
<div
  onClick={() => {
    setUserMenuOpen(false);
    window.location.href = getSettingsLink();
  }}
  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
>
  <Settings className="w-4 h-4 text-gray-500" />
  <span>Settings</span>
</div>
                          
                          <div className="border-t border-gray-100 my-1"></div>
                          
                          <button 
                            onClick={() => { setUserMenuOpen(false); logout(); }} 
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
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
                  className="hidden sm:block px-4 py-1.5 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
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
        <div className="fixed top-16 left-0 right-0 z-40 bg-white shadow-lg border-b border-gray-100 animate-slideDown md:hidden">
          <div className="container mx-auto px-4 py-3" ref={mobileSearchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-3 pr-20 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                autoFocus
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button type="submit" className="p-1.5">
                  {searchLoading ? (
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Search className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileSearchOpen(false);
                    setSearchQuery('');
                    setShowResults(false);
                  }}
                  className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Mobile Search Results */}
            {showResults && searchResults.length > 0 && (
              <div className="mt-3 bg-white rounded-lg border border-gray-100 max-h-96 overflow-y-auto">
                {searchResults.map((product) => (
                  <button
                    key={product._id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleResultClick(product);
                    }}
                    className="w-full px-3 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
                  >
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={product.images[0]?.url || product.images[0]} 
                        alt={product.productName || product.name} 
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm line-clamp-1">
                        {product.productName || product.name || product.title}
                      </p>
                      <p className="text-sm font-semibold text-blue-500 mt-0.5">
                        ৳{product.discountPrice || product.regularPrice || product.price}
                      </p>
                    </div>
                  </button>
                ))}
                <button
                  onClick={handleSearchSubmit}
                  className="w-full px-4 py-3 text-center text-sm text-blue-500 hover:bg-blue-50 font-medium border-t border-gray-100"
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
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
        
        <div className={`absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8">
                  {navbarData?.logo?.logoUrl ? (
                    <img 
                      src={getLogoUrl(navbarData.logo.logoUrl)} 
                      alt={navbarData.logo.text || 'Smart Gadget'} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                  )}
                </div>
                <div>
                  <span className="font-bold text-gray-900 text-base">
                    {navbarData?.logo?.text || 'Smart Gadget'}
                    {navbarData?.logo?.highlightText && (
                      <span className="text-blue-500">{navbarData.logo.highlightText}</span>
                    )}
                  </span>
                </div>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-700" />
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
                        ? 'text-blue-500 bg-blue-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-4.5 h-4.5 ${isActive(item.href) ? 'text-blue-500' : 'text-gray-500'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              <div className="my-3 mx-5 h-px bg-gray-100"></div>

              {/* Auth Section for Mobile */}
              {!user ? (
                <div className="px-5 mt-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-sm"
                  >
                    Sign In
                  </Link>
                </div>
              ) : (
                <div className="px-5 mt-3">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg mb-3">
                    {getProfilePicture() && !profileImageError ? (
                      <img src={getProfilePicture()} alt={getDisplayName()} className="w-10 h-10 rounded-full object-cover border-2 border-gray-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                        {getInitials()}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{getDisplayName()}</p>
                      <p className="text-gray-500 text-xs truncate">{user.email}</p>
                    </div>
                  </div>
                  
                  {/* ✅ Dashboard in Mobile Menu */}
               {/* Dashboard in Mobile Menu - Force full page reload */}
<div
  onClick={() => {
    setIsMenuOpen(false);
    window.location.href = getDashboardLink();
  }}
  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-1 cursor-pointer"
>
  <LayoutDashboard className="w-4 h-4 text-gray-500" />
  Dashboard
</div>

{/* Settings in Mobile Menu - Force full page reload */}
<div
  onClick={() => {
    setIsMenuOpen(false);
    window.location.href = getSettingsLink();
  }}
  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-2 cursor-pointer"
>
  <Settings className="w-4 h-4 text-gray-500" />
  Settings
</div>
                  
                  <button
                    onClick={() => { setIsMenuOpen(false); logout(); }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
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