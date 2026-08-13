
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FaSearch, 
//   FaPhone, 
//   FaBox, 
//   FaClock, 
//   FaCheckCircle, 
//   FaTruck, 
//   FaMapMarkerAlt, 
//   FaShoppingBag,
//   FaChevronDown,
//   FaChevronUp,
//   FaMoneyBillWave,
//   FaCreditCard,
//   FaExclamationTriangle,
//   FaShippingFast,
//   FaCheckDouble,
//   FaBan,
//   FaSpinner,
//   FaGift,
//   FaUser,
//   FaCalendarAlt,
//   FaDownload,
//   FaFileInvoice,
//   FaHeart,
//   FaStar,
//   FaEnvelope,
//   FaWhatsapp,
//   FaShieldAlt,
//   FaExternalLinkAlt,
//   FaUndo,
//   FaPhoneAlt,
//   FaCheck,
//   FaBoxOpen,
//   FaClipboardCheck,
//   FaChevronLeft,
//   FaChevronRight
// } from 'react-icons/fa';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import { generateInvoicePDF } from '@/utils/invoicePDF';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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

// // ========== GET DELIVERY STATUS LABEL ==========
// const getDeliveryStatusLabel = (status) => {
//   const found = DELIVERY_STATUSES.find(s => s.value === status);
//   return found?.label || status || 'N/A';
// };

// const getDeliveryStatusColor = (status) => {
//   const found = DELIVERY_STATUSES.find(s => s.value === status);
//   return found?.color || 'bg-[#E2E7EA]';
// };

// // ========== GET DELIVERY STATUS ICON ==========
// const getDeliveryStatusIcon = (status) => {
//   const icons = {
//     'pending': FaClock,
//     'processing': FaSpinner,
//     'picked_up': FaTruck,
//     'in_transit': FaShippingFast,
//     'out_for_delivery': FaTruck,
//     'delivered': FaCheckDouble,
//     'cancelled': FaBan,
//     'failed': FaExclamationTriangle,
//     'returned': FaUndo
//   };
//   return icons[status] || FaClock;
// };

// // ========== STATUS CONFIG ==========
// const STATUS_CONFIG = {
//   'placed': { 
//     label: 'Order Placed', 
//     icon: FaBox, 
//     color: 'bg-[#06B6D4]', 
//     textColor: 'text-[#06B6D4]', 
//     bgColor: 'bg-[#E2E7EA]/30',
//     borderColor: 'border-[#06B6D4]/30'
//   },
//   'follow_up': { 
//     label: 'Follow Up', 
//     icon: FaPhoneAlt, 
//     color: 'bg-[#06B6D4]', 
//     textColor: 'text-[#06B6D4]', 
//     bgColor: 'bg-[#E2E7EA]/30',
//     borderColor: 'border-[#06B6D4]/30'
//   },
//   'reminder': { 
//     label: 'Reminder', 
//     icon: FaClock, 
//     color: 'bg-yellow-500', 
//     textColor: 'text-yellow-600', 
//     bgColor: 'bg-yellow-50',
//     borderColor: 'border-yellow-200'
//   },
//   'accepted': { 
//     label: 'Accepted', 
//     icon: FaCheckCircle, 
//     color: 'bg-[#06B6D4]', 
//     textColor: 'text-[#06B6D4]', 
//     bgColor: 'bg-[#E2E7EA]/30',
//     borderColor: 'border-[#06B6D4]/30'
//   },
//   'approved': { 
//     label: 'Approved', 
//     icon: FaClipboardCheck, 
//     color: 'bg-[#06B6D4]', 
//     textColor: 'text-[#06B6D4]', 
//     bgColor: 'bg-[#E2E7EA]/30',
//     borderColor: 'border-[#06B6D4]/30'
//   },
//   'ready_to_ship': { 
//     label: 'Ready to Ship', 
//     icon: FaBoxOpen, 
//     color: 'bg-[#06B6D4]', 
//     textColor: 'text-[#06B6D4]', 
//     bgColor: 'bg-[#E2E7EA]/30',
//     borderColor: 'border-[#06B6D4]/30'
//   },
//   'courier_assigned': { 
//     label: 'Assigned to Courier', 
//     icon: FaTruck, 
//     color: 'bg-[#06B6D4]', 
//     textColor: 'text-[#06B6D4]', 
//     bgColor: 'bg-[#E2E7EA]/30',
//     borderColor: 'border-[#06B6D4]/30'
//   },
//   'processing': { 
//     label: 'Assigned to Courier', 
//     icon: FaTruck,
//     color: 'bg-[#06B6D4]', 
//     textColor: 'text-[#06B6D4]', 
//     bgColor: 'bg-[#E2E7EA]/30',
//     borderColor: 'border-[#06B6D4]/30'
//   },
//   'shipped': { 
//     label: 'Shipped', 
//     icon: FaShippingFast, 
//     color: 'bg-[#06B6D4]', 
//     textColor: 'text-[#06B6D4]', 
//     bgColor: 'bg-[#E2E7EA]/30',
//     borderColor: 'border-[#06B6D4]/30'
//   },
//   'out_for_delivery': { 
//     label: 'Out for Delivery', 
//     icon: FaTruck, 
//     color: 'bg-orange-500', 
//     textColor: 'text-orange-600', 
//     bgColor: 'bg-orange-50',
//     borderColor: 'border-orange-200'
//   },
//   'delivered': { 
//     label: 'Delivered', 
//     icon: FaCheckDouble, 
//     color: 'bg-green-500', 
//     textColor: 'text-green-600', 
//     bgColor: 'bg-green-50',
//     borderColor: 'border-green-200'
//   },
//   'cancelled': { 
//     label: 'Cancelled', 
//     icon: FaBan, 
//     color: 'bg-red-500', 
//     textColor: 'text-red-600', 
//     bgColor: 'bg-red-50',
//     borderColor: 'border-red-200'
//   },
//   'rejected': { 
//     label: 'Rejected', 
//     icon: FaBan, 
//     color: 'bg-red-500', 
//     textColor: 'text-red-600', 
//     bgColor: 'bg-red-50',
//     borderColor: 'border-red-200'
//   },
//   'refunded': { 
//     label: 'Refunded', 
//     icon: FaBan, 
//     color: 'bg-yellow-500', 
//     textColor: 'text-yellow-600', 
//     bgColor: 'bg-yellow-50',
//     borderColor: 'border-yellow-200'
//   },
//   'failed': { 
//     label: 'Failed', 
//     icon: FaExclamationTriangle, 
//     color: 'bg-red-500', 
//     textColor: 'text-red-600', 
//     bgColor: 'bg-red-50',
//     borderColor: 'border-red-200'
//   }
// };

// // ========== STATUS ORDER FOR PROGRESS BAR ==========
// const STATUS_ORDER = [
//   { key: 'order', label: 'Order' },
//   { key: 'placed', label: 'Placed' },
//   { key: 'follow_up', label: 'Follow Up' },
//   { key: 'reminder', label: 'Reminder' },
//   { key: 'accepted', label: 'Accepted' },
//   { key: 'approved', label: 'Approved' },
//   { key: 'ready_to_ship', label: 'Ready to Ship' },
//   { key: 'courier_assigned', label: 'Assigned' },
//   { key: 'out_for_delivery', label: 'Out for Delivery' },
//   { key: 'delivered', label: 'Delivered' }
// ];

// // ========== GET STATUS STEP INDEX ==========
// const getStatusStepIndex = (status) => {
//   if (status === 'processing') {
//     return STATUS_ORDER.findIndex(s => s.key === 'courier_assigned');
//   }
//   const index = STATUS_ORDER.findIndex(s => s.key === status);
//   return index;
// };

// // ========== GET CURRENT STATUS LABEL FOR PROGRESS BAR ==========
// const getCurrentStepLabel = (status) => {
//   if (status === 'processing') {
//     return 'Assigned to Courier';
//   }
//   const found = STATUS_ORDER.find(s => s.key === status);
//   return found?.label || status;
// };

// // ========== GET STATUS STEP KEY FOR DISPLAY ==========
// const getStatusStepKey = (status) => {
//   if (status === 'processing') {
//     return 'courier_assigned';
//   }
//   return status;
// };

