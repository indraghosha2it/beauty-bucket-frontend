
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
//   Award,
//   Cpu
// } from 'lucide-react';
// import Navbar from '../components/layout/Navbar';
// import GoogleLoginButton from '../components/GoogleLoginButton';
// import Footer from '../components/layout/Footer';

// // Helper component for required field label
// const RequiredLabel = ({ children }) => (
//   <span>
//     {children}
//     <span className="text-blue-500 ml-0.5">*</span>
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
//         description: 'Welcome to Smart Gadget!',
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
//           description: `Welcome to Smart Gadget, ${data.user.contactPerson || data.user.companyName || 'Tech Enthusiast'}!`,
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

//   const benefits = [
//     { icon: Shield, title: 'Secure', desc: 'Data protection', color: '#3B82F6' },
//     { icon: Truck, title: 'Fast Delivery', desc: 'Quick shipping', color: '#10B981' },
//     { icon: Zap, title: '1-Yr Warranty', desc: 'Quality assured', color: '#F59E0B' },
//     { icon: Headphones, title: '24/7 Support', desc: 'Always here', color: '#8B5CF6' },
//   ];

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden relative">
        
//         {/* Background Pattern */}
//         <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
//           <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
//                 <rect width="30" height="30" fill="none" stroke="#3B82F6" strokeWidth="0.5"/>
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)" />
//           </svg>
//         </div>

//         {/* Tech Decorative Circles */}
//         <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

//         <div className="container mx-auto px-4 min-h-[calc(100vh-64px)] flex items-center justify-center py-8">
//           <div className="max-w-5xl w-full mx-auto">
            
//             {/* Header */}
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//               className="text-center mb-6"
//             >
//               <div className="flex justify-center mb-3">
//                 <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
//                   <Cpu className="w-7 h-7 text-white" />
//                 </div>
//               </div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                 Smart Gadget
//               </h1>
//               <p className="text-sm text-gray-500 mt-1">
//                 Create your account and start exploring
//               </p>
//             </motion.div>

//             {/* Benefits Cards Row */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: 0.1 }}
//               className="grid grid-cols-4 gap-2 mb-5"
//             >
//               {benefits.map((benefit, idx) => {
//                 const Icon = benefit.icon;
//                 return (
//                   <motion.div
//                     key={idx}
//                     whileHover={{ scale: 1.02, y: -2 }}
//                     className="bg-white rounded-lg p-2 text-center shadow-sm border border-gray-100"
//                   >
//                     <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mx-auto mb-1">
//                       <Icon className="w-4 h-4 text-blue-500" />
//                     </div>
//                     <p className="font-semibold text-xs text-gray-700">{benefit.title}</p>
//                     <p className="text-[10px] text-gray-400">{benefit.desc}</p>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>

//             {/* Registration Form */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: 0.2 }}
//               className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
//             >
//               <div className="p-5">
//                 <form onSubmit={handleSubmit}>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {/* Contact Person */}
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         <User className="w-3 h-3 inline mr-1 text-blue-500" />
//                         <RequiredLabel>Full Name</RequiredLabel>
//                       </label>
//                       <input
//                         type="text"
//                         name="contactPerson"
//                         value={formData.contactPerson}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
//                         placeholder="Enter your full name"
//                       />
//                     </div>

//                     {/* Email */}
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         <Mail className="w-3 h-3 inline mr-1 text-blue-500" />
//                         <RequiredLabel>Email Address</RequiredLabel>
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
//                         placeholder="your@email.com"
//                       />
//                     </div>

//                     {/* Phone */}
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         <Phone className="w-3 h-3 inline mr-1 text-blue-500" />
//                         <RequiredLabel>Phone Number</RequiredLabel>
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
//                         placeholder="+8801XXXXXXXXX"
//                       />
//                     </div>

//                     {/* WhatsApp */}
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         <Smartphone className="w-3 h-3 inline mr-1 text-blue-500" />
//                         WhatsApp Number
//                       </label>
//                       <input
//                         type="tel"
//                         name="whatsapp"
//                         value={formData.whatsapp}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
//                         placeholder="+8801XXXXXXXXX"
//                       />
//                     </div>

//                     {/* Country */}
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         <Globe className="w-3 h-3 inline mr-1 text-blue-500" />
//                         <RequiredLabel>Country</RequiredLabel>
//                       </label>
//                       <input
//                         type="text"
//                         name="country"
//                         value={formData.country}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
//                         placeholder="Bangladesh"
//                       />
//                     </div>

