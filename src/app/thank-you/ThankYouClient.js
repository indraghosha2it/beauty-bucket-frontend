
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import {
//   FaCheckCircle,
//   FaPrint,
//   FaDownload,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaShoppingBag,
//   FaClock,
//   FaTruck,
//   FaFileInvoice,
//   FaHome,
//   FaStore,
//   FaUser,
//   FaSearch,
//   FaWhatsapp,
//   FaMapPin,
//   FaCity,
//   FaBuilding,
//   FaLocationArrow,
//   FaPalette
// } from 'react-icons/fa';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import { generateInvoicePDF } from '@/utils/invoicePDF';

// export default function ThankYouClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get('orderId');
//   const sessionIdFromUrl = searchParams.get('sessionId');
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pdfLoading, setPdfLoading] = useState(false);
//   const invoiceRef = useRef(null);

//   useEffect(() => {
//     if (orderId) {
//       fetchOrderDetails();
//     } else {
//       setError('No order ID provided');
//       setLoading(false);
//     }
//   }, [orderId]);

//   const fetchOrderDetails = async () => {
//     try {
//       const sessionId = sessionIdFromUrl || localStorage.getItem('cartSessionId');
//       const token = localStorage.getItem('token');
      
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       }
      
//       if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       console.log('📤 Fetching order with headers:', {
//         hasToken: !!token,
//         sessionId: sessionId || 'none',
//         orderId: orderId
//       });
      
//       const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
//         headers
//       });
      
//       const data = await response.json();
//       console.log('📥 Order response success:', data.success);
      
//       if (data.success) {
//         setOrder(data.data);
//       } else {
//         if (data.error === 'Unauthorized to view this order' && !token) {
//           console.log('🔄 Trying without session ID...');
//           const retryResponse = await fetch(`http://localhost:5000/api/orders/${orderId}`);
//           const retryData = await retryResponse.json();
          
//           if (retryData.success) {
//             setOrder(retryData.data);
//             return;
//           }
//         }
        
//         setError(data.error || 'Failed to load order details');
//         console.error('Order fetch error:', data.error);
//       }
//     } catch (error) {
//       console.error('Fetch order error:', error);
//       setError('Failed to load order details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadPDF = async () => {
//     if (!order || pdfLoading) return;

//     setPdfLoading(true);
//     try {
//       await generateInvoicePDF(order);
//       toast.success('Invoice downloaded successfully!');
//     } catch (error) {
//       console.error('PDF generation error:', error);
//       toast.error('Failed to generate PDF. Please try again.');
//     } finally {
//       setPdfLoading(false);
//     }
//   };

//   // ========== GET COLOR DISPLAY WITH QUANTITIES ==========
//   const getColorDisplay = (item) => {
//     if (item.colors && item.colors.length > 0) {
//       return item.colors
//         .filter(c => c.color && c.color !== 'null' && c.color !== '')
//         .map(c => ({
//           color: c.color,
//           quantity: c.quantity || 0
//         }));
//     }
//     if (item.selectedColor && item.selectedColor !== 'null' && item.selectedColor !== '') {
//       return [{
//         color: item.selectedColor,
//         quantity: item.quantity || 0
//       }];
//     }
//     return [];
//   };

//   // ========== GET STATUS LABEL ==========
//   const getStatusLabel = (status) => {
//     const labels = {
//       'placed': 'Order Placed',
//       'follow_up': 'Follow Up',
//       'accepted': 'Accepted',
//       'approved': 'Approved',
//       'hold': 'On Hold',
//       'ready_to_ship': 'Ready to Ship',
//       'courier_assigned': 'Courier Assigned',
//       'rejected': 'Rejected',
//       'cancelled': 'Cancelled',
//       'reminder': 'Reminder',
//       'processing': 'Processing',
//       'shipped': 'Shipped',
//       'out_for_delivery': 'Out for Delivery',
//       'delivered': 'Delivered',
//       'refunded': 'Refunded',
//       'failed': 'Failed',
//       'returned': 'Returned',
//       'partial_delivery': 'Partial Delivery'
//     };
//     return labels[status] || status;
//   };

//   // ========== GET STATUS COLOR ==========
//   const getStatusColor = (status) => {
//     const colors = {
//       'placed': 'bg-blue-100 text-blue-700 border-blue-200',
//       'follow_up': 'bg-blue-50 text-blue-600 border-blue-200',
//       'accepted': 'bg-green-100 text-green-700 border-green-200',
//       'approved': 'bg-green-100 text-green-700 border-green-200',
//       'hold': 'bg-yellow-100 text-yellow-700 border-yellow-200',
//       'ready_to_ship': 'bg-purple-100 text-purple-700 border-purple-200',
//       'courier_assigned': 'bg-indigo-100 text-indigo-700 border-indigo-200',
//       'rejected': 'bg-red-100 text-red-700 border-red-200',
//       'cancelled': 'bg-red-100 text-red-700 border-red-200',
//       'reminder': 'bg-orange-100 text-orange-700 border-orange-200',
//       'processing': 'bg-blue-100 text-blue-700 border-blue-200',
//       'shipped': 'bg-purple-100 text-purple-700 border-purple-200',
//       'out_for_delivery': 'bg-orange-100 text-orange-700 border-orange-200',
//       'delivered': 'bg-green-100 text-green-700 border-green-200',
//       'refunded': 'bg-gray-100 text-gray-700 border-gray-200',
//       'failed': 'bg-red-100 text-red-700 border-red-200',
//       'returned': 'bg-purple-100 text-purple-700 border-purple-200',
//       'partial_delivery': 'bg-yellow-100 text-yellow-700 border-yellow-200'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
//           <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (error || !order) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-white pt-20">
//           <div className="container mx-auto px-4 max-w-3xl text-center py-16">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
//               <div className="w-20 h-20 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center border border-red-200">
//                 <FaCheckCircle className="w-10 h-10 text-red-500" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Playfair Display"' }}>
//                 Order Not Found
//               </h2>
//               <p className="text-gray-500 mb-6">{error || 'Unable to load order details'}</p>
//               <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                 <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg">
//                   <FaHome className="w-4 h-4" />
//                   Return Home
//                 </Link>
//                 <Link href="/track" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
//                   <FaSearch className="w-4 h-4" />
//                   Track Order
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const isCancelled = order.orderStatus === 'cancelled';
//   const isRejected = order.orderStatus === 'rejected';
  
