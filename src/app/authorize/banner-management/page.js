
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import NextLink from 'next/link';
// import Link from 'next/link';
// import {
//   Plus,
//   Pencil,
//   Trash2,
//   Eye,
//   EyeOff,
//   ArrowLeft,
//   CheckCircle,
//   XCircle,
//   Loader2,
//   RefreshCw,
//   Search,
//   Filter,
//   ChevronDown,
//   ChevronUp,
//   Calendar,
//   Image as ImageIcon,
//   Package,
//   Star,
//   Clock,
//   TrendingUp,
//   Truck,
//   Shield,
//   Headphones,
//   GripVertical,
//   ArrowUp,
//   ArrowDown,
//   Check,
//   X,
//   AlertTriangle,
//   Flower2,
//   Sparkles,
//   Zap
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';
// import {
//   getBanners,
//   deleteBanner,
//   toggleBannerStatus,
//   toggleBannerPublish,
//   reorderBanners,
//   getBannerStats
// } from '@/app/services/bannerService';

// // Helper to get user role
// const getUserRole = () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return payload.role || '';
//     }
//   } catch (error) {
//     console.error('Error getting user role:', error);
//   }
//   return '';
// };

// // Icon mapping for features - HyperVolt Theme
// const ICON_MAP = {
//   Truck: <Truck className="w-3.5 h-3.5" />,
//   Shield: <Shield className="w-3.5 h-3.5" />,
//   Clock: <Clock className="w-3.5 h-3.5" />,
//   Star: <Star className="w-3.5 h-3.5" />,
//   TrendingUp: <TrendingUp className="w-3.5 h-3.5" />,
//   Headphones: <Headphones className="w-3.5 h-3.5" />
// };

// // Banner Selection Modal - HyperVolt Theme
// const BannerSelectionModal = ({ isOpen, onClose, banners, selectedBanners, onSave }) => {
//   const [selectedIds, setSelectedIds] = useState(selectedBanners.map(b => b.id || b._id));

//   useEffect(() => {
//     setSelectedIds(selectedBanners.map(b => b.id || b._id));
//   }, [selectedBanners]);

//   const handleToggle = (bannerId) => {
//     setSelectedIds(prev =>
//       prev.includes(bannerId)
//         ? prev.filter(id => id !== bannerId)
//         : [...prev, bannerId]
//     );
//   };

//   const handleSave = () => {
//     const selected = banners.filter(b => selectedIds.includes(b._id || b.id));
//     if (selected.length > 4) {
//       toast.error('Maximum 4 banners can be shown on the hero section');
//       return;
//     }
//     onSave(selected);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col border border-[#06B6D4]/20">
//         <div className="p-5 border-b border-[#06B6D4]/20 bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5 flex items-center justify-between">
//           <div>
//             <h3 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//               <Star className="w-5 h-5 text-[#06B6D4]" />
//               Select Hero Banners
//             </h3>
//             <p className="text-sm text-gray-500 mt-1">Select up to 4 banners to display on the hero section</p>
//           </div>
//           <button onClick={onClose} className="p-1 hover:bg-[#06B6D4]/10 rounded-lg transition-colors">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-5 space-y-3">
//           <div className="text-xs text-gray-500 mb-2">
//             Selected: <span className="font-semibold text-[#06B6D4]">{selectedIds.length}</span> / 4
//           </div>
//           {banners.filter(b => b.isActive !== false).map((banner) => {
//             const bannerId = banner._id || banner.id;
//             const isSelected = selectedIds.includes(bannerId);
//             const bgImageUrl = typeof banner.bgImage === 'string' 
//               ? banner.bgImage 
//               : banner.bgImage?.url || '';

