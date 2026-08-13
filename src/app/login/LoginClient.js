
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
//   Sparkles,
//   Zap,
//   Battery,
//   Cpu,
//   CheckCircle,
//   Store,
//   Fingerprint,
//   Smartphone,
//   ShieldCheck,
//   Award,
//   Zap as ZapIcon
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
//       if (!guestCartSessionId) {
//         console.log('📭 No guest cart session ID found to merge');
//         return null;
//       }

//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       console.log('🔄 Merging guest cart with session ID:', guestCartSessionId);
      
//       const response = await fetch(`${apiUrl}/api/cart/merge`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'x-session-id': guestCartSessionId
//         },
//         body: JSON.stringify({ 
//           sessionId: guestCartSessionId 
//         })
//       });
      
//       const data = await response.json();
//       console.log('📦 Cart merge response:', data);
      
//       if (data.success) {
//         localStorage.removeItem('cartSessionId');
//         window.dispatchEvent(new Event('cart-update'));
//         window.dispatchEvent(new Event('auth-change'));
//         console.log('✅ Guest cart merged successfully');
//         return data.data;
//       } else {
//         console.warn('⚠️ Cart merge failed:', data.message || 'Unknown error');
//         return null;
//       }
//     } catch (error) {
//       console.error('❌ Merge cart error:', error);
//       return null;
//     }
//   };

//   // ========== HELPER: MERGE GUEST WISHLIST ==========
//   const mergeGuestWishlist = async (token) => {
//     try {
//       const guestWishlistSessionId = localStorage.getItem('wishlistSessionId');
//       if (!guestWishlistSessionId) {
//         console.log('📭 No guest wishlist session ID found to merge');
//         return null;
//       }

//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       console.log('🔄 Merging guest wishlist with session ID:', guestWishlistSessionId);
      
//       const response = await fetch(`${apiUrl}/api/wishlist/merge`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'x-session-id': guestWishlistSessionId
//         },
//         body: JSON.stringify({ 
//           sessionId: guestWishlistSessionId 
//         })
//       });
      
//       const data = await response.json();
//       console.log('📦 Wishlist merge response:', data);
      
//       if (data.success) {
//         localStorage.removeItem('wishlistSessionId');
//         window.dispatchEvent(new Event('wishlist-update'));
//         console.log('✅ Guest wishlist merged successfully');
//         return data.data;
//       } else {
//         console.warn('⚠️ Wishlist merge failed:', data.message || 'Unknown error');
//         return null;
//       }
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
      
//       const storedToken = localStorage.getItem('token');
//       const storedUser = localStorage.getItem('user');
//       console.log('💾 Stored token:', storedToken ? 'Yes' : 'No');
//       console.log('💾 Stored user:', storedUser ? 'Yes' : 'No');
      
//       if (!storedToken || !storedUser) {
//         console.error('❌ Failed to store auth data in localStorage');
//         return false;
//       }
      
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
//       console.log('🔐 Attempting login at:', `${apiUrl}/api/auth/login`);
      
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

//       console.log('📦 Login response status:', response.status);
//       console.log('📦 Login response data:', data);

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

//       // ✅ SUCCESSFUL LOGIN
//       console.log('✅ Login successful! User data:', data.user);
//       console.log('✅ User role:', data.user.role);

//       toast.success('Welcome back!', {
//         description: `Logged in as ${data.user.contactPerson || data.user.email?.split('@')[0]}`,
//         duration: 4000,
//       });

//       // ✅ Store auth data FIRST
//       const storeSuccess = storeAuthData(data.token, data.user);
//       if (!storeSuccess) {
//         toast.error('Storage Error', {
//           description: 'Failed to save login session. Please try again.',
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       // ✅ Dispatch auth change event
//       window.dispatchEvent(new Event('auth-change'));

//       // ✅ Wait a moment for token to be set
//       await new Promise(resolve => setTimeout(resolve, 300));

//       // ✅ Merge guest cart
//       const cartMergeResult = await mergeGuestCart(data.token);
//       console.log('📦 Cart merge result:', cartMergeResult);

//       // ✅ Merge guest wishlist
//       const wishlistMergeResult = await mergeGuestWishlist(data.token);
//       console.log('📦 Wishlist merge result:', wishlistMergeResult);

//       // ✅ ROLE-BASED REDIRECT
//       setTimeout(() => {
//         const userRole = data.user.role;
//         console.log('🔍 Redirecting based on role:', userRole);
//         const dashboardPath = getDashboardPath(userRole);
//         console.log('🚀 Redirecting to:', dashboardPath);
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
//       // Store auth data
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
      
