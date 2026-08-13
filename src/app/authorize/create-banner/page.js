

// 'use client';

// export const dynamic = 'force-dynamic';

// import { useState, useEffect, useRef, Suspense } from 'react';
// import { useRouter } from 'next/navigation';
// import NextLink from 'next/link';
// import Link from 'next/link';
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
//   Wand2,
//   Flower2,
//   Sparkles,
//   Zap,
//   Battery
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // Feature icon options - HyperVolt themed
// const FEATURE_ICONS = [
//   { value: 'Truck', label: 'Truck', icon: <Truck className="w-4 h-4" /> },
//   { value: 'Shield', label: 'Shield', icon: <Shield className="w-4 h-4" /> },
//   { value: 'Clock', label: 'Clock', icon: <Clock className="w-4 h-4" /> },
//   { value: 'Star', label: 'Star', icon: <Star className="w-4 h-4" /> },
//   { value: 'TrendingUp', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
//   { value: 'Headphones', label: 'Headphones', icon: <Headphones className="w-4 h-4" /> }
// ];

// // Default banner background image
// const DEFAULT_BG_IMAGE = '/images/banner.png';

// // Banner draft key for localStorage
// const BANNER_DRAFT_KEY = 'hypervolt_banner_draft';

// // Product Search Modal Component - HyperVolt Theme
// const ProductSearchModal = ({ isOpen, onClose, onSelectProduct, mode = 'single' }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const searchTimeoutRef = useRef(null);

