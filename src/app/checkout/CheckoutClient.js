
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { AlertCircle, Check, Loader2, Palette, Zap } from 'lucide-react';


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
        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus-within:ring-2 focus-within:ring-black focus-within:border-transparent cursor-pointer flex items-center justify-between transition-all ${
          disabled ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white'
        } ${error ? 'border-red-500' : 'border-black/20 hover:border-black/60'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`text-sm ${selectedOption ? 'text-black font-medium' : 'text-[#64748B]'}`}>
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
              className="text-[#64748B] hover:text-black"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          )}
          <FaChevronDown className={`w-3 h-3 text-[#64748B] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-black/20 rounded-xl shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b border-black/10">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-3.5 h-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
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
                  className="w-full px-4 py-2.5 text-left hover:bg-[#E2E7EA] transition-colors text-sm text-black"
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-[#64748B] text-center">
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

// Payment Selector
const PaymentSelector = ({ onSubmit, isSubmitting, disabled }) => {
  return (
    <div>
      <div className="bg-gradient-to-r from-black/10 to-black/10 rounded-xl p-4 border-2 border-black/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/25">
            <FaMoneyBillWave className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-black text-sm">Cash on Delivery</h4>
            <p className="text-xs text-[#64748B]">Pay when you receive your order</p>
          </div>
        </div>
      </div>
      
      {disabled ? (
        <div className="w-full mt-4 bg-[#E2E7EA] text-[#64748B] py-3 rounded-xl font-semibold text-center cursor-not-allowed flex items-center justify-center gap-2 text-sm border border-black/20">
          <FaShieldAlt className="w-4 h-4 text-black" />
          Checkout Disabled for Admin/Moderator
        </div>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full mt-4 bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg hover:shadow-xl hover:shadow-black/30 flex items-center justify-center gap-2"
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

// Order Success Modal
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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-black/20"
          >
            <div className="p-6 bg-gradient-to-r from-black to-black text-white text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <FaCheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold">Order Placed Successfully! 🎉</h2>
              <p className="text-sm text-white/80 mt-1">Your order has been confirmed</p>
            </div>
            
            <div className="p-6 text-center">
              <p className="text-black mb-2 font-semibold">Thank you for your order!</p>
              <p className="text-sm text-[#64748B] mb-4">We'll notify you when it ships.</p>
              {orderId && (
                <div className="bg-[#E2E7EA] rounded-lg p-3 mb-4">
                  <p className="text-xs text-[#64748B]">Order Reference</p>
                  <p className="text-sm font-mono font-bold text-black">{orderId.slice(-8).toUpperCase()}</p>
                </div>
              )}
              {customerEmail ? (
                <div className="bg-black/10 rounded-lg p-3 mb-4 flex items-start gap-2 text-left border border-black/20">
                  <FaCheckCircle className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-black">A confirmation email has been sent to <span className="font-medium text-black">{customerEmail}</span></p>
                </div>
              ) : (
                <div className="bg-[#E2E7EA] rounded-lg p-3 mb-4 flex items-start gap-2 text-left">
                  <FaCheckCircle className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-black">Order placed successfully! Check your phone for updates.</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-black/20 bg-[#E2E7EA] flex flex-col sm:flex-row gap-2">
              <button 
                onClick={() => {
                  onClose();
                  if (isLoggedIn) {
                    router.push('/customer/orders');
                  }
                }} 
                className="flex-1 px-4 py-2.5 bg-black text-white rounded-xl hover:bg-[#0891B2] transition-colors text-sm font-medium"
              >
                {isLoggedIn ? 'View My Orders' : 'Continue Shopping'}
              </button>
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-black/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm font-medium"
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


// ========== ADD THIS NEW FUNCTION HERE ==========
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

  // In checkout/page.js - Add this useEffect to handle cart loading

useEffect(() => {
  const checkCartAndRedirect = async () => {
    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('cartSessionId');
    
    // If no sessionId and no token, generate a new sessionId
    if (!token && !sessionId) {
      const newSessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('cartSessionId', newSessionId);
      console.log('🆕 Generated new session ID on checkout:', newSessionId);
    }
    
    fetchCart();
  };
  
  checkCartAndRedirect();
}, []);

    // Initialize quantity inputs when cart loads
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
    // Generate session ID for guest users if not exists
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




  // Fetch product colors for cart items
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
    
    // Optimistic update
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
      
      // First, find and remove any null-color item for this product
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
      
      // Then add the new color
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
      
      // Remove each item
      for (const item of itemsToRemove) {
        await fetch(`http://localhost:5000/api/cart/${item._id}`, {
          method: 'DELETE',
          headers
        });
      }
      
      // Refresh cart
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
        // Update the quantity input
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
    // Clear any pending update for this item
    if (pendingQuantityUpdates[itemId]) {
      clearTimeout(pendingQuantityUpdates[itemId]);
    }

    // Update the input value immediately
    setQuantityInputs(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));

    // Set a new timeout
    const timeoutId = setTimeout(() => {
      updateCartQuantity(itemId, newQuantity);
      setPendingQuantityUpdates(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });
    }, 500); // 500ms debounce

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

  

  // ✅ FIXED: Update zones when city changes with shipping calculation
  useEffect(() => {
    const selectedCity = formData.city;
    const selectedZone = formData.zone;
    const selectedArea = formData.area;
    
    if (selectedCity && locationData[selectedCity]) {
      const availableZones = Object.keys(locationData[selectedCity].zones || {});
      setZones(availableZones);
      setFormData(prev => ({ ...prev, zone: '', area: '' }));
      setAreas([]);
      
      // Calculate shipping cost with city and zone
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


 // ✅ FIXED: Update areas when zone changes with shipping recalculation
  useEffect(() => {
    const selectedCity = formData.city;
    const selectedZone = formData.zone;
    const selectedArea = formData.area;
    
    if (selectedCity && selectedZone && locationData[selectedCity]) {
      const availableAreas = locationData[selectedCity].zones[selectedZone] || [];
      setAreas(availableAreas);
      setFormData(prev => ({ ...prev, area: '' }));
      
      // Calculate shipping with area
      const calculateShipping = async () => {
        const charge = await getShippingCost(selectedCity, selectedZone, selectedArea);
        setShippingCost(charge);
      };
      calculateShipping();
    } else {
      setAreas([]);
    }
  }, [formData.zone, formData.city, locationData, getShippingCost]);


   // ✅ NEW: Recalculate shipping when area changes (for union-level charges)
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



  // Update zones when city changes
  // useEffect(() => {
  //   const selectedCity = formData.city;
  //   if (selectedCity && locationData[selectedCity]) {
  //     const availableZones = Object.keys(locationData[selectedCity].zones || {});
  //     setZones(availableZones);
  //     setFormData(prev => ({ ...prev, zone: '', area: '' }));
  //     setAreas([]);
  //     const isDhaka = selectedCity.toLowerCase() === 'dhaka';
  //     setShippingCost(isDhaka ? shippingRates.insideDhaka : shippingRates.outsideDhaka);
  //   } else {
  //     setZones([]);
  //     setAreas([]);
  //   }
  // }, [formData.city, locationData, shippingRates]);



  // Update areas when zone changes
  // useEffect(() => {
  //   const selectedCity = formData.city;
  //   const selectedZone = formData.zone;
  //   if (selectedCity && selectedZone && locationData[selectedCity]) {
  //     const availableAreas = locationData[selectedCity].zones[selectedZone] || [];
  //     setAreas(availableAreas);
  //     setFormData(prev => ({ ...prev, area: '' }));
  //   } else {
  //     setAreas([]);
  //   }
  // }, [formData.zone, formData.city, locationData]);


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
    
    // Check if any item requires color selection
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
          <p className="font-semibold text-black">Please select colors for:</p>
          <ul className="text-xs space-y-0.5 list-disc list-inside text-[#64748B]">
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

// const handleCODOrder = async () => {
//   if (isAdminOrModerator) {
//     toast.error('Admins and Moderators cannot place orders');
//     return;
//   }
  
//   if (navigating) return;
//   setNavigating(true);
//   setSubmitting(true);
//   isPlacingOrder.current = true;
  
//   try {
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('cartSessionId');
    
//     const headers = { 'Content-Type': 'application/json' };
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     }
    
//     console.log('📤 Sending order with sessionId:', sessionId || 'none');
    
//     const clientDeviceInfo = getClientDeviceInfo();
    
//     // Group items
//     const groupedItems = {};
    
//     cart.items.forEach(item => {
//       const productId = item.productId || item._id;
//       if (!groupedItems[productId]) {
//         groupedItems[productId] = {
//           productId: productId,
//           productName: item.productName,
//           productSlug: item.productSlug || '',
//           image: item.image || '',
//           regularPrice: item.regularPrice,
//           discountPrice: item.discountPrice || 0,
//           unit: item.unit || 'pcs',
//           stockQuantity: item.stockQuantity || 0,
//           colors: [],
//           quantity: 0,
//           selectedColor: null
//         };
//       }
      
//       const hasValidColor = item.selectedColor && 
//                            item.selectedColor !== '' && 
//                            item.selectedColor !== null && 
//                            item.selectedColor !== 'null';
      
//       if (hasValidColor) {
//         const existingColor = groupedItems[productId].colors.find(c => c.color === item.selectedColor);
//         if (existingColor) {
//           existingColor.quantity += item.quantity;
//         } else {
//           groupedItems[productId].colors.push({
//             color: item.selectedColor,
//             quantity: item.quantity,
//             price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice
//           });
//         }
//         groupedItems[productId].quantity += item.quantity;
//       } else {
//         groupedItems[productId].quantity = item.quantity;
//       }
//     });
    
//     const groupedItemsArray = Object.values(groupedItems).map(item => {
//       const hasColors = item.colors && item.colors.length > 0;
//       return {
//         productId: item.productId,
//         productName: item.productName,
//         productSlug: item.productSlug,
//         image: item.image,
//         regularPrice: item.regularPrice,
//         discountPrice: item.discountPrice || 0,
//         unit: item.unit || 'pcs',
//         stockQuantity: item.stockQuantity || 0,
//         colors: hasColors ? item.colors : [],
//         quantity: hasColors ? 0 : (item.quantity || 0),
//         selectedColor: null
//       };
//     });
    
//     const validItems = groupedItemsArray.filter(item => {
//       const hasColors = item.colors && item.colors.length > 0;
//       const hasQuantity = item.quantity > 0;
//       return hasColors || hasQuantity;
//     });
    
//     if (validItems.length === 0) {
//       toast.error('No valid items in cart');
//       setNavigating(false);
//       return;
//     }
    
//     const orderData = {
//       items: validItems,
//       subtotal: calculateSubtotal(),
//       shippingCost,
//       discount: 0,
//       total: calculateTotal(),
//       paymentMethod: 'cod',
//       customerInfo: {
//         fullName: formData.fullName,
//         email: formData.email,
//         phone: formData.phone,
//         division: formData.division,
//         address: formData.address,
//         city: formData.city,
//         zone: formData.zone,
//         area: formData.area || '',
//         zipCode: formData.zipCode || '',
//         country: formData.country || 'Bangladesh',
//         note: formData.note || ''
//       },
//       couponCode: null,
//       couponDiscount: 0,
//       freeShipping: false,
//       clientDeviceInfo: clientDeviceInfo,
//       sessionId: sessionId
//     };
    
//     console.log('📦 Order Data:', JSON.stringify(orderData, null, 2));
    
//     const response = await fetch('http://localhost:5000/api/orders', {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(orderData)
//     });
    
//     const data = await response.json();
    
//     if (data.success) {
//       const orderId = data.orderId || data.data?._id || data.data?.id;
      
//       // Clear cart from localStorage
//       localStorage.removeItem('cartSessionId');
      
//       // Clear cart from backend
//       await fetch('http://localhost:5000/api/cart', { 
//         method: 'DELETE', 
//         headers 
//       });
      
//       window.dispatchEvent(new Event('cart-update'));
//       setCart({ items: [], totalItems: 0, subtotal: 0 });
      
//       if (isLoggedIn) {
//         toast.success('Order placed successfully!');
//         window.location.href = '/customer/orders';
//       } else {
//         // For guest users, pass both orderId and sessionId in URL
//         const sessionIdFromResponse = data.sessionId || sessionId;
//         window.location.href = `/thank-you?orderId=${orderId}&sessionId=${sessionIdFromResponse}`;
//       }
//     } else {
//       toast.error(data.error || 'Failed to place order');
//       setNavigating(false);
//     }
//   } catch (error) {
//     console.error('COD order error:', error);
//     toast.error('Network error. Please try again.');
//     setNavigating(false);
//   } finally {
//     setSubmitting(false);
//     isPlacingOrder.current = false;
//   }
// };
  // ========== HANDLE SUBMIT WITH COLOR VALIDATION ==========
  
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
        buyingPrice: item.buyingPrice || 0, // ✅ ADD THIS
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
      
      // ========== DELETE INCOMPLETE ORDER AFTER SUCCESSFUL PLACEMENT ==========
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
        // Don't block the flow if delete fails
      }
      
      // Clear cart from localStorage
      localStorage.removeItem('cartSessionId');
      
      // Clear cart from backend
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
    
    // Validate cart colors first
    if (!validateCartColors()) {
      return;
    }
    
    // Validate form
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      const errorMessages = Object.values(validationErrors);
      
      toast.error(
        <div className="space-y-1">
          <p className="font-semibold text-black">Please fix the following errors:</p>
          <ul className="text-xs space-y-0.5 list-disc list-inside text-[#64748B]">
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
    // Don't save if cart is empty
    if (!cart?.items?.length) return;

    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('cartSessionId');
    const headers = { 'Content-Type': 'application/json' };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (sessionId) {
      headers['x-session-id'] = sessionId;
    }

    // Group items for incomplete order
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
    }, 3000); // Save after 3 seconds of inactivity

    return () => clearTimeout(timer);
  }, [formData, cart, saveIncompleteOrder]);

  if (loading || locationLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#E2E7EA]/20 pt-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-black animate-spin" />
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
        <div className="min-h-screen bg-[#E2E7EA]/20 py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="bg-white rounded-2xl shadow-sm border border-black/20 p-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-[#E2E7EA] rounded-full flex items-center justify-center border border-black/20">
                <FaShoppingBag className="w-10 h-10 text-black/40" />
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">Your cart is empty</h2>
              <p className="text-[#64748B] mb-6">Add some products to your cart and come back to checkout.</p>
              <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-[#0891B2] transition-colors">
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

  // Check if any items need color selection
  const hasColorRequiredItems = cart.items.some(item => {
    const availableColors = productColors[item.productId] || [];
    return availableColors.length > 0 && (!item.selectedColor || item.selectedColor === '' || item.selectedColor === 'null');
  });

  // Group items by product for better display
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
      
      <div className="min-h-screen bg-[#E2E7EA]/20 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-black/25">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">Checkout</h1>
                <p className="text-sm text-[#64748B]">Complete your order securely</p>
              </div>
            </div>
           
          </div>

          {/* Color Selection Warning */}
          {hasColorRequiredItems && (
            <div className="mb-6 bg-orange-50 border-l-4 border-orange-400 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-orange-700 font-medium">Color Selection Required</p>
                  <p className="text-xs text-orange-600">
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
                  <p className="text-sm text-yellow-700 font-medium">Checkout Disabled for Admin/Moderator Accounts</p>
                  <p className="text-xs text-yellow-600">You are logged in as {user?.role}. Please switch to a customer account to place orders.</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-5">
              {/* Personal Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-black/20 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-black flex items-center gap-2">
                    <FaUser className="w-5 h-5 text-black" />
                    Personal Information
                  </h2>
                  {isLoggedIn && (
                    <span className="text-xs bg-black/10 text-black px-3 py-1 rounded-full flex items-center gap-1 font-medium border border-black/20">
                      <FaCheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm ${
                          isLoggedIn ? 'bg-[#E2E7EA]/30 text-[#64748B]' : 'bg-white'
                        } ${errors.fullName ? 'border-red-500' : 'border-black/20'}`}
                        placeholder="Enter your full name"
                        disabled={isLoggedIn}
                      />
                    </div>
                    {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-1.5">
                      Email <span className="text-[#64748B] text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm ${
                          isLoggedIn ? 'bg-[#E2E7EA]/30 text-[#64748B]' : 'bg-white'
                        } ${errors.email ? 'border-red-500' : 'border-black/20'}`}
                        placeholder="your@email.com (optional)"
                        disabled={isLoggedIn}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm ${
                          errors.phone ? 'border-red-500' : 'border-black/20'
                        }`}
                        placeholder="01XXXXXXXXX"
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    <p className="text-[10px] text-[#64748B] mt-1">Enter a valid Bangladeshi mobile number</p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl shadow-sm border border-black/20 p-6">
                <h2 className="text-lg font-bold text-black flex items-center gap-2 mb-5">
                  <FaMapMarkerAlt className="w-5 h-5 text-black" />
                  Delivery Address
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1.5">
                      Full Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaHome className="absolute left-3 top-3 text-[#64748B] w-4 h-4" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="2"
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition bg-white text-sm resize-none ${
                          errors.address ? 'border-red-500' : 'border-black/20'
                        }`}
                        placeholder="House #, Road #, Area, City, Zip Code"
                      />
                    </div>
                    {isLoggedIn && user?.address && (
                      <p className="text-xs text-black mt-1 flex items-center gap-1">
                        <FaCheckCircle className="w-3 h-3" />
                        Your saved address has been pre-filled
                      </p>
                    )}
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1.5">
                        Division <span className="text-red-500">*</span>
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
                      {errors.division && <p className="text-xs text-red-500 mt-1">{errors.division}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-black mb-1.5">
                        District/City <span className="text-red-500">*</span>
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
                      {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1.5">
                        Upazila/Thana <span className="text-red-500">*</span>
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
                      {errors.zone && <p className="text-xs text-red-500 mt-1">{errors.zone}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-black mb-1.5">
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
              <div className="bg-white rounded-2xl shadow-sm border border-black/20 p-6">
                <h2 className="text-lg font-bold text-black flex items-center gap-2 mb-4">
                  <FaFileAlt className="w-5 h-5 text-black" />
                  Order Notes <span className="text-sm font-normal text-[#64748B]">(Optional)</span>
                </h2>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-3 border border-black/20 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm resize-none"
                  placeholder="Special instructions for delivery, gift message, etc."
                />
              </div>
            </div>

            {/* Right Column - Order Summary with Color Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-black/20 p-6 sticky top-24">
                <h2 className="text-lg font-bold text-black flex items-center gap-2 mb-4">
                  <FaShoppingBag className="w-5 h-5 text-black" />
                  Order Summary
                </h2>
                
                {/* Grouped Items List with Color Selection */}
                <div className="space-y-4 max-h-60 overflow-y-auto mb-4 pr-1">
                  {groupedItemsArray.map((group) => {
                    const hasColors = productColors[group.productId]?.length > 0;
                    const availableColors = productColors[group.productId] || [];
                    const price = group.discountPrice > 0 ? group.discountPrice : group.regularPrice;
                    const selectedColors = group.colors.filter(c => c.color !== null);
                    const hasUnselected = group.colors.some(c => c.color === null);
                    
                    return (
                      <div key={group._id} className="border border-black/20 rounded-lg overflow-hidden">
                        {/* Product Header with Remove button */}
                        <div className="flex items-start gap-2 p-2 bg-[#E2E7EA]/50 border-b border-black/20">
                          <img 
                            src={group.image || 'https://via.placeholder.com/40'} 
                            alt={group.productName} 
                            className="w-10 h-10 rounded-lg object-cover border border-black/20 flex-shrink-0"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-black truncate">{group.productName}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-sm font-bold text-black">৳{price.toFixed(2)}</span>
                              {group.discountPrice > 0 && (
                                <span className="text-[10px] text-[#64748B] line-through">৳{group.regularPrice.toFixed(2)}</span>
                              )}
                              <span className="text-[10px] text-[#64748B]">/{getUnitLabel(group.unit)}</span>
                            </div>
                            <div className="text-xs text-[#64748B]">
                              Total: <span className="font-medium">{group.totalQuantity}</span> items
                              {selectedColors.length > 0 && (
                                <span className="ml-1 text-black">
                                  ({selectedColors.length} color{selectedColors.length > 1 ? 's' : ''} selected)
                                </span>
                              )}
                            </div>
                          </div>
                          {/* Remove All Colors button - only for color products with selected colors */}
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
                          {/* Remove button for non-color products */}
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

                        {/* ========== COLOR PRODUCT ========== */}
                        {hasColors ? (
                          <>
                            {/* Available Colors Section - Click to add new color */}
                            <div className="p-2 border-b border-black/10 bg-[#E2E7EA]/30">
                              <p className="text-[10px] text-[#64748B] mb-1.5 flex items-center gap-1">
                                <Palette className="w-3 h-3 text-black" />
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
                                          // Check if there's an item without color
                                          const itemWithoutColor = group.colors.find(c => c.color === null);
                                          if (itemWithoutColor) {
                                            // Update existing item
                                            updateColor(itemWithoutColor.itemId, color);
                                          } else {
                                            // Add new color
                                            addNewColorToCart(group.productId, color);
                                          }
                                        }
                                      }}
                                      disabled={isSelected || isUpdatingCart}
                                      className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                                        isSelected 
                                          ? 'border-black shadow-md ring-2 ring-black/30 scale-110 cursor-default' 
                                          : 'border-black/30 hover:border-black/60 cursor-pointer'
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
                              <div className="mt-1 text-[9px] text-gray-400">
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

                            {/* Selected Colors with Quantity and Remove */}
                            <div className="p-2 space-y-2">
                              {selectedColors.length > 0 ? (
                                selectedColors.map((colorInfo) => (
                                  <div key={colorInfo.itemId} className="flex items-center gap-2 p-2 bg-[#E2E7EA] rounded-lg border border-black/15">
                                    {/* Color Swatch */}
                                    <div 
                                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-black/30 flex-shrink-0"
                                      style={{ backgroundColor: colorInfo.color }}
                                      title={colorInfo.color}
                                    />
                                    
                                    {/* Quantity Controls */}
                                    <div className="flex items-center border border-black/20 rounded-lg overflow-hidden bg-white ml-auto">
                                      <button
                                        onClick={() => {
                                          const newQty = colorInfo.quantity - 1;
                                          if (newQty >= 1) {
                                            updateCartQuantity(colorInfo.itemId, newQty);
                                          }
                                        }}
                                        disabled={isUpdatingCart || colorInfo.quantity <= 1}
                                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-[#E2E7EA] disabled:opacity-50 transition-colors"
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
                                          // Allow empty string or digits only
                                          if (value === '' || /^\d+$/.test(value)) {
                                            const numValue = parseInt(value);
                                            // Update input immediately
                                            setQuantityInputs(prev => ({
                                              ...prev,
                                              [colorInfo.itemId]: value
                                            }));
                                            
                                            // If value is valid number, update cart with debounce
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
                                            // Reset to current quantity if invalid
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
                                        className="w-10 text-center text-sm font-medium text-black bg-white focus:outline-none focus:ring-1 focus:ring-black py-1"
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
                                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-[#E2E7EA] disabled:opacity-50 transition-colors"
                                      >
                                        <FaPlus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                      </button>
                                    </div>
                                    
                                    {/* Remove individual color */}
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
                                <div className="text-center py-2 text-xs text-gray-400">
                                  No colors selected. Click a color above to select.
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          /* ========== NO COLOR PRODUCT - Show Quantity Controls ========== */
                          <div className="p-2">
                            <div className="flex items-center justify-between gap-2 p-2 bg-[#E2E7EA] rounded-lg border border-black/15">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#64748B]">Quantity</span>
                              </div>
                              <div className="flex items-center border border-black/20 rounded-lg overflow-hidden bg-white">
                                <button
                                  onClick={() => {
                                    const currentItem = cart.items.find(item => item.productId === group.productId);
                                    if (currentItem && currentItem.quantity > 1) {
                                      updateCartQuantity(currentItem._id, currentItem.quantity - 1);
                                    }
                                  }}
                                  disabled={isUpdatingCart || group.totalQuantity <= 1}
                                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-[#E2E7EA] disabled:opacity-50 transition-colors"
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
                                    // Allow empty string or digits only
                                    if (value === '' || /^\d+$/.test(value)) {
                                      const numValue = parseInt(value);
                                      // Update input immediately
                                      setQuantityInputs(prev => ({
                                        ...prev,
                                        [group._id]: value
                                      }));
                                      
                                      // If value is valid number, update cart with debounce
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
                                      // Reset to current quantity if invalid
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
                                  className="w-12 text-center text-sm font-medium text-black bg-white focus:outline-none focus:ring-1 focus:ring-black py-1"
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
                                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-[#E2E7EA] disabled:opacity-50 transition-colors"
                                >
                                  <FaPlus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                </button>
                              </div>
                              {group.stockQuantity && (
                                <span className="text-[9px] text-[#64748B] whitespace-nowrap">
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
                <div className="space-y-2 border-t border-black/20 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Subtotal</span>
                    <span className="font-medium text-black">৳{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Shipping</span>
                    <span className="font-medium text-green-600">৳{shippingCost.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-black/20">
                    <span className="text-black">Total</span>
                    <span className="text-black">৳{total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Color Selection Warning */}
                {hasColorRequiredItems && (
                  <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-orange-600">
                      Please select colors for all items before placing order
                    </p>
                  </div>
                )}
                
                {/* Trust Badges */}
                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-[#64748B]">
                    <FaShieldAlt className="w-4 h-4 text-black" />
                    <span>Safe & Secure Shopping</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#64748B]">
                    <FaClock className="w-4 h-4 text-black" />
                    <span>7-Day Return Policy</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#64748B]">
                    <Zap className="w-4 h-4 text-black" />
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
                    <p className="text-[10px] text-orange-500 text-center mt-2">
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