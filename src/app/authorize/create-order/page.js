
// // app/authorize/create-order/page.js
// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search,
//   UserPlus,
//   Users,
//   Package,
//   ShoppingBag,
//   MapPin,
//   Phone,
//   Mail,
//   User,
//   X,
//   Plus,
//   Minus,
//   Trash2,
//   Save,
//   Check,
//   AlertCircle,
//   Loader2,
//   ChevronDown,
//   ChevronUp,
//   DollarSign,
//   Tag,
//   Building2,
//   Globe,
//   Home,
//   CreditCard,
//   Truck,
//   Zap,
//   Eye,
//   Edit2,
//   UserCheck,
//   Sparkles,
//   ArrowLeft,
//   Calendar,
//   Clock,
//   Scale,
//   Palette,
//   Box,
//   EyeOff,
//   Smartphone,
//   Lock,
//   RefreshCw
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ========== HELPER FUNCTIONS ==========
// const getUnitLabel = (unit) => {
//   const units = {
//     'pcs': 'pcs',
//     'ton': 'ton',
//     'other': 'unit'
//   };
//   return units[unit] || unit;
// };

// const formatPrice = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// // ========== MAIN COMPONENT ==========
// export default function ManualOrderCreate() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
  
//   // ========== LOCATION DATA ==========
//   const [locationData, setLocationData] = useState({});
//   const [divisions, setDivisions] = useState({});
//   const [divisionList, setDivisionList] = useState([]);
//   const [citiesByDivision, setCitiesByDivision] = useState([]);
//   const [zones, setZones] = useState([]);        // ← ADD THIS
// const [areas, setAreas] = useState([]);
//   const [locationLoading, setLocationLoading] = useState(true);
//   const [shippingCost, setShippingCost] = useState(0);
  
//   // ========== CUSTOMER SEARCH ==========
//   const [customerSearchQuery, setCustomerSearchQuery] = useState('');
//   const [customerSearchResults, setCustomerSearchResults] = useState([]);
//   const [searchingCustomers, setSearchingCustomers] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [showCreateCustomer, setShowCreateCustomer] = useState(false);
  
//   // ========== PRODUCT SEARCH ==========
//   const [productSearchQuery, setProductSearchQuery] = useState('');
//   const [productSearchResults, setProductSearchResults] = useState([]);
//   const [searchingProducts, setSearchingProducts] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedColorsWithQty, setSelectedColorsWithQty] = useState([]);
//   const [addQuantity, setAddQuantity] = useState(1);
//   const [showAddProduct, setShowAddProduct] = useState(false);
  
//   // ========== ORDER ITEMS ==========
//   const [orderItems, setOrderItems] = useState([]);
//   const [discount, setDiscount] = useState(0);
//   const [discountNote, setDiscountNote] = useState('');
//   const [orderNote, setOrderNote] = useState('');
  
//   // ========== CREATE CUSTOMER FORM (Matches AllCustomers page exactly) ==========
//   const [createForm, setCreateForm] = useState({
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     country: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     password: '',
//     confirmPassword: '',
//     subscribeToNewsletter: false
//   });
  
//   const [createFormErrors, setCreateFormErrors] = useState({});
//   const [isCreating, setIsCreating] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   // ========== ORDER FORM (Delivery Address) ==========
//   const [orderForm, setOrderForm] = useState({
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
  
//   const [formErrors, setFormErrors] = useState({});
  
//   // ========== UI STATE ==========
//   const [expandedSections, setExpandedSections] = useState({
//     customer: true,
//     products: true,
//     address: true,
//     summary: true
//   });
  
//   // ========== FETCH LOCATIONS ==========
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
//         setLocationLoading(false);
//       } catch (error) {
//         console.error('Failed to load location data:', error);
//         setLocationLoading(false);
//       }
//     };
//     fetchLocations();
//   }, []);
  
//   // ========== UPDATE CITIES WHEN DIVISION CHANGES (Order Form) ==========
//   useEffect(() => {
//     if (orderForm.division && divisions[orderForm.division]) {
//       setCitiesByDivision(divisions[orderForm.division]);
//       setOrderForm(prev => ({ ...prev, city: '' }));
//     } else {
//       setCitiesByDivision([]);
//     }
//   }, [orderForm.division, divisions]);
  
//   // ========== CALCULATE SHIPPING ==========
//   const calculateShipping = useCallback(async (city) => {
//     if (!city) {
//       setShippingCost(0);
//       return;
//     }
    
//     try {
//       const response = await fetch('http://localhost:5000/api/delivery/calculate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ city })
//       });
//       const data = await response.json();
//       if (data.success) {
//         setShippingCost(data.data.charge || 0);
//         return data.data.charge || 0;
//       }
//       setShippingCost(0);
//       return 0;
//     } catch (error) {
//       console.error('Error calculating shipping:', error);
//       setShippingCost(0);
//       return 0;
//     }
//   }, []);
  
//   // ========== RECALCULATE SHIPPING ON CITY CHANGE ==========
//   useEffect(() => {
//     if (orderForm.city) {
//       calculateShipping(orderForm.city);
//     }
//   }, [orderForm.city, calculateShipping]);
  
//   // ========== SEARCH CUSTOMERS ==========
//   const searchCustomers = useCallback(async (query) => {
//     if (!query || query.length < 2) {
//       setCustomerSearchResults([]);
//       return;
//     }
    
//     setSearchingCustomers(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `http://localhost:5000/api/auth/admin/customers?search=${encodeURIComponent(query)}&limit=10`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const data = await response.json();
//       if (data.success) {
//         setCustomerSearchResults(data.customers || []);
//       } else {
//         setCustomerSearchResults([]);
//       }
//     } catch (error) {
//       console.error('Search customers error:', error);
//       setCustomerSearchResults([]);
//     } finally {
//       setSearchingCustomers(false);
//     }
//   }, []);
  
//   // Debounced customer search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (customerSearchQuery) {
//         searchCustomers(customerSearchQuery);
//       } else {
//         setCustomerSearchResults([]);
//       }
//     }, 300);
    
//     return () => clearTimeout(timer);
//   }, [customerSearchQuery, searchCustomers]);
  
//   // ========== SEARCH PRODUCTS ==========
//   const searchProducts = useCallback(async (query) => {
//     if (!query || query.length < 2) {
//       setProductSearchResults([]);
//       return;
//     }
    
//     setSearchingProducts(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `http://localhost:5000/api/orders/search-products?query=${encodeURIComponent(query)}&limit=10`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const data = await response.json();
//       if (data.success) {
//         setProductSearchResults(data.data || []);
//       } else {
//         setProductSearchResults([]);
//       }
//     } catch (error) {
//       console.error('Search products error:', error);
//       setProductSearchResults([]);
//     } finally {
//       setSearchingProducts(false);
//     }
//   }, []);
  
//   // Debounced product search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (productSearchQuery) {
//         searchProducts(productSearchQuery);
//       } else {
//         setProductSearchResults([]);
//       }
//     }, 300);
    
//     return () => clearTimeout(timer);
//   }, [productSearchQuery, searchProducts]);
  
//   // ========== SELECT CUSTOMER ==========
//   const handleSelectCustomer = (customer) => {
//     setSelectedCustomer(customer);
//     setCustomerSearchQuery(customer.contactPerson || customer.email);
//     setCustomerSearchResults([]);
    
//     // Auto-fill order form with customer data
//     setOrderForm({
//       fullName: customer.contactPerson || '',
//       email: customer.email || '',
//       phone: customer.phone || '',
//       division: customer.division || '',
//       address: customer.address || '',
//       city: customer.city || '',
//       zone: customer.zone || '',
//       area: customer.area || '',
//       zipCode: customer.zipCode || '',
//       country: customer.country || 'Bangladesh',
//       note: ''
//     });
    
//     // Trigger shipping calculation
//     if (customer.city) {
//       calculateShipping(customer.city);
//     }
//   };
  
//   // ========== SELECT PRODUCT ==========
//   const handleSelectProduct = (product) => {
//     setSelectedProduct(product);
//     setSelectedColorsWithQty([]);
//     setAddQuantity(1);
//     setProductSearchResults([]);
//     setProductSearchQuery(product.productName);
//   };
  
//   // ========== TOGGLE COLOR SELECTION ==========
//   const toggleColorSelection = (color) => {
//     setSelectedColorsWithQty(prev => {
//       const exists = prev.find(c => c.color === color);
//       if (exists) {
//         return prev.filter(c => c.color !== color);
//       } else {
//         return [...prev, { color, quantity: 1 }];
//       }
//     });
//   };
  
//   // ========== UPDATE COLOR QUANTITY ==========
//   const updateSelectedColorQuantity = (color, newQuantity) => {
//     if (newQuantity < 1) return;
    
//     const totalSelectedOthers = selectedColorsWithQty
//       .filter(c => c.color !== color)
//       .reduce((sum, c) => sum + Number(c.quantity || 0), 0);
    
//     const maxAllowed = selectedProduct ? selectedProduct.stockQuantity - totalSelectedOthers : Infinity;
    
//     if (newQuantity > maxAllowed) {
//       toast.warning(`Only ${maxAllowed} more item(s) can be assigned to this color.`);
//       return;
//     }
    
//     setSelectedColorsWithQty(prev =>
//       prev.map(c =>
//         c.color === color ? { ...c, quantity: newQuantity } : c
//       )
//     );
//   };
  
// // ========== ADD PRODUCT TO ORDER ==========
// const handleAddProductToOrder = () => {
//   if (!selectedProduct) {
//     toast.error('Please select a product');
//     return;
//   }
  
//   const hasColors = selectedProduct.colors && selectedProduct.colors.length > 0;
  
//   if (hasColors && selectedColorsWithQty.length === 0) {
//     toast.error('Please select at least one color with quantity');
//     return;
//   }
  
//   if (!hasColors && addQuantity < 1) {
//     toast.error('Please enter a valid quantity');
//     return;
//   }
  
//   // Validate stock
//   if (hasColors) {
//     const totalQty = selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0);
//     if (totalQty > selectedProduct.stockQuantity) {
//       toast.error(`Total quantity (${totalQty}) exceeds available stock (${selectedProduct.stockQuantity})`);
//       return;
//     }
//   } else {
//     if (addQuantity > selectedProduct.stockQuantity) {
//       toast.error(`Only ${selectedProduct.stockQuantity} item(s) available in stock`);
//       return;
//     }
//   }
  
//   // Check if product already exists in order
//   const existingItemIndex = orderItems.findIndex(
//     item => item.productId === selectedProduct._id
//   );
  
//   if (existingItemIndex !== -1) {
//     // Check if adding more would exceed stock
//     const existingQty = orderItems[existingItemIndex].totalQuantity || 0;
//     const newTotalQty = hasColors
//       ? existingQty + selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0)
//       : existingQty + addQuantity;
    
//     if (newTotalQty > selectedProduct.stockQuantity) {
//       toast.error(`Cannot add more. Stock limit (${selectedProduct.stockQuantity}) would be exceeded`);
//       return;
//     }
//   }
  
//   // ========== GENERATE PRODUCT SLUG ==========
//   let productSlug = selectedProduct.slug;
//   if (!productSlug && selectedProduct.productName) {
//     productSlug = selectedProduct.productName
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/^-+|-+$/g, '');
//   }
//   if (!productSlug) {
//     productSlug = 'unknown-product';
//   }
  
//   // Build the item
//   const newItem = {
//     productId: selectedProduct._id,
//     productName: selectedProduct.productName,
//     productSlug: productSlug,  // ← NOW ALWAYS HAS A VALUE
//     image: selectedProduct.images?.[0]?.url || '',
//     regularPrice: selectedProduct.regularPrice,
//     discountPrice: selectedProduct.discountPrice || 0,
//     stockQuantity: selectedProduct.stockQuantity,
//     unit: selectedProduct.unit || 'pcs',
//     colors: hasColors ? selectedColorsWithQty.map(c => ({
//       color: c.color,
//       quantity: Number(c.quantity || 0),
//       price: selectedProduct.discountPrice > 0 ? selectedProduct.discountPrice : selectedProduct.regularPrice
//     })) : [],
//     totalQuantity: hasColors
//       ? selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0)
//       : addQuantity,
//     selectedColors: hasColors ? selectedColorsWithQty.map(c => c.color) : []
//   };
  
//   // Add or update
//   if (existingItemIndex !== -1) {
//     const existing = orderItems[existingItemIndex];
//     // Merge colors
//     const existingColors = existing.colors || [];
//     const newColors = newItem.colors || [];
    
//     // Merge color quantities
//     const mergedColors = [...existingColors];
//     newColors.forEach(newColor => {
//       const existingColorIndex = mergedColors.findIndex(c => c.color === newColor.color);
//       if (existingColorIndex !== -1) {
//         mergedColors[existingColorIndex].quantity += newColor.quantity;
//       } else {
//         mergedColors.push(newColor);
//       }
//     });
    
//     const updatedItem = {
//       ...existing,
//       colors: mergedColors,
//       totalQuantity: mergedColors.reduce((sum, c) => sum + c.quantity, 0),
//       selectedColors: mergedColors.map(c => c.color),
//       // Ensure slug is also updated
//       productSlug: productSlug
//     };
    
//     setOrderItems(prev => {
//       const newItems = [...prev];
//       newItems[existingItemIndex] = updatedItem;
//       return newItems;
//     });
    
//     toast.success(`Updated ${selectedProduct.productName} quantity`);
//   } else {
//     setOrderItems(prev => [...prev, newItem]);
//     toast.success(`Added ${selectedProduct.productName} to order`);
//   }
  
//   // Reset selection
//   setShowAddProduct(false);
//   setSelectedProduct(null);
//   setProductSearchQuery('');
//   setProductSearchResults([]);
//   setSelectedColorsWithQty([]);
//   setAddQuantity(1);
// };
  
//   // ========== REMOVE ITEM FROM ORDER ==========
//   const removeItemFromOrder = (index) => {
//     const item = orderItems[index];
//     setOrderItems(prev => prev.filter((_, i) => i !== index));
//     toast.success(`Removed ${item.productName} from order`);
//   };
  
//   // ========== UPDATE ITEM QUANTITY ==========
//   const updateItemQuantity = (index, color, newQuantity) => {
//     if (newQuantity < 1) {
//       // Remove this color
//       const item = orderItems[index];
//       if (item.colors && item.colors.length > 1) {
//         // Remove the color
//         const updatedColors = item.colors.filter(c => c.color !== color);
//         const updatedItem = {
//           ...item,
//           colors: updatedColors,
//           totalQuantity: updatedColors.reduce((sum, c) => sum + c.quantity, 0),
//           selectedColors: updatedColors.map(c => c.color)
//         };
//         setOrderItems(prev => {
//           const newItems = [...prev];
//           newItems[index] = updatedItem;
//           return newItems;
//         });
//       } else {
//         // Remove the whole item
//         removeItemFromOrder(index);
//       }
//       return;
//     }
    
//     // Check stock
//     const item = orderItems[index];
//     const totalOtherColors = item.colors
//       .filter(c => c.color !== color)
//       .reduce((sum, c) => sum + c.quantity, 0);
    
//     if (totalOtherColors + newQuantity > item.stockQuantity) {
//       toast.warning(`Only ${item.stockQuantity - totalOtherColors} more items available for this color`);
//       return;
//     }
    
//     setOrderItems(prev => {
//       const newItems = [...prev];
//       const updatedColors = newItems[index].colors.map(c => {
//         if (c.color === color) {
//           return { ...c, quantity: newQuantity };
//         }
//         return c;
//       });
//       newItems[index] = {
//         ...newItems[index],
//         colors: updatedColors,
//         totalQuantity: updatedColors.reduce((sum, c) => sum + c.quantity, 0)
//       };
//       return newItems;
//     });
//   };
  
