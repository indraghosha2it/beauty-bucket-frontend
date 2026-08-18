
// // app/admin/about/page.jsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   Save, 
//   RotateCcw, 
//   Loader2,
//   Shield,
//   Truck,
//   Headphones,
//   Users,
//   Star,
//   Award,
//   Clock,
//   Globe,
//   Zap,
//   Package,
//   Heart,
//   Sparkles,
//   Target,
//   Eye,
//   TrendingUp,
//   Plus,
//   Trash2,
//   GripVertical,
//   ArrowLeft,
//   Upload,
//   X,
//   Image as ImageIcon
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';
// import { toast } from 'sonner';

// // ============================================================
// // CLOUDINARY HELPER FUNCTIONS
// // ============================================================

// const compressImageSmart = async (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
    
//     reader.onload = (event) => {
//       const img = new window.Image();
//       img.src = event.target.result;
      
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.width;
//         canvas.height = img.height;
        
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
//         let quality = 0.4;
//         if (file.size > 5 * 1024 * 1024) quality = 0.25;
//         else if (file.size > 2 * 1024 * 1024) quality = 0.3;
//         else if (file.size > 1 * 1024 * 1024) quality = 0.35;
//         else if (file.size > 500 * 1024) quality = 0.45;
//         else quality = 0.55;
        
//         canvas.toBlob(
//           (blob) => {
//             const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
//               type: 'image/jpeg',
//               lastModified: Date.now(),
//             });
//             resolve(compressedFile);
//           },
//           'image/jpeg',
//           quality
//         );
//       };
//       img.onerror = () => reject(new Error('Failed to load image'));
//     };
//     reader.onerror = () => reject(new Error('Failed to read file'));
//   });
// };

// const uploadToCloudinary = async (file) => {
//   const compressedFile = await compressImageSmart(file);
  
//   const formData = new FormData();
//   formData.append('file', compressedFile);
//   formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
  
//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );
    
//     const data = await response.json();
//     if (data.secure_url) {
//       return {
//         url: data.secure_url,
//         publicId: data.public_id,
//       };
//     } else {
//       throw new Error(data.error?.message || 'Upload failed');
//     }
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw error;
//   }
// };

// // ============================================================
// // IMAGE UPLOAD COMPONENT
// // ============================================================

// const ImageUpload = ({ imageUrl, onImageChange, onImageRemove, label = 'Image', aspectRatio = '16/9' }) => {
//   const fileInputRef = useRef(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [preview, setPreview] = useState(imageUrl || '');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     setPreview(imageUrl || '');
//   }, [imageUrl]);

//   const validateImage = (file) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       return { valid: false, message: 'Only JPG, PNG, and WebP formats are allowed.' };
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       return { valid: false, message: 'Image size must be less than 5MB.' };
//     }
//     return { valid: true };
//   };

//   const handleFileSelect = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validation = validateImage(file);
//     if (!validation.valid) {
//       setError(validation.message);
//       toast.error(validation.message);
//       return;
//     }

//     setError('');
//     setIsUploading(true);
    
//     try {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setPreview(event.target.result);
//       };
//       reader.readAsDataURL(file);
      
//       const result = await uploadToCloudinary(file);
      
//       if (result && result.url) {
//         onImageChange(result.url);
//         toast.success('Image uploaded successfully!');
//       } else {
//         throw new Error('Upload failed');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       setError('Failed to upload image');
//       toast.error('Failed to upload image');
//       setPreview('');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleRemove = () => {
//     setPreview('');
//     onImageRemove();
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{label}</label>
      
//       {preview ? (
//         <div className="relative inline-block">
//           <div className={`rounded-lg overflow-hidden border-2 border-blue-600/30 bg-gray-100`}
//                style={{ width: '200px', aspectRatio: aspectRatio }}>
//             <img 
//               src={preview} 
//               alt={label} 
//               className="w-full h-full object-cover"
//             />
//           </div>
//           {isUploading && (
//             <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
//               <Loader2 className="w-6 h-6 text-white animate-spin" />
//             </div>
//           )}
//           <button
//             type="button"
//             onClick={handleRemove}
//             className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//           >
//             <X className="w-3 h-3" />
//           </button>
//         </div>
//       ) : (
//         <div className="flex items-center gap-3">
//           <button
//             type="button"
//             onClick={() => fileInputRef.current?.click()}
//             disabled={isUploading}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
//           >
//             {isUploading ? (
//               <Loader2 className="w-4 h-4 animate-spin" />
//             ) : (
//               <Upload className="w-4 h-4" />
//             )}
//             {isUploading ? 'Uploading...' : 'Upload Image'}
//           </button>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/jpeg,image/jpg,image/png,image/webp"
//             className="hidden"
//             onChange={handleFileSelect}
//             disabled={isUploading}
//           />
//           <span className="text-xs text-gray-400">JPG, PNG, WebP (max 5MB)</span>
//         </div>
//       )}
//       {error && <p className="text-xs text-red-500">{error}</p>}
//     </div>
//   );
// };

// // ============================================================
// // ICON OPTIONS
// // ============================================================

// const ICON_OPTIONS = [
//   { value: 'Shield', label: 'Shield' },
//   { value: 'Truck', label: 'Truck' },
//   { value: 'Headphones', label: 'Headphones' },
//   { value: 'Users', label: 'Users' },
//   { value: 'Star', label: 'Star' },
//   { value: 'Award', label: 'Award' },
//   { value: 'Clock', label: 'Clock' },
//   { value: 'Globe', label: 'Globe' },
//   { value: 'Zap', label: 'Zap' },
//   { value: 'Package', label: 'Package' },
//   { value: 'Heart', label: 'Heart' },
//   { value: 'Target', label: 'Target' },
//   { value: 'Eye', label: 'Eye' },
//   { value: 'TrendingUp', label: 'TrendingUp' }
// ];

// // ============================================================
// // DEFAULT DATA
// // ============================================================

// const DEFAULT_ABOUT_DATA = {
//   hero: {
//     image: '',
//     badge: 'About Smart Gadget',
//     title: 'Trusted Tech Partner',
//     description: "We're on a mission to make premium technology accessible to everyone in Bangladesh, offering authentic products with exceptional service.",
//     buttonText: 'Explore Products',
//     buttonLink: '/products',
//     secondaryButtonText: 'Contact Us',
//     secondaryButtonLink: '/contact'
//   },
//   mission: {
//     title: 'Our Mission',
//     description: 'To empower people with cutting-edge technology by providing authentic, high-quality gadgets at competitive prices, backed by exceptional customer service that builds lasting trust.'
//   },
//   vision: {
//     title: 'Our Vision',
//     description: "To become Bangladesh's most trusted tech retailer, creating a seamless bridge between global innovation and local needs, making advanced technology accessible to every household."
//   },
//   stats: [
//     { id: 1, icon: 'Users', value: '10000', label: 'Happy Customers', suffix: '+', color: 'from-blue-500 to-blue-600', isActive: true },
//     { id: 2, icon: 'Package', value: '500', label: 'Premium Products', suffix: '+', color: 'from-green-500 to-green-600', isActive: true },
//     { id: 3, icon: 'Star', value: '98', label: 'Satisfaction Rate', suffix: '%', color: 'from-yellow-500 to-yellow-600', isActive: true },
//     { id: 4, icon: 'Headphones', value: '24', label: '24/7 Support', suffix: '', color: 'from-purple-500 to-purple-600', isActive: true }
//   ],
//   values: [
//     { id: 1, icon: 'Shield', title: 'Quality Assurance', description: 'Every product undergoes rigorous testing to ensure it meets our high standards before reaching your hands.', isActive: true },
//     { id: 2, icon: 'Users', title: 'Customer First', description: 'Your satisfaction is our priority. We listen, adapt, and go the extra mile for every customer.', isActive: true },
//     { id: 3, icon: 'Zap', title: 'Innovation Driven', description: 'We stay ahead of trends, bringing you the latest and most innovative gadgets on the market.', isActive: true },
//     { id: 4, icon: 'Truck', title: 'Fast & Reliable', description: 'Quick delivery and hassle-free returns make shopping with us smooth and worry-free.', isActive: true }
//   ],
//   features: [
//     { id: 1, icon: 'Shield', title: '100% Authentic Products', description: 'We source directly from authorized distributors to guarantee genuineness.', isActive: true },
//     { id: 2, icon: 'Truck', title: 'Free & Fast Delivery', description: 'Free delivery on orders over ৳3,000 and same-day dispatch.', isActive: true },
//     { id: 3, icon: 'Headphones', title: 'Expert Support', description: 'Our tech-savvy team is available 24/7 to help you choose the right product.', isActive: true },
//     { id: 4, icon: 'Clock', title: 'Easy Returns', description: "Hassle-free returns within 7 days if you're not completely satisfied.", isActive: true },
//     { id: 5, icon: 'Globe', title: 'Wide Selection', description: 'From premium smartphones to smart home gadgets - we have it all.', isActive: true },
//     { id: 6, icon: 'TrendingUp', title: 'Best Prices', description: 'We offer competitive pricing without compromising on quality.', isActive: true }
//   ],
//   cta: {
//     image: '',
//     badge: 'Exclusive Deals',
//     title: 'Ready to Upgrade Your Tech?',
//     description: 'Explore our collection of premium gadgets and find the perfect match for your needs.',
//     buttonText: 'Shop Now',
//     buttonLink: '/products'
//   },
//   counters: {
//     customers: 10000,
//     products: 500,
//     satisfaction: 98,
//     support: 24
//   }
// };

