
// 'use client';

// import { useRef, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Mail, 
//   Lock, 
//   Eye, 
//   EyeOff, 
//   User, 
//   Phone, 
//   Globe, 
//   Sparkles,
//   Shield,
//   Zap,
//   Headphones,
//   Truck,
//   Smartphone,
//   Home,
//   Building2,
//   MapPinned,
//   ArrowRight,
//   ShieldCheck,
//   Battery,
//   Award
// } from 'lucide-react';
// import Navbar from '../components/layout/Navbar';
// import GoogleLoginButton from '../components/GoogleLoginButton';
// import Footer from '../components/layout/Footer';

// // Helper component for required field label
// const RequiredLabel = ({ children }) => (
//   <span>
//     {children}
//     <span className="text-[#06B6D4] ml-0.5">*</span>
//   </span>
// );

// export default function RegisterClient() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     country: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     password: '',
//     confirmPassword: '',
//     agreeToTerms: false
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   // OTP Modal States
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [otpEmail, setOtpEmail] = useState('');
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const [registrationData, setRegistrationData] = useState(null);
//   const timerRef = useRef(null);

//   // Helper function to format seconds as MM:SS
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match!');
//       setIsSubmitting(false);
//       return;
//     }

//     if (!formData.agreeToTerms) {
//       toast.error('Please agree to the terms and conditions');
//       setIsSubmitting(false);
//       return;
//     }

//     const loadingToast = toast.loading('Creating your account...');

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           contactPerson: formData.contactPerson,
//           email: formData.email,
//           phone: formData.phone,
//           whatsapp: formData.whatsapp,
//           country: formData.country,
//           address: formData.address,
//           city: formData.city,
//           zipCode: formData.zipCode,
//           password: formData.password,
//           role: 'customer'
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         toast.error(data.error || 'Registration failed');
//         setIsSubmitting(false);
//         return;
//       }

//       toast.success('Account created!', {
//         description: 'Please enter the OTP sent to your email.',
//         duration: 4000,
//       });

//       setOtpEmail(formData.email);
//       setRegistrationData(data);
//       setShowOtpModal(true);
//       setOtp('');
//       setIsSubmitting(false);
//       startCountdown();

//     } catch (error) {
//       console.error('Registration error:', error);
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server. Please try again!',
//       });
//       setIsSubmitting(false);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     if (!otp || otp.length !== 6) {
//       toast.error('Please enter a valid 6-digit OTP');
//       return;
//     }

//     setIsVerifying(true);
//     const verifyingToast = toast.loading('Verifying OTP...');

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/auth/verify-otp`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: otpEmail,
//           otp: otp
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(verifyingToast);

//       if (!response.ok) {
//         toast.error(data.error || 'Invalid OTP');
//         setIsVerifying(false);
//         return;
//       }

//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
      
//       toast.success('Email verified successfully!', {
//         description: 'Welcome to HyperVolt!',
//       });

//       setShowOtpModal(false);
      
//       setTimeout(() => {
//         router.push('/customer/dashboard');
//       }, 1500);

//     } catch (error) {
//       console.error('OTP verification error:', error);
//       toast.dismiss(verifyingToast);
//       toast.error('Verification failed', {
//         description: 'Please try again',
//       });
//       setIsVerifying(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     if (resendDisabled) return;

//     const resendToast = toast.loading('Resending OTP...');

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/auth/resend-otp`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: otpEmail
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(resendToast);

//       if (!response.ok) {
//         toast.error(data.error || 'Failed to resend OTP');
//         return;
//       }

//       toast.success('OTP resent!', {
//         description: 'Check your email for the new code.',
//       });

//       startCountdown();

//     } catch (error) {
//       console.error('Resend OTP error:', error);
//       toast.dismiss(resendToast);
//       toast.error('Failed to resend OTP');
//     }
//   };

//   const startCountdown = () => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
    
//     setResendDisabled(true);
//     setCountdown(600);
    
//     timerRef.current = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current);
//           timerRef.current = null;
//           setResendDisabled(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   // Google Sign Up Success Handler
//   const handleGoogleSuccess = (data) => {
//     console.log('Google sign up success:', data);
    