// // ========== GET STATUS BADGE COLOR ==========
// const getStatusBadgeColor = (status) => {
//   const colors = {
//     'placed': 'text-[#06B6D4] bg-[#E2E7EA]/30 border-[#06B6D4]/30',
//     'follow_up': 'text-[#06B6D4] bg-[#E2E7EA]/30 border-[#06B6D4]/30',
//     'reminder': 'text-yellow-600 bg-yellow-50 border-yellow-200',
//     'accepted': 'text-[#06B6D4] bg-[#E2E7EA]/30 border-[#06B6D4]/30',
//     'approved': 'text-[#06B6D4] bg-[#E2E7EA]/30 border-[#06B6D4]/30',
//     'ready_to_ship': 'text-[#06B6D4] bg-[#E2E7EA]/30 border-[#06B6D4]/30',
//     'courier_assigned': 'text-[#06B6D4] bg-[#E2E7EA]/30 border-[#06B6D4]/30',
//     'processing': 'text-[#06B6D4] bg-[#E2E7EA]/30 border-[#06B6D4]/30',
//     'shipped': 'text-[#06B6D4] bg-[#E2E7EA]/30 border-[#06B6D4]/30',
//     'out_for_delivery': 'text-orange-600 bg-orange-50 border-orange-200',
//     'delivered': 'text-green-600 bg-green-50 border-green-200',
//     'cancelled': 'text-red-600 bg-red-50 border-red-200',
//     'rejected': 'text-red-600 bg-red-50 border-red-200',
//     'refunded': 'text-yellow-600 bg-yellow-50 border-yellow-200',
//     'failed': 'text-red-600 bg-red-50 border-red-200'
//   };
//   return colors[status] || 'text-[#004767] bg-[#E2E7EA] border-[#06B6D4]/30';
// };

// // ========== GET STATUS LABEL ==========
// const getStatusLabel = (status) => {
//   return STATUS_CONFIG[status]?.label || status;
// };

// // ========== GET PAYMENT METHOD BADGE ==========
// const getPaymentMethodBadge = (method) => {
//   const methods = {
//     'cod': { label: 'Cash on Delivery', color: 'bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/30', icon: FaMoneyBillWave },
//     'online': { label: 'Online Payment', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FaCreditCard },
//     'bkash': { label: 'bKash', color: 'bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/30', icon: FaMoneyBillWave },
//     'nagad': { label: 'Nagad', color: 'bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/30', icon: FaMoneyBillWave }
//   };
//   const info = methods[method] || { label: method || 'Unknown', color: 'bg-[#E2E7EA] text-[#004767] border-[#06B6D4]/30', icon: FaMoneyBillWave };
//   const Icon = info.icon;
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${info.color}`}>
//       <Icon className="w-3 h-3" />
//       {info.label}
//     </span>
//   );
// };

// // ========== ORDER CARD COMPONENT ==========
// const OrderCard = ({ order, index }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [downloading, setDownloading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);
//   const progressScrollRef = useRef(null);
  
//   const statusInfo = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG['placed'];
//   const StatusIcon = statusInfo.icon;

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Check scroll position for arrows
//   const checkScroll = () => {
//     if (progressScrollRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = progressScrollRef.current;
//       setShowLeftArrow(scrollLeft > 10);
//       setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
//     }
//   };

//   useEffect(() => {
//     const container = progressScrollRef.current;
//     if (container) {
//       container.addEventListener('scroll', checkScroll);
//       checkScroll();
//       window.addEventListener('resize', checkScroll);
//       return () => {
//         container.removeEventListener('scroll', checkScroll);
//         window.removeEventListener('resize', checkScroll);
//       };
//     }
//   }, []);

// const scrollProgress = (direction) => {
//   if (progressScrollRef.current) {
//     // Calculate scroll amount based on container width
//     const containerWidth = progressScrollRef.current.clientWidth;
//     const scrollAmount = Math.max(100, containerWidth * 0.6);
    
//     const newScrollLeft = direction === 'left' 
//       ? Math.max(0, progressScrollRef.current.scrollLeft - scrollAmount)
//       : progressScrollRef.current.scrollLeft + scrollAmount;
    
//     progressScrollRef.current.scrollTo({
//       left: newScrollLeft,
//       behavior: 'smooth'
//     });
//   }
// };

//   // ========== CALCULATE PROGRESS - FIXED ==========
//   const getProgress = () => {
//     const currentStatus = order.orderStatus;
    
//     // If cancelled, rejected, refunded, or failed - show 0%
//     if (['cancelled', 'rejected', 'refunded', 'failed'].includes(currentStatus)) {
//       return 0;
//     }
    
//     // If delivered, show 100%
//     if (currentStatus === 'delivered') return 100;
    
//     // Get the index of current status
//     const currentIndex = getStatusStepIndex(currentStatus);
    
//     // If status is not found in the order, return 0
//     if (currentIndex === -1) return 0;
    
//     // Total steps = STATUS_ORDER.length - 1 (excluding 'order' as it's the start)
//     const totalSteps = STATUS_ORDER.length - 1;
    
//     // Calculate percentage based on current index
//     // For 'courier_assigned' (index 7), we want it to show progress at ~85%
//     // For 'out_for_delivery' (index 8), show ~92%
//     const percentage = (currentIndex / totalSteps) * 100;
    
//     // Cap at 95% for non-final statuses
//     return Math.min(percentage, 95);
//   };

//   const isCancelled = ['cancelled', 'rejected', 'refunded', 'failed'].includes(order.orderStatus);
//   const isDelivered = order.orderStatus === 'delivered';
//   const hasDelivery = order.deliveryService?.courierOrderId;
//   const progress = getProgress();
//   const currentIndex = getStatusStepIndex(order.orderStatus);
//   const displayKey = getStatusStepKey(order.orderStatus);

//   // ========== HANDLE DOWNLOAD INVOICE ==========
//   const handleDownloadInvoice = async (e) => {
//     e.stopPropagation();
//     setDownloading(true);
//     try {
//       const orderId = order._id || order.id || order.orderId;
//       if (!orderId) {
//         toast.error('Order ID not found');
//         setDownloading(false);
//         return;
//       }

//       const response = await fetch(`${API_URL}/api/orders/public/${orderId}`, {
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       const data = await response.json();
//       if (data.success && data.data) {
//         await generateInvoicePDF(data.data);
//         toast.success('Invoice downloaded successfully!');
//       } else {
//         toast.error(data.error || 'Failed to fetch order details');
//       }
//     } catch (error) {
//       console.error('Download error:', error);
//       toast.error('Failed to download invoice');
//     } finally {
//       setDownloading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.08 }}
//       className="bg-white rounded-2xl border border-[#06B6D4]/30 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
//     >
//       {/* Order Header */}
//       <div 
//         className="p-4 sm:p-5 cursor-pointer hover:bg-[#E2E7EA]/20 transition-colors"
//         onClick={() => setExpanded(!expanded)}
//       >
//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div className="flex items-center gap-3 min-w-0">
//             <div className={`w-10 h-10 rounded-full ${statusInfo.bgColor} border ${statusInfo.borderColor} flex items-center justify-center flex-shrink-0`}>
//               <StatusIcon className={`w-5 h-5 ${statusInfo.textColor}`} />
//             </div>
//             <div className="min-w-0">
//               <p className="text-xs text-[#64748B] font-mono truncate">#{order.orderNumber}</p>
//               <p className="text-sm font-semibold text-[#004767]">
//                 {new Date(order.createdAt).toLocaleDateString('en-BD', {
//                   day: '2-digit',
//                   month: 'short',
//                   year: 'numeric'
//                 })}
//               </p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3 flex-shrink-0">
//             <div className="text-right">
//               <p className="text-sm font-bold text-[#06B6D4]">৳{order.total?.toFixed(2)}</p>
//               <p className="text-[10px] text-[#64748B]">{order.items?.length || 0} items</p>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(order.orderStatus)}`}>
//               {getStatusLabel(order.orderStatus)}
//             </div>
//             <button
//               onClick={handleDownloadInvoice}
//               disabled={downloading}
//               className="p-1.5 hover:bg-[#E2E7EA] rounded-full transition-colors text-[#64748B] hover:text-[#06B6D4] disabled:opacity-50"
//               title="Download Invoice"
//             >
//               {downloading ? (
//                 <div className="w-4 h-4 border-2 border-[#06B6D4] border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 <FaDownload className="w-4 h-4" />
//               )}
//             </button>
//             {expanded ? (
//               <FaChevronUp className="w-4 h-4 text-[#64748B] flex-shrink-0" />
//             ) : (
//               <FaChevronDown className="w-4 h-4 text-[#64748B] flex-shrink-0" />
//             )}
//           </div>
//         </div>

