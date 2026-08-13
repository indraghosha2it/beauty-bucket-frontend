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
//   Eye,
//   EyeOff,
//   CheckCircle,
//   XCircle,
//   ChevronDown,
//   ChevronUp,
//   Pencil,
//   Copy,
//   FileText,
//   Shield,
//   Lock,
//   Database,
//   Globe,
//   Users,
//   Store,
//   Mail,
//   Phone,
//   MapPin,
//   ClipboardList,
//   Scroll,
//   Zap,
//   User,
//   AlertTriangle,
//   Fingerprint,
//   Key
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // Icon options for sections
// const ICON_OPTIONS = [
//   { value: 'FaShieldAlt', label: 'Shield', icon: Shield },
//   { value: 'FaLock', label: 'Lock', icon: Lock },
//   { value: 'FaUserShield', label: 'User Shield', icon: User },
//   { value: 'FaDatabase', label: 'Database', icon: Database },
//   { value: 'FaGlobe', label: 'Globe', icon: Globe },
//   { value: 'FaUsers', label: 'Users', icon: Users },
//   { value: 'FaStore', label: 'Store', icon: Store },
//   { value: 'FaEnvelope', label: 'Mail', icon: Mail },
//   { value: 'FaPhone', label: 'Phone', icon: Phone },
//   { value: 'FaMapMarkerAlt', label: 'Location', icon: MapPin },
//   { value: 'FaClipboardList', label: 'Clipboard', icon: ClipboardList },
//   { value: 'FaScroll', label: 'Scroll', icon: Scroll },
// ];

// // Helper function to generate unique ID
// const generateId = () => `section_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

// // Delete Confirmation Modal
// const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, sectionTitle }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-red-100">
//         <div className="p-6">
//           <div className="flex items-center gap-3 text-red-600 mb-4">
//             <Trash2 className="w-6 h-6" />
//             <h3 className="text-lg font-semibold">Delete Section</h3>
//           </div>
//           <p className="text-sm text-gray-600 mb-4">
//             Are you sure you want to delete <strong className="text-[#06B6D4]">"{sectionTitle}"</strong>? This action cannot be undone.
//           </p>
//           <div className="flex gap-3 justify-end">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
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

// // Section Edit Modal
// const SectionEditModal = ({ isOpen, onClose, onSave, section, isEditing }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     icon: 'FaShieldAlt',
//     description: '',
//     details: [],
//     isActive: true
//   });
//   const [newDetail, setNewDetail] = useState('');

//   useEffect(() => {
//     if (section && isEditing) {
//       setFormData({
//         title: section.title || '',
//         icon: section.icon || 'FaShieldAlt',
//         description: section.description || '',
//         details: section.details || [],
//         isActive: section.isActive !== undefined ? section.isActive : true
//       });
//     } else {
//       setFormData({
//         title: '',
//         icon: 'FaShieldAlt',
//         description: '',
//         details: [],
//         isActive: true
//       });
//     }
//   }, [section, isEditing, isOpen]);

//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const addDetail = () => {
//     if (newDetail.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         details: [...prev.details, newDetail.trim()]
//       }));
//       setNewDetail('');
//     }
//   };

//   const removeDetail = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       details: prev.details.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = () => {
//     if (!formData.title.trim()) {
//       toast.error('Title is required');
//       return;
//     }
//     if (!formData.description.trim()) {
//       toast.error('Description is required');
//       return;
//     }
//     if (formData.details.length === 0) {
//       toast.error('At least one detail is required');
//       return;
//     }
//     onSave(formData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col border border-[#06B6D4]/20">
//         <div className="p-5 border-b border-[#06B6D4]/20 flex items-center justify-between bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5">
//           <h3 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//             <Shield className="w-5 h-5 text-[#06B6D4]" />
//             {isEditing ? 'Edit Privacy Section' : 'Add New Privacy Section'}
//           </h3>
//           <button onClick={onClose} className="p-1 hover:bg-[#06B6D4]/10 rounded-lg transition-colors">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-5 space-y-4">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Section Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={(e) => handleChange('title', e.target.value)}
//               placeholder="e.g., Information We Collect"
//               className="w-full px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40"
//             />
//           </div>

//           {/* Icon */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Icon
//             </label>
//             <select
//               value={formData.icon}
//               onChange={(e) => handleChange('icon', e.target.value)}
//               className="w-full px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40"
//             >
//               {ICON_OPTIONS.map(icon => (
//                 <option key={icon.value} value={icon.value}>
//                   {icon.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => handleChange('description', e.target.value)}
//               rows={3}
//               placeholder="Brief description of this privacy section..."
//               className="w-full px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40 resize-none"
//             />
//           </div>

//           {/* Details */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Details <span className="text-red-500">*</span>
//             </label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 type="text"
//                 value={newDetail}
//                 onChange={(e) => setNewDetail(e.target.value)}
//                 placeholder="Add a detail point..."
//                 className="flex-1 px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40"
//                 onKeyPress={(e) => e.key === 'Enter' && addDetail()}
//               />
//               <button
//                 type="button"
//                 onClick={addDetail}
//                 className="px-4 py-2 bg-[#06B6D4] text-white rounded-lg hover:bg-[#0891B2] transition-colors text-sm font-medium"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="space-y-2">
//               {formData.details.map((detail, index) => (
//                 <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
//                   <span className="flex-1 text-sm text-gray-700">{detail}</span>
//                   <button
//                     type="button"
//                     onClick={() => removeDetail(index)}
//                     className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             {formData.details.length === 0 && (
//               <p className="text-xs text-gray-400 mt-2">Add at least one detail point</p>
//             )}
//           </div>

//           {/* Active Status */}
//           <div className="flex items-center gap-3 pt-2">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={formData.isActive}
//                 onChange={(e) => handleChange('isActive', e.target.checked)}
//                 className="w-4 h-4 rounded border-gray-300 text-[#06B6D4] focus:ring-[#06B6D4]"
//               />
//               <span className="text-sm text-gray-700">Active</span>
//             </label>
//             <span className="text-xs text-gray-400">
//               {formData.isActive ? 'Visible on the website' : 'Hidden from the website'}
//             </span>
//           </div>
//         </div>

//         <div className="p-5 border-t border-[#06B6D4]/20 flex gap-3 justify-end bg-[#06B6D4]/5">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 text-sm font-medium text-white bg-[#06B6D4] rounded-lg hover:bg-[#0891B2] transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
//           >
//             <Save className="w-4 h-4" />
//             {isEditing ? 'Update Section' : 'Add Section'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Section Item Component
// const SectionItem = ({ section, index, onUpdate, onRemove, onMove, isFirst, isLast, onEdit }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);

//   const iconOption = ICON_OPTIONS.find(i => i.value === section.icon);
//   const IconComponent = iconOption?.icon || Shield;

//   const toggleSectionStatus = () => {
//     const newStatus = !section.isActive;
//     onUpdate(index, { ...section, isActive: newStatus });
//     toast.success(`Section "${section.title}" ${newStatus ? 'activated' : 'deactivated'}`);
//   };