//     if (data.token) {
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
      
//       setTimeout(() => {
//         router.push('/customer/dashboard');
//       }, 1500);
      
//       if (data.requiresAdditionalInfo) {
//         toast.success('Google Sign Up Successful!', {
//           description: 'Please complete your profile to continue.',
//           duration: 4000,
//         });
//       } else {
//         toast.success('Google Sign Up Successful!', {
//           description: `Welcome to HyperVolt, ${data.user.contactPerson || data.user.companyName || 'Tech Enthusiast'}!`,
//           duration: 4000,
//         });
//       }
//     }
//   };

//   const handleGoogleError = (error) => {
//     console.error('Google sign up error:', error);
//     toast.error('Google Sign Up Failed', {
//       description: error || 'Unable to sign up with Google. Please try again.',
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

//         <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] px-3 sm:px-4 py-8">
//           <div className="w-full max-w-6xl mx-auto">
            
//             {/* Main Card - Premium Glass Effect */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, ease: "easeOut" }}
//               className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl shadow-[#06B6D4]/10 overflow-hidden relative"
//             >
//               {/* Glow Effect */}
//               <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#06B6D4]/30 rounded-full blur-3xl"></div>
//               <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#0D506F]/30 rounded-full blur-3xl"></div>
              
//               <div className="grid grid-cols-1 lg:grid-cols-2 relative">
                
//                 {/* Left Side - Branding & Features */}
//                 <div className="relative p-6 lg:p-8 bg-gradient-to-br from-[#0D506F] via-[#0A3D55] to-[#06B6D4] flex flex-col justify-center order-2 lg:order-1">
//                   <div className="relative z-10">
//                     <motion.h1 
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.2, duration: 0.5 }}
//                       className="text-2xl lg:text-5xl font-bold text-white mb-2 tracking-tight"
//                       style={{ fontFamily: "'Inter', sans-serif" }}
//                     >
//                       Create Account
//                       <br />
//                       <span className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] bg-clip-text text-transparent">with HyperVolt</span>
//                     </motion.h1>
                    
//                     <motion.p 
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.3, duration: 0.5 }}
//                       className="text-white/70 text-xs mb-4 max-w-sm"
//                     >
//                       Join us and get access to premium power bank and gadget collections
//                     </motion.p>

//                     {/* Feature Cards */}
//                     <motion.div 
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.4, duration: 0.5 }}
//                       className="grid grid-cols-2 gap-1.5"
//                     >
//                       <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 hover:bg-white/20 transition-all duration-300 group cursor-default">
//                         <div className="flex items-center gap-1.5 mb-0.5">
//                           <div className="p-1 bg-[#06B6D4]/20 rounded-lg group-hover:bg-[#06B6D4]/30 transition-colors">
//                             <Zap className="w-3 h-3 text-[#06B6D4]" />
//                           </div>
//                           <span className="text-white text-[10px] font-medium">Fast Checkout</span>
//                         </div>
//                         <p className="text-white/40 text-[9px]">One-click ordering</p>
//                       </div>
//                       <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 hover:bg-white/20 transition-all duration-300 group cursor-default">
//                         <div className="flex items-center gap-1.5 mb-0.5">
//                           <div className="p-1 bg-[#06B6D4]/20 rounded-lg group-hover:bg-[#06B6D4]/30 transition-colors">
//                             <ShieldCheck className="w-3 h-3 text-[#06B6D4]" />
//                           </div>
//                           <span className="text-white text-[10px] font-medium">Secure</span>
//                         </div>
//                         <p className="text-white/40 text-[9px]">100% protected</p>
//                       </div>
//                       <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 hover:bg-white/20 transition-all duration-300 group cursor-default">
//                         <div className="flex items-center gap-1.5 mb-0.5">
//                           <div className="p-1 bg-[#06B6D4]/20 rounded-lg group-hover:bg-[#06B6D4]/30 transition-colors">
//                             <Battery className="w-3 h-3 text-[#06B6D4]" />
//                           </div>
//                           <span className="text-white text-[10px] font-medium">Premium</span>
//                         </div>
//                         <p className="text-white/40 text-[9px]">Quality products</p>
//                       </div>
//                       <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 hover:bg-white/20 transition-all duration-300 group cursor-default">
//                         <div className="flex items-center gap-1.5 mb-0.5">
//                           <div className="p-1 bg-[#06B6D4]/20 rounded-lg group-hover:bg-[#06B6D4]/30 transition-colors">
//                             <Award className="w-3 h-3 text-[#06B6D4]" />
//                           </div>
//                           <span className="text-white text-[10px] font-medium">Trusted</span>
//                         </div>
//                         <p className="text-white/40 text-[9px]">By thousands</p>
//                       </div>
//                     </motion.div>