//                     {/* City */}
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         <Building2 className="w-3 h-3 inline mr-1 text-blue-500" />
//                         <RequiredLabel>City</RequiredLabel>
//                       </label>
//                       <input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
//                         placeholder="Dhaka"
//                       />
//                     </div>

//                     {/* Address */}
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         <Home className="w-3 h-3 inline mr-1 text-blue-500" />
//                         <RequiredLabel>Street Address</RequiredLabel>
//                       </label>
//                       <input
//                         type="text"
//                         name="address"
//                         value={formData.address}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
//                         placeholder="Your street address"
//                       />
//                     </div>

//                     {/* Zip Code */}
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         <MapPinned className="w-3 h-3 inline mr-1 text-blue-500" />
//                         <RequiredLabel>Zip Code</RequiredLabel>
//                       </label>
//                       <input
//                         type="text"
//                         name="zipCode"
//                         value={formData.zipCode}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
//                         placeholder="10001"
//                       />
//                     </div>

//                     {/* Password */}
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         <Lock className="w-3 h-3 inline mr-1 text-blue-500" />
//                         <RequiredLabel>Password</RequiredLabel>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           name="password"
//                           value={formData.password}
//                           onChange={handleChange}
//                           required
//                           minLength="8"
//                           className="w-full px-3 py-2 pr-9 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
//                           placeholder="Min. 8 characters"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                         >
//                           {showPassword ? (
//                             <EyeOff className="w-3.5 h-3.5 text-gray-400" />
//                           ) : (
//                             <Eye className="w-3.5 h-3.5 text-gray-400" />
//                           )}
//                         </button>
//                       </div>
//                     </div>

//                     {/* Confirm Password */}
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         <Lock className="w-3 h-3 inline mr-1 text-blue-500" />
//                         <RequiredLabel>Confirm Password</RequiredLabel>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showConfirmPassword ? "text" : "password"}
//                           name="confirmPassword"
//                           value={formData.confirmPassword}
//                           onChange={handleChange}
//                           required
//                           minLength="8"
//                           className="w-full px-3 py-2 pr-9 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
//                           placeholder="Re-enter password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                         >
//                           {showConfirmPassword ? (
//                             <EyeOff className="w-3.5 h-3.5 text-gray-400" />
//                           ) : (
//                             <Eye className="w-3.5 h-3.5 text-gray-400" />
//                           )}
//                         </button>
//                       </div>
//                     </div>

//                     {/* Terms Agreement */}
//                     <div className="md:col-span-2">
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           name="agreeToTerms"
//                           checked={formData.agreeToTerms}
//                           onChange={handleChange}
//                           className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
//                         />
//                         <span className="text-xs text-gray-600">
//                           I agree to the{' '}
//                           <Link href="/terms" className="text-blue-600 hover:underline font-medium">
//                             Terms
//                           </Link>{' '}
//                           and{' '}
//                           <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
//                             Privacy Policy
//                           </Link>
//                         </span>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Submit Button */}
//                   <motion.button
//                     whileHover={{ scale: 1.01 }}
//                     whileTap={{ scale: 0.99 }}
//                     type="submit"
//                     disabled={isSubmitting || !formData.agreeToTerms}
//                     className="w-full mt-5 bg-black text-white py-2 rounded-lg font-semibold text-sm hover:shadow-md transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                         Creating Account...
//                       </>
//                     ) : (
//                       <>
//                         Create Account
//                         <Sparkles className="w-4 h-4" />
//                       </>
//                     )}
//                   </motion.button>

//                   {/* Divider */}
//                   <div className="relative my-4">
//                     <div className="absolute inset-0 flex items-center">
//                       <div className="w-full border-t border-gray-200" />
//                     </div>
//                     <div className="relative flex justify-center">
//                       <span className="px-3 bg-white text-gray-400 text-xs">
//                         OR
//                       </span>
//                     </div>
//                   </div>

//                   {/* Google Sign Up Button */}
//                   <div className="w-full">
//                     <GoogleLoginButton 
//                       mode="signup"
//                       onSuccess={handleGoogleSuccess}
//                       onError={handleGoogleError}
//                     />
//                   </div>

