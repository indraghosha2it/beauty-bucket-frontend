
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';
// import { 
//   Mail, 
//   Lock, 
//   Eye, 
//   EyeOff, 
//   ArrowRight,
//   Shield,
//   Zap,
//   Headphones,
//   Truck,
//   Cpu,
//   Smartphone,
//   Package,
//   CheckCircle
// } from 'lucide-react';
// import Navbar from '../components/layout/Navbar';
// import GoogleLoginButton from '../components/GoogleLoginButton';
// import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
// import Footer from '../components/layout/Footer';

// export default function LoginClient() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);

//   // Load remembered email
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const rememberedEmail = localStorage.getItem('rememberedEmail');
//       if (rememberedEmail) {
//         setFormData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }));
//       }
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // ========== HELPER: MERGE GUEST CART ==========
//   const mergeGuestCart = async (token) => {
//     try {
//       const guestCartSessionId = localStorage.getItem('cartSessionId');
//       if (!guestCartSessionId) return null;

//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/cart/merge`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'x-session-id': guestCartSessionId
//         },
//         body: JSON.stringify({ sessionId: guestCartSessionId })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         localStorage.removeItem('cartSessionId');
//         window.dispatchEvent(new Event('cart-update'));
//         window.dispatchEvent(new Event('auth-change'));
//         return data.data;
//       }
//       return null;
//     } catch (error) {
//       console.error('❌ Merge cart error:', error);
//       return null;
//     }
//   };

//   // ========== HELPER: MERGE GUEST WISHLIST ==========
//   const mergeGuestWishlist = async (token) => {
//     try {
//       const guestWishlistSessionId = localStorage.getItem('wishlistSessionId');
//       if (!guestWishlistSessionId) return null;

//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/wishlist/merge`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'x-session-id': guestWishlistSessionId
//         },
//         body: JSON.stringify({ sessionId: guestWishlistSessionId })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         localStorage.removeItem('wishlistSessionId');
//         window.dispatchEvent(new Event('wishlist-update'));
//         return data.data;
//       }
//       return null;
//     } catch (error) {
//       console.error('❌ Merge wishlist error:', error);
//       return null;
//     }
//   };

//   // ========== STORE AUTH DATA ==========
//   const storeAuthData = (token, user) => {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
      
//       if (formData.rememberMe) {
//         localStorage.setItem('rememberedEmail', formData.email);
//       } else {
//         localStorage.removeItem('rememberedEmail');
//       }
      
//       return true;
//     }
//     return false;
//   };