//                     {/* Trust Badges */}
//                     <motion.div 
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.6, duration: 0.5 }}
//                       className="mt-4 flex items-center gap-4"
//                     >
//                       <div className="flex items-center gap-1.5">
//                         <div className="w-1 h-1 rounded-full bg-[#06B6D4] animate-pulse"></div>
//                         <span className="text-white/40 text-[9px]">2FA Security</span>
//                       </div>
//                       <div className="flex items-center gap-1.5">
//                         <div className="w-1 h-1 rounded-full bg-[#06B6D4] animate-pulse delay-300"></div>
//                         <span className="text-white/40 text-[9px]">Encrypted</span>
//                       </div>
//                       <div className="flex items-center gap-1.5">
//                         <div className="w-1 h-1 rounded-full bg-[#06B6D4] animate-pulse delay-700"></div>
//                         <span className="text-white/40 text-[9px]">24/7 Support</span>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </div>

//                 {/* Right Side - Registration Form - Full Width */}
//                 <div className="p-5 sm:p-5 bg-white/95 backdrop-blur-sm order-1 lg:order-2 border-l border-white/10 rounded-r-2xl">
//                   <div className="w-full">
//                     {/* Mobile Header */}
//                     <div className="lg:hidden text-center mb-3">
//                       <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#0D506F] flex items-center justify-center mx-auto mb-2 shadow-xl shadow-[#06B6D4]/20">
//                         <Zap className="w-6 h-6 text-white" />
//                       </div>
//                       <h2 className="text-xl font-bold text-[#0D506F]">Create Account</h2>
//                       <p className="text-xs text-[#64748B] mt-0.5">Join HyperVolt today</p>
//                     </div>

//                     {/* Desktop Header */}
//                     <div className="hidden lg:block mb-3">
//                       <h2 className="text-3xl font-bold text-[#0D506F]">Create Account</h2>
//                       <p className="text-[10px] text-[#64748B] mt-0.5">Enter your details to get started</p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-2.5">
//                       <div className="grid grid-cols-2 gap-2">
//                         {/* Contact Person */}
//                         <div>
//                           <label className="block text-[10px] font-medium text-[#0D506F] mb-0.5">
//                             <User className="w-3 h-3 inline mr-1 text-[#06B6D4]" />
//                             <RequiredLabel>Full Name</RequiredLabel>
//                           </label>
//                           <input
//                             type="text"
//                             name="contactPerson"
//                             value={formData.contactPerson}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-2.5 py-1.5 text-sm text-[#0D506F] bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/10 transition-all outline-none placeholder:text-[#94A3B8]"
//                             placeholder="Full name"
//                           />
//                         </div>

//                         {/* Email */}
//                         <div>
//                           <label className="block text-[10px] font-medium text-[#0D506F] mb-0.5">
//                             <Mail className="w-3 h-3 inline mr-1 text-[#06B6D4]" />
//                             <RequiredLabel>Email Address</RequiredLabel>
//                           </label>
//                           <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-2.5 py-1.5 text-sm text-[#0D506F] bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/10 transition-all outline-none placeholder:text-[#94A3B8]"
//                             placeholder="your@email.com"
//                           />
//                         </div>

