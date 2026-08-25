
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
//   FaChevronRight,
//   FaPause
// } from 'react-icons/fa';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import { generateInvoicePDF } from '@/utils/invoicePDF';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// // ========== FETCH FOOTER DATA ==========
// const fetchFooterData = async () => {
//   try {
//     const response = await fetch(`${API_URL}/api/footer`);
//     if (!response.ok) throw new Error('Failed to fetch footer data');
//     const data = await response.json();
//     if (data.success && data.data) {
//       return data.data;
//     }
//     return null;
//   } catch (error) {
//     console.error('Error fetching footer data:', error);
//     return null;
//   }
// };

// // ========== GET CONTACT ITEMS FROM FOOTER DATA ==========
// const getContactItemsFromFooter = (footerData) => {
//   if (!footerData) {
//     // Default fallback contacts
//     return [
//       { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#EE4275]' },
//       { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#EE4275]' },
//       { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
//     ];
//   }

//   const contacts = [];
//   const company = footerData.company || {};
//   const contactColumn = footerData.columns?.find(col => col.type === 'contact');
//   const items = contactColumn?.items || [];

//   // Phone
//   const phoneItem = items.find(item => item.type === 'phone');
//   if (phoneItem) {
//     const cleanPhone = phoneItem.value.replace(/[^0-9+]/g, '');
//     contacts.push({
//       icon: FaPhone,
//       label: 'Phone',
//       value: phoneItem.value,
//       link: `tel:${cleanPhone}`,
//       color: 'text-[#EE4275]'
//     });
//   } else if (company.phone) {
//     const cleanPhone = company.phone.replace(/[^0-9+]/g, '');
//     contacts.push({
//       icon: FaPhone,
//       label: 'Phone',
//       value: company.phone,
//       link: `tel:${cleanPhone}`,
//       color: 'text-[#EE4275]'
//     });
//   }

//   // Email
//   const emailItem = items.find(item => item.type === 'email');
//   if (emailItem) {
//     contacts.push({
//       icon: FaEnvelope,
//       label: 'Email',
//       value: emailItem.value,
//       link: `mailto:${emailItem.value}`,
//       color: 'text-[#EE4275]'
//     });
//   } else if (company.email) {
//     contacts.push({
//       icon: FaEnvelope,
//       label: 'Email',
//       value: company.email,
//       link: `mailto:${company.email}`,
//       color: 'text-[#EE4275]'
//     });
//   }

//   // WhatsApp
//   const whatsappItem = items.find(item => item.type === 'whatsapp');
//   if (whatsappItem) {
//     const cleanPhone = whatsappItem.value.replace(/[^0-9+]/g, '');
//     contacts.push({
//       icon: FaWhatsapp,
//       label: 'WhatsApp',
//       value: whatsappItem.value,
//       link: `https://wa.me/${cleanPhone}`,
//       color: 'text-green-500'
//     });
//   } else if (company.whatsapp) {
//     const cleanPhone = company.whatsapp.replace(/[^0-9+]/g, '');
//     contacts.push({
//       icon: FaWhatsapp,
//       label: 'WhatsApp',
//       value: company.whatsapp,
//       link: `https://wa.me/${cleanPhone}`,
//       color: 'text-green-500'
//     });
//   }

//   // If no contacts found, use defaults
//   if (contacts.length === 0) {
//     contacts.push(
//       { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#EE4275]' },
//       { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#EE4275]' },
//       { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
//     );
//   }

//   return contacts;
// };

// // ========== STATUS CONFIG - Pink Theme ==========
// const STATUS_CONFIG = {
//   'placed': { 
//     label: 'Order Placed', 
//     icon: FaBox, 
//     color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
//     textColor: 'text-[#EE4275]', 
//     bgColor: 'bg-[#FFF5F6]',
//     borderColor: 'border-[#EE4275]/20'
//   },
//   'follow_up': { 
//     label: 'Follow Up', 
//     icon: FaPhoneAlt, 
//     color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
//     textColor: 'text-[#EE4275]', 
//     bgColor: 'bg-[#FFF5F6]',
//     borderColor: 'border-[#EE4275]/20'
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
//     color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
//     textColor: 'text-[#EE4275]', 
//     bgColor: 'bg-[#FFF5F6]',
//     borderColor: 'border-[#EE4275]/20'
//   },
//   'approved': { 
//     label: 'Approved', 
//     icon: FaClipboardCheck, 
//     color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
//     textColor: 'text-[#EE4275]', 
//     bgColor: 'bg-[#FFF5F6]',
//     borderColor: 'border-[#EE4275]/20'
//   },
//   'hold': { 
//     label: 'On Hold', 
//     icon: FaPause, 
//     color: 'bg-yellow-500', 
//     textColor: 'text-yellow-600', 
//     bgColor: 'bg-yellow-50',
//     borderColor: 'border-yellow-200'
//   },
//   'ready_to_ship': { 
//     label: 'Ready to Ship', 
//     icon: FaBoxOpen, 
//     color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
//     textColor: 'text-[#EE4275]', 
//     bgColor: 'bg-[#FFF5F6]',
//     borderColor: 'border-[#EE4275]/20'
//   },
//   'courier_assigned': { 
//     label: 'Assigned to Courier', 
//     icon: FaTruck, 
//     color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
//     textColor: 'text-[#EE4275]', 
//     bgColor: 'bg-[#FFF5F6]',
//     borderColor: 'border-[#EE4275]/20'
//   },
//   'processing': { 
//     label: 'Processing', 
//     icon: FaSpinner,
//     color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
//     textColor: 'text-[#EE4275]', 
//     bgColor: 'bg-[#FFF5F6]',
//     borderColor: 'border-[#EE4275]/20'
//   },
//   'shipped': { 
//     label: 'Shipped', 
//     icon: FaShippingFast, 
//     color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
//     textColor: 'text-[#EE4275]', 
//     bgColor: 'bg-[#FFF5F6]',
//     borderColor: 'border-[#EE4275]/20'
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
//   },
//   'returned': { 
//     label: 'Returned', 
//     icon: FaUndo, 
//     color: 'bg-purple-500', 
//     textColor: 'text-purple-600', 
//     bgColor: 'bg-purple-50',
//     borderColor: 'border-purple-200'
//   },
//   'partial_delivery': { 
//     label: 'Partial Delivery', 
//     icon: FaBox, 
//     color: 'bg-yellow-500', 
//     textColor: 'text-yellow-600', 
//     bgColor: 'bg-yellow-50',
//     borderColor: 'border-yellow-200'
//   }
// };

