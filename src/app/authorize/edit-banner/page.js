// app/authorize/edit-banner/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NextLink from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  X,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Eye,
  Wand2,
  CheckCircle,
  AlertCircle,
  Package,
  Search,
  Truck,
  Shield,
  Clock,
  Star,
  TrendingUp,
  Headphones,
  Link as LinkIcon,
  Unlink
} from 'lucide-react';
import { toast } from 'sonner';
import { getBannerById, updateBanner } from '@/app/services/bannerService';

// Feature icon options
const FEATURE_ICONS = [
  { value: 'Truck', label: 'Truck', icon: <Truck className="w-4 h-4" /> },
  { value: 'Shield', label: 'Shield', icon: <Shield className="w-4 h-4" /> },
  { value: 'Clock', label: 'Clock', icon: <Clock className="w-4 h-4" /> },
  { value: 'Star', label: 'Star', icon: <Star className="w-4 h-4" /> },
  { value: 'TrendingUp', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
  { value: 'Headphones', label: 'Headphones', icon: <Headphones className="w-4 h-4" /> }
];

export default function EditBannerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bannerId = searchParams.get('id');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    mainText: '',
    description: '',
    badge: '',
    discount: '',
    category: '',
    bgImage: '',
    productImage: '',
    features: [],
    buttons: [
      { text: 'Shop Now', link: '/products', isPrimary: true },
      { text: 'Learn More', link: '/about', isPrimary: false }
    ],
    isActive: true,
    isPublished: false,
    displayOrder: 0
  });
  
  const fileInputRef = useRef(null);
  const bgFileInputRef = useRef(null);

  // Load banner data
  useEffect(() => {
    if (!bannerId) {
      toast.error('No banner ID provided');
      router.push('/authorize/banner-management');
      return;
    }

    loadBanner();
  }, [bannerId]);

  const loadBanner = async () => {
    setIsLoading(true);
    try {
      const response = await getBannerById(bannerId);
      if (response.success) {
        const banner = response.data;
        setFormData({
          title: banner.title || '',
          subtitle: banner.subtitle || '',
          mainText: banner.mainText || '',
          description: banner.description || '',
          badge: banner.badge || '',
          discount: banner.discount || '',
          category: banner.category || '',
          bgImage: typeof banner.bgImage === 'string' ? banner.bgImage : banner.bgImage?.url || '',
          productImage: typeof banner.productImage === 'string' ? banner.productImage : banner.productImage?.url || '',
          features: banner.features || [],
          buttons: banner.buttons || [
            { text: 'Shop Now', link: '/products', isPrimary: true },
            { text: 'Learn More', link: '/about', isPrimary: false }
          ],
          isActive: banner.isActive !== undefined ? banner.isActive : true,
          isPublished: banner.isPublished !== undefined ? banner.isPublished : false,
          displayOrder: banner.displayOrder || banner.order || 0
        });
      }
    } catch (error) {
      console.error('Error loading banner:', error);
      toast.error('Failed to load banner');
      router.push('/authorize/banner-management');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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

  const addButton = () => {
    if (formData.buttons.length >= 2) {
      toast.error('Maximum 2 buttons allowed');
      return;
    }
    setFormData(prev => ({
      ...prev,
      buttons: [...prev.buttons, { text: '', link: '', isPrimary: false }]
    }));
  };

  const removeButton = (index) => {
    if (formData.buttons.length <= 1) {
      toast.error('At least one button is required');
      return;
    }
    const updatedButtons = formData.buttons.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, buttons: updatedButtons }));
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
        if (removeBackground) {
          finalUrl = data.secure_url.replace(
            '/upload/',
            `/upload/e_background_removal,f_png/`
          );
        }
        setFormData(prev => ({
          ...prev,
          productImage: finalUrl
        }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title?.trim()) {
      toast.error('Title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updateBanner(bannerId, formData);
      if (result.success) {
        toast.success('Banner updated successfully!');
        router.push('/authorize/banner-management');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update banner');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading banner...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                  <h1 className="text-xl font-bold text-gray-900">Edit Banner</h1>
                </div>
                <p className="text-sm text-gray-500 mt-1">Update banner details</p>
              </div>
            </div>
            <button
              type="submit"
              form="edit-banner-form"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <form id="edit-banner-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    Basic Information
                  </h2>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      placeholder="e.g., Premium Gadgets"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtitle <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      placeholder="e.g., Latest Technology"
                    />
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Main Text <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="mainText"
                      value={formData.mainText}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      placeholder="e.g., Experience the Future Today"
                    />
                  </div> */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none"
                      placeholder="Write a compelling description..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Badge <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="badge"
                        value={formData.badge}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        placeholder="e.g., Best Seller"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        placeholder="e.g., 40% OFF"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      placeholder="e.g., Electronics"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                      Active
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                      Published
                    </label>
                    {/* <div>
                      <label className="text-sm text-gray-700 mr-2">Order:</label>
                      <input
                        type="number"
                        name="displayOrder"
                        value={formData.displayOrder}
                        onChange={handleChange}
                        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        min="0"
                      />
                    </div> */}
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
                        <input
                          type="text"
                          value={feature.text}
                          onChange={(e) => updateFeature(index, 'text', e.target.value)}
                          placeholder="Feature text..."
                          className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
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
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-blue-600" />
                      Buttons <span className="text-sm font-normal text-gray-400">(Max 2)</span>
                    </h2>
                    <span className="text-xs text-gray-500">{formData.buttons.length}/2</span>
                  </div>
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
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        />
                      </div>
                      <div className="flex-1 w-full">
                        <input
                          type="text"
                          value={button.link}
                          onChange={(e) => updateButton(index, 'link', e.target.value)}
                          placeholder="Button link..."
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
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
                          onClick={() => removeButton(index)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {formData.buttons.length < 2 && (
                    <button
                      type="button"
                      onClick={addButton}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Button
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="space-y-6">
              {/* Product Image Card */}
            {/* Product Image Card */}
<div className="bg-white rounded-xl shadow-sm border border-gray-200">
  <div className="p-5 border-b border-gray-200 flex items-center justify-between">
    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      <ImageIcon className="w-5 h-5 text-blue-600" />
      Product Image
    </h2>
    {formData.productImage && (
      <button
        type="button"
        onClick={() => {
          setFormData(prev => ({ ...prev, productImage: '' }));
          toast.info('Image will be removed when you save');
        }}
        className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
      >
        <Trash2 className="w-3 h-3" />
        Remove Image
      </button>
    )}
  </div>
  <div className="p-5 space-y-4">
    {/* Image Upload */}
    <div>
      <div className="relative rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        {formData.productImage ? (
          <div className="relative">
            <img
              src={formData.productImage}
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
                setFormData(prev => ({ ...prev, productImage: '' }));
                toast.info('Image will be removed on save');
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              title="Remove image"
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
          ref={fileInputRef}
        />
      </div>
      {isUploading && (
        <div className="flex items-center justify-center gap-2 mt-2">
          <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          <span className="text-sm text-gray-500">
            {removeBackground ? 'Uploading and removing background...' : 'Uploading...'}
          </span>
        </div>
      )}
      {!formData.productImage && (
        <p className="text-xs text-gray-400 mt-1">No image uploaded</p>
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
                </div>
                <div className="p-5">
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                    <img
                      src={formData.bgImage || 'https://via.placeholder.com/400x200?text=Upload+Background'}
                      alt="Background"
                      className="w-full h-32 object-cover"
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
                    ref={bgFileInputRef}
                  />
                  <p className="text-xs text-gray-400 mt-2 text-center">Recommended: 1920x600px, max 5MB</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}