//   // ========== CALCULATE SUBTOTAL ==========
//   const calculateSubtotal = useCallback(() => {
//     let subtotal = 0;
//     orderItems.forEach(item => {
//       const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//       subtotal += price * (item.totalQuantity || 0);
//     });
//     return subtotal;
//   }, [orderItems]);
  
//   // ========== CALCULATE TOTAL ==========
//   const calculateTotal = useCallback(() => {
//     return calculateSubtotal() + shippingCost - (discount || 0);
//   }, [calculateSubtotal, shippingCost, discount]);
  
//   // ========== VALIDATE CREATE CUSTOMER FORM (Matches AllCustomers page) ==========
//   const validateCreateCustomerForm = () => {
//     const errors = {};
    
//     if (!createForm.contactPerson?.trim()) {
//       errors.contactPerson = 'Contact person is required';
//     }
//     if (!createForm.email?.trim()) {
//       errors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(createForm.email)) {
//       errors.email = 'Email is invalid';
//     }
//     if (!createForm.phone?.trim()) {
//       errors.phone = 'Phone number is required';
//     }
//     if (!createForm.country?.trim()) {
//       errors.country = 'Country is required';
//     }
//     if (!createForm.address?.trim()) {
//       errors.address = 'Address is required';
//     }
//     if (!createForm.city?.trim()) {
//       errors.city = 'City is required';
//     }
//     if (!createForm.zipCode?.trim()) {
//       errors.zipCode = 'ZIP Code is required';
//     }
//     if (!createForm.password) {
//       errors.password = 'Password is required';
//     } else if (createForm.password.length < 8) {
//       errors.password = 'Password must be at least 8 characters';
//     }
//     if (createForm.password !== createForm.confirmPassword) {
//       errors.confirmPassword = 'Passwords do not match';
//     }
    
//     setCreateFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };
  
//   // ========== CREATE CUSTOMER (Matches AllCustomers page) ==========
//   const handleCreateCustomer = async () => {
//     if (!validateCreateCustomerForm()) {
//       // Scroll to first error
//       const firstErrorField = document.querySelector('.border-red-500');
//       if (firstErrorField) {
//         firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return false;
//     }
    