//   // Drag and drop handlers
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
//       className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${
//         section.isActive 
//           ? 'border-[#06B6D4]/20 hover:border-[#06B6D4]/40' 
//           : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
//       } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
//       draggable={true}
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <div className={`flex items-center justify-between p-4 border-b ${
//         section.isActive 
//           ? 'bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5 border-[#06B6D4]/20' 
//           : 'bg-gray-100 border-gray-200'
//       }`}>
//         <div className="flex items-center gap-3 flex-1 min-w-0">
//           <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
//             <GripVertical className="w-4 h-4" />
//           </div>
//           <div className="flex items-center gap-2">
//             <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
//               section.isActive ? 'bg-[#06B6D4]/10 text-[#06B6D4]' : 'bg-gray-200 text-gray-400'
//             }`}>
//               <IconComponent className="w-4 h-4" />
//             </div>
//             <span className={`text-sm font-medium ${
//               section.isActive ? 'text-[#004767]' : 'text-gray-500'
//             }`}>
//               {section.title}
//             </span>
//           </div>
//           <span className={`text-xs px-2 py-0.5 rounded ${
//             section.isActive ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-500'
//           }`}>
//             {section.details?.length || 0} details
//           </span>
//           <div className="flex items-center gap-1">
//             {section.isActive ? (
//               <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200 whitespace-nowrap">
//                 <CheckCircle className="w-3 h-3" />
//                 Active
//               </span>
//             ) : (
//               <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full border border-gray-300 whitespace-nowrap">
//                 <XCircle className="w-3 h-3" />
//                 Inactive
//               </span>
//             )}
//           </div>
//           <div className="flex items-center gap-1 ml-2">
//             <span className="text-xs text-gray-400">Order:</span>
//             <span className={`text-xs font-medium px-2 py-0.5 rounded ${
//               section.isActive ? 'bg-gray-100 text-[#004767]' : 'bg-gray-200 text-gray-500'
//             }`}>
//               #{section.displayOrder !== undefined ? section.displayOrder : index + 1}
//             </span>
//           </div>
//         </div>
//         <div className="flex items-center gap-1 flex-shrink-0">
//           <button
//             type="button"
//             onClick={toggleSectionStatus}
//             className={`p-1 rounded transition-colors ${
//               section.isActive
//                 ? 'text-green-600 hover:bg-green-100'
//                 : 'text-gray-500 hover:bg-gray-200'
//             }`}
//             title={section.isActive ? 'Deactivate' : 'Activate'}
//           >
//             {section.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
//           </button>
//           <button
//             type="button"
//             onClick={() => onEdit(index)}
//             className="p-1 text-[#06B6D4] hover:bg-[#06B6D4]/10 rounded transition-colors"
//             title="Edit"
//           >
//             <Pencil className="w-4 h-4" />
//           </button>
//           <button
//             type="button"
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-200 transition-colors"
//           >
//             {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//           </button>
//           <button
//             type="button"
//             onClick={() => onRemove(index)}
//             className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//             title="Delete"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {isExpanded && (
//         <div className={`p-4 space-y-3 ${!section.isActive ? 'opacity-75' : ''}`}>
//           <div>
//             <p className="text-sm text-gray-600">{section.description}</p>
//           </div>
//           <div>
//             <h4 className="text-xs font-medium text-gray-500 mb-2">Details:</h4>
//             <ul className="space-y-1">
//               {section.details?.map((detail, idx) => (
//                 <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
//                   <CheckCircle className="w-3 h-3 text-[#06B6D4] mt-0.5 flex-shrink-0" />
//                   <span>{detail}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="flex items-center gap-4 text-xs text-gray-400">
//             <span>Icon: {section.icon}</span>
//             <span>ID: {section.id}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Main Admin Component
// export default function PrivacyManagement() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [privacyData, setPrivacyData] = useState(null);
//   const [sections, setSections] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editTarget, setEditTarget] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [heroTitle, setHeroTitle] = useState('');
//   const [heroDescription, setHeroDescription] = useState('');
//   const [introText, setIntroText] = useState('');

//   // Fetch privacy data
//   useEffect(() => {
//     fetchPrivacyData();
//   }, []);

//   // const fetchPrivacyData = async () => {
//   //   setIsLoading(true);
//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     // ✅ Use the /all endpoint that forces all sections
//   //     const response = await fetch('http://localhost:5000/api/admin/privacy/all', {
//   //       headers: { 'Authorization': `Bearer ${token}` }
//   //     });

//   //     console.log('📡 Admin API (ALL) Response Status:', response.status);
      
//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       console.log('📡 Full Admin API (ALL) Response:', JSON.stringify(data, null, 2));
        
//   //       if (data.success && data.data) {
//   //         const allSections = data.data.sections || [];
          
//   //         console.log('📊 ALL sections from server (including inactive):');
//   //         allSections.forEach(s => {
//   //           console.log(`  ${s.title}: isActive = ${s.isActive} (${typeof s.isActive})`);
//   //         });
          
//   //         const sortedSections = allSections.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
//   //         setSections(sortedSections);
//   //         setHeroTitle(data.data.heroTitle || '');
//   //         setHeroDescription(data.data.heroDescription || '');
//   //         setIntroText(data.data.introText || '');
          
//   //         const activeCount = sortedSections.filter(s => s.isActive === true).length;
//   //         const inactiveCount = sortedSections.filter(s => s.isActive === false).length;
//   //         toast.success(`Loaded ${sortedSections.length} sections (${activeCount} active, ${inactiveCount} inactive)`);
//   //       } else {
//   //         console.error('❌ API returned success=false or no data');
//   //         setSections([]);
//   //       }
//   //     } else {
//   //       console.error('❌ API request failed with status:', response.status);
//   //       setSections([]);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching privacy:', error);
//   //     setSections([]);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   // Add new section
  
//   // In PrivacyManagement component - Update fetchPrivacyData

// const fetchPrivacyData = async () => {
//   setIsLoading(true);
//   try {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       toast.error('Please login first');
//       setSections([]);
//       setIsLoading(false);
//       return;
//     }
    
//     // ✅ Use the /admin/all endpoint with explicit path
//     const response = await fetch('http://localhost:5000/api/privacy/admin/all', {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });

//     console.log('📡 Admin API (ALL) Response Status:', response.status);
    
//     if (response.status === 403) {
//       console.error('❌ Forbidden: User does not have permission');
//       const errorData = await response.json().catch(() => ({}));
//       toast.error(errorData.error || 'You do not have permission to manage privacy policy');
//       setSections([]);
//       setIsLoading(false);
//       return;
//     }
    
//     if (response.ok) {
//       const data = await response.json();
//       console.log('📡 Full Admin API (ALL) Response:', JSON.stringify(data, null, 2));
      
//       if (data.success && data.data) {
//         const allSections = data.data.sections || [];
        
//         console.log('📊 ALL sections from server (including inactive):');
//         allSections.forEach(s => {
//           console.log(`  ${s.title}: isActive = ${s.isActive} (${typeof s.isActive})`);
//         });
        
