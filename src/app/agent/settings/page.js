// // app/agent/settings/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   User,
//   Mail,
//   Phone,
//   Save,
//   Lock,
//   Eye,
//   EyeOff,
//   Shield,
//   Bell,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Edit,
//   Key,
//   Info,
//   MapPin,
//   Gift,
//   Sparkles,
//   Heart,
//   Smartphone,
//   Package,
//   Headphones,
//   Truck,
//   Award,
//   Store,
//   ShoppingBag,
//   Building2,
//   Zap,
//   BarChart3,
//   Users,
//   MessageSquare,
//   Settings as SettingsIcon
// } from 'lucide-react';

// export default function AgentSettings() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [changingPassword, setChangingPassword] = useState(false);
//   const [activeTab, setActiveTab] = useState('view');
//   const [profileImageError, setProfileImageError] = useState(false);

//   const [userData, setUserData] = useState({
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     country: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     companyName: '',
//     role: '',
//     emailVerified: false,
//     lastLogin: null,
//     loginCount: 0,
//     createdAt: null,
//     profilePicture: '',
//     isSubscribedToNewsletter: false
//   });

//   const [editFormData, setEditFormData] = useState({
//     contactPerson: '',
//     phone: '',
//     whatsapp: '',
//     country: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     companyName: ''
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     setProfileImageError(false);
//   }, [userData.profilePicture]);

//   const fetchUserData = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch('http://localhost:5000/api/auth/me', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const user = data.user;
//         setUserData({
//           contactPerson: user.contactPerson || '',
//           email: user.email || '',
//           phone: user.phone || '',
//           whatsapp: user.whatsapp || '',
//           country: user.country || '',
//           address: user.address || '',
//           city: user.city || '',
//           zipCode: user.zipCode || '',
//           companyName: user.companyName || '',
//           role: user.role || 'call_center_agent',
//           emailVerified: user.emailVerified || false,
//           lastLogin: user.lastLogin || null,
//           loginCount: user.loginCount || 0,
//           createdAt: user.createdAt || null,
//           profilePicture: user.profilePicture || '',
//           isSubscribedToNewsletter: user.isSubscribedToNewsletter || false
//         });