//       {/* ========== PROGRESS BAR WITH SCROLL ON MOBILE - FIXED ========== */}
// {/* ========== PROGRESS BAR WITH SCROLL ON MOBILE - FIXED ========== */}
// {!isCancelled ? (
//   <div className="mt-3">
//     {/* Progress Bar */}
//     <div className="w-full h-2 bg-[#E2E7EA] rounded-full overflow-hidden">
//       <div 
//         className={`h-full rounded-full transition-all duration-700 ${
//           isDelivered ? 'bg-green-500' : 'bg-gradient-to-r from-[#06B6D4] to-[#004767]'
//         }`}
//         style={{ width: `${progress}%` }}
//       />
//     </div>
    
//     {/* Status Steps - With Scroll on Mobile */}
//     <div className="relative mt-1.5">
//       {/* Left Arrow - Mobile only */}
//       {isMobile && showLeftArrow && (
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             scrollProgress('left');
//           }}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-1 shadow-md border border-[#06B6D4]/20 hover:bg-white transition-all"
//         >
//           <FaChevronLeft className="w-3 h-3 text-[#06B6D4]" />
//         </button>
//       )}
      
//       {/* Scrollable Container - NO left padding/margin */}
//       <div
//         ref={progressScrollRef}
//         className="overflow-x-auto scroll-smooth hide-scrollbar"
//         style={{ 
//           scrollbarWidth: 'none', 
//           msOverflowStyle: 'none',
//           WebkitOverflowScrolling: 'touch',
//           paddingLeft: 0,
//           marginLeft: 0
//         }}
//       >
//         <div className={`flex ${isMobile ? 'min-w-max gap-1' : 'justify-between w-full'}`}>
//           {STATUS_ORDER.map((step, idx) => {
//             const isReached = step.key === 'order' || currentIndex >= idx;
//             const isCurrent = displayKey === step.key;
            
//             return (
//               <div key={step.key} className="flex flex-col items-center flex-shrink-0">
//                 <div 
//                   className={`text-[6px] sm:text-[8px] font-medium transition-colors text-center whitespace-nowrap ${
//                     isReached ? 'text-[#06B6D4]' : 'text-[#94A3B8]'
//                   } ${isCurrent ? 'font-bold text-[#06B6D4]' : ''}`}
//                 >
//                   {step.label}
//                 </div>
//                 {isCurrent && (
//                   <div className="w-1 h-1 rounded-full bg-[#06B6D4] mt-0.5" />
//                 )}
//                 {/* Show a small dot for reached steps */}
//                 {isReached && !isCurrent && step.key !== 'order' && (
//                   <div className="w-0.5 h-0.5 rounded-full bg-[#06B6D4]/40 mt-0.5" />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
      
//       {/* Right Arrow - Mobile only */}
//       {isMobile && showRightArrow && (
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             scrollProgress('right');
//           }}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-1 shadow-md border border-[#06B6D4]/20 hover:bg-white transition-all"
//         >
//           <FaChevronRight className="w-3 h-3 text-[#06B6D4]" />
//         </button>
//       )}
//     </div>
    
//     {/* Current Status Indicator */}
//     <div className="flex justify-center mt-1">
//       <span className="text-[8px] sm:text-[10px] text-[#64748B]">
//         {isDelivered ? (
//           <span className="font-medium text-green-600">✅ Delivered</span>
//         ) : (
//           <>
//             <span className="hidden xs:inline">Current: </span>
//             <span className="font-medium text-[#06B6D4]">
//               {getCurrentStepLabel(order.orderStatus)}
//             </span>
//           </>
//         )}
//       </span>
//     </div>
//   </div>
// ) : (
//   <div className="mt-2">
//     <span className="text-[10px] text-red-500 font-medium">
//       {order.orderStatus === 'cancelled' ? '❌ Order Cancelled' : 
//        order.orderStatus === 'rejected' ? '❌ Order Rejected' :
//        order.orderStatus === 'refunded' ? '↩️ Order Refunded' :
//        '❌ Order Failed'}
//     </span>
//   </div>
// )}
//       </div>

//       {/* Expanded Content */}
//       <AnimatePresence>
//         {expanded && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="overflow-hidden"
//           >
//             <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-[#06B6D4]/20 space-y-4">
//               {/* Payment & Tracking Info */}
//               <div className="flex flex-wrap gap-3 items-center">
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs text-[#64748B]">Payment:</span>
//                   {getPaymentMethodBadge(order.paymentMethod)}
//                 </div>
//                 {order.trackingNumber && (
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-[#64748B]">Tracking:</span>
//                     <span className="text-xs font-mono text-[#06B6D4]">{order.trackingNumber}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Delivery Info */}
//               {hasDelivery && (
//                 <div className="bg-[#06B6D4]/5 border border-[#06B6D4]/20 rounded-xl p-3">
//                   <h4 className="text-xs font-bold text-[#004767] flex items-center gap-2 mb-2">
//                     <FaTruck className="w-3.5 h-3.5 text-[#06B6D4]" />
//                     Courier Delivery Information
//                   </h4>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
//                     <div>
//                       <span className="text-[#64748B]">Courier Service:</span>
//                       <span className="font-medium text-[#004767] ml-1">{order.deliveryService?.courierName || 'N/A'}</span>
//                     </div>
//                     <div>
//                       <span className="text-[#64748B]">Tracking Number:</span>
//                       <span className="font-mono text-[#06B6D4] ml-1">{order.deliveryService?.trackingNumber || 'N/A'}</span>
//                     </div>
//                     {order.deliveryService?.trackingUrl && (
//                       <div className="col-span-1 sm:col-span-2 mt-1 pt-1.5 border-t border-[#06B6D4]/10">
//                         <div className="flex items-center gap-2">
//                           <span className="text-[#64748B] text-xs">Track your parcel:</span>
//                           <a
//                             href={order.deliveryService.trackingUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#06B6D4] text-white text-xs font-medium rounded-lg hover:bg-[#0891B2] transition-all hover:shadow-md hover:shadow-[#06B6D4]/25"
//                           >
//                             <FaExternalLinkAlt className="w-3 h-3" />
//                             Track on {order.deliveryService?.courierName || 'Courier'}
//                           </a>
//                         </div>
//                         <p className="text-[10px] text-[#64748B] mt-1">
//                           Click the button above to track your parcel
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Order Items */}
//               <div>
//                 <h4 className="text-xs font-semibold text-[#004767] mb-2 flex items-center gap-2">
//                   <FaShoppingBag className="w-3.5 h-3.5 text-[#06B6D4]" />
//                   Order Items ({order.items?.length || 0})
//                 </h4>
//                 <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
//                   {order.items?.map((item, idx) => (
//                     <div key={idx} className="flex items-center gap-3 py-1.5 border-b border-[#06B6D4]/10 last:border-0">
//                       <img 
//                         src={item.image || 'https://via.placeholder.com/40'} 
//                         alt={item.name}
//                         className="w-8 h-8 rounded-lg object-cover flex-shrink-0 bg-[#E2E7EA] border border-[#06B6D4]/20"
//                         onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
//                       />
//                       <div className="flex-1 min-w-0">
//                         <p className="text-xs font-medium text-[#004767] truncate">{item.name}</p>
//                         <p className="text-[10px] text-[#64748B]">Qty: {item.quantity}</p>
//                       </div>
//                       <p className="text-xs font-bold text-[#06B6D4]">৳{(item.price * item.quantity).toFixed(2)}</p>
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className="mt-2 pt-2 border-t border-[#06B6D4]/20 text-xs">
//                   <div className="flex justify-between">
//                     <span className="text-[#64748B]">Subtotal</span>
//                     <span className="text-[#004767]">৳{order.subtotal?.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-[#64748B]">Shipping</span>
//                     <span className="text-[#004767]">৳{order.shippingCost?.toFixed(2)}</span>
//                   </div>
//                   {order.discount > 0 && (
//                     <div className="flex justify-between text-green-600">
//                       <span>Discount</span>
//                       <span>- ৳{order.discount?.toFixed(2)}</span>
//                     </div>
//                   )}
//                   <div className="flex justify-between font-bold text-[#06B6D4] pt-1 border-t border-[#06B6D4]/20 mt-1">
//                     <span>Total</span>
//                     <span>৳{order.total?.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Status Timeline */}
//               {order.timeline && order.timeline.length > 0 && (
//                 <div>
//                   <h4 className="text-xs font-semibold text-[#004767] mb-2 flex items-center gap-2">
//                     <FaClock className="w-3.5 h-3.5 text-[#06B6D4]" />
//                     Status History
//                   </h4>
//                   <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
//                     {order.timeline.map((entry, idx) => {
//                       const entryStatusInfo = STATUS_CONFIG[entry.status] || STATUS_CONFIG['placed'];
//                       const isCurrent = entry.status === order.orderStatus;
//                       const displayLabel = entryStatusInfo.label || entry.status;
                      
//                       return (
//                         <div key={idx} className="flex items-start gap-2.5">
//                           <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
//                             isCurrent ? 'bg-[#06B6D4] ring-2 ring-[#06B6D4]/30' : 'bg-[#94A3B8]'
//                           }`} />
//                           <div className="flex-1">
//                             <div className="flex flex-wrap items-center gap-1.5">
//                               <span className={`text-xs font-medium ${isCurrent ? 'text-[#06B6D4]' : 'text-[#004767]'}`}>
//                                 {displayLabel}
//                               </span>
//                               <span className="text-[9px] text-[#64748B]">{entry.formattedDate}</span>
//                             </div>
//                             {entry.note && (
//                               <p className="text-[10px] text-[#64748B]">{entry.note}</p>
//                             )}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Download Invoice Button */}
//               <button
//                 onClick={handleDownloadInvoice}
//                 disabled={downloading}
//                 className="w-full py-2.5 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white rounded-xl hover:shadow-lg hover:shadow-[#06B6D4]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
//               >
//                 {downloading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Generating Invoice...
//                   </>
//                 ) : (
//                   <>
//                     <FaFileInvoice className="w-4 h-4" />
//                     Download Invoice
//                   </>
//                 )}
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Hide scrollbar styles */}
//       <style jsx>{`
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </motion.div>
//   );
// };

