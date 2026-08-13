// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Save,
//   ArrowLeft,
//   Loader2,
//   Plus,
//   X,
//   Trash2,
//   RefreshCw,
//   GripVertical,
//   MoveUp,
//   MoveDown,
//   CheckCircle,
//   XCircle,
//   ChevronDown,
//   ChevronUp,
//   Zap,
//   Shield,
//   Users,
//   Star,
//   Clock,
//   Award,
//   Truck,
//   Headset,
//   Phone,
//   Mail,
//   MapPin,
//   MessageCircle,
//   Globe,
//   Map,
//   Settings,
//   Upload,
//   Battery,
//   Plug,
//   Wrench,
//   Leaf,
//   Microchip,
//   Rocket,
//   Hand,
//   Sparkles,
//   Eye
// } from 'lucide-react';

// // Import Image as ImageIcon to avoid conflict
// import { Image as ImageIcon } from 'lucide-react';

// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ============================================================
// // 1. CLOUDINARY HELPER FUNCTIONS
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
//   formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'power-bank');
  
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
// // 2. IMAGE UPLOAD COMPONENT
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
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-[#0891B2] transition-colors text-sm disabled:opacity-50"
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
// // 3. ICON OPTIONS
// // ============================================================

// const STAT_ICONS = [
//   { value: 'FaUsers', label: 'Users', icon: Users },
//   { value: 'FaStar', label: 'Star', icon: Star },
//   { value: 'Award', label: 'Award', icon: Award },
//   { value: 'FaClock', label: 'Clock', icon: Clock },
//   { value: 'FaBolt', label: 'Bolt', icon: Zap },
//   { value: 'FaShield', label: 'Shield', icon: Shield },
//   { value: 'FaTruck', label: 'Truck', icon: Truck },
//   { value: 'FaHeadset', label: 'Headset', icon: Headset },
// ];

// const VALUE_ICONS = [
//   { value: 'FaBolt', label: 'Bolt', icon: Zap },
//   { value: 'FaShieldAlt', label: 'Shield', icon: Shield },
//   { value: 'FaBatteryFull', label: 'Battery', icon: Battery },
//   { value: 'FaUsers', label: 'Users', icon: Users },
//   { value: 'FaStar', label: 'Star', icon: Star },
//   { value: 'FaClock', label: 'Clock', icon: Clock },
//   { value: 'FaAward', label: 'Award', icon: Award },
//   { value: 'FaHands', label: 'Hands', icon: Hand },
// ];

// const FEATURE_ICONS = [
//   { value: 'FaShieldAlt', label: 'Shield', icon: Shield },
//   { value: 'FaBatteryFull', label: 'Battery', icon: Battery },
//   { value: 'FaPlug', label: 'Plug', icon: Plug },
//   { value: 'FaTools', label: 'Tools', icon: Wrench },
//   { value: 'FaLeaf', label: 'Leaf', icon: Leaf },
//   { value: 'FaGlobe', label: 'Globe', icon: Globe },
//   { value: 'FaMicrochip', label: 'Microchip', icon: Microchip },
//   { value: 'FaRocket', label: 'Rocket', icon: Rocket },
// ];

// const MILESTONE_ICONS = [
//   { value: 'FaRocket', label: 'Rocket', icon: Rocket },
//   { value: 'FaBolt', label: 'Bolt', icon: Zap },
//   { value: 'FaPlug', label: 'Plug', icon: Plug },
//   { value: 'FaUsers', label: 'Users', icon: Users },
//   { value: 'FaMicrochip', label: 'Microchip', icon: Microchip },
//   { value: 'FaAward', label: 'Award', icon: Award },
//   { value: 'FaTrophy', label: 'Trophy', icon: Star },
// ];

// // ============================================================
// // 4. ITEM COMPONENTS
// // ============================================================

// // Stat Item Component
// const StatItem = ({ stat, index, onUpdate, onRemove, onMove, isFirst, isLast }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const IconComponent = STAT_ICONS.find(i => i.value === stat.icon)?.icon || Users;

//   const handleDragStart = (e) => {
//     setIsDragging(true);
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/plain', index.toString());
//     setTimeout(() => {
//       e.target.classList.add('opacity-50');
//     }, 0);
//   };

//   const handleDragEnd = (e) => {
//     setIsDragging(false);
//     e.target.classList.remove('opacity-50');
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'move';
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
//     if (draggedIndex !== index) {
//       onMove(draggedIndex, index);
//     }
//   };

//   return (
//     <div
//       className={`bg-gray-50 rounded-lg border border-gray-200 p-4 transition-all ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
//       draggable={true}
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <div className="flex items-center gap-3">
//         <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
//           <GripVertical className="w-4 h-4" />
//         </div>
//         <div className="flex-1 grid grid-cols-4 gap-3">
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
//             <select
//               value={stat.icon}
//               onChange={(e) => onUpdate(index, { ...stat, icon: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//             >
//               {STAT_ICONS.map(icon => (
//                 <option key={icon.value} value={icon.value}>{icon.label}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Value</label>
//             <input
//               type="text"
//               value={stat.value}
//               onChange={(e) => onUpdate(index, { ...stat, value: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="50K+"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Label</label>
//             <input
//               type="text"
//               value={stat.label}
//               onChange={(e) => onUpdate(index, { ...stat, label: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="Happy Customers"
//             />
//           </div>
//           <div className="flex items-center gap-3">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={stat.isActive}
//                 onChange={(e) => onUpdate(index, { ...stat, isActive: e.target.checked })}
//                 className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
//               />
//               <span className="text-xs text-gray-700">Active</span>
//             </label>
//             <span className="text-xs text-gray-400">Order: {index + 1}</span>
//             <button
//               type="button"
//               onClick={() => onRemove(index)}
//               className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Value Item Component
// const ValueItem = ({ item, index, onUpdate, onRemove, onMove, isFirst, isLast }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const IconComponent = VALUE_ICONS.find(i => i.value === item.icon)?.icon || Zap;

//   const handleDragStart = (e) => {
//     setIsDragging(true);
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/plain', index.toString());
//     setTimeout(() => {
//       e.target.classList.add('opacity-50');
//     }, 0);
//   };

//   const handleDragEnd = (e) => {
//     setIsDragging(false);
//     e.target.classList.remove('opacity-50');
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'move';
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
//     if (draggedIndex !== index) {
//       onMove(draggedIndex, index);
//     }
//   };

//   return (
//     <div
//       className={`bg-gray-50 rounded-lg border border-gray-200 p-4 transition-all ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
//       draggable={true}
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <div className="flex items-center gap-3">
//         <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
//           <GripVertical className="w-4 h-4" />
//         </div>
//         <div className="flex-1 grid grid-cols-4 gap-3">
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
//             <select
//               value={item.icon}
//               onChange={(e) => onUpdate(index, { ...item, icon: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//             >
//               {VALUE_ICONS.map(icon => (
//                 <option key={icon.value} value={icon.value}>{icon.label}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
//             <input
//               type="text"
//               value={item.title}
//               onChange={(e) => onUpdate(index, { ...item, title: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="Innovation"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
//             <input
//               type="text"
//               value={item.description}
//               onChange={(e) => onUpdate(index, { ...item, description: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="Cutting-edge technology..."
//             />
//           </div>
//           <div className="flex items-center gap-3">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={item.isActive}
//                 onChange={(e) => onUpdate(index, { ...item, isActive: e.target.checked })}
//                 className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
//               />
//               <span className="text-xs text-gray-700">Active</span>
//             </label>
//             <button
//               type="button"
//               onClick={() => onRemove(index)}
//               className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Feature Item Component
// const FeatureItem = ({ item, index, onUpdate, onRemove, onMove, isFirst, isLast }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const IconComponent = FEATURE_ICONS.find(i => i.value === item.icon)?.icon || Shield;

//   const handleDragStart = (e) => {
//     setIsDragging(true);
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/plain', index.toString());
//     setTimeout(() => {
//       e.target.classList.add('opacity-50');
//     }, 0);
//   };

//   const handleDragEnd = (e) => {
//     setIsDragging(false);
//     e.target.classList.remove('opacity-50');
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'move';
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
//     if (draggedIndex !== index) {
//       onMove(draggedIndex, index);
//     }
//   };

//   return (
//     <div
//       className={`bg-gray-50 rounded-lg border border-gray-200 p-4 transition-all ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
//       draggable={true}
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <div className="flex items-center gap-3">
//         <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
//           <GripVertical className="w-4 h-4" />
//         </div>
//         <div className="flex-1 grid grid-cols-4 gap-3">
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
//             <select
//               value={item.icon}
//               onChange={(e) => onUpdate(index, { ...item, icon: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//             >
//               {FEATURE_ICONS.map(icon => (
//                 <option key={icon.value} value={icon.value}>{icon.label}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
//             <input
//               type="text"
//               value={item.title}
//               onChange={(e) => onUpdate(index, { ...item, title: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="Advanced Safety"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
//             <input
//               type="text"
//               value={item.description}
//               onChange={(e) => onUpdate(index, { ...item, description: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="Multi-layer protection..."
//             />
//           </div>
//           <div className="flex items-center gap-3">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={item.isActive}
//                 onChange={(e) => onUpdate(index, { ...item, isActive: e.target.checked })}
//                 className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
//               />
//               <span className="text-xs text-gray-700">Active</span>
//             </label>
//             <button
//               type="button"
//               onClick={() => onRemove(index)}
//               className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Review Item Component
// const ReviewItem = ({ item, index, onUpdate, onRemove, onMove, isFirst, isLast }) => {
//   const [isDragging, setIsDragging] = useState(false);

//   const handleDragStart = (e) => {
//     setIsDragging(true);
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/plain', index.toString());
//     setTimeout(() => {
//       e.target.classList.add('opacity-50');
//     }, 0);
//   };

//   const handleDragEnd = (e) => {
//     setIsDragging(false);
//     e.target.classList.remove('opacity-50');
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'move';
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
//     if (draggedIndex !== index) {
//       onMove(draggedIndex, index);
//     }
//   };

//   return (
//     <div
//       className={`bg-gray-50 rounded-lg border border-gray-200 p-4 transition-all ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
//       draggable={true}
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <div className="flex items-center gap-3">
//         <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
//           <GripVertical className="w-4 h-4" />
//         </div>
//         <div className="flex-1 grid grid-cols-3 gap-3">
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
//             <input
//               type="text"
//               value={item.name}
//               onChange={(e) => onUpdate(index, { ...item, name: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="Md. Rahman"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
//             <input
//               type="text"
//               value={item.role}
//               onChange={(e) => onUpdate(index, { ...item, role: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="Business Owner"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Quote</label>
//             <input
//               type="text"
//               value={item.quote}
//               onChange={(e) => onUpdate(index, { ...item, quote: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="Amazing product!"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Avatar</label>
//             <input
//               type="text"
//               value={item.avatar || ''}
//               onChange={(e) => onUpdate(index, { ...item, avatar: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="R"
//               maxLength={1}
//             />
//           </div>
//           <div className="flex items-center gap-3">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={item.isActive}
//                 onChange={(e) => onUpdate(index, { ...item, isActive: e.target.checked })}
//                 className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
//               />
//               <span className="text-xs text-gray-700">Active</span>
//             </label>
//             <button
//               type="button"
//               onClick={() => onRemove(index)}
//               className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Milestone Item Component
// const MilestoneItem = ({ item, index, onUpdate, onRemove, onMove, isFirst, isLast }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const IconComponent = MILESTONE_ICONS.find(i => i.value === item.icon)?.icon || Rocket;

//   const handleDragStart = (e) => {
//     setIsDragging(true);
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/plain', index.toString());
//     setTimeout(() => {
//       e.target.classList.add('opacity-50');
//     }, 0);
//   };

//   const handleDragEnd = (e) => {
//     setIsDragging(false);
//     e.target.classList.remove('opacity-50');
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'move';
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
//     if (draggedIndex !== index) {
//       onMove(draggedIndex, index);
//     }
//   };

//   return (
//     <div
//       className={`bg-gray-50 rounded-lg border border-gray-200 p-4 transition-all ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
//       draggable={true}
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <div className="flex items-center gap-3">
//         <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
//           <GripVertical className="w-4 h-4" />
//         </div>
//         <div className="flex-1 grid grid-cols-4 gap-3">
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
//             <select
//               value={item.icon}
//               onChange={(e) => onUpdate(index, { ...item, icon: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//             >
//               {MILESTONE_ICONS.map(icon => (
//                 <option key={icon.value} value={icon.value}>{icon.label}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
//             <input
//               type="text"
//               value={item.year}
//               onChange={(e) => onUpdate(index, { ...item, year: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="2024"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
//             <input
//               type="text"
//               value={item.title}
//               onChange={(e) => onUpdate(index, { ...item, title: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="Innovation Leader"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
//             <input
//               type="text"
//               value={item.description}
//               onChange={(e) => onUpdate(index, { ...item, description: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="Became the go-to brand..."
//             />
//           </div>
//           <div className="flex items-center gap-3">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={item.isActive}
//                 onChange={(e) => onUpdate(index, { ...item, isActive: e.target.checked })}
//                 className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
//               />
//               <span className="text-xs text-gray-700">Active</span>
//             </label>
//             <button
//               type="button"
//               onClick={() => onRemove(index)}
//               className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // 5. DELETE CONFIRMATION MODAL
// // ============================================================

// const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName, itemType }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-red-100">
//         <div className="p-6">
//           <div className="flex items-center gap-3 text-red-600 mb-4">
//             <Trash2 className="w-6 h-6" />
//             <h3 className="text-lg font-semibold">Delete {itemType}</h3>
//           </div>
//           <p className="text-sm text-gray-600 mb-4">
//             Are you sure you want to delete <strong className="text-blue-600">"{itemName}"</strong>? This action cannot be undone.
//           </p>
//           <div className="flex gap-3 justify-end">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-600/10 rounded-lg transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onConfirm}
//               className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
//             >
//               <Trash2 className="w-4 h-4" />
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // 6. MAIN ADMIN COMPONENT
// // ============================================================

// export default function AboutManagement() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [aboutData, setAboutData] = useState(null);
//   const [activeTab, setActiveTab] = useState('hero');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   // Fetch about data
//   useEffect(() => {
//     fetchAboutData();
//   }, []);

//   // const fetchAboutData = async () => {
//   //   setIsLoading(true);
//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     const response = await fetch('http://localhost:5000/api/admin/about', {
//   //       headers: { 'Authorization': `Bearer ${token}` }
//   //     });

//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       if (data.success && data.data) {
//   //         setAboutData(data.data);
//   //         toast.success('About data loaded successfully');
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching about data:', error);
//   //     toast.error('Failed to load about data');
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   // Update about data
  
//   const fetchAboutData = async () => {
//   setIsLoading(true);
//   try {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       toast.error('Please login first');
//       setIsLoading(false);
//       return;
//     }
    
//     // ✅ Use the /admin endpoint
//     const response = await fetch('http://localhost:5000/api/about/admin', {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });

//     console.log('📡 Response status:', response.status);

//     if (response.status === 403) {
//       const errorData = await response.json().catch(() => ({}));
//       toast.error(errorData.error || 'You do not have permission to manage about page');
//       setIsLoading(false);
//       return;
//     }

//     if (response.ok) {
//       const data = await response.json();
//       if (data.success && data.data) {
//         setAboutData(data.data);
//         toast.success('About data loaded successfully');
//       }
//     } else {
//       const errorData = await response.json().catch(() => ({}));
//       toast.error(errorData.error || 'Failed to load about data');
//     }
//   } catch (error) {
//     console.error('Error fetching about data:', error);
//     toast.error('Network error. Please try again.');
//   } finally {
//     setIsLoading(false);
//   }
// };
  
//   const updateAboutData = (section, data) => {
//     setAboutData(prev => ({
//       ...prev,
//       [section]: data
//     }));
//   };

//   // Handle submit
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setIsSubmitting(true);

//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     const response = await fetch('http://localhost:5000/api/admin/about', {
//   //       method: 'PUT',
//   //       headers: {
//   //         'Authorization': `Bearer ${token}`,
//   //         'Content-Type': 'application/json'
//   //       },
//   //       body: JSON.stringify(aboutData)
//   //     });

//   //     const data = await response.json();

//   //     if (data.success) {
//   //       toast.success('✅ About page updated successfully!');
//   //       fetchAboutData();
//   //     } else {
//   //       const errorMessage = data.error || 'Failed to update about page';
//   //       toast.error(`❌ ${errorMessage}`);
        
//   //       if (data.details && data.details.length > 0) {
//   //         data.details.forEach(detail => {
//   //           toast.warning(`📝 ${detail}`);
//   //         });
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.error('Error saving about data:', error);
//   //     toast.error('❌ Network error. Please check your connection and try again.');
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);

