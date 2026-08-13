
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { toast } from 'sonner';
// import { motion, AnimatePresence } from 'framer-motion';

// import { 
//   FaBox,
//   FaEye,
//   FaClock,
//   FaMoneyBillWave,
//   FaUser,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaPrint,
//   FaChevronLeft,
//   FaChevronRight,
//   FaSpinner,
//   FaShippingFast,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaBan,
//   FaFileInvoice,
//   FaTruck,
//   FaCheckDouble,
//   FaCreditCard,
//   FaMobileAlt,
//   FaSearch,
//   FaFilter,
//   FaTimes,
//   FaShoppingBag,
//   FaArrowRight,
//   FaDownload,
//   FaHeart,
//   FaStar,
//   FaEnvelope,
//   FaPhone,
//   FaWhatsapp,
//   FaHome,
//   FaCity,
//   FaMapPin,
//   FaShieldAlt,
//   FaExternalLinkAlt,
//   FaExclamationTriangle
// } from 'react-icons/fa';
// import { generateInvoicePDF } from '@/utils/invoicePDF';

// // ========== ORDER STATUSES - POWER BANK THEME ==========
// const ORDER_STATUSES = [
//   { value: 'placed', label: 'Placed', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FaClock },
//   { value: 'confirmed', label: 'Confirmed', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', icon: FaCheckCircle },
//   { value: 'processing', label: 'Courier Assigned', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: FaSpinner },
//   { value: 'shipped', label: 'Shipped', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: FaShippingFast },
//   { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: FaTruck },
//   { value: 'delivered', label: 'Delivered', color: 'bg-green-50 text-green-700 border-green-200', icon: FaCheckDouble },
//   { value: 'cancelled', label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200', icon: FaBan }
// ];

// const PAYMENT_STATUSES = [
//   { value: 'pending', label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
//   { value: 'paid', label: 'Paid', color: 'bg-green-50 text-green-700 border-green-200' },
//   { value: 'failed', label: 'Failed', color: 'bg-red-50 text-red-700 border-red-200' },
//   { value: 'refunded', label: 'Refunded', color: 'bg-gray-50 text-gray-700 border-gray-200' }
// ];

// // ========== DELIVERY STATUSES ==========
// const DELIVERY_STATUSES = [
//   { value: 'pending', label: 'Pending', color: 'bg-gray-100 text-gray-800' },
//   { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800' },
//   { value: 'picked_up', label: 'Picked Up', color: 'bg-cyan-100 text-cyan-800' },
//   { value: 'in_transit', label: 'In Transit', color: 'bg-purple-100 text-purple-800' },
//   { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-orange-100 text-orange-800' },
//   { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
//   { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
//   { value: 'failed', label: 'Failed', color: 'bg-red-200 text-red-900' },
//   { value: 'returned', label: 'Returned', color: 'bg-gray-200 text-gray-800' }
// ];

// // ========== CANCEL ORDER MODAL ==========
// const CancelOrderModal = ({ isOpen, onClose, order, onCancel }) => {
//   const [cancellationReason, setCancellationReason] = useState('');
//   const [loading, setLoading] = useState(false);

//   if (!isOpen) return null;

//   const handleSubmit = async () => {
//     if (!cancellationReason.trim()) {
//       toast.error('Please provide a cancellation reason');
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/orders/${order._id}/cancel`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ cancellationReason })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Order cancelled successfully');
//         onCancel();
//         onClose();
//       } else {
//         toast.error(data.error || 'Failed to cancel order');
//       }
//     } catch (error) {
//       console.error('Cancel order error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-blue-600/30"
//       >
//         <div className="p-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
//           <div className="flex items-center gap-2">
//             <FaBan className="w-5 h-5" />
//             <h2 className="text-lg font-bold">Cancel Order</h2>
//           </div>
//         </div>

//         <div className="p-5">
//           <p className="text-blue-800 text-sm mb-3">
//             Are you sure you want to cancel this order?
//           </p>
//           <p className="text-xs text-[#64748B] mb-4">
//             Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}
//           </p>
          
//           <div>
//             <label className="block text-xs font-medium text-blue-800 mb-1">
//               Cancellation Reason <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               value={cancellationReason}
//               onChange={(e) => setCancellationReason(e.target.value)}
//               rows="3"
//               placeholder="Please tell us why you're cancelling this order..."
//               className="w-full px-3 py-2 text-sm border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-blue-800 placeholder:text-[#64748B]"
//             />
//           </div>
//         </div>

//         <div className="p-4 border-t border-blue-600/30 bg-[#E2E7EA]/20 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-3 py-2 border border-blue-600/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
//             Close
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
//           >
//             {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaBan className="w-3 h-3" />}
//             Confirm Cancel
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== TRACKING MODAL ==========
// // const TrackingModal = ({ isOpen, onClose, trackingInfo, order }) => {
// //   if (!isOpen) return null;

// //   const displayData = trackingInfo || order?.deliveryService || {};

// //   return (
// //     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.95 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         exit={{ opacity: 0, scale: 0.95 }}
// //         className="relative bg-white rounded-2xl border border-blue-600/30 shadow-2xl w-full max-w-md overflow-hidden"
// //       >
// //         <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-2">
// //               <FaTruck className="w-5 h-5" />
// //               <h2 className="text-lg font-bold">Tracking Information</h2>
// //             </div>
// //             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
// //               <FaTimes className="w-4 h-4" />
// //             </button>
// //           </div>
// //           <p className="text-xs text-white/80 mt-1">
// //             Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}
// //           </p>
// //         </div>

// //         <div className="p-4 space-y-3">
// //           <div className="bg-[#E2E7EA]/30 rounded-xl p-3">
// //             <div className="space-y-2 text-sm">
// //               <div className="flex justify-between">
// //                 <span className="text-[#64748B]">Tracking Number:</span>
// //                 <span className="font-mono text-blue-800 font-medium">
// //                   {displayData?.trackingNumber || 'N/A'}
// //                 </span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="text-[#64748B]">Courier:</span>
// //                 <span className="text-blue-800 font-medium">
// //                   {displayData?.courierName || 'N/A'}
// //                 </span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="text-[#64748B]">Status:</span>
// //                 <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
// //                   DELIVERY_STATUSES.find(s => s.value === displayData?.deliveryStatus)?.color || 'bg-[#E2E7EA]'
// //                 }`}>
// //                   {DELIVERY_STATUSES.find(s => s.value === displayData?.deliveryStatus)?.label || displayData?.deliveryStatus || 'N/A'}
// //                 </span>
// //               </div>
// //               {displayData?.trackingUrl && (
// //                 <div className="flex justify-between">
// //                   <span className="text-[#64748B]">Track Link:</span>
// //                   <a
// //                     href={displayData.trackingUrl}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="text-blue-600 hover:underline flex items-center gap-1"
// //                   >
// //                     <FaExternalLinkAlt className="w-3 h-3" />
// //                     Track on {displayData?.courierName || 'Courier'}
// //                   </a>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {displayData?.history && displayData.history.length > 0 && (
// //             <div>
// //               <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
// //                 <FaClock className="w-4 h-4 text-blue-600" />
// //                 Tracking History
// //               </h3>
// //               <div className="space-y-2 max-h-[200px] overflow-y-auto">
// //                 {displayData.history.map((entry, index) => (
// //                   <div key={index} className="flex items-start gap-3 text-xs border-b border-blue-600/10 pb-2 last:border-0">
// //                     <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
// //                     <div>
// //                       <p className="text-blue-800">{entry.message || entry.status}</p>
// //                       <p className="text-[#64748B] text-[10px]">
// //                         {entry.timestamp ? new Date(entry.timestamp).toLocaleString('en-BD', {
// //                           day: '2-digit',
// //                           month: 'short',
// //                           year: 'numeric',
// //                           hour: '2-digit',
// //                           minute: '2-digit'
// //                         }) : 'N/A'}
// //                       </p>
// //                       {entry.location && (
// //                         <p className="text-[#64748B] text-[10px]">📍 {entry.location}</p>
// //                       )}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {displayData?.error && (
// //             <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
// //               <p className="text-xs text-yellow-700">
// //                 <FaExclamationTriangle className="inline w-3 h-3 mr-1" />
// //                 {displayData.error}
// //               </p>
// //             </div>
// //           )}
// //         </div>

// //         <div className="p-4 border-t border-blue-600/30 bg-[#E2E7EA]/20 flex justify-end">
// //           <button onClick={onClose} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-colors text-sm">
// //             Close
// //           </button>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // ========== TRACKING MODAL - WITH FULL HISTORY ==========
// const TrackingModal = ({ isOpen, onClose, trackingInfo, order }) => {
//   if (!isOpen) return null;

//   // Use trackingInfo if available, otherwise fallback to order.deliveryService
//   const displayData = trackingInfo || order?.deliveryService || {};
  
//   // Get status history from deliveryStatusHistory
//   const statusHistory = displayData.history || displayData.deliveryStatusHistory || [];

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="relative bg-white rounded-2xl border border-blue-600/30 shadow-2xl w-full max-w-md overflow-hidden"
//       >
//         <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaTruck className="w-5 h-5" />
//               <h2 className="text-lg font-bold">Tracking Information</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">
//             Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}
//           </p>
//         </div>

//         <div className="p-4 space-y-3">
//           {/* Current Status */}
//           <div className="bg-[#E2E7EA]/30 rounded-xl p-3">
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-[#64748B]">Tracking Number:</span>
//                 <span className="font-mono text-blue-800 font-medium">
//                   {displayData?.trackingNumber || 'N/A'}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-[#64748B]">Courier:</span>
//                 <span className="text-blue-800 font-medium">
//                   {displayData?.courierName || 'N/A'}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-[#64748B]">Current Status:</span>
//                 <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
//                   DELIVERY_STATUSES.find(s => s.value === displayData?.deliveryStatus)?.color || 'bg-[#E2E7EA]'
//                 }`}>
//                   {DELIVERY_STATUSES.find(s => s.value === displayData?.deliveryStatus)?.label || displayData?.deliveryStatus || 'N/A'}
//                 </span>
//               </div>
//               {displayData?.trackingUrl && (
//                 <div className="flex justify-between">
//                   <span className="text-[#64748B]">Track Link:</span>
//                   <a
//                     href={displayData.trackingUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:underline flex items-center gap-1"
//                   >
//                     <FaExternalLinkAlt className="w-3 h-3" />
//                     Track on {displayData?.courierName || 'Courier'}
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ✅ Status History Timeline */}
//           {statusHistory && statusHistory.length > 0 && (
//             <div>
//               <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
//                 <FaClock className="w-4 h-4 text-blue-600" />
//                 Tracking History
//               </h3>
//               <div className="space-y-2 max-h-[200px] overflow-y-auto">
//                 {statusHistory.map((entry, index) => {
//                   const statusLabel = DELIVERY_STATUSES.find(s => s.value === entry.status)?.label || entry.status;
//                   const isLatest = index === statusHistory.length - 1;
                  
