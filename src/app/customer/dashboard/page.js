// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Package, 
//   ShoppingBag, 
//   CheckCircle, 
//   XCircle,
//   Clock,
//   Truck,
//   Eye,
//   Heart,
//   LogOut,
//   ChevronRight,
//   Star,
//   Calendar,
//   DollarSign,
//   RefreshCw,
//   Copy,
//   Home,
//   MessageSquare,
//   Sparkles,
//   Zap,
//   Users,
//   Tag,
//   Trash2,
//   Loader2,
//   Gift,
//   ShieldCheck,
//   Store,
//   TrendingUp,
//   Award,
//   Headphones
// } from 'lucide-react';
// import { toast } from 'sonner';

// // Helper functions
// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'BDT',
//     minimumFractionDigits: 0
//   }).format(amount);
// };

// const formatDate = (date) => {
//   return new Date(date).toLocaleDateString('en-US', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric'
//   });
// };

// const getStatusColor = (status) => {
//   const colors = {
//     placed: 'bg-[#06B6D4]/20 text-[#06B6D4]',
//     follow_up: 'bg-yellow-100 text-yellow-800',
//     accepted: 'bg-blue-100 text-blue-800',
//     processing: 'bg-indigo-100 text-indigo-800',
//     shipped: 'bg-purple-100 text-purple-800',
//     delivered: 'bg-green-100 text-green-800',
//     cancelled: 'bg-rose-100 text-rose-800'
//   };
//   return colors[status] || 'bg-gray-100 text-gray-800';
// };

// const getStatusLabel = (status) => {
//   const labels = {
//     placed: 'Placed',
//     follow_up: 'Follow Up',
//     accepted: 'Accepted',
//     processing: 'Processing',
//     shipped: 'Shipped',
//     delivered: 'Delivered',
//     cancelled: 'Cancelled'
//   };
//   return labels[status] || status;
// };

// const getReviewStatusBadge = (status) => {
//   if (status === 'approved') {
//     return <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Approved</span>;
//   } else if (status === 'pending') {
//     return <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">Pending</span>;
//   } else if (status === 'rejected') {
//     return <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Rejected</span>;
//   }
//   return null;
// };

// const truncateText = (text, limit = 25) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// // Order Card Component
// const OrderCard = ({ order, copyOrderId }) => (
//   <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-[#06B6D4]/20 hover:shadow-md hover:border-[#06B6D4]/40 transition-all duration-300">
//     <div className="bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5 px-4 py-3 border-b border-[#06B6D4]/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//       <div className="flex items-center gap-4 flex-wrap">
//         <div>
//           <p className="text-xs text-gray-500">Order ID</p>
//           <div className="flex items-center gap-2">
//             <p className="text-sm font-medium text-[#004767]">{order.orderNumber}</p>
//             <button onClick={() => copyOrderId(order.orderNumber)} className="text-[#06B6D4] hover:text-[#0891B2] transition-colors">
//               <Copy className="h-3 w-3" />
//             </button>
//           </div>
//         </div>
//         <div>
//           <p className="text-xs text-gray-500">Order Date</p>
//           <p className="text-sm text-gray-900">{formatDate(order.createdAt)}</p>
//         </div>
//         <div>
//           <p className="text-xs text-gray-500">Total Amount</p>
//           <p className="text-sm font-semibold text-[#06B6D4]">{formatCurrency(order.total)}</p>
//         </div>
//       </div>
//       <div className="flex items-center gap-2">
//         <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(order.orderStatus)}`}>
//           {getStatusLabel(order.orderStatus)}
//         </span>
//       </div>
//     </div>
    
//     <div className="divide-y divide-[#06B6D4]/10">
//       {order.items?.slice(0, 3).map((item, idx) => (
//         <div key={idx} className="px-4 py-3 flex items-center gap-3 hover:bg-[#06B6D4]/5 transition-colors">
//           {item.image ? (
//             <img src={item.image} alt={item.productName} className="w-12 h-12 rounded-lg object-cover border border-[#06B6D4]/20" />
//           ) : (
//             <div className="w-12 h-12 bg-[#06B6D4]/10 rounded-lg flex items-center justify-center border border-[#06B6D4]/20">
//               <Package className="h-6 w-6 text-[#06B6D4]" />
//             </div>
//           )}
//           <div className="flex-1">
//             <p className="font-medium text-gray-800 text-sm">{item.productName}</p>
//             <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//           </div>
//           <div className="text-right">
//             <p className="font-semibold text-[#06B6D4] text-sm">{formatCurrency(item.discountPrice || item.regularPrice)}</p>
//           </div>
//         </div>
//       ))}
//       {order.items?.length > 3 && (
//         <div className="px-4 py-2 text-center text-xs text-[#06B6D4] bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5">
//           +{order.items.length - 3} more items
//         </div>
//       )}
//     </div>
//   </div>
// );

// // Review Card Component
// const ReviewCard = ({ review }) => (
//   <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-4 border border-[#06B6D4]/20 hover:shadow-md hover:border-[#06B6D4]/40 transition-all duration-300">
//     <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
//       <div>
//         <h3 className="font-semibold text-[#004767]">{review.productName}</h3>
//         <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
//       </div>
//       <div className="flex items-center gap-2">
//         <div className="flex gap-0.5">
//           {[...Array(5)].map((_, i) => (
//             <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'text-[#06B6D4] fill-[#06B6D4]' : 'text-gray-300'}`} />
//           ))}
//         </div>
//         {getReviewStatusBadge(review.status)}
//       </div>
//     </div>
//     {review.title && (
//       <p className="font-medium text-gray-700 text-sm mb-1">{review.title}</p>
//     )}
//     <p className="text-gray-600 text-sm line-clamp-2">{review.comment}</p>
//   </div>
// );