//     setIsCreating(true);
//     const loadingToast = toast.loading('Creating customer account...');
    
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch('http://localhost:5000/api/auth/admin/create-customer', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           contactPerson: createForm.contactPerson,
//           email: createForm.email,
//           phone: createForm.phone,
//           whatsapp: createForm.whatsapp || '',
//           country: createForm.country,
//           address: createForm.address,
//           city: createForm.city,
//           zipCode: createForm.zipCode,
//           password: createForm.password
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (response.ok) {
//         toast.success('Customer Created Successfully!', {
//           description: `Customer account for ${createForm.contactPerson} has been created.`,
//           duration: 5000,
//         });

//         // Reset form
//         setCreateForm({
//           contactPerson: '',
//           email: '',
//           phone: '',
//           whatsapp: '',
//           country: '',
//           address: '',
//           city: '',
//           zipCode: '',
//           password: '',
//           confirmPassword: '',
//           subscribeToNewsletter: false
//         });
//         setCreateFormErrors({});
//         setShowCreateCustomer(false);
//         setIsCreating(false);
        
//         // Return the created customer
//         return data.user || data.data;
//       } else {
//         toast.error(data.error || 'Creation Failed');
//         setIsCreating(false);
//         return null;
//       }
//     } catch (error) {
//       console.error('Error creating customer:', error);
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error');
//       setIsCreating(false);
//       return null;
//     }
//   };
  
//   // ========== HANDLE CREATE FORM CHANGES (Matches AllCustomers page) ==========
//   const handleCreateChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setCreateForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     // Clear error for this field
//     if (createFormErrors[name]) {
//       setCreateFormErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };
  
//   // ========== VALIDATE ORDER FORM ==========
// // ========== VALIDATE ORDER FORM ==========
// const validateOrderForm = () => {
//   const errors = {};
  
//   if (!orderForm.fullName?.trim()) {
//     errors.fullName = 'Full name is required';
//   }
//   if (!orderForm.phone?.trim()) {
//     errors.phone = 'Phone number is required';
//   }
//   if (!orderForm.address?.trim()) {
//     errors.address = 'Address is required';
//   }
//   if (!orderForm.division?.trim()) {
//     errors.division = 'Division is required';
//   }
//   if (!orderForm.city?.trim()) {
//     errors.city = 'City is required';
//   }
//   if (!orderForm.zone?.trim()) {
//     errors.zone = 'Upazila/Thana is required';  // ← ADD THIS
//   }
  
//   setFormErrors(errors);
//   return Object.keys(errors).length === 0;
// };
  
// // ========== PLACE ORDER ==========
// // ========== PLACE ORDER ==========
// const handlePlaceOrder = async () => {
//   let customerId = selectedCustomer?._id;
  
//   // If creating new customer, create first
//   if (showCreateCustomer) {
//     const newCustomer = await handleCreateCustomer();
//     if (newCustomer) {
//       customerId = newCustomer._id;
//       // Auto-fill order form with new customer data
//       setOrderForm(prev => ({
//         ...prev,
//         fullName: newCustomer.contactPerson || '',
//         email: newCustomer.email || '',
//         phone: newCustomer.phone || '',
//         division: newCustomer.division || '',
//         address: newCustomer.address || '',
//         city: newCustomer.city || '',
//         zipCode: newCustomer.zipCode || '',
//         country: newCustomer.country || 'Bangladesh'
//       }));
//       // Update selected customer
//       setSelectedCustomer(newCustomer);
//       setShowCreateCustomer(false);
//     } else {
//       return;
//     }
//   }
  
//   // Validate form
//   if (!validateOrderForm()) {
//     // Scroll to first error
//     const firstErrorField = document.querySelector('.border-red-500');
//     if (firstErrorField) {
//       firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//     return;
//   }
  
//   // Validate order items
//   if (orderItems.length === 0) {
//     toast.error('Please add at least one product to the order');
//     return;
//   }
  
//   setSubmitting(true);
  
//   try {
//     const token = localStorage.getItem('token');
//     const sessionId = `manual_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
//     // ========== PREPARE ITEMS WITH PRODUCT SLUG ==========
//     const items = orderItems.map(item => {
//       // Generate a slug from product name if not provided
//       let productSlug = item.productSlug;
//       if (!productSlug && item.productName) {
//         productSlug = item.productName
//           .toLowerCase()
//           .replace(/[^a-z0-9]+/g, '-')
//           .replace(/^-+|-+$/g, '');
//       }
//       if (!productSlug) {
//         productSlug = 'unknown-product';
//       }
      
//       return {
//         productId: item.productId,
//         productName: item.productName,
//         productSlug: productSlug,  // ← NOW ALWAYS HAS A VALUE
//         image: item.image || '',
//         regularPrice: item.regularPrice,
//         discountPrice: item.discountPrice || 0,
//         unit: item.unit || 'pcs',
//         stockQuantity: item.stockQuantity || 0,
//         colors: item.colors || [],
//         quantity: item.totalQuantity || 0
//       };
//     });
    
//     const subtotal = calculateSubtotal();
//     const total = calculateTotal();
    
//     const orderData = {
//       items,
//       subtotal,
//       shippingCost,
//       discount: discount || 0,
//       total,
//       paymentMethod: 'cod',
//       customerInfo: {
//         fullName: orderForm.fullName,
//         email: orderForm.email || '',
//         phone: orderForm.phone,
//         division: orderForm.division,
//         address: orderForm.address,
//         city: orderForm.city,
//         zone: orderForm.zone || '',
//         area: orderForm.area || '',
//         zipCode: orderForm.zipCode || '',
//         country: orderForm.country || 'Bangladesh',
//         note: orderForm.note || ''
//       },
//       orderStatus: 'placed',
//       sessionId: sessionId,
//       clientDeviceInfo: {
//         deviceType: 'desktop',
//         browser: 'Admin Panel',
//         os: 'Manual Order',
//         screenResolution: '1920x1080'
//       }
//     };
    
//     // If customer exists, add userId
//     if (customerId) {
//       orderData.userId = customerId;
//     }
    
//     const response = await fetch('http://localhost:5000/api/orders', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify(orderData)
//     });
    
//     const data = await response.json();
    
//     if (data.success) {
//       toast.success('Order placed successfully!');
//       router.push('/authorize/orders');
//     } else {
//       toast.error(data.error || 'Failed to place order');
//     }
//   } catch (error) {
//     console.error('Place order error:', error);
//     toast.error('Network error. Please try again.');
//   } finally {
//     setSubmitting(false);
//   }
// };
  
//   // ========== TOGGLE SECTION ==========
//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
//   };
  
//   // ========== RENDER ==========
//   return (
//     <ProtectedRoute pageKey="all_orders">
//       <div className="min-h-screen bg-white">
//         <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
//           <div className="px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => router.push('/authorize/orders')}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <ArrowLeft className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <div>
//                   <h1 className="text-2xl font-bold text-black flex items-center gap-2">
//                     <ShoppingBag className="w-6 h-6" />
//                     Manual Order Creation
//                   </h1>
//                   <p className="text-sm text-gray-500">Create orders for customers manually</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => router.push('/authorize/orders')}
//                   className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handlePlaceOrder}
//                   disabled={submitting || orderItems.length === 0}
//                   className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                 >
//                   {submitting ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       Placing Order...
//                     </>
//                   ) : (
//                     <>
//                       <Zap className="w-4 h-4" />
//                       Place Order
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="p-6 max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column - Forms */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* ========== CUSTOMER SECTION ========== */}
//               <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//                 <button
//                   onClick={() => toggleSection('customer')}
//                   className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="flex items-center gap-2">
//                     <Users className="w-5 h-5 text-black" />
//                     <h2 className="text-base font-semibold text-black">Customer</h2>
//                     {selectedCustomer && (
//                       <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
//                         Selected
//                       </span>
//                     )}
//                     {showCreateCustomer && (
//                       <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
//                         New Customer
//                       </span>
//                     )}
//                   </div>
//                   {expandedSections.customer ? (
//                     <ChevronUp className="w-4 h-4 text-gray-400" />
//                   ) : (
//                     <ChevronDown className="w-4 h-4 text-gray-400" />
//                   )}
//                 </button>
                
//                 {expandedSections.customer && (
//                   <div className="px-5 pb-5 space-y-4">
//                     {/* Customer Search */}
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         Search Existing Customer
//                       </label>
//                       <div className="relative">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                           type="text"
//                           value={customerSearchQuery}
//                           onChange={(e) => setCustomerSearchQuery(e.target.value)}
//                           placeholder="Search by name, email, or phone..."
//                           className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                         />
//                         {searchingCustomers && (
//                           <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
//                         )}
//                       </div>
                      
//                       {/* Search Results */}
//                       {customerSearchResults.length > 0 && (
//                         <div className="mt-2 border border-gray-200 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
//                           {customerSearchResults.map(customer => (
//                             <button
//                               key={customer._id}
//                               onClick={() => handleSelectCustomer(customer)}
//                               className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 flex items-center gap-3"
//                             >
//                               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
//                                 {customer.contactPerson?.charAt(0) || '?'}
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <p className="text-sm font-medium text-black truncate">
//                                   {customer.contactPerson}
//                                 </p>
//                                 <p className="text-xs text-gray-500 truncate">
//                                   {customer.email} • {customer.phone}
//                                 </p>
//                               </div>
//                               <UserCheck className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Selected Customer Display */}
//                     {selectedCustomer && !showCreateCustomer && (
//                       <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-semibold text-sm">
//                             {selectedCustomer.contactPerson?.charAt(0) || '?'}
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-black">{selectedCustomer.contactPerson}</p>
//                             <p className="text-xs text-gray-500">{selectedCustomer.email} • {selectedCustomer.phone}</p>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => {
//                             setSelectedCustomer(null);
//                             setCustomerSearchQuery('');
//                           }}
//                           className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     )}
                    
//                     {/* Create New Customer Toggle */}
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => {
//                           setShowCreateCustomer(!showCreateCustomer);
//                           if (!showCreateCustomer) {
//                             setSelectedCustomer(null);
//                             setCustomerSearchQuery('');
//                             // Reset create form
//                             setCreateForm({
//                               contactPerson: '',
//                               email: '',
//                               phone: '',
//                               whatsapp: '',
//                               country: '',
//                               address: '',
//                               city: '',
//                               zipCode: '',
//                               password: '',
//                               confirmPassword: '',
//                               subscribeToNewsletter: false
//                             });
//                             setCreateFormErrors({});
//                           }
//                         }}
//                         className="text-sm text-black hover:underline flex items-center gap-1"
//                       >
//                         <UserPlus className="w-4 h-4" />
//                         {showCreateCustomer ? 'Cancel' : 'Create New Customer'}
//                       </button>
//                     </div>
                    
//                     {/* Create Customer Form - EXACTLY MATCHES AllCustomers page */}
//                     {showCreateCustomer && (
//                       <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4">
//                         <h3 className="text-sm font-medium text-black">New Customer Details</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Contact Person <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               name="contactPerson"
//                               value={createForm.contactPerson}
//                               onChange={handleCreateChange}
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                                 createFormErrors.contactPerson ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                               placeholder="Your full name"
//                             />
//                             {createFormErrors.contactPerson && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.contactPerson}</p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Email Address <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="email"
//                               name="email"
//                               value={createForm.email}
//                               onChange={handleCreateChange}
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                                 createFormErrors.email ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                               placeholder="your@email.com"
//                             />
//                             {createFormErrors.email && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.email}</p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Phone Number <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="tel"
//                               name="phone"
//                               value={createForm.phone}
//                               onChange={handleCreateChange}
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                                 createFormErrors.phone ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                               placeholder="+1 234 567 8900"
//                             />
//                             {createFormErrors.phone && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.phone}</p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               WhatsApp Number
//                             </label>
//                             <input
//                               type="tel"
//                               name="whatsapp"
//                               value={createForm.whatsapp}
//                               onChange={handleCreateChange}
//                               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                               placeholder="+1 234 567 8900"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Country <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               name="country"
//                               value={createForm.country}
//                               onChange={handleCreateChange}
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                                 createFormErrors.country ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                               placeholder="Bangladesh"
//                             />
//                             {createFormErrors.country && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.country}</p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               City <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               name="city"
//                               value={createForm.city}
//                               onChange={handleCreateChange}
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                                 createFormErrors.city ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                               placeholder="Dhaka"
//                             />
//                             {createFormErrors.city && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.city}</p>
//                             )}
//                           </div>
//                           <div className="md:col-span-1">
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Street Address <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               name="address"
//                               value={createForm.address}
//                               onChange={handleCreateChange}
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                                 createFormErrors.address ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                               placeholder="Your street address"
//                             />
//                             {createFormErrors.address && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.address}</p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               ZIP Code <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               name="zipCode"
//                               value={createForm.zipCode}
//                               onChange={handleCreateChange}
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                                 createFormErrors.zipCode ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                               placeholder="10001"
//                             />
//                             {createFormErrors.zipCode && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.zipCode}</p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Password <span className="text-red-500">*</span>
//                             </label>
//                             <div className="relative">
//                               <input
//                                 type={showPassword ? "text" : "password"}
//                                 name="password"
//                                 value={createForm.password}
//                                 onChange={handleCreateChange}
//                                 className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent pr-10 ${
//                                   createFormErrors.password ? 'border-red-500' : 'border-gray-300'
//                                 }`}
//                                 placeholder="Min. 8 characters"
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                               >
//                                 {showPassword ? (
//                                   <EyeOff className="w-4 h-4" />
//                                 ) : (
//                                   <Eye className="w-4 h-4" />
//                                 )}
//                               </button>
//                             </div>
//                             {createFormErrors.password && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.password}</p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Confirm Password <span className="text-red-500">*</span>
//                             </label>
//                             <div className="relative">
//                               <input
//                                 type={showConfirmPassword ? "text" : "password"}
//                                 name="confirmPassword"
//                                 value={createForm.confirmPassword}
//                                 onChange={handleCreateChange}
//                                 className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent pr-10 ${
//                                   createFormErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                                 }`}
//                                 placeholder="Re-enter password"
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                               >
//                                 {showConfirmPassword ? (
//                                   <EyeOff className="w-4 h-4" />
//                                 ) : (
//                                   <Eye className="w-4 h-4" />
//                                 )}
//                               </button>
//                             </div>
//                             {createFormErrors.confirmPassword && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.confirmPassword}</p>
//                             )}
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
//                           <button
//                             type="button"
//                             onClick={() => setShowCreateCustomer(false)}
//                             className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//                           >
//                             Cancel
//                           </button>
//                           <button
//                             type="button"
//                             onClick={async () => {
//                               const newCustomer = await handleCreateCustomer();
//                               if (newCustomer) {
//                                 // Auto-select the newly created customer
//                                 handleSelectCustomer(newCustomer);
//                                 setShowCreateCustomer(false);
//                               }
//                             }}
//                             disabled={isCreating}
//                             className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
//                           >
//                             {isCreating ? (
//                               <>
//                                 <RefreshCw className="w-4 h-4 animate-spin" />
//                                 Creating...
//                               </>
//                             ) : (
//                               <>
//                                 <UserPlus className="w-4 h-4" />
//                                 Create & Select
//                               </>
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
              
//               {/* ========== PRODUCTS SECTION ========== */}
//               <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//   <button
//     onClick={() => toggleSection('products')}
//     className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
//   >
//     <div className="flex items-center gap-2">
//       <Package className="w-5 h-5 text-black" />
//       <h2 className="text-base font-semibold text-black">Products</h2>
//       {orderItems.length > 0 && (
//         <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
//           {orderItems.length} items
//         </span>
//       )}
//     </div>
//     {expandedSections.products ? (
//       <ChevronUp className="w-4 h-4 text-gray-400" />
//     ) : (
//       <ChevronDown className="w-4 h-4 text-gray-400" />
//     )}
//   </button>
  
//   {expandedSections.products && (
//     <div className="px-5 pb-5 space-y-4">
//       {/* Add Product Button */}
//       {!showAddProduct ? (
//         <button
//           onClick={() => setShowAddProduct(true)}
//           className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors text-sm text-gray-600 hover:text-black flex items-center justify-center gap-2"
//         >
//           <Plus className="w-4 h-4" />
//           Add Product
//         </button>
//       ) : (
//         <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="text-sm font-medium text-black">Add Product</h3>
//             <button
//               onClick={() => {
//                 setShowAddProduct(false);
//                 setSelectedProduct(null);
//                 setProductSearchQuery('');
//                 setProductSearchResults([]);
//                 setSelectedColorsWithQty([]);
//                 setAddQuantity(1);
//               }}
//               className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
          
//           {/* Product Search */}
//           <div className="relative mb-3">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               value={productSearchQuery}
//               onChange={(e) => setProductSearchQuery(e.target.value)}
//               placeholder="Search products by name, SKU, or barcode..."
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
//               autoFocus
//             />
//             {searchingProducts && (
//               <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
//             )}
//           </div>
          
//           {/* Search Results */}
//           {productSearchResults.length > 0 && (
//             <div className="mb-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-white">
//               {productSearchResults.map(product => (
//                 <button
//                   key={product._id}
//                   onClick={() => handleSelectProduct(product)}
//                   className={`w-full p-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 flex items-center gap-3 ${
//                     selectedProduct?._id === product._id ? 'bg-gray-50' : ''
//                   }`}
//                 >
//                   <img
//                     src={product.images?.[0]?.url || 'https://via.placeholder.com/40'}
//                     alt={product.productName}
//                     className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
//                     onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
//                   />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-black truncate">{product.productName}</p>
//                     <div className="flex items-center gap-2 text-xs text-gray-500">
//                       <span>৳{(product.discountPrice || product.regularPrice).toFixed(2)}</span>
//                       {product.discountPrice > 0 && (
//                         <span className="line-through">৳{product.regularPrice.toFixed(2)}</span>
//                       )}
//                       <span>• Stock: {product.stockQuantity}</span>
//                       {product.colors && product.colors.length > 0 && (
//                         <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
//                           {product.colors.length} colors
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   {selectedProduct?._id === product._id && (
//                     <Check className="w-4 h-4 text-black" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           )}
          
//           {/* Selected Product */}
//           {selectedProduct && (
//             <div className="bg-white rounded-lg p-3 border border-gray-200 space-y-3">
//               <div className="flex items-center gap-3">
//                 <img
//                   src={selectedProduct.images?.[0]?.url || 'https://via.placeholder.com/40'}
//                   alt={selectedProduct.productName}
//                   className="w-12 h-12 rounded-lg object-cover border border-gray-200"
//                   onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
//                 />
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-black">{selectedProduct.productName}</p>
//                   <p className="text-xs text-gray-500">
//                     Stock: {selectedProduct.stockQuantity} • ৳{(selectedProduct.discountPrice || selectedProduct.regularPrice).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
              
//               {/* Color Selection */}
//               {selectedProduct.colors && selectedProduct.colors.length > 0 ? (
//                 <div className="space-y-2">
//                   <p className="text-xs font-medium text-gray-700">Select Colors:</p>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedProduct.colors.map((color) => {
//                       const selected = selectedColorsWithQty.find(c => c.color === color);
//                       const isSelected = !!selected;
//                       const quantity = selected?.quantity || 1;
                      
//                       // Calculate max allowed
//                       const totalSelectedOthers = selectedColorsWithQty
//                         .filter(c => c.color !== color)
//                         .reduce((sum, c) => sum + Number(c.quantity || 0), 0);
//                       const maxAllowed = selectedProduct.stockQuantity - totalSelectedOthers;
                      
//                       return (
//                         <div key={color} className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
//                           isSelected ? 'border-black bg-gray-50' : 'border-gray-200'
//                         }`}>
//                           {/* Color swatch - only show color, no text */}
//                           <div 
//                             className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
//                             style={{ backgroundColor: color }}
//                             title={color}
//                           />
                          
//                           <button
//                             onClick={() => toggleColorSelection(color)}
//                             className={`px-2 py-0.5 text-xs rounded transition-colors ${
//                               isSelected ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-black text-white hover:bg-gray-800'
//                             }`}
//                           >
//                             {isSelected ? 'Remove' : 'Add'}
//                           </button>
                          
//                           {isSelected && (
//                             <div className="flex items-center gap-1">
//                               <button
//                                 onClick={() => updateSelectedColorQuantity(color, quantity - 1)}
//                                 disabled={quantity <= 1}
//                                 className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
//                               >
//                                 <Minus className="w-3 h-3" />
//                               </button>
//                               <input
//                                 type="text"
//                                 inputMode="numeric"
//                                 pattern="[0-9]*"
//                                 value={quantity}
//                                 onChange={(e) => {
//                                   const value = e.target.value;
//                                   // Allow empty string or digits only
//                                   if (value === '' || /^\d+$/.test(value)) {
//                                     const numValue = parseInt(value);
//                                     if (value === '') {
//                                       // If empty, keep the current quantity
//                                       return;
//                                     }
//                                     if (!isNaN(numValue) && numValue >= 1) {
//                                       const finalValue = Math.min(numValue, maxAllowed);
//                                       updateSelectedColorQuantity(color, finalValue);
//                                     }
//                                   }
//                                 }}
//                                 onBlur={(e) => {
//                                   const value = e.target.value;
//                                   const numValue = parseInt(value);
//                                   if (value === '' || isNaN(numValue) || numValue < 1) {
//                                     // Reset to 1 if invalid
//                                     updateSelectedColorQuantity(color, 1);
//                                   }
//                                 }}
//                                 className="w-12 text-center text-xs border border-gray-300 rounded focus:ring-1 focus:ring-black py-0.5"
//                               />
//                               <button
//                                 onClick={() => updateSelectedColorQuantity(color, quantity + 1)}
//                                 disabled={quantity >= maxAllowed || maxAllowed <= 0}
//                                 className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
//                               >
//                                 <Plus className="w-3 h-3" />
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     {selectedColorsWithQty.length > 0 ? (
//                       <span className="text-green-600">
//                         ✓ {selectedColorsWithQty.length} color(s) selected • Total: {selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0)}
//                       </span>
//                     ) : (
//                       <span className="text-orange-500">Click "Add" on a color above</span>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-3">
//                   <span className="text-xs text-gray-600">Quantity:</span>
//                   <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                     <button
//                       onClick={() => setAddQuantity(prev => Math.max(1, prev - 1))}
//                       className="px-2 py-1 hover:bg-gray-100 transition-colors"
//                     >
//                       <Minus className="w-3 h-3" />
//                     </button>
//                     <input
//                       type="text"
//                       inputMode="numeric"
//                       pattern="[0-9]*"
//                       value={addQuantity}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         // Allow empty string or digits only
//                         if (value === '' || /^\d+$/.test(value)) {
//                           const numValue = parseInt(value);
//                           if (value === '') {
//                             // If empty, keep the current quantity
//                             return;
//                           }
//                           if (!isNaN(numValue) && numValue >= 1) {
//                             setAddQuantity(Math.min(numValue, selectedProduct.stockQuantity));
//                           }
//                         }
//                       }}
//                       onBlur={(e) => {
//                         const value = e.target.value;
//                         const numValue = parseInt(value);
//                         if (value === '' || isNaN(numValue) || numValue < 1) {
//                           setAddQuantity(1);
//                         }
//                       }}
//                       className="w-14 text-center text-sm py-1 bg-white focus:outline-none"
//                     />
//                     <button
//                       onClick={() => setAddQuantity(prev => Math.min(selectedProduct.stockQuantity, prev + 1))}
//                       disabled={addQuantity >= selectedProduct.stockQuantity}
//                       className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 transition-colors"
//                     >
//                       <Plus className="w-3 h-3" />
//                     </button>
//                   </div>
//                   <span className="text-xs text-gray-500">/ {selectedProduct.stockQuantity}</span>
//                 </div>
//               )}
              
//               <button
//                 onClick={handleAddProductToOrder}
//                 disabled={selectedProduct.colors?.length > 0 && selectedColorsWithQty.length === 0}
//                 className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 <Plus className="w-4 h-4" />
//                 Add to Order
//               </button>
//             </div>
//           )}
//         </div>
//       )}
      
//       {/* Order Items List */}
//       {orderItems.length > 0 && (
//         <div className="space-y-3 mt-3">
//           {orderItems.map((item, index) => {
//             const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//             const totalPrice = price * (item.totalQuantity || 0);
//             const hasColors = item.colors && item.colors.length > 0;
            
//             return (
//               <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
//                 {/* Product Header */}
//                 <div className="flex items-start gap-3 p-3 bg-gray-50 border-b border-gray-200">
//                   <img
//                     src={item.image || 'https://via.placeholder.com/40'}
//                     alt={item.productName}
//                     className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
//                     onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
//                   />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-black">{item.productName}</p>
//                     <div className="flex items-center gap-2 text-xs text-gray-500">
//                       <span>৳{price.toFixed(2)}/{getUnitLabel(item.unit)}</span>
//                       {item.discountPrice > 0 && (
//                         <span className="line-through">৳{item.regularPrice.toFixed(2)}</span>
//                       )}
//                       <span>• Stock: {item.stockQuantity}</span>
//                       <span>• Total: {item.totalQuantity} items</span>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => removeItemFromOrder(index)}
//                     className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
                
//                 {/* Colors - Only show color swatch, no color name text */}
//                 {hasColors && (
//                   <div className="p-3 space-y-2">
//                     {item.colors.map((colorInfo, colorIndex) => (
//                       <div key={colorIndex} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
//                         {/* Color swatch only - no text */}
//                         <div 
//                           className="w-5 h-5 rounded-full border border-gray-300 flex-shrink-0"
//                           style={{ backgroundColor: colorInfo.color }}
//                           title={colorInfo.color}
//                         />
                        
//                         <div className="flex items-center gap-1">
//                           <button
//                             onClick={() => updateItemQuantity(index, colorInfo.color, colorInfo.quantity - 1)}
//                             disabled={colorInfo.quantity <= 1}
//                             className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
//                           >
//                             <Minus className="w-3 h-3" />
//                           </button>
//                           <input
//                             type="text"
//                             inputMode="numeric"
//                             pattern="[0-9]*"
//                             value={colorInfo.quantity}
//                             onChange={(e) => {
//                               const value = e.target.value;
//                               // Allow empty string or digits only
//                               if (value === '' || /^\d+$/.test(value)) {
//                                 const numValue = parseInt(value);
//                                 if (value === '') {
//                                   // If empty, keep the current quantity
//                                   return;
//                                 }
//                                 if (!isNaN(numValue) && numValue >= 1) {
//                                   const maxAllowed = item.stockQuantity - item.colors
//                                     .filter(c => c.color !== colorInfo.color)
//                                     .reduce((sum, c) => sum + c.quantity, 0);
//                                   const finalValue = Math.min(numValue, maxAllowed);
//                                   updateItemQuantity(index, colorInfo.color, finalValue);
//                                 }
//                               }
//                             }}
//                             onBlur={(e) => {
//                               const value = e.target.value;
//                               const numValue = parseInt(value);
//                               if (value === '' || isNaN(numValue) || numValue < 1) {
//                                 // Reset to 1 if invalid
//                                 updateItemQuantity(index, colorInfo.color, 1);
//                               }
//                             }}
//                             className="w-12 text-center text-xs border border-gray-300 rounded focus:ring-1 focus:ring-black py-0.5"
//                           />
//                           <button
//                             onClick={() => updateItemQuantity(index, colorInfo.color, colorInfo.quantity + 1)}
//                             disabled={colorInfo.quantity >= item.stockQuantity}
//                             className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
//                           >
//                             <Plus className="w-3 h-3" />
//                           </button>
//                         </div>
                        
//                         <span className="text-xs text-gray-500 ml-auto">
//                           ৳{(colorInfo.price * colorInfo.quantity).toFixed(2)}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
                
//                 {/* No Color - Quantity Controls with text input */}
//                 {!hasColors && (
//                   <div className="p-3 flex items-center justify-end gap-3">
//                     <span className="text-xs text-gray-500">Quantity:</span>
//                     <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                       <button
//                         onClick={() => {
//                           const newQty = (item.totalQuantity || 1) - 1;
//                           if (newQty >= 1) {
//                             updateItemQuantity(index, null, newQty);
//                           } else {
//                             removeItemFromOrder(index);
//                           }
//                         }}
//                         className="px-2 py-1 hover:bg-gray-100 transition-colors"
//                       >
//                         <Minus className="w-3 h-3" />
//                       </button>
//                       <input
//                         type="text"
//                         inputMode="numeric"
//                         pattern="[0-9]*"
//                         value={item.totalQuantity}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           // Allow empty string or digits only
//                           if (value === '' || /^\d+$/.test(value)) {
//                             const numValue = parseInt(value);
//                             if (value === '') {
//                               // If empty, keep the current quantity
//                               return;
//                             }
//                             if (!isNaN(numValue) && numValue >= 1) {
//                               const finalValue = Math.min(numValue, item.stockQuantity);
//                               updateItemQuantity(index, null, finalValue);
//                             }
//                           }
//                         }}
//                         onBlur={(e) => {
//                           const value = e.target.value;
//                           const numValue = parseInt(value);
//                           if (value === '' || isNaN(numValue) || numValue < 1) {
//                             // Reset to 1 if invalid
//                             updateItemQuantity(index, null, 1);
//                           }
//                         }}
//                         className="w-14 text-center text-sm py-1 bg-white focus:outline-none"
//                       />
//                       <button
//                         onClick={() => updateItemQuantity(index, null, (item.totalQuantity || 1) + 1)}
//                         disabled={(item.totalQuantity || 1) >= item.stockQuantity}
//                         className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 transition-colors"
//                       >
//                         <Plus className="w-3 h-3" />
//                       </button>
//                     </div>
//                     <span className="text-xs text-gray-500">/ {item.stockQuantity}</span>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   )}
// </div>
              
//               {/* ========== DELIVERY ADDRESS SECTION ========== */}
//           {/* ========== DELIVERY ADDRESS SECTION ========== */}
// <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//   <button
//     onClick={() => toggleSection('address')}
//     className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
//   >
//     <div className="flex items-center gap-2">
//       <MapPin className="w-5 h-5 text-black" />
//       <h2 className="text-base font-semibold text-black">Delivery Address</h2>
//     </div>
//     {expandedSections.address ? (
//       <ChevronUp className="w-4 h-4 text-gray-400" />
//     ) : (
//       <ChevronDown className="w-4 h-4 text-gray-400" />
//     )}
//   </button>
  
//   {expandedSections.address && (
//     <div className="px-5 pb-5 space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">
//             Full Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={orderForm.fullName}
//             onChange={(e) => setOrderForm(prev => ({ ...prev, fullName: e.target.value }))}
//             className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//               formErrors.fullName ? 'border-red-500' : 'border-gray-300'
//             }`}
//             placeholder="John Doe"
//           />
//           {formErrors.fullName && (
//             <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">
//             Phone <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="tel"
//             value={orderForm.phone}
//             onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
//             className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//               formErrors.phone ? 'border-red-500' : 'border-gray-300'
//             }`}
//             placeholder="01XXXXXXXXX"
//           />
//           {formErrors.phone && (
//             <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             value={orderForm.email}
//             onChange={(e) => setOrderForm(prev => ({ ...prev, email: e.target.value }))}
//             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//             placeholder="john@example.com"
//           />
//         </div>
        
//         {/* ========== DIVISION ========== */}
//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">
//             Division <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={orderForm.division}
//             onChange={(e) => {
//               const division = e.target.value;
//               setOrderForm(prev => ({ 
//                 ...prev, 
//                 division: division,
//                 city: '',
//                 zone: '',
//                 area: ''
//               }));
//               // Update cities based on division
//               if (division && divisions[division]) {
//                 setCitiesByDivision(divisions[division]);
//               } else {
//                 setCitiesByDivision([]);
//               }
//               setZones([]);
//               setAreas([]);
//             }}
//             className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//               formErrors.division ? 'border-red-500' : 'border-gray-300'
//             }`}
//           >
//             <option value="">Select Division</option>
//             {divisionList.map(division => (
//               <option key={division} value={division}>{division}</option>
//             ))}
//           </select>
//           {formErrors.division && (
//             <p className="text-xs text-red-500 mt-1">{formErrors.division}</p>
//           )}
//         </div>
        
//         {/* ========== DISTRICT/CITY ========== */}
//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">
//             District/City <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={orderForm.city}
//             onChange={(e) => {
//               const city = e.target.value;
//               setOrderForm(prev => ({ ...prev, city: city, zone: '', area: '' }));
//               // Update zones based on city
//               if (city && locationData[city]) {
//                 const availableZones = Object.keys(locationData[city].zones || {});
//                 setZones(availableZones);
//               } else {
//                 setZones([]);
//               }
//               setAreas([]);
//               // Calculate shipping
//               if (city) {
//                 calculateShipping(city);
//               }
//             }}
//             disabled={!orderForm.division}
//             className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//               formErrors.city ? 'border-red-500' : 'border-gray-300'
//             } ${!orderForm.division ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//           >
//             <option value="">Select District</option>
//             {citiesByDivision.map(city => (
//               <option key={city} value={city}>{city}</option>
//             ))}
//           </select>
//           {formErrors.city && (
//             <p className="text-xs text-red-500 mt-1">{formErrors.city}</p>
//           )}
//         </div>
        
//         {/* ========== UPAZILA/THANA ========== */}
//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">
//             Upazila/Thana <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={orderForm.zone}
//             onChange={(e) => {
//               const zone = e.target.value;
//               setOrderForm(prev => ({ ...prev, zone: zone, area: '' }));
//               // Update areas based on zone
//               if (zone && orderForm.city && locationData[orderForm.city]) {
//                 const availableAreas = locationData[orderForm.city].zones[zone] || [];
//                 setAreas(availableAreas);
//               } else {
//                 setAreas([]);
//               }
//               // Recalculate shipping with zone
//               if (orderForm.city && zone) {
//                 calculateShipping(orderForm.city);
//               }
//             }}
//             disabled={!orderForm.city}
//             className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//               formErrors.zone ? 'border-red-500' : 'border-gray-300'
//             } ${!orderForm.city ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//           >
//             <option value="">Select Upazila/Thana</option>
//             {zones.map(zone => (
//               <option key={zone} value={zone}>{zone}</option>
//             ))}
//           </select>
//           {formErrors.zone && (
//             <p className="text-xs text-red-500 mt-1">{formErrors.zone}</p>
//           )}
//         </div>
        
//         {/* ========== UNION/AREA ========== */}
//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">
//             Union/Area
//           </label>
//           <select
//             value={orderForm.area}
//             onChange={(e) => {
//               const area = e.target.value;
//               setOrderForm(prev => ({ ...prev, area: area }));
//               // Recalculate shipping with area
//               if (orderForm.city && orderForm.zone && area) {
//                 calculateShipping(orderForm.city);
//               }
//             }}
//             disabled={!orderForm.zone}
//             className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//               !orderForm.zone ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'
//             }`}
//           >
//             <option value="">Select Union/Area</option>
//             {areas.map(area => (
//               <option key={area} value={area}>{area}</option>
//             ))}
//           </select>
//         </div>
        
//         {/* ========== ADDRESS ========== */}
//         <div className="md:col-span-2">
//           <label className="block text-xs font-medium text-gray-700 mb-1">
//             Address <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             value={orderForm.address}
//             onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
//             rows="2"
//             className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none ${
//               formErrors.address ? 'border-red-500' : 'border-gray-300'
//             }`}
//             placeholder="House #, Road #, Area"
//           />
//           {formErrors.address && (
//             <p className="text-xs text-red-500 mt-1">{formErrors.address}</p>
//           )}
//         </div>
//       </div>
      
//       {/* Shipping Cost Display */}
//       {orderForm.city && (
//         <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between">
//           <div className="flex items-center gap-2 text-sm">
//             <Truck className="w-4 h-4 text-gray-500" />
//             <span className="text-gray-600">Shipping Cost:</span>
//           </div>
//           <span className="text-sm font-semibold text-black">
//             ৳{shippingCost.toFixed(2)}
//           </span>
//         </div>
//       )}
//     </div>
//   )}
// </div>
//             </div>
            
//             {/* Right Column - Order Summary */}
//           {/* Right Column - Order Summary */}
// <div className="lg:col-span-1">
//   <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-24">
//     <div className="px-5 py-3 border-b border-gray-200">
//       <div className="flex items-center gap-2">
//         <ShoppingBag className="w-5 h-5 text-black" />
//         <h2 className="text-base font-semibold text-black">Order Summary</h2>
//         <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
//           {orderItems.reduce((sum, item) => sum + (item.totalQuantity || 0), 0)} items
//         </span>
//       </div>
//     </div>
    
//     <div className="p-5 space-y-4">
//       {/* Customer Info */}
//       <div className="space-y-1 text-sm">
//         <p className="text-xs text-gray-500 font-medium">Customer</p>
//         {selectedCustomer ? (
//           <>
//             <p className="text-sm font-medium text-black">{selectedCustomer.contactPerson}</p>
//             <p className="text-xs text-gray-500">{selectedCustomer.email} • {selectedCustomer.phone}</p>
//           </>
//         ) : showCreateCustomer ? (
//           <p className="text-sm text-blue-600">New Customer (will be created)</p>
//         ) : (
//           <p className="text-sm text-gray-400">No customer selected</p>
//         )}
//       </div>
      
//       {/* ========== ORDER ITEMS SUMMARY - COLOR WISE ========== */}
//       <div className="border-t border-gray-200 pt-3">
//         <p className="text-xs text-gray-500 font-medium mb-2">Items ({orderItems.length})</p>
//         <div className="max-h-60 overflow-y-auto space-y-2">
//           {orderItems.map((item, index) => {
//             const hasColors = item.colors && item.colors.length > 0;
//             const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
            
//             return (
//               <div key={index} className="border border-gray-100 rounded-lg p-2 bg-gray-50/50">
//                 {/* Product Name */}
//                 <div className="flex items-start gap-2 mb-1.5">
//                   <img
//                     src={item.image || 'https://via.placeholder.com/30'}
//                     alt={item.productName}
//                     className="w-8 h-8 rounded object-cover border border-gray-200 flex-shrink-0"
//                     onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
//                   />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-xs font-medium text-black truncate">{item.productName}</p>
//                     <p className="text-[10px] text-gray-500">
//                       ৳{price.toFixed(2)}/{getUnitLabel(item.unit)}
//                     </p>
//                   </div>
//                   <span className="text-xs font-medium text-black whitespace-nowrap">
//                     ৳{(price * (item.totalQuantity || 0)).toFixed(2)}
//                   </span>
//                 </div>
                
//                 {/* ========== COLORS LIST ========== */}
//                 {hasColors ? (
//                   <div className="space-y-1 ml-10">
//                     {item.colors.map((colorInfo, colorIndex) => (
//                       <div key={colorIndex} className="flex items-center justify-between text-xs">
//                         <div className="flex items-center gap-1.5">
//                           {/* Color swatch - using the color name as background */}
//                           <div 
//                             className="w-3.5 h-3.5 rounded-full border border-gray-300 flex-shrink-0"
//                             style={{ backgroundColor: colorInfo.color.toLowerCase() }}
//                             title={colorInfo.color}
//                           />
//                           <span className="text-gray-600 text-[10px] font-medium">
//                             {colorInfo.color}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className="text-gray-500 text-[10px]">x{colorInfo.quantity}</span>
//                           <span className="text-black font-medium text-[10px]">
//                             ৳{(colorInfo.price * colorInfo.quantity).toFixed(2)}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
                    
//                     {/* Total quantity for this product */}
//                     <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-200 pt-1 mt-1">
//                       <span>Total</span>
//                       <span className="font-medium text-gray-600">
//                         {item.totalQuantity} items • ৳{(price * (item.totalQuantity || 0)).toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 ) : (
//                   /* No colors - just show quantity */
//                   <div className="flex items-center justify-between text-xs ml-10">
//                     <span className="text-gray-500 text-[10px]">Quantity</span>
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-500 text-[10px]">x{item.totalQuantity}</span>
//                       <span className="text-black font-medium text-[10px]">
//                         ৳{(price * (item.totalQuantity || 0)).toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
      
//       {/* ========== TOTALS ========== */}
//       <div className="border-t border-gray-200 pt-3 space-y-2">
//         <div className="flex justify-between text-sm">
//           <span className="text-gray-600">Subtotal</span>
//           <span className="text-black">৳{calculateSubtotal().toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-sm">
//           <span className="text-gray-600">Shipping</span>
//           <span className="text-green-600">৳{shippingCost.toFixed(2)}</span>
//         </div>
        
//         {/* Discount Input */}
//         <div className="flex items-center gap-2">
//           <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
//           <input
//             type="number"
//             value={discount}
//             onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
//             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//             placeholder="Discount amount"
//             min="0"
//             step="0.5"
//           />
//         </div>
//         {discount > 0 && (
//           <div className="flex justify-between text-sm text-green-600">
//             <span>Discount Applied</span>
//             <span>- ৳{discount.toFixed(2)}</span>
//           </div>
//         )}
        
//         <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
//           <span className="text-black">Total</span>
//           <span className="text-black">৳{calculateTotal().toFixed(2)}</span>
//         </div>
//       </div>
      
//       {/* Order Note */}
//       <div className="border-t border-gray-200 pt-3">
//         <label className="block text-xs font-medium text-gray-700 mb-1">
//           Order Note
//         </label>
//         <textarea
//           value={orderForm.note}
//           onChange={(e) => setOrderForm(prev => ({ ...prev, note: e.target.value }))}
//           rows="2"
//           className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
//           placeholder="Special instructions for this order..."
//         />
//       </div>
      
//       {/* Place Order Button */}
//       <button
//         onClick={handlePlaceOrder}
//         disabled={submitting || orderItems.length === 0 || (!selectedCustomer && !showCreateCustomer)}
//         className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//       >
//         {submitting ? (
//           <>
//             <Loader2 className="w-4 h-4 animate-spin" />
//             Placing Order...
//           </>
//         ) : (
//           <>
//             <Zap className="w-4 h-4" />
//             Place Order
//           </>
//         )}
//       </button>
      
//       {(!selectedCustomer && !showCreateCustomer) && (
//         <p className="text-xs text-orange-500 text-center">
//           Please select or create a customer
//         </p>
//       )}
//       {orderItems.length === 0 && (
//         <p className="text-xs text-orange-500 text-center">
//           Please add at least one product
//         </p>
//       )}
//     </div>
//   </div>
// </div>
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }




// app/authorize/create-order/page.js
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  UserPlus,
  Users,
  Package,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  User,
  X,
  Plus,
  Minus,
  Trash2,
  Save,
  Check,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Tag,
  Building2,
  Globe,
  Home,
  CreditCard,
  Truck,
  Zap,
  Eye,
  Edit2,
  UserCheck,
  Sparkles,
  ArrowLeft,
  Calendar,
  Clock,
  Scale,
  Palette,
  Box,
  EyeOff,
  Smartphone,
  Lock,
  RefreshCw
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ========== HELPER FUNCTIONS ==========
const getUnitLabel = (unit) => {
  const units = {
    'pcs': 'pcs',
    'ton': 'ton',
    'other': 'unit'
  };
  return units[unit] || unit;
};

const formatPrice = (price) => {
  return price?.toFixed(2) || '0.00';
};

// ========== MAIN COMPONENT ==========
export default function ManualOrderCreate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // ========== LOCATION DATA ==========
  const [locationData, setLocationData] = useState({});
  const [divisions, setDivisions] = useState({});
  const [divisionList, setDivisionList] = useState([]);
  const [citiesByDivision, setCitiesByDivision] = useState([]);
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [locationLoading, setLocationLoading] = useState(true);
  const [shippingCost, setShippingCost] = useState(0);
  
  // ========== CUSTOMER SEARCH ==========
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [customerSearchResults, setCustomerSearchResults] = useState([]);
  const [searchingCustomers, setSearchingCustomers] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);
  
  // ========== PRODUCT SEARCH ==========
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [productSearchResults, setProductSearchResults] = useState([]);
  const [searchingProducts, setSearchingProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColorsWithQty, setSelectedColorsWithQty] = useState([]);
  const [addQuantity, setAddQuantity] = useState(1);
  const [showAddProduct, setShowAddProduct] = useState(false);

  // ========== QUANTITY INPUT STATE ==========
  const [quantityInputs, setQuantityInputs] = useState({});
  const [addQuantityInput, setAddQuantityInput] = useState(null);
  const [itemQuantityInputs, setItemQuantityInputs] = useState({});
  
  // ========== ORDER ITEMS ==========
  const [orderItems, setOrderItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountNote, setDiscountNote] = useState('');
  const [orderNote, setOrderNote] = useState('');
  
  // ========== CREATE CUSTOMER FORM (Matches AllCustomers page exactly) ==========
  const [createForm, setCreateForm] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    subscribeToNewsletter: false
  });
  
  const [createFormErrors, setCreateFormErrors] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // ========== ORDER FORM (Delivery Address) ==========
  const [orderForm, setOrderForm] = useState({
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
  
  const [formErrors, setFormErrors] = useState({});
  
  // ========== UI STATE ==========
  const [expandedSections, setExpandedSections] = useState({
    customer: true,
    products: true,
    address: true,
    summary: true
  });
  
  // ========== HELPER: Set color quantity raw (allows 0) ==========
  const setColorQuantityRaw = (color, qty) => {
    setSelectedColorsWithQty(prev =>
      prev.map(c => (c.color === color ? { ...c, quantity: qty } : c))
    );
  };
  
  // ========== FETCH LOCATIONS ==========
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
        setLocationLoading(false);
      } catch (error) {
        console.error('Failed to load location data:', error);
        setLocationLoading(false);
      }
    };
    fetchLocations();
  }, []);
  
  // ========== UPDATE CITIES WHEN DIVISION CHANGES (Order Form) ==========
  useEffect(() => {
    if (orderForm.division && divisions[orderForm.division]) {
      setCitiesByDivision(divisions[orderForm.division]);
      setOrderForm(prev => ({ ...prev, city: '' }));
    } else {
      setCitiesByDivision([]);
    }
  }, [orderForm.division, divisions]);
  
  // ========== CALCULATE SHIPPING ==========
  const calculateShipping = useCallback(async (city) => {
    if (!city) {
      setShippingCost(0);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/delivery/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city })
      });
      const data = await response.json();
      if (data.success) {
        setShippingCost(data.data.charge || 0);
        return data.data.charge || 0;
      }
      setShippingCost(0);
      return 0;
    } catch (error) {
      console.error('Error calculating shipping:', error);
      setShippingCost(0);
      return 0;
    }
  }, []);
  
  // ========== RECALCULATE SHIPPING ON CITY CHANGE ==========
  useEffect(() => {
    if (orderForm.city) {
      calculateShipping(orderForm.city);
    }
  }, [orderForm.city, calculateShipping]);
  
  // ========== SEARCH CUSTOMERS ==========
  const searchCustomers = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setCustomerSearchResults([]);
      return;
    }
    
    setSearchingCustomers(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/auth/admin/customers?search=${encodeURIComponent(query)}&limit=10`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await response.json();
      if (data.success) {
        setCustomerSearchResults(data.customers || []);
      } else {
        setCustomerSearchResults([]);
      }
    } catch (error) {
      console.error('Search customers error:', error);
      setCustomerSearchResults([]);
    } finally {
      setSearchingCustomers(false);
    }
  }, []);
  
  // Debounced customer search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (customerSearchQuery) {
        searchCustomers(customerSearchQuery);
      } else {
        setCustomerSearchResults([]);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [customerSearchQuery, searchCustomers]);
  
  // ========== SEARCH PRODUCTS ==========
  const searchProducts = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setProductSearchResults([]);
      return;
    }
    
    setSearchingProducts(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/orders/search-products?query=${encodeURIComponent(query)}&limit=10`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await response.json();
      if (data.success) {
        setProductSearchResults(data.data || []);
      } else {
        setProductSearchResults([]);
      }
    } catch (error) {
      console.error('Search products error:', error);
      setProductSearchResults([]);
    } finally {
      setSearchingProducts(false);
    }
  }, []);
  
  // Debounced product search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (productSearchQuery) {
        searchProducts(productSearchQuery);
      } else {
        setProductSearchResults([]);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [productSearchQuery, searchProducts]);
  
  // ========== SELECT CUSTOMER ==========
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setCustomerSearchQuery(customer.contactPerson || customer.email);
    setCustomerSearchResults([]);
    
    // Auto-fill order form with customer data
    setOrderForm({
      fullName: customer.contactPerson || '',
      email: customer.email || '',
      phone: customer.phone || '',
      division: customer.division || '',
      address: customer.address || '',
      city: customer.city || '',
      zone: customer.zone || '',
      area: customer.area || '',
      zipCode: customer.zipCode || '',
      country: customer.country || 'Bangladesh',
      note: ''
    });
    
    // Trigger shipping calculation
    if (customer.city) {
      calculateShipping(customer.city);
    }
  };
  
  // ========== SELECT PRODUCT ==========
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setSelectedColorsWithQty([]);
    setAddQuantity(1);
    setAddQuantityInput(null);
    setProductSearchResults([]);
    setProductSearchQuery(product.productName);
  };
  
  // ========== TOGGLE COLOR SELECTION ==========
  const toggleColorSelection = (color) => {
    setSelectedColorsWithQty(prev => {
      const exists = prev.find(c => c.color === color);
      if (exists) {
        return prev.filter(c => c.color !== color);
      } else {
        return [...prev, { color, quantity: 1 }];
      }
    });
  };
  
  // ========== UPDATE COLOR QUANTITY ==========
  const updateSelectedColorQuantity = (color, newQuantity) => {
    if (newQuantity < 1) return;
    
    const totalSelectedOthers = selectedColorsWithQty
      .filter(c => c.color !== color)
      .reduce((sum, c) => sum + Number(c.quantity || 0), 0);
    
    const maxAllowed = selectedProduct ? selectedProduct.stockQuantity - totalSelectedOthers : Infinity;
    
    if (newQuantity > maxAllowed) {
      toast.warning(`Only ${maxAllowed} more item(s) can be assigned to this color.`);
      return;
    }
    
    setSelectedColorsWithQty(prev =>
      prev.map(c =>
        c.color === color ? { ...c, quantity: newQuantity } : c
      )
    );
  };
  

