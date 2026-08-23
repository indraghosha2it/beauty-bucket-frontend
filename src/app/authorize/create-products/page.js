
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  DollarSign,
  Tag,
  Info,
  Star,
  Search,
  Hash,
  Layers,
  Box,
  ChevronDown,
  GripVertical,
  Palette,
  TrendingUp,
  Zap,
  Clock,
  Flame,
  Gift,
  CheckCircle,
  RefreshCw,
  Building2,
  Video,
  Youtube,
  Link as LinkIcon,
  Scan,
  Barcode,
  Sparkles,
  Edit3,
  Eye,
  Type,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import { MantineProvider } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import TiptapLink from '@tiptap/extension-link';
import { SketchPicker } from 'react-color';

import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import MediaLibraryPicker from '@/app/components/MediaLibraryPicker';
import ProtectedRoute from '@/app/components/ProtectedRoute';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Unit options
const UNIT_OPTIONS = [
  { value: 'pcs', label: 'Pieces (pcs)' },
  { value: 'ton', label: 'Ton (ton)' },
  { value: 'other', label: 'Other' }
];

// Color presets
const COLOR_PRESETS = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#008000', '#FFC0CB', '#A52A2A', '#808080', '#C0C0C0',
  '#4A90E2'
];

// Draft key
const DRAFT_KEY = 'beauty_bucket_product_draft';

// ============================================================
// COMPONENTS
// ============================================================

// Restore Draft Modal
const RestoreDraftModal = ({ isOpen, onConfirm, onCancel, draftData }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center gap-3 text-amber-600 mb-4">
          <AlertCircle className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Unsaved Draft Found</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">
          You have unsaved draft data from your last session.
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Would you like to restore it? If you choose not to restore, the draft will be discarded.
        </p>
        
        {draftData && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
            <p className="font-medium text-gray-700 mb-1">Draft preview:</p>
            {draftData.productName && (
              <p className="text-gray-600">Product: {draftData.productName}</p>
            )}
            {draftData.brand && (
              <p className="text-gray-600">Brand: {draftData.brand}</p>
            )}
            <p className="text-gray-500 mt-1">
              Last saved: {new Date().toLocaleString()}
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Discard Draft
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Restore Draft
          </button>
        </div>
      </div>
    </div>
  );
};