// export default function CustomerDashboard() {
//   const router = useRouter();
  
//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [filteredReviews, setFilteredReviews] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [removingItems, setRemovingItems] = useState({});
  
//   // Track if initial data load is complete
//   const [dataLoaded, setDataLoaded] = useState(false);
  
//   // Total stats (unfiltered - all time)
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     placedOrders: 0,
//     processingOrders: 0,
//     deliveredOrders: 0,
//     cancelledOrders: 0,
//     totalSpent: 0,
//     totalReviews: 0,
//     approvedReviews: 0,
//     pendingReviews: 0,
//     rejectedReviews: 0
//   });
  
//   // Filtered stats (filtered by month/year)
//   const [filteredStats, setFilteredStats] = useState({
//     totalOrders: 0,
//     placedOrders: 0,
//     processingOrders: 0,
//     deliveredOrders: 0,
//     cancelledOrders: 0,
//     totalSpent: 0,
//     totalReviews: 0,
//     approvedReviews: 0,
//     pendingReviews: 0,
//     rejectedReviews: 0
//   });
  
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('orders');
//   const [error, setError] = useState(null);
  
//   // Filter states
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [filterType, setFilterType] = useState('month');
//   const [availableYears, setAvailableYears] = useState([]);
  
//   // Ref to track if initial filter has been applied
//   const initialFilterApplied = useRef(false);

//   const months = [
//     { value: 1, name: 'January' }, { value: 2, name: 'February' },
//     { value: 3, name: 'March' }, { value: 4, name: 'April' },
//     { value: 5, name: 'May' }, { value: 6, name: 'June' },
//     { value: 7, name: 'July' }, { value: 8, name: 'August' },
//     { value: 9, name: 'September' }, { value: 10, name: 'October' },
//     { value: 11, name: 'November' }, { value: 12, name: 'December' }
//   ];

//   // ========== FETCH FUNCTIONS ==========
  
//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }
      
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/me`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success) {
//         setUser(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching user:', err);
//       if (err.response?.status === 401) {
//         router.push('/login');
//       }
//     }
//   };

//   const fetchUserOrders = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { limit: 100 }
//       });
      
//       if (response.data.success) {
//         const userOrders = Array.isArray(response.data.data) ? response.data.data : [];
//         setOrders(userOrders);
        
//         // Extract available years from orders
//         const years = [...new Set(userOrders.map(order => new Date(order.createdAt).getFullYear()))];
//         years.sort((a, b) => b - a);
//         setAvailableYears(years.length ? years : [new Date().getFullYear()]);
        
//         // Calculate total order stats (unfiltered)
//         const placed = userOrders.filter(o => o.orderStatus === 'placed').length;
//         const processing = userOrders.filter(o => ['processing', 'shipped', 'out_for_delivery'].includes(o.orderStatus)).length;
//         const delivered = userOrders.filter(o => o.orderStatus === 'delivered').length;
//         const cancelled = userOrders.filter(o => o.orderStatus === 'cancelled').length;
//         const totalSpent = userOrders
//           .filter(o => o.paymentStatus === 'paid' && o.orderStatus === 'delivered')
//           .reduce((sum, o) => sum + (o.total || 0), 0);
        
//         setStats(prev => ({
//           ...prev,
//           totalOrders: userOrders.length,
//           placedOrders: placed,
//           processingOrders: processing,
//           deliveredOrders: delivered,
//           cancelledOrders: cancelled,
//           totalSpent: totalSpent
//         }));
//       }
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//       setOrders([]);
//     }
//   };

//   const fetchUserReviews = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/my-reviews`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { limit: 100 }
//       });
      
//       if (response.data.success) {
//         const userReviews = Array.isArray(response.data.data) ? response.data.data : [];
//         setReviews(userReviews);
        
//         // Calculate total review stats (unfiltered)
//         const totalReviews = userReviews.length;
//         const approvedReviews = userReviews.filter(r => r.status === 'approved').length;
//         const pendingReviews = userReviews.filter(r => r.status === 'pending').length;
//         const rejectedReviews = userReviews.filter(r => r.status === 'rejected').length;
        
//         setStats(prev => ({
//           ...prev,
//           totalReviews,
//           approvedReviews,
//           pendingReviews,
//           rejectedReviews
//         }));
//       } else {
//         setReviews([]);
//       }
//     } catch (err) {
//       console.error('Error fetching reviews:', err);
//       setReviews([]);
//     }
//   };

//   const fetchWishlist = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/wishlist`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success) {
//         const wishlistData = response.data.data;
//         let items = [];
//         if (wishlistData && Array.isArray(wishlistData.items)) {
//           items = wishlistData.items;
//         } else if (Array.isArray(wishlistData)) {
//           items = wishlistData;
//         } else if (wishlistData && wishlistData._id && Array.isArray(wishlistData.items)) {
//           items = wishlistData.items;
//         }
//         setWishlistItems(items);
//       } else {
//         setWishlistItems([]);
//       }
//     } catch (err) {
//       console.error('Error fetching wishlist:', err);
//       setWishlistItems([]);
//     }
//   };

