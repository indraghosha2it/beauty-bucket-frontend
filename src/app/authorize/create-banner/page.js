
// // app/authorize/create-banner/page.jsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import NextLink from 'next/link';
// import { 
//   Plus, 
//   X, 
//   Save, 
//   ArrowLeft,
//   Image as ImageIcon,
//   AlertCircle,
//   Loader2,
//   Trash2,
//   Upload,
//   Package,
//   Tag,
//   Info,
//   Star,
//   Search,
//   ChevronDown,
//   Truck,
//   Shield,
//   Headphones,
//   Clock,
//   TrendingUp,
//   GripVertical,
//   CheckCircle,
//   Edit,
//   Link as LinkIcon,
//   Unlink,
//   Eye,
//   Maximize2,
//   Wand2
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // Feature icon options
// const FEATURE_ICONS = [
//   { value: 'Truck', label: 'Truck', icon: <Truck className="w-4 h-4" /> },
//   { value: 'Shield', label: 'Shield', icon: <Shield className="w-4 h-4" /> },
//   { value: 'Clock', label: 'Clock', icon: <Clock className="w-4 h-4" /> },
//   { value: 'Star', label: 'Star', icon: <Star className="w-4 h-4" /> },
//   { value: 'TrendingUp', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
//   { value: 'Headphones', label: 'Headphones', icon: <Headphones className="w-4 h-4" /> }
// ];

// // Default banner background image
// const DEFAULT_BG_IMAGE = '/images/banner-bg.png';

// // Banner draft key for localStorage
// const BANNER_DRAFT_KEY = 'smart_gadget_banner_draft';

// // Product Search Modal Component
// const ProductSearchModal = ({ isOpen, onClose, onSelectProduct }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const searchTimeoutRef = useRef(null);

//   // const searchProducts = async (query) => {
//   //   if (!query.trim()) {
//   //     setProducts([]);
//   //     return;
//   //   }

//   //   setIsLoading(true);
//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     const response = await fetch(
//   //       `http://localhost:5000/api/products/authorize/all?search=${encodeURIComponent(query)}&limit=10`,
//   //       {
//   //         headers: { 'Authorization': `Bearer ${token}` }
//   //       }
//   //     );
//   //     const data = await response.json();
//   //     if (data.success) {
//   //       setProducts(data.data);
//   //     } else {
//   //       toast.error(data.error || 'Failed to search products');
//   //     }
//   //   } catch (error) {
//   //     toast.error('Failed to search products');
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   // In ProductSearchModal component, update the searchProducts function:

// const searchProducts = async (query) => {
//   if (!query.trim()) {
//     setProducts([]);
//     return;
//   }

//   setIsLoading(true);
//   try {
//     const token = localStorage.getItem('token');
//     // Change this URL to match your actual product route
//     // Option 1: If you have a general products endpoint with search
//     const response = await fetch(
//       `http://localhost:5000/api/products?search=${encodeURIComponent(query)}&limit=10`,
//       {
//         headers: { 'Authorization': `Bearer ${token}` }
//       }
//     );
    
//     // OR Option 2: If you have an admin products endpoint
//     // const response = await fetch(
//     //   `http://localhost:5000/api/products/admin?search=${encodeURIComponent(query)}&limit=10`,
//     //   {
//     //     headers: { 'Authorization': `Bearer ${token}` }
//     //   }
//     // );
    
//     const data = await response.json();
//     if (data.success) {
//       setProducts(data.data);
//     } else {
//       toast.error(data.error || 'Failed to search products');
//     }
//   } catch (error) {
//     console.error('Search error:', error);
//     toast.error('Failed to search products');
//   } finally {
//     setIsLoading(false);
//   }
// };
//   useEffect(() => {
//     if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     searchTimeoutRef.current = setTimeout(() => {
//       searchProducts(searchTerm);
//     }, 500);
//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchTerm]);

//   const handleSelectProduct = () => {
//     if (selectedProduct) {
//       onSelectProduct(selectedProduct, selectedImageIndex);
//       onClose();
//     }
//   };

