
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   Plus, 
//   X, 
//   Trash2,
//   Edit,
//   Check,
//   RefreshCw,
//   Loader2,
//   Tag,
//   AlertCircle,
//   ArrowLeft
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ============================================
// // DELETE CONFIRMATION MODAL
// // ============================================
// const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, tagName, isDeleting }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-red-100">
//         <div className="flex items-center gap-3 text-red-600 mb-4">
//           <div className="p-2 bg-red-100 rounded-full">
//             <AlertCircle className="w-6 h-6" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900">Delete Tag</h3>
//         </div>
        
//         <p className="text-gray-600 mb-2">
//           Are you sure you want to delete <span className="font-semibold text-[#06B6D4]">"{tagName}"</span>?
//         </p>
//         <p className="text-sm text-gray-500 mb-6">
//           This action cannot be undone. The tag will be permanently removed.
//         </p>

//         <div className="flex items-center justify-end gap-3">
//           <button
//             onClick={onClose}
//             disabled={isDeleting}
//             className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={isDeleting}
//             className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-200/50 flex items-center gap-2 disabled:opacity-50"
//           >
//             {isDeleting ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Deleting...
//               </>
//             ) : (
//               <>
//                 <Trash2 className="w-4 h-4" />
//                 Delete Tag
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function TagsManagementPage() {
//   const router = useRouter();
//   const [tags, setTags] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingTag, setEditingTag] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [userRole, setUserRole] = useState('');
  
//   // Delete Modal State
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [tagToDelete, setTagToDelete] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);
  
//   // Form state
//   const [tagName, setTagName] = useState('');

//   // Get user role on mount
//   useEffect(() => {
//     const getUserRole = () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           const payload = JSON.parse(atob(token.split('.')[1]));
//           setUserRole(payload.role || '');
//         }
//       } catch (error) {
//         console.error('Error getting user role:', error);
//       }
//     };
//     getUserRole();
//   }, []);

//   // Check if user can delete (Super Admin and Admin only)
//   const canDelete = userRole === 'super_admin' || userRole === 'admin';

//   const fetchTags = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/tags', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setTags(data.data);
//       }
//     } catch (error) {
//       toast.error('Failed to fetch tags');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTags();
//   }, []);

//   const resetForm = () => {
//     setTagName('');
//     setEditingTag(null);
//   };

//   const handleCreateTag = async () => {
//     if (!tagName.trim()) {
//       toast.error('Tag name is required');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/tags', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name: tagName.trim()
//         })
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Tag created successfully');
//         setShowCreateModal(false);
//         resetForm();
//         fetchTags();
//       } else {
//         toast.error(data.error || 'Failed to create tag');
//       }
//     } catch (error) {
//       toast.error('Failed to create tag');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEditClick = (tag) => {
//     setEditingTag(tag);
//     setTagName(tag.name);
//     setShowEditModal(true);
//   };

//   const handleUpdateTag = async () => {
//     if (!tagName.trim()) {
//       toast.error('Tag name is required');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/tags/${editingTag._id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name: tagName.trim()
//         })
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Tag updated successfully');
//         setShowEditModal(false);
//         resetForm();
//         fetchTags();
//       } else {
//         toast.error(data.error || 'Failed to update tag');
//       }
//     } catch (error) {
//       toast.error('Failed to update tag');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleToggleStatus = async (tagId, currentStatus) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/tags/${tagId}/toggle`, {
//         method: 'PUT',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         toast.success(`Tag ${data.data.isActive ? 'activated' : 'deactivated'}`);
//         fetchTags();
//       }
//     } catch (error) {
//       toast.error('Failed to toggle tag status');
//     }
//   };

//   const handleDeleteClick = (tag) => {
//     setTagToDelete(tag);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!tagToDelete) return;
    
//     setIsDeleting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/tags/${tagToDelete._id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         toast.success('Tag deleted successfully');
//         setShowDeleteModal(false);
//         setTagToDelete(null);
//         fetchTags();
//       } else {
//         toast.error(data.error || 'Failed to delete tag');
//       }
//     } catch (error) {
//       toast.error('Failed to delete tag');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <ProtectedRoute pageKey="manage_tags">
//       <div className="min-h-screen bg-[#f0f7fa]">
//         {/* Delete Confirmation Modal */}
//         <DeleteConfirmModal
//           isOpen={showDeleteModal}
//           onClose={() => {
//             setShowDeleteModal(false);
//             setTagToDelete(null);
//           }}
//           onConfirm={handleDeleteConfirm}
//           tagName={tagToDelete?.name || ''}
//           isDeleting={isDeleting}
//         />