//   const getDashboardPath = (role) => {
//     switch(role) {
//       case 'super_admin':
//       case 'admin':
//       case 'moderator':
//         return '/authorize/dashboard';
//       case 'call_center_agent':
//         return '/agent/dashboard';
//       default:
//         return '/customer/dashboard';
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const loadingToast = toast.loading('Logging in...');

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         if (data.requiresVerification) {
//           toast.info('Verify Your Email', {
//             description: 'Please check your email for verification code.',
//             duration: 5000,
//           });
//           setIsSubmitting(false);
//           return;
//         }
        
//         if (data.error && data.error.includes('google')) {
//           toast.error('Google Account Detected', {
//             description: 'This account uses Google Sign-In. Please use the "Continue with Google" button.',
//             duration: 6000,
//           });
//           setIsSubmitting(false);
//           return;
//         }
        
//         toast.error('Login failed', {
//           description: data.error || 'Please check your credentials and try again.',
//           duration: 5000,
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       toast.success('Welcome back!', {
//         description: `Logged in as ${data.user.contactPerson || data.user.email?.split('@')[0]}`,
//         duration: 4000,
//       });

//       const storeSuccess = storeAuthData(data.token, data.user);
//       if (!storeSuccess) {
//         toast.error('Storage Error', {
//           description: 'Failed to save login session. Please try again.',
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       window.dispatchEvent(new Event('auth-change'));
//       await new Promise(resolve => setTimeout(resolve, 300));

//       await mergeGuestCart(data.token);
//       await mergeGuestWishlist(data.token);

//       setTimeout(() => {
//         const userRole = data.user.role;
//         const dashboardPath = getDashboardPath(userRole);
//         window.location.href = dashboardPath;
//       }, 1500);

//     } catch (error) {
//       console.error('Login error:', error);
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error', {
//         description: 'Unable to connect. Please try again!',
//         duration: 5000,
//       });
//       setIsSubmitting(false);
//     }
//   };

//   const handleGoogleSuccess = async (data) => {
//     console.log('✅ Google sign in success:', data);
    
//     if (data.token) {
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       window.dispatchEvent(new Event('auth-change'));

//       await new Promise(resolve => setTimeout(resolve, 300));
//       await mergeGuestCart(data.token);
//       await mergeGuestWishlist(data.token);
      
//       setTimeout(() => {
//         const userRole = data.user.role;
//         const dashboardPath = getDashboardPath(userRole);
//         window.location.href = dashboardPath;
//       }, 1500);
      
//       if (data.requiresAdditionalInfo) {
//         toast.success('Google Sign In Successful!', {
//           description: 'Please complete your profile to continue.',
//           duration: 4000,
//         });
//       } else {
//         toast.success('Welcome back!', {
//           description: `Logged in as ${data.user.contactPerson || data.user.email?.split('@')[0]}`,
//           duration: 4000,
//         });
//       }
//     }
//   };

//   const handleGoogleError = (error) => {
//     console.error('Google sign in error:', error);
//     toast.error('Google Sign In Failed', {
//       description: error || 'Unable to sign in with Google. Please try again.',
//     });
//   };

//   return (
//     <>
//       <Navbar />
    
//       <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden relative">
        
//         {/* Background Pattern */}
//         <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
//           <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
//                 <rect width="30" height="30" fill="none" stroke="#000000" strokeWidth="0.5"/>
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)" />
//           </svg>
//         </div>

//         {/* Decorative Circles */}
//         <div className="absolute top-20 left-10 w-64 h-64 bg-black/5 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute bottom-20 right-10 w-80 h-80 bg-black/5 rounded-full blur-3xl pointer-events-none" />

//         <div className="container mx-auto px-4 min-h-[calc(100vh-64px)] flex items-center justify-center py-8">
//           <div className="max-w-md w-full mx-auto">
            
//             {/* Logo & Header */}
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//               className="text-center mb-6"
//             >
//               <div className="flex justify-center mb-3">
//                 <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
//                   <Package className="w-7 h-7 text-white" />
//                 </div>
//               </div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                 Smart Gadget
//               </h1>
//               <p className="text-sm text-gray-500 mt-1">
//                 Sign in to your Smart Gadget account
//               </p>
//             </motion.div>

//             {/* Login Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: 0.1 }}
//               className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
//             >
//               <div className="p-5">
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   {/* Email Field */}
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Email Address
//                     </label>
//                     <div className="relative group">
//                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:border-black focus:ring-2 focus:ring-black/20 transition-all bg-gray-50 focus:bg-white"
//                         placeholder="Enter your email"
//                       />
//                     </div>
//                   </div>

//                   {/* Password Field */}
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Password
//                     </label>
//                     <div className="relative group">
//                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         className="w-full pl-9 pr-9 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:border-black focus:ring-2 focus:ring-black/20 transition-all bg-gray-50 focus:bg-white"
//                         placeholder="Enter your password"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                       >
//                         {showPassword ? (
//                           <EyeOff className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
//                         ) : (
//                           <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   {/* Options Row */}
//                   <div className="flex justify-end">
//                     <button
//                       type="button"
//                       onClick={() => setShowForgotPassword(true)}
//                       className="text-xs text-black hover:text-gray-700 font-medium transition-colors"
//                     >
//                       Forgot password?
//                     </button>
//                   </div>

//                   {/* Submit Button */}
//                   <motion.button
//                     whileHover={{ scale: 1.01 }}
//                     whileTap={{ scale: 0.99 }}
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-black text-white py-2 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Signing in...
//                       </>
//                     ) : (
//                       <>
//                         Sign In
//                         <ArrowRight className="w-4 h-4" />
//                       </>
//                     )}
//                   </motion.button>

//                   {/* Divider */}
//                   <div className="relative my-3">
//                     <div className="absolute inset-0 flex items-center">
//                       <div className="w-full border-t border-gray-200" />
//                     </div>
//                     <div className="relative flex justify-center">
//                       <span className="px-3 bg-white text-gray-400 text-xs">
//                         OR
//                       </span>
//                     </div>
//                   </div>

//                   {/* Google Login Button */}
//                   <div className="w-full">
//                     <GoogleLoginButton 
//                       mode="login"
//                       onSuccess={handleGoogleSuccess}
//                       onError={handleGoogleError}
//                     />
//                   </div>

//                   {/* Register Link */}
//                   <div className="text-center pt-1">
//                     <p className="text-xs text-gray-500">
//                       New to Smart Gadget?{' '}
//                       <Link href="/register" className="font-medium text-black hover:text-gray-700 transition-colors">
//                         Create an account
//                       </Link>
//                     </p>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>

//             {/* Features Row - Compact */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="grid grid-cols-4 gap-2 mt-5"
//             >
//               <div className="flex flex-col items-center gap-1 px-2 py-2 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
//                 <Shield className="w-4 h-4 text-gray-700" />
//                 <span className="text-[10px] text-gray-600">Secure</span>
//               </div>
//               <div className="flex flex-col items-center gap-1 px-2 py-2 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
//                 <Truck className="w-4 h-4 text-gray-700" />
//                 <span className="text-[10px] text-gray-600">Fast Ship</span>
//               </div>
//               <div className="flex flex-col items-center gap-1 px-2 py-2 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
//                 <Zap className="w-4 h-4 text-gray-700" />
//                 <span className="text-[10px] text-gray-600">1-Yr Warranty</span>
//               </div>
//               <div className="flex flex-col items-center gap-1 px-2 py-2 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
//                 <Headphones className="w-4 h-4 text-gray-700" />
//                 <span className="text-[10px] text-gray-600">24/7</span>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Forgot Password Modal */}
//         <ForgotPasswordModal 
//           isOpen={showForgotPassword}
//           onClose={() => setShowForgotPassword(false)}
//         />
//       </div>
//       <Footer />
//     </>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Shield,
  Headphones,
  Truck,
  Sparkles,
  Flower2,
  Heart,
  Gift,
  Star
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import GoogleLoginButton from '../components/GoogleLoginButton';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
import Footer from '../components/layout/Footer';

// Font family constant
const FONT_FAMILY = "'Courgette', cursive";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

export default function LoginClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Load remembered email
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        setFormData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // ========== HELPER: MERGE GUEST CART ==========
  const mergeGuestCart = async (token) => {
    try {
      const guestCartSessionId = localStorage.getItem('cartSessionId');
      if (!guestCartSessionId) return null;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/cart/merge`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'x-session-id': guestCartSessionId
        },
        body: JSON.stringify({ sessionId: guestCartSessionId })
      });
      
      const data = await response.json();
      if (data.success) {
        localStorage.removeItem('cartSessionId');
        window.dispatchEvent(new Event('cart-update'));
        window.dispatchEvent(new Event('auth-change'));
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('❌ Merge cart error:', error);
      return null;
    }
  };

  // ========== HELPER: MERGE GUEST WISHLIST ==========
  const mergeGuestWishlist = async (token) => {
    try {
      const guestWishlistSessionId = localStorage.getItem('wishlistSessionId');
      if (!guestWishlistSessionId) return null;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/wishlist/merge`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'x-session-id': guestWishlistSessionId
        },
        body: JSON.stringify({ sessionId: guestWishlistSessionId })
      });
      
      const data = await response.json();
      if (data.success) {
        localStorage.removeItem('wishlistSessionId');
        window.dispatchEvent(new Event('wishlist-update'));
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('❌ Merge wishlist error:', error);
      return null;
    }
  };

  // ========== STORE AUTH DATA ==========
  const storeAuthData = (token, user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      return true;
    }
    return false;
  };

  const getDashboardPath = (role) => {
    switch(role) {
      case 'super_admin':
      case 'admin':
      case 'moderator':
        return '/authorize/dashboard';
      case 'call_center_agent':
        return '/agent/dashboard';
      default:
        return '/customer/dashboard';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading('Logging in...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        if (data.requiresVerification) {
          toast.info('Verify Your Email', {
            description: 'Please check your email for verification code.',
            duration: 5000,
          });
          setIsSubmitting(false);
          return;
        }
        
        if (data.error && data.error.includes('google')) {
          toast.error('Google Account Detected', {
            description: 'This account uses Google Sign-In. Please use the "Continue with Google" button.',
            duration: 6000,
          });
          setIsSubmitting(false);
          return;
        }
        
        toast.error('Login failed', {
          description: data.error || 'Please check your credentials and try again.',
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      toast.success('Welcome back!', {
        description: `Logged in as ${data.user.contactPerson || data.user.email?.split('@')[0]}`,
        duration: 4000,
      });

      const storeSuccess = storeAuthData(data.token, data.user);
      if (!storeSuccess) {
        toast.error('Storage Error', {
          description: 'Failed to save login session. Please try again.',
        });
        setIsSubmitting(false);
        return;
      }

      window.dispatchEvent(new Event('auth-change'));
      await new Promise(resolve => setTimeout(resolve, 300));

      await mergeGuestCart(data.token);
      await mergeGuestWishlist(data.token);

      setTimeout(() => {
        const userRole = data.user.role;
        const dashboardPath = getDashboardPath(userRole);
        window.location.href = dashboardPath;
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect. Please try again!',
        duration: 5000,
      });
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (data) => {
    console.log('✅ Google sign in success:', data);
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('auth-change'));

      await new Promise(resolve => setTimeout(resolve, 300));
      await mergeGuestCart(data.token);
      await mergeGuestWishlist(data.token);
      
      setTimeout(() => {
        const userRole = data.user.role;
        const dashboardPath = getDashboardPath(userRole);
        window.location.href = dashboardPath;
      }, 1500);
      
      if (data.requiresAdditionalInfo) {
        toast.success('Google Sign In Successful!', {
          description: 'Please complete your profile to continue.',
          duration: 4000,
        });
      } else {
        toast.success('Welcome back!', {
          description: `Logged in as ${data.user.contactPerson || data.user.email?.split('@')[0]}`,
          duration: 4000,
        });
      }
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google sign in error:', error);
    toast.error('Google Sign In Failed', {
      description: error || 'Unable to sign in with Google. Please try again.',
    });
  };

  // Animating text variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      <Navbar />
    
      <div className="min-h-[calc(100vh-64px)] bg-white overflow-hidden relative">
        
        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
          
          {/* Left Side - Image with Better Text Visibility */}
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden min-h-[500px]">
            {/* Background Image */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: 'url(/images/login.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            
            {/* Enhanced Dark Gradient Overlay for Better Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-[#2D1B2E]/50 to-[#EE4275]/30"></div>
            
            {/* Secondary Overlay for Better Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
            
            {/* Pink Border Frame */}
            <div className="absolute inset-4 rounded-2xl border border-white/20"></div>
            
            {/* Inner Glow */}
            <div className="absolute inset-0 rounded-3xl shadow-inner shadow-[#EE4275]/10"></div>

            {/* Floating Sparkles - Subtle animation */}
            <motion.div 
              className="absolute top-1/3 right-12 z-20"
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-4 h-4 text-white/60" />
            </motion.div>

            <motion.div 
              className="absolute bottom-1/3 left-12 z-20"
              animate={{
                y: [0, 8, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-white/50" />
            </motion.div>

            <motion.div 
              className="absolute top-1/4 left-1/4 z-20"
              animate={{
                y: [0, -5, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Sparkles className="w-2.5 h-2.5 text-white/40" />
            </motion.div>

            <motion.div 
              className="absolute bottom-1/4 right-1/4 z-20"
              animate={{
                y: [0, 6, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8
              }}
            >
              <Sparkles className="w-2 h-2 text-white/40" />
            </motion.div>

            {/* Decorative lines - White/Pink */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent z-20"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent z-20"></div>

            {/* Content on Left Side - With better contrast */}
            <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-12 text-center py-8">
              {/* Brand Icon */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                className="mb-4"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-2xl">
                  <Flower2 className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              {/* Animated Text - With better visibility - Using Courgette */}
              <div className="space-y-2.5">
                <motion.h1
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg"
                  style={{ fontFamily: FONT_FAMILY, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                >
                  Welcome Back
                </motion.h1>
                
                <motion.p
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="text-lg text-white/95 drop-shadow-md"
                  style={{ fontFamily: FONT_FAMILY, textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
                >
                  Your Beauty Journey Continues
                </motion.p>
                
                <motion.div
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="w-16 h-0.5 bg-white/60 mx-auto rounded-full"
                />
                
                <motion.p
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="text-sm text-white/90 max-w-sm mx-auto leading-relaxed drop-shadow-md"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  Discover premium beauty products curated just for you.
                </motion.p>
                
                <motion.p
                  custom={4}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="text-xs text-white/80 max-w-sm mx-auto leading-relaxed drop-shadow-sm"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  From skincare essentials to luxury makeup — find everything you need to glow with confidence.
                </motion.p>
                
                <motion.p
                  custom={5}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed drop-shadow-sm"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  ✨ Expertly curated • Premium quality • Loved by thousands
                </motion.p>
                
                <motion.div
                  custom={6}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="flex items-center justify-center gap-4 mt-2"
                >
                  <div className="flex items-center gap-1.5 text-white/80 text-[10px] drop-shadow-sm" style={{ fontFamily: FONT_FAMILY }}>
                    <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                    <span>Premium</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80 text-[10px] drop-shadow-sm" style={{ fontFamily: FONT_FAMILY }}>
                    <Heart className="w-3 h-3 text-pink-200" />
                    <span>Loved</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80 text-[10px] drop-shadow-sm" style={{ fontFamily: FONT_FAMILY }}>
                    <Gift className="w-3 h-3 text-yellow-300" />
                    <span>Offers</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80 text-[10px] drop-shadow-sm" style={{ fontFamily: FONT_FAMILY }}>
                    <Shield className="w-3 h-3 text-green-300" />
                    <span>Safe</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex-1 lg:w-1/2 bg-white flex items-center justify-center py-6 px-4 lg:px-8">
            <div className="w-full max-w-md">
              {/* Mobile Brand - Visible on small screens */}
              <div className="lg:hidden text-center mb-4">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EE4275] to-[#FF6B9D] flex items-center justify-center shadow-lg shadow-[#EE4275]/25">
                    <Flower2 className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h1 className="text-xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY }}>
                  <span className="text-[#EE4275]">Welcome</span> Back
                </h1>
                <p className="text-xs text-[#8B7A8C] mt-0.5" style={{ fontFamily: FONT_FAMILY }}>Sign in to continue your beauty journey</p>
              </div>

              {/* Desktop Header - Visible on large screens */}
              <div className="hidden lg:block mb-4">
                <h1 className="text-2xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY }}>
                  <span className="text-[#EE4275]">Welcome</span> Back
                </h1>
                <p className="text-sm text-[#8B7A8C] mt-0.5" style={{ fontFamily: FONT_FAMILY }}>Sign in to continue your beauty journey</p>
              </div>

              {/* Login Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-2xl border border-[#FFD2DB]/40 shadow-lg shadow-[#EE4275]/5 overflow-hidden"
              >
                <div className="p-5 sm:p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                      <label className="block text-xs font-medium text-[#2D1B2E] mb-1" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                        Email Address
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#C4B5C5] group-focus-within:text-[#EE4275] transition-colors" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-9 pr-3 py-2 text-sm text-[#2D1B2E] border border-[#FFD2DB]/50 rounded-xl focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all bg-[#FFF5F6]/50 focus:bg-white"
                          style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="block text-xs font-medium text-[#2D1B2E] mb-1" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                        Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#C4B5C5] group-focus-within:text-[#EE4275] transition-colors" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full pl-9 pr-9 py-2 text-sm text-[#2D1B2E] border border-[#FFD2DB]/50 rounded-xl focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all bg-[#FFF5F6]/50 focus:bg-white"
                          style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-[#C4B5C5] hover:text-[#EE4275] transition-colors" />
                          ) : (
                            <Eye className="w-4 h-4 text-[#C4B5C5] hover:text-[#EE4275] transition-colors" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Options Row */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                    
                      </label>
                      
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-[10px] text-[#EE4275] hover:text-[#EE4275]/70 font-medium transition-colors"
                        style={{ fontFamily: FONT_FAMILY }}
                      >
                        Forgot password?
                      </button>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white py-2 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>

                    {/* Divider */}
                    <div className="relative my-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#FFD2DB]/50" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-3 bg-white text-[#C4B5C5] text-[10px]" style={{ fontFamily: FONT_FAMILY }}>
                          OR
                        </span>
                      </div>
                    </div>

                    {/* Google Login Button */}
                    <div className="w-full">
                      <GoogleLoginButton 
                        mode="login"
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                      />
                    </div>

                    {/* Register Link */}
                    <div className="text-center pt-0.5">
                      <p className="text-[10px] text-[#8B7A8C]" style={{ fontFamily: FONT_FAMILY }}>
                        New to BeautyBucket?{' '}
                        <Link href="/register" className="font-medium text-[#EE4275] hover:text-[#EE4275]/70 transition-colors" style={{ fontFamily: FONT_FAMILY }}>
                          Create an account
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Forgot Password Modal */}
        <ForgotPasswordModal 
          isOpen={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
        />
      </div>
      <Footer />
    </>
  );
}