//   // ========== GET STATUS HISTORY FOR TIMELINE ==========
//   const getStatusTimeline = () => {
//     if (!order.statusHistory || order.statusHistory.length === 0) {
//       // If no status history, create a basic one from current status
//       return [
//         {
//           status: order.orderStatus,
//           label: getStatusLabel(order.orderStatus),
//           timestamp: order.createdAt,
//           isCurrent: true,
//           isCompleted: true,
//           color: getStatusColor(order.orderStatus)
//         }
//       ];
//     }
    
//     // Get unique statuses in order of appearance
//     const uniqueStatuses = [];
//     const seen = new Set();
    
//     order.statusHistory.forEach(entry => {
//       if (!seen.has(entry.status)) {
//         seen.add(entry.status);
//         uniqueStatuses.push({
//           status: entry.status,
//           label: getStatusLabel(entry.status),
//           timestamp: entry.timestamp,
//           color: getStatusColor(entry.status)
//         });
//       }
//     });
    
//     // If current status is not in the list, add it
//     const hasCurrentStatus = uniqueStatuses.some(s => s.status === order.orderStatus);
//     if (!hasCurrentStatus) {
//       uniqueStatuses.push({
//         status: order.orderStatus,
//         label: getStatusLabel(order.orderStatus),
//         timestamp: order.updatedAt || order.createdAt,
//         color: getStatusColor(order.orderStatus)
//       });
//     }
    
//     // Mark the last one as current
//     if (uniqueStatuses.length > 0) {
//       uniqueStatuses[uniqueStatuses.length - 1].isCurrent = true;
//       uniqueStatuses[uniqueStatuses.length - 1].isCompleted = true;
//     }
    
//     // Mark all as completed (since they're in the history)
//     uniqueStatuses.forEach((s, index) => {
//       s.isCompleted = true;
//       if (index === uniqueStatuses.length - 1) {
//         s.isCurrent = true;
//       }
//     });
    
//     return uniqueStatuses;
//   };

//   const statusTimeline = getStatusTimeline();

//   return (
//     <>
//       <Navbar />
      
//       <div className="min-h-screen bg-white py-8">
//         <div className="container mx-auto px-4 max-w-5xl">
//           {/* Success Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center mb-8"
//           >
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4 border-4 border-blue-200">
//               <FaCheckCircle className="w-10 h-10 text-blue-600" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: '"Playfair Display"' }}>
//               Thank You for Your Order! ⚡
//             </h1>
//             <p className="text-gray-500 mt-2">
//               Your order has been placed successfully. We'll notify you when it ships.
//             </p>
//           </motion.div>

//           {/* Order Reference */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div>
//                 <p className="text-sm text-gray-500">Order Reference</p>
//                 <p className="text-xl font-bold text-gray-900" style={{ fontFamily: '"Playfair Display"' }}>
//                   #{order.orderNumber || order._id.slice(-8).toUpperCase()}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Placed on {new Date(order.createdAt).toLocaleDateString('en-BD', {
//                     day: '2-digit',
//                     month: 'short',
//                     year: 'numeric',
//                     hour: '2-digit',
//                     minute: '2-digit'
//                   })}
//                 </p>
//               </div>
//               <div className="flex gap-2 flex-wrap justify-center">
//                 <button
//                   onClick={downloadPDF}
//                   disabled={pdfLoading}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {pdfLoading ? (
//                     <>
//                       <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
//                       Generating...
//                     </>
//                   ) : (
//                     <>
//                       <FaDownload className="w-4 h-4" />
//                       Download Invoice
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Tracking Section */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//                 <FaTruck className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: '"Playfair Display"' }}>
//                   Track Your Order
//                 </h2>
//                 <p className="text-xs text-gray-500">
//                   You can track your order status using your phone number
//                 </p>
//               </div>
//               <Link
//                 href="/track"
//                 className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm whitespace-nowrap font-medium shadow-md hover:shadow-lg"
//               >
//                 <FaSearch className="w-4 h-4" />
//                 Track Order
//               </Link>
//             </div>
//           </div>

//           {/* Order Details - Invoice */}
//           <div ref={invoiceRef} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2" style={{ fontFamily: '"Playfair Display"' }}>
//                 <FaFileInvoice className="w-5 h-5 text-blue-600" />
//                 Order Details
//               </h2>
//               <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 isCancelled || isRejected ? 'bg-red-50 text-red-600 border border-red-200' :
//                 order.orderStatus === 'delivered' ? 'bg-green-50 text-green-600 border border-green-200' :
//                 'bg-blue-50 text-blue-600 border border-blue-200'
//               }`}>
//                 {isRejected ? 'REJECTED' : isCancelled ? 'CANCELLED' : order.orderStatus.toUpperCase()}
//               </span>
//             </div>

//             {/* ========== STATUS TIMELINE - FROM ORDER HISTORY ========== */}
//             {!isCancelled && !isRejected && statusTimeline.length > 0 && (
//               <div className="mb-6">
//                 <div className="relative">
//                   <div className="flex items-start justify-between overflow-x-auto pb-2">
//                     {statusTimeline.map((step, index) => {
//                       const isLast = index === statusTimeline.length - 1;
//                       const isFirst = index === 0;
//                       const isCompleted = step.isCompleted;
//                       const isCurrent = step.isCurrent;
                      
//                       return (
//                         <div key={step.status} className="flex flex-col items-center flex-1 min-w-[80px] relative">
//                           {/* Connector line */}
//                           {!isLast && (
//                             <div className={`absolute top-4 left-[60%] w-[80%] h-0.5 ${
//                               isCompleted ? 'bg-blue-600' : 'bg-gray-200'
//                             }`} />
//                           )}
                          
