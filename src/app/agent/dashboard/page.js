
// 'use client';

// import React, { useState, useEffect, useCallback, Suspense } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';
// import {
//   FaBox,
//   FaHeadset,
//   FaClock,
//   FaCheckCircle,
//   FaBan,
//   FaPhone,
//   FaEnvelope,
//   FaUser,
//   FaCalendarAlt,
//   FaSearch,
//   FaEye,
//   FaEdit,
//   FaFilter,
//   FaChevronLeft,
//   FaChevronRight,
//   FaSpinner,
//   FaTimes,
//   FaFileInvoice,
//   FaMoneyBillWave,
//   FaCreditCard,
//   FaMobileAlt,
//   FaMapMarkerAlt,
//   FaExclamationTriangle,
//   FaTruck,
//   FaCheck,
//   FaPrint,
//   FaInfoCircle,
//   FaUndo,
//   FaReply
// } from 'react-icons/fa';
// import {
//   MdPendingActions,
//   MdOutlinePendingActions
// } from 'react-icons/md';
// import { HiOutlineTrendingUp, HiOutlineTrendingDown } from 'react-icons/hi';

// // ========== ORDER STATUSES ==========
// const ORDER_STATUSES = [
//   { value: 'follow_up', label: 'Follow Up', color: 'bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/30', icon: FaHeadset },
//   { value: 'reminder', label: 'Reminder', color: 'bg-[#FFC107]/10 text-[#FFC107] border-[#FFC107]/30', icon: FaClock },
//   { value: 'accepted', label: 'Accepted', color: 'bg-[#4CAF50]/10 text-[#4CAF50] border-[#4CAF50]/30', icon: FaCheckCircle },
//   { value: 'cancelled', label: 'Rejected', color: 'bg-red-50 text-red-600 border-red-200', icon: FaBan },
// ];

// const PAYMENT_STATUSES = [
//   { value: 'pending', label: 'Pending', color: 'bg-[#E2E7EA] text-[#004767] border-[#06B6D4]/30' },
//   { value: 'paid', label: 'Paid', color: 'bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/30' },
//   { value: 'failed', label: 'Failed', color: 'bg-red-50 text-red-600 border-red-200' },
//   { value: 'refunded', label: 'Refunded', color: 'bg-[#E2E7EA] text-[#004767] border-[#06B6D4]/30' }
// ];

// // ========== ORDER DETAILS MODAL ==========
// const OrderDetailsModal = ({ isOpen, onClose, order }) => {
//   if (!isOpen || !order) return null;

//   const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
//   const paymentInfo = PAYMENT_STATUSES?.find(p => p.value === order.paymentStatus) || { label: order.paymentStatus, color: 'bg-[#E2E7EA] text-[#004767] border-[#06B6D4]/30' };

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 20 }}
//         className="relative bg-white rounded-2xl border border-[#06B6D4]/30 shadow-2xl w-full max-w-3xl my-8 overflow-hidden"
//       >
//         <div className="p-4 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white sticky top-0 z-10">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaFileInvoice className="w-5 h-5" />
//               <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Order Details</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order #{order.orderNumber || order._id?.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-5 max-h-[60vh] overflow-y-auto">
//           {/* Status Badges */}
//           <div className="flex flex-wrap gap-2 mb-5">
//             <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${statusInfo?.color || 'bg-[#E2E7EA] text-[#004767] border-[#06B6D4]/30'}`}>
//               {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
//               Order: {statusInfo?.label || order.orderStatus}
//             </span>
//             <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${paymentInfo?.color || 'bg-[#E2E7EA] text-[#004767] border-[#06B6D4]/30'}`}>
//               <FaMoneyBillWave className="w-3 h-3" />
//               Payment: {paymentInfo?.label || order.paymentStatus}
//             </span>
//             <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border bg-[#E2E7EA] text-[#004767] border-[#06B6D4]/30">
//               <FaCreditCard className="w-3 h-3" />
//               {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
//             </span>
//           </div>

//           {/* Customer & Delivery Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//             <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#06B6D4]/30">
//               <h3 className="font-semibold text-[#004767] text-sm mb-2 flex items-center gap-1.5">
//                 <FaUser className="w-3.5 h-3.5 text-[#06B6D4]" />
//                 Customer Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#64748B]">Name:</span> <span className="text-[#004767] font-medium">{order.customerInfo?.fullName}</span></p>
//                 <p><span className="text-[#64748B]">Email:</span> <span className="text-[#004767]">{order.customerInfo?.email}</span></p>
//                 <p><span className="text-[#64748B]">Phone:</span> <span className="text-[#004767]">{order.customerInfo?.phone}</span></p>
//               </div>
//             </div>

