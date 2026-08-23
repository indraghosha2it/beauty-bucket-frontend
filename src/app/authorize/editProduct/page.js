
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NextLink from 'next/link';
import { 
  Plus, 
  X, 
  Save, 
  ArrowLeft,
  Image as ImageIcon,
  XCircle,
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
  Scale,
  FolderTree,
  HelpCircle,
  LinkIcon,
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

// ============================================================
// COMPONENTS
// ============================================================

// Add Brand Modal Component
const AddBrandModal = ({ isOpen, onClose, onBrandAdded }) => {
  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState(null);
  const [brandLogoPreview, setBrandLogoPreview] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPG, PNG, WebP)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo must be less than 2MB');
      return;
    }

    setBrandLogo(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setBrandLogoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadLogoToCloudinary = async (file) => {
    setIsUploading(true);
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
        return {
          url: data.secure_url,
          publicId: data.public_id,
        };
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Logo upload error:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!brandName.trim()) {
      toast.error('Please enter a brand name');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      let logoUrl = '';
      let logoPublicId = '';
      
      if (brandLogo) {
        const result = await uploadLogoToCloudinary(brandLogo);
        logoUrl = result.url;
        logoPublicId = result.publicId;
      }

      const response = await fetch('http://localhost:5000/api/brands', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: brandName.trim(),
          logo: logoUrl,
          description: brandDescription.trim()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Brand added successfully');
        setBrandName('');
        setBrandLogo(null);
        setBrandLogoPreview('');
        setBrandDescription('');
        if (fileInputRef.current) fileInputRef.current.value = '';
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
              Brand Logo <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <div className="flex items-center gap-4">
              {brandLogoPreview ? (
                <div className="relative">
                  <img 
                    src={brandLogoPreview} 
                    alt="Brand Logo" 
                    className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setBrandLogo(null);
                      setBrandLogoPreview('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div 
                  className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-pink-600 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-5 h-5 text-gray-400" />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
                onChange={handleLogoChange}
              />
              <div>
                <p className="text-xs text-gray-500">Upload a brand logo</p>
                <p className="text-[10px] text-gray-400">JPG, PNG, WebP (max 2MB)</p>
              </div>
            </div>
          </div>

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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <textarea
              value={brandDescription}
              onChange={(e) => setBrandDescription(e.target.value)}
              placeholder="Brief description of the brand"
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition resize-none"
            />
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
              disabled={isSubmitting || isUploading}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-[#0891B2] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting || isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add Brand
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

export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const [keywordInput, setKeywordInput] = useState('');
  const [showCustomUnit, setShowCustomUnit] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [originalProduct, setOriginalProduct] = useState(null);
  const [originalBarcode, setOriginalBarcode] = useState(null);
  const [isValidatingSku, setIsValidatingSku] = useState(false);
  const [isSkuUnique, setIsSkuUnique] = useState(null);
  const [ratingHover, setRatingHover] = useState(0);
  const skuValidateTimeoutRef = useRef(null);
  const [productTags, setProductTags] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  
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

  // Refs to track if editor content has been set
  const shortDescContentSet = useRef(false);
  const fullDescContentSet = useRef(false);
  const deliveryInfoContentSet = useRef(false);

  const fileInputRefs = useRef([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // ============================================================
  // FORM DATA - ADDED packagingCost and deliveryCost
  // ============================================================
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
    videoUrl: '',
    videoPublicId: '',
    videoType: 'upload',
    metaSettings: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: []
    }
  });

  const [productImages, setProductImages] = useState([
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null }
  ]);

  const [errors, setErrors] = useState({});

  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxFileSize = 5 * 1024 * 1024;

  const shortDescEditor = useEditor({
    extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: '',
    onUpdate: ({ editor }) => setFormData(prev => ({ ...prev, shortDescription: editor.getHTML() })),
    immediatelyRender: false,
    editable: true,
  });

  const fullDescEditor = useEditor({
    extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: '',
    onUpdate: ({ editor }) => setFormData(prev => ({ ...prev, fullDescription: editor.getHTML() })),
    immediatelyRender: false,
    editable: true,
  });

  const deliveryInfoEditor = useEditor({
    extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: '',
    onUpdate: ({ editor }) => setFormData(prev => ({ ...prev, deliveryInfo: editor.getHTML() })),
    immediatelyRender: false,
    editable: true,
  });


// ============================================================
// COST PER ITEM AUTO-CALCULATION
// ============================================================
const calculateCostPerItem = useCallback(() => {
  // Get current values directly from formData - use the most up-to-date values
  const buyingPriceValue = formData.buyingPrice;
  const packagingCostValue = formData.packagingCost;
  const deliveryCostValue = formData.deliveryCost;
  
  // Debug logging
  console.log('Calculating Cost Per Item:', {
    buyingPrice: buyingPriceValue,
    packagingCost: packagingCostValue,
    deliveryCost: deliveryCostValue
  });
  
  // Parse values - handle empty strings, null, undefined
  const buyingPrice = buyingPriceValue === '' || buyingPriceValue === null || buyingPriceValue === undefined 
    ? 0 
    : Number(buyingPriceValue);
    
  const packagingCost = packagingCostValue === '' || packagingCostValue === null || packagingCostValue === undefined 
    ? 0 
    : Number(packagingCostValue);
    
  const deliveryCost = deliveryCostValue === '' || deliveryCostValue === null || deliveryCostValue === undefined 
    ? 0 
    : Number(deliveryCostValue);
  
  // Check which fields have values (must have a value AND be > 0)
  const hasBuyingPrice = buyingPriceValue !== '' && 
                         buyingPriceValue !== null && 
                         buyingPriceValue !== undefined && 
                         buyingPrice > 0;
  
  const hasPackagingCost = packagingCostValue !== '' && 
                           packagingCostValue !== null && 
                           packagingCostValue !== undefined && 
                           packagingCost > 0;
  
  const hasDeliveryCost = deliveryCostValue !== '' && 
                          deliveryCostValue !== null && 
                          deliveryCostValue !== undefined && 
                          deliveryCost > 0;
  
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
  
  console.log('Setting costPerItem to:', displayValue);
  
  setFormData(prev => {
    // Only update if value actually changed
    if (prev.costPerItem === displayValue) return prev;
    return { ...prev, costPerItem: displayValue };
  });
}, [formData.buyingPrice, formData.packagingCost, formData.deliveryCost]);

// Watch for changes in the three fields - this triggers on any change
useEffect(() => {
  calculateCostPerItem();
}, [formData.buyingPrice, formData.packagingCost, formData.deliveryCost, calculateCostPerItem]);

useEffect(() => {
  if (!isLoading && originalProduct) {
    // Give it a moment for all state to settle
    const timer = setTimeout(() => {
      calculateCostPerItem();
    }, 500);
    return () => clearTimeout(timer);
  }
}, [isLoading, originalProduct]);

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
        setFormData(prev => {
          const updates = {};
          
          if (!prev.packagingCost || prev.packagingCost === '') {
            updates.packagingCost = result.data.packagingCost?.toString() || '';
          }
          
          if (!prev.deliveryCost || prev.deliveryCost === '') {
            updates.deliveryCost = result.data.deliveryCost?.toString() || '';
          }
          
          if (Object.keys(updates).length > 0) {
            return { ...prev, ...updates };
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Error fetching default costs:', error);
    }
  };

  // ============================================================
  // FAQ HANDLERS
  // ============================================================
  const addFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const updateFaq = (index, field, value) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setFormData(prev => ({ ...prev, faqs: updatedFaqs }));
  };

  const removeFaq = (index) => {
    const updatedFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, faqs: updatedFaqs }));
  };

  // ============================================================
  // SLUG UNIQUENESS CHECK
  // ============================================================
  const checkSlugUniqueness = async (slug) => {
    if (!slug || slug.length < 2) {
      setIsSlugAvailable(null);
      return;
    }

    if (originalProduct?.slug === slug) {
      setIsSlugAvailable(true);
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
      setIsSlugAvailable(data.data?.isAvailable !== false);
    } catch (error) {
      console.error('Error checking slug:', error);
      setIsSlugAvailable(null);
    } finally {
      setIsCheckingSlug(false);
    }
  };

  // ============================================================
  // SLUG EFFECTS
  // ============================================================
  
  useEffect(() => {
    if (formData.productName && !isSlugManuallyEdited) {
      const generatedSlug = formData.productName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
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

  useEffect(() => {
    if (shortDescEditor && originalProduct?.shortDescription && !shortDescContentSet.current) {
      const timer = setTimeout(() => {
        shortDescEditor.commands.setContent(originalProduct.shortDescription);
        shortDescContentSet.current = true;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [shortDescEditor, originalProduct?.shortDescription]);

  useEffect(() => {
    if (fullDescEditor && originalProduct?.fullDescription && !fullDescContentSet.current) {
      const timer = setTimeout(() => {
        fullDescEditor.commands.setContent(originalProduct.fullDescription);
        fullDescContentSet.current = true;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [fullDescEditor, originalProduct?.fullDescription]);

  useEffect(() => {
    if (deliveryInfoEditor && originalProduct?.deliveryInfo && !deliveryInfoContentSet.current) {
      const timer = setTimeout(() => {
        deliveryInfoEditor.commands.setContent(originalProduct.deliveryInfo);
        deliveryInfoContentSet.current = true;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [deliveryInfoEditor, originalProduct?.deliveryInfo]);

  useEffect(() => {
    setIsMounted(true);
    fetchBrands();
    fetchCategories();
    fetchTags();
    fetchDefaultCosts(); // Fetch default costs on mount
  }, []);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    } else {
      toast.error('No product ID provided');
      router.push('/authorize/all-products');
    }
  }, [productId]);

  useEffect(() => {
    if (formData.category) {
      fetchSubcategories(formData.category);
    } else {
      setSubcategories([]);
      setFormData(prev => ({ ...prev, subcategory: '', childSubcategory: '' }));
      setChildSubcategories([]);
    }
  }, [formData.category]);

  useEffect(() => {
    if (formData.category && formData.subcategory) {
      fetchChildSubcategories(formData.category, formData.subcategory);
    } else {
      setChildSubcategories([]);
      setFormData(prev => ({ ...prev, childSubcategory: '' }));
    }
  }, [formData.subcategory]);

  useEffect(() => {
    if (skuValidateTimeoutRef.current) clearTimeout(skuValidateTimeoutRef.current);
    skuValidateTimeoutRef.current = setTimeout(() => {
      validateSku(formData.skuCode);
    }, 500);
    return () => { if (skuValidateTimeoutRef.current) clearTimeout(skuValidateTimeoutRef.current); };
  }, [formData.skuCode]);

  // ============================================================
// FORCE CALCULATION WHEN PRODUCT DATA IS FULLY LOADED
// ============================================================
useEffect(() => {
  if (!isLoading && originalProduct) {
    // Check if we have values to calculate
    const hasValues = formData.buyingPrice !== '' || 
                      formData.packagingCost !== '' || 
                      formData.deliveryCost !== '';
    
    if (hasValues) {
      // Give it a moment for all state to settle
      const timer = setTimeout(() => {
        calculateCostPerItem();
      }, 200);
      return () => clearTimeout(timer);
    }
  }
}, [isLoading, originalProduct, formData.buyingPrice, formData.packagingCost, formData.deliveryCost]);


  // ============================================================
// FORCE CALCULATION WHEN PRODUCT IS LOADED
// ============================================================
useEffect(() => {
  if (!isLoading && originalProduct) {
    // Check if we have values to calculate
    const hasValues = formData.buyingPrice !== '' || 
                      formData.packagingCost !== '' || 
                      formData.deliveryCost !== '';
    
    if (hasValues) {
      // Give it multiple chances to calculate
      const timer1 = setTimeout(() => {
        calculateCostPerItem();
      }, 100);
      
      const timer2 = setTimeout(() => {
        calculateCostPerItem();
      }, 300);
      
      const timer3 = setTimeout(() => {
        calculateCostPerItem();
      }, 600);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }
}, [isLoading, originalProduct, formData.buyingPrice, formData.packagingCost, formData.deliveryCost]);


  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/brands', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) setBrands(data.data);
    } catch (error) { console.error('Error fetching brands:', error); }
  };

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

  const validateSku = async (skuValue) => {
    if (!skuValue || skuValue.length < 3) {
      setIsSkuUnique(null);
      return;
    }
    if (originalProduct?.skuCode === skuValue) {
      setIsSkuUnique(true);
      return;
    }
    setIsValidatingSku(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/validate-sku/${skuValue}?excludeId=${productId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setIsSkuUnique(data.data.isUnique);
        if (!data.data.isUnique) setErrors(prev => ({ ...prev, skuCode: data.data.message }));
        else setErrors(prev => ({ ...prev, skuCode: null }));
      }
    } catch (error) { console.error('SKU validation error:', error); }
    finally { setIsValidatingSku(false); }
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

  const handleBrandAdded = (newBrand) => {
    setBrands(prev => [...prev, newBrand]);
    setFormData(prev => ({ ...prev, brand: newBrand.name }));
  };

  // ============================================================
  // VIDEO HANDLERS
  // ============================================================
  const handleVideoFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (videoUpload.preview?.startsWith('blob:')) {
      URL.revokeObjectURL(videoUpload.preview);
    }

    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
    const maxVideoSize = 100 * 1024 * 1024;

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
          isNew: true,
          file: null,
          error: '',
          uploadAborted: false,
          uploadBatchId: null,
          id: `media_${Date.now()}_${idx}`
        };
      }
    });

    setProductImages(updatedImages);
    toast.success(`${selectedItems.length} image(s) added from media library`);
  };

const handleSingleMediaLibrarySelect = (selectedItems) => {
  if (selectedItems.length === 0) {
    setShowSingleMediaPicker(false);
    setSelectedSlotIndex(null);
    return;
  }
  
  const item = selectedItems[0];
  const index = selectedSlotIndex;
  
  if (index === null || index === undefined) {
    setShowSingleMediaPicker(false);
    setSelectedSlotIndex(null);
    return;
  }
  
  if (productImages[index].url) {
    toast.error('This slot already has an image. Please remove it first.');
    setShowSingleMediaPicker(false);
    setSelectedSlotIndex(null);
    return;
  }

  const updatedImages = [...productImages];
  updatedImages[index] = {
    ...updatedImages[index],
    url: item.url,
    publicId: item.public_id,
    preview: item.url,
    uploading: false,
    isNew: true,
    file: null,
    error: '',
    uploadAborted: false,
    uploadBatchId: null,
    id: `media_${Date.now()}_${index}`
  };

  setProductImages(updatedImages);
  toast.success('Image added from media library');
  
  setShowSingleMediaPicker(false);
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
  setSlotPickerIndex(null);
  
  setTimeout(() => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  }, 100);
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

 const handleVideoMediaLibrarySelect = (selectedItems) => {
  if (selectedItems.length === 0) {
    setShowVideoMediaPicker(false);
    return;
  }
  
  const item = selectedItems[0];
  
  if (item.resource_type !== 'video') {
    toast.error('Please select a video file from the media library');
    setShowVideoMediaPicker(false);
    return;
  }
  
  if (videoUpload.url) {
    toast.error('A video is already added. Please remove it first.');
    setShowVideoMediaPicker(false);
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
  
  toast.success('Video added from media library');
  setShowVideoMediaPicker(false);
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

  setShowSlotPicker(false);
  setShowSingleMediaPicker(false);
  setShowMediaPicker(false);
  setSlotPickerIndex(null);
  setSelectedSlotIndex(null);

  if (productImages[index].preview?.startsWith('blob:')) {
    URL.revokeObjectURL(productImages[index].preview);
  }

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
  const imageId = `new_${batchId}_${index}`;
  
  setProductImages(prev => {
    const updated = [...prev];
    updated[index] = {
      id: imageId,
      file: file,
      preview: previewUrl,
      error: '',
      uploading: true,
      url: null,
      publicId: null,
      isNew: true,
      uploadAborted: false,
      uploadBatchId: batchId
    };
    return updated;
  });

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
  } catch (error) {
    setProductImages(prev => {
      const updated = [...prev];
      if (updated[index] && updated[index].uploadBatchId === batchId) {
        updated[index] = { ...updated[index], error: 'Failed to upload image', uploading: false, preview: null, file: null, isNew: false };
      }
      return updated;
    });
    toast.error(`Failed to upload image ${index + 1}`);
  }
};

  const handleMultipleImageSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
   
  setShowMediaPicker(false);
  setShowSlotPicker(false);
    
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
      const imageId = `new_${batchId}_${slotIndex}`;
      
      setProductImages(prev => {
        const updated = [...prev];
        updated[slotIndex] = {
          id: imageId,
          file: file,
          preview: previewUrl,
          error: '',
          uploading: true,
          url: null,
          publicId: null,
          isNew: true,
          uploadAborted: false,
          uploadBatchId: batchId
        };
        return updated;
      });
      
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
          toast.success(`Image uploaded to slot ${slotIndex + 1}`);
        } catch (error) {
          setProductImages(prev => {
            const updated = [...prev];
            if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId) {
              updated[slotIndex] = { ...updated[slotIndex], error: 'Failed to upload image', uploading: false, preview: null, file: null, isNew: false };
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
    
    if (!imageToRemove.isNew && imageToRemove.publicId) {
      setImagesToDelete(prev => [...prev, imageToRemove.publicId]);
    }
    
    if (imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) URL.revokeObjectURL(imageToRemove.preview);
    
    const updatedImages = [...productImages];
    updatedImages[index] = { 
      id: null, file: null, preview: null, error: '', url: null, publicId: null, 
      uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null
    };
    setProductImages(updatedImages);
    if (fileInputRefs.current[index]) fileInputRefs.current[index].value = '';
    toast.success(`Image removed from slot ${index + 1}`);
  };

  // ============================================================
  // FORM HANDLERS
  // ============================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSlugChange = (e) => {
    const { value } = e.target;
    setIsSlugManuallyEdited(true);
    setFormData(prev => ({ ...prev, slug: value }));
    if (errors.slug) setErrors(prev => ({ ...prev, slug: null }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value === '' ? '' : parseFloat(value) }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleUnitChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, unit: value }));
    setShowCustomUnit(value === 'other');
    if (value !== 'other') setFormData(prev => ({ ...prev, customUnit: '' }));
  };

  const handleTagSelect = (tagId) => {
    if (formData.tags && formData.tags.length === 1 && formData.tags[0] === tagId) {
      setFormData(prev => ({ ...prev, tags: [] }));
    } else {
      setFormData(prev => ({ ...prev, tags: [tagId] }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const clearRating = () => {
    setFormData(prev => ({ ...prev, rating: 0 }));
  };

  const addAdditionalInfo = () => {
    setFormData(prev => ({ ...prev, additionalInfo: [...prev.additionalInfo, { fieldName: '', fieldValue: '' }] }));
  };

  const updateAdditionalInfo = (index, field, value) => {
    const updatedInfo = [...formData.additionalInfo];
    updatedInfo[index] = { ...updatedInfo[index], [field]: value };
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
  };

  const removeAdditionalInfo = (index) => {
    const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
  };

  const addKeyword = () => {
    if (!keywordInput.trim()) return;
    const keywordsToAdd = keywordInput.split(',').map(k => k.trim()).filter(k => k !== '');
    setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, metaKeywords: [...(prev.metaSettings.metaKeywords || []), ...keywordsToAdd] } }));
    setKeywordInput('');
  };

  const removeKeyword = (indexToRemove) => {
    setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, metaKeywords: prev.metaSettings.metaKeywords.filter((_, i) => i !== indexToRemove) } }));
  };

  const handleMetaChange = (field, value) => {
    setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, [field]: value } }));
  };