//   const stripHtml = (html) => {
//     if (!html) return '';
//     return html.replace(/<[^>]*>/g, '').trim();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col">
//         <div className="p-5 border-b border-gray-200 flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//             <Package className="w-5 h-5 text-blue-600" />
//             Select Product for Banner
//           </h3>
//           <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         <div className="p-5 border-b border-gray-200">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search products by name, SKU, or brand..."
//               className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
//               autoFocus
//             />
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-5">
//           {isLoading ? (
//             <div className="flex items-center justify-center py-12">
//               <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//             </div>
//           ) : products.length === 0 ? (
//             <div className="text-center py-12">
//               <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//               <p className="text-gray-500">
//                 {searchTerm ? 'No products found matching your search' : 'Search for a product to add to banner'}
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {products.map((product) => (
//                 <div
//                   key={product._id}
//                   className={`p-4 border rounded-lg cursor-pointer transition-all ${
//                     selectedProduct?._id === product._id
//                       ? 'border-blue-600 bg-blue-50'
//                       : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
//                   }`}
//                   onClick={() => {
//                     setSelectedProduct(product);
//                     setSelectedImageIndex(0);
//                   }}
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
//                       {product.images && product.images.length > 0 ? (
//                         <img
//                           src={product.images[0].url}
//                           alt={product.productName}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <ImageIcon className="w-6 h-6 text-gray-400" />
//                         </div>
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h4 className="font-medium text-gray-900 truncate">{product.productName}</h4>
//                       <div className="flex items-center gap-3 text-sm text-gray-500">
//                         <span>SKU: {product.skuCode}</span>
//                         <span>•</span>
//                         <span>Brand: {product.brand}</span>
//                         <span>•</span>
//                         <span>৳{product.regularPrice}</span>
//                         {product.discountPrice > 0 && (
//                           <span className="text-green-600">-{product.discountPrice}%</span>
//                         )}
//                       </div>
//                     </div>
//                     {product.images && product.images.length > 0 && (
//                       <div className="flex items-center gap-1 text-xs text-gray-400">
//                         <ImageIcon className="w-3 h-3" />
//                         <span>{product.images.length}</span>
//                       </div>
//                     )}
//                   </div>

//                   {selectedProduct?._id === product._id && product.images && product.images.length > 1 && (
//                     <div className="mt-3 pt-3 border-t border-gray-200">
//                       <p className="text-xs text-gray-500 mb-2">Select image to use in banner:</p>
//                       <div className="flex gap-2 overflow-x-auto pb-1">
//                         {product.images.map((img, idx) => (
//                           <button
//                             key={idx}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setSelectedImageIndex(idx);
//                             }}
//                             className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
//                               selectedImageIndex === idx
//                                 ? 'border-blue-600 ring-2 ring-blue-200'
//                                 : 'border-gray-200 hover:border-gray-400'
//                             }`}
//                           >
//                             <img
//                               src={img.url}
//                               alt={`${product.productName} - ${idx + 1}`}
//                               className="w-full h-full object-cover"
//                             />
//                             {selectedImageIndex === idx && (
//                               <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
//                                 <CheckCircle className="w-5 h-5 text-blue-600" />
//                               </div>
//                             )}
//                           </button>
//                         ))}
//                       </div>
//                       <p className="text-xs text-blue-600 mt-1">
//                         Selected: Image {selectedImageIndex + 1}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="p-5 border-t border-gray-200 flex gap-3 justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSelectProduct}
//             disabled={!selectedProduct}
//             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//           >
//             <CheckCircle className="w-4 h-4" />
//             Select Product
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Create Banner Component
// export default function CreateBannerPage() {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSavingDraft, setIsSavingDraft] = useState(false);
//   const [showProductSearch, setShowProductSearch] = useState(false);
//   const [linkedProduct, setLinkedProduct] = useState(null);
//   const [selectedProductImage, setSelectedProductImage] = useState(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [removeBackground, setRemoveBackground] = useState(false);
//   const fileInputRef = useRef(null);

//   const [formData, setFormData] = useState({
//     title: '',
//     subtitle: '',
//     description: '',
//     badge: '',
//     discount: '',
//     category: '',
//     bgImage: DEFAULT_BG_IMAGE,
//     productImage: null,
//     features: [],
//     buttons: [
//       { text: 'Shop Now', link: '/products', isPrimary: true },
//       { text: 'Learn More', link: '/about', isPrimary: false }
//     ],
//     linkedProductId: null,
//     productImageUrl: null
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     setIsMounted(true);
//     const loadDraft = () => {
//       try {
//         const savedDraft = localStorage.getItem(BANNER_DRAFT_KEY);
//         if (savedDraft) {
//           const draft = JSON.parse(savedDraft);
//           const hasData = draft.title || draft.mainText || draft.description;
//           if (hasData) {
//             setFormData(draft);
//             if (draft.linkedProductId) {
//               fetchLinkedProduct(draft.linkedProductId);
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error loading draft:', error);
//       }
//     };
//     loadDraft();
//   }, []);

//   const fetchLinkedProduct = async (productId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setLinkedProduct(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching linked product:', error);
//     }
//   };

//   const saveToLocalStorage = () => {
//     try {
//       localStorage.setItem(BANNER_DRAFT_KEY, JSON.stringify(formData));
//     } catch (error) {
//       console.error('Error saving draft:', error);
//     }
//   };

//   useEffect(() => {
//     if (isMounted) {
//       saveToLocalStorage();
//     }
//   }, [formData, isMounted]);

//   const stripHtml = (html) => {
//     if (!html) return '';
//     return html.replace(/<[^>]*>/g, '').trim();
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const addFeature = () => {
//     if (formData.features.length >= 3) {
//       toast.error('Maximum 3 features allowed');
//       return;
//     }
//     setFormData(prev => ({
//       ...prev,
//       features: [...prev.features, { icon: 'Truck', text: '' }]
//     }));
//   };

//   const updateFeature = (index, field, value) => {
//     const updatedFeatures = [...formData.features];
//     updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
//     setFormData(prev => ({ ...prev, features: updatedFeatures }));
//   };

//   const removeFeature = (index) => {
//     const updatedFeatures = formData.features.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, features: updatedFeatures }));
//   };

//   const updateButton = (index, field, value) => {
//     const updatedButtons = [...formData.buttons];
//     updatedButtons[index] = { ...updatedButtons[index], [field]: value };
//     setFormData(prev => ({ ...prev, buttons: updatedButtons }));
//   };

//   const handleProductSelect = (product, imageIndex) => {
//     const selectedImage = product.images[imageIndex];
//     const cleanDescription = stripHtml(product.shortDescription || product.fullDescription || '');
    
//     setFormData(prev => ({
//       ...prev,
//       title: product.productName,
//       subtitle: product.categoryName || product.category?.name || '',
//       description: cleanDescription.slice(0, 200),
//       badge: product.tags?.[0] || 'New Arrival',
//       discount: product.discountPrice > 0 ? `${Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)}% OFF` : 'New',
//       category: product.categoryName || product.category?.name || '',
//       linkedProductId: product._id,
//       productImageUrl: selectedImage.url,
//       productImage: null
//     }));

//     setLinkedProduct(product);
//     setSelectedProductImage(selectedImage.url);
//     setUploadedImage(null);
//     toast.success(`Product "${product.productName}" loaded successfully`);
//   };

//   const removeProductLink = () => {
//     setFormData(prev => ({
//       ...prev,
//       linkedProductId: null,
//       productImageUrl: null
//     }));
//     setLinkedProduct(null);
//     setSelectedProductImage(null);
//     toast.info('Product unlinked from banner');
//   };

//   const handleProductImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Invalid format. Allowed: JPG, PNG, WebP');
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('File too large. Max: 5MB');
//       return;
//     }

//     try {
//       setIsUploading(true);
      
//       const formDataUpload = new FormData();
//       formDataUpload.append('file', file);
//       formDataUpload.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
      
//       const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      
//       const response = await fetch(uploadUrl, {
//         method: 'POST',
//         body: formDataUpload,
//       });

//       const data = await response.json();
//       if (data.secure_url) {
//         let finalUrl = data.secure_url;
        
//         // Apply background removal if toggled
//         if (removeBackground) {
//           // Remove background and convert to PNG with transparency
//           finalUrl = data.secure_url.replace(
//             '/upload/',
//             `/upload/e_background_removal,f_png/`
//           );
//         }
        
//         setFormData(prev => ({
//           ...prev,
//           productImage: finalUrl,
//           productImageUrl: null,
//           linkedProductId: null
//         }));
//         setUploadedImage(finalUrl);
//         setSelectedProductImage(null);
//         setLinkedProduct(null);
//         toast.success(removeBackground ? 'Image uploaded with transparent background!' : 'Image uploaded successfully!');
//       } else {
//         toast.error('Failed to upload image');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload image');
//     } finally {
//       setIsUploading(false);
//     }

//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   const handleBgImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Invalid format. Allowed: JPG, PNG, WebP');
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('File too large. Max: 5MB');
//       return;
//     }

//     try {
//       const formDataUpload = new FormData();
//       formDataUpload.append('file', file);
//       formDataUpload.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');

//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//         {
//           method: 'POST',
//           body: formDataUpload,
//         }
//       );

//       const data = await response.json();
//       if (data.secure_url) {
//         setFormData(prev => ({ ...prev, bgImage: data.secure_url }));
//         toast.success('Background image uploaded successfully');
//       } else {
//         toast.error('Failed to upload image');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload image');
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.title?.trim()) newErrors.title = 'Title is required';
//     if (!formData.subtitle?.trim()) newErrors.subtitle = 'Subtitle is required';
//     if (!formData.description?.trim()) newErrors.description = 'Description is required';
//     if (!formData.badge?.trim()) newErrors.badge = 'Badge is required';
//     if (!formData.discount?.trim()) newErrors.discount = 'Discount is required';
//     if (!formData.category?.trim()) newErrors.category = 'Category is required';
    
//     // if (!formData.productImageUrl && !formData.productImage) {
//     //   newErrors.productImage = 'Product image is required (either from linked product or manual upload)';
//     // }

//     formData.features.forEach((feature, index) => {
//       if (!feature.text?.trim()) {
//         newErrors[`feature_${index}`] = 'Feature text is required';
//       }
//     });

//     formData.buttons.forEach((button, index) => {
//       if (!button.text?.trim()) {
//         newErrors[`button_${index}_text`] = 'Button text is required';
//       }
//       if (!button.link?.trim()) {
//         newErrors[`button_${index}_link`] = 'Button link is required';
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!validateForm()) {
// //       toast.error('Please fix the errors in the form');
// //       const firstError = Object.keys(errors)[0];
// //       if (firstError) {
// //         const element = document.querySelector(`[name="${firstError}"]`);
// //         if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
// //       }
// //       return;
// //     }

// //     setIsSubmitting(true);
// //     try {
// //       const token = localStorage.getItem('token');
// //       const finalProductImage = formData.productImageUrl || formData.productImage;
      
// //       const payload = {
// //         ...formData,
// //         productImage: finalProductImage,
// //         features: formData.features.filter(f => f.text.trim()),
// //         buttons: formData.buttons.filter(b => b.text.trim() && b.link.trim())
// //       };

// //       const response = await fetch('http://localhost:5000/api/banners', {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(payload)
// //       });

// //       const data = await response.json();
// //       if (data.success) {
// //         toast.success('Banner created successfully!');
// //         localStorage.removeItem(BANNER_DRAFT_KEY);
// //         router.push('/authorize/banner-management');
// //       } else {
// //         toast.error(data.error || 'Failed to create banner');
// //       }
// //     } catch (error) {
// //       console.error('Error creating banner:', error);
// //       toast.error('Network error. Please try again.');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };


// // In CreateBannerPage component, update handleSubmit function:

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!validateForm()) {
//     toast.error('Please fix the errors in the form');
//     const firstError = Object.keys(errors)[0];
//     if (firstError) {
//       const element = document.querySelector(`[name="${firstError}"]`);
//       if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//     return;
//   }

//   setIsSubmitting(true);
//   try {
//     const token = localStorage.getItem('token');
    
//     // Format the data for the API
//     const payload = {
//       title: formData.title,
//       subtitle: formData.subtitle,
//       description: formData.description,
//       badge: formData.badge,
//       discount: formData.discount,
//       category: formData.category,
//       bgImage: formData.bgImage, // Can be string or object
//       productImage: formData.productImage || formData.productImageUrl,
//       productImageUrl: formData.productImageUrl,
//       linkedProductId: formData.linkedProductId,
//       features: formData.features.filter(f => f.text.trim()),
//       buttons: formData.buttons.filter(b => b.text.trim() && b.link.trim()),
//       isActive: true,
//       showOnHomepage: true,
//       showOnMobile: true,
//       displayOrder: 0
//     };

//     const response = await fetch('http://localhost:5000/api/banners', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(payload)
//     });

//     const data = await response.json();
    
//     if (data.success) {
//       toast.success('Banner created successfully!');
//       localStorage.removeItem(BANNER_DRAFT_KEY);
//       router.push('/authorize/banner-management');
//     } else {
//       toast.error(data.error || 'Failed to create banner');
//       // Log the error for debugging
//       console.error('Banner creation error:', data);
//     }
//   } catch (error) {
//     console.error('Error creating banner:', error);
//     toast.error('Network error. Please try again.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   const handleSaveDraft = () => {
//     setIsSavingDraft(true);
//     saveToLocalStorage();
//     setTimeout(() => {
//       setIsSavingDraft(false);
//       toast.success('Draft saved successfully!');
//     }, 500);
//   };

//   const handleClearDraft = () => {
//     if (confirm('Are you sure you want to clear the draft? All unsaved data will be lost.')) {
//       localStorage.removeItem(BANNER_DRAFT_KEY);
//       setFormData({
//         title: '',
//         subtitle: '',
//         mainText: '',
//         description: '',
//         badge: '',
//         discount: '',
//         category: '',
//         bgImage: DEFAULT_BG_IMAGE,
//         productImage: null,
//         features: [],
//         buttons: [
//           { text: 'Shop Now', link: '/products', isPrimary: true },
//           { text: 'Learn More', link: '/about', isPrimary: false }
//         ],
//         linkedProductId: null,
//         productImageUrl: null
//       });
//       setLinkedProduct(null);
//       setSelectedProductImage(null);
//       setUploadedImage(null);
//       toast.success('Draft cleared');
//     }
//   };

//   const getCurrentProductImage = () => {
//     if (formData.productImage) return formData.productImage;
//     if (formData.productImageUrl) return formData.productImageUrl;
//     return null;
//   };

//   return (
//     <ProtectedRoute pageKey="create_banner">
//     <div className="min-h-screen bg-gray-50">
//       <ProductSearchModal
//         isOpen={showProductSearch}
//         onClose={() => setShowProductSearch(false)}
//         onSelectProduct={handleProductSelect}
//       />

//       {/* Header */}
//       <div className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <NextLink href="/authorize/banner-management" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </NextLink>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <ImageIcon className="w-6 h-6 text-blue-600" />
//                   <h1 className="text-xl font-bold text-gray-900">Create New Banner</h1>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-1">Add a new banner to showcase on the homepage</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={handleClearDraft}
//                 className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
//               >
//                 Clear Draft
//               </button>
//               <button
//                 onClick={handleSaveDraft}
//                 disabled={isSavingDraft}
//                 className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
//               >
//                 {isSavingDraft ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                 Save Draft
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Basic Information Card */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Info className="w-5 h-5 text-blue-600" />
//                     Basic Information
//                   </h2>
//                 </div>
//                 <div className="p-5 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleChange}
//                       className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
//                       placeholder="e.g., Premium Gadgets"
//                     />
//                     {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle <span className="text-red-500">*</span></label>
//                     <input
//                       type="text"
//                       name="subtitle"
//                       value={formData.subtitle}
//                       onChange={handleChange}
//                       className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.subtitle ? 'border-red-500' : 'border-gray-300'}`}
//                       placeholder="e.g., Latest Technology"
//                     />
//                     {errors.subtitle && <p className="text-xs text-red-600 mt-1">{errors.subtitle}</p>}
//                   </div>

             

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       rows="3"
//                       className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
//                       placeholder="Write a compelling description for the banner..."
//                     />
//                     {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Badge <span className="text-red-500">*</span></label>
//                       <input
//                         type="text"
//                         name="badge"
//                         value={formData.badge}
//                         onChange={handleChange}
//                         className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.badge ? 'border-red-500' : 'border-gray-300'}`}
//                         placeholder="e.g., Limited Edition, Best Seller"
//                       />
//                       {errors.badge && <p className="text-xs text-red-600 mt-1">{errors.badge}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Discount <span className="text-red-500">*</span></label>
//                       <input
//                         type="text"
//                         name="discount"
//                         value={formData.discount}
//                         onChange={handleChange}
//                         className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.discount ? 'border-red-500' : 'border-gray-300'}`}
//                         placeholder="e.g., 40% OFF, New Arrival"
//                       />
//                       {errors.discount && <p className="text-xs text-red-600 mt-1">{errors.discount}</p>}
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
//                     <input
//                       type="text"
//                       name="category"
//                       value={formData.category}
//                       onChange={handleChange}
//                       className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
//                       placeholder="e.g., Electronics, Wearables, Audio"
//                     />
//                     {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
//                   </div>
//                 </div>
//               </div>

//               {/* Features Card */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <div className="flex items-center justify-between">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <Star className="w-5 h-5 text-blue-600" />
//                       Features <span className="text-sm font-normal text-gray-400">(Max 3)</span>
//                     </h2>
//                     <span className="text-xs text-gray-500">{formData.features.length}/3</span>
//                   </div>
//                 </div>
//                 <div className="p-5">
//                   <div className="space-y-4">
//                     {formData.features.map((feature, index) => (
//                       <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                         <div className="flex items-center gap-2">
//                           <select
//                             value={feature.icon}
//                             onChange={(e) => updateFeature(index, 'icon', e.target.value)}
//                             className="px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white"
//                           >
//                             {FEATURE_ICONS.map(icon => (
//                               <option key={icon.value} value={icon.value}>
//                                 {icon.label}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <input
//                           type="text"
//                           value={feature.text}
//                           onChange={(e) => updateFeature(index, 'text', e.target.value)}
//                           placeholder="Feature text..."
//                           className={`flex-1 px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors[`feature_${index}`] ? 'border-red-500' : 'border-gray-300'}`}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeFeature(index)}
//                           className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
//                     {formData.features.length < 3 && (
//                       <button
//                         type="button"
//                         onClick={addFeature}
//                         className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
//                       >
//                         <Plus className="w-4 h-4" />
//                         Add Feature
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Buttons Card */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <LinkIcon className="w-5 h-5 text-blue-600" />
//                     Buttons <span className="text-sm font-normal text-gray-400">(Max 2)</span>
//                   </h2>
//                 </div>
//                 <div className="p-5 space-y-4">
//                   {formData.buttons.map((button, index) => (
//                     <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                       <div className="flex-1 w-full">
//                         <input
//                           type="text"
//                           value={button.text}
//                           onChange={(e) => updateButton(index, 'text', e.target.value)}
//                           placeholder="Button text..."
//                           className={`w-full px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors[`button_${index}_text`] ? 'border-red-500' : 'border-gray-300'}`}
//                         />
//                       </div>
//                       <div className="flex-1 w-full">
//                         <input
//                           type="text"
//                           value={button.link}
//                           onChange={(e) => updateButton(index, 'link', e.target.value)}
//                           placeholder="Button link..."
//                           className={`w-full px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors[`button_${index}_link`] ? 'border-red-500' : 'border-gray-300'}`}
//                         />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <label className="flex items-center gap-1 text-xs text-gray-600">
//                           <input
//                             type="radio"
//                             checked={button.isPrimary}
//                             onChange={() => {
//                               const updatedButtons = formData.buttons.map((b, i) => ({
//                                 ...b,
//                                 isPrimary: i === index
//                               }));
//                               setFormData(prev => ({ ...prev, buttons: updatedButtons }));
//                             }}
//                             className="w-3.5 h-3.5"
//                           />
//                           Primary
//                         </label>
//                         <button
//                           type="button"
//                           onClick={() => {
//                             if (formData.buttons.length <= 1) {
//                               toast.error('At least one button is required');
//                               return;
//                             }
//                             const updatedButtons = formData.buttons.filter((_, i) => i !== index);
//                             setFormData(prev => ({ ...prev, buttons: updatedButtons }));
//                           }}
//                           className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-6">
//               {/* Product Image Card */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <ImageIcon className="w-5 h-5 text-blue-600" />
//                     Product Image 
//                   </h2>
//                   <p className="text-xs text-gray-500 mt-1">Upload manually or link a product</p>
//                 </div>
//                 <div className="p-5 space-y-4">
//                   {/* Background Removal Toggle */}
//                   {/* <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                     <div className="flex-1">
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={removeBackground}
//                           onChange={(e) => setRemoveBackground(e.target.checked)}
//                           className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
//                         />
//                         <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
//                           <Wand2 className="w-4 h-4 text-blue-600" />
//                           Auto-remove background
//                         </span>
//                       </label>
//                       <p className="text-xs text-gray-500 mt-1">AI will remove background and convert to PNG with transparency</p>
//                     </div>
//                     {removeBackground && (
//                       <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
//                         <CheckCircle className="w-3 h-3" />
//                         Active
//                       </span>
//                     )}
//                   </div> */}

//                   {/* Manual Upload */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
//                     <div className="relative rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
//                       {getCurrentProductImage() ? (
//                         <div className="relative">
//                           <img
//                             src={getCurrentProductImage()}
//                             alt="Product"
//                             className="w-full h-40 object-contain"
//                             style={removeBackground ? { background: 'transparent' } : { background: '#f9fafb' }}
//                           />
//                           {removeBackground && (
//                             <div className="absolute top-2 left-2 px-2 py-0.5 bg-blue-500/80 text-white text-[10px] rounded-full flex items-center gap-1">
//                               <Wand2 className="w-2.5 h-2.5" />
//                               PNG (Transparent)
//                             </div>
//                           )}
//                           <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                             <button
//                               type="button"
//                               onClick={() => document.getElementById('product-image-upload').click()}
//                               className="px-3 py-1.5 bg-white/90 text-gray-700 text-sm rounded-lg hover:bg-white transition-colors flex items-center gap-2"
//                             >
//                               <Upload className="w-4 h-4" />
//                               Change Image
//                             </button>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setFormData(prev => ({ ...prev, productImage: null, productImageUrl: null }));
//                               setSelectedProductImage(null);
//                               setUploadedImage(null);
//                               if (linkedProduct) {
//                                 removeProductLink();
//                               }
//                             }}
//                             className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ) : (
//                         <button
//                           type="button"
//                           onClick={() => document.getElementById('product-image-upload').click()}
//                           className="w-full h-40 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-blue-600 transition-colors"
//                         >
//                           <Upload className="w-8 h-8" />
//                           <span className="text-sm">Click to upload product image</span>
//                           <span className="text-xs">JPG, PNG, WebP (max 5MB)</span>
//                           {removeBackground && (
//                             <span className="text-xs text-blue-500 flex items-center gap-1">
//                               <Wand2 className="w-3 h-3" />
//                               Background will be removed automatically
//                             </span>
//                           )}
//                         </button>
//                       )}
//                       <input
//                         id="product-image-upload"
//                         type="file"
//                         accept="image/jpeg,image/jpg,image/png,image/webp"
//                         onChange={handleProductImageUpload}
//                         className="hidden"
//                       />
//                     </div>
//                     {errors.productImage && <p className="text-xs text-red-600 mt-1">{errors.productImage}</p>}
//                     {isUploading && (
//                       <div className="flex items-center justify-center gap-2 mt-2">
//                         <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
//                         <span className="text-sm text-gray-500">
//                           {removeBackground ? 'Uploading and removing background...' : 'Uploading...'}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* OR Divider */}
//                   <div className="relative">
//                     <div className="absolute inset-0 flex items-center">
//                       <div className="w-full border-t border-gray-300"></div>
//                     </div>
//                     <div className="relative flex justify-center text-xs">
//                       <span className="px-2 bg-white text-gray-500">OR</span>
//                     </div>
//                   </div>

//                   {/* Link Product */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Select from Product</label>
//                     {linkedProduct ? (
//                       <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                         <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
//                           {selectedProductImage ? (
//                             <img
//                               src={selectedProductImage}
//                               alt={linkedProduct.productName}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : linkedProduct.images && linkedProduct.images.length > 0 ? (
//                             <img
//                               src={linkedProduct.images[0].url}
//                               alt={linkedProduct.productName}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center">
//                               <ImageIcon className="w-5 h-5 text-gray-400" />
//                             </div>
//                           )}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-medium text-gray-900 truncate">{linkedProduct.productName}</h4>
//                           <p className="text-xs text-gray-500">SKU: {linkedProduct.skuCode}</p>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={removeProductLink}
//                           className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <Unlink className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={() => setShowProductSearch(true)}
//                         className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-blue-600 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
//                       >
//                         <Search className="w-4 h-4" />
//                         Search & Select Product
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Background Image Card */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <ImageIcon className="w-5 h-5 text-blue-600" />
//                     Background Image
//                   </h2>
//                   <p className="text-xs text-gray-500 mt-1">Upload a custom background image</p>
//                 </div>
//                 <div className="p-5">
//                   <div className="relative rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
//                   <img
//   src={formData.bgImage}
//   alt="Banner background"
//   className="w-full h-32 object-cover"
//   onError={(e) => {
//     e.target.onerror = null;
//     e.target.src = '/images/banner-bg.png';
//   }}
// />
//                     <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                       <button
//                         type="button"
//                         onClick={() => document.getElementById('bg-image-upload').click()}
//                         className="px-3 py-1.5 bg-white/90 text-gray-700 text-sm rounded-lg hover:bg-white transition-colors flex items-center gap-2"
//                       >
//                         <Upload className="w-4 h-4" />
//                         Change Image
//                       </button>
//                     </div>
//                   </div>
//                   <input
//                     id="bg-image-upload"
//                     type="file"
//                     accept="image/jpeg,image/jpg,image/png,image/webp"
//                     onChange={handleBgImageUpload}
//                     className="hidden"
//                   />
//                   <p className="text-xs text-gray-400 mt-2 text-center">Recommended: 1920x600px, max 5MB</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Full Width Preview Section */}
//           <div className="mt-8">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                 <Eye className="w-5 h-5 text-blue-600" />
//                 Banner Preview (Full Width)
//               </h2>
//               <span className="text-xs text-gray-500">This is exactly how the banner will appear on the homepage</span>
//             </div>
            
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               <div 
//                 className="relative w-full bg-cover bg-center bg-no-repeat"
//                 style={{ 
//                   backgroundImage: `url(${formData.bgImage})`,
//                   minHeight: '400px',
//                   height: 'auto',
//                   aspectRatio: '16/5'
//                 }}
//               >
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent" />
                
//                 {/* Decorative Elements */}
//                 <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//                 <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
//                 {/* Content */}
//                 <div className="relative h-full flex items-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8">
//                   <div className="container mx-auto">
//                     <div className="flex items-center justify-between gap-8">
//                       {/* Left Content */}
//                       <div className="flex-1 max-w-2xl">
//                         {/* Badge */}
//                         {formData.badge && (
//                           <div className="mb-2 sm:mb-3">
//                             <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 shadow-sm">
//                               {formData.badge}
//                             </span>
//                           </div>
//                         )}
                        
//                         {/* Title */}
//                         {formData.title && (
//                           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif text-gray-900 mb-1 sm:mb-2 leading-tight">
//                             {formData.title}
//                           </h1>
//                         )}
                        
//                         {/* Subtitle */}
//                         {formData.subtitle && (
//                           <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-3">
//                             {formData.subtitle}
//                           </h2>
//                         )}
                        
                     
                        
//                         {/* Description */}
//                         {formData.description && (
//                           <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 max-w-xl">
//                             {formData.description}
//                           </p>
//                         )}
                        
//                         {/* Features */}
//                         {formData.features.length > 0 && (
//                           <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
//                             {formData.features.map((feature, idx) => {
//                               const IconComponent = FEATURE_ICONS.find(f => f.value === feature.icon)?.icon;
//                               return (
//                                 <div key={idx} className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/80 backdrop-blur-md rounded-full border border-gray-200">
//                                   {IconComponent && <span className="w-3.5 h-3.5 sm:w-4 sm:h-4">{IconComponent}</span>}
//                                   <span className="text-gray-700 text-xs sm:text-sm font-medium">{feature.text}</span>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         )}
                        
//                         {/* Buttons */}
//                         {formData.buttons.length > 0 && (
//                           <div className="flex flex-wrap gap-2 sm:gap-3">
//                             {formData.buttons.map((button, idx) => (
//                               button.text && button.link && (
//                                 <button
//                                   key={idx}
//                                   className={`px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full font-semibold transition-all ${
//                                     button.isPrimary
//                                       ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
//                                       : 'bg-white/80 backdrop-blur-md border border-gray-300 text-gray-700 hover:bg-white hover:shadow-lg'
//                                   }`}
//                                 >
//                                   {button.text}
//                                 </button>
//                               )
//                             ))}
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Right Side - Product Image */}
//                       {getCurrentProductImage() && (
//                         <div className="hidden md:block flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72">
//                           <div className="relative w-full h-auto">
//                             <img
//                               src={getCurrentProductImage()}
//                               alt="Product"
//                               className="w-full h-auto object-contain drop-shadow-2xl"
//                               style={{ 
//                                 filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.15))',
//                                 maxHeight: '280px',
//                                 background: removeBackground ? 'transparent' : 'transparent'
//                               }}
//                             />
//                             {/* Glow effect */}
//                             <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl -z-10 scale-150" />
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Discount Badge */}
//                 {formData.discount && (
//                   <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8">
//                     <div className="relative">
//                       <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl">
//                         <div className="text-center">
//                           <div className="text-white font-black text-xs sm:text-sm md:text-base lg:text-xl leading-tight">
//                             {formData.discount}
//                           </div>
//                           <div className="text-white/90 text-[6px] sm:text-[8px] md:text-[10px] font-medium">
//                             OFF
//                           </div>
//                         </div>
//                       </div>
//                       <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-orange-500 blur-md opacity-50 -z-10" />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="mt-8 flex justify-end">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
//             >
//               {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//               {isSubmitting ? 'Creating Banner...' : 'Create Banner'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     </ProtectedRoute>
//   );
// }

// app/authorize/create-banner/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { 
  Plus, 
  X, 
  Save, 
  ArrowLeft,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  Trash2,
  Upload,
  Eye,
  CheckCircle,
  Link as LinkIcon,
  EyeOff,
  GripVertical,
  Sparkles,
  Leaf,
  ShoppingBag,
  Percent,
  Settings  // ✅ ADD THIS - Settings was missing
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { FaArrowRight } from 'react-icons/fa'; // ✅ ADD THIS for the preview

// Default images
const DEFAULT_LEFT_IMAGE = '/images/lbg9.PNG';

// ============================================================
// CLOUDINARY UPLOAD FUNCTION
// ============================================================

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const data = await response.json();
    if (data.secure_url) {
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } else {
      throw new Error(data.error?.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

// ============================================================
// IMAGE UPLOAD COMPONENT
// ============================================================

const ImageUploadField = ({ 
  imageUrl, 
  onImageChange, 
  onImageRemove, 
  label, 
  required = false,
  aspectRatio = '16/9',
  helpText = '',
  defaultImage = ''
}) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(imageUrl || defaultImage || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setPreview(imageUrl || defaultImage || '');
  }, [imageUrl, defaultImage]);

  const validateImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, message: 'Only JPG, PNG, and WebP formats are allowed.' };
    }
    if (file.size > 5 * 1024 * 1024) {
      return { valid: false, message: 'Image size must be less than 5MB.' };
    }
    return { valid: true };
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.message);
      toast.error(validation.message);
      return;
    }

    setError('');
    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
      
      const result = await uploadToCloudinary(file);
      
      if (result && result.url) {
        onImageChange(result.url);
        toast.success('Image uploaded successfully!');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image');
      toast.error('Failed to upload image');
      setPreview('');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onImageRemove();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {preview ? (
        <div className="relative inline-block">
          <div className={`rounded-lg overflow-hidden border-2 border-pink-500/30 bg-gray-100`}
               style={{ width: '200px', aspectRatio: aspectRatio }}>
            <img 
              src={preview} 
              alt={label} 
              className="w-full h-full object-cover"
            />
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <span className="text-xs text-gray-400">JPG, PNG, WebP (max 5MB)</span>
        </div>
      )}
      {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

// ============================================================
// PREVIEW BANNER COMPONENT
// ============================================================

const PreviewBanner = ({ slide }) => {
  const FONT_FAMILY = "'Courgette', cursive";
  const FONT_FAMILY_INTER = "'Inter', sans-serif";

  // Check if slide data exists
  if (!slide) return null;

  return (
    <div className="relative overflow-hidden bg-[#F8F1F4]">
      <div className="relative grid lg:grid-cols-[1.05fr_1fr] min-h-[400px] lg:min-h-[460px]">

        {/* Left Panel */}
        <div
          className="relative flex items-center px-6 sm:px-10 lg:px-16 py-12 lg:py-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${slide.leftPanelBgImage || '/images/lbg9.PNG'}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-[#EE4275]/20 blur-3xl pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#EE4275]" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#F0A6BE]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                {slide.eyebrow || 'New In — Beauty Edit'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[2.8rem] leading-[1.08] font-bold text-white mb-4" style={{ fontFamily: FONT_FAMILY }}>
              {slide.title || 'Your Beauty Title'}
            </h1>

            <p className="text-white/80 text-sm lg:text-base leading-relaxed max-w-md mb-6" style={{ fontFamily: FONT_FAMILY }}>
              {slide.subtitle || 'Your beauty description'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EE4275] text-white rounded-full font-medium text-sm hover:bg-[#d63868] transition-colors" style={{ fontFamily: FONT_FAMILY }}>
                {slide.ctaLabel || 'Shop Now'}
                <FaArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-white/70 text-sm font-medium border-b border-white/20 pb-0.5" style={{ fontFamily: FONT_FAMILY }}>
                {slide.secondaryLabel || 'Our story'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="relative min-h-[200px] lg:min-h-0 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${slide.rightPanelBgImage || '/images/login.jpg'}')` }} />
        </div>

        {/* Center Circle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 hidden sm:block" style={{ left: '51.22%' }}>
          <div className="w-[200px] h-[200px] lg:w-[280px] lg:h-[280px] rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/20 shadow-2xl">
            <div className="w-[88%] h-[88%] rounded-full overflow-hidden relative bg-black/10">
              <img
                src={slide.circleImage || '/images/f.PNG'}
                alt="Product"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/f.PNG';
                }}
              />
            </div>
          </div>

          {slide.badgeText && (
            <div className="absolute z-30 -top-4 -right-6 lg:-right-8 bg-white rounded-full w-20 h-20 lg:w-24 lg:h-24 flex flex-col items-center justify-center text-center shadow-sm rotate-6">
              <span className="block text-[#EE4275] font-bold text-xs sm:text-sm leading-none" style={{ fontFamily: FONT_FAMILY }}>
                {slide.badgeText.match(/[\d+]+%|\d\+\d/)?.[0] || slide.badgeText.split(' ')[0]}
              </span>
              <span className="block text-[8px] sm:text-[9px] text-[#8B7A8C] uppercase tracking-wide mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                {slide.badgeText.replace(/[\d+]+%|\d\+\d/, '').trim() || 'Limited time'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN CREATE BANNER COMPONENT
// ============================================================

export default function CreateBannerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState({
    eyebrow: '',
    title: '',
    subtitle: '',
    description: '',
    badgeText: '',
    leftPanelBgImage: DEFAULT_LEFT_IMAGE,
    circleImage: '',
    rightPanelBgImage: '',
    ctaLabel: 'Shop the edit',
    ctaHref: '/products',
    secondaryLabel: 'Our story',
    secondaryHref: '/about',
    displayOrder: 0,
    isActive: true,
    isPublished: true,
    showOnHomepage: true,
    showOnMobile: true
  });

  const [errors, setErrors] = useState({});

  const BANNER_DRAFT_KEY = 'beauty_banner_draft';

  useEffect(() => {
    setIsMounted(true);
    const loadDraft = () => {
      try {
        const savedDraft = localStorage.getItem(BANNER_DRAFT_KEY);
        if (savedDraft) {
          const draft = JSON.parse(savedDraft);
          const hasData = draft.title || draft.eyebrow;
          if (hasData) {
            setFormData(draft);
          }
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    };
    loadDraft();
  }, []);

  // Auto-save draft
  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem(BANNER_DRAFT_KEY, JSON.stringify(formData));
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    }
  }, [formData, isMounted]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.circleImage) newErrors.circleImage = 'Circle image is required';
    if (!formData.rightPanelBgImage) newErrors.rightPanelBgImage = 'Right panel background image is required';
    if (!formData.ctaLabel?.trim()) newErrors.ctaLabel = 'CTA label is required';
    if (!formData.ctaHref?.trim()) newErrors.ctaHref = 'CTA link is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.querySelector(`[name="${firstError}"]`);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        eyebrow: formData.eyebrow,
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        badgeText: formData.badgeText,
        leftPanelBgImage: formData.leftPanelBgImage || DEFAULT_LEFT_IMAGE,
        circleImage: formData.circleImage,
        rightPanelBgImage: formData.rightPanelBgImage,
        ctaLabel: formData.ctaLabel,
        ctaHref: formData.ctaHref,
        secondaryLabel: formData.secondaryLabel,
        secondaryHref: formData.secondaryHref,
        displayOrder: formData.displayOrder,
        isActive: formData.isActive,
        isPublished: formData.isPublished,
        showOnHomepage: formData.showOnHomepage,
        showOnMobile: formData.showOnMobile
      };

      const response = await fetch('http://localhost:5000/api/banners', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Banner created successfully!');
        localStorage.removeItem(BANNER_DRAFT_KEY);
        router.push('/authorize/banner-management');
      } else {
        toast.error(data.error || 'Failed to create banner');
        console.error('Banner creation error:', data);
      }
    } catch (error) {
      console.error('Error creating banner:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearDraft = () => {
    if (confirm('Are you sure you want to clear the draft? All unsaved data will be lost.')) {
      localStorage.removeItem(BANNER_DRAFT_KEY);
      setFormData({
        eyebrow: '',
        title: '',
        subtitle: '',
        description: '',
        badgeText: '',
        leftPanelBgImage: DEFAULT_LEFT_IMAGE,
        circleImage: '',
        rightPanelBgImage: '',
        ctaLabel: 'Shop the edit',
        ctaHref: '/products',
        secondaryLabel: 'Our story',
        secondaryHref: '/about',
        displayOrder: 0,
        isActive: true,
        isPublished: true,
        showOnHomepage: true,
        showOnMobile: true
      });
      toast.success('Draft cleared');
    }
  };

  const handleSaveDraft = () => {
    setIsSavingDraft(true);
    try {
      localStorage.setItem(BANNER_DRAFT_KEY, JSON.stringify(formData));
      setTimeout(() => {
        setIsSavingDraft(false);
        toast.success('Draft saved successfully!');
      }, 500);
    } catch (error) {
      setIsSavingDraft(false);
      toast.error('Failed to save draft');
    }
  };

  // Generate preview
  const generatePreview = () => {
    return {
      eyebrow: formData.eyebrow || 'New In — Beauty Edit',
      title: formData.title || 'Your Beauty Title',
      subtitle: formData.subtitle || formData.description || 'Your beauty description',
      badgeText: formData.badgeText || 'Up to 30% off',
      leftPanelBgImage: formData.leftPanelBgImage || DEFAULT_LEFT_IMAGE,
      circleImage: formData.circleImage || '/images/f.PNG',
      rightPanelBgImage: formData.rightPanelBgImage || '/images/login.jpg',
      ctaLabel: formData.ctaLabel || 'Shop Now',
      ctaHref: formData.ctaHref || '/products',
      secondaryLabel: formData.secondaryLabel || 'Our story',
      secondaryHref: formData.secondaryHref || '/about'
    };
  };

  return (
    <ProtectedRoute pageKey="create_banner">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b shadow-sm sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-4">
                <NextLink href="/authorize/banner-management" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </NextLink>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                      Create New Banner
                    </h1>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
                    Create a beautiful beauty banner for the homepage carousel
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <button
                  onClick={handleClearDraft}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Draft
                </button>
                <button
                  onClick={handleSaveDraft}
                  disabled={isSavingDraft}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50"
                >
                  {isSavingDraft ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Draft
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Form Fields */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 sm:p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-pink-600" />
                      Banner Content
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">All text fields are optional except Title</p>
                  </div>
                  <div className="p-4 sm:p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Eyebrow</label>
                      <input
                        type="text"
                        name="eyebrow"
                        value={formData.eyebrow}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
                        placeholder="e.g., New In — Beauty Edit"
                      />
                      <p className="text-xs text-gray-400 mt-1">Small tagline above the title</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., Skin that speaks before you do"
                      />
                      {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle / Description</label>
                      <textarea
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition resize-none"
                        placeholder="Describe your beauty product or collection..."
                      />
                    </div>

                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                      <input
                        type="text"
                        name="badgeText"
                        value={formData.badgeText}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
                        placeholder="e.g., Up to 30% off"
                      />
                      <p className="text-xs text-gray-400 mt-1">Shown on the circle badge</p>
                    </div> */}
                  </div>
                </div>

                {/* Buttons Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 sm:p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-pink-600" />
                      Buttons
                    </h2>
                  </div>
                  <div className="p-4 sm:p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Label <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="ctaLabel"
                          value={formData.ctaLabel}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.ctaLabel ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Shop the edit"
                        />
                        {errors.ctaLabel && <p className="text-xs text-red-600 mt-1">{errors.ctaLabel}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Link <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="ctaHref"
                          value={formData.ctaHref}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.ctaHref ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="/products"
                        />
                        {errors.ctaHref && <p className="text-xs text-red-600 mt-1">{errors.ctaHref}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Label</label>
                        <input
                          type="text"
                          name="secondaryLabel"
                          value={formData.secondaryLabel}
                          onChange={handleChange}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
                          placeholder="Our story"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
                        <input
                          type="text"
                          name="secondaryHref"
                          value={formData.secondaryHref}
                          onChange={handleChange}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
                          placeholder="/about"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Images */}
              <div className="space-y-6">
                {/* Circle Image Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 sm:p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-pink-600" />
                      Circle Image <span className="text-red-500 text-sm">*</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Main product image in the center circle</p>
                  </div>
                  <div className="p-4 sm:p-5">
                    <ImageUploadField
                      imageUrl={formData.circleImage}
                      onImageChange={(url) => setFormData(prev => ({ ...prev, circleImage: url }))}
                      onImageRemove={() => setFormData(prev => ({ ...prev, circleImage: '' }))}
                      label="Upload Circle Image"
                      required={true}
                      aspectRatio="1/1"
                      helpText="Recommended: Square image, 400x400px"
                    />
                    {errors.circleImage && <p className="text-xs text-red-600 mt-1">{errors.circleImage}</p>}
                  </div>
                </div>

                {/* Right Panel Image Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 sm:p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-pink-600" />
                      Right Panel Image <span className="text-red-500 text-sm">*</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Full background image for the right panel</p>
                  </div>
                  <div className="p-4 sm:p-5">
                    <ImageUploadField
                      imageUrl={formData.rightPanelBgImage}
                      onImageChange={(url) => setFormData(prev => ({ ...prev, rightPanelBgImage: url }))}
                      onImageRemove={() => setFormData(prev => ({ ...prev, rightPanelBgImage: '' }))}
                      label="Upload Right Panel Image"
                      required={true}
                      aspectRatio="16/9"
                      helpText="Recommended: 1920x1080px, JPG or WebP"
                    />
                    {errors.rightPanelBgImage && <p className="text-xs text-red-600 mt-1">{errors.rightPanelBgImage}</p>}
                  </div>
                </div>

                {/* Left Panel Image Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 sm:p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-pink-600" />
                      Left Panel Image
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Background image for the left panel (optional)</p>
                  </div>
                  <div className="p-4 sm:p-5">
                    <ImageUploadField
                      imageUrl={formData.leftPanelBgImage}
                      onImageChange={(url) => setFormData(prev => ({ ...prev, leftPanelBgImage: url }))}
                      onImageRemove={() => setFormData(prev => ({ ...prev, leftPanelBgImage: DEFAULT_LEFT_IMAGE }))}
                      label="Upload Left Panel Image"
                      required={false}
                      aspectRatio="16/9"
                      helpText="Default image will be used if not uploaded"
                      defaultImage={DEFAULT_LEFT_IMAGE}
                    />
                  </div>
                </div>

                {/* Display Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 sm:p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-pink-600" />
                      Display Settings
                    </h2>
                  </div>
                  <div className="p-4 sm:p-5 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                      <input
                        type="number"
                        name="displayOrder"
                        value={formData.displayOrder}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
                        min="0"
                      />
                      <p className="text-xs text-gray-400 mt-1">Lower number appears first</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                        />
                        <span className="text-sm text-gray-700">Active</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isPublished"
                          checked={formData.isPublished}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                        />
                        <span className="text-sm text-gray-700">Published</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="showOnHomepage"
                          checked={formData.showOnHomepage}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                        />
                        <span className="text-sm text-gray-700">Show on Homepage</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="showOnMobile"
                          checked={formData.showOnMobile}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                        />
                        <span className="text-sm text-gray-700">Show on Mobile</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-pink-600" />
                  Live Preview
                </h2>
                <span className="text-xs text-gray-500">This is how your banner will appear on the homepage</span>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <PreviewBanner slide={generatePreview()} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Banner...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Create Banner</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}