//             return (
//               <div
//                 key={bannerId}
//                 onClick={() => handleToggle(bannerId)}
//                 className={`p-4 border rounded-lg cursor-pointer transition-all ${
//                   isSelected
//                     ? 'border-[#06B6D4] bg-[#06B6D4]/5 ring-2 ring-[#06B6D4]/30'
//                     : 'border-[#06B6D4]/20 hover:border-[#06B6D4] hover:bg-[#06B6D4]/5'
//                 }`}
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="flex-shrink-0">
//                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
//                       isSelected
//                         ? 'border-[#06B6D4] bg-[#06B6D4]'
//                         : 'border-gray-300'
//                     }`}>
//                       {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
//                     </div>
//                   </div>
//                   <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-[#06B6D4]/10">
//                     {bgImageUrl ? (
//                       <img
//                         src={bgImageUrl}
//                         alt={banner.title}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center">
//                         <ImageIcon className="w-6 h-6 text-gray-400" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-medium text-gray-900 truncate">
//                       {banner.title}
//                     </h4>
//                     <p className="text-sm text-gray-500 truncate">
//                       {banner.description}
//                     </p>
//                     <div className="flex items-center gap-3 mt-1">
//                       <span className={`text-xs px-2 py-0.5 rounded-full ${
//                         banner.isPublished
//                           ? 'bg-green-100 text-green-700 border border-green-200'
//                           : 'bg-gray-100 text-gray-500 border border-gray-200'
//                       }`}>
//                         {banner.isPublished ? 'Published' : 'Draft'}
//                       </span>
//                       {banner.isActive && (
//                         <span className="text-xs text-green-600">Active</span>
//                       )}
//                     </div>
//                   </div>
//                   {isSelected && (
//                     <span className="text-xs text-[#06B6D4] font-medium">Selected</span>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//           {banners.filter(b => b.isActive !== false).length === 0 && (
//             <div className="text-center py-8 text-gray-500">
//               <Package className="w-12 h-12 mx-auto mb-3 text-[#06B6D4]/30" />
//               <p>No active banners available</p>
//               <p className="text-sm">Create a banner first to add it to the hero section</p>
//             </div>
//           )}
//         </div>

//         <div className="p-5 border-t border-[#06B6D4]/20 bg-[#06B6D4]/5 flex gap-3 justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={selectedIds.length === 0}
//             className="px-4 py-2 text-sm font-medium text-white bg-[#06B6D4] rounded-lg hover:bg-[#0891B2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
//           >
//             <Check className="w-4 h-4" />
//             Save Selection ({selectedIds.length}/4)
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Delete Confirmation Modal - HyperVolt Theme
// const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, bannerTitle }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-red-100">
//         <div className="p-6">
//           <div className="flex items-center gap-3 text-red-600 mb-4">
//             <AlertTriangle className="w-6 h-6" />
//             <h3 className="text-lg font-semibold">Delete Banner</h3>
//           </div>
//           <p className="text-sm text-gray-600 mb-4">
//             Are you sure you want to delete <strong className="text-[#06B6D4]">"{bannerTitle}"</strong>? This action cannot be undone.
//           </p>
//           <div className="flex gap-3 justify-end">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onConfirm}
//               className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg hover:shadow-red-200/50"
//             >
//               <Trash2 className="w-4 h-4" />
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Banner Management Component - HyperVolt Theme
// export default function BannerManagementPage() {
//   const router = useRouter();
//   const [banners, setBanners] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [selectedBanners, setSelectedBanners] = useState([]);
//   const [showSelectionModal, setShowSelectionModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [sortField, setSortField] = useState('createdAt');
//   const [sortDirection, setSortDirection] = useState('desc');

//     const [userRole, setUserRole] = useState('');
  
//   // ✅ Permission check
//   const canDelete = userRole === 'super_admin' || userRole === 'admin';

//   // ✅ Get user role on mount
//   useEffect(() => {
//     const role = getUserRole();
//     setUserRole(role);
//   }, []);

//   // ✅ REMOVED admin access restriction - all roles can access
//   // All admin roles (super_admin, admin, moderator, call_center_agent) can access this page

//   // Load banners on mount
//   useEffect(() => {
//     loadBanners();
//     loadStats();
//   }, []);

//   const loadBanners = async () => {
//     setIsLoading(true);
//     try {
//       const response = await getBanners({ sort: '-createdAt' });
//       if (response.success) {
//         setBanners(response.data);
//         const savedSelection = localStorage.getItem('hero_banner_selection');
//         if (savedSelection) {
//           const parsed = JSON.parse(savedSelection);
//           const validSelected = response.data.filter(b => 
//             parsed.some(p => (p._id || p.id) === (b._id || b.id))
//           );
//           setSelectedBanners(validSelected.length > 0 ? validSelected : response.data.slice(0, 4));
//         } else {
//           setSelectedBanners(response.data.filter(b => b.isActive && b.isPublished).slice(0, 4));
//         }
//       }
//     } catch (error) {
//       console.error('Error loading banners:', error);
//       toast.error('Failed to load banners');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const loadStats = async () => {
//     try {
//       const response = await getBannerStats();
//       if (response.success) {
//         setStats(response.data);
//       }
//     } catch (error) {
//       console.error('Error loading stats:', error);
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteTarget) return;
//     try {
//       await deleteBanner(deleteTarget._id || deleteTarget.id);
//       toast.success('Banner deleted successfully');
//       setShowDeleteModal(false);
//       setDeleteTarget(null);
//       loadBanners();
//       loadStats();
//     } catch (error) {
//       toast.error(error.message || 'Failed to delete banner');
//     }
//   };