//                         {/* Phone */}
//                         <div>
//                           <label className="block text-[10px] font-medium text-[#0D506F] mb-0.5">
//                             <Phone className="w-3 h-3 inline mr-1 text-[#06B6D4]" />
//                             <RequiredLabel>Phone Number</RequiredLabel>
//                           </label>
//                           <input
//                             type="tel"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-2.5 py-1.5 text-sm text-[#0D506F] bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/10 transition-all outline-none placeholder:text-[#94A3B8]"
//                             placeholder="+8801XXXXXXXXX"
//                           />
//                         </div>

//                         {/* WhatsApp */}
//                         <div>
//                           <label className="block text-[10px] font-medium text-[#0D506F] mb-0.5">
//                             <Smartphone className="w-3 h-3 inline mr-1 text-[#06B6D4]" />
//                             WhatsApp
//                           </label>
//                           <input
//                             type="tel"
//                             name="whatsapp"
//                             value={formData.whatsapp}
//                             onChange={handleChange}
//                             className="w-full px-2.5 py-1.5 text-sm text-[#0D506F] bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/10 transition-all outline-none placeholder:text-[#94A3B8]"
//                             placeholder="+8801XXXXXXXXX"
//                           />
//                         </div>

//                         {/* Country */}
//                         <div>
//                           <label className="block text-[10px] font-medium text-[#0D506F] mb-0.5">
//                             <Globe className="w-3 h-3 inline mr-1 text-[#06B6D4]" />
//                             <RequiredLabel>Country</RequiredLabel>
//                           </label>
//                           <input
//                             type="text"
//                             name="country"
//                             value={formData.country}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-2.5 py-1.5 text-sm text-[#0D506F] bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/10 transition-all outline-none placeholder:text-[#94A3B8]"
//                             placeholder="Bangladesh"
//                           />
//                         </div>

//                         {/* City */}
//                         <div>
//                           <label className="block text-[10px] font-medium text-[#0D506F] mb-0.5">
//                             <Building2 className="w-3 h-3 inline mr-1 text-[#06B6D4]" />
//                             <RequiredLabel>City</RequiredLabel>
//                           </label>
//                           <input
//                             type="text"
//                             name="city"
//                             value={formData.city}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-2.5 py-1.5 text-sm text-[#0D506F] bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/10 transition-all outline-none placeholder:text-[#94A3B8]"
//                             placeholder="Dhaka"
//                           />
//                         </div>

//                         {/* Address */}
//                         <div>
//                           <label className="block text-[10px] font-medium text-[#0D506F] mb-0.5">
//                             <Home className="w-3 h-3 inline mr-1 text-[#06B6D4]" />
//                             <RequiredLabel>Street Address</RequiredLabel>
//                           </label>
//                           <input
//                             type="text"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-2.5 py-1.5 text-sm text-[#0D506F] bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/10 transition-all outline-none placeholder:text-[#94A3B8]"
//                             placeholder="Street address"
//                           />
//                         </div>

//                         {/* Zip Code */}
//                         <div>
//                           <label className="block text-[10px] font-medium text-[#0D506F] mb-0.5">
//                             <MapPinned className="w-3 h-3 inline mr-1 text-[#06B6D4]" />
//                             <RequiredLabel>Zip Code</RequiredLabel>
//                           </label>
//                           <input
//                             type="text"
//                             name="zipCode"
//                             value={formData.zipCode}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-2.5 py-1.5 text-sm text-[#0D506F] bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/10 transition-all outline-none placeholder:text-[#94A3B8]"
//                             placeholder="10001"
//                           />
//                         </div>

