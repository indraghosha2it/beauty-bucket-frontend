
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   ShoppingCart,
//   Trash2,
//   Plus,
//   Minus,
//   X,
//   CreditCard,
//   ShieldCheck,
//   Loader2,
//   ChevronRight,
//   AlertCircle,
//   AlertTriangle,
//   ShoppingBag,
//   Scale,
//   Check,
//   Palette,
//   Zap
// } from 'lucide-react';
// import { toast } from 'sonner';

// // Helper function to get unit label
// const getUnitLabel = (unit) => {
//   const units = {
//     'pcs': 'pcs',
//     'ton': 'ton',
//     'other': 'unit'
//   };
//   return units[unit] || unit;
// };

// // Helper function to get color name
// const getColorName = (color) => {
//   const colorMap = {
//     '#000000': 'Black',
//     '#FFFFFF': 'White',
//     '#FF0000': 'Red',
//     '#00FF00': 'Green',
//     '#0000FF': 'Blue',
//     '#FFFF00': 'Yellow',
//     '#FF00FF': 'Magenta',
//     '#00FFFF': 'Cyan',
//     '#FFA500': 'Orange',
//     '#800080': 'Purple',
//     '#008000': 'Dark Green',
//     '#FFC0CB': 'Pink',
//     '#A52A2A': 'Brown',
//     '#808080': 'Gray',
//     '#C0C0C0': 'Silver',
//     '#4A90E2': 'Blue',
//     '#FF6B6B': 'Red',
//     '#4ECDC4': 'Teal',
//     '#45B7D1': 'Sky Blue',
//     '#96CEB4': 'Mint',
//     '#FFEAA7': 'Cream',
//     '#DDA0DD': 'Plum',
//     '#98D8C8': 'Seafoam',
//     '#F7DC6F': 'Gold',
//     '#BB8FCE': 'Lavender'
//   };
//   return colorMap[color] || color;
// };

// // ========== HELPER FUNCTION: Recalculate Cart Totals ==========
// const recalculateTotals = (items) => {
//   const validItems = items.filter(item => typeof item.quantity === 'number' && item.quantity > 0);
//   const totalItems = validItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
//   const subtotal = validItems.reduce((sum, item) => {
//     const price = (item.discountPrice > 0 ? item.discountPrice : item.regularPrice);
//     return sum + (price * (item.quantity || 0));
//   }, 0);
//   return { totalItems, subtotal };
// };

// export default function CartSidebar({ isOpen, onClose }) {
//   const router = useRouter();
//   const [cart, setCart] = useState({ items: [], totalItems: 0, subtotal: 0 });
//   const [loading, setLoading] = useState(true);
//   const [updatingItems, setUpdatingItems] = useState({});
//   const [isClearing, setIsClearing] = useState(false);
//   const [showClearModal, setShowClearModal] = useState(false);
//   const [productColors, setProductColors] = useState({});
//   const [addingColor, setAddingColor] = useState({});
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
  
//   const isMounted = useRef(true);
//   const debounceTimerRef = useRef({});

//   // Check if user is logged in
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   // Listen for auth changes (login/logout)
//   useEffect(() => {
//     const handleAuthChange = () => {
//       const token = localStorage.getItem('token');
//       const newIsLoggedIn = !!token;
//       setIsLoggedIn(newIsLoggedIn);
      
//       // If user just logged in (was guest, now has token), refresh cart
//       if (newIsLoggedIn && isOpen) {
//         console.log('🔐 Auth change detected - Refreshing cart');
//         fetchCart();
//       }
//     };

//     window.addEventListener('auth-change', handleAuthChange);
//     // Also listen for storage changes (for token changes across tabs)
//     window.addEventListener('storage', (e) => {
//       if (e.key === 'token') {
//         handleAuthChange();
//       }
//     });

//     return () => {
//       window.removeEventListener('auth-change', handleAuthChange);
//       window.removeEventListener('storage', handleAuthChange);
//     };
//   }, [isOpen]);

//   // ✅ OPTIMIZED: Batch fetch product colors in one API call
//   const fetchProductColors = async (items) => {
//     if (!items || items.length === 0) return {};
    
//     const uniqueProductIds = [...new Set(items.map(item => item.productId))];
//     if (uniqueProductIds.length === 0) return {};
    
//     try {
//       const response = await fetch('http://localhost:5000/api/products/colors-by-ids', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ productIds: uniqueProductIds })
//       });
      
//       const data = await response.json();
//       return data.success ? data.data : {};
//     } catch (error) {
//       console.error('Error fetching product colors:', error);
//       return {};
//     }
//   };

//   // Group cart items by productId
//   const groupItemsByProduct = (items) => {
//     const grouped = {};
//     items.forEach(item => {
//       const productId = item.productId.toString();
//       if (!grouped[productId]) {
//         grouped[productId] = {
//           ...item,
//           colors: [],
//           totalQuantity: 0,
//           totalPrice: 0,
//           selectedColors: []
//         };
//       }
      
//       const hasValidColor = item.selectedColor && 
//                            item.selectedColor !== '' && 
//                            item.selectedColor !== null && 
//                            item.selectedColor !== 'null' && 
//                            item.selectedColor !== 'undefined';
      
//       if (hasValidColor) {
//         grouped[productId].colors.push({
//           color: item.selectedColor,
//           quantity: item.quantity,
//           itemId: item._id,
//           price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice,
//           stockQuantity: item.stockQuantity
//         });
//         grouped[productId].selectedColors.push(item.selectedColor);
//       } else {
//         grouped[productId].noColorItem = {
//           itemId: item._id,
//           quantity: item.quantity,
//           price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice,
//           stockQuantity: item.stockQuantity
//         };
//       }
      
//       grouped[productId].totalQuantity += item.quantity;
//       grouped[productId].totalPrice += (item.discountPrice > 0 ? item.discountPrice : item.regularPrice) * item.quantity;
//     });
//     return Object.values(grouped);
//   };

//   // ========== FETCH CART ==========
//   const fetchCart = async () => {
//     if (!isMounted.current) return;
    
//     try {
//       const token = localStorage.getItem('token');
//       let sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       // If no token and no sessionId, generate one
//       if (!token && !sessionId) {
//         sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//         localStorage.setItem('cartSessionId', sessionId);
//         console.log('🆕 Generated new session ID:', sessionId);
//       }
      
//       console.log('🔍 Fetching cart - Token:', token ? 'Yes' : 'No', 'SessionId:', sessionId || 'None');
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//         console.log('🔐 Fetching user cart with token');
        
//         const response = await fetch('http://localhost:5000/api/cart/user', { headers });
//         const data = await response.json();
        
//         if (!isMounted.current) return;
        
//         if (data.success) {
//           console.log('📦 User cart fetched:', data.data.items.length, 'items');
//           setCart(data.data);
//           const colors = await fetchProductColors(data.data.items || []);
//           setProductColors(colors);
//         } else {
//           console.error('Failed to fetch user cart:', data.error);
//           setCart({ items: [], totalItems: 0, subtotal: 0 });
//         }
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//         console.log('👤 Fetching guest cart with sessionId');
        
//         const response = await fetch('http://localhost:5000/api/cart', { headers });
//         const data = await response.json();
        
//         if (!isMounted.current) return;
        