//             <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#06B6D4]/30">
//               <h3 className="font-semibold text-[#004767] text-sm mb-2 flex items-center gap-1.5">
//                 <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#06B6D4]" />
//                 Delivery Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#64748B]">Division:</span> <span className="font-medium text-[#004767]">{order.customerInfo?.division || 'N/A'}</span></p>
//                 <p><span className="text-[#64748B]">District/City:</span> <span className="font-medium text-[#004767]">{order.customerInfo?.city || 'N/A'}</span></p>
//                 <p><span className="text-[#64748B]">Address:</span> <span className="text-[#004767]">{order.customerInfo?.address}</span></p>
//               </div>
//             </div>
//           </div>

//           {/* Order Items */}
//           <div className="mb-5">
//             <h3 className="font-semibold text-[#004767] text-sm mb-2 flex items-center gap-1.5">
//               <FaBox className="w-3.5 h-3.5 text-[#06B6D4]" />
//               Order Items
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs">
//                 <thead className="bg-[#E2E7EA]">
//                   <tr>
//                     <th className="px-2 py-1.5 text-left text-[#004767]">Product</th>
//                     <th className="px-2 py-1.5 text-center text-[#004767]">Qty</th>
//                     <th className="px-2 py-1.5 text-right text-[#004767]">Price</th>
//                     <th className="px-2 py-1.5 text-right text-[#004767]">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {order.items?.map((item, idx) => {
//                     const price = item.discountPrice || item.regularPrice;
//                     const totalPrice = price * item.quantity;
//                     return (
//                       <tr key={idx} className="border-t border-[#06B6D4]/20">
//                         <td className="px-2 py-2">
//                           <div className="flex items-center gap-2">
//                             <img 
//                               src={item.image || 'https://via.placeholder.com/30'} 
//                               alt={item.productName}
//                               className="w-7 h-7 rounded object-cover border border-[#06B6D4]/30"
//                               onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
//                             />
//                             <p className="font-medium text-xs text-[#004767]">{item.productName}</p>
//                           </div>
//                         </td>
//                         <td className="px-2 py-2 text-center text-[#004767]">{item.quantity}</td>
//                         <td className="px-2 py-2 text-right text-[#004767]">৳{price?.toFixed(2)}</td>
//                         <td className="px-2 py-2 text-right font-medium text-[#06B6D4]">৳{totalPrice?.toFixed(2)}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//                 <tfoot className="border-t border-[#06B6D4]/30">
//                   <tr><td colSpan="3" className="px-2 py-1 text-right font-medium text-[#004767]">Subtotal:</td><td className="px-2 py-1 text-right text-[#004767]">৳{order.subtotal?.toFixed(2)}</td></tr>
//                   <tr><td colSpan="3" className="px-2 py-1 text-right font-medium text-[#004767]">Shipping:</td><td className="px-2 py-1 text-right text-[#004767]">৳{order.shippingCost?.toFixed(2)}</td></tr>
//                   <tr className="text-sm font-bold">
//                     <td colSpan="3" className="px-2 py-1 text-right text-[#004767]">Total:</td>
//                     <td className="px-2 py-1 text-right text-[#06B6D4]">৳{order.total?.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 border-t border-[#06B6D4]/30 bg-[#E2E7EA]/20 flex justify-end gap-2">
//           <button onClick={() => window.print()} className="px-3 py-1.5 border border-[#06B6D4]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors flex items-center gap-1.5 text-sm">
//             <FaPrint className="w-3 h-3" /> Print
//           </button>
//           <button onClick={onClose} className="px-3 py-1.5 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white rounded-xl hover:shadow-lg hover:shadow-[#06B6D4]/25 transition-all text-sm">
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== STAT CARD COMPONENT ==========
// const StatCard = ({ title, value, icon, color, subtitle }) => (
//   <motion.div 
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     className="bg-white rounded-2xl p-5 shadow-sm border border-[#06B6D4]/20 hover:shadow-md transition-shadow"
//   >
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide">{title}</p>
//         <p className="text-2xl font-bold text-[#004767] mt-1">{value}</p>
//         {subtitle && <p className="text-xs text-[#64748B] mt-0.5">{subtitle}</p>}
//       </div>
//       <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
//         {icon}
//       </div>
//     </div>
//   </motion.div>
// );

// // ========== ORDERS TABLE COMPONENT ==========
// const OrdersTable = ({ orders, title, statusType, onViewOrder, onUpdateStatus, loading }) => {
//   const statusInfo = ORDER_STATUSES.find(s => s.value === statusType);
//   const isFollowUp = statusType === 'follow_up';
//   const isReminder = statusType === 'reminder';