//       // Dispatch auth change event
//       window.dispatchEvent(new Event('auth-change'));

//       // Wait a moment for token to be set
//       await new Promise(resolve => setTimeout(resolve, 300));

//       // Merge guest cart
//       await mergeGuestCart(data.token);
      
//       // Merge guest wishlist
//       await mergeGuestWishlist(data.token);
      
//       // GOOGLE LOGIN ROLE-BASED REDIRECT
//       setTimeout(() => {
//         const userRole = data.user.role;
//         console.log('🔍 Google login - Redirecting based on role:', userRole);
//         const dashboardPath = getDashboardPath(userRole);
//         console.log('🚀 Google - Redirecting to:', dashboardPath);
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
      
//       <div className="min-h-[calc(100vh-64px)] bg-[#dae5e8] overflow-hidden relative">
        
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#06B6D4]/20 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#06B6D4]/5 to-[#0D506F]/5 rounded-full blur-2xl"></div>
          
//           {/* Floating Particles */}
//           <motion.div 
//             className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#06B6D4] rounded-full shadow-lg shadow-[#06B6D4]/50"
//             animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
//             transition={{ duration: 3, repeat: Infinity }}
//           />
//           <motion.div 
//             className="absolute top-3/4 right-1/4 w-2.5 h-2.5 bg-white/60 rounded-full shadow-lg shadow-white/20"
//             animate={{ y: [0, 20, 0], opacity: [0.2, 0.8, 0.2] }}
//             transition={{ duration: 4, repeat: Infinity, delay: 1 }}
//           />
//           <motion.div 
//             className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#06B6D4] rounded-full shadow-lg shadow-[#06B6D4]/50"
//             animate={{ y: [0, -15, 0], opacity: [0.4, 0.9, 0.4] }}
//             transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
//           />
//           <motion.div 
//             className="absolute top-1/2 right-1/3 w-1 h-1 bg-white/40 rounded-full"
//             animate={{ y: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
//             transition={{ duration: 2.8, repeat: Infinity, delay: 1.5 }}
//           />
//           <motion.div 
//             className="absolute top-1/3 right-1/2 w-1.5 h-1.5 bg-[#06B6D4] rounded-full shadow-lg shadow-[#06B6D4]/30"
//             animate={{ y: [0, -25, 0], opacity: [0.2, 0.7, 0.2] }}
//             transition={{ duration: 5, repeat: Infinity, delay: 2 }}
//           />
//         </div>

//         <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8">
//           <div className="w-full max-w-6xl mx-auto">
            
//             {/* Main Card - Premium Glass Effect */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, ease: "easeOut" }}
//               className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl shadow-[#06B6D4]/10 overflow-hidden relative"
//             >
//               {/* Glow Effect */}
//               <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#06B6D4]/30 rounded-full blur-3xl"></div>
//               <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#0D506F]/30 rounded-full blur-3xl"></div>
              
//               <div className="grid grid-cols-1 lg:grid-cols-2 relative">
                
//                 {/* Left Side - Branding & Features */}
//                 <div className="relative p-8 lg:p-12 bg-gradient-to-br from-[#0D506F] via-[#0A3D55] to-[#06B6D4] flex flex-col justify-center order-2 lg:order-1">
//                   <div className="relative z-10">
                 

//                     <motion.h1 
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.2, duration: 0.5 }}
//                       className="text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight"
//                       style={{ fontFamily: "'Inter', sans-serif" }}
//                     >
//                       Welcome Back
//                       <br />
//                       <span className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] bg-clip-text text-transparent">to HyperVolt</span>
//                     </motion.h1>
                    
//                     <motion.p 
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.3, duration: 0.5 }}
//                       className="text-white/70 text-sm mb-8 max-w-sm"
//                     >
//                       Sign in to access your account and manage your orders
//                     </motion.p>