// // ============================================================
// // MAIN COMPONENT
// // ============================================================

// export default function AboutManagement() {
//   const router = useRouter();
//   const [aboutData, setAboutData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [resetting, setResetting] = useState(false);
//   const [activeTab, setActiveTab] = useState('hero');

//   // Fetch about data
//   useEffect(() => {
//     fetchAboutData();
//   }, []);

//   const fetchAboutData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login first');
//         setLoading(false);
//         return;
//       }
      
//       const response = await fetch('http://localhost:5000/api/about/admin', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.status === 403) {
//         const errorData = await response.json().catch(() => ({}));
//         toast.error(errorData.error || 'You do not have permission to manage about page');
//         setLoading(false);
//         return;
//       }

//       if (response.ok) {
//         const result = await response.json();
//         if (result.success && result.data) {
//           const mergedData = {
//             hero: { ...DEFAULT_ABOUT_DATA.hero, ...result.data.hero },
//             mission: { ...DEFAULT_ABOUT_DATA.mission, ...result.data.mission },
//             vision: { ...DEFAULT_ABOUT_DATA.vision, ...result.data.vision },
//             stats: result.data.stats || DEFAULT_ABOUT_DATA.stats,
//             values: result.data.values || DEFAULT_ABOUT_DATA.values,
//             features: result.data.features || DEFAULT_ABOUT_DATA.features,
//             cta: { ...DEFAULT_ABOUT_DATA.cta, ...result.data.cta },
//             counters: { ...DEFAULT_ABOUT_DATA.counters, ...result.data.counters }
//           };
//           setAboutData(mergedData);
//           toast.success('About data loaded successfully');
//         }
//       } else {
//         const errorData = await response.json().catch(() => ({}));
//         toast.error(errorData.error || 'Failed to load about data');
//         setAboutData(DEFAULT_ABOUT_DATA);
//       }
//     } catch (error) {
//       console.error('Error fetching about data:', error);
//       toast.error('Network error. Please try again.');
//       setAboutData(DEFAULT_ABOUT_DATA);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       setSaving(true);
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login first');
//         setSaving(false);
//         return;
//       }

//       const dataToSave = {
//         hero: aboutData.hero || DEFAULT_ABOUT_DATA.hero,
//         mission: aboutData.mission || DEFAULT_ABOUT_DATA.mission,
//         vision: aboutData.vision || DEFAULT_ABOUT_DATA.vision,
//         stats: aboutData.stats || DEFAULT_ABOUT_DATA.stats,
//         values: aboutData.values || DEFAULT_ABOUT_DATA.values,
//         features: aboutData.features || DEFAULT_ABOUT_DATA.features,
//         cta: aboutData.cta || DEFAULT_ABOUT_DATA.cta,
//         counters: aboutData.counters || DEFAULT_ABOUT_DATA.counters
//       };

//       const response = await fetch('http://localhost:5000/api/about/admin', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(dataToSave)
//       });

//       if (response.status === 403) {
//         const errorData = await response.json().catch(() => ({}));
//         toast.error(errorData.error || 'You do not have permission to update about page');
//         setSaving(false);
//         return;
//       }

//       if (response.ok) {
//         const result = await response.json();
//         if (result.success) {
//           toast.success('✅ About page updated successfully!');
//           await fetchAboutData();
//         } else {
//           toast.error(result.error || 'Failed to save');
//         }
//       } else {
//         const errorData = await response.json().catch(() => ({}));
//         toast.error(errorData.error || 'Failed to save about data');
//       }
//     } catch (error) {
//       console.error('Error saving about data:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleReset = async () => {
//     if (!confirm('Are you sure you want to reset the about page to default? This action cannot be undone.')) {
//       return;
//     }

//     try {
//       setResetting(true);
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login first');
//         setResetting(false);
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/about/admin/reset', {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.status === 403) {
//         const errorData = await response.json().catch(() => ({}));
//         toast.error(errorData.error || 'You do not have permission to reset about page');
//         setResetting(false);
//         return;
//       }

//       if (response.ok) {
//         const result = await response.json();
//         if (result.success) {
//           toast.success('About page reset to default!');
//           setAboutData(DEFAULT_ABOUT_DATA);
//         } else {
//           toast.error(result.error || 'Failed to reset');
//         }
//       } else {
//         const errorData = await response.json().catch(() => ({}));
//         toast.error(errorData.error || 'Failed to reset about data');
//       }
//     } catch (error) {
//       console.error('Error resetting about data:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setResetting(false);
//     }
//   };

//   // Update handlers
//   const updateField = (section, field, value) => {
//     setAboutData(prev => {
//       if (!prev) return DEFAULT_ABOUT_DATA;
//       return {
//         ...prev,
//         [section]: {
//           ...prev[section],
//           [field]: value
//         }
//       };
//     });
//   };

//   const updateArrayItem = (section, index, field, value) => {
//     setAboutData(prev => {
//       if (!prev) return DEFAULT_ABOUT_DATA;
//       const items = [...(prev[section] || [])];
//       if (items[index]) {
//         items[index] = { ...items[index], [field]: value };
//       }
//       return { ...prev, [section]: items };
//     });
//   };

//   // ✅ FIXED: Add array item with unique ID using timestamp
//   const addArrayItem = (section, template) => {
//     setAboutData(prev => {
//       if (!prev) return DEFAULT_ABOUT_DATA;
//       const items = [...(prev[section] || [])];
      
//       // Generate a unique ID using timestamp + random number
//       // This ensures no duplicate IDs even after deletions
//       const newId = Date.now() + Math.floor(Math.random() * 1000);
      
//       items.push({ 
//         ...template, 
//         id: newId, 
//         isActive: true 
//       });
      
//       return { ...prev, [section]: items };
//     });
//   };

//   const removeArrayItem = (section, index) => {
//     setAboutData(prev => {
//       if (!prev) return DEFAULT_ABOUT_DATA;
//       const items = [...(prev[section] || [])];
//       items.splice(index, 1);
//       return { ...prev, [section]: items };
//     });
//   };