//         setEditFormData({
//           contactPerson: user.contactPerson || '',
//           phone: user.phone || '',
//           whatsapp: user.whatsapp || '',
//           country: user.country || '',
//           address: user.address || '',
//           city: user.city || '',
//           zipCode: user.zipCode || '',
//           companyName: user.companyName || ''
//         });
//       } else {
//         toast.error('Failed to load profile');
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       toast.error('Connection Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch('http://localhost:5000/api/auth/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           contactPerson: editFormData.contactPerson,
//           phone: editFormData.phone,
//           whatsapp: editFormData.whatsapp,
//           country: editFormData.country,
//           address: editFormData.address,
//           city: editFormData.city,
//           zipCode: editFormData.zipCode,
//           companyName: editFormData.companyName
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUserData(prev => ({
//           ...prev,
//           contactPerson: editFormData.contactPerson,
//           phone: editFormData.phone,
//           whatsapp: editFormData.whatsapp,
//           country: editFormData.country,
//           address: editFormData.address,
//           city: editFormData.city,
//           zipCode: editFormData.zipCode,
//           companyName: editFormData.companyName
//         }));

//         const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
//         localStorage.setItem('user', JSON.stringify({
//           ...storedUser,
//           contactPerson: editFormData.contactPerson,
//           phone: editFormData.phone,
//           whatsapp: editFormData.whatsapp,
//           companyName: editFormData.companyName
//         }));

//         toast.success('Profile Updated! 🎉');
//         setActiveTab('view');
//       } else {
//         toast.error('Update Failed');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.error('Connection Error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();

//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       toast.error('Password Mismatch');
//       return;
//     }

//     if (passwordData.newPassword.length < 8) {
//       toast.error('Password must be at least 8 characters');
//       return;
//     }

//     setChangingPassword(true);

//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch('http://localhost:5000/api/auth/change-password', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           currentPassword: passwordData.currentPassword,
//           newPassword: passwordData.newPassword
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Password Changed Successfully!');
//         setPasswordData({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: ''
//         });
//         setActiveTab('view');
//       } else {
//         toast.error(data.error || 'Current password is incorrect');
//       }
//     } catch (error) {
//       console.error('Error changing password:', error);
//       toast.error('Connection Error');
//     } finally {
//       setChangingPassword(false);
//     }
//   };

//   const calculatePasswordStrength = (password) => {
//     let strength = 0;
//     if (password.length >= 8) strength++;
//     if (/[A-Z]/.test(password)) strength++;
//     if (/[a-z]/.test(password)) strength++;
//     if (/[0-9]/.test(password)) strength++;
//     if (/[^A-Za-z0-9]/.test(password)) strength++;
//     setPasswordStrength(strength);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handlePasswordInputChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     if (name === 'newPassword') {
//       calculatePasswordStrength(value);
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Never';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Agent-specific stats
//   const agentStats = {
//     totalOrders: 0,
//     pendingOrders: 0,
//     todayCalls: 0,
//     resolvedIssues: 0
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-[#06B6D4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f0f7fa]/50 via-white to-[#e8f4f8]/30 py-8">
//       <div className="container mx-auto px-4 max-w-6xl">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-1">
//             <div className="p-2 bg-gradient-to-r from-[#06B6D4] to-[#004767] rounded-xl shadow-md">
//               <Headphones className="w-6 h-6 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-[#004767]">Agent Profile</h1>
//             <Sparkles className="w-5 h-5 text-[#06B6D4] ml-1" />
//           </div>
//           <p className="text-gray-500 text-sm ml-14">Manage your call center agent account information</p>
//         </div>

    

//         {/* Tabs */}
//         <div className="mb-6 border-b border-[#06B6D4]/20 bg-white/80 backdrop-blur-sm rounded-t-xl px-4 shadow-sm">
//           <div className="flex gap-1 overflow-x-auto">
//             {[
//               { id: 'view', label: 'Profile Info', icon: Info },
//               { id: 'edit', label: 'Edit Profile', icon: Edit },
//               { id: 'security', label: 'Security', icon: Key }
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-6 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
//                   activeTab === tab.id
//                     ? 'text-[#004767]'
//                     : 'text-gray-500 hover:text-[#004767]'
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#06B6D4]' : 'text-gray-400'}`} />
//                   {tab.label}
//                 </div>
//                 {activeTab === tab.id && (
//                   <motion.div
//                     layoutId="activeTab"
//                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#06B6D4] to-[#004767]"
//                     initial={false}
//                     transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                   />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Tab Content */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//           >
//             {/* Profile Info Tab */}
//             {activeTab === 'view' && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#06B6D4]/20 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-[#06B6D4]/20 bg-gradient-to-r from-[#f0f7fa] to-white">
//                   <h2 className="text-lg font-semibold text-[#004767]">Profile Information</h2>
//                   <p className="text-sm text-gray-500 mt-0.5">Your personal details and account information</p>
//                 </div>

//                 <div className="p-6">
//                   {/* Profile Header */}
//                   <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#06B6D4]/20">
//                     <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#004767] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#06B6D4]/20">
//                       {userData.contactPerson?.charAt(0) || '?'}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-[#004767]">{userData.contactPerson}</h3>
//                       <div className="flex flex-wrap items-center gap-2 mt-1">
//                         <span className="px-3 py-1 bg-gradient-to-r from-[#06B6D4]/10 to-[#004767]/10 text-[#004767] rounded-full text-xs font-medium border border-[#06B6D4]/30">
//                           Call Center Agent
//                         </span>
//                         <Headphones className="w-4 h-4 text-[#06B6D4]" />
//                         {userData.companyName && (
//                           <span className="px-3 py-1 bg-gradient-to-r from-[#004767]/10 to-[#06B6D4]/10 text-[#004767] rounded-full text-xs font-medium border border-[#06B6D4]/30">
//                             <Building2 className="w-3 h-3 inline mr-1" />
//                             {userData.companyName}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Information Grid */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <h4 className="text-sm font-semibold text-[#004767] flex items-center gap-2">
//                         <User className="w-4 h-4 text-[#06B6D4]" />
//                         Personal Information
//                       </h4>

//                       <div className="space-y-3">
//                         <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-[#f0f7fa] to-white rounded-lg border border-[#06B6D4]/20">
//                           <User className="w-4 h-4 text-[#06B6D4] mt-0.5" />
//                           <div>
//                             <p className="text-xs text-gray-500">Full Name</p>
//                             <p className="text-sm font-medium text-[#004767]">{userData.contactPerson}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-[#f0f7fa] to-white rounded-lg border border-[#06B6D4]/20">
//                           <Mail className="w-4 h-4 text-[#06B6D4] mt-0.5" />
//                           <div>
//                             <p className="text-xs text-gray-500">Email Address</p>
//                             <p className="text-sm font-medium text-[#004767]">{userData.email}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-[#f0f7fa] to-white rounded-lg border border-[#06B6D4]/20">
//                           <Phone className="w-4 h-4 text-[#06B6D4] mt-0.5" />
//                           <div>
//                             <p className="text-xs text-gray-500">Phone Number</p>
//                             <p className="text-sm font-medium text-[#004767]">{userData.phone || 'Not provided'}</p>
//                           </div>
//                         </div>

//                         {userData.companyName && (
//                           <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-[#f0f7fa] to-white rounded-lg border border-[#06B6D4]/20">
//                             <Building2 className="w-4 h-4 text-[#06B6D4] mt-0.5" />
//                             <div>
//                               <p className="text-xs text-gray-500">Company</p>
//                               <p className="text-sm font-medium text-[#004767]">{userData.companyName}</p>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <h4 className="text-sm font-semibold text-[#004767] flex items-center gap-2">
//                         <MapPin className="w-4 h-4 text-[#06B6D4]" />
//                         Address Information
//                       </h4>

//                       <div className="space-y-3">
//                         <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-[#f0f7fa] to-white rounded-lg border border-[#06B6D4]/20">
//                           <MapPin className="w-4 h-4 text-[#06B6D4] mt-0.5" />
//                           <div>
//                             <p className="text-xs text-gray-500">Street Address</p>
//                             <p className="text-sm font-medium text-[#004767]">{userData.address || 'Not provided'}</p>
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-2">
//                           <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-[#f0f7fa] to-white rounded-lg border border-[#06B6D4]/20">
//                             <MapPin className="w-4 h-4 text-[#06B6D4] mt-0.5" />
//                             <div>
//                               <p className="text-xs text-gray-500">City</p>
//                               <p className="text-sm font-medium text-[#004767]">{userData.city || 'Not provided'}</p>
//                             </div>
//                           </div>
//                           <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-[#f0f7fa] to-white rounded-lg border border-[#06B6D4]/20">
//                             <MapPin className="w-4 h-4 text-[#06B6D4] mt-0.5" />
//                             <div>
//                               <p className="text-xs text-gray-500">Country</p>
//                               <p className="text-sm font-medium text-[#004767]">{userData.country || 'Not provided'}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Account Stats */}
//                       <div className="mt-4 pt-4 border-t border-[#06B6D4]/20">
//                         <h4 className="text-sm font-semibold text-[#004767] flex items-center gap-2 mb-3">
//                           <Clock className="w-4 h-4 text-[#06B6D4]" />
//                           Account Activity
//                         </h4>
//                         <div className="grid grid-cols-2 gap-2">
//                           <div className="p-2 bg-gradient-to-r from-[#f0f7fa] to-white rounded-lg border border-[#06B6D4]/20 text-center">
//                             <p className="text-xs text-gray-500">Login Count</p>
//                             <p className="text-sm font-semibold text-[#004767]">{userData.loginCount}</p>
//                           </div>
//                           <div className="p-2 bg-gradient-to-r from-[#f0f7fa] to-white rounded-lg border border-[#06B6D4]/20 text-center">
//                             <p className="text-xs text-gray-500">Last Login</p>
//                             <p className="text-sm font-semibold text-[#004767]">{formatDate(userData.lastLogin)}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="mt-6 pt-6 border-t border-[#06B6D4]/20 flex flex-wrap gap-3">
//                     <button
//                       onClick={() => setActiveTab('edit')}
//                       className="px-6 py-2.5 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white rounded-lg hover:shadow-lg hover:shadow-[#06B6D4]/20 transition-all text-sm font-medium flex items-center gap-2 shadow-md"
//                     >
//                       <Edit className="w-4 h-4" />
//                       Edit Profile
//                     </button>
//                     <button
//                       onClick={() => setActiveTab('security')}
//                       className="px-6 py-2.5 border border-[#06B6D4]/30 text-[#004767] rounded-lg hover:bg-[#f0f7fa] hover:border-[#06B6D4] transition-all text-sm font-medium flex items-center gap-2"
//                     >
//                       <Key className="w-4 h-4 text-[#06B6D4]" />
//                       Change Password
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Edit Profile Tab */}
//             {activeTab === 'edit' && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#06B6D4]/20 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-[#06B6D4]/20 bg-gradient-to-r from-[#f0f7fa] to-white">
//                   <h2 className="text-lg font-semibold text-[#004767]">Edit Profile</h2>
//                   <p className="text-sm text-gray-500 mt-0.5">Update your personal information</p>
//                 </div>

//                 <form onSubmit={handleProfileUpdate} className="p-6">
//                   <div className="space-y-5">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Full Name <span className="text-[#06B6D4]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="contactPerson"
//                         value={editFormData.contactPerson}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-4 py-2.5 border border-[#06B6D4]/30 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all bg-[#f0f7fa]/30 hover:bg-white"
//                         placeholder="Your full name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Company Name
//                       </label>
//                       <div className="relative">
//                         <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#06B6D4]" />
//                         <input
//                           type="text"
//                           name="companyName"
//                           value={editFormData.companyName}
//                           onChange={handleEditChange}
//                           className="w-full pl-10 pr-4 py-2.5 border border-[#06B6D4]/30 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all bg-[#f0f7fa]/30 hover:bg-white"
//                           placeholder="Your company name"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email Address
//                       </label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#06B6D4]" />
//                         <input
//                           type="email"
//                           value={userData.email}
//                           disabled
//                           className="w-full pl-10 pr-4 py-2.5 border border-[#06B6D4]/30 rounded-lg bg-[#f0f7fa]/30 text-gray-500 cursor-not-allowed"
//                         />
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Phone Number <span className="text-[#06B6D4]">*</span>
//                         </label>
//                         <div className="relative">
//                           <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#06B6D4]" />
//                           <input
//                             type="tel"
//                             name="phone"
//                             value={editFormData.phone}
//                             onChange={handleEditChange}
//                             required
//                             className="w-full pl-10 pr-4 py-2.5 border border-[#06B6D4]/30 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all bg-[#f0f7fa]/30 hover:bg-white"
//                             placeholder="+880 1234 567890"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           WhatsApp Number
//                         </label>
//                         <div className="relative">
//                           <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#06B6D4]" />
//                           <input
//                             type="tel"
//                             name="whatsapp"
//                             value={editFormData.whatsapp}
//                             onChange={handleEditChange}
//                             className="w-full pl-10 pr-4 py-2.5 border border-[#06B6D4]/30 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all bg-[#f0f7fa]/30 hover:bg-white"
//                             placeholder="+880 1234 567890"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Country <span className="text-[#06B6D4]">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="country"
//                           value={editFormData.country}
//                           onChange={handleEditChange}
//                           required
//                           className="w-full px-4 py-2.5 border border-[#06B6D4]/30 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all bg-[#f0f7fa]/30 hover:bg-white"
//                           placeholder="Bangladesh"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           City <span className="text-[#06B6D4]">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="city"
//                           value={editFormData.city}
//                           onChange={handleEditChange}
//                           required
//                           className="w-full px-4 py-2.5 border border-[#06B6D4]/30 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all bg-[#f0f7fa]/30 hover:bg-white"
//                           placeholder="Dhaka"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Street Address <span className="text-[#06B6D4]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="address"
//                         value={editFormData.address}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-4 py-2.5 border border-[#06B6D4]/30 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all bg-[#f0f7fa]/30 hover:bg-white"
//                         placeholder="Your street address"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         ZIP / Postal Code <span className="text-[#06B6D4]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="zipCode"
//                         value={editFormData.zipCode}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-4 py-2.5 border border-[#06B6D4]/30 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all bg-[#f0f7fa]/30 hover:bg-white"
//                         placeholder="1230"
//                       />
//                     </div>

//                     <div className="flex items-center gap-3 pt-4">
//                       <button
//                         type="button"
//                         onClick={() => setActiveTab('view')}
//                         className="flex-1 px-6 py-2.5 border border-[#06B6D4]/30 rounded-lg hover:bg-[#f0f7fa] transition-all font-medium text-[#004767]"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={saving}
//                         className="flex-1 px-6 py-2.5 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white rounded-lg hover:shadow-lg hover:shadow-[#06B6D4]/20 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
//                       >
//                         {saving ? (
//                           <>
//                             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                             Saving...
//                           </>
//                         ) : (
//                           <>
//                             <Save className="w-4 h-4" />
//                             Save Changes
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {/* Security Tab */}
//             {activeTab === 'security' && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#06B6D4]/20 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-[#06B6D4]/20 bg-gradient-to-r from-[#f0f7fa] to-white">
//                   <h2 className="text-lg font-semibold text-[#004767]">Security Settings</h2>
//                   <p className="text-sm text-gray-500 mt-0.5">Change your password to keep your account secure</p>
//                 </div>

//                 <form onSubmit={handlePasswordChange} className="p-6">
//                   <div className="space-y-5">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Current Password <span className="text-[#06B6D4]">*</span>
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#06B6D4]" />
//                         <input
//                           type={showCurrentPassword ? "text" : "password"}
//                           name="currentPassword"
//                           value={passwordData.currentPassword}
//                           onChange={handlePasswordInputChange}
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-[#06B6D4]/30 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all bg-[#f0f7fa]/30 hover:bg-white"
//                           placeholder="Enter your current password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-[#06B6D4] hover:text-[#004767]"
//                         >
//                           {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         New Password <span className="text-[#06B6D4]">*</span>
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#06B6D4]" />
//                         <input
//                           type={showNewPassword ? "text" : "password"}
//                           name="newPassword"
//                           value={passwordData.newPassword}
//                           onChange={handlePasswordInputChange}
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-[#06B6D4]/30 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all bg-[#f0f7fa]/30 hover:bg-white"
//                           placeholder="Enter new password (min. 8 characters)"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowNewPassword(!showNewPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-[#06B6D4] hover:text-[#004767]"
//                         >
//                           {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>

//                       {passwordData.newPassword && (
//                         <div className="mt-2">
//                           <div className="flex items-center gap-1 mb-1">
//                             {[1,2,3,4,5].map((level) => (
//                               <div
//                                 key={level}
//                                 className={`h-1 flex-1 rounded-full ${
//                                   level <= passwordStrength
//                                     ? level <= 2 ? 'bg-[#06B6D4]' : level <= 4 ? 'bg-[#004767]' : 'bg-green-500'
//                                     : 'bg-[#06B6D4]/20'
//                                 }`}
//                               />
//                             ))}
//                           </div>
//                           <p className="text-xs text-gray-500">
//                             {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 4 ? 'Medium' : 'Strong'} password
//                           </p>
//                         </div>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Confirm New Password <span className="text-[#06B6D4]">*</span>
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#06B6D4]" />
//                         <input
//                           type={showConfirmPassword ? "text" : "password"}
//                           name="confirmPassword"
//                           value={passwordData.confirmPassword}
//                           onChange={handlePasswordInputChange}
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-[#06B6D4]/30 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all bg-[#f0f7fa]/30 hover:bg-white"
//                           placeholder="Confirm your new password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-[#06B6D4] hover:text-[#004767]"
//                         >
//                           {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>

//                       {passwordData.confirmPassword && (
//                         <p className={`text-xs mt-1 flex items-center gap-1 ${
//                           passwordData.newPassword === passwordData.confirmPassword
//                             ? 'text-green-600'
//                             : 'text-[#06B6D4]'
//                         }`}>
//                           {passwordData.newPassword === passwordData.confirmPassword ? (
//                             <>✓ Passwords match</>
//                           ) : (
//                             <>✗ Passwords do not match</>
//                           )}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex items-center gap-3 pt-4">
//                       <button
//                         type="button"
//                         onClick={() => setActiveTab('view')}
//                         className="flex-1 px-6 py-2.5 border border-[#06B6D4]/30 rounded-lg hover:bg-[#f0f7fa] transition-all font-medium text-[#004767]"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={changingPassword}
//                         className="flex-1 px-6 py-2.5 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white rounded-lg hover:shadow-lg hover:shadow-[#06B6D4]/20 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
//                       >
//                         {changingPassword ? (
//                           <>
//                             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                             Updating...
//                           </>
//                         ) : (
//                           <>
//                             <Key className="w-4 h-4" />
//                             Update Password
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Save,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Key,
  Info,
  MapPin,
  Gift,
  Sparkles,
  Heart,
  Smartphone,
  Package,
  Headphones,
  Truck,
  Award,
  Store,
  ShoppingBag,
  Building2,
  Zap,
  BarChart3,
  Users,
  MessageSquare,
  Settings as SettingsIcon
} from 'lucide-react';

export default function AgentSettings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('view');
  const [profileImageError, setProfileImageError] = useState(false);

  const [userData, setUserData] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    companyName: '',
    role: '',
    emailVerified: false,
    lastLogin: null,
    loginCount: 0,
    createdAt: null,
    profilePicture: '',
    isSubscribedToNewsletter: false
  });

  const [editFormData, setEditFormData] = useState({
    contactPerson: '',
    phone: '',
    whatsapp: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    companyName: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setProfileImageError(false);
  }, [userData.profilePicture]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        const user = data.user;
        setUserData({
          contactPerson: user.contactPerson || '',
          email: user.email || '',
          phone: user.phone || '',
          whatsapp: user.whatsapp || '',
          country: user.country || '',
          address: user.address || '',
          city: user.city || '',
          zipCode: user.zipCode || '',
          companyName: user.companyName || '',
          role: user.role || 'call_center_agent',
          emailVerified: user.emailVerified || false,
          lastLogin: user.lastLogin || null,
          loginCount: user.loginCount || 0,
          createdAt: user.createdAt || null,
          profilePicture: user.profilePicture || '',
          isSubscribedToNewsletter: user.isSubscribedToNewsletter || false
        });

        setEditFormData({
          contactPerson: user.contactPerson || '',
          phone: user.phone || '',
          whatsapp: user.whatsapp || '',
          country: user.country || '',
          address: user.address || '',
          city: user.city || '',
          zipCode: user.zipCode || '',
          companyName: user.companyName || ''
        });
      } else {
        toast.error('Failed to load profile');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Connection Error');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contactPerson: editFormData.contactPerson,
          phone: editFormData.phone,
          whatsapp: editFormData.whatsapp,
          country: editFormData.country,
          address: editFormData.address,
          city: editFormData.city,
          zipCode: editFormData.zipCode,
          companyName: editFormData.companyName
        })
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(prev => ({
          ...prev,
          contactPerson: editFormData.contactPerson,
          phone: editFormData.phone,
          whatsapp: editFormData.whatsapp,
          country: editFormData.country,
          address: editFormData.address,
          city: editFormData.city,
          zipCode: editFormData.zipCode,
          companyName: editFormData.companyName
        }));

        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({
          ...storedUser,
          contactPerson: editFormData.contactPerson,
          phone: editFormData.phone,
          whatsapp: editFormData.whatsapp,
          companyName: editFormData.companyName
        }));

        toast.success('Profile Updated! 🎉');
        setActiveTab('view');
      } else {
        toast.error('Update Failed');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Connection Error');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Password Mismatch');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setChangingPassword(true);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Password Changed Successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setActiveTab('view');
      } else {
        toast.error(data.error || 'Current password is incorrect');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Connection Error');
    } finally {
      setChangingPassword(false);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'newPassword') {
      calculatePasswordStrength(value);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Agent-specific stats
  const agentStats = {
    totalOrders: 0,
    pendingOrders: 0,
    todayCalls: 0,
    resolvedIssues: 0
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header - Black & Blue Theme */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-blue-600 rounded-xl shadow-md shadow-blue-200">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Profile</h1>
            <Sparkles className="w-5 h-5 text-blue-600 ml-1" />
          </div>
          <p className="text-gray-500 text-sm ml-14">Manage your call center agent account information</p>
        </div>

        {/* Tabs - Black & Blue Theme */}
        <div className="mb-6 border-b border-gray-200 bg-white rounded-t-xl px-4 shadow-sm">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'view', label: 'Profile Info', icon: Info },
              { id: 'edit', label: 'Edit Profile', icon: Edit },
              { id: 'security', label: 'Security', icon: Key }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                  {tab.label}
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Profile Info Tab */}
            {activeTab === 'view' && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Your personal details and account information</p>
                </div>

                <div className="p-6">
                  {/* Profile Header */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-200">
                      {userData.contactPerson?.charAt(0) || '?'}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{userData.contactPerson}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                          Call Center Agent
                        </span>
                        <Headphones className="w-4 h-4 text-blue-600" />
                        {userData.companyName && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                            <Building2 className="w-3 h-3 inline mr-1" />
                            {userData.companyName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-blue-600 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Personal Information
                      </h4>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <User className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500">Full Name</p>
                            <p className="text-sm font-medium text-gray-900">{userData.contactPerson}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <Mail className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500">Email Address</p>
                            <p className="text-sm font-medium text-gray-900">{userData.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <Phone className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500">Phone Number</p>
                            <p className="text-sm font-medium text-gray-900">{userData.phone || 'Not provided'}</p>
                          </div>
                        </div>

                        {userData.companyName && (
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <Building2 className="w-4 h-4 text-blue-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Company</p>
                              <p className="text-sm font-medium text-gray-900">{userData.companyName}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-blue-600 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Address Information
                      </h4>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500">Street Address</p>
                            <p className="text-sm font-medium text-gray-900">{userData.address || 'Not provided'}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">City</p>
                              <p className="text-sm font-medium text-gray-900">{userData.city || 'Not provided'}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Country</p>
                              <p className="text-sm font-medium text-gray-900">{userData.country || 'Not provided'}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Account Stats */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-blue-600 flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4" />
                          Account Activity
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 text-center">
                            <p className="text-xs text-gray-500">Login Count</p>
                            <p className="text-sm font-semibold text-gray-900">{userData.loginCount}</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 text-center">
                            <p className="text-xs text-gray-500">Last Login</p>
                            <p className="text-sm font-semibold text-gray-900">{formatDate(userData.lastLogin)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab('edit')}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all text-sm font-medium flex items-center gap-2 shadow-md"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setActiveTab('security')}
                      className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all text-sm font-medium flex items-center gap-2"
                    >
                      <Key className="w-4 h-4 text-blue-600" />
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Profile Tab */}
            {activeTab === 'edit' && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-semibold text-gray-900">Edit Profile</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Update your personal information</p>
                </div>

                <form onSubmit={handleProfileUpdate} className="p-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={editFormData.contactPerson}
                        onChange={handleEditChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="companyName"
                          value={editFormData.companyName}
                          onChange={handleEditChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={userData.email}
                          disabled
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number <span className="text-blue-600">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={editFormData.phone}
                            onChange={handleEditChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
                            placeholder="+880 1234 567890"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          WhatsApp Number
                        </label>
                        <div className="relative">
                          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            name="whatsapp"
                            value={editFormData.whatsapp}
                            onChange={handleEditChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
                            placeholder="+880 1234 567890"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country <span className="text-blue-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={editFormData.country}
                          onChange={handleEditChange}
                          required
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
                          placeholder="Bangladesh"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City <span className="text-blue-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={editFormData.city}
                          onChange={handleEditChange}
                          required
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
                          placeholder="Dhaka"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={editFormData.address}
                        onChange={handleEditChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
                        placeholder="Your street address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP / Postal Code <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={editFormData.zipCode}
                        onChange={handleEditChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
                        placeholder="1230"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveTab('view')}
                        className="flex-1 px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                      >
                        {saving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Change your password to keep your account secure</p>
                </div>

                <form onSubmit={handlePasswordChange} className="p-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password <span className="text-blue-600">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordInputChange}
                          required
                          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
                          placeholder="Enter your current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password <span className="text-blue-600">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordInputChange}
                          required
                          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
                          placeholder="Enter new password (min. 8 characters)"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {passwordData.newPassword && (
                        <div className="mt-2">
                          <div className="flex items-center gap-1 mb-1">
                            {[1,2,3,4,5].map((level) => (
                              <div
                                key={level}
                                className={`h-1 flex-1 rounded-full ${
                                  level <= passwordStrength
                                    ? level <= 2 ? 'bg-rose-500' : level <= 4 ? 'bg-yellow-500' : 'bg-green-500'
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">
                            {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 4 ? 'Medium' : 'Strong'} password
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password <span className="text-blue-600">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordInputChange}
                          required
                          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
                          placeholder="Confirm your new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {passwordData.confirmPassword && (
                        <p className={`text-xs mt-1 flex items-center gap-1 ${
                          passwordData.newPassword === passwordData.confirmPassword
                            ? 'text-green-600'
                            : 'text-rose-600'
                        }`}>
                          {passwordData.newPassword === passwordData.confirmPassword ? (
                            <>✓ Passwords match</>
                          ) : (
                            <>✗ Passwords do not match</>
                          )}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveTab('view')}
                        className="flex-1 px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={changingPassword}
                        className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                      >
                        {changingPassword ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <Key className="w-4 h-4" />
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}