//         if (data.success) {
//           console.log('📦 Guest cart fetched:', data.data.items.length, 'items');
//           setCart(data.data);
//           const colors = await fetchProductColors(data.data.items || []);
//           setProductColors(colors);
//         } else {
//           // If guest cart fetch fails, clear the sessionId and retry
//           if (data.error === 'Session not found' || data.error === 'Invalid session') {
//             localStorage.removeItem('cartSessionId');
//             console.log('🔄 Invalid session, clearing and retrying');
//             await fetchCart();
//             return;
//           }
//           setCart({ items: [], totalItems: 0, subtotal: 0 });
//         }
//       } else {
//         console.log('📭 No auth found, empty cart');
//         setCart({ items: [], totalItems: 0, subtotal: 0 });
//       }
//     } catch (error) {
//       console.error('Fetch cart error:', error);
//       if (isMounted.current) {
//         setCart({ items: [], totalItems: 0, subtotal: 0 });
//       }
//     } finally {
//       if (isMounted.current) {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     isMounted.current = true;
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   useEffect(() => {
//     if (isOpen) {
//       setLoading(true);
//       fetchCart();
//     }
//   }, [isOpen]);

//   // Handle cart update events
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       if (isOpen) {
//         fetchCart();
//       }
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, [isOpen]);

//   // Handle storage changes (for token/sessionId changes)
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'cartSessionId' || e.key === 'token') {
//         if (isOpen) {
//           console.log('🔄 Storage change detected:', e.key);
//           fetchCart();
//         }
//       }
//     };
    
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [isOpen]);

//   // Clean up debounce timers
//   useEffect(() => {
//     return () => {
//       Object.values(debounceTimerRef.current).forEach(timer => {
//         if (timer) clearTimeout(timer);
//       });
//       debounceTimerRef.current = {};
//     };
//   }, []);

//   // Also clear timers when cart closes
//   useEffect(() => {
//     if (!isOpen) {
//       Object.values(debounceTimerRef.current).forEach(timer => {
//         if (timer) clearTimeout(timer);
//       });
//       debounceTimerRef.current = {};
//     }
//   }, [isOpen]);

//   // Add color to cart
//   const addColorToCart = async (productId, color) => {
//     const existingColorItem = cart.items.find(
//       item => item.productId === productId && 
//               item.selectedColor === color
//     );
    
//     if (existingColorItem) {
//       toast.info(`${getColorName(color)} is already in your cart`);
//       return;
//     }
    
//     setAddingColor(prev => ({ ...prev, [productId]: true }));
    
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
//         (!item.selectedColor || item.selectedColor === '' || item.selectedColor === null || item.selectedColor === 'null' || item.selectedColor === 'undefined')
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
//         toast.success(`Added ${getColorName(color)} to cart!`);
//       } else {
//         toast.error(data.error || 'Failed to add color');
//       }
//     } catch (error) {
//       console.error('Add color error:', error);
//       toast.error('Network error');
//     } finally {
//       setAddingColor(prev => ({ ...prev, [productId]: false }));
//     }
//   };

//   // ========== FIXED: Quantity handlers with real-time total updates and debounce ==========

//   const handleQuantityInputChange = (e, itemId, currentItem) => {
//     const value = e.target.value;
    
//     if (debounceTimerRef.current[itemId]) {
//       clearTimeout(debounceTimerRef.current[itemId]);
//     }
    
//     if (value === '') {
//       setCart(prevCart => {
//         const updatedItems = prevCart.items.map(item => {
//           if (item._id === itemId) {
//             return { ...item, quantity: '' };
//           }
//           return item;
//         });
//         const { totalItems, subtotal } = recalculateTotals(updatedItems);
//         return { ...prevCart, items: updatedItems, totalItems, subtotal };
//       });
//       return;
//     }
    
//     if (/^\d+$/.test(value)) {
//       const numValue = parseInt(value);
//       if (numValue >= 1 && numValue <= currentItem?.stockQuantity) {
//         setCart(prevCart => {
//           const updatedItems = prevCart.items.map(item => {
//             if (item._id === itemId) {
//               return { ...item, quantity: numValue };
//             }
//             return item;
//           });
//           const { totalItems, subtotal } = recalculateTotals(updatedItems);
//           return { ...prevCart, items: updatedItems, totalItems, subtotal };
//         });
        
//         debounceTimerRef.current[itemId] = setTimeout(() => {
//           updateQuantity(itemId, numValue);
//         }, 500);
//       }
//     }
//   };

//   const handleQuantityBlur = (itemId, currentItem) => {
//     if (debounceTimerRef.current[itemId]) {
//       clearTimeout(debounceTimerRef.current[itemId]);
//       delete debounceTimerRef.current[itemId];
//     }
    
//     const item = cart.items.find(i => i._id === itemId);
//     if (!item) return;
    
//     let finalQuantity = parseInt(item.quantity);
    
//     if (isNaN(finalQuantity) || finalQuantity < 1) {
//       finalQuantity = 1;
//     } else if (finalQuantity > item.stockQuantity) {
//       finalQuantity = item.stockQuantity;
//       toast.error(`Only ${item.stockQuantity} items available`);
//     }
    
//     if (finalQuantity !== parseInt(item.quantity)) {
//       updateQuantity(itemId, finalQuantity);
//     } else if (item.quantity === '') {
//       updateQuantity(itemId, 1);
//     } else {
//       setCart(prevCart => {
//         const updatedItems = prevCart.items.map(i => {
//           if (i._id === itemId) {
//             return { ...i, quantity: finalQuantity };
//           }
//           return i;
//         });
//         const { totalItems, subtotal } = recalculateTotals(updatedItems);
//         return { ...prevCart, items: updatedItems, totalItems, subtotal };
//       });
//     }
//   };

//   const handleQuantityKeyDown = (e, itemId) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       if (debounceTimerRef.current[itemId]) {
//         clearTimeout(debounceTimerRef.current[itemId]);
//         delete debounceTimerRef.current[itemId];
//       }
//       const item = cart.items.find(i => i._id === itemId);
//       if (item) {
//         let finalQuantity = parseInt(item.quantity);
//         if (isNaN(finalQuantity) || finalQuantity < 1) {
//           finalQuantity = 1;
//         } else if (finalQuantity > item.stockQuantity) {
//           finalQuantity = item.stockQuantity;
//           toast.error(`Only ${item.stockQuantity} items available`);
//         }
//         updateQuantity(itemId, finalQuantity);
//       }
//     }
//   };

//   const updateQuantity = async (itemId, newQuantity) => {
//     if (isNaN(newQuantity) || newQuantity === null || newQuantity === '') {
//       return;
//     }
    
//     const parsedQuantity = parseInt(newQuantity, 10);
    
//     if (parsedQuantity < 1) {
//       removeItem(itemId);
//       return;
//     }
    
//     const currentItem = cart.items.find(item => item._id === itemId);
//     if (currentItem && parsedQuantity > currentItem.stockQuantity) {
//       toast.error(`Only ${currentItem.stockQuantity} items available`);
//       return;
//     }
    
//     setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
//     const previousCart = { ...cart };
    
//     setCart(prevCart => {
//       const updatedItems = prevCart.items.map(item => {
//         if (item._id === itemId) {
//           return { ...item, quantity: parsedQuantity };
//         }
//         return item;
//       });
//       const { totalItems, subtotal } = recalculateTotals(updatedItems);
//       return { ...prevCart, items: updatedItems, totalItems, subtotal };
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
//         body: JSON.stringify({ quantity: parsedQuantity })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         setCart(previousCart);
//         toast.error(data.error || 'Failed to update');
//       }
//     } catch (error) {
//       console.error('Update error:', error);
//       setCart(previousCart);
//       toast.error('Failed to update');
//     } finally {
//       setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
//     }
//   };

//   const removeItem = async (itemId) => {
//     if (debounceTimerRef.current[itemId]) {
//       clearTimeout(debounceTimerRef.current[itemId]);
//       delete debounceTimerRef.current[itemId];
//     }
    
//     setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
//     const previousCart = { ...cart };
    
//     setCart(prevCart => {
//       const updatedItems = prevCart.items.filter(item => item._id !== itemId);
//       const { totalItems, subtotal } = recalculateTotals(updatedItems);
//       return { ...prevCart, items: updatedItems, totalItems, subtotal };
//     });
    
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
//         setCart(previousCart);
//         toast.error(data.error || 'Failed to remove');
//       }
//     } catch (error) {
//       console.error('Remove error:', error);
//       setCart(previousCart);
//       toast.error('Failed to remove');
//     } finally {
//       setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
//     }
//   };

//   // Remove entire product
//   const removeProduct = async (productId) => {
//     const itemsToRemove = cart.items.filter(item => item.productId === productId);
//     itemsToRemove.forEach(item => {
//       if (debounceTimerRef.current[item._id]) {
//         clearTimeout(debounceTimerRef.current[item._id]);
//         delete debounceTimerRef.current[item._id];
//       }
//     });
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/cart/product/${productId}`, {
//         method: 'DELETE',
//         headers
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success('Product removed from cart');
//       } else {
//         toast.error(data.error || 'Failed to remove product');
//       }
//     } catch (error) {
//       console.error('Remove product error:', error);
//       toast.error('Failed to remove product');
//     }
//   };

//   const clearCart = async () => {
//     Object.values(debounceTimerRef.current).forEach(timer => {
//       if (timer) clearTimeout(timer);
//     });
//     debounceTimerRef.current = {};
    
//     setIsClearing(true);
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
//       let url = 'http://localhost:5000/api/cart';
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       } else {
//         toast.error('No session found');
//         setIsClearing(false);
//         return;
//       }
      
//       const response = await fetch(url, {
//         method: 'DELETE',
//         headers
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setCart({ items: [], totalItems: 0, subtotal: 0 });
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success('Cart cleared successfully');
//         setShowClearModal(false);
//       } else {
//         toast.error(data.error || 'Failed to clear cart');
//       }
//     } catch (error) {
//       console.error('Clear cart error:', error);
//       toast.error('Failed to clear cart');
//     } finally {
//       setIsClearing(false);
//     }
//   };

//   const proceedToCheckout = () => {
//     if (!cart?.items?.length) {
//       toast.error('Your cart is empty');
//       return;
//     }
    
//     const itemsNeedingColor = cart.items.filter(item => {
//       const availableColors = productColors[item.productId] || [];
      
//       if (availableColors.length === 0) {
//         return false;
//       }
      
//       const hasValidColor = item.selectedColor && 
//                            item.selectedColor !== '' && 
//                            item.selectedColor !== null && 
//                            item.selectedColor !== 'null' && 
//                            item.selectedColor !== 'undefined';
      
//       return !hasValidColor;
//     });
    
//     if (itemsNeedingColor.length > 0) {
//       toast.error(
//         <div className="space-y-1">
//           <p className="font-semibold">Please select colors for:</p>
//           <ul className="text-xs space-y-0.5 list-disc list-inside">
//             {itemsNeedingColor.slice(0, 3).map((item, i) => (
//               <li key={i}>{item.productName}</li>
//             ))}
//             {itemsNeedingColor.length > 3 && (
//               <li>And {itemsNeedingColor.length - 3} more item(s)...</li>
//             )}
//           </ul>
//           <p className="text-xs text-gray-500 mt-1">Click on a color swatch above to select</p>
//         </div>,
//         { duration: 5000 }
//       );
//       return;
//     }
    
//     onClose();
//     router.push('/checkout');
//   };

//   const handleShopNow = () => {
//     onClose();
//     router.push('/products');
//   };

//   const groupedItems = cart.items.length > 0 ? groupItemsByProduct(cart.items) : [];
//   const total = cart.subtotal || 0;

//   const hasMissingColors = cart.items.some(item => {
//     const availableColors = productColors[item.productId] || [];
//     if (availableColors.length === 0) return false;
    
//     const hasValidColor = item.selectedColor && 
//                          item.selectedColor !== '' && 
//                          item.selectedColor !== null && 
//                          item.selectedColor !== 'null' && 
//                          item.selectedColor !== 'undefined';
    
//     return !hasValidColor;
//   });

//   return (
//     <>
//       {/* Overlay */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
//           />
//         )}
//       </AnimatePresence>

//       {/* Cart Sidebar - Pink Theme */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ x: '100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '100%' }}
//             transition={{ type: 'tween', duration: 0.3 }}
//             className="fixed right-0 top-0 h-full bg-white shadow-2xl z-[9999] flex flex-col w-[85%] sm:w-[400px] md:w-[450px] lg:w-[33.333%]"
//           >
//             {/* Header - Pink background */}
//             <div className="flex items-center justify-between p-3 sm:p-4 border-b border-[#EE4275]/20 bg-white">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] flex items-center justify-center shadow-lg shadow-[#EE4275]/25">
//                   <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-base sm:text-lg font-bold text-[#2D1B2E]">
//                     Your Cart
//                   </h2>
//                   <p className="text-[8px] sm:text-[9px] text-[#EE4275] -mt-0.5">Beauty Bucket</p>
//                 </div>
//                 {cart.totalItems > 0 && (
//                   <span className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm">
//                     {cart.totalItems}
//                   </span>
//                 )}
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-1.5 sm:p-2 rounded-full hover:bg-[#F7C7D3]/20 transition-colors"
//               >
//                 <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-[#2D1B2E] transition-colors" />
//               </button>
//             </div>

//             {/* Cart Items - Light pink background */}
//             <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-[#FFF5F6]">
//               {loading ? (
//                 <div className="flex items-center justify-center py-20">
//                   <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#EE4275] animate-spin" />
//                 </div>
//               ) : cart.items.length === 0 ? (
//                 <div className="text-center py-12">
//                   <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-white rounded-full flex items-center justify-center border border-[#EE4275]/20 shadow-sm">
//                     <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-[#EE4275]/40" />
//                   </div>
//                   <p className="text-sm sm:text-base text-[#2D1B2E] mb-2">Your cart is empty</p>
//                   <p className="text-xs text-[#EE4275]/60 mb-4 sm:mb-6">Start shopping for amazing beauty products!</p>
//                   <button
//                     onClick={handleShopNow}
//                     className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-semibold text-sm sm:text-base rounded-full hover:shadow-lg hover:shadow-[#EE4275]/30 transition-all transform hover:scale-105"
//                   >
//                     <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
//                     Start Shopping
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-3 sm:space-y-4">
//                   {groupedItems.map((group) => {
//                     const hasColors = productColors[group.productId]?.length > 0;
//                     const availableColors = productColors[group.productId] || [];
//                     const price = group.discountPrice > 0 ? group.discountPrice : group.regularPrice;
//                     const selectedColorItems = group.colors || [];
//                     const hasNoColorItem = group.noColorItem;
                    
//                     return (
//                       <div key={group._id} className="bg-white rounded-xl border border-[#EE4275]/15 overflow-hidden hover:border-[#EE4275]/40 transition-all shadow-sm hover:shadow-md hover:shadow-[#EE4275]/10">
//                         {/* Product Header - Pink accent */}
//                         <div className="flex items-start gap-2 p-2 sm:p-3 bg-[#FFF5F6]/80 border-b border-[#EE4275]/10">
//                           <Link href={`/product/${group.productSlug || group.productId}`} onClick={onClose}>
//                             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#F7C7D3]/20 rounded-lg overflow-hidden border border-[#EE4275]/20 flex-shrink-0">
//                               <img
//                                 src={group.image || 'https://via.placeholder.com/64'}
//                                 alt={group.productName}
//                                 className="w-full h-full object-contain p-0.5 sm:p-1"
//                                 onError={(e) => {
//                                   e.target.src = 'https://via.placeholder.com/64?text=Beauty';
//                                 }}
//                               />
//                             </div>
//                           </Link>
//                           <div className="flex-1 min-w-0">
//                             <Link href={`/product/${group.productSlug || group.productId}`} onClick={onClose}>
//                               <h3 className="font-semibold text-xs sm:text-sm text-[#2D1B2E] hover:text-[#EE4275] transition-colors line-clamp-2" title={group.productName}>
//                                 {group.productName}
//                               </h3>
//                             </Link>
//                             <div className="flex items-center gap-2 mt-0.5 flex-wrap">
//                               <span className="text-sm sm:text-base font-bold text-[#EE4275]">
//                                 ৳{price.toFixed(2)}
//                               </span>
//                               {group.discountPrice > 0 && (
//                                 <span className="text-[10px] sm:text-xs text-gray-400 line-through">
//                                   ৳{group.regularPrice.toFixed(2)}
//                                 </span>
//                               )}
//                               <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] text-gray-500 bg-[#F7C7D3]/20 px-1.5 py-0.5 rounded-full">
//                                 <Scale className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//                                 /{getUnitLabel(group.unit)}
//                               </span>
//                               {selectedColorItems.length > 0 && (
//                                 <span className="text-[9px] sm:text-[10px] text-[#EE4275]/60">
//                                   {selectedColorItems.length} color{selectedColorItems.length > 1 ? 's' : ''}
//                                 </span>
//                               )}
//                             </div>
//                             {hasColors && selectedColorItems.length === 0 && (
//                               <div className="text-[9px] sm:text-[10px] text-orange-500 mt-0.5">
//                                 ⚠️ Select a color
//                               </div>
//                             )}
//                           </div>
                          
//                           {/* Remove Product - Red on hover */}
//                           <button
//                             onClick={() => removeProduct(group.productId)}
//                             className="p-1.5 text-gray-400/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
//                             title="Remove product"
//                           >
//                             <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                           </button>
//                         </div>

//                         {/* Color Product */}
//                         {hasColors && (
//                           <>
//                             {/* Available Colors */}
//                             <div className="p-2 sm:p-3 border-b border-[#EE4275]/10 bg-[#FFF5F6]/50">
//                               <p className="text-[10px] text-[#EE4275]/60 mb-1.5 flex items-center gap-1">
//                                 <Palette className="w-3 h-3 text-[#EE4275]" />
//                                 Colors:
//                               </p>
//                               <div className="flex flex-wrap gap-1.5">
//                                 {availableColors.map((color) => {
//                                   const isSelected = selectedColorItems.some(c => c.color === color);
//                                   const isAdding = addingColor[group.productId] && !isSelected;
                                  
//                                   return (
//                                     <button
//                                       key={color}
//                                       onClick={() => {
//                                         if (!isSelected) {
//                                           addColorToCart(group.productId, color);
//                                         }
//                                       }}
//                                       disabled={isSelected || isAdding}
//                                       className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
//                                         isSelected 
//                                           ? 'border-[#EE4275] shadow-md ring-2 ring-[#EE4275]/30 scale-110 cursor-default' 
//                                           : 'border-[#F7C7D3] hover:border-[#EE4275] cursor-pointer'
//                                       } ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                       style={{ backgroundColor: color }}
//                                       title={isSelected ? `${getColorName(color)} (Selected)` : `Click to add ${getColorName(color)}`}
//                                     >
//                                       {isSelected && (
//                                         <div className="absolute inset-0 flex items-center justify-center">
//                                           <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white drop-shadow-md" />
//                                         </div>
//                                       )}
//                                       {isAdding && (
//                                         <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
//                                           <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white animate-spin" />
//                                         </div>
//                                       )}
//                                     </button>
//                                   );
//                                 })}
//                               </div>
//                             </div>

//                             {/* Selected Colors */}
//                             {selectedColorItems.length > 0 && (
//                               <div className="p-2 sm:p-3 space-y-2">
//                                 {selectedColorItems.map((colorInfo) => (
//                                   <div key={colorInfo.itemId} className="flex items-center gap-2 p-2 bg-[#FFF5F6] rounded-lg border border-[#EE4275]/15">
//                                     {/* Color Swatch */}
//                                     <div 
//                                       className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#EE4275]/30 flex-shrink-0"
//                                       style={{ backgroundColor: colorInfo.color }}
//                                       title={getColorName(colorInfo.color)}
//                                     />
                                    
//                                     {/* Quantity Controls - Pink/Beauty */}
//                                     <div className="flex items-center border border-[#EE4275]/20 rounded-lg overflow-hidden bg-white ml-auto">
//                                       <button
//                                         onClick={() => updateQuantity(colorInfo.itemId, colorInfo.quantity - 1)}
//                                         disabled={updatingItems[colorInfo.itemId] || colorInfo.quantity <= 1}
//                                         className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-[#F7C7D3]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#EE4275]"
//                                       >
//                                         <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                                       </button>
                                      
//                                       <input
//                                         type="text"
//                                         value={colorInfo.quantity}
//                                         onChange={(e) => handleQuantityInputChange(e, colorInfo.itemId, colorInfo)}
//                                         onBlur={() => handleQuantityBlur(colorInfo.itemId, colorInfo)}
//                                         onKeyDown={(e) => handleQuantityKeyDown(e, colorInfo.itemId)}
//                                         className="w-8 sm:w-10 text-center text-xs sm:text-sm font-medium text-[#2D1B2E] bg-white focus:outline-none focus:ring-1 focus:ring-[#EE4275] py-0.5 rounded"
//                                         disabled={updatingItems[colorInfo.itemId]}
//                                       />
                                      
//                                       <button
//                                         onClick={() => updateQuantity(colorInfo.itemId, colorInfo.quantity + 1)}
//                                         disabled={updatingItems[colorInfo.itemId] || colorInfo.quantity >= colorInfo.stockQuantity}
//                                         className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-[#F7C7D3]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#EE4275]"
//                                       >
//                                         <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                                       </button>
//                                     </div>
                                    
//                                     {/* Remove Color */}
//                                     <button
//                                       onClick={() => removeItem(colorInfo.itemId)}
//                                       disabled={updatingItems[colorInfo.itemId]}
//                                       className="p-1 text-gray-400/40 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
//                                       title="Remove this color"
//                                     >
//                                       <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                                     </button>
//                                   </div>
//                                 ))}
//                               </div>
//                             )}
//                           </>
//                         )}

//                         {/* No Color Product */}
//                         {!hasColors && hasNoColorItem && (
//                           <div className="p-2 sm:p-3">
//                             <div className="flex items-center justify-between gap-2 p-2 bg-[#FFF5F6] rounded-lg border border-[#EE4275]/15">
//                               <span className="text-xs text-[#EE4275]/60">Quantity</span>
//                               <div className="flex items-center border border-[#EE4275]/20 rounded-lg overflow-hidden bg-white">
//                                 <button
//                                   onClick={() => updateQuantity(hasNoColorItem.itemId, hasNoColorItem.quantity - 1)}
//                                   disabled={updatingItems[hasNoColorItem.itemId] || hasNoColorItem.quantity <= 1}
//                                   className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-[#F7C7D3]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#EE4275]"
//                                 >
//                                   <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                                 </button>
                                
//                                 <input
//                                   type="text"
//                                   value={hasNoColorItem.quantity}
//                                   onChange={(e) => handleQuantityInputChange(e, hasNoColorItem.itemId, hasNoColorItem)}
//                                   onBlur={() => handleQuantityBlur(hasNoColorItem.itemId, hasNoColorItem)}
//                                   onKeyDown={(e) => handleQuantityKeyDown(e, hasNoColorItem.itemId)}
//                                   className="w-8 sm:w-10 text-center text-xs sm:text-sm font-medium text-[#2D1B2E] bg-white focus:outline-none focus:ring-1 focus:ring-[#EE4275] py-0.5 rounded"
//                                   disabled={updatingItems[hasNoColorItem.itemId]}
//                                 />
                                
//                                 <button
//                                   onClick={() => updateQuantity(hasNoColorItem.itemId, hasNoColorItem.quantity + 1)}
//                                   disabled={updatingItems[hasNoColorItem.itemId] || hasNoColorItem.quantity >= hasNoColorItem.stockQuantity}
//                                   className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-[#F7C7D3]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#EE4275]"
//                                 >
//                                   <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
                  
//                   {/* Clear Cart Button */}
//                   <button
//                     onClick={() => setShowClearModal(true)}
//                     disabled={isClearing}
//                     className="text-gray-400/60 hover:text-red-500 text-xs sm:text-sm transition-colors mt-2 block text-center w-full py-1.5 sm:py-2 hover:bg-red-50 rounded-lg"
//                   >
//                     {isClearing ? (
//                       <span className="flex items-center justify-center gap-1.5 sm:gap-2">
//                         <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-[#EE4275]" />
//                         Clearing...
//                       </span>
//                     ) : (
//                       'Clear Cart'
//                     )}
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Order Summary - Pink Theme */}
//             {cart.items.length > 0 && (
//               <div className="border-t border-[#EE4275]/20 p-3 sm:p-4 bg-white">
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="font-bold text-[#2D1B2E] text-base sm:text-lg">
//                     Total Amount
//                   </span>
//                   <span className="font-bold text-xl sm:text-2xl text-[#EE4275]">
//                     ৳{total.toFixed(2)}
//                   </span>
//                 </div>
                
//                 {hasMissingColors && (
//                   <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
//                     <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <p className="text-[10px] sm:text-xs text-orange-600 font-medium">
//                         Please select colors for all items
//                       </p>
//                       <p className="text-[9px] sm:text-[10px] text-orange-500 mt-0.5">
//                         Click on color swatches above to select
//                       </p>
//                     </div>
//                   </div>
//                 )}
                
//                 <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
//                   <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-green-600">
//                     <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
//                     <span>Secure checkout &amp; 7-day returns</span>
//                   </div>
//                   <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[#EE4275]">
//                     <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
//                     <span>Free shipping on orders over ৳3000</span>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={proceedToCheckout}
//                   disabled={hasMissingColors}
//                   className={`w-full mt-3 sm:mt-4 py-2.5 sm:py-3 font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
//                     hasMissingColors 
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
//                       : 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white hover:shadow-lg hover:shadow-[#EE4275]/30 transition-all hover:scale-[1.02]'
//                   }`}
//                 >
//                   <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   {hasMissingColors ? 'Select Colors First' : 'Proceed to Checkout'}
//                   {!hasMissingColors && <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
//                 </button>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Clear Cart Confirmation Modal - Pink Theme */}
//       <AnimatePresence>
//         {showClearModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
//             onClick={() => setShowClearModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: 'spring', damping: 25, stiffness: 300 }}
//               className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden border border-[#EE4275]/20"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-center mb-4">
//                   <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center border border-red-200">
//                     <AlertTriangle className="w-7 h-7 text-red-500" />
//                   </div>
//                 </div>
                
//                 <h3 className="text-xl font-bold text-center text-[#2D1B2E] mb-2">
//                   Clear Cart?
//                 </h3>
                
//                 <p className="text-[#EE4275]/60 text-center mb-6 text-sm">
//                   Are you sure you want to remove all items from your cart? This action cannot be undone.
//                 </p>
                
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setShowClearModal(false)}
//                     className="flex-1 px-4 py-2.5 border border-[#EE4275]/30 text-[#2D1B2E] font-medium rounded-full hover:bg-[#FFF5F6] transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={clearCart}
//                     disabled={isClearing}
//                     className="flex-1 px-4 py-2.5 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {isClearing ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Clearing...
//                       </>
//                     ) : (
//                       'Yes, Clear Cart'
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  X,
  CreditCard,
  ShieldCheck,
  Loader2,
  ChevronRight,
  AlertCircle,
  AlertTriangle,
  ShoppingBag,
  Scale,
  Check,
  Palette,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

