


// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import {
//   LayoutDashboard,
//   ShoppingBag,
//   MessageSquare,
//   Settings,
//   LogOut,
//   Menu,
//   ChevronDown,
//   Home,
//   ChevronRight,
//   Star,
//   Sparkles,
//   Gift,
//   Heart,
//   Award,
//   Cpu,
//   Store,
//   Headphones,
//   Phone,
//   Clock,
//   Users,
//   BarChart3,
//   Bell,
//   UserCog,
//   ShieldCheck,
//   Zap,
//   ChevronUp
// } from 'lucide-react';
// import DynamicLogo from '../components/DynamicLogo';

// export default function AgentLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Helper function to normalize pathname (remove trailing slash)
//   const normalizePath = (path) => {
//     if (path && path !== '/' && path.endsWith('/')) {
//       return path.slice(0, -1);
//     }
//     return path;
//   };

//   // Helper function to check if a route is active
//   const isActive = (href) => {
//     const currentPath = normalizePath(pathname);

//     if (href === '/agent/dashboard') {
//       return currentPath === '/agent/dashboard';
//     }

//     if (href === '/agent/orders') {
//       return currentPath === '/agent/orders' ||
//              currentPath.startsWith('/agent/orders/');
//     }

//     if (href === '/agent/settings') {
//       return currentPath === '/agent/settings' ||
//              currentPath.startsWith('/agent/settings/');
//     }

//     return false;
//   };

//   // Navigation click handler
//   const handleNavigation = (href) => {
//     setSidebarOpen(false);
//     router.push(href);
//   };

//   useEffect(() => {
//     document.body.style.margin = '0';
//     document.body.style.padding = '0';

//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');

//     if (!token || !userData) {
//       logout();
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(userData);

//       // Check if user is call_center_agent
//       if (parsedUser.role !== 'call_center_agent') {
//         logout();
//         return;
//       }

//       setUser(parsedUser);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       logout();
//     } finally {
//       setIsLoading(false);
//     }
//   }, [router]);