// ========== ADD PRODUCT TO ORDER ==========
// const handleAddProductToOrder = () => {
//   if (!selectedProduct) {
//     toast.error('Please select a product');
//     return;
//   }
  
//   const hasColors = selectedProduct.colors && selectedProduct.colors.length > 0;
  
//   // ========== VALIDATE QUANTITY FOR COLOR PRODUCTS ==========
//   if (hasColors) {
//     // Check if any colors are selected
//     if (selectedColorsWithQty.length === 0) {
//       toast.error('Please select at least one color with quantity');
//       return;
//     }
    
//     // Check if any selected color has empty or invalid quantity
//     const invalidColor = selectedColorsWithQty.some(c => {
//       const inputKey = `${selectedProduct._id}_${c.color}`;
//       const inputValue = quantityInputs[inputKey];
//       return inputValue === '' || 
//              inputValue === null || 
//              inputValue === undefined || 
//              inputValue === '0' ||
//              Number(c.quantity) < 1;
//     });
    
//     if (invalidColor) {
//       toast.error('Please set a valid quantity for all selected colors');
//       return;
//     }
    
//     // ✅ Check total quantity against stock
//     const totalQty = selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0);
//     if (totalQty > selectedProduct.stockQuantity) {
//       toast.error(`Total quantity (${totalQty}) exceeds available stock (${selectedProduct.stockQuantity})`);
//       return;
//     }
    