//   try {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       toast.error('Please login first');
//       setIsSubmitting(false);
//       return;
//     }
    
//     // ✅ Use the /admin endpoint
//     const response = await fetch('http://localhost:5000/api/about/admin', {
//       method: 'PUT',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(aboutData)
//     });

//     console.log('📡 Response status:', response.status);

//     if (response.status === 403) {
//       const errorData = await response.json().catch(() => ({}));
//       toast.error(errorData.error || 'You do not have permission to update about page');
//       setIsSubmitting(false);
//       return;
//     }

//     const data = await response.json();

//     if (data.success) {
//       toast.success('✅ About page updated successfully!');
//       fetchAboutData();
//     } else {
//       const errorMessage = data.error || 'Failed to update about page';
//       toast.error(`❌ ${errorMessage}`);
      
//       if (data.details && data.details.length > 0) {
//         data.details.forEach(detail => {
//           toast.warning(`📝 ${detail}`);
//         });
//       }
//     }
//   } catch (error) {
//     console.error('Error saving about data:', error);
//     toast.error('❌ Network error. Please check your connection and try again.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   // Reset to default
//   // const handleReset = async () => {
//   //   if (confirm('Are you sure you want to reset to default about configuration?')) {
//   //     try {
//   //       const token = localStorage.getItem('token');
//   //       const response = await fetch('http://localhost:5000/api/admin/about/reset', {
//   //         method: 'POST',
//   //         headers: { 'Authorization': `Bearer ${token}` }
//   //       });
//   //       const data = await response.json();
//   //       if (data.success) {
//   //         toast.success('About page reset to default');
//   //         fetchAboutData();
//   //       }
//   //     } catch (error) {
//   //       toast.error('Failed to reset about page');
//   //     }
//   //   }
//   // };