//                   return (
//                     <div key={index} className={`flex items-start gap-3 text-xs border-b border-blue-600/10 pb-2 last:border-0 ${isLatest ? 'bg-blue-600/5 p-2 rounded-lg' : ''}`}>
//                       <div className={`w-2 h-2 rounded-full ${isLatest ? 'bg-blue-600' : 'bg-[#94A3B8]'} mt-1.5 flex-shrink-0`}></div>
//                       <div>
//                         <div className="flex items-center gap-2">
//                           <span className="font-medium text-blue-800">{statusLabel}</span>
//                           {isLatest && <span className="text-[10px] text-blue-600 font-medium">(Current)</span>}
//                         </div>
//                         {entry.message && <p className="text-[#64748B] mt-0.5">{entry.message}</p>}
//                         <p className="text-[#94A3B8] text-[10px] mt-0.5">
//                           {entry.timestamp ? new Date(entry.timestamp).toLocaleString('en-BD', {
//                             day: '2-digit',
//                             month: 'short',
//                             year: 'numeric',
//                             hour: '2-digit',
//                             minute: '2-digit'
//                           }) : 'N/A'}
//                         </p>
//                         {entry.location && (
//                           <p className="text-[#94A3B8] text-[10px]">📍 {entry.location}</p>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Show error message if tracking failed */}
//           {displayData?.error && (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
//               <p className="text-xs text-yellow-700">
//                 <FaExclamationTriangle className="inline w-3 h-3 mr-1" />
//                 {displayData.error}
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t border-blue-600/30 bg-[#E2E7EA]/20 flex justify-end">
//           <button onClick={onClose} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-colors text-sm">
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ORDER DETAILS MODAL ==========
// // ========== ORDER DETAILS MODAL (CUSTOMER VERSION) - UPDATED ==========
// const OrderDetailsModal = ({ isOpen, onClose, order, onCancelOrder, onDownloadInvoice, onTrackDelivery }) => {
//   const [isClient, setIsClient] = useState(false);
//   const [downloading, setDownloading] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isOpen || !order) return null;

//   const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
//   const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);
//   const isCancelled = order.orderStatus === 'cancelled';
//   const isDelivered = order.orderStatus === 'delivered';
//   const canCancel = order.orderStatus === 'placed' && order.paymentMethod === 'cod';
//   const hasDelivery = order.deliveryService?.courierOrderId;

//   // ========== GROUP ITEMS BY PRODUCT WITH COLORS ==========
//   const getGroupedItems = () => {
//     if (!order.items) return [];
//     const grouped = {};
//     order.items.forEach(item => {
//       const key = item.productId?.toString() || item._id?.toString() || Math.random().toString();
//       if (!grouped[key]) {
//         grouped[key] = {
//           ...item,
//           colors: []
//         };
//       }
//       // Check if item has colors array
//       if (item.colors && item.colors.length > 0) {
//         item.colors.forEach(colorObj => {
//           grouped[key].colors.push({
//             color: colorObj.color,
//             quantity: colorObj.quantity,
//             price: colorObj.price || item.discountPrice || item.regularPrice
//           });
//         });
//       } 
//       // Check if item has selectedColor
//       else if (item.selectedColor) {
//         grouped[key].colors.push({
//           color: item.selectedColor,
//           quantity: item.quantity,
//           price: item.discountPrice || item.regularPrice
//         });
//       } 
//       // Fallback: no color info
//       else {
//         grouped[key].colors.push({
//           color: null,
//           quantity: item.quantity,
//           price: item.discountPrice || item.regularPrice
//         });
//       }
//     });
//     return Object.values(grouped);
//   };

//   const groupedItems = getGroupedItems();

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     const d = new Date(date);
//     return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
//   };

//   const formatDateLong = (date) => {
//     if (!date) return 'N/A';
//     const d = new Date(date);
//     return d.toLocaleDateString('en-BD', {
//       day: '2-digit',
//       month: 'long',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const handleDownload = async () => {
//     setDownloading(true);
//     try {
//       await onDownloadInvoice(order);
//     } finally {
//       setDownloading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 20 }}
//         className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden border border-blue-600/30"
//       >
//         <div className="p-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white sticky top-0">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaFileInvoice className="w-5 h-5" />
//               <h2 className="text-lg font-bold">Order Details</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimesCircle className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order Id: {order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-5 max-h-[60vh] overflow-y-auto">
//           <div className="flex flex-wrap gap-2 mb-5">
//             <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusInfo?.color || 'bg-[#E2E7EA] text-blue-800 border-blue-600/30'}`}>
//               {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
//               {statusInfo?.label || order.orderStatus}
//             </div>
//             <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${paymentInfo?.color || 'bg-[#E2E7EA] text-blue-800 border-blue-600/30'}`}>
//               <FaMoneyBillWave className="w-3 h-3" />
//               {paymentInfo?.label || order.paymentStatus}
//             </div>
//             {order.paymentMethod === 'cod' && (
//               <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-blue-600/10 text-blue-600 border-blue-600/30">
//                 <FaMoneyBillWave className="w-3 h-3" />
//                 Cash on Delivery
//               </div>
//             )}
//             {order.paymentMethod === 'online' && (
//               <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200">
//                 <FaCreditCard className="w-3 h-3" />
//                 Online Payment
//               </div>
//             )}
//             {hasDelivery && (
//               <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-blue-600/10 text-blue-600 border-blue-600/30">
//                 <FaTruck className="w-3 h-3" />
//                 {order.deliveryService.courierName}
//               </div>
//             )}
//           </div>

//           <div className="flex flex-wrap gap-3 mb-5">
//             {canCancel && (
//               <button
//                 onClick={() => {
//                   onClose();
//                   onCancelOrder();
//                 }}
//                 className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium"
//               >
//                 <FaBan className="w-4 h-4" />
//                 Cancel Order
//               </button>
//             )}
//             {hasDelivery && (
//               <button
//                 onClick={() => {
//                   onClose();
//                   onTrackDelivery(order);
//                 }}
//                 className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-[#0891B2] transition-colors text-sm font-medium"
//               >
//                 <FaTruck className="w-4 h-4" />
//                 Track Delivery
//               </button>
//             )}
//             <button
//               onClick={handleDownload}
//               disabled={downloading}
//               className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-all text-sm font-medium disabled:opacity-50"
//             >
//               {downloading ? (
//                 <>
//                   <FaSpinner className="w-4 h-4 animate-spin" />
//                   Generating...
//                 </>
//               ) : (
//                 <>
//                   <FaDownload className="w-4 h-4" />
//                   Download Invoice
//                 </>
//               )}
//             </button>
//           </div>

//           {isDelivered && order.deliveredAt && isClient && (
//             <div className="mb-5 bg-green-50 border-l-4 border-green-500 rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaCheckDouble className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-green-700">Order Delivered</h4>
//                   <p className="text-xs text-green-600 mt-1">
//                     <span className="font-medium">Delivered on:</span> {formatDateLong(order.deliveredAt)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {hasDelivery && (
//             <div className="mb-5 bg-blue-600/5 border border-blue-600/20 rounded-xl p-3">
//               <h4 className="text-sm font-semibold text-blue-800 flex items-center gap-2 mb-2">
//                 <FaTruck className="w-4 h-4 text-blue-600" />
//                 Delivery Information
//               </h4>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#64748B]">Courier:</span> <span className="font-medium text-blue-800">{order.deliveryService.courierName}</span></p>
//                 <p><span className="text-[#64748B]">Tracking Number:</span> <span className="font-mono text-blue-600">{order.deliveryService.trackingNumber}</span></p>
//                 <p><span className="text-[#64748B]">Status:</span> 
//                   <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ml-1 ${
//                     DELIVERY_STATUSES.find(s => s.value === order.deliveryService.deliveryStatus)?.color || 'bg-[#E2E7EA]'
//                   }`}>
//                     {DELIVERY_STATUSES.find(s => s.value === order.deliveryService.deliveryStatus)?.label || order.deliveryService.deliveryStatus}
//                   </span>
//                 </p>
//                 {order.deliveryService.trackingUrl && (
//                   <p>
//                     <span className="text-[#64748B]">Track Link:</span>
//                     <a
//                       href={order.deliveryService.trackingUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:underline ml-1"
//                     >
//                       <FaExternalLinkAlt className="inline w-3 h-3 mr-1" />
//                       Track on {order.deliveryService.courierName}
//                     </a>
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}

//           {isCancelled && order.cancellationReason && (
//             <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaBan className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-red-700">Order Cancelled</h4>
//                   <p className="text-xs text-red-600 mt-1">
//                     <span className="font-medium">Reason:</span> {order.cancellationReason}
//                   </p>
//                   {order.cancelledAt && (
//                     <p className="text-xs text-red-500 mt-1">
//                       <span className="font-medium">Cancelled on:</span> {formatDate(order.cancelledAt)}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//             <div className="bg-[#E2E7EA]/50 rounded-xl p-4 border border-blue-600/30">
//               <h3 className="font-semibold text-blue-800 text-sm mb-2 flex items-center gap-1.5">
//                 <FaUser className="w-3.5 h-3.5 text-blue-600" />
//                 Customer Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#64748B]">Name:</span> <span className="text-blue-800">{order.customerInfo?.fullName}</span></p>
//                 <p><span className="text-[#64748B]">Email:</span> <span className="text-blue-800">{order.customerInfo?.email}</span></p>
//                 <p><span className="text-[#64748B]">Phone:</span> <span className="text-blue-800">{order.customerInfo?.phone}</span></p>
//                 <p><span className="text-[#64748B]">Address:</span> <span className="text-blue-800">{order.customerInfo?.address}</span></p>
//               </div>
//             </div>