//   // ========== FILTER FUNCTION ==========
  
//   const filterOrdersAndReviews = useCallback(() => {
//     // If no data loaded yet, skip filtering
//     if (!dataLoaded) return;
    
//     // Filter orders
//     let filteredOrderList = [...orders];
//     let filteredReviewList = [...reviews];

//     const matchesFilter = (dateStr) => {
//       if (!dateStr) return false;
//       const d = new Date(dateStr);
//       if (filterType === 'month') {
//         return d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth;
//       } else {
//         return d.getFullYear() === selectedYear;
//       }
//     };

//     // Apply date filter
//     filteredOrderList = filteredOrderList.filter(o => matchesFilter(o.createdAt));
//     filteredReviewList = filteredReviewList.filter(r => matchesFilter(r.createdAt));

//     setFilteredOrders(filteredOrderList);
//     setFilteredReviews(filteredReviewList);

//     // Calculate filtered stats
//     const placed = filteredOrderList.filter(o => o.orderStatus === 'placed').length;
//     const processing = filteredOrderList.filter(o => ['processing', 'shipped', 'out_for_delivery'].includes(o.orderStatus)).length;
//     const delivered = filteredOrderList.filter(o => o.orderStatus === 'delivered').length;
//     const cancelled = filteredOrderList.filter(o => o.orderStatus === 'cancelled').length;
//     const totalSpent = filteredOrderList
//       .filter(o => o.paymentStatus === 'paid' && o.orderStatus === 'delivered')
//       .reduce((sum, o) => sum + (o.total || 0), 0);

//     // Review stats
//     const filteredTotalReviews = filteredReviewList.length;
//     const filteredApproved = filteredReviewList.filter(r => r.status === 'approved').length;
//     const filteredPending = filteredReviewList.filter(r => r.status === 'pending').length;
//     const filteredRejected = filteredReviewList.filter(r => r.status === 'rejected').length;

//     setFilteredStats({
//       totalOrders: filteredOrderList.length,
//       placedOrders: placed,
//       processingOrders: processing,
//       deliveredOrders: delivered,
//       cancelledOrders: cancelled,
//       totalSpent: totalSpent,
//       totalReviews: filteredTotalReviews,
//       approvedReviews: filteredApproved,
//       pendingReviews: filteredPending,
//       rejectedReviews: filteredRejected
//     });
//   }, [orders, reviews, selectedYear, selectedMonth, filterType, dataLoaded]);

//   // ========== EFFECTS ==========
  
//   // Load all data
//   const loadDashboardData = async () => {
//     setLoading(true);
//     setError(null);
//     setDataLoaded(false);
    
//     try {
//       await fetchUserProfile();
      
//       // Fetch all data concurrently
//       await Promise.all([
//         fetchUserOrders(),
//         fetchUserReviews(),
//         fetchWishlist()
//       ]);
      
//       // Mark data as loaded - this will trigger the filter
//       setDataLoaded(true);
      
//     } catch (err) {
//       console.error('Error loading dashboard:', err);
//       setError('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Run filter whenever data is loaded OR filter settings change
//   useEffect(() => {
//     if (dataLoaded) {
//       filterOrdersAndReviews();
//     }
//   }, [dataLoaded, filterOrdersAndReviews]);

//   // ✅ Also run filter when filter settings change (after initial load)
//   useEffect(() => {
//     if (dataLoaded) {
//       filterOrdersAndReviews();
//     }
//   }, [selectedYear, selectedMonth, filterType, dataLoaded, filterOrdersAndReviews]);

//   // Initial load
//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   // ========== HANDLERS ==========
  
//   const copyOrderId = (orderId) => {
//     navigator.clipboard.writeText(orderId);
//     toast.success('Order ID copied!');
//   };

//   const getFilterLabel = () => {
//     if (filterType === 'month') {
//       const month = months.find(m => m.value === selectedMonth);
//       return `${month?.name} ${selectedYear}`;
//     }
//     return `Year ${selectedYear}`;
//   };