// // ========== GET STATUS BADGE COLOR ==========
// const getStatusBadgeColor = (status) => {
//   const colors = {
//     'placed': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
//     'follow_up': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
//     'reminder': 'text-yellow-600 bg-yellow-50 border-yellow-200',
//     'accepted': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
//     'approved': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
//     'hold': 'text-yellow-600 bg-yellow-50 border-yellow-200',
//     'ready_to_ship': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
//     'courier_assigned': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
//     'processing': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
//     'shipped': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
//     'out_for_delivery': 'text-orange-600 bg-orange-50 border-orange-200',
//     'delivered': 'text-green-600 bg-green-50 border-green-200',
//     'cancelled': 'text-red-600 bg-red-50 border-red-200',
//     'rejected': 'text-red-600 bg-red-50 border-red-200',
//     'refunded': 'text-yellow-600 bg-yellow-50 border-yellow-200',
//     'failed': 'text-red-600 bg-red-50 border-red-200',
//     'returned': 'text-purple-600 bg-purple-50 border-purple-200',
//     'partial_delivery': 'text-yellow-600 bg-yellow-50 border-yellow-200'
//   };
//   return colors[status] || 'text-gray-600 bg-gray-100 border-gray-200';
// };

// // ========== GET STATUS LABEL ==========
// const getStatusLabel = (status) => {
//   return STATUS_CONFIG[status]?.label || status;
// };

// // ========== GET PAYMENT METHOD BADGE ==========
// const getPaymentMethodBadge = (method) => {
//   const methods = {
//     'cod': { label: 'Cash on Delivery', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#EE4275]/20', icon: FaMoneyBillWave },
//     'online': { label: 'Online Payment', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#EE4275]/20', icon: FaCreditCard },
//     'bkash': { label: 'bKash', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#EE4275]/20', icon: FaMoneyBillWave },
//     'nagad': { label: 'Nagad', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#EE4275]/20', icon: FaMoneyBillWave }
//   };
//   const info = methods[method] || { label: method || 'Unknown', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: FaMoneyBillWave };
//   const Icon = info.icon;
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${info.color}`}>
//       <Icon className="w-3 h-3" />
//       {info.label}
//     </span>
//   );
// };

// // ========== GROUP ITEMS BY PRODUCT ==========
// const groupItemsByProduct = (items) => {
//   if (!items || items.length === 0) return [];
  
//   const grouped = {};
  
//   items.forEach((item, index) => {
//     let productId = item.productId;
//     if (productId && typeof productId === 'object' && productId._id) {
//       productId = productId._id.toString();
//     } else if (productId) {
//       productId = productId.toString();
//     } else {
//       productId = `item-${index}`;
//     }
    
//     const productName = item.productName || item.name || item.product?.name || 'Unknown Product';
//     const image = item.image || item.product?.images?.[0]?.url || '';
//     const price = item.discountPrice || item.regularPrice || item.price || 0;
//     const unit = item.unit || 'pcs';
    
//     if (!grouped[productId]) {
//       grouped[productId] = {
//         productId: productId,
//         productName: productName,
//         image: image,
//         regularPrice: item.regularPrice || price,
//         discountPrice: item.discountPrice || 0,
//         unit: unit,
//         colors: [],
//         totalQuantity: 0,
//         basePrice: price
//       };
//     }
    
//     let colorValue = null;
//     let colorQty = item.quantity || 0;
//     let colorPrice = price;
    
//     if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
//       const validColors = item.colors.filter(c => 
//         c.color && 
//         c.color !== 'null' && 
//         c.color !== '' && 
//         c.color !== 'undefined'
//       );
      
//       if (validColors.length > 0) {
//         validColors.forEach(c => {
//           const qty = c.quantity || 0;
//           const p = c.price || price;
//           const color = c.color;
          
//           const existingColor = grouped[productId].colors.find(gc => gc.color === color);
//           if (existingColor) {
//             existingColor.quantity += qty;
//           } else {
//             grouped[productId].colors.push({
//               color: color,
//               quantity: qty,
//               price: p
//             });
//           }
//           grouped[productId].totalQuantity += qty;
//         });
//         return;
//       }
//     }
    
//     if (item.selectedColor && 
//         item.selectedColor !== 'null' && 
//         item.selectedColor !== '' && 
//         item.selectedColor !== 'undefined') {
      
//       colorValue = item.selectedColor;
//       const existingColor = grouped[productId].colors.find(gc => gc.color === colorValue);
//       if (existingColor) {
//         existingColor.quantity += colorQty;
//       } else {
//         grouped[productId].colors.push({
//           color: colorValue,
//           quantity: colorQty,
//           price: colorPrice
//         });
//       }
//       grouped[productId].totalQuantity += colorQty;
//       return;
//     }
    
//     const existingDefault = grouped[productId].colors.find(gc => gc.color === null);
//     if (existingDefault) {
//       existingDefault.quantity += colorQty;
//     } else {
//       grouped[productId].colors.push({
//         color: null,
//         quantity: colorQty,
//         price: colorPrice
//       });
//     }
//     grouped[productId].totalQuantity += colorQty;
//   });
  
//   return Object.values(grouped);
// };

// // ========== ORDER CARD COMPONENT ==========
// const OrderCard = ({ order, index, contactItems }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [downloading, setDownloading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
  
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

//   const isTerminal = ['cancelled', 'rejected', 'refunded', 'failed'].includes(order.orderStatus);
//   const isDelivered = order.orderStatus === 'delivered';
//   const isReturned = order.orderStatus === 'returned';
//   const isPartialDelivery = order.orderStatus === 'partial_delivery';
//   const isHold = order.orderStatus === 'hold';
//   const hasDelivery = order.deliveryService?.courierOrderId;

//   const groupedItems = groupItemsByProduct(order.items || []);

//   // ========== GET STATUS HISTORY FOR TIMELINE ==========
//   const getStatusTimeline = () => {
//     if (!order.statusHistory || order.statusHistory.length === 0) {
//       return [
//         {
//           status: order.orderStatus,
//           label: getStatusLabel(order.orderStatus),
//           timestamp: order.createdAt,
//           isCurrent: true,
//           isCompleted: true,
//           color: getStatusBadgeColor(order.orderStatus)
//         }
//       ];
//     }
    
//     const uniqueStatuses = [];
//     const seen = new Set();
    
//     order.statusHistory.forEach(entry => {
//       if (!seen.has(entry.status)) {
//         seen.add(entry.status);
//         uniqueStatuses.push({
//           status: entry.status,
//           label: getStatusLabel(entry.status),
//           timestamp: entry.timestamp,
//           color: getStatusBadgeColor(entry.status)
//         });
//       }
//     });
    
//     const hasCurrentStatus = uniqueStatuses.some(s => s.status === order.orderStatus);
//     if (!hasCurrentStatus) {
//       uniqueStatuses.push({
//         status: order.orderStatus,
//         label: getStatusLabel(order.orderStatus),
//         timestamp: order.updatedAt || order.createdAt,
//         color: getStatusBadgeColor(order.orderStatus)
//       });
//     }
    
//     if (uniqueStatuses.length > 0) {
//       uniqueStatuses[uniqueStatuses.length - 1].isCurrent = true;
//       uniqueStatuses[uniqueStatuses.length - 1].isCompleted = true;
//     }
    
//     uniqueStatuses.forEach((s, index) => {
//       s.isCompleted = true;
//       if (index === uniqueStatuses.length - 1) {
//         s.isCurrent = true;
//       }
//     });
    
//     return uniqueStatuses;
//   };

//   const statusTimeline = getStatusTimeline();

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

//   const getStatusMessage = () => {
//     const status = order.orderStatus;
//     const messages = {
//       'placed': 'Your order has been placed successfully.',
//       'follow_up': 'Your order is being reviewed by our team.',
//       'reminder': 'A reminder has been sent regarding your order.',
//       'accepted': 'Your order has been accepted and is being prepared.',
//       'approved': 'Your order has been approved and is ready for processing.',
//       'hold': 'Your order has been placed on hold. We will contact you shortly.',
//       'ready_to_ship': 'Your order is packed and ready to be shipped!',
//       'courier_assigned': 'A courier has been assigned to deliver your order.',
//       'processing': 'Your order is being processed by the courier service.',
//       'shipped': 'Your order has been shipped and is on its way!',
//       'out_for_delivery': 'Your order is out for delivery! Get ready to receive it.',
//       'delivered': 'Your order has been delivered! We hope you love your new products.',
//       'cancelled': 'Your order has been cancelled.',
//       'rejected': 'Your order has been rejected.',
//       'refunded': 'Your order has been refunded.',
//       'failed': 'Your order has failed.',
//       'returned': 'Your order has been returned.',
//       'partial_delivery': 'Part of your order has been delivered. The remaining items will be delivered soon.'
//     };
//     return messages[status] || 'Your order is being processed.';
//   };

//   // Function to handle contact click
//   const handleContactClick = (contact) => {
//     if (contact.label === 'Phone') {
//       window.location.href = contact.link;
//     } else if (contact.label === 'Email') {
//       const email = contact.link.replace('mailto:', '');
//       window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
//     } else if (contact.label === 'WhatsApp') {
//       window.open(contact.link, '_blank', 'noopener,noreferrer');
//     } else {
//       window.open(contact.link, '_blank');
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.08 }}
//       className="bg-white rounded-2xl border border-[#F7C7D3]/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
//     >
//       {/* Order Header */}
//       <div 
//         className="p-4 sm:p-5 cursor-pointer hover:bg-[#FFF5F6] transition-colors"
//         onClick={() => setExpanded(!expanded)}
//       >
//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div className="flex items-center gap-3 min-w-0">
//             <div className={`w-10 h-10 rounded-full ${statusInfo.bgColor} border ${statusInfo.borderColor} flex items-center justify-center flex-shrink-0`}>
//               <StatusIcon className={`w-5 h-5 ${statusInfo.textColor}`} />
//             </div>
//             <div className="min-w-0">
//               <p className="text-xs text-[#EE4275]/60 font-mono truncate">#{order.orderNumber}</p>
//               <p className="text-sm font-semibold text-[#2D1B2E]">
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
//               <p className="text-sm font-bold text-[#EE4275]">৳{order.total?.toFixed(2)}</p>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(order.orderStatus)}`}>
//               {getStatusLabel(order.orderStatus)}
//             </div>
//             <button
//               onClick={handleDownloadInvoice}
//               disabled={downloading}
//               className="p-1.5 hover:bg-[#FFF5F6] rounded-full transition-colors text-[#EE4275]/60 hover:text-[#EE4275] disabled:opacity-50"
//               title="Download Invoice"
//             >
//               {downloading ? (
//                 <div className="w-4 h-4 border-2 border-[#EE4275] border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 <FaDownload className="w-4 h-4" />
//               )}
//             </button>
//             {expanded ? (
//               <FaChevronUp className="w-4 h-4 text-[#EE4275]/60 flex-shrink-0" />
//             ) : (
//               <FaChevronDown className="w-4 h-4 text-[#EE4275]/60 flex-shrink-0" />
//             )}
//           </div>
//         </div>
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
//             <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-[#F7C7D3]/40 space-y-4">
//               {/* ========== STATUS TIMELINE ========== */}
//               {!isTerminal && statusTimeline.length > 0 && (
//                 <div className="mb-4">
//                   <h4 className="text-xs font-semibold text-[#2D1B2E] mb-3 flex items-center gap-2">
//                     <FaClock className="w-3.5 h-3.5 text-[#EE4275]" />
//                     Order Progress
//                   </h4>
//                   <div className="relative">
//                     <div className="flex items-start justify-between overflow-x-auto pb-3 gap-1 sm:gap-2">
//                       {statusTimeline.map((step, index) => {
//                         const isLast = index === statusTimeline.length - 1;
//                         const isCompleted = step.isCompleted;
//                         const isCurrent = step.isCurrent;
//                         const formattedTime = step.timestamp ? new Date(step.timestamp).toLocaleString('en-BD', {
//                           day: '2-digit',
//                           month: 'short',
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         }) : '';
                        
