
// // app/admin/settings/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
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
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Edit,
//   Key,
//   Info,
//   Sparkles,
//   Smartphone,
//   Gift,
//   Briefcase,
//   Calendar,
//   Award,
//   Heart,
//   Store,
//   ArrowLeft,
//   Zap
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// export default function AdminSettings() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [changingPassword, setChangingPassword] = useState(false);
//   const [activeTab, setActiveTab] = useState('view');
  
//   const [userData, setUserData] = useState({
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     role: '',
//     emailVerified: false,
//     lastLogin: null,
//     loginCount: 0,
//     createdAt: null
//   });

//   const [editFormData, setEditFormData] = useState({
//     contactPerson: '',
//     phone: '',
//     whatsapp: ''
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
//           role: user.role || 'admin',
//           emailVerified: user.emailVerified || false,
//           lastLogin: user.lastLogin || null,
//           loginCount: user.loginCount || 0,
//           createdAt: user.createdAt || null
//         });

//         setEditFormData({
//           contactPerson: user.contactPerson || '',
//           phone: user.phone || '',
//           whatsapp: user.whatsapp || ''
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
//           whatsapp: editFormData.whatsapp
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUserData(prev => ({
//           ...prev,
//           contactPerson: editFormData.contactPerson,
//           phone: editFormData.phone,
//           whatsapp: editFormData.whatsapp
//         }));

//         const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
//         localStorage.setItem('user', JSON.stringify({
//           ...storedUser,
//           contactPerson: editFormData.contactPerson,
//           phone: editFormData.phone,
//           whatsapp: editFormData.whatsapp
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

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading your profile...</p>
//           <Sparkles className="w-5 h-5 text-blue-600 mx-auto mt-2 animate-pulse" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="settings">
//     <div className="min-h-screen bg-white">
//       {/* Header - Black & Blue Theme */}
//       <div className="bg-white border-b border-blue-600/20 shadow-lg sticky top-0 z-10">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Link href="/authorize/dashboard" className="p-2 hover:bg-blue-600/20 rounded-lg transition-colors">
//                 <ArrowLeft className="w-5 h-5 text-black/80 hover:text-black" />
//               </Link>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <Shield className="w-6 h-6 text-blue-400" />
//                   <h1 className="text-xl font-bold text-black">Settings</h1>
//                 </div>
//                 <p className="text-sm text-black/70 mt-1">Manage your account information and security</p>
//               </div>
//             </div>
//             <Zap className="w-5 h-5 text-blue-400" />
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 max-w-4xl py-8">
//         {/* Tabs - Black & Blue Theme */}
//         <div className="mb-6 border-b border-gray-200 bg-white rounded-t-xl px-4 shadow-sm">
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
//                     ? 'text-blue-600'
//                     : 'text-gray-500 hover:text-blue-600'
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
//                   {tab.label}
//                 </div>
//                 {activeTab === tab.id && (
//                   <motion.div
//                     layoutId="activeTab"
//                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
//                     initial={false}
//                     transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                   />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Tab Content - Black & Blue Theme */}
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
//               <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//                   <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
//                   <p className="text-sm text-gray-500 mt-0.5">Your account details and information</p>
//                 </div>

//                 <div className="p-6">
//                   {/* Profile Header */}
//                   <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
//                     <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-200">
//                       {userData.contactPerson?.charAt(0) || userData.email?.charAt(0)}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">{userData.contactPerson}</h3>
//                       <div className="flex flex-wrap items-center gap-2 mt-1">
//                         <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200 flex items-center gap-1">
//                           <Shield className="w-3 h-3" />
//                           {userData.role === 'super_admin' ? 'Super Admin' : 
//                            userData.role === 'admin' ? 'Admin' :
//                            userData.role === 'moderator' ? 'Moderator' :
//                            userData.role === 'call_center_agent' ? 'Call Center Agent' : 'User'}
//                         </span>
//                         {userData.emailVerified && (
//                           <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
//                             <CheckCircle className="w-3 h-3" />
//                             Verified
//                           </span>
//                         )}
//                         <Sparkles className="w-4 h-4 text-blue-600" />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Information Grid */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <h4 className="text-sm font-semibold text-blue-600 flex items-center gap-2">
//                         <User className="w-4 h-4" />
//                         Personal Information
//                       </h4>
                      
//                       <div className="space-y-3">
//                         <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                           <User className="w-4 h-4 text-blue-600 mt-0.5" />
//                           <div>
//                             <p className="text-xs text-gray-500">Full Name</p>
//                             <p className="text-sm font-medium text-gray-900">{userData.contactPerson}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                           <Mail className="w-4 h-4 text-blue-600 mt-0.5" />
//                           <div>
//                             <p className="text-xs text-gray-500">Email Address</p>
//                             <p className="text-sm font-medium text-gray-900">{userData.email}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                           <Phone className="w-4 h-4 text-blue-600 mt-0.5" />
//                           <div>
//                             <p className="text-xs text-gray-500">Phone Number</p>
//                             <p className="text-sm font-medium text-gray-900">{userData.phone || 'Not provided'}</p>
//                           </div>
//                         </div>

//                         {userData.whatsapp && (
//                           <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                             <Smartphone className="w-4 h-4 text-green-500 mt-0.5" />
//                             <div>
//                               <p className="text-xs text-gray-500">WhatsApp</p>
//                               <p className="text-sm font-medium text-gray-900">{userData.whatsapp}</p>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <h4 className="text-sm font-semibold text-blue-600 flex items-center gap-2">
//                         <Clock className="w-4 h-4" />
//                         Account Information
//                       </h4>
                      
//                       <div className="space-y-3">
//                         <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                           <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
//                           <div>
//                             <p className="text-xs text-gray-500">Member Since</p>
//                             <p className="text-sm font-medium text-gray-900">{formatDate(userData.createdAt)}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                           <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
//                           <div>
//                             <p className="text-xs text-gray-500">Access Level</p>
//                             <p className="text-sm font-medium text-gray-900 capitalize">{userData.role || 'User'}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                           <Heart className="w-4 h-4 text-blue-600 mt-0.5" />
//                           <div>
//                             <p className="text-xs text-gray-500">Last Login</p>
//                             <p className="text-sm font-medium text-gray-900">{userData.lastLogin ? formatDate(userData.lastLogin) : 'Never'}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
//                     <button
//                       onClick={() => setActiveTab('edit')}
//                       className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg hover:shadow-blue-200"
//                     >
//                       <Edit className="w-4 h-4" />
//                       Edit Profile
//                     </button>
//                     <button
//                       onClick={() => setActiveTab('security')}
//                       className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all text-sm font-medium flex items-center gap-2"
//                     >
//                       <Key className="w-4 h-4 text-blue-600" />
//                       Change Password
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Edit Profile Tab */}
//             {activeTab === 'edit' && (
//               <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//                   <h2 className="text-lg font-semibold text-gray-900">Edit Profile</h2>
//                   <p className="text-sm text-gray-500 mt-0.5">Update your personal information</p>
//                 </div>

//                 <form onSubmit={handleProfileUpdate} className="p-6">
//                   <div className="space-y-5">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Full Name <span className="text-rose-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="contactPerson"
//                         value={editFormData.contactPerson}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
//                         placeholder="Your full name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email Address
//                       </label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                           type="email"
//                           value={userData.email}
//                           disabled
//                           className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
//                         />
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Phone Number <span className="text-rose-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                           <input
//                             type="tel"
//                             name="phone"
//                             value={editFormData.phone}
//                             onChange={handleEditChange}
//                             required
//                             className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
//                             placeholder="+880 1234 567890"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           WhatsApp Number
//                         </label>
//                         <div className="relative">
//                           <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                           <input
//                             type="tel"
//                             name="whatsapp"
//                             value={editFormData.whatsapp}
//                             onChange={handleEditChange}
//                             className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
//                             placeholder="+880 1234 567890"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3 pt-4">
//                       <button
//                         type="button"
//                         onClick={() => setActiveTab('view')}
//                         className="flex-1 px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={saving}
//                         className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-blue-200"
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
//               <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//                   <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
//                   <p className="text-sm text-gray-500 mt-0.5">Change your password to keep your account secure</p>
//                 </div>

//                 <form onSubmit={handlePasswordChange} className="p-6">
//                   <div className="space-y-5">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Current Password <span className="text-rose-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                           type={showCurrentPassword ? "text" : "password"}
//                           name="currentPassword"
//                           value={passwordData.currentPassword}
//                           onChange={handlePasswordInputChange}
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
//                           placeholder="Enter your current password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
//                         >
//                           {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         New Password <span className="text-rose-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                           type={showNewPassword ? "text" : "password"}
//                           name="newPassword"
//                           value={passwordData.newPassword}
//                           onChange={handlePasswordInputChange}
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
//                           placeholder="Enter new password (min. 8 characters)"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowNewPassword(!showNewPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
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
//                                     ? level <= 2 ? 'bg-rose-500' : level <= 4 ? 'bg-yellow-500' : 'bg-green-500'
//                                     : 'bg-gray-200'
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
//                         Confirm New Password <span className="text-rose-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                           type={showConfirmPassword ? "text" : "password"}
//                           name="confirmPassword"
//                           value={passwordData.confirmPassword}
//                           onChange={handlePasswordInputChange}
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white hover:border-gray-400"
//                           placeholder="Confirm your new password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
//                         >
//                           {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>

//                       {passwordData.confirmPassword && (
//                         <p className={`text-xs mt-1 flex items-center gap-1 ${
//                           passwordData.newPassword === passwordData.confirmPassword
//                             ? 'text-green-600'
//                             : 'text-rose-600'
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
//                         className="flex-1 px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={changingPassword}
//                         className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-blue-200"
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
//     </ProtectedRoute>
//   );
// }



// app/admin/settings/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Key,
  Info,
  Sparkles,
  Smartphone,
  Gift,
  Briefcase,
  Calendar,
  Award,
  Heart,
  Store,
  ArrowLeft,
  Zap
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

export default function AdminSettings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('view');
  
  const [userData, setUserData] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    role: '',
    emailVerified: false,
    lastLogin: null,
    loginCount: 0,
    createdAt: null
  });

  const [editFormData, setEditFormData] = useState({
    contactPerson: '',
    phone: '',
    whatsapp: ''
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
          role: user.role || 'admin',
          emailVerified: user.emailVerified || false,
          lastLogin: user.lastLogin || null,
          loginCount: user.loginCount || 0,
          createdAt: user.createdAt || null
        });

        setEditFormData({
          contactPerson: user.contactPerson || '',
          phone: user.phone || '',
          whatsapp: user.whatsapp || ''
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
          whatsapp: editFormData.whatsapp
        })
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(prev => ({
          ...prev,
          contactPerson: editFormData.contactPerson,
          phone: editFormData.phone,
          whatsapp: editFormData.whatsapp
        }));

        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({
          ...storedUser,
          contactPerson: editFormData.contactPerson,
          phone: editFormData.phone,
          whatsapp: editFormData.whatsapp
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#EE4275] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
          <Sparkles className="w-5 h-5 text-[#EE4275] mx-auto mt-2 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="settings">
    <div className="min-h-screen bg-[#FFF5F6]">
      {/* Header - Pink Theme */}
      <div className="bg-white border-b border-[#EE4275]/20 shadow-lg sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/authorize/dashboard" className="p-2 hover:bg-[#F7C7D3]/30 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-[#2D1B2E]/80 hover:text-[#2D1B2E]" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-[#EE4275]" />
                  <h1 className="text-xl font-bold text-[#2D1B2E]">Settings</h1>
                </div>
                <p className="text-sm text-[#EE4275]/60 mt-1">Manage your account information and security</p>
              </div>
            </div>
            <Sparkles className="w-5 h-5 text-[#EE4275]" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-4xl py-8">
        {/* Tabs - Pink Theme */}
        <div className="mb-6 border-b border-[#F7C7D3]/40 bg-white rounded-t-xl px-4 shadow-sm">
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
                    ? 'text-[#EE4275]'
                    : 'text-[#2D1B2E]/60 hover:text-[#EE4275]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#EE4275]' : 'text-[#EE4275]/40'}`} />
                  {tab.label}
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE4275]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content - Pink Theme */}
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
              <div className="bg-white rounded-xl shadow-lg border border-[#F7C7D3]/40 overflow-hidden">
                <div className="px-6 py-4 border-b border-[#F7C7D3]/40 bg-[#FFF5F6]">
                  <h2 className="text-lg font-semibold text-[#2D1B2E]">Profile Information</h2>
                  <p className="text-sm text-[#EE4275]/60 mt-0.5">Your account details and information</p>
                </div>

                <div className="p-6">
                  {/* Profile Header */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#F7C7D3]/40">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#EE4275]/25">
                      {userData.contactPerson?.charAt(0) || userData.email?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2D1B2E]">{userData.contactPerson}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="px-3 py-1 bg-[#FFF5F6] text-[#EE4275] rounded-full text-xs font-medium border border-[#EE4275]/30 flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          {userData.role === 'super_admin' ? 'Super Admin' : 
                           userData.role === 'admin' ? 'Admin' :
                           userData.role === 'moderator' ? 'Moderator' :
                           userData.role === 'call_center_agent' ? 'Call Center Agent' : 'User'}
                        </span>
                        {userData.emailVerified && (
                          <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                        <Sparkles className="w-4 h-4 text-[#EE4275]" />
                      </div>
                    </div>
                  </div>

                  {/* Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-[#EE4275] flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Personal Information
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
                          <User className="w-4 h-4 text-[#EE4275] mt-0.5" />
                          <div>
                            <p className="text-xs text-[#EE4275]/60">Full Name</p>
                            <p className="text-sm font-medium text-[#2D1B2E]">{userData.contactPerson}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
                          <Mail className="w-4 h-4 text-[#EE4275] mt-0.5" />
                          <div>
                            <p className="text-xs text-[#EE4275]/60">Email Address</p>
                            <p className="text-sm font-medium text-[#2D1B2E]">{userData.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
                          <Phone className="w-4 h-4 text-[#EE4275] mt-0.5" />
                          <div>
                            <p className="text-xs text-[#EE4275]/60">Phone Number</p>
                            <p className="text-sm font-medium text-[#2D1B2E]">{userData.phone || 'Not provided'}</p>
                          </div>
                        </div>

                        {userData.whatsapp && (
                          <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
                            <Smartphone className="w-4 h-4 text-green-500 mt-0.5" />
                            <div>
                              <p className="text-xs text-[#EE4275]/60">WhatsApp</p>
                              <p className="text-sm font-medium text-[#2D1B2E]">{userData.whatsapp}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-[#EE4275] flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Account Information
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
                          <Clock className="w-4 h-4 text-[#EE4275] mt-0.5" />
                          <div>
                            <p className="text-xs text-[#EE4275]/60">Member Since</p>
                            <p className="text-sm font-medium text-[#2D1B2E]">{formatDate(userData.createdAt)}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
                          <Shield className="w-4 h-4 text-[#EE4275] mt-0.5" />
                          <div>
                            <p className="text-xs text-[#EE4275]/60">Access Level</p>
                            <p className="text-sm font-medium text-[#2D1B2E] capitalize">{userData.role || 'User'}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
                          <Heart className="w-4 h-4 text-[#EE4275] mt-0.5" />
                          <div>
                            <p className="text-xs text-[#EE4275]/60">Last Login</p>
                            <p className="text-sm font-medium text-[#2D1B2E]">{userData.lastLogin ? formatDate(userData.lastLogin) : 'Never'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-6 border-t border-[#F7C7D3]/40 flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab('edit')}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all text-sm font-medium flex items-center gap-2 shadow-md"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setActiveTab('security')}
                      className="px-6 py-2.5 border border-[#F7C7D3]/50 text-[#2D1B2E] rounded-lg hover:bg-[#FFF5F6] hover:border-[#EE4275]/30 transition-all text-sm font-medium flex items-center gap-2"
                    >
                      <Key className="w-4 h-4 text-[#EE4275]" />
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Profile Tab */}
            {activeTab === 'edit' && (
              <div className="bg-white rounded-xl shadow-lg border border-[#F7C7D3]/40 overflow-hidden">
                <div className="px-6 py-4 border-b border-[#F7C7D3]/40 bg-[#FFF5F6]">
                  <h2 className="text-lg font-semibold text-[#2D1B2E]">Edit Profile</h2>
                  <p className="text-sm text-[#EE4275]/60 mt-0.5">Update your personal information</p>
                </div>

                <form onSubmit={handleProfileUpdate} className="p-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
                        Full Name <span className="text-[#EE4275]">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={editFormData.contactPerson}
                        onChange={handleEditChange}
                        required
                        className="w-full px-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
                        <input
                          type="email"
                          value={userData.email}
                          disabled
                          className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg bg-[#FFF5F6] text-[#EE4275]/60 cursor-not-allowed"
                        />
                      </div>
                      <p className="text-xs text-[#EE4275]/40 mt-1">Email cannot be changed</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
                          Phone Number <span className="text-[#EE4275]">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
                          <input
                            type="tel"
                            name="phone"
                            value={editFormData.phone}
                            onChange={handleEditChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
                            placeholder="+880 1234 567890"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
                          WhatsApp Number
                        </label>
                        <div className="relative">
                          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
                          <input
                            type="tel"
                            name="whatsapp"
                            value={editFormData.whatsapp}
                            onChange={handleEditChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
                            placeholder="+880 1234 567890"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveTab('view')}
                        className="flex-1 px-6 py-2.5 border border-[#F7C7D3]/50 rounded-lg hover:bg-[#FFF5F6] transition-all font-medium text-[#2D1B2E]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 px-6 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
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
              <div className="bg-white rounded-xl shadow-lg border border-[#F7C7D3]/40 overflow-hidden">
                <div className="px-6 py-4 border-b border-[#F7C7D3]/40 bg-[#FFF5F6]">
                  <h2 className="text-lg font-semibold text-[#2D1B2E]">Security Settings</h2>
                  <p className="text-sm text-[#EE4275]/60 mt-0.5">Change your password to keep your account secure</p>
                </div>

                <form onSubmit={handlePasswordChange} className="p-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
                        Current Password <span className="text-[#EE4275]">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordInputChange}
                          required
                          className="w-full pl-10 pr-10 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
                          placeholder="Enter your current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EE4275]/40 hover:text-[#EE4275]"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
                        New Password <span className="text-[#EE4275]">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordInputChange}
                          required
                          className="w-full pl-10 pr-10 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
                          placeholder="Enter new password (min. 8 characters)"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EE4275]/40 hover:text-[#EE4275]"
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
                                    ? level <= 2 ? 'bg-[#EE4275]' : level <= 4 ? 'bg-[#EE4275]' : 'bg-green-500'
                                    : 'bg-[#F7C7D3]'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-[#EE4275]/60">
                            {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 4 ? 'Medium' : 'Strong'} password
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
                        Confirm New Password <span className="text-[#EE4275]">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordInputChange}
                          required
                          className="w-full pl-10 pr-10 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
                          placeholder="Confirm your new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EE4275]/40 hover:text-[#EE4275]"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {passwordData.confirmPassword && (
                        <p className={`text-xs mt-1 flex items-center gap-1 ${
                          passwordData.newPassword === passwordData.confirmPassword
                            ? 'text-green-600'
                            : 'text-[#EE4275]'
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
                        className="flex-1 px-6 py-2.5 border border-[#F7C7D3]/50 rounded-lg hover:bg-[#FFF5F6] transition-all font-medium text-[#2D1B2E]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={changingPassword}
                        className="flex-1 px-6 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
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
    </ProtectedRoute>
  );
}