//   const toggleArrayItemActive = (section, index) => {
//     setAboutData(prev => {
//       if (!prev) return DEFAULT_ABOUT_DATA;
//       const items = [...(prev[section] || [])];
//       if (items[index]) {
//         items[index] = { ...items[index], isActive: !items[index].isActive };
//       }
//       return { ...prev, [section]: items };
//     });
//   };

//   if (loading) {
//     return (
//       <ProtectedRoute pageKey="about_management">
//         <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
//             <p className="text-gray-500 mt-2">Loading about data...</p>
//           </div>
//         </div>
//       </ProtectedRoute>
//     );
//   }

//   const data = aboutData || DEFAULT_ABOUT_DATA;

//   return (
//     <ProtectedRoute pageKey="about_management">
//       <div className="min-h-screen bg-[#f0f7fa]">
//         {/* Header */}
//         <div className="bg-white border-b border-blue-600/20 shadow-lg sticky top-0 z-10">
//           <div className="px-4 sm:px-6 py-3 sm:py-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//               <div className="flex items-center gap-2 sm:gap-4">
              
//                 <div className="min-w-0 flex-1">
//                   <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
//                     <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black truncate">
//                       About Page Management
//                     </h1>
//                   </div>
//                   <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 truncate">
//                     Manage about page content, stats, values, features, and more
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <button
//                   onClick={handleReset}
//                   disabled={resetting}
//                   className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-500/20 text-blue-700 rounded-lg hover:bg-blue-500/30 transition-colors border border-blue-500/20 disabled:opacity-50"
//                 >
//                   {resetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
//                   Reset
//                 </button>
//                 <button
//                   onClick={fetchAboutData}
//                   className="p-1.5 sm:p-2 text-white/70 hover:bg-blue-600/20 rounded-lg transition-colors hover:text-white"
//                   title="Refresh"
//                 >
//                   <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-4 sm:p-6">
//           <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
//             {/* Tabs */}
//             <div className="flex flex-wrap gap-2 border-b border-blue-600/20 pb-2 bg-white rounded-t-xl shadow-sm border border-blue-600/20 p-4">
//               {[
//                 { id: 'hero', label: 'Hero Section', icon: ImageIcon },
//                 { id: 'mission', label: 'Mission & Vision', icon: Target },
//                 { id: 'stats', label: 'Stats', icon: Star },
//                 { id: 'values', label: 'Values', icon: Shield },
//                 { id: 'features', label: 'Features', icon: Package },
//                 { id: 'cta', label: 'CTA', icon: Zap },
//               ].map(tab => (
//                 <button
//                   key={tab.id}
//                   type="button"
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
//                     activeTab === tab.id
//                       ? 'bg-blue-600 text-white'
//                       : 'text-gray-600 hover:bg-blue-600/10 hover:text-blue-600'
//                   }`}
//                 >
//                   <tab.icon className="w-4 h-4" />
//                   {tab.label}
//                 </button>
//               ))}
//             </div>