//                   {/* Login Link */}
//                   <div className="text-center mt-4">
//                     <p className="text-xs text-gray-500">
//                       Already have an account?{' '}
//                       <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
//                         Sign In
//                       </Link>
//                     </p>
//                   </div>
//                 </form>
//               </div>
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
//                 className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 relative"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="text-center mb-4">
//                   <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
//                     <Mail className="w-7 h-7 text-white" />
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-800 mb-1">
//                     Verify Your Email
//                   </h3>
//                   <p className="text-xs text-gray-500">
//                     We've sent a verification code to <br />
//                     <span className="font-bold text-blue-500">{otpEmail}</span>
//                   </p>
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-xs font-medium text-gray-700 mb-2 text-center">
//                     Enter 6-Digit Code
//                   </label>
//                   <input
//                     type="text"
//                     maxLength="6"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
//                     placeholder="000000"
//                     className="w-full px-4 py-2 text-center text-xl tracking-wider border border-gray-200 rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 transition-all font-mono"
//                     autoFocus
//                     disabled={isVerifying}
//                   />
//                 </div>

//                 <button
//                   onClick={handleVerifyOTP}
//                   disabled={isVerifying || otp.length !== 6}
//                   className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:shadow-md transition-all disabled:opacity-50 text-sm"
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

//                 <div className="mt-3 text-center">
//                   <button
//                     onClick={handleResendOTP}
//                     disabled={resendDisabled}
//                     className="text-xs text-blue-500 hover:text-blue-700 transition-colors disabled:opacity-50 font-medium"
//                   >
//                     {resendDisabled ? `Resend OTP in ${formatTime(countdown)}` : 'Resend OTP'}
//                   </button>
//                 </div>

//                 <div className="mt-3 pt-3 border-t border-gray-200">
//                   <button
//                     onClick={() => {
//                       if (timerRef.current) {
//                         clearInterval(timerRef.current);
//                         timerRef.current = null;
//                       }
//                       setShowOtpModal(false);
//                     }}
//                     disabled={isVerifying}
//                     className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors"
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
  MapPin, 
  Globe, 
  CheckCircle, 
  Sparkles,
  Shield,
  Zap,
  Headphones,
  Truck,
  Cpu,
  Smartphone,
  Home,
  Building2,
  MapPinned,
  Flower2,
  Heart,
  Gift,
  Star,
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import GoogleLoginButton from '../components/GoogleLoginButton';
import Footer from '../components/layout/Footer';