//                           {/* Circle */}
//                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
//                             isCompleted ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-gray-200 text-gray-500 border border-gray-300'
//                           } ${isCurrent ? 'ring-4 ring-blue-200' : ''}`}>
//                             {index + 1}
//                           </div>
                          
//                           {/* Label */}
//                           <span className={`text-[9px] mt-1.5 text-center font-medium ${
//                             isCompleted ? 'text-gray-900' : 'text-gray-400'
//                           }`}>
//                             {step.label}
//                           </span>
                          
//                           {/* Timestamp */}
//                           {step.timestamp && (
//                             <span className="text-[7px] text-gray-400 mt-0.5 text-center max-w-[80px]">
//                               {new Date(step.timestamp).toLocaleDateString('en-BD', {
//                                 day: '2-digit',
//                                 month: 'short',
//                                 hour: '2-digit',
//                                 minute: '2-digit'
//                               })}
//                             </span>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Customer & Delivery Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
//                 <p className="text-xs text-gray-700 uppercase tracking-wider font-bold mb-3">Customer Information</p>
//                 <div className="space-y-2">
//                   <div>
//                     <p className="text-xs text-gray-500">Full Name</p>
//                     <p className="font-medium text-gray-900 text-sm">{order.customerInfo.fullName}</p>
//                   </div>
//                   {order.customerInfo.email && (
//                     <div>
//                       <p className="text-xs text-gray-500">Email</p>
//                       <p className="text-sm text-gray-700">{order.customerInfo.email}</p>
//                     </div>
//                   )}
//                   <div>
//                     <p className="text-xs text-gray-500">Phone</p>
//                     <p className="text-sm text-gray-700">{order.customerInfo.phone}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Full Address</p>
//                     <p className="text-sm text-gray-700">{order.customerInfo.address}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
//                 <p className="text-xs text-gray-700 uppercase tracking-wider font-bold mb-3">Delivery Address</p>
//                 <div className="space-y-2">
//                   {order.customerInfo.area && (
//                     <div>
//                       <p className="text-xs text-gray-500">Area/Union</p>
//                       <p className="text-sm text-gray-700">{order.customerInfo.area}</p>
//                     </div>
//                   )}
//                   <div>
//                     <p className="text-xs text-gray-500">Upazila/Thana</p>
//                     <p className="text-sm text-gray-700">{order.customerInfo.zone}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">District/City</p>
//                     <p className="text-sm text-gray-700">{order.customerInfo.city}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Division</p>
//                     <p className="text-sm text-gray-700">{order.customerInfo.division}</p>
//                   </div>
//                   {order.customerInfo.zipCode && (
//                     <div>
//                       <p className="text-xs text-gray-500">Zip Code</p>
//                       <p className="text-sm text-gray-700">{order.customerInfo.zipCode}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
//               <div>
//                 <p className="text-[10px] text-gray-500 uppercase tracking-wider">Order ID</p>
//                 <p className="text-sm font-mono font-bold text-gray-900">
//                   {order.orderNumber || order._id.slice(-8).toUpperCase()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-gray-500 uppercase tracking-wider">Date</p>
//                 <p className="text-sm font-medium text-gray-900">
//                   {new Date(order.createdAt).toLocaleDateString('en-BD')}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-gray-500 uppercase tracking-wider">Payment</p>
//                 <p className="text-sm font-medium text-gray-900 capitalize">{order.paymentMethod}</p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-gray-500 uppercase tracking-wider">Status</p>
//                 <p className="text-sm font-medium text-gray-900 capitalize">{order.orderStatus}</p>
//               </div>
//             </div>

//             {/* ========== ITEMS TABLE WITH COLOR-WISE QUANTITIES ========== */}
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="text-left py-2 px-2 text-gray-500 font-medium">#</th>
//                     <th className="text-left py-2 px-2 text-gray-500 font-medium">Product</th>
//                     <th className="text-center py-2 px-2 text-gray-500 font-medium">Color</th>
//                     <th className="text-center py-2 px-2 text-gray-500 font-medium">Qty</th>
//                     <th className="text-center py-2 px-2 text-gray-500 font-medium">Unit</th>
//                     <th className="text-right py-2 px-2 text-gray-500 font-medium">Price</th>
//                     <th className="text-right py-2 px-2 text-gray-500 font-medium">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {order.items.map((item, index) => {
//                     const price = item.discountPrice || item.regularPrice;
//                     const colorData = getColorDisplay(item);
//                     const hasColorsData = colorData.length > 0;
                    
//                     if (hasColorsData) {
//                       return colorData.map((colorObj, colorIdx) => {
//                         const isFirstRow = colorIdx === 0;
//                         const totalForColor = price * colorObj.quantity;
                        
