

// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import {
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   ArrowRight,
//   AlertCircle,
//   Check,
//   Loader2,
//   Palette,
//   Zap
// } from 'lucide-react';

// import { 
//   FaChevronDown, 
//   FaCheckCircle, 
//   FaTimes, 
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaFileAlt,
//   FaMoneyBillWave,
//   FaTruck,
//   FaShoppingBag,
//   FaClock,
//   FaShieldAlt,
//   FaArrowLeft,
//   FaBox,
//   FaShippingFast,
//   FaCreditCard,
//   FaStore,
//   FaBuilding,
//   FaSearch,
//   FaHome,
//   FaCity,
//   FaMapPin,
//   FaMinus,
//   FaPlus,
//   FaTrash
// } from 'react-icons/fa';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Font family constants - matching Categories page
// const FONT_FAMILY = "'Courgette', cursive";
// const FONT_FAMILY_PLAYFAIR = " serif";

// // Searchable Select Component
// const SearchableSelect = ({ name, value, onChange, options, placeholder, required, disabled, error }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const dropdownRef = useRef(null);

//   const filteredOptions = options.filter(option =>
//     option.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSelect = (selectedValue) => {
//     onChange({ target: { name, value: selectedValue } });
//     setIsOpen(false);
//     setSearchTerm('');
//   };