//   const getStatusBadge = (status) => {
//     const info = ORDER_STATUSES.find(s => s.value === status);
//     if (!info) return <span className="px-1.5 py-0.5 rounded-full text-xs bg-[#E2E7EA] text-[#004767] border border-[#06B6D4]/30">{status}</span>;
//     return (
//       <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border ${info.color}`}>
//         <info.icon className="w-2.5 h-2.5" />
//         {info.label}
//       </span>
//     );
//   };

//   const getPaymentBadge = (status) => {
//     const paymentInfo = PAYMENT_STATUSES?.find(p => p.value === status) || { label: status, color: 'bg-[#E2E7EA] text-[#004767] border-[#06B6D4]/30' };
//     return (
//       <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border ${paymentInfo.color}`}>
//         <FaMoneyBillWave className="w-2.5 h-2.5" />
//         {paymentInfo.label}
//       </span>
//     );
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-BD', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-[#06B6D4]/30 shadow-sm overflow-hidden">
//       <div className={`px-5 py-3 border-b ${isFollowUp ? 'bg-[#06B6D4]/5 border-[#06B6D4]/30' : 'bg-[#FFC107]/5 border-[#FFC107]/30'} flex items-center justify-between`}>
//         <div className="flex items-center gap-2">
//           <div className={`w-8 h-8 rounded-lg ${isFollowUp ? 'bg-[#06B6D4]/10 text-[#06B6D4]' : 'bg-[#FFC107]/10 text-[#FFC107]'} flex items-center justify-center`}>
//             {statusInfo?.icon && <statusInfo.icon className="w-4 h-4" />}
//           </div>
//           <div>
//             <h2 className="font-semibold text-[#004767]">{title}</h2>
//             <p className="text-xs text-[#64748B]">{orders.length} orders awaiting action</p>
//           </div>
//         </div>
//         {isFollowUp && (
//           <span className="px-2 py-1 bg-[#06B6D4]/10 text-[#06B6D4] rounded-full text-xs font-medium border border-[#06B6D4]/30">
//             Priority
//           </span>
//         )}
//         {isReminder && (
//           <span className="px-2 py-1 bg-[#FFC107]/10 text-[#FFC107] rounded-full text-xs font-medium border border-[#FFC107]/30">
//             Follow-up
//           </span>
//         )}
//       </div>

//       <div className="w-full overflow-x-auto">
//         {loading ? (
//           <div className="flex justify-center py-8">
//             <div className="w-6 h-6 border-3 border-[#06B6D4] border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : orders.length === 0 ? (
//           <div className="py-8 text-center text-[#64748B] text-sm">
//             <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#E2E7EA]/50 flex items-center justify-center">
//               <FaBox className="w-6 h-6 text-[#64748B]/50" />
//             </div>
//             No {title.toLowerCase()} found
//           </div>
//         ) : (
//           <table className="w-full min-w-[700px]">
//             <thead className="bg-[#E2E7EA]/30 border-b border-[#06B6D4]/20">
//               <tr>
//                 <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Order ID</th>
//                 <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Customer</th>
//                 <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Phone</th>
//                 <th className="px-3 py-2 text-right text-xs font-semibold text-[#64748B]">Total</th>
//                 <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Payment</th>
//                 <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Date</th>
//                 <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id} className="border-b border-[#06B6D4]/10 hover:bg-[#E2E7EA]/20 transition-colors">
//                   <td className="px-3 py-2.5 text-xs font-mono text-[#004767]">{order.orderNumber || order._id.slice(-8).toUpperCase()}</td>
//                   <td className="px-3 py-2.5 text-xs">
//                     <div className="font-medium truncate max-w-[120px] text-[#004767]">{order.customerInfo?.fullName}</div>
//                     <div className="text-[#64748B] text-xs truncate max-w-[120px]">{order.customerInfo?.email}</div>
//                   </td>
//                   <td className="px-3 py-2.5 text-xs text-[#004767]">{order.customerInfo?.phone}</td>
//                   <td className="px-3 py-2.5 text-xs text-right font-bold text-[#06B6D4]">৳{order.total?.toFixed(2)}</td>
//                   <td className="px-3 py-2.5 text-center">{getPaymentBadge(order.paymentStatus)}</td>
//                   <td className="px-3 py-2.5 text-xs text-[#64748B] whitespace-nowrap">{formatDate(order.createdAt)}</td>
//                   <td className="px-3 py-2.5 text-center">
//                     <div className="flex items-center justify-center gap-1.5">
//                       <button 
//                         onClick={() => onViewOrder(order)} 
//                         className="p-1.5 text-[#06B6D4] hover:bg-[#E2E7EA] rounded-lg transition-colors" 
//                         title="View Details"
//                       >
//                         <FaEye className="w-3.5 h-3.5" />
//                       </button>
//                       <button 
//                         onClick={() => onUpdateStatus(order)} 
//                         className="p-1.5 text-[#004767] hover:bg-[#E2E7EA] rounded-lg transition-colors" 
//                         title="Update Status"
//                       >
//                         <FaEdit className="w-3.5 h-3.5" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// // ========== MAIN DASHBOARD CONTENT COMPONENT ==========
// function AgentDashboardContent() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     total: 0,
//     followUp: 0,
//     reminder: 0,
//     accepted: 0,
//     cancelled: 0
//   });
//   const [followUpOrders, setFollowUpOrders] = useState([]);
//   const [reminderOrders, setReminderOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);