//             <div className="bg-[#E2E7EA]/50 rounded-xl p-4 border border-blue-600/30">
//               <h3 className="font-semibold text-blue-800 text-sm mb-2 flex items-center gap-1.5">
//                 <FaMapMarkerAlt className="w-3.5 h-3.5 text-blue-600" />
//                 Delivery Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#64748B]">Division:</span> <span className="font-medium text-blue-800">{order.customerInfo?.division || 'N/A'}</span></p>
//                 <p><span className="text-[#64748B]">District/City:</span> <span className="font-medium text-blue-800">{order.customerInfo?.city || 'N/A'}</span></p>
//                 <p><span className="text-[#64748B]">Upazila/Thana:</span> <span className="font-medium text-blue-800">{order.customerInfo?.zone || 'N/A'}</span></p>
//                 {order.customerInfo?.area && (
//                   <p><span className="text-[#64748B]">Union/Area:</span> <span className="font-medium text-blue-800">{order.customerInfo.area}</span></p>
//                 )}
//                 {order.trackingNumber && (
//                   <p><span className="text-[#64748B]">Tracking:</span> <span className="font-mono text-blue-600">{order.trackingNumber}</span></p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ========== ORDER ITEMS WITH COLORS - UPDATED ========== */}
//           <div className="mb-5">
//             <h3 className="font-semibold text-blue-800 text-sm mb-2 flex items-center gap-1.5">
//               <FaBox className="w-3.5 h-3.5 text-blue-600" />
//               Order Items
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs">
//                 <thead className="bg-[#E2E7EA]/50">
//                   <tr>
//                     <th className="px-3 py-2 text-left text-blue-800">Product</th>
//                     <th className="px-3 py-2 text-center text-blue-800">Color</th>
//                     <th className="px-3 py-2 text-center text-blue-800">Qty</th>
//                     <th className="px-3 py-2 text-right text-blue-800">Price</th>
//                     <th className="px-3 py-2 text-right text-blue-800">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {groupedItems.map((group, idx) => {
//                     const hasMultipleColors = group.colors && group.colors.length > 1;
                    
//                     return group.colors.map((colorObj, colorIdx) => {
//                       const isFirst = colorIdx === 0;
//                       const price = colorObj.price || group.discountPrice || group.regularPrice;
//                       const totalPrice = price * colorObj.quantity;
                      
//                       return (
//                         <tr key={`${idx}-${colorIdx}`} className="border-t border-blue-600/20">
//                           {isFirst && (
//                             <td className="px-3 py-2" rowSpan={hasMultipleColors ? group.colors.length : 1}>
//                               <div className="flex items-center gap-3">
//                                 <img 
//                                   src={group.image || 'https://via.placeholder.com/40'} 
//                                   alt={group.productName}
//                                   className="w-10 h-10 rounded-lg object-cover border border-blue-600/30"
//                                   onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
//                                 />
//                                 <p className="font-medium text-sm text-blue-800">{group.productName}</p>
//                               </div>
//                             </td>
//                           )}
//                           <td className="px-3 py-2 text-center">
//                             {colorObj.color ? (
//                               <div className="flex items-center justify-center">
//                                 <div 
//                                   className="w-6 h-6 rounded-full border border-blue-600/30 shadow-sm"
//                                   style={{ backgroundColor: colorObj.color }}
//                                   title={colorObj.color}
//                                 />
//                               </div>
//                             ) : (
//                               <span className="text-xs text-[#64748B]">-</span>
//                             )}
//                           </td>
//                           <td className="px-3 py-2 text-center text-blue-800">{colorObj.quantity}</td>
//                           <td className="px-3 py-2 text-right text-blue-800">৳{price.toFixed(2)}</td>
//                           <td className="px-3 py-2 text-right font-medium text-blue-600">৳{totalPrice.toFixed(2)}</td>
//                         </tr>
//                       );
//                     });
//                   })}
//                 </tbody>
//                 <tfoot className="border-t border-blue-600/30">
//                   <tr>
//                     <td colSpan="4" className="px-3 py-1.5 text-right font-medium text-blue-800">Subtotal:</td>
//                     <td className="px-3 py-1.5 text-right text-blue-800">৳{order.subtotal?.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td colSpan="4" className="px-3 py-1.5 text-right font-medium text-blue-800">Shipping:</td>
//                     <td className="px-3 py-1.5 text-right text-blue-800">৳{order.shippingCost?.toFixed(2)}</td>
//                   </tr>
//                   {order.discount > 0 && (
//                     <tr>
//                       <td colSpan="4" className="px-3 py-1.5 text-right font-medium text-green-600">Discount:</td>
//                       <td className="px-3 py-1.5 text-right text-green-600">- ৳{order.discount.toFixed(2)}</td>
//                     </tr>
//                   )}
//                   <tr className="text-sm font-bold">
//                     <td colSpan="4" className="px-3 py-1.5 text-right text-blue-800">Total:</td>
//                     <td className="px-3 py-1.5 text-right text-blue-600">৳{order.total?.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>

//           {(order.couponCode || order.deliveryNote) && (
//             <div className="bg-[#E2E7EA]/50 rounded-xl p-4 border border-blue-600/30">
//               <h3 className="font-semibold text-blue-800 text-sm mb-1.5">Additional Information</h3>
//               {order.couponCode && <p className="text-xs"><span className="text-[#64748B]">Coupon Applied:</span> <span className="text-blue-600 font-medium">{order.couponCode}</span></p>}
//               {order.deliveryNote && <p className="text-xs"><span className="text-[#64748B]">Delivery Note:</span> <span className="text-blue-800">{order.deliveryNote}</span></p>}
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t border-blue-600/30 bg-[#E2E7EA]/20 flex justify-end gap-2">
//           <button onClick={onClose} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-all text-sm font-medium">
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== MAIN CUSTOMER ORDERS PAGE ==========
// export default function CustomerOrdersPage() {
//   const router = useRouter();
//   const [isClient, setIsClient] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [showTrackingModal, setShowTrackingModal] = useState(false);
//   const [trackingInfo, setTrackingInfo] = useState(null);
//   const [trackingLoading, setTrackingLoading] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
//   const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
//   const [downloadingOrders, setDownloadingOrders] = useState({});

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: 10
//       });
//       if (searchTerm) queryParams.append('search', searchTerm);
//       if (statusFilter) queryParams.append('orderStatus', statusFilter);
//       if (paymentStatusFilter) queryParams.append('paymentStatus', paymentStatusFilter);
//       if (paymentMethodFilter) queryParams.append('paymentMethod', paymentMethodFilter);

//       const response = await fetch(`http://localhost:5000/api/orders?${queryParams}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();
//       if (data.success) {
//         setOrders(data.data);
//         setTotalPages(data.pagination.pages);
//         setTotalOrders(data.pagination.total);
//       } else {
//         toast.error(data.error || 'Failed to fetch orders');
//       }
//     } catch (error) {
//       console.error('Fetch orders error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, searchTerm, statusFilter, paymentStatusFilter, paymentMethodFilter, router]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const handleCancelOrder = () => {
//     fetchOrders();
//   };

//   const handleDownloadInvoice = async (order) => {
//     setDownloadingOrders(prev => ({ ...prev, [order._id]: true }));
//     try {
//       await generateInvoicePDF(order);
//       toast.success('Invoice downloaded successfully!');
//     } catch (error) {
//       console.error('Download error:', error);
//       toast.error('Failed to download invoice');
//     } finally {
//       setDownloadingOrders(prev => ({ ...prev, [order._id]: false }));
//     }
//   };

//   // ========== UPDATE ORDER DELIVERY STATUS ==========
// // ========== UPDATE ORDER DELIVERY STATUS ==========
// const updateOrderDeliveryStatus = async (orderId, status, message, location) => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${orderId}/delivery-status`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({ 
//         status, 
//         message: message || `Status updated to ${status}`,
//         location: location || ''
//       })
//     });

//     const data = await response.json();
//     if (data.success) {
//       // ✅ Check if payment status was updated
//       if (data.data?.paymentStatus === 'paid') {
//         toast.success('✅ Order delivered! Payment marked as Paid.');
//       }
      
//       // Refresh orders to get updated status
//       fetchOrders();
//       return data;
//     } else {
//       console.error('Update delivery status failed:', data.error);
//       return null;
//     }
//   } catch (error) {
//     console.error('Update delivery status error:', error);
//     return null;
//   }
// };

//   // const handleTrackDelivery = async (order) => {
//   //   if (!order.deliveryService?.trackingNumber) {
//   //     toast.error('No tracking number available');
//   //     return;
//   //   }

//   //   setTrackingLoading(prev => ({ ...prev, [order._id]: true }));

//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     const response = await fetch(
//   //       `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/couriers/${order.deliveryService.courierSlug}/track/${order.deliveryService.trackingNumber}`,
//   //       {
//   //         headers: { 'Authorization': `Bearer ${token}` }
//   //       }
//   //     );

//   //     const data = await response.json();
      
//   //     if (data.success) {
//   //       setTrackingInfo({
//   //         ...data.data,
//   //         trackingNumber: order.deliveryService.trackingNumber,
//   //         courierName: order.deliveryService.courierName,
//   //         courierSlug: order.deliveryService.courierSlug,
//   //         trackingUrl: order.deliveryService.trackingUrl,
//   //         deliveryStatus: order.deliveryService.deliveryStatus
//   //       });
//   //       setShowTrackingModal(true);
//   //     } else {
//   //       setTrackingInfo({
//   //         trackingNumber: order.deliveryService.trackingNumber,
//   //         courierName: order.deliveryService.courierName,
//   //         courierSlug: order.deliveryService.courierSlug,
//   //         trackingUrl: order.deliveryService.trackingUrl,
//   //         deliveryStatus: order.deliveryService.deliveryStatus,
//   //         history: [],
//   //         message: data.message || 'Tracking info not available'
//   //       });
//   //       setShowTrackingModal(true);
//   //       toast.warning('Showing tracking info.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Track delivery error:', error);
//   //     setTrackingInfo({
//   //       trackingNumber: order.deliveryService.trackingNumber,
//   //       courierName: order.deliveryService.courierName,
//   //       courierSlug: order.deliveryService.courierSlug,
//   //       trackingUrl: order.deliveryService.trackingUrl,
//   //       deliveryStatus: order.deliveryService.deliveryStatus,
//   //       history: [],
//   //       error: error.message
//   //     });
//   //     setShowTrackingModal(true);
//   //     toast.error('Failed to get tracking details, showing basic info');
//   //   } finally {
//   //     setTrackingLoading(prev => ({ ...prev, [order._id]: false }));
//   //   }
//   // };

//   // ========== TRACK DELIVERY FUNCTION - WITH STATUS UPDATE ==========
// const handleTrackDelivery = async (order) => {
//   if (!order.deliveryService?.trackingNumber) {
//     toast.error('No tracking number available');
//     return;
//   }

//   setTrackingLoading(prev => ({ ...prev, [order._id]: true }));

//   try {
//     const token = localStorage.getItem('token');
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/couriers/${order.deliveryService.courierSlug}/track/${order.deliveryService.trackingNumber}`,
//       {
//         headers: { 'Authorization': `Bearer ${token}` }
//       }
//     );

//     const data = await response.json();
    
//     if (data.success) {
//       // Extract tracking data
//       const newStatus = data.data?.status || data.status || order.deliveryService.deliveryStatus;
//       const statusMessage = data.data?.message || data.message || '';
//       const location = data.data?.location || data.location || '';
      
//       // ✅ If status has changed, update the order in backend
//       if (newStatus && newStatus !== order.deliveryService.deliveryStatus) {
//         await updateOrderDeliveryStatus(order._id, newStatus, statusMessage, location);
//       }
      
//       // ✅ Set tracking info for modal display
//       setTrackingInfo({
//         ...data.data,
//         trackingNumber: order.deliveryService.trackingNumber,
//         courierName: order.deliveryService.courierName,
//         courierSlug: order.deliveryService.courierSlug,
//         trackingUrl: order.deliveryService.trackingUrl,
//         deliveryStatus: newStatus,
//         history: data.data?.history || data.history || []
//       });
//       setShowTrackingModal(true);
      
//     } else {
//       // If tracking API fails, still show basic info
//       setTrackingInfo({
//         trackingNumber: order.deliveryService.trackingNumber,
//         courierName: order.deliveryService.courierName,
//         courierSlug: order.deliveryService.courierSlug,
//         trackingUrl: order.deliveryService.trackingUrl,
//         deliveryStatus: order.deliveryService.deliveryStatus,
//         history: order.deliveryService.deliveryStatusHistory || [],
//         message: data.message || 'Tracking info not available'
//       });
//       setShowTrackingModal(true);
//       toast.warning('Showing basic tracking info. API details not available.');
//     }
//   } catch (error) {
//     console.error('Track delivery error:', error);
//     setTrackingInfo({
//       trackingNumber: order.deliveryService.trackingNumber,
//       courierName: order.deliveryService.courierName,
//       courierSlug: order.deliveryService.courierSlug,
//       trackingUrl: order.deliveryService.trackingUrl,
//       deliveryStatus: order.deliveryService.deliveryStatus,
//       history: order.deliveryService.deliveryStatusHistory || [],
//       error: error.message
//     });
//     setShowTrackingModal(true);
//     toast.error('Failed to get tracking details, showing basic info');
//   } finally {
//     setTrackingLoading(prev => ({ ...prev, [order._id]: false }));
//   }
// };
//   const clearFilters = () => {
//     setSearchTerm('');
//     setStatusFilter('');
//     setPaymentStatusFilter('');
//     setPaymentMethodFilter('');
//     setCurrentPage(1);
//   };

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     const d = new Date(date);
//     return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
//   };

//   const formatShortDate = (date) => {
//     if (!date) return 'N/A';
//     const d = new Date(date);
//     return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
//   };

//   const getStatusBadge = (status) => {
//     const statusInfo = ORDER_STATUSES.find(s => s.value === status);
//     if (!statusInfo) return <span className="px-2 py-0.5 rounded-full text-xs bg-[#E2E7EA] text-blue-800 border border-blue-600/30">{status}</span>;
//     return (
//       <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusInfo.color}`}>
//         <statusInfo.icon className="w-2.5 h-2.5" />
//         {statusInfo.label}
//       </span>
//     );
//   };