//                         return (
//                           <div key={step.status} className="flex flex-col items-center flex-1 min-w-[60px] sm:min-w-[80px] relative">
//                             {!isLast && (
//                               <div className={`absolute top-3 sm:top-4 left-[55%] sm:left-[60%] w-[70%] sm:w-[80%] h-0.5 ${isCompleted ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]' : 'bg-[#F7C7D3]'}`} />
//                             )}
                            
//                             <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[8px] sm:text-xs font-bold z-10 ${isCompleted ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-md shadow-[#EE4275]/25' : 'bg-[#F7C7D3]/30 text-[#EE4275]/60 border border-[#F7C7D3]/40'} ${isCurrent ? 'ring-2 sm:ring-4 ring-[#EE4275]/30' : ''}`}>
//                               {isCompleted ? <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" /> : index + 1}
//                             </div>
                            
//                             <span className={`text-[7px] sm:text-[9px] mt-1 sm:mt-1.5 text-center font-medium leading-tight ${isCompleted ? 'text-[#2D1B2E]' : 'text-[#EE4275]/40'}`}>
//                               {step.label}
//                             </span>
                            
//                             {step.timestamp && (
//                               <span className="text-[6px] sm:text-[7px] text-[#EE4275]/40 mt-0.5 text-center max-w-[50px] sm:max-w-[90px] leading-tight">
//                                 {formattedTime}
//                               </span>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Terminal Status Display */}
//               {isTerminal && (
//                 <div className="mb-4 p-3 rounded-xl border bg-red-50 border-red-200">
//                   <div className="flex items-center gap-2 text-sm text-red-600">
//                     <FaExclamationTriangle className="w-4 h-4" />
//                     <span className="font-medium">
//                       {order.orderStatus === 'cancelled' ? 'Order Cancelled' : 
//                        order.orderStatus === 'rejected' ? 'Order Rejected' :
//                        order.orderStatus === 'refunded' ? 'Order Refunded' :
//                        'Order Failed'}
//                     </span>
//                   </div>
//                   {order.cancellationReason && (
//                     <p className="text-xs text-red-500 mt-1">Reason: {order.cancellationReason}</p>
//                   )}
//                 </div>
//               )}