//   // Month/Year filter states
//   const currentDate = new Date();
//   const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

//   // Generate month options
//   const monthOptions = [
//     { value: 1, label: 'January' },
//     { value: 2, label: 'February' },
//     { value: 3, label: 'March' },
//     { value: 4, label: 'April' },
//     { value: 5, label: 'May' },
//     { value: 6, label: 'June' },
//     { value: 7, label: 'July' },
//     { value: 8, label: 'August' },
//     { value: 9, label: 'September' },
//     { value: 10, label: 'October' },
//     { value: 11, label: 'November' },
//     { value: 12, label: 'December' }
//   ];

//   // Generate year options (current year and 5 years back)
//   const yearOptions = Array.from({ length: 6 }, (_, i) => currentDate.getFullYear() - i);

//   const fetchDashboardData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       // Build query params for month/year filter
//       const queryParams = new URLSearchParams();
//       if (selectedMonth) queryParams.append('month', selectedMonth);
//       if (selectedYear) queryParams.append('year', selectedYear);

//       const response = await fetch(`http://localhost:5000/api/orders/agent/dashboard?${queryParams}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         setStats(data.stats);
//         setFollowUpOrders(data.followUpOrders || []);
//         setReminderOrders(data.reminderOrders || []);
//       } else {
//         toast.error(data.error || 'Failed to load dashboard data');
//       }
//     } catch (error) {
//       console.error('Dashboard fetch error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   }, [router, selectedMonth, selectedYear]);

//   useEffect(() => {
//     fetchDashboardData();
//   }, [fetchDashboardData]);

//   const handleViewOrder = (order) => {
//     setSelectedOrder(order);
//     setShowDetailsModal(true);
//   };

//   const handleUpdateStatus = (order) => {
//     setSelectedOrder(order);
//     setShowStatusModal(true);
//   };

//   const handleStatusUpdate = () => {
//     fetchDashboardData();
//   };

//   return (
//     <div className="min-h-screen bg-[#E2E7EA]/20 pb-12 pt-6">
//       <div className="container mx-auto px-4 max-w-7xl">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-[#06B6D4] to-[#004767] rounded-xl flex items-center justify-center shadow-lg shadow-[#06B6D4]/25">
//               <FaHeadset className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-[#004767]" style={{ fontFamily: '"Playfair Display"' }}>
//                 Agent Dashboard
//               </h1>
//               <p className="text-sm text-[#64748B] mt-0.5">Overview of your orders and tasks</p>
//             </div>
//           </div>

//           {/* Month/Year Filter */}
//           <div className="flex items-center gap-3 bg-white rounded-xl border border-[#06B6D4]/30 px-3 py-2 shadow-sm">
//             <FaFilter className="w-4 h-4 text-[#64748B]" />
//             <select
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//               className="px-2 py-1 border-0 focus:ring-0 text-sm text-[#004767] bg-transparent cursor-pointer"
//             >
//               {monthOptions.map(month => (
//                 <option key={month.value} value={month.value}>{month.label}</option>
//               ))}
//             </select>
//             <select
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//               className="px-2 py-1 border-0 focus:ring-0 text-sm text-[#004767] bg-transparent cursor-pointer"
//             >
//               {yearOptions.map(year => (
//                 <option key={year} value={year}>{year}</option>
//               ))}
//             </select>
//             <div className="w-px h-6 bg-[#06B6D4]/20"></div>
//             <span className="text-xs text-[#64748B]">
//               {monthOptions.find(m => m.value === selectedMonth)?.label} {selectedYear}
//             </span>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
//           <StatCard 
//             title="Total Orders" 
//             value={stats.total} 
//             icon={<FaBox className="w-6 h-6 text-[#06B6D4]" />} 
//             color="bg-[#06B6D4]/10"
//           />
//           <StatCard 
//             title="Follow Up" 
//             value={stats.followUp} 
//             icon={<FaHeadset className="w-6 h-6 text-[#06B6D4]" />} 
//             color="bg-[#06B6D4]/10"
//             subtitle="Priority: High"
//           />
//           <StatCard 
//             title="Reminder" 
//             value={stats.reminder} 
//             icon={<FaClock className="w-6 h-6 text-[#FFC107]" />} 
//             color="bg-[#FFC107]/10"
//             subtitle="Priority: Medium"
//           />
//           <StatCard 
//             title="Accepted" 
//             value={stats.accepted} 
//             icon={<FaCheckCircle className="w-6 h-6 text-[#4CAF50]" />} 
//             color="bg-[#4CAF50]/10"
//           />
//           <StatCard 
//             title="Rejected" 
//             value={stats.cancelled} 
//             icon={<FaBan className="w-6 h-6 text-red-500" />} 
//             color="bg-red-50"
//           />
//         </div>