// ============================================================
// FETCH PRODUCT - UPDATED with better initialization and calculation
// ============================================================
const fetchProduct = async () => {
  setIsLoading(true);
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/products/${productId}`, { 
      headers: { 'Authorization': `Bearer ${token}` } 
    });
    const data = await response.json();
    
    if (data.success) {
      const product = data.data.product;
      setOriginalProduct(product);
      setOriginalBarcode(product.barcode || '');
      
      // Handle video data
      if (product.videoUrl) {
        if (product.videoType === 'youtube') {
          setVideoType('youtube');
          const embedMatch = product.videoUrl.match(/embed\/([^?]+)/);
          if (embedMatch) {
            setYoutubeUrl(`https://www.youtube.com/watch?v=${embedMatch[1]}`);
          } else {
            setYoutubeUrl(product.videoUrl);
          }
        } else {
          setVideoType('upload');
          setVideoUpload({
            file: null,
            preview: null,
            uploading: false,
            error: '',
            url: product.videoUrl,
            publicId: product.videoPublicId || ''
          });
        }
      }
      
      // Extract tag IDs from populated tags
      let tagIds = [];
      if (product.tags && Array.isArray(product.tags)) {
        tagIds = product.tags.map(tag => {
          if (typeof tag === 'string') return tag;
          if (tag && typeof tag === 'object' && tag._id) {
            return tag._id;
          }
          return tag;
        });
      }
      
      // Extract FAQ data
      const faqData = product.faqs || [];
      
      // ✅ Set all form data at once
      const newFormData = {
        productName: product.productName || '',
        slug: product.slug || '',
        skuCode: product.skuCode || '',
        shortDescription: product.shortDescription || '',
        fullDescription: product.fullDescription || '',
        category: product.category?._id || product.category || '',
        subcategory: product.subcategory || '',
        childSubcategory: product.childSubcategory || '',
        brand: product.brand || '',
        stockQuantity: product.stockQuantity || '',
        stockAlertQuantity: product.stockAlertQuantity || '',
        regularPrice: product.regularPrice || '',
        costPerItem: product.costPerItem || '',
        discountPrice: product.discountPrice || '',
        buyingPrice: product.buyingPrice || '',
        packagingCost: product.packagingCost || '',
        deliveryCost: product.deliveryCost || '',
        unit: product.unit || 'pcs',
        customUnit: (product.unit && !['pcs', 'ton'].includes(product.unit)) ? product.unit : '',
        colors: (product.colors || []).map(c => ({ code: c })),
        deliveryInfo: product.deliveryInfo || '',
        additionalInfo: product.additionalInfo || [],
        tags: tagIds,
        isFeatured: product.isFeatured || false,
        showOnBanner: product.showOnBanner || false,
        rating: product.rating || 0,
        faqs: faqData,
        videoUrl: product.videoUrl || '',
        videoPublicId: product.videoPublicId || '',
        videoType: product.videoType || 'upload',
        metaSettings: product.metaSettings || { metaTitle: '', metaDescription: '', metaKeywords: [] }
      };
      
      setFormData(newFormData);
      
      if (product.unit === 'other' || (product.unit && !['pcs', 'ton'].includes(product.unit))) {
        setShowCustomUnit(true);
      }
      
      // Set product images
      if (product.images && product.images.length > 0) {
        const updatedImages = [...productImages];
        product.images.forEach((image, idx) => {
          if (idx < 6) {
            updatedImages[idx] = {
              id: `existing_${idx}`,
              file: null,
              preview: image.url,
              error: '',
              url: image.url,
              publicId: image.publicId,
              uploading: false,
              isNew: false,
              uploadAborted: false,
              uploadBatchId: null
            };
          }
        });
        setProductImages(updatedImages);
      }
      
      // Fetch subcategories
      if (product.category?._id || product.category) {
        const categoryId = product.category?._id || product.category;
        await fetchSubcategories(categoryId);
        if (product.subcategory) {
          setFormData(prev => ({ ...prev, subcategory: product.subcategory }));
          await fetchChildSubcategories(categoryId, product.subcategory);
          if (product.childSubcategory) setFormData(prev => ({ ...prev, childSubcategory: product.childSubcategory }));
        }
      }
      
      // Set editor content
      setTimeout(() => {
        if (shortDescEditor && product.shortDescription) {
          shortDescEditor.commands.setContent(product.shortDescription);
        }
        if (fullDescEditor && product.fullDescription) {
          fullDescEditor.commands.setContent(product.fullDescription);
        }
        if (deliveryInfoEditor && product.deliveryInfo) {
          deliveryInfoEditor.commands.setContent(product.deliveryInfo);
        }
      }, 1000);
      
      // Validate SKU
      if (product.skuCode) validateSku(product.skuCode);
      
      // ✅ FIX: Calculate cost per item after all data is loaded
      // The useEffect will also handle this, but we want to ensure it happens
      setTimeout(() => {
        calculateCostPerItem();
      }, 200);
      
    } else {
      toast.error('Failed to fetch product details');
      router.push('/authorize/all-products');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    toast.error('Failed to fetch product details');
    router.push('/authorize/all-products');
  } finally {
    setIsLoading(false);
  }
};
  // ============================================================
  // HAS CHANGES - UPDATED to include packagingCost and deliveryCost
  // ============================================================
  const hasChanges = () => {
    if (!originalProduct) return false;
    
    if (formData.productName !== originalProduct.productName) return true;
    if (formData.slug !== (originalProduct.slug || '')) return true;
    if (formData.skuCode !== (originalProduct.skuCode || '')) return true;
    if (formData.shortDescription !== originalProduct.shortDescription) return true;
    if (formData.fullDescription !== originalProduct.fullDescription) return true;
    if (formData.category !== (originalProduct.category?._id || originalProduct.category)) return true;
    if (formData.subcategory !== (originalProduct.subcategory || '')) return true;
    if (formData.childSubcategory !== (originalProduct.childSubcategory || '')) return true;
    if (formData.brand !== originalProduct.brand) return true;
    if (Number(formData.stockQuantity) !== Number(originalProduct.stockQuantity)) return true;
    if (Number(formData.regularPrice) !== Number(originalProduct.regularPrice)) return true;
    if (Number(formData.costPerItem) !== Number(originalProduct.costPerItem || 0)) return true;
    if (Number(formData.discountPrice) !== Number(originalProduct.discountPrice)) return true;
    if (Number(formData.buyingPrice) !== Number(originalProduct.buyingPrice || 0)) return true;
    if (Number(formData.packagingCost) !== Number(originalProduct.packagingCost || 0)) return true; // NEW
    if (Number(formData.deliveryCost) !== Number(originalProduct.deliveryCost || 0)) return true; // NEW
    if (formData.unit !== originalProduct.unit) return true;
    if (JSON.stringify(formData.colors.map(c => c.code)) !== JSON.stringify(originalProduct.colors || [])) return true;
    if (formData.deliveryInfo !== originalProduct.deliveryInfo) return true;
    if (JSON.stringify(formData.tags) !== JSON.stringify(originalProduct.tags || [])) return true;
    if (formData.isFeatured !== originalProduct.isFeatured) return true;
    if (formData.showOnBanner !== originalProduct.showOnBanner) return true;
    if (formData.rating !== (originalProduct.rating || 0)) return true;
    if (formData.videoUrl !== (originalProduct.videoUrl || '')) return true;
    if (formData.videoType !== (originalProduct.videoType || 'upload')) return true;
    if (JSON.stringify(formData.additionalInfo) !== JSON.stringify(originalProduct.additionalInfo || [])) return true;
    if (JSON.stringify(formData.metaSettings) !== JSON.stringify(originalProduct.metaSettings || {})) return true;
    if (JSON.stringify(formData.faqs) !== JSON.stringify(originalProduct.faqs || [])) return true;
    
    const currentImageUrls = productImages.filter(img => img.url !== null && !img.uploading && !img.uploadAborted && !img.isNew).map(img => img.url);
    const originalImageUrls = (originalProduct.images || []).map(img => img.url);
    if (JSON.stringify(currentImageUrls) !== JSON.stringify(originalImageUrls)) return true;
    
    if (productImages.some(img => img.isNew && img.url !== null)) return true;
    if (imagesToDelete.length > 0) return true;
    
    return false;
  };

  // ============================================================
  // VALIDATION - UPDATED to remove costPerItem required validation
  // ============================================================
  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName?.trim()) newErrors.productName = 'Product name is required';
    if (!formData.skuCode?.trim()) newErrors.skuCode = 'SKU code is required';
    if (!formData.fullDescription || formData.fullDescription === '<p></p>') newErrors.fullDescription = 'Full description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    // Cost Per Item is auto-calculated - no longer required validation
    // if (!formData.costPerItem && formData.costPerItem !== 0) {
    //   newErrors.costPerItem = 'Cost per item is required';
    // } else if (formData.costPerItem !== '' && Number(formData.costPerItem) < 0) {
    //   newErrors.costPerItem = 'Cost per item cannot be negative';
    // }
    if (!formData.stockQuantity && formData.stockQuantity !== 0) newErrors.stockQuantity = 'Stock quantity is required';
    else if (formData.stockQuantity !== '' && Number(formData.stockQuantity) < 0) newErrors.stockQuantity = 'Stock quantity cannot be negative';
    if (!formData.regularPrice && formData.regularPrice !== 0) newErrors.regularPrice = 'Regular price is required';
    else if (formData.regularPrice !== '' && Number(formData.regularPrice) <= 0) newErrors.regularPrice = 'Regular price must be greater than 0';
    if (formData.discountPrice && Number(formData.discountPrice) > Number(formData.regularPrice)) newErrors.discountPrice = 'Discount price cannot exceed regular price';
    if (!formData.unit) newErrors.unit = 'Unit is required';
    if (formData.unit === 'other' && !formData.customUnit?.trim()) newErrors.customUnit = 'Please specify the unit';
    if (formData.tags.length === 0) newErrors.tags = 'Please select one product tag';
    if (formData.tags.length > 1) newErrors.tags = 'Please select only one tag';
    
    if (formData.slug && isSlugManuallyEdited && isSlugAvailable === false) {
      newErrors.slug = 'This slug is already taken. Please choose a different one.';
    }
    
    const hasImages = productImages.some(img => img.url !== null && !img.uploading);
    if (!hasImages) newErrors.images = 'At least one product image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============================================================
  // SUBMIT HANDLER - UPDATED to include packagingCost and deliveryCost
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const uploading = productImages.some(img => img.uploading) || videoUpload.uploading;
    if (uploading) {
      toast.error('Please wait for all uploads to complete');
      return;
    }
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    if (!hasChanges()) {
      toast.info('No changes to save');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const imageUrls = productImages.filter(img => img.url !== null && !img.uploading && !img.uploadAborted).map(img => img.url);
      const finalUnit = formData.unit === 'other' ? formData.customUnit : formData.unit;
      const colorStrings = formData.colors.map(color => color.code);
      
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
        // costPerItem is auto-calculated on backend, we don't need to send it
        // costPerItem: formData.costPerItem ? Number(formData.costPerItem) : 0,
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
        videoUrl: formData.videoUrl || '',
        videoPublicId: videoUpload.publicId || formData.videoPublicId || '',
        videoType: formData.videoType || 'upload',
        metaSettings: formData.metaSettings,
        images: imageUrls,
        imagesToDelete: imagesToDelete
      };

      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
    if (data.success) {
  toast.success('Product updated successfully!');
  window.location.href = '/authorize/all-products';
} else {
  toast.error(data.error || 'Failed to update product');
}
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // GET USER ROLE
  // ============================================================
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

  const userRole = getUserRole();
  const isAdminOrSuperAdmin = userRole === 'super_admin' || userRole === 'admin';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-pink-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="create_products">
    <MantineProvider>
      <div className="min-h-screen bg-[#f0f7fa]">
        <AddBrandModal isOpen={showAddBrandModal} onClose={() => setShowAddBrandModal(false)} onBrandAdded={handleBrandAdded} />

        {/* Header */}
        <div className="bg-white border-b border-pink-600/20 shadow-lg sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <a href="/authorize/all-products" className="p-2 hover:bg-pink-600/20 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-black/80 hover:text-black" />
                </a>
                <div>
                  <div className="flex items-center gap-2">
                    <Package className="w-6 h-6 text-pink-600" />
                    <h1 className="text-xl font-bold text-black">Edit Product</h1>
                  </div>
                  <p className="text-sm text-black/70 mt-1">Update product information</p>
                </div>
              </div>
              {!hasChanges() && originalProduct && (
                <span className="text-xs text-pink-600 flex items-center gap-1 bg-pink-600/20 px-3 py-1 rounded-full">
                  <Clock className="w-3 h-3" />
                  No pending changes
                </span>
              )}
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
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
                      <input type="text" name="productName" value={formData.productName} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.productName ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g., Wireless Headphones, Smart Watch Pro" />
                      {errors.productName && <p className="text-xs text-red-600 mt-1">{errors.productName}</p>}
                    </div>

                    {/* Slug Field */}
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
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.slug}
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

                    {/* SKU Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SKU Code <span className="text-red-500">*</span></label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            {isValidatingSku ? (
                              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                            ) : formData.skuCode && isSkuUnique === true && formData.skuCode !== originalProduct?.skuCode ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : formData.skuCode && isSkuUnique === true && formData.skuCode === originalProduct?.skuCode ? (
                              <CheckCircle className="w-4 h-4 text-blue-500" />
                            ) : formData.skuCode && isSkuUnique === false ? (
                              <XCircle className="w-4 h-4 text-red-500" />
                            ) : (
                              <Hash className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <input
                            type="text"
                            name="skuCode"
                            value={formData.skuCode}
                            onChange={(e) => {
                              setFormData(prev => ({ ...prev, skuCode: e.target.value }));
                              if (errors.skuCode) setErrors(prev => ({ ...prev, skuCode: null }));
                            }}
                            className={`w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.skuCode || isSkuUnique === false ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter SKU code"
                          />
                        </div>
                        <button type="button" onClick={generateSkuFromBackend} disabled={isGeneratingSku} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2">
                          {isGeneratingSku ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                          Generate New SKU
                        </button>
                      </div>
                      {errors.skuCode && <p className="text-xs text-red-600 mt-1">{errors.skuCode}</p>}
                      {isSkuUnique === true && formData.skuCode && formData.skuCode !== originalProduct?.skuCode && (
                        <p className="text-xs text-green-600 mt-1">✓ SKU is available</p>
                      )}
                      {isSkuUnique === true && formData.skuCode === originalProduct?.skuCode && (
                        <p className="text-xs text-pink-600 mt-1">✓ Current SKU (no change)</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Must be unique across all products. Format: letters, numbers, hyphens (4-20 chars)</p>
                    </div>

                    {/* Short Description */}
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

                    {/* Full Description */}
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
                          <select name="brand" value={formData.brand} onChange={handleChange} className={`flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.brand ? 'border-red-500' : 'border-gray-300'}`}>
                            <option value="">Select Brand</option>
                            {brands.map(brand => (<option key={brand._id} value={brand.name}>{brand.name}</option>))}
                          </select>
                          <button type="button" onClick={() => setShowAddBrandModal(true)} className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2 whitespace-nowrap font-semibold">
                            <Plus className="w-4 h-4" /> Add Brand
                          </button>
                        </div>
                        {errors.brand && <p className="text-xs text-red-600 mt-1">{errors.brand}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Inventory Card - UPDATED with Packaging Cost, Delivery Cost, and Auto-calculated Cost Per Item */}
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
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Alert Quantity</label>
                        <input type="number" name="stockAlertQuantity" value={formData.stockAlertQuantity} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition" placeholder="Notify when stock reaches this level" />
                        <p className="text-xs text-gray-500 mt-1">You'll be notified when stock reaches this level</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price (৳) <span className="text-red-500">*</span></label>
                        <input type="number" name="regularPrice" value={formData.regularPrice} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.regularPrice ? 'border-red-500' : 'border-gray-300'}`} placeholder="0" />
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
                            onChange={handleNumberChange} 
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

                      {/* PACKAGING COST - NEW */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Packaging Cost (৳) <span className="text-gray-400 text-xs">(Optional)</span>
                        </label>
                        <input 
                          type="number" 
                          name="packagingCost" 
                          value={formData.packagingCost || ''} 
                          onChange={handleNumberChange} 
                          onWheel={(e) => e.target.blur()} 
                          min="0" 
                          step="1" 
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition" 
                          placeholder="0" 
                        />
                        <p className="text-xs text-gray-500 mt-1">Cost of packaging materials per unit</p>
                      </div>

                      {/* DELIVERY COST - NEW */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Delivery Cost (৳) <span className="text-gray-400 text-xs">(Optional)</span>
                        </label>
                        <input 
                          type="number" 
                          name="deliveryCost" 
                          value={formData.deliveryCost || ''} 
                          onChange={handleNumberChange} 
                          onWheel={(e) => e.target.blur()} 
                          min="0" 
                          step="1" 
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition" 
                          placeholder="0" 
                        />
                        <p className="text-xs text-gray-500 mt-1">Cost of delivery per unit</p>
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
                            <div className="mt-3 flex flex-wrap gap-2">
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
                    <p className="text-xs text-gray-500 mt-1">Upload up to 6 images (JPG, PNG, WebP, max 5MB each) • Drag to reorder</p>
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
                              {index === 0 && img.url && !img.uploading && <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-green-500 text-white text-[10px] rounded z-10">Primary</span>}
                            </div>
                          ) : (
                            <div className={`border-2 border-dashed rounded-lg p-4 text-center h-40 flex flex-col items-center justify-center cursor-pointer transition-colors ${img.error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-pink-600 hover:bg-pink-600/5'}`} onClick={() => handleSlotClick(index)}>
                              <input type="file" ref={el => fileInputRefs.current[index] = el} className="hidden" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={(e) => handleImageChange(e, index)} />
                              <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${img.error ? 'text-red-400' : 'text-gray-400'}`} />
                              <p className={`text-xs ${img.error ? 'text-red-600' : 'text-gray-600'}`}>Slot {index + 1}</p>
                              <p className="text-[10px] text-gray-400 mt-1">Click to upload</p>
                              {img.error && <p className="text-xs text-red-600 mt-1">{img.error}</p>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-xs text-gray-500 text-center">{productImages.filter(img => img.url !== null && !img.uploading).length} of 6 images uploaded</div>
                    {imagesToDelete.length > 0 && <div className="mt-2 text-xs text-red-500 text-center">{imagesToDelete.length} image(s) marked for deletion</div>}
                  </div>
                </div>

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
                            ? 'bg-pink-600 text-[#004767]'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Youtube className="w-4 h-4 inline mr-1" />
                        YouTube Link
                      </button>
                    </div>

                    {getVideoPreview()}

                    {videoType === 'upload' && !videoUpload.url && !videoUpload.preview && (
                      <div>
                        <div className="flex flex-col sm:flex-row gap-3 mb-4">
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

                        <input
                          type="file"
                          ref={videoInputRef}
                          className="hidden"
                          accept="video/*"
                          onChange={handleVideoFileChange}
                        />

                        <div className="text-xs text-gray-400 text-center">
                          <p>MP4, WebM, MOV (Max 100MB)</p>
                          <p className="mt-1">Click on a button above to add a video</p>
                        </div>
                      </div>
                    )}

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

                {/* Colors */}
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20">
                  <div className="p-5 border-b border-pink-600/20">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Palette className="w-5 h-5 text-pink-600" /> Colors <span className="text-gray-400 text-xs">(Optional)</span></h2>
                  </div>
                  <div className="p-5">
                    <ColorPicker colors={formData.colors} onChange={(colors) => setFormData(prev => ({ ...prev, colors }))} />
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

                {/* Product Tag Selection */}
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
                    
                    {isLoadingTags ? (
                      <div className="flex justify-center py-4">
                        <Loader2 className="w-6 h-6 animate-spin text-pink-600" />
                      </div>
                    ) : productTags.length === 0 ? (
                      <div className="text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-500">No tags available. Please create tags first.</p>
                        <button
                          type="button"
                          onClick={() => router.push('/authorize/tags')}
                          className="mt-2 text-sm text-pink-600 hover:text-[#0891B2] font-medium"
                        >
                          Create Tags →
                        </button>
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
                      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-xs font-medium text-green-700 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Selected Tag:
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
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
                          onClick={() => handleRatingClick(star)}
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
                    <p className="text-xs text-gray-500 mt-3">Set the product rating (1-5 stars) - Optional</p>
                    {formData.rating > 0 && (
                      <button
                        type="button"
                        onClick={clearRating}
                        className="mt-2 text-xs text-red-500 hover:text-red-600 transition-colors"
                      >
                        Clear Rating
                      </button>
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

            {/* Update Product Button at Bottom */}
            <div className="mt-8 flex justify-end gap-3">
              <a href="/authorize/all-products">
                <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">Cancel</button>
              </a>
              <button type="submit" disabled={isSubmitting || !hasChanges()} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-600 to-pink-700 text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 shadow-md hover:shadow-lg">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSubmitting ? 'Updating...' : 'Update Product'}
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
    </MantineProvider>
    </ProtectedRoute>
  );
}