//   const getPaymentStatusBadge = (status) => {
//     const paymentInfo = PAYMENT_STATUSES.find(p => p.value === status);
//     return (
//       <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${paymentInfo?.color || 'bg-[#E2E7EA] text-blue-800 border-blue-600/30'}`}>
//         <FaMoneyBillWave className="w-2.5 h-2.5" />
//         {paymentInfo?.label || status}
//       </span>
//     );
//   };

//   const getPaymentMethodBadge = (method) => {
//     const methods = {
//       'cod': { label: 'COD', color: 'bg-blue-600/10 text-blue-600 border-blue-600/30' },
//       'online': { label: 'Online', color: 'bg-blue-50 text-blue-700 border-blue-200' },
//       'bkash': { label: 'bKash', color: 'bg-blue-600/10 text-blue-600 border-blue-600/30' },
//       'nagad': { label: 'Nagad', color: 'bg-blue-600/10 text-blue-600 border-blue-600/30' }
//     };
    
//     const info = methods[method] || { label: method || 'Unknown', color: 'bg-[#E2E7EA] text-blue-800 border-blue-600/30' };
    
//     return (
//       <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${info.color}`}>
//         {info.label}
//       </span>
//     );
//   };

//  // ========== DELIVERY BADGE - FULL VERSION ==========
// // const getDeliveryBadge = (order) => {
// //   if (!order.deliveryService?.courierOrderId) return null;
  
// //   return (
// //     <div className="flex flex-col items-center gap-0.5">
// //       {/* Courier Name */}
// //       <span className="text-[10px] font-medium text-blue-800">
// //         {order.deliveryService.courierName}
// //       </span>
      
// //       {/* Delivery Status */}
// //       {/* <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] ${
// //         DELIVERY_STATUSES.find(s => s.value === order.deliveryService.deliveryStatus)?.color || 'bg-[#E2E7EA]'
// //       }`}>
// //         {DELIVERY_STATUSES.find(s => s.value === order.deliveryService.deliveryStatus)?.label || order.deliveryService.deliveryStatus}
// //       </span> */}
      
// //       {/* Track Button - Opens Modal */}
// //       {order.deliveryService.trackingNumber && (
// //         <button
// //           onClick={() => {
// //             setSelectedOrder(order);
// //             handleTrackDelivery(order);
// //           }}
// //           className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 whitespace-nowrap"
// //           disabled={trackingLoading[order._id]}
// //         >
// //           {trackingLoading[order._id] ? (
// //             <FaSpinner className="w-3 h-3 animate-spin" />
// //           ) : (
// //             'Track'
// //           )}
// //         </button>
// //       )}
      
// //       {/* Direct Tracking Link - Opens in new tab */}
// //       {order.deliveryService.trackingUrl && (
// //         <a
// //           href={order.deliveryService.trackingUrl}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           className="text-[10px] text-[#64748B] hover:text-blue-600 flex items-center gap-1 whitespace-nowrap"
// //           title={`Track on ${order.deliveryService.courierName}`}
// //         >
// //           <FaExternalLinkAlt className="w-2.5 h-2.5" />
// //           <span>Track on {order.deliveryService.courierName}</span>
// //         </a>
// //       )}
// //     </div>
// //   );
// // };


// // ========== DELIVERY BADGE - WITH REAL-TIME STATUS ==========
// const getDeliveryBadge = (order) => {
//   if (!order.deliveryService?.courierOrderId) return null;
  
//   // Get status info from deliveryService
//   const deliveryStatus = order.deliveryService.deliveryStatus;
//   const statusInfo = DELIVERY_STATUSES.find(s => s.value === deliveryStatus);
  
//   return (
//     <div className="flex flex-col items-center gap-0.5">
//       {/* Courier Name */}
//       <span className="text-[10px] font-medium text-blue-800">
//         {order.deliveryService.courierName}
//       </span>
      
//       {/* ✅ Real-time Delivery Status */}
//       <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] ${
//         statusInfo?.color || 'bg-[#E2E7EA]'
//       }`}>
//         {statusInfo?.label || deliveryStatus || 'Unknown'}
//       </span>
      
//       {/* Track Button - Opens Modal */}
//       {order.deliveryService.trackingNumber && (
//         <button
//           onClick={() => {
//             setSelectedOrder(order);
//             handleTrackDelivery(order);
//           }}
//           className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 whitespace-nowrap"
//           disabled={trackingLoading[order._id]}
//         >
//           {trackingLoading[order._id] ? (
//             <FaSpinner className="w-3 h-3 animate-spin" />
//           ) : (
//             'Track'
//           )}
//         </button>
//       )}
      
//       {/* ✅ Direct Tracking Link */}
//       {order.deliveryService.trackingUrl && (
//         <a
//           href={order.deliveryService.trackingUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-[10px] text-[#64748B] hover:text-blue-600 flex items-center gap-1 whitespace-nowrap"
//           title={`Track on ${order.deliveryService.courierName}`}
//         >
//           <FaExternalLinkAlt className="w-2.5 h-2.5" />
//           <span>Track on {order.deliveryService.courierName}</span>
//         </a>
//       )}
//     </div>
//   );
// };