//         {/* Header */}
//         <div className="bg-[#004767] border-b border-[#06B6D4]/20 shadow-lg sticky top-0 z-10">
//           <div className="px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <Link href="/authorize/dashboard" className="p-2 hover:bg-[#06B6D4]/20 rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5 text-white/80 hover:text-white" />
//                 </Link>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <Tag className="w-6 h-6 text-[#06B6D4]" />
//                     <h1 className="text-xl font-bold text-white">Product Tags</h1>
//                   </div>
//                   <p className="text-sm text-white/70 mt-1">Manage product tags for your store</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowCreateModal(true)}
//                 className="flex items-center gap-2 px-4 py-2 bg-[#06B6D4] text-[#004767] rounded-lg hover:bg-[#0891B2] transition-colors font-semibold shadow-md hover:shadow-lg"
//               >
//                 <Plus className="w-4 h-4" />
//                 Create Tag
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* Refresh Button */}
//           <div className="flex justify-end mb-4">
//             <button
//               onClick={fetchTags}
//               className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-[#06B6D4]/20 rounded-lg hover:bg-[#06B6D4]/5 transition-colors text-gray-600 hover:text-[#06B6D4]"
//             >
//               <RefreshCw className="w-4 h-4" />
//               Refresh
//             </button>
//           </div>