//                     {/* Feature Cards */}
//                     <motion.div 
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.4, duration: 0.5 }}
//                       className="grid grid-cols-2 gap-3"
//                     >
//                       <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/20 transition-all duration-300 group cursor-default">
//                         <div className="flex items-center gap-2 mb-1">
//                           <div className="p-1.5 bg-[#06B6D4]/20 rounded-lg group-hover:bg-[#06B6D4]/30 transition-colors">
//                             <Zap className="w-3.5 h-3.5 text-[#06B6D4]" />
//                           </div>
//                           <span className="text-white text-xs font-medium">Fast Checkout</span>
//                         </div>
//                         <p className="text-white/40 text-[10px]">One-click ordering</p>
//                       </div>
//                       <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/20 transition-all duration-300 group cursor-default">
//                         <div className="flex items-center gap-2 mb-1">
//                           <div className="p-1.5 bg-[#06B6D4]/20 rounded-lg group-hover:bg-[#06B6D4]/30 transition-colors">
//                             <ShieldCheck className="w-3.5 h-3.5 text-[#06B6D4]" />
//                           </div>
//                           <span className="text-white text-xs font-medium">Secure</span>
//                         </div>
//                         <p className="text-white/40 text-[10px]">100% protected</p>
//                       </div>
//                       <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/20 transition-all duration-300 group cursor-default">
//                         <div className="flex items-center gap-2 mb-1">
//                           <div className="p-1.5 bg-[#06B6D4]/20 rounded-lg group-hover:bg-[#06B6D4]/30 transition-colors">
//                             <Battery className="w-3.5 h-3.5 text-[#06B6D4]" />
//                           </div>
//                           <span className="text-white text-xs font-medium">Premium</span>
//                         </div>
//                         <p className="text-white/40 text-[10px]">Quality products</p>
//                       </div>
//                       <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/20 transition-all duration-300 group cursor-default">
//                         <div className="flex items-center gap-2 mb-1">
//                           <div className="p-1.5 bg-[#06B6D4]/20 rounded-lg group-hover:bg-[#06B6D4]/30 transition-colors">
//                             <Award className="w-3.5 h-3.5 text-[#06B6D4]" />
//                           </div>
//                           <span className="text-white text-xs font-medium">Trusted</span>
//                         </div>
//                         <p className="text-white/40 text-[10px]">By thousands</p>
//                       </div>
//                     </motion.div>

//                     {/* Trust Badges */}
//                     <motion.div 
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.6, duration: 0.5 }}
//                       className="mt-8 flex items-center gap-6"
//                     >
//                       <div className="flex items-center gap-2">
//                         <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse"></div>
//                         <span className="text-white/40 text-[10px]">2FA Security</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse delay-300"></div>
//                         <span className="text-white/40 text-[10px]">Encrypted</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse delay-700"></div>
//                         <span className="text-white/40 text-[10px]">24/7 Support</span>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </div>

//                 {/* Right Side - Login Form */}
//                 <div className="p-8 lg:p-12 bg-white/95 backdrop-blur-sm order-1 lg:order-2 border-l border-white/10 rounded-r-3xl">
//                   <div className="max-w-sm mx-auto">
//                     {/* Mobile Header */}
//                     <div className="lg:hidden text-center mb-8">
//                       <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#0D506F] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#06B6D4]/20">
//                         <Zap className="w-7 h-7 text-white" />
//                       </div>
//                       <h2 className="text-2xl font-bold text-[#0D506F]">Welcome Back</h2>
//                       <p className="text-sm text-[#64748B] mt-1">Sign in to continue</p>
//                     </div>

//                     {/* Desktop Header */}
//                     <div className="hidden lg:block mb-8">
//                       <h2 className="text-2xl font-bold text-[#0D506F]">Sign In</h2>
//                       <p className="text-sm text-[#64748B] mt-1">Enter your credentials to access your account</p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-5">
//                       <div>
//                         <label className="block text-sm font-medium text-[#0D506F] mb-1.5">
//                           Email Address
//                         </label>
//                         <div className="relative group">
//                           <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] group-focus-within:text-[#06B6D4] transition-colors">
//                             <Mail className="w-4 h-4" />
//                           </div>
//                           <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             className="w-full pl-10 pr-4 py-3 text-sm text-[#0D506F] bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:border-[#06B6D4] focus:ring-4 focus:ring-[#06B6D4]/10 transition-all outline-none placeholder:text-[#94A3B8]"
//                             placeholder="Enter your email"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-[#0D506F] mb-1.5">
//                           Password
//                         </label>
//                         <div className="relative group">
//                           <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] group-focus-within:text-[#06B6D4] transition-colors">
//                             <Lock className="w-4 h-4" />
//                           </div>
//                           <input
//                             type={showPassword ? "text" : "password"}
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             className="w-full pl-10 pr-12 py-3 text-sm text-[#0D506F] bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:border-[#06B6D4] focus:ring-4 focus:ring-[#06B6D4]/10 transition-all outline-none placeholder:text-[#94A3B8]"
//                             placeholder="Enter your password"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                           >
//                             {showPassword ? (
//                               <EyeOff className="w-4 h-4 text-[#94A3B8] hover:text-[#06B6D4] transition-colors" />
//                             ) : (
//                               <Eye className="w-4 h-4 text-[#94A3B8] hover:text-[#06B6D4] transition-colors" />
//                             )}
//                           </button>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <label className="flex items-center gap-2 cursor-pointer group">
                      