//                         return (
//                           <tr key={`${index}-${colorIdx}`} className="border-b border-gray-100">
//                             <td className="py-2 px-2 text-gray-500">
//                               {isFirstRow ? index + 1 : ''}
//                             </td>
//                             <td className="py-2 px-2 text-gray-900">
//                               <div className="flex items-center gap-2">
//                                 {isFirstRow && item.image && (
//                                   <img 
//                                     src={item.image} 
//                                     alt={item.productName}
//                                     className="w-8 h-8 rounded object-cover border border-gray-200"
//                                     onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=Product'; }}
//                                   />
//                                 )}
//                                 {!isFirstRow && <div className="w-8"></div>}
//                                 {isFirstRow ? (
//                                   <span>{item.productName}</span>
//                                 ) : (
//                                   <span className="text-gray-500 text-xs">└─</span>
//                                 )}
//                               </div>
//                             </td>
//                             <td className="text-center py-2 px-2">
//                               {colorObj.color ? (
//                                 <div className="flex items-center justify-center">
//                                   <div 
//                                     className="w-5 h-5 rounded-full border border-gray-200"
//                                     style={{ backgroundColor: colorObj.color }}
//                                   />
//                                 </div>
//                               ) : (
//                                 <span className="text-gray-500 text-xs">-</span>
//                               )}
//                             </td>
//                             <td className="text-center py-2 px-2 text-gray-700">
//                               {colorObj.quantity}
//                             </td>
//                             <td className="text-center py-2 px-2 text-gray-500">
//                               {isFirstRow ? (item.unit || 'pcs') : ''}
//                             </td>
//                             <td className="text-right py-2 px-2 text-gray-700">
//                               {isFirstRow ? `৳${price.toFixed(2)}` : ''}
//                             </td>
//                             <td className="text-right py-2 px-2 font-medium text-gray-900">
//                               ৳{totalForColor.toFixed(2)}
//                             </td>
//                           </tr>
//                         );
//                       });
//                     } else {
//                       return (
//                         <tr key={index} className="border-b border-gray-100">
//                           <td className="py-2 px-2 text-gray-500">{index + 1}</td>
//                           <td className="py-2 px-2 text-gray-900">
//                             <div className="flex items-center gap-2">
//                               {item.image && (
//                                 <img 
//                                   src={item.image} 
//                                   alt={item.productName}
//                                   className="w-8 h-8 rounded object-cover border border-gray-200"
//                                   onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=Product'; }}
//                                 />
//                               )}
//                               <span>{item.productName}</span>
//                             </div>
//                           </td>
//                           <td className="text-center py-2 px-2">
//                             <span className="text-gray-500 text-xs">-</span>
//                           </td>
//                           <td className="text-center py-2 px-2 text-gray-700">{item.quantity}</td>
//                           <td className="text-center py-2 px-2 text-gray-500">{item.unit || 'pcs'}</td>
//                           <td className="text-right py-2 px-2 text-gray-700">৳{price.toFixed(2)}</td>
//                           <td className="text-right py-2 px-2 font-medium text-gray-900">৳{(price * item.quantity).toFixed(2)}</td>
//                         </tr>
//                       );
//                     }
//                   })}
//                 </tbody>
//                 <tfoot>
//                   <tr className="border-t border-gray-200">
//                     <td colSpan="5" className="py-2 px-2"></td>
//                     <td className="text-right py-2 px-2 text-gray-500">Subtotal:</td>
//                     <td className="text-right py-2 px-2 text-gray-700">৳{order.subtotal.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td colSpan="5" className="py-1 px-2"></td>
//                     <td className="text-right py-1 px-2 text-gray-500">Shipping:</td>
//                     <td className="text-right py-1 px-2 text-gray-700">৳{order.shippingCost.toFixed(2)}</td>
//                   </tr>
//                   {order.discount > 0 && (
//                     <tr>
//                       <td colSpan="5" className="py-1 px-2"></td>
//                       <td className="text-right py-1 px-2 text-green-600">Discount:</td>
//                       <td className="text-right py-1 px-2 text-green-600">-৳{order.discount.toFixed(2)}</td>
//                     </tr>
//                   )}
//                   <tr className="border-t-2 border-blue-600">
//                     <td colSpan="5" className="py-2 px-2"></td>
//                     <td className="text-right py-2 px-2 font-bold text-gray-900">Total:</td>
//                     <td className="text-right py-2 px-2 font-bold text-blue-600 text-lg">৳{order.total.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>

//             {/* Payment Info */}
//             <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between text-sm">
//               <div>
//                 <span className="text-gray-500">Payment Method: </span>
//                 <span className="font-medium text-gray-900 capitalize">{order.paymentMethod}</span>
//               </div>
//               <div>
//                 <span className="text-gray-500">Payment Status: </span>
//                 <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-gray-900'}`}>
//                   {order.paymentStatus.toUpperCase()}
//                 </span>
//               </div>
//             </div>

//             {order.customerInfo.note && (
//               <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
//                 <p className="text-xs text-gray-500">Order Note</p>
//                 <p className="text-sm text-gray-700">{order.customerInfo.note}</p>
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link href="/products" className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg">
//               <FaHome className="w-4 h-4" />
//               Continue Shopping
//             </Link>
//           </div>

//           {/* Support Info */}
//           <div className="mt-6 text-center text-sm text-gray-500">
//             <p>Need help? Contact our support team</p>
//             <div className="flex items-center justify-center gap-4 mt-2">
//               <a href="tel:+8801305785685" className="flex items-center gap-1 text-blue-600 hover:underline">
//                 <FaPhone className="w-3 h-3" />
//                 Call Us
//               </a>
//               <a href="mailto:support@powerbank.com" className="flex items-center gap-1 text-blue-600 hover:underline">
//                 <FaEnvelope className="w-3 h-3" />
//                 Email Us
//               </a>
//               <a href="https://wa.me/8801305785685" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
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
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaPrint,
  FaDownload,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaClock,
  FaTruck,
  FaFileInvoice,
  FaHome,
  FaStore,
  FaUser,
  FaSearch,
  FaWhatsapp,
  FaMapPin,
  FaCity,
  FaBuilding,
  FaLocationArrow,
  FaPalette,
  FaHeadset
} from 'react-icons/fa';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { generateInvoicePDF } from '@/utils/invoicePDF';