//             {/* Tab Content */}
//             <div className="space-y-6">
//               {/* Hero Tab */}
//               {activeTab === 'hero' && (
//                 <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                   <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
//                     <ImageIcon className="w-5 h-5 text-blue-600" />
//                     Hero Section Settings
//                   </h2>
//                   <div className="space-y-4">
//                     <ImageUpload
//                       imageUrl={data.hero?.image || ''}
//                       onImageChange={(url) => updateField('hero', 'image', url)}
//                       onImageRemove={() => updateField('hero', 'image', '')}
//                       label="Hero Background Image"
//                       aspectRatio="16/9"
//                     />

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
//                       <input
//                         type="text"
//                         value={data.hero?.badge || ''}
//                         onChange={(e) => updateField('hero', 'badge', e.target.value)}
//                         className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                         placeholder="About Smart Gadget"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                       <input
//                         type="text"
//                         value={data.hero?.title || ''}
//                         onChange={(e) => updateField('hero', 'title', e.target.value)}
//                         className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                         placeholder="Trusted Tech Partner"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                       <textarea
//                         value={data.hero?.description || ''}
//                         onChange={(e) => updateField('hero', 'description', e.target.value)}
//                         rows={3}
//                         className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
//                         placeholder="We're on a mission to make premium technology accessible to everyone..."
//                       />
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
//                         <input
//                           type="text"
//                           value={data.hero?.buttonText || ''}
//                           onChange={(e) => updateField('hero', 'buttonText', e.target.value)}
//                           className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                           placeholder="Explore Products"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
//                         <input
//                           type="text"
//                           value={data.hero?.buttonLink || ''}
//                           onChange={(e) => updateField('hero', 'buttonLink', e.target.value)}
//                           className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                           placeholder="/products"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
//                         <input
//                           type="text"
//                           value={data.hero?.secondaryButtonText || ''}
//                           onChange={(e) => updateField('hero', 'secondaryButtonText', e.target.value)}
//                           className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                           placeholder="Contact Us"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
//                         <input
//                           type="text"
//                           value={data.hero?.secondaryButtonLink || ''}
//                           onChange={(e) => updateField('hero', 'secondaryButtonLink', e.target.value)}
//                           className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                           placeholder="/contact"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Mission & Vision Tab */}
//               {activeTab === 'mission' && (
//                 <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                   <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
//                     <Target className="w-5 h-5 text-blue-600" />
//                     Mission & Vision
//                   </h2>
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-md font-medium text-gray-800 mb-3">Mission</h3>
//                       <div className="space-y-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                           <input
//                             type="text"
//                             value={data.mission?.title || ''}
//                             onChange={(e) => updateField('mission', 'title', e.target.value)}
//                             className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                             placeholder="Our Mission"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                           <textarea
//                             value={data.mission?.description || ''}
//                             onChange={(e) => updateField('mission', 'description', e.target.value)}
//                             rows={3}
//                             className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
//                             placeholder="To empower people with cutting-edge technology..."
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="border-t border-gray-200 pt-6">
//                       <h3 className="text-md font-medium text-gray-800 mb-3">Vision</h3>
//                       <div className="space-y-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                           <input
//                             type="text"
//                             value={data.vision?.title || ''}
//                             onChange={(e) => updateField('vision', 'title', e.target.value)}
//                             className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                             placeholder="Our Vision"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                           <textarea
//                             value={data.vision?.description || ''}
//                             onChange={(e) => updateField('vision', 'description', e.target.value)}
//                             rows={3}
//                             className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
//                             placeholder="To become Bangladesh's most trusted tech retailer..."
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Stats Tab */}
//               {activeTab === 'stats' && (
//                 <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                       <Star className="w-5 h-5 text-blue-600" />
//                       Stats <span className="text-xs font-normal text-gray-400">(Max 4)</span>
//                     </h2>
//                     <button
//                       type="button"
//                       onClick={() => addArrayItem('stats', { icon: 'Users', value: '0', label: 'New Stat', suffix: '+', color: 'from-blue-500 to-blue-600' })}
//                       disabled={(data.stats || []).length >= 4}
//                       className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
//                     >
//                       <Plus className="w-4 h-4" /> Add Stat
//                     </button>
//                   </div>
//                   <div className="space-y-3">
//                     {(data.stats || []).map((stat, index) => (
//                       <div key={stat.id || index} className="border border-gray-200 rounded-lg p-4">
//                         <div className="flex items-start gap-4">
//                           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
//                             <div>
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
//                               <select
//                                 value={stat.icon || 'Users'}
//                                 onChange={(e) => updateArrayItem('stats', index, 'icon', e.target.value)}
//                                 className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                               >
//                                 {ICON_OPTIONS.map(opt => (
//                                   <option key={opt.value} value={opt.value}>{opt.label}</option>
//                                 ))}
//                               </select>
//                             </div>
//                             <div>
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Value</label>
//                               <input
//                                 type="text"
//                                 value={stat.value || ''}
//                                 onChange={(e) => updateArrayItem('stats', index, 'value', e.target.value)}
//                                 className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Label</label>
//                               <input
//                                 type="text"
//                                 value={stat.label || ''}
//                                 onChange={(e) => updateArrayItem('stats', index, 'label', e.target.value)}
//                                 className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Suffix</label>
//                               <input
//                                 type="text"
//                                 value={stat.suffix || ''}
//                                 onChange={(e) => updateArrayItem('stats', index, 'suffix', e.target.value)}
//                                 className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                               />
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <button
//                               type="button"
//                               onClick={() => toggleArrayItemActive('stats', index)}
//                               className={`px-2 py-1 text-xs rounded ${stat.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
//                             >
//                               {stat.isActive !== false ? 'Active' : 'Inactive'}
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => removeArrayItem('stats', index)}
//                               className="p-1 text-red-500 hover:bg-red-50 rounded"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                     {(data.stats || []).length === 0 && (
//                       <p className="text-gray-500 text-center py-4">No stats added yet.</p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Values Tab */}
//               {activeTab === 'values' && (
//                 <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                       <Shield className="w-5 h-5 text-blue-600" />
//                       Core Values <span className="text-xs font-normal text-gray-400">(Max 4)</span>
//                     </h2>
//                     <button
//                       type="button"
//                       onClick={() => addArrayItem('values', { icon: 'Shield', title: 'New Value', description: 'Description' })}
//                       disabled={(data.values || []).length >= 4}
//                       className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
//                     >
//                       <Plus className="w-4 h-4" /> Add Value
//                     </button>
//                   </div>
//                   <div className="space-y-3">
//                     {(data.values || []).map((value, index) => (
//                       <div key={value.id || index} className="border border-gray-200 rounded-lg p-4">
//                         <div className="flex items-start gap-4">
//                           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
//                             <div>
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
//                               <select
//                                 value={value.icon || 'Shield'}
//                                 onChange={(e) => updateArrayItem('values', index, 'icon', e.target.value)}
//                                 className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                               >
//                                 {ICON_OPTIONS.map(opt => (
//                                   <option key={opt.value} value={opt.value}>{opt.label}</option>
//                                 ))}
//                               </select>
//                             </div>
//                             <div>
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
//                               <input
//                                 type="text"
//                                 value={value.title || ''}
//                                 onChange={(e) => updateArrayItem('values', index, 'title', e.target.value)}
//                                 className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                               />
//                             </div>
//                             <div className="sm:col-span-2">
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
//                               <textarea
//                                 value={value.description || ''}
//                                 onChange={(e) => updateArrayItem('values', index, 'description', e.target.value)}
//                                 rows={2}
//                                 className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
//                               />
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <button
//                               type="button"
//                               onClick={() => toggleArrayItemActive('values', index)}
//                               className={`px-2 py-1 text-xs rounded ${value.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
//                             >
//                               {value.isActive !== false ? 'Active' : 'Inactive'}
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => removeArrayItem('values', index)}
//                               className="p-1 text-red-500 hover:bg-red-50 rounded"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                     {(data.values || []).length === 0 && (
//                       <p className="text-gray-500 text-center py-4">No values added yet.</p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Features Tab */}
//               {activeTab === 'features' && (
//                 <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                       <Package className="w-5 h-5 text-blue-600" />
//                       Features <span className="text-xs font-normal text-gray-400">(Max 6)</span>
//                     </h2>
//                     <button
//                       type="button"
//                       onClick={() => addArrayItem('features', { icon: 'Shield', title: 'New Feature', description: 'Description' })}
//                       disabled={(data.features || []).length >= 6}
//                       className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
//                     >
//                       <Plus className="w-4 h-4" /> Add Feature
//                     </button>
//                   </div>
//                   <div className="space-y-3">
//                     {(data.features || []).map((feature, index) => (
//                       <div key={feature.id || index} className="border border-gray-200 rounded-lg p-4">
//                         <div className="flex items-start gap-4">
//                           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
//                             <div>
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
//                               <select
//                                 value={feature.icon || 'Shield'}
//                                 onChange={(e) => updateArrayItem('features', index, 'icon', e.target.value)}
//                                 className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                               >
//                                 {ICON_OPTIONS.map(opt => (
//                                   <option key={opt.value} value={opt.value}>{opt.label}</option>
//                                 ))}
//                               </select>
//                             </div>
//                             <div>
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
//                               <input
//                                 type="text"
//                                 value={feature.title || ''}
//                                 onChange={(e) => updateArrayItem('features', index, 'title', e.target.value)}
//                                 className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                               />
//                             </div>
//                             <div className="sm:col-span-2">
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
//                               <textarea
//                                 value={feature.description || ''}
//                                 onChange={(e) => updateArrayItem('features', index, 'description', e.target.value)}
//                                 rows={2}
//                                 className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
//                               />
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <button
//                               type="button"
//                               onClick={() => toggleArrayItemActive('features', index)}
//                               className={`px-2 py-1 text-xs rounded ${feature.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
//                             >
//                               {feature.isActive !== false ? 'Active' : 'Inactive'}
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => removeArrayItem('features', index)}
//                               className="p-1 text-red-500 hover:bg-red-50 rounded"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                     {(data.features || []).length === 0 && (
//                       <p className="text-gray-500 text-center py-4">No features added yet.</p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* CTA Tab */}
//               {activeTab === 'cta' && (
//                 <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                   <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
//                     <Zap className="w-5 h-5 text-blue-600" />
//                     CTA Section
//                   </h2>
//                   <div className="space-y-4">
//                     <ImageUpload
//                       imageUrl={data.cta?.image || ''}
//                       onImageChange={(url) => updateField('cta', 'image', url)}
//                       onImageRemove={() => updateField('cta', 'image', '')}
//                       label="CTA Background Image"
//                       aspectRatio="16/9"
//                     />

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
//                       <input
//                         type="text"
//                         value={data.cta?.badge || ''}
//                         onChange={(e) => updateField('cta', 'badge', e.target.value)}
//                         className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                         placeholder="Exclusive Deals"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                       <input
//                         type="text"
//                         value={data.cta?.title || ''}
//                         onChange={(e) => updateField('cta', 'title', e.target.value)}
//                         className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                         placeholder="Ready to Upgrade Your Tech?"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                       <textarea
//                         value={data.cta?.description || ''}
//                         onChange={(e) => updateField('cta', 'description', e.target.value)}
//                         rows={3}
//                         className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
//                         placeholder="Explore our collection of premium gadgets and find the perfect match..."
//                       />
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
//                         <input
//                           type="text"
//                           value={data.cta?.buttonText || ''}
//                           onChange={(e) => updateField('cta', 'buttonText', e.target.value)}
//                           className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                           placeholder="Shop Now"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
//                         <input
//                           type="text"
//                           value={data.cta?.buttonLink || ''}
//                           onChange={(e) => updateField('cta', 'buttonLink', e.target.value)}
//                           className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                           placeholder="/products"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end pt-4 border-t border-blue-600/20">
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
//               >
//                 {saving ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     <span>Saving...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span>Save About Page</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

// app/authorize/about-management/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Save, 
  RotateCcw, 
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  ArrowLeft,
  Upload,
  X
} from 'lucide-react';
import { 
  FaHeart, 
  FaLeaf, 
  FaShippingFast, 
  FaShieldAlt, 
  FaStar, 
  FaUsers, 
  FaAward, 
  FaGlobe,
  FaArrowRight,
  FaCheckCircle,
  FaGift,
  FaSmile,
  FaRocket,
  FaStore,
  FaTrophy,
  FaGem,
  FaHands,
  FaSeedling,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaImage
} from 'react-icons/fa';
import { GiLipstick, GiSparkles, GiFlower } from 'react-icons/gi';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { toast } from 'sonner';