//         {/* Orders Tables */}
//         <div className="space-y-8">
//           {/* Follow Up Orders Table */}
//           <OrdersTable 
//             orders={followUpOrders}
//             title="Follow Up Orders"
//             statusType="follow_up"
//             onViewOrder={handleViewOrder}
//             onUpdateStatus={handleUpdateStatus}
//             loading={loading}
//           />

//           {/* Reminder Orders Table */}
//           <OrdersTable 
//             orders={reminderOrders}
//             title="Reminder Orders"
//             statusType="reminder"
//             onViewOrder={handleViewOrder}
//             onUpdateStatus={handleUpdateStatus}
//             loading={loading}
//           />
//         </div>
//       </div>

//       {/* Modals */}
//       <OrderDetailsModal 
//         isOpen={showDetailsModal} 
//         onClose={() => setShowDetailsModal(false)} 
//         order={selectedOrder}
//       />
      
//       {/* Status Update Modal - Reuse from orders page */}
//       {showStatusModal && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             className="relative bg-white rounded-2xl border border-[#06B6D4]/30 shadow-2xl w-full max-w-md overflow-hidden"
//           >
//             <div className="p-4 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <FaEdit className="w-5 h-5" />
//                   <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Update Order Status</h2>
//                 </div>
//                 <button onClick={() => setShowStatusModal(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//                   <FaTimes className="w-4 h-4" />
//                 </button>
//               </div>
//               <p className="text-xs text-white/80 mt-1">Order #{selectedOrder?.orderNumber || selectedOrder?._id?.slice(-8).toUpperCase()}</p>
//             </div>

//             <div className="p-4 space-y-3">
//               <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#06B6D4]/30">
//                 <p className="text-xs text-[#64748B]">This order needs your attention. Please review and update the status.</p>
//                 <div className="mt-2 flex items-center gap-2">
//                   <span className="text-xs text-[#004767]">Current Status:</span>
//                   <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${
//                     selectedOrder?.orderStatus === 'follow_up' 
//                       ? 'bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/30' 
//                       : 'bg-[#FFC107]/10 text-[#FFC107] border-[#FFC107]/30'
//                   }`}>
//                     {selectedOrder?.orderStatus === 'follow_up' ? <FaHeadset className="w-2.5 h-2.5" /> : <FaClock className="w-2.5 h-2.5" />}
//                     {selectedOrder?.orderStatus === 'follow_up' ? 'Follow Up' : 'Reminder'}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex gap-2">
//                 <button 
//                   onClick={() => {
//                     // Navigate to orders page with this order
//                     router.push(`/agent/orders?orderId=${selectedOrder?._id}`);
//                     setShowStatusModal(false);
//                   }}
//                   className="flex-1 px-3 py-2 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white rounded-xl hover:shadow-lg hover:shadow-[#06B6D4]/25 transition-all text-sm flex items-center justify-center gap-2"
//                 >
//                   <FaEdit className="w-3 h-3" />
//                   Update in Orders
//                 </button>
//                 <button 
//                   onClick={() => setShowStatusModal(false)}
//                   className="flex-1 px-3 py-2 border border-[#06B6D4]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ========== MAIN EXPORT WITH SUSPENSE ==========
// export default function AgentDashboard() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-[#E2E7EA]/20 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-[#06B6D4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500 text-sm">Loading dashboard...</p>
//         </div>
//       </div>
//     }>
//       <AgentDashboardContent />
//     </Suspense>
//   );
// }