export default function ThankYouClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const sessionIdFromUrl = searchParams.get('sessionId');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const invoiceRef = useRef(null);
  
  // ========== FOOTER CONTACT DATA STATE ==========
  const [footerData, setFooterData] = useState(null);
  const [isFooterLoading, setIsFooterLoading] = useState(true);

  // ========== FETCH FOOTER DATA ==========
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setIsFooterLoading(true);
        const response = await fetch('http://localhost:5000/api/footer');
        
        if (!response.ok) {
          throw new Error('Failed to fetch footer data');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          setFooterData(data.data);
        } else {
          throw new Error('Invalid footer data');
        }
      } catch (err) {
        console.error('Error fetching footer data:', err);
        setFooterData({
          company: {
            phone: '+880 1871 733305',
            email: 'info@smartgadget.com',
          },
          columns: [
            {
              type: 'contact',
              items: [
                { type: 'phone', value: '+880 1871 733305' },
                { type: 'email', value: 'info@smartgadget.com' },
              ]
            }
          ]
        });
      } finally {
        setIsFooterLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // ========== GET CONTACT ITEMS FROM FOOTER DATA ==========
  const getContactItems = () => {
    if (!footerData) return [];
    
    const contactColumn = footerData.columns?.find(col => col.type === 'contact');
    const items = contactColumn?.items || [];
    const company = footerData.company || {};
    
    const contacts = [];
    
    // Phone
    const phoneItem = items.find(item => item.type === 'phone');
    if (phoneItem) {
      const cleanPhone = phoneItem.value.replace(/[^0-9+]/g, '');
      contacts.push({
        icon: 'FaPhone',
        label: 'Phone',
        value: phoneItem.value,
        link: `tel:${cleanPhone}`,
        cleanValue: cleanPhone,
        color: 'text-blue-600'
      });
    } else if (company.phone) {
      const cleanPhone = company.phone.replace(/[^0-9+]/g, '');
      contacts.push({
        icon: 'FaPhone',
        label: 'Phone',
        value: company.phone,
        link: `tel:${cleanPhone}`,
        cleanValue: cleanPhone,
        color: 'text-blue-600'
      });
    }
    
    // Email
    const emailItem = items.find(item => item.type === 'email');
    if (emailItem) {
      contacts.push({
        icon: 'FaEnvelope',
        label: 'Email',
        value: emailItem.value,
        link: `mailto:${emailItem.value}`,
        cleanValue: emailItem.value,
        color: 'text-green-600'
      });
    } else if (company.email) {
      contacts.push({
        icon: 'FaEnvelope',
        label: 'Email',
        value: company.email,
        link: `mailto:${company.email}`,
        cleanValue: company.email,
        color: 'text-green-600'
      });
    }
    
    // WhatsApp
    const whatsappItem = items.find(item => item.type === 'whatsapp');
    if (whatsappItem) {
      const cleanPhone = whatsappItem.value.replace(/[^0-9+]/g, '');
      contacts.push({
        icon: 'FaWhatsapp',
        label: 'WhatsApp',
        value: whatsappItem.value,
        link: `https://wa.me/${cleanPhone}`,
        cleanValue: cleanPhone,
        color: 'text-green-500'
      });
    } else if (company.whatsapp) {
      const cleanPhone = company.whatsapp.replace(/[^0-9+]/g, '');
      contacts.push({
        icon: 'FaWhatsapp',
        label: 'WhatsApp',
        value: company.whatsapp,
        link: `https://wa.me/${cleanPhone}`,
        cleanValue: cleanPhone,
        color: 'text-green-500'
      });
    }
    
    // If no contacts found, use defaults
    if (contacts.length === 0) {
      contacts.push(
        {
          icon: 'FaPhone',
          label: 'Phone',
          value: '+880 1871 733305',
          link: 'tel:+8801871733305',
          cleanValue: '+8801871733305',
          color: 'text-blue-600'
        },
        {
          icon: 'FaEnvelope',
          label: 'Email',
          value: 'info@smartgadget.com',
          link: 'mailto:info@smartgadget.com',
          cleanValue: 'info@smartgadget.com',
          color: 'text-green-600'
        },
        {
          icon: 'FaWhatsapp',
          label: 'WhatsApp',
          value: '+880 1871 733305',
          link: 'https://wa.me/8801871733305',
          cleanValue: '+8801871733305',
          color: 'text-green-500'
        }
      );
    }
    
    return contacts;
  };

  // ========== HANDLE CONTACT CLICK - FIXED ==========
  const handleContactClick = (contact) => {
    if (contact.icon === 'FaPhone') {
      // Open phone dialer - use multiple methods for reliability
      const phoneNumber = contact.cleanValue || contact.link.replace('tel:', '');
      
      // Method 1: Direct window location (most reliable for mobile)
      try {
        window.location.href = `tel:${phoneNumber}`;
      } catch (err) {
        console.error('Phone dialer error (method 1):', err);
        
        // Method 2: Create and click a hidden link
        try {
          const link = document.createElement('a');
          link.href = `tel:${phoneNumber}`;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            document.body.removeChild(link);
          }, 500);
        } catch (err2) {
          console.error('Phone dialer error (method 2):', err2);
          toast.info(`Call us at ${contact.value}`);
        }
      }
    } else if (contact.icon === 'FaEnvelope') {
      // Open email in new tab - using Gmail compose
      const email = contact.cleanValue || contact.link.replace('mailto:', '');
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else if (contact.icon === 'FaWhatsapp') {
      // Open WhatsApp in new tab
      window.open(contact.link, '_blank', 'noopener,noreferrer');
    } else {
      // Default: open link in new tab
      window.open(contact.link, '_blank');
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    } else {
      setError('No order ID provided');
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const sessionId = sessionIdFromUrl || localStorage.getItem('cartSessionId');
      const token = localStorage.getItem('token');
      
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        headers
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOrder(data.data);
      } else {
        if (data.error === 'Unauthorized to view this order' && !token) {
          const retryResponse = await fetch(`http://localhost:5000/api/orders/${orderId}`);
          const retryData = await retryResponse.json();
          
          if (retryData.success) {
            setOrder(retryData.data);
            return;
          }
        }
        
        setError(data.error || 'Failed to load order details');
      }
    } catch (error) {
      console.error('Fetch order error:', error);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!order || pdfLoading) return;

    setPdfLoading(true);
    try {
      await generateInvoicePDF(order);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setPdfLoading(false);
    }
  };

  // ========== GET COLOR DISPLAY WITH QUANTITIES ==========
// ========== GET COLOR DISPLAY WITH QUANTITIES - FIXED FOR EDITED ORDERS ==========
const getColorDisplay = (item) => {
  // If item has colors array with objects (color + quantity)
  if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
    const hasValidColors = item.colors.some(c => 
      c.color && 
      c.color !== 'null' && 
      c.color !== '' && 
      c.color !== 'undefined'
    );
    
    if (hasValidColors) {
      return item.colors
        .filter(c => c.color && c.color !== 'null' && c.color !== '' && c.color !== 'undefined')
        .map(c => ({
          color: c.color,
          quantity: c.quantity || 0,
          price: c.price || item.discountPrice || item.regularPrice
        }));
    }
  }
  
  // If item has selectedColor (single color from checkout)
  if (item.selectedColor && 
      item.selectedColor !== 'null' && 
      item.selectedColor !== '' && 
      item.selectedColor !== 'undefined') {
    return [{
      color: item.selectedColor,
      quantity: item.quantity || 0,
      price: item.discountPrice || item.regularPrice
    }];
  }
  
  // No colors found
  return [];
};