// Font family constant
const FONT_FAMILY = "'Courgette', cursive";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// Helper component for required field label
const RequiredLabel = ({ children }) => (
  <span>
    {children}
    <span className="text-red-500 ml-0.5">*</span>
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
        description: 'Welcome to Beauty Bucket!',
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
      
      if (data.requiresAdditionalInfo) {
        toast.success('Google Sign Up Successful!', {
          description: 'Please complete your profile to continue.',
          duration: 4000,
        });
      } else {
        toast.success('Google Sign Up Successful!', {
          description: `Welcome to Beauty Bucket, ${data.user.contactPerson || data.user.companyName || 'Beauty Enthusiast'}!`,
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

  const benefits = [
    { icon: Shield, title: 'Secure', desc: 'Data protection', color: '#EE4275' },
    { icon: Truck, title: 'Fast Delivery', desc: 'Quick shipping', color: '#FF6B9D' },
    { icon: Sparkles, title: 'Premium', desc: 'Quality assured', color: '#EE4275' },
    { icon: Headphones, title: '24/7 Support', desc: 'Always here', color: '#FF6B9D' },
  ];

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

            {/* Floating Sparkles */}
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

            {/* Decorative lines */}
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
                  Join Beauty Bucket
                </motion.h1>
                
                <motion.p
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="text-lg text-white/95 drop-shadow-md"
                  style={{ fontFamily: FONT_FAMILY, textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
                >
                  Start Your Beauty Journey
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
                  Create your account and discover premium beauty products curated just for you.
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

          {/* Right Side - Registration Form */}
          <div className="flex-1 lg:w-1/2 bg-white flex items-center justify-center py-4 px-4 lg:px-6">
            <div className="w-full max-w-lg">
              {/* Mobile Brand */}
              <div className="lg:hidden text-center mb-3">
                <div className="flex justify-center mb-1.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EE4275] to-[#FF6B9D] flex items-center justify-center shadow-lg shadow-[#EE4275]/25">
                    <Flower2 className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h1 className="text-xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY }}>
                  <span className="text-[#EE4275]">Join</span> Beauty Bucket
                </h1>
                <p className="text-xs text-[#8B7A8C] mt-0.5" style={{ fontFamily: FONT_FAMILY }}>Create your account to get started</p>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:block mb-3">
                <h1 className="text-2xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY }}>
                  <span className="text-[#EE4275]">Join</span> Beauty Bucket
                </h1>
                <p className="text-sm text-[#8B7A8C] mt-0.5" style={{ fontFamily: FONT_FAMILY }}>Create your account to get started</p>
              </div>

              {/* Registration Card - 2 Column Layout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-2xl border border-[#FFD2DB]/40 shadow-lg shadow-[#EE4275]/5 overflow-hidden"
              >
                <div className="p-4 sm:p-5">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Contact Person - Required */}
                      <div>
                        <label className="block text-[10px] font-medium text-[#2D1B2E] mb-0.5" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                          <User className="w-3 h-3 inline mr-1 text-[#EE4275]" />
                          <RequiredLabel>Full Name</RequiredLabel>
                        </label>
                        <input
                          type="text"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm text-[#2D1B2E] border border-[#FFD2DB]/50 rounded-lg focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all bg-[#FFF5F6]/50 focus:bg-white"
                          style={{ fontFamily: ' serif' }}
                          placeholder="Full name"
                        />
                      </div>

                      {/* Email - Required */}
                      <div>
                        <label className="block text-[10px] font-medium text-[#2D1B2E] mb-0.5" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                          <Mail className="w-3 h-3 inline mr-1 text-[#EE4275]" />
                          <RequiredLabel>Email Address</RequiredLabel>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm text-[#2D1B2E] border border-[#FFD2DB]/50 rounded-lg focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all bg-[#FFF5F6]/50 focus:bg-white"
                          style={{ fontFamily: ' serif' }}
                          placeholder="your@email.com"
                        />
                      </div>

                      {/* Phone - Required */}
                      <div>
                        <label className="block text-[10px] font-medium text-[#2D1B2E] mb-0.5" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                          <Phone className="w-3 h-3 inline mr-1 text-[#EE4275]" />
                          <RequiredLabel>Phone Number</RequiredLabel>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm text-[#2D1B2E] border border-[#FFD2DB]/50 rounded-lg focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all bg-[#FFF5F6]/50 focus:bg-white"
                          style={{ fontFamily: ' serif' }}
                          placeholder="01XXXXXXXXX"
                        />
                      </div>

                      {/* WhatsApp - NOT Required */}
                      <div>
                        <label className="block text-[10px] font-medium text-[#2D1B2E] mb-0.5" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                          <Smartphone className="w-3 h-3 inline mr-1 text-[#EE4275]" />
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          className="w-full px-3 py-1.5 text-sm text-[#2D1B2E] border border-[#FFD2DB]/50 rounded-lg focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all bg-[#FFF5F6]/50 focus:bg-white"
                          style={{ fontFamily: ' serif' }}
                          placeholder="+880-1XXXXXXXXX"
                        />
                      </div>

                      {/* Country - Required */}
                      <div>
                        <label className="block text-[10px] font-medium text-[#2D1B2E] mb-0.5" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                          <Globe className="w-3 h-3 inline mr-1 text-[#EE4275]" />
                          <RequiredLabel>Country</RequiredLabel>
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm text-[#2D1B2E] border border-[#FFD2DB]/50 rounded-lg focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all bg-[#FFF5F6]/50 focus:bg-white"
                          style={{ fontFamily: ' serif' }}
                          placeholder="Bangladesh"
                        />
                      </div>

                      {/* City - Required */}
                      <div>
                        <label className="block text-[10px] font-medium text-[#2D1B2E] mb-0.5" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                          <Building2 className="w-3 h-3 inline mr-1 text-[#EE4275]" />
                          <RequiredLabel>City</RequiredLabel>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm text-[#2D1B2E] border border-[#FFD2DB]/50 rounded-lg focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all bg-[#FFF5F6]/50 focus:bg-white"
                          style={{ fontFamily: ' serif' }}
                          placeholder="Dhaka"
                        />
                      </div>

                      {/* Address - Required */}
                      <div>
                        <label className="block text-[10px] font-medium text-[#2D1B2E] mb-0.5" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                          <Home className="w-3 h-3 inline mr-1 text-[#EE4275]" />
                          <RequiredLabel>Street Address</RequiredLabel>
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm text-[#2D1B2E] border border-[#FFD2DB]/50 rounded-lg focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all bg-[#FFF5F6]/50 focus:bg-white"
                          style={{ fontFamily: ' serif' }}
                          placeholder="Your street address"
                        />
                      </div>

                      {/* Zip Code - Required */}
                      <div>
                        <label className="block text-[10px] font-medium text-[#2D1B2E] mb-0.5" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                          <MapPinned className="w-3 h-3 inline mr-1 text-[#EE4275]" />
                          <RequiredLabel>Zip Code</RequiredLabel>
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm text-[#2D1B2E] border border-[#FFD2DB]/50 rounded-lg focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all bg-[#FFF5F6]/50 focus:bg-white"
                          style={{ fontFamily: 'serif' }}
                          placeholder="10001"
                        />
                      </div>

                      {/* Password - Required */}
                      <div>
                        <label className="block text-[10px] font-medium text-[#2D1B2E] mb-0.5" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                          <Lock className="w-3 h-3 inline mr-1 text-[#EE4275]" />
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
                            className="w-full px-3 py-1.5 pr-8 text-sm text-[#2D1B2E] border border-[#FFD2DB]/50 rounded-lg focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all bg-[#FFF5F6]/50 focus:bg-white"
                            style={{ fontFamily: ' serif' }}
                            placeholder="Min. 8 chars"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="w-3.5 h-3.5 text-[#C4B5C5]" />
                            ) : (
                              <Eye className="w-3.5 h-3.5 text-[#C4B5C5]" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password - Required */}
                      <div>
                        <label className="block text-[10px] font-medium text-[#2D1B2E] mb-0.5" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                          <Lock className="w-3 h-3 inline mr-1 text-[#EE4275]" />
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
                            className="w-full px-3 py-1.5 pr-8 text-sm text-[#2D1B2E] border border-[#FFD2DB]/50 rounded-lg focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all bg-[#FFF5F6]/50 focus:bg-white"
                            style={{ fontFamily: ' serif' }}
                            placeholder="Re-enter password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-3.5 h-3.5 text-[#C4B5C5]" />
                            ) : (
                              <Eye className="w-3.5 h-3.5 text-[#C4B5C5]" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Terms Agreement - Full Width */}
                      <div className="md:col-span-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            className="rounded border-[#FFD2DB] text-[#EE4275] focus:ring-[#EE4275]/20 w-3.5 h-3.5"
                          />
                          <span className="text-[9px] text-[#8B7A8C]" style={{ fontFamily: FONT_FAMILY }}>
                            I agree to the{' '}
                            <Link href="/terms" className="text-[#EE4275] hover:underline font-medium">
                              Terms
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="text-[#EE4275] hover:underline font-medium">
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
                      className="w-full mt-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white py-1.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Creating...
                        </>
                      ) : (
                        <>
                          Create Account
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
                        <span className="px-3 bg-white text-[#C4B5C5] text-[9px]" style={{ fontFamily: FONT_FAMILY }}>
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
                    <div className="text-center mt-2">
                      <p className="text-[9px] text-[#8B7A8C]" style={{ fontFamily: FONT_FAMILY }}>
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-[#EE4275] hover:text-[#EE4275]/70 transition-colors" style={{ fontFamily: FONT_FAMILY }}>
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
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
                  <div className="w-14 h-14 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#EE4275]/25">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D1B2E] mb-1" style={{ fontFamily: FONT_FAMILY }}>
                    Verify Your Email
                  </h3>
                  <p className="text-xs text-[#8B7A8C]" style={{ fontFamily: FONT_FAMILY }}>
                    We've sent a verification code to <br />
                    <span className="font-bold text-[#EE4275]">{otpEmail}</span>
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-[#2D1B2E] mb-2 text-center" style={{ fontFamily: FONT_FAMILY }}>
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-full px-4 py-2 text-center text-xl tracking-wider border border-[#FFD2DB]/50 rounded-xl focus:border-[#EE4275] focus:ring-2 focus:ring-[#EE4275]/20 transition-all font-mono"
                    style={{ fontFamily: FONT_FAMILY }}
                    autoFocus
                    disabled={isVerifying}
                  />
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={isVerifying || otp.length !== 6}
                  className="w-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all disabled:opacity-50 text-sm"
                  style={{ fontFamily: FONT_FAMILY }}
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
                    className="text-xs text-[#EE4275] hover:text-[#EE4275]/70 transition-colors disabled:opacity-50 font-medium"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    {resendDisabled ? `Resend OTP in ${formatTime(countdown)}` : 'Resend OTP'}
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-[#FFD2DB]/30">
                  <button
                    onClick={() => {
                      if (timerRef.current) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                      }
                      setShowOtpModal(false);
                    }}
                    disabled={isVerifying}
                    className="w-full text-xs text-[#C4B5C5] hover:text-[#8B7A8C] transition-colors"
                    style={{ fontFamily: FONT_FAMILY }}
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