//   const handleReset = async () => {
//   if (confirm('Are you sure you want to reset to default about configuration?')) {
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login first');
//         return;
//       }
      
//       // ✅ Use the /admin/reset endpoint
//       const response = await fetch('http://localhost:5000/api/about/admin/reset', {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       const data = await response.json();
      
//       if (response.status === 403) {
//         toast.error('You do not have permission to reset about page');
//         return;
//       }
      
//       if (data.success) {
//         toast.success('About page reset to default');
//         fetchAboutData();
//       } else {
//         toast.error(data.error || 'Failed to reset about page');
//       }
//     } catch (error) {
//       console.error('Error resetting about:', error);
//       toast.error('Failed to reset about page');
//     }
//   }
// };

//   // Stats handlers
//   const addStat = () => {
//     const currentStats = aboutData?.stats || [];
//     if (currentStats.length >= 4) {
//       toast.error('Maximum 4 stats allowed');
//       return;
//     }
//     const newStat = {
//       icon: 'FaUsers',
//       value: '',
//       label: '',
//       displayOrder: currentStats.length,
//       isActive: true
//     };
//     updateAboutData('stats', [...currentStats, newStat]);
//   };

//   const updateStat = (index, updatedStat) => {
//     const updatedStats = [...aboutData.stats];
//     updatedStats[index] = updatedStat;
//     updateAboutData('stats', updatedStats);
//   };

//   const removeStat = (index) => {
//     const updatedStats = aboutData.stats.filter((_, i) => i !== index);
//     updateAboutData('stats', updatedStats);
//   };

//   const moveStat = (fromIndex, toIndex) => {
//     const updatedStats = [...aboutData.stats];
//     const [removed] = updatedStats.splice(fromIndex, 1);
//     updatedStats.splice(toIndex, 0, removed);
//     updatedStats.forEach((item, idx) => item.displayOrder = idx);
//     updateAboutData('stats', updatedStats);
//   };

//   // Values handlers
//   const addValue = () => {
//     const currentValues = aboutData?.values || [];
//     if (currentValues.length >= 4) {
//       toast.error('Maximum 4 values allowed');
//       return;
//     }
//     const newValue = {
//       icon: 'FaBolt',
//       title: '',
//       description: '',
//       displayOrder: currentValues.length,
//       isActive: true
//     };
//     updateAboutData('values', [...currentValues, newValue]);
//   };

//   const updateValue = (index, updatedValue) => {
//     const updatedValues = [...aboutData.values];
//     updatedValues[index] = updatedValue;
//     updateAboutData('values', updatedValues);
//   };

//   const removeValue = (index) => {
//     const updatedValues = aboutData.values.filter((_, i) => i !== index);
//     updateAboutData('values', updatedValues);
//   };

//   const moveValue = (fromIndex, toIndex) => {
//     const updatedValues = [...aboutData.values];
//     const [removed] = updatedValues.splice(fromIndex, 1);
//     updatedValues.splice(toIndex, 0, removed);
//     updatedValues.forEach((item, idx) => item.displayOrder = idx);
//     updateAboutData('values', updatedValues);
//   };

//   // Features handlers
//   const addFeature = () => {
//     const currentFeatures = aboutData?.features || [];
//     if (currentFeatures.length >= 6) {
//       toast.error('Maximum 6 features allowed');
//       return;
//     }
//     const newFeature = {
//       icon: 'FaShieldAlt',
//       title: '',
//       description: '',
//       displayOrder: currentFeatures.length,
//       isActive: true
//     };
//     updateAboutData('features', [...currentFeatures, newFeature]);
//   };

//   const updateFeature = (index, updatedFeature) => {
//     const updatedFeatures = [...aboutData.features];
//     updatedFeatures[index] = updatedFeature;
//     updateAboutData('features', updatedFeatures);
//   };

//   const removeFeature = (index) => {
//     const updatedFeatures = aboutData.features.filter((_, i) => i !== index);
//     updateAboutData('features', updatedFeatures);
//   };

//   const moveFeature = (fromIndex, toIndex) => {
//     const updatedFeatures = [...aboutData.features];
//     const [removed] = updatedFeatures.splice(fromIndex, 1);
//     updatedFeatures.splice(toIndex, 0, removed);
//     updatedFeatures.forEach((item, idx) => item.displayOrder = idx);
//     updateAboutData('features', updatedFeatures);
//   };

//   // Reviews handlers
//   const addReview = () => {
//     const currentReviews = aboutData?.testimonials?.items || [];
//     const newReview = {
//       name: '',
//       role: '',
//       quote: '',
//       avatar: '',
//       rating: 5,
//       displayOrder: currentReviews.length,
//       isActive: true
//     };
//     updateAboutData('testimonials', {
//       ...aboutData.testimonials,
//       items: [...currentReviews, newReview]
//     });
//   };

//   const updateReview = (index, updatedReview) => {
//     const updatedReviews = [...aboutData.testimonials.items];
//     updatedReviews[index] = updatedReview;
//     updateAboutData('testimonials', {
//       ...aboutData.testimonials,
//       items: updatedReviews
//     });
//   };

//   const removeReview = (index) => {
//     const updatedReviews = aboutData.testimonials.items.filter((_, i) => i !== index);
//     updateAboutData('testimonials', {
//       ...aboutData.testimonials,
//       items: updatedReviews
//     });
//   };