// Font constants
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// Helper function to get unit label
const getUnitLabel = (unit) => {
  const units = {
    'pcs': 'pcs',
    'ton': 'ton',
    'other': 'unit'
  };
  return units[unit] || unit;
};

// Helper function to get color name
const getColorName = (color) => {
  const colorMap = {
    '#000000': 'Black',
    '#FFFFFF': 'White',
    '#FF0000': 'Red',
    '#00FF00': 'Green',
    '#0000FF': 'Blue',
    '#FFFF00': 'Yellow',
    '#FF00FF': 'Magenta',
    '#00FFFF': 'Cyan',
    '#FFA500': 'Orange',
    '#800080': 'Purple',
    '#008000': 'Dark Green',
    '#FFC0CB': 'Pink',
    '#A52A2A': 'Brown',
    '#808080': 'Gray',
    '#C0C0C0': 'Silver',
    '#4A90E2': 'Blue',
    '#FF6B6B': 'Red',
    '#4ECDC4': 'Teal',
    '#45B7D1': 'Sky Blue',
    '#96CEB4': 'Mint',
    '#FFEAA7': 'Cream',
    '#DDA0DD': 'Plum',
    '#98D8C8': 'Seafoam',
    '#F7DC6F': 'Gold',
    '#BB8FCE': 'Lavender'
  };
  return colorMap[color] || color;
};