//                         {/* Password */}
//                         <div>
//                           <label className="block text-[10px] font-medium text-[#0D506F] mb-0.5">
//                             <Lock className="w-3 h-3 inline mr-1 text-[#06B6D4]" />
//                             <RequiredLabel>Password</RequiredLabel>
//                           </label>
//                           <div className="relative">
//                             <input
//                               type={showPassword ? "text" : "password"}
//                               name="password"
//                               value={formData.password}
//                               onChange={handleChange}
//                               required
//                               minLength="8"
//                               className="w-full px-2.5 py-1.5 pr-8 text-sm text-[#0D506F] bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/10 transition-all outline-none placeholder:text-[#94A3B8]"
//                               placeholder="Min. 8 chars"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowPassword(!showPassword)}
//                               className="absolute right-2 top-1/2 transform -translate-y-1/2"
//                             >
//                               {showPassword ? (
//                                 <EyeOff className="w-3.5 h-3.5 text-[#94A3B8] hover:text-[#06B6D4] transition-colors" />
//                               ) : (
//                                 <Eye className="w-3.5 h-3.5 text-[#94A3B8] hover:text-[#06B6D4] transition-colors" />
//                               )}
//                             </button>
//                           </div>
//                         </div>

//                         {/* Confirm Password */}
//                         <div>
//                           <label className="block text-[10px] font-medium text-[#0D506F] mb-0.5">
//                             <Lock className="w-3 h-3 inline mr-1 text-[#06B6D4]" />
//                             <RequiredLabel>Confirm Password</RequiredLabel>
//                           </label>
//                           <div className="relative">
//                             <input
//                               type={showConfirmPassword ? "text" : "password"}
//                               name="confirmPassword"
//                               value={formData.confirmPassword}
//                               onChange={handleChange}
//                               required
//                               minLength="8"
//                               className="w-full px-2.5 py-1.5 pr-8 text-sm text-[#0D506F] bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/10 transition-all outline-none placeholder:text-[#94A3B8]"
//                               placeholder="Re-enter password"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                               className="absolute right-2 top-1/2 transform -translate-y-1/2"
//                             >
//                               {showConfirmPassword ? (
//                                 <EyeOff className="w-3.5 h-3.5 text-[#94A3B8] hover:text-[#06B6D4] transition-colors" />
//                               ) : (
//                                 <Eye className="w-3.5 h-3.5 text-[#94A3B8] hover:text-[#06B6D4] transition-colors" />
//                               )}
//                             </button>
//                           </div>
//                         </div>

//                         {/* Terms Agreement - Full Width */}
//                         <div className="col-span-2">
//                           <label className="flex items-center gap-1.5 cursor-pointer group">
//                             <input
//                               type="checkbox"
//                               name="agreeToTerms"
//                               checked={formData.agreeToTerms}
//                               onChange={handleChange}
//                               className="w-3.5 h-3.5 rounded border-[#E2E8F0] text-[#06B6D4] focus:ring-[#06B6D4] focus:ring-offset-0 transition-all"
//                             />
//                             <span className="text-[10px] text-[#64748B] group-hover:text-[#0D506F] transition-colors">
//                               I agree to the{' '}
//                               <Link href="/terms" className="font-medium text-[#06B6D4] hover:text-[#0891B2] transition-colors">
//                                 Terms
//                               </Link>{' '}
//                               and{' '}
//                               <Link href="/privacy" className="font-medium text-[#06B6D4] hover:text-[#0891B2] transition-colors">
//                                 Privacy Policy
//                               </Link>
//                             </span>
//                           </label>
//                         </div>
//                       </div>

//                       {/* Submit Button */}
//                       <motion.button
//                         whileHover={{ scale: 1.01 }}
//                         whileTap={{ scale: 0.99 }}
//                         type="submit"
//                         disabled={isSubmitting || !formData.agreeToTerms}
//                         className="w-full bg-gradient-to-r from-[#0D506F] to-[#06B6D4] text-white py-1.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-[#0D506F]/25 transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
//                       >
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//                         {isSubmitting ? (
//                           <>
//                             <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                             </svg>
//                             Creating...
//                           </>
//                         ) : (
//                           <>
//                             Create Account
//                             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                           </>
//                         )}
//                       </motion.button>

//                       {/* Divider */}
//                       <div className="relative my-1.5">
//                         <div className="absolute inset-0 flex items-center">
//                           <div className="w-full border-t border-[#E2E8F0]" />
//                         </div>
//                         <div className="relative flex justify-center">
//                           <span className="px-3 bg-white text-[#94A3B8] text-[10px] font-medium">
//                             OR
//                           </span>
//                         </div>
//                       </div>