//   const handleToggleStatus = async (banner) => {
//     try {
//       const response = await toggleBannerStatus(banner._id || banner.id);
//       if (response.success) {
//         toast.success(`Banner ${response.data.isActive ? 'activated' : 'deactivated'} successfully`);
//         loadBanners();
//         loadStats();
//       }
//     } catch (error) {
//       toast.error(error.message || 'Failed to toggle status');
//     }
//   };

//   const handleTogglePublish = async (banner) => {
//     try {
//       const response = await toggleBannerPublish(banner._id || banner.id);
//       if (response.success) {
//         toast.success(`Banner ${response.data.isPublished ? 'published' : 'unpublished'} successfully`);
//         loadBanners();
//         loadStats();
//       }
//     } catch (error) {
//       toast.error(error.message || 'Failed to toggle publish status');
//     }
//   };

//   const handleSaveHeroSelection = (selected) => {
//     setSelectedBanners(selected);
//     localStorage.setItem('hero_banner_selection', JSON.stringify(selected));
//     toast.success(`${selected.length} banner(s) selected for hero section`);
//   };

//   // Filter banners
//   const filteredBanners = banners.filter(banner => {
//     const matchesSearch = banner.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          banner.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = filterStatus === 'all' ||
//                          (filterStatus === 'active' && banner.isActive) ||
//                          (filterStatus === 'inactive' && !banner.isActive) ||
//                          (filterStatus === 'published' && banner.isPublished) ||
//                          (filterStatus === 'draft' && !banner.isPublished);
    
//     return matchesSearch && matchesStatus;
//   });

//   // Sort banners
//   const sortedBanners = [...filteredBanners].sort((a, b) => {
//     let aVal = a[sortField] || '';
//     let bVal = b[sortField] || '';
    
//     if (sortField === 'createdAt' || sortField === 'updatedAt') {
//       aVal = new Date(aVal);
//       bVal = new Date(bVal);
//     }
    
//     if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
//     if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
//     return 0;
//   });

//   const getStatusBadge = (banner) => {
//     const isSelected = selectedBanners.some(b => (b._id || b.id) === (banner._id || banner.id));
//     return (
//       <div className="flex items-center gap-2">
//         {banner.isActive ? (
//           <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
//             <CheckCircle className="w-3 h-3" />
//             Active
//           </span>
//         ) : (
//           <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
//             <XCircle className="w-3 h-3" />
//             Inactive
//           </span>
//         )}
//         {banner.isPublished ? (
//           <span className="inline-flex items-center gap-1 text-xs text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded-full border border-[#06B6D4]/20">
//             <Eye className="w-3 h-3" />
//             Published
//           </span>
//         ) : (
//           <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
//             <EyeOff className="w-3 h-3" />
//             Draft
//           </span>
//         )}
//         {isSelected && (
//           <span className="inline-flex items-center gap-1 text-xs text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full border border-yellow-200">
//             <Star className="w-3 h-3" />
//             Hero
//           </span>
//         )}
//       </div>
//     );
//   };