// ============================================================
// ICON OPTIONS
// ============================================================

const STAT_ICON_OPTIONS = [
  { value: 'FaAward', label: 'Award' },
  { value: 'FaUsers', label: 'Users' },
  { value: 'GiLipstick', label: 'Lipstick' },
  { value: 'FaStar', label: 'Star' }
];

const VALUE_ICON_OPTIONS = [
  { value: 'FaHeart', label: 'Heart' },
  { value: 'FaLeaf', label: 'Leaf' },
  { value: 'FaShieldAlt', label: 'Shield' },
  { value: 'FaUsers', label: 'Users' },
  { value: 'FaGem', label: 'Gem' },
  { value: 'FaHands', label: 'Hands' },
  { value: 'FaSeedling', label: 'Seedling' }
];

const MILESTONE_ICON_OPTIONS = [
  { value: 'FaRocket', label: 'Rocket' },
  { value: 'FaStore', label: 'Store' },
  { value: 'FaGlobe', label: 'Globe' },
  { value: 'FaTrophy', label: 'Trophy' },
  { value: 'FaUsers', label: 'Users' },
  { value: 'FaCalendarAlt', label: 'Calendar' },
  { value: 'FaMapMarkerAlt', label: 'Map Marker' }
];

const TRUST_ICON_OPTIONS = [
  { value: 'FaCheckCircle', label: 'Check Circle' },
  { value: 'FaShippingFast', label: 'Shipping Fast' },
  { value: 'FaGift', label: 'Gift' },
  { value: 'FaSmile', label: 'Smile' },
  { value: 'FaStar', label: 'Star' },
  { value: 'FaUsers', label: 'Users' },
  { value: 'FaAward', label: 'Award' }
];

// ============================================================
// IMAGE UPLOAD COMPONENT
// ============================================================