//                       {/* Google Sign Up Button */}
//                       <div className="w-full">
//                         <GoogleLoginButton 
//                           mode="signup"
//                           onSuccess={handleGoogleSuccess}
//                           onError={handleGoogleError}
//                         />
//                       </div>

//                       {/* Login Link */}
//                       <div className="text-center pt-0.5">
//                         <p className="text-[10px] text-[#64748B]">
//                           Already have an account?{' '}
//                           <Link href="/login" className="font-medium text-[#06B6D4] hover:text-[#0891B2] transition-colors hover:underline">
//                             Sign In
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
//                 © HyperVolt. All rights reserved.
//               </p>
//             </motion.div>
//           </div>
//         </div>

//         {/* OTP Verification Modal */}
//         <AnimatePresence>
//           {showOtpModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center p-4"
//               style={{ 
//                 background: 'rgba(0, 0, 0, 0.6)',
//                 backdropFilter: 'blur(8px)',
//               }}
//               onClick={() => !isVerifying && setShowOtpModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0, y: 20 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.9, opacity: 0, y: 20 }}
//                 transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                 className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border-2 border-[#06B6D4]/20"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="text-center mb-5">
//                   <div className="w-16 h-16 bg-gradient-to-br from-[#0D506F] to-[#06B6D4] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#06B6D4]/20">
//                     <Mail className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-[#0D506F] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
//                     Verify Your Email
//                   </h3>
//                   <p className="text-sm text-[#64748B]">
//                     We've sent a verification code to <br />
//                     <span className="font-bold text-[#06B6D4]">{otpEmail}</span>
//                   </p>
//                 </div>

//                 <div className="mb-5">
//                   <label className="block text-sm font-medium text-[#0D506F] mb-2 text-center">
//                     Enter 6-Digit Code
//                   </label>
//                   <input
//                     type="text"
//                     maxLength="6"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
//                     placeholder="000000"
//                     className="w-full px-4 py-3 text-center text-xl tracking-[0.5em] border-2 border-[#E2E8F0] rounded-xl focus:border-[#06B6D4] focus:ring-4 focus:ring-[#06B6D4]/10 transition-all font-mono outline-none"
//                     autoFocus
//                     disabled={isVerifying}
//                   />
//                 </div>

//                 <button
//                   onClick={handleVerifyOTP}
//                   disabled={isVerifying || otp.length !== 6}
//                   className="w-full bg-gradient-to-r from-[#0D506F] to-[#06B6D4] text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-[#0D506F]/30 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//                 >
//                   {isVerifying ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                       </svg>
//                       Verifying...
//                     </span>
//                   ) : (
//                     'Verify & Continue'
//                   )}
//                 </button>

//                 <div className="mt-4 text-center">
//                   <button
//                     onClick={handleResendOTP}
//                     disabled={resendDisabled}
//                     className="text-sm text-[#06B6D4] hover:text-[#0891B2] transition-colors disabled:opacity-50 font-medium"
//                   >
//                     {resendDisabled ? `Resend OTP in ${formatTime(countdown)}` : 'Resend OTP'}
//                   </button>
//                 </div>

//                 <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
//                   <button
//                     onClick={() => {
//                       if (timerRef.current) {
//                         clearInterval(timerRef.current);
//                         timerRef.current = null;
//                       }
//                       setShowOtpModal(false);
//                     }}
//                     disabled={isVerifying}
//                     className="w-full text-sm text-[#94A3B8] hover:text-[#0D506F] transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//       <Footer />
//     </>
//   );
// }


'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  Globe, 
  Sparkles,
  Shield,
  Zap,
  Headphones,
  Truck,
  Smartphone,
  Home,
  Building2,
  MapPinned,
  ArrowRight,
  ShieldCheck,
  Battery,
  Award,
  Cpu
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import GoogleLoginButton from '../components/GoogleLoginButton';
import Footer from '../components/layout/Footer';

// Helper component for required field label
const RequiredLabel = ({ children }) => (
  <span>
    {children}
    <span className="text-blue-500 ml-0.5">*</span>
  </span>
);