//   const searchProducts = async (query) => {
//     if (!query.trim()) {
//       setProducts([]);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `http://localhost:5000/api/products/authorize/all?search=${encodeURIComponent(query)}&limit=10`,
//         {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }
//       );
//       const data = await response.json();
//       if (data.success) {
//         setProducts(data.data);
//       } else {
//         toast.error(data.error || 'Failed to search products');
//       }
//     } catch (error) {
//       toast.error('Failed to search products');
//     } finally {
//       setIsLoading(false);
//     }
//   };

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

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col border border-[#06B6D4]/20">
//         <div className="p-5 border-b border-[#06B6D4]/20 flex items-center justify-between bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5">
//           <h3 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//             <Package className="w-5 h-5 text-[#06B6D4]" />
//             {mode === 'single' ? 'Select Product for Banner' : 'Select Featured Product'}
//           </h3>
//           <button onClick={onClose} className="p-1 hover:bg-[#06B6D4]/10 rounded-lg transition-colors">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         <div className="p-5 border-b border-[#06B6D4]/20">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#06B6D4]/60" />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search products by name, SKU, or brand..."
//               className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40"
//               autoFocus
//             />
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-5">
//           {isLoading ? (
//             <div className="flex items-center justify-center py-12">
//               <Loader2 className="w-8 h-8 text-[#06B6D4] animate-spin" />
//             </div>
//           ) : products.length === 0 ? (
//             <div className="text-center py-12">
//               <Package className="w-12 h-12 text-[#06B6D4]/30 mx-auto mb-3" />
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
//                       ? 'border-[#06B6D4] bg-[#06B6D4]/5'
//                       : 'border-[#06B6D4]/20 hover:border-[#06B6D4] hover:bg-[#06B6D4]/5'
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
//                     <div className="mt-3 pt-3 border-t border-[#06B6D4]/20">
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
//                                 ? 'border-[#06B6D4] ring-2 ring-[#06B6D4]/30'
//                                 : 'border-gray-200 hover:border-gray-400'
//                             }`}
//                           >
//                             <img
//                               src={img.url}
//                               alt={`${product.productName} - ${idx + 1}`}
//                               className="w-full h-full object-cover"
//                             />
//                             {selectedImageIndex === idx && (
//                               <div className="absolute inset-0 bg-[#06B6D4]/10 flex items-center justify-center">
//                                 <CheckCircle className="w-5 h-5 text-[#06B6D4]" />
//                               </div>
//                             )}
//                           </button>
//                         ))}
//                       </div>
//                       <p className="text-xs text-[#06B6D4] mt-1">
//                         Selected: Image {selectedImageIndex + 1}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="p-5 border-t border-[#06B6D4]/20 flex gap-3 justify-end bg-[#06B6D4]/5">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSelectProduct}
//             disabled={!selectedProduct}
//             className="px-4 py-2 text-sm font-medium text-white bg-[#06B6D4] rounded-lg hover:bg-[#0891B2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
//           >
//             <CheckCircle className="w-4 h-4" />
//             Select Product
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Create Banner Component - HyperVolt Theme
// function CreateBannerContent() {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSavingDraft, setIsSavingDraft] = useState(false);
//   const [showProductSearch, setShowProductSearch] = useState(false);
//   const [showProductSearchForFeatured, setShowProductSearchForFeatured] = useState(false);
//   const [linkedProduct, setLinkedProduct] = useState(null);
//   const [selectedProductImage, setSelectedProductImage] = useState(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);
//   const [featuredProducts, setFeaturedProducts] = useState([]);

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     badge: '',
//     discount: '',
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
//           const hasData = draft.title || draft.description;
//           if (hasData) {
//             setFormData(draft);
//             if (draft.linkedProductId) {
//               fetchLinkedProduct(draft.linkedProductId);
//             }
//             if (draft.featuredProducts) {
//               setFeaturedProducts(draft.featuredProducts);
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
//       localStorage.setItem(BANNER_DRAFT_KEY, JSON.stringify({
//         ...formData,
//         featuredProducts
//       }));
//     } catch (error) {
//       console.error('Error saving draft:', error);
//     }
//   };

//   useEffect(() => {
//     if (isMounted) {
//       saveToLocalStorage();
//     }
//   }, [formData, featuredProducts, isMounted]);

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
//       description: cleanDescription.slice(0, 200),
//       badge: product.tags?.[0]?.name || 'New Arrival',
//       discount: product.discountPrice > 0 ? `${Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)}% OFF` : 'New',
//       linkedProductId: product._id,
//       productImageUrl: selectedImage.url
//     }));

//     setLinkedProduct(product);
//     setSelectedProductImage(selectedImage.url);
//     setUploadedImage(null);
//     toast.success(`Product "${product.productName}" loaded successfully`);
//   };

//   const handleFeaturedProductSelect = (product, imageIndex) => {
//     if (featuredProducts.length >= 3) {
//       toast.error('Maximum 3 featured products allowed');
//       return;
//     }
    
//     const selectedImage = product.images[imageIndex];
//     const existingIndex = featuredProducts.findIndex(p => p.productId === product._id);
    
//     if (existingIndex !== -1) {
//       toast.error('Product already added');
//       return;
//     }
    
//     setFeaturedProducts(prev => [...prev, {
//       productId: product._id,
//       product: product,
//       selectedImage: selectedImage?.url || product.images[0]?.url,
//       displayOrder: featuredProducts.length
//     }]);
    
//     toast.success(`Product "${product.productName}" added to featured products`);
//     setShowProductSearchForFeatured(false);
//   };

//   const removeFeaturedProduct = (index) => {
//     setFeaturedProducts(prev => prev.filter((_, i) => i !== index));
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
//       formDataUpload.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'power-bank');
      
//       const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      
//       const response = await fetch(uploadUrl, {
//         method: 'POST',
//         body: formDataUpload,
//       });

//       const data = await response.json();
//       if (data.secure_url) {
//         setFormData(prev => ({
//           ...prev,
//           productImage: data.secure_url,
//           productImageUrl: null,
//           linkedProductId: null
//         }));
//         setUploadedImage(data.secure_url);
//         setSelectedProductImage(null);
//         setLinkedProduct(null);
//         toast.success('Image uploaded successfully!');
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
//       formDataUpload.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'power-bank');

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
//     if (!formData.description?.trim()) newErrors.description = 'Description is required';
//     if (!formData.badge?.trim()) newErrors.badge = 'Badge is required';
//     if (!formData.discount?.trim()) newErrors.discount = 'Discount is required';
    
//     if (featuredProducts.length === 0) {
//       newErrors.featuredProducts = 'At least 1 featured product is required';
//     }

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       const firstError = Object.keys(errors)[0];
//       if (firstError) {
//         const element = document.querySelector(`[name="${firstError}"]`);
//         if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       const payload = {
//         title: formData.title,
//         description: formData.description,
//         badge: formData.badge,
//         discount: formData.discount,
//         bgImage: formData.bgImage,
//         productImage: formData.productImage || formData.productImageUrl,
//         linkedProductId: formData.linkedProductId,
//         features: formData.features.filter(f => f.text.trim()),
//         buttons: formData.buttons.filter(b => b.text.trim() && b.link.trim()),
//         featuredProducts: featuredProducts.map((p, index) => ({
//           productId: p.productId,
//           displayOrder: index
//         })),
//         category: 'Power Bank',
//         isActive: true,
//         showOnHomepage: true,
//         showOnMobile: true,
//         displayOrder: 0
//       };

//       const response = await fetch('http://localhost:5000/api/banners', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Banner created successfully!');
//         localStorage.removeItem(BANNER_DRAFT_KEY);
//         router.push('/authorize/banner-management');
//       } else {
//         toast.error(data.error || 'Failed to create banner');
//         console.error('Banner creation error:', data);
//       }
//     } catch (error) {
//       console.error('Error creating banner:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

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
//         description: '',
//         badge: '',
//         discount: '',
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
//       setFeaturedProducts([]);
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
//       <div className="min-h-screen bg-[#f0f7fa]">
//         <ProductSearchModal
//           isOpen={showProductSearch}
//           onClose={() => setShowProductSearch(false)}
//           onSelectProduct={handleProductSelect}
//           mode="single"
//         />

//         <ProductSearchModal
//           isOpen={showProductSearchForFeatured}
//           onClose={() => setShowProductSearchForFeatured(false)}
//           onSelectProduct={handleFeaturedProductSelect}
//           mode="featured"
//         />

//         {/* Header - HyperVolt Theme */}
//         <div className="bg-[#004767] border-b border-[#06B6D4]/20 shadow-lg sticky top-0 z-10">
//           <div className="px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <NextLink href="/authorize/banner-management" className="p-2 hover:bg-[#06B6D4]/20 rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5 text-white/80 hover:text-white" />
//                 </NextLink>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <Zap className="w-6 h-6 text-[#06B6D4]" />
//                     <h1 className="text-xl font-bold text-white">Create Banner</h1>
//                   </div>
//                   <p className="text-sm text-white/70 mt-1">Add a new banner to showcase on the homepage</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={handleClearDraft}
//                   className="px-4 py-2 text-sm border border-red-400/50 text-red-300 rounded-lg hover:bg-red-500/20 transition-colors"
//                 >
//                   Clear Draft
//                 </button>
//                 <button
//                   onClick={handleSaveDraft}
//                   disabled={isSavingDraft}
//                   className="px-4 py-2 text-sm bg-[#06B6D4] text-[#004767] rounded-lg hover:bg-[#0891B2] transition-colors flex items-center gap-2 disabled:opacity-50 font-semibold"
//                 >
//                   {isSavingDraft ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                   Save Draft
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-6">
//           <form onSubmit={handleSubmit}>
//             {/* Row 1: Basic Info - 2 Column Layout */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Left Column - Main Fields */}
//               <div className="lg:col-span-2 space-y-6">
//                 {/* Basic Information Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-[#06B6D4]/20">
//                   <div className="p-5 border-b border-[#06B6D4]/20 bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5">
//                     <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                       <Info className="w-5 h-5 text-[#06B6D4]" />
//                       Basic Information
//                     </h2>
//                   </div>
//                   <div className="p-5 space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
//                       <input
//                         type="text"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleChange}
//                         className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40 ${errors.title ? 'border-red-500' : 'border-[#06B6D4]/20'}`}
//                         placeholder="e.g., Premium Power Bank Collection"
//                       />
//                       {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
//                       <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         rows="3"
//                         className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40 resize-none ${errors.description ? 'border-red-500' : 'border-[#06B6D4]/20'}`}
//                         placeholder="Write a compelling description for the banner..."
//                       />
//                       {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Badge <span className="text-red-500">*</span></label>
//                         <input
//                           type="text"
//                           name="badge"
//                           value={formData.badge}
//                           onChange={handleChange}
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40 ${errors.badge ? 'border-red-500' : 'border-[#06B6D4]/20'}`}
//                           placeholder="e.g., Limited Edition, Best Seller"
//                         />
//                         {errors.badge && <p className="text-xs text-red-600 mt-1">{errors.badge}</p>}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Discount <span className="text-red-500">*</span></label>
//                         <input
//                           type="text"
//                           name="discount"
//                           value={formData.discount}
//                           onChange={handleChange}
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40 ${errors.discount ? 'border-red-500' : 'border-[#06B6D4]/20'}`}
//                           placeholder="e.g., 40% OFF, New Arrival"
//                         />
//                         {errors.discount && <p className="text-xs text-red-600 mt-1">{errors.discount}</p>}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Features Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-[#06B6D4]/20">
//                   <div className="p-5 border-b border-[#06B6D4]/20 bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5">
//                     <div className="flex items-center justify-between">
//                       <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                         <Star className="w-5 h-5 text-[#06B6D4]" />
//                         Features <span className="text-sm font-normal text-gray-400">(Max 3)</span>
//                       </h2>
//                       <span className="text-xs text-gray-500">{formData.features.length}/3</span>
//                     </div>
//                   </div>
//                   <div className="p-5">
//                     <div className="space-y-4">
//                       {formData.features.map((feature, index) => (
//                         <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-[#06B6D4]/20">
//                           <div className="flex items-center gap-2">
//                             <select
//                               value={feature.icon}
//                               onChange={(e) => updateFeature(index, 'icon', e.target.value)}
//                               className="px-2 py-1.5 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white"
//                             >
//                               {FEATURE_ICONS.map(icon => (
//                                 <option key={icon.value} value={icon.value}>
//                                   {icon.label}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                           <input
//                             type="text"
//                             value={feature.text}
//                             onChange={(e) => updateFeature(index, 'text', e.target.value)}
//                             placeholder="Feature text..."
//                             className={`flex-1 px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40 ${errors[`feature_${index}`] ? 'border-red-500' : 'border-[#06B6D4]/20'}`}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeFeature(index)}
//                             className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))}
//                       {formData.features.length < 3 && (
//                         <button
//                           type="button"
//                           onClick={addFeature}
//                           className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#06B6D4] border-2 border-dashed border-[#06B6D4]/40 rounded-lg hover:bg-[#06B6D4]/5 transition-colors"
//                         >
//                           <Plus className="w-4 h-4" />
//                           Add Feature
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Buttons Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-[#06B6D4]/20">
//                   <div className="p-5 border-b border-[#06B6D4]/20 bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5">
//                     <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                       <LinkIcon className="w-5 h-5 text-[#06B6D4]" />
//                       Buttons <span className="text-sm font-normal text-gray-400">(Max 2)</span>
//                     </h2>
//                   </div>
//                   <div className="p-5 space-y-4">
//                     {formData.buttons.map((button, index) => (
//                       <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-gray-50 rounded-lg border border-[#06B6D4]/20">
//                         <div className="flex-1 w-full">
//                           <input
//                             type="text"
//                             value={button.text}
//                             onChange={(e) => updateButton(index, 'text', e.target.value)}
//                             placeholder="Button text..."
//                             className={`w-full px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40 ${errors[`button_${index}_text`] ? 'border-red-500' : 'border-[#06B6D4]/20'}`}
//                           />
//                         </div>
//                         <div className="flex-1 w-full">
//                           <input
//                             type="text"
//                             value={button.link}
//                             onChange={(e) => updateButton(index, 'link', e.target.value)}
//                             placeholder="Button link..."
//                             className={`w-full px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40 ${errors[`button_${index}_link`] ? 'border-red-500' : 'border-[#06B6D4]/20'}`}
//                           />
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <label className="flex items-center gap-1 text-xs text-gray-600">
//                             <input
//                               type="radio"
//                               checked={button.isPrimary}
//                               onChange={() => {
//                                 const updatedButtons = formData.buttons.map((b, i) => ({
//                                   ...b,
//                                   isPrimary: i === index
//                                 }));
//                                 setFormData(prev => ({ ...prev, buttons: updatedButtons }));
//                               }}
//                               className="w-3.5 h-3.5"
//                             />
//                             Primary
//                           </label>
//                           <button
//                             type="button"
//                             onClick={() => {
//                               if (formData.buttons.length <= 1) {
//                                 toast.error('At least one button is required');
//                                 return;
//                               }
//                               const updatedButtons = formData.buttons.filter((_, i) => i !== index);
//                               setFormData(prev => ({ ...prev, buttons: updatedButtons }));
//                             }}
//                             className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="space-y-6">
//                 {/* Featured Products Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-[#06B6D4]/20">
//                   <div className="p-5 border-b border-[#06B6D4]/20 bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5">
//                     <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                       <Package className="w-5 h-5 text-[#06B6D4]" />
//                       Featured Products <span className="text-red-500">*</span>
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Add up to 3 products to feature on the banner</p>
//                   </div>
//                   <div className="p-5 space-y-3">
//                     {errors.featuredProducts && (
//                       <p className="text-xs text-red-600">{errors.featuredProducts}</p>
//                     )}
                    
//                     {featuredProducts.map((item, index) => (
//                       <div key={index} className="flex items-center gap-3 p-3 bg-[#06B6D4]/5 rounded-lg border border-[#06B6D4]/20">
//                         <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
//                           <img
//                             src={item.selectedImage}
//                             alt={item.product.productName}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-medium text-gray-900 truncate">{item.product.productName}</h4>
//                           <p className="text-xs text-gray-500">SKU: {item.product.skuCode}</p>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeFeaturedProduct(index)}
//                           className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
                    
//                     {featuredProducts.length < 3 && (
//                       <button
//                         type="button"
//                         onClick={() => setShowProductSearchForFeatured(true)}
//                         className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#06B6D4] border-2 border-dashed border-[#06B6D4]/40 rounded-lg hover:bg-[#06B6D4]/5 transition-colors"
//                       >
//                         <Plus className="w-4 h-4" />
//                         Add Product ({featuredProducts.length}/3)
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Product Image Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-[#06B6D4]/20">
//                   <div className="p-5 border-b border-[#06B6D4]/20 bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5">
//                     <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                       <ImageIcon className="w-5 h-5 text-[#06B6D4]" />
//                       Product Image 
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Upload manually or link a product</p>
//                   </div>
//                   <div className="p-5 space-y-4">
//                     {/* Manual Upload */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
//                       <div className="relative rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-[#06B6D4]/30 hover:border-[#06B6D4] transition-colors">
//                         {getCurrentProductImage() ? (
//                           <div className="relative">
//                             <img
//                               src={getCurrentProductImage()}
//                               alt="Product"
//                               className="w-full h-40 object-contain"
//                             />
//                             <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                               <button
//                                 type="button"
//                                 onClick={() => document.getElementById('product-image-upload').click()}
//                                 className="px-3 py-1.5 bg-white/90 text-gray-700 text-sm rounded-lg hover:bg-white transition-colors flex items-center gap-2"
//                               >
//                                 <Upload className="w-4 h-4" />
//                                 Change Image
//                               </button>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 setFormData(prev => ({ ...prev, productImage: null, productImageUrl: null }));
//                                 setSelectedProductImage(null);
//                                 setUploadedImage(null);
//                                 if (linkedProduct) {
//                                   removeProductLink();
//                                 }
//                               }}
//                               className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                             >
//                               <X className="w-4 h-4" />
//                             </button>
//                           </div>
//                         ) : (
//                           <button
//                             type="button"
//                             onClick={() => document.getElementById('product-image-upload').click()}
//                             className="w-full h-40 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-[#06B6D4] transition-colors"
//                           >
//                             <Upload className="w-8 h-8 text-[#06B6D4]/60" />
//                             <span className="text-sm">Click to upload product image</span>
//                             <span className="text-xs">JPG, PNG, WebP (max 5MB)</span>
//                           </button>
//                         )}
//                         <input
//                           id="product-image-upload"
//                           type="file"
//                           accept="image/jpeg,image/jpg,image/png,image/webp"
//                           onChange={handleProductImageUpload}
//                           className="hidden"
//                         />
//                       </div>
//                       {isUploading && (
//                         <div className="flex items-center justify-center gap-2 mt-2">
//                           <Loader2 className="w-4 h-4 text-[#06B6D4] animate-spin" />
//                           <span className="text-sm text-gray-500">Uploading...</span>
//                         </div>
//                       )}
//                     </div>

//                     {/* OR Divider */}
//                     <div className="relative">
//                       <div className="absolute inset-0 flex items-center">
//                         <div className="w-full border-t border-gray-300"></div>
//                       </div>
//                       <div className="relative flex justify-center text-xs">
//                         <span className="px-2 bg-white text-gray-500">OR</span>
//                       </div>
//                     </div>

//                     {/* Link Product */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Select from Product</label>
//                       {linkedProduct ? (
//                         <div className="flex items-center gap-3 p-3 bg-[#06B6D4]/5 rounded-lg border border-[#06B6D4]/20">
//                           <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
//                             {selectedProductImage ? (
//                               <img
//                                 src={selectedProductImage}
//                                 alt={linkedProduct.productName}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : linkedProduct.images && linkedProduct.images.length > 0 ? (
//                               <img
//                                 src={linkedProduct.images[0].url}
//                                 alt={linkedProduct.productName}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <div className="w-full h-full flex items-center justify-center">
//                                 <ImageIcon className="w-5 h-5 text-gray-400" />
//                               </div>
//                             )}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <h4 className="font-medium text-gray-900 truncate">{linkedProduct.productName}</h4>
//                             <p className="text-xs text-gray-500">SKU: {linkedProduct.skuCode}</p>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={removeProductLink}
//                             className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           >
//                             <Unlink className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ) : (
//                         <button
//                           type="button"
//                           onClick={() => setShowProductSearch(true)}
//                           className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#06B6D4] border-2 border-dashed border-[#06B6D4]/40 rounded-lg hover:bg-[#06B6D4]/5 transition-colors"
//                         >
//                           <Search className="w-4 h-4" />
//                           Search & Select Product
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Background Image Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-[#06B6D4]/20">
//                   <div className="p-5 border-b border-[#06B6D4]/20 bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5">
//                     <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                       <ImageIcon className="w-5 h-5 text-[#06B6D4]" />
//                       Background Image
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Upload a custom background image</p>
//                   </div>
//                   <div className="p-5">
//                     <div className="relative rounded-lg overflow-hidden bg-gray-100 border-2 border-[#06B6D4]/20">
//                       <img
//                         src={formData.bgImage}
//                         alt="Banner background"
//                         className="w-full h-32 object-cover"
//                       />
//                       <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                         <button
//                           type="button"
//                           onClick={() => document.getElementById('bg-image-upload').click()}
//                           className="px-3 py-1.5 bg-white/90 text-gray-700 text-sm rounded-lg hover:bg-white transition-colors flex items-center gap-2"
//                         >
//                           <Upload className="w-4 h-4" />
//                           Change Image
//                         </button>
//                       </div>
//                     </div>
//                     <input
//                       id="bg-image-upload"
//                       type="file"
//                       accept="image/jpeg,image/jpg,image/png,image/webp"
//                       onChange={handleBgImageUpload}
//                       className="hidden"
//                     />
//                     <p className="text-xs text-gray-400 mt-2 text-center">Recommended: 1920x600px, max 5MB</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Full Width Preview Section */}
//             <div className="mt-8">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <Eye className="w-5 h-5 text-[#06B6D4]" />
//                   Banner Preview
//                 </h2>
//                 <span className="text-xs text-gray-500">This is exactly how the banner will appear on the homepage</span>
//               </div>
              
//               <div className="bg-white rounded-xl shadow-sm border border-[#06B6D4]/20 overflow-hidden">
//                 <div 
//                   className="relative w-full bg-cover bg-center bg-no-repeat"
//                   style={{ 
//                     backgroundImage: `url(${formData.bgImage})`,
//                     minHeight: '500px',
//                     height: 'auto',
//                     aspectRatio: '16/6'
//                   }}
//                 >
//                   {/* Gradient Overlay - HyperVolt Theme */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-[#004767]/70 via-[#004767]/40 to-transparent" />
                  
//                   {/* Decorative Elements */}
//                   <div className="absolute top-0 right-0 w-1/3 h-full bg-[#06B6D4]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//                   <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#06B6D4]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                  
//                   {/* Floating Sparkle Decorations */}
//                   <div className="absolute top-8 right-12 opacity-30">
//                     <Sparkles className="w-6 h-6 text-[#06B6D4]" />
//                   </div>
//                   <div className="absolute bottom-20 left-10 opacity-20">
//                     <Sparkles className="w-4 h-4 text-[#06B6D4]" />
//                   </div>
//                   <div className="absolute top-1/3 right-1/4 opacity-15">
//                     <Zap className="w-8 h-8 text-[#06B6D4]" />
//                   </div>
                  
//                   {/* Content */}
//                   <div className="relative h-full flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8">
//                     <div className="container mx-auto">
//                       <div className="flex items-center gap-8">
//                         {/* Left Content */}
//                         <div className="flex-1 max-w-2xl">
//                           {/* Badge */}
//                           {formData.badge && (
//                             <div className="mb-2 sm:mb-3">
//                               <span className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#06B6D4] bg-[#004767]/90 backdrop-blur-md rounded-full border border-[#06B6D4]/30 shadow-sm">
//                                 ⚡ {formData.badge}
//                               </span>
//                             </div>
//                           )}
                          
//                           {/* Title */}
//                           {formData.title && (
//                             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-3 leading-tight">
//                               {formData.title}
//                             </h1>
//                           )}
                          
//                           {/* Description */}
//                           {formData.description && (
//                             <p className="text-sm sm:text-base md:text-lg text-white/80 mb-4 sm:mb-5 line-clamp-2 max-w-xl">
//                               {formData.description}
//                             </p>
//                           )}
                          
//                           {/* Features */}
//                           {formData.features.length > 0 && (
//                             <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-5">
//                               {formData.features.map((feature, idx) => {
//                                 const IconComponent = FEATURE_ICONS.find(f => f.value === feature.icon)?.icon;
//                                 return (
//                                   <div key={idx} className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#004767]/80 backdrop-blur-md rounded-full border border-[#06B6D4]/20 shadow-sm">
//                                     {IconComponent && <span className="w-4 h-4 sm:w-5 sm:h-5 text-[#06B6D4]">{IconComponent}</span>}
//                                     <span className="text-white text-xs sm:text-sm font-medium">
//                                       {feature.text}
//                                     </span>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           )}
                          
//                           {/* Buttons */}
//                           {formData.buttons.length > 0 && (
//                             <div className="flex flex-wrap gap-3 sm:gap-4">
//                               {formData.buttons.map((button, idx) => (
//                                 button.text && button.link && (
//                                   <button
//                                     key={idx}
//                                     className={`px-6 sm:px-8 py-2 sm:py-2.5 text-sm sm:text-base rounded-full font-semibold transition-all ${
//                                       button.isPrimary
//                                         ? 'bg-[#06B6D4] text-[#004767] hover:bg-[#0891B2] shadow-lg hover:shadow-xl hover:scale-105'
//                                         : 'bg-[#004767]/80 backdrop-blur-md border border-[#06B6D4]/30 text-white hover:bg-[#004767] hover:shadow-lg hover:scale-105'
//                                     }`}
//                                   >
//                                     {button.text}
//                                   </button>
//                                 )
//                               ))}
//                             </div>
//                           )}
//                         </div>
                        
//                         {/* Right Side - Product Image */}
//                         {getCurrentProductImage() && (
//                           <div className="hidden md:block flex-shrink-0">
//                             <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[420px]">
//                               <div className="relative rounded-[50%] overflow-hidden shadow-2xl border-4 border-[#06B6D4]/30"
//                                    style={{
//                                      width: '100%',
//                                      aspectRatio: '3/4',
//                                      background: 'linear-gradient(135deg, #004767 0%, #06B6D4 100%)',
//                                      boxShadow: '0 25px 50px -12px rgba(6, 182, 212, 0.25)'
//                                    }}>
//                                 <img
//                                   src={getCurrentProductImage()}
//                                   alt="Product"
//                                   className="w-full h-full object-contain p-4"
//                                   style={{ 
//                                     objectPosition: 'center',
//                                     filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
//                                   }}
//                                 />
//                                 <div className="absolute inset-0 rounded-[50%] bg-gradient-to-t from-[#06B6D4]/10 via-transparent to-transparent pointer-events-none" />
//                                 <div className="absolute inset-2 rounded-[50%] border-2 border-[#06B6D4]/20 pointer-events-none" />
//                               </div>
//                               <div className="absolute -inset-4 rounded-[50%] bg-[#06B6D4]/10 blur-3xl -z-10" />
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Discount Badge */}
//                   {formData.discount && (
//                     <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8">
//                       <div className="relative group">
//                         <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#004767] flex items-center justify-center shadow-2xl border-4 border-[#06B6D4]/30 hover:scale-110 transition-transform duration-300">
//                           <div className="text-center">
//                             <div className="text-white font-black text-xs sm:text-sm md:text-base lg:text-xl leading-tight">
//                               {formData.discount}
//                             </div>
//                             <div className="text-[#06B6D4]/80 text-[6px] sm:text-[8px] md:text-[10px] font-medium">OFF</div>
//                           </div>
//                         </div>
//                         <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#004767] blur-md opacity-50 -z-10 group-hover:opacity-70 transition-opacity" />
//                         <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#06B6D4] rounded-full animate-ping" />
//                       </div>
//                     </div>
//                   )}

//                   {/* Featured Products at Bottom */}
//                   {featuredProducts.length > 0 && (
//                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-4xl">
//                       <div className="flex gap-2">
//                         {featuredProducts.map((item, index) => (
//                           <div key={index} className="flex-1 bg-[#004767]/80 backdrop-blur-sm rounded-xl border border-[#06B6D4]/20 hover:border-[#06B6D4]/50 transition-all overflow-hidden shadow-sm hover:shadow-md">
//                             <div className="flex items-center gap-2 p-2.5">
//                               <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#06B6D4]/10 border border-[#06B6D4]/10">
//                                 <img
//                                   src={item.selectedImage}
//                                   alt={item.product.productName}
//                                   className="w-full h-full object-cover"
//                                 />
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <p className="text-xs font-medium text-white truncate">
//                                   {item.product.productName}
//                                 </p>
//                                 {item.product.discountPrice > 0 ? (
//                                   <div className="flex items-center gap-1.5">
//                                     <span className="text-xs font-bold text-[#06B6D4]">৳{item.product.discountPrice}</span>
//                                     <span className="text-[9px] text-white/40 line-through">৳{item.product.regularPrice}</span>
//                                   </div>
//                                 ) : (
//                                   <span className="text-xs font-bold text-white">৳{item.product.regularPrice}</span>
//                                 )}
//                               </div>
//                               <button
//                                 onClick={() => window.open(`/productDetails?id=${item.productId}`, '_blank')}
//                                 className="flex-shrink-0 px-3 py-1.5 text-[10px] font-semibold text-[#004767] bg-[#06B6D4] rounded-lg hover:bg-[#0891B2] transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
//                               >
//                                 Shop Now
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button - HyperVolt Theme */}
//             <div className="mt-8 flex justify-end">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
//               >
//                 {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                 {isSubmitting ? 'Creating Banner...' : 'Create Banner'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

// // Main export with Suspense wrapper
// export default function CreateBannerPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-[#06B6D4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500 text-sm">Loading banner creator...</p>
//         </div>
//       </div>
//     }>
//       <CreateBannerContent />
//     </Suspense>
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
  Package,
  Tag,
  Info,
  Star,
  Search,
  ChevronDown,
  Truck,
  Shield,
  Headphones,
  Clock,
  TrendingUp,
  GripVertical,
  CheckCircle,
  Edit,
  Link as LinkIcon,
  Unlink,
  Eye,
  Maximize2,
  Wand2
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// Feature icon options
const FEATURE_ICONS = [
  { value: 'Truck', label: 'Truck', icon: <Truck className="w-4 h-4" /> },
  { value: 'Shield', label: 'Shield', icon: <Shield className="w-4 h-4" /> },
  { value: 'Clock', label: 'Clock', icon: <Clock className="w-4 h-4" /> },
  { value: 'Star', label: 'Star', icon: <Star className="w-4 h-4" /> },
  { value: 'TrendingUp', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
  { value: 'Headphones', label: 'Headphones', icon: <Headphones className="w-4 h-4" /> }
];

// Default banner background image
const DEFAULT_BG_IMAGE = '/images/banner-bg.png';

// Banner draft key for localStorage
const BANNER_DRAFT_KEY = 'smart_gadget_banner_draft';

// Product Search Modal Component
const ProductSearchModal = ({ isOpen, onClose, onSelectProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const searchTimeoutRef = useRef(null);

  // const searchProducts = async (query) => {
  //   if (!query.trim()) {
  //     setProducts([]);
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await fetch(
  //       `http://localhost:5000/api/products/authorize/all?search=${encodeURIComponent(query)}&limit=10`,
  //       {
  //         headers: { 'Authorization': `Bearer ${token}` }
  //       }
  //     );
  //     const data = await response.json();
  //     if (data.success) {
  //       setProducts(data.data);
  //     } else {
  //       toast.error(data.error || 'Failed to search products');
  //     }
  //   } catch (error) {
  //     toast.error('Failed to search products');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // In ProductSearchModal component, update the searchProducts function:

const searchProducts = async (query) => {
  if (!query.trim()) {
    setProducts([]);
    return;
  }

  setIsLoading(true);
  try {
    const token = localStorage.getItem('token');
    // Change this URL to match your actual product route
    // Option 1: If you have a general products endpoint with search
    const response = await fetch(
      `http://localhost:5000/api/products?search=${encodeURIComponent(query)}&limit=10`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    
    // OR Option 2: If you have an admin products endpoint
    // const response = await fetch(
    //   `http://localhost:5000/api/products/admin?search=${encodeURIComponent(query)}&limit=10`,
    //   {
    //     headers: { 'Authorization': `Bearer ${token}` }
    //   }
    // );
    
    const data = await response.json();
    if (data.success) {
      setProducts(data.data);
    } else {
      toast.error(data.error || 'Failed to search products');
    }
  } catch (error) {
    console.error('Search error:', error);
    toast.error('Failed to search products');
  } finally {
    setIsLoading(false);
  }
};
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      searchProducts(searchTerm);
    }, 500);
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchTerm]);

  const handleSelectProduct = () => {
    if (selectedProduct) {
      onSelectProduct(selectedProduct, selectedImageIndex);
      onClose();
    }
  };

  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Select Product for Banner
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-5 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by name, SKU, or brand..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              autoFocus
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                {searchTerm ? 'No products found matching your search' : 'Search for a product to add to banner'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product._id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedProduct?._id === product._id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedProduct(product);
                    setSelectedImageIndex(0);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].url}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{product.productName}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>SKU: {product.skuCode}</span>
                        <span>•</span>
                        <span>Brand: {product.brand}</span>
                        <span>•</span>
                        <span>৳{product.regularPrice}</span>
                        {product.discountPrice > 0 && (
                          <span className="text-green-600">-{product.discountPrice}%</span>
                        )}
                      </div>
                    </div>
                    {product.images && product.images.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <ImageIcon className="w-3 h-3" />
                        <span>{product.images.length}</span>
                      </div>
                    )}
                  </div>

                  {selectedProduct?._id === product._id && product.images && product.images.length > 1 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Select image to use in banner:</p>
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {product.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImageIndex(idx);
                            }}
                            className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                              selectedImageIndex === idx
                                ? 'border-blue-600 ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <img
                              src={img.url}
                              alt={`${product.productName} - ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {selectedImageIndex === idx && (
                              <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-blue-600 mt-1">
                        Selected: Image {selectedImageIndex + 1}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-5 border-t border-gray-200 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSelectProduct}
            disabled={!selectedProduct}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Select Product
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Create Banner Component
export default function CreateBannerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [linkedProduct, setLinkedProduct] = useState(null);
  const [selectedProductImage, setSelectedProductImage] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [removeBackground, setRemoveBackground] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    badge: '',
    discount: '',
    category: '',
    bgImage: DEFAULT_BG_IMAGE,
    productImage: null,
    features: [],
    buttons: [
      { text: 'Shop Now', link: '/products', isPrimary: true },
      { text: 'Learn More', link: '/about', isPrimary: false }
    ],
    linkedProductId: null,
    productImageUrl: null
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsMounted(true);
    const loadDraft = () => {
      try {
        const savedDraft = localStorage.getItem(BANNER_DRAFT_KEY);
        if (savedDraft) {
          const draft = JSON.parse(savedDraft);
          const hasData = draft.title || draft.mainText || draft.description;
          if (hasData) {
            setFormData(draft);
            if (draft.linkedProductId) {
              fetchLinkedProduct(draft.linkedProductId);
            }
          }
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    };
    loadDraft();
  }, []);

  const fetchLinkedProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setLinkedProduct(data.data);
      }
    } catch (error) {
      console.error('Error fetching linked product:', error);
    }
  };

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem(BANNER_DRAFT_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  useEffect(() => {
    if (isMounted) {
      saveToLocalStorage();
    }
  }, [formData, isMounted]);

  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const addFeature = () => {
    if (formData.features.length >= 3) {
      toast.error('Maximum 3 features allowed');
      return;
    }
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { icon: 'Truck', text: '' }]
    }));
  };

  const updateFeature = (index, field, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };

  const removeFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };

  const updateButton = (index, field, value) => {
    const updatedButtons = [...formData.buttons];
    updatedButtons[index] = { ...updatedButtons[index], [field]: value };
    setFormData(prev => ({ ...prev, buttons: updatedButtons }));
  };

  const handleProductSelect = (product, imageIndex) => {
    const selectedImage = product.images[imageIndex];
    const cleanDescription = stripHtml(product.shortDescription || product.fullDescription || '');
    
    setFormData(prev => ({
      ...prev,
      title: product.productName,
      subtitle: product.categoryName || product.category?.name || '',
      description: cleanDescription.slice(0, 200),
      badge: product.tags?.[0] || 'New Arrival',
      discount: product.discountPrice > 0 ? `${Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)}% OFF` : 'New',
      category: product.categoryName || product.category?.name || '',
      linkedProductId: product._id,
      productImageUrl: selectedImage.url,
      productImage: null
    }));

    setLinkedProduct(product);
    setSelectedProductImage(selectedImage.url);
    setUploadedImage(null);
    toast.success(`Product "${product.productName}" loaded successfully`);
  };

  const removeProductLink = () => {
    setFormData(prev => ({
      ...prev,
      linkedProductId: null,
      productImageUrl: null
    }));
    setLinkedProduct(null);
    setSelectedProductImage(null);
    toast.info('Product unlinked from banner');
  };

  const handleProductImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid format. Allowed: JPG, PNG, WebP');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Max: 5MB');
      return;
    }

    try {
      setIsUploading(true);
      
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
      
      const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();
      if (data.secure_url) {
        let finalUrl = data.secure_url;
        
        // Apply background removal if toggled
        if (removeBackground) {
          // Remove background and convert to PNG with transparency
          finalUrl = data.secure_url.replace(
            '/upload/',
            `/upload/e_background_removal,f_png/`
          );
        }
        
        setFormData(prev => ({
          ...prev,
          productImage: finalUrl,
          productImageUrl: null,
          linkedProductId: null
        }));
        setUploadedImage(finalUrl);
        setSelectedProductImage(null);
        setLinkedProduct(null);
        toast.success(removeBackground ? 'Image uploaded with transparent background!' : 'Image uploaded successfully!');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleBgImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid format. Allowed: JPG, PNG, WebP');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Max: 5MB');
      return;
    }

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formDataUpload,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setFormData(prev => ({ ...prev, bgImage: data.secure_url }));
        toast.success('Background image uploaded successfully');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.subtitle?.trim()) newErrors.subtitle = 'Subtitle is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.badge?.trim()) newErrors.badge = 'Badge is required';
    if (!formData.discount?.trim()) newErrors.discount = 'Discount is required';
    if (!formData.category?.trim()) newErrors.category = 'Category is required';
    
    // if (!formData.productImageUrl && !formData.productImage) {
    //   newErrors.productImage = 'Product image is required (either from linked product or manual upload)';
    // }

    formData.features.forEach((feature, index) => {
      if (!feature.text?.trim()) {
        newErrors[`feature_${index}`] = 'Feature text is required';
      }
    });

    formData.buttons.forEach((button, index) => {
      if (!button.text?.trim()) {
        newErrors[`button_${index}_text`] = 'Button text is required';
      }
      if (!button.link?.trim()) {
        newErrors[`button_${index}_link`] = 'Button link is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       const firstError = Object.keys(errors)[0];
//       if (firstError) {
//         const element = document.querySelector(`[name="${firstError}"]`);
//         if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const finalProductImage = formData.productImageUrl || formData.productImage;
      
//       const payload = {
//         ...formData,
//         productImage: finalProductImage,
//         features: formData.features.filter(f => f.text.trim()),
//         buttons: formData.buttons.filter(b => b.text.trim() && b.link.trim())
//       };

//       const response = await fetch('http://localhost:5000/api/banners', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Banner created successfully!');
//         localStorage.removeItem(BANNER_DRAFT_KEY);
//         router.push('/authorize/banner-management');
//       } else {
//         toast.error(data.error || 'Failed to create banner');
//       }
//     } catch (error) {
//       console.error('Error creating banner:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


// In CreateBannerPage component, update handleSubmit function:

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
    
    // Format the data for the API
    const payload = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      badge: formData.badge,
      discount: formData.discount,
      category: formData.category,
      bgImage: formData.bgImage, // Can be string or object
      productImage: formData.productImage || formData.productImageUrl,
      productImageUrl: formData.productImageUrl,
      linkedProductId: formData.linkedProductId,
      features: formData.features.filter(f => f.text.trim()),
      buttons: formData.buttons.filter(b => b.text.trim() && b.link.trim()),
      isActive: true,
      showOnHomepage: true,
      showOnMobile: true,
      displayOrder: 0
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
      // Log the error for debugging
      console.error('Banner creation error:', data);
    }
  } catch (error) {
    console.error('Error creating banner:', error);
    toast.error('Network error. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  const handleSaveDraft = () => {
    setIsSavingDraft(true);
    saveToLocalStorage();
    setTimeout(() => {
      setIsSavingDraft(false);
      toast.success('Draft saved successfully!');
    }, 500);
  };

  const handleClearDraft = () => {
    if (confirm('Are you sure you want to clear the draft? All unsaved data will be lost.')) {
      localStorage.removeItem(BANNER_DRAFT_KEY);
      setFormData({
        title: '',
        subtitle: '',
        mainText: '',
        description: '',
        badge: '',
        discount: '',
        category: '',
        bgImage: DEFAULT_BG_IMAGE,
        productImage: null,
        features: [],
        buttons: [
          { text: 'Shop Now', link: '/products', isPrimary: true },
          { text: 'Learn More', link: '/about', isPrimary: false }
        ],
        linkedProductId: null,
        productImageUrl: null
      });
      setLinkedProduct(null);
      setSelectedProductImage(null);
      setUploadedImage(null);
      toast.success('Draft cleared');
    }
  };

  const getCurrentProductImage = () => {
    if (formData.productImage) return formData.productImage;
    if (formData.productImageUrl) return formData.productImageUrl;
    return null;
  };

  return (
    <ProtectedRoute pageKey="create_banner">
    <div className="min-h-screen bg-gray-50">
      <ProductSearchModal
        isOpen={showProductSearch}
        onClose={() => setShowProductSearch(false)}
        onSelectProduct={handleProductSelect}
      />

      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <NextLink href="/authorize/banner-management" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </NextLink>
              <div>
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-blue-600" />
                  <h1 className="text-xl font-bold text-gray-900">Create New Banner</h1>
                </div>
                <p className="text-sm text-gray-500 mt-1">Add a new banner to showcase on the homepage</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleClearDraft}
                className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Clear Draft
              </button>
              <button
                onClick={handleSaveDraft}
                disabled={isSavingDraft}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSavingDraft ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    Basic Information
                  </h2>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="e.g., Premium Gadgets"
                    />
                    {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.subtitle ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="e.g., Latest Technology"
                    />
                    {errors.subtitle && <p className="text-xs text-red-600 mt-1">{errors.subtitle}</p>}
                  </div>

             

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Write a compelling description for the banner..."
                    />
                    {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Badge <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="badge"
                        value={formData.badge}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.badge ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., Limited Edition, Best Seller"
                      />
                      {errors.badge && <p className="text-xs text-red-600 mt-1">{errors.badge}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Discount <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.discount ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., 40% OFF, New Arrival"
                      />
                      {errors.discount && <p className="text-xs text-red-600 mt-1">{errors.discount}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="e.g., Electronics, Wearables, Audio"
                    />
                    {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
                  </div>
                </div>
              </div>

              {/* Features Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Star className="w-5 h-5 text-blue-600" />
                      Features <span className="text-sm font-normal text-gray-400">(Max 3)</span>
                    </h2>
                    <span className="text-xs text-gray-500">{formData.features.length}/3</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2">
                          <select
                            value={feature.icon}
                            onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                            className="px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white"
                          >
                            {FEATURE_ICONS.map(icon => (
                              <option key={icon.value} value={icon.value}>
                                {icon.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="text"
                          value={feature.text}
                          onChange={(e) => updateFeature(index, 'text', e.target.value)}
                          placeholder="Feature text..."
                          className={`flex-1 px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors[`feature_${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {formData.features.length < 3 && (
                      <button
                        type="button"
                        onClick={addFeature}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Feature
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-blue-600" />
                    Buttons <span className="text-sm font-normal text-gray-400">(Max 2)</span>
                  </h2>
                </div>
                <div className="p-5 space-y-4">
                  {formData.buttons.map((button, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1 w-full">
                        <input
                          type="text"
                          value={button.text}
                          onChange={(e) => updateButton(index, 'text', e.target.value)}
                          placeholder="Button text..."
                          className={`w-full px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors[`button_${index}_text`] ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      </div>
                      <div className="flex-1 w-full">
                        <input
                          type="text"
                          value={button.link}
                          onChange={(e) => updateButton(index, 'link', e.target.value)}
                          placeholder="Button link..."
                          className={`w-full px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors[`button_${index}_link`] ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1 text-xs text-gray-600">
                          <input
                            type="radio"
                            checked={button.isPrimary}
                            onChange={() => {
                              const updatedButtons = formData.buttons.map((b, i) => ({
                                ...b,
                                isPrimary: i === index
                              }));
                              setFormData(prev => ({ ...prev, buttons: updatedButtons }));
                            }}
                            className="w-3.5 h-3.5"
                          />
                          Primary
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            if (formData.buttons.length <= 1) {
                              toast.error('At least one button is required');
                              return;
                            }
                            const updatedButtons = formData.buttons.filter((_, i) => i !== index);
                            setFormData(prev => ({ ...prev, buttons: updatedButtons }));
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Product Image Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                    Product Image 
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Upload manually or link a product</p>
                </div>
                <div className="p-5 space-y-4">
                  {/* Background Removal Toggle */}
                  {/* <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={removeBackground}
                          onChange={(e) => setRemoveBackground(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                        />
                        <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                          <Wand2 className="w-4 h-4 text-blue-600" />
                          Auto-remove background
                        </span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">AI will remove background and convert to PNG with transparency</p>
                    </div>
                    {removeBackground && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    )}
                  </div> */}

                  {/* Manual Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                    <div className="relative rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
                      {getCurrentProductImage() ? (
                        <div className="relative">
                          <img
                            src={getCurrentProductImage()}
                            alt="Product"
                            className="w-full h-40 object-contain"
                            style={removeBackground ? { background: 'transparent' } : { background: '#f9fafb' }}
                          />
                          {removeBackground && (
                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-blue-500/80 text-white text-[10px] rounded-full flex items-center gap-1">
                              <Wand2 className="w-2.5 h-2.5" />
                              PNG (Transparent)
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => document.getElementById('product-image-upload').click()}
                              className="px-3 py-1.5 bg-white/90 text-gray-700 text-sm rounded-lg hover:bg-white transition-colors flex items-center gap-2"
                            >
                              <Upload className="w-4 h-4" />
                              Change Image
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, productImage: null, productImageUrl: null }));
                              setSelectedProductImage(null);
                              setUploadedImage(null);
                              if (linkedProduct) {
                                removeProductLink();
                              }
                            }}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => document.getElementById('product-image-upload').click()}
                          className="w-full h-40 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Upload className="w-8 h-8" />
                          <span className="text-sm">Click to upload product image</span>
                          <span className="text-xs">JPG, PNG, WebP (max 5MB)</span>
                          {removeBackground && (
                            <span className="text-xs text-blue-500 flex items-center gap-1">
                              <Wand2 className="w-3 h-3" />
                              Background will be removed automatically
                            </span>
                          )}
                        </button>
                      )}
                      <input
                        id="product-image-upload"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleProductImageUpload}
                        className="hidden"
                      />
                    </div>
                    {errors.productImage && <p className="text-xs text-red-600 mt-1">{errors.productImage}</p>}
                    {isUploading && (
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                        <span className="text-sm text-gray-500">
                          {removeBackground ? 'Uploading and removing background...' : 'Uploading...'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* OR Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                  </div>

                  {/* Link Product */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select from Product</label>
                    {linkedProduct ? (
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          {selectedProductImage ? (
                            <img
                              src={selectedProductImage}
                              alt={linkedProduct.productName}
                              className="w-full h-full object-cover"
                            />
                          ) : linkedProduct.images && linkedProduct.images.length > 0 ? (
                            <img
                              src={linkedProduct.images[0].url}
                              alt={linkedProduct.productName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{linkedProduct.productName}</h4>
                          <p className="text-xs text-gray-500">SKU: {linkedProduct.skuCode}</p>
                        </div>
                        <button
                          type="button"
                          onClick={removeProductLink}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Unlink className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowProductSearch(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-blue-600 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Search className="w-4 h-4" />
                        Search & Select Product
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Background Image Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                    Background Image
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Upload a custom background image</p>
                </div>
                <div className="p-5">
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                  <img
  src={formData.bgImage}
  alt="Banner background"
  className="w-full h-32 object-cover"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/images/banner-bg.png';
  }}
/>
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => document.getElementById('bg-image-upload').click()}
                        className="px-3 py-1.5 bg-white/90 text-gray-700 text-sm rounded-lg hover:bg-white transition-colors flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Change Image
                      </button>
                    </div>
                  </div>
                  <input
                    id="bg-image-upload"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleBgImageUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-400 mt-2 text-center">Recommended: 1920x600px, max 5MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Width Preview Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                Banner Preview (Full Width)
              </h2>
              <span className="text-xs text-gray-500">This is exactly how the banner will appear on the homepage</span>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div 
                className="relative w-full bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${formData.bgImage})`,
                  minHeight: '400px',
                  height: 'auto',
                  aspectRatio: '16/5'
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent" />
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                {/* Content */}
                <div className="relative h-full flex items-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8">
                  <div className="container mx-auto">
                    <div className="flex items-center justify-between gap-8">
                      {/* Left Content */}
                      <div className="flex-1 max-w-2xl">
                        {/* Badge */}
                        {formData.badge && (
                          <div className="mb-2 sm:mb-3">
                            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 shadow-sm">
                              {formData.badge}
                            </span>
                          </div>
                        )}
                        
                        {/* Title */}
                        {formData.title && (
                          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif text-gray-900 mb-1 sm:mb-2 leading-tight">
                            {formData.title}
                          </h1>
                        )}
                        
                        {/* Subtitle */}
                        {formData.subtitle && (
                          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                            {formData.subtitle}
                          </h2>
                        )}
                        
                     
                        
                        {/* Description */}
                        {formData.description && (
                          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 max-w-xl">
                            {formData.description}
                          </p>
                        )}
                        
                        {/* Features */}
                        {formData.features.length > 0 && (
                          <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                            {formData.features.map((feature, idx) => {
                              const IconComponent = FEATURE_ICONS.find(f => f.value === feature.icon)?.icon;
                              return (
                                <div key={idx} className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/80 backdrop-blur-md rounded-full border border-gray-200">
                                  {IconComponent && <span className="w-3.5 h-3.5 sm:w-4 sm:h-4">{IconComponent}</span>}
                                  <span className="text-gray-700 text-xs sm:text-sm font-medium">{feature.text}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        
                        {/* Buttons */}
                        {formData.buttons.length > 0 && (
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            {formData.buttons.map((button, idx) => (
                              button.text && button.link && (
                                <button
                                  key={idx}
                                  className={`px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full font-semibold transition-all ${
                                    button.isPrimary
                                      ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                                      : 'bg-white/80 backdrop-blur-md border border-gray-300 text-gray-700 hover:bg-white hover:shadow-lg'
                                  }`}
                                >
                                  {button.text}
                                </button>
                              )
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Right Side - Product Image */}
                      {getCurrentProductImage() && (
                        <div className="hidden md:block flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72">
                          <div className="relative w-full h-auto">
                            <img
                              src={getCurrentProductImage()}
                              alt="Product"
                              className="w-full h-auto object-contain drop-shadow-2xl"
                              style={{ 
                                filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.15))',
                                maxHeight: '280px',
                                background: removeBackground ? 'transparent' : 'transparent'
                              }}
                            />
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl -z-10 scale-150" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Discount Badge */}
                {formData.discount && (
                  <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8">
                    <div className="relative">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl">
                        <div className="text-center">
                          <div className="text-white font-black text-xs sm:text-sm md:text-base lg:text-xl leading-tight">
                            {formData.discount}
                          </div>
                          <div className="text-white/90 text-[6px] sm:text-[8px] md:text-[10px] font-medium">
                            OFF
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-orange-500 blur-md opacity-50 -z-10" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSubmitting ? 'Creating Banner...' : 'Create Banner'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </ProtectedRoute>
  );
}