//   const navigation = [
//     { name: 'Dashboard', href: '/agent/dashboard', icon: LayoutDashboard },
//     { name: 'Orders', href: '/agent/orders', icon: ShoppingBag },
//     { name: 'Settings', href: '/agent/settings', icon: Settings }
//   ];

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-[#06B6D4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading Agent Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style jsx global>{`
//         html, body {
//           margin: 0 !important;
//           padding: 0 !important;
//           overflow-x: hidden;
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//         }
//         * {
//           box-sizing: border-box;
//         }
//       `}</style>

//       <div className="min-h-screen bg-white" style={{ margin: 0, padding: 0 }}>
//         {/* Mobile sidebar backdrop */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Sidebar - HyperVolt Theme */}
//         <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl border-r border-[#06B6D4]/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}>
//           {/* Sidebar header with dynamic logo */}
//           <div className="h-20 flex items-center justify-center px-6 border-b border-[#06B6D4]/20 bg-gradient-to-r from-white to-[#f0f7fa]">
//             <DynamicLogo 
//               className="justify-center"
//               textClassName="text-xl font-bold text-[#004767]"
//               iconClassName="w-8 h-8"
//               linkClassName="justify-center"
//             />
//           </div>

//           {/* User info - In sidebar below header */}
//           {user && (
//             <div className="px-4 py-4 border-b border-[#06B6D4]/20 bg-gradient-to-r from-white to-[#f0f7fa]">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-lg bg-gradient-to-br from-[#06B6D4] to-[#004767]">
//                   {user.companyName?.charAt(0) || user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-[#004767] truncate">
//                     {user.companyName || user.contactPerson || 'Agent'}
//                   </p>
//                   <p className="text-xs text-gray-500 truncate mt-0.5">
//                     {user.email}
//                   </p>
//                   <div className="flex items-center gap-1.5 mt-1.5">
//                     <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-gradient-to-r from-[#06B6D4]/10 to-[#004767]/10 text-[#004767] border-[#06B6D4]/30">
//                       Call Center Agent
//                     </span>
//                     <Headphones className="w-3 h-3 text-[#06B6D4]" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation */}
//           <nav className="px-3 py-4 h-[calc(100vh-11rem)] overflow-y-auto pb-24 custom-scroll">
//             <div className="flex items-center gap-2 px-3 mb-4">
//               <Headphones className="w-3 h-3 text-[#06B6D4]" />
//               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">AGENT MENU</p>
//             </div>
//             <div className="space-y-1">
//               {navigation.map((item) => {
//                 const active = isActive(item.href);
//                 return (
//                   <div
//                     key={item.name}
//                     onClick={() => handleNavigation(item.href)}
//                     className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
//                       active
//                         ? 'bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white shadow-lg shadow-[#06B6D4]/20'
//                         : 'text-gray-700 hover:bg-[#06B6D4]/10 hover:text-[#004767]'
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <item.icon className={`w-5 h-5 ${
//                         active ? 'text-white' : 'text-gray-400 group-hover:text-[#06B6D4]'
//                       }`} />
//                       <span>{item.name}</span>
//                     </div>
//                     {active && <ChevronRight className="w-4 h-4 text-white" />}
//                   </div>
//                 );
//               })}
//             </div>
//           </nav>

//           {/* Logout button at bottom */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#06B6D4]/20 bg-gradient-to-r from-white to-[#f0f7fa] backdrop-blur">
//             <button
//               onClick={logout}
//               className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-[#06B6D4]/10 hover:text-[#004767] w-full transition-all group"
//             >
//               <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/10 group-hover:bg-[#06B6D4]/20 flex items-center justify-center">
//                 <LogOut className="w-4 h-4 text-[#06B6D4] group-hover:text-[#004767]" />
//               </div>
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="lg:ml-72 min-h-screen">
//           {/* Top header - HyperVolt Theme */}
//           <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#06B6D4]/20 shadow-sm" style={{ margin: 0 }}>
//             <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
//               <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
//                 {/* Left section */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setSidebarOpen(true)}
//                     className="lg:hidden w-10 h-10 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4] hover:bg-[#06B6D4]/20 transition-colors"
//                   >
//                     <Menu className="w-5 h-5" />
//                   </button>

//                   {/* Dynamic Logo in header (visible on mobile when sidebar closed) */}
//                   <div className="lg:hidden">
//                     <DynamicLogo 
//                       textClassName="text-lg font-bold text-[#004767]"
//                       iconClassName="w-6 h-6"
//                     />
//                   </div>

//                   {/* Welcome Message */}
//                   {user && (
//                     <div className="hidden lg:flex items-center gap-2">
//                       <span className="text-lg md:text-2xl font-bold text-[#004767]">Welcome back,</span>
//                       <span className="text-lg md:text-2xl font-bold text-[#06B6D4]">{user.companyName || user.contactPerson || 'Agent'}</span>
//                       <Headphones className="w-5 h-5 text-[#06B6D4] hidden md:block" />
//                       <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full border bg-gradient-to-r from-[#06B6D4]/10 to-[#004767]/10 text-[#004767] border-[#06B6D4]/30 hidden md:inline-flex items-center gap-1">
//                         <Headphones className="w-3 h-3" />
//                         Call Center Agent
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Right section */}
//                 <div className="flex items-center gap-3">
//                   {/* Agent Status Badge */}
//                   <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
//                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
//                     <span className="text-xs font-medium text-green-700">Online</span>
//                   </div>

//                   <Link
//                     href="/"
//                     className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4] hover:bg-[#06B6D4]/20 transition-colors group"
//                     title="Go to Homepage"
//                   >
//                     <Store className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                   </Link>

//                   {/* User Dropdown */}
//                   {user && (
//                     <div className="relative">
//                       <button
//                         onClick={() => setUserMenuOpen(!userMenuOpen)}
//                         className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg hover:bg-[#06B6D4]/10 transition-colors"
//                       >
//                         <div className="text-right hidden md:block">
//                           <p className="text-sm font-medium text-[#004767]">{user.companyName || user.contactPerson || 'Agent'}</p>
//                           <p className="text-xs text-gray-500">{user.email}</p>
//                         </div>
//                         <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-br from-[#06B6D4] to-[#004767] shadow-md">
//                           {user.companyName?.charAt(0) || user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                         </div>
//                         <ChevronDown className={`w-4 h-4 text-[#06B6D4] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
//                       </button>