export default function RegisterClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // OTP Modal States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [registrationData, setRegistrationData] = useState(null);
  const timerRef = useRef(null);

  // Helper function to format seconds as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      setIsSubmitting(false);
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      setIsSubmitting(false);
      return;
    }

    const loadingToast = toast.loading('Creating your account...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          country: formData.country,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          password: formData.password,
          role: 'customer'
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error(data.error || 'Registration failed');
        setIsSubmitting(false);
        return;
      }

      toast.success('Account created!', {
        description: 'Please enter the OTP sent to your email.',
        duration: 4000,
      });

      setOtpEmail(formData.email);
      setRegistrationData(data);
      setShowOtpModal(true);
      setOtp('');
      setIsSubmitting(false);
      startCountdown();

    } catch (error) {
      console.error('Registration error:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect to server. Please try again!',
      });
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    const verifyingToast = toast.loading('Verifying OTP...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: otpEmail,
          otp: otp
        }),
      });

      const data = await response.json();
      toast.dismiss(verifyingToast);

      if (!response.ok) {
        toast.error(data.error || 'Invalid OTP');
        setIsVerifying(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast.success('Email verified successfully!', {
        description: 'Welcome to Smart Gadget!',
      });

      setShowOtpModal(false);
      
      setTimeout(() => {
        router.push('/customer/dashboard');
      }, 1500);

    } catch (error) {
      console.error('OTP verification error:', error);
      toast.dismiss(verifyingToast);
      toast.error('Verification failed', {
        description: 'Please try again',
      });
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) return;

    const resendToast = toast.loading('Resending OTP...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: otpEmail
        }),
      });

      const data = await response.json();
      toast.dismiss(resendToast);

      if (!response.ok) {
        toast.error(data.error || 'Failed to resend OTP');
        return;
      }

      toast.success('OTP resent!', {
        description: 'Check your email for the new code.',
      });

      startCountdown();

    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.dismiss(resendToast);
      toast.error('Failed to resend OTP');
    }
  };

  const startCountdown = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setResendDisabled(true);
    setCountdown(600);
    
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Google Sign Up Success Handler
  const handleGoogleSuccess = (data) => {
    console.log('Google sign up success:', data);
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setTimeout(() => {
        router.push('/customer/dashboard');
      }, 1500);
      
      if (data.requiresAdditionalInfo) {
        toast.success('Google Sign Up Successful!', {
          description: 'Please complete your profile to continue.',
          duration: 4000,
        });
      } else {
        toast.success('Google Sign Up Successful!', {
          description: `Welcome to Smart Gadget, ${data.user.contactPerson || data.user.companyName || 'Tech Enthusiast'}!`,
          duration: 4000,
        });
      }
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google sign up error:', error);
    toast.error('Google Sign Up Failed', {
      description: error || 'Unable to sign up with Google. Please try again.',
    });
  };

  const benefits = [
    { icon: Shield, title: 'Secure', desc: 'Data protection', color: '#3B82F6' },
    { icon: Truck, title: 'Fast Delivery', desc: 'Quick shipping', color: '#10B981' },
    { icon: Zap, title: '1-Yr Warranty', desc: 'Quality assured', color: '#F59E0B' },
    { icon: Headphones, title: '24/7 Support', desc: 'Always here', color: '#8B5CF6' },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden relative">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <rect width="30" height="30" fill="none" stroke="#3B82F6" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Tech Decorative Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 min-h-[calc(100vh-64px)] flex items-center justify-center py-8">
          <div className="max-w-5xl w-full mx-auto">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-6"
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                  <Cpu className="w-7 h-7 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Smart Gadget
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Create your account and start exploring
              </p>
            </motion.div>

            {/* Benefits Cards Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-4 gap-2 mb-5"
            >
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white rounded-lg p-2 text-center shadow-sm border border-gray-100"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mx-auto mb-1">
                      <Icon className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="font-semibold text-xs text-gray-700">{benefit.title}</p>
                    <p className="text-[10px] text-gray-400">{benefit.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="p-5">
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Contact Person */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        <User className="w-3 h-3 inline mr-1 text-blue-500" />
                        <RequiredLabel>Full Name</RequiredLabel>
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        <Mail className="w-3 h-3 inline mr-1 text-blue-500" />
                        <RequiredLabel>Email Address</RequiredLabel>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        <Phone className="w-3 h-3 inline mr-1 text-blue-500" />
                        <RequiredLabel>Phone Number</RequiredLabel>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
                        placeholder="+8801XXXXXXXXX"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        <Smartphone className="w-3 h-3 inline mr-1 text-blue-500" />
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
                        placeholder="+8801XXXXXXXXX"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        <Globe className="w-3 h-3 inline mr-1 text-blue-500" />
                        <RequiredLabel>Country</RequiredLabel>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
                        placeholder="Bangladesh"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        <Building2 className="w-3 h-3 inline mr-1 text-blue-500" />
                        <RequiredLabel>City</RequiredLabel>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
                        placeholder="Dhaka"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        <Home className="w-3 h-3 inline mr-1 text-blue-500" />
                        <RequiredLabel>Street Address</RequiredLabel>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
                        placeholder="Your street address"
                      />
                    </div>

                    {/* Zip Code */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        <MapPinned className="w-3 h-3 inline mr-1 text-blue-500" />
                        <RequiredLabel>Zip Code</RequiredLabel>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
                        placeholder="10001"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        <Lock className="w-3 h-3 inline mr-1 text-blue-500" />
                        <RequiredLabel>Password</RequiredLabel>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          minLength="8"
                          className="w-full px-3 py-2 pr-9 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
                          placeholder="Min. 8 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        <Lock className="w-3 h-3 inline mr-1 text-blue-500" />
                        <RequiredLabel>Confirm Password</RequiredLabel>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          minLength="8"
                          className="w-full px-3 py-2 pr-9 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
                          placeholder="Re-enter password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Terms Agreement */}
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                        />
                        <span className="text-xs text-gray-600">
                          I agree to the{' '}
                          <Link href="/terms" className="text-blue-600 hover:underline font-medium">
                            Terms
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isSubmitting || !formData.agreeToTerms}
                    className="w-full mt-5 bg-black text-white py-2 rounded-lg font-semibold text-sm hover:shadow-md transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <Sparkles className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white text-gray-400 text-xs">
                        OR
                      </span>
                    </div>
                  </div>

                  {/* Google Sign Up Button */}
                  <div className="w-full">
                    <GoogleLoginButton 
                      mode="signup"
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                    />
                  </div>

                  {/* Login Link */}
                  <div className="text-center mt-4">
                    <p className="text-xs text-gray-500">
                      Already have an account?{' '}
                      <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* OTP Verification Modal */}
        <AnimatePresence>
          {showOtpModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ 
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(8px)',
              }}
              onClick={() => !isVerifying && setShowOtpModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-4">
                  <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    Verify Your Email
                  </h3>
                  <p className="text-xs text-gray-500">
                    We've sent a verification code to <br />
                    <span className="font-bold text-blue-500">{otpEmail}</span>
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2 text-center">
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-full px-4 py-2 text-center text-xl tracking-wider border border-gray-200 rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 transition-all font-mono"
                    autoFocus
                    disabled={isVerifying}
                  />
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={isVerifying || otp.length !== 6}
                  className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:shadow-md transition-all disabled:opacity-50 text-sm"
                >
                  {isVerifying ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    'Verify & Continue'
                  )}
                </button>

                <div className="mt-3 text-center">
                  <button
                    onClick={handleResendOTP}
                    disabled={resendDisabled}
                    className="text-xs text-blue-500 hover:text-blue-700 transition-colors disabled:opacity-50 font-medium"
                  >
                    {resendDisabled ? `Resend OTP in ${formatTime(countdown)}` : 'Resend OTP'}
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => {
                      if (timerRef.current) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                      }
                      setShowOtpModal(false);
                    }}
                    disabled={isVerifying}
                    className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}