//           {loading ? (
//             <div className="flex justify-center py-12">
//               <Loader2 className="w-8 h-8 animate-spin text-[#06B6D4]" />
//             </div>
//           ) : tags.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-xl border border-[#06B6D4]/20 shadow-sm">
//               <Tag className="w-12 h-12 text-[#06B6D4]/40 mx-auto mb-3" />
//               <p className="text-gray-500">No tags created yet</p>
//               <button
//                 onClick={() => setShowCreateModal(true)}
//                 className="mt-3 text-[#06B6D4] hover:text-[#0891B2] font-medium"
//               >
//                 Create your first tag
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {tags.map(tag => (
//                 <div key={tag._id} className="bg-white rounded-xl shadow-sm border border-[#06B6D4]/20 p-4 hover:shadow-md transition-shadow">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center flex-shrink-0">
//                       <Tag className="w-5 h-5 text-[#06B6D4]" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-medium text-gray-900 truncate">{tag.name}</h3>
//                       <p className="text-xs text-gray-500">
//                         {tag.isActive ? (
//                           <span className="text-green-600 flex items-center gap-1">
//                             <Check className="w-3 h-3" /> Active
//                           </span>
//                         ) : (
//                           <span className="text-gray-400 flex items-center gap-1">
//                             <X className="w-3 h-3" /> Inactive
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <button
//                         onClick={() => handleEditClick(tag)}
//                         className="p-1.5 text-[#06B6D4] hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//                         title="Edit"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleToggleStatus(tag._id, tag.isActive)}
//                         className={`p-1.5 rounded-lg transition-colors ${
//                           tag.isActive 
//                             ? 'text-yellow-600 hover:bg-yellow-50' 
//                             : 'text-green-600 hover:bg-green-50'
//                         }`}
//                         title={tag.isActive ? 'Deactivate' : 'Activate'}
//                       >
//                         {tag.isActive ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
//                       </button>
//                       <button
//                         onClick={() => canDelete && handleDeleteClick(tag)}
//                         disabled={!canDelete}
//                         className={`p-1.5 rounded-lg transition-colors ${
//                           canDelete 
//                             ? 'text-red-500 hover:bg-red-50' 
//                             : 'text-gray-300 cursor-not-allowed'
//                         }`}
//                         title={canDelete ? 'Delete' : 'Delete disabled for Moderator'}
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Create Tag Modal - No Image */}
//         {showCreateModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 border border-[#06B6D4]/20">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                   <Plus className="w-5 h-5 text-[#06B6D4]" />
//                   Create New Tag
//                 </h3>
//                 <button 
//                   onClick={() => {
//                     setShowCreateModal(false);
//                     resetForm();
//                   }} 
//                   className="p-1 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//                 >
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Tag Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={tagName}
//                     onChange={(e) => setTagName(e.target.value)}
//                     placeholder="e.g., Best Seller, Trending, New Release"
//                     className="w-full px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40"
//                     autoFocus
//                   />
//                   <p className="text-xs text-gray-400 mt-1">Enter a unique tag name for categorizing products</p>
//                 </div>
                
//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={() => {
//                       setShowCreateModal(false);
//                       resetForm();
//                     }}
//                     className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleCreateTag}
//                     disabled={isSubmitting}
//                     className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#06B6D4] to-[#004767] rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-[#06B6D4]/20"
//                   >
//                     {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
//                     Create Tag
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Edit Tag Modal - No Image */}
//         {showEditModal && editingTag && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 border border-[#06B6D4]/20">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                   <Edit className="w-5 h-5 text-[#06B6D4]" />
//                   Edit Tag
//                 </h3>
//                 <button 
//                   onClick={() => {
//                     setShowEditModal(false);
//                     resetForm();
//                   }} 
//                   className="p-1 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//                 >
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Tag Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={tagName}
//                     onChange={(e) => setTagName(e.target.value)}
//                     placeholder="e.g., Best Seller, Trending, New Release"
//                     className="w-full px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40"
//                     autoFocus
//                   />
//                 </div>
                
//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={() => {
//                       setShowEditModal(false);
//                       resetForm();
//                     }}
//                     className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleUpdateTag}
//                     disabled={isSubmitting}
//                     className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#06B6D4] to-[#004767] rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-[#06B6D4]/20"
//                   >
//                     {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
//                     Update Tag
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </ProtectedRoute>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus, 
  X, 
  Trash2,
  Edit,
  Check,
  RefreshCw,
  Loader2,
  Tag,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ============================================
// DELETE CONFIRMATION MODAL
// ============================================
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, tagName, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-red-100">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <div className="p-2 bg-red-100 rounded-full">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Delete Tag</h3>
        </div>
        
        <p className="text-gray-600 mb-2">
          Are you sure you want to delete <span className="font-semibold text-blue-600">"{tagName}"</span>?
        </p>
        <p className="text-sm text-gray-500 mb-6">
          This action cannot be undone. The tag will be permanently removed.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-200/50 flex items-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Tag
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function TagsManagementPage() {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userRole, setUserRole] = useState('');
  
  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Form state
  const [tagName, setTagName] = useState('');

  // Get user role on mount
  useEffect(() => {
    const getUserRole = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUserRole(payload.role || '');
        }
      } catch (error) {
        console.error('Error getting user role:', error);
      }
    };
    getUserRole();
  }, []);

  // Check if user can delete (Super Admin and Admin only)
  const canDelete = userRole === 'super_admin' || userRole === 'admin';

  const fetchTags = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tags', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setTags(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch tags');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const resetForm = () => {
    setTagName('');
    setEditingTag(null);
  };

  const handleCreateTag = async () => {
    if (!tagName.trim()) {
      toast.error('Tag name is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tags', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: tagName.trim()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Tag created successfully');
        setShowCreateModal(false);
        resetForm();
        fetchTags();
      } else {
        toast.error(data.error || 'Failed to create tag');
      }
    } catch (error) {
      toast.error('Failed to create tag');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (tag) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setShowEditModal(true);
  };

  const handleUpdateTag = async () => {
    if (!tagName.trim()) {
      toast.error('Tag name is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tags/${editingTag._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: tagName.trim()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Tag updated successfully');
        setShowEditModal(false);
        resetForm();
        fetchTags();
      } else {
        toast.error(data.error || 'Failed to update tag');
      }
    } catch (error) {
      toast.error('Failed to update tag');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (tagId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tags/${tagId}/toggle`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Tag ${data.data.isActive ? 'activated' : 'deactivated'}`);
        fetchTags();
      }
    } catch (error) {
      toast.error('Failed to toggle tag status');
    }
  };

  const handleDeleteClick = (tag) => {
    setTagToDelete(tag);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!tagToDelete) return;
    
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tags/${tagToDelete._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Tag deleted successfully');
        setShowDeleteModal(false);
        setTagToDelete(null);
        fetchTags();
      } else {
        toast.error(data.error || 'Failed to delete tag');
      }
    } catch (error) {
      toast.error('Failed to delete tag');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ProtectedRoute pageKey="manage_tags">
      <div className="min-h-screen bg-white">
        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setTagToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          tagName={tagToDelete?.name || ''}
          isDeleting={isDeleting}
        />

        {/* Header - Blue & Black Theme */}
        <div className="bg-white border-b border-blue-600/20 shadow-lg sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <a href="/authorize/dashboard" className="p-2 hover:bg-blue-600/20 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-black/80 hover:text-black" />
                </a>
                <div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-6 h-6 text-blue-400" />
                    <h1 className="text-xl font-bold text-black">Product Tags</h1>
                  </div>
                  <p className="text-sm text-black/70 mt-1">Manage product tags for your store</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Create Tag
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Refresh Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={fetchTags}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 hover:text-blue-600"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : tags.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
              <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No tags created yet</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first tag
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tags.map(tag => (
                <div key={tag._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Tag className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{tag.name}</h3>
                      <p className="text-xs text-gray-500">
                        {tag.isActive ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Active
                          </span>
                        ) : (
                          <span className="text-gray-400 flex items-center gap-1">
                            <X className="w-3 h-3" /> Inactive
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditClick(tag)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(tag._id, tag.isActive)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          tag.isActive 
                            ? 'text-yellow-600 hover:bg-yellow-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={tag.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {tag.isActive ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => canDelete && handleDeleteClick(tag)}
                        disabled={!canDelete}
                        className={`p-1.5 rounded-lg transition-colors ${
                          canDelete 
                            ? 'text-red-500 hover:bg-red-50' 
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                        title={canDelete ? 'Delete' : 'Delete disabled for Moderator'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Tag Modal - Blue & Black Theme */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-600" />
                  Create New Tag
                </h3>
                <button 
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }} 
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tag Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    placeholder="e.g., Best Seller, Trending, New Release"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-400"
                    autoFocus
                  />
                  <p className="text-xs text-gray-400 mt-1">Enter a unique tag name for categorizing products</p>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateTag}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    Create Tag
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Tag Modal - Blue & Black Theme */}
        {showEditModal && editingTag && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" />
                  Edit Tag
                </h3>
                <button 
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }} 
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tag Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    placeholder="e.g., Best Seller, Trending, New Release"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-400"
                    autoFocus
                  />
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateTag}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    Update Tag
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}