// // ========== MAIN TRACK PAGE ==========
// export default function TrackPage() {
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [trackingData, setTrackingData] = useState(null);
//   const [error, setError] = useState(null);
//   const [searched, setSearched] = useState(false);

//   const handleSearch = async (e) => {
//     e.preventDefault();
    
//     if (!phone.trim()) {
//       toast.error('Please enter a phone number');
//       return;
//     }
    
//     const phoneRegex = /^01[3-9]\d{8}$/;
//     if (!phoneRegex.test(phone.trim())) {
//       toast.error('Please enter a valid Bangladesh phone number (01XXXXXXXXX)');
//       return;
//     }
    
//     setLoading(true);
//     setError(null);
//     setSearched(true);
    
//     try {
//       const response = await fetch(`${API_URL}/api/orders/track/${phone.trim()}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setTrackingData(data.data);
//         toast.success(`Found ${data.data.totalOrders} order(s)`);
//       } else {
//         setError(data.error || 'No orders found for this phone number');
//         setTrackingData(null);
//       }
//     } catch (error) {
//       console.error('Track error:', error);
//       setError('Network error. Please try again.');
//       setTrackingData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
      
//       <div className="min-h-screen bg-[#E2E7EA]/20 pt-12 lg:pt-10 pb-8">
//         <div className="container mx-auto px-4 max-w-4xl">
//           {/* Header */}
//           <div className="text-center mb-6 sm:mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#06B6D4] to-[#004767] rounded-full mb-3 shadow-lg shadow-[#06B6D4]/25">
//               <FaTruck className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#004767]">
//               Track Your Orders
//             </h1>
//             <p className="text-sm text-[#64748B] mt-1">Enter your phone number to see all your orders</p>
//           </div>

//           {/* Search Form */}
//           <div className="bg-white rounded-2xl border border-[#06B6D4]/30 p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
//             <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
//               <div className="flex-1 relative">
//                 <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B]" />
//                 <input
//                   type="tel"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="Enter your phone number (01XXXXXXXXX)"
//                   className="w-full pl-10 pr-3 py-2.5 border border-[#06B6D4]/30 rounded-xl focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none text-sm sm:text-base text-[#004767] placeholder:text-[#64748B]"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2.5 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#06B6D4]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <FaSearch className="w-4 h-4" />
//                     Track Orders
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 mb-6"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <FaExclamationTriangle className="w-4 h-4 text-red-500" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-red-700 font-medium">No Orders Found</p>
//                   <p className="text-xs text-red-600">{error}</p>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* Results */}
//           {trackingData && (
//             <div className="space-y-4">
//               {/* Summary Banner */}
//               <div className="bg-gradient-to-r from-[#06B6D4] to-[#004767] rounded-2xl p-4 text-white shadow-lg shadow-[#06B6D4]/25">
//                 <div className="flex flex-wrap items-center justify-between gap-3">
//                   <div>
//                     <p className="text-xs text-white/80">Phone Number</p>
//                     <p className="text-lg font-bold">{trackingData.phone}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-white/80">Total Orders</p>
//                     <p className="text-2xl font-bold">{trackingData.totalOrders}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Cards */}
//               <div className="space-y-3">
//                 {trackingData.orders.map((order, index) => (
//                   <OrderCard key={order.orderNumber || index} order={order} index={index} />
//                 ))}
//               </div>

//               {/* Continue Shopping */}
//               <div className="text-center pt-4">
//                 <Link href="/products" className="inline-flex items-center gap-2 text-[#06B6D4] hover:text-[#0891B2] transition-colors text-sm font-medium">
//                   <span>←</span> Continue Shopping
//                 </Link>
//               </div>
//             </div>
//           )}

//           {/* Not Found / Initial State */}
//           {!trackingData && !error && !loading && searched && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="bg-white rounded-2xl border border-[#06B6D4]/30 p-8 sm:p-12 text-center shadow-sm"
//             >
//               <div className="w-16 h-16 mx-auto mb-4 bg-[#E2E7EA] rounded-full flex items-center justify-center border border-[#06B6D4]/30">
//                 <FaSearch className="w-8 h-8 text-[#64748B]" />
//               </div>
//               <h3 className="text-lg font-semibold text-[#004767] mb-2">
//                 No Orders Found
//               </h3>
//               <p className="text-sm text-[#64748B]">We couldn't find any orders with this phone number.</p>
//               <p className="text-xs text-[#64748B] mt-2">Please check the number and try again.</p>
//             </motion.div>
//           )}

//           {/* Trust Badges */}
//           <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#64748B]">
//             <div className="flex items-center gap-2">
//               <FaShieldAlt className="w-4 h-4 text-[#06B6D4]" />
//               <span>Secure Tracking</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaClock className="w-4 h-4 text-[#06B6D4]" />
//               <span>Real-time Updates</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaStar className="w-4 h-4 text-[#06B6D4]" />
//               <span>Premium Quality</span>
//             </div>
//           </div>