//                       {/* Dropdown Menu */}
//                       {userMenuOpen && (
//                         <>
//                           <div
//                             className="fixed inset-0 z-40"
//                             onClick={() => setUserMenuOpen(false)}
//                           />
//                           <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#06B6D4]/20 py-2 z-50">
//                             <div className="px-4 py-3 border-b border-[#06B6D4]/20 bg-gradient-to-r from-white to-[#f0f7fa] rounded-t-2xl">
//                               <p className="text-sm font-semibold text-[#004767]">{user.companyName || user.contactPerson || 'Agent'}</p>
//                               <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
//                               <div className="flex items-center gap-2 mt-2">
//                                 <span className="px-2 py-0.5 text-xs font-medium rounded-full border bg-gradient-to-r from-[#06B6D4]/10 to-[#004767]/10 text-[#004767] border-[#06B6D4]/30">
//                                   Call Center Agent
//                                 </span>
//                                 <Headphones className="w-3 h-3 text-[#06B6D4]" />
//                               </div>
//                             </div>

//                             <div
//                               onClick={() => {
//                                 setUserMenuOpen(false);
//                                 handleNavigation('/agent/settings');
//                               }}
//                               className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#06B6D4]/10 hover:text-[#004767] transition-colors cursor-pointer"
//                             >
//                               <Settings className="w-4 h-4 text-[#06B6D4]" />
//                               <span>Settings</span>
//                             </div>

//                             <button
//                               onClick={() => {
//                                 setUserMenuOpen(false);
//                                 logout();
//                               }}
//                               className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left border-t border-[#06B6D4]/20 mt-1 pt-2 rounded-b-2xl"
//                             >
//                               <LogOut className="w-4 h-4" />
//                               <span>Logout</span>
//                             </button>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Page content */}
//           <main className="" style={{ margin: 0, padding: 0 }}>
//             {children}
//           </main>
//         </div>
//       </div>

//       {/* Add custom scrollbar styles */}
//       <style jsx>{`
//         .custom-scroll::-webkit-scrollbar {
//           width: 5px;
//         }
//         .custom-scroll::-webkit-scrollbar-track {
//           background: #f0f7fa;
//           border-radius: 10px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #06B6D4, #004767);
//           border-radius: 10px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #0891B2, #003a5a);
//         }
//       `}</style>
//     </>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
  Home,
  ChevronRight,
  Star,
  Sparkles,
  Gift,
  Heart,
  Award,
  Cpu,
  Store,
  Headphones,
  Phone,
  Clock,
  Users,
  BarChart3,
  Bell,
  UserCog,
  ShieldCheck,
  Zap,
  ChevronUp
} from 'lucide-react';
import DynamicLogo from '../components/DynamicLogo';