'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  FaBox,
  FaHeadset,
  FaClock,
  FaCheckCircle,
  FaBan,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaSearch,
  FaEye,
  FaEdit,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaTimes,
  FaFileInvoice,
  FaMoneyBillWave,
  FaCreditCard,
  FaMobileAlt,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaTruck,
  FaCheck,
  FaPrint,
  FaInfoCircle,
  FaUndo,
  FaReply
} from 'react-icons/fa';
import {
  MdPendingActions,
  MdOutlinePendingActions
} from 'react-icons/md';
import { HiOutlineTrendingUp, HiOutlineTrendingDown } from 'react-icons/hi';

// ========== ORDER STATUSES ==========
const ORDER_STATUSES = [
  { value: 'follow_up', label: 'Follow Up', color: 'bg-blue-50 text-blue-600 border-blue-200', icon: FaHeadset },
  { value: 'reminder', label: 'Reminder', color: 'bg-yellow-50 text-yellow-600 border-yellow-200', icon: FaClock },
  { value: 'accepted', label: 'Accepted', color: 'bg-green-50 text-green-600 border-green-200', icon: FaCheckCircle },
  { value: 'cancelled', label: 'Rejected', color: 'bg-red-50 text-red-600 border-red-200', icon: FaBan },
];

const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  { value: 'paid', label: 'Paid', color: 'bg-green-50 text-green-600 border-green-200' },
  { value: 'failed', label: 'Failed', color: 'bg-red-50 text-red-600 border-red-200' },
  { value: 'refunded', label: 'Refunded', color: 'bg-gray-100 text-gray-700 border-gray-200' }
];