//           {/* Help Section */}
//           <div className="mt-6 sm:mt-8 text-center">
//             <p className="text-xs text-[#64748B]">Need help? Contact our support team</p>
//             <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
//               <a href="tel:+8801712345678" className="text-sm text-[#06B6D4] hover:text-[#0891B2] transition-colors flex items-center gap-1">
//                 <FaPhone className="w-3 h-3" />
//                 +880 1XXXXXXXXX
//               </a>
//               <span className="text-[#06B6D4]/30 hidden sm:inline">|</span>
//               <a href="mailto:support@example.com" className="text-sm text-[#06B6D4] hover:text-[#0891B2] transition-colors flex items-center gap-1">
//                 <FaEnvelope className="w-3 h-3" />
//                 support@example.com
//               </a>
//               <span className="text-[#06B6D4]/30 hidden sm:inline">|</span>
//               <a href="https://wa.me/8801712345678" target="_blank" rel="noopener noreferrer" className="text-sm text-[#06B6D4] hover:text-[#0891B2] transition-colors flex items-center gap-1">
//                 <FaWhatsapp className="w-3 h-3" />
//                 WhatsApp
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <Footer />
//     </>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaPhone, 
  FaBox, 
  FaClock, 
  FaCheckCircle, 
  FaTruck, 
  FaMapMarkerAlt, 
  FaShoppingBag,
  FaChevronDown,
  FaChevronUp,
  FaMoneyBillWave,
  FaCreditCard,
  FaExclamationTriangle,
  FaShippingFast,
  FaCheckDouble,
  FaBan,
  FaSpinner,
  FaGift,
  FaUser,
  FaCalendarAlt,
  FaDownload,
  FaFileInvoice,
  FaHeart,
  FaStar,
  FaEnvelope,
  FaWhatsapp,
  FaShieldAlt,
  FaExternalLinkAlt,
  FaUndo,
  FaPhoneAlt,
  FaCheck,
  FaBoxOpen,
  FaClipboardCheck,
  FaChevronLeft,
  FaChevronRight,
  FaPause
} from 'react-icons/fa';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { generateInvoicePDF } from '@/utils/invoicePDF';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ========== FETCH FOOTER DATA ==========
const fetchFooterData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/footer`);
    if (!response.ok) throw new Error('Failed to fetch footer data');
    const data = await response.json();
    if (data.success && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return null;
  }
};

// ========== GET CONTACT ITEMS FROM FOOTER DATA ==========
const getContactItemsFromFooter = (footerData) => {
  if (!footerData) {
    // Default fallback contacts
    return [
      { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-blue-600' },
      { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-blue-600' },
      { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
    ];
  }

  const contacts = [];
  const company = footerData.company || {};
  const contactColumn = footerData.columns?.find(col => col.type === 'contact');
  const items = contactColumn?.items || [];

  // Phone
  const phoneItem = items.find(item => item.type === 'phone');
  if (phoneItem) {
    const cleanPhone = phoneItem.value.replace(/[^0-9+]/g, '');
    contacts.push({
      icon: FaPhone,
      label: 'Phone',
      value: phoneItem.value,
      link: `tel:${cleanPhone}`,
      color: 'text-blue-600'
    });
  } else if (company.phone) {
    const cleanPhone = company.phone.replace(/[^0-9+]/g, '');
    contacts.push({
      icon: FaPhone,
      label: 'Phone',
      value: company.phone,
      link: `tel:${cleanPhone}`,
      color: 'text-blue-600'
    });
  }

  // Email
  const emailItem = items.find(item => item.type === 'email');
  if (emailItem) {
    contacts.push({
      icon: FaEnvelope,
      label: 'Email',
      value: emailItem.value,
      link: `mailto:${emailItem.value}`,
      color: 'text-blue-600'
    });
  } else if (company.email) {
    contacts.push({
      icon: FaEnvelope,
      label: 'Email',
      value: company.email,
      link: `mailto:${company.email}`,
      color: 'text-blue-600'
    });
  }

  // WhatsApp
  const whatsappItem = items.find(item => item.type === 'whatsapp');
  if (whatsappItem) {
    const cleanPhone = whatsappItem.value.replace(/[^0-9+]/g, '');
    contacts.push({
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: whatsappItem.value,
      link: `https://wa.me/${cleanPhone}`,
      color: 'text-green-500'
    });
  } else if (company.whatsapp) {
    const cleanPhone = company.whatsapp.replace(/[^0-9+]/g, '');
    contacts.push({
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: company.whatsapp,
      link: `https://wa.me/${cleanPhone}`,
      color: 'text-green-500'
    });
  }

  // If no contacts found, use defaults
  if (contacts.length === 0) {
    contacts.push(
      { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-blue-600' },
      { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-blue-600' },
      { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
    );
  }

  return contacts;
};

// ========== STATUS CONFIG - Gradient Blue to Cyan Theme ==========
const STATUS_CONFIG = {
  'placed': { 
    label: 'Order Placed', 
    icon: FaBox, 
    color: 'bg-gradient-to-r from-blue-600 to-cyan-600', 
    textColor: 'text-blue-600', 
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  'follow_up': { 
    label: 'Follow Up', 
    icon: FaPhoneAlt, 
    color: 'bg-gradient-to-r from-blue-600 to-cyan-600', 
    textColor: 'text-blue-600', 
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  'reminder': { 
    label: 'Reminder', 
    icon: FaClock, 
    color: 'bg-yellow-500', 
    textColor: 'text-yellow-600', 
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  'accepted': { 
    label: 'Accepted', 
    icon: FaCheckCircle, 
    color: 'bg-gradient-to-r from-blue-600 to-cyan-600', 
    textColor: 'text-blue-600', 
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  'approved': { 
    label: 'Approved', 
    icon: FaClipboardCheck, 
    color: 'bg-gradient-to-r from-blue-600 to-cyan-600', 
    textColor: 'text-blue-600', 
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  'hold': { 
    label: 'On Hold', 
    icon: FaPause, 
    color: 'bg-yellow-500', 
    textColor: 'text-yellow-600', 
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  'ready_to_ship': { 
    label: 'Ready to Ship', 
    icon: FaBoxOpen, 
    color: 'bg-gradient-to-r from-blue-600 to-cyan-600', 
    textColor: 'text-blue-600', 
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  'courier_assigned': { 
    label: 'Assigned to Courier', 
    icon: FaTruck, 
    color: 'bg-gradient-to-r from-blue-600 to-cyan-600', 
    textColor: 'text-blue-600', 
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  'processing': { 
    label: 'Processing', 
    icon: FaSpinner,
    color: 'bg-gradient-to-r from-blue-600 to-cyan-600', 
    textColor: 'text-blue-600', 
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  'shipped': { 
    label: 'Shipped', 
    icon: FaShippingFast, 
    color: 'bg-gradient-to-r from-blue-600 to-cyan-600', 
    textColor: 'text-blue-600', 
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  'out_for_delivery': { 
    label: 'Out for Delivery', 
    icon: FaTruck, 
    color: 'bg-orange-500', 
    textColor: 'text-orange-600', 
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  'delivered': { 
    label: 'Delivered', 
    icon: FaCheckDouble, 
    color: 'bg-green-500', 
    textColor: 'text-green-600', 
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  'cancelled': { 
    label: 'Cancelled', 
    icon: FaBan, 
    color: 'bg-red-500', 
    textColor: 'text-red-600', 
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  'rejected': { 
    label: 'Rejected', 
    icon: FaBan, 
    color: 'bg-red-500', 
    textColor: 'text-red-600', 
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  'refunded': { 
    label: 'Refunded', 
    icon: FaBan, 
    color: 'bg-yellow-500', 
    textColor: 'text-yellow-600', 
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  'failed': { 
    label: 'Failed', 
    icon: FaExclamationTriangle, 
    color: 'bg-red-500', 
    textColor: 'text-red-600', 
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  'returned': { 
    label: 'Returned', 
    icon: FaUndo, 
    color: 'bg-purple-500', 
    textColor: 'text-purple-600', 
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  'partial_delivery': { 
    label: 'Partial Delivery', 
    icon: FaBox, 
    color: 'bg-yellow-500', 
    textColor: 'text-yellow-600', 
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  }
};

// ========== GET STATUS BADGE COLOR ==========
const getStatusBadgeColor = (status) => {
  const colors = {
    'placed': 'text-blue-600 bg-blue-50 border-blue-200',
    'follow_up': 'text-blue-600 bg-blue-50 border-blue-200',
    'reminder': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    'accepted': 'text-blue-600 bg-blue-50 border-blue-200',
    'approved': 'text-blue-600 bg-blue-50 border-blue-200',
    'hold': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    'ready_to_ship': 'text-blue-600 bg-blue-50 border-blue-200',
    'courier_assigned': 'text-blue-600 bg-blue-50 border-blue-200',
    'processing': 'text-blue-600 bg-blue-50 border-blue-200',
    'shipped': 'text-blue-600 bg-blue-50 border-blue-200',
    'out_for_delivery': 'text-orange-600 bg-orange-50 border-orange-200',
    'delivered': 'text-green-600 bg-green-50 border-green-200',
    'cancelled': 'text-red-600 bg-red-50 border-red-200',
    'rejected': 'text-red-600 bg-red-50 border-red-200',
    'refunded': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    'failed': 'text-red-600 bg-red-50 border-red-200',
    'returned': 'text-purple-600 bg-purple-50 border-purple-200',
    'partial_delivery': 'text-yellow-600 bg-yellow-50 border-yellow-200'
  };
  return colors[status] || 'text-gray-600 bg-gray-100 border-gray-200';
};

// ========== GET STATUS LABEL ==========
const getStatusLabel = (status) => {
  return STATUS_CONFIG[status]?.label || status;
};

// ========== GET PAYMENT METHOD BADGE ==========
const getPaymentMethodBadge = (method) => {
  const methods = {
    'cod': { label: 'Cash on Delivery', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FaMoneyBillWave },
    'online': { label: 'Online Payment', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FaCreditCard },
    'bkash': { label: 'bKash', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FaMoneyBillWave },
    'nagad': { label: 'Nagad', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FaMoneyBillWave }
  };
  const info = methods[method] || { label: method || 'Unknown', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: FaMoneyBillWave };
  const Icon = info.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${info.color}`}>
      <Icon className="w-3 h-3" />
      {info.label}
    </span>
  );
};

// ========== GROUP ITEMS BY PRODUCT ==========
const groupItemsByProduct = (items) => {
  if (!items || items.length === 0) return [];
  
  const grouped = {};
  
  items.forEach((item, index) => {
    let productId = item.productId;
    if (productId && typeof productId === 'object' && productId._id) {
      productId = productId._id.toString();
    } else if (productId) {
      productId = productId.toString();
    } else {
      productId = `item-${index}`;
    }
    
    const productName = item.productName || item.name || item.product?.name || 'Unknown Product';
    const image = item.image || item.product?.images?.[0]?.url || '';
    const price = item.discountPrice || item.regularPrice || item.price || 0;
    const unit = item.unit || 'pcs';
    
    if (!grouped[productId]) {
      grouped[productId] = {
        productId: productId,
        productName: productName,
        image: image,
        regularPrice: item.regularPrice || price,
        discountPrice: item.discountPrice || 0,
        unit: unit,
        colors: [],
        totalQuantity: 0,
        basePrice: price
      };
    }
    
    let colorValue = null;
    let colorQty = item.quantity || 0;
    let colorPrice = price;
    
    if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
      const validColors = item.colors.filter(c => 
        c.color && 
        c.color !== 'null' && 
        c.color !== '' && 
        c.color !== 'undefined'
      );
      
      if (validColors.length > 0) {
        validColors.forEach(c => {
          const qty = c.quantity || 0;
          const p = c.price || price;
          const color = c.color;
          
          const existingColor = grouped[productId].colors.find(gc => gc.color === color);
          if (existingColor) {
            existingColor.quantity += qty;
          } else {
            grouped[productId].colors.push({
              color: color,
              quantity: qty,
              price: p
            });
          }
          grouped[productId].totalQuantity += qty;
        });
        return;
      }
    }
    
    if (item.selectedColor && 
        item.selectedColor !== 'null' && 
        item.selectedColor !== '' && 
        item.selectedColor !== 'undefined') {
      
      colorValue = item.selectedColor;
      const existingColor = grouped[productId].colors.find(gc => gc.color === colorValue);
      if (existingColor) {
        existingColor.quantity += colorQty;
      } else {
        grouped[productId].colors.push({
          color: colorValue,
          quantity: colorQty,
          price: colorPrice
        });
      }
      grouped[productId].totalQuantity += colorQty;
      return;
    }
    
    const existingDefault = grouped[productId].colors.find(gc => gc.color === null);
    if (existingDefault) {
      existingDefault.quantity += colorQty;
    } else {
      grouped[productId].colors.push({
        color: null,
        quantity: colorQty,
        price: colorPrice
      });
    }
    grouped[productId].totalQuantity += colorQty;
  });
  
  return Object.values(grouped);
};

// ========== ORDER CARD COMPONENT ==========
const OrderCard = ({ order, index, contactItems }) => {
  const [expanded, setExpanded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const statusInfo = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG['placed'];
  const StatusIcon = statusInfo.icon;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isTerminal = ['cancelled', 'rejected', 'refunded', 'failed'].includes(order.orderStatus);
  const isDelivered = order.orderStatus === 'delivered';
  const isReturned = order.orderStatus === 'returned';
  const isPartialDelivery = order.orderStatus === 'partial_delivery';
  const isHold = order.orderStatus === 'hold';
  const hasDelivery = order.deliveryService?.courierOrderId;

  const groupedItems = groupItemsByProduct(order.items || []);

  // ========== GET STATUS HISTORY FOR TIMELINE ==========
  const getStatusTimeline = () => {
    if (!order.statusHistory || order.statusHistory.length === 0) {
      return [
        {
          status: order.orderStatus,
          label: getStatusLabel(order.orderStatus),
          timestamp: order.createdAt,
          isCurrent: true,
          isCompleted: true,
          color: getStatusBadgeColor(order.orderStatus)
        }
      ];
    }
    
    const uniqueStatuses = [];
    const seen = new Set();
    
    order.statusHistory.forEach(entry => {
      if (!seen.has(entry.status)) {
        seen.add(entry.status);
        uniqueStatuses.push({
          status: entry.status,
          label: getStatusLabel(entry.status),
          timestamp: entry.timestamp,
          color: getStatusBadgeColor(entry.status)
        });
      }
    });
    
    const hasCurrentStatus = uniqueStatuses.some(s => s.status === order.orderStatus);
    if (!hasCurrentStatus) {
      uniqueStatuses.push({
        status: order.orderStatus,
        label: getStatusLabel(order.orderStatus),
        timestamp: order.updatedAt || order.createdAt,
        color: getStatusBadgeColor(order.orderStatus)
      });
    }
    
    if (uniqueStatuses.length > 0) {
      uniqueStatuses[uniqueStatuses.length - 1].isCurrent = true;
      uniqueStatuses[uniqueStatuses.length - 1].isCompleted = true;
    }
    
    uniqueStatuses.forEach((s, index) => {
      s.isCompleted = true;
      if (index === uniqueStatuses.length - 1) {
        s.isCurrent = true;
      }
    });
    
    return uniqueStatuses;
  };

  const statusTimeline = getStatusTimeline();

  const handleDownloadInvoice = async (e) => {
    e.stopPropagation();
    setDownloading(true);
    try {
      const orderId = order._id || order.id || order.orderId;
      if (!orderId) {
        toast.error('Order ID not found');
        setDownloading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/orders/public/${orderId}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      if (data.success && data.data) {
        await generateInvoicePDF(data.data);
        toast.success('Invoice downloaded successfully!');
      } else {
        toast.error(data.error || 'Failed to fetch order details');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download invoice');
    } finally {
      setDownloading(false);
    }
  };

  const getStatusMessage = () => {
    const status = order.orderStatus;
    const messages = {
      'placed': 'Your order has been placed successfully.',
      'follow_up': 'Your order is being reviewed by our team.',
      'reminder': 'A reminder has been sent regarding your order.',
      'accepted': 'Your order has been accepted and is being prepared.',
      'approved': 'Your order has been approved and is ready for processing.',
      'hold': 'Your order has been placed on hold. We will contact you shortly.',
      'ready_to_ship': 'Your order is packed and ready to be shipped!',
      'courier_assigned': 'A courier has been assigned to deliver your order.',
      'processing': 'Your order is being processed by the courier service.',
      'shipped': 'Your order has been shipped and is on its way!',
      'out_for_delivery': 'Your order is out for delivery! Get ready to receive it.',
      'delivered': 'Your order has been delivered! We hope you love your new products.',
      'cancelled': 'Your order has been cancelled.',
      'rejected': 'Your order has been rejected.',
      'refunded': 'Your order has been refunded.',
      'failed': 'Your order has failed.',
      'returned': 'Your order has been returned.',
      'partial_delivery': 'Part of your order has been delivered. The remaining items will be delivered soon.'
    };
    return messages[status] || 'Your order is being processed.';
  };

  // Function to handle contact click
  const handleContactClick = (contact) => {
    if (contact.label === 'Phone') {
      window.location.href = contact.link;
    } else if (contact.label === 'Email') {
      const email = contact.link.replace('mailto:', '');
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
    } else if (contact.label === 'WhatsApp') {
      window.open(contact.link, '_blank', 'noopener,noreferrer');
    } else {
      window.open(contact.link, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Order Header */}
      <div 
        className="p-4 sm:p-5 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 rounded-full ${statusInfo.bgColor} border ${statusInfo.borderColor} flex items-center justify-center flex-shrink-0`}>
              <StatusIcon className={`w-5 h-5 ${statusInfo.textColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 font-mono truncate">#{order.orderNumber}</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(order.createdAt).toLocaleDateString('en-BD', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-sm font-bold text-blue-600">৳{order.total?.toFixed(2)}</p>
             
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(order.orderStatus)}`}>
              {getStatusLabel(order.orderStatus)}
            </div>
            <button
              onClick={handleDownloadInvoice}
              disabled={downloading}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-blue-600 disabled:opacity-50"
              title="Download Invoice"
            >
              {downloading ? (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaDownload className="w-4 h-4" />
              )}
            </button>
            {expanded ? (
              <FaChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
            ) : (
              <FaChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-gray-200 space-y-4">
              {/* Status Message */}
         

              {/* ========== STATUS TIMELINE ========== */}
              {!isTerminal && statusTimeline.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaClock className="w-3.5 h-3.5 text-blue-600" />
                    Order Progress
                  </h4>
                  <div className="relative">
                    <div className="flex items-start justify-between overflow-x-auto pb-3 gap-1 sm:gap-2">
                      {statusTimeline.map((step, index) => {
                        const isLast = index === statusTimeline.length - 1;
                        const isCompleted = step.isCompleted;
                        const isCurrent = step.isCurrent;
                        const formattedTime = step.timestamp ? new Date(step.timestamp).toLocaleString('en-BD', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : '';
                        
                        return (
                          <div key={step.status} className="flex flex-col items-center flex-1 min-w-[60px] sm:min-w-[80px] relative">
                            {!isLast && (
                              <div className={`absolute top-3 sm:top-4 left-[55%] sm:left-[60%] w-[70%] sm:w-[80%] h-0.5 ${
                                isCompleted ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gray-200'
                              }`} />
                            )}
                            
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[8px] sm:text-xs font-bold z-10 ${
                              isCompleted ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-200' : 'bg-gray-200 text-gray-500 border border-gray-300'
                            } ${isCurrent ? 'ring-2 sm:ring-4 ring-blue-200' : ''}`}>
                              {isCompleted ? <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" /> : index + 1}
                            </div>
                            
                            <span className={`text-[7px] sm:text-[9px] mt-1 sm:mt-1.5 text-center font-medium leading-tight ${
                              isCompleted ? 'text-gray-800' : 'text-gray-400'
                            }`}>
                              {step.label}
                            </span>
                            
                            {step.timestamp && (
                              <span className="text-[6px] sm:text-[7px] text-gray-400 mt-0.5 text-center max-w-[50px] sm:max-w-[90px] leading-tight">
                                {formattedTime}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Terminal Status Display */}
              {isTerminal && (
                <div className="mb-4 p-3 rounded-xl border bg-red-50 border-red-200">
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <FaExclamationTriangle className="w-4 h-4" />
                    <span className="font-medium">
                      {order.orderStatus === 'cancelled' ? 'Order Cancelled' : 
                       order.orderStatus === 'rejected' ? 'Order Rejected' :
                       order.orderStatus === 'refunded' ? 'Order Refunded' :
                       'Order Failed'}
                    </span>
                  </div>
                  {order.cancellationReason && (
                    <p className="text-xs text-red-500 mt-1">Reason: {order.cancellationReason}</p>
                  )}
                </div>
              )}

              {/* Payment & Tracking Info */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Payment:</span>
                  {getPaymentMethodBadge(order.paymentMethod)}
                </div>
                {order.trackingNumber && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Tracking:</span>
                    <span className="text-xs font-mono text-blue-600">{order.trackingNumber}</span>
                  </div>
                )}
              </div>

              {/* Delivery Info */}
              {hasDelivery && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-3">
                  <h4 className="text-xs font-bold text-gray-800 flex items-center gap-2 mb-2">
                    <FaTruck className="w-3.5 h-3.5 text-blue-600" />
                    Courier Delivery Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                    <div>
                      <span className="text-gray-500">Courier Service:</span>
                      <span className="font-medium text-gray-800 ml-1">{order.deliveryService?.courierName || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Tracking Number:</span>
                      <span className="font-mono text-blue-600 ml-1">{order.deliveryService?.trackingNumber || 'N/A'}</span>
                    </div>
                    {order.deliveryService?.trackingUrl && (
                      <div className="col-span-1 sm:col-span-2 mt-1 pt-1.5 border-t border-blue-200/50">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-xs">Track your parcel:</span>
                          <a
                            href={order.deliveryService.trackingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-medium rounded-lg hover:opacity-90 transition-all hover:shadow-md hover:shadow-blue-200"
                          >
                            <FaExternalLinkAlt className="w-3 h-3" />
                            Track on {order.deliveryService?.courierName || 'Courier'}
                          </a>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">
                          Click the button above to track your parcel
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ========== ORDER ITEMS ========== */}
      <div>
  <div className="flex items-center justify-between mb-2">
    <h4 className="text-xs font-semibold text-gray-800 flex items-center gap-2">
      <FaShoppingBag className="w-3.5 h-3.5 text-blue-600" />
      Order Items ({groupedItems.length} products)
    </h4>
    <span className="text-[10px] text-gray-400">
      Total: {order.items?.length || 0} items
    </span>
  </div>
  
  <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
    {/* Table Header */}
    <div className="grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-gray-100 border-b border-gray-200 text-[8px] sm:text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
      <div className="col-span-1 text-center">#</div>
      <div className="col-span-4 sm:col-span-5">Product</div>
      <div className="col-span-2 text-center">Color</div>
      <div className="col-span-1 text-center">Qty</div>
      <div className="col-span-1 text-center hidden sm:block">Unit</div>
      <div className="col-span-1 text-right hidden sm:block">Price</div>
      <div className="col-span-2 sm:col-span-1 text-right">Total</div>
    </div>
    
    {/* Table Body */}
    <div className="max-h-60 overflow-y-auto">
      {groupedItems.length === 0 ? (
        <div className="text-center py-4 text-xs text-gray-500">No items found</div>
      ) : (
        groupedItems.map((group, idx) => {
          const basePrice = group.basePrice || group.discountPrice || group.regularPrice || 0;
          
          return group.colors.map((colorObj, colorIdx) => {
            const isFirstRow = colorIdx === 0;
            const price = colorObj.price || basePrice;
            const totalForColor = price * (colorObj.quantity || 0);
            
            // Color detection
            let hasColor = false;
            let colorValue = null;
            
            if (colorObj.color && 
                colorObj.color !== 'null' && 
                colorObj.color !== '' && 
                colorObj.color !== 'undefined' &&
                colorObj.color !== 'null') {
              hasColor = true;
              colorValue = colorObj.color;
            }
            
            return (
              <div 
                key={`${idx}-${colorIdx}`} 
                className={`grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 items-center border-b border-gray-100 last:border-0 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 transition-colors ${
                  isFirstRow ? '' : 'bg-gray-50/50'
                }`}
              >
                {/* # */}
                <div className="col-span-1 text-center text-[8px] sm:text-[10px] text-gray-400">
                  {isFirstRow ? idx + 1 : ''}
                </div>
                
                {/* Product */}
                <div className="col-span-4 sm:col-span-5 flex items-center gap-1.5 sm:gap-2 min-w-0">
                  {isFirstRow && group.image && (
                    <img 
                      src={group.image || 'https://via.placeholder.com/32'} 
                      alt={group.productName}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg object-cover flex-shrink-0 bg-white border border-gray-200"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=Product'; }}
                    />
                  )}
                  {!isFirstRow && <div className="w-6 sm:w-7 flex-shrink-0"></div>}
                  <div className="min-w-0">
                    {isFirstRow ? (
                      <p className="text-[9px] sm:text-xs font-medium text-gray-800 truncate" title={group.productName}>
                        {group.productName}
                      </p>
                    ) : (
                      <p className="text-[8px] sm:text-xs text-gray-500 truncate">
                        <span className="text-gray-400">└─</span> {hasColor ? '' : 'Default'}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Color - Show ONLY color circle, no hex code */}
                <div className="col-span-2 flex justify-center items-center">
                  {hasColor ? (
                    <div 
                      className="w-5 h-5 rounded-full border-2 border-gray-200 shadow-sm"
                      style={{ backgroundColor: colorValue }}
                      title={colorValue}
                    />
                  ) : (
                    <span className="text-[8px] sm:text-[10px] text-gray-400">—</span>
                  )}
                </div>
                
                {/* Qty */}
                <div className="col-span-1 text-center text-[9px] sm:text-xs font-medium text-gray-700">
                  {colorObj.quantity || 0}
                </div>
                
                {/* Unit */}
                <div className="col-span-1 text-center text-[8px] sm:text-[10px] text-gray-400 hidden sm:block">
                  {isFirstRow ? (group.unit || 'pcs') : ''}
                </div>
                
                {/* Price */}
                <div className="col-span-1 text-right text-[8px] sm:text-[10px] text-gray-600 hidden sm:block">
                  {isFirstRow ? `৳${price.toFixed(2)}` : ''}
                </div>
                
                {/* Total */}
                <div className="col-span-2 sm:col-span-1 text-right text-[9px] sm:text-xs font-medium text-blue-600">
                  ৳{totalForColor.toFixed(2)}
                </div>
              </div>
            );
          });
        })
      )}
    </div>
    
    {/* Table Footer - Totals */}
    <div className="border-t border-gray-200 bg-gradient-to-r from-gray-100 to-blue-50/30 px-2 sm:px-3 py-2">
      <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-6 text-[9px] sm:text-xs">
        <div>
          <span className="text-gray-500">Subtotal:</span>
          <span className="font-medium text-gray-800 ml-1">৳{order.subtotal?.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-gray-500">Shipping:</span>
          <span className="font-medium text-gray-800 ml-1">৳{order.shippingCost?.toFixed(2)}</span>
        </div>
        {order.discount > 0 && (
          <div>
            <span className="text-green-600">Discount:</span>
            <span className="font-medium text-green-600 ml-1">- ৳{order.discount?.toFixed(2)}</span>
          </div>
        )}
        <div className="pl-2 sm:pl-4 border-l-2 border-gray-300">
          <span className="font-bold text-gray-900">Total:</span>
          <span className="font-bold text-blue-600 ml-1">৳{order.total?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  </div>
</div>

              {/* Status History */}
              {order.timeline && order.timeline.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <FaClock className="w-3.5 h-3.5 text-blue-600" />
                    Status History
                  </h4>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
                    {order.timeline.map((entry, idx) => {
                      const entryStatusInfo = STATUS_CONFIG[entry.status] || STATUS_CONFIG['placed'];
                      const isCurrent = entry.status === order.orderStatus;
                      const displayLabel = entryStatusInfo.label || entry.status;
                      
                      return (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            isCurrent ? 'bg-gradient-to-r from-blue-600 to-cyan-600 ring-2 ring-blue-300' : 'bg-gray-400'
                          }`} />
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className={`text-xs font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-800'}`}>
                                {displayLabel}
                              </span>
                              <span className="text-[9px] text-gray-500">{entry.formattedDate}</span>
                            </div>
                            {entry.note && (
                              <p className="text-[10px] text-gray-500">{entry.note}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Download Invoice Button */}
              <button
                onClick={handleDownloadInvoice}
                disabled={downloading}
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:opacity-90 hover:shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
              >
                {downloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating Invoice...
                  </>
                ) : (
                  <>
                    <FaFileInvoice className="w-4 h-4" />
                    Download Invoice
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ========== MAIN TRACK PAGE ==========
// ========== MAIN TRACK PAGE ==========
export default function TrackPage() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [footerData, setFooterData] = useState(null);
  const [contactItems, setContactItems] = useState([]);

  // Fetch footer data on mount
  useEffect(() => {
    const loadFooterData = async () => {
      const data = await fetchFooterData();
      if (data) {
        setFooterData(data);
        const contacts = getContactItemsFromFooter(data);
        setContactItems(contacts);
      } else {
        // Use default contacts
        setContactItems([
          { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-blue-600' },
          { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-blue-600' },
          { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
        ]);
      }
    };
    loadFooterData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      toast.error('Please enter a phone number');
      return;
    }
    
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(phone.trim())) {
      toast.error('Please enter a valid Bangladesh phone number (01XXXXXXXXX)');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSearched(true);
    
    try {
      const response = await fetch(`${API_URL}/api/orders/track/${phone.trim()}`);
      const data = await response.json();
      
      if (data.success) {
        setTrackingData(data.data);
        toast.success(`Found ${data.data.totalOrders} order(s)`);
      } else {
        setError(data.error || 'No orders found for this phone number');
        setTrackingData(null);
      }
    } catch (error) {
      console.error('Track error:', error);
      setError('Network error. Please try again.');
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle contact click
  const handleContactClick = (contact) => {
    if (contact.label === 'Phone') {
      window.location.href = contact.link;
    } else if (contact.label === 'Email') {
      const email = contact.link.replace('mailto:', '');
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
    } else if (contact.label === 'WhatsApp') {
      window.open(contact.link, '_blank', 'noopener,noreferrer');
    } else {
      window.open(contact.link, '_blank');
    }
  };

  // Get icon component
  const getIcon = (IconComponent, className = "w-3 h-3 sm:w-4 sm:h-4") => {
    return <IconComponent className={className} />;
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-white pt-12 lg:pt-10 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header - Gradient Blue to Cyan */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-3 shadow-lg shadow-blue-200">
              <FaTruck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Track Your Orders
            </h1>
            <p className="text-sm text-gray-500 mt-1">Enter your phone number to see all your orders</p>
          </div>

          {/* Search Form - Gradient Blue to Cyan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number (01XXXXXXXXX)"
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm sm:text-base text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:opacity-90 hover:shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <FaSearch className="w-4 h-4" />
                    Track Orders
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaExclamationTriangle className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-red-700 font-medium">No Orders Found</p>
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {trackingData && (
            <div className="space-y-4">
              {/* Summary Banner - Gradient Blue to Cyan */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-4 text-white shadow-lg shadow-blue-200">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-blue-100">Phone Number</p>
                    <p className="text-lg font-bold">{trackingData.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-100">Total Orders</p>
                    <p className="text-2xl font-bold">{trackingData.totalOrders}</p>
                  </div>
                </div>
              </div>

              {/* Order Cards */}
              <div className="space-y-3">
                {trackingData.orders.map((order, index) => (
                  <OrderCard key={order.orderNumber || index} order={order} index={index} contactItems={contactItems} />
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="text-center pt-4">
                <Link href="/products" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
                  <span>←</span> Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {/* Not Found / Initial State */}
          {!trackingData && !error && !loading && searched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center shadow-sm"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                <FaSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Orders Found
              </h3>
              <p className="text-sm text-gray-500">We couldn't find any orders with this phone number.</p>
              <p className="text-xs text-gray-400 mt-2">Please check the number and try again.</p>
            </motion.div>
          )}

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="w-4 h-4 text-blue-600" />
              <span>Secure Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="w-4 h-4 text-blue-600" />
              <span>Real-time Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="w-4 h-4 text-blue-600" />
              <span>Premium Quality</span>
            </div>
          </div>

          {/* ========== HELP SECTION - SHOW NUMBERS DIRECTLY ========== */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs text-gray-500">Need help? Contact our support team</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              {contactItems.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleContactClick(contact)}
                  className={`text-sm hover:opacity-80 transition-colors flex items-center gap-1 ${contact.color}`}
                >
                  {getIcon(contact.icon)}
                  <span>{contact.value}</span>
                </button>
              ))}
              {contactItems.length > 0 && contactItems.map((_, index) => {
                if (index < contactItems.length - 1) {
                  return <span key={`sep-${index}`} className="text-gray-300 hidden sm:inline">|</span>;
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}