//   const removeFromWishlist = async (itemId) => {
//     setRemovingItems(prev => ({ ...prev, [itemId]: true }));
    
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/wishlist/${itemId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       setWishlistItems(prev => prev.filter(item => item._id !== itemId));
//       toast.success('Removed from wishlist');
//     } catch (err) {
//       console.error('Remove from wishlist error:', err);
//       toast.error('Failed to remove item');
//     } finally {
//       setRemovingItems(prev => ({ ...prev, [itemId]: false }));
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     router.push('/');
//   };

//   // ========== RENDER ==========
  
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-[#f0f7fa]">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06B6D4] mx-auto"></div>
//           <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
//           <Sparkles className="w-5 h-5 text-[#06B6D4] mx-auto mt-2 animate-pulse" />
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-[#f0f7fa] px-4">
//         <div className="text-center bg-white p-6 rounded-xl max-w-md w-full shadow-lg border border-[#06B6D4]/20">
//           <XCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
//           <p className="text-rose-600">{error}</p>
//           <button
//             onClick={loadDashboardData}
//             className="mt-4 px-4 py-2 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white rounded-lg hover:shadow-lg hover:shadow-[#06B6D4]/20 transition-all duration-300"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Use filteredStats directly
//   const displayStats = filteredStats;

//   return (
//     <div className="min-h-screen bg-[#f0f7fa]">
//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-md border-b border-[#06B6D4]/20 sticky top-0 z-10 shadow-sm">
//         <div className="px-4 sm:px-6 py-4">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-r from-[#06B6D4] to-[#004767] rounded-xl shadow-md shadow-[#06B6D4]/20">
//                   <Zap className="w-5 h-5 text-white" />
//                 </div>
//                 <h1 className="text-xl sm:text-2xl font-bold text-[#004767]">
//                   My Dashboard
//                 </h1>
//               </div>
//               <p className="text-gray-500 text-sm mt-1 ml-11">
//                 Welcome back, <span className="font-semibold text-[#06B6D4]">{user?.contactPerson || 'Customer'}</span>! Here's your activity summary.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-4 sm:p-6">
//         {/* Filter Section */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#06B6D4]/20 p-4 mb-6">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
//               <div className="flex gap-2 bg-[#06B6D4]/5 rounded-lg p-1 w-full sm:w-auto border border-[#06B6D4]/20">
//                 <button
//                   onClick={() => setFilterType('month')}
//                   className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     filterType === 'month' 
//                       ? 'bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white shadow-md shadow-[#06B6D4]/20' 
//                       : 'text-gray-600 hover:bg-[#06B6D4]/10'
//                   }`}
//                 >
//                   Monthly
//                 </button>
//                 <button
//                   onClick={() => setFilterType('year')}
//                   className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     filterType === 'year' 
//                       ? 'bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white shadow-md shadow-[#06B6D4]/20' 
//                       : 'text-gray-600 hover:bg-[#06B6D4]/10'
//                   }`}
//                 >
//                   Yearly
//                 </button>
//               </div>

//               {filterType === 'month' && (
//                 <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//                   <select
//                     value={selectedMonth}
//                     onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//                     className="px-3 py-2 border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent bg-white/50 text-sm"
//                   >
//                     {months.map(month => (
//                       <option key={month.value} value={month.value}>{month.name}</option>
//                     ))}
//                   </select>
//                   <select
//                     value={selectedYear}
//                     onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                     className="px-3 py-2 border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent bg-white/50 text-sm"
//                   >
//                     {availableYears.map(year => (
//                       <option key={year} value={year}>{year}</option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               {filterType === 'year' && (
//                 <select
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                   className="px-3 py-2 border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent bg-white/50 text-sm"
//                 >
//                   {availableYears.map(year => (
//                     <option key={year} value={year}>{year}</option>
//                   ))}
//                 </select>
//               )}
//             </div>

//             <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
//               <Calendar className="h-5 w-5 text-[#06B6D4] flex-shrink-0" />
//               <span className="text-sm text-gray-600">
//                 Showing for: <strong className="text-[#06B6D4]">{getFilterLabel()}</strong>
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <div className="bg-gradient-to-r from-[#06B6D4] to-[#004767] rounded-xl shadow-lg shadow-[#06B6D4]/20 p-4 text-white transform hover:scale-105 transition-all duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-white text-xs">Total Orders</p>
//                 <p className="text-2xl font-bold">{displayStats.totalOrders}</p>
//                 <p className="text-[#06B6D4]/80 text-[10px] mt-1">in {getFilterLabel()}</p>
//               </div>
//               <ShoppingBag className="h-8 w-8 opacity-80" />
//             </div>
//           </div>
          
//           <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-lg shadow-yellow-200/50 p-4 text-white transform hover:scale-105 transition-all duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-yellow-100 text-xs">Placed</p>
//                 <p className="text-2xl font-bold">{displayStats.placedOrders}</p>
//                 <p className="text-yellow-100 text-[10px] mt-1">in {getFilterLabel()}</p>
//               </div>
//               <Clock className="h-8 w-8 opacity-80" />
//             </div>
//           </div>
          
//           <div className="bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-xl shadow-lg shadow-indigo-200/50 p-4 text-white transform hover:scale-105 transition-all duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-indigo-100 text-xs">In Progress</p>
//                 <p className="text-2xl font-bold">{displayStats.processingOrders}</p>
//                 <p className="text-indigo-100 text-[10px] mt-1">in {getFilterLabel()}</p>
//               </div>
//               <Truck className="h-8 w-8 opacity-80" />
//             </div>
//           </div>
          
//           <div className="bg-gradient-to-r from-rose-400 to-rose-500 rounded-xl shadow-lg shadow-rose-200/50 p-4 text-white transform hover:scale-105 transition-all duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-rose-100 text-xs">Cancelled</p>
//                 <p className="text-2xl font-bold">{displayStats.cancelledOrders}</p>
//                 <p className="text-rose-100 text-[10px] mt-1">in {getFilterLabel()}</p>
//               </div>
//               <XCircle className="h-8 w-8 opacity-80" />
//             </div>
//           </div>
//         </div>

//         {/* Review Stats Summary */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#06B6D4]/20 p-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-[#06B6D4]/10 rounded-lg">
//                 <MessageSquare className="h-5 w-5 text-[#06B6D4]" />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Total Reviews</p>
//                 <p className="text-xl font-bold text-[#004767]">{displayStats.totalReviews}</p>
//                 <p className="text-[10px] text-gray-400">in {getFilterLabel()}</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-green-200 p-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <CheckCircle className="h-5 w-5 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Approved</p>
//                 <p className="text-xl font-bold text-green-600">{displayStats.approvedReviews}</p>
//                 <p className="text-[10px] text-gray-400">in {getFilterLabel()}</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-yellow-200 p-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <Clock className="h-5 w-5 text-yellow-600" />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Pending</p>
//                 <p className="text-xl font-bold text-yellow-600">{displayStats.pendingReviews}</p>
//                 <p className="text-[10px] text-gray-400">in {getFilterLabel()}</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-rose-200 p-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-rose-100 rounded-lg">
//                 <XCircle className="h-5 w-5 text-rose-600" />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Rejected</p>
//                 <p className="text-xl font-bold text-rose-600">{displayStats.rejectedReviews}</p>
//                 <p className="text-[10px] text-gray-400">in {getFilterLabel()}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#06B6D4]/20 mb-6">
//           <div className="border-b border-[#06B6D4]/20">
//             <nav className="flex flex-wrap gap-2 px-4">
//               <button
//                 onClick={() => setActiveTab('orders')}
//                 className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
//                   activeTab === 'orders'
//                     ? 'text-[#06B6D4] border-[#06B6D4]'
//                     : 'text-gray-500 border-transparent hover:text-[#06B6D4] hover:border-[#06B6D4]/30'
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <ShoppingBag className={`h-4 w-4 ${activeTab === 'orders' ? 'text-[#06B6D4]' : 'text-gray-400'}`} />
//                   My Orders 
//                 </div>
//               </button>
//               <button
//                 onClick={() => setActiveTab('reviews')}
//                 className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
//                   activeTab === 'reviews'
//                     ? 'text-[#06B6D4] border-[#06B6D4]'
//                     : 'text-gray-500 border-transparent hover:text-[#06B6D4] hover:border-[#06B6D4]/30'
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <MessageSquare className={`h-4 w-4 ${activeTab === 'reviews' ? 'text-[#06B6D4]' : 'text-gray-400'}`} />
//                   My Reviews ({displayStats.totalReviews})
//                 </div>
//               </button>
//             </nav>
//           </div>
//         </div>

//         {/* Orders Tab */}
//         {activeTab === 'orders' && (
//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                 <ShoppingBag className="h-5 w-5 text-[#06B6D4]" />
//                 Recent Orders ({getFilterLabel()})
//               </h2>
//               {filteredOrders.length > 0 && (
//                 <button 
//                   onClick={() => router.push('/customer/orders')}
//                   className="text-[#06B6D4] hover:text-[#0891B2] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all duration-200"
//                 >
//                   View All Orders →
//                 </button>
//               )}
//             </div>
//             <div className="space-y-4">
//               {filteredOrders.length === 0 ? (
//                 <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#06B6D4]/20 p-12 text-center">
//                   <ShoppingBag className="h-16 w-16 text-[#06B6D4]/30 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
//                   <p className="text-gray-500 mb-4">You haven't placed any orders in {getFilterLabel()}.</p>
//                   <button onClick={() => router.push('/products')} className="px-6 py-2 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white rounded-lg hover:shadow-lg hover:shadow-[#06B6D4]/20 transition-all duration-300">
//                     Start Shopping
//                   </button>
//                 </div>
//               ) : (
//                 filteredOrders.slice(0, 5).map((order) => (
//                   <OrderCard 
//                     key={order._id} 
//                     order={order} 
//                     copyOrderId={copyOrderId} 
//                   />
//                 ))
//               )}
//             </div>
//           </div>
//         )}

//         {/* Reviews Tab */}
//         {activeTab === 'reviews' && (
//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                 <MessageSquare className="h-5 w-5 text-[#06B6D4]" />
//                 My Reviews ({getFilterLabel()})
//               </h2>
//               {filteredReviews.length > 0 && (
//                 <span className="text-sm text-gray-500">
//                   {displayStats.approvedReviews} approved • {displayStats.pendingReviews} pending
//                 </span>
//               )}
//             </div>
//             <div className="space-y-4">
//               {filteredReviews.length === 0 ? (
//                 <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#06B6D4]/20 p-12 text-center">
//                   <MessageSquare className="h-16 w-16 text-[#06B6D4]/30 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
//                   <p className="text-gray-500 mb-4">You haven't written any reviews in {getFilterLabel()}.</p>
//                   <button onClick={() => router.push('/products')} className="px-6 py-2 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white rounded-lg hover:shadow-lg hover:shadow-[#06B6D4]/20 transition-all duration-300">
//                     Browse Products
//                   </button>
//                 </div>
//               ) : (
//                 filteredReviews.slice(0, 5).map((review) => (
//                   <ReviewCard key={review._id} review={review} />
//                 ))
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  ShoppingBag, 
  CheckCircle, 
  XCircle,
  Clock,
  Truck,
  Eye,
  Heart,
  LogOut,
  ChevronRight,
  Star,
  Calendar,
  DollarSign,
  RefreshCw,
  Copy,
  Home,
  MessageSquare,
  Sparkles,
  Zap,
  Users,
  Tag,
  Trash2,
  Loader2,
  Gift,
  ShieldCheck,
  Store,
  TrendingUp,
  Award,
  Headphones
} from 'lucide-react';
import { toast } from 'sonner';

// Helper functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const getStatusColor = (status) => {
  const colors = {
    placed: 'bg-blue-50 text-blue-700',
    follow_up: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-blue-100 text-blue-800',
    processing: 'bg-indigo-100 text-indigo-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-rose-100 text-rose-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const getStatusLabel = (status) => {
  const labels = {
    placed: 'Placed',
    follow_up: 'Follow Up',
    accepted: 'Accepted',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  };
  return labels[status] || status;
};

const getReviewStatusBadge = (status) => {
  if (status === 'approved') {
    return <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Approved</span>;
  } else if (status === 'pending') {
    return <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">Pending</span>;
  } else if (status === 'rejected') {
    return <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Rejected</span>;
  }
  return null;
};

const truncateText = (text, limit = 25) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

// Order Card Component
const OrderCard = ({ order, copyOrderId }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-300">
    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div className="flex items-center gap-4 flex-wrap">
        <div>
          <p className="text-xs text-gray-500">Order ID</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
            <button onClick={() => copyOrderId(order.orderNumber)} className="text-blue-600 hover:text-blue-700 transition-colors">
              <Copy className="h-3 w-3" />
            </button>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500">Order Date</p>
          <p className="text-sm text-gray-900">{formatDate(order.createdAt)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Total Amount</p>
          <p className="text-sm font-semibold text-blue-600">{formatCurrency(order.total)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(order.orderStatus)}`}>
          {getStatusLabel(order.orderStatus)}
        </span>
      </div>
    </div>
    
    <div className="divide-y divide-gray-100">
      {order.items?.slice(0, 3).map((item, idx) => (
        <div key={idx} className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
          {item.image ? (
            <img src={item.image} alt={item.productName} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
          ) : (
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-gray-200">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          )}
          <div className="flex-1">
            <p className="font-medium text-gray-800 text-sm">{item.productName}</p>
            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-blue-600 text-sm">{formatCurrency(item.discountPrice || item.regularPrice)}</p>
          </div>
        </div>
      ))}
      {order.items?.length > 3 && (
        <div className="px-4 py-2 text-center text-xs text-blue-600 bg-gray-50">
          +{order.items.length - 3} more items
        </div>
      )}
    </div>
  </div>
);

// Review Card Component
const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-300">
    <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
      <div>
        <h3 className="font-semibold text-gray-900">{review.productName}</h3>
        <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'text-blue-600 fill-blue-600' : 'text-gray-300'}`} />
          ))}
        </div>
        {getReviewStatusBadge(review.status)}
      </div>
    </div>
    {review.title && (
      <p className="font-medium text-gray-700 text-sm mb-1">{review.title}</p>
    )}
    <p className="text-gray-600 text-sm line-clamp-2">{review.comment}</p>
  </div>
);