//               {/* Payment & Tracking Info */}
//               <div className="flex flex-wrap gap-3 items-center">
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs text-[#EE4275]/60">Payment:</span>
//                   {getPaymentMethodBadge(order.paymentMethod)}
//                 </div>
//                 {order.trackingNumber && (
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-[#EE4275]/60">Tracking:</span>
//                     <span className="text-xs font-mono text-[#EE4275]">{order.trackingNumber}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Delivery Info */}
//               {hasDelivery && (
//                 <div className="bg-gradient-to-r from-[#FFF5F6] to-[#F7C7D3]/20 border border-[#EE4275]/20 rounded-xl p-3">
//                   <h4 className="text-xs font-bold text-[#2D1B2E] flex items-center gap-2 mb-2">
//                     <FaTruck className="w-3.5 h-3.5 text-[#EE4275]" />
//                     Courier Delivery Information
//                   </h4>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
//                     <div>
//                       <span className="text-[#EE4275]/60">Courier Service:</span>
//                       <span className="font-medium text-[#2D1B2E] ml-1">{order.deliveryService?.courierName || 'N/A'}</span>
//                     </div>
//                     <div>
//                       <span className="text-[#EE4275]/60">Tracking Number:</span>
//                       <span className="font-mono text-[#EE4275] ml-1">{order.deliveryService?.trackingNumber || 'N/A'}</span>
//                     </div>
//                     {order.deliveryService?.trackingUrl && (
//                       <div className="col-span-1 sm:col-span-2 mt-1 pt-1.5 border-t border-[#EE4275]/10">
//                         <div className="flex items-center gap-2">
//                           <span className="text-[#EE4275]/60 text-xs">Track your parcel:</span>
//                           <a
//                             href={order.deliveryService.trackingUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all"
//                           >
//                             <FaExternalLinkAlt className="w-3 h-3" />
//                             Track on {order.deliveryService?.courierName || 'Courier'}
//                           </a>
//                         </div>
//                         <p className="text-[10px] text-[#EE4275]/40 mt-1">
//                           Click the button above to track your parcel
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* ========== ORDER ITEMS ========== */}
//       <div>
//   <div className="flex items-center justify-between mb-2">
//     <h4 className="text-xs font-semibold text-[#2D1B2E] flex items-center gap-2">
//       <FaShoppingBag className="w-3.5 h-3.5 text-[#EE4275]" />
//       Order Items ({groupedItems.length} products)
//     </h4>
//     <span className="text-[10px] text-[#EE4275]/40">
//       Total: {order.items?.length || 0} items
//     </span>
//   </div>
  
//   <div className="bg-[#FFF5F6] rounded-xl border border-[#F7C7D3]/40 overflow-hidden">
//     {/* Table Header */}
//     <div className="grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-[#F7C7D3]/20 border-b border-[#F7C7D3]/40 text-[8px] sm:text-[10px] font-semibold text-[#EE4275]/60 uppercase tracking-wider">
//       <div className="col-span-1 text-center">#</div>
//       <div className="col-span-4 sm:col-span-5">Product</div>
//       <div className="col-span-2 text-center">Color</div>
//       <div className="col-span-1 text-center">Qty</div>
//       <div className="col-span-1 text-center hidden sm:block">Unit</div>
//       <div className="col-span-1 text-right hidden sm:block">Price</div>
//       <div className="col-span-2 sm:col-span-1 text-right">Total</div>
//     </div>
    
//     {/* Table Body */}
//     <div className="max-h-60 overflow-y-auto">
//       {groupedItems.length === 0 ? (
//         <div className="text-center py-4 text-xs text-[#EE4275]/40">No items found</div>
//       ) : (
//         groupedItems.map((group, idx) => {
//           const basePrice = group.basePrice || group.discountPrice || group.regularPrice || 0;
          
//           return group.colors.map((colorObj, colorIdx) => {
//             const isFirstRow = colorIdx === 0;
//             const price = colorObj.price || basePrice;
//             const totalForColor = price * (colorObj.quantity || 0);
            
//             // Color detection
//             let hasColor = false;
//             let colorValue = null;
            
//             if (colorObj.color && 
//                 colorObj.color !== 'null' && 
//                 colorObj.color !== '' && 
//                 colorObj.color !== 'undefined' &&
//                 colorObj.color !== 'null') {
//               hasColor = true;
//               colorValue = colorObj.color;
//             }
            
//             return (
//               <div 
//                 key={`${idx}-${colorIdx}`} 
//                 className={`grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 items-center border-b border-[#F7C7D3]/20 last:border-0 hover:bg-gradient-to-r hover:from-[#FFF5F6] hover:to-[#F7C7D3]/10 transition-colors ${isFirstRow ? '' : 'bg-[#F7C7D3]/10'}`}
//               >
//                 {/* # */}
//                 <div className="col-span-1 text-center text-[8px] sm:text-[10px] text-[#EE4275]/40">
//                   {isFirstRow ? idx + 1 : ''}
//                 </div>
                
//                 {/* Product */}
//                 <div className="col-span-4 sm:col-span-5 flex items-center gap-1.5 sm:gap-2 min-w-0">
//                   {isFirstRow && group.image && (
//                     <img 
//                       src={group.image || 'https://via.placeholder.com/32'} 
//                       alt={group.productName}
//                       className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg object-cover flex-shrink-0 bg-white border border-[#F7C7D3]/40"
//                       onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=Product'; }}
//                     />
//                   )}
//                   {!isFirstRow && <div className="w-6 sm:w-7 flex-shrink-0"></div>}
//                   <div className="min-w-0">
//                     {isFirstRow ? (
//                       <p className="text-[9px] sm:text-xs font-medium text-[#2D1B2E] truncate" title={group.productName}>
//                         {group.productName}
//                       </p>
//                     ) : (
//                       <p className="text-[8px] sm:text-xs text-[#EE4275]/60 truncate">
//                         <span className="text-[#EE4275]/40">└─</span> {hasColor ? '' : 'Default'}
//                       </p>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Color - Show ONLY color circle, no hex code */}
//                 <div className="col-span-2 flex justify-center items-center">
//                   {hasColor ? (
//                     <div 
//                       className="w-5 h-5 rounded-full border-2 border-[#F7C7D3]/50 shadow-sm"
//                       style={{ backgroundColor: colorValue }}
//                       title={colorValue}
//                     />
//                   ) : (
//                     <span className="text-[8px] sm:text-[10px] text-[#EE4275]/40">—</span>
//                   )}
//                 </div>
                
//                 {/* Qty */}
//                 <div className="col-span-1 text-center text-[9px] sm:text-xs font-medium text-[#2D1B2E]">
//                   {colorObj.quantity || 0}
//                 </div>
                
//                 {/* Unit */}
//                 <div className="col-span-1 text-center text-[8px] sm:text-[10px] text-[#EE4275]/40 hidden sm:block">
//                   {isFirstRow ? (group.unit || 'pcs') : ''}
//                 </div>
                
//                 {/* Price */}
//                 <div className="col-span-1 text-right text-[8px] sm:text-[10px] text-[#EE4275]/60 hidden sm:block">
//                   {isFirstRow ? `৳${price.toFixed(2)}` : ''}
//                 </div>
                
//                 {/* Total */}
//                 <div className="col-span-2 sm:col-span-1 text-right text-[9px] sm:text-xs font-medium text-[#EE4275]">
//                   ৳{totalForColor.toFixed(2)}
//                 </div>
//               </div>
//             );
//           });
//         })
//       )}
//     </div>
    
//     {/* Table Footer - Totals */}
//     <div className="border-t border-[#F7C7D3]/40 bg-gradient-to-r from-[#F7C7D3]/10 to-[#FFF5F6] px-2 sm:px-3 py-2">
//       <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-6 text-[9px] sm:text-xs">
//         <div>
//           <span className="text-[#EE4275]/60">Subtotal:</span>
//           <span className="font-medium text-[#2D1B2E] ml-1">৳{order.subtotal?.toFixed(2)}</span>
//         </div>
//         <div>
//           <span className="text-[#EE4275]/60">Shipping:</span>
//           <span className="font-medium text-[#2D1B2E] ml-1">৳{order.shippingCost?.toFixed(2)}</span>
//         </div>
//         {order.discount > 0 && (
//           <div>
//             <span className="text-green-600">Discount:</span>
//             <span className="font-medium text-green-600 ml-1">- ৳{order.discount?.toFixed(2)}</span>
//           </div>
//         )}
//         <div className="pl-2 sm:pl-4 border-l-2 border-[#F7C7D3]/40">
//           <span className="font-bold text-[#2D1B2E]">Total:</span>
//           <span className="font-bold text-[#EE4275] ml-1">৳{order.total?.toFixed(2)}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//               {/* Status History */}
//               {order.timeline && order.timeline.length > 0 && (
//                 <div>
//                   <h4 className="text-xs font-semibold text-[#2D1B2E] mb-2 flex items-center gap-2">
//                     <FaClock className="w-3.5 h-3.5 text-[#EE4275]" />
//                     Status History
//                   </h4>
//                   <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
//                     {order.timeline.map((entry, idx) => {
//                       const entryStatusInfo = STATUS_CONFIG[entry.status] || STATUS_CONFIG['placed'];
//                       const isCurrent = entry.status === order.orderStatus;
//                       const displayLabel = entryStatusInfo.label || entry.status;
                      
//                       return (
//                         <div key={idx} className="flex items-start gap-2.5">
//                           <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isCurrent ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] ring-2 ring-[#EE4275]/30' : 'bg-[#F7C7D3]'}`} />
//                           <div className="flex-1">
//                             <div className="flex flex-wrap items-center gap-1.5">
//                               <span className={`text-xs font-medium ${isCurrent ? 'text-[#EE4275]' : 'text-[#2D1B2E]'}`}>
//                                 {displayLabel}
//                               </span>
//                               <span className="text-[9px] text-[#EE4275]/40">{entry.formattedDate}</span>
//                             </div>
//                             {entry.note && (
//                               <p className="text-[10px] text-[#EE4275]/40">{entry.note}</p>
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
//                 className="w-full py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
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
//   const [footerData, setFooterData] = useState(null);
//   const [contactItems, setContactItems] = useState([]);

//   // Fetch footer data on mount
//   useEffect(() => {
//     const loadFooterData = async () => {
//       const data = await fetchFooterData();
//       if (data) {
//         setFooterData(data);
//         const contacts = getContactItemsFromFooter(data);
//         setContactItems(contacts);
//       } else {
//         // Use default contacts
//         setContactItems([
//           { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#EE4275]' },
//           { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#EE4275]' },
//           { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
//         ]);
//       }
//     };
//     loadFooterData();
//   }, []);

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

//   // Function to handle contact click
//   const handleContactClick = (contact) => {
//     if (contact.label === 'Phone') {
//       window.location.href = contact.link;
//     } else if (contact.label === 'Email') {
//       const email = contact.link.replace('mailto:', '');
//       window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
//     } else if (contact.label === 'WhatsApp') {
//       window.open(contact.link, '_blank', 'noopener,noreferrer');
//     } else {
//       window.open(contact.link, '_blank');
//     }
//   };

//   // Get icon component
//   const getIcon = (IconComponent, className = "w-3 h-3 sm:w-4 sm:h-4") => {
//     return <IconComponent className={className} />;
//   };

//   return (
//     <>
//       <Navbar />
      
//       <div className="min-h-screen bg-white pt-12 lg:pt-10 pb-8">
//         <div className="container mx-auto px-4 max-w-4xl">
//           {/* Header - Pink Theme */}
//           <div className="text-center mb-6 sm:mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-full mb-3 shadow-lg shadow-[#EE4275]/25">
//               <FaTruck className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#2D1B2E]">
//               Track Your Orders
//             </h1>
//             <p className="text-sm text-[#EE4275]/60 mt-1">Enter your phone number to see all your orders</p>
//           </div>

//           {/* Search Form - Pink Theme */}
//           <div className="bg-white rounded-2xl border border-[#F7C7D3]/40 p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
//             <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
//               <div className="flex-1 relative">
//                 <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EE4275]/40" />
//                 <input
//                   type="tel"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="Enter your phone number (01XXXXXXXXX)"
//                   className="w-full pl-10 pr-3 py-2.5 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none text-sm sm:text-base text-[#2D1B2E] placeholder:text-[#EE4275]/40"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
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
//               {/* Summary Banner - Pink Theme */}
//               <div className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-2xl p-4 text-white shadow-lg shadow-[#EE4275]/25">
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
//                   <OrderCard key={order.orderNumber || index} order={order} index={index} contactItems={contactItems} />
//                 ))}
//               </div>

//               {/* Continue Shopping */}
//               <div className="text-center pt-4">
//                 <Link href="/products" className="inline-flex items-center gap-2 text-[#EE4275] hover:text-[#EE4275]/80 transition-colors text-sm font-medium">
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
//               className="bg-white rounded-2xl border border-[#F7C7D3]/40 p-8 sm:p-12 text-center shadow-sm"
//             >
//               <div className="w-16 h-16 mx-auto mb-4 bg-[#FFF5F6] rounded-full flex items-center justify-center border border-[#F7C7D3]/40">
//                 <FaSearch className="w-8 h-8 text-[#EE4275]/40" />
//               </div>
//               <h3 className="text-lg font-semibold text-[#2D1B2E] mb-2">
//                 No Orders Found
//               </h3>
//               <p className="text-sm text-[#EE4275]/60">We couldn't find any orders with this phone number.</p>
//               <p className="text-xs text-[#EE4275]/40 mt-2">Please check the number and try again.</p>
//             </motion.div>
//           )}

//           {/* Trust Badges */}
//           <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#EE4275]/60">
//             <div className="flex items-center gap-2">
//               <FaShieldAlt className="w-4 h-4 text-[#EE4275]" />
//               <span>Secure Tracking</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaClock className="w-4 h-4 text-[#EE4275]" />
//               <span>Real-time Updates</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaStar className="w-4 h-4 text-[#EE4275]" />
//               <span>Premium Quality</span>
//             </div>
//           </div>

//           {/* ========== HELP SECTION - SHOW NUMBERS DIRECTLY ========== */}
//           <div className="mt-6 sm:mt-8 text-center">
//             <p className="text-xs text-[#EE4275]/60">Need help? Contact our support team</p>
//             <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
//               {contactItems.map((contact, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleContactClick(contact)}
//                   className={`text-sm hover:opacity-80 transition-colors flex items-center gap-1 ${contact.color}`}
//                 >
//                   {getIcon(contact.icon)}
//                   <span>{contact.value}</span>
//                 </button>
//               ))}
//               {contactItems.length > 0 && contactItems.map((_, index) => {
//                 if (index < contactItems.length - 1) {
//                   return <span key={`sep-${index}`} className="text-[#EE4275]/20 hidden sm:inline">|</span>;
//                 }
//                 return null;
//               })}
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

// ========== FONT CONSTANTS - BEAUTY BUCKET STYLE ==========
const FONT_FAMILY_SERIF = "serif";
const FONT_FAMILY_CURSIVE = "'Courgette', cursive";

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
      { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#EE4275]' },
      { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#EE4275]' },
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
      color: 'text-[#EE4275]'
    });
  } else if (company.phone) {
    const cleanPhone = company.phone.replace(/[^0-9+]/g, '');
    contacts.push({
      icon: FaPhone,
      label: 'Phone',
      value: company.phone,
      link: `tel:${cleanPhone}`,
      color: 'text-[#EE4275]'
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
      color: 'text-[#EE4275]'
    });
  } else if (company.email) {
    contacts.push({
      icon: FaEnvelope,
      label: 'Email',
      value: company.email,
      link: `mailto:${company.email}`,
      color: 'text-[#EE4275]'
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
      { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#EE4275]' },
      { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#EE4275]' },
      { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
    );
  }

  return contacts;
};

// ========== STATUS CONFIG - Pink Theme ==========
const STATUS_CONFIG = {
  'placed': { 
    label: 'Order Placed', 
    icon: FaBox, 
    color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
    textColor: 'text-[#EE4275]', 
    bgColor: 'bg-[#FFF5F6]',
    borderColor: 'border-[#EE4275]/20'
  },
  'follow_up': { 
    label: 'Follow Up', 
    icon: FaPhoneAlt, 
    color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
    textColor: 'text-[#EE4275]', 
    bgColor: 'bg-[#FFF5F6]',
    borderColor: 'border-[#EE4275]/20'
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
    color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
    textColor: 'text-[#EE4275]', 
    bgColor: 'bg-[#FFF5F6]',
    borderColor: 'border-[#EE4275]/20'
  },
  'approved': { 
    label: 'Approved', 
    icon: FaClipboardCheck, 
    color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
    textColor: 'text-[#EE4275]', 
    bgColor: 'bg-[#FFF5F6]',
    borderColor: 'border-[#EE4275]/20'
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
    color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
    textColor: 'text-[#EE4275]', 
    bgColor: 'bg-[#FFF5F6]',
    borderColor: 'border-[#EE4275]/20'
  },
  'courier_assigned': { 
    label: 'Assigned to Courier', 
    icon: FaTruck, 
    color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
    textColor: 'text-[#EE4275]', 
    bgColor: 'bg-[#FFF5F6]',
    borderColor: 'border-[#EE4275]/20'
  },
  'processing': { 
    label: 'Processing', 
    icon: FaSpinner,
    color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
    textColor: 'text-[#EE4275]', 
    bgColor: 'bg-[#FFF5F6]',
    borderColor: 'border-[#EE4275]/20'
  },
  'shipped': { 
    label: 'Shipped', 
    icon: FaShippingFast, 
    color: 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]', 
    textColor: 'text-[#EE4275]', 
    bgColor: 'bg-[#FFF5F6]',
    borderColor: 'border-[#EE4275]/20'
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
    'placed': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
    'follow_up': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
    'reminder': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    'accepted': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
    'approved': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
    'hold': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    'ready_to_ship': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
    'courier_assigned': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
    'processing': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
    'shipped': 'text-[#EE4275] bg-[#FFF5F6] border-[#EE4275]/20',
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
    'cod': { label: 'Cash on Delivery', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#EE4275]/20', icon: FaMoneyBillWave },
    'online': { label: 'Online Payment', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#EE4275]/20', icon: FaCreditCard },
    'bkash': { label: 'bKash', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#EE4275]/20', icon: FaMoneyBillWave },
    'nagad': { label: 'Nagad', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#EE4275]/20', icon: FaMoneyBillWave }
  };
  const info = methods[method] || { label: method || 'Unknown', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: FaMoneyBillWave };
  const Icon = info.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${info.color}`} style={{ fontFamily: FONT_FAMILY_SERIF }}>
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
      className="bg-white rounded-2xl border border-[#F7C7D3]/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Order Header */}
      <div 
        className="p-4 sm:p-5 cursor-pointer hover:bg-[#FFF5F6] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 rounded-full ${statusInfo.bgColor} border ${statusInfo.borderColor} flex items-center justify-center flex-shrink-0`}>
              <StatusIcon className={`w-5 h-5 ${statusInfo.textColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#EE4275]/60 font-mono truncate" style={{ fontFamily: FONT_FAMILY_SERIF }}>#{order.orderNumber}</p>
              <p className="text-sm font-semibold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_SERIF }}>
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
              <p className="text-sm font-bold text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_SERIF }}>৳{order.total?.toFixed(2)}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(order.orderStatus)}`} style={{ fontFamily: FONT_FAMILY_SERIF }}>
              {getStatusLabel(order.orderStatus)}
            </div>
            <button
              onClick={handleDownloadInvoice}
              disabled={downloading}
              className="p-1.5 hover:bg-[#FFF5F6] rounded-full transition-colors text-[#EE4275]/60 hover:text-[#EE4275] disabled:opacity-50"
              title="Download Invoice"
            >
              {downloading ? (
                <div className="w-4 h-4 border-2 border-[#EE4275] border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaDownload className="w-4 h-4" />
              )}
            </button>
            {expanded ? (
              <FaChevronUp className="w-4 h-4 text-[#EE4275]/60 flex-shrink-0" />
            ) : (
              <FaChevronDown className="w-4 h-4 text-[#EE4275]/60 flex-shrink-0" />
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
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-[#F7C7D3]/40 space-y-4">
              {/* ========== STATUS TIMELINE ========== */}
              {!isTerminal && statusTimeline.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-[#2D1B2E] mb-3 flex items-center gap-2" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                    <FaClock className="w-3.5 h-3.5 text-[#EE4275]" />
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
                              <div className={`absolute top-3 sm:top-4 left-[55%] sm:left-[60%] w-[70%] sm:w-[80%] h-0.5 ${isCompleted ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]' : 'bg-[#F7C7D3]'}`} />
                            )}
                            
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[8px] sm:text-xs font-bold z-10 ${isCompleted ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-md shadow-[#EE4275]/25' : 'bg-[#F7C7D3]/30 text-[#EE4275]/60 border border-[#F7C7D3]/40'} ${isCurrent ? 'ring-2 sm:ring-4 ring-[#EE4275]/30' : ''}`}>
                              {isCompleted ? <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" /> : index + 1}
                            </div>
                            
                            <span className={`text-[7px] sm:text-[9px] mt-1 sm:mt-1.5 text-center font-medium leading-tight ${isCompleted ? 'text-[#2D1B2E]' : 'text-[#EE4275]/40'}`} style={{ fontFamily: FONT_FAMILY_SERIF }}>
                              {step.label}
                            </span>
                            
                            {step.timestamp && (
                              <span className="text-[6px] sm:text-[7px] text-[#EE4275]/40 mt-0.5 text-center max-w-[50px] sm:max-w-[90px] leading-tight" style={{ fontFamily: FONT_FAMILY_SERIF }}>
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
                    <span className="font-medium" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                      {order.orderStatus === 'cancelled' ? 'Order Cancelled' : 
                       order.orderStatus === 'rejected' ? 'Order Rejected' :
                       order.orderStatus === 'refunded' ? 'Order Refunded' :
                       'Order Failed'}
                    </span>
                  </div>
                  {order.cancellationReason && (
                    <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_SERIF }}>Reason: {order.cancellationReason}</p>
                  )}
                </div>
              )}

              {/* Payment & Tracking Info */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_SERIF }}>Payment:</span>
                  {getPaymentMethodBadge(order.paymentMethod)}
                </div>
                {order.trackingNumber && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_SERIF }}>Tracking:</span>
                    <span className="text-xs font-mono text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_SERIF }}>{order.trackingNumber}</span>
                  </div>
                )}
              </div>

              {/* Delivery Info */}
              {hasDelivery && (
                <div className="bg-gradient-to-r from-[#FFF5F6] to-[#F7C7D3]/20 border border-[#EE4275]/20 rounded-xl p-3">
                  <h4 className="text-xs font-bold text-[#2D1B2E] flex items-center gap-2 mb-2" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                    <FaTruck className="w-3.5 h-3.5 text-[#EE4275]" />
                    Courier Delivery Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                    <div>
                      <span className="text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_SERIF }}>Courier Service:</span>
                      <span className="font-medium text-[#2D1B2E] ml-1" style={{ fontFamily: FONT_FAMILY_SERIF }}>{order.deliveryService?.courierName || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_SERIF }}>Tracking Number:</span>
                      <span className="font-mono text-[#EE4275] ml-1" style={{ fontFamily: FONT_FAMILY_SERIF }}>{order.deliveryService?.trackingNumber || 'N/A'}</span>
                    </div>
                    {order.deliveryService?.trackingUrl && (
                      <div className="col-span-1 sm:col-span-2 mt-1 pt-1.5 border-t border-[#EE4275]/10">
                        <div className="flex items-center gap-2">
                          <span className="text-[#EE4275]/60 text-xs" style={{ fontFamily: FONT_FAMILY_SERIF }}>Track your parcel:</span>
                          <a
                            href={order.deliveryService.trackingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all"
                            style={{ fontFamily: FONT_FAMILY_SERIF }}
                          >
                            <FaExternalLinkAlt className="w-3 h-3" />
                            Track on {order.deliveryService?.courierName || 'Courier'}
                          </a>
                        </div>
                        <p className="text-[10px] text-[#EE4275]/40 mt-1" style={{ fontFamily: FONT_FAMILY_SERIF }}>
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
    <h4 className="text-xs font-semibold text-[#2D1B2E] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY_SERIF }}>
      <FaShoppingBag className="w-3.5 h-3.5 text-[#EE4275]" />
      Order Items ({groupedItems.length} products)
    </h4>
    <span className="text-[10px] text-[#EE4275]/40" style={{ fontFamily: FONT_FAMILY_SERIF }}>
      Total: {order.items?.length || 0} items
    </span>
  </div>
  
  <div className="bg-[#FFF5F6] rounded-xl border border-[#F7C7D3]/40 overflow-hidden">
    {/* Table Header */}
    <div className="grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-[#F7C7D3]/20 border-b border-[#F7C7D3]/40 text-[8px] sm:text-[10px] font-semibold text-[#EE4275]/60 uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_SERIF }}>
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
        <div className="text-center py-4 text-xs text-[#EE4275]/40" style={{ fontFamily: FONT_FAMILY_SERIF }}>No items found</div>
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
                className={`grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 items-center border-b border-[#F7C7D3]/20 last:border-0 hover:bg-gradient-to-r hover:from-[#FFF5F6] hover:to-[#F7C7D3]/10 transition-colors ${isFirstRow ? '' : 'bg-[#F7C7D3]/10'}`}
              >
                {/* # */}
                <div className="col-span-1 text-center text-[8px] sm:text-[10px] text-[#EE4275]/40" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                  {isFirstRow ? idx + 1 : ''}
                </div>
                
                {/* Product */}
                <div className="col-span-4 sm:col-span-5 flex items-center gap-1.5 sm:gap-2 min-w-0">
                  {isFirstRow && group.image && (
                    <img 
                      src={group.image || 'https://via.placeholder.com/32'} 
                      alt={group.productName}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg object-cover flex-shrink-0 bg-white border border-[#F7C7D3]/40"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=Product'; }}
                    />
                  )}
                  {!isFirstRow && <div className="w-6 sm:w-7 flex-shrink-0"></div>}
                  <div className="min-w-0">
                    {isFirstRow ? (
                      <p className="text-[9px] sm:text-xs font-medium text-[#2D1B2E] truncate" title={group.productName} style={{ fontFamily: FONT_FAMILY_SERIF }}>
                        {group.productName}
                      </p>
                    ) : (
                      <p className="text-[8px] sm:text-xs text-[#EE4275]/60 truncate" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                        <span className="text-[#EE4275]/40">└─</span> {hasColor ? '' : 'Default'}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Color - Show ONLY color circle, no hex code */}
                <div className="col-span-2 flex justify-center items-center">
                  {hasColor ? (
                    <div 
                      className="w-5 h-5 rounded-full border-2 border-[#F7C7D3]/50 shadow-sm"
                      style={{ backgroundColor: colorValue }}
                      title={colorValue}
                    />
                  ) : (
                    <span className="text-[8px] sm:text-[10px] text-[#EE4275]/40" style={{ fontFamily: FONT_FAMILY_SERIF }}>—</span>
                  )}
                </div>
                
                {/* Qty */}
                <div className="col-span-1 text-center text-[9px] sm:text-xs font-medium text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                  {colorObj.quantity || 0}
                </div>
                
                {/* Unit */}
                <div className="col-span-1 text-center text-[8px] sm:text-[10px] text-[#EE4275] hidden sm:block" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                  {isFirstRow ? (group.unit || 'pcs') : ''}
                </div>
                
                {/* Price */}
                <div className="col-span-1 text-right text-[8px] sm:text-[10px] text-[#EE4275] hidden sm:block" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                  {isFirstRow ? `৳${price.toFixed(2)}` : ''}
                </div>
                
                {/* Total */}
                <div className="col-span-2 sm:col-span-1 text-right text-[9px] sm:text-xs font-medium text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                  ৳{totalForColor.toFixed(2)}
                </div>
              </div>
            );
          });
        })
      )}
    </div>
    
    {/* Table Footer - Totals */}
    <div className="border-t border-[#F7C7D3]/40 bg-gradient-to-r from-[#F7C7D3]/10 to-[#FFF5F6] px-2 sm:px-3 py-2">
      <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-6 text-[9px] sm:text-xs" style={{ fontFamily: FONT_FAMILY_SERIF }}>
        <div>
          <span className="text-[#EE4275]/60">Subtotal:</span>
          <span className="font-medium text-[#2D1B2E] ml-1">৳{order.subtotal?.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-[#EE4275]/60">Shipping:</span>
          <span className="font-medium text-[#2D1B2E] ml-1">৳{order.shippingCost?.toFixed(2)}</span>
        </div>
        {order.discount > 0 && (
          <div>
            <span className="text-green-600">Discount:</span>
            <span className="font-medium text-green-600 ml-1">- ৳{order.discount?.toFixed(2)}</span>
          </div>
        )}
        <div className="pl-2 sm:pl-4 border-l-2 border-[#F7C7D3]/40">
          <span className="font-bold text-[#2D1B2E]">Total:</span>
          <span className="font-bold text-[#EE4275] ml-1">৳{order.total?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  </div>
</div>

              {/* Status History */}
              {order.timeline && order.timeline.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[#2D1B2E] mb-2 flex items-center gap-2" style={{ fontFamily: FONT_FAMILY_SERIF }}>
                    <FaClock className="w-3.5 h-3.5 text-[#EE4275]" />
                    Status History
                  </h4>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
                    {order.timeline.map((entry, idx) => {
                      const entryStatusInfo = STATUS_CONFIG[entry.status] || STATUS_CONFIG['placed'];
                      const isCurrent = entry.status === order.orderStatus;
                      const displayLabel = entryStatusInfo.label || entry.status;
                      
                      return (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isCurrent ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] ring-2 ring-[#EE4275]/30' : 'bg-[#F7C7D3]'}`} />
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className={`text-xs font-medium ${isCurrent ? 'text-[#EE4275]' : 'text-[#2D1B2E]'}`} style={{ fontFamily: FONT_FAMILY_SERIF }}>
                                {displayLabel}
                              </span>
                              <span className="text-[9px] text-[#EE4275]/40" style={{ fontFamily: FONT_FAMILY_SERIF }}>{entry.formattedDate}</span>
                            </div>
                            {entry.note && (
                              <p className="text-[10px] text-[#EE4275]/40" style={{ fontFamily: FONT_FAMILY_SERIF }}>{entry.note}</p>
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
                className="w-full py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
                style={{ fontFamily: FONT_FAMILY_SERIF }}
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
          { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#EE4275]' },
          { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#EE4275]' },
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
          {/* Header - Pink Theme */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-full mb-3 shadow-lg shadow-[#EE4275]/25">
              <FaTruck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
              Track Your Orders
            </h1>
            <p className="text-sm text-[#EE4275]/60 mt-1" style={{ fontFamily: FONT_FAMILY_SERIF }}>Enter your phone number to see all your orders</p>
          </div>

          {/* Search Form - Pink Theme */}
          <div className="bg-white rounded-2xl border border-[#F7C7D3]/40 p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EE4275]/40" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number (01XXXXXXXXX)"
                  className="w-full pl-10 pr-3 py-2.5 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none text-sm sm:text-base text-[#2D1B2E] placeholder:text-[#EE4275]/40"
                  style={{ fontFamily: FONT_FAMILY_SERIF }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
                style={{ fontFamily: FONT_FAMILY_SERIF }}
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
                  <p className="text-sm text-red-700 font-medium" style={{ fontFamily: FONT_FAMILY_SERIF }}>No Orders Found</p>
                  <p className="text-xs text-red-600" style={{ fontFamily: FONT_FAMILY_SERIF }}>{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {trackingData && (
            <div className="space-y-4">
              {/* Summary Banner - Pink Theme */}
              <div className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-2xl p-4 text-white shadow-lg shadow-[#EE4275]/25">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-white/80" style={{ fontFamily: FONT_FAMILY_SERIF }}>Phone Number</p>
                    <p className="text-lg font-bold" style={{ fontFamily: FONT_FAMILY_SERIF }}>{trackingData.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/80" style={{ fontFamily: FONT_FAMILY_SERIF }}>Total Orders</p>
                    <p className="text-2xl font-bold" style={{ fontFamily: FONT_FAMILY_SERIF }}>{trackingData.totalOrders}</p>
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
                <Link href="/products" className="inline-flex items-center gap-2 text-[#EE4275] hover:text-[#EE4275]/80 transition-colors text-sm font-medium" style={{ fontFamily: FONT_FAMILY_SERIF }}>
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
              className="bg-white rounded-2xl border border-[#F7C7D3]/40 p-8 sm:p-12 text-center shadow-sm"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-[#FFF5F6] rounded-full flex items-center justify-center border border-[#F7C7D3]/40">
                <FaSearch className="w-8 h-8 text-[#EE4275]/40" />
              </div>
              <h3 className="text-lg font-semibold text-[#2D1B2E] mb-2" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
                No Orders Found
              </h3>
              <p className="text-sm text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_SERIF }}>We couldn't find any orders with this phone number.</p>
              <p className="text-xs text-[#EE4275]/40 mt-2" style={{ fontFamily: FONT_FAMILY_SERIF }}>Please check the number and try again.</p>
            </motion.div>
          )}

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#EE4275]/60">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="w-4 h-4 text-[#EE4275]" />
              <span style={{ fontFamily: FONT_FAMILY_SERIF }}>Secure Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="w-4 h-4 text-[#EE4275]" />
              <span style={{ fontFamily: FONT_FAMILY_SERIF }}>Real-time Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="w-4 h-4 text-[#EE4275]" />
              <span style={{ fontFamily: FONT_FAMILY_SERIF }}>Premium Quality</span>
            </div>
          </div>

          {/* ========== HELP SECTION - SHOW NUMBERS DIRECTLY ========== */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_SERIF }}>Need help? Contact our support team</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              {contactItems.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleContactClick(contact)}
                  className={`text-sm hover:opacity-80 transition-colors flex items-center gap-1 ${contact.color}`}
                  style={{ fontFamily: FONT_FAMILY_SERIF }}
                >
                  {getIcon(contact.icon)}
                  <span>{contact.value}</span>
                </button>
              ))}
              {contactItems.length > 0 && contactItems.map((_, index) => {
                if (index < contactItems.length - 1) {
                  return <span key={`sep-${index}`} className="text-[#EE4275]/20 hidden sm:inline">|</span>;
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