//   const handleClear = () => {
//     onChange({ target: { name, value: '' } });
//     setSearchTerm('');
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const selectedOption = value && options.includes(value) ? value : '';

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus-within:ring-2 focus-within:ring-[#EE4275] focus-within:border-transparent cursor-pointer flex items-center justify-between transition-all ${
//           disabled ? 'bg-[#F7C7D3]/20 cursor-not-allowed' : 'bg-white'
//         } ${error ? 'border-red-500' : 'border-[#F7C7D3]/50 hover:border-[#EE4275]/30'}`}
//         style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//       >
//         <span className={`text-sm ${selectedOption ? 'text-[#2D1B2E] font-medium' : 'text-[#EE4275]/60'}`}>
//           {selectedOption || placeholder}
//         </span>
//         <div className="flex items-center gap-2">
//           {selectedOption && !disabled && (
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleClear();
//               }}
//               className="text-[#EE4275]/60 hover:text-[#2D1B2E]"
//             >
//               <FaTimes className="w-3 h-3" />
//             </button>
//           )}
//           <FaChevronDown className={`w-3 h-3 text-[#EE4275]/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//         </div>
//       </div>

//       {isOpen && !disabled && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-[#F7C7D3]/50 rounded-xl shadow-lg max-h-60 overflow-hidden">
//           <div className="p-2 border-b border-[#F7C7D3]/30">
//             <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EE4275]/40 w-3.5 h-3.5" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 className="w-full pl-9 pr-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE4275] text-sm"
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 onClick={(e) => e.stopPropagation()}
//               />
//             </div>
//           </div>
//           <div className="overflow-y-auto max-h-48">
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((option, idx) => (
//                 <button
//                   key={idx}
//                   type="button"
//                   onClick={() => handleSelect(option)}
//                   className="w-full px-4 py-2.5 text-left hover:bg-[#FFF5F6] transition-colors text-sm text-[#2D1B2E]"
//                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 >
//                   {option}
//                 </button>
//               ))
//             ) : (
//               <div className="px-4 py-3 text-sm text-[#EE4275]/60 text-center" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 No results found
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       {required && !disabled && (
//         <input type="hidden" name={name} value={value} required={required} />
//       )}
//     </div>
//   );
// };

// // Payment Selector
// const PaymentSelector = ({ onSubmit, isSubmitting, disabled }) => {
//   return (
//     <div>
//       <div className="bg-gradient-to-r from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-xl p-4 border-2 border-[#EE4275]/30">
//         <div className="flex items-start gap-3">
//           <div className="w-10 h-10 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#EE4275]/25">
//             <FaMoneyBillWave className="w-5 h-5 text-white" />
//           </div>
//           <div>
//             <h4 className="font-bold text-[#2D1B2E] text-sm" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//               Cash on Delivery
//             </h4>
//             <p className="text-xs text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//               Pay when you receive your order
//             </p>
//           </div>
//         </div>
//       </div>
      
//       {disabled ? (
//         <div className="w-full mt-4 bg-[#F7C7D3]/20 text-[#EE4275]/60 py-3 rounded-xl font-semibold text-center cursor-not-allowed flex items-center justify-center gap-2 text-sm border border-[#EE4275]/20" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//           <FaShieldAlt className="w-4 h-4 text-[#EE4275]" />
//           Checkout Disabled for Admin/Moderator
//         </div>
//       ) : (
//         <button
//           type="button"
//           onClick={onSubmit}
//           disabled={isSubmitting}
//           className="w-full mt-4 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#EE4275]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
//           style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//         >
//           {isSubmitting ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               Placing Order...
//             </>
//           ) : (
//             <>
//               <Zap className="w-4 h-4" />
//               Place Order
//             </>
//           )}
//         </button>
//       )}
//     </div>
//   );
// };

// // Order Success Modal
// const OrderSuccessModal = ({ isOpen, onClose, orderId, isLoggedIn, customerEmail }) => {
//   const router = useRouter();
  
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-[#EE4275]/20"
//           >
//             <div className="p-6 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-center">
//               <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
//                 <FaCheckCircle className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-xl font-bold" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 Order Placed Successfully! 🎉
//               </h2>
//               <p className="text-sm text-white/80 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 Your order has been confirmed
//               </p>
//             </div>
            
//             <div className="p-6 text-center">
//               <p className="text-[#2D1B2E] mb-2 font-semibold" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 Thank you for your order!
//               </p>
//               <p className="text-sm text-[#EE4275]/60 mb-4" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 We'll notify you when it ships.
//               </p>
//               {orderId && (
//                 <div className="bg-[#FFF5F6] rounded-lg p-3 mb-4 border border-[#F7C7D3]/40">
//                   <p className="text-xs text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     Order Reference
//                   </p>
//                   <p className="text-sm font-mono font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     {orderId.slice(-8).toUpperCase()}
//                   </p>
//                 </div>
//               )}
//               {customerEmail ? (
//                 <div className="bg-[#EE4275]/10 rounded-lg p-3 mb-4 flex items-start gap-2 text-left border border-[#EE4275]/20">
//                   <FaCheckCircle className="w-4 h-4 text-[#EE4275] mt-0.5 flex-shrink-0" />
//                   <p className="text-xs text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     A confirmation email has been sent to <span className="font-medium text-[#EE4275]">{customerEmail}</span>
//                   </p>
//                 </div>
//               ) : (
//                 <div className="bg-[#FFF5F6] rounded-lg p-3 mb-4 flex items-start gap-2 text-left border border-[#F7C7D3]/40">
//                   <FaCheckCircle className="w-4 h-4 text-[#EE4275] mt-0.5 flex-shrink-0" />
//                   <p className="text-xs text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     Order placed successfully! Check your phone for updates.
//                   </p>
//                 </div>
//               )}
//             </div>
            
//             <div className="p-4 border-t border-[#EE4275]/20 bg-[#FFF5F6] flex flex-col sm:flex-row gap-2">
//               <button 
//                 onClick={() => {
//                   onClose();
//                   if (isLoggedIn) {
//                     router.push('/customer/orders');
//                   }
//                 }} 
//                 className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-colors text-sm font-medium"
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               >
//                 {isLoggedIn ? 'View My Orders' : 'Continue Shopping'}
//               </button>
//               <button 
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2.5 border border-[#EE4275]/30 text-[#2D1B2E] rounded-xl hover:bg-[#FFF5F6] transition-colors text-sm font-medium"
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Helper function for unit label
// const getUnitLabel = (unit) => {
//   const units = {
//     'pcs': 'pcs',
//     'ton': 'ton',
//     'other': 'unit'
//   };
//   return units[unit] || unit;
// };

// // Get client device info
// const getClientDeviceInfo = () => {
//   try {
//     return {
//       screenResolution: `${window.screen.width}x${window.screen.height}`,
//       viewportSize: `${window.innerWidth}x${window.innerHeight}`,
//       colorDepth: window.screen.colorDepth,
//       pixelRatio: window.devicePixelRatio,
//       timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//       language: navigator.language,
//       referrer: document.referrer || null,
//       doNotTrack: navigator.doNotTrack,
//       vendor: navigator.vendor,
//       connection: navigator.connection ? {
//         effectiveType: navigator.connection.effectiveType,
//         downlink: navigator.connection.downlink,
//         rtt: navigator.connection.rtt
//       } : null
//     };
//   } catch (error) {
//     console.error('Error getting client device info:', error);
//     return {};
//   }
// };

// // AnimatePresence wrapper for modals
// const AnimatePresence = ({ children }) => {
//   return <>{children}</>;
// };

// export default function CheckoutClient() {
//   const router = useRouter();
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
//   const [lastOrderId, setLastOrderId] = useState(null);
//   const [shippingCost, setShippingCost] = useState(0);
//   const [isUpdatingCart, setIsUpdatingCart] = useState(false);
//   const [navigating, setNavigating] = useState(false);
//   const isPlacingOrder = useRef(false);

//   const [shippingRates, setShippingRates] = useState({
//     insideDhaka: 70,
//     outsideDhaka: 150
//   });

//   const [locationData, setLocationData] = useState({});
//   const [divisions, setDivisions] = useState({});
//   const [divisionList, setDivisionList] = useState([]);
//   const [citiesByDivision, setCitiesByDivision] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [locationLoading, setLocationLoading] = useState(true);
//   const [productColors, setProductColors] = useState({});
//   const [updatingColor, setUpdatingColor] = useState({});

//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     division: '',
//     address: '',
//     city: '',
//     zone: '',
//     area: '',
//     zipCode: '',
//     country: 'Bangladesh',
//     note: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [quantityInputs, setQuantityInputs] = useState({});
//   const [pendingQuantityUpdates, setPendingQuantityUpdates] = useState({});

//   useEffect(() => {
//     const checkCartAndRedirect = async () => {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
      
//       if (!token && !sessionId) {
//         const newSessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//         localStorage.setItem('cartSessionId', newSessionId);
//         console.log('🆕 Generated new session ID on checkout:', newSessionId);
//       }
      
//       fetchCart();
//     };
    
//     checkCartAndRedirect();
//   }, []);

//   useEffect(() => {
//     if (cart?.items) {
//       const initialQuantities = {};
//       cart.items.forEach(item => {
//         initialQuantities[item._id] = item.quantity;
//       });
//       setQuantityInputs(initialQuantities);
//     }
//   }, [cart]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('cartSessionId');
    
//     if (!token && !sessionId) {
//       const newSessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//       localStorage.setItem('cartSessionId', newSessionId);
//       console.log('🆕 Generated session ID:', newSessionId);
//     }
//   }, []);

//   const getShippingCost = useCallback(async (city, zone, area) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/delivery/calculate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ city, zone, area })
//       });
//       const data = await response.json();
//       if (data.success) {
//         return data.data.charge;
//       }
//       return 0;
//     } catch (error) {
//       console.error('Error calculating shipping:', error);
//       return 0;
//     }
//   }, []);

//   const fetchProductColors = async (items) => {
//     const colorMap = {};
//     for (const item of items) {
//       if (!colorMap[item.productId]) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/products/${item.productId}`);
//           const data = await response.json();
//           if (data.success && data.data.product.colors) {
//             colorMap[item.productId] = data.data.product.colors;
//           }
//         } catch (error) {
//           console.error('Error fetching product colors:', error);
//         }
//       }
//     }
//     return colorMap;
//   };

//   // ========== UPDATE COLOR ==========
//   const updateColor = async (itemId, newColor) => {
//     setUpdatingColor(prev => ({ ...prev, [itemId]: true }));
    
//     const previousCart = { ...cart };
    
//     setCart(prevCart => {
//       const updatedItems = prevCart.items.map(item => {
//         if (item._id === itemId) {
//           return { ...item, selectedColor: newColor };
//         }
//         return item;
//       });
//       return { ...prevCart, items: updatedItems };
//     });
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
//         method: 'PUT',
//         headers,
//         body: JSON.stringify({ selectedColor: newColor })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success('Color updated!');
//       } else {
//         setCart(previousCart);
//         toast.error(data.error || 'Failed to update color');
//       }
//     } catch (error) {
//       console.error('Update color error:', error);
//       setCart(previousCart);
//       toast.error('Failed to update color');
//     } finally {
//       setUpdatingColor(prev => ({ ...prev, [itemId]: false }));
//     }
//   };

//   // ========== ADD NEW COLOR ==========
//   const addNewColorToCart = async (productId, color) => {
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const nullColorItem = cart.items.find(
//         item => item.productId === productId && 
//         (!item.selectedColor || item.selectedColor === '' || item.selectedColor === null || item.selectedColor === 'null')
//       );
      
//       if (nullColorItem) {
//         await fetch(`http://localhost:5000/api/cart/${nullColorItem._id}`, {
//           method: 'DELETE',
//           headers
//         });
//       }
      
//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ 
//           productId: productId, 
//           quantity: 1,
//           selectedColor: color 
//         })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success(`Added ${color} to cart!`);
//       } else {
//         toast.error(data.error || 'Failed to add color');
//       }
//     } catch (error) {
//       console.error('Add color error:', error);
//       toast.error('Network error');
//     }
//   };

//   // ========== REMOVE ITEM ==========
//   const removeCartItem = async (itemId) => {
//     setIsUpdatingCart(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
//         method: 'DELETE',
//         headers
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success('Item removed');
//       } else {
//         toast.error(data.error || 'Failed to remove item');
//         fetchCart();
//       }
//     } catch (error) {
//       console.error('Remove item error:', error);
//       toast.error('Failed to remove item');
//       fetchCart();
//     } finally {
//       setIsUpdatingCart(false);
//     }
//   };

//   // ========== REMOVE ALL COLORS OF A PRODUCT ==========
//   const removeAllColors = async (productId) => {
//     const itemsToRemove = cart.items.filter(item => item.productId === productId);
    
//     if (itemsToRemove.length === 0) return;
    
//     setIsUpdatingCart(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       for (const item of itemsToRemove) {
//         await fetch(`http://localhost:5000/api/cart/${item._id}`, {
//           method: 'DELETE',
//           headers
//         });
//       }
      
//       await fetchCart();
//       window.dispatchEvent(new Event('cart-update'));
//       toast.success('All colors removed');
//     } catch (error) {
//       console.error('Remove all colors error:', error);
//       toast.error('Failed to remove all colors');
//     } finally {
//       setIsUpdatingCart(false);
//     }
//   };

//   // ========== UPDATE QUANTITY ==========
//   const updateCartQuantity = async (itemId, newQuantity) => {
//     if (isUpdatingCart) return;
    
//     if (newQuantity < 1) {
//       removeCartItem(itemId);
//       return;
//     }
    
//     setIsUpdatingCart(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
//         method: 'PUT',
//         headers,
//         body: JSON.stringify({ quantity: newQuantity })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//         setQuantityInputs(prev => ({
//           ...prev,
//           [itemId]: newQuantity
//         }));
//         toast.success('Quantity updated');
//       } else {
//         toast.error(data.error || 'Failed to update quantity');
//         fetchCart();
//       }
//     } catch (error) {
//       console.error('Update quantity error:', error);
//       toast.error('Failed to update quantity');
//       fetchCart();
//     } finally {
//       setIsUpdatingCart(false);
//     }
//   };

//   // ========== UPDATE QUANTITY WITH DEBOUNCE ==========
//   const updateQuantityWithDebounce = useCallback((itemId, newQuantity) => {
//     if (pendingQuantityUpdates[itemId]) {
//       clearTimeout(pendingQuantityUpdates[itemId]);
//     }

//     setQuantityInputs(prev => ({
//       ...prev,
//       [itemId]: newQuantity
//     }));

//     const timeoutId = setTimeout(() => {
//       updateCartQuantity(itemId, newQuantity);
//       setPendingQuantityUpdates(prev => {
//         const newState = { ...prev };
//         delete newState[itemId];
//         return newState;
//       });
//     }, 500);

//     setPendingQuantityUpdates(prev => ({
//       ...prev,
//       [itemId]: timeoutId
//     }));
//   }, [pendingQuantityUpdates]);

//   // ========== FETCH CART ==========
//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;
      
//       const response = await fetch('http://localhost:5000/api/cart', { headers });
//       const data = await response.json();
      
//       if (data.success && data.data.items?.length > 0) {
//         setCart(data.data);
//         const colors = await fetchProductColors(data.data.items || []);
//         setProductColors(colors);
//       } else {
//         setCart({ items: [], totalItems: 0, subtotal: 0 });
//       }
//     } catch (error) {
//       console.error('Fetch cart error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch locations
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await fetch('/api/locations');
//         const data = await response.json();
//         setLocationData(data.locationData || {});
        
//         const divisions = data.divisions || {};
//         const filteredDivisions = {};
//         const divisionKeys = [];
        
//         Object.keys(divisions).forEach(key => {
//           if (key !== 'Other') {
//             filteredDivisions[key] = divisions[key];
//             divisionKeys.push(key);
//           }
//         });
        
//         setDivisions(filteredDivisions);
//         setDivisionList(divisionKeys.sort());
        
//         const cityList = data.locationData ? Object.keys(data.locationData) : [];
//         setCities(cityList);
//         setLocationLoading(false);
//       } catch (error) {
//         console.error('Failed to load location data:', error);
//         setLocationLoading(false);
//       }
//     };
//     fetchLocations();
//   }, []);

//   // Update cities when division changes
//   useEffect(() => {
//     if (formData.division && divisions[formData.division]) {
//       setCitiesByDivision(divisions[formData.division]);
//       setFormData(prev => ({ ...prev, city: '', zone: '', area: '' }));
//       setZones([]);
//       setAreas([]);
//     } else {
//       setCitiesByDivision([]);
//     }
//   }, [formData.division, divisions]);

//   // Update zones when city changes with shipping calculation
//   useEffect(() => {
//     const selectedCity = formData.city;
//     const selectedZone = formData.zone;
//     const selectedArea = formData.area;
    
//     if (selectedCity && locationData[selectedCity]) {
//       const availableZones = Object.keys(locationData[selectedCity].zones || {});
//       setZones(availableZones);
//       setFormData(prev => ({ ...prev, zone: '', area: '' }));
//       setAreas([]);
      
//       const calculateShipping = async () => {
//         const charge = await getShippingCost(selectedCity, selectedZone, selectedArea);
//         setShippingCost(charge);
//       };
//       calculateShipping();
//     } else {
//       setZones([]);
//       setAreas([]);
//       setShippingCost(0);
//     }
//   }, [formData.city, locationData, getShippingCost]);

//   // Update areas when zone changes with shipping recalculation
//   useEffect(() => {
//     const selectedCity = formData.city;
//     const selectedZone = formData.zone;
//     const selectedArea = formData.area;
    
//     if (selectedCity && selectedZone && locationData[selectedCity]) {
//       const availableAreas = locationData[selectedCity].zones[selectedZone] || [];
//       setAreas(availableAreas);
//       setFormData(prev => ({ ...prev, area: '' }));
      
//       const calculateShipping = async () => {
//         const charge = await getShippingCost(selectedCity, selectedZone, selectedArea);
//         setShippingCost(charge);
//       };
//       calculateShipping();
//     } else {
//       setAreas([]);
//     }
//   }, [formData.zone, formData.city, locationData, getShippingCost]);

//   // Recalculate shipping when area changes
//   useEffect(() => {
//     const selectedCity = formData.city;
//     const selectedZone = formData.zone;
//     const selectedArea = formData.area;
    
//     if (selectedCity && selectedZone && selectedArea && locationData[selectedCity]) {
//       const calculateShipping = async () => {
//         const charge = await getShippingCost(selectedCity, selectedZone, selectedArea);
//         setShippingCost(charge);
//       };
//       calculateShipping();
//     }
//   }, [formData.area, formData.city, formData.zone, locationData, getShippingCost]);

//   // Fetch cart, user, shipping rates on mount
//   useEffect(() => {
//     fetchCart();
//     fetchUser();
//     fetchShippingRates();
//   }, []);

//   // Autofill user data when user is loaded
//   useEffect(() => {
//     if (user) {
//       setFormData(prev => ({
//         ...prev,
//         fullName: user.contactPerson || user.companyName || user.name || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         division: user.division || '',
//         address: user.address || '',
//         city: user.city || '',
//         zone: user.zone || '',
//         area: user.area || '',
//         zipCode: user.zipCode || '',
//         country: user.country || 'Bangladesh'
//       }));
      
//       if (user.division) {
//         setFormData(prev => ({ ...prev, division: user.division }));
//       }
      
//       if (user.city) {
//         setFormData(prev => ({ ...prev, city: user.city }));
//       }
      
//       if (user.zone) setFormData(prev => ({ ...prev, zone: user.zone }));
//       if (user.area) setFormData(prev => ({ ...prev, area: user.area }));
//     }
//   }, [user]);

//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const response = await fetch('http://localhost:5000/api/auth/me', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const data = await response.json();
//         if (data.success) setUser(data.user);
//       }
//     } catch (error) {
//       console.error('Fetch user error:', error);
//     }
//   };

//   const fetchShippingRates = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/delivery/settings');
//       const data = await response.json();
//       if (data.success) {
//         setShippingRates({
//           insideDhaka: data.data.insideDhaka,
//           outsideDhaka: data.data.outsideDhaka
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching shipping rates:', error);
//     }
//   };

//   // Handle cart update events
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       if (!isPlacingOrder.current) {
//         fetchCart();
//       }
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, []);

//   // Cleanup timeouts on unmount
//   useEffect(() => {
//     return () => {
//       Object.values(pendingQuantityUpdates).forEach(timeoutId => {
//         clearTimeout(timeoutId);
//       });
//     };
//   }, [pendingQuantityUpdates]);

//   const validateBangladeshPhone = (phone) => {
//     const cleaned = phone.replace(/\D/g, '');
//     const bdPhoneRegex = /^(?:01|8801)\d{9}$/;
    
//     if (!bdPhoneRegex.test(cleaned)) {
//       return { valid: false, message: 'Please enter a valid Bangladeshi phone number (01XXXXXXXXX)' };
//     }
    
//     const prefix = cleaned.slice(0, 3);
//     const validPrefixes = ['013', '014', '015', '016', '017', '018', '019'];
    
//     if (!validPrefixes.includes(prefix)) {
//       return { valid: false, message: 'Please enter a valid Bangladeshi mobile number' };
//     }
    
//     return { valid: true, formatted: cleaned };
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    
//     if (name === 'division') {
//       setFormData(prev => ({ ...prev, city: '', zone: '', area: '' }));
//       setZones([]);
//       setAreas([]);
//     }
    
//     if (name === 'city') {
//       setFormData(prev => ({ ...prev, zone: '', area: '' }));
//       setAreas([]);
//     }
    
//     if (name === 'zone') {
//       setFormData(prev => ({ ...prev, area: '' }));
//     }
    
//     if (name === 'phone' && value) {
//       const validation = validateBangladeshPhone(value);
//       if (!validation.valid) {
//         setErrors(prev => ({ ...prev, phone: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, phone: '' }));
//       }
//     }
//   };

//   // ========== COLOR VALIDATION FOR CHECKOUT ==========
//   const validateCartColors = () => {
//     if (!cart?.items?.length) {
//       toast.error('Your cart is empty');
//       return false;
//     }
    
//     const itemsWithoutColor = cart.items.filter(item => {
//       const availableColors = productColors[item.productId] || [];
//       const hasAvailableColors = availableColors.length > 0;
//       if (hasAvailableColors && (!item.selectedColor || item.selectedColor === '' || item.selectedColor === 'null')) {
//         return true;
//       }
//       return false;
//     });
    
//     if (itemsWithoutColor.length > 0) {
//       toast.error(
//         <div className="space-y-1">
//           <p className="font-semibold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Please select colors for:</p>
//           <ul className="text-xs space-y-0.5 list-disc list-inside text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//             {itemsWithoutColor.slice(0, 3).map((item, i) => (
//               <li key={i}>{item.productName}</li>
//             ))}
//             {itemsWithoutColor.length > 3 && (
//               <li>And {itemsWithoutColor.length - 3} more item(s)...</li>
//             )}
//           </ul>
//         </div>,
//         { duration: 5000 }
//       );
//       return false;
//     }
    
//     return true;
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     if (!formData.fullName?.trim()) {
//       errors.fullName = 'Full name is required';
//     }
    
//     if (formData.email?.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = 'Email is invalid';
//     }
    
//     if (!formData.phone?.trim()) {
//       errors.phone = 'Phone number is required';
//     } else {
//       const validation = validateBangladeshPhone(formData.phone);
//       if (!validation.valid) {
//         errors.phone = validation.message;
//       }
//     }
    
//     if (!formData.division?.trim()) {
//       errors.division = 'Please select a division';
//     }
    
//     if (!formData.address?.trim()) {
//       errors.address = 'Address is required';
//     }
    
//     if (!formData.city?.trim()) {
//       errors.city = 'Please select a district/city';
//     }
    
//     if (!formData.zone?.trim()) {
//       errors.zone = 'Please select an upazila/thana';
//     }
    
//     setErrors(errors);
//     return errors;
//   };

//   const calculateSubtotal = () => cart?.subtotal || 0;
//   const calculateTotal = () => calculateSubtotal() + shippingCost;
//   const isLoggedIn = !!user;
//   const isAdminOrModerator = user && (user.role === 'admin' || user.role === 'moderator');

//   const handleCODOrder = async () => {
//     if (isAdminOrModerator) {
//       toast.error('Admins and Moderators cannot place orders');
//       return;
//     }
    
//     if (navigating) return;
//     setNavigating(true);
//     setSubmitting(true);
//     isPlacingOrder.current = true;
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
      
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       console.log('📤 Sending order with sessionId:', sessionId || 'none');
      
//       const clientDeviceInfo = getClientDeviceInfo();
      
//       // Group items
//       const groupedItems = {};
      
//       cart.items.forEach(item => {
//         const productId = item.productId || item._id;
//         if (!groupedItems[productId]) {
//           groupedItems[productId] = {
//             productId: productId,
//             productName: item.productName,
//             productSlug: item.productSlug || '',
//             image: item.image || '',
//             regularPrice: item.regularPrice,
//             discountPrice: item.discountPrice || 0,
//             buyingPrice: item.buyingPrice || 0, 
//             costPerItem: item.costPerItem || 0,
//             unit: item.unit || 'pcs',
//             stockQuantity: item.stockQuantity || 0,
//             colors: [],
//             quantity: 0,
//             selectedColor: null
//           };
//         }
        
//         const hasValidColor = item.selectedColor && 
//                              item.selectedColor !== '' && 
//                              item.selectedColor !== null && 
//                              item.selectedColor !== 'null';
        
//         if (hasValidColor) {
//           const existingColor = groupedItems[productId].colors.find(c => c.color === item.selectedColor);
//           if (existingColor) {
//             existingColor.quantity += item.quantity;
//           } else {
//             groupedItems[productId].colors.push({
//               color: item.selectedColor,
//               quantity: item.quantity,
//               price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice
//             });
//           }
//           groupedItems[productId].quantity += item.quantity;
//         } else {
//           groupedItems[productId].quantity = item.quantity;
//         }
//       });
      
//       const groupedItemsArray = Object.values(groupedItems).map(item => {
//         const hasColors = item.colors && item.colors.length > 0;
//         return {
//           productId: item.productId,
//           productName: item.productName,
//           productSlug: item.productSlug,
//           image: item.image,
//           regularPrice: item.regularPrice,
//           discountPrice: item.discountPrice || 0,
//           buyingPrice: item.buyingPrice || 0,
//           costPerItem: item.costPerItem || 0,
//           unit: item.unit || 'pcs',
//           stockQuantity: item.stockQuantity || 0,
//           colors: hasColors ? item.colors : [],
//           quantity: hasColors ? 0 : (item.quantity || 0),
//           selectedColor: null
//         };
//       });
      
//       const validItems = groupedItemsArray.filter(item => {
//         const hasColors = item.colors && item.colors.length > 0;
//         const hasQuantity = item.quantity > 0;
//         return hasColors || hasQuantity;
//       });
      
//       if (validItems.length === 0) {
//         toast.error('No valid items in cart');
//         setNavigating(false);
//         return;
//       }
      
//       const orderData = {
//         items: validItems,
//         subtotal: calculateSubtotal(),
//         shippingCost,
//         discount: 0,
//         total: calculateTotal(),
//         paymentMethod: 'cod',
//         customerInfo: {
//           fullName: formData.fullName,
//           email: formData.email,
//           phone: formData.phone,
//           division: formData.division,
//           address: formData.address,
//           city: formData.city,
//           zone: formData.zone,
//           area: formData.area || '',
//           zipCode: formData.zipCode || '',
//           country: formData.country || 'Bangladesh',
//           note: formData.note || ''
//         },
//         couponCode: null,
//         couponDiscount: 0,
//         freeShipping: false,
//         clientDeviceInfo: clientDeviceInfo,
//         sessionId: sessionId
//       };
      
//       console.log('📦 Order Data:', JSON.stringify(orderData, null, 2));
      
//       const response = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(orderData)
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         const orderId = data.orderId || data.data?._id || data.data?.id;
        
//         try {
//           const deleteHeaders = { 'Content-Type': 'application/json' };
//           if (token) {
//             deleteHeaders['Authorization'] = `Bearer ${token}`;
//           } else if (sessionId) {
//             deleteHeaders['x-session-id'] = sessionId;
//           }
          
//           await fetch('http://localhost:5000/api/incomplete-orders/delete-on-place', {
//             method: 'POST',
//             headers: deleteHeaders,
//             body: JSON.stringify({ 
//               sessionId: sessionId,
//               orderId: orderId 
//             })
//           });
//           console.log('🗑️ Incomplete order deleted after successful placement');
//         } catch (deleteError) {
//           console.error('Error deleting incomplete order:', deleteError);
//         }
        
//         localStorage.removeItem('cartSessionId');
        
//         await fetch('http://localhost:5000/api/cart', { 
//           method: 'DELETE', 
//           headers 
//         });
        
//         window.dispatchEvent(new Event('cart-update'));
//         setCart({ items: [], totalItems: 0, subtotal: 0 });
        
//         if (isLoggedIn) {
//           toast.success('Order placed successfully!');
//           window.location.href = '/customer/orders';
//         } else {
//           const sessionIdFromResponse = data.sessionId || sessionId;
//           window.location.href = `/thank-you?orderId=${orderId}&sessionId=${sessionIdFromResponse}`;
//         }
//       } else {
//         toast.error(data.error || 'Failed to place order');
//         setNavigating(false);
//       }
//     } catch (error) {
//       console.error('COD order error:', error);
//       toast.error('Network error. Please try again.');
//       setNavigating(false);
//     } finally {
//       setSubmitting(false);
//       isPlacingOrder.current = false;
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (isAdminOrModerator) {
//       toast.error('Admins and Moderators cannot place orders');
//       return;
//     }
    
//     if (!validateCartColors()) {
//       return;
//     }
    
//     const validationErrors = validateForm();
    
//     if (Object.keys(validationErrors).length > 0) {
//       const errorMessages = Object.values(validationErrors);
      
//       toast.error(
//         <div className="space-y-1">
//           <p className="font-semibold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Please fix the following errors:</p>
//           <ul className="text-xs space-y-0.5 list-disc list-inside text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//             {errorMessages.slice(0, 3).map((msg, i) => (
//               <li key={i}>{msg}</li>
//             ))}
//             {errorMessages.length > 3 && (
//               <li>And {errorMessages.length - 3} more error(s)...</li>
//             )}
//           </ul>
//         </div>,
//         { duration: 5000 }
//       );
      
//       const firstErrorField = document.querySelector('.border-red-500');
//       if (firstErrorField) {
//         firstErrorField.scrollIntoView({ 
//           behavior: 'smooth', 
//           block: 'center' 
//         });
//         const input = firstErrorField.querySelector('input, textarea, select');
//         if (input) {
//           setTimeout(() => input.focus(), 500);
//         }
//       }
      
//       return;
//     }
    
//     if (!cart?.items?.length) {
//       toast.error('Your cart is empty');
//       return;
//     }
    
//     await handleCODOrder();
//   };

//   // ========== SAVE INCOMPLETE ORDER ==========
//   const saveIncompleteOrder = useCallback(async () => {
//     try {
//       if (!cart?.items?.length) return;

//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }

//       const groupedItems = cart.items.map(item => ({
//         productId: item.productId,
//         productName: item.productName,
//         productSlug: item.productSlug || '',
//         image: item.image || '',
//         regularPrice: item.regularPrice,
//         discountPrice: item.discountPrice || 0,
//         quantity: item.quantity,
//         unit: item.unit || 'pcs',
//         selectedColor: item.selectedColor || null,
//         colors: []
//       }));

//       const clientDeviceInfo = getClientDeviceInfo();

//       const response = await fetch('http://localhost:5000/api/incomplete-orders/save', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           customerInfo: formData,
//           items: groupedItems,
//           subtotal: calculateSubtotal(),
//           shippingCost: shippingCost,
//           discount: 0,
//           total: calculateTotal(),
//           paymentMethod: 'cod',
//           checkoutStep: 'information',
//           clientDeviceInfo,
//           sessionId: sessionId
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         console.log('✅ Incomplete order saved');
//       }
//     } catch (error) {
//       console.error('Save incomplete order error:', error);
//     }
//   }, [cart, formData, shippingCost]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (cart?.items?.length > 0) {
//         saveIncompleteOrder();
//       }
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [formData, cart, saveIncompleteOrder]);

//   if (loading || locationLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#FFF5F6] pt-20">
//           <div className="container mx-auto px-4 max-w-6xl">
//             <div className="flex items-center justify-center py-20">
//               <Loader2 className="w-8 h-8 text-[#EE4275] animate-spin" />
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (!cart?.items?.length) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#FFF5F6] py-16">
//           <div className="container mx-auto px-4 max-w-3xl text-center">
//             <div className="bg-white rounded-2xl shadow-sm border border-[#F7C7D3]/40 p-12">
//               <div className="w-20 h-20 mx-auto mb-4 bg-[#FFF5F6] rounded-full flex items-center justify-center border border-[#F7C7D3]/40">
//                 <FaShoppingBag className="w-10 h-10 text-[#EE4275]/40" />
//               </div>
//               <h2 className="text-2xl font-bold text-[#2D1B2E] mb-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 Your cart is empty
//               </h2>
//               <p className="text-[#EE4275]/60 mb-6" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 Add some products to your cart and come back to checkout.
//               </p>
//               <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-colors" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 <FaArrowLeft className="w-4 h-4" />
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const subtotal = calculateSubtotal();
//   const total = calculateTotal();

//   const hasColorRequiredItems = cart.items.some(item => {
//     const availableColors = productColors[item.productId] || [];
//     return availableColors.length > 0 && (!item.selectedColor || item.selectedColor === '' || item.selectedColor === 'null');
//   });

//   const groupedItems = cart.items.reduce((acc, item) => {
//     const productId = item.productId.toString();
//     if (!acc[productId]) {
//       acc[productId] = {
//         ...item,
//         colors: [],
//         totalQuantity: 0
//       };
//     }
//     const hasValidColor = item.selectedColor && 
//                          item.selectedColor !== '' && 
//                          item.selectedColor !== null && 
//                          item.selectedColor !== 'null';
    
//     acc[productId].colors.push({
//       color: hasValidColor ? item.selectedColor : null,
//       quantity: item.quantity,
//       itemId: item._id,
//       price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice
//     });
    
//     acc[productId].totalQuantity += item.quantity;
    
//     return acc;
//   }, {});

//   const groupedItemsArray = Object.values(groupedItems);

//   return (
//     <>
//       <Navbar />
      
//       <div className="min-h-screen bg-[#FFF5F6] py-8">
//         <div className="container mx-auto px-4 max-w-6xl">
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-xl flex items-center justify-center shadow-lg shadow-[#EE4275]/25">
//                 <Zap className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY }}>
//                   Checkout
//                 </h1>
//                 <p className="text-sm text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY }}>
//                   Complete your order securely
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Color Selection Warning */}
//           {hasColorRequiredItems && (
//             <div className="mb-6 bg-orange-50 border-l-4 border-orange-400 p-4 rounded-xl">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm text-orange-700 font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     Color Selection Required
//                   </p>
//                   <p className="text-xs text-orange-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     Please select colors for all items before proceeding to checkout.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {isAdminOrModerator && (
//             <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl">
//               <div className="flex items-center gap-3">
//                 <FaShieldAlt className="w-5 h-5 text-yellow-600" />
//                 <div>
//                   <p className="text-sm text-yellow-700 font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     Checkout Disabled for Admin/Moderator Accounts
//                   </p>
//                   <p className="text-xs text-yellow-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     You are logged in as {user?.role}. Please switch to a customer account to place orders.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column - Forms */}
//             <div className="lg:col-span-2 space-y-5">
//               {/* Personal Information */}
//               <div className="bg-white rounded-2xl shadow-sm border border-[#F7C7D3]/40 p-6">
//                 <div className="flex items-center justify-between mb-5">
//                   <h2 className="text-lg font-bold text-[#2D1B2E] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <FaUser className="w-5 h-5 text-[#EE4275]" />
//                     Personal Information
//                   </h2>
//                   {isLoggedIn && (
//                     <span className="text-xs bg-[#EE4275]/10 text-[#EE4275] px-3 py-1 rounded-full flex items-center gap-1 font-medium border border-[#EE4275]/20" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       <FaCheckCircle className="w-3 h-3" />
//                       Verified
//                     </span>
//                   )}
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       Full Name <span className="text-[#EE4275]">*</span>
//                     </label>
//                     <div className="relative">
//                       <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#EE4275]/40 w-4 h-4" />
//                       <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleInputChange}
//                         className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition text-sm ${
//                           isLoggedIn ? 'bg-[#FFF5F6] text-[#EE4275]/60' : 'bg-white'
//                         } ${errors.fullName ? 'border-red-500' : 'border-[#F7C7D3]/50'}`}
//                         placeholder="Enter your full name"
//                         disabled={isLoggedIn}
//                         style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                       />
//                     </div>
//                     {errors.fullName && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.fullName}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       Email <span className="text-[#EE4275]/60 text-xs">(Optional)</span>
//                     </label>
//                     <div className="relative">
//                       <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#EE4275]/40 w-4 h-4" />
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition text-sm ${
//                           isLoggedIn ? 'bg-[#FFF5F6] text-[#EE4275]/60' : 'bg-white'
//                         } ${errors.email ? 'border-red-500' : 'border-[#F7C7D3]/50'}`}
//                         placeholder="your@email.com (optional)"
//                         disabled={isLoggedIn}
//                         style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                       />
//                     </div>
//                     {errors.email && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.email}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       Phone Number <span className="text-[#EE4275]">*</span>
//                     </label>
//                     <div className="relative">
//                       <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#EE4275]/40 w-4 h-4" />
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition text-sm ${
//                           errors.phone ? 'border-red-500' : 'border-[#F7C7D3]/50'
//                         }`}
//                         placeholder="01XXXXXXXXX"
//                         style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                       />
//                     </div>
//                     {errors.phone && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.phone}</p>}
//                     <p className="text-[10px] text-[#EE4275]/60 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Enter a valid Bangladeshi mobile number</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Delivery Address */}
//               <div className="bg-white rounded-2xl shadow-sm border border-[#F7C7D3]/40 p-6">
//                 <h2 className="text-lg font-bold text-[#2D1B2E] flex items-center gap-2 mb-5" style={{ fontFamily: FONT_FAMILY }}>
//                   <FaMapMarkerAlt className="w-5 h-5 text-[#EE4275]" />
//                   Delivery Address
//                 </h2>
                
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       Full Address <span className="text-[#EE4275]">*</span>
//                     </label>
//                     <div className="relative">
//                       <FaHome className="absolute left-3 top-3 text-[#EE4275]/40 w-4 h-4" />
//                       <textarea
//                         name="address"
//                         value={formData.address}
//                         onChange={handleInputChange}
//                         rows="2"
//                         className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition bg-white text-sm resize-none ${
//                           errors.address ? 'border-red-500' : 'border-[#F7C7D3]/50'
//                         }`}
//                         placeholder="House #, Road #, Area, City, Zip Code"
//                         style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                       />
//                     </div>
//                     {isLoggedIn && user?.address && (
//                       <p className="text-xs text-[#EE4275] mt-1 flex items-center gap-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                         <FaCheckCircle className="w-3 h-3" />
//                         Your saved address has been pre-filled
//                       </p>
//                     )}
//                     {errors.address && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.address}</p>}
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                         Division <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <SearchableSelect
//                         name="division"
//                         value={formData.division}
//                         onChange={handleInputChange}
//                         options={divisionList}
//                         placeholder="Select Division"
//                         required
//                         disabled={false}
//                         error={errors.division}
//                       />
//                       {errors.division && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.division}</p>}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                         District/City <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <SearchableSelect
//                         name="city"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         options={citiesByDivision}
//                         placeholder={formData.division ? "Select District" : "Select Division First"}
//                         required
//                         disabled={!formData.division}
//                         error={errors.city}
//                       />
//                       {errors.city && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.city}</p>}
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                         Upazila/Thana <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <SearchableSelect
//                         name="zone"
//                         value={formData.zone}
//                         onChange={handleInputChange}
//                         options={zones}
//                         placeholder={formData.city ? "Select Upazila/Thana" : "Select District First"}
//                         required
//                         disabled={!formData.city}
//                         error={errors.zone}
//                       />
//                       {errors.zone && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.zone}</p>}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                         Union/Area
//                       </label>
//                       <SearchableSelect
//                         name="area"
//                         value={formData.area}
//                         onChange={handleInputChange}
//                         options={areas}
//                         placeholder={formData.zone ? "Select Union/Area" : "Select Upazila First"}
//                         disabled={!formData.zone}
//                         error={errors.area}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Notes */}
//               <div className="bg-white rounded-2xl shadow-sm border border-[#F7C7D3]/40 p-6">
//                 <h2 className="text-lg font-bold text-[#2D1B2E] flex items-center gap-2 mb-4" style={{ fontFamily: FONT_FAMILY}}>
//                   <FaFileAlt className="w-5 h-5 text-[#EE4275]" />
//                   Order Notes <span className="text-sm font-normal text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY }}>(Optional)</span>
//                 </h2>
//                 <textarea
//                   name="note"
//                   value={formData.note}
//                   onChange={handleInputChange}
//                   rows="2"
//                   className="w-full px-4 py-3 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition text-sm resize-none bg-white hover:border-[#EE4275]/30"
//                   placeholder="Special instructions for delivery, gift message, etc."
//                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 />
//               </div>
//             </div>

//             {/* Right Column - Order Summary */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-2xl shadow-sm border border-[#F7C7D3]/40 p-6 sticky top-24">
//                 <h2 className="text-lg font-bold text-[#2D1B2E] flex items-center gap-2 mb-4" style={{ fontFamily: FONT_FAMILY }}>
//                   <FaShoppingBag className="w-5 h-5 text-[#EE4275]" />
//                   Order Summary
//                 </h2>
                
//                 {/* Grouped Items List */}
//                 <div className="space-y-4 max-h-60 overflow-y-auto mb-4 pr-1">
//                   {groupedItemsArray.map((group) => {
//                     const hasColors = productColors[group.productId]?.length > 0;
//                     const availableColors = productColors[group.productId] || [];
//                     const price = group.discountPrice > 0 ? group.discountPrice : group.regularPrice;
//                     const selectedColors = group.colors.filter(c => c.color !== null);
//                     const hasUnselected = group.colors.some(c => c.color === null);
                    
//                     return (
//                       <div key={group._id} className="border border-[#F7C7D3]/40 rounded-lg overflow-hidden">
//                         <div className="flex items-start gap-2 p-2 bg-[#FFF5F6] border-b border-[#F7C7D3]/30">
//                           <img 
//                             src={group.image || 'https://via.placeholder.com/40'} 
//                             alt={group.productName} 
//                             className="w-10 h-10 rounded-lg object-cover border border-[#F7C7D3]/40 flex-shrink-0"
//                             onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
//                           />
//                           <div className="flex-1 min-w-0">
//                             <p className="text-xs font-medium text-[#2D1B2E] truncate" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                               {group.productName}
//                             </p>
//                             <div className="flex items-center gap-2 mt-0.5">
//                               <span className="text-sm font-bold text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                                 ৳{price.toFixed(2)}
//                               </span>
//                               {group.discountPrice > 0 && (
//                                 <span className="text-[10px] text-[#EE4275]/40 line-through" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                                   ৳{group.regularPrice.toFixed(2)}
//                                 </span>
//                               )}
//                               <span className="text-[10px] text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                                 /{getUnitLabel(group.unit)}
//                               </span>
//                             </div>
//                             <div className="text-xs text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                               Total: <span className="font-medium text-[#2D1B2E]">{group.totalQuantity}</span> items
//                               {selectedColors.length > 0 && (
//                                 <span className="ml-1 text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                                   ({selectedColors.length} color{selectedColors.length > 1 ? 's' : ''} selected)
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                           {hasColors && selectedColors.length > 0 && (
//                             <button
//                               onClick={() => removeAllColors(group.productId)}
//                               disabled={isUpdatingCart}
//                               className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
//                               title="Remove all colors"
//                             >
//                               <FaTrash className="w-3.5 h-3.5" />
//                             </button>
//                           )}
//                           {!hasColors && (
//                             <button
//                               onClick={() => {
//                                 const item = cart.items.find(item => item.productId === group.productId);
//                                 if (item) removeCartItem(item._id);
//                               }}
//                               disabled={isUpdatingCart}
//                               className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
//                               title="Remove product"
//                             >
//                               <FaTrash className="w-3.5 h-3.5" />
//                             </button>
//                           )}
//                         </div>

//                         {hasColors ? (
//                           <>
//                             <div className="p-2 border-b border-[#F7C7D3]/30 bg-[#FFF5F6]">
//                               <p className="text-[10px] text-[#EE4275]/60 mb-1.5 flex items-center gap-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                                 <Palette className="w-3 h-3 text-[#EE4275]" />
//                                 Available Colors:
//                               </p>
//                               <div className="flex flex-wrap gap-1.5">
//                                 {availableColors.map((color) => {
//                                   const isSelected = selectedColors.some(c => c.color === color);
//                                   return (
//                                     <button
//                                       key={color}
//                                       onClick={() => {
//                                         if (!isSelected) {
//                                           const itemWithoutColor = group.colors.find(c => c.color === null);
//                                           if (itemWithoutColor) {
//                                             updateColor(itemWithoutColor.itemId, color);
//                                           } else {
//                                             addNewColorToCart(group.productId, color);
//                                           }
//                                         }
//                                       }}
//                                       disabled={isSelected || isUpdatingCart}
//                                       className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
//                                         isSelected 
//                                           ? 'border-[#EE4275] shadow-md ring-2 ring-[#EE4275]/30 scale-110 cursor-default' 
//                                           : 'border-[#F7C7D3]/50 hover:border-[#EE4275]/60 cursor-pointer'
//                                       } ${isUpdatingCart ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                       style={{ backgroundColor: color }}
//                                       title={isSelected ? `${color} (Selected)` : `Click to select ${color}`}
//                                     >
//                                       {isSelected && (
//                                         <div className="absolute inset-0 flex items-center justify-center">
//                                           <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white drop-shadow-md" />
//                                         </div>
//                                       )}
//                                     </button>
//                                   );
//                                 })}
//                               </div>
//                               <div className="mt-1 text-[9px] text-gray-400" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                                 {selectedColors.length > 0 ? (
//                                   <span className="text-green-600">
//                                     ✓ {selectedColors.length} color{selectedColors.length > 1 ? 's' : ''} selected
//                                     {hasUnselected && (
//                                       <span className="text-gray-400 ml-1">
//                                         (Click a color above to select)
//                                       </span>
//                                     )}
//                                   </span>
//                                 ) : (
//                                   <span className="text-orange-500">Click a color to select</span>
//                                 )}
//                               </div>
//                             </div>

//                             <div className="p-2 space-y-2">
//                               {selectedColors.length > 0 ? (
//                                 selectedColors.map((colorInfo) => (
//                                   <div key={colorInfo.itemId} className="flex items-center gap-2 p-2 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/30">
//                                     <div 
//                                       className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#F7C7D3]/40 flex-shrink-0"
//                                       style={{ backgroundColor: colorInfo.color }}
//                                       title={colorInfo.color}
//                                     />
                                    
//                                     <div className="flex items-center border border-[#F7C7D3]/40 rounded-lg overflow-hidden bg-white ml-auto">
//                                       <button
//                                         onClick={() => {
//                                           const newQty = colorInfo.quantity - 1;
//                                           if (newQty >= 1) {
//                                             updateCartQuantity(colorInfo.itemId, newQty);
//                                           }
//                                         }}
//                                         disabled={isUpdatingCart || colorInfo.quantity <= 1}
//                                         className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-[#FFF5F6] disabled:opacity-50 transition-colors"
//                                       >
//                                         <FaMinus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                                       </button>
                                      
//                                       <input
//                                         type="text"
//                                         inputMode="numeric"
//                                         pattern="[0-9]*"
//                                         value={quantityInputs[colorInfo.itemId] !== undefined ? quantityInputs[colorInfo.itemId] : colorInfo.quantity}
//                                         onChange={(e) => {
//                                           const value = e.target.value;
//                                           if (value === '' || /^\d+$/.test(value)) {
//                                             const numValue = parseInt(value);
//                                             setQuantityInputs(prev => ({
//                                               ...prev,
//                                               [colorInfo.itemId]: value
//                                             }));
                                            
//                                             if (value !== '' && !isNaN(numValue) && numValue >= 1) {
//                                               const finalValue = Math.min(numValue, group.stockQuantity || 999);
//                                               updateQuantityWithDebounce(colorInfo.itemId, finalValue);
//                                             }
//                                           }
//                                         }}
//                                         onBlur={(e) => {
//                                           const value = e.target.value;
//                                           const numValue = parseInt(value);
                                          
//                                           if (value === '' || isNaN(numValue) || numValue < 1) {
//                                             setQuantityInputs(prev => ({
//                                               ...prev,
//                                               [colorInfo.itemId]: colorInfo.quantity
//                                             }));
//                                             return;
//                                           }
                                          
//                                           const finalValue = Math.min(Math.max(1, numValue), group.stockQuantity || 999);
//                                           if (finalValue !== colorInfo.quantity) {
//                                             updateCartQuantity(colorInfo.itemId, finalValue);
//                                           }
//                                         }}
//                                         className="w-10 text-center text-sm font-medium text-[#2D1B2E] bg-white focus:outline-none focus:ring-1 focus:ring-[#EE4275] py-1"
//                                         style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                                         disabled={isUpdatingCart}
//                                       />
                                      
//                                       <button
//                                         onClick={() => {
//                                           const newQty = colorInfo.quantity + 1;
//                                           if (newQty <= group.stockQuantity) {
//                                             updateCartQuantity(colorInfo.itemId, newQty);
//                                           }
//                                         }}
//                                         disabled={isUpdatingCart || colorInfo.quantity >= group.stockQuantity}
//                                         className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-[#FFF5F6] disabled:opacity-50 transition-colors"
//                                       >
//                                         <FaPlus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                                       </button>
//                                     </div>
                                    
//                                     <button
//                                       onClick={() => removeCartItem(colorInfo.itemId)}
//                                       disabled={isUpdatingCart}
//                                       className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//                                       title="Remove this color"
//                                     >
//                                       <FaTrash className="w-3.5 h-3.5" />
//                                     </button>
//                                   </div>
//                                 ))
//                               ) : (
//                                 <div className="text-center py-2 text-xs text-gray-400" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                                   No colors selected. Click a color above to select.
//                                 </div>
//                               )}
//                             </div>
//                           </>
//                         ) : (
//                           <div className="p-2">
//                             <div className="flex items-center justify-between gap-2 p-2 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/30">
//                               <div className="flex items-center gap-2">
//                                 <span className="text-xs text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                                   Quantity
//                                 </span>
//                               </div>
//                               <div className="flex items-center border border-[#F7C7D3]/40 rounded-lg overflow-hidden bg-white">
//                                 <button
//                                   onClick={() => {
//                                     const currentItem = cart.items.find(item => item.productId === group.productId);
//                                     if (currentItem && currentItem.quantity > 1) {
//                                       updateCartQuantity(currentItem._id, currentItem.quantity - 1);
//                                     }
//                                   }}
//                                   disabled={isUpdatingCart || group.totalQuantity <= 1}
//                                   className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-[#FFF5F6] disabled:opacity-50 transition-colors"
//                                 >
//                                   <FaMinus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                                 </button>
                                
//                                 <input
//                                   type="text"
//                                   inputMode="numeric"
//                                   pattern="[0-9]*"
//                                   value={quantityInputs[group._id] !== undefined ? quantityInputs[group._id] : (group.totalQuantity || 1)}
//                                   onChange={(e) => {
//                                     const value = e.target.value;
//                                     if (value === '' || /^\d+$/.test(value)) {
//                                       const numValue = parseInt(value);
//                                       setQuantityInputs(prev => ({
//                                         ...prev,
//                                         [group._id]: value
//                                       }));
                                      
//                                       if (value !== '' && !isNaN(numValue) && numValue >= 1) {
//                                         const finalValue = Math.min(numValue, group.stockQuantity || 999);
//                                         const currentItem = cart.items.find(item => item.productId === group.productId);
//                                         if (currentItem) {
//                                           updateQuantityWithDebounce(currentItem._id, finalValue);
//                                         }
//                                       }
//                                     }
//                                   }}
//                                   onBlur={(e) => {
//                                     const value = e.target.value;
//                                     const numValue = parseInt(value);
//                                     const currentItem = cart.items.find(item => item.productId === group.productId);
                                    
//                                     if (value === '' || isNaN(numValue) || numValue < 1) {
//                                       setQuantityInputs(prev => ({
//                                         ...prev,
//                                         [group._id]: group.totalQuantity || 1
//                                       }));
//                                       return;
//                                     }
                                    
//                                     const finalValue = Math.min(Math.max(1, numValue), group.stockQuantity || 999);
//                                     if (currentItem && finalValue !== currentItem.quantity) {
//                                       updateCartQuantity(currentItem._id, finalValue);
//                                     }
//                                   }}
//                                   className="w-12 text-center text-sm font-medium text-[#2D1B2E] bg-white focus:outline-none focus:ring-1 focus:ring-[#EE4275] py-1"
//                                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                                   disabled={isUpdatingCart}
//                                 />
                                
//                                 <button
//                                   onClick={() => {
//                                     const currentItem = cart.items.find(item => item.productId === group.productId);
//                                     if (currentItem && currentItem.quantity < group.stockQuantity) {
//                                       updateCartQuantity(currentItem._id, currentItem.quantity + 1);
//                                     }
//                                   }}
//                                   disabled={isUpdatingCart || group.totalQuantity >= group.stockQuantity}
//                                   className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-[#FFF5F6] disabled:opacity-50 transition-colors"
//                                 >
//                                   <FaPlus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                                 </button>
//                               </div>
//                               {group.stockQuantity && (
//                                 <span className="text-[9px] text-[#EE4275]/60 whitespace-nowrap" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                                   Stock: {group.stockQuantity}
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 {/* Totals */}
//                 <div className="space-y-2 border-t border-[#F7C7D3]/40 pt-4">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Subtotal</span>
//                     <span className="font-medium text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>৳{subtotal.toFixed(2)}</span>
//                   </div>
                  
//                   <div className="flex justify-between text-sm">
//                     <span className="text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Shipping</span>
//                     <span className="font-medium text-green-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>৳{shippingCost.toFixed(2)}</span>
//                   </div>
                  
//                   <div className="flex justify-between text-lg font-bold pt-3 border-t border-[#F7C7D3]/40">
//                     <span className="text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Total</span>
//                     <span className="text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>৳{total.toFixed(2)}</span>
//                   </div>
//                 </div>
                
//                 {/* Color Selection Warning */}
//                 {hasColorRequiredItems && (
//                   <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
//                     <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
//                     <p className="text-[10px] text-orange-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       Please select colors for all items before placing order
//                     </p>
//                   </div>
//                 )}
                
//                 {/* Trust Badges */}
//                 <div className="mt-4 space-y-1.5 text-xs">
//                   <div className="flex items-center gap-2 text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     <FaShieldAlt className="w-4 h-4 text-[#EE4275]" />
//                     <span>Safe & Secure Shopping</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     <FaClock className="w-4 h-4 text-[#EE4275]" />
//                     <span>7-Day Return Policy</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     <Zap className="w-4 h-4 text-[#EE4275]" />
//                     <span>Free shipping on orders over ৳3000</span>
//                   </div>
//                 </div>
                
//                 {/* Payment & Place Order */}
//                 <div className="mt-5">
//                   <PaymentSelector
//                     onSubmit={handleSubmit}
//                     isSubmitting={submitting}
//                     disabled={isAdminOrModerator || hasColorRequiredItems}
//                   />
//                   {hasColorRequiredItems && (
//                     <p className="text-[10px] text-orange-500 text-center mt-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       Please select all colors before placing order
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <OrderSuccessModal
//         isOpen={showOrderSuccessModal}
//         onClose={() => {
//           setShowOrderSuccessModal(false);
//         }}
//         orderId={lastOrderId}
//         isLoggedIn={isLoggedIn}
//         customerEmail={formData.email}
//       />
      
//       <Footer />
//     </>
//   );
// }


'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Check,
  Loader2,
  Palette,
  Zap
} from 'lucide-react';

import { 
  FaChevronDown, 
  FaCheckCircle, 
  FaTimes, 
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileAlt,
  FaMoneyBillWave,
  FaTruck,
  FaShoppingBag,
  FaClock,
  FaShieldAlt,
  FaArrowLeft,
  FaBox,
  FaShippingFast,
  FaCreditCard,
  FaStore,
  FaBuilding,
  FaSearch,
  FaHome,
  FaCity,
  FaMapPin,
  FaMinus,
  FaPlus,
  FaTrash
} from 'react-icons/fa';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Font family constants - Beauty Bucket Theme
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = " serif";

// Searchable Select Component
const SearchableSelect = ({ name, value, onChange, options, placeholder, required, disabled, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (selectedValue) => {
    onChange({ target: { name, value: selectedValue } });
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onChange({ target: { name, value: '' } });
    setSearchTerm('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = value && options.includes(value) ? value : '';

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus-within:ring-2 focus-within:ring-[#53645A] focus-within:border-transparent cursor-pointer flex items-center justify-between transition-all ${
          disabled ? 'bg-[#c5d5be]/20 cursor-not-allowed' : 'bg-white'
        } ${error ? 'border-red-500' : 'border-[#c5d5be]/50 hover:border-[#53645A]/30'}`}
        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`text-sm ${selectedOption ? 'text-[#263b32] font-medium' : 'text-[#53645A]/60'}`}>
          {selectedOption || placeholder}
        </span>
        <div className="flex items-center gap-2">
          {selectedOption && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="text-[#53645A]/60 hover:text-[#263b32]"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          )}
          <FaChevronDown className={`w-3 h-3 text-[#53645A]/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#c5d5be]/50 rounded-xl shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b border-[#c5d5be]/30">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#53645A]/40 w-3.5 h-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 border border-[#c5d5be]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#53645A] text-sm"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-48">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full px-4 py-2.5 text-left hover:bg-[#f0f5ed] transition-colors text-sm text-[#263b32]"
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-[#53645A]/60 text-center" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                No results found
              </div>
            )}
          </div>
        </div>
      )}
      {required && !disabled && (
        <input type="hidden" name={name} value={value} required={required} />
      )}
    </div>
  );
};

// Payment Selector - Green Theme
const PaymentSelector = ({ onSubmit, isSubmitting, disabled }) => {
  return (
    <div>
      <div className="bg-gradient-to-r from-[#53645A]/10 to-[#6b7d63]/10 rounded-xl p-4 border-2 border-[#53645A]/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#53645A] to-[#6b7d63] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#53645A]/25">
            <FaMoneyBillWave className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-[#263b32] text-sm" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
              Cash on Delivery
            </h4>
            <p className="text-xs text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
              Pay when you receive your order
            </p>
          </div>
        </div>
      </div>
      
      {disabled ? (
        <div className="w-full mt-4 bg-[#c5d5be]/20 text-[#53645A]/60 py-3 rounded-xl font-semibold text-center cursor-not-allowed flex items-center justify-center gap-2 text-sm border border-[#53645A]/20" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
          <FaShieldAlt className="w-4 h-4 text-[#53645A]" />
          Checkout Disabled for Admin/Moderator
        </div>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full mt-4 bg-gradient-to-r from-[#53645A] to-[#6b7d63] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#53645A]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
          style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Placing Order...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Place Order
            </>
          )}
        </button>
      )}
    </div>
  );
};

// Order Success Modal - Green Theme
const OrderSuccessModal = ({ isOpen, onClose, orderId, isLoggedIn, customerEmail }) => {
  const router = useRouter();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-[#53645A]/20"
          >
            <div className="p-6 bg-gradient-to-r from-[#53645A] to-[#6b7d63] text-white text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <FaCheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                Order Placed Successfully! 🎉
              </h2>
              <p className="text-sm text-white/80 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                Your order has been confirmed
              </p>
            </div>
            
            <div className="p-6 text-center">
              <p className="text-[#263b32] mb-2 font-semibold" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                Thank you for your order!
              </p>
              <p className="text-sm text-[#53645A]/60 mb-4" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                We'll notify you when it ships.
              </p>
              {orderId && (
                <div className="bg-[#f0f5ed] rounded-lg p-3 mb-4 border border-[#c5d5be]/40">
                  <p className="text-xs text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    Order Reference
                  </p>
                  <p className="text-sm font-mono font-bold text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    {orderId.slice(-8).toUpperCase()}
                  </p>
                </div>
              )}
              {customerEmail ? (
                <div className="bg-[#53645A]/10 rounded-lg p-3 mb-4 flex items-start gap-2 text-left border border-[#53645A]/20">
                  <FaCheckCircle className="w-4 h-4 text-[#53645A] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    A confirmation email has been sent to <span className="font-medium text-[#53645A]">{customerEmail}</span>
                  </p>
                </div>
              ) : (
                <div className="bg-[#f0f5ed] rounded-lg p-3 mb-4 flex items-start gap-2 text-left border border-[#c5d5be]/40">
                  <FaCheckCircle className="w-4 h-4 text-[#53645A] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    Order placed successfully! Check your phone for updates.
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-[#53645A]/20 bg-[#f0f5ed] flex flex-col sm:flex-row gap-2">
              <button 
                onClick={() => {
                  onClose();
                  if (isLoggedIn) {
                    router.push('/customer/orders');
                  }
                }} 
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#53645A] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#53645A]/25 transition-colors text-sm font-medium"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                {isLoggedIn ? 'View My Orders' : 'Continue Shopping'}
              </button>
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-[#53645A]/30 text-[#263b32] rounded-xl hover:bg-[#f0f5ed] transition-colors text-sm font-medium"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Helper function for unit label
const getUnitLabel = (unit) => {
  const units = {
    'pcs': 'pcs',
    'ton': 'ton',
    'other': 'unit'
  };
  return units[unit] || unit;
};

// Get client device info
const getClientDeviceInfo = () => {
  try {
    return {
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      referrer: document.referrer || null,
      doNotTrack: navigator.doNotTrack,
      vendor: navigator.vendor,
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : null
    };
  } catch (error) {
    console.error('Error getting client device info:', error);
    return {};
  }
};

// AnimatePresence wrapper for modals
const AnimatePresence = ({ children }) => {
  return <>{children}</>;
};

export default function CheckoutClient() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [lastOrderId, setLastOrderId] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const isPlacingOrder = useRef(false);

  const [shippingRates, setShippingRates] = useState({
    insideDhaka: 70,
    outsideDhaka: 150
  });

  const [locationData, setLocationData] = useState({});
  const [divisions, setDivisions] = useState({});
  const [divisionList, setDivisionList] = useState([]);
  const [citiesByDivision, setCitiesByDivision] = useState([]);
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [locationLoading, setLocationLoading] = useState(true);
  const [productColors, setProductColors] = useState({});
  const [updatingColor, setUpdatingColor] = useState({});

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    division: '',
    address: '',
    city: '',
    zone: '',
    area: '',
    zipCode: '',
    country: 'Bangladesh',
    note: ''
  });

  const [errors, setErrors] = useState({});
  const [quantityInputs, setQuantityInputs] = useState({});
  const [pendingQuantityUpdates, setPendingQuantityUpdates] = useState({});

  useEffect(() => {
    const checkCartAndRedirect = async () => {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      
      if (!token && !sessionId) {
        const newSessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        localStorage.setItem('cartSessionId', newSessionId);
        console.log('🆕 Generated new session ID on checkout:', newSessionId);
      }
      
      fetchCart();
    };
    
    checkCartAndRedirect();
  }, []);

  useEffect(() => {
    if (cart?.items) {
      const initialQuantities = {};
      cart.items.forEach(item => {
        initialQuantities[item._id] = item.quantity;
      });
      setQuantityInputs(initialQuantities);
    }
  }, [cart]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('cartSessionId');
    
    if (!token && !sessionId) {
      const newSessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('cartSessionId', newSessionId);
      console.log('🆕 Generated session ID:', newSessionId);
    }
  }, []);

  const getShippingCost = useCallback(async (city, zone, area) => {
    try {
      const response = await fetch('http://localhost:5000/api/delivery/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city, zone, area })
      });
      const data = await response.json();
      if (data.success) {
        return data.data.charge;
      }
      return 0;
    } catch (error) {
      console.error('Error calculating shipping:', error);
      return 0;
    }
  }, []);

  const fetchProductColors = async (items) => {
    const colorMap = {};
    for (const item of items) {
      if (!colorMap[item.productId]) {
        try {
          const response = await fetch(`http://localhost:5000/api/products/${item.productId}`);
          const data = await response.json();
          if (data.success && data.data.product.colors) {
            colorMap[item.productId] = data.data.product.colors;
          }
        } catch (error) {
          console.error('Error fetching product colors:', error);
        }
      }
    }
    return colorMap;
  };

  // ========== UPDATE COLOR ==========
  const updateColor = async (itemId, newColor) => {
    setUpdatingColor(prev => ({ ...prev, [itemId]: true }));
    
    const previousCart = { ...cart };
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => {
        if (item._id === itemId) {
          return { ...item, selectedColor: newColor };
        }
        return item;
      });
      return { ...prevCart, items: updatedItems };
    });
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ selectedColor: newColor })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Color updated!');
      } else {
        setCart(previousCart);
        toast.error(data.error || 'Failed to update color');
      }
    } catch (error) {
      console.error('Update color error:', error);
      setCart(previousCart);
      toast.error('Failed to update color');
    } finally {
      setUpdatingColor(prev => ({ ...prev, [itemId]: false }));
    }
  };

  // ========== ADD NEW COLOR ==========
  const addNewColorToCart = async (productId, color) => {
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const nullColorItem = cart.items.find(
        item => item.productId === productId && 
        (!item.selectedColor || item.selectedColor === '' || item.selectedColor === null || item.selectedColor === 'null')
      );
      
      if (nullColorItem) {
        await fetch(`http://localhost:5000/api/cart/${nullColorItem._id}`, {
          method: 'DELETE',
          headers
        });
      }
      
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          productId: productId, 
          quantity: 1,
          selectedColor: color 
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
        toast.success(`Added ${color} to cart!`);
      } else {
        toast.error(data.error || 'Failed to add color');
      }
    } catch (error) {
      console.error('Add color error:', error);
      toast.error('Network error');
    }
  };

  // ========== REMOVE ITEM ==========
  const removeCartItem = async (itemId) => {
    setIsUpdatingCart(true);
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'DELETE',
        headers
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Item removed');
      } else {
        toast.error(data.error || 'Failed to remove item');
        fetchCart();
      }
    } catch (error) {
      console.error('Remove item error:', error);
      toast.error('Failed to remove item');
      fetchCart();
    } finally {
      setIsUpdatingCart(false);
    }
  };

  // ========== REMOVE ALL COLORS OF A PRODUCT ==========
  const removeAllColors = async (productId) => {
    const itemsToRemove = cart.items.filter(item => item.productId === productId);
    
    if (itemsToRemove.length === 0) return;
    
    setIsUpdatingCart(true);
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      for (const item of itemsToRemove) {
        await fetch(`http://localhost:5000/api/cart/${item._id}`, {
          method: 'DELETE',
          headers
        });
      }
      
      await fetchCart();
      window.dispatchEvent(new Event('cart-update'));
      toast.success('All colors removed');
    } catch (error) {
      console.error('Remove all colors error:', error);
      toast.error('Failed to remove all colors');
    } finally {
      setIsUpdatingCart(false);
    }
  };

  // ========== UPDATE QUANTITY ==========
  const updateCartQuantity = async (itemId, newQuantity) => {
    if (isUpdatingCart) return;
    
    if (newQuantity < 1) {
      removeCartItem(itemId);
      return;
    }
    
    setIsUpdatingCart(true);
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ quantity: newQuantity })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
        setQuantityInputs(prev => ({
          ...prev,
          [itemId]: newQuantity
        }));
        toast.success('Quantity updated');
      } else {
        toast.error(data.error || 'Failed to update quantity');
        fetchCart();
      }
    } catch (error) {
      console.error('Update quantity error:', error);
      toast.error('Failed to update quantity');
      fetchCart();
    } finally {
      setIsUpdatingCart(false);
    }
  };

  // ========== UPDATE QUANTITY WITH DEBOUNCE ==========
  const updateQuantityWithDebounce = useCallback((itemId, newQuantity) => {
    if (pendingQuantityUpdates[itemId]) {
      clearTimeout(pendingQuantityUpdates[itemId]);
    }

    setQuantityInputs(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));

    const timeoutId = setTimeout(() => {
      updateCartQuantity(itemId, newQuantity);
      setPendingQuantityUpdates(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });
    }, 500);

    setPendingQuantityUpdates(prev => ({
      ...prev,
      [itemId]: timeoutId
    }));
  }, [pendingQuantityUpdates]);

  // ========== FETCH CART ==========
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      
      const response = await fetch('http://localhost:5000/api/cart', { headers });
      const data = await response.json();
      
      if (data.success && data.data.items?.length > 0) {
        setCart(data.data);
        const colors = await fetchProductColors(data.data.items || []);
        setProductColors(colors);
      } else {
        setCart({ items: [], totalItems: 0, subtotal: 0 });
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        const data = await response.json();
        setLocationData(data.locationData || {});
        
        const divisions = data.divisions || {};
        const filteredDivisions = {};
        const divisionKeys = [];
        
        Object.keys(divisions).forEach(key => {
          if (key !== 'Other') {
            filteredDivisions[key] = divisions[key];
            divisionKeys.push(key);
          }
        });
        
        setDivisions(filteredDivisions);
        setDivisionList(divisionKeys.sort());
        
        const cityList = data.locationData ? Object.keys(data.locationData) : [];
        setCities(cityList);
        setLocationLoading(false);
      } catch (error) {
        console.error('Failed to load location data:', error);
        setLocationLoading(false);
      }
    };
    fetchLocations();
  }, []);

  // Update cities when division changes
  useEffect(() => {
    if (formData.division && divisions[formData.division]) {
      setCitiesByDivision(divisions[formData.division]);
      setFormData(prev => ({ ...prev, city: '', zone: '', area: '' }));
      setZones([]);
      setAreas([]);
    } else {
      setCitiesByDivision([]);
    }
  }, [formData.division, divisions]);

  // Update zones when city changes with shipping calculation
  useEffect(() => {
    const selectedCity = formData.city;
    const selectedZone = formData.zone;
    const selectedArea = formData.area;
    
    if (selectedCity && locationData[selectedCity]) {
      const availableZones = Object.keys(locationData[selectedCity].zones || {});
      setZones(availableZones);
      setFormData(prev => ({ ...prev, zone: '', area: '' }));
      setAreas([]);
      
      const calculateShipping = async () => {
        const charge = await getShippingCost(selectedCity, selectedZone, selectedArea);
        setShippingCost(charge);
      };
      calculateShipping();
    } else {
      setZones([]);
      setAreas([]);
      setShippingCost(0);
    }
  }, [formData.city, locationData, getShippingCost]);

  // Update areas when zone changes with shipping recalculation
  useEffect(() => {
    const selectedCity = formData.city;
    const selectedZone = formData.zone;
    const selectedArea = formData.area;
    
    if (selectedCity && selectedZone && locationData[selectedCity]) {
      const availableAreas = locationData[selectedCity].zones[selectedZone] || [];
      setAreas(availableAreas);
      setFormData(prev => ({ ...prev, area: '' }));
      
      const calculateShipping = async () => {
        const charge = await getShippingCost(selectedCity, selectedZone, selectedArea);
        setShippingCost(charge);
      };
      calculateShipping();
    } else {
      setAreas([]);
    }
  }, [formData.zone, formData.city, locationData, getShippingCost]);

  // Recalculate shipping when area changes
  useEffect(() => {
    const selectedCity = formData.city;
    const selectedZone = formData.zone;
    const selectedArea = formData.area;
    
    if (selectedCity && selectedZone && selectedArea && locationData[selectedCity]) {
      const calculateShipping = async () => {
        const charge = await getShippingCost(selectedCity, selectedZone, selectedArea);
        setShippingCost(charge);
      };
      calculateShipping();
    }
  }, [formData.area, formData.city, formData.zone, locationData, getShippingCost]);

  // Fetch cart, user, shipping rates on mount
  useEffect(() => {
    fetchCart();
    fetchUser();
    fetchShippingRates();
  }, []);

  // Autofill user data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.contactPerson || user.companyName || user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        division: user.division || '',
        address: user.address || '',
        city: user.city || '',
        zone: user.zone || '',
        area: user.area || '',
        zipCode: user.zipCode || '',
        country: user.country || 'Bangladesh'
      }));
      
      if (user.division) {
        setFormData(prev => ({ ...prev, division: user.division }));
      }
      
      if (user.city) {
        setFormData(prev => ({ ...prev, city: user.city }));
      }
      
      if (user.zone) setFormData(prev => ({ ...prev, zone: user.zone }));
      if (user.area) setFormData(prev => ({ ...prev, area: user.area }));
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) setUser(data.user);
      }
    } catch (error) {
      console.error('Fetch user error:', error);
    }
  };

  const fetchShippingRates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/delivery/settings');
      const data = await response.json();
      if (data.success) {
        setShippingRates({
          insideDhaka: data.data.insideDhaka,
          outsideDhaka: data.data.outsideDhaka
        });
      }
    } catch (error) {
      console.error('Error fetching shipping rates:', error);
    }
  };

  // Handle cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      if (!isPlacingOrder.current) {
        fetchCart();
      }
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(pendingQuantityUpdates).forEach(timeoutId => {
        clearTimeout(timeoutId);
      });
    };
  }, [pendingQuantityUpdates]);

  const validateBangladeshPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const bdPhoneRegex = /^(?:01|8801)\d{9}$/;
    
    if (!bdPhoneRegex.test(cleaned)) {
      return { valid: false, message: 'Please enter a valid Bangladeshi phone number (01XXXXXXXXX)' };
    }
    
    const prefix = cleaned.slice(0, 3);
    const validPrefixes = ['013', '014', '015', '016', '017', '018', '019'];
    
    if (!validPrefixes.includes(prefix)) {
      return { valid: false, message: 'Please enter a valid Bangladeshi mobile number' };
    }
    
    return { valid: true, formatted: cleaned };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    
    if (name === 'division') {
      setFormData(prev => ({ ...prev, city: '', zone: '', area: '' }));
      setZones([]);
      setAreas([]);
    }
    
    if (name === 'city') {
      setFormData(prev => ({ ...prev, zone: '', area: '' }));
      setAreas([]);
    }
    
    if (name === 'zone') {
      setFormData(prev => ({ ...prev, area: '' }));
    }
    
    if (name === 'phone' && value) {
      const validation = validateBangladeshPhone(value);
      if (!validation.valid) {
        setErrors(prev => ({ ...prev, phone: validation.message }));
      } else {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    }
  };

  // ========== COLOR VALIDATION FOR CHECKOUT ==========
  const validateCartColors = () => {
    if (!cart?.items?.length) {
      toast.error('Your cart is empty');
      return false;
    }
    
    const itemsWithoutColor = cart.items.filter(item => {
      const availableColors = productColors[item.productId] || [];
      const hasAvailableColors = availableColors.length > 0;
      if (hasAvailableColors && (!item.selectedColor || item.selectedColor === '' || item.selectedColor === 'null')) {
        return true;
      }
      return false;
    });
    
    if (itemsWithoutColor.length > 0) {
      toast.error(
        <div className="space-y-1">
          <p className="font-semibold text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Please select colors for:</p>
          <ul className="text-xs space-y-0.5 list-disc list-inside text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
            {itemsWithoutColor.slice(0, 3).map((item, i) => (
              <li key={i}>{item.productName}</li>
            ))}
            {itemsWithoutColor.length > 3 && (
              <li>And {itemsWithoutColor.length - 3} more item(s)...</li>
            )}
          </ul>
        </div>,
        { duration: 5000 }
      );
      return false;
    }
    
    return true;
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName?.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (formData.email?.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else {
      const validation = validateBangladeshPhone(formData.phone);
      if (!validation.valid) {
        errors.phone = validation.message;
      }
    }
    
    if (!formData.division?.trim()) {
      errors.division = 'Please select a division';
    }
    
    if (!formData.address?.trim()) {
      errors.address = 'Address is required';
    }
    
    if (!formData.city?.trim()) {
      errors.city = 'Please select a district/city';
    }
    
    if (!formData.zone?.trim()) {
      errors.zone = 'Please select an upazila/thana';
    }
    
    setErrors(errors);
    return errors;
  };

  const calculateSubtotal = () => cart?.subtotal || 0;
  const calculateTotal = () => calculateSubtotal() + shippingCost;
  const isLoggedIn = !!user;
  const isAdminOrModerator = user && (user.role === 'admin' || user.role === 'moderator');

  const handleCODOrder = async () => {
    if (isAdminOrModerator) {
      toast.error('Admins and Moderators cannot place orders');
      return;
    }
    
    if (navigating) return;
    setNavigating(true);
    setSubmitting(true);
    isPlacingOrder.current = true;
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      console.log('📤 Sending order with sessionId:', sessionId || 'none');
      
      const clientDeviceInfo = getClientDeviceInfo();
      
      // Group items
      const groupedItems = {};
      
      cart.items.forEach(item => {
        const productId = item.productId || item._id;
        if (!groupedItems[productId]) {
          groupedItems[productId] = {
            productId: productId,
            productName: item.productName,
            productSlug: item.productSlug || '',
            image: item.image || '',
            regularPrice: item.regularPrice,
            discountPrice: item.discountPrice || 0,
            buyingPrice: item.buyingPrice || 0, 
            costPerItem: item.costPerItem || 0,
            unit: item.unit || 'pcs',
            stockQuantity: item.stockQuantity || 0,
            colors: [],
            quantity: 0,
            selectedColor: null
          };
        }
        
        const hasValidColor = item.selectedColor && 
                             item.selectedColor !== '' && 
                             item.selectedColor !== null && 
                             item.selectedColor !== 'null';
        
        if (hasValidColor) {
          const existingColor = groupedItems[productId].colors.find(c => c.color === item.selectedColor);
          if (existingColor) {
            existingColor.quantity += item.quantity;
          } else {
            groupedItems[productId].colors.push({
              color: item.selectedColor,
              quantity: item.quantity,
              price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice
            });
          }
          groupedItems[productId].quantity += item.quantity;
        } else {
          groupedItems[productId].quantity = item.quantity;
        }
      });
      
      const groupedItemsArray = Object.values(groupedItems).map(item => {
        const hasColors = item.colors && item.colors.length > 0;
        return {
          productId: item.productId,
          productName: item.productName,
          productSlug: item.productSlug,
          image: item.image,
          regularPrice: item.regularPrice,
          discountPrice: item.discountPrice || 0,
          buyingPrice: item.buyingPrice || 0,
          costPerItem: item.costPerItem || 0,
          unit: item.unit || 'pcs',
          stockQuantity: item.stockQuantity || 0,
          colors: hasColors ? item.colors : [],
          quantity: hasColors ? 0 : (item.quantity || 0),
          selectedColor: null
        };
      });
      
      const validItems = groupedItemsArray.filter(item => {
        const hasColors = item.colors && item.colors.length > 0;
        const hasQuantity = item.quantity > 0;
        return hasColors || hasQuantity;
      });
      
      if (validItems.length === 0) {
        toast.error('No valid items in cart');
        setNavigating(false);
        return;
      }
      
      const orderData = {
        items: validItems,
        subtotal: calculateSubtotal(),
        shippingCost,
        discount: 0,
        total: calculateTotal(),
        paymentMethod: 'cod',
        customerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          division: formData.division,
          address: formData.address,
          city: formData.city,
          zone: formData.zone,
          area: formData.area || '',
          zipCode: formData.zipCode || '',
          country: formData.country || 'Bangladesh',
          note: formData.note || ''
        },
        couponCode: null,
        couponDiscount: 0,
        freeShipping: false,
        clientDeviceInfo: clientDeviceInfo,
        sessionId: sessionId
      };
      
      console.log('📦 Order Data:', JSON.stringify(orderData, null, 2));
      
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify(orderData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        const orderId = data.orderId || data.data?._id || data.data?.id;
        
        try {
          const deleteHeaders = { 'Content-Type': 'application/json' };
          if (token) {
            deleteHeaders['Authorization'] = `Bearer ${token}`;
          } else if (sessionId) {
            deleteHeaders['x-session-id'] = sessionId;
          }
          
          await fetch('http://localhost:5000/api/incomplete-orders/delete-on-place', {
            method: 'POST',
            headers: deleteHeaders,
            body: JSON.stringify({ 
              sessionId: sessionId,
              orderId: orderId 
            })
          });
          console.log('🗑️ Incomplete order deleted after successful placement');
        } catch (deleteError) {
          console.error('Error deleting incomplete order:', deleteError);
        }
        
        localStorage.removeItem('cartSessionId');
        
        await fetch('http://localhost:5000/api/cart', { 
          method: 'DELETE', 
          headers 
        });
        
        window.dispatchEvent(new Event('cart-update'));
        setCart({ items: [], totalItems: 0, subtotal: 0 });
        
        if (isLoggedIn) {
          toast.success('Order placed successfully!');
          window.location.href = '/customer/orders';
        } else {
          const sessionIdFromResponse = data.sessionId || sessionId;
          window.location.href = `/thank-you?orderId=${orderId}&sessionId=${sessionIdFromResponse}`;
        }
      } else {
        toast.error(data.error || 'Failed to place order');
        setNavigating(false);
      }
    } catch (error) {
      console.error('COD order error:', error);
      toast.error('Network error. Please try again.');
      setNavigating(false);
    } finally {
      setSubmitting(false);
      isPlacingOrder.current = false;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isAdminOrModerator) {
      toast.error('Admins and Moderators cannot place orders');
      return;
    }
    
    if (!validateCartColors()) {
      return;
    }
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      const errorMessages = Object.values(validationErrors);
      
      toast.error(
        <div className="space-y-1">
          <p className="font-semibold text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Please fix the following errors:</p>
          <ul className="text-xs space-y-0.5 list-disc list-inside text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
            {errorMessages.slice(0, 3).map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
            {errorMessages.length > 3 && (
              <li>And {errorMessages.length - 3} more error(s)...</li>
            )}
          </ul>
        </div>,
        { duration: 5000 }
      );
      
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        const input = firstErrorField.querySelector('input, textarea, select');
        if (input) {
          setTimeout(() => input.focus(), 500);
        }
      }
      
      return;
    }
    
    if (!cart?.items?.length) {
      toast.error('Your cart is empty');
      return;
    }
    
    await handleCODOrder();
  };

  // ========== SAVE INCOMPLETE ORDER ==========
  const saveIncompleteOrder = useCallback(async () => {
    try {
      if (!cart?.items?.length) return;

      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }

      const groupedItems = cart.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        productSlug: item.productSlug || '',
        image: item.image || '',
        regularPrice: item.regularPrice,
        discountPrice: item.discountPrice || 0,
        quantity: item.quantity,
        unit: item.unit || 'pcs',
        selectedColor: item.selectedColor || null,
        colors: []
      }));

      const clientDeviceInfo = getClientDeviceInfo();

      const response = await fetch('http://localhost:5000/api/incomplete-orders/save', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          customerInfo: formData,
          items: groupedItems,
          subtotal: calculateSubtotal(),
          shippingCost: shippingCost,
          discount: 0,
          total: calculateTotal(),
          paymentMethod: 'cod',
          checkoutStep: 'information',
          clientDeviceInfo,
          sessionId: sessionId
        })
      });

      const data = await response.json();
      if (data.success) {
        console.log('✅ Incomplete order saved');
      }
    } catch (error) {
      console.error('Save incomplete order error:', error);
    }
  }, [cart, formData, shippingCost]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cart?.items?.length > 0) {
        saveIncompleteOrder();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [formData, cart, saveIncompleteOrder]);

  if (loading || locationLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f8f7f2] pt-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#53645A] animate-spin" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!cart?.items?.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f8f7f2] py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="bg-white rounded-2xl shadow-sm border border-[#c5d5be]/40 p-12">
              {/* Lottie Animation - Empty Cart */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 sm:mb-4">
                <DotLottieReact
                  src="/animations/shopping-cart.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </div>
              <h2 className="text-2xl font-light text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
                Your cart is empty
              </h2>
              <p className="text-[#53645A]/60 mb-6" style={{ fontFamily: FONT_FAMILY }}>
                Add some products to your cart and come back to checkout.
              </p>
              <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#53645A] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#53645A]/25 transition-colors" style={{ fontFamily: FONT_FAMILY }}>
                <FaArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  const hasColorRequiredItems = cart.items.some(item => {
    const availableColors = productColors[item.productId] || [];
    return availableColors.length > 0 && (!item.selectedColor || item.selectedColor === '' || item.selectedColor === 'null');
  });

  const groupedItems = cart.items.reduce((acc, item) => {
    const productId = item.productId.toString();
    if (!acc[productId]) {
      acc[productId] = {
        ...item,
        colors: [],
        totalQuantity: 0
      };
    }
    const hasValidColor = item.selectedColor && 
                         item.selectedColor !== '' && 
                         item.selectedColor !== null && 
                         item.selectedColor !== 'null';
    
    acc[productId].colors.push({
      color: hasValidColor ? item.selectedColor : null,
      quantity: item.quantity,
      itemId: item._id,
      price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice
    });
    
    acc[productId].totalQuantity += item.quantity;
    
    return acc;
  }, {});

  const groupedItemsArray = Object.values(groupedItems);

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-[#f8f7f2] py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#53645A] to-[#6b7d63] rounded-xl flex items-center justify-center shadow-lg shadow-[#53645A]/25">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
                  Checkout
                </h1>
                <p className="text-sm text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY }}>
                  Complete your order securely
                </p>
              </div>
            </div>
          </div>

          {/* Color Selection Warning */}
          {hasColorRequiredItems && (
            <div className="mb-6 bg-orange-50 border-l-4 border-orange-400 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-orange-700 font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    Color Selection Required
                  </p>
                  <p className="text-xs text-orange-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    Please select colors for all items before proceeding to checkout.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isAdminOrModerator && (
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-yellow-700 font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    Checkout Disabled for Admin/Moderator Accounts
                  </p>
                  <p className="text-xs text-yellow-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    You are logged in as {user?.role}. Please switch to a customer account to place orders.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-5">
              {/* Personal Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#c5d5be]/40 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-medium text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                    <FaUser className="w-5 h-5 text-[#53645A]" />
                    Personal Information
                  </h2>
                  {isLoggedIn && (
                    <span className="text-xs bg-[#53645A]/10 text-[#53645A] px-3 py-1 rounded-full flex items-center gap-1 font-medium border border-[#53645A]/20" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      <FaCheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      Full Name <span className="text-[#53645A]">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#53645A]/40 w-4 h-4" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition text-sm ${
                          isLoggedIn ? 'bg-[#f0f5ed] text-[#53645A]/60' : 'bg-white'
                        } ${errors.fullName ? 'border-red-500' : 'border-[#c5d5be]/50'}`}
                        placeholder="Enter your full name"
                        disabled={isLoggedIn}
                        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                      />
                    </div>
                    {errors.fullName && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      Email <span className="text-[#53645A]/60 text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#53645A]/40 w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition text-sm ${
                          isLoggedIn ? 'bg-[#f0f5ed] text-[#53645A]/60' : 'bg-white'
                        } ${errors.email ? 'border-red-500' : 'border-[#c5d5be]/50'}`}
                        placeholder="your@email.com (optional)"
                        disabled={isLoggedIn}
                        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      Phone Number <span className="text-[#53645A]">*</span>
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#53645A]/40 w-4 h-4" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition text-sm ${
                          errors.phone ? 'border-red-500' : 'border-[#c5d5be]/50'
                        }`}
                        placeholder="01XXXXXXXXX"
                        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.phone}</p>}
                    <p className="text-[10px] text-[#53645A]/60 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Enter a valid Bangladeshi mobile number</p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#c5d5be]/40 p-6">
                <h2 className="text-lg font-medium text-[#263b32] flex items-center gap-2 mb-5" style={{ fontFamily: FONT_FAMILY }}>
                  <FaMapMarkerAlt className="w-5 h-5 text-[#53645A]" />
                  Delivery Address
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      Full Address <span className="text-[#53645A]">*</span>
                    </label>
                    <div className="relative">
                      <FaHome className="absolute left-3 top-3 text-[#53645A]/40 w-4 h-4" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="2"
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition bg-white text-sm resize-none ${
                          errors.address ? 'border-red-500' : 'border-[#c5d5be]/50'
                        }`}
                        placeholder="House #, Road #, Area, City, Zip Code"
                        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                      />
                    </div>
                    {isLoggedIn && user?.address && (
                      <p className="text-xs text-[#53645A] mt-1 flex items-center gap-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                        <FaCheckCircle className="w-3 h-3" />
                        Your saved address has been pre-filled
                      </p>
                    )}
                    {errors.address && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                        Division <span className="text-[#53645A]">*</span>
                      </label>
                      <SearchableSelect
                        name="division"
                        value={formData.division}
                        onChange={handleInputChange}
                        options={divisionList}
                        placeholder="Select Division"
                        required
                        disabled={false}
                        error={errors.division}
                      />
                      {errors.division && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.division}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                        District/City <span className="text-[#53645A]">*</span>
                      </label>
                      <SearchableSelect
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        options={citiesByDivision}
                        placeholder={formData.division ? "Select District" : "Select Division First"}
                        required
                        disabled={!formData.division}
                        error={errors.city}
                      />
                      {errors.city && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.city}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                        Upazila/Thana <span className="text-[#53645A]">*</span>
                      </label>
                      <SearchableSelect
                        name="zone"
                        value={formData.zone}
                        onChange={handleInputChange}
                        options={zones}
                        placeholder={formData.city ? "Select Upazila/Thana" : "Select District First"}
                        required
                        disabled={!formData.city}
                        error={errors.zone}
                      />
                      {errors.zone && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.zone}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                        Union/Area
                      </label>
                      <SearchableSelect
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        options={areas}
                        placeholder={formData.zone ? "Select Union/Area" : "Select Upazila First"}
                        disabled={!formData.zone}
                        error={errors.area}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#c5d5be]/40 p-6">
                <h2 className="text-lg font-medium text-[#263b32] flex items-center gap-2 mb-4" style={{ fontFamily: FONT_FAMILY}}>
                  <FaFileAlt className="w-5 h-5 text-[#53645A]" />
                  Order Notes <span className="text-sm font-normal text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY }}>(Optional)</span>
                </h2>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-3 border border-[#c5d5be]/50 rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition text-sm resize-none bg-white hover:border-[#53645A]/30"
                  placeholder="Special instructions for delivery, gift message, etc."
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                />
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-[#c5d5be]/40 p-6 sticky top-24">
                <h2 className="text-lg font-medium text-[#263b32] flex items-center gap-2 mb-4" style={{ fontFamily: FONT_FAMILY }}>
                  <FaShoppingBag className="w-5 h-5 text-[#53645A]" />
                  Order Summary
                </h2>
                
                {/* Grouped Items List */}
                <div className="space-y-4 max-h-60 overflow-y-auto mb-4 pr-1">
                  {groupedItemsArray.map((group) => {
                    const hasColors = productColors[group.productId]?.length > 0;
                    const availableColors = productColors[group.productId] || [];
                    const price = group.discountPrice > 0 ? group.discountPrice : group.regularPrice;
                    const selectedColors = group.colors.filter(c => c.color !== null);
                    const hasUnselected = group.colors.some(c => c.color === null);
                    
                    return (
                      <div key={group._id} className="border border-[#c5d5be]/40 rounded-lg overflow-hidden">
                        <div className="flex items-start gap-2 p-2 bg-[#f0f5ed] border-b border-[#c5d5be]/30">
                          <img 
                            src={group.image || 'https://via.placeholder.com/40'} 
                            alt={group.productName} 
                            className="w-10 h-10 rounded-lg object-cover border border-[#c5d5be]/40 flex-shrink-0"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-[#263b32] truncate" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                              {group.productName}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-sm font-bold text-[#53645A]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                                ৳{price.toFixed(2)}
                              </span>
                              {group.discountPrice > 0 && (
                                <span className="text-[10px] text-[#53645A]/40 line-through" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                                  ৳{group.regularPrice.toFixed(2)}
                                </span>
                              )}
                              <span className="text-[10px] text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                                /{getUnitLabel(group.unit)}
                              </span>
                            </div>
                            <div className="text-xs text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                              Total: <span className="font-medium text-[#263b32]">{group.totalQuantity}</span> items
                              {selectedColors.length > 0 && (
                                <span className="ml-1 text-[#53645A]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                                  ({selectedColors.length} color{selectedColors.length > 1 ? 's' : ''} selected)
                                </span>
                              )}
                            </div>
                          </div>
                          {hasColors && selectedColors.length > 0 && (
                            <button
                              onClick={() => removeAllColors(group.productId)}
                              disabled={isUpdatingCart}
                              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                              title="Remove all colors"
                            >
                              <FaTrash className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {!hasColors && (
                            <button
                              onClick={() => {
                                const item = cart.items.find(item => item.productId === group.productId);
                                if (item) removeCartItem(item._id);
                              }}
                              disabled={isUpdatingCart}
                              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                              title="Remove product"
                            >
                              <FaTrash className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {hasColors ? (
                          <>
                            <div className="p-2 border-b border-[#c5d5be]/30 bg-[#f0f5ed]">
                              <p className="text-[10px] text-[#53645A]/60 mb-1.5 flex items-center gap-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                                <Palette className="w-3 h-3 text-[#53645A]" />
                                Available Colors:
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {availableColors.map((color) => {
                                  const isSelected = selectedColors.some(c => c.color === color);
                                  return (
                                    <button
                                      key={color}
                                      onClick={() => {
                                        if (!isSelected) {
                                          const itemWithoutColor = group.colors.find(c => c.color === null);
                                          if (itemWithoutColor) {
                                            updateColor(itemWithoutColor.itemId, color);
                                          } else {
                                            addNewColorToCart(group.productId, color);
                                          }
                                        }
                                      }}
                                      disabled={isSelected || isUpdatingCart}
                                      className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                                        isSelected 
                                          ? 'border-[#53645A] shadow-md ring-2 ring-[#53645A]/30 scale-110 cursor-default' 
                                          : 'border-[#c5d5be]/50 hover:border-[#53645A]/60 cursor-pointer'
                                      } ${isUpdatingCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                                      style={{ backgroundColor: color }}
                                      title={isSelected ? `${color} (Selected)` : `Click to select ${color}`}
                                    >
                                      {isSelected && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white drop-shadow-md" />
                                        </div>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                              <div className="mt-1 text-[9px] text-gray-400" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                                {selectedColors.length > 0 ? (
                                  <span className="text-green-600">
                                    ✓ {selectedColors.length} color{selectedColors.length > 1 ? 's' : ''} selected
                                    {hasUnselected && (
                                      <span className="text-gray-400 ml-1">
                                        (Click a color above to select)
                                      </span>
                                    )}
                                  </span>
                                ) : (
                                  <span className="text-orange-500">Click a color to select</span>
                                )}
                              </div>
                            </div>

                            <div className="p-2 space-y-2">
                              {selectedColors.length > 0 ? (
                                selectedColors.map((colorInfo) => (
                                  <div key={colorInfo.itemId} className="flex items-center gap-2 p-2 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
                                    <div 
                                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#c5d5be]/40 flex-shrink-0"
                                      style={{ backgroundColor: colorInfo.color }}
                                      title={colorInfo.color}
                                    />
                                    
                                    <div className="flex items-center border border-[#c5d5be]/40 rounded-lg overflow-hidden bg-white ml-auto">
                                      <button
                                        onClick={() => {
                                          const newQty = colorInfo.quantity - 1;
                                          if (newQty >= 1) {
                                            updateCartQuantity(colorInfo.itemId, newQty);
                                          }
                                        }}
                                        disabled={isUpdatingCart || colorInfo.quantity <= 1}
                                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-[#f0f5ed] disabled:opacity-50 transition-colors"
                                      >
                                        <FaMinus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                      </button>
                                      
                                      <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={quantityInputs[colorInfo.itemId] !== undefined ? quantityInputs[colorInfo.itemId] : colorInfo.quantity}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          if (value === '' || /^\d+$/.test(value)) {
                                            const numValue = parseInt(value);
                                            setQuantityInputs(prev => ({
                                              ...prev,
                                              [colorInfo.itemId]: value
                                            }));
                                            
                                            if (value !== '' && !isNaN(numValue) && numValue >= 1) {
                                              const finalValue = Math.min(numValue, group.stockQuantity || 999);
                                              updateQuantityWithDebounce(colorInfo.itemId, finalValue);
                                            }
                                          }
                                        }}
                                        onBlur={(e) => {
                                          const value = e.target.value;
                                          const numValue = parseInt(value);
                                          
                                          if (value === '' || isNaN(numValue) || numValue < 1) {
                                            setQuantityInputs(prev => ({
                                              ...prev,
                                              [colorInfo.itemId]: colorInfo.quantity
                                            }));
                                            return;
                                          }
                                          
                                          const finalValue = Math.min(Math.max(1, numValue), group.stockQuantity || 999);
                                          if (finalValue !== colorInfo.quantity) {
                                            updateCartQuantity(colorInfo.itemId, finalValue);
                                          }
                                        }}
                                        className="w-10 text-center text-sm font-medium text-[#263b32] bg-white focus:outline-none focus:ring-1 focus:ring-[#53645A] py-1"
                                        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                                        disabled={isUpdatingCart}
                                      />
                                      
                                      <button
                                        onClick={() => {
                                          const newQty = colorInfo.quantity + 1;
                                          if (newQty <= group.stockQuantity) {
                                            updateCartQuantity(colorInfo.itemId, newQty);
                                          }
                                        }}
                                        disabled={isUpdatingCart || colorInfo.quantity >= group.stockQuantity}
                                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-[#f0f5ed] disabled:opacity-50 transition-colors"
                                      >
                                        <FaPlus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                      </button>
                                    </div>
                                    
                                    <button
                                      onClick={() => removeCartItem(colorInfo.itemId)}
                                      disabled={isUpdatingCart}
                                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                      title="Remove this color"
                                    >
                                      <FaTrash className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center py-2 text-xs text-gray-400" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                                  No colors selected. Click a color above to select.
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="p-2">
                            <div className="flex items-center justify-between gap-2 p-2 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                                  Quantity
                                </span>
                              </div>
                              <div className="flex items-center border border-[#c5d5be]/40 rounded-lg overflow-hidden bg-white">
                                <button
                                  onClick={() => {
                                    const currentItem = cart.items.find(item => item.productId === group.productId);
                                    if (currentItem && currentItem.quantity > 1) {
                                      updateCartQuantity(currentItem._id, currentItem.quantity - 1);
                                    }
                                  }}
                                  disabled={isUpdatingCart || group.totalQuantity <= 1}
                                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-[#f0f5ed] disabled:opacity-50 transition-colors"
                                >
                                  <FaMinus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                </button>
                                
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  value={quantityInputs[group._id] !== undefined ? quantityInputs[group._id] : (group.totalQuantity || 1)}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || /^\d+$/.test(value)) {
                                      const numValue = parseInt(value);
                                      setQuantityInputs(prev => ({
                                        ...prev,
                                        [group._id]: value
                                      }));
                                      
                                      if (value !== '' && !isNaN(numValue) && numValue >= 1) {
                                        const finalValue = Math.min(numValue, group.stockQuantity || 999);
                                        const currentItem = cart.items.find(item => item.productId === group.productId);
                                        if (currentItem) {
                                          updateQuantityWithDebounce(currentItem._id, finalValue);
                                        }
                                      }
                                    }
                                  }}
                                  onBlur={(e) => {
                                    const value = e.target.value;
                                    const numValue = parseInt(value);
                                    const currentItem = cart.items.find(item => item.productId === group.productId);
                                    
                                    if (value === '' || isNaN(numValue) || numValue < 1) {
                                      setQuantityInputs(prev => ({
                                        ...prev,
                                        [group._id]: group.totalQuantity || 1
                                      }));
                                      return;
                                    }
                                    
                                    const finalValue = Math.min(Math.max(1, numValue), group.stockQuantity || 999);
                                    if (currentItem && finalValue !== currentItem.quantity) {
                                      updateCartQuantity(currentItem._id, finalValue);
                                    }
                                  }}
                                  className="w-12 text-center text-sm font-medium text-[#263b32] bg-white focus:outline-none focus:ring-1 focus:ring-[#53645A] py-1"
                                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                                  disabled={isUpdatingCart}
                                />
                                
                                <button
                                  onClick={() => {
                                    const currentItem = cart.items.find(item => item.productId === group.productId);
                                    if (currentItem && currentItem.quantity < group.stockQuantity) {
                                      updateCartQuantity(currentItem._id, currentItem.quantity + 1);
                                    }
                                  }}
                                  disabled={isUpdatingCart || group.totalQuantity >= group.stockQuantity}
                                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-[#f0f5ed] disabled:opacity-50 transition-colors"
                                >
                                  <FaPlus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                </button>
                              </div>
                              {group.stockQuantity && (
                                <span className="text-[9px] text-[#53645A]/60 whitespace-nowrap" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                                  Stock: {group.stockQuantity}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Totals */}
                <div className="space-y-2 border-t border-[#c5d5be]/40 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Subtotal</span>
                    <span className="font-medium text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>৳{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Shipping</span>
                    <span className="font-medium text-green-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>৳{shippingCost.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-[#c5d5be]/40">
                    <span className="text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Total</span>
                    <span className="text-[#53645A]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>৳{total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Color Selection Warning */}
                {hasColorRequiredItems && (
                  <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-orange-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      Please select colors for all items before placing order
                    </p>
                  </div>
                )}
                
                {/* Trust Badges */}
                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-[#53645A]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    <FaShieldAlt className="w-4 h-4 text-[#53645A]" />
                    <span>Safe & Secure Shopping</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#53645A]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    <FaClock className="w-4 h-4 text-[#53645A]" />
                    <span>7-Day Return Policy</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#53645A]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    <Zap className="w-4 h-4 text-[#53645A]" />
                    <span>Free shipping on orders over ৳3000</span>
                  </div>
                </div>
                
                {/* Payment & Place Order */}
                <div className="mt-5">
                  <PaymentSelector
                    onSubmit={handleSubmit}
                    isSubmitting={submitting}
                    disabled={isAdminOrModerator || hasColorRequiredItems}
                  />
                  {hasColorRequiredItems && (
                    <p className="text-[10px] text-orange-500 text-center mt-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      Please select all colors before placing order
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <OrderSuccessModal
        isOpen={showOrderSuccessModal}
        onClose={() => {
          setShowOrderSuccessModal(false);
        }}
        orderId={lastOrderId}
        isLoggedIn={isLoggedIn}
        customerEmail={formData.email}
      />
      
      <Footer />
    </>
  );
}