// ========== ORDER DETAILS MODAL ==========
const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
  const paymentInfo = PAYMENT_STATUSES?.find(p => p.value === order.paymentStatus) || { label: order.paymentStatus, color: 'bg-gray-100 text-gray-700 border-gray-200' };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-3xl my-8 overflow-hidden"
      >
        <div className="p-4 bg-blue-600 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaFileInvoice className="w-5 h-5" />
              <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Order Details</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order #{order.orderNumber || order._id?.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${statusInfo?.color || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
              {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
              Order: {statusInfo?.label || order.orderStatus}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${paymentInfo?.color || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
              <FaMoneyBillWave className="w-3 h-3" />
              Payment: {paymentInfo?.label || order.paymentStatus}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border bg-gray-100 text-gray-700 border-gray-200">
              <FaCreditCard className="w-3 h-3" />
              {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
            </span>
          </div>

          {/* Customer & Delivery Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
              <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
                <FaUser className="w-3.5 h-3.5 text-blue-600" />
                Customer Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-gray-500">Name:</span> <span className="text-gray-900 font-medium">{order.customerInfo?.fullName}</span></p>
                <p><span className="text-gray-500">Email:</span> <span className="text-gray-700">{order.customerInfo?.email}</span></p>
                <p><span className="text-gray-500">Phone:</span> <span className="text-gray-700">{order.customerInfo?.phone}</span></p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
              <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-blue-600" />
                Delivery Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-gray-500">Division:</span> <span className="font-medium text-gray-900">{order.customerInfo?.division || 'N/A'}</span></p>
                <p><span className="text-gray-500">District/City:</span> <span className="font-medium text-gray-900">{order.customerInfo?.city || 'N/A'}</span></p>
                <p><span className="text-gray-500">Address:</span> <span className="text-gray-700">{order.customerInfo?.address}</span></p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
              <FaBox className="w-3.5 h-3.5 text-blue-600" />
              Order Items
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-1.5 text-left text-gray-700">Product</th>
                    <th className="px-2 py-1.5 text-center text-gray-700">Qty</th>
                    <th className="px-2 py-1.5 text-right text-gray-700">Price</th>
                    <th className="px-2 py-1.5 text-right text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, idx) => {
                    const price = item.discountPrice || item.regularPrice;
                    const totalPrice = price * item.quantity;
                    return (
                      <tr key={idx} className="border-t border-gray-200">
                        <td className="px-2 py-2">
                          <div className="flex items-center gap-2">
                            <img 
                              src={item.image || 'https://via.placeholder.com/30'} 
                              alt={item.productName}
                              className="w-7 h-7 rounded object-cover border border-gray-200"
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
                            />
                            <p className="font-medium text-xs text-gray-900">{item.productName}</p>
                          </div>
                        </td>
                        <td className="px-2 py-2 text-center text-gray-700">{item.quantity}</td>
                        <td className="px-2 py-2 text-right text-gray-700">৳{price?.toFixed(2)}</td>
                        <td className="px-2 py-2 text-right font-medium text-blue-600">৳{totalPrice?.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="border-t border-gray-300">
                  <tr><td colSpan="3" className="px-2 py-1 text-right font-medium text-gray-700">Subtotal:</td><td className="px-2 py-1 text-right text-gray-700">৳{order.subtotal?.toFixed(2)}</td></tr>
                  <tr><td colSpan="3" className="px-2 py-1 text-right font-medium text-gray-700">Shipping:</td><td className="px-2 py-1 text-right text-gray-700">৳{order.shippingCost?.toFixed(2)}</td></tr>
                  <tr className="text-sm font-bold">
                    <td colSpan="3" className="px-2 py-1 text-right text-gray-700">Total:</td>
                    <td className="px-2 py-1 text-right text-blue-600">৳{order.total?.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2">
          <button onClick={() => window.print()} className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-white transition-colors flex items-center gap-1.5 text-sm">
            <FaPrint className="w-3 h-3" /> Print
          </button>
          <button onClick={onClose} className="px-3 py-1.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm shadow-md hover:shadow-lg">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== STAT CARD COMPONENT ==========
const StatCard = ({ title, value, icon, color, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

// ========== ORDERS TABLE COMPONENT ==========
const OrdersTable = ({ orders, title, statusType, onViewOrder, onUpdateStatus, loading }) => {
  const statusInfo = ORDER_STATUSES.find(s => s.value === statusType);
  const isFollowUp = statusType === 'follow_up';
  const isReminder = statusType === 'reminder';

  const getStatusBadge = (status) => {
    const info = ORDER_STATUSES.find(s => s.value === status);
    if (!info) return <span className="px-1.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200">{status}</span>;
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border ${info.color}`}>
        <info.icon className="w-2.5 h-2.5" />
        {info.label}
      </span>
    );
  };

  const getPaymentBadge = (status) => {
    const paymentInfo = PAYMENT_STATUSES?.find(p => p.value === status) || { label: status, color: 'bg-gray-100 text-gray-700 border-gray-200' };
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border ${paymentInfo.color}`}>
        <FaMoneyBillWave className="w-2.5 h-2.5" />
        {paymentInfo.label}
      </span>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-BD', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className={`px-5 py-3 border-b ${isFollowUp ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${isFollowUp ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'} flex items-center justify-center`}>
            {statusInfo?.icon && <statusInfo.icon className="w-4 h-4" />}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{title}</h2>
            <p className="text-xs text-gray-500">{orders.length} orders awaiting action</p>
          </div>
        </div>
        {isFollowUp && (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
            Priority
          </span>
        )}
        {isReminder && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">
            Follow-up
          </span>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-8 text-center text-gray-500 text-sm">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <FaBox className="w-6 h-6 text-gray-400" />
            </div>
            No {title.toLowerCase()} found
          </div>
        ) : (
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500">Order ID</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500">Customer</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500">Phone</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-gray-500">Total</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-500">Payment</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500">Date</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2.5 text-xs font-mono text-gray-900">{order.orderNumber || order._id.slice(-8).toUpperCase()}</td>
                  <td className="px-3 py-2.5 text-xs">
                    <div className="font-medium truncate max-w-[120px] text-gray-900">{order.customerInfo?.fullName}</div>
                    <div className="text-gray-500 text-xs truncate max-w-[120px]">{order.customerInfo?.email}</div>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-gray-700">{order.customerInfo?.phone}</td>
                  <td className="px-3 py-2.5 text-xs text-right font-bold text-blue-600">৳{order.total?.toFixed(2)}</td>
                  <td className="px-3 py-2.5 text-center">{getPaymentBadge(order.paymentStatus)}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-500 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                  <td className="px-3 py-2.5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button 
                        onClick={() => onViewOrder(order)} 
                        className="p-1.5 text-blue-600 hover:bg-gray-100 rounded-lg transition-colors" 
                        title="View Details"
                      >
                        <FaEye className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => onUpdateStatus(order)} 
                        className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" 
                        title="Update Status"
                      >
                        <FaEdit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// ========== MAIN DASHBOARD CONTENT COMPONENT ==========
function AgentDashboardContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    followUp: 0,
    reminder: 0,
    accepted: 0,
    cancelled: 0
  });
  const [followUpOrders, setFollowUpOrders] = useState([]);
  const [reminderOrders, setReminderOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Month/Year filter states
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Generate month options
  const monthOptions = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  // Generate year options (current year and 5 years back)
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentDate.getFullYear() - i);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // Build query params for month/year filter
      const queryParams = new URLSearchParams();
      if (selectedMonth) queryParams.append('month', selectedMonth);
      if (selectedYear) queryParams.append('year', selectedYear);

      const response = await fetch(`http://localhost:5000/api/orders/agent/dashboard?${queryParams}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
        setFollowUpOrders(data.followUpOrders || []);
        setReminderOrders(data.reminderOrders || []);
      } else {
        toast.error(data.error || 'Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, [router, selectedMonth, selectedYear]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setShowStatusModal(true);
  };

  const handleStatusUpdate = () => {
    fetchDashboardData();
  };

  return (
    <div className="min-h-screen bg-white pb-12 pt-6">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <FaHeadset className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: '"Playfair Display"' }}>
                Agent Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Overview of your orders and tasks</p>
            </div>
          </div>

          {/* Month/Year Filter */}
          <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 px-3 py-2 shadow-sm">
            <FaFilter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="px-2 py-1 border-0 focus:ring-0 text-sm text-gray-900 bg-transparent cursor-pointer"
            >
              {monthOptions.map(month => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-2 py-1 border-0 focus:ring-0 text-sm text-gray-900 bg-transparent cursor-pointer"
            >
              {yearOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="w-px h-6 bg-gray-200"></div>
            <span className="text-xs text-gray-500">
              {monthOptions.find(m => m.value === selectedMonth)?.label} {selectedYear}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard 
            title="Total Orders" 
            value={stats.total} 
            icon={<FaBox className="w-6 h-6 text-blue-600" />} 
            color="bg-blue-50"
          />
          <StatCard 
            title="Follow Up" 
            value={stats.followUp} 
            icon={<FaHeadset className="w-6 h-6 text-blue-600" />} 
            color="bg-blue-50"
            subtitle="Priority: High"
          />
          <StatCard 
            title="Reminder" 
            value={stats.reminder} 
            icon={<FaClock className="w-6 h-6 text-yellow-500" />} 
            color="bg-yellow-50"
            subtitle="Priority: Medium"
          />
          <StatCard 
            title="Accepted" 
            value={stats.accepted} 
            icon={<FaCheckCircle className="w-6 h-6 text-green-500" />} 
            color="bg-green-50"
          />
          <StatCard 
            title="Rejected" 
            value={stats.cancelled} 
            icon={<FaBan className="w-6 h-6 text-red-500" />} 
            color="bg-red-50"
          />
        </div>

        {/* Orders Tables */}
        <div className="space-y-8">
          {/* Follow Up Orders Table */}
          <OrdersTable 
            orders={followUpOrders}
            title="Follow Up Orders"
            statusType="follow_up"
            onViewOrder={handleViewOrder}
            onUpdateStatus={handleUpdateStatus}
            loading={loading}
          />

          {/* Reminder Orders Table */}
          <OrdersTable 
            orders={reminderOrders}
            title="Reminder Orders"
            statusType="reminder"
            onViewOrder={handleViewOrder}
            onUpdateStatus={handleUpdateStatus}
            loading={loading}
          />
        </div>
      </div>

      {/* Modals */}
      <OrderDetailsModal 
        isOpen={showDetailsModal} 
        onClose={() => setShowDetailsModal(false)} 
        order={selectedOrder}
      />
      
      {/* Status Update Modal - Reuse from orders page */}
      {showStatusModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="p-4 bg-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaEdit className="w-5 h-5" />
                  <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Update Order Status</h2>
                </div>
                <button onClick={() => setShowStatusModal(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white/80 mt-1">Order #{selectedOrder?.orderNumber || selectedOrder?._id?.slice(-8).toUpperCase()}</p>
            </div>

            <div className="p-4 space-y-3">
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <p className="text-xs text-gray-500">This order needs your attention. Please review and update the status.</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-700">Current Status:</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${
                    selectedOrder?.orderStatus === 'follow_up' 
                      ? 'bg-blue-50 text-blue-600 border-blue-200' 
                      : 'bg-yellow-50 text-yellow-600 border-yellow-200'
                  }`}>
                    {selectedOrder?.orderStatus === 'follow_up' ? <FaHeadset className="w-2.5 h-2.5" /> : <FaClock className="w-2.5 h-2.5" />}
                    {selectedOrder?.orderStatus === 'follow_up' ? 'Follow Up' : 'Reminder'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    // Navigate to orders page with this order
                    router.push(`/agent/orders?orderId=${selectedOrder?._id}`);
                    setShowStatusModal(false);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <FaEdit className="w-3 h-3" />
                  Update in Orders
                </button>
                <button 
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 px-3 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ========== MAIN EXPORT WITH SUSPENSE ==========
export default function AgentDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    }>
      <AgentDashboardContent />
    </Suspense>
  );
}