//   const getBgImageUrl = (banner) => {
//     if (typeof banner.bgImage === 'string') return banner.bgImage;
//     return banner.bgImage?.url || '';
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-[#06B6D4] animate-spin mx-auto mb-4" />
//           <p className="text-gray-500">Loading banners...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//      <ProtectedRoute pageKey="manage_banner">
//     <div className="min-h-screen bg-[#f0f7fa]">
//       {/* Selection Modal */}
//       <BannerSelectionModal
//         isOpen={showSelectionModal}
//         onClose={() => setShowSelectionModal(false)}
//         banners={banners}
//         selectedBanners={selectedBanners}
//         onSave={handleSaveHeroSelection}
//       />

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmModal
//         isOpen={showDeleteModal}
//         onClose={() => {
//           setShowDeleteModal(false);
//           setDeleteTarget(null);
//         }}
//         onConfirm={handleDelete}
//         bannerTitle={deleteTarget?.title || ''}
//       />

//       {/* Header - HyperVolt Theme */}
//       <div className="bg-[#004767] border-b border-[#06B6D4]/20 shadow-lg sticky top-0 z-10">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <NextLink href="/authorize/dashboard" className="p-2 hover:bg-[#06B6D4]/20 rounded-lg transition-colors">
//                 <ArrowLeft className="w-5 h-5 text-white/80 hover:text-white" />
//               </NextLink>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <Zap className="w-6 h-6 text-[#06B6D4]" />
//                   <h1 className="text-xl font-bold text-white">Banner Management</h1>
//                 </div>
//                 <p className="text-sm text-white/70 mt-1">Manage your homepage banners</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setShowSelectionModal(true)}
//                 className="px-4 py-2 text-sm bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-colors flex items-center gap-2 border border-yellow-500/20"
//               >
//                 <Star className="w-4 h-4" />
//                 Select Hero Banners ({selectedBanners.length}/4)
//               </button>
//               <NextLink
//                 href="/authorize/create-banner"
//                 className="px-4 py-2 text-sm bg-[#06B6D4] text-[#004767] rounded-lg hover:bg-[#0891B2] transition-colors flex items-center gap-2 font-semibold shadow-md hover:shadow-lg"
//               >
//                 <Plus className="w-4 h-4" />
//                 Create Banner
//               </NextLink>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards - HyperVolt Theme */}
//       {stats && (
//         <div className="px-6 pt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
//           <div className="bg-white rounded-lg shadow-sm border border-[#06B6D4]/20 p-4">
//             <p className="text-xs text-gray-500">Total</p>
//             <p className="text-xl font-bold text-[#004767]">{stats.total}</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm border border-[#06B6D4]/20 p-4">
//             <p className="text-xs text-gray-500">Active</p>
//             <p className="text-xl font-bold text-green-600">{stats.active}</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm border border-[#06B6D4]/20 p-4">
//             <p className="text-xs text-gray-500">Published</p>
//             <p className="text-xl font-bold text-[#06B6D4]">{stats.published}</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm border border-[#06B6D4]/20 p-4">
//             <p className="text-xs text-gray-500">Hero Banners</p>
//             <p className="text-xl font-bold text-yellow-600">{selectedBanners.length}/4</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm border border-[#06B6D4]/20 p-4">
//             <p className="text-xs text-gray-500">Total Views</p>
//             <p className="text-xl font-bold text-[#004767]">{stats.views || 0}</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm border border-[#06B6D4]/20 p-4">
//             <p className="text-xs text-gray-500">Total Clicks</p>
//             <p className="text-xl font-bold text-[#004767]">{stats.clicks || 0}</p>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="p-6">
//         {/* Filters - HyperVolt Theme */}
//         <div className="bg-white rounded-lg shadow-sm border border-[#06B6D4]/20 p-4 mb-6">
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex-1 min-w-[200px]">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#06B6D4]/60" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search banners..."
//                   className="w-full pl-10 pr-4 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40"
//                 />
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="published">Published</option>
//                 <option value="draft">Draft</option>
//               </select>
//             </div>
//             <button
//               onClick={() => { loadBanners(); loadStats(); }}
//               className="px-3 py-2 text-sm text-gray-600 hover:text-[#06B6D4] hover:bg-[#06B6D4]/10 rounded-lg transition-colors flex items-center gap-1"
//             >
//               <RefreshCw className="w-4 h-4" />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Banners Table - HyperVolt Theme */}
//         <div className="bg-white rounded-lg shadow-sm border border-[#06B6D4]/20 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5 border-b border-[#06B6D4]/20">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-[#004767] uppercase tracking-wider">
//                     Banner
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-[#004767] uppercase tracking-wider">
//                     Details
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-[#004767] uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-[#004767] uppercase tracking-wider">
//                     Features
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-[#004767] uppercase tracking-wider">
//                     Featured Products
//                   </th>
//                   <th className="px-4 py-3 text-right text-xs font-medium text-[#004767] uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[#06B6D4]/10">
//                 {sortedBanners.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="px-4 py-12 text-center text-gray-500">
//                       <Package className="w-12 h-12 mx-auto mb-3 text-[#06B6D4]/30" />
//                       <p>No banners found</p>
//                       <p className="text-sm">Create your first banner to get started</p>
//                     </td>
//                   </tr>
//                 ) : (
//                   sortedBanners.map((banner) => {
//                     const bgImageUrl = getBgImageUrl(banner);
//                     const isSelected = selectedBanners.some(b => (b._id || b.id) === (banner._id || banner.id));
//                     const featureIcons = banner.features?.map(f => ICON_MAP[f.icon]).filter(Boolean) || [];
//                     const featuredProducts = banner.featuredProducts || [];
                    
//                     return (
//                       <tr key={banner._id || banner.id} className="hover:bg-[#06B6D4]/5 transition-colors">
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-3">
//                             <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-[#06B6D4]/10">
//                               {bgImageUrl ? (
//                                 <img
//                                   src={bgImageUrl}
//                                   alt={banner.title}
//                                   className="w-full h-full object-cover"
//                                 />
//                               ) : (
//                                 <div className="w-full h-full flex items-center justify-center">
//                                   <ImageIcon className="w-6 h-6 text-gray-400" />
//                                 </div>
//                               )}
//                             </div>
//                             <div>
//                               <div className="flex items-center gap-2">
//                                 <h4 className="font-medium text-gray-900 truncate">
//                                   {banner.title}
//                                 </h4>
//                                 {isSelected && (
//                                   <span className="inline-flex items-center gap-0.5 text-xs text-yellow-600 bg-yellow-100 px-1.5 py-0.5 rounded border border-yellow-200">
//                                     <Star className="w-3 h-3" />
//                                   </span>
//                                 )}
//                               </div>
//                               <p className="text-sm text-gray-500 line-clamp-1">
//                                 {banner.description}
//                               </p>
//                               <div className="flex items-center gap-2 text-xs">
//                                 <span className="text-gray-500">Badge:</span>
//                                 <span className="text-gray-700">{banner.badge}</span>
//                                 <span className="text-gray-300">|</span>
//                                 <span className="text-gray-500">Discount:</span>
//                                 <span className="text-[#06B6D4] font-medium">{banner.discount}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="space-y-1.5">
//                             {getStatusBadge(banner)}
//                             <div className="flex items-center gap-2 text-xs text-gray-500">
//                               <Calendar className="w-3 h-3 text-[#06B6D4]/60" />
//                               <span>Created: {new Date(banner.createdAt).toLocaleDateString()}</span>
//                             </div>
//                             {banner.productImage && (
//                               <div className="flex items-center gap-1 text-xs text-gray-500">
//                                 <ImageIcon className="w-3 h-3 text-[#06B6D4]/60" />
//                                 <span>Has product image</span>
//                               </div>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex flex-wrap gap-1">
//                             {featureIcons.slice(0, 3).map((icon, idx) => (
//                               <span key={idx} className="text-[#06B6D4]">
//                                 {icon}
//                               </span>
//                             ))}
//                             {banner.features?.length > 3 && (
//                               <span className="text-xs text-gray-400">+{banner.features.length - 3}</span>
//                             )}
//                           </div>
//                           <div className="mt-1 flex flex-wrap gap-1">
//                             {banner.buttons?.map((btn, idx) => (
//                               <span
//                                 key={idx}
//                                 className={`text-xs px-1.5 py-0.5 rounded ${
//                                   btn.isPrimary
//                                     ? 'bg-[#06B6D4] text-[#004767]'
//                                     : 'bg-gray-100 text-gray-700'
//                                 }`}
//                               >
//                                 {btn.text}
//                               </span>
//                             ))}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           {featuredProducts.length > 0 ? (
//                             <div className="flex flex-wrap gap-1">
//                               {featuredProducts.slice(0, 3).map((item, idx) => (
//                                 <div key={idx} className="w-8 h-8 rounded-full overflow-hidden border border-[#06B6D4]/20">
//                                   <img
//                                     src={item.productId?.images?.[0]?.url || '/images/placeholder.jpg'}
//                                     alt={item.productId?.productName || 'Product'}
//                                     className="w-full h-full object-cover"
//                                   />
//                                 </div>
//                               ))}
//                               {featuredProducts.length > 3 && (
//                                 <span className="text-xs text-gray-400 flex items-center">+{featuredProducts.length - 3}</span>
//                               )}
//                             </div>
//                           ) : (
//                             <span className="text-xs text-gray-400">No featured products</span>
//                           )}
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="space-y-1 text-sm">
//                             <div className="flex items-center gap-2">
//                               <Eye className="w-3.5 h-3.5 text-[#06B6D4]/60" />
//                               <span>{banner.views || 0} views</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <TrendingUp className="w-3.5 h-3.5 text-[#06B6D4]/60" />
//                               <span>{banner.clicks || 0} clicks</span>
//                             </div>
//                             <div className="flex items-center gap-2 text-xs text-gray-400">
//                               <span>Order: {banner.order || 0}</span>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center justify-end gap-2">
//                             <button
//                               onClick={() => handleTogglePublish(banner)}
//                               className={`p-1.5 rounded-lg transition-colors ${
//                                 banner.isPublished
//                                   ? 'text-[#06B6D4] hover:bg-[#06B6D4]/10'
//                                   : 'text-gray-400 hover:bg-gray-100'
//                               }`}
//                               title={banner.isPublished ? 'Unpublish' : 'Publish'}
//                             >
//                               {banner.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
//                             </button>
//                             <button
//                               onClick={() => handleToggleStatus(banner)}
//                               className={`p-1.5 rounded-lg transition-colors ${
//                                 banner.isActive
//                                   ? 'text-green-600 hover:bg-green-100'
//                                   : 'text-gray-400 hover:bg-gray-100'
//                               }`}
//                               title={banner.isActive ? 'Deactivate' : 'Activate'}
//                             >
//                               {banner.isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
//                             </button>
//                             <button
//                               onClick={() => router.push(`/authorize/edit-banner?id=${banner._id || banner.id}`)}
//                               className="p-1.5 text-[#06B6D4] hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//                               title="Edit"
//                             >
//                               <Pencil className="w-4 h-4" />
//                             </button>
//                            <button
//   onClick={() => {
//     setDeleteTarget(banner);
//     setShowDeleteModal(true);
//   }}
//   disabled={!canDelete}
//   className={`p-1.5 rounded-lg transition-colors ${
//     canDelete
//       ? 'text-red-600 hover:bg-red-100'
//       : 'text-gray-300 cursor-not-allowed'
//   }`}
//   title={canDelete ? 'Delete' : 'You don\'t have permission to delete'}
// >
//   <Trash2 className="w-4 h-4" />
// </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Footer - HyperVolt Theme */}
//         <div className="mt-6 flex items-center justify-between text-sm">
//           <p className="text-gray-500">Showing {sortedBanners.length} of {banners.length} banners</p>
//           <div className="flex items-center gap-4">
//             <span className="text-gray-500">Hero Banners: <span className="font-semibold text-yellow-600">{selectedBanners.length}/4</span></span>
//             <button
//               onClick={() => setShowSelectionModal(true)}
//               className="text-[#06B6D4] hover:text-[#0891B2] font-medium"
//             >
//               Manage Selection
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//      </ProtectedRoute>
//   );
// }


// app/authorize/banner-management/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
ArrowLeft,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Calendar,
  Image as ImageIcon,
  Package,
  Star,
  Clock,
  TrendingUp,
  Truck,
  Shield,
  Headphones,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import {
  getBanners,
  deleteBanner,
  toggleBannerStatus,
  toggleBannerPublish,
  reorderBanners,
  getBannerStats
} from '@/app/services/bannerService';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// Icon mapping for features
const ICON_MAP = {
  Truck: <Truck className="w-3.5 h-3.5" />,
  Shield: <Shield className="w-3.5 h-3.5" />,
  Clock: <Clock className="w-3.5 h-3.5" />,
  Star: <Star className="w-3.5 h-3.5" />,
  TrendingUp: <TrendingUp className="w-3.5 h-3.5" />,
  Headphones: <Headphones className="w-3.5 h-3.5" />
};

// Banner Selection Modal
const BannerSelectionModal = ({ isOpen, onClose, banners, selectedBanners, onSave }) => {
  const [selectedIds, setSelectedIds] = useState(selectedBanners.map(b => b.id || b._id));

  useEffect(() => {
    setSelectedIds(selectedBanners.map(b => b.id || b._id));
  }, [selectedBanners]);

  const handleToggle = (bannerId) => {
    setSelectedIds(prev =>
      prev.includes(bannerId)
        ? prev.filter(id => id !== bannerId)
        : [...prev, bannerId]
    );
  };

  const handleSave = () => {
    const selected = banners.filter(b => selectedIds.includes(b._id || b.id));
    if (selected.length > 4) {
      toast.error('Maximum 4 banners can be shown on the hero section');
      return;
    }
    onSave(selected);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Select Hero Banners
            </h3>
            <p className="text-sm text-gray-500 mt-1">Select up to 4 banners to display on the hero section</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          <div className="text-xs text-gray-500 mb-2">
            Selected: <span className="font-semibold text-blue-600">{selectedIds.length}</span> / 4
          </div>
          {banners.filter(b => b.isActive !== false).map((banner) => {
            const bannerId = banner._id || banner.id;
            const isSelected = selectedIds.includes(bannerId);
            const bgImageUrl = typeof banner.bgImage === 'string' 
              ? banner.bgImage 
              : banner.bgImage?.url || '';

            return (
              <div
                key={bannerId}
                onClick={() => handleToggle(bannerId)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    {bgImageUrl ? (
                      <img
                        src={bgImageUrl}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{banner.title}</h4>
                    <p className="text-sm text-gray-500 truncate">{banner.subtitle}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        banner.isPublished
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {banner.isPublished ? 'Published' : 'Draft'}
                      </span>
                      {banner.isActive && (
                        <span className="text-xs text-green-600">Active</span>
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-xs text-blue-600 font-medium">Selected</span>
                  )}
                </div>
              </div>
            );
          })}
          {banners.filter(b => b.isActive !== false).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No active banners available</p>
              <p className="text-sm">Create a banner first to add it to the hero section</p>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-gray-200 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={selectedIds.length === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Save Selection ({selectedIds.length}/4)
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, bannerTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Delete Banner</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete <strong>"{bannerTitle}"</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Banner Management Component
export default function BannerManagementPage() {
  const router = useRouter();
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBanners, setSelectedBanners] = useState([]);
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [stats, setStats] = useState(null);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  // Load banners on mount
  useEffect(() => {
    loadBanners();
    loadStats();
  }, []);

  const loadBanners = async () => {
    setIsLoading(true);
    try {
      const response = await getBanners({ sort: '-createdAt' });
      if (response.success) {
        setBanners(response.data);
        // Load selected banners from localStorage or default to first 4 active banners
        const savedSelection = localStorage.getItem('hero_banner_selection');
        if (savedSelection) {
          const parsed = JSON.parse(savedSelection);
          const validSelected = response.data.filter(b => 
            parsed.some(p => (p._id || p.id) === (b._id || b.id))
          );
          setSelectedBanners(validSelected.length > 0 ? validSelected : response.data.slice(0, 4));
        } else {
          setSelectedBanners(response.data.filter(b => b.isActive && b.isPublished).slice(0, 4));
        }
      }
    } catch (error) {
      console.error('Error loading banners:', error);
      toast.error('Failed to load banners');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await getBannerStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteBanner(deleteTarget._id || deleteTarget.id);
      toast.success('Banner deleted successfully');
      setShowDeleteModal(false);
      setDeleteTarget(null);
      loadBanners();
      loadStats();
    } catch (error) {
      toast.error(error.message || 'Failed to delete banner');
    }
  };

  const handleToggleStatus = async (banner) => {
    try {
      const response = await toggleBannerStatus(banner._id || banner.id);
      if (response.success) {
        toast.success(`Banner ${response.data.isActive ? 'activated' : 'deactivated'} successfully`);
        loadBanners();
        loadStats();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to toggle status');
    }
  };

  const handleTogglePublish = async (banner) => {
    try {
      const response = await toggleBannerPublish(banner._id || banner.id);
      if (response.success) {
        toast.success(`Banner ${response.data.isPublished ? 'published' : 'unpublished'} successfully`);
        loadBanners();
        loadStats();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to toggle publish status');
    }
  };

  const handleSaveHeroSelection = (selected) => {
    setSelectedBanners(selected);
    localStorage.setItem('hero_banner_selection', JSON.stringify(selected));
    toast.success(`${selected.length} banner(s) selected for hero section`);
  };

  // Filter banners
  const filteredBanners = banners.filter(banner => {
    const matchesSearch = banner.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         banner.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         banner.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'active' && banner.isActive) ||
                         (filterStatus === 'inactive' && !banner.isActive) ||
                         (filterStatus === 'published' && banner.isPublished) ||
                         (filterStatus === 'draft' && !banner.isPublished);
    
    return matchesSearch && matchesStatus;
  });

  // Sort banners
  const sortedBanners = [...filteredBanners].sort((a, b) => {
    let aVal = a[sortField] || '';
    let bVal = b[sortField] || '';
    
    if (sortField === 'createdAt' || sortField === 'updatedAt') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getStatusBadge = (banner) => {
    const isSelected = selectedBanners.some(b => (b._id || b.id) === (banner._id || banner.id));
    return (
      <div className="flex items-center gap-2">
        {banner.isActive ? (
          <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            <XCircle className="w-3 h-3" />
            Inactive
          </span>
        )}
        {banner.isPublished ? (
          <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
            <Eye className="w-3 h-3" />
            Published
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            <EyeOff className="w-3 h-3" />
            Draft
          </span>
        )}
        {isSelected && (
          <span className="inline-flex items-center gap-1 text-xs text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
            <Star className="w-3 h-3" />
            Hero
          </span>
        )}
      </div>
    );
  };

  const getBgImageUrl = (banner) => {
    if (typeof banner.bgImage === 'string') return banner.bgImage;
    return banner.bgImage?.url || '';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading banners...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="manage_banner">
    <div className="min-h-screen bg-gray-50">
      {/* Selection Modal */}
      <BannerSelectionModal
        isOpen={showSelectionModal}
        onClose={() => setShowSelectionModal(false)}
        banners={banners}
        selectedBanners={selectedBanners}
        onSave={handleSaveHeroSelection}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleDelete}
        bannerTitle={deleteTarget?.title || ''}
      />

      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/authorize/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </a>
              <div>
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-blue-600" />
                  <h1 className="text-xl font-bold text-gray-900">Banner Management</h1>
                </div>
                <p className="text-sm text-gray-500 mt-1">Manage your homepage banners</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
            
             <a
  href="/authorize/create-banner"
  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
>
  <Plus className="w-4 h-4" />
  Create Banner
</a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="px-6 pt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Active</p>
            <p className="text-xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Published</p>
            <p className="text-xl font-bold text-blue-600">{stats.published}</p>
          </div>
        
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Total Views</p>
            <p className="text-xl font-bold text-gray-900">{stats.views || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Total Clicks</p>
            <p className="text-xl font-bold text-gray-900">{stats.clicks || 0}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search banners..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <button
              onClick={() => { loadBanners(); loadStats(); }}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Banners Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Banner
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedBanners.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-12 text-center text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No banners found</p>
                      <p className="text-sm">Create your first banner to get started</p>
                    </td>
                  </tr>
                ) : (
                  sortedBanners.map((banner) => {
                    const bgImageUrl = getBgImageUrl(banner);
                    const isSelected = selectedBanners.some(b => (b._id || b.id) === (banner._id || banner.id));
                    const featureIcons = banner.features?.map(f => ICON_MAP[f.icon]).filter(Boolean) || [];
                    
                    return (
                      <tr key={banner._id || banner.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                              {bgImageUrl ? (
                                <img
                                  src={bgImageUrl}
                                  alt={banner.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon className="w-6 h-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-gray-900">{banner.title}</h4>
                                {isSelected && (
                                  <span className="inline-flex items-center gap-0.5 text-xs text-yellow-600 bg-yellow-100 px-1.5 py-0.5 rounded">
                                    <Star className="w-3 h-3" />
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">{banner.subtitle}</p>
                              <p className="text-xs text-gray-400">{banner.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600 line-clamp-1">{banner.mainText}</p>
                            <p className="text-xs text-gray-500 line-clamp-2">{banner.description}</p>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-gray-500">Badge:</span>
                              <span className="text-gray-700">{banner.badge}</span>
                              <span className="text-gray-300">|</span>
                              <span className="text-gray-500">Discount:</span>
                              <span className="text-red-600 font-medium">{banner.discount}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-1.5">
                            {getStatusBadge(banner)}
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              <span>Created: {new Date(banner.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {featureIcons.slice(0, 3).map((icon, idx) => (
                              <span key={idx} className="text-blue-600">
                                {icon}
                              </span>
                            ))}
                            {banner.features?.length > 3 && (
                              <span className="text-xs text-gray-400">+{banner.features.length - 3}</span>
                            )}
                          </div>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {banner.buttons?.map((btn, idx) => (
                              <span
                                key={idx}
                                className={`text-xs px-1.5 py-0.5 rounded ${
                                  btn.isPrimary
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {btn.text}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <Eye className="w-3.5 h-3.5 text-gray-400" />
                              <span>{banner.views || 0} views</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                              <span>{banner.clicks || 0} clicks</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <span>Order: {banner.order || 0}</span>
                            </div>
                          </div>
                        </td>
                       <td className="px-4 py-3">
  <div className="flex items-center justify-end gap-2">
    <button
      onClick={() => handleTogglePublish(banner)}
      className={`p-1.5 rounded-lg transition-colors ${
        banner.isPublished
          ? 'text-blue-600 hover:bg-blue-100'
          : 'text-gray-400 hover:bg-gray-100'
      }`}
      title={banner.isPublished ? 'Unpublish' : 'Publish'}
    >
      {banner.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
    </button>
    <button
      onClick={() => handleToggleStatus(banner)}
      className={`p-1.5 rounded-lg transition-colors ${
        banner.isActive
          ? 'text-green-600 hover:bg-green-100'
          : 'text-gray-400 hover:bg-gray-100'
      }`}
      title={banner.isActive ? 'Deactivate' : 'Activate'}
    >
      {banner.isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
    </button>
    <button
      onClick={() => router.push(`/authorize/edit-banner?id=${banner._id || banner.id}`)}
      className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
      title="Edit"
    >
      <Pencil className="w-4 h-4" />
    </button>
    <button
      onClick={() => {
        setDeleteTarget(banner);
        setShowDeleteModal(true);
      }}
      className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
      title="Delete"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <p>Showing {sortedBanners.length} of {banners.length} banners</p>
          <div className="flex items-center gap-4">
            <span>Hero Banners: {selectedBanners.length}</span>
            <button
              onClick={() => setShowSelectionModal(true)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Manage Selection
            </button>
          </div>
        </div> */}
      </div>
    </div>
    </ProtectedRoute>
  );
}