// ========== GROUP ITEMS BY PRODUCT - FIXED ==========
const groupItemsByProduct = (items) => {
  if (!items || items.length === 0) return [];
  
  const grouped = {};
  
  items.forEach(item => {
    const productId = item.productId?.toString() || 'unknown';
    
    if (!grouped[productId]) {
      // Create a new group with base product info
      grouped[productId] = {
        productId: productId,
        productName: item.productName,
        productSlug: item.productSlug || '',
        image: item.image || '',
        regularPrice: item.regularPrice,
        discountPrice: item.discountPrice || 0,
        unit: item.unit || 'pcs',
        stockQuantity: item.stockQuantity || 0,
        colors: [],
        totalQuantity: 0,
        // Store the first item's price for reference
        basePrice: item.discountPrice || item.regularPrice
      };
    }
    
    // Check if this item has color info
    const colorData = getColorDisplay(item);
    
    if (colorData.length > 0) {
      // Add each color from this item
      colorData.forEach(colorInfo => {
        // Check if this color already exists in the group
        const existingColor = grouped[productId].colors.find(c => c.color === colorInfo.color);
        if (existingColor) {
          // Add to existing color quantity
          existingColor.quantity += colorInfo.quantity;
        } else {
          // Add new color
          grouped[productId].colors.push({
            color: colorInfo.color,
            quantity: colorInfo.quantity,
            price: colorInfo.price || item.discountPrice || item.regularPrice
          });
        }
        grouped[productId].totalQuantity += colorInfo.quantity;
      });
    } else {
      // No color - add as default color
      const existingDefault = grouped[productId].colors.find(c => c.color === null);
      if (existingDefault) {
        existingDefault.quantity += item.quantity;
      } else {
        grouped[productId].colors.push({
          color: null,
          quantity: item.quantity,
          price: item.discountPrice || item.regularPrice
        });
      }
      grouped[productId].totalQuantity += item.quantity;
    }
  });
  
  return Object.values(grouped);
};

  // ========== GET STATUS LABEL ==========
  const getStatusLabel = (status) => {
    const labels = {
      'placed': 'Order Placed',
      'follow_up': 'Follow Up',
      'accepted': 'Accepted',
      'approved': 'Approved',
      'hold': 'On Hold',
      'ready_to_ship': 'Ready to Ship',
      'courier_assigned': 'Courier Assigned',
      'rejected': 'Rejected',
      'cancelled': 'Cancelled',
      'reminder': 'Reminder',
      'processing': 'Processing',
      'shipped': 'Shipped',
      'out_for_delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'refunded': 'Refunded',
      'failed': 'Failed',
      'returned': 'Returned',
      'partial_delivery': 'Partial Delivery'
    };
    return labels[status] || status;
  };

  // ========== GET STATUS COLOR ==========
  const getStatusColor = (status) => {
    const colors = {
      'placed': 'bg-blue-100 text-blue-700 border-blue-200',
      'follow_up': 'bg-blue-50 text-blue-600 border-blue-200',
      'accepted': 'bg-green-100 text-green-700 border-green-200',
      'approved': 'bg-green-100 text-green-700 border-green-200',
      'hold': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'ready_to_ship': 'bg-purple-100 text-purple-700 border-purple-200',
      'courier_assigned': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'rejected': 'bg-red-100 text-red-700 border-red-200',
      'cancelled': 'bg-red-100 text-red-700 border-red-200',
      'reminder': 'bg-orange-100 text-orange-700 border-orange-200',
      'processing': 'bg-blue-100 text-blue-700 border-blue-200',
      'shipped': 'bg-purple-100 text-purple-700 border-purple-200',
      'out_for_delivery': 'bg-orange-100 text-orange-700 border-orange-200',
      'delivered': 'bg-green-100 text-green-700 border-green-200',
      'refunded': 'bg-gray-100 text-gray-700 border-gray-200',
      'failed': 'bg-red-100 text-red-700 border-red-200',
      'returned': 'bg-purple-100 text-purple-700 border-purple-200',
      'partial_delivery': 'bg-yellow-100 text-yellow-700 border-yellow-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  // ========== GET ICON COMPONENT ==========
  const getIconComponent = (iconName, className = "w-3 h-3 sm:w-4 sm:h-4") => {
    const icons = {
      'FaPhone': <FaPhone className={className} />,
      'FaEnvelope': <FaEnvelope className={className} />,
      'FaWhatsapp': <FaWhatsapp className={className} />,
      'FaMapMarkerAlt': <FaMapMarkerAlt className={className} />,
      'FaHeadset': <FaHeadset className={className} />
    };
    return icons[iconName] || <FaPhone className={className} />;
  };

  // ========== GET ICON COLOR ==========
  const getIconColor = (iconName) => {
    const colors = {
      'FaPhone': 'text-blue-600',
      'FaEnvelope': 'text-green-600',
      'FaWhatsapp': 'text-green-500',
      'FaMapMarkerAlt': 'text-red-600',
      'FaHeadset': 'text-blue-600'
    };
    return colors[iconName] || 'text-blue-600';
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white pt-20">
          <div className="container mx-auto px-4 max-w-3xl text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center border border-red-200">
                <FaCheckCircle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Playfair Display"' }}>
                Order Not Found
              </h2>
              <p className="text-gray-500 mb-6">{error || 'Unable to load order details'}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg">
                  <FaHome className="w-4 h-4" />
                  Return Home
                </Link>
                <Link href="/track" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                  <FaSearch className="w-4 h-4" />
                  Track Order
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const isCancelled = order.orderStatus === 'cancelled';
  const isRejected = order.orderStatus === 'rejected';
  
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
          color: getStatusColor(order.orderStatus)
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
          color: getStatusColor(entry.status)
        });
      }
    });
    
    const hasCurrentStatus = uniqueStatuses.some(s => s.status === order.orderStatus);
    if (!hasCurrentStatus) {
      uniqueStatuses.push({
        status: order.orderStatus,
        label: getStatusLabel(order.orderStatus),
        timestamp: order.updatedAt || order.createdAt,
        color: getStatusColor(order.orderStatus)
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
  
  // Get contact items from footer data
  const contactItems = getContactItems();

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-white py-4 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-3 sm:mb-4 border-4 border-blue-200">
              <FaCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: '"Playfair Display"' }}>
              Thank You for Your Order! ⚡
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Your order has been placed successfully. We'll notify you when it ships.
            </p>
          </motion.div>

          {/* Order Reference */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-gray-500">Order Reference</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  #{order.orderNumber || order._id.slice(-8).toUpperCase()}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-BD', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                <button
                  onClick={downloadPDF}
                  disabled={pdfLoading}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {pdfLoading ? (
                    <>
                      <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                      <span className="hidden sm:inline">Generating...</span>
                    </>
                  ) : (
                    <>
                      <FaDownload className="w-3 h-3 sm:w-4 h-4" />
                      <span className="hidden sm:inline">Download Invoice</span>
                      <span className="sm:hidden">Invoice</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Tracking Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <FaTruck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xs sm:text-sm font-bold text-gray-900" style={{ fontFamily: '"Playfair Display"' }}>
                  Track Your Order
                </h2>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                  Track your order status using your phone number
                </p>
              </div>
              <Link
                href="/track"
                className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-[10px] sm:text-sm whitespace-nowrap font-medium shadow-md hover:shadow-lg"
              >
                <FaSearch className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Track Order</span>
                <span className="xs:hidden">Track</span>
              </Link>
            </div>
          </div>

          {/* Order Details */}
          <div ref={invoiceRef} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2" style={{ fontFamily: '"Playfair Display"' }}>
                <FaFileInvoice className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                Order Details
              </h2>
              <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                isCancelled || isRejected ? 'bg-red-50 text-red-600 border border-red-200' :
                order.orderStatus === 'delivered' ? 'bg-green-50 text-green-600 border border-green-200' :
                'bg-blue-50 text-blue-600 border border-blue-200'
              }`}>
                {isRejected ? 'REJECTED' : isCancelled ? 'CANCELLED' : order.orderStatus.toUpperCase()}
              </span>
            </div>

            {/* Status Timeline */}
            {!isCancelled && !isRejected && statusTimeline.length > 0 && (
              <div className="mb-6">
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
                        <div key={step.status} className="flex flex-col items-center flex-1 min-w-[70px] sm:min-w-[80px] relative">
                          {!isLast && (
                            <div className={`absolute top-3 sm:top-4 left-[55%] sm:left-[60%] w-[70%] sm:w-[80%] h-0.5 ${
                              isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                            }`} />
                          )}
                          
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[8px] sm:text-xs font-bold z-10 ${
                            isCompleted ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-gray-200 text-gray-500 border border-gray-300'
                          } ${isCurrent ? 'ring-2 sm:ring-4 ring-blue-200' : ''}`}>
                            {index + 1}
                          </div>
                          
                          <span className={`text-[7px] sm:text-[9px] mt-1 sm:mt-1.5 text-center font-medium leading-tight ${
                            isCompleted ? 'text-gray-900' : 'text-gray-400'
                          }`}>
                            {step.label}
                          </span>
                          
                          {step.timestamp && (
                            <span className="text-[6px] sm:text-[8px] text-gray-400 mt-0.5 text-center max-w-[65px] sm:max-w-[90px] leading-tight">
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

            {/* Customer & Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-[10px] sm:text-xs text-gray-700 uppercase tracking-wider font-bold mb-2 sm:mb-3">Customer Information</p>
                <div className="space-y-1.5 sm:space-y-2">
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Full Name</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 break-words">{order.customerInfo.fullName}</p>
                  </div>
                  {order.customerInfo.email && (
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">Email</p>
                      <p className="text-xs sm:text-sm text-gray-700 break-words">{order.customerInfo.email}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Phone</p>
                    <p className="text-xs sm:text-sm text-gray-700">{order.customerInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Full Address</p>
                    <p className="text-xs sm:text-sm text-gray-700 break-words">{order.customerInfo.address}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-[10px] sm:text-xs text-gray-700 uppercase tracking-wider font-bold mb-2 sm:mb-3">Delivery Address</p>
                <div className="space-y-1.5 sm:space-y-2">
                  {order.customerInfo.area && (
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">Area/Union</p>
                      <p className="text-xs sm:text-sm text-gray-700 break-words">{order.customerInfo.area}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Upazila/Thana</p>
                    <p className="text-xs sm:text-sm text-gray-700 break-words">{order.customerInfo.zone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">District/City</p>
                    <p className="text-xs sm:text-sm text-gray-700 break-words">{order.customerInfo.city}</p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Division</p>
                    <p className="text-xs sm:text-sm text-gray-700 break-words">{order.customerInfo.division}</p>
                  </div>
                  {order.customerInfo.zipCode && (
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">Zip Code</p>
                      <p className="text-xs sm:text-sm text-gray-700">{order.customerInfo.zipCode}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Order ID</p>
                <p className="text-[10px] sm:text-sm font-mono font-bold text-gray-900 break-words">
                  {order.orderNumber || order._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Date</p>
                <p className="text-[10px] sm:text-sm font-medium text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString('en-BD')}
                </p>
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Payment</p>
                <p className="text-[10px] sm:text-sm font-medium text-gray-900 capitalize">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Status</p>
                <p className="text-[10px] sm:text-sm font-medium text-gray-900 capitalize">{order.orderStatus}</p>
              </div>
            </div>

            {/* Items Table */}
           <div className="overflow-x-auto">
  <table className="w-full text-[10px] sm:text-sm">
    <thead>
      <tr className="border-b border-gray-200">
        <th className="text-left py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 font-medium">#</th>
        <th className="text-left py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 font-medium">Product</th>
        <th className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 font-medium">Color</th>
        <th className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 font-medium">Qty</th>
        <th className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 font-medium hidden sm:table-cell">Unit</th>
        <th className="text-right py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 font-medium hidden sm:table-cell">Price</th>
        <th className="text-right py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 font-medium">Total</th>
      </tr>
    </thead>
    <tbody>
      {/* Group items by product */}
      {groupItemsByProduct(order.items).map((group, groupIndex) => {
        const hasMultipleColors = group.colors && group.colors.length > 1;
        const basePrice = group.basePrice || group.discountPrice || group.regularPrice;
        
        return group.colors.map((colorObj, colorIdx) => {
          const isFirstRow = colorIdx === 0;
          const price = colorObj.price || basePrice;
          const totalForColor = price * (colorObj.quantity || 0);
          const hasColor = colorObj.color !== null && colorObj.color !== 'null' && colorObj.color !== '';
          
          return (
            <tr key={`${groupIndex}-${colorIdx}`} className="border-b border-gray-100">
              <td className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 text-[8px] sm:text-xs">
                {isFirstRow ? groupIndex + 1 : ''}
              </td>
              <td className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-900">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {isFirstRow && group.image && (
                    <img 
                      src={group.image} 
                      alt={group.productName}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded object-cover border border-gray-200 flex-shrink-0"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=Product'; }}
                    />
                  )}
                  {!isFirstRow && <div className="w-6 sm:w-8 flex-shrink-0"></div>}
                  {isFirstRow ? (
                    <span className="text-[9px] sm:text-xs break-words font-medium text-gray-900">{group.productName}</span>
                  ) : (
                    <span className="text-gray-500 text-[8px] sm:text-[10px]">└─ </span>
                  )}
                </div>
              </td>
              <td className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2">
                {hasColor ? (
                  <div className="flex items-center justify-center">
                    <div 
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-200 flex-shrink-0"
                      style={{ backgroundColor: colorObj.color }}
                      title={colorObj.color}
                    />
                  </div>
                ) : (
                  <span className="text-gray-400 text-[8px] sm:text-xs">-</span>
                )}
              </td>
              <td className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-700 text-[9px] sm:text-xs">
                {colorObj.quantity || 0}
              </td>
              <td className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 text-[8px] sm:text-xs hidden sm:table-cell">
                {isFirstRow ? (group.unit || 'pcs') : ''}
              </td>
              <td className="text-right py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-700 text-[8px] sm:text-xs hidden sm:table-cell">
                {isFirstRow ? `৳${price.toFixed(2)}` : ''}
              </td>
              <td className="text-right py-1.5 sm:py-2 px-1.5 sm:px-2 font-medium text-gray-900 text-[9px] sm:text-xs">
                ৳{totalForColor.toFixed(2)}
              </td>
            </tr>
          );
        });
      })}
    </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200">
                    <td colSpan="5" className="py-1.5 sm:py-2 px-1.5 sm:px-2 hidden sm:table-cell"></td>
                    <td colSpan="2" className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-right text-[9px] sm:text-xs text-gray-500">Subtotal:</td>
                    <td className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-right text-[9px] sm:text-xs text-gray-700">৳{order.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="5" className="py-0.5 sm:py-1 px-1.5 sm:px-2 hidden sm:table-cell"></td>
                    <td colSpan="2" className="py-0.5 sm:py-1 px-1.5 sm:px-2 text-right text-[8px] sm:text-xs text-gray-500">Shipping:</td>
                    <td className="py-0.5 sm:py-1 px-1.5 sm:px-2 text-right text-[8px] sm:text-xs text-gray-700">৳{order.shippingCost.toFixed(2)}</td>
                  </tr>
                  {order.discount > 0 && (
                    <tr>
                      <td colSpan="5" className="py-0.5 sm:py-1 px-1.5 sm:px-2 hidden sm:table-cell"></td>
                      <td colSpan="2" className="py-0.5 sm:py-1 px-1.5 sm:px-2 text-right text-[8px] sm:text-xs text-green-600">Discount:</td>
                      <td className="py-0.5 sm:py-1 px-1.5 sm:px-2 text-right text-[8px] sm:text-xs text-green-600">-৳{order.discount.toFixed(2)}</td>
                    </tr>
                  )}
                  <tr className="border-t-2 border-blue-600">
                    <td colSpan="5" className="py-1.5 sm:py-2 px-1.5 sm:px-2 hidden sm:table-cell"></td>
                    <td colSpan="2" className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-right font-bold text-[9px] sm:text-sm text-gray-900">Total:</td>
                    <td className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-right font-bold text-blue-600 text-[10px] sm:text-lg">৳{order.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Payment Info */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between text-[10px] sm:text-sm gap-1 sm:gap-0">
              <div>
                <span className="text-gray-500">Payment Method: </span>
                <span className="font-medium text-gray-900 capitalize">{order.paymentMethod}</span>
              </div>
              <div>
                <span className="text-gray-500">Payment Status: </span>
                <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-gray-900'}`}>
                  {order.paymentStatus.toUpperCase()}
                </span>
              </div>
            </div>

            {order.customerInfo.note && (
              <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-[10px] sm:text-xs text-gray-500">Order Note</p>
                <p className="text-xs sm:text-sm text-gray-700 break-words">{order.customerInfo.note}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/products" className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg text-sm sm:text-base">
              <FaHome className="w-4 h-4 sm:w-5 sm:h-5" />
              Continue Shopping
            </Link>
          </div>

          {/* ========== SUPPORT INFO - WITH FIXED PHONE AND EMAIL ========== */}
          <div className="mt-6 text-center text-[10px] sm:text-sm text-gray-500">
            <p>Need help? Contact our support team</p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2">
              {contactItems.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleContactClick(contact)}
                  className={`flex items-center gap-1 hover:underline text-xs sm:text-sm transition-colors ${getIconColor(contact.icon)}`}
                >
                  {getIconComponent(contact.icon, "w-3 h-3 sm:w-4 sm:h-4")}
                  <span className="hidden xs:inline">{contact.label}</span>
                  <span className="xs:hidden">
                    {contact.label === 'Phone' ? 'Call' : 
                     contact.label === 'Email' ? 'Email' : 
                     contact.label === 'WhatsApp' ? 'WhatsApp' : contact.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}