export default function CustomerDashboard() {
  const router = useRouter();
  
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [removingItems, setRemovingItems] = useState({});
  
  // Track if initial data load is complete
  const [dataLoaded, setDataLoaded] = useState(false);
  
  // Total stats (unfiltered - all time)
  const [stats, setStats] = useState({
    totalOrders: 0,
    placedOrders: 0,
    processingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalSpent: 0,
    totalReviews: 0,
    approvedReviews: 0,
    pendingReviews: 0,
    rejectedReviews: 0
  });
  
  // Filtered stats (filtered by month/year)
  const [filteredStats, setFilteredStats] = useState({
    totalOrders: 0,
    placedOrders: 0,
    processingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalSpent: 0,
    totalReviews: 0,
    approvedReviews: 0,
    pendingReviews: 0,
    rejectedReviews: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [filterType, setFilterType] = useState('month');
  const [availableYears, setAvailableYears] = useState([]);
  
  // Ref to track if initial filter has been applied
  const initialFilterApplied = useRef(false);

  const months = [
    { value: 1, name: 'January' }, { value: 2, name: 'February' },
    { value: 3, name: 'March' }, { value: 4, name: 'April' },
    { value: 5, name: 'May' }, { value: 6, name: 'June' },
    { value: 7, name: 'July' }, { value: 8, name: 'August' },
    { value: 9, name: 'September' }, { value: 10, name: 'October' },
    { value: 11, name: 'November' }, { value: 12, name: 'December' }
  ];

  // ========== FETCH FUNCTIONS ==========
  
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      if (err.response?.status === 401) {
        router.push('/login');
      }
    }
  };

  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 100 }
      });
      
      if (response.data.success) {
        const userOrders = Array.isArray(response.data.data) ? response.data.data : [];
        setOrders(userOrders);
        
        // Extract available years from orders
        const years = [...new Set(userOrders.map(order => new Date(order.createdAt).getFullYear()))];
        years.sort((a, b) => b - a);
        setAvailableYears(years.length ? years : [new Date().getFullYear()]);
        
        // Calculate total order stats (unfiltered)
        const placed = userOrders.filter(o => o.orderStatus === 'placed').length;
        const processing = userOrders.filter(o => ['processing', 'shipped', 'out_for_delivery'].includes(o.orderStatus)).length;
        const delivered = userOrders.filter(o => o.orderStatus === 'delivered').length;
        const cancelled = userOrders.filter(o => o.orderStatus === 'cancelled').length;
        const totalSpent = userOrders
          .filter(o => o.paymentStatus === 'paid' && o.orderStatus === 'delivered')
          .reduce((sum, o) => sum + (o.total || 0), 0);
        
        setStats(prev => ({
          ...prev,
          totalOrders: userOrders.length,
          placedOrders: placed,
          processingOrders: processing,
          deliveredOrders: delivered,
          cancelledOrders: cancelled,
          totalSpent: totalSpent
        }));
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrders([]);
    }
  };

  const fetchUserReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/my-reviews`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 100 }
      });
      
      if (response.data.success) {
        const userReviews = Array.isArray(response.data.data) ? response.data.data : [];
        setReviews(userReviews);
        
        // Calculate total review stats (unfiltered)
        const totalReviews = userReviews.length;
        const approvedReviews = userReviews.filter(r => r.status === 'approved').length;
        const pendingReviews = userReviews.filter(r => r.status === 'pending').length;
        const rejectedReviews = userReviews.filter(r => r.status === 'rejected').length;
        
        setStats(prev => ({
          ...prev,
          totalReviews,
          approvedReviews,
          pendingReviews,
          rejectedReviews
        }));
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews([]);
    }
  };

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        const wishlistData = response.data.data;
        let items = [];
        if (wishlistData && Array.isArray(wishlistData.items)) {
          items = wishlistData.items;
        } else if (Array.isArray(wishlistData)) {
          items = wishlistData;
        } else if (wishlistData && wishlistData._id && Array.isArray(wishlistData.items)) {
          items = wishlistData.items;
        }
        setWishlistItems(items);
      } else {
        setWishlistItems([]);
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      setWishlistItems([]);
    }
  };

  // ========== FILTER FUNCTION ==========
  
  const filterOrdersAndReviews = useCallback(() => {
    // If no data loaded yet, skip filtering
    if (!dataLoaded) return;
    
    // Filter orders
    let filteredOrderList = [...orders];
    let filteredReviewList = [...reviews];

    const matchesFilter = (dateStr) => {
      if (!dateStr) return false;
      const d = new Date(dateStr);
      if (filterType === 'month') {
        return d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth;
      } else {
        return d.getFullYear() === selectedYear;
      }
    };

    // Apply date filter
    filteredOrderList = filteredOrderList.filter(o => matchesFilter(o.createdAt));
    filteredReviewList = filteredReviewList.filter(r => matchesFilter(r.createdAt));

    setFilteredOrders(filteredOrderList);
    setFilteredReviews(filteredReviewList);

    // Calculate filtered stats
    const placed = filteredOrderList.filter(o => o.orderStatus === 'placed').length;
    const processing = filteredOrderList.filter(o => ['processing', 'shipped', 'out_for_delivery'].includes(o.orderStatus)).length;
    const delivered = filteredOrderList.filter(o => o.orderStatus === 'delivered').length;
    const cancelled = filteredOrderList.filter(o => o.orderStatus === 'cancelled').length;
    const totalSpent = filteredOrderList
      .filter(o => o.paymentStatus === 'paid' && o.orderStatus === 'delivered')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    // Review stats
    const filteredTotalReviews = filteredReviewList.length;
    const filteredApproved = filteredReviewList.filter(r => r.status === 'approved').length;
    const filteredPending = filteredReviewList.filter(r => r.status === 'pending').length;
    const filteredRejected = filteredReviewList.filter(r => r.status === 'rejected').length;

    setFilteredStats({
      totalOrders: filteredOrderList.length,
      placedOrders: placed,
      processingOrders: processing,
      deliveredOrders: delivered,
      cancelledOrders: cancelled,
      totalSpent: totalSpent,
      totalReviews: filteredTotalReviews,
      approvedReviews: filteredApproved,
      pendingReviews: filteredPending,
      rejectedReviews: filteredRejected
    });
  }, [orders, reviews, selectedYear, selectedMonth, filterType, dataLoaded]);

  // ========== EFFECTS ==========
  
  // Load all data
  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    setDataLoaded(false);
    
    try {
      await fetchUserProfile();
      
      // Fetch all data concurrently
      await Promise.all([
        fetchUserOrders(),
        fetchUserReviews(),
        fetchWishlist()
      ]);
      
      // Mark data as loaded - this will trigger the filter
      setDataLoaded(true);
      
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run filter whenever data is loaded OR filter settings change
  useEffect(() => {
    if (dataLoaded) {
      filterOrdersAndReviews();
    }
  }, [dataLoaded, filterOrdersAndReviews]);

  // ✅ Also run filter when filter settings change (after initial load)
  useEffect(() => {
    if (dataLoaded) {
      filterOrdersAndReviews();
    }
  }, [selectedYear, selectedMonth, filterType, dataLoaded, filterOrdersAndReviews]);

  // Initial load
  useEffect(() => {
    loadDashboardData();
  }, []);

  // ========== HANDLERS ==========
  
  const copyOrderId = (orderId) => {
    navigator.clipboard.writeText(orderId);
    toast.success('Order ID copied!');
  };

  const getFilterLabel = () => {
    if (filterType === 'month') {
      const month = months.find(m => m.value === selectedMonth);
      return `${month?.name} ${selectedYear}`;
    }
    return `Year ${selectedYear}`;
  };

  const removeFromWishlist = async (itemId) => {
    setRemovingItems(prev => ({ ...prev, [itemId]: true }));
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/wishlist/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setWishlistItems(prev => prev.filter(item => item._id !== itemId));
      toast.success('Removed from wishlist');
    } catch (err) {
      console.error('Remove from wishlist error:', err);
      toast.error('Failed to remove item');
    } finally {
      setRemovingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  // ========== RENDER ==========
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
          <Sparkles className="w-5 h-5 text-blue-600 mx-auto mt-2 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white px-4">
        <div className="text-center bg-white p-6 rounded-xl max-w-md w-full shadow-lg border border-gray-200">
          <XCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <p className="text-rose-600">{error}</p>
          <button
            onClick={loadDashboardData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Use filteredStats directly
  const displayStats = filteredStats;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-xl shadow-md shadow-blue-200">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  My Dashboard
                </h1>
              </div>
              <p className="text-gray-500 text-sm mt-1 ml-11">
                Welcome back, <span className="font-semibold text-blue-600">{user?.contactPerson || 'Customer'}</span>! Here's your activity summary.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <div className="flex gap-2 bg-gray-50 rounded-lg p-1 w-full sm:w-auto border border-gray-200">
                <button
                  onClick={() => setFilterType('month')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filterType === 'month' 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setFilterType('year')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filterType === 'year' 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Yearly
                </button>
              </div>

              {filterType === 'month' && (
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-sm"
                  >
                    {months.map(month => (
                      <option key={month.value} value={month.value}>{month.name}</option>
                    ))}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-sm"
                  >
                    {availableYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              )}

              {filterType === 'year' && (
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-sm"
                >
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
              <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Showing for: <strong className="text-blue-600">{getFilterLabel()}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-600 rounded-xl shadow-lg shadow-blue-200 p-4 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs">Total Orders</p>
                <p className="text-2xl font-bold">{displayStats.totalOrders}</p>
                <p className="text-blue-200 text-[10px] mt-1">in {getFilterLabel()}</p>
              </div>
              <ShoppingBag className="h-8 w-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-lg shadow-yellow-200/50 p-4 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-xs">Placed</p>
                <p className="text-2xl font-bold">{displayStats.placedOrders}</p>
                <p className="text-yellow-100 text-[10px] mt-1">in {getFilterLabel()}</p>
              </div>
              <Clock className="h-8 w-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-xl shadow-lg shadow-indigo-200/50 p-4 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-xs">In Progress</p>
                <p className="text-2xl font-bold">{displayStats.processingOrders}</p>
                <p className="text-indigo-100 text-[10px] mt-1">in {getFilterLabel()}</p>
              </div>
              <Truck className="h-8 w-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-rose-400 to-rose-500 rounded-xl shadow-lg shadow-rose-200/50 p-4 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rose-100 text-xs">Cancelled</p>
                <p className="text-2xl font-bold">{displayStats.cancelledOrders}</p>
                <p className="text-rose-100 text-[10px] mt-1">in {getFilterLabel()}</p>
              </div>
              <XCircle className="h-8 w-8 opacity-80" />
            </div>
          </div>
        </div>

        {/* Review Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Reviews</p>
                <p className="text-xl font-bold text-gray-900">{displayStats.totalReviews}</p>
                <p className="text-[10px] text-gray-400">in {getFilterLabel()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-green-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Approved</p>
                <p className="text-xl font-bold text-green-600">{displayStats.approvedReviews}</p>
                <p className="text-[10px] text-gray-400">in {getFilterLabel()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-yellow-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Pending</p>
                <p className="text-xl font-bold text-yellow-600">{displayStats.pendingReviews}</p>
                <p className="text-[10px] text-gray-400">in {getFilterLabel()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-rose-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 rounded-lg">
                <XCircle className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Rejected</p>
                <p className="text-xl font-bold text-rose-600">{displayStats.rejectedReviews}</p>
                <p className="text-[10px] text-gray-400">in {getFilterLabel()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap gap-2 px-4">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
                  activeTab === 'orders'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-blue-600 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className={`h-4 w-4 ${activeTab === 'orders' ? 'text-blue-600' : 'text-gray-400'}`} />
                  My Orders 
                </div>
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
                  activeTab === 'reviews'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-blue-600 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className={`h-4 w-4 ${activeTab === 'reviews' ? 'text-blue-600' : 'text-gray-400'}`} />
                  My Reviews ({displayStats.totalReviews})
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
                Recent Orders ({getFilterLabel()})
              </h2>
              {filteredOrders.length > 0 && (
                <button 
                  onClick={() => router.push('/customer/orders')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all duration-200"
                >
                  View All Orders →
                </button>
              )}
            </div>
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                  <p className="text-gray-500 mb-4">You haven't placed any orders in {getFilterLabel()}.</p>
                  <button onClick={() => router.push('/products')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
                    Start Shopping
                  </button>
                </div>
              ) : (
                filteredOrders.slice(0, 5).map((order) => (
                  <OrderCard 
                    key={order._id} 
                    order={order} 
                    copyOrderId={copyOrderId} 
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                My Reviews ({getFilterLabel()})
              </h2>
              {filteredReviews.length > 0 && (
                <span className="text-sm text-gray-500">
                  {displayStats.approvedReviews} approved • {displayStats.pendingReviews} pending
                </span>
              )}
            </div>
            <div className="space-y-4">
              {filteredReviews.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
                  <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
                  <p className="text-gray-500 mb-4">You haven't written any reviews in {getFilterLabel()}.</p>
                  <button onClick={() => router.push('/products')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
                    Browse Products
                  </button>
                </div>
              ) : (
                filteredReviews.slice(0, 5).map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}