//     // ✅ Check if any individual color exceeds its share of stock
//     for (const colorInfo of selectedColorsWithQty) {
//       const totalSelectedOthers = selectedColorsWithQty
//         .filter(c => c.color !== colorInfo.color)
//         .reduce((sum, c) => sum + Number(c.quantity || 0), 0);
//       const maxAllowed = selectedProduct.stockQuantity - totalSelectedOthers;
//       if (Number(colorInfo.quantity) > maxAllowed) {
//         toast.error(`"${colorInfo.color}" quantity (${colorInfo.quantity}) exceeds available stock for this color (${maxAllowed})`);
//         return;
//       }
//     }
    
//   } else {
//     // ========== VALIDATE QUANTITY FOR NON-COLOR PRODUCTS ==========
//     if (addQuantityInput === '' || 
//         addQuantityInput === null || 
//         addQuantityInput === undefined || 
//         addQuantityInput === '0' ||
//         addQuantity === null || 
//         addQuantity === undefined || 
//         addQuantity < 1) {
//       toast.error('Please enter a valid quantity');
//       return;
//     }
    
//     // ✅ Check stock
//     if (addQuantity > selectedProduct.stockQuantity) {
//       toast.error(`Only ${selectedProduct.stockQuantity} item(s) available in stock`);
//       return;
//     }
//   }
  
//   // Check if product already exists in order
//   const existingItemIndex = orderItems.findIndex(
//     item => item.productId === selectedProduct._id
//   );
  
//   if (existingItemIndex !== -1) {
//     // Check if adding more would exceed stock
//     const existingQty = orderItems[existingItemIndex].totalQuantity || 0;
//     const newTotalQty = hasColors
//       ? existingQty + selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0)
//       : existingQty + addQuantity;
    
//     if (newTotalQty > selectedProduct.stockQuantity) {
//       toast.error(`Cannot add more. Stock limit (${selectedProduct.stockQuantity}) would be exceeded`);
//       return;
//     }
//   }
  
//   // ========== GENERATE PRODUCT SLUG ==========
//   let productSlug = selectedProduct.slug;
//   if (!productSlug && selectedProduct.productName) {
//     productSlug = selectedProduct.productName
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/^-+|-+$/g, '');
//   }
//   if (!productSlug) {
//     productSlug = 'unknown-product';
//   }
  
//   // Build the item
//   const newItem = {
//     productId: selectedProduct._id,
//     productName: selectedProduct.productName,
//     productSlug: productSlug,
//     image: selectedProduct.images?.[0]?.url || '',
//     regularPrice: selectedProduct.regularPrice,
//     discountPrice: selectedProduct.discountPrice || 0,
//     stockQuantity: selectedProduct.stockQuantity,
//     unit: selectedProduct.unit || 'pcs',
//     colors: hasColors ? selectedColorsWithQty.map(c => ({
//       color: c.color,
//       quantity: Number(c.quantity || 0),
//       price: selectedProduct.discountPrice > 0 ? selectedProduct.discountPrice : selectedProduct.regularPrice
//     })) : [],
//     totalQuantity: hasColors
//       ? selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0)
//       : addQuantity,
//     selectedColors: hasColors ? selectedColorsWithQty.map(c => c.color) : []
//   };
  
//   // Add or update
//   if (existingItemIndex !== -1) {
//     const existing = orderItems[existingItemIndex];
//     // Merge colors
//     const existingColors = existing.colors || [];
//     const newColors = newItem.colors || [];
    
//     // Merge color quantities
//     const mergedColors = [...existingColors];
//     newColors.forEach(newColor => {
//       const existingColorIndex = mergedColors.findIndex(c => c.color === newColor.color);
//       if (existingColorIndex !== -1) {
//         mergedColors[existingColorIndex].quantity += newColor.quantity;
//       } else {
//         mergedColors.push(newColor);
//       }
//     });
    
//     const updatedItem = {
//       ...existing,
//       colors: mergedColors,
//       totalQuantity: mergedColors.reduce((sum, c) => sum + c.quantity, 0),
//       selectedColors: mergedColors.map(c => c.color),
//       productSlug: productSlug
//     };
    
//     setOrderItems(prev => {
//       const newItems = [...prev];
//       newItems[existingItemIndex] = updatedItem;
//       return newItems;
//     });
    
//     toast.success(`Updated ${selectedProduct.productName} quantity`);
//   } else {
//     setOrderItems(prev => [...prev, newItem]);
//     toast.success(`Added ${selectedProduct.productName} to order`);
//   }
  
//   // Reset selection
//   setShowAddProduct(false);
//   setSelectedProduct(null);
//   setProductSearchQuery('');
//   setProductSearchResults([]);
//   setSelectedColorsWithQty([]);
//   setAddQuantity(1);
//   setAddQuantityInput(null);
//   setQuantityInputs({});
// };

// ========== ADD PRODUCT TO ORDER ==========
const handleAddProductToOrder = () => {
  if (!selectedProduct) {
    toast.error('Please select a product');
    return;
  }
  
  const hasColors = selectedProduct.colors && selectedProduct.colors.length > 0;
  
  // ========== VALIDATE QUANTITY FOR COLOR PRODUCTS ==========
  if (hasColors) {
    // Check if any colors are selected
    if (selectedColorsWithQty.length === 0) {
      toast.error('Please select at least one color with quantity');
      return;
    }
    
    // Check if any selected color has an actually invalid quantity
    // ✅ FIX: Check against the real quantity value, not the input override state
    const invalidColor = selectedColorsWithQty.some(c => Number(c.quantity) < 1);
    
    if (invalidColor) {
      toast.error('Please set a valid quantity for all selected colors');
      return;
    }
    
    // ✅ Check total quantity against stock
    const totalQty = selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0);
    if (totalQty > selectedProduct.stockQuantity) {
      toast.error(`Total quantity (${totalQty}) exceeds available stock (${selectedProduct.stockQuantity})`);
      return;
    }
    
    // ✅ Check if any individual color exceeds its share of stock
    for (const colorInfo of selectedColorsWithQty) {
      const totalSelectedOthers = selectedColorsWithQty
        .filter(c => c.color !== colorInfo.color)
        .reduce((sum, c) => sum + Number(c.quantity || 0), 0);
      const maxAllowed = selectedProduct.stockQuantity - totalSelectedOthers;
      if (Number(colorInfo.quantity) > maxAllowed) {
        toast.error(`"${colorInfo.color}" quantity (${colorInfo.quantity}) exceeds available stock for this color (${maxAllowed})`);
        return;
      }
    }
    
  } else {
    // ========== VALIDATE QUANTITY FOR NON-COLOR PRODUCTS ==========
    // ✅ FIX: Check against the actual quantity value, not the input override state
    if (addQuantity === null || addQuantity === undefined || addQuantity < 1) {
      toast.error('Please enter a valid quantity');
      return;
    }
    
    // ✅ Check stock
    if (addQuantity > selectedProduct.stockQuantity) {
      toast.error(`Only ${selectedProduct.stockQuantity} item(s) available in stock`);
      return;
    }
  }
  
  // Check if product already exists in order
  const existingItemIndex = orderItems.findIndex(
    item => item.productId === selectedProduct._id
  );
  
  if (existingItemIndex !== -1) {
    // Check if adding more would exceed stock
    const existingQty = orderItems[existingItemIndex].totalQuantity || 0;
    const newTotalQty = hasColors
      ? existingQty + selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0)
      : existingQty + addQuantity;
    
    if (newTotalQty > selectedProduct.stockQuantity) {
      toast.error(`Cannot add more. Stock limit (${selectedProduct.stockQuantity}) would be exceeded`);
      return;
    }
  }
  
  // ========== GENERATE PRODUCT SLUG ==========
  let productSlug = selectedProduct.slug;
  if (!productSlug && selectedProduct.productName) {
    productSlug = selectedProduct.productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  if (!productSlug) {
    productSlug = 'unknown-product';
  }
  
  // Build the item
  const newItem = {
    productId: selectedProduct._id,
    productName: selectedProduct.productName,
    productSlug: productSlug,
    image: selectedProduct.images?.[0]?.url || '',
    regularPrice: selectedProduct.regularPrice,
    discountPrice: selectedProduct.discountPrice || 0,
    stockQuantity: selectedProduct.stockQuantity,
    unit: selectedProduct.unit || 'pcs',
    colors: hasColors ? selectedColorsWithQty.map(c => ({
      color: c.color,
      quantity: Number(c.quantity || 0),
      price: selectedProduct.discountPrice > 0 ? selectedProduct.discountPrice : selectedProduct.regularPrice
    })) : [],
    totalQuantity: hasColors
      ? selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0)
      : addQuantity,
    selectedColors: hasColors ? selectedColorsWithQty.map(c => c.color) : []
  };
  
  // Add or update
  if (existingItemIndex !== -1) {
    const existing = orderItems[existingItemIndex];
    // Merge colors
    const existingColors = existing.colors || [];
    const newColors = newItem.colors || [];
    
    // Merge color quantities
    const mergedColors = [...existingColors];
    newColors.forEach(newColor => {
      const existingColorIndex = mergedColors.findIndex(c => c.color === newColor.color);
      if (existingColorIndex !== -1) {
        mergedColors[existingColorIndex].quantity += newColor.quantity;
      } else {
        mergedColors.push(newColor);
      }
    });
    
    const updatedItem = {
      ...existing,
      colors: mergedColors,
      totalQuantity: mergedColors.reduce((sum, c) => sum + c.quantity, 0),
      selectedColors: mergedColors.map(c => c.color),
      productSlug: productSlug
    };
    
    setOrderItems(prev => {
      const newItems = [...prev];
      newItems[existingItemIndex] = updatedItem;
      return newItems;
    });
    
    toast.success(`Updated ${selectedProduct.productName} quantity`);
  } else {
    setOrderItems(prev => [...prev, newItem]);
    toast.success(`Added ${selectedProduct.productName} to order`);
  }
  
  // Reset selection
  setShowAddProduct(false);
  setSelectedProduct(null);
  setProductSearchQuery('');
  setProductSearchResults([]);
  setSelectedColorsWithQty([]);
  setAddQuantity(1);
  setAddQuantityInput(null);
  setQuantityInputs({});
};

  
  // ========== REMOVE ITEM FROM ORDER ==========
  const removeItemFromOrder = (index) => {
    const item = orderItems[index];
    setOrderItems(prev => prev.filter((_, i) => i !== index));
    toast.success(`Removed ${item.productName} from order`);
  };
  
  // ========== UPDATE ITEM QUANTITY ==========
 // ========== UPDATE ITEM QUANTITY ==========