//                         </label>
//                         <button
//                           type="button"
//                           onClick={() => setShowForgotPassword(true)}
//                           className="text-sm text-[#06B6D4] hover:text-[#0891B2] font-medium transition-colors hover:underline"
//                         >
//                           Forgot password?
//                         </button>
//                       </div>

//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="w-full bg-gradient-to-r from-[#0D506F] to-[#06B6D4] text-white py-3 rounded-xl font-semibold text-sm hover:shadow-xl hover:shadow-[#0D506F]/30 transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
//                       >
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//                         {isSubmitting ? (
//                           <>
//                             <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Signing in...
//                           </>
//                         ) : (
//                           <>
//                             Sign In
//                             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                           </>
//                         )}
//                       </motion.button>

//                       <div className="relative my-3">
//                         <div className="absolute inset-0 flex items-center">
//                           <div className="w-full border-t border-[#E2E8F0]" />
//                         </div>
//                         <div className="relative flex justify-center">
//                           <span className="px-3 bg-white text-[#94A3B8] text-xs font-medium">
//                             or continue with
//                           </span>
//                         </div>
//                       </div>

//                       <div className="w-full">
//                         <GoogleLoginButton 
//                           mode="login"
//                           onSuccess={handleGoogleSuccess}
//                           onError={handleGoogleError}
//                         />
//                       </div>

//                       <div className="text-center pt-1">
//                         <p className="text-sm text-[#64748B]">
//                           Don't have an account?{' '}
//                           <Link href="/register" className="font-medium text-[#06B6D4] hover:text-[#0891B2] transition-colors hover:underline">
//                             Create one
//                           </Link>
//                         </p>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Footer Link */}
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.8, duration: 0.5 }}
//               className="text-center mt-6"
//             >
//               <p className="text-[#004868]/90 text-xs">
//                 ©  HyperVolt. All rights reserved.
//               </p>
//             </motion.div>
//           </div>
//         </div>

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
  Zap,
  Headphones,
  Truck,
  Cpu,
  Smartphone,
  Package,
  CheckCircle
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import GoogleLoginButton from '../components/GoogleLoginButton';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
import Footer from '../components/layout/Footer';

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

  return (
    <>
      <Navbar />
    
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden relative">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <rect width="30" height="30" fill="none" stroke="#000000" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-black/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-black/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 min-h-[calc(100vh-64px)] flex items-center justify-center py-8">
          <div className="max-w-md w-full mx-auto">
            
            {/* Logo & Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-6"
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="w-7 h-7 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Smart Gadget
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Sign in to your Smart Gadget account
              </p>
            </motion.div>

            {/* Login Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:border-black focus:ring-2 focus:ring-black/20 transition-all bg-gray-50 focus:bg-white"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-9 pr-9 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:border-black focus:ring-2 focus:ring-black/20 transition-all bg-gray-50 focus:bg-white"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Options Row */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-xs text-black hover:text-gray-700 font-medium transition-colors"
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
                    className="w-full bg-black text-white py-2 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white text-gray-400 text-xs">
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
                  <div className="text-center pt-1">
                    <p className="text-xs text-gray-500">
                      New to Smart Gadget?{' '}
                      <Link href="/register" className="font-medium text-black hover:text-gray-700 transition-colors">
                        Create an account
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Features Row - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-4 gap-2 mt-5"
            >
              <div className="flex flex-col items-center gap-1 px-2 py-2 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <Shield className="w-4 h-4 text-gray-700" />
                <span className="text-[10px] text-gray-600">Secure</span>
              </div>
              <div className="flex flex-col items-center gap-1 px-2 py-2 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <Truck className="w-4 h-4 text-gray-700" />
                <span className="text-[10px] text-gray-600">Fast Ship</span>
              </div>
              <div className="flex flex-col items-center gap-1 px-2 py-2 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <Zap className="w-4 h-4 text-gray-700" />
                <span className="text-[10px] text-gray-600">1-Yr Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1 px-2 py-2 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <Headphones className="w-4 h-4 text-gray-700" />
                <span className="text-[10px] text-gray-600">24/7</span>
              </div>
            </motion.div>
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