const ImageUpload = ({ imageUrl, onImageChange, onImageRemove, label = 'Image', aspectRatio = '16/9', className = '' }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(imageUrl || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setPreview(imageUrl || '');
  }, [imageUrl]);

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

  const compressImageSmart = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          let quality = 0.4;
          if (file.size > 5 * 1024 * 1024) quality = 0.25;
          else if (file.size > 2 * 1024 * 1024) quality = 0.3;
          else if (file.size > 1 * 1024 * 1024) quality = 0.35;
          else if (file.size > 500 * 1024) quality = 0.45;
          else quality = 0.55;
          
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            'image/jpeg',
            quality
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  const uploadToCloudinary = async (file) => {
    const compressedFile = await compressImageSmart(file);
    
    const formData = new FormData();
    formData.append('file', compressedFile);
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
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
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
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

// ============================================================
// DEFAULT DATA
// ============================================================

const DEFAULT_ABOUT_DATA = {
  hero: {
    image: '',
    overlayImage: '',
    badge: 'About Us',
    title: 'Redefining Beauty',
    highlightedText: 'for Everyone',
    description: 'We believe beauty is for everyone. Our mission is to bring you the finest beauty products with expert care, fast delivery, and a touch of luxury.',
    buttonText: 'Explore Products',
    buttonLink: '/products',
    secondaryButtonText: 'Get in Touch',
    secondaryButtonLink: '/contact'
  },
  stats: {
    backgroundImage: '',
    items: [
      { id: 1, icon: 'FaAward', value: '50+', label: 'Premium Brands', displayOrder: 0, isActive: true },
      { id: 2, icon: 'FaUsers', value: '5K+', label: 'Happy Customers', displayOrder: 1, isActive: true },
      { id: 3, icon: 'GiLipstick', value: '500+', label: 'Products', displayOrder: 2, isActive: true },
      { id: 4, icon: 'FaStar', value: '98%', label: 'Satisfaction Rate', displayOrder: 3, isActive: true }
    ]
  },
  story: {
    badge: 'Our Story',
    title: 'A Journey of Beauty & Trust',
    paragraphs: [
      'BeautyBucket was founded with a simple yet powerful vision: to make premium beauty products accessible to everyone in Bangladesh. What started as a passion project has grown into a trusted destination for beauty enthusiasts.',
      'We carefully curate each product in our collection, ensuring only the highest quality, authentic, and effective products make it to our shelves. From skincare to makeup, we bring you the best from around the world.',
      'Our commitment to quality, transparency, and customer satisfaction has made us a beloved brand among thousands of customers across the country.'
    ],
    trustIndicators: [
      { id: 1, icon: 'FaCheckCircle', label: 'Quality Assured' },
      { id: 2, icon: 'FaShippingFast', label: 'Fast Delivery' },
      { id: 3, icon: 'FaGift', label: 'Shipping Across the Country' },
      { id: 4, icon: 'FaSmile', label: '100% Satisfaction' }
    ],
    images: [
      { id: 1, src: '', alt: 'Happy customer', displayOrder: 0, isActive: true },
      { id: 2, src: '', alt: 'Beauty products display', displayOrder: 1, isActive: true },
      { id: 3, src: '', alt: 'Product curation', displayOrder: 2, isActive: true },
      { id: 4, src: '', alt: 'Beauty team', displayOrder: 3, isActive: true }
    ]
  },
  values: [
    {
      id: 1,
      icon: 'FaHeart',
      title: 'Passion for Beauty',
      description: 'We believe every individual deserves to feel beautiful and confident in their own skin.',
      displayOrder: 0,
      isActive: true
    },
    {
      id: 2,
      icon: 'FaLeaf',
      title: 'Natural & Safe',
      description: 'We prioritize natural ingredients and safety in every product we curate.',
      displayOrder: 1,
      isActive: true
    },
    {
      id: 3,
      icon: 'FaShieldAlt',
      title: '100% Authentic',
      description: 'Every product is sourced directly from trusted brands and verified for authenticity.',
      displayOrder: 2,
      isActive: true
    },
    {
      id: 4,
      icon: 'FaUsers',
      title: 'Community First',
      description: 'We build a community of beauty enthusiasts who support and inspire each other.',
      displayOrder: 3,
      isActive: true
    }
  ],
  milestones: [
    {
      id: 1,
      year: '2020',
      title: 'Founded',
      description: 'BeautyBucket was born with a vision to bring premium beauty products to Bangladesh.',
      icon: 'FaRocket',
      displayOrder: 0,
      isActive: true
    },
    {
      id: 2,
      year: '2021',
      title: 'First Store',
      description: 'Opened our first physical store in Dhaka, bringing beauty closer to our customers.',
      icon: 'FaStore',
      displayOrder: 1,
      isActive: true
    },
    {
      id: 3,
      year: '2022',
      title: 'Online Launch',
      description: 'Launched our e-commerce platform to serve customers nationwide with ease.',
      icon: 'FaGlobe',
      displayOrder: 2,
      isActive: true
    },
    {
      id: 4,
      year: '2023',
      title: '50+ Brands',
      description: 'Partnered with over 50 premium beauty brands from around the world.',
      icon: 'FaTrophy',
      displayOrder: 3,
      isActive: true
    },
    {
      id: 5,
      year: '2024',
      title: '5K+ Customers',
      description: 'Served over 5,000 happy customers across Bangladesh with love and care.',
      icon: 'FaUsers',
      displayOrder: 4,
      isActive: true
    }
  ],
  cta: {
    image: '',
    title: 'Ready to Start Your Beauty Journey?',
    description: 'Explore our curated collection of premium beauty products and find your perfect match.',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    secondaryButtonText: 'Contact Us',
    secondaryButtonLink: '/contact'
  }
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function AboutManagement() {
  const router = useRouter();
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  // Fetch about data
  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setLoading(false);
        return;
      }
      
      const response = await fetch('http://localhost:5000/api/admin/about', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'You do not have permission to manage about page');
        setLoading(false);
        return;
      }

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          // Ensure arrays
          const values = Array.isArray(result.data.values) ? result.data.values : [];
          const milestones = Array.isArray(result.data.milestones) ? result.data.milestones : [];
          const statsItems = Array.isArray(result.data.stats?.items) ? result.data.stats.items : DEFAULT_ABOUT_DATA.stats.items;
          
          const mergedData = {
            hero: { ...DEFAULT_ABOUT_DATA.hero, ...result.data.hero },
            stats: { 
              ...DEFAULT_ABOUT_DATA.stats, 
              ...result.data.stats,
              items: statsItems
            },
            story: { 
              ...DEFAULT_ABOUT_DATA.story, 
              ...result.data.story,
              images: Array.isArray(result.data.story?.images) ? result.data.story.images : DEFAULT_ABOUT_DATA.story.images,
              trustIndicators: Array.isArray(result.data.story?.trustIndicators) ? result.data.story.trustIndicators : DEFAULT_ABOUT_DATA.story.trustIndicators,
              paragraphs: Array.isArray(result.data.story?.paragraphs) ? result.data.story.paragraphs : DEFAULT_ABOUT_DATA.story.paragraphs
            },
            values: values,
            milestones: milestones,
            cta: { ...DEFAULT_ABOUT_DATA.cta, ...result.data.cta }
          };
          setAboutData(mergedData);
          toast.success('About data loaded successfully');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'Failed to load about data');
        setAboutData(DEFAULT_ABOUT_DATA);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
      toast.error('Network error. Please try again.');
      setAboutData(DEFAULT_ABOUT_DATA);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setSaving(false);
        return;
      }

      const dataToSave = {
        hero: aboutData.hero || DEFAULT_ABOUT_DATA.hero,
        stats: aboutData.stats || DEFAULT_ABOUT_DATA.stats,
        story: aboutData.story || DEFAULT_ABOUT_DATA.story,
        values: aboutData.values || DEFAULT_ABOUT_DATA.values,
        milestones: aboutData.milestones || DEFAULT_ABOUT_DATA.milestones,
        cta: aboutData.cta || DEFAULT_ABOUT_DATA.cta
      };

      const response = await fetch('http://localhost:5000/api/admin/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSave)
      });

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'You do not have permission to update about page');
        setSaving(false);
        return;
      }

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          toast.success('✅ About page updated successfully!');
          await fetchAboutData();
        } else {
          toast.error(result.error || 'Failed to save');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'Failed to save about data');
      }
    } catch (error) {
      console.error('Error saving about data:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset the about page to default? This action cannot be undone.')) {
      return;
    }

    try {
      setResetting(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setResetting(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/admin/about/reset', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'You do not have permission to reset about page');
        setResetting(false);
        return;
      }

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          toast.success('About page reset to default!');
          setAboutData(DEFAULT_ABOUT_DATA);
        } else {
          toast.error(result.error || 'Failed to reset');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'Failed to reset about data');
      }
    } catch (error) {
      console.error('Error resetting about data:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setResetting(false);
    }
  };

  // Update handlers
  const updateField = (section, field, value) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
    });
  };

  const updateNestedField = (section, nested, field, value) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [nested]: {
            ...prev[section]?.[nested],
            [field]: value
          }
        }
      };
    });
  };

  const addArrayItem = (section, template) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const currentItems = Array.isArray(prev[section]) ? prev[section] : [];
      const newId = Date.now() + Math.floor(Math.random() * 1000);
      return { 
        ...prev, 
        [section]: [...currentItems, { ...template, id: newId, isActive: true }]
      };
    });
  };

  const removeArrayItem = (section, index) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const currentItems = Array.isArray(prev[section]) ? prev[section] : [];
      const newItems = [...currentItems];
      newItems.splice(index, 1);
      return { ...prev, [section]: newItems };
    });
  };

  const toggleArrayItemActive = (section, index) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const currentItems = Array.isArray(prev[section]) ? prev[section] : [];
      const newItems = [...currentItems];
      if (newItems[index]) {
        newItems[index] = { ...newItems[index], isActive: !newItems[index].isActive };
      }
      return { ...prev, [section]: newItems };
    });
  };

  const updateArrayItem = (section, index, field, value) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const currentItems = Array.isArray(prev[section]) ? prev[section] : [];
      const newItems = [...currentItems];
      if (newItems[index]) {
        newItems[index] = { ...newItems[index], [field]: value };
      }
      return { ...prev, [section]: newItems };
    });
  };

  const updateStatsItem = (index, field, value) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const items = Array.isArray(prev.stats?.items) ? [...prev.stats.items] : [];
      if (items[index]) {
        items[index] = { ...items[index], [field]: value };
      }
      return { 
        ...prev, 
        stats: {
          ...prev.stats,
          items
        }
      };
    });
  };

  const addStatsItem = () => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const items = Array.isArray(prev.stats?.items) ? [...prev.stats.items] : [];
      const newId = Date.now() + Math.floor(Math.random() * 1000);
      items.push({ 
        id: newId, 
        icon: 'FaAward', 
        value: '0', 
        label: 'New Stat', 
        displayOrder: items.length, 
        isActive: true 
      });
      return { 
        ...prev, 
        stats: {
          ...prev.stats,
          items
        }
      };
    });
  };

  const removeStatsItem = (index) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const items = Array.isArray(prev.stats?.items) ? [...prev.stats.items] : [];
      items.splice(index, 1);
      return { 
        ...prev, 
        stats: {
          ...prev.stats,
          items
        }
      };
    });
  };

  const toggleStatsItemActive = (index) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const items = Array.isArray(prev.stats?.items) ? [...prev.stats.items] : [];
      if (items[index]) {
        items[index] = { ...items[index], isActive: !items[index].isActive };
      }
      return { 
        ...prev, 
        stats: {
          ...prev.stats,
          items
        }
      };
    });
  };

  const updateNestedArrayItem = (section, nested, index, field, value) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const items = Array.isArray(prev[section]?.[nested]) ? [...prev[section][nested]] : [];
      if (items[index]) {
        items[index] = { ...items[index], [field]: value };
      }
      return { 
        ...prev, 
        [section]: {
          ...prev[section],
          [nested]: items
        }
      };
    });
  };

  const addNestedArrayItem = (section, nested, template) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const items = Array.isArray(prev[section]?.[nested]) ? [...prev[section][nested]] : [];
      const newId = Date.now() + Math.floor(Math.random() * 1000);
      items.push({ ...template, id: newId, isActive: true });
      return { 
        ...prev, 
        [section]: {
          ...prev[section],
          [nested]: items
        }
      };
    });
  };

  const removeNestedArrayItem = (section, nested, index) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const items = Array.isArray(prev[section]?.[nested]) ? [...prev[section][nested]] : [];
      items.splice(index, 1);
      return { 
        ...prev, 
        [section]: {
          ...prev[section],
          [nested]: items
        }
      };
    });
  };

  const toggleNestedArrayItemActive = (section, nested, index) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const items = Array.isArray(prev[section]?.[nested]) ? [...prev[section][nested]] : [];
      if (items[index]) {
        items[index] = { ...items[index], isActive: !items[index].isActive };
      }
      return { 
        ...prev, 
        [section]: {
          ...prev[section],
          [nested]: items
        }
      };
    });
  };

  const updateStoryParagraph = (index, value) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const paragraphs = Array.isArray(prev.story?.paragraphs) ? [...prev.story.paragraphs] : [];
      paragraphs[index] = value;
      return { 
        ...prev, 
        story: {
          ...prev.story,
          paragraphs
        }
      };
    });
  };

  const addStoryParagraph = () => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const paragraphs = Array.isArray(prev.story?.paragraphs) ? [...prev.story.paragraphs] : [];
      paragraphs.push('');
      return { 
        ...prev, 
        story: {
          ...prev.story,
          paragraphs
        }
      };
    });
  };

  const removeStoryParagraph = (index) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const paragraphs = Array.isArray(prev.story?.paragraphs) ? [...prev.story.paragraphs] : [];
      paragraphs.splice(index, 1);
      return { 
        ...prev, 
        story: {
          ...prev.story,
          paragraphs
        }
      };
    });
  };

  // Helper to get safe array
  const getSafeArray = (data, key) => {
    if (!data) return [];
    const value = data[key];
    return Array.isArray(value) ? value : [];
  };

  if (loading) {
    return (
      <ProtectedRoute pageKey="about_management">
        <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-pink-600 mx-auto" />
            <p className="text-gray-500 mt-2">Loading about data...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const data = aboutData || DEFAULT_ABOUT_DATA;

  // Get safe arrays
  const valuesArray = getSafeArray(data, 'values');
  const milestonesArray = getSafeArray(data, 'milestones');
  const statsItemsArray = getSafeArray(data.stats || {}, 'items');
  const storyImagesArray = getSafeArray(data.story || {}, 'images');
  const trustIndicatorsArray = getSafeArray(data.story || {}, 'trustIndicators');
  const paragraphsArray = getSafeArray(data.story || {}, 'paragraphs');

  return (
    <ProtectedRoute pageKey="about_management">
      <div className="min-h-screen bg-[#f0f7fa]">
        {/* Header */}
        <div className="bg-white border-b border-pink-600/20 shadow-lg sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black truncate">
                      About Page Management
                    </h1>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 truncate">
                    Manage about page content, stats, values, milestones, and more
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handleReset}
                  disabled={resetting}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-pink-500/20 text-pink-700 rounded-lg hover:bg-pink-500/30 transition-colors border border-pink-500/20 disabled:opacity-50"
                >
                  {resetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
                  Reset
                </button>
                <button
                  onClick={fetchAboutData}
                  className="p-1.5 sm:p-2 text-gray-600 hover:bg-pink-600/10 rounded-lg transition-colors hover:text-pink-600"
                  title="Refresh"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6">
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-pink-600/20 pb-2 bg-white rounded-t-xl shadow-sm border border-pink-600/20 p-4">
              {[
                { id: 'hero', label: 'Hero Section', icon: FaImage },
                { id: 'stats', label: 'Stats', icon: FaStar },
                { id: 'story', label: 'Story', icon: FaUsers },
                { id: 'values', label: 'Values', icon: FaHeart },
                { id: 'milestones', label: 'Milestones', icon: FaTrophy },
                { id: 'cta', label: 'CTA', icon: GiSparkles },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-pink-600 text-white'
                      : 'text-gray-600 hover:bg-pink-600/10 hover:text-pink-600'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Hero Tab */}
              {activeTab === 'hero' && (
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20 p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
                    <FaImage className="w-5 h-5 text-pink-600" />
                    Hero Section Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <ImageUpload
                        imageUrl={data.hero?.image || ''}
                        onImageChange={(url) => updateField('hero', 'image', url)}
                        onImageRemove={() => updateField('hero', 'image', '')}
                        label="Main Hero Image"
                        aspectRatio="4/3"
                      />
                      <ImageUpload
                        imageUrl={data.hero?.overlayImage || ''}
                        onImageChange={(url) => updateField('hero', 'overlayImage', url)}
                        onImageRemove={() => updateField('hero', 'overlayImage', '')}
                        label="Overlay Image (Small)"
                        aspectRatio="1/1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                      <input
                        type="text"
                        value={data.hero?.badge || ''}
                        onChange={(e) => updateField('hero', 'badge', e.target.value)}
                        className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                        placeholder="About Us"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={data.hero?.title || ''}
                        onChange={(e) => updateField('hero', 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                        placeholder="Redefining Beauty"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Highlighted Text</label>
                      <input
                        type="text"
                        value={data.hero?.highlightedText || ''}
                        onChange={(e) => updateField('hero', 'highlightedText', e.target.value)}
                        className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                        placeholder="for Everyone"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={data.hero?.description || ''}
                        onChange={(e) => updateField('hero', 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none resize-none"
                        placeholder="We believe beauty is for everyone..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                        <input
                          type="text"
                          value={data.hero?.buttonText || ''}
                          onChange={(e) => updateField('hero', 'buttonText', e.target.value)}
                          className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                          placeholder="Explore Products"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                        <input
                          type="text"
                          value={data.hero?.buttonLink || ''}
                          onChange={(e) => updateField('hero', 'buttonLink', e.target.value)}
                          className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                          placeholder="/products"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
                        <input
                          type="text"
                          value={data.hero?.secondaryButtonText || ''}
                          onChange={(e) => updateField('hero', 'secondaryButtonText', e.target.value)}
                          className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                          placeholder="Get in Touch"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
                        <input
                          type="text"
                          value={data.hero?.secondaryButtonLink || ''}
                          onChange={(e) => updateField('hero', 'secondaryButtonLink', e.target.value)}
                          className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                          placeholder="/contact"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Tab */}
              {activeTab === 'stats' && (
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20 p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
                    <FaStar className="w-5 h-5 text-pink-600" />
                    Stats Section
                  </h2>
                  
                  <div className="mb-6">
                    <ImageUpload
                      imageUrl={data.stats?.backgroundImage || ''}
                      onImageChange={(url) => updateNestedField('stats', 'backgroundImage', url)}
                      onImageRemove={() => updateNestedField('stats', 'backgroundImage', '')}
                      label="Stats Background Image"
                      aspectRatio="16/9"
                    />
                    <p className="text-xs text-gray-400 mt-1">This image will appear behind the stats section</p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-md font-medium text-gray-700">Stat Items <span className="text-xs font-normal text-gray-400">(Max 4)</span></h3>
                    <button
                      type="button"
                      onClick={addStatsItem}
                      disabled={statsItemsArray.length >= 4}
                      className="px-3 py-1.5 bg-pink-600 text-white text-sm rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Stat
                    </button>
                  </div>
                  <div className="space-y-3">
                    {statsItemsArray.map((stat, index) => (
                      <div key={stat.id || index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
                              <select
                                value={stat.icon || 'FaAward'}
                                onChange={(e) => updateStatsItem(index, 'icon', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                              >
                                {STAT_ICON_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Value</label>
                              <input
                                type="text"
                                value={stat.value || ''}
                                onChange={(e) => updateStatsItem(index, 'value', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Label</label>
                              <input
                                type="text"
                                value={stat.label || ''}
                                onChange={(e) => updateStatsItem(index, 'label', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleStatsItemActive(index)}
                              className={`px-2 py-1 text-xs rounded ${stat.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                            >
                              {stat.isActive !== false ? 'Active' : 'Inactive'}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeStatsItem(index)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {statsItemsArray.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No stats added yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Story Tab */}
              {activeTab === 'story' && (
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20 p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
                    <FaUsers className="w-5 h-5 text-pink-600" />
                    Story Section
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                      <input
                        type="text"
                        value={data.story?.badge || ''}
                        onChange={(e) => updateField('story', 'badge', e.target.value)}
                        className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                        placeholder="Our Story"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={data.story?.title || ''}
                        onChange={(e) => updateField('story', 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                        placeholder="A Journey of Beauty & Trust"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">Paragraphs</label>
                        <button
                          type="button"
                          onClick={addStoryParagraph}
                          className="px-3 py-1 bg-pink-600 text-white text-sm rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" /> Add Paragraph
                        </button>
                      </div>
                      {paragraphsArray.map((paragraph, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <textarea
                            value={paragraph || ''}
                            onChange={(e) => updateStoryParagraph(index, e.target.value)}
                            rows={2}
                            className="flex-1 px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none resize-none"
                            placeholder="Enter paragraph..."
                          />
                          <button
                            type="button"
                            onClick={() => removeStoryParagraph(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {paragraphsArray.length === 0 && (
                        <p className="text-gray-500 text-center py-2">No paragraphs added yet.</p>
                      )}
                    </div>

                    {/* Trust Indicators */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">Trust Indicators</label>
                        <button
                          type="button"
                          onClick={() => addNestedArrayItem('story', 'trustIndicators', { icon: 'FaCheckCircle', label: 'New Indicator' })}
                          className="px-3 py-1 bg-pink-600 text-white text-sm rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" /> Add Indicator
                        </button>
                      </div>
                      {trustIndicatorsArray.map((indicator, index) => (
                        <div key={indicator.id || index} className="flex items-center gap-3 mb-2">
                          <div className="flex-1 grid grid-cols-2 gap-3">
                            <select
                              value={indicator.icon || 'FaCheckCircle'}
                              onChange={(e) => updateNestedArrayItem('story', 'trustIndicators', index, 'icon', e.target.value)}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                            >
                              {TRUST_ICON_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                            <input
                              type="text"
                              value={indicator.label || ''}
                              onChange={(e) => updateNestedArrayItem('story', 'trustIndicators', index, 'label', e.target.value)}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                              placeholder="Indicator label"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeNestedArrayItem('story', 'trustIndicators', index)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Story Images */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">Story Images</label>
                        <button
                          type="button"
                          onClick={() => addNestedArrayItem('story', 'images', { src: '', alt: 'Story image' })}
                          className="px-3 py-1 bg-pink-600 text-white text-sm rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" /> Add Image
                        </button>
                      </div>
                      {storyImagesArray.map((image, index) => (
                        <div key={image.id || index} className="border border-gray-200 rounded-lg p-4 mb-3">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 grid grid-cols-1 gap-3">
                              <ImageUpload
                                imageUrl={image.src || ''}
                                onImageChange={(url) => updateNestedArrayItem('story', 'images', index, 'src', url)}
                                onImageRemove={() => updateNestedArrayItem('story', 'images', index, 'src', '')}
                                label={`Image ${index + 1}`}
                                aspectRatio="4/3"
                              />
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Alt Text</label>
                                <input
                                  type="text"
                                  value={image.alt || ''}
                                  onChange={(e) => updateNestedArrayItem('story', 'images', index, 'alt', e.target.value)}
                                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                                  placeholder="Image description"
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => toggleNestedArrayItemActive('story', 'images', index)}
                                className={`px-2 py-1 text-xs rounded ${image.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                              >
                                {image.isActive !== false ? 'Active' : 'Inactive'}
                              </button>
                              <button
                                type="button"
                                onClick={() => removeNestedArrayItem('story', 'images', index)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {storyImagesArray.length === 0 && (
                        <p className="text-gray-500 text-center py-4">No story images added yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Values Tab */}
              {activeTab === 'values' && (
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      <FaHeart className="w-5 h-5 text-pink-600" />
                      Core Values <span className="text-xs font-normal text-gray-400">(Max 4)</span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => addArrayItem('values', { icon: 'FaHeart', title: 'New Value', description: 'Description' })}
                      disabled={valuesArray.length >= 4}
                      className="px-3 py-1.5 bg-pink-600 text-white text-sm rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Value
                    </button>
                  </div>
                  <div className="space-y-3">
                    {valuesArray.map((value, index) => (
                      <div key={value.id || index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
                              <select
                                value={value.icon || 'FaHeart'}
                                onChange={(e) => updateArrayItem('values', index, 'icon', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                              >
                                {VALUE_ICON_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                              <input
                                type="text"
                                value={value.title || ''}
                                onChange={(e) => updateArrayItem('values', index, 'title', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                              <textarea
                                value={value.description || ''}
                                onChange={(e) => updateArrayItem('values', index, 'description', e.target.value)}
                                rows={2}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none resize-none"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleArrayItemActive('values', index)}
                              className={`px-2 py-1 text-xs rounded ${value.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                            >
                              {value.isActive !== false ? 'Active' : 'Inactive'}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeArrayItem('values', index)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {valuesArray.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No values added yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Milestones Tab */}
              {activeTab === 'milestones' && (
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      <FaTrophy className="w-5 h-5 text-pink-600" />
                      Milestones
                    </h2>
                    <button
                      type="button"
                      onClick={() => addArrayItem('milestones', { year: '2024', title: 'New Milestone', description: 'Description', icon: 'FaRocket' })}
                      className="px-3 py-1.5 bg-pink-600 text-white text-sm rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Milestone
                    </button>
                  </div>
                  <div className="space-y-3">
                    {milestonesArray.map((milestone, index) => (
                      <div key={milestone.id || index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
                              <input
                                type="text"
                                value={milestone.year || ''}
                                onChange={(e) => updateArrayItem('milestones', index, 'year', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                                placeholder="2024"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
                              <select
                                value={milestone.icon || 'FaRocket'}
                                onChange={(e) => updateArrayItem('milestones', index, 'icon', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                              >
                                {MILESTONE_ICON_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                              <input
                                type="text"
                                value={milestone.title || ''}
                                onChange={(e) => updateArrayItem('milestones', index, 'title', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                              <textarea
                                value={milestone.description || ''}
                                onChange={(e) => updateArrayItem('milestones', index, 'description', e.target.value)}
                                rows={2}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none resize-none"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleArrayItemActive('milestones', index)}
                              className={`px-2 py-1 text-xs rounded ${milestone.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                            >
                              {milestone.isActive !== false ? 'Active' : 'Inactive'}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeArrayItem('milestones', index)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {milestonesArray.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No milestones added yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* CTA Tab - Fixed */}
              {activeTab === 'cta' && (
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20 p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
                    <GiSparkles className="w-5 h-5 text-pink-600" />
                    CTA Section
                  </h2>
                  <div className="space-y-4">
                    {/* <ImageUpload
                      imageUrl={data.cta?.image || ''}
                      onImageChange={(url) => updateField('cta', 'image', url)}
                      onImageRemove={() => updateField('cta', 'image', '')}
                      label="CTA Background Image"
                      aspectRatio="16/9"
                    /> */}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={data.cta?.title || ''}
                        onChange={(e) => updateField('cta', 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                        placeholder="Ready to Start Your Beauty Journey?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={data.cta?.description || ''}
                        onChange={(e) => updateField('cta', 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none resize-none"
                        placeholder="Explore our curated collection..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                        <input
                          type="text"
                          value={data.cta?.buttonText || ''}
                          onChange={(e) => updateField('cta', 'buttonText', e.target.value)}
                          className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                          placeholder="Shop Now"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                        <input
                          type="text"
                          value={data.cta?.buttonLink || ''}
                          onChange={(e) => updateField('cta', 'buttonLink', e.target.value)}
                          className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                          placeholder="/products"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
                        <input
                          type="text"
                          value={data.cta?.secondaryButtonText || ''}
                          onChange={(e) => updateField('cta', 'secondaryButtonText', e.target.value)}
                          className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                          placeholder="Contact Us"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
                        <input
                          type="text"
                          value={data.cta?.secondaryButtonLink || ''}
                          onChange={(e) => updateField('cta', 'secondaryButtonLink', e.target.value)}
                          className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                          placeholder="/contact"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-pink-600/20">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save About Page</span>
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