const updateItemQuantity = (index, color, newQuantity) => {
  const item = orderItems[index];

  // ========== NO-COLOR PRODUCT ==========
  if (color === null) {
    // If quantity is less than 1, remove the item
    if (newQuantity < 1) {
      removeItemFromOrder(index);
      return;
    }

    // Check stock limit
    if (newQuantity > item.stockQuantity) {
      toast.warning(`Only ${item.stockQuantity} item(s) available in stock`);
      return;
    }

    // Update totalQuantity directly (not derived from colors array)
    setOrderItems(prev => {
      const newItems = [...prev];
      newItems[index] = {
        ...newItems[index],
        totalQuantity: newQuantity
      };
      return newItems;
    });
    return;
  }

  // ========== COLOR-BASED PRODUCT ==========
  // If quantity is less than 1, remove the color or the whole item
  if (newQuantity < 1) {
    // If there are multiple colors, just remove this color
    if (item.colors && item.colors.length > 1) {
      const updatedColors = item.colors.filter(c => c.color !== color);
      const updatedItem = {
        ...item,
        colors: updatedColors,
        totalQuantity: updatedColors.reduce((sum, c) => sum + c.quantity, 0),
        selectedColors: updatedColors.map(c => c.color)
      };
      setOrderItems(prev => {
        const newItems = [...prev];
        newItems[index] = updatedItem;
        return newItems;
      });
    } else {
      // Only one color, remove the whole item
      removeItemFromOrder(index);
    }
    return;
  }

  // Check stock for this specific color
  const totalOtherColors = item.colors
    .filter(c => c.color !== color)
    .reduce((sum, c) => sum + c.quantity, 0);

  if (totalOtherColors + newQuantity > item.stockQuantity) {
    toast.warning(`Only ${item.stockQuantity - totalOtherColors} more items available for this color`);
    return;
  }

  // Update the color quantity and recalculate total
  setOrderItems(prev => {
    const newItems = [...prev];
    const updatedColors = newItems[index].colors.map(c =>
      c.color === color ? { ...c, quantity: newQuantity } : c
    );
    newItems[index] = {
      ...newItems[index],
      colors: updatedColors,
      totalQuantity: updatedColors.reduce((sum, c) => sum + c.quantity, 0)
    };
    return newItems;
  });
};
  
  // ========== CALCULATE SUBTOTAL ==========
  const calculateSubtotal = useCallback(() => {
    let subtotal = 0;
    orderItems.forEach(item => {
      const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
      subtotal += price * (item.totalQuantity || 0);
    });
    return subtotal;
  }, [orderItems]);
  
  // ========== CALCULATE TOTAL ==========
  const calculateTotal = useCallback(() => {
    return calculateSubtotal() + shippingCost - (discount || 0);
  }, [calculateSubtotal, shippingCost, discount]);
  
  // ========== VALIDATE CREATE CUSTOMER FORM (Matches AllCustomers page) ==========
  const validateCreateCustomerForm = () => {
    const errors = {};
    
    if (!createForm.contactPerson?.trim()) {
      errors.contactPerson = 'Contact person is required';
    }
    if (!createForm.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(createForm.email)) {
      errors.email = 'Email is invalid';
    }
    if (!createForm.phone?.trim()) {
      errors.phone = 'Phone number is required';
    }
    if (!createForm.country?.trim()) {
      errors.country = 'Country is required';
    }
    if (!createForm.address?.trim()) {
      errors.address = 'Address is required';
    }
    if (!createForm.city?.trim()) {
      errors.city = 'City is required';
    }
    if (!createForm.zipCode?.trim()) {
      errors.zipCode = 'ZIP Code is required';
    }
    if (!createForm.password) {
      errors.password = 'Password is required';
    } else if (createForm.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (createForm.password !== createForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setCreateFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // ========== CREATE CUSTOMER (Matches AllCustomers page) ==========
  const handleCreateCustomer = async () => {
    if (!validateCreateCustomerForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    
    setIsCreating(true);
    const loadingToast = toast.loading('Creating customer account...');
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/auth/admin/create-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contactPerson: createForm.contactPerson,
          email: createForm.email,
          phone: createForm.phone,
          whatsapp: createForm.whatsapp || '',
          country: createForm.country,
          address: createForm.address,
          city: createForm.city,
          zipCode: createForm.zipCode,
          password: createForm.password
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success('Customer Created Successfully!', {
          description: `Customer account for ${createForm.contactPerson} has been created.`,
          duration: 5000,
        });

        // Reset form
        setCreateForm({
          contactPerson: '',
          email: '',
          phone: '',
          whatsapp: '',
          country: '',
          address: '',
          city: '',
          zipCode: '',
          password: '',
          confirmPassword: '',
          subscribeToNewsletter: false
        });
        setCreateFormErrors({});
        setShowCreateCustomer(false);
        setIsCreating(false);
        
        // Return the created customer
        return data.user || data.data;
      } else {
        toast.error(data.error || 'Creation Failed');
        setIsCreating(false);
        return null;
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error');
      setIsCreating(false);
      return null;
    }
  };
  
  // ========== HANDLE CREATE FORM CHANGES (Matches AllCustomers page) ==========
  const handleCreateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (createFormErrors[name]) {
      setCreateFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // ========== VALIDATE ORDER FORM ==========
  const validateOrderForm = () => {
    const errors = {};
    
    if (!orderForm.fullName?.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!orderForm.phone?.trim()) {
      errors.phone = 'Phone number is required';
    }
    if (!orderForm.address?.trim()) {
      errors.address = 'Address is required';
    }
    if (!orderForm.division?.trim()) {
      errors.division = 'Division is required';
    }
    if (!orderForm.city?.trim()) {
      errors.city = 'City is required';
    }
    if (!orderForm.zone?.trim()) {
      errors.zone = 'Upazila/Thana is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // ========== PLACE ORDER ==========
 // ========== PLACE ORDER ==========
const handlePlaceOrder = async () => {
  let customerId = selectedCustomer?._id;
  
  // If creating new customer, create first
  if (showCreateCustomer) {
    const newCustomer = await handleCreateCustomer();
    if (newCustomer) {
      customerId = newCustomer._id;
      // Auto-fill order form with new customer data
      setOrderForm(prev => ({
        ...prev,
        fullName: newCustomer.contactPerson || '',
        email: newCustomer.email || '',
        phone: newCustomer.phone || '',
        division: newCustomer.division || '',
        address: newCustomer.address || '',
        city: newCustomer.city || '',
        zipCode: newCustomer.zipCode || '',
        country: newCustomer.country || 'Bangladesh'
      }));
      // Update selected customer
      setSelectedCustomer(newCustomer);
      setShowCreateCustomer(false);
    } else {
      return;
    }
  }
  
  // Validate form
  if (!validateOrderForm()) {
    // Scroll to first error
    const firstErrorField = document.querySelector('.border-red-500');
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  // ========== CLEAN ORDER ITEMS - Remove zero-quantity items/colors ==========
  const cleanedOrderItems = orderItems
    .map(item => {
      if (item.colors && item.colors.length > 0) {
        const validColors = item.colors.filter(c => c.quantity > 0);
        return {
          ...item,
          colors: validColors,
          totalQuantity: validColors.reduce((sum, c) => sum + c.quantity, 0)
        };
      }
      return item;
    })
    .filter(item => (item.totalQuantity || 0) > 0);
  
  // Validate order items
  if (cleanedOrderItems.length === 0) {
    toast.error('Please add at least one product with valid quantity');
    return;
  }
  
  setSubmitting(true);
  
  try {
    const token = localStorage.getItem('token');
    const sessionId = `manual_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Prepare items - FIXED: Ensure productSlug is always provided
    const items = cleanedOrderItems.map(item => {
      // Generate a slug from product name if not provided
      let productSlug = item.productSlug;
      if (!productSlug && item.productName) {
        productSlug = item.productName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      if (!productSlug) {
        productSlug = 'unknown-product';
      }
      
      return {
        productId: item.productId,
        productName: item.productName,
        productSlug: productSlug,
        image: item.image || '',
        regularPrice: item.regularPrice,
        discountPrice: item.discountPrice || 0,
        unit: item.unit || 'pcs',
        stockQuantity: item.stockQuantity || 0,
        colors: item.colors || [],
        quantity: item.totalQuantity || 0
      };
    });
    
    const subtotal = calculateSubtotal();
    const total = calculateTotal();
    
    const orderData = {
      items,
      subtotal,
      shippingCost,
      discount: discount || 0,
      total,
      paymentMethod: 'cod',
      customerInfo: {
        fullName: orderForm.fullName,
        email: orderForm.email || '',
        phone: orderForm.phone,
        division: orderForm.division,
        address: orderForm.address,
        city: orderForm.city,
        zone: orderForm.zone || '',
        area: orderForm.area || '',
        zipCode: orderForm.zipCode || '',
        country: orderForm.country || 'Bangladesh',
        note: orderForm.note || ''
      },
      orderStatus: 'placed',
      sessionId: sessionId,
      clientDeviceInfo: {
        deviceType: 'desktop',
        browser: 'Admin Panel',
        os: 'Manual Order',
        screenResolution: '1920x1080'
      }
    };
    
    // If customer exists, add userId
    if (customerId) {
      orderData.userId = customerId;
    }
    
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      toast.success('Order placed successfully!');
      router.push('/authorize/orders');
    } else {
      toast.error(data.error || 'Failed to place order');
    }
  } catch (error) {
    console.error('Place order error:', error);
    toast.error('Network error. Please try again.');
  } finally {
    setSubmitting(false);
  }
};
  
  // ========== TOGGLE SECTION ==========
  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  // ========== RENDER ==========
  return (
    <ProtectedRoute pageKey="all_orders">
      <div className="min-h-screen bg-white">
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
               
                <div>
                  <h1 className="text-2xl font-bold text-black flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6" />
                    Manual Order Creation
                  </h1>
                  <p className="text-sm text-gray-500">Create orders for customers manually</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push('/authorize/orders')}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={submitting || orderItems.length === 0}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitting ? (
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
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* ========== CUSTOMER SECTION ========== */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('customer')}
                  className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-black" />
                    <h2 className="text-base font-semibold text-black">Customer</h2>
                    {selectedCustomer && (
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                    {showCreateCustomer && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        New Customer
                      </span>
                    )}
                  </div>
                  {expandedSections.customer ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                
                {expandedSections.customer && (
                  <div className="px-5 pb-5 space-y-4">
                    {/* Customer Search */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Search Existing Customer
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={customerSearchQuery}
                          onChange={(e) => setCustomerSearchQuery(e.target.value)}
                          placeholder="Search by name, email, or phone..."
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                        {searchingCustomers && (
                          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
                        )}
                      </div>
                      
                      {/* Search Results */}
                      {customerSearchResults.length > 0 && (
                        <div className="mt-2 border border-gray-200 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                          {customerSearchResults.map(customer => (
                            <button
                              key={customer._id}
                              onClick={() => handleSelectCustomer(customer)}
                              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 flex items-center gap-3"
                            >
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
                                {customer.contactPerson?.charAt(0) || '?'}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-black truncate">
                                  {customer.contactPerson}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {customer.email} • {customer.phone}
                                </p>
                              </div>
                              <UserCheck className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Selected Customer Display */}
                    {selectedCustomer && !showCreateCustomer && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-semibold text-sm">
                            {selectedCustomer.contactPerson?.charAt(0) || '?'}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-black">{selectedCustomer.contactPerson}</p>
                            <p className="text-xs text-gray-500">{selectedCustomer.email} • {selectedCustomer.phone}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedCustomer(null);
                            setCustomerSearchQuery('');
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    {/* Create New Customer Toggle */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setShowCreateCustomer(!showCreateCustomer);
                          if (!showCreateCustomer) {
                            setSelectedCustomer(null);
                            setCustomerSearchQuery('');
                            // Reset create form
                            setCreateForm({
                              contactPerson: '',
                              email: '',
                              phone: '',
                              whatsapp: '',
                              country: '',
                              address: '',
                              city: '',
                              zipCode: '',
                              password: '',
                              confirmPassword: '',
                              subscribeToNewsletter: false
                            });
                            setCreateFormErrors({});
                          }
                        }}
                        className="text-sm text-black hover:underline flex items-center gap-1"
                      >
                        <UserPlus className="w-4 h-4" />
                        {showCreateCustomer ? 'Cancel' : 'Create New Customer'}
                      </button>
                    </div>
                    
                    {/* Create Customer Form - EXACTLY MATCHES AllCustomers page */}
                    {showCreateCustomer && (
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4">
                        <h3 className="text-sm font-medium text-black">New Customer Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Contact Person <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="contactPerson"
                              value={createForm.contactPerson}
                              onChange={handleCreateChange}
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                createFormErrors.contactPerson ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Your full name"
                            />
                            {createFormErrors.contactPerson && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.contactPerson}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={createForm.email}
                              onChange={handleCreateChange}
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                createFormErrors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="your@email.com"
                            />
                            {createFormErrors.email && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.email}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={createForm.phone}
                              onChange={handleCreateChange}
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                createFormErrors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="+1 234 567 8900"
                            />
                            {createFormErrors.phone && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.phone}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              WhatsApp Number
                            </label>
                            <input
                              type="tel"
                              name="whatsapp"
                              value={createForm.whatsapp}
                              onChange={handleCreateChange}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                              placeholder="+1 234 567 8900"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Country <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="country"
                              value={createForm.country}
                              onChange={handleCreateChange}
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                createFormErrors.country ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Bangladesh"
                            />
                            {createFormErrors.country && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.country}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              City <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={createForm.city}
                              onChange={handleCreateChange}
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                createFormErrors.city ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Dhaka"
                            />
                            {createFormErrors.city && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.city}</p>
                            )}
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Street Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={createForm.address}
                              onChange={handleCreateChange}
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                createFormErrors.address ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Your street address"
                            />
                            {createFormErrors.address && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.address}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              ZIP Code <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={createForm.zipCode}
                              onChange={handleCreateChange}
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                createFormErrors.zipCode ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="10001"
                            />
                            {createFormErrors.zipCode && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.zipCode}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={createForm.password}
                                onChange={handleCreateChange}
                                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent pr-10 ${
                                  createFormErrors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Min. 8 characters"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            {createFormErrors.password && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.password}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={createForm.confirmPassword}
                                onChange={handleCreateChange}
                                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent pr-10 ${
                                  createFormErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Re-enter password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            {createFormErrors.confirmPassword && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.confirmPassword}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
                          <button
                            type="button"
                            onClick={() => setShowCreateCustomer(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              const newCustomer = await handleCreateCustomer();
                              if (newCustomer) {
                                // Auto-select the newly created customer
                                handleSelectCustomer(newCustomer);
                                setShowCreateCustomer(false);
                              }
                            }}
                            disabled={isCreating}
                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
                          >
                            {isCreating ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Creating...
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-4 h-4" />
                                Create & Select
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* ========== PRODUCTS SECTION ========== */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('products')}
                  className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-black" />
                    <h2 className="text-base font-semibold text-black">Products</h2>
                    {orderItems.length > 0 && (
                      <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                        {orderItems.length} items
                      </span>
                    )}
                  </div>
                  {expandedSections.products ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                
                {expandedSections.products && (
                  <div className="px-5 pb-5 space-y-4">
                    {/* Add Product Button */}
                    {!showAddProduct ? (
                      <button
                        onClick={() => setShowAddProduct(true)}
                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors text-sm text-gray-600 hover:text-black flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Product
                      </button>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium text-black">Add Product</h3>
                          <button
                            onClick={() => {
                              setShowAddProduct(false);
                              setSelectedProduct(null);
                              setProductSearchQuery('');
                              setProductSearchResults([]);
                              setSelectedColorsWithQty([]);
                              setAddQuantity(1);
                              setAddQuantityInput(null);
                              setQuantityInputs({});
                            }}
                            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Product Search */}
                        <div className="relative mb-3">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={productSearchQuery}
                            onChange={(e) => setProductSearchQuery(e.target.value)}
                            placeholder="Search products by name, SKU, or barcode..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                            autoFocus
                          />
                          {searchingProducts && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
                          )}
                        </div>
                        
                        {/* Search Results */}
                        {productSearchResults.length > 0 && (
                          <div className="mb-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-white">
                            {productSearchResults.map(product => (
                              <button
                                key={product._id}
                                onClick={() => handleSelectProduct(product)}
                                className={`w-full p-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 flex items-center gap-3 ${
                                  selectedProduct?._id === product._id ? 'bg-gray-50' : ''
                                }`}
                              >
                                <img
                                  src={product.images?.[0]?.url || 'https://via.placeholder.com/40'}
                                  alt={product.productName}
                                  className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-black truncate">{product.productName}</p>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>৳{(product.discountPrice || product.regularPrice).toFixed(2)}</span>
                                    {product.discountPrice > 0 && (
                                      <span className="line-through">৳{product.regularPrice.toFixed(2)}</span>
                                    )}
                                    <span>• Stock: {product.stockQuantity}</span>
                                    {product.colors && product.colors.length > 0 && (
                                      <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
                                        {product.colors.length} colors
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {selectedProduct?._id === product._id && (
                                  <Check className="w-4 h-4 text-black" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        {/* Selected Product */}
                        {selectedProduct && (
                          <div className="bg-white rounded-lg p-3 border border-gray-200 space-y-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={selectedProduct.images?.[0]?.url || 'https://via.placeholder.com/40'}
                                alt={selectedProduct.productName}
                                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-black">{selectedProduct.productName}</p>
                                <p className="text-xs text-gray-500">
                                  Stock: {selectedProduct.stockQuantity} • ৳{(selectedProduct.discountPrice || selectedProduct.regularPrice).toFixed(2)}
                                </p>
                              </div>
                            </div>
                            
                            {/* Color Selection */}
                            {selectedProduct.colors && selectedProduct.colors.length > 0 ? (
                              <div className="space-y-2">
                                <p className="text-xs font-medium text-gray-700">Select Colors:</p>
                                <div className="flex flex-wrap gap-2">
                                  {selectedProduct.colors.map((color) => {
                                    const selected = selectedColorsWithQty.find(c => c.color === color);
                                    const isSelected = !!selected;
                                    const quantity = selected?.quantity || 1;
                                    
                                    // Calculate max allowed
                                    const totalSelectedOthers = selectedColorsWithQty
                                      .filter(c => c.color !== color)
                                      .reduce((sum, c) => sum + Number(c.quantity || 0), 0);
                                    const maxAllowed = selectedProduct.stockQuantity - totalSelectedOthers;
                                    
                                    return (
                                      <div key={color} className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
                                        isSelected ? 'border-black bg-gray-50' : 'border-gray-200'
                                      }`}>
                                        <div 
                                          className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
                                          style={{ backgroundColor: color }}
                                          title={color}
                                        />
                                        
                                        <button
                                          onClick={() => toggleColorSelection(color)}
                                          className={`px-2 py-0.5 text-xs rounded transition-colors ${
                                            isSelected ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-black text-white hover:bg-gray-800'
                                          }`}
                                        >
                                          {isSelected ? 'Remove' : 'Add'}
                                        </button>
                                        
                                       {isSelected && (
  <div className="flex items-center gap-1">
    <button
      onClick={() => {
        const newQty = (quantity || 1) - 1;
        if (newQty >= 1) {
          updateSelectedColorQuantity(color, newQty);
          setQuantityInputs(prev => ({
            ...prev,
            [`${selectedProduct?._id}_${color}`]: newQty
          }));
        }
      }}
      disabled={quantity <= 1}
      className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
    >
      <Minus className="w-3 h-3" />
    </button>
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={
        quantityInputs[`${selectedProduct?._id}_${color}`] !== undefined && 
        quantityInputs[`${selectedProduct?._id}_${color}`] !== null
          ? quantityInputs[`${selectedProduct?._id}_${color}`] 
          : quantity
      }
      onChange={(e) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
          setQuantityInputs(prev => ({
            ...prev,
            [`${selectedProduct?._id}_${color}`]: value
          }));
          if (value === '') {
            setColorQuantityRaw(color, 0);
            return;
          }
          const numValue = parseInt(value);
          if (numValue >= 1) {
            // ✅ Calculate max allowed for this specific color
            const totalSelectedOthers = selectedColorsWithQty
              .filter(c => c.color !== color)
              .reduce((sum, c) => sum + Number(c.quantity || 0), 0);
            const maxAllowed = selectedProduct.stockQuantity - totalSelectedOthers;
            const finalValue = Math.min(numValue, maxAllowed);
            updateSelectedColorQuantity(color, finalValue);
            // Update input to show the limited value if it was reduced
            if (finalValue !== numValue && finalValue > 0) {
              setQuantityInputs(prev => ({
                ...prev,
                [`${selectedProduct?._id}_${color}`]: finalValue
              }));
              toast.warning(`Only ${finalValue} more item(s) available for this color`);
            }
          } else {
            setColorQuantityRaw(color, 0);
          }
        }
      }}
      onBlur={(e) => {
        // No auto-reset
      }}
      className="w-12 text-center text-xs border border-gray-300 rounded focus:ring-1 focus:ring-black py-0.5"
    />
    <button
      onClick={() => {
        const newQty = (quantity || 1) + 1;
        // ✅ Check stock for this specific color
        const totalSelectedOthers = selectedColorsWithQty
          .filter(c => c.color !== color)
          .reduce((sum, c) => sum + Number(c.quantity || 0), 0);
        const maxAllowed = selectedProduct.stockQuantity - totalSelectedOthers;
        if (newQty <= maxAllowed) {
          updateSelectedColorQuantity(color, newQty);
          setQuantityInputs(prev => ({
            ...prev,
            [`${selectedProduct?._id}_${color}`]: newQty
          }));
        } else {
          toast.warning(`Only ${maxAllowed} more item(s) available for this color`);
        }
      }}
      disabled={
        (() => {
          const totalSelectedOthers = selectedColorsWithQty
            .filter(c => c.color !== color)
            .reduce((sum, c) => sum + Number(c.quantity || 0), 0);
          const maxAllowed = selectedProduct.stockQuantity - totalSelectedOthers;
          return quantity >= maxAllowed || maxAllowed <= 0;
        })()
      }
      className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
    >
      <Plus className="w-3 h-3" />
    </button>
  </div>
)}
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {selectedColorsWithQty.length > 0 ? (
                                    <span className="text-green-600">
                                      ✓ {selectedColorsWithQty.length} color(s) selected • Total: {selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0)}
                                    </span>
                                  ) : (
                                    <span className="text-orange-500">Click "Add" on a color above</span>
                                  )}
                                </div>
                              </div>
                            ) : (
                            <div className="flex items-center gap-3">
  <span className="text-xs text-gray-600">Quantity:</span>
  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
    <button
      onClick={() => {
        const newQty = (addQuantity || 1) - 1;
        if (newQty >= 1) {
          setAddQuantity(newQty);
          setAddQuantityInput(newQty.toString());
        }
      }}
      className="px-2 py-1 hover:bg-gray-100 transition-colors"
      disabled={addQuantity <= 1}
    >
      <Minus className="w-3 h-3" />
    </button>
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={
        addQuantityInput !== null && addQuantityInput !== undefined
          ? addQuantityInput 
          : addQuantity
      }
      onChange={(e) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
          setAddQuantityInput(value);
          if (value === '') {
            setAddQuantity(0);
            return;
          }
          const numValue = parseInt(value);
          if (numValue >= 1) {
            // ✅ Limit to stock quantity
            const maxAllowed = selectedProduct?.stockQuantity || 999;
            const finalValue = Math.min(numValue, maxAllowed);
            setAddQuantity(finalValue);
            // Update input to show the limited value if it was reduced
            if (finalValue !== numValue) {
              setAddQuantityInput(finalValue.toString());
              toast.warning(`Only ${finalValue} item(s) available in stock`);
            }
          } else {
            setAddQuantity(0);
          }
        }
      }}
      onBlur={(e) => {
        // No auto-reset - leave it invalid so button stays disabled
      }}
      className="w-14 text-center text-sm py-1 bg-white focus:outline-none"
    />
    <button
      onClick={() => {
        const newQty = (addQuantity || 1) + 1;
        const maxAllowed = selectedProduct?.stockQuantity || 999;
        if (newQty <= maxAllowed) {
          setAddQuantity(newQty);
          setAddQuantityInput(newQty.toString());
        } else {
          toast.warning(`Only ${maxAllowed} item(s) available in stock`);
        }
      }}
      disabled={addQuantity >= (selectedProduct?.stockQuantity || 999)}
      className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 transition-colors"
    >
      <Plus className="w-3 h-3" />
    </button>
  </div>
  <span className="text-xs text-gray-500">/ {selectedProduct?.stockQuantity || 0}</span>
</div>
                            )}
                            
                            {/* Add to Order Button with Validity Check */}
                           {(() => {
  const hasColors = selectedProduct?.colors?.length > 0;
  
  // Check if quantity is invalid (empty or 0)
  const isQuantityInvalid = hasColors
    ? selectedColorsWithQty.length === 0 ||
      selectedColorsWithQty.some(c => !c.quantity || c.quantity < 1)
    : !addQuantity || addQuantity < 1;
  
  // Check if quantity exceeds stock
  const isExceedingStock = hasColors
    ? selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0) > selectedProduct?.stockQuantity
    : addQuantity > selectedProduct?.stockQuantity;
  
  const isDisabled = isQuantityInvalid || isExceedingStock;
  
  return (
    <>
      <button
        onClick={handleAddProductToOrder}
        disabled={isDisabled}
        className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add to Order
      </button>
      
      {/* Show warning messages */}
      {isQuantityInvalid && (
        <p className="text-xs text-red-500 mt-1 text-center">
          Enter a valid quantity before adding this product.
        </p>
      )}
      {isExceedingStock && !isQuantityInvalid && (
        <p className="text-xs text-red-500 mt-1 text-center">
          Quantity exceeds available stock ({selectedProduct?.stockQuantity} available).
        </p>
      )}
    </>
  );
})()}
                          </div>
                        )}
                      </div>
                    )}
                    
                  
{/* Order Items List */}
{/* Order Items List */}
{orderItems.length > 0 && (
  <div className="space-y-3 mt-3">
    {orderItems.map((item, index) => {
      const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
      const totalPrice = price * (item.totalQuantity || 0);
      const hasColors = item.colors && item.colors.length > 0;
      
      // Use productId as the unique key (not _id which doesn't exist)
      const itemKey = `${item.productId}`;
      const getColorKey = (color) => `${item.productId}_${color}`;
      
      return (
        <div key={`${item.productId}-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Product Header */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 border-b border-gray-200">
            <img
              src={item.image || 'https://via.placeholder.com/40'}
              alt={item.productName}
              className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-black">{item.productName}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>৳{price.toFixed(2)}/{getUnitLabel(item.unit)}</span>
                {item.discountPrice > 0 && (
                  <span className="line-through">৳{item.regularPrice.toFixed(2)}</span>
                )}
                <span>• Stock: {item.stockQuantity}</span>
                <span>• Total: {item.totalQuantity} items</span>
              </div>
            </div>
            <button
              onClick={() => removeItemFromOrder(index)}
              className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          {/* Colors - Only show color swatch, no color name text */}
          {hasColors && (
            <div className="p-3 space-y-2">
              {item.colors.map((colorInfo, colorIndex) => {
                const colorKey = getColorKey(colorInfo.color);
                const inputValue = itemQuantityInputs[colorKey];
                
                return (
                  <div key={colorIndex} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                    {/* Color swatch only - no text */}
                    <div 
                      className="w-5 h-5 rounded-full border border-gray-300 flex-shrink-0"
                      style={{ backgroundColor: colorInfo.color }}
                      title={colorInfo.color}
                    />
                    
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          const newQty = colorInfo.quantity - 1;
                          if (newQty >= 1) {
                            updateItemQuantity(index, colorInfo.color, newQty);
                            // Clear the input state so it falls back to the real value
                            setItemQuantityInputs(prev => {
                              const next = { ...prev };
                              delete next[colorKey];
                              return next;
                            });
                          } else if (newQty === 0) {
                            // Set quantity to 0 without deleting
                            setItemQuantityInputs(prev => {
                              const next = { ...prev };
                              delete next[colorKey];
                              return next;
                            });
                            // Update the color quantity to 0
                            const updatedColors = item.colors.map(c => {
                              if (c.color === colorInfo.color) {
                                return { ...c, quantity: 0 };
                              }
                              return c;
                            });
                            setOrderItems(prev => {
                              const newItems = [...prev];
                              newItems[index] = {
                                ...newItems[index],
                                colors: updatedColors,
                                totalQuantity: updatedColors.reduce((sum, c) => sum + c.quantity, 0)
                              };
                              return newItems;
                            });
                          }
                        }}
                        disabled={colorInfo.quantity <= 1}
                        className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={
                          inputValue !== undefined && inputValue !== null
                            ? inputValue 
                            : colorInfo.quantity
                        }
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || /^\d+$/.test(value)) {
                            setItemQuantityInputs(prev => ({
                              ...prev,
                              [colorKey]: value
                            }));
                            
                            if (value === '') {
                              // Update the actual quantity to 0 locally (don't delete the color)
                              const updatedColors = item.colors.map(c => {
                                if (c.color === colorInfo.color) {
                                  return { ...c, quantity: 0 };
                                }
                                return c;
                              });
                              setOrderItems(prev => {
                                const newItems = [...prev];
                                newItems[index] = {
                                  ...newItems[index],
                                  colors: updatedColors,
                                  totalQuantity: updatedColors.reduce((sum, c) => sum + c.quantity, 0)
                                };
                                return newItems;
                              });
                              return;
                            }
                            
                            const numValue = parseInt(value);
                            if (!isNaN(numValue) && numValue >= 1) {
                              const maxAllowed = item.stockQuantity - item.colors
                                .filter(c => c.color !== colorInfo.color)
                                .reduce((sum, c) => sum + c.quantity, 0);
                              const finalValue = Math.min(numValue, maxAllowed);
                              if (finalValue !== numValue) {
                                toast.warning(`Only ${finalValue} more item(s) available for this color`);
                                setItemQuantityInputs(prev => ({
                                  ...prev,
                                  [colorKey]: finalValue
                                }));
                              }
                              updateItemQuantity(index, colorInfo.color, finalValue);
                            }
                          }
                        }}
                        onBlur={(e) => {
                          // No auto-reset
                        }}
                        className="w-12 text-center text-xs border border-gray-300 rounded focus:ring-1 focus:ring-black py-0.5"
                      />
                      
                      <button
                        onClick={() => {
                          const newQty = colorInfo.quantity + 1;
                          const maxAllowed = item.stockQuantity - item.colors
                            .filter(c => c.color !== colorInfo.color)
                            .reduce((sum, c) => sum + c.quantity, 0);
                          if (newQty <= maxAllowed) {
                            updateItemQuantity(index, colorInfo.color, newQty);
                            // Clear the input state so it falls back to the real value
                            setItemQuantityInputs(prev => {
                              const next = { ...prev };
                              delete next[colorKey];
                              return next;
                            });
                          } else {
                            toast.warning(`Only ${maxAllowed} more item(s) available for this color`);
                          }
                        }}
                        disabled={
                          (() => {
                            const maxAllowed = item.stockQuantity - item.colors
                              .filter(c => c.color !== colorInfo.color)
                              .reduce((sum, c) => sum + c.quantity, 0);
                            return colorInfo.quantity >= maxAllowed || maxAllowed <= 0;
                          })()
                        }
                        className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <span className="text-xs text-gray-500 ml-auto">
                      ৳{(colorInfo.price * colorInfo.quantity).toFixed(2)}
                    </span>
                    
                    {/* ========== DELETE COLOR BUTTON ========== */}
                    {item.colors.length > 1 && (
                      <button
                        onClick={() => {
                          // Remove this specific color from the item
                          const updatedColors = item.colors.filter(c => c.color !== colorInfo.color);
                          const updatedItem = {
                            ...item,
                            colors: updatedColors,
                            totalQuantity: updatedColors.reduce((sum, c) => sum + c.quantity, 0),
                            selectedColors: updatedColors.map(c => c.color)
                          };
                          setOrderItems(prev => {
                            const newItems = [...prev];
                            newItems[index] = updatedItem;
                            return newItems;
                          });
                          // Clear the input state for this color
                          setItemQuantityInputs(prev => {
                            const next = { ...prev };
                            delete next[colorKey];
                            return next;
                          });
                          toast.success(`Removed ${colorInfo.color} color from ${item.productName}`);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title={`Remove ${colorInfo.color} color`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          {/* No Color - Quantity Controls with text input */}
          {!hasColors && (
            <div className="p-3 flex items-center justify-end gap-3">
              <span className="text-xs text-gray-500">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => {
                    const newQty = (item.totalQuantity || 1) - 1;
                    if (newQty >= 1) {
                      updateItemQuantity(index, null, newQty);
                      // Clear the input state so it falls back to the real value
                      setItemQuantityInputs(prev => {
                        const next = { ...prev };
                        delete next[itemKey];
                        return next;
                      });
                    } else if (newQty === 0) {
                      // Set to 0 locally without deleting the product
                      setOrderItems(prev => {
                        const newItems = [...prev];
                        newItems[index] = { ...newItems[index], totalQuantity: 0 };
                        return newItems;
                      });
                      // Clear the input state
                      setItemQuantityInputs(prev => {
                        const next = { ...prev };
                        delete next[itemKey];
                        return next;
                      });
                    } else {
                      removeItemFromOrder(index);
                    }
                  }}
                  disabled={item.totalQuantity <= 1}
                  className="px-2 py-1 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={
                    itemQuantityInputs[itemKey] !== undefined && 
                    itemQuantityInputs[itemKey] !== null
                      ? itemQuantityInputs[itemKey] 
                      : item.totalQuantity
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^\d+$/.test(value)) {
                      setItemQuantityInputs(prev => ({
                        ...prev,
                        [itemKey]: value
                      }));
                      
                      if (value === '') {
                        // Set to 0 locally without deleting the product
                        setOrderItems(prev => {
                          const newItems = [...prev];
                          newItems[index] = { ...newItems[index], totalQuantity: 0 };
                          return newItems;
                        });
                        return;
                      }
                      
                      const numValue = parseInt(value);
                      if (!isNaN(numValue) && numValue >= 1) {
                        const finalValue = Math.min(numValue, item.stockQuantity);
                        if (finalValue !== numValue) {
                          toast.warning(`Only ${finalValue} item(s) available in stock`);
                          setItemQuantityInputs(prev => ({
                            ...prev,
                            [itemKey]: finalValue
                          }));
                        }
                        updateItemQuantity(index, null, finalValue);
                      }
                    }
                  }}
                  onBlur={(e) => {
                    // No auto-reset
                  }}
                  className="w-14 text-center text-sm py-1 bg-white focus:outline-none"
                />
                
                <button
                  onClick={() => {
                    const newQty = (item.totalQuantity || 1) + 1;
                    if (newQty <= item.stockQuantity) {
                      updateItemQuantity(index, null, newQty);
                      // Clear the input state so it falls back to the real value
                      setItemQuantityInputs(prev => {
                        const next = { ...prev };
                        delete next[itemKey];
                        return next;
                      });
                    } else {
                      toast.warning(`Only ${item.stockQuantity} item(s) available in stock`);
                    }
                  }}
                  disabled={(item.totalQuantity || 1) >= item.stockQuantity}
                  className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <span className="text-xs text-gray-500">/ {item.stockQuantity}</span>
            </div>
          )}
        </div>
      );
    })}
  </div>
)}
                  </div>
                )}
              </div>
              
              {/* ========== DELIVERY ADDRESS SECTION ========== */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('address')}
                  className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-black" />
                    <h2 className="text-base font-semibold text-black">Delivery Address</h2>
                  </div>
                  {expandedSections.address ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                
                {expandedSections.address && (
                  <div className="px-5 pb-5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={orderForm.fullName}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, fullName: e.target.value }))}
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="John Doe"
                        />
                        {formErrors.fullName && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={orderForm.phone}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            formErrors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="01XXXXXXXXX"
                        />
                        {formErrors.phone && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={orderForm.email}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="john@example.com"
                        />
                      </div>
                      
                      {/* ========== DIVISION ========== */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Division <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={orderForm.division}
                          onChange={(e) => {
                            const division = e.target.value;
                            setOrderForm(prev => ({ 
                              ...prev, 
                              division: division,
                              city: '',
                              zone: '',
                              area: ''
                            }));
                            if (division && divisions[division]) {
                              setCitiesByDivision(divisions[division]);
                            } else {
                              setCitiesByDivision([]);
                            }
                            setZones([]);
                            setAreas([]);
                          }}
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            formErrors.division ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Division</option>
                          {divisionList.map(division => (
                            <option key={division} value={division}>{division}</option>
                          ))}
                        </select>
                        {formErrors.division && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.division}</p>
                        )}
                      </div>
                      
                      {/* ========== DISTRICT/CITY ========== */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          District/City <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={orderForm.city}
                          onChange={(e) => {
                            const city = e.target.value;
                            setOrderForm(prev => ({ ...prev, city: city, zone: '', area: '' }));
                            if (city && locationData[city]) {
                              const availableZones = Object.keys(locationData[city].zones || {});
                              setZones(availableZones);
                            } else {
                              setZones([]);
                            }
                            setAreas([]);
                            if (city) {
                              calculateShipping(city);
                            }
                          }}
                          disabled={!orderForm.division}
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            formErrors.city ? 'border-red-500' : 'border-gray-300'
                          } ${!orderForm.division ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        >
                          <option value="">Select District</option>
                          {citiesByDivision.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        {formErrors.city && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.city}</p>
                        )}
                      </div>
                      
                      {/* ========== UPAZILA/THANA ========== */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Upazila/Thana <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={orderForm.zone}
                          onChange={(e) => {
                            const zone = e.target.value;
                            setOrderForm(prev => ({ ...prev, zone: zone, area: '' }));
                            if (zone && orderForm.city && locationData[orderForm.city]) {
                              const availableAreas = locationData[orderForm.city].zones[zone] || [];
                              setAreas(availableAreas);
                            } else {
                              setAreas([]);
                            }
                            if (orderForm.city && zone) {
                              calculateShipping(orderForm.city);
                            }
                          }}
                          disabled={!orderForm.city}
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            formErrors.zone ? 'border-red-500' : 'border-gray-300'
                          } ${!orderForm.city ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        >
                          <option value="">Select Upazila/Thana</option>
                          {zones.map(zone => (
                            <option key={zone} value={zone}>{zone}</option>
                          ))}
                        </select>
                        {formErrors.zone && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.zone}</p>
                        )}
                      </div>
                      
                      {/* ========== UNION/AREA ========== */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Union/Area
                        </label>
                        <select
                          value={orderForm.area}
                          onChange={(e) => {
                            const area = e.target.value;
                            setOrderForm(prev => ({ ...prev, area: area }));
                            if (orderForm.city && orderForm.zone && area) {
                              calculateShipping(orderForm.city);
                            }
                          }}
                          disabled={!orderForm.zone}
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            !orderForm.zone ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Union/Area</option>
                          {areas.map(area => (
                            <option key={area} value={area}>{area}</option>
                          ))}
                        </select>
                      </div>
                      
                      {/* ========== ADDRESS ========== */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={orderForm.address}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
                          rows="2"
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none ${
                            formErrors.address ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="House #, Road #, Area"
                        />
                        {formErrors.address && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.address}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Shipping Cost Display */}
                    {orderForm.city && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Truck className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Shipping Cost:</span>
                        </div>
                        <span className="text-sm font-semibold text-black">
                          ৳{shippingCost.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-24">
                <div className="px-5 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-black" />
                    <h2 className="text-base font-semibold text-black">Order Summary</h2>
                    <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {orderItems.reduce((sum, item) => sum + (item.totalQuantity || 0), 0)} items
                    </span>
                  </div>
                </div>
                
                <div className="p-5 space-y-4">
                  {/* Customer Info */}
                  <div className="space-y-1 text-sm">
                    <p className="text-xs text-gray-500 font-medium">Customer</p>
                    {selectedCustomer ? (
                      <>
                        <p className="text-sm font-medium text-black">{selectedCustomer.contactPerson}</p>
                        <p className="text-xs text-gray-500">{selectedCustomer.email} • {selectedCustomer.phone}</p>
                      </>
                    ) : showCreateCustomer ? (
                      <p className="text-sm text-blue-600">New Customer (will be created)</p>
                    ) : (
                      <p className="text-sm text-gray-400">No customer selected</p>
                    )}
                  </div>
                  
                  {/* ========== ORDER ITEMS SUMMARY - COLOR WISE ========== */}
                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-xs text-gray-500 font-medium mb-2">Items ({orderItems.length})</p>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {orderItems.map((item, index) => {
                        const hasColors = item.colors && item.colors.length > 0;
                        const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
                        
                        return (
                          <div key={index} className="border border-gray-100 rounded-lg p-2 bg-gray-50/50">
                            {/* Product Name */}
                            <div className="flex items-start gap-2 mb-1.5">
                              <img
                                src={item.image || 'https://via.placeholder.com/30'}
                                alt={item.productName}
                                className="w-8 h-8 rounded object-cover border border-gray-200 flex-shrink-0"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-black truncate">{item.productName}</p>
                                <p className="text-[10px] text-gray-500">
                                  ৳{price.toFixed(2)}/{getUnitLabel(item.unit)}
                                </p>
                              </div>
                              <span className="text-xs font-medium text-black whitespace-nowrap">
                                ৳{(price * (item.totalQuantity || 0)).toFixed(2)}
                              </span>
                            </div>
                            
                            {/* ========== COLORS LIST ========== */}
                            {hasColors ? (
                              <div className="space-y-1 ml-10">
                                {item.colors.map((colorInfo, colorIndex) => (
                                  <div key={colorIndex} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5">
                                      <div 
                                        className="w-3.5 h-3.5 rounded-full border border-gray-300 flex-shrink-0"
                                        style={{ backgroundColor: colorInfo.color.toLowerCase() }}
                                        title={colorInfo.color}
                                      />
                                      <span className="text-gray-600 text-[10px] font-medium">
                                        {colorInfo.color}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-gray-500 text-[10px]">x{colorInfo.quantity}</span>
                                      <span className="text-black font-medium text-[10px]">
                                        ৳{(colorInfo.price * colorInfo.quantity).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                                
                                {/* Total quantity for this product */}
                                <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-200 pt-1 mt-1">
                                  <span>Total</span>
                                  <span className="font-medium text-gray-600">
                                    {item.totalQuantity} items • ৳{(price * (item.totalQuantity || 0)).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              /* No colors - just show quantity */
                              <div className="flex items-center justify-between text-xs ml-10">
                                <span className="text-gray-500 text-[10px]">Quantity</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500 text-[10px]">x{item.totalQuantity}</span>
                                  <span className="text-black font-medium text-[10px]">
                                    ৳{(price * (item.totalQuantity || 0)).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* ========== TOTALS ========== */}
                  <div className="border-t border-gray-200 pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-black">৳{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">৳{shippingCost.toFixed(2)}</span>
                    </div>
                    
                    {/* Discount Input */}
                    {/* <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                        onWheel={(e) => e.target.blur()}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Discount amount"
                        min="0"
                        step="0.5"
                      />
                    </div> */}

                    <div className="flex items-center gap-2">
  <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
  <input
    type="text"
    inputMode="decimal"
    value={discount === 0 ? '' : discount}
    onChange={(e) => {
      const value = e.target.value;
      // Allow empty or valid number
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        if (value === '') {
          setDiscount(0);
        } else {
          const numValue = parseFloat(value);
          if (!isNaN(numValue) && numValue >= 0) {
            setDiscount(numValue);
          }
        }
      }
    }}
    onWheel={(e) => e.target.blur()}
    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
    placeholder="Discount amount"
  />
</div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount Applied</span>
                        <span>- ৳{discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                      <span className="text-black">Total</span>
                      <span className="text-black">৳{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Order Note */}
                  <div className="border-t border-gray-200 pt-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Order Note
                    </label>
                    <textarea
                      value={orderForm.note}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, note: e.target.value }))}
                      rows="2"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                      placeholder="Special instructions for this order..."
                    />
                  </div>
                  
                  {/* Place Order Button */}
                  <button
                    onClick={handlePlaceOrder}
                    disabled={submitting || orderItems.length === 0 }
                    className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
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

                
                  
                  
                  {(!selectedCustomer && !showCreateCustomer) && (
                    <p className="text-xs text-orange-500 text-center">
                      {/* Please select or create a customer */}
                    </p>
                  )}
                  {orderItems.length === 0 && (
                    <p className="text-xs text-orange-500 text-center">
                      Please add at least one product
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}