//   const canCancelOrder = (order) => {
//     return order.orderStatus === 'placed' && order.paymentMethod === 'cod';
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-[#E2E7EA]/20 pb-12 pt-6">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//             <div>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/25">
//                   <FaShoppingBag className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl md:text-3xl font-bold text-blue-800">My Orders</h1>
//                   <p className="text-sm text-[#64748B] mt-0.5">Track and manage all your orders</p>
//                 </div>
//               </div>
//             </div>
//             <Link 
//               href="/products" 
//               className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-all text-sm font-medium shadow-sm"
//             >
//               Continue Shopping
//               <FaArrowRight className="w-4 h-4" />
//             </Link>
//           </div>

//           {/* Search and Filters */}
//           <div className="bg-white rounded-2xl border border-blue-600/30 p-4 mb-6 shadow-sm">
//             <div className="flex flex-col gap-3">
//               <div className="relative">
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search by Order ID..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full pl-10 pr-10 py-2 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-blue-800 placeholder:text-[#64748B]"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => {
//                       setSearchTerm('');
//                       setCurrentPage(1);
//                     }}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748B] hover:text-blue-600"
//                   >
//                     <FaTimes className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>

//               <div className="flex flex-wrap gap-2 items-center">
//                 <div className="flex items-center gap-2">
//                   <FaFilter className="w-4 h-4 text-[#64748B]" />
//                   <span className="text-sm text-[#64748B]">Filters:</span>
//                 </div>
                
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => {
//                     setStatusFilter(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-1.5 text-sm border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-blue-800"
//                 >
//                   <option value="">All Order Status</option>
//                   {ORDER_STATUSES.map(status => (
//                     <option key={status.value} value={status.value}>{status.label}</option>
//                   ))}
//                 </select>

//                 <select
//                   value={paymentStatusFilter}
//                   onChange={(e) => {
//                     setPaymentStatusFilter(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-1.5 text-sm border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-blue-800"
//                 >
//                   <option value="">All Payment Status</option>
//                   {PAYMENT_STATUSES.map(status => (
//                     <option key={status.value} value={status.value}>{status.label}</option>
//                   ))}
//                 </select>

//                 {(searchTerm || statusFilter || paymentStatusFilter || paymentMethodFilter) && (
//                   <button
//                     onClick={clearFilters}
//                     className="px-3 py-1.5 text-sm text-blue-600 hover:bg-[#E2E7EA] rounded-xl transition-colors flex items-center gap-1 font-medium"
//                   >
//                     <FaTimes className="w-3 h-3" />
//                     Clear Filters
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Orders Table - Compact */}
//           <div className="bg-white rounded-2xl border border-blue-600/30 shadow-sm overflow-hidden">
//             <div className="w-full overflow-x-auto">
//               <table className="w-full min-w-[800px] lg:min-w-full text-sm">
//                 <thead className="bg-[#E2E7EA]/50 border-b border-blue-600/30">
//                   <tr>
//                     <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Order ID</th>
//                     <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Date</th>
//                     <th className="px-3 py-2 text-right text-xs font-semibold text-[#64748B]">Total</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Status</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Payment</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Method</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Delivery</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan="8" className="px-4 py-8 text-center">
//                         <div className="flex justify-center">
//                           <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : orders.length === 0 ? (
//                     <tr>
//                       <td colSpan="8" className="px-4 py-12 text-center">
//                         <div className="flex flex-col items-center gap-2">
//                           <div className="w-12 h-12 rounded-full bg-[#E2E7EA] flex items-center justify-center">
//                             <FaBox className="w-6 h-6 text-[#64748B]" />
//                           </div>
//                           <p className="text-blue-800 text-sm font-medium">No orders found</p>
//                           <p className="text-xs text-[#64748B]">Start shopping to see your orders here</p>
//                           <Link href="/products" className="text-blue-600 hover:text-[#0891B2] text-sm font-medium hover:underline">
//                             Start Shopping →
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     orders.map((order) => {
//                       const hasDelivery = order.deliveryService?.courierOrderId;
                      
//                       return (
//                         <tr key={order._id} className="border-b border-blue-600/20 hover:bg-[#E2E7EA]/30 transition-colors">
//                           <td className="px-3 py-2.5 text-xs font-mono font-medium text-blue-800">
//                             {order.orderNumber || order._id.slice(-8).toUpperCase()}
//                           </td>
//                           <td className="px-3 py-2.5 text-xs text-[#64748B] whitespace-nowrap">
//                             {isClient ? (
//                               order.orderStatus === 'delivered' && order.deliveredAt ? (
//                                 <div className="flex flex-col gap-0.5">
//                                   <div><span className="text-[#94A3B8] text-[10px]">Ordered:</span> {formatDate(order.createdAt)}</div>
//                                   <div className="text-green-600"><span className="text-green-500 text-[10px]">Delivered:</span> {formatShortDate(order.deliveredAt)}</div>
//                                 </div>
//                               ) : order.orderStatus === 'cancelled' && order.cancelledAt ? (
//                                 <div className="flex flex-col gap-0.5">
//                                   <div><span className="text-[#94A3B8] text-[10px]">Ordered:</span> {formatDate(order.createdAt)}</div>
//                                   <div className="text-red-600"><span className="text-red-500 text-[10px]">Cancelled:</span> {formatShortDate(order.cancelledAt)}</div>
//                                 </div>
//                               ) : (
//                                 <div>{formatDate(order.createdAt)}</div>
//                               )
//                             ) : (
//                               <div>Loading...</div>
//                             )}
//                           </td>
//                           <td className="px-3 py-2.5 text-xs text-right font-bold text-blue-600">
//                             ৳{order.total?.toFixed(2)}
//                           </td>
//                           <td className="px-3 py-2.5 text-center">
//                             {getStatusBadge(order.orderStatus)}
//                           </td>
//                           <td className="px-3 py-2.5 text-center">
//                             {getPaymentStatusBadge(order.paymentStatus)}
//                           </td>
//                           <td className="px-3 py-2.5 text-center">
//                             {getPaymentMethodBadge(order.paymentMethod)}
//                           </td>
//                           <td className="px-3 py-2.5 text-center">
//                             {hasDelivery ? getDeliveryBadge(order) : (
//                               <span className="text-xs text-[#94A3B8]">N/A</span>
//                             )}
//                           </td>
//                           <td className="px-3 py-2.5 text-center">
//                             <div className="flex items-center justify-center gap-1">
//                               <button
//                                 onClick={() => {
//                                   setSelectedOrder(order);
//                                   setShowDetailsModal(true);
//                                 }}
//                                 className="inline-flex items-center gap-1 px-2 py-1 text-blue-600 hover:bg-[#E2E7EA] rounded-lg transition-colors text-xs font-medium"
//                                 title="View Details"
//                               >
//                                 <FaEye className="w-3.5 h-3.5" />
                              
//                               </button>
//                               <button
//                                 onClick={() => handleDownloadInvoice(order)}
//                                 disabled={downloadingOrders[order._id]}
//                                 className="inline-flex items-center gap-1 px-2 py-1 text-blue-600 hover:bg-[#E2E7EA] rounded-lg transition-colors text-xs font-medium disabled:opacity-50"
//                                 title="Download Invoice"
//                               >
//                                 {downloadingOrders[order._id] ? (
//                                   <FaSpinner className="w-3.5 h-3.5 animate-spin" />
//                                 ) : (
//                                   <FaDownload className="w-3.5 h-3.5" />
//                                 )}
//                               </button>
//                               {canCancelOrder(order) && (
//                                 <button
//                                   onClick={() => {
//                                     setSelectedOrder(order);
//                                     setShowCancelModal(true);
//                                   }}
//                                   className="inline-flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs font-medium"
//                                   title="Cancel Order"
//                                 >
//                                   <FaBan className="w-3.5 h-3.5" />
//                                 </button>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-3 py-2 border-t border-blue-600/30 flex flex-wrap items-center justify-between gap-3 bg-[#E2E7EA]/20">
//                 <p className="text-xs text-[#64748B]">Showing {orders.length} of {totalOrders} orders</p>
//                 <div className="flex gap-1">
//                   <button
//                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                     disabled={currentPage === 1}
//                     className="px-3 py-1.5 border border-blue-600/30 rounded-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition text-blue-800"
//                   >
//                     <FaChevronLeft className="w-3 h-3" />
//                   </button>
//                   <span className="px-3 py-1.5 text-xs font-medium text-blue-800">Page {currentPage} of {totalPages}</span>
//                   <button
//                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                     disabled={currentPage === totalPages}
//                     className="px-3 py-1.5 border border-blue-600/30 rounded-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition text-blue-800"
//                   >
//                     <FaChevronRight className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Help Section */}
//           <div className="mt-6 text-center">
//             <p className="text-xs text-[#64748B]">Need help with your orders?</p>
//             <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
//               <a href="tel:+8801712345678" className="text-sm text-blue-600 hover:text-[#0891B2] transition-colors flex items-center gap-1">
//                 <FaPhone className="w-3 h-3" />
//                 +880 1XXXXXXXXX
//               </a>
//               <span className="text-blue-600/30 hidden sm:inline">|</span>
//               <a href="mailto:support@example.com" className="text-sm text-blue-600 hover:text-[#0891B2] transition-colors flex items-center gap-1">
//                 <FaEnvelope className="w-3 h-3" />
//                 support@example.com
//               </a>
//               <span className="text-blue-600/30 hidden sm:inline">|</span>
//               <a href="https://wa.me/8801712345678" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-[#0891B2] transition-colors flex items-center gap-1">
//                 <FaWhatsapp className="w-3 h-3" />
//                 WhatsApp
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       <OrderDetailsModal
//         isOpen={showDetailsModal}
//         onClose={() => setShowDetailsModal(false)}
//         order={selectedOrder}
//         onCancelOrder={() => {
//           setShowDetailsModal(false);
//           setShowCancelModal(true);
//         }}
//         onDownloadInvoice={handleDownloadInvoice}
//         onTrackDelivery={handleTrackDelivery}
//       />

//       <CancelOrderModal
//         isOpen={showCancelModal}
//         onClose={() => setShowCancelModal(false)}
//         order={selectedOrder}
//         onCancel={handleCancelOrder}
//       />

//       <TrackingModal
//         isOpen={showTrackingModal}
//         onClose={() => setShowTrackingModal(false)}
//         trackingInfo={trackingInfo}
//         order={selectedOrder}
//       />
//     </>
//   );
// }



'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  FaBox,
  FaEye,
  FaClock,
  FaMoneyBillWave,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPrint,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaBan,
  FaFileInvoice,
  FaTruck,
  FaCheckDouble,
  FaCreditCard,
  FaMobileAlt,
  FaSearch,
  FaFilter,
  FaTimes,
  FaShoppingBag,
  FaArrowRight,
  FaDownload,
  FaHeart,
  FaStar,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaHome,
  FaCity,
  FaMapPin,
  FaShieldAlt,
  FaExternalLinkAlt,
  FaExclamationTriangle,
  FaPause,
  FaUndo
} from 'react-icons/fa';
import { generateInvoicePDF } from '@/utils/invoicePDF';

// ========== ORDER STATUSES - COMPLETE (Without Shipped, Out for Delivery, Failed) ==========
const ORDER_STATUSES = [
  { value: 'placed', label: 'Placed', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: FaClock },
  { value: 'follow_up', label: 'Follow Up', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FaClock },
  { value: 'reminder', label: 'Reminder', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: FaClock },
  { value: 'accepted', label: 'Accepted', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: FaCheckCircle },
  { value: 'approved', label: 'Approved', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: FaCheckCircle },
  { value: 'hold', label: 'On Hold', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: FaPause },
  { value: 'ready_to_ship', label: 'Ready to Ship', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', icon: FaBox },
  { value: 'courier_assigned', label: 'Courier Assigned', color: 'bg-pink-50 text-pink-700 border-pink-200', icon: FaTruck },
  { value: 'processing', label: 'Processing', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FaSpinner },
  { value: 'partial_delivery', label: 'Partial Delivery', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: FaCheckDouble },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-50 text-green-700 border-green-200', icon: FaCheckDouble },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200', icon: FaBan },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-50 text-red-700 border-red-200', icon: FaBan },
  { value: 'refunded', label: 'Refunded', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: FaBan },
  { value: 'returned', label: 'Returned', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: FaUndo }
];

const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { value: 'paid', label: 'Paid', color: 'bg-green-50 text-green-700 border-green-200' },
  { value: 'failed', label: 'Failed', color: 'bg-red-50 text-red-700 border-red-200' },
  { value: 'refunded', label: 'Refunded', color: 'bg-gray-50 text-gray-700 border-gray-200' }
];

// ========== DELIVERY STATUSES ==========
const DELIVERY_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-gray-100 text-gray-800' },
  { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800' },
  { value: 'picked_up', label: 'Picked Up', color: 'bg-cyan-100 text-cyan-800' },
  { value: 'in_transit', label: 'In Transit', color: 'bg-purple-100 text-purple-800' },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-orange-100 text-orange-800' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  { value: 'failed', label: 'Failed', color: 'bg-red-200 text-red-900' },
  { value: 'returned', label: 'Returned', color: 'bg-gray-200 text-gray-800' }
];

// ========== CANCEL ORDER MODAL ==========
const CancelOrderModal = ({ isOpen, onClose, order, onCancel }) => {
  const [cancellationReason, setCancellationReason] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!cancellationReason.trim()) {
      toast.error('Please provide a cancellation reason');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/orders/${order._id}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cancellationReason })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Order cancelled successfully');
        onCancel();
        onClose();
      } else {
        toast.error(data.error || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Cancel order error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-blue-600/30"
      >
        <div className="p-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="flex items-center gap-2">
            <FaBan className="w-5 h-5" />
            <h2 className="text-lg font-bold">Cancel Order</h2>
          </div>
        </div>

        <div className="p-5">
          <p className="text-blue-800 text-sm mb-3">
            Are you sure you want to cancel this order?
          </p>
          <p className="text-xs text-[#64748B] mb-4">
            Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}
          </p>
          
          <div>
            <label className="block text-xs font-medium text-blue-800 mb-1">
              Cancellation Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              rows="3"
              placeholder="Please tell us why you're cancelling this order..."
              className="w-full px-3 py-2 text-sm border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-blue-800 placeholder:text-[#64748B]"
            />
          </div>
        </div>

        <div className="p-4 border-t border-blue-600/30 bg-[#E2E7EA]/20 flex gap-3">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-blue-600/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
            Close
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaBan className="w-3 h-3" />}
            Confirm Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== TRACKING MODAL ==========