// Add Brand Modal - WITHOUT Logo and Description
const AddBrandModal = ({ isOpen, onClose, onBrandAdded }) => {
  const [brandName, setBrandName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!brandName.trim()) {
      toast.error('Please enter a brand name');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/brands', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: brandName.trim()
          // Removed logo and description
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Brand added successfully');
        setBrandName('');
        onBrandAdded(data.data);
        onClose();
      } else {
        toast.error(data.error || 'Failed to add brand');
      }
    } catch (error) {
      console.error('Error adding brand:', error);
      toast.error('Failed to add brand');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-pink-600" />
            Add New Brand
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g., Apple, Samsung, Sony"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
              autoFocus
            />
            <p className="text-xs text-gray-400 mt-1">Enter the brand name (e.g., Apple, Samsung, Sony)</p>
          </div>
          
          <div className="flex gap-3 mt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add Brand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Tag Modal - WITH IMAGE UPLOAD
const AddTagModal = ({ isOpen, onClose, onTagAdded }) => {
  const [tagName, setTagName] = useState('');
  const [tagImage, setTagImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Image upload function for tags
  const uploadTagImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');
    
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
        return data.secure_url;
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  const handleImageUpload = async (e) => {
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

    setIsUploading(true);
    try {
      const url = await uploadTagImage(file);
      setTagImage(url);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    setTagImage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!tagName.trim()) {
      toast.error('Please enter a tag name');
      return;
    }

    if (!tagImage) {
      toast.error('Please upload a tag image');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');

      // ✅ Using API_URL constant now
      const response = await fetch(`${API_URL}/api/tags`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: tagName.trim(),
          image: tagImage
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Tag added successfully');
        setTagName('');
        setTagImage('');
        onTagAdded(data.data);
        onClose();
      } else {
        toast.error(data.error || 'Failed to add tag');
      }
    } catch (error) {
      console.error('Error adding tag:', error);
      toast.error('Failed to add tag');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-pink-600" />
            Add New Tag
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Tag Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tag Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="e.g., Best Seller, New Arrival, Trending"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
              autoFocus
            />
            <p className="text-xs text-gray-400 mt-1">Enter a unique tag name for categorizing products</p>
          </div>

          {/* Tag Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tag Image <span className="text-red-500">*</span>
            </label>
            
            {tagImage ? (
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-pink-500/30 bg-gray-100">
                  <img 
                    src={tagImage} 
                    alt={tagName || 'Tag'} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '';
                      e.target.alt = 'No image';
                    }}
                  />
                </div>
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleRemoveImage}
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
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                <span className="text-xs text-gray-400">JPG, PNG, WebP (max 5MB)</span>
              </div>
            )}
            <p className="text-xs text-gray-400 mt-1">Recommended: Square image, 100x100px</p>
          </div>
          
          <div className="flex gap-3 mt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !tagImage}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add Tag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Color Picker Component
const ColorPicker = ({ colors, onChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(null);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
        setCurrentColorIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addColor = () => {
    onChange([...colors, { code: '#000000' }]);
  };

  const removeColor = (index) => {
    const updatedColors = colors.filter((_, i) => i !== index);
    onChange(updatedColors);
  };

  const openColorPicker = (index, event) => {
    event.stopPropagation();
    setCurrentColorIndex(index);
    setShowColorPicker(true);
  };

  const handleColorChange = (index, color) => {
    const updatedColors = [...colors];
    updatedColors[index] = { code: color.hex };
    onChange(updatedColors);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {COLOR_PRESETS.map(color => (
          <button
            key={color}
            type="button"
            onClick={() => {
              if (colors.length === 0) {
                onChange([{ code: color }]);
              } else {
                const updatedColors = [...colors];
                updatedColors[0] = { code: color };
                onChange(updatedColors);
              }
            }}
            className="w-8 h-8 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform shadow-sm"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      
      <div className="space-y-2">
        {colors.map((color, index) => (
          <div key={index} className="relative">
            <div className="flex items-center gap-2 w-full">
              <div 
                className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-2 cursor-pointer hover:border-pink-600 transition-colors"
                onClick={(e) => openColorPicker(index, e)}
              >
                <div 
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0"
                  style={{ backgroundColor: color.code }}
                />
                <div className="flex-1 font-mono text-sm text-gray-600">
                  {color.code}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
              </div>
              
              <button
                type="button"
                onClick={() => removeColor(index)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                title="Remove Color"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {showColorPicker && currentColorIndex === index && (
              <div ref={colorPickerRef} className="absolute right-0 mt-2 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
                  <SketchPicker
                    color={color.code}
                    onChange={(newColor) => handleColorChange(index, newColor)}
                    presetColors={COLOR_PRESETS}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addColor}
          className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium text-pink-600 border border-dashed border-pink-600/40 rounded-lg hover:bg-pink-600/5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Color
        </button>
      </div>
    </div>
  );
};

// Image Upload Helpers
const compressImageSmart = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
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
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');
  
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

const uploadVideoToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
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
    console.error('Cloudinary video upload error:', error);
    throw error;
  }
};

const getYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Get user role from localStorage
const getUserRole = () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || '';
    }
  } catch (error) {
    console.error('Error getting user role:', error);
  }
  return '';
};

// ============================================================
// Image Slot Picker Modal
// ============================================================
const ImageSlotPickerModal = ({ isOpen, onClose, onUploadFromDevice, onChooseFromLibrary }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-pink-600/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#004767]">Add Image to Slot</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mb-6">Choose how you want to add an image to this slot:</p>
        
        <div className="space-y-3">
          <button
            onClick={onUploadFromDevice}
            className="w-full flex items-center gap-4 px-4 py-4 bg-white border-2 border-pink-600/20 rounded-xl hover:border-pink-600 hover:bg-pink-600/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-pink-600/10 flex items-center justify-center group-hover:bg-pink-600/20 transition-colors">
              <Upload className="w-6 h-6 text-pink-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-[#004767]">Upload from Device</p>
              <p className="text-xs text-gray-400">Select an image from your computer</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-pink-600 transition-colors" />
          </button>
          
          <button
            onClick={onChooseFromLibrary}
            className="w-full flex items-center gap-4 px-4 py-4 bg-white border-2 border-pink-600/20 rounded-xl hover:border-pink-600 hover:bg-pink-600/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-pink-600/10 flex items-center justify-center group-hover:bg-pink-600/20 transition-colors">
              <ImageIcon className="w-6 h-6 text-pink-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-[#004767]">Choose from Media Library</p>
              <p className="text-xs text-gray-400">Select an image from your media library</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-pink-600 transition-colors" />
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};



// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CreateProductPage() {
  const router = useRouter();
  
  // ========== STATE DECLARATIONS ==========
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isGeneratingSku, setIsGeneratingSku] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [childSubcategories, setChildSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const [showFaqs, setShowFaqs] = useState(false);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  const [showCustomUnit, setShowCustomUnit] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [pendingDraft, setPendingDraft] = useState(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isFullEditorReady, setIsFullEditorReady] = useState(false);
  const [isDeliveryEditorReady, setIsDeliveryEditorReady] = useState(false);
  const [productTags, setProductTags] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [ratingHover, setRatingHover] = useState(0);
  
  // Media Library States
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [showSingleMediaPicker, setShowSingleMediaPicker] = useState(false);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [showSlotPicker, setShowSlotPicker] = useState(false);
  const [slotPickerIndex, setSlotPickerIndex] = useState(null);
  
  // Video Media Library States
  const [showVideoMediaPicker, setShowVideoMediaPicker] = useState(false);
  
  // ========== SLUG STATE ==========
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [isSlugAvailable, setIsSlugAvailable] = useState(null);
  const slugCheckTimeoutRef = useRef(null);
  
  // Video states
  const [videoType, setVideoType] = useState('upload');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoUpload, setVideoUpload] = useState({
    file: null,
    preview: null,
    uploading: false,
    error: '',
    url: null,
    publicId: null
  });
  const videoInputRef = useRef(null);

  const fileInputRefs = useRef([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const autoSaveTimerRef = useRef(null);
  const isRestoringRef = useRef(false);

  // ========== FORM DATA ==========
  const [formData, setFormData] = useState({
    productName: '',
    slug: '',
    skuCode: '',
    shortDescription: '',
    fullDescription: '',
    category: '',
    subcategory: '',
    childSubcategory: '',
    brand: '',
    stockQuantity: '',
    stockAlertQuantity: '',
    regularPrice: '',
    costPerItem: '',
    discountPrice: '',
    buyingPrice: '',
    packagingCost: '', // NEW
  deliveryCost: '', // NEW
    unit: 'pcs',
    customUnit: '',
    colors: [],
    deliveryInfo: '',
    additionalInfo: [],
    tags: [],
    isFeatured: false,
    showOnBanner: false,
    rating: 0,
    faqs: [],
    metaSettings: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: []
    },
    videoUrl: '',
    videoPublicId: '',
    videoType: 'upload'
  });

  // ========== PRODUCT IMAGES ==========
  const [productImages, setProductImages] = useState([
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }
  ]);

  const [errors, setErrors] = useState({});

  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
  const maxFileSize = 5 * 1024 * 1024;
  const maxVideoSize = 100 * 1024 * 1024;

  // ========== EDITOR SETUP ==========
  const shortDescEditor = useEditor({
    extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: formData.shortDescription,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, shortDescription: editor.getHTML() }));
      saveToLocalStorage();
    },
    onReady: () => setIsEditorReady(true),
    immediatelyRender: false,
  });

  const fullDescEditor = useEditor({
    extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: formData.fullDescription,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, fullDescription: editor.getHTML() }));
      saveToLocalStorage();
    },
    onReady: () => setIsFullEditorReady(true),
    immediatelyRender: false,
  });

  const deliveryInfoEditor = useEditor({
    extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: formData.deliveryInfo,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, deliveryInfo: editor.getHTML() }));
      saveToLocalStorage();
    },
    onReady: () => setIsDeliveryEditorReady(true),
    immediatelyRender: false,
  });

  // ============================================================
  // FAQ HANDLERS
  // ============================================================
  const addFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
    saveToLocalStorage();
  };

  const updateFaq = (index, field, value) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setFormData(prev => ({ ...prev, faqs: updatedFaqs }));
    saveToLocalStorage();
  };

  const removeFaq = (index) => {
    const updatedFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, faqs: updatedFaqs }));
    saveToLocalStorage();
  };

  // ============================================================
  // SLUG UNIQUENESS CHECK
  // ============================================================
  const checkSlugUniqueness = async (slug) => {
    if (!slug || slug.length < 2) {
      setIsSlugAvailable(null);
      setErrors(prev => ({ ...prev, slug: null }));
      return;
    }

    setIsCheckingSlug(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/products/check-slug/${encodeURIComponent(slug)}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await response.json();
      
      const isAvailable = data.data?.isAvailable !== false;
      setIsSlugAvailable(isAvailable);
      
      if (!isAvailable) {
        setErrors(prev => ({ 
          ...prev, 
          slug: `Slug "${slug}" is already taken. Please choose a different one.` 
        }));
        toast.error(`Slug "${slug}" is already taken. Please choose a different one.`);
      } else {
        setErrors(prev => ({ ...prev, slug: null }));
        if (isSlugManuallyEdited) {
          toast.success(`Slug "${slug}" is available!`);
        }
      }
    } catch (error) {
      console.error('Error checking slug:', error);
      setIsSlugAvailable(null);
    } finally {
      setIsCheckingSlug(false);
    }
  };

  // ============================================================
  // EFFECTS
  // ============================================================
  
  useEffect(() => {
    if (formData.productName && !isSlugManuallyEdited) {
      const generatedSlug = formData.productName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
      saveToLocalStorage();
    }
  }, [formData.productName, isSlugManuallyEdited]);


 

  useEffect(() => {
    if (slugCheckTimeoutRef.current) {
      clearTimeout(slugCheckTimeoutRef.current);
    }
    
    if (formData.slug && isSlugManuallyEdited) {
      slugCheckTimeoutRef.current = setTimeout(() => {
        checkSlugUniqueness(formData.slug);
      }, 500);
    } else if (formData.slug && !isSlugManuallyEdited) {
      checkSlugUniqueness(formData.slug);
    } else {
      setIsSlugAvailable(null);
    }
    
    return () => {
      if (slugCheckTimeoutRef.current) {
        clearTimeout(slugCheckTimeoutRef.current);
      }
    };
  }, [formData.slug, isSlugManuallyEdited]);

  const saveToLocalStorage = () => {
    if (isRestoringRef.current) return;
    
    try {
      const draft = {
        formData: {
          ...formData,
          shortDescription: shortDescEditor?.getHTML() || formData.shortDescription,
          fullDescription: fullDescEditor?.getHTML() || formData.fullDescription,
          deliveryInfo: deliveryInfoEditor?.getHTML() || formData.deliveryInfo,
          showOnBanner: formData.showOnBanner,
          videoUrl: formData.videoUrl,
          videoPublicId: formData.videoPublicId,
          videoType: videoType,
          rating: formData.rating,
          faqs: formData.faqs,
          slug: formData.slug,
          buyingPrice: formData.buyingPrice
        },
        productImages: productImages.map(img => ({
          ...img,
          preview: img.url || null,
          file: null,
          uploading: false
        })),
        videoUpload: {
          ...videoUpload,
          preview: videoUpload.url || null,
          file: null,
          uploading: false
        },
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

useEffect(() => {
    fetchDefaultCosts();
  }, []);

  useEffect(() => {
  // Check if any of the fields have values
  const hasBuyingPrice = formData.buyingPrice !== '' && formData.buyingPrice !== null && formData.buyingPrice !== undefined;
  const hasPackagingCost = formData.packagingCost !== '' && formData.packagingCost !== null && formData.packagingCost !== undefined;
  const hasDeliveryCost = formData.deliveryCost !== '' && formData.deliveryCost !== null && formData.deliveryCost !== undefined;
  
  if (hasBuyingPrice || hasPackagingCost || hasDeliveryCost) {
    // Use a small delay to ensure state is updated
    const timer = setTimeout(() => {
      calculateCostPerItem();
    }, 50);
    return () => clearTimeout(timer);
  }
}, [formData.buyingPrice, formData.packagingCost, formData.deliveryCost]);

// COST PER ITEM AUTO-CALCULATION
// ============================================================
const calculateCostPerItem = useCallback(() => {
  // Get current values directly from the latest state
  const buyingPrice = formData.buyingPrice === '' || formData.buyingPrice === null || formData.buyingPrice === undefined 
    ? 0 
    : Number(formData.buyingPrice);
    
  const packagingCost = formData.packagingCost === '' || formData.packagingCost === null || formData.packagingCost === undefined 
    ? 0 
    : Number(formData.packagingCost);
    
  const deliveryCost = formData.deliveryCost === '' || formData.deliveryCost === null || formData.deliveryCost === undefined 
    ? 0 
    : Number(formData.deliveryCost);
  
  // Check which fields have values (must have a value AND be > 0)
  const hasBuyingPrice = formData.buyingPrice !== '' && 
                         formData.buyingPrice !== null && 
                         formData.buyingPrice !== undefined && 
                         Number(formData.buyingPrice) > 0;
  
  const hasPackagingCost = formData.packagingCost !== '' && 
                           formData.packagingCost !== null && 
                           formData.packagingCost !== undefined && 
                           Number(formData.packagingCost) > 0;
  
  const hasDeliveryCost = formData.deliveryCost !== '' && 
                          formData.deliveryCost !== null && 
                          formData.deliveryCost !== undefined && 
                          Number(formData.deliveryCost) > 0;
  
  // Count how many fields have values
  const filledCount = [hasBuyingPrice, hasPackagingCost, hasDeliveryCost].filter(Boolean).length;
  
  let displayValue = '';
  
  if (filledCount === 0) {
    // No values provided - show empty
    displayValue = '';
  } else if (filledCount < 3) {
    // Only some values provided - show formula preview
    const parts = [];
    if (hasBuyingPrice) parts.push(`${buyingPrice}`);
    if (hasPackagingCost) parts.push(`${packagingCost}`);
    if (hasDeliveryCost) parts.push(`${deliveryCost}`);
    while (parts.length < 3) {
      parts.push('?');
    }
    displayValue = parts.join(' + ');
  } else {
    // All three values provided - show calculated result
    const total = buyingPrice + packagingCost + deliveryCost;
    displayValue = total.toString();
  }
  
  setFormData(prev => ({
    ...prev,
    costPerItem: displayValue
  }));
  
  setTimeout(saveToLocalStorage, 100);
}, [formData.buyingPrice, formData.packagingCost, formData.deliveryCost]);

// Watch for changes in the three fields
useEffect(() => {
  calculateCostPerItem();
}, [formData.buyingPrice, formData.packagingCost, formData.deliveryCost, calculateCostPerItem]);


// ============================================================
// FETCH DEFAULT COSTS
// ============================================================
const fetchDefaultCosts = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/product-cost/settings', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await response.json();
    
    if (result.success && result.data) {
      // Get current values before updating
      const currentPackagingCost = formData.packagingCost;
      const currentDeliveryCost = formData.deliveryCost;
      
      const updates = {};
      
      if (!currentPackagingCost || currentPackagingCost === '') {
        updates.packagingCost = result.data.packagingCost?.toString() || '';
      }
      
      if (!currentDeliveryCost || currentDeliveryCost === '') {
        updates.deliveryCost = result.data.deliveryCost?.toString() || '';
      }
      
      if (Object.keys(updates).length > 0) {
        setFormData(prev => ({
          ...prev,
          ...updates
        }));
        
        // Wait for state to update then calculate
        setTimeout(() => {
          // Force calculation with the new values
          const buyingPrice = parseFloat(formData.buyingPrice) || 0;
          const packagingCost = parseFloat(updates.packagingCost || result.data.packagingCost) || 0;
          const deliveryCost = parseFloat(updates.deliveryCost || result.data.deliveryCost) || 0;
          
          // Check which fields have values
          const hasBuyingPrice = formData.buyingPrice !== '' && formData.buyingPrice !== null && formData.buyingPrice !== undefined;
          const hasPackagingCost = updates.packagingCost !== '' && updates.packagingCost !== null && updates.packagingCost !== undefined;
          const hasDeliveryCost = updates.deliveryCost !== '' && updates.deliveryCost !== null && updates.deliveryCost !== undefined;
          
          const filledCount = [hasBuyingPrice, hasPackagingCost, hasDeliveryCost].filter(Boolean).length;
          
          let displayValue = '';
          
          if (filledCount === 0) {
            displayValue = '';
          } else if (filledCount < 3) {
            const parts = [];
            if (hasBuyingPrice) parts.push(`${buyingPrice}`);
            if (hasPackagingCost) parts.push(`${packagingCost}`);
            if (hasDeliveryCost) parts.push(`${deliveryCost}`);
            while (parts.length < 3) {
              parts.push('?');
            }
            displayValue = parts.join(' + ');
          } else {
            const total = buyingPrice + packagingCost + deliveryCost;
            displayValue = total.toString();
          }
          
          setFormData(prev => ({
            ...prev,
            costPerItem: displayValue
          }));
          
          setTimeout(saveToLocalStorage, 100);
        }, 200);
      } else {
        // If no updates were made, still check if we should calculate
        setTimeout(() => {
          calculateCostPerItem();
        }, 200);
      }
    }
  } catch (error) {
    console.error('Error fetching default costs:', error);
  }
};


  useEffect(() => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      const hasData = formData.productName || formData.shortDescription || formData.fullDescription || productImages.some(img => img.url) || videoUpload.url;
      if (hasData && !isRestoringRef.current) saveToLocalStorage();
    }, 3000);
    return () => { if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current); };
  }, [formData, productImages, videoUpload, youtubeUrl, videoType, shortDescEditor?.getHTML(), fullDescEditor?.getHTML(), deliveryInfoEditor?.getHTML()]);

  useEffect(() => {
    const loadDraft = () => {
      try {
        const savedDraft = localStorage.getItem(DRAFT_KEY);
        if (savedDraft) {
          const draft = JSON.parse(savedDraft);
          const hasData = (draft.formData?.productName && draft.formData.productName.trim() !== '') || 
                         (draft.formData?.shortDescription && draft.formData.shortDescription !== '<p></p>') ||
                         (draft.formData?.fullDescription && draft.formData.fullDescription !== '<p></p>') ||
                         (draft.productImages && draft.productImages.some(img => img.url)) ||
                         (draft.videoUpload?.url);
          
          if (!hasData) {
            localStorage.removeItem(DRAFT_KEY);
            return;
          }
          
          const draftDiscarded = sessionStorage.getItem('draft_discarded');
          if (draftDiscarded === 'true') {
            sessionStorage.removeItem('draft_discarded');
            return;
          }
          
          setPendingDraft(draft);
          setShowRestoreModal(true);
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    };
    loadDraft();
  }, []);

  const handleRestoreDraft = () => {
    if (pendingDraft) {
      isRestoringRef.current = true;
      
      try {
        if (pendingDraft.formData) {
          setFormData({
            ...pendingDraft.formData,
            showOnBanner: pendingDraft.formData.showOnBanner || false,
            videoUrl: pendingDraft.formData.videoUrl || '',
            videoPublicId: pendingDraft.formData.videoPublicId || '',
            videoType: pendingDraft.formData.videoType || 'upload',
            rating: pendingDraft.formData.rating || 0,
            faqs: pendingDraft.formData.faqs || [],
            slug: pendingDraft.formData.slug || '',
            buyingPrice: pendingDraft.formData.buyingPrice || ''
          });
          
          setVideoType(pendingDraft.formData.videoType || 'upload');
          setYoutubeUrl(pendingDraft.formData.videoUrl || '');
          
          setTimeout(() => {
            if (shortDescEditor && pendingDraft.formData.shortDescription) {
              shortDescEditor.commands.setContent(pendingDraft.formData.shortDescription);
            }
            if (fullDescEditor && pendingDraft.formData.fullDescription) {
              fullDescEditor.commands.setContent(pendingDraft.formData.fullDescription);
            }
            if (deliveryInfoEditor && pendingDraft.formData.deliveryInfo) {
              deliveryInfoEditor.commands.setContent(pendingDraft.formData.deliveryInfo);
            }
          }, 100);
        }
        
        if (pendingDraft.productImages) {
          const restoredImages = productImages.map((img, idx) => {
            const savedImg = pendingDraft.productImages[idx];
            if (savedImg && savedImg.url) {
              return { 
                ...img, 
                url: savedImg.url, 
                publicId: savedImg.publicId, 
                preview: savedImg.url, 
                uploading: false, 
                uploadAborted: false 
              };
            }
            return img;
          });
          setProductImages(restoredImages);
        }
        
        if (pendingDraft.videoUpload) {
          setVideoUpload(pendingDraft.videoUpload);
        }
        
        if (pendingDraft.lastSaved) setLastSaved(new Date(pendingDraft.lastSaved));
        toast.success('Draft restored successfully');
        
        setTimeout(() => {
          isRestoringRef.current = false;
          saveToLocalStorage();
        }, 500);
        
      } catch (error) {
        console.error('Error restoring draft:', error);
        toast.error('Failed to restore draft');
        isRestoringRef.current = false;
      }
    }
    setShowRestoreModal(false);
    setPendingDraft(null);
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    sessionStorage.setItem('draft_discarded', 'true');
    setPendingDraft(null);
    setShowRestoreModal(false);
    setLastSaved(null);
    toast.success('Draft discarded');
  };

  const handleClearDraft = () => {
    if (confirm('Are you sure you want to clear the draft? All unsaved data will be lost.')) {
      localStorage.removeItem(DRAFT_KEY);
      setFormData({
        productName: '', slug: '', skuCode: '', shortDescription: '', fullDescription: '', 
        category: '', subcategory: '', childSubcategory: '', brand: '',
        stockQuantity: '', stockAlertQuantity: '', regularPrice: '', costPerItem: '', 
        discountPrice: '', buyingPrice: '', unit: 'pcs', customUnit: '',
        colors: [], deliveryInfo: '', additionalInfo: [], tags: [], isFeatured: false, 
        showOnBanner: false, rating: 0, faqs: [],
        metaSettings: { metaTitle: '', metaDescription: '', metaKeywords: [] },
        videoUrl: '', videoPublicId: '', videoType: 'upload'
      });
      
      if (shortDescEditor) shortDescEditor.commands.setContent('');
      if (fullDescEditor) fullDescEditor.commands.setContent('');
      if (deliveryInfoEditor) deliveryInfoEditor.commands.setContent('');
      
      setProductImages(productImages.map(img => ({ ...img, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null })));
      setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
      setYoutubeUrl('');
      setIsSlugManuallyEdited(false);
      setIsSlugAvailable(null);
      setLastSaved(null);
      toast.success('Draft cleared');
    }
  };

  const handleSaveDraft = () => {
    setIsSavingDraft(true);
    saveToLocalStorage();
    setTimeout(() => { setIsSavingDraft(false); toast.success('Draft saved successfully!'); }, 500);
  };

  const generateSkuFromBackend = async () => {
    setIsGeneratingSku(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/products/generate-sku', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, skuCode: data.data.skuCode }));
        toast.success('SKU generated successfully');
      } else toast.error(data.error || 'Failed to generate SKU');
    } catch (error) { toast.error('Failed to generate SKU'); }
    finally { setIsGeneratingSku(false); }
  };

  // const fetchBrands = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await fetch('http://localhost:5000/api/brands', { headers: { 'Authorization': `Bearer ${token}` } });
  //     const data = await response.json();
  //     if (data.success) setBrands(data.data);
  //   } catch (error) { console.error('Error fetching brands:', error); }
  // };

  const fetchBrands = async () => {
  try {
    const token = localStorage.getItem('token');
    // Option 1: Filter via API query
    const response = await fetch('http://localhost:5000/api/brands?isActive=true', { 
      headers: { 'Authorization': `Bearer ${token}` } 
    });
    const data = await response.json();
    if (data.success) {
      setBrands(data.data);
    }
  } catch (error) { 
    console.error('Error fetching brands:', error); 
  }
};
  const handleBrandAdded = (newBrand) => {
    setBrands(prev => [...prev, newBrand]);
    setFormData(prev => ({ ...prev, brand: newBrand._id }));
  };

  const fetchTags = async () => {
    setIsLoadingTags(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tags?isActive=true', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setProductTags(data.data);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast.error('Failed to fetch tags');
    } finally {
      setIsLoadingTags(false);
    }
  };

  const handleTagAdded = (newTag) => {
    setProductTags(prev => [...prev, newTag]);
    setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag._id] }));
  };

  useEffect(() => {
    generateSkuFromBackend();
    fetchBrands();
    fetchCategories();
    fetchTags();
    setIsMounted(true);
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/categories', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) setCategories(data.data);
    } catch (error) { toast.error('Failed to fetch categories'); }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) setSubcategories(data.data.subcategories);
      else setSubcategories([]);
    } catch (error) { setSubcategories([]); }
  };

  const fetchChildSubcategories = async (categoryId, subcategoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) setChildSubcategories(data.data.children);
      else setChildSubcategories([]);
    } catch (error) { setChildSubcategories([]); }
  };

  useEffect(() => {
    if (formData.category) fetchSubcategories(formData.category);
    else { setSubcategories([]); setFormData(prev => ({ ...prev, subcategory: '', childSubcategory: '' })); setChildSubcategories([]); }
  }, [formData.category]);

  useEffect(() => {
    if (formData.category && formData.subcategory) fetchChildSubcategories(formData.category, formData.subcategory);
    else { setChildSubcategories([]); setFormData(prev => ({ ...prev, childSubcategory: '' })); }
  }, [formData.subcategory]);

  // ============================================================
  // FORM HANDLERS
  // ============================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    saveToLocalStorage();
  };

  const handleSlugChange = (e) => {
    const { value } = e.target;
    setIsSlugManuallyEdited(true);
    setFormData(prev => ({ ...prev, slug: value }));
    if (errors.slug) setErrors(prev => ({ ...prev, slug: null }));
    saveToLocalStorage();
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (value === '') {
      setFormData(prev => ({ ...prev, [name]: '' }));
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setFormData(prev => ({ ...prev, [name]: numValue }));
      }
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    saveToLocalStorage();
  };

  const handleUnitChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, unit: value }));
    setShowCustomUnit(value === 'other');
    if (value !== 'other') setFormData(prev => ({ ...prev, customUnit: '' }));
    saveToLocalStorage();
  };

  const handleTagSelect = (tagId) => {
    if (formData.tags && formData.tags.length === 1 && formData.tags[0] === tagId) {
      setFormData(prev => ({ ...prev, tags: [] }));
    } else {
      setFormData(prev => ({ ...prev, tags: [tagId] }));
    }
    saveToLocalStorage();
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    saveToLocalStorage();
  };

  const addAdditionalInfo = () => {
    setFormData(prev => ({ ...prev, additionalInfo: [...prev.additionalInfo, { fieldName: '', fieldValue: '' }] }));
    saveToLocalStorage();
  };

  const updateAdditionalInfo = (index, field, value) => {
    const updatedInfo = [...formData.additionalInfo];
    updatedInfo[index] = { ...updatedInfo[index], [field]: value };
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
    saveToLocalStorage();
  };

  const removeAdditionalInfo = (index) => {
    const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
    saveToLocalStorage();
  };

  const addKeyword = () => {
    if (!keywordInput.trim()) return;
    const keywordsToAdd = keywordInput.split(',').map(k => k.trim()).filter(k => k !== '');
    setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, metaKeywords: [...(prev.metaSettings.metaKeywords || []), ...keywordsToAdd] } }));
    setKeywordInput('');
    saveToLocalStorage();
  };

  const removeKeyword = (indexToRemove) => {
    setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, metaKeywords: prev.metaSettings.metaKeywords.filter((_, i) => i !== indexToRemove) } }));
    saveToLocalStorage();
  };

  const handleMetaChange = (field, value) => {
    setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, [field]: value } }));
    saveToLocalStorage();
  };

  // ============================================================
  // IMAGE HANDLERS
  // ============================================================
  const validateImageFile = (file) => {
    if (!allowedImageTypes.includes(file.type)) return { valid: false, message: `Invalid format. Allowed: JPG, PNG, WebP, GIF` };
    if (file.size > maxFileSize) return { valid: false, message: `File too large. Max: 5MB` };
    return { valid: true };
  };

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    if (productImages[index].preview?.startsWith('blob:')) URL.revokeObjectURL(productImages[index].preview);

    const validation = validateImageFile(file);
    if (!validation.valid) {
      const updatedImages = [...productImages];
      updatedImages[index] = { ...updatedImages[index], error: validation.message };
      setProductImages(updatedImages);
      toast.error(`Image ${index + 1}: ${validation.message}`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const batchId = Date.now();
    
    setProductImages(prev => {
      const updated = [...prev];
      updated[index] = { file, preview: previewUrl, error: '', uploading: true, url: null, publicId: null, uploadAborted: false, uploadBatchId: batchId };
      return updated;
    });
    saveToLocalStorage();

    try {
      const { url, publicId } = await uploadToCloudinary(file);
      setProductImages(prev => {
        const updated = [...prev];
        if (updated[index] && updated[index].uploadBatchId === batchId && !updated[index].uploadAborted) {
          updated[index] = { ...updated[index], url, publicId, uploading: false };
        }
        return updated;
      });
      toast.success(`Image ${index + 1} uploaded successfully`);
      saveToLocalStorage();
    } catch (error) {
      setProductImages(prev => {
        const updated = [...prev];
        if (updated[index] && updated[index].uploadBatchId === batchId) {
          updated[index] = { ...updated[index], error: 'Failed to upload image', uploading: false, preview: null, file: null };
        }
        return updated;
      });
      toast.error(`Failed to upload image ${index + 1}`);
    }
  };

  const handleMultipleImageSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    const currentImagesCount = productImages.filter(img => img.url !== null || img.uploading).length;
    const availableSlots = 6 - currentImagesCount;
    if (files.length > availableSlots) {
      toast.error(`You can only upload ${availableSlots} more image(s). Maximum 6 images total.`);
      if (fileInputRefs.current['multiple']) fileInputRefs.current['multiple'].value = '';
      return;
    }
    
    const emptySlots = [];
    for (let i = 0; i < productImages.length; i++) {
      if (!productImages[i].url && !productImages[i].uploading && !productImages[i].preview) emptySlots.push(i);
    }
    
    if (files.length > emptySlots.length) {
      toast.error(`Only ${emptySlots.length} slots available. Please remove some images first.`);
      if (fileInputRefs.current['multiple']) fileInputRefs.current['multiple'].value = '';
      return;
    }
    
    const batchId = Date.now();
    for (let i = 0; i < files.length && i < emptySlots.length; i++) {
      const file = files[i];
      const slotIndex = emptySlots[i];
      
      const validation = validateImageFile(file);
      if (!validation.valid) {
        toast.error(`Image ${i + 1}: ${validation.message}`);
        continue;
      }
      
      const previewUrl = URL.createObjectURL(file);
      setProductImages(prev => {
        const updated = [...prev];
        updated[slotIndex] = { file, preview: previewUrl, error: '', uploading: true, url: null, publicId: null, uploadAborted: false, uploadBatchId: batchId };
        return updated;
      });
      saveToLocalStorage();
      
      (async () => {
        try {
          const { url, publicId } = await uploadToCloudinary(file);
          setProductImages(prev => {
            const updated = [...prev];
            if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId && !updated[slotIndex].uploadAborted) {
              updated[slotIndex] = { ...updated[slotIndex], url, publicId, uploading: false };
            }
            return updated;
          });
          toast.success(`Image uploaded successfully`);
          saveToLocalStorage();
        } catch (error) {
          setProductImages(prev => {
            const updated = [...prev];
            if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId) {
              updated[slotIndex] = { ...updated[slotIndex], error: 'Failed to upload image', uploading: false, preview: null, file: null };
            }
            return updated;
          });
        }
      })();
    }
    
    if (fileInputRefs.current['multiple']) fileInputRefs.current['multiple'].value = '';
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...productImages];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setProductImages(updatedImages);
    saveToLocalStorage();
  };

  const handleDragStart = (index) => {
    if (productImages[index].preview && !productImages[index].uploading) setDraggedIndex(index);
  };

  const handleDragOverWithFeedback = (event, index) => {
    event.preventDefault();
    if (productImages[index].preview && !productImages[index].uploading) setDragOverIndex(index);
  };

  const handleDragLeave = () => setDragOverIndex(null);

  const handleDropWithFeedback = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDragOverIndex(null);
      setDraggedIndex(null);
      return;
    }
    if (!productImages[draggedIndex]?.uploading && !productImages[dropIndex]?.uploading) moveImage(draggedIndex, dropIndex);
    else toast.error('Cannot reorder images while uploading');
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const removeImage = (index) => {
    const imageToRemove = productImages[index];
    setProductImages(prev => {
      const updated = [...prev];
      if (updated[index]) updated[index].uploadAborted = true;
      return updated;
    });
    if (imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) URL.revokeObjectURL(imageToRemove.preview);
    const updatedImages = [...productImages];
    updatedImages[index] = { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null };
    setProductImages(updatedImages);
    if (fileInputRefs.current[index]) fileInputRefs.current[index].value = '';
    toast.success(`Image removed from slot ${index + 1}`);
    saveToLocalStorage();
  };

  // ============================================================
  // MEDIA LIBRARY HANDLERS - IMAGES
  // ============================================================
  
  const handleMediaLibrarySelect = (selectedItems) => {
    const emptySlotIndex = productImages.findIndex(img => !img.url && !img.uploading);
    
    if (emptySlotIndex === -1) {
      toast.error('All image slots are filled. Please remove some images first.');
      return;
    }

    const updatedImages = [...productImages];
    selectedItems.forEach((item, idx) => {
      const slotIndex = emptySlotIndex + idx;
      if (slotIndex < 6) {
        updatedImages[slotIndex] = {
          ...updatedImages[slotIndex],
          url: item.url,
          publicId: item.public_id,
          preview: item.url,
          uploading: false,
          file: null,
          error: '',
          uploadAborted: false,
          uploadBatchId: null
        };
      }
    });

    setProductImages(updatedImages);
    saveToLocalStorage();
    toast.success(`${selectedItems.length} image(s) added from media library`);
  };

  const handleSingleMediaLibrarySelect = (selectedItems) => {
    if (selectedItems.length === 0) return;
    
    const item = selectedItems[0];
    const index = selectedSlotIndex;
    
    if (index === null || index === undefined) return;
    
    if (productImages[index].url) {
      toast.error('This slot already has an image. Please remove it first.');
      return;
    }

    const updatedImages = [...productImages];
    updatedImages[index] = {
      ...updatedImages[index],
      url: item.url,
      publicId: item.public_id,
      preview: item.url,
      uploading: false,
      file: null,
      error: '',
      uploadAborted: false,
      uploadBatchId: null
    };

    setProductImages(updatedImages);
    saveToLocalStorage();
    toast.success('Image added from media library');
    setSelectedSlotIndex(null);
  };

  const handleSlotClick = (index) => {
    if (productImages[index].url) {
      return;
    }
    
    setSlotPickerIndex(index);
    setShowSlotPicker(true);
  };

  const handleUploadFromDevice = () => {
    const index = slotPickerIndex;
    setShowSlotPicker(false);
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
    setSlotPickerIndex(null);
  };

  const handleChooseFromLibrary = () => {
    const index = slotPickerIndex;
    setShowSlotPicker(false);
    setSelectedSlotIndex(index);
    setShowSingleMediaPicker(true);
  };


 // ============================================================
// MEDIA LIBRARY HANDLERS - VIDEOS
// ============================================================

// Handle video selection from media library
const handleVideoMediaLibrarySelect = (selectedItems) => {
  if (selectedItems.length === 0) return;
  
  const item = selectedItems[0];
  
  // Double-check it's a video
  if (item.resource_type !== 'video') {
    toast.error('Please select a video file from the media library');
    return;
  }
  
  // Check if video already exists
  if (videoUpload.url) {
    toast.error('A video is already added. Please remove it first.');
    return;
  }

  setVideoUpload({
    file: null,
    preview: item.url,
    uploading: false,
    error: '',
    url: item.url,
    publicId: item.public_id
  });
  
  setFormData(prev => ({ 
    ...prev, 
    videoUrl: item.url, 
    videoPublicId: item.public_id, 
    videoType: 'upload' 
  }));
  
  saveToLocalStorage();
  toast.success('Video added from media library');
  setShowVideoMediaPicker(false);
};

// ✅ Remove these - no longer needed since we use direct buttons
// const handleVideoSlotClick = () => { ... };
// const handleVideoUploadFromDevice = () => { ... };
// const handleVideoChooseFromLibrary = () => { ... };
// const VideoSlotPickerModal - can also be removed








  // ============================================================
  // VIDEO HANDLERS
  // ============================================================
  const handleVideoFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (videoUpload.preview?.startsWith('blob:')) {
      URL.revokeObjectURL(videoUpload.preview);
    }

    if (!allowedVideoTypes.includes(file.type)) {
      setVideoUpload({ ...videoUpload, error: 'Invalid format. Allowed: MP4, WebM, OGG, MOV' });
      toast.error('Invalid video format');
      return;
    }

    if (file.size > maxVideoSize) {
      setVideoUpload({ ...videoUpload, error: `File too large. Max: 100MB` });
      toast.error('Video too large. Max 100MB');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setVideoUpload({
      file: file,
      preview: previewUrl,
      uploading: true,
      error: '',
      url: null,
      publicId: null
    });
    saveToLocalStorage();

    try {
      const { url, publicId } = await uploadVideoToCloudinary(file);
      setVideoUpload({
        file: file,
        preview: previewUrl,
        uploading: false,
        error: '',
        url: url,
        publicId: publicId
      });
      setFormData(prev => ({ ...prev, videoUrl: url, videoPublicId: publicId, videoType: 'upload' }));
      toast.success('Video uploaded successfully');
      saveToLocalStorage();
    } catch (error) {
      setVideoUpload({
        ...videoUpload,
        error: 'Failed to upload video',
        uploading: false,
        preview: null,
        file: null
      });
      toast.error('Failed to upload video');
    }
  };

  const handleYoutubeUrlChange = (url) => {
    setYoutubeUrl(url);
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      setFormData(prev => ({ ...prev, videoUrl: embedUrl, videoType: 'youtube' }));
      setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
      toast.success('YouTube link added successfully');
    } else if (url === '') {
      setFormData(prev => ({ ...prev, videoUrl: '', videoType: 'upload' }));
    }
    saveToLocalStorage();
  };

  const removeVideo = () => {
    if (videoUpload.preview?.startsWith('blob:')) {
      URL.revokeObjectURL(videoUpload.preview);
    }
    setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
    setYoutubeUrl('');
    setFormData(prev => ({ ...prev, videoUrl: '', videoPublicId: '', videoType: 'upload' }));
    if (videoInputRef.current) videoInputRef.current.value = '';
    toast.success('Video removed');
    saveToLocalStorage();
  };

  const getVideoPreview = () => {
    if (videoUpload.url) {
      return (
        <div className="relative">
          <video src={videoUpload.url} className="w-full rounded-lg" controls />
          <button
            type="button"
            onClick={removeVideo}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    } else if (youtubeUrl && getYouTubeVideoId(youtubeUrl)) {
      const videoId = getYouTubeVideoId(youtubeUrl);
      return (
        <div className="relative">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="w-full rounded-lg aspect-video"
            allowFullScreen
          />
          <button
            type="button"
            onClick={removeVideo}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    }
    return null;
  };

  // ============================================================
  // VALIDATION & SUBMIT
  // ============================================================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName?.trim()) newErrors.productName = 'Product name is required';
    if (!formData.skuCode?.trim()) newErrors.skuCode = 'SKU code is required';
    if (!formData.fullDescription || formData.fullDescription === '<p></p>') newErrors.fullDescription = 'Full description is required';
    if (!formData.category) newErrors.category = 'Category is required';

    
    if (!formData.stockQuantity && formData.stockQuantity !== 0) {
      newErrors.stockQuantity = 'Stock quantity is required';
    } else if (formData.stockQuantity !== '' && Number(formData.stockQuantity) < 0) {
      newErrors.stockQuantity = 'Stock quantity cannot be negative';
    }
    
    if (!formData.regularPrice && formData.regularPrice !== 0) {
      newErrors.regularPrice = 'Regular price is required';
    } else if (formData.regularPrice !== '' && Number(formData.regularPrice) <= 0) {
      newErrors.regularPrice = 'Regular price must be greater than 0';
    }
    
    if (formData.discountPrice && Number(formData.discountPrice) > Number(formData.regularPrice)) {
      newErrors.discountPrice = 'Discount price cannot exceed regular price';
    }
    
    if (!formData.unit) {
      newErrors.unit = 'Unit is required';
    }
    
    if (formData.unit === 'other' && !formData.customUnit?.trim()) {
      newErrors.customUnit = 'Please specify the unit';
    }
    
    if (!formData.tags || formData.tags.length === 0) {
      newErrors.tags = 'Please select one product tag';
    } else if (formData.tags.length > 1) {
      newErrors.tags = 'Please select only one tag';
    }
    
    const hasImages = productImages.some(img => img.url !== null && !img.uploading);
    if (!hasImages) {
      newErrors.images = 'At least one product image is required';
    }

    if (formData.slug && isSlugManuallyEdited && isSlugAvailable === false) {
      newErrors.slug = `Slug "${formData.slug}" is already taken. Please choose a different one.`;
    }
  
    if (formData.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const uploading = productImages.some(img => img.uploading) || videoUpload.uploading;
    if (uploading) {
      toast.error('Please wait for all uploads to complete');
      return;
    }
    
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
      const imageUrls = productImages.filter(img => img.url).map(img => img.url);
      const finalUnit = formData.unit === 'other' ? formData.customUnit : formData.unit;
      const colorStrings = formData.colors.map(color => color.code);
      
      const finalVideoUrl = videoUpload.url || (youtubeUrl ? `https://www.youtube.com/embed/${getYouTubeVideoId(youtubeUrl)}` : '');
      
      // const payload = {
      //   productName: formData.productName,
      //   slug: formData.slug || undefined,
      //   skuCode: formData.skuCode,
      //   shortDescription: formData.shortDescription || '',
      //   fullDescription: formData.fullDescription,
      //   category: formData.category,
      //   subcategory: formData.subcategory || undefined,
      //   childSubcategory: formData.childSubcategory || undefined,
      //   brand: formData.brand || '',
      //   stockQuantity: formData.stockQuantity === '' ? 0 : Number(formData.stockQuantity),
      //   stockAlertQuantity: formData.stockAlertQuantity ? Number(formData.stockAlertQuantity) : 0,
      //   regularPrice: formData.regularPrice === '' ? 0 : Number(formData.regularPrice),
      //   costPerItem: formData.costPerItem ? Number(formData.costPerItem) : 0,
      //   discountPrice: formData.discountPrice ? Number(formData.discountPrice) : 0,
      //   buyingPrice: formData.buyingPrice ? Number(formData.buyingPrice) : 0,
      //   unit: finalUnit,
      //   colors: colorStrings,
      //   deliveryInfo: formData.deliveryInfo || '',
      //   additionalInfo: formData.additionalInfo.filter(info => info.fieldName && info.fieldValue),
      //   tags: formData.tags,
      //   isFeatured: formData.isFeatured,
      //   showOnBanner: formData.showOnBanner,
      //   rating: formData.rating || 0,
      //   faqs: formData.faqs.filter(faq => faq.question.trim() && faq.answer.trim()),
      //   metaSettings: formData.metaSettings,
      //   images: imageUrls,
      //   videoUrl: finalVideoUrl,
      //   videoPublicId: videoUpload.publicId || '',
      //   videoType: videoType
      // };

      const payload = {
  productName: formData.productName,
  slug: formData.slug || undefined,
  skuCode: formData.skuCode,
  shortDescription: formData.shortDescription || '',
  fullDescription: formData.fullDescription,
  category: formData.category,
  subcategory: formData.subcategory || undefined,
  childSubcategory: formData.childSubcategory || undefined,
  brand: formData.brand || '',
  stockQuantity: formData.stockQuantity === '' ? 0 : Number(formData.stockQuantity),
  stockAlertQuantity: formData.stockAlertQuantity ? Number(formData.stockAlertQuantity) : 0,
  regularPrice: formData.regularPrice === '' ? 0 : Number(formData.regularPrice),
  
  discountPrice: formData.discountPrice ? Number(formData.discountPrice) : 0,
  buyingPrice: formData.buyingPrice ? Number(formData.buyingPrice) : 0,
  packagingCost: formData.packagingCost ? Number(formData.packagingCost) : 0, // NEW
  deliveryCost: formData.deliveryCost ? Number(formData.deliveryCost) : 0, // NEW
  unit: finalUnit,
  colors: colorStrings,
  deliveryInfo: formData.deliveryInfo || '',
  additionalInfo: formData.additionalInfo.filter(info => info.fieldName && info.fieldValue),
  tags: formData.tags,
  isFeatured: formData.isFeatured,
  showOnBanner: formData.showOnBanner,
  rating: formData.rating || 0,
  faqs: formData.faqs.filter(faq => faq.question.trim() && faq.answer.trim()),
  metaSettings: formData.metaSettings,
  images: imageUrls,
  videoUrl: finalVideoUrl,
  videoPublicId: videoUpload.publicId || '',
  videoType: videoType
};

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      // if (data.success) {
      //   toast.success('Product created successfully!');
      //   localStorage.removeItem(DRAFT_KEY);
      //   router.push('/authorize/all-products');
      // } else {
      //   toast.error(data.error || 'Failed to create product');
      // }
      if (data.success) {
  toast.success('Product created successfully!');
  localStorage.removeItem(DRAFT_KEY);
  // ✅ Use window.location.href for reliable navigation on Netlify
  window.location.href = '/authorize/all-products';
} else {
  toast.error(data.error || 'Failed to create product');
}
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const userRole = getUserRole();
  const isAdminOrSuperAdmin = userRole === 'super_admin' || userRole === 'admin';

  return (
    <ProtectedRoute pageKey="create_products">
    <MantineProvider>
      <div className="min-h-screen bg-[#f0f7fa]">
        <RestoreDraftModal 
          isOpen={showRestoreModal} 
          onConfirm={handleRestoreDraft} 
          onCancel={handleDiscardDraft} 
          draftData={pendingDraft?.formData} 
        />
        <AddBrandModal 
          isOpen={showAddBrandModal} 
          onClose={() => setShowAddBrandModal(false)} 
          onBrandAdded={handleBrandAdded} 
        />
        <AddTagModal 
          isOpen={showAddTagModal} 
          onClose={() => setShowAddTagModal(false)} 
          onTagAdded={handleTagAdded} 
        />

        {/* Header - HyperVolt Theme */}
        <div className="bg-white border-b border-pink-600/20 shadow-lg sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
               <a href="/authorize/all-products" className="p-2 hover:bg-pink-600/20 rounded-lg transition-colors">
  <ArrowLeft className="w-5 h-5 text-black/80 hover:text-black" />
</a>
                <div>
                  <div className="flex items-center gap-2">
                    <Package className="w-6 h-6 text-pink-600" />
                    <h1 className="text-xl font-bold text-black">Create New Product</h1>
                  </div>
                  <p className="text-sm text-black/70 mt-1">Add a new product to your collection</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {lastSaved && (
                  <span className="text-xs text-white/60 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last saved: {lastSaved.toLocaleTimeString()}
                  </span>
                )}
                <button onClick={handleClearDraft} className="px-4 py-2 text-sm border border-pink-400/50 text-pink-600 rounded-lg hover:bg-pink-500/20 transition-colors">
                  Clear Draft
                </button>
                <button onClick={handleSaveDraft} disabled={isSavingDraft} className="px-4 py-2 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2 disabled:opacity-50 font-semibold">
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
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
                  <div className="p-5 border-b border-pink-600/20">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      <Package className="w-5 h-5 text-pink-600" />
                      Basic Information
                    </h2>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
                      <input type="text" name="productName" value={formData.productName} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.productName ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g., Wireless Headphones, Smart Watch Pro" />
                      {errors.productName && <p className="text-xs text-red-600 mt-1">{errors.productName}</p>}
                    </div>

                    {/* SLUG FIELD */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug <span className="text-gray-400 text-xs">(Auto-generated from product name)</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          name="slug" 
                          value={formData.slug || ''} 
                          onChange={handleSlugChange}
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition font-mono ${
                            errors.slug ? 'border-red-500' : 
                            isSlugManuallyEdited && isSlugAvailable === true ? 'border-green-500' :
                            isSlugManuallyEdited && isSlugAvailable === false ? 'border-red-500' : 'border-gray-300'
                          }`} 
                          placeholder="Auto-generated from product name..." 
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          {isCheckingSlug && (
                            <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                          )}
                          {!isCheckingSlug && formData.slug && isSlugManuallyEdited && isSlugAvailable === true && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                          {!isCheckingSlug && formData.slug && isSlugManuallyEdited && isSlugAvailable === false && (
                            <X className="w-4 h-4 text-red-500" />
                          )}
                          {formData.slug && !isSlugManuallyEdited && (
                            <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Auto</span>
                          )}
                          {formData.slug && isSlugManuallyEdited && isSlugAvailable !== false && (
                            <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Custom</span>
                          )}
                        </div>
                      </div>
                      
                      {errors.slug && (
                        <p className="text-xs text-red-500 mt-1 flex items-start gap-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                          <span>{errors.slug}</span>
                        </p>
                      )}
                      {!isCheckingSlug && formData.slug && isSlugManuallyEdited && isSlugAvailable === true && !errors.slug && (
                        <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Slug is available!
                        </p>
                      )}
                      
                      {formData.slug && !errors.slug && (
                        <p className="text-xs text-pink-600 mt-1 flex items-center gap-1">
                          <LinkIcon className="w-3 h-3" />
                          <span>Product URL will be: /product/{formData.slug}</span>
                        </p>
                      )}
                      
                      {isSlugManuallyEdited && formData.productName && (
                        <button
                          type="button"
                          onClick={() => {
                            const generatedSlug = formData.productName
                              .toLowerCase()
                              .trim()
                              .replace(/[^a-z0-9]+/g, '-')
                              .replace(/(^-|-$)+/g, '');
                            setFormData(prev => ({ ...prev, slug: generatedSlug }));
                            setIsSlugManuallyEdited(false);
                            setIsSlugAvailable(null);
                            setErrors(prev => ({ ...prev, slug: null }));
                            saveToLocalStorage();
                            toast.info('Slug reset to auto-generated value');
                          }}
                          className="text-xs text-pink-600 hover:text-[#0891B2] mt-1 flex items-center gap-1 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" />
                          Reset to auto-generated
                        </button>
                      )}
                      
                      <p className="text-xs text-gray-400 mt-1">
                        💡 The slug is automatically generated from the product name. Edit it if you want a custom URL.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SKU Code <span className="text-red-500">*</span></label>
                      <div className="flex gap-2">
                        <input type="text" name="skuCode" value={formData.skuCode} onChange={handleChange} className={`flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.skuCode ? 'border-red-500' : 'border-gray-300'}`} placeholder="Auto-generated SKU" readOnly />
                        <button type="button" onClick={generateSkuFromBackend} disabled={isGeneratingSku} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2">
                          {isGeneratingSku ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                          Regenerate
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">SKU is auto-generated from backend. Click regenerate for a new one.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Short Description <span className="text-gray-400 text-xs">(Optional)</span></label>
                      {isMounted && shortDescEditor && (
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <RichTextEditor editor={shortDescEditor}>
                            <RichTextEditor.Toolbar>
                              <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /></RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup><RichTextEditor.AlignLeft /><RichTextEditor.AlignCenter /><RichTextEditor.AlignRight /></RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                          </RichTextEditor>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Description <span className="text-red-500">*</span></label>
                      {isMounted && fullDescEditor && (
                        <div className={`border rounded-lg overflow-hidden ${errors.fullDescription ? 'border-red-500' : 'border-gray-300'}`}>
                          <RichTextEditor editor={fullDescEditor}>
                            <RichTextEditor.Toolbar>
                              <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /><RichTextEditor.Underline /><RichTextEditor.Strikethrough /></RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup><RichTextEditor.H1 /><RichTextEditor.H2 /><RichTextEditor.H3 /></RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup><RichTextEditor.BulletList /><RichTextEditor.OrderedList /></RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup><RichTextEditor.AlignLeft /><RichTextEditor.AlignCenter /><RichTextEditor.AlignRight /></RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup><RichTextEditor.Link /><RichTextEditor.Unlink /></RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                          </RichTextEditor>
                        </div>
                      )}
                      {errors.fullDescription && <p className="text-xs text-red-600 mt-1">{errors.fullDescription}</p>}
                    </div>
                  </div>
                </div>

                {/* Categories Card */}
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
                  <div className="p-5 border-b border-pink-600/20">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      <Layers className="w-5 h-5 text-pink-600" />
                      Categories & Classification
                    </h2>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                        <select name="category" value={formData.category} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.category ? 'border-red-500' : 'border-gray-300'}`}>
                          <option value="">Select Category</option>
                          {categories.map(cat => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
                        </select>
                        {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory <span className="text-gray-400 text-xs">(Optional)</span></label>
                        <select name="subcategory" value={formData.subcategory} onChange={handleChange} disabled={!formData.category || subcategories.length === 0} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed border-gray-300">
                          <option value="">Select Subcategory</option>
                          {subcategories.map(sub => (<option key={sub._id} value={sub._id}>{sub.name}</option>))}
                        </select>
                      </div>

                      {childSubcategories.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Child Subcategory <span className="text-gray-400 text-xs">(Optional)</span></label>
                          <select name="childSubcategory" value={formData.childSubcategory} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition border-gray-300">
                            <option value="">Select Child Subcategory</option>
                            {childSubcategories.map(child => (<option key={child._id} value={child._id}>{child.name}</option>))}
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Brand <span className="text-gray-400 text-xs">(Optional)</span></label>
                        <div className="flex gap-2">
                          <div className="flex-1 relative">
                            <select 
                              name="brand" 
                              value={formData.brand} 
                              onChange={handleChange} 
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition appearance-none ${errors.brand ? 'border-red-500' : 'border-gray-300'}`}
                            >
                              <option value="">Select Brand</option>
                              {brands.map(brand => (
                                <option key={brand._id} value={brand._id}>
                                  {brand.name}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                          <button 
                            type="button" 
                            onClick={() => setShowAddBrandModal(true)} 
                            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2 whitespace-nowrap font-semibold"
                          >
                            <Plus className="w-4 h-4" /> Add Brand
                          </button>
                        </div>
                        
                        {formData.brand && brands.find(b => b._id === formData.brand)?.logo && (
                          <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2">
                            <img 
                              src={brands.find(b => b._id === formData.brand).logo} 
                              alt={brands.find(b => b._id === formData.brand).name} 
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {brands.find(b => b._id === formData.brand).name}
                            </span>
                          </div>
                        )}
                        {errors.brand && <p className="text-xs text-red-600 mt-1">{errors.brand}</p>}
                      </div>
                    </div>
                  </div>
                </div>

             

                {/* Pricing & Inventory Card */}
<div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
  <div className="p-5 border-b border-pink-600/20">
    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
      <DollarSign className="w-5 h-5 text-pink-600" />
      Pricing & Inventory
    </h2>
  </div>
  <div className="p-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity <span className="text-red-500">*</span></label>
        <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.stockQuantity ? 'border-red-500' : 'border-gray-300'}`} placeholder="0" />
        {errors.stockQuantity && <p className="text-xs text-red-600 mt-1">{errors.stockQuantity}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Alert Quantity</label>
        <input type="number" name="stockAlertQuantity" value={formData.stockAlertQuantity} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition" placeholder="Notify when stock reaches this level" />
        <p className="text-xs text-gray-500 mt-1">You'll be notified when stock reaches this level</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price (৳) <span className="text-red-500">*</span></label>
        <input type="number" name="regularPrice" value={formData.regularPrice} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.regularPrice ? 'border-red-500' : 'border-gray-300'}`} placeholder="0" />
        {errors.regularPrice && <p className="text-xs text-red-600 mt-1">{errors.regularPrice}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price (৳) <span className="text-gray-400 text-xs">(Optional)</span></label>
        <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.discountPrice ? 'border-red-500' : 'border-gray-300'}`} placeholder="0" />
        {formData.discountPrice > 0 && formData.regularPrice && (
          <p className="text-xs text-green-600 mt-1">Save: ৳{(formData.regularPrice - formData.discountPrice).toFixed(2)} ({Math.round(((formData.regularPrice - formData.discountPrice) / formData.regularPrice) * 100)}% off)</p>
        )}
      </div>

{/* BUYING PRICE - Only visible to Super Admin and Admin */}
{isAdminOrSuperAdmin && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Buying Price (৳) <span className="text-amber-600 text-xs">(Admin Only)</span>
    </label>
    <input 
      type="number" 
      name="buyingPrice" 
      value={formData.buyingPrice || ''} 
      onChange={(e) => {
        const value = e.target.value;
        setFormData(prev => ({
          ...prev,
          buyingPrice: value === '' ? '' : value
        }));
        // No need for setTimeout here - useEffect will handle it
      }}
      onWheel={(e) => e.target.blur()} 
      min="0" 
      step="1" 
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition" 
      placeholder="0" 
    />
    <p className="text-xs text-amber-600 mt-1">
      ⚠️ This field is only visible to Super Admins and Admins
    </p>
  </div>
)}
{/* PACKAGING COST */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Packaging Cost (৳) <span className="text-gray-400 text-xs">(Optional)</span>
  </label>
  <input 
    type="number" 
    name="packagingCost" 
    value={formData.packagingCost || ''} 
    onChange={(e) => {
      const value = e.target.value;
      setFormData(prev => ({
        ...prev,
        packagingCost: value === '' ? '' : value
      }));
    }}
    onWheel={(e) => e.target.blur()} 
    min="0" 
    step="1" 
    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition" 
    placeholder="0" 
  />
  <p className="text-xs text-gray-500 mt-1">Cost of packaging materials per unit</p>
</div>

   {/* DELIVERY COST */}
{/* DELIVERY COST */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Delivery Cost (৳) <span className="text-gray-400 text-xs">(Optional)</span>
  </label>
  <input 
    type="number" 
    name="deliveryCost" 
    value={formData.deliveryCost || ''} 
    onChange={(e) => {
      const value = e.target.value;
      setFormData(prev => ({
        ...prev,
        deliveryCost: value === '' ? '' : value
      }));
    }}
    onWheel={(e) => e.target.blur()} 
    min="0" 
    step="1" 
    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition" 
    placeholder="0" 
  />
  <p className="text-xs text-gray-500 mt-1">Cost of delivery per unit</p>
</div>

    {/* COST PER ITEM - Auto-calculated, Read Only */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Cost Per Item (৳) <span className="text-gray-400 text-xs">(Auto-calculated)</span>
  </label>
  <div className="relative">
    <input 
      type="text" 
      name="costPerItem" 
      value={typeof formData.costPerItem === 'string' ? formData.costPerItem : (formData.costPerItem || '')} 
      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition bg-gray-100 border-gray-300 cursor-not-allowed ${
        typeof formData.costPerItem === 'string' && formData.costPerItem.includes('?') ? 'text-pink-600 font-medium' : 'text-gray-700'
      }`} 
      placeholder="Enter values above to calculate" 
      readOnly 
      disabled
    />
    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
      Auto
    </div>
  </div>
  <p className="text-xs text-pink-600 mt-1 flex items-center gap-1">
    <Info className="w-3 h-3" />
    {typeof formData.costPerItem === 'string' && formData.costPerItem.includes('?') 
      ? 'Fill in all three fields above to see the calculated cost' 
      : 'Cost Per Item = Buying Price + Packaging Cost + Delivery Cost'}
  </p>
</div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Unit <span className="text-red-500">*</span></label>
        <select name="unit" value={formData.unit} onChange={handleUnitChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.unit ? 'border-red-500' : 'border-gray-300'}`}>
          {UNIT_OPTIONS.map(unit => (<option key={unit.value} value={unit.value}>{unit.label}</option>))}
        </select>
        {errors.unit && <p className="text-xs text-red-600 mt-1">{errors.unit}</p>}
      </div>
    </div>

    {showCustomUnit && (
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Custom Unit <span className="text-red-500">*</span></label>
        <input type="text" name="customUnit" value={formData.customUnit} onChange={(e) => setFormData(prev => ({ ...prev, customUnit: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.customUnit ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g., pair, set, dozen" />
        {errors.customUnit && <p className="text-xs text-red-600 mt-1">{errors.customUnit}</p>}
      </div>
    )}
  </div>
</div>

                {/* Additional Information */}
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
                  <div className="p-5 border-b border-pink-600/20">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}>
                      <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Info className="w-5 h-5 text-pink-600" /> Additional Information</h2>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showAdditionalInfo ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  {showAdditionalInfo && (
                    <div className="p-5">
                      <div className="space-y-4">
                        {formData.additionalInfo.map((info, index) => (
                          <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <input type="text" placeholder="Field name" value={info.fieldName} onChange={(e) => updateAdditionalInfo(index, 'fieldName', e.target.value)} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none" />
                            <input type="text" placeholder="Field value" value={info.fieldValue} onChange={(e) => updateAdditionalInfo(index, 'fieldValue', e.target.value)} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none" />
                            <button type="button" onClick={() => removeAdditionalInfo(index)} className="p-2 text-gray-400 hover:text-red-500"><X className="w-5 h-5" /></button>
                          </div>
                        ))}
                        <button type="button" onClick={addAdditionalInfo} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-pink-600 border-2 border-dashed border-pink-600/40 rounded-lg hover:bg-pink-600/5"><Plus className="w-4 h-4" /> Add Additional Information</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Delivery Details */}
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
                  <div className="p-5 border-b border-pink-600/20">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}>
                      <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Package className="w-5 h-5 text-pink-600" /> Delivery Details <span className="text-gray-400 text-xs">(Optional)</span></h2>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showDeliveryInfo ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  {showDeliveryInfo && (
                    <div className="p-5">
                      {isMounted && deliveryInfoEditor && (
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <RichTextEditor editor={deliveryInfoEditor}>
                            <RichTextEditor.Toolbar>
                              <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /><RichTextEditor.Underline /></RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup><RichTextEditor.BulletList /><RichTextEditor.OrderedList /></RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup><RichTextEditor.AlignLeft /><RichTextEditor.AlignCenter /><RichTextEditor.AlignRight /></RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                          </RichTextEditor>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-2">Include shipping information, delivery time, and other delivery-related details</p>
                    </div>
                  )}
                </div>

                {/* FAQ SECTION */}
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
                  <div className="p-5 border-b border-pink-600/20">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowFaqs(!showFaqs)}>
                      <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-pink-600" />
                        Frequently Asked Questions <span className="text-gray-400 text-xs">(Optional)</span>
                      </h2>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showFaqs ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  {showFaqs && (
                    <div className="p-5">
                      <div className="space-y-4">
                        {formData.faqs.map((faq, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-start justify-between mb-3">
                              <span className="text-sm font-medium text-gray-700">FAQ #{index + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeFaq(index)}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Question <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={faq.question}
                                  onChange={(e) => updateFaq(index, 'question', e.target.value)}
                                  placeholder="e.g., What is the warranty period?"
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Answer <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                  value={faq.answer}
                                  onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                                  rows="3"
                                  placeholder="e.g., This product comes with a 2-year warranty covering manufacturing defects..."
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition resize-none"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <button
                          type="button"
                          onClick={addFaq}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-pink-600 border-2 border-dashed border-pink-600/40 rounded-lg hover:bg-pink-600/5 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add FAQ
                        </button>
                        
                        {formData.faqs.length === 0 && (
                          <p className="text-xs text-gray-500 text-center py-2">
                            No FAQs added yet. Click the button above to add frequently asked questions about this product.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* SEO & Meta Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
                  <div className="p-5 border-b border-pink-600/20">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowMeta(!showMeta)}>
                      <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Search className="w-5 h-5 text-pink-600" /> SEO & Meta Settings</h2>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showMeta ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  {showMeta && (
                    <div className="p-5">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title <span className="text-xs text-gray-400 ml-2">(70 characters max)</span></label>
                          <input type="text" value={formData.metaSettings.metaTitle} onChange={(e) => handleMetaChange('metaTitle', e.target.value)} maxLength="70" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition" placeholder="e.g., Buy Wireless Headphones Online | Smart Gadget" />
                          <div className="flex justify-end mt-1"><span className={`text-xs ${formData.metaSettings.metaTitle?.length > 70 ? 'text-red-500' : 'text-gray-400'}`}>{formData.metaSettings.metaTitle?.length || 0}/70</span></div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description <span className="text-xs text-gray-400 ml-2">(160 characters max)</span></label>
                          <textarea value={formData.metaSettings.metaDescription} onChange={(e) => handleMetaChange('metaDescription', e.target.value)} maxLength="160" rows="3" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition resize-none" placeholder="Write a compelling description that appears in search engine results..." />
                          <div className="flex justify-end mt-1"><span className={`text-xs ${formData.metaSettings.metaDescription?.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>{formData.metaSettings.metaDescription?.length || 0}/160</span></div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords <span className="text-xs text-gray-400 ml-2">(Comma separated)</span></label>
                          <div className="flex gap-2">
                            <input type="text" value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); addKeyword(); } }} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition" placeholder="e.g., wireless headphones, bluetooth earphones" />
                            <button type="button" onClick={addKeyword} className="px-4 py-2 text-white rounded-lg bg-pink-600 hover:bg-[#0891B2]"><Plus className="w-4 h-4" /> Add</button>
                          </div>
                          {formData.metaSettings.metaKeywords?.length > 0 && (
                            <div className="mt-3 flex-wrap flex gap-2">
                              {formData.metaSettings.metaKeywords.map((keyword, index) => (
                                <div key={index} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-pink-600/10 text-[#004767]">
                                  <span>{keyword}</span>
                                  <button type="button" onClick={() => removeKeyword(index)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Product Images Card */}
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
                  <div className="p-5 border-b border-pink-600/20">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-pink-600" /> 
                      Product Images <span className="text-red-500">*</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Upload up to 6 images (JPG, PNG, WebP, max 5MB each)</p>
                  </div>
                  <div className="p-5">
                    {errors.images && <p className="text-xs text-red-600 mb-4 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.images}</p>}
                    
                    <div className="flex gap-3 mb-4">
                      <button 
                        type="button" 
                        onClick={() => fileInputRefs.current['multiple']?.click()} 
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-pink-600/40 bg-pink-600/5 text-pink-600 hover:bg-pink-600/10 transition-colors"
                      >
                        <Upload className="w-5 h-5" /> Upload from Device
                      </button>
                      
                      <button 
                        type="button" 
                        onClick={() => setShowMediaPicker(true)} 
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-pink-600/40 bg-pink-600/5 text-pink-600 hover:bg-pink-600/10 transition-colors"
                      >
                        <ImageIcon className="w-5 h-5" /> Choose from Media Library
                      </button>
                    </div>

                    <input type="file" id="multiple-images" className="hidden" accept="image/jpeg,image/jpg,image/png,image/webp" multiple onChange={handleMultipleImageSelect} ref={el => { if (el) fileInputRefs.current['multiple'] = el; }} />

                    <div className="grid grid-cols-2 gap-4">
                      {productImages.map((img, index) => (
                        <div key={index} draggable={img.preview !== null && !img.uploading} onDragStart={() => handleDragStart(index)} onDragOver={(e) => handleDragOverWithFeedback(e, index)} onDragLeave={handleDragLeave} onDrop={() => handleDropWithFeedback(index)} onDragEnd={handleDragEnd} className={`transition-all duration-200 ${draggedIndex === index ? 'opacity-50 scale-95' : ''} ${dragOverIndex === index && draggedIndex !== index && draggedIndex !== null ? 'ring-2 ring-pink-600 ring-offset-2 rounded-lg' : ''}`}>
                          {img.preview ? (
                            <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 h-40 hover:border-pink-600 transition-colors cursor-grab active:cursor-grabbing bg-gray-100">
                              <div className="absolute top-1 left-1 bg-black/50 rounded px-1.5 py-0.5 z-10"><GripVertical className="w-3 h-3 text-white" /></div>
                              <img src={img.preview} alt={`Product ${index + 1}`} className="w-full h-full object-contain bg-gray-100" />
                              {img.uploading && <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"><Loader2 className="w-6 h-6 text-white animate-spin" /></div>}
                              <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 z-20"><X className="w-3 h-3" /></button>
                              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-xs rounded z-10">{index + 1}</span>
                            </div>
                          ) : (
                            <div className={`border-2 border-dashed rounded-lg p-4 text-center h-40 flex flex-col items-center justify-center cursor-pointer transition-colors ${img.error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-pink-600 hover:bg-pink-600/5'}`} onClick={() => handleSlotClick(index)}>
                              <input type="file" ref={el => fileInputRefs.current[index] = el} className="hidden" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={(e) => handleImageChange(e, index)} />
                              <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${img.error ? 'text-red-400' : 'text-gray-400'}`} />
                              <p className={`text-xs ${img.error ? 'text-red-600' : 'text-gray-600'}`}>Slot {index + 1}</p>
                              <p className="text-[10px] text-gray-400 mt-1">Click to add image</p>
                              {img.error && <p className="text-xs text-red-600 mt-1">{img.error}</p>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-xs text-gray-500 text-center">{productImages.filter(img => img.url !== null && !img.uploading).length} of 6 images uploaded</div>
                  </div>
                </div>

                {/* Video Upload Card */}
              {/* Video Upload Card */}
{/* Video Upload Card */}
<div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
  <div className="p-5 border-b border-pink-600/20">
    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
      <Video className="w-5 h-5 text-pink-600" />
      Product Video <span className="text-gray-400 text-xs">(Optional)</span>
    </h2>
    <p className="text-xs text-gray-500 mt-1">Upload a video or add a YouTube link</p>
  </div>
  <div className="p-5">
    <div className="flex gap-2 mb-4">
      <button
        type="button"
        onClick={() => setVideoType('upload')}
        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
          videoType === 'upload'
            ? 'bg-pink-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Upload className="w-4 h-4 inline mr-1" />
        Upload Video
      </button>
      <button
        type="button"
        onClick={() => setVideoType('youtube')}
        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
          videoType === 'youtube'
            ? 'bg-pink-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Youtube className="w-4 h-4 inline mr-1" />
        YouTube Link
      </button>
    </div>

    {/* Video Preview - Show if video exists */}
    {getVideoPreview()}

    {/* Upload Video Section - Only show when no video exists */}
    {videoType === 'upload' && !videoUpload.url && !videoUpload.preview && (
      <div>
        {/* Two buttons - Direct actions without modal */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* ✅ Direct file input trigger - No modal */}
          <button
            type="button"
            onClick={() => {
              if (videoInputRef.current) {
                videoInputRef.current.click();
              }
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-pink-600/40 bg-pink-600/5 text-pink-600 hover:bg-pink-600/10 transition-colors"
          >
            <Upload className="w-5 h-5" />
            Upload from Device
          </button>
          
          {/* ✅ Direct Media Library open - No modal */}
          <button
            type="button"
            onClick={() => {
              setShowVideoMediaPicker(true);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-pink-600/40 bg-pink-600/5 text-pink-600 hover:bg-pink-600/10 transition-colors"
          >
            <Video className="w-5 h-5" />
            Choose from Media Library
          </button>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={videoInputRef}
          className="hidden"
          accept="video/*"
          onChange={handleVideoFileChange}
        />

        {/* Info message */}
        <div className="text-xs text-gray-400 text-center">
          <p>MP4, WebM, MOV (Max 100MB)</p>
          <p className="mt-1">Click on a button above to add a video</p>
        </div>
      </div>
    )}

    {/* YouTube Link Section */}
    {videoType === 'youtube' && !formData.videoUrl && (
      <div className="space-y-3">
        <div className="relative">
          <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => handleYoutubeUrlChange(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
          />
        </div>
        <p className="text-xs text-gray-500">
          Paste any YouTube video URL. The video will be embedded on your product page.
        </p>
      </div>
    )}

    {videoUpload.error && (
      <p className="text-xs text-red-500 mt-2">{videoUpload.error}</p>
    )}
  </div>
</div>

                {/* Colors Card */}
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
                  <div className="p-5 border-b border-pink-600/20">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Palette className="w-5 h-5 text-pink-600" /> Colors <span className="text-gray-400 text-xs">(Optional)</span></h2>
                  </div>
                  <div className="p-5">
                    <ColorPicker colors={formData.colors} onChange={(colors) => setFormData(prev => ({ ...prev, colors }))} />
                  </div>
                </div>

                {/* Rating Card */}
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
                  <div className="p-5 border-b border-pink-600/20">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      <Star className="w-5 h-5 text-pink-600" />
                      Product Rating <span className="text-gray-400 text-xs">(Optional)</span>
                    </h2>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          onMouseEnter={() => setRatingHover(star)}
                          onMouseLeave={() => setRatingHover(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star 
                            className={`w-8 h-8 ${
                              (ratingHover || formData.rating) >= star
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        {formData.rating > 0 ? `${formData.rating} out of 5 stars` : 'No rating set'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">Set the initial product rating (1-5 stars) - Optional</p>
                    {formData.rating > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRatingChange(0)}
                        className="mt-2 text-xs text-red-500 hover:text-red-600 transition-colors"
                      >
                        Clear Rating
                      </button>
                    )}
                  </div>
                </div>

                {/* Featured Product */}
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
                  <div className="p-5 border-b border-pink-600/20">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      <Star className="w-5 h-5 text-pink-600" />
                      Product Promotion
                    </h2>
                  </div>
                  <div className="p-5 space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.isFeatured} 
                        onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))} 
                        className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-600" 
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Mark as Featured Product</span>
                        <p className="text-xs text-gray-500">Featured products will appear in special sections</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Tags Card */}
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
                  <div className="p-5 border-b border-pink-600/20">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      <Tag className="w-5 h-5 text-pink-600" />
                      Product Tag <span className="text-red-500">*</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Select exactly one tag for your product</p>
                  </div>
                  <div className="p-5">
                    {errors.tags && <p className="text-xs text-red-600 mb-4 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.tags}</p>}
                    
                    <button
                      type="button"
                      onClick={() => setShowAddTagModal(true)}
                      className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-pink-600 border-2 border-dashed border-pink-600/40 rounded-lg hover:bg-pink-600/5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Tag
                    </button>

                    {isLoadingTags ? (
                      <div className="flex justify-center py-4">
                        <Loader2 className="w-6 h-6 animate-spin text-pink-600" />
                      </div>
                    ) : productTags.length === 0 ? (
                      <div className="text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-500">No tags available. Create a tag first.</p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                        {productTags.map(tag => {
                          const isSelected = formData.tags && formData.tags.length === 1 && formData.tags[0] === tag._id;
                          return (
                            <button
                              key={tag._id}
                              type="button"
                              onClick={() => handleTagSelect(tag._id)}
                              className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-full transition-all border ${
                                isSelected
                                  ? 'bg-pink-600 text-white border-pink-600 ring-2 ring-pink-600 ring-offset-2 shadow-md'
                                  : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {tag.image && tag.image.url && (
                                <img 
                                  src={tag.image.url} 
                                  alt={tag.name} 
                                  className="w-4 h-4 rounded-full object-cover"
                                />
                              )}
                              {tag.name}
                              {isSelected && <CheckCircle className="w-3 h-3 ml-1" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    
                    {formData.tags && formData.tags.length > 0 && (
                      <div className="mt-4 p-3 bg-pink-600/10 rounded-lg border border-pink-600/20">
                        <p className="text-xs font-medium text-[#004767] mb-2 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Selected Tag:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map(tagId => {
                            const tag = productTags.find(t => t._id === tagId);
                            return tag ? (
                              <span key={tagId} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-pink-600 text-white shadow-sm">
                                {tag.image && tag.image.url && (
                                  <img 
                                    src={tag.image.url} 
                                    alt={tag.name} 
                                    className="w-4 h-4 rounded-full object-cover"
                                  />
                                )}
                                {tag.name}
                                <button 
                                  type="button" 
                                  onClick={() => handleTagSelect(tagId)} 
                                  className="hover:opacity-70 ml-1 transition-opacity"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                    
                    {(!formData.tags || formData.tags.length === 0) && !errors.tags && (
                      <p className="text-xs text-gray-400 mt-3 text-center">
                        Click on a tag above to select it. Click again to deselect.
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Card */}
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
                  <div className="p-5 border-b border-pink-600/20">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Box className="w-5 h-5 text-pink-600" /> Product Status</h2>
                  </div>
                  <div className="p-5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={true} disabled className="w-5 h-5 rounded border-gray-300 text-pink-600" />
                      <div><span className="text-sm font-medium text-gray-700">Active Product</span><p className="text-xs text-gray-500">Product will be visible to customers</p></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Create Product Button at Bottom */}
            <div className="mt-8 flex justify-end">
              <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-800 text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSubmitting ? 'Creating Product...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Media Library Picker - Multiple Images */}
      <MediaLibraryPicker
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={handleMediaLibrarySelect}
        multiple={true}
        maxSelect={6 - productImages.filter(img => img.url !== null && !img.uploading).length}
        currentImages={productImages.filter(img => img.url !== null).map(img => img.url)}
      />

      {/* Media Library Picker - Single Image */}
      <MediaLibraryPicker
        isOpen={showSingleMediaPicker}
        onClose={() => {
          setShowSingleMediaPicker(false);
          setSelectedSlotIndex(null);
        }}
        onSelect={handleSingleMediaLibrarySelect}
        multiple={false}
        maxSelect={1}
        currentImages={productImages.filter(img => img.url !== null).map(img => img.url)}
      />

      {/* Media Library Picker - Video */}
      <MediaLibraryPicker
        isOpen={showVideoMediaPicker}
        onClose={() => setShowVideoMediaPicker(false)}
        onSelect={handleVideoMediaLibrarySelect}
        multiple={false}
        maxSelect={1}
        currentImages={[]}
        onlyVideos={true}
      />

      {/* Slot Picker Modal - Images */}
      <ImageSlotPickerModal
        isOpen={showSlotPicker}
        onClose={() => {
          setShowSlotPicker(false);
          setSlotPickerIndex(null);
        }}
        onUploadFromDevice={handleUploadFromDevice}
        onChooseFromLibrary={handleChooseFromLibrary}
      />

      {/* Slot Picker Modal - Video */}
     
    </MantineProvider>
    </ProtectedRoute>
  );
}