// ========== HELPER FUNCTION: Recalculate Cart Totals ==========
const recalculateTotals = (items) => {
  const validItems = items.filter(item => typeof item.quantity === 'number' && item.quantity > 0);
  const totalItems = validItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = validItems.reduce((sum, item) => {
    const price = (item.discountPrice > 0 ? item.discountPrice : item.regularPrice);
    return sum + (price * (item.quantity || 0));
  }, 0);
  return { totalItems, subtotal };
};

export default function CartSidebar({ isOpen, onClose }) {
  const router = useRouter();
  const [cart, setCart] = useState({ items: [], totalItems: 0, subtotal: 0 });
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState({});
  const [isClearing, setIsClearing] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [productColors, setProductColors] = useState({});
  const [addingColor, setAddingColor] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const isMounted = useRef(true);
  const debounceTimerRef = useRef({});

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Listen for auth changes (login/logout)
  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem('token');
      const newIsLoggedIn = !!token;
      setIsLoggedIn(newIsLoggedIn);
      
      if (newIsLoggedIn && isOpen) {
        console.log('🔐 Auth change detected - Refreshing cart');
        fetchCart();
      }
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', (e) => {
      if (e.key === 'token') {
        handleAuthChange();
      }
    });

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [isOpen]);

  // ✅ OPTIMIZED: Batch fetch product colors in one API call
  const fetchProductColors = async (items) => {
    if (!items || items.length === 0) return {};
    
    const uniqueProductIds = [...new Set(items.map(item => item.productId))];
    if (uniqueProductIds.length === 0) return {};
    
    try {
      const response = await fetch('http://localhost:5000/api/products/colors-by-ids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds: uniqueProductIds })
      });
      
      const data = await response.json();
      return data.success ? data.data : {};
    } catch (error) {
      console.error('Error fetching product colors:', error);
      return {};
    }
  };

  // Group cart items by productId
  const groupItemsByProduct = (items) => {
    const grouped = {};
    items.forEach(item => {
      const productId = item.productId.toString();
      if (!grouped[productId]) {
        grouped[productId] = {
          ...item,
          colors: [],
          totalQuantity: 0,
          totalPrice: 0,
          selectedColors: []
        };
      }
      
      const hasValidColor = item.selectedColor && 
                           item.selectedColor !== '' && 
                           item.selectedColor !== null && 
                           item.selectedColor !== 'null' && 
                           item.selectedColor !== 'undefined';
      
      if (hasValidColor) {
        grouped[productId].colors.push({
          color: item.selectedColor,
          quantity: item.quantity,
          itemId: item._id,
          price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice,
          stockQuantity: item.stockQuantity
        });
        grouped[productId].selectedColors.push(item.selectedColor);
      } else {
        grouped[productId].noColorItem = {
          itemId: item._id,
          quantity: item.quantity,
          price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice,
          stockQuantity: item.stockQuantity
        };
      }
      
      grouped[productId].totalQuantity += item.quantity;
      grouped[productId].totalPrice += (item.discountPrice > 0 ? item.discountPrice : item.regularPrice) * item.quantity;
    });
    return Object.values(grouped);
  };

  // ========== FETCH CART ==========
  const fetchCart = async () => {
    if (!isMounted.current) return;
    
    try {
      const token = localStorage.getItem('token');
      let sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (!token && !sessionId) {
        sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        localStorage.setItem('cartSessionId', sessionId);
        console.log('🆕 Generated new session ID:', sessionId);
      }
      
      console.log('🔍 Fetching cart - Token:', token ? 'Yes' : 'No', 'SessionId:', sessionId || 'None');
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('🔐 Fetching user cart with token');
        
        const response = await fetch('http://localhost:5000/api/cart/user', { headers });
        const data = await response.json();
        
        if (!isMounted.current) return;
        
        if (data.success) {
          console.log('📦 User cart fetched:', data.data.items.length, 'items');
          setCart(data.data);
          const colors = await fetchProductColors(data.data.items || []);
          setProductColors(colors);
        } else {
          console.error('Failed to fetch user cart:', data.error);
          setCart({ items: [], totalItems: 0, subtotal: 0 });
        }
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
        console.log('👤 Fetching guest cart with sessionId');
        
        const response = await fetch('http://localhost:5000/api/cart', { headers });
        const data = await response.json();
        
        if (!isMounted.current) return;
        
        if (data.success) {
          console.log('📦 Guest cart fetched:', data.data.items.length, 'items');
          setCart(data.data);
          const colors = await fetchProductColors(data.data.items || []);
          setProductColors(colors);
        } else {
          if (data.error === 'Session not found' || data.error === 'Invalid session') {
            localStorage.removeItem('cartSessionId');
            console.log('🔄 Invalid session, clearing and retrying');
            await fetchCart();
            return;
          }
          setCart({ items: [], totalItems: 0, subtotal: 0 });
        }
      } else {
        console.log('📭 No auth found, empty cart');
        setCart({ items: [], totalItems: 0, subtotal: 0 });
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
      if (isMounted.current) {
        setCart({ items: [], totalItems: 0, subtotal: 0 });
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchCart();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleCartUpdate = () => {
      if (isOpen) {
        fetchCart();
      }
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [isOpen]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cartSessionId' || e.key === 'token') {
        if (isOpen) {
          console.log('🔄 Storage change detected:', e.key);
          fetchCart();
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      Object.values(debounceTimerRef.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
      debounceTimerRef.current = {};
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      Object.values(debounceTimerRef.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
      debounceTimerRef.current = {};
    }
  }, [isOpen]);

  const addColorToCart = async (productId, color) => {
    const existingColorItem = cart.items.find(
      item => item.productId === productId && 
              item.selectedColor === color
    );
    
    if (existingColorItem) {
      toast.info(`${getColorName(color)} is already in your cart`);
      return;
    }
    
    setAddingColor(prev => ({ ...prev, [productId]: true }));
    
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
        (!item.selectedColor || item.selectedColor === '' || item.selectedColor === null || item.selectedColor === 'null' || item.selectedColor === 'undefined')
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
        toast.success(`Added ${getColorName(color)} to cart!`);
      } else {
        toast.error(data.error || 'Failed to add color');
      }
    } catch (error) {
      console.error('Add color error:', error);
      toast.error('Network error');
    } finally {
      setAddingColor(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleQuantityInputChange = (e, itemId, currentItem) => {
    const value = e.target.value;
    
    if (debounceTimerRef.current[itemId]) {
      clearTimeout(debounceTimerRef.current[itemId]);
    }
    
    if (value === '') {
      setCart(prevCart => {
        const updatedItems = prevCart.items.map(item => {
          if (item._id === itemId) {
            return { ...item, quantity: '' };
          }
          return item;
        });
        const { totalItems, subtotal } = recalculateTotals(updatedItems);
        return { ...prevCart, items: updatedItems, totalItems, subtotal };
      });
      return;
    }
    
    if (/^\d+$/.test(value)) {
      const numValue = parseInt(value);
      if (numValue >= 1 && numValue <= currentItem?.stockQuantity) {
        setCart(prevCart => {
          const updatedItems = prevCart.items.map(item => {
            if (item._id === itemId) {
              return { ...item, quantity: numValue };
            }
            return item;
          });
          const { totalItems, subtotal } = recalculateTotals(updatedItems);
          return { ...prevCart, items: updatedItems, totalItems, subtotal };
        });
        
        debounceTimerRef.current[itemId] = setTimeout(() => {
          updateQuantity(itemId, numValue);
        }, 500);
      }
    }
  };

  const handleQuantityBlur = (itemId, currentItem) => {
    if (debounceTimerRef.current[itemId]) {
      clearTimeout(debounceTimerRef.current[itemId]);
      delete debounceTimerRef.current[itemId];
    }
    
    const item = cart.items.find(i => i._id === itemId);
    if (!item) return;
    
    let finalQuantity = parseInt(item.quantity);
    
    if (isNaN(finalQuantity) || finalQuantity < 1) {
      finalQuantity = 1;
    } else if (finalQuantity > item.stockQuantity) {
      finalQuantity = item.stockQuantity;
      toast.error(`Only ${item.stockQuantity} items available`);
    }
    
    if (finalQuantity !== parseInt(item.quantity)) {
      updateQuantity(itemId, finalQuantity);
    } else if (item.quantity === '') {
      updateQuantity(itemId, 1);
    } else {
      setCart(prevCart => {
        const updatedItems = prevCart.items.map(i => {
          if (i._id === itemId) {
            return { ...i, quantity: finalQuantity };
          }
          return i;
        });
        const { totalItems, subtotal } = recalculateTotals(updatedItems);
        return { ...prevCart, items: updatedItems, totalItems, subtotal };
      });
    }
  };

  const handleQuantityKeyDown = (e, itemId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (debounceTimerRef.current[itemId]) {
        clearTimeout(debounceTimerRef.current[itemId]);
        delete debounceTimerRef.current[itemId];
      }
      const item = cart.items.find(i => i._id === itemId);
      if (item) {
        let finalQuantity = parseInt(item.quantity);
        if (isNaN(finalQuantity) || finalQuantity < 1) {
          finalQuantity = 1;
        } else if (finalQuantity > item.stockQuantity) {
          finalQuantity = item.stockQuantity;
          toast.error(`Only ${item.stockQuantity} items available`);
        }
        updateQuantity(itemId, finalQuantity);
      }
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (isNaN(newQuantity) || newQuantity === null || newQuantity === '') {
      return;
    }
    
    const parsedQuantity = parseInt(newQuantity, 10);
    
    if (parsedQuantity < 1) {
      removeItem(itemId);
      return;
    }
    
    const currentItem = cart.items.find(item => item._id === itemId);
    if (currentItem && parsedQuantity > currentItem.stockQuantity) {
      toast.error(`Only ${currentItem.stockQuantity} items available`);
      return;
    }
    
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
    const previousCart = { ...cart };
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => {
        if (item._id === itemId) {
          return { ...item, quantity: parsedQuantity };
        }
        return item;
      });
      const { totalItems, subtotal } = recalculateTotals(updatedItems);
      return { ...prevCart, items: updatedItems, totalItems, subtotal };
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
        body: JSON.stringify({ quantity: parsedQuantity })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
      } else {
        setCart(previousCart);
        toast.error(data.error || 'Failed to update');
      }
    } catch (error) {
      console.error('Update error:', error);
      setCart(previousCart);
      toast.error('Failed to update');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const removeItem = async (itemId) => {
    if (debounceTimerRef.current[itemId]) {
      clearTimeout(debounceTimerRef.current[itemId]);
      delete debounceTimerRef.current[itemId];
    }
    
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
    const previousCart = { ...cart };
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item._id !== itemId);
      const { totalItems, subtotal } = recalculateTotals(updatedItems);
      return { ...prevCart, items: updatedItems, totalItems, subtotal };
    });
    
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
        setCart(previousCart);
        toast.error(data.error || 'Failed to remove');
      }
    } catch (error) {
      console.error('Remove error:', error);
      setCart(previousCart);
      toast.error('Failed to remove');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const removeProduct = async (productId) => {
    const itemsToRemove = cart.items.filter(item => item.productId === productId);
    itemsToRemove.forEach(item => {
      if (debounceTimerRef.current[item._id]) {
        clearTimeout(debounceTimerRef.current[item._id]);
        delete debounceTimerRef.current[item._id];
      }
    });
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/product/${productId}`, {
        method: 'DELETE',
        headers
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Product removed from cart');
      } else {
        toast.error(data.error || 'Failed to remove product');
      }
    } catch (error) {
      console.error('Remove product error:', error);
      toast.error('Failed to remove product');
    }
  };

  const clearCart = async () => {
    Object.values(debounceTimerRef.current).forEach(timer => {
      if (timer) clearTimeout(timer);
    });
    debounceTimerRef.current = {};
    
    setIsClearing(true);
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      let url = 'http://localhost:5000/api/cart';
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      } else {
        toast.error('No session found');
        setIsClearing(false);
        return;
      }
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart({ items: [], totalItems: 0, subtotal: 0 });
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Cart cleared successfully');
        setShowClearModal(false);
      } else {
        toast.error(data.error || 'Failed to clear cart');
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      toast.error('Failed to clear cart');
    } finally {
      setIsClearing(false);
    }
  };

  const proceedToCheckout = () => {
    if (!cart?.items?.length) {
      toast.error('Your cart is empty');
      return;
    }
    
    const itemsNeedingColor = cart.items.filter(item => {
      const availableColors = productColors[item.productId] || [];
      
      if (availableColors.length === 0) {
        return false;
      }
      
      const hasValidColor = item.selectedColor && 
                           item.selectedColor !== '' && 
                           item.selectedColor !== null && 
                           item.selectedColor !== 'null' && 
                           item.selectedColor !== 'undefined';
      
      return !hasValidColor;
    });
    
    if (itemsNeedingColor.length > 0) {
      toast.error(
        <div className="space-y-1">
          <p className="font-semibold">Please select colors for:</p>
          <ul className="text-xs space-y-0.5 list-disc list-inside">
            {itemsNeedingColor.slice(0, 3).map((item, i) => (
              <li key={i}>{item.productName}</li>
            ))}
            {itemsNeedingColor.length > 3 && (
              <li>And {itemsNeedingColor.length - 3} more item(s)...</li>
            )}
          </ul>
          <p className="text-xs text-gray-500 mt-1">Click on a color swatch above to select</p>
        </div>,
        { duration: 5000 }
      );
      return;
    }
    
    onClose();
    router.push('/checkout');
  };

  const handleShopNow = () => {
    onClose();
    router.push('/products');
  };

  const groupedItems = cart.items.length > 0 ? groupItemsByProduct(cart.items) : [];
  const total = cart.subtotal || 0;

  const hasMissingColors = cart.items.some(item => {
    const availableColors = productColors[item.productId] || [];
    if (availableColors.length === 0) return false;
    
    const hasValidColor = item.selectedColor && 
                         item.selectedColor !== '' && 
                         item.selectedColor !== null && 
                         item.selectedColor !== 'null' && 
                         item.selectedColor !== 'undefined';
    
    return !hasValidColor;
  });

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
          />
        )}
      </AnimatePresence>

      {/* Cart Sidebar - Green Theme */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full bg-white shadow-2xl z-[9999] flex flex-col w-[85%] sm:w-[400px] md:w-[450px] lg:w-[33.333%]"
          >
            {/* Header - Green background */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-[#8B9D83]/20 bg-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] flex items-center justify-center shadow-lg shadow-[#8B9D83]/25">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
                    Your Shopping Bag
                  </h2>
                  <p className="text-[8px] sm:text-[9px] text-[#8B9D83] -mt-0.5" style={{ fontFamily: FONT_FAMILY }}>Beauty Bucket</p>
                </div>
                {cart.totalItems > 0 && (
                  <span className="bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm">
                    {cart.totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-full hover:bg-[#c5d5be]/20 transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-[#263b32] transition-colors" />
              </button>
            </div>

            {/* Cart Items - Light green background */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-[#f0f5ed]">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#8B9D83] animate-spin" />
                </div>
              ) : cart.items.length === 0 ? (
                <div className="text-center py-12">
                  {/* Animated Empty Cart - Lottie Animation */}
                  {/* <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 sm:mb-4 bg-white rounded-full flex items-center justify-center border border-[#8B9D83]/20 shadow-sm overflow-hidden"> */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-1 md:mb-1 md:ml-32 ">
                    <DotLottieReact
                      src="/animations/shopping-cart.lottie"
                      loop
                      autoplay
                      className="w-20 h-20 md:w-28 md:h-28"
                    />
                  </div>
                  <p className="text-sm sm:text-base text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
                    Your Shpping Bag is empty
                  </p>
                  <p className="text-xs text-[#8B9D83]/60 mb-4 sm:mb-6" style={{ fontFamily: FONT_FAMILY }}>
                    Start shopping for amazing beauty products!
                  </p>
                  <button
                    onClick={handleShopNow}
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white font-semibold text-sm sm:text-base rounded-full hover:shadow-lg hover:shadow-[#8B9D83]/30 transition-all transform hover:scale-105"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {groupedItems.map((group) => {
                    const hasColors = productColors[group.productId]?.length > 0;
                    const availableColors = productColors[group.productId] || [];
                    const price = group.discountPrice > 0 ? group.discountPrice : group.regularPrice;
                    const selectedColorItems = group.colors || [];
                    const hasNoColorItem = group.noColorItem;
                    
                    return (
                      <div key={group._id} className="bg-white rounded-xl border border-[#8B9D83]/15 overflow-hidden hover:border-[#8B9D83]/40 transition-all shadow-sm hover:shadow-md hover:shadow-[#8B9D83]/10">
                        {/* Product Header - Green accent */}
                        <div className="flex items-start gap-2 p-2 sm:p-3 bg-[#f0f5ed]/80 border-b border-[#8B9D83]/10">
                          <Link href={`/product/${group.productSlug || group.productId}`} onClick={onClose}>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#c5d5be]/20 rounded-lg overflow-hidden border border-[#8B9D83]/20 flex-shrink-0">
                              <img
                                src={group.image || 'https://via.placeholder.com/64'}
                                alt={group.productName}
                                className="w-full h-full object-contain p-0.5 sm:p-1"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/64?text=Beauty';
                                }}
                              />
                            </div>
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link href={`/product/${group.productSlug || group.productId}`} onClick={onClose}>
                              <h3 className="font-semibold text-xs sm:text-sm text-[#263b32] hover:text-[#8B9D83] transition-colors line-clamp-2" style={{ fontFamily: FONT_FAMILY }} title={group.productName}>
                                {group.productName}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              <span className="text-sm sm:text-base font-bold text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
                                ৳{price.toFixed(2)}
                              </span>
                              {group.discountPrice > 0 && (
                                <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                                  ৳{group.regularPrice.toFixed(2)}
                                </span>
                              )}
                              <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] text-gray-500 bg-[#c5d5be]/20 px-1.5 py-0.5 rounded-full">
                                <Scale className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                                /{getUnitLabel(group.unit)}
                              </span>
                              {selectedColorItems.length > 0 && (
                                <span className="text-[9px] sm:text-[10px] text-[#8B9D83]/60">
                                  {selectedColorItems.length} color{selectedColorItems.length > 1 ? 's' : ''}
                                </span>
                              )}
                            </div>
                            {hasColors && selectedColorItems.length === 0 && (
                              <div className="text-[9px] sm:text-[10px] text-orange-500 mt-0.5">
                                ⚠️ Select a color
                              </div>
                            )}
                          </div>
                          
                          {/* Remove Product */}
                          <button
                            onClick={() => removeProduct(group.productId)}
                            className="p-1.5 text-gray-400/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                            title="Remove product"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>

                        {/* Color Product */}
                        {hasColors && (
                          <>
                            {/* Available Colors */}
                            <div className="p-2 sm:p-3 border-b border-[#8B9D83]/10 bg-[#f0f5ed]/50">
                              <p className="text-[10px] text-[#8B9D83]/60 mb-1.5 flex items-center gap-1" style={{ fontFamily: FONT_FAMILY }}>
                                <Palette className="w-3 h-3 text-[#8B9D83]" />
                                Colors:
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {availableColors.map((color) => {
                                  const isSelected = selectedColorItems.some(c => c.color === color);
                                  const isAdding = addingColor[group.productId] && !isSelected;
                                  
                                  return (
                                    <button
                                      key={color}
                                      onClick={() => {
                                        if (!isSelected) {
                                          addColorToCart(group.productId, color);
                                        }
                                      }}
                                      disabled={isSelected || isAdding}
                                      className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                                        isSelected 
                                          ? 'border-[#8B9D83] shadow-md ring-2 ring-[#8B9D83]/30 scale-110 cursor-default' 
                                          : 'border-[#c5d5be] hover:border-[#8B9D83] cursor-pointer'
                                      } ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
                                      style={{ backgroundColor: color }}
                                      title={isSelected ? `${getColorName(color)} (Selected)` : `Click to add ${getColorName(color)}`}
                                    >
                                      {isSelected && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white drop-shadow-md" />
                                        </div>
                                      )}
                                      {isAdding && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                                          <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white animate-spin" />
                                        </div>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Selected Colors */}
                            {selectedColorItems.length > 0 && (
                              <div className="p-2 sm:p-3 space-y-2">
                                {selectedColorItems.map((colorInfo) => (
                                  <div key={colorInfo.itemId} className="flex items-center gap-2 p-2 bg-[#f0f5ed] rounded-lg border border-[#8B9D83]/15">
                                    {/* Color Swatch */}
                                    <div 
                                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#8B9D83]/30 flex-shrink-0"
                                      style={{ backgroundColor: colorInfo.color }}
                                      title={getColorName(colorInfo.color)}
                                    />
                                    
                                    {/* Quantity Controls - Green/Beauty */}
                                    <div className="flex items-center border border-[#8B9D83]/20 rounded-lg overflow-hidden bg-white ml-auto">
                                      <button
                                        onClick={() => updateQuantity(colorInfo.itemId, colorInfo.quantity - 1)}
                                        disabled={updatingItems[colorInfo.itemId] || colorInfo.quantity <= 1}
                                        className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-[#c5d5be]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#8B9D83]"
                                      >
                                        <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                      </button>
                                      
                                      <input
                                        type="text"
                                        value={colorInfo.quantity}
                                        onChange={(e) => handleQuantityInputChange(e, colorInfo.itemId, colorInfo)}
                                        onBlur={() => handleQuantityBlur(colorInfo.itemId, colorInfo)}
                                        onKeyDown={(e) => handleQuantityKeyDown(e, colorInfo.itemId)}
                                        className="w-8 sm:w-10 text-center text-xs sm:text-sm font-medium text-[#263b32] bg-white focus:outline-none focus:ring-1 focus:ring-[#8B9D83] py-0.5 rounded"
                                        style={{ fontFamily: FONT_FAMILY }}
                                        disabled={updatingItems[colorInfo.itemId]}
                                      />
                                      
                                      <button
                                        onClick={() => updateQuantity(colorInfo.itemId, colorInfo.quantity + 1)}
                                        disabled={updatingItems[colorInfo.itemId] || colorInfo.quantity >= colorInfo.stockQuantity}
                                        className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-[#c5d5be]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#8B9D83]"
                                      >
                                        <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                      </button>
                                    </div>
                                    
                                    {/* Remove Color */}
                                    <button
                                      onClick={() => removeItem(colorInfo.itemId)}
                                      disabled={updatingItems[colorInfo.itemId]}
                                      className="p-1 text-gray-400/40 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                      title="Remove this color"
                                    >
                                      <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}

                        {/* No Color Product */}
                        {!hasColors && hasNoColorItem && (
                          <div className="p-2 sm:p-3">
                            <div className="flex items-center justify-between gap-2 p-2 bg-[#f0f5ed] rounded-lg border border-[#8B9D83]/15">
                              <span className="text-xs text-[#8B9D83]/60" style={{ fontFamily: FONT_FAMILY }}>Quantity</span>
                              <div className="flex items-center border border-[#8B9D83]/20 rounded-lg overflow-hidden bg-white">
                                <button
                                  onClick={() => updateQuantity(hasNoColorItem.itemId, hasNoColorItem.quantity - 1)}
                                  disabled={updatingItems[hasNoColorItem.itemId] || hasNoColorItem.quantity <= 1}
                                  className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-[#c5d5be]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#8B9D83]"
                                >
                                  <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                </button>
                                
                                <input
                                  type="text"
                                  value={hasNoColorItem.quantity}
                                  onChange={(e) => handleQuantityInputChange(e, hasNoColorItem.itemId, hasNoColorItem)}
                                  onBlur={() => handleQuantityBlur(hasNoColorItem.itemId, hasNoColorItem)}
                                  onKeyDown={(e) => handleQuantityKeyDown(e, hasNoColorItem.itemId)}
                                  className="w-8 sm:w-10 text-center text-xs sm:text-sm font-medium text-[#263b32] bg-white focus:outline-none focus:ring-1 focus:ring-[#8B9D83] py-0.5 rounded"
                                  style={{ fontFamily: FONT_FAMILY }}
                                  disabled={updatingItems[hasNoColorItem.itemId]}
                                />
                                
                                <button
                                  onClick={() => updateQuantity(hasNoColorItem.itemId, hasNoColorItem.quantity + 1)}
                                  disabled={updatingItems[hasNoColorItem.itemId] || hasNoColorItem.quantity >= hasNoColorItem.stockQuantity}
                                  className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-[#c5d5be]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#8B9D83]"
                                >
                                  <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Clear Cart Button */}
                  <button
                    onClick={() => setShowClearModal(true)}
                    disabled={isClearing}
                    className="text-gray-400/60 hover:text-red-500 text-xs sm:text-sm transition-colors mt-2 block text-center w-full py-1.5 sm:py-2 hover:bg-red-50 rounded-lg"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    {isClearing ? (
                      <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-[#8B9D83]" />
                        Clearing...
                      </span>
                    ) : (
                      'Clear Cart'
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary - Green Theme */}
            {cart.items.length > 0 && (
              <div className="border-t border-[#8B9D83]/20 p-3 sm:p-4 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-[#263b32] text-base sm:text-lg" style={{ fontFamily: FONT_FAMILY }}>
                    Total Amount
                  </span>
                  <span className="font-bold text-xl sm:text-2xl text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
                    ৳{total.toFixed(2)}
                  </span>
                </div>
                
                {hasMissingColors && (
                  <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] sm:text-xs text-orange-600 font-medium" style={{ fontFamily: FONT_FAMILY }}>
                        Please select colors for all items
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-orange-500 mt-0.5" style={{ fontFamily: FONT_FAMILY }}>
                        Click on color swatches above to select
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-green-600" style={{ fontFamily: FONT_FAMILY }}>
                    <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                    <span>Secure checkout &amp; 7-day returns</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
                    <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                    <span>Free shipping on orders over ৳3000</span>
                  </div>
                </div>
                
                <button
                  onClick={proceedToCheckout}
                  disabled={hasMissingColors}
                  className={`w-full mt-3 sm:mt-4 py-2.5 sm:py-3 font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
                    hasMissingColors 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white hover:shadow-lg hover:shadow-[#8B9D83]/30 transition-all hover:scale-[1.02]'
                  }`}
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {hasMissingColors ? 'Select Colors First' : 'Proceed to Checkout'}
                  {!hasMissingColors && <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clear Cart Confirmation Modal - Green Theme */}
      <AnimatePresence>
        {showClearModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
            onClick={() => setShowClearModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden border border-[#8B9D83]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center border border-red-200">
                    <AlertTriangle className="w-7 h-7 text-red-500" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-center text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
                  Clear Bag?
                </h3>
                
                <p className="text-[#8B9D83]/60 text-center mb-6 text-sm" style={{ fontFamily: FONT_FAMILY }}>
                  Are you sure you want to remove all items from your Bag? This action cannot be undone.
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowClearModal(false)}
                    className="flex-1 px-4 py-2.5 border border-[#8B9D83]/30 text-[#263b32] font-medium rounded-full hover:bg-[#f0f5ed] transition-colors"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={clearCart}
                    disabled={isClearing}
                    className="flex-1 px-4 py-2.5 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    {isClearing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Clearing...
                      </>
                    ) : (
                      'Yes, Clear Cart'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}