//         const sortedSections = allSections.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
//         setSections(sortedSections);
//         setHeroTitle(data.data.heroTitle || '');
//         setHeroDescription(data.data.heroDescription || '');
//         setIntroText(data.data.introText || '');
        
//         const activeCount = sortedSections.filter(s => s.isActive === true).length;
//         const inactiveCount = sortedSections.filter(s => s.isActive === false).length;
//         toast.success(`Loaded ${sortedSections.length} sections (${activeCount} active, ${inactiveCount} inactive)`);
//       } else {
//         console.error('❌ API returned success=false or no data');
//         setSections([]);
//       }
//     } else {
//       console.error('❌ API request failed with status:', response.status);
//       const errorData = await response.json().catch(() => ({}));
//       toast.error(errorData.error || 'Failed to load privacy policy data');
//       setSections([]);
//     }
//   } catch (error) {
//     console.error('Error fetching privacy:', error);
//     toast.error('Network error. Please try again.');
//     setSections([]);
//   } finally {
//     setIsLoading(false);
//   }
// };
//   const addSection = () => {
//     setIsEditing(false);
//     setEditTarget(null);
//     setShowEditModal(true);
//   };

//   // Edit section
//   const editSection = (index) => {
//     setIsEditing(true);
//     setEditTarget({ index, section: sections[index] });
//     setShowEditModal(true);
//   };

//   // Save section (add or update)
//   const saveSection = (formData) => {
//     if (isEditing && editTarget) {
//       // Update existing section
//       const updatedSections = [...sections];
//       updatedSections[editTarget.index] = {
//         ...editTarget.section,
//         ...formData
//       };
//       setSections(updatedSections);
//       toast.success('Section updated successfully');
//     } else {
//       // Add new section
//       const newSection = {
//         id: sections.length + 1,
//         ...formData,
//         displayOrder: sections.length
//       };
//       setSections([...sections, newSection]);
//       toast.success('Section added successfully');
//     }
//     setShowEditModal(false);
//     setEditTarget(null);
//     setIsEditing(false);
//   };

//   // Remove section
//   const removeSection = (index) => {
//     const section = sections[index];
//     setDeleteTarget({ index, title: section.title });
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = () => {
//     if (deleteTarget) {
//       const updatedSections = sections.filter((_, i) => i !== deleteTarget.index);
//       setSections(updatedSections);
//       setShowDeleteModal(false);
//       setDeleteTarget(null);
//       toast.success('Section deleted successfully');
//     }
//   };

//   // Move section
//   const moveSection = (fromIndex, toIndex) => {
//     if (fromIndex === toIndex) return;
//     const updatedSections = [...sections];
//     const [removed] = updatedSections.splice(fromIndex, 1);
//     updatedSections.splice(toIndex, 0, removed);
//     updatedSections.forEach((section, idx) => section.displayOrder = idx);
//     setSections(updatedSections);
//   };

//   // Update section (for toggle)
//   const updateSection = (index, updatedSection) => {
//     const updatedSections = [...sections];
//     updatedSections[index] = updatedSection;
//     setSections(updatedSections);
//   };

//   // Submit handler
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setIsSubmitting(true);

//   //   try {
//   //     const token = localStorage.getItem('token');
      
//   //     const submitData = {
//   //       heroTitle,
//   //       heroDescription,
//   //       introText,
//   //       sections: sections.map((section, index) => ({
//   //         ...section,
//   //         displayOrder: index
//   //       }))
//   //     };

//   //     const response = await fetch('http://localhost:5000/api/admin/privacy', {
//   //       method: 'PUT',
//   //       headers: {
//   //         'Authorization': `Bearer ${token}`,
//   //         'Content-Type': 'application/json'
//   //       },
//   //       body: JSON.stringify(submitData)
//   //     });

//   //     const data = await response.json();

//   //     if (data.success) {
//   //       toast.success('Privacy policy updated successfully!');
//   //       fetchPrivacyData();
//   //     } else {
//   //       toast.error(data.error || 'Failed to update privacy policy');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error saving privacy:', error);
//   //     toast.error('Network error. Please try again.');
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };
// // In PrivacyManagement component - Update handleSubmit

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);

//   try {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       toast.error('Please login first');
//       setIsSubmitting(false);
//       return;
//     }
    
//     const submitData = {
//       heroTitle,
//       heroDescription,
//       introText,
//       sections: sections.map((section, index) => ({
//         ...section,
//         displayOrder: index
//       }))
//     };

//     console.log('📤 Submitting privacy data:', submitData);

//     // ✅ Use the /admin endpoint
//     const response = await fetch('http://localhost:5000/api/privacy/admin', {
//       method: 'PUT',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(submitData)
//     });

//     console.log('📡 Response status:', response.status);

//     if (response.status === 403) {
//       const errorData = await response.json().catch(() => ({}));
//       toast.error(errorData.error || 'You do not have permission to update privacy policy');
//       setIsSubmitting(false);
//       return;
//     }

//     const data = await response.json();
//     console.log('📥 Response data:', data);

//     if (data.success) {
//       toast.success('Privacy policy updated successfully!');
//       fetchPrivacyData();
//     } else {
//       toast.error(data.error || 'Failed to update privacy policy');
//     }
//   } catch (error) {
//     console.error('Error saving privacy:', error);
//     toast.error('Network error. Please try again.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };
//   // Reset to default
//   // const handleReset = async () => {
//   //   if (confirm('Are you sure you want to reset to default privacy policy configuration?')) {
//   //     try {
//   //       const token = localStorage.getItem('token');
//   //       const response = await fetch('http://localhost:5000/api/admin/privacy/reset', {
//   //         method: 'POST',
//   //         headers: { 'Authorization': `Bearer ${token}` }
//   //       });
//   //       const data = await response.json();
//   //       if (data.success) {
//   //         toast.success('Privacy policy reset to default');
//   //         fetchPrivacyData();
//   //       }
//   //     } catch (error) {
//   //       toast.error('Failed to reset privacy policy');
//   //     }
//   //   }
//   // };

//   // In PrivacyManagement component - Update handleReset

// const handleReset = async () => {
//   if (confirm('Are you sure you want to reset to default privacy policy configuration?')) {
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login first');
//         return;
//       }
      
//       // ✅ Use the /admin/reset endpoint
//       const response = await fetch('http://localhost:5000/api/privacy/admin/reset', {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       const data = await response.json();
      
//       if (response.status === 403) {
//         toast.error('You do not have permission to reset privacy policy');
//         return;
//       }
      
//       if (data.success) {
//         toast.success('Privacy policy reset to default');
//         fetchPrivacyData();
//       } else {
//         toast.error(data.error || 'Failed to reset privacy policy');
//       }
//     } catch (error) {
//       console.error('Error resetting privacy:', error);
//       toast.error('Network error. Please try again.');
//     }
//   }
// };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-[#06B6D4] mx-auto" />
//           <p className="text-gray-500 mt-2">Loading privacy policy data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (

// <ProtectedRoute pageKey="privacy_management">    
//     <div className="min-h-screen bg-[#f0f7fa]">
//       <SectionEditModal
//         isOpen={showEditModal}
//         onClose={() => {
//           setShowEditModal(false);
//           setEditTarget(null);
//           setIsEditing(false);
//         }}
//         onSave={saveSection}
//         section={editTarget?.section}
//         isEditing={isEditing}
//       />

//       <DeleteConfirmModal
//         isOpen={showDeleteModal}
//         onClose={() => {
//           setShowDeleteModal(false);
//           setDeleteTarget(null);
//         }}
//         onConfirm={confirmDelete}
//         sectionTitle={deleteTarget?.title || ''}
//       />

//       {/* Header */}
//       <div className="bg-[#004767] border-b border-[#06B6D4]/20 shadow-lg sticky top-0 z-10">
//         <div className="px-4 sm:px-6 py-3 sm:py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div className="flex items-center gap-2 sm:gap-4">
//               <Link href="/authorize/dashboard" className="p-1.5 sm:p-2 hover:bg-[#06B6D4]/20 rounded-lg transition-colors flex-shrink-0">
//                 <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 hover:text-white" />
//               </Link>
//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
//                   <div className="flex items-center gap-2">
//                     <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#06B6D4]" />
//                     <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
//                       Privacy Policy Management
//                     </h1>
//                   </div>
//                   <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#06B6D4]/20 text-[#06B6D4] text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap">
//                     HyperVolt
//                   </span>
//                 </div>
//                 <p className="text-xs sm:text-sm text-white/70 mt-0.5 sm:mt-1 truncate">
//                   Manage Privacy Policy sections and content
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
//                 onClick={fetchPrivacyData}
//                 className="p-1.5 sm:p-2 text-white/70 hover:bg-[#06B6D4]/20 rounded-lg transition-colors hover:text-white"
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
//           {/* Hero & Intro Settings */}
//           <div className="bg-white rounded-xl shadow-sm border border-[#06B6D4]/20 p-4 sm:p-6">
//             <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
//               <Zap className="w-5 h-5 text-[#06B6D4]" />
//               Page Settings
//             </h2>
//             <div className="grid grid-cols-1 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Hero Title
//                 </label>
//                 <input
//                   type="text"
//                   value={heroTitle}
//                   onChange={(e) => setHeroTitle(e.target.value)}
//                   placeholder="Privacy Policy"
//                   className="w-full px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Hero Description
//                 </label>
//                 <input
//                   type="text"
//                   value={heroDescription}
//                   onChange={(e) => setHeroDescription(e.target.value)}
//                   placeholder="Your privacy is important to us..."
//                   className="w-full px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Intro Text
//                 </label>
//                 <textarea
//                   value={introText}
//                   onChange={(e) => setIntroText(e.target.value)}
//                   rows={3}
//                   placeholder="Welcome to HyperVolt. Your privacy is important to us..."
//                   className="w-full px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40 resize-none"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Sections List */}
//           <div className="bg-white rounded-xl shadow-sm border border-[#06B6D4]/20 p-4 sm:p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                   <FileText className="w-5 h-5 text-[#06B6D4]" />
//                   Privacy Sections
//                   <span className="text-xs font-normal text-gray-400 ml-2">
//                     ({sections.filter(s => s.isActive).length} active, {sections.filter(s => !s.isActive).length} inactive)
//                   </span>
//                 </h2>
//                 <p className="text-sm text-gray-500 mt-1">
//                   <span className="inline-flex items-center gap-1">
//                     <GripVertical className="w-4 h-4 text-gray-400" />
//                     Drag and drop to reorder
//                   </span>
//                   • Each section represents a part of the Privacy Policy
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={addSection}
//                 className="flex items-center gap-2 px-4 py-2 bg-[#06B6D4] text-[#004767] rounded-lg hover:bg-[#0891B2] transition-colors text-sm font-semibold shadow-md hover:shadow-lg"
//               >
//                 <Plus className="w-4 h-4" />
//                 Add Section
//               </button>
//             </div>

//             <div className="space-y-3">
//               {sections.map((section, index) => (
//                 <SectionItem
//                   key={section.id || index}
//                   section={section}
//                   index={index}
//                   onUpdate={updateSection}
//                   onRemove={removeSection}
//                   onMove={moveSection}
//                   onEdit={editSection}
//                   isFirst={index === 0}
//                   isLast={index === sections.length - 1}
//                 />
//               ))}
//             </div>

//             {sections.length === 0 && (
//               <div className="text-center py-12 text-gray-500">
//                 <Shield className="w-12 h-12 mx-auto mb-3 text-[#06B6D4]/30" />
//                 <p>No sections added</p>
//                 <p className="text-sm">Click "Add Section" to create your first Privacy Policy section</p>
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   <span>Saving...</span>
//                 </>
//               ) : (
//                 <>
//                   <Save className="w-4 h-4" />
//                   <span>Save Privacy Policy</span>
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

// app/admin/privacy/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Save,
  ArrowLeft,
  Loader2,
  Plus,
  X,
  Trash2,
  RefreshCw,
  GripVertical,
  MoveUp,
  MoveDown,
  Eye as EyeIcon,
  EyeOff,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Pencil,
  Shield,
  Users,
  Lock,
  Cookie,
  AlertCircle,
  Globe,
  Server,
  Mail,
  Phone,
  Clock,
  Upload,
  Image as ImageIcon,
  Zap,
  Info,
  Edit
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
          <div className={`rounded-lg overflow-hidden border-2 border-blue-500/30 bg-gray-100`}
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
  { value: 'FaUsers', label: 'Users', icon: Users },
  { value: 'FaEye', label: 'Eye', icon: EyeIcon },
  { value: 'FaShield', label: 'Shield', icon: Shield },
  { value: 'FaLock', label: 'Lock', icon: Lock },
  { value: 'FaCookie', label: 'Cookie', icon: Cookie },
  { value: 'FaAlertCircle', label: 'Alert', icon: AlertCircle },
  { value: 'FaGlobe', label: 'Globe', icon: Globe },
  { value: 'FaServer', label: 'Server', icon: Server },
  { value: 'FaClock', label: 'Clock', icon: Clock },
];

const ADDITIONAL_INFO_ICONS = [
  { value: 'FaGlobe', label: 'Globe', icon: Globe },
  { value: 'FaUsers', label: 'Users', icon: Users },
  { value: 'FaClock', label: 'Clock', icon: Clock },
  { value: 'FaShield', label: 'Shield', icon: Shield },
  { value: 'FaLock', label: 'Lock', icon: Lock },
  { value: 'FaAlertCircle', label: 'Alert', icon: AlertCircle },
  { value: 'FaServer', label: 'Server', icon: Server },
];