export default function AgentLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Helper function to normalize pathname (remove trailing slash)
  const normalizePath = (path) => {
    if (path && path !== '/' && path.endsWith('/')) {
      return path.slice(0, -1);
    }
    return path;
  };

  // Helper function to check if a route is active
  const isActive = (href) => {
    const currentPath = normalizePath(pathname);

    if (href === '/agent/dashboard') {
      return currentPath === '/agent/dashboard';
    }

    if (href === '/agent/orders') {
      return currentPath === '/agent/orders' ||
             currentPath.startsWith('/agent/orders/');
    }

    if (href === '/agent/settings') {
      return currentPath === '/agent/settings' ||
             currentPath.startsWith('/agent/settings/');
    }

    return false;
  };

  // Navigation click handler
  const handleNavigation = (href) => {
    setSidebarOpen(false);
    router.push(href);
  };

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      logout();
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);

      // Check if user is call_center_agent
      if (parsedUser.role !== 'call_center_agent') {
        logout();
        return;
      }

      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const navigation = [
    { name: 'Dashboard', href: '/agent/dashboard', icon: LayoutDashboard },
    { name: 'Orders', href: '/agent/orders', icon: ShoppingBag },
    { name: 'Settings', href: '/agent/settings', icon: Settings }
  ];

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Agent Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      <div className="min-h-screen bg-white" style={{ margin: 0, padding: 0 }}>
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Black & Blue Theme */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Sidebar header with dynamic logo */}
          <div className="h-20 flex items-center justify-center px-6 border-b border-gray-200 bg-white">
            <DynamicLogo 
              className="justify-center"
              textClassName="text-xl font-bold text-black"
              iconClassName="w-8 h-8"
              linkClassName="justify-center"
            />
          </div>

          {/* User info - In sidebar below header */}
          {user && (
            <div className="px-4 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-lg bg-black">
                  {user.companyName?.charAt(0) || user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.companyName || user.contactPerson || 'Agent'}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
                      Call Center Agent
                    </span>
                    <Headphones className="w-3 h-3 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="px-3 py-4 h-[calc(100vh-11rem)] overflow-y-auto pb-24 custom-scroll">
            <div className="flex items-center gap-2 px-3 mb-4">
              <Headphones className="w-3 h-3 text-blue-600" />
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">AGENT MENU</p>
            </div>
            <div className="space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <div
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-black text-white shadow-lg shadow-black/20'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${
                        active ? 'text-white' : 'text-gray-400 group-hover:text-black'
                      }`} />
                      <span>{item.name}</span>
                    </div>
                    {active && <ChevronRight className="w-4 h-4 text-white" />}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Logout button at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 w-full transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center">
                <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:ml-72 min-h-screen -mt-16">
          {/* Top header - Black & Blue Theme */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm" style={{ margin: 0 }}>
            <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
              <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
                {/* Left section */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Menu className="w-5 h-5" />
                  </button>

                  {/* Dynamic Logo in header (visible on mobile when sidebar closed) */}
                  <div className="lg:hidden">
                    <DynamicLogo 
                      textClassName="text-lg font-bold text-black"
                      iconClassName="w-6 h-6"
                    />
                  </div>

                  {/* Welcome Message */}
                  {user && (
                    <div className="hidden lg:flex items-center gap-2">
                      <span className="text-lg md:text-2xl font-bold text-gray-800">Welcome back,</span>
                      <span className="text-lg md:text-2xl font-bold text-black">{user.companyName || user.contactPerson || 'Agent'}</span>
                      <Headphones className="w-5 h-5 text-gray-400 hidden md:block" />
                      <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200 hidden md:inline-flex items-center gap-1">
                        <Headphones className="w-3 h-3" />
                        Call Center Agent
                      </span>
                    </div>
                  )}
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3">
                  {/* Agent Status Badge */}
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-medium text-green-700">Online</span>
                  </div>

                  <Link
                    href="/"
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors group"
                    title="Go to Homepage"
                  >
                    <Store className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Link>

                  {/* User Dropdown */}
                  {user && (
                    <div className="relative">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="text-right hidden md:block">
                          <p className="text-sm font-medium text-gray-800">{user.companyName || user.contactPerson || 'Agent'}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm bg-black shadow-md">
                          {user.companyName?.charAt(0) || user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {userMenuOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setUserMenuOpen(false)}
                          />
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50">
                            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
                              <p className="text-sm font-semibold text-gray-900">{user.companyName || user.contactPerson || 'Agent'}</p>
                              <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full border bg-blue-50 text-blue-700 border-blue-200">
                                  Call Center Agent
                                </span>
                                <Headphones className="w-3 h-3 text-blue-600" />
                              </div>
                            </div>

                            <div
                              onClick={() => {
                                setUserMenuOpen(false);
                                handleNavigation('/agent/settings');
                              }}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors cursor-pointer"
                            >
                              <Settings className="w-4 h-4 text-gray-500" />
                              <span>Settings</span>
                            </div>

                            <button
                              onClick={() => {
                                setUserMenuOpen(false);
                                logout();
                              }}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left border-t border-gray-200 mt-1 pt-2 rounded-b-2xl"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="" style={{ margin: 0, padding: 0 }}>
            {children}
          </main>
        </div>
      </div>

      {/* Add custom scrollbar styles - Black & Blue */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #000000, #3b82f6);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #1a1a1a, #2563eb);
        }
      `}</style>
    </>
  );
}