//   const moveReview = (fromIndex, toIndex) => {
//     const updatedReviews = [...aboutData.testimonials.items];
//     const [removed] = updatedReviews.splice(fromIndex, 1);
//     updatedReviews.splice(toIndex, 0, removed);
//     updatedReviews.forEach((item, idx) => item.displayOrder = idx);
//     updateAboutData('testimonials', {
//       ...aboutData.testimonials,
//       items: updatedReviews
//     });
//   };

//   // Milestones handlers
//   const addMilestone = () => {
//     const currentMilestones = aboutData?.milestones?.items || [];
//     const newMilestone = {
//       year: '',
//       title: '',
//       description: '',
//       icon: 'FaRocket',
//       displayOrder: currentMilestones.length,
//       isActive: true
//     };
//     updateAboutData('milestones', {
//       ...aboutData.milestones,
//       items: [...currentMilestones, newMilestone]
//     });
//   };

//   const updateMilestone = (index, updatedMilestone) => {
//     const updatedMilestones = [...aboutData.milestones.items];
//     updatedMilestones[index] = updatedMilestone;
//     updateAboutData('milestones', {
//       ...aboutData.milestones,
//       items: updatedMilestones
//     });
//   };

//   const removeMilestone = (index) => {
//     const updatedMilestones = aboutData.milestones.items.filter((_, i) => i !== index);
//     updateAboutData('milestones', {
//       ...aboutData.milestones,
//       items: updatedMilestones
//     });
//   };

//   const moveMilestone = (fromIndex, toIndex) => {
//     const updatedMilestones = [...aboutData.milestones.items];
//     const [removed] = updatedMilestones.splice(fromIndex, 1);
//     updatedMilestones.splice(toIndex, 0, removed);
//     updatedMilestones.forEach((item, idx) => item.displayOrder = idx);
//     updateAboutData('milestones', {
//       ...aboutData.milestones,
//       items: updatedMilestones
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
//           <p className="text-gray-500 mt-2">Loading about data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!aboutData) {
//     return null;
//   }

//   const { hero, aboutUs, stats, mission, vision, values, features, testimonials, milestones, cta } = aboutData;

//   return (
//     <ProtectedRoute pageKey="about_management">
//     <div className="min-h-screen bg-[#f0f7fa]">
//       <DeleteConfirmModal
//         isOpen={showDeleteModal}
//         onClose={() => {
//           setShowDeleteModal(false);
//           setDeleteTarget(null);
//         }}
//         onConfirm={() => {
//           if (deleteTarget) {
//             const { type, index } = deleteTarget;
//             if (type === 'stat') removeStat(index);
//             else if (type === 'value') removeValue(index);
//             else if (type === 'feature') removeFeature(index);
//             else if (type === 'review') removeReview(index);
//             else if (type === 'milestone') removeMilestone(index);
//             setShowDeleteModal(false);
//             setDeleteTarget(null);
//             toast.success('Item deleted successfully');
//           }
//         }}
//         itemName={deleteTarget?.name || ''}
//         itemType={deleteTarget?.type || ''}
//       />

//       {/* Header */}
//       <div className="bg-[#004767] border-b border-blue-600/20 shadow-lg sticky top-0 z-10">
//         <div className="px-4 sm:px-6 py-3 sm:py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div className="flex items-center gap-2 sm:gap-4">
//               <Link href="/authorize/dashboard" className="p-1.5 sm:p-2 hover:bg-blue-600/20 rounded-lg transition-colors flex-shrink-0">
//                 <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 hover:text-white" />
//               </Link>
//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
//                   <div className="flex items-center gap-2">
//                     <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
//                     <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
//                       About Page Management
//                     </h1>
//                   </div>
//                   <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-600/20 text-blue-600 text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap">
//                     HyperVolt
//                   </span>
//                 </div>
//                 <p className="text-xs sm:text-sm text-white/70 mt-0.5 sm:mt-1 truncate">
//                   Manage about page content, stats, values, features, and more
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
//               <button
//                 onClick={handleReset}
//                 className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/20"
//               >
//                 <RefreshCw className="w-4 h-4" />
//                 Reset
//               </button>
//               <button
//                 onClick={fetchAboutData}
//                 className="p-1.5 sm:p-2 text-white/70 hover:bg-blue-600/20 rounded-lg transition-colors hover:text-white"
//                 title="Refresh"
//               >
//                 <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-4 sm:p-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Tabs */}
//           <div className="flex flex-wrap gap-2 border-b border-blue-600/20 pb-2 bg-white rounded-t-xl shadow-sm border border-blue-600/20 p-4">
//             {[
//               { id: 'hero', label: 'Hero Section', icon: ImageIcon },
//               { id: 'aboutUs', label: 'About Us', icon: Users },
//               { id: 'stats', label: 'Stats', icon: Star },
//               { id: 'mission', label: 'Mission', icon: Rocket },
//               { id: 'vision', label: 'Vision', icon: Eye },
//               { id: 'values', label: 'Values', icon: Shield },
//               { id: 'features', label: 'Features', icon: Settings },
//               { id: 'testimonials', label: 'Testimonials', icon: MessageCircle },
//               { id: 'milestones', label: 'Milestones', icon: Award },
//               { id: 'cta', label: 'CTA', icon: Zap },
//             ].map(tab => (
//               <button
//                 key={tab.id}
//                 type="button"
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   activeTab === tab.id
//                     ? 'bg-blue-600 text-[#004767]'
//                     : 'text-gray-600 hover:bg-blue-600/10 hover:text-[#004767]'
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <tab.icon className="w-4 h-4" />
//                   {tab.label}
//                 </div>
//               </button>
//             ))}
//           </div>

//           {/* Tab Content */}
//           <div className="space-y-6">
//             {/* Hero Section Tab */}
//             {activeTab === 'hero' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                 <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
//                   <ImageIcon className="w-5 h-5 text-blue-600" />
//                   Hero Section Settings
//                 </h2>
//                 <div className="grid grid-cols-1 gap-4">
//                   <ImageUpload
//                     imageUrl={hero.image || ''}
//                     onImageChange={(url) => updateAboutData('hero', { ...hero, image: url })}
//                     onImageRemove={() => updateAboutData('hero', { ...hero, image: '' })}
//                     label="Hero Image"
//                     aspectRatio="16/9"
//                   />
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
//                     <input
//                       type="text"
//                       value={hero.badge || ''}
//                       onChange={(e) => updateAboutData('hero', { ...hero, badge: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="About HyperVolt"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                     <input
//                       type="text"
//                       value={hero.title || ''}
//                       onChange={(e) => updateAboutData('hero', { ...hero, title: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Powering Your"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Highlight Text</label>
//                     <input
//                       type="text"
//                       value={hero.highlightText || ''}
//                       onChange={(e) => updateAboutData('hero', { ...hero, highlightText: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="World, Every Day"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                     <textarea
//                       value={hero.description || ''}
//                       onChange={(e) => updateAboutData('hero', { ...hero, description: e.target.value })}
//                       rows={3}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40 resize-none"
//                       placeholder="We're on a mission to deliver..."
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
//                       <input
//                         type="text"
//                         value={hero.buttonText || ''}
//                         onChange={(e) => updateAboutData('hero', { ...hero, buttonText: e.target.value })}
//                         className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                         placeholder="Explore Products"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
//                       <input
//                         type="text"
//                         value={hero.buttonLink || ''}
//                         onChange={(e) => updateAboutData('hero', { ...hero, buttonLink: e.target.value })}
//                         className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                         placeholder="/products"
//                       />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
//                       <input
//                         type="text"
//                         value={hero.secondaryButtonText || ''}
//                         onChange={(e) => updateAboutData('hero', { ...hero, secondaryButtonText: e.target.value })}
//                         className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                         placeholder="Get in Touch"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
//                       <input
//                         type="text"
//                         value={hero.secondaryButtonLink || ''}
//                         onChange={(e) => updateAboutData('hero', { ...hero, secondaryButtonLink: e.target.value })}
//                         className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                         placeholder="/contact"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* About Us Tab */}
//             {activeTab === 'aboutUs' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                 <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
//                   <Users className="w-5 h-5 text-blue-600" />
//                   About Us Section
//                 </h2>
//                 <div className="grid grid-cols-1 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
//                     <input
//                       type="text"
//                       value={aboutUs.badge || ''}
//                       onChange={(e) => updateAboutData('aboutUs', { ...aboutUs, badge: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="About Us"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                     <input
//                       type="text"
//                       value={aboutUs.title || ''}
//                       onChange={(e) => updateAboutData('aboutUs', { ...aboutUs, title: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Empowering Lives Through Power"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Highlight Text</label>
//                     <input
//                       type="text"
//                       value={aboutUs.highlightText || ''}
//                       onChange={(e) => updateAboutData('aboutUs', { ...aboutUs, highlightText: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Power"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                     <textarea
//                       value={aboutUs.description || ''}
//                       onChange={(e) => updateAboutData('aboutUs', { ...aboutUs, description: e.target.value })}
//                       rows={4}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40 resize-none"
//                       placeholder="HyperVolt is dedicated to providing..."
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Stats Tab */}
//             {activeTab === 'stats' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                       <Star className="w-5 h-5 text-blue-600" />
//                       Stats <span className="text-xs font-normal text-gray-400">(Max 4)</span>
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">Manage the stats displayed on the hero section</p>
//                   </div>
//                   {stats.length < 4 && (
//                     <button
//                       type="button"
//                       onClick={addStat}
//                       className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-[#004767] rounded-lg hover:bg-[#0891B2] transition-colors text-sm font-semibold"
//                     >
//                       <Plus className="w-4 h-4" />
//                       Add Stat
//                     </button>
//                   )}
//                 </div>
//                 <div className="space-y-3">
//                   {stats.map((stat, index) => (
//                     <StatItem
//                       key={index}
//                       stat={stat}
//                       index={index}
//                       onUpdate={updateStat}
//                       onRemove={(idx) => {
//                         setDeleteTarget({ type: 'stat', index: idx, name: stat.label || 'Stat' });
//                         setShowDeleteModal(true);
//                       }}
//                       onMove={moveStat}
//                       isFirst={index === 0}
//                       isLast={index === stats.length - 1}
//                     />
//                   ))}
//                 </div>
//                 {stats.length === 0 && (
//                   <div className="text-center py-8 text-gray-500">
//                     <Star className="w-8 h-8 mx-auto mb-2 text-gray-300" />
//                     <p>No stats added</p>
//                     <p className="text-sm">Add up to 4 stats</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Mission Tab */}
//             {activeTab === 'mission' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                 <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
//                   <Rocket className="w-5 h-5 text-blue-600" />
//                   Mission Section
//                 </h2>
//                 <div className="grid grid-cols-1 gap-4">
//                   <ImageUpload
//                     imageUrl={mission.image || ''}
//                     onImageChange={(url) => updateAboutData('mission', { ...mission, image: url })}
//                     onImageRemove={() => updateAboutData('mission', { ...mission, image: '' })}
//                     label="Main Image"
//                     aspectRatio="16/9"
//                   />
//                   <ImageUpload
//                     imageUrl={mission.overlayImage || ''}
//                     onImageChange={(url) => updateAboutData('mission', { ...mission, overlayImage: url })}
//                     onImageRemove={() => updateAboutData('mission', { ...mission, overlayImage: '' })}
//                     label="Overlay Image"
//                     aspectRatio="16/9"
//                   />
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
//                     <input
//                       type="text"
//                       value={mission.badge || ''}
//                       onChange={(e) => updateAboutData('mission', { ...mission, badge: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Our Mission"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                     <input
//                       type="text"
//                       value={mission.title || ''}
//                       onChange={(e) => updateAboutData('mission', { ...mission, title: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Powering Possibilities"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Highlight Text</label>
//                     <input
//                       type="text"
//                       value={mission.highlightText || ''}
//                       onChange={(e) => updateAboutData('mission', { ...mission, highlightText: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Possibilities"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                     <textarea
//                       value={mission.description || ''}
//                       onChange={(e) => updateAboutData('mission', { ...mission, description: e.target.value })}
//                       rows={3}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40 resize-none"
//                       placeholder="Our mission is to make reliable portable power..."
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Points (one per line)</label>
//                     <textarea
//                       value={mission.points ? mission.points.join('\n') : ''}
//                       onChange={(e) => updateAboutData('mission', { ...mission, points: e.target.value.split('\n').filter(p => p.trim()) })}
//                       rows={4}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40 resize-none"
//                       placeholder="Provide innovative charging solutions&#10;Ensure uncompromised safety and quality&#10;Deliver exceptional customer experience&#10;Drive sustainable practices"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Vision Tab */}
//             {activeTab === 'vision' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                 <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
//                   <Eye className="w-5 h-5 text-blue-600" />
//                   Vision Section
//                 </h2>
//                 <div className="grid grid-cols-1 gap-4">
//                   <ImageUpload
//                     imageUrl={vision.image || ''}
//                     onImageChange={(url) => updateAboutData('vision', { ...vision, image: url })}
//                     onImageRemove={() => updateAboutData('vision', { ...vision, image: '' })}
//                     label="Main Image"
//                     aspectRatio="16/9"
//                   />
//                   <ImageUpload
//                     imageUrl={vision.overlayImage || ''}
//                     onImageChange={(url) => updateAboutData('vision', { ...vision, overlayImage: url })}
//                     onImageRemove={() => updateAboutData('vision', { ...vision, overlayImage: '' })}
//                     label="Overlay Image"
//                     aspectRatio="16/9"
//                   />
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
//                     <input
//                       type="text"
//                       value={vision.badge || ''}
//                       onChange={(e) => updateAboutData('vision', { ...vision, badge: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Our Vision"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                     <input
//                       type="text"
//                       value={vision.title || ''}
//                       onChange={(e) => updateAboutData('vision', { ...vision, title: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="A World Connected"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Highlight Text</label>
//                     <input
//                       type="text"
//                       value={vision.highlightText || ''}
//                       onChange={(e) => updateAboutData('vision', { ...vision, highlightText: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Connected"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                     <textarea
//                       value={vision.description || ''}
//                       onChange={(e) => updateAboutData('vision', { ...vision, description: e.target.value })}
//                       rows={3}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40 resize-none"
//                       placeholder="We envision a world where everyone has access..."
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Points (one per line)</label>
//                     <textarea
//                       value={vision.points ? vision.points.join('\n') : ''}
//                       onChange={(e) => updateAboutData('vision', { ...vision, points: e.target.value.split('\n').filter(p => p.trim()) })}
//                       rows={4}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40 resize-none"
//                       placeholder="Become the most trusted power brand in Bangladesh&#10;Lead innovation in charging technology&#10;Create sustainable power solutions&#10;Build a community of empowered users"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Values Tab */}
//             {activeTab === 'values' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                       <Shield className="w-5 h-5 text-blue-600" />
//                       Values <span className="text-xs font-normal text-gray-400">(Max 4)</span>
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">Manage the core values displayed on the about page</p>
//                   </div>
//                   {values.length < 4 && (
//                     <button
//                       type="button"
//                       onClick={addValue}
//                       className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-[#004767] rounded-lg hover:bg-[#0891B2] transition-colors text-sm font-semibold"
//                     >
//                       <Plus className="w-4 h-4" />
//                       Add Value
//                     </button>
//                   )}
//                 </div>
//                 <div className="space-y-3">
//                   {values.map((item, index) => (
//                     <ValueItem
//                       key={index}
//                       item={item}
//                       index={index}
//                       onUpdate={updateValue}
//                       onRemove={(idx) => {
//                         setDeleteTarget({ type: 'value', index: idx, name: item.title || 'Value' });
//                         setShowDeleteModal(true);
//                       }}
//                       onMove={moveValue}
//                       isFirst={index === 0}
//                       isLast={index === values.length - 1}
//                     />
//                   ))}
//                 </div>
//                 {values.length === 0 && (
//                   <div className="text-center py-8 text-gray-500">
//                     <Shield className="w-8 h-8 mx-auto mb-2 text-gray-300" />
//                     <p>No values added</p>
//                     <p className="text-sm">Add up to 4 values</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Features Tab */}
//             {activeTab === 'features' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                       <Settings className="w-5 h-5 text-blue-600" />
//                       Features <span className="text-xs font-normal text-gray-400">(Max 6)</span>
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">Manage the features displayed on the about page</p>
//                   </div>
//                   {features.length < 6 && (
//                     <button
//                       type="button"
//                       onClick={addFeature}
//                       className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-[#004767] rounded-lg hover:bg-[#0891B2] transition-colors text-sm font-semibold"
//                     >
//                       <Plus className="w-4 h-4" />
//                       Add Feature
//                     </button>
//                   )}
//                 </div>
//                 <div className="space-y-3">
//                   {features.map((item, index) => (
//                     <FeatureItem
//                       key={index}
//                       item={item}
//                       index={index}
//                       onUpdate={updateFeature}
//                       onRemove={(idx) => {
//                         setDeleteTarget({ type: 'feature', index: idx, name: item.title || 'Feature' });
//                         setShowDeleteModal(true);
//                       }}
//                       onMove={moveFeature}
//                       isFirst={index === 0}
//                       isLast={index === features.length - 1}
//                     />
//                   ))}
//                 </div>
//                 {features.length === 0 && (
//                   <div className="text-center py-8 text-gray-500">
//                     <Settings className="w-8 h-8 mx-auto mb-2 text-gray-300" />
//                     <p>No features added</p>
//                     <p className="text-sm">Add up to 6 features</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Testimonials Tab */}
//             {activeTab === 'testimonials' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                       <MessageCircle className="w-5 h-5 text-blue-600" />
//                       Testimonials
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">Manage customer testimonials</p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={addReview}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-[#004767] rounded-lg hover:bg-[#0891B2] transition-colors text-sm font-semibold"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Testimonial
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-1 gap-4 mb-4">
//                   <ImageUpload
//                     imageUrl={testimonials.bgImage || ''}
//                     onImageChange={(url) => updateAboutData('testimonials', { ...testimonials, bgImage: url })}
//                     onImageRemove={() => updateAboutData('testimonials', { ...testimonials, bgImage: '' })}
//                     label="Background Image"
//                     aspectRatio="16/9"
//                   />
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
//                     <input
//                       type="text"
//                       value={testimonials.badge || ''}
//                       onChange={(e) => updateAboutData('testimonials', { ...testimonials, badge: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Testimonials"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                     <input
//                       type="text"
//                       value={testimonials.title || ''}
//                       onChange={(e) => updateAboutData('testimonials', { ...testimonials, title: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="What Our Customers Say"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Highlight Text</label>
//                     <input
//                       type="text"
//                       value={testimonials.highlightText || ''}
//                       onChange={(e) => updateAboutData('testimonials', { ...testimonials, highlightText: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Customers Say"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                     <input
//                       type="text"
//                       value={testimonials.description || ''}
//                       onChange={(e) => updateAboutData('testimonials', { ...testimonials, description: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Real stories from real customers..."
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   {testimonials.items.map((item, index) => (
//                     <ReviewItem
//                       key={index}
//                       item={item}
//                       index={index}
//                       onUpdate={updateReview}
//                       onRemove={(idx) => {
//                         setDeleteTarget({ type: 'review', index: idx, name: item.name || 'Review' });
//                         setShowDeleteModal(true);
//                       }}
//                       onMove={moveReview}
//                       isFirst={index === 0}
//                       isLast={index === testimonials.items.length - 1}
//                     />
//                   ))}
//                 </div>
//                 {testimonials.items.length === 0 && (
//                   <div className="text-center py-8 text-gray-500">
//                     <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
//                     <p>No testimonials added</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Milestones Tab */}
//             {activeTab === 'milestones' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                       <Award className="w-5 h-5 text-blue-600" />
//                       Milestones
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">Manage company milestones</p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={addMilestone}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-[#004767] rounded-lg hover:bg-[#0891B2] transition-colors text-sm font-semibold"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Milestone
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-1 gap-4 mb-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
//                     <input
//                       type="text"
//                       value={milestones.badge || ''}
//                       onChange={(e) => updateAboutData('milestones', { ...milestones, badge: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Our Journey"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                     <input
//                       type="text"
//                       value={milestones.title || ''}
//                       onChange={(e) => updateAboutData('milestones', { ...milestones, title: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Milestones"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                     <input
//                       type="text"
//                       value={milestones.description || ''}
//                       onChange={(e) => updateAboutData('milestones', { ...milestones, description: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Every step has been a powerful journey."
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   {milestones.items.map((item, index) => (
//                     <MilestoneItem
//                       key={index}
//                       item={item}
//                       index={index}
//                       onUpdate={updateMilestone}
//                       onRemove={(idx) => {
//                         setDeleteTarget({ type: 'milestone', index: idx, name: item.title || 'Milestone' });
//                         setShowDeleteModal(true);
//                       }}
//                       onMove={moveMilestone}
//                       isFirst={index === 0}
//                       isLast={index === milestones.items.length - 1}
//                     />
//                   ))}
//                 </div>
//                 {milestones.items.length === 0 && (
//                   <div className="text-center py-8 text-gray-500">
//                     <Award className="w-8 h-8 mx-auto mb-2 text-gray-300" />
//                     <p>No milestones added</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* CTA Tab */}
//             {activeTab === 'cta' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
//                 <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
//                   <Zap className="w-5 h-5 text-blue-600" />
//                   Call to Action Settings
//                 </h2>
//                 <div className="grid grid-cols-1 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                     <input
//                       type="text"
//                       value={cta.title || ''}
//                       onChange={(e) => updateAboutData('cta', { ...cta, title: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                       placeholder="Ready to Power Your World?"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                     <textarea
//                       value={cta.description || ''}
//                       onChange={(e) => updateAboutData('cta', { ...cta, description: e.target.value })}
//                       rows={2}
//                       className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40 resize-none"
//                       placeholder="Explore our collection of premium power solutions."
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
//                       <input
//                         type="text"
//                         value={cta.buttonText || ''}
//                         onChange={(e) => updateAboutData('cta', { ...cta, buttonText: e.target.value })}
//                         className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                         placeholder="Shop Now"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
//                       <input
//                         type="text"
//                         value={cta.buttonLink || ''}
//                         onChange={(e) => updateAboutData('cta', { ...cta, buttonLink: e.target.value })}
//                         className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                         placeholder="/products"
//                       />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
//                       <input
//                         type="text"
//                         value={cta.secondaryButtonText || ''}
//                         onChange={(e) => updateAboutData('cta', { ...cta, secondaryButtonText: e.target.value })}
//                         className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                         placeholder="Contact Us"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
//                       <input
//                         type="text"
//                         value={cta.secondaryButtonLink || ''}
//                         onChange={(e) => updateAboutData('cta', { ...cta, secondaryButtonLink: e.target.value })}
//                         className="w-full px-3 py-2 text-sm border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-600/40"
//                         placeholder="/contact"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end pt-4 border-t border-blue-600/20">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-[#004767] text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   <span>Saving...</span>
//                 </>
//               ) : (
//                 <>
//                   <Save className="w-4 h-4" />
//                   <span>Save About Page</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     </ProtectedRoute>
//   );
// }

// app/admin/about/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Save, 
  RotateCcw, 
  Loader2,
  Shield,
  Truck,
  Headphones,
  Users,
  Star,
  Award,
  Clock,
  Globe,
  Zap,
  Package,
  Heart,
  Sparkles,
  Target,
  Eye,
  TrendingUp,
  Plus,
  Trash2,
  GripVertical,
  ArrowLeft,
  Upload,
  X,
  Image as ImageIcon
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { toast } from 'sonner';

// ============================================================
// CLOUDINARY HELPER FUNCTIONS
// ============================================================

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

// ============================================================
// IMAGE UPLOAD COMPONENT
// ============================================================

const ImageUpload = ({ imageUrl, onImageChange, onImageRemove, label = 'Image', aspectRatio = '16/9' }) => {
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
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {preview ? (
        <div className="relative inline-block">
          <div className={`rounded-lg overflow-hidden border-2 border-blue-600/30 bg-gray-100`}
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
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
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
// ICON OPTIONS
// ============================================================

const ICON_OPTIONS = [
  { value: 'Shield', label: 'Shield' },
  { value: 'Truck', label: 'Truck' },
  { value: 'Headphones', label: 'Headphones' },
  { value: 'Users', label: 'Users' },
  { value: 'Star', label: 'Star' },
  { value: 'Award', label: 'Award' },
  { value: 'Clock', label: 'Clock' },
  { value: 'Globe', label: 'Globe' },
  { value: 'Zap', label: 'Zap' },
  { value: 'Package', label: 'Package' },
  { value: 'Heart', label: 'Heart' },
  { value: 'Target', label: 'Target' },
  { value: 'Eye', label: 'Eye' },
  { value: 'TrendingUp', label: 'TrendingUp' }
];

// ============================================================
// DEFAULT DATA
// ============================================================

const DEFAULT_ABOUT_DATA = {
  hero: {
    image: '',
    badge: 'About Smart Gadget',
    title: 'Trusted Tech Partner',
    description: "We're on a mission to make premium technology accessible to everyone in Bangladesh, offering authentic products with exceptional service.",
    buttonText: 'Explore Products',
    buttonLink: '/products',
    secondaryButtonText: 'Contact Us',
    secondaryButtonLink: '/contact'
  },
  mission: {
    title: 'Our Mission',
    description: 'To empower people with cutting-edge technology by providing authentic, high-quality gadgets at competitive prices, backed by exceptional customer service that builds lasting trust.'
  },
  vision: {
    title: 'Our Vision',
    description: "To become Bangladesh's most trusted tech retailer, creating a seamless bridge between global innovation and local needs, making advanced technology accessible to every household."
  },
  stats: [
    { id: 1, icon: 'Users', value: '10000', label: 'Happy Customers', suffix: '+', color: 'from-blue-500 to-blue-600', isActive: true },
    { id: 2, icon: 'Package', value: '500', label: 'Premium Products', suffix: '+', color: 'from-green-500 to-green-600', isActive: true },
    { id: 3, icon: 'Star', value: '98', label: 'Satisfaction Rate', suffix: '%', color: 'from-yellow-500 to-yellow-600', isActive: true },
    { id: 4, icon: 'Headphones', value: '24', label: '24/7 Support', suffix: '', color: 'from-purple-500 to-purple-600', isActive: true }
  ],
  values: [
    { id: 1, icon: 'Shield', title: 'Quality Assurance', description: 'Every product undergoes rigorous testing to ensure it meets our high standards before reaching your hands.', isActive: true },
    { id: 2, icon: 'Users', title: 'Customer First', description: 'Your satisfaction is our priority. We listen, adapt, and go the extra mile for every customer.', isActive: true },
    { id: 3, icon: 'Zap', title: 'Innovation Driven', description: 'We stay ahead of trends, bringing you the latest and most innovative gadgets on the market.', isActive: true },
    { id: 4, icon: 'Truck', title: 'Fast & Reliable', description: 'Quick delivery and hassle-free returns make shopping with us smooth and worry-free.', isActive: true }
  ],
  features: [
    { id: 1, icon: 'Shield', title: '100% Authentic Products', description: 'We source directly from authorized distributors to guarantee genuineness.', isActive: true },
    { id: 2, icon: 'Truck', title: 'Free & Fast Delivery', description: 'Free delivery on orders over ৳3,000 and same-day dispatch.', isActive: true },
    { id: 3, icon: 'Headphones', title: 'Expert Support', description: 'Our tech-savvy team is available 24/7 to help you choose the right product.', isActive: true },
    { id: 4, icon: 'Clock', title: 'Easy Returns', description: "Hassle-free returns within 7 days if you're not completely satisfied.", isActive: true },
    { id: 5, icon: 'Globe', title: 'Wide Selection', description: 'From premium smartphones to smart home gadgets - we have it all.', isActive: true },
    { id: 6, icon: 'TrendingUp', title: 'Best Prices', description: 'We offer competitive pricing without compromising on quality.', isActive: true }
  ],
  cta: {
    image: '',
    badge: 'Exclusive Deals',
    title: 'Ready to Upgrade Your Tech?',
    description: 'Explore our collection of premium gadgets and find the perfect match for your needs.',
    buttonText: 'Shop Now',
    buttonLink: '/products'
  },
  counters: {
    customers: 10000,
    products: 500,
    satisfaction: 98,
    support: 24
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
      
      const response = await fetch('http://localhost:5000/api/about/admin', {
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
          const mergedData = {
            hero: { ...DEFAULT_ABOUT_DATA.hero, ...result.data.hero },
            mission: { ...DEFAULT_ABOUT_DATA.mission, ...result.data.mission },
            vision: { ...DEFAULT_ABOUT_DATA.vision, ...result.data.vision },
            stats: result.data.stats || DEFAULT_ABOUT_DATA.stats,
            values: result.data.values || DEFAULT_ABOUT_DATA.values,
            features: result.data.features || DEFAULT_ABOUT_DATA.features,
            cta: { ...DEFAULT_ABOUT_DATA.cta, ...result.data.cta },
            counters: { ...DEFAULT_ABOUT_DATA.counters, ...result.data.counters }
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
        mission: aboutData.mission || DEFAULT_ABOUT_DATA.mission,
        vision: aboutData.vision || DEFAULT_ABOUT_DATA.vision,
        stats: aboutData.stats || DEFAULT_ABOUT_DATA.stats,
        values: aboutData.values || DEFAULT_ABOUT_DATA.values,
        features: aboutData.features || DEFAULT_ABOUT_DATA.features,
        cta: aboutData.cta || DEFAULT_ABOUT_DATA.cta,
        counters: aboutData.counters || DEFAULT_ABOUT_DATA.counters
      };

      const response = await fetch('http://localhost:5000/api/about/admin', {
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

      const response = await fetch('http://localhost:5000/api/about/admin/reset', {
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

  const updateArrayItem = (section, index, field, value) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const items = [...(prev[section] || [])];
      if (items[index]) {
        items[index] = { ...items[index], [field]: value };
      }
      return { ...prev, [section]: items };
    });
  };

  // ✅ FIXED: Add array item with unique ID using timestamp
  const addArrayItem = (section, template) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const items = [...(prev[section] || [])];
      
      // Generate a unique ID using timestamp + random number
      // This ensures no duplicate IDs even after deletions
      const newId = Date.now() + Math.floor(Math.random() * 1000);
      
      items.push({ 
        ...template, 
        id: newId, 
        isActive: true 
      });
      
      return { ...prev, [section]: items };
    });
  };

  const removeArrayItem = (section, index) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const items = [...(prev[section] || [])];
      items.splice(index, 1);
      return { ...prev, [section]: items };
    });
  };

  const toggleArrayItemActive = (section, index) => {
    setAboutData(prev => {
      if (!prev) return DEFAULT_ABOUT_DATA;
      const items = [...(prev[section] || [])];
      if (items[index]) {
        items[index] = { ...items[index], isActive: !items[index].isActive };
      }
      return { ...prev, [section]: items };
    });
  };

  if (loading) {
    return (
      <ProtectedRoute pageKey="about_management">
        <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
            <p className="text-gray-500 mt-2">Loading about data...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const data = aboutData || DEFAULT_ABOUT_DATA;

  return (
    <ProtectedRoute pageKey="about_management">
      <div className="min-h-screen bg-[#f0f7fa]">
        {/* Header */}
        <div className="bg-white border-b border-blue-600/20 shadow-lg sticky top-0 z-10">
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
                    Manage about page content, stats, values, features, and more
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handleReset}
                  disabled={resetting}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-500/20 text-blue-700 rounded-lg hover:bg-blue-500/30 transition-colors border border-blue-500/20 disabled:opacity-50"
                >
                  {resetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
                  Reset
                </button>
                <button
                  onClick={fetchAboutData}
                  className="p-1.5 sm:p-2 text-white/70 hover:bg-blue-600/20 rounded-lg transition-colors hover:text-white"
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
            <div className="flex flex-wrap gap-2 border-b border-blue-600/20 pb-2 bg-white rounded-t-xl shadow-sm border border-blue-600/20 p-4">
              {[
                { id: 'hero', label: 'Hero Section', icon: ImageIcon },
                { id: 'mission', label: 'Mission & Vision', icon: Target },
                { id: 'stats', label: 'Stats', icon: Star },
                { id: 'values', label: 'Values', icon: Shield },
                { id: 'features', label: 'Features', icon: Package },
                { id: 'cta', label: 'CTA', icon: Zap },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-blue-600/10 hover:text-blue-600'
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
                <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                    Hero Section Settings
                  </h2>
                  <div className="space-y-4">
                    <ImageUpload
                      imageUrl={data.hero?.image || ''}
                      onImageChange={(url) => updateField('hero', 'image', url)}
                      onImageRemove={() => updateField('hero', 'image', '')}
                      label="Hero Background Image"
                      aspectRatio="16/9"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                      <input
                        type="text"
                        value={data.hero?.badge || ''}
                        onChange={(e) => updateField('hero', 'badge', e.target.value)}
                        className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        placeholder="About Smart Gadget"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={data.hero?.title || ''}
                        onChange={(e) => updateField('hero', 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        placeholder="Trusted Tech Partner"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={data.hero?.description || ''}
                        onChange={(e) => updateField('hero', 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                        placeholder="We're on a mission to make premium technology accessible to everyone..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                        <input
                          type="text"
                          value={data.hero?.buttonText || ''}
                          onChange={(e) => updateField('hero', 'buttonText', e.target.value)}
                          className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                          placeholder="Explore Products"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                        <input
                          type="text"
                          value={data.hero?.buttonLink || ''}
                          onChange={(e) => updateField('hero', 'buttonLink', e.target.value)}
                          className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
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
                          className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                          placeholder="Contact Us"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
                        <input
                          type="text"
                          value={data.hero?.secondaryButtonLink || ''}
                          onChange={(e) => updateField('hero', 'secondaryButtonLink', e.target.value)}
                          className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                          placeholder="/contact"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mission & Vision Tab */}
              {activeTab === 'mission' && (
                <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-blue-600" />
                    Mission & Vision
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-gray-800 mb-3">Mission</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={data.mission?.title || ''}
                            onChange={(e) => updateField('mission', 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                            placeholder="Our Mission"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            value={data.mission?.description || ''}
                            onChange={(e) => updateField('mission', 'description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                            placeholder="To empower people with cutting-edge technology..."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-md font-medium text-gray-800 mb-3">Vision</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={data.vision?.title || ''}
                            onChange={(e) => updateField('vision', 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                            placeholder="Our Vision"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            value={data.vision?.description || ''}
                            onChange={(e) => updateField('vision', 'description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                            placeholder="To become Bangladesh's most trusted tech retailer..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Tab */}
              {activeTab === 'stats' && (
                <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      <Star className="w-5 h-5 text-blue-600" />
                      Stats <span className="text-xs font-normal text-gray-400">(Max 4)</span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => addArrayItem('stats', { icon: 'Users', value: '0', label: 'New Stat', suffix: '+', color: 'from-blue-500 to-blue-600' })}
                      disabled={(data.stats || []).length >= 4}
                      className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Stat
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(data.stats || []).map((stat, index) => (
                      <div key={stat.id || index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
                              <select
                                value={stat.icon || 'Users'}
                                onChange={(e) => updateArrayItem('stats', index, 'icon', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                              >
                                {ICON_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Value</label>
                              <input
                                type="text"
                                value={stat.value || ''}
                                onChange={(e) => updateArrayItem('stats', index, 'value', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Label</label>
                              <input
                                type="text"
                                value={stat.label || ''}
                                onChange={(e) => updateArrayItem('stats', index, 'label', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Suffix</label>
                              <input
                                type="text"
                                value={stat.suffix || ''}
                                onChange={(e) => updateArrayItem('stats', index, 'suffix', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleArrayItemActive('stats', index)}
                              className={`px-2 py-1 text-xs rounded ${stat.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                            >
                              {stat.isActive !== false ? 'Active' : 'Inactive'}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeArrayItem('stats', index)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(data.stats || []).length === 0 && (
                      <p className="text-gray-500 text-center py-4">No stats added yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Values Tab */}
              {activeTab === 'values' && (
                <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      Core Values <span className="text-xs font-normal text-gray-400">(Max 4)</span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => addArrayItem('values', { icon: 'Shield', title: 'New Value', description: 'Description' })}
                      disabled={(data.values || []).length >= 4}
                      className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Value
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(data.values || []).map((value, index) => (
                      <div key={value.id || index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
                              <select
                                value={value.icon || 'Shield'}
                                onChange={(e) => updateArrayItem('values', index, 'icon', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                              >
                                {ICON_OPTIONS.map(opt => (
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
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                              <textarea
                                value={value.description || ''}
                                onChange={(e) => updateArrayItem('values', index, 'description', e.target.value)}
                                rows={2}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
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
                    {(data.values || []).length === 0 && (
                      <p className="text-gray-500 text-center py-4">No values added yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && (
                <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      Features <span className="text-xs font-normal text-gray-400">(Max 6)</span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => addArrayItem('features', { icon: 'Shield', title: 'New Feature', description: 'Description' })}
                      disabled={(data.features || []).length >= 6}
                      className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Feature
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(data.features || []).map((feature, index) => (
                      <div key={feature.id || index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
                              <select
                                value={feature.icon || 'Shield'}
                                onChange={(e) => updateArrayItem('features', index, 'icon', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                              >
                                {ICON_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                              <input
                                type="text"
                                value={feature.title || ''}
                                onChange={(e) => updateArrayItem('features', index, 'title', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                              <textarea
                                value={feature.description || ''}
                                onChange={(e) => updateArrayItem('features', index, 'description', e.target.value)}
                                rows={2}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleArrayItemActive('features', index)}
                              className={`px-2 py-1 text-xs rounded ${feature.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                            >
                              {feature.isActive !== false ? 'Active' : 'Inactive'}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeArrayItem('features', index)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(data.features || []).length === 0 && (
                      <p className="text-gray-500 text-center py-4">No features added yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* CTA Tab */}
              {activeTab === 'cta' && (
                <div className="bg-white rounded-xl shadow-sm border border-blue-600/20 p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-blue-600" />
                    CTA Section
                  </h2>
                  <div className="space-y-4">
                    <ImageUpload
                      imageUrl={data.cta?.image || ''}
                      onImageChange={(url) => updateField('cta', 'image', url)}
                      onImageRemove={() => updateField('cta', 'image', '')}
                      label="CTA Background Image"
                      aspectRatio="16/9"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                      <input
                        type="text"
                        value={data.cta?.badge || ''}
                        onChange={(e) => updateField('cta', 'badge', e.target.value)}
                        className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        placeholder="Exclusive Deals"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={data.cta?.title || ''}
                        onChange={(e) => updateField('cta', 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        placeholder="Ready to Upgrade Your Tech?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={data.cta?.description || ''}
                        onChange={(e) => updateField('cta', 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                        placeholder="Explore our collection of premium gadgets and find the perfect match..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                        <input
                          type="text"
                          value={data.cta?.buttonText || ''}
                          onChange={(e) => updateField('cta', 'buttonText', e.target.value)}
                          className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                          placeholder="Shop Now"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                        <input
                          type="text"
                          value={data.cta?.buttonLink || ''}
                          onChange={(e) => updateField('cta', 'buttonLink', e.target.value)}
                          className="w-full px-3 py-2 border border-blue-600/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                          placeholder="/products"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-blue-600/20">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
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