// Helper function to generate unique ID
const generateId = () => `section_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

// Default sections for Smart Gadget
const getDefaultSections = () => [
  {
    id: generateId(),
    title: 'Information We Collect',
    icon: 'FaUsers',
    description: 'We collect information to provide and improve our services to you.',
    details: [
      'Name, email address, phone number, and shipping/billing address',
      'Payment information (processed securely through our payment partners)',
      'IP address, browser type, device information, and usage data',
      'Cookies and similar tracking technologies'
    ],
    isActive: true,
    displayOrder: 0
  },
  {
    id: generateId(),
    title: 'How We Use Your Information',
    icon: 'FaEye',
    description: 'Your data helps us serve you better and improve our platform.',
    details: [
      'Process and fulfill your orders and deliveries',
      'Communicate with you about orders, products, and promotions',
      'Improve our website, products, and customer service',
      'Prevent fraud and ensure the security of our platform',
      'Comply with legal obligations and regulatory requirements'
    ],
    isActive: true,
    displayOrder: 1
  },
  {
    id: generateId(),
    title: 'Data Sharing & Disclosure',
    icon: 'FaShield',
    description: 'We respect your privacy and limit data sharing to trusted partners.',
    details: [
      'We never sell or rent your personal data to third parties',
      'Share data with trusted service providers (payment processors, delivery partners)',
      'May disclose data when required by law or to protect our rights',
      'Third-party services have their own privacy policies'
    ],
    isActive: true,
    displayOrder: 2
  },
  {
    id: generateId(),
    title: 'Data Security',
    icon: 'FaLock',
    description: 'We implement industry-standard security measures to protect your data.',
    details: [
      'SSL encryption for all data transmission',
      'Regular security audits and vulnerability assessments',
      'Access controls and authentication measures',
      'Secure data storage with industry-standard practices'
    ],
    isActive: true,
    displayOrder: 3
  },
  {
    id: generateId(),
    title: 'Cookies & Tracking',
    icon: 'FaCookie',
    description: 'We use cookies to enhance your browsing experience.',
    details: [
      'Essential cookies for site functionality',
      'Analytics cookies to understand user behavior',
      'Preference cookies to remember your settings',
      'You can manage cookie preferences in your browser settings'
    ],
    isActive: true,
    displayOrder: 4
  },
  {
    id: generateId(),
    title: 'Your Rights',
    icon: 'FaAlertCircle',
    description: 'You have control over your personal data.',
    details: [
      'Access, correct, or delete your personal data',
      'Withdraw consent for marketing communications',
      'Request data portability',
      'Lodge a complaint with data protection authorities'
    ],
    isActive: true,
    displayOrder: 5
  }
];

// Default Additional Info
const getDefaultAdditionalInfo = () => [
  {
    id: generateId(),
    title: 'International Data Transfers',
    icon: 'FaGlobe',
    description: 'Smart Gadget operates primarily in Bangladesh. However, we may use service providers located in other countries. When we transfer your data internationally, we ensure that appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.',
    isActive: true,
    displayOrder: 0
  },
  {
    id: generateId(),
    title: "Children's Privacy",
    icon: 'FaUsers',
    description: 'Our services are not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal data, please contact us immediately. We will take steps to remove such information from our systems.',
    isActive: true,
    displayOrder: 1
  },
  {
    id: generateId(),
    title: 'Updates to This Policy',
    icon: 'FaClock',
    description: 'We may update this Privacy Policy periodically. The latest version will always be posted on this page with the effective date. We encourage you to review this policy regularly.',
    isActive: true,
    displayOrder: 2
  }
];

// ============================================================
// DELETE CONFIRMATION MODAL
// ============================================================

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemTitle, itemType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-red-100">
        <div className="p-6">
          <div className="flex items-center gap-3 text-red-600 mb-4">
            <Trash2 className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Delete {itemType}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete <strong className="text-blue-600">"{itemTitle}"</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-500/10 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SECTION EDIT MODAL - Reusable for both Main and Additional
// ============================================================

const SectionEditModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  section, 
  isEditing, 
  isAdditionalInfo = false,
  title = 'Section'
}) => {
  const [formData, setFormData] = useState({
    title: '',
    icon: isAdditionalInfo ? 'FaGlobe' : 'FaShield',
    description: '',
    details: [],
    isActive: true
  });
  const [newDetail, setNewDetail] = useState('');

  useEffect(() => {
    if (section && isEditing) {
      setFormData({
        title: section.title || '',
        icon: section.icon || (isAdditionalInfo ? 'FaGlobe' : 'FaShield'),
        description: section.description || '',
        details: section.details || [],
        isActive: section.isActive !== undefined ? section.isActive : true
      });
    } else {
      setFormData({
        title: '',
        icon: isAdditionalInfo ? 'FaGlobe' : 'FaShield',
        description: '',
        details: [],
        isActive: true
      });
    }
  }, [section, isEditing, isOpen, isAdditionalInfo]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addDetail = () => {
    if (newDetail.trim()) {
      setFormData(prev => ({
        ...prev,
        details: [...prev.details, newDetail.trim()]
      }));
      setNewDetail('');
    }
  };

  const removeDetail = (index) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required');
      return;
    }
    if (!isAdditionalInfo && formData.details.length === 0) {
      toast.error('At least one detail is required');
      return;
    }
    onSave(formData);
    onClose();
  };

  const iconOptions = isAdditionalInfo ? ADDITIONAL_INFO_ICONS : ICON_OPTIONS;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col border border-blue-500/20">
        <div className="p-5 border-b border-blue-500/20 flex items-center justify-between bg-gradient-to-r from-blue-500/5 to-black/5">
          <h3 className="text-lg font-semibold text-black flex items-center gap-2">
            {isAdditionalInfo ? <Info className="w-5 h-5 text-purple-600" /> : <Shield className="w-5 h-5 text-blue-600" />}
            {isEditing ? 'Edit' : 'Add New'} {title}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-blue-500/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder={isAdditionalInfo ? "e.g., International Data Transfers" : "e.g., Information We Collect"}
              className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon
            </label>
            <select
              value={formData.icon}
              onChange={(e) => handleChange('icon', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
            >
              {iconOptions.map(icon => (
                <option key={icon.value} value={icon.value}>
                  {icon.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={isAdditionalInfo ? 4 : 2}
              placeholder={isAdditionalInfo ? "Detailed description of this policy section..." : "Brief description of this section..."}
              className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40 resize-none"
            />
          </div>

          {!isAdditionalInfo && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Details <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newDetail}
                  onChange={(e) => setNewDetail(e.target.value)}
                  placeholder="Add a detail point..."
                  className="flex-1 px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
                  onKeyPress={(e) => e.key === 'Enter' && addDetail()}
                />
                <button
                  type="button"
                  onClick={addDetail}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {formData.details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="flex-1 text-sm text-gray-700">{detail}</span>
                    <button
                      type="button"
                      onClick={() => removeDetail(index)}
                      className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              {formData.details.length === 0 && (
                <p className="text-xs text-gray-400 mt-2">Add at least one detail point</p>
              )}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleChange('isActive', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
            <span className="text-xs text-gray-400">
              {formData.isActive ? 'Visible on the website' : 'Hidden from the website'}
            </span>
          </div>
        </div>

        <div className="p-5 border-t border-blue-500/20 flex gap-3 justify-end bg-blue-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-500/10 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Save className="w-4 h-4" />
            {isEditing ? 'Update' : 'Add'} {title}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SECTION ITEM COMPONENT
// ============================================================

const SectionItem = ({ section, index, onUpdate, onRemove, onMove, onEdit, isFirst, isLast, isAdditionalInfo = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const iconOptions = isAdditionalInfo ? ADDITIONAL_INFO_ICONS : ICON_OPTIONS;
  const iconOption = iconOptions.find(i => i.value === section.icon);
  const IconComponent = iconOption?.icon || (isAdditionalInfo ? Globe : Shield);

  const toggleSectionStatus = () => {
    const newStatus = !section.isActive;
    onUpdate(index, { ...section, isActive: newStatus });
    toast.success(`"${section.title}" ${newStatus ? 'activated' : 'deactivated'}`);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
    setTimeout(() => {
      e.target.classList.add('opacity-50');
    }, 0);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    e.target.classList.remove('opacity-50');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (draggedIndex !== index) {
      onMove(draggedIndex, index);
    }
  };

  const moveUp = () => {
    if (index > 0) {
      onMove(index, index - 1);
    }
  };

  const moveDown = () => {
    if (index < section.totalSections - 1) {
      onMove(index, index + 1);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${
        section.isActive 
          ? isAdditionalInfo ? 'border-purple-500/20 hover:border-purple-500/40' : 'border-blue-500/20 hover:border-blue-500/40'
          : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
      } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={`flex items-center justify-between p-4 border-b ${
        section.isActive 
          ? isAdditionalInfo ? 'bg-gradient-to-r from-purple-500/5 to-black/5 border-purple-500/20' : 'bg-gradient-to-r from-blue-500/5 to-black/5 border-blue-500/20'
          : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
            <GripVertical className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              section.isActive 
                ? isAdditionalInfo ? 'bg-purple-500/10 text-purple-600' : 'bg-blue-500/10 text-blue-600'
                : 'bg-gray-200 text-gray-400'
            }`}>
              <IconComponent className="w-4 h-4" />
            </div>
            <span className={`text-sm font-medium ${
              section.isActive ? 'text-black' : 'text-gray-500'
            }`}>
              {section.title}
            </span>
          </div>
          {!isAdditionalInfo && (
            <span className={`text-xs px-2 py-0.5 rounded ${
              section.isActive ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-500'
            }`}>
              {section.details?.length || 0} details
            </span>
          )}
          <div className="flex items-center gap-1">
            {section.isActive ? (
              <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200 whitespace-nowrap">
                <CheckCircle className="w-3 h-3" />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full border border-gray-300 whitespace-nowrap">
                <XCircle className="w-3 h-3" />
                Inactive
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 ml-2">
            <span className="text-xs text-gray-400">Order:</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${
              section.isActive ? 'bg-gray-100 text-black' : 'bg-gray-200 text-gray-500'
            }`}>
              #{section.displayOrder !== undefined ? section.displayOrder : index + 1}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={moveUp}
            disabled={index === 0}
            className={`p-1 rounded transition-colors ${
              index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-200'
            }`}
            title="Move Up"
          >
            <MoveUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={moveDown}
            disabled={index === section.totalSections - 1}
            className={`p-1 rounded transition-colors ${
              index === section.totalSections - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-200'
            }`}
            title="Move Down"
          >
            <MoveDown className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={toggleSectionStatus}
            className={`p-1 rounded transition-colors ${
              section.isActive
                ? 'text-green-600 hover:bg-green-100'
                : 'text-gray-500 hover:bg-gray-200'
            }`}
            title={section.isActive ? 'Deactivate' : 'Activate'}
          >
            {section.isActive ? <EyeIcon className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          {/* ✅ EDIT BUTTON */}
          <button
            type="button"
            onClick={() => onEdit(index)}
            className={`p-1 rounded transition-colors ${
              isAdditionalInfo 
                ? 'text-purple-600 hover:bg-purple-100' 
                : 'text-blue-600 hover:bg-blue-100'
            }`}
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-200 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={`p-4 space-y-3 ${!section.isActive ? 'opacity-75' : ''}`}>
          <div>
            <p className="text-sm text-gray-600">{section.description}</p>
          </div>
          {!isAdditionalInfo && section.details && section.details.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-gray-500 mb-2">Details:</h4>
              <ul className="space-y-1">
                {section.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>Icon: {section.icon}</span>
            <span>ID: {section.id}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// MAIN ADMIN COMPONENT
// ============================================================

export default function PrivacyManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sections, setSections] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState([]);
  const [heroTitle, setHeroTitle] = useState('Your Privacy');
  const [heroSubtitle, setHeroSubtitle] = useState('Matters to Us');
  const [heroDescription, setHeroDescription] = useState('We are committed to protecting your personal data and being transparent about how we collect, use, and safeguard your information.');
  const [heroImage, setHeroImage] = useState('');
  const [ctaImage, setCtaImage] = useState('');
  const [introText, setIntroText] = useState('');
  const [quickInfo, setQuickInfo] = useState({
    email: '',
    phone: '',
    responseTime: ''
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdditionalInfo, setIsAdditionalInfo] = useState(false);

  // Fetch privacy data
  useEffect(() => {
    fetchPrivacyData();
  }, []);

  const fetchPrivacyData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setSections(getDefaultSections());
        setAdditionalInfo(getDefaultAdditionalInfo());
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/privacy/admin', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('📡 Admin API Response Status:', response.status);

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'You do not have permission to manage privacy policy');
        setSections(getDefaultSections());
        setAdditionalInfo(getDefaultAdditionalInfo());
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        const result = await response.json();
        console.log('📦 Admin API Response:', result);

        if (result.success && result.data) {
          const allSections = result.data.sections || [];
          const allAdditionalInfo = result.data.additionalInfo || [];
          const sortedSections = allSections.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
          const sortedAdditionalInfo = allAdditionalInfo.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
          
          setSections(sortedSections);
          setAdditionalInfo(sortedAdditionalInfo);
          setHeroTitle(result.data.heroTitle || 'Your Privacy');
          setHeroSubtitle(result.data.heroSubtitle || 'Matters to Us');
          setHeroDescription(result.data.heroDescription || '');
          setHeroImage(result.data.heroImage || '');
          setCtaImage(result.data.ctaImage || '');
          setIntroText(result.data.introText || '');
          setQuickInfo(result.data.quickInfo || {
            email: '',
            phone: '',
            responseTime: ''
          });

          const activeCount = sortedSections.filter(s => s.isActive === true).length;
          const inactiveCount = sortedSections.filter(s => s.isActive === false).length;
          const additionalActiveCount = sortedAdditionalInfo.filter(s => s.isActive === true).length;
          const additionalInactiveCount = sortedAdditionalInfo.filter(s => s.isActive === false).length;
          
          toast.success(`Loaded ${sortedSections.length} sections (${activeCount} active, ${inactiveCount} inactive) and ${sortedAdditionalInfo.length} additional info (${additionalActiveCount} active, ${additionalInactiveCount} inactive)`);
        } else {
          console.error('❌ API returned success=false or no data');
          setSections(getDefaultSections());
          setAdditionalInfo(getDefaultAdditionalInfo());
        }
      } else {
        console.error('❌ API request failed with status:', response.status);
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'Failed to load privacy policy');
        setSections(getDefaultSections());
        setAdditionalInfo(getDefaultAdditionalInfo());
      }
    } catch (error) {
      console.error('Error fetching privacy data:', error);
      toast.error('Network error. Please try again.');
      setSections(getDefaultSections());
      setAdditionalInfo(getDefaultAdditionalInfo());
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // SECTION HANDLERS
  // ============================================================

  // Add new section
  const addSection = () => {
    setIsAdditionalInfo(false);
    setIsEditing(false);
    setEditTarget(null);
    setShowEditModal(true);
  };

  // Edit section
  const editSection = (index) => {
    setIsAdditionalInfo(false);
    setIsEditing(true);
    setEditTarget({ index, section: sections[index] });
    setShowEditModal(true);
  };

  // Save section
  const saveSection = (formData) => {
    if (isEditing && editTarget) {
      const updatedSections = [...sections];
      updatedSections[editTarget.index] = {
        ...editTarget.section,
        ...formData
      };
      setSections(updatedSections);
      toast.success('Section updated successfully');
    } else {
      const newId = Date.now() + Math.floor(Math.random() * 1000);
      const newSection = {
        id: newId,
        ...formData,
        displayOrder: sections.length,
        isActive: formData.isActive !== undefined ? formData.isActive : true
      };
      setSections([...sections, newSection]);
      toast.success('Section added successfully');
    }
    setShowEditModal(false);
    setEditTarget(null);
    setIsEditing(false);
    setIsAdditionalInfo(false);
  };

  // Remove section
  const removeSection = (index) => {
    const section = sections[index];
    setDeleteTarget({ index, title: section.title, type: 'section' });
    setShowDeleteModal(true);
  };

  // Update section
  const updateSection = (index, updatedSection) => {
    const updatedSections = [...sections];
    updatedSections[index] = updatedSection;
    setSections(updatedSections);
  };

  // Move section
  const moveSection = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const updatedSections = [...sections];
    const [removed] = updatedSections.splice(fromIndex, 1);
    updatedSections.splice(toIndex, 0, removed);
    updatedSections.forEach((section, idx) => section.displayOrder = idx);
    setSections(updatedSections);
    toast.success('Section reordered successfully');
  };

  // ============================================================
  // ADDITIONAL INFO HANDLERS
  // ============================================================

  // Add new additional info
  const addAdditionalInfo = () => {
    setIsAdditionalInfo(true);
    setIsEditing(false);
    setEditTarget(null);
    setShowEditModal(true);
  };

  // Edit additional info
  const editAdditionalInfo = (index) => {
    setIsAdditionalInfo(true);
    setIsEditing(true);
    setEditTarget({ index, section: additionalInfo[index] });
    setShowEditModal(true);
  };

  // Save additional info
  const saveAdditionalInfo = (formData) => {
    if (isEditing && editTarget) {
      const updatedItems = [...additionalInfo];
      updatedItems[editTarget.index] = {
        ...editTarget.section,
        ...formData
      };
      setAdditionalInfo(updatedItems);
      toast.success('Additional info updated successfully');
    } else {
      const newId = Date.now() + Math.floor(Math.random() * 1000);
      const newItem = {
        id: newId,
        ...formData,
        displayOrder: additionalInfo.length,
        isActive: formData.isActive !== undefined ? formData.isActive : true
      };
      setAdditionalInfo([...additionalInfo, newItem]);
      toast.success('Additional info added successfully');
    }
    setShowEditModal(false);
    setEditTarget(null);
    setIsEditing(false);
    setIsAdditionalInfo(false);
  };

  // Remove additional info
  const removeAdditionalInfo = (index) => {
    const item = additionalInfo[index];
    setDeleteTarget({ index, title: item.title, type: 'additionalInfo' });
    setShowDeleteModal(true);
  };

  // Update additional info
  const updateAdditionalInfo = (index, updatedItem) => {
    const updatedItems = [...additionalInfo];
    updatedItems[index] = updatedItem;
    setAdditionalInfo(updatedItems);
  };

  // Move additional info
  const moveAdditionalInfo = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const updatedItems = [...additionalInfo];
    const [removed] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, removed);
    updatedItems.forEach((item, idx) => item.displayOrder = idx);
    setAdditionalInfo(updatedItems);
    toast.success('Additional info reordered successfully');
  };

  // ============================================================
  // CONFIRM DELETE
  // ============================================================

  const confirmDelete = () => {
    if (deleteTarget) {
      if (deleteTarget.type === 'section') {
        const updatedSections = sections.filter((_, i) => i !== deleteTarget.index);
        setSections(updatedSections);
      } else if (deleteTarget.type === 'additionalInfo') {
        const updatedItems = additionalInfo.filter((_, i) => i !== deleteTarget.index);
        setAdditionalInfo(updatedItems);
      }
      setShowDeleteModal(false);
      setDeleteTarget(null);
      toast.success('Deleted successfully');
    }
  };

  // ============================================================
  // SUBMIT HANDLER
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setIsSubmitting(false);
        return;
      }

      const submitData = {
        heroTitle,
        heroSubtitle,
        heroDescription,
        heroImage,
        ctaImage,
        introText,
        quickInfo,
        sections: sections.map((section, index) => ({
          ...section,
          displayOrder: index
        })),
        additionalInfo: additionalInfo.map((item, index) => ({
          ...item,
          displayOrder: index
        }))
      };

      console.log('📤 Submitting privacy data:', submitData);

      const response = await fetch('http://localhost:5000/api/privacy/admin', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      console.log('📡 Response status:', response.status);

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'You do not have permission to update privacy policy');
        setIsSubmitting(false);
        return;
      }

      const result = await response.json();
      console.log('📥 Response data:', result);

      if (result.success) {
        toast.success('Privacy policy updated successfully!');
        await fetchPrivacyData();
      } else {
        toast.error(result.error || 'Failed to update privacy policy');
      }
    } catch (error) {
      console.error('Error saving privacy policy:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // RESET HANDLER
  // ============================================================

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset to default privacy policy configuration?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        return;
      }

      const response = await fetch('http://localhost:5000/api/privacy/admin/reset', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const result = await response.json();

      if (response.status === 403) {
        toast.error('You do not have permission to reset privacy policy');
        return;
      }

      if (result.success) {
        toast.success('Privacy policy reset to default');
        setSections(getDefaultSections());
        setAdditionalInfo(getDefaultAdditionalInfo());
        setHeroTitle('Your Privacy');
        setHeroSubtitle('Matters to Us');
        setHeroDescription('We are committed to protecting your personal data and being transparent about how we collect, use, and safeguard your information.');
        setHeroImage('https://i.ibb.co.com/SXv2zphh/top-view-vr-glasses-earphones-arrangement.jpg');
        setCtaImage('https://i.ibb.co.com/0RHQ0thP/jh.png');
        setIntroText('');
        setQuickInfo({
          email: '',
          phone: '',
          responseTime: ''
        });
        await fetchPrivacyData();
      } else {
        toast.error(result.error || 'Failed to reset privacy policy');
      }
    } catch (error) {
      console.error('Error resetting privacy policy:', error);
      toast.error('Network error. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <p className="text-gray-500 mt-2">Loading privacy policy...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="privacy_management">
      <div className="min-h-screen bg-gray-50">
        <SectionEditModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditTarget(null);
            setIsEditing(false);
            setIsAdditionalInfo(false);
          }}
          onSave={isAdditionalInfo ? saveAdditionalInfo : saveSection}
          section={editTarget?.section}
          isEditing={isEditing}
          isAdditionalInfo={isAdditionalInfo}
          title={isAdditionalInfo ? 'Additional Info' : 'Section'}
        />

        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setDeleteTarget(null);
          }}
          onConfirm={confirmDelete}
          itemTitle={deleteTarget?.title || ''}
          itemType={deleteTarget?.type === 'additionalInfo' ? 'Additional Info' : 'Section'}
        />

        {/* Header */}
        <div className="bg-white border-b border-blue-500/20 shadow-lg sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-4">
              
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black truncate">
                        Privacy Policy Management
                      </h1>
                    </div>
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap">
                      Smart Gadget
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/70 mt-0.5 sm:mt-1 truncate">
                    Manage Privacy Policy sections, additional info, images, and content
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-500/10 text-black/80 rounded-lg hover:bg-blue-500/30 transition-colors border border-blue-500/20"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={fetchPrivacyData}
                  className="p-1.5 sm:p-2 text-black/70 hover:bg-blue-500/20 rounded-lg transition-colors hover:text-black"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Page Settings with Image Uploads */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-500/20 p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-black flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                Page Settings & Images
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    placeholder="Your Privacy"
                    className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hero Subtitle
                  </label>
                  <input
                    type="text"
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    placeholder="Matters to Us"
                    className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hero Description
                  </label>
                  <input
                    type="text"
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    placeholder="We are committed to protecting your personal data..."
                    className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Intro Text
                  </label>
                  <textarea
                    value={introText}
                    onChange={(e) => setIntroText(e.target.value)}
                    rows={2}
                    placeholder="Last updated: August 4, 2026 — We value your trust and are committed to protecting your privacy."
                    className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40 resize-none"
                  />
                </div>

                {/* Hero Image Upload */}
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <ImageUpload
                    imageUrl={heroImage}
                    onImageChange={(url) => setHeroImage(url)}
                    onImageRemove={() => setHeroImage('')}
                    label="Hero Banner Image"
                    aspectRatio="16/9"
                  />
                </div>

                {/* CTA Image Upload */}
                <div className="border-t border-gray-200 pt-4">
                  <ImageUpload
                    imageUrl={ctaImage}
                    onImageChange={(url) => setCtaImage(url)}
                    onImageRemove={() => setCtaImage('')}
                    label="CTA Background Image"
                    aspectRatio="16/9"
                  />
                </div>
              </div>
            </div>

            {/* Quick Info Section */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-500/20 p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-black flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-blue-600" />
                Quick Contact Info
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Privacy Email
                  </label>
                  <input
                    type="email"
                    value={quickInfo?.email || ''}
                    onChange={(e) => setQuickInfo({
                      ...quickInfo,
                      email: e.target.value
                    })}
                    placeholder="privacy@smartgadget.com"
                    className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Privacy Phone
                  </label>
                  <input
                    type="text"
                    value={quickInfo?.phone || ''}
                    onChange={(e) => setQuickInfo({
                      ...quickInfo,
                      phone: e.target.value
                    })}
                    placeholder="+880 1871-733305"
                    className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Response Time
                  </label>
                  <input
                    type="text"
                    value={quickInfo?.responseTime || ''}
                    onChange={(e) => setQuickInfo({
                      ...quickInfo,
                      responseTime: e.target.value
                    })}
                    placeholder="Within 24 hours"
                    className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
                  />
                </div>
              </div>
            </div>

            {/* Main Sections */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-500/20 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Main Sections
                    <span className="text-xs font-normal text-gray-400 ml-2">
                      ({sections.filter(s => s.isActive === true).length} active, {sections.filter(s => s.isActive === false).length} inactive)
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="inline-flex items-center gap-1">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      Drag and drop to reorder
                    </span>
                    • Click the pencil icon to edit
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addSection}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-md hover:shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  Add Section
                </button>
              </div>

              <div className="space-y-3">
                {sections.map((section, index) => (
                  <SectionItem
                    key={section.id || index}
                    section={{
                      ...section,
                      totalSections: sections.length
                    }}
                    index={index}
                    onUpdate={updateSection}
                    onRemove={removeSection}
                    onMove={moveSection}
                    onEdit={editSection}
                    isFirst={index === 0}
                    isLast={index === sections.length - 1}
                    isAdditionalInfo={false}
                  />
                ))}
              </div>

              {sections.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Shield className="w-12 h-12 mx-auto mb-3 text-blue-600/30" />
                  <p>No sections added</p>
                  <p className="text-sm">Click "Add Section" to create your first Privacy Policy section</p>
                </div>
              )}
            </div>

            {/* Additional Info Section */}
            <div className="bg-white rounded-xl shadow-sm border border-purple-500/20 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                    <Info className="w-5 h-5 text-purple-600" />
                    Additional Information
                    <span className="text-xs font-normal text-gray-400 ml-2">
                      ({additionalInfo.filter(s => s.isActive === true).length} active, {additionalInfo.filter(s => s.isActive === false).length} inactive)
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="inline-flex items-center gap-1">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      Drag and drop to reorder
                    </span>
                    • Click the pencil icon to edit
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addAdditionalInfo}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold shadow-md hover:shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  Add Additional Info
                </button>
              </div>

              <div className="space-y-3">
                {additionalInfo.map((item, index) => (
                  <SectionItem
                    key={item.id || index}
                    section={{
                      ...item,
                      totalSections: additionalInfo.length
                    }}
                    index={index}
                    onUpdate={updateAdditionalInfo}
                    onRemove={removeAdditionalInfo}
                    onMove={moveAdditionalInfo}
                    onEdit={editAdditionalInfo}
                    isFirst={index === 0}
                    isLast={index === additionalInfo.length - 1}
                    isAdditionalInfo={true}
                  />
                ))}
              </div>

              {additionalInfo.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Info className="w-12 h-12 mx-auto mb-3 text-purple-600/30" />
                  <p>No additional info added</p>
                  <p className="text-sm">Click "Add Additional Info" to create additional policy information</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Privacy Policy</span>
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