const TrackingModal = ({ isOpen, onClose, trackingInfo, order }) => {
  if (!isOpen) return null;

  const displayData = trackingInfo || order?.deliveryService || {};
  const statusHistory = displayData.history || displayData.deliveryStatusHistory || [];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-blue-600/30 shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaTruck className="w-5 h-5" />
              <h2 className="text-lg font-bold">Tracking Information</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">
            Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}
          </p>
        </div>

        <div className="p-4 space-y-3">
          <div className="bg-[#E2E7EA]/30 rounded-xl p-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Tracking Number:</span>
                <span className="font-mono text-blue-800 font-medium">
                  {displayData?.trackingNumber || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Courier:</span>
                <span className="text-blue-800 font-medium">
                  {displayData?.courierName || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Current Status:</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                  DELIVERY_STATUSES.find(s => s.value === displayData?.deliveryStatus)?.color || 'bg-[#E2E7EA]'
                }`}>
                  {DELIVERY_STATUSES.find(s => s.value === displayData?.deliveryStatus)?.label || displayData?.deliveryStatus || 'N/A'}
                </span>
              </div>
              {displayData?.trackingUrl && (
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Track Link:</span>
                  <a
                    href={displayData.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                    Track on {displayData?.courierName || 'Courier'}
                  </a>
                </div>
              )}
            </div>
          </div>

          {statusHistory && statusHistory.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <FaClock className="w-4 h-4 text-blue-600" />
                Tracking History
              </h3>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {statusHistory.map((entry, index) => {
                  const statusLabel = DELIVERY_STATUSES.find(s => s.value === entry.status)?.label || entry.status;
                  const isLatest = index === statusHistory.length - 1;
                  
                  return (
                    <div key={index} className={`flex items-start gap-3 text-xs border-b border-blue-600/10 pb-2 last:border-0 ${isLatest ? 'bg-blue-600/5 p-2 rounded-lg' : ''}`}>
                      <div className={`w-2 h-2 rounded-full ${isLatest ? 'bg-blue-600' : 'bg-[#94A3B8]'} mt-1.5 flex-shrink-0`}></div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-blue-800">{statusLabel}</span>
                          {isLatest && <span className="text-[10px] text-blue-600 font-medium">(Current)</span>}
                        </div>
                        {entry.message && <p className="text-[#64748B] mt-0.5">{entry.message}</p>}
                        <p className="text-[#94A3B8] text-[10px] mt-0.5">
                          {entry.timestamp ? new Date(entry.timestamp).toLocaleString('en-BD', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'N/A'}
                        </p>
                        {entry.location && (
                          <p className="text-[#94A3B8] text-[10px]">📍 {entry.location}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {displayData?.error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <p className="text-xs text-yellow-700">
                <FaExclamationTriangle className="inline w-3 h-3 mr-1" />
                {displayData.error}
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-blue-600/30 bg-[#E2E7EA]/20 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-colors text-sm">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== ORDER DETAILS MODAL ==========
const OrderDetailsModal = ({ isOpen, onClose, order, onCancelOrder, onDownloadInvoice, onTrackDelivery }) => {
  const [isClient, setIsClient] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isOpen || !order) return null;

  const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
  const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);
  const isCancelled = order.orderStatus === 'cancelled';
  const isDelivered = order.orderStatus === 'delivered';
  const canCancel = order.orderStatus === 'placed' && order.paymentMethod === 'cod';
  const hasDelivery = order.deliveryService?.courierOrderId;

  const getGroupedItems = () => {
    if (!order.items) return [];
    const grouped = {};
    order.items.forEach(item => {
      const key = item.productId?.toString() || item._id?.toString() || Math.random().toString();
      if (!grouped[key]) {
        grouped[key] = {
          ...item,
          colors: []
        };
      }
      if (item.colors && item.colors.length > 0) {
        item.colors.forEach(colorObj => {
          grouped[key].colors.push({
            color: colorObj.color,
            quantity: colorObj.quantity,
            price: colorObj.price || item.discountPrice || item.regularPrice
          });
        });
      } 
      else if (item.selectedColor) {
        grouped[key].colors.push({
          color: item.selectedColor,
          quantity: item.quantity,
          price: item.discountPrice || item.regularPrice
        });
      } 
      else {
        grouped[key].colors.push({
          color: null,
          quantity: item.quantity,
          price: item.discountPrice || item.regularPrice
        });
      }
    });
    return Object.values(grouped);
  };

  const groupedItems = getGroupedItems();

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDateLong = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-BD', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await onDownloadInvoice(order);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden border border-blue-600/30"
      >
        <div className="p-5 bg-black text-white sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaFileInvoice className="w-5 h-5" />
              <h2 className="text-lg font-bold">Order Details</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimesCircle className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order Id: {order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusInfo?.color || 'bg-[#E2E7EA] text-blue-800 border-blue-600/30'}`}>
              {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
              {statusInfo?.label || order.orderStatus}
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${paymentInfo?.color || 'bg-[#E2E7EA] text-blue-800 border-blue-600/30'}`}>
              <FaMoneyBillWave className="w-3 h-3" />
              {paymentInfo?.label || order.paymentStatus}
            </div>
            {order.paymentMethod === 'cod' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-blue-600/10 text-blue-600 border-blue-600/30">
                <FaMoneyBillWave className="w-3 h-3" />
                Cash on Delivery
              </div>
            )}
            {order.paymentMethod === 'online' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200">
                <FaCreditCard className="w-3 h-3" />
                Online Payment
              </div>
            )}
            {hasDelivery && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-blue-600/10 text-blue-600 border-blue-600/30">
                <FaTruck className="w-3 h-3" />
                {order.deliveryService.courierName}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-5">
            {canCancel && (
              <button
                onClick={() => {
                  onClose();
                  onCancelOrder();
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium"
              >
                <FaBan className="w-4 h-4" />
                Cancel Order
              </button>
            )}
            {hasDelivery && (
              <button
                onClick={() => {
                  onClose();
                  onTrackDelivery(order);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-[#0891B2] transition-colors text-sm font-medium"
              >
                <FaTruck className="w-4 h-4" />
                Track Delivery
              </button>
            )}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-all text-sm font-medium disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FaDownload className="w-4 h-4" />
                  Download Invoice
                </>
              )}
            </button>
          </div>

          {isDelivered && order.deliveredAt && isClient && (
            <div className="mb-5 bg-green-50 border-l-4 border-green-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaCheckDouble className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-green-700">Order Delivered</h4>
                  <p className="text-xs text-green-600 mt-1">
                    <span className="font-medium">Delivered on:</span> {formatDateLong(order.deliveredAt)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {hasDelivery && (
            <div className="mb-5 bg-blue-600/5 border border-blue-600/20 rounded-xl p-3">
              <h4 className="text-sm font-semibold text-blue-800 flex items-center gap-2 mb-2">
                <FaTruck className="w-4 h-4 text-blue-600" />
                Delivery Information
              </h4>
              <div className="space-y-1 text-xs">
                <p><span className="text-[#64748B]">Courier:</span> <span className="font-medium text-blue-800">{order.deliveryService.courierName}</span></p>
                <p><span className="text-[#64748B]">Tracking Number:</span> <span className="font-mono text-blue-600">{order.deliveryService.trackingNumber}</span></p>
                <p><span className="text-[#64748B]">Status:</span> 
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ml-1 ${
                    DELIVERY_STATUSES.find(s => s.value === order.deliveryService.deliveryStatus)?.color || 'bg-[#E2E7EA]'
                  }`}>
                    {DELIVERY_STATUSES.find(s => s.value === order.deliveryService.deliveryStatus)?.label || order.deliveryService.deliveryStatus}
                  </span>
                </p>
                {order.deliveryService.trackingUrl && (
                  <p>
                    <span className="text-[#64748B]">Track Link:</span>
                    <a
                      href={order.deliveryService.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-1"
                    >
                      <FaExternalLinkAlt className="inline w-3 h-3 mr-1" />
                      Track on {order.deliveryService.courierName}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}

          {isCancelled && order.cancellationReason && (
            <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaBan className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-red-700">Order Cancelled</h4>
                  <p className="text-xs text-red-600 mt-1">
                    <span className="font-medium">Reason:</span> {order.cancellationReason}
                  </p>
                  {order.cancelledAt && (
                    <p className="text-xs text-red-500 mt-1">
                      <span className="font-medium">Cancelled on:</span> {formatDate(order.cancelledAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-[#E2E7EA]/50 rounded-xl p-4 border border-blue-600/30">
              <h3 className="font-semibold text-blue-800 text-sm mb-2 flex items-center gap-1.5">
                <FaUser className="w-3.5 h-3.5 text-blue-600" />
                Customer Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-[#64748B]">Name:</span> <span className="text-blue-800">{order.customerInfo?.fullName}</span></p>
                <p><span className="text-[#64748B]">Email:</span> <span className="text-blue-800">{order.customerInfo?.email}</span></p>
                <p><span className="text-[#64748B]">Phone:</span> <span className="text-blue-800">{order.customerInfo?.phone}</span></p>
                <p><span className="text-[#64748B]">Address:</span> <span className="text-blue-800">{order.customerInfo?.address}</span></p>
              </div>
            </div>

            <div className="bg-[#E2E7EA]/50 rounded-xl p-4 border border-blue-600/30">
              <h3 className="font-semibold text-blue-800 text-sm mb-2 flex items-center gap-1.5">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-blue-600" />
                Delivery Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-[#64748B]">Division:</span> <span className="font-medium text-blue-800">{order.customerInfo?.division || 'N/A'}</span></p>
                <p><span className="text-[#64748B]">District/City:</span> <span className="font-medium text-blue-800">{order.customerInfo?.city || 'N/A'}</span></p>
                <p><span className="text-[#64748B]">Upazila/Thana:</span> <span className="font-medium text-blue-800">{order.customerInfo?.zone || 'N/A'}</span></p>
                {order.customerInfo?.area && (
                  <p><span className="text-[#64748B]">Union/Area:</span> <span className="font-medium text-blue-800">{order.customerInfo.area}</span></p>
                )}
                {order.trackingNumber && (
                  <p><span className="text-[#64748B]">Tracking:</span> <span className="font-mono text-blue-600">{order.trackingNumber}</span></p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h3 className="font-semibold text-blue-800 text-sm mb-2 flex items-center gap-1.5">
              <FaBox className="w-3.5 h-3.5 text-blue-600" />
              Order Items
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-[#E2E7EA]/50">
                  <tr>
                    <th className="px-3 py-2 text-left text-black">Product</th>
                    <th className="px-3 py-2 text-center text-black">Color</th>
                    <th className="px-3 py-2 text-center text-black">Qty</th>
                    <th className="px-3 py-2 text-right text-black">Price</th>
                    <th className="px-3 py-2 text-right text-black">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedItems.map((group, idx) => {
                    const hasMultipleColors = group.colors && group.colors.length > 1;
                    
                    return group.colors.map((colorObj, colorIdx) => {
                      const isFirst = colorIdx === 0;
                      const price = colorObj.price || group.discountPrice || group.regularPrice;
                      const totalPrice = price * colorObj.quantity;
                      
                      return (
                        <tr key={`${idx}-${colorIdx}`} className="border-t border-blue-600/20">
                          {isFirst && (
                            <td className="px-3 py-2" rowSpan={hasMultipleColors ? group.colors.length : 1}>
                              <div className="flex items-center gap-3">
                                <img 
                                  src={group.image || 'https://via.placeholder.com/40'} 
                                  alt={group.productName}
                                  className="w-10 h-10 rounded-lg object-cover border border-blue-600/30"
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
                                />
                                <p className="font-medium text-sm text-black">{group.productName}</p>
                              </div>
                            </td>
                          )}
                          <td className="px-3 py-2 text-center">
                            {colorObj.color ? (
                              <div className="flex items-center justify-center">
                                <div 
                                  className="w-6 h-6 rounded-full border border-blue-600/30 shadow-sm"
                                  style={{ backgroundColor: colorObj.color }}
                                  title={colorObj.color}
                                />
                              </div>
                            ) : (
                              <span className="text-xs text-[#64748B]">-</span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-center text-black">{colorObj.quantity}</td>
                          <td className="px-3 py-2 text-right text-black">৳{price.toFixed(2)}</td>
                          <td className="px-3 py-2 text-right font-medium text-black">৳{totalPrice.toFixed(2)}</td>
                        </tr>
                      );
                    });
                  })}
                </tbody>
                <tfoot className="border-t border-blue-600/30">
                  <tr>
                    <td colSpan="4" className="px-3 py-1.5 text-right font-medium text-blue-800">Subtotal:</td>
                    <td className="px-3 py-1.5 text-right text-blue-800">৳{order.subtotal?.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="px-3 py-1.5 text-right font-medium text-blue-800">Shipping:</td>
                    <td className="px-3 py-1.5 text-right text-blue-800">৳{order.shippingCost?.toFixed(2)}</td>
                  </tr>
                  {order.discount > 0 && (
                    <tr>
                      <td colSpan="4" className="px-3 py-1.5 text-right font-medium text-green-600">Discount:</td>
                      <td className="px-3 py-1.5 text-right text-green-600">- ৳{order.discount.toFixed(2)}</td>
                    </tr>
                  )}
                  <tr className="text-sm font-bold">
                    <td colSpan="4" className="px-3 py-1.5 text-right text-blue-800">Total:</td>
                    <td className="px-3 py-1.5 text-right text-blue-600">৳{order.total?.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {(order.couponCode || order.deliveryNote) && (
            <div className="bg-[#E2E7EA]/50 rounded-xl p-4 border border-blue-600/30">
              <h3 className="font-semibold text-blue-800 text-sm mb-1.5">Additional Information</h3>
              {order.couponCode && <p className="text-xs"><span className="text-[#64748B]">Coupon Applied:</span> <span className="text-blue-600 font-medium">{order.couponCode}</span></p>}
              {order.deliveryNote && <p className="text-xs"><span className="text-[#64748B]">Delivery Note:</span> <span className="text-blue-800">{order.deliveryNote}</span></p>}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-blue-600/30 bg-[#E2E7EA]/20 flex justify-end gap-2">
          <button onClick={onClose} className="px-5 py-2 bg-black text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-all text-sm font-medium">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== MAIN CUSTOMER ORDERS PAGE ==========
export default function CustomerOrdersPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
  const [downloadingOrders, setDownloadingOrders] = useState({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 10
      });
      if (searchTerm) queryParams.append('search', searchTerm);
      if (statusFilter) queryParams.append('orderStatus', statusFilter);
      if (paymentStatusFilter) queryParams.append('paymentStatus', paymentStatusFilter);
      if (paymentMethodFilter) queryParams.append('paymentMethod', paymentMethodFilter);

      const response = await fetch(`http://localhost:5000/api/orders?${queryParams}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
        setTotalPages(data.pagination.pages);
        setTotalOrders(data.pagination.total);
      } else {
        toast.error(data.error || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, paymentStatusFilter, paymentMethodFilter, router]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancelOrder = () => {
    fetchOrders();
  };

  const handleDownloadInvoice = async (order) => {
    setDownloadingOrders(prev => ({ ...prev, [order._id]: true }));
    try {
      await generateInvoicePDF(order);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download invoice');
    } finally {
      setDownloadingOrders(prev => ({ ...prev, [order._id]: false }));
    }
  };

  const updateOrderDeliveryStatus = async (orderId, status, message, location) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${orderId}/delivery-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          status, 
          message: message || `Status updated to ${status}`,
          location: location || ''
        })
      });

      const data = await response.json();
      if (data.success) {
        if (data.data?.paymentStatus === 'paid') {
          toast.success('✅ Order delivered! Payment marked as Paid.');
        }
        fetchOrders();
        return data;
      } else {
        console.error('Update delivery status failed:', data.error);
        return null;
      }
    } catch (error) {
      console.error('Update delivery status error:', error);
      return null;
    }
  };

  const handleTrackDelivery = async (order) => {
    if (!order.deliveryService?.trackingNumber) {
      toast.error('No tracking number available');
      return;
    }

    setTrackingLoading(prev => ({ ...prev, [order._id]: true }));

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/couriers/${order.deliveryService.courierSlug}/track/${order.deliveryService.trackingNumber}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      const data = await response.json();
      
      if (data.success) {
        const newStatus = data.data?.status || data.status || order.deliveryService.deliveryStatus;
        const statusMessage = data.data?.message || data.message || '';
        const location = data.data?.location || data.location || '';
        
        if (newStatus && newStatus !== order.deliveryService.deliveryStatus) {
          await updateOrderDeliveryStatus(order._id, newStatus, statusMessage, location);
        }
        
        setTrackingInfo({
          ...data.data,
          trackingNumber: order.deliveryService.trackingNumber,
          courierName: order.deliveryService.courierName,
          courierSlug: order.deliveryService.courierSlug,
          trackingUrl: order.deliveryService.trackingUrl,
          deliveryStatus: newStatus,
          history: data.data?.history || data.history || []
        });
        setShowTrackingModal(true);
        
      } else {
        setTrackingInfo({
          trackingNumber: order.deliveryService.trackingNumber,
          courierName: order.deliveryService.courierName,
          courierSlug: order.deliveryService.courierSlug,
          trackingUrl: order.deliveryService.trackingUrl,
          deliveryStatus: order.deliveryService.deliveryStatus,
          history: order.deliveryService.deliveryStatusHistory || [],
          message: data.message || 'Tracking info not available'
        });
        setShowTrackingModal(true);
        toast.warning('Showing basic tracking info. API details not available.');
      }
    } catch (error) {
      console.error('Track delivery error:', error);
      setTrackingInfo({
        trackingNumber: order.deliveryService.trackingNumber,
        courierName: order.deliveryService.courierName,
        courierSlug: order.deliveryService.courierSlug,
        trackingUrl: order.deliveryService.trackingUrl,
        deliveryStatus: order.deliveryService.deliveryStatus,
        history: order.deliveryService.deliveryStatusHistory || [],
        error: error.message
      });
      setShowTrackingModal(true);
      toast.error('Failed to get tracking details, showing basic info');
    } finally {
      setTrackingLoading(prev => ({ ...prev, [order._id]: false }));
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPaymentStatusFilter('');
    setPaymentMethodFilter('');
    setCurrentPage(1);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatShortDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
  };

  const getStatusBadge = (status) => {
    const statusInfo = ORDER_STATUSES.find(s => s.value === status);
    if (!statusInfo) return <span className="px-2 py-0.5 rounded-full text-xs bg-[#E2E7EA] text-blue-800 border border-blue-600/30">{status}</span>;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusInfo.color}`}>
        <statusInfo.icon className="w-2.5 h-2.5" />
        {statusInfo.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const paymentInfo = PAYMENT_STATUSES.find(p => p.value === status);
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${paymentInfo?.color || 'bg-[#E2E7EA] text-blue-800 border-blue-600/30'}`}>
        <FaMoneyBillWave className="w-2.5 h-2.5" />
        {paymentInfo?.label || status}
      </span>
    );
  };

  const getPaymentMethodBadge = (method) => {
    const methods = {
      'cod': { label: 'COD', color: 'bg-blue-600/10 text-blue-600 border-blue-600/30' },
      'online': { label: 'Online', color: 'bg-blue-50 text-blue-700 border-blue-200' },
      'bkash': { label: 'bKash', color: 'bg-blue-600/10 text-blue-600 border-blue-600/30' },
      'nagad': { label: 'Nagad', color: 'bg-blue-600/10 text-blue-600 border-blue-600/30' }
    };
    
    const info = methods[method] || { label: method || 'Unknown', color: 'bg-[#E2E7EA] text-blue-800 border-blue-600/30' };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${info.color}`}>
        {info.label}
      </span>
    );
  };

  // ========== DELIVERY BADGE ==========
  const getDeliveryBadge = (order) => {
    if (!order.deliveryService?.courierOrderId) return null;
    
    const deliveryStatus = order.deliveryService.deliveryStatus;
    const statusInfo = DELIVERY_STATUSES.find(s => s.value === deliveryStatus);
    
    return (
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[10px] font-medium text-blue-800">
          {order.deliveryService.courierName}
        </span>
        
        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] ${
          statusInfo?.color || 'bg-[#E2E7EA]'
        }`}>
          {statusInfo?.label || deliveryStatus || 'Unknown'}
        </span>
        
        {order.deliveryService.trackingNumber && (
          <button
            onClick={() => {
              setSelectedOrder(order);
              handleTrackDelivery(order);
            }}
            className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 whitespace-nowrap"
            disabled={trackingLoading[order._id]}
          >
            {trackingLoading[order._id] ? (
              <FaSpinner className="w-3 h-3 animate-spin" />
            ) : (
              'Track'
            )}
          </button>
        )}
        
        {order.deliveryService.trackingUrl && (
          <a
            href={order.deliveryService.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#64748B] hover:text-blue-600 flex items-center gap-1 whitespace-nowrap"
            title={`Track on ${order.deliveryService.courierName}`}
          >
            <FaExternalLinkAlt className="w-2.5 h-2.5" />
            <span>Track on {order.deliveryService.courierName}</span>
          </a>
        )}
      </div>
    );
  };

  const canCancelOrder = (order) => {
    return order.orderStatus === 'placed' && order.paymentMethod === 'cod';
  };

  return (
    <>
      <div className="min-h-screen bg-[#E2E7EA]/20 pb-12 pt-6">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/25">
                  <FaShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-black">My Orders</h1>
                  <p className="text-sm text-[#64748B] mt-0.5">Track and manage all your orders</p>
                </div>
              </div>
            </div>
            <Link 
              href="/products" 
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-all text-sm font-medium shadow-sm"
            >
              Continue Shopping
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl border border-blue-600/30 p-4 mb-6 shadow-sm">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by Order ID..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-10 py-2 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-blue-800 placeholder:text-[#64748B]"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748B] hover:text-blue-600"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex items-center gap-2">
                  <FaFilter className="w-4 h-4 text-[#64748B]" />
                  <span className="text-sm text-[#64748B]">Filters:</span>
                </div>
                
                {/* ========== UPDATED: ORDER STATUS FILTER ========== */}
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 text-sm border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-blue-800"
                >
                  <option value="">All Order Status</option>
                  {ORDER_STATUSES.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>

                <select
                  value={paymentStatusFilter}
                  onChange={(e) => {
                    setPaymentStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 text-sm border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-blue-800"
                >
                  <option value="">All Payment Status</option>
                  {PAYMENT_STATUSES.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>

                {(searchTerm || statusFilter || paymentStatusFilter || paymentMethodFilter) && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-[#E2E7EA] rounded-xl transition-colors flex items-center gap-1 font-medium"
                  >
                    <FaTimes className="w-3 h-3" />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Orders Table - Compact */}
          <div className="bg-white rounded-2xl border border-blue-600/30 shadow-sm overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[800px] lg:min-w-full text-sm">
                <thead className="bg-[#E2E7EA]/50 border-b border-blue-600/30">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Order ID</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Date</th>
                    <th className="px-3 py-2 text-right text-xs font-semibold text-[#64748B]">Total</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Status</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Payment</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Method</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Delivery</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="px-4 py-8 text-center">
                        <div className="flex justify-center">
                          <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-[#E2E7EA] flex items-center justify-center">
                            <FaBox className="w-6 h-6 text-[#64748B]" />
                          </div>
                          <p className="text-blue-800 text-sm font-medium">No orders found</p>
                          <p className="text-xs text-[#64748B]">Start shopping to see your orders here</p>
                          <Link href="/products" className="text-blue-600 hover:text-[#0891B2] text-sm font-medium hover:underline">
                            Start Shopping →
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => {
                      const hasDelivery = order.deliveryService?.courierOrderId;
                      
                      return (
                        <tr key={order._id} className="border-b border-blue-600/20 hover:bg-[#E2E7EA]/30 transition-colors">
                          <td className="px-3 py-2.5 text-xs font-mono font-medium text-blue-800">
                            {order.orderNumber || order._id.slice(-8).toUpperCase()}
                          </td>
                          <td className="px-3 py-2.5 text-xs text-[#64748B] whitespace-nowrap">
                            {isClient ? (
                              order.orderStatus === 'delivered' && order.deliveredAt ? (
                                <div className="flex flex-col gap-0.5">
                                  <div><span className="text-[#94A3B8] text-[10px]">Ordered:</span> {formatDate(order.createdAt)}</div>
                                  <div className="text-green-600"><span className="text-green-500 text-[10px]">Delivered:</span> {formatShortDate(order.deliveredAt)}</div>
                                </div>
                              ) : order.orderStatus === 'cancelled' && order.cancelledAt ? (
                                <div className="flex flex-col gap-0.5">
                                  <div><span className="text-[#94A3B8] text-[10px]">Ordered:</span> {formatDate(order.createdAt)}</div>
                                  <div className="text-red-600"><span className="text-red-500 text-[10px]">Cancelled:</span> {formatShortDate(order.cancelledAt)}</div>
                                </div>
                              ) : (
                                <div>{formatDate(order.createdAt)}</div>
                              )
                            ) : (
                              <div>Loading...</div>
                            )}
                          </td>
                          <td className="px-3 py-2.5 text-xs text-right font-bold text-blue-600">
                            ৳{order.total?.toFixed(2)}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {getStatusBadge(order.orderStatus)}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {getPaymentStatusBadge(order.paymentStatus)}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {getPaymentMethodBadge(order.paymentMethod)}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {hasDelivery ? getDeliveryBadge(order) : (
                              <span className="text-xs text-[#94A3B8]">N/A</span>
                            )}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowDetailsModal(true);
                                }}
                                className="inline-flex items-center gap-1 px-2 py-1 text-blue-600 hover:bg-[#E2E7EA] rounded-lg transition-colors text-xs font-medium"
                                title="View Details"
                              >
                                <FaEye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDownloadInvoice(order)}
                                disabled={downloadingOrders[order._id]}
                                className="inline-flex items-center gap-1 px-2 py-1 text-blue-600 hover:bg-[#E2E7EA] rounded-lg transition-colors text-xs font-medium disabled:opacity-50"
                                title="Download Invoice"
                              >
                                {downloadingOrders[order._id] ? (
                                  <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <FaDownload className="w-3.5 h-3.5" />
                                )}
                              </button>
                              {canCancelOrder(order) && (
                                <button
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setShowCancelModal(true);
                                  }}
                                  className="inline-flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs font-medium"
                                  title="Cancel Order"
                                >
                                  <FaBan className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-3 py-2 border-t border-blue-600/30 flex flex-wrap items-center justify-between gap-3 bg-[#E2E7EA]/20">
                <p className="text-xs text-[#64748B]">Showing {orders.length} of {totalOrders} orders</p>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 border border-blue-600/30 rounded-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition text-blue-800"
                  >
                    <FaChevronLeft className="w-3 h-3" />
                  </button>
                  <span className="px-3 py-1.5 text-xs font-medium text-blue-800">Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 border border-blue-600/30 rounded-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition text-blue-800"
                  >
                    <FaChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Modals */}
      <OrderDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        order={selectedOrder}
        onCancelOrder={() => {
          setShowDetailsModal(false);
          setShowCancelModal(true);
        }}
        onDownloadInvoice={handleDownloadInvoice}
        onTrackDelivery={handleTrackDelivery}
      />

      <CancelOrderModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        order={selectedOrder}
        onCancel={handleCancelOrder}
      />

      <TrackingModal
        isOpen={showTrackingModal}
        onClose={() => setShowTrackingModal(false)}
        trackingInfo={trackingInfo}
        order={selectedOrder}
      />
    </>
  );
}