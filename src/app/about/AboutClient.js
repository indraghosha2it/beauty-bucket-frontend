
// // app/about/AboutClient.js
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { 
//   FaHeart, 
//   FaLeaf, 
//   FaShippingFast, 
//   FaShieldAlt, 
//   FaStar, 
//   FaUsers, 
//   FaAward, 
//   FaGlobe,
//   FaArrowRight,
//   FaCheckCircle,
//   FaGift,
//   FaSmile,
//   FaRocket,
//   FaStore,
//   FaTrophy,
//   FaChevronLeft,
//   FaChevronRight,
//   FaGem,
//   FaHands,
//   FaSeedling,
//   FaCalendarAlt,
//   FaMapMarkerAlt
// } from 'react-icons/fa';
// import { GiLipstick, GiSparkles } from 'react-icons/gi';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Icon mapping for dynamic rendering
// const ICON_MAP = {
//   FaHeart,
//   FaLeaf,
//   FaShippingFast,
//   FaShieldAlt,
//   FaStar,
//   FaUsers,
//   FaAward,
//   FaGlobe,
//   FaCheckCircle,
//   FaGift,
//   FaSmile,
//   FaRocket,
//   FaStore,
//   FaTrophy,
//   FaGem,
//   FaHands,
//   FaSeedling,
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   GiLipstick,
//   GiSparkles
// };

// const getIcon = (iconName) => {
//   const Icon = ICON_MAP[iconName];
//   return Icon || FaStar;
// };

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
// };

// const fadeInLeft = {
//   hidden: { opacity: 0, x: -40 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
// };

// const fadeInRight = {
//   hidden: { opacity: 0, x: 40 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.1
//     }
//   }
// };

// const scaleUp = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
// };

// // ✅ Helper function to ensure story data has all required fields
// const getStoryData = (story) => {
//   return {
//     badge: story?.badge || 'Our Story',
//     title: story?.title || 'A Journey of Beauty & Trust',
//     paragraphs: story?.paragraphs?.length > 0 ? story.paragraphs : [
//       'BeautyBucket was founded with a simple yet powerful vision: to make premium beauty products accessible to everyone in Bangladesh. What started as a passion project has grown into a trusted destination for beauty enthusiasts.',
//       'We carefully curate each product in our collection, ensuring only the highest quality, authentic, and effective products make it to our shelves. From skincare to makeup, we bring you the best from around the world.',
//       'Our commitment to quality, transparency, and customer satisfaction has made us a beloved brand among thousands of customers across the country.'
//     ],
//     trustIndicators: story?.trustIndicators?.length > 0 ? story.trustIndicators : [
//       { icon: 'FaCheckCircle', label: 'Quality Assured' },
//       { icon: 'FaShippingFast', label: 'Fast Delivery' },
//       { icon: 'FaGift', label: 'Shipping Across the Country' },
//       { icon: 'FaSmile', label: '100% Satisfaction' }
//     ],
//     images: story?.images?.length > 0 ? story.images : [
//       { src: '/images/about1.jpg', alt: 'Happy customer' },
//       { src: '/images/bg6.png', alt: 'Beauty products display' },
//       { src: '/images/bg9.PNG', alt: 'Product curation' },
//       { src: '/images/bg8.png', alt: 'Beauty team' }
//     ]
//   };
// };

// export default function AboutClient() {
//   const [aboutData, setAboutData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Fetch about data from backend
//   useEffect(() => {
//     const fetchAboutData = async () => {
//       try {
//         setIsLoading(true);
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
//         const response = await fetch(`${apiUrl}/api/about/page`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch about data: ${response.status}`);
//         }
        
//         const result = await response.json();
        
//         if (result.success && result.data) {
//           console.log('📊 About data received:', result.data);
//           setAboutData(result.data);
//         } else {
//           setAboutData(getDefaultData());
//         }
//       } catch (err) {
//         console.error('Error fetching about data:', err);
//         setAboutData(getDefaultData());
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAboutData();
//   }, []);

//   // Auto-slide for story images
//   useEffect(() => {
//     if (!aboutData?.story?.images?.length) return;
    
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % aboutData.story.images.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [aboutData?.story?.images?.length]);

//   const nextSlide = () => {
//     if (!aboutData?.story?.images?.length) return;
//     setCurrentSlide((prev) => (prev + 1) % aboutData.story.images.length);
//   };

//   const prevSlide = () => {
//     if (!aboutData?.story?.images?.length) return;
//     setCurrentSlide((prev) => (prev - 1 + aboutData.story.images.length) % aboutData.story.images.length);
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   const getDefaultData = () => ({
//     hero: {
//       image: '/images/bg1.png',
//       overlayImage: '/images/bg2.jpg',
//       badge: 'About Us',
//       title: 'Redefining Beauty',
//       highlightedText: 'for Everyone',
//       description: 'We believe beauty is for everyone. Our mission is to bring you the finest beauty products with expert care, fast delivery, and a touch of luxury.',
//       buttonText: 'Explore Products',
//       buttonLink: '/products',
//       secondaryButtonText: 'Get in Touch',
//       secondaryButtonLink: '/contact'
//     },
//     stats: {
//       backgroundImage: '/images/bg5.PNG',
//       items: [
//         { icon: 'FaAward', value: '50+', label: 'Premium Brands' },
//         { icon: 'FaUsers', value: '5K+', label: 'Happy Customers' },
//         { icon: 'GiLipstick', value: '500+', label: 'Products' },
//         { icon: 'FaStar', value: '98%', label: 'Satisfaction Rate' }
//       ]
//     },
//     story: {
//       badge: 'Our Story',
//       title: 'A Journey of Beauty & Trust',
//       paragraphs: [
//         'BeautyBucket was founded with a simple yet powerful vision: to make premium beauty products accessible to everyone in Bangladesh. What started as a passion project has grown into a trusted destination for beauty enthusiasts.',
//         'We carefully curate each product in our collection, ensuring only the highest quality, authentic, and effective products make it to our shelves. From skincare to makeup, we bring you the best from around the world.',
//         'Our commitment to quality, transparency, and customer satisfaction has made us a beloved brand among thousands of customers across the country.'
//       ],
//       trustIndicators: [
//         { icon: 'FaCheckCircle', label: 'Quality Assured' },
//         { icon: 'FaShippingFast', label: 'Fast Delivery' },
//         { icon: 'FaGift', label: 'Shipping Across the Country' },
//         { icon: 'FaSmile', label: '100% Satisfaction' }
//       ],
//       images: [
//         { src: '/images/about1.jpg', alt: 'Happy customer' },
//         { src: '/images/bg6.png', alt: 'Beauty products display' },
//         { src: '/images/bg9.PNG', alt: 'Product curation' },
//         { src: '/images/bg8.png', alt: 'Beauty team' }
//       ]
//     },
//     values: [
//       {
//         icon: 'FaHeart',
//         title: 'Passion for Beauty',
//         description: 'We believe every individual deserves to feel beautiful and confident in their own skin.'
//       },
//       {
//         icon: 'FaLeaf',
//         title: 'Natural & Safe',
//         description: 'We prioritize natural ingredients and safety in every product we curate.'
//       },
//       {
//         icon: 'FaShieldAlt',
//         title: '100% Authentic',
//         description: 'Every product is sourced directly from trusted brands and verified for authenticity.'
//       },
//       {
//         icon: 'FaUsers',
//         title: 'Community First',
//         description: 'We build a community of beauty enthusiasts who support and inspire each other.'
//       }
//     ],
//     milestones: [
//       { year: '2020', title: 'Founded', description: 'BeautyBucket was born with a vision to bring premium beauty products to Bangladesh.', icon: 'FaRocket' },
//       { year: '2021', title: 'First Store', description: 'Opened our first physical store in Dhaka, bringing beauty closer to our customers.', icon: 'FaStore' },
//       { year: '2022', title: 'Online Launch', description: 'Launched our e-commerce platform to serve customers nationwide with ease.', icon: 'FaGlobe' },
//       { year: '2023', title: '50+ Brands', description: 'Partnered with over 50 premium beauty brands from around the world.', icon: 'FaTrophy' },
//       { year: '2024', title: '5K+ Customers', description: 'Served over 5,000 happy customers across Bangladesh with love and care.', icon: 'FaUsers' }
//     ],
//     cta: {
//       title: 'Ready to Start Your Beauty Journey?',
//       description: 'Explore our curated collection of premium beauty products and find your perfect match.',
//       buttonText: 'Shop Now',
//       buttonLink: '/products',
//       secondaryButtonText: 'Contact Us',
//       secondaryButtonLink: '/contact'
//     }
//   });

//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-white flex items-center justify-center -mt-24">
//           <div className="text-center">
//             <div className="inline-block w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-gray-500 mt-2">Loading about page...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const data = aboutData || getDefaultData();
//   const { hero, stats, story, values, milestones, cta } = data;
  
//   // ✅ Use helper to ensure story has all required fields
//   const storyData = getStoryData(story);
//   const statsItems = stats?.items || stats || [];

//   return (
//     <>
//       <Navbar />
      
//       <main className="min-h-screen bg-white overflow-hidden -mt-24">
        
//         {/* Hero Section - Modern Overlapping Images */}
//         <section className="py-16 lg:py-20 bg-gradient-to-b from-[#FFF5F6]/30 to-white">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//               {/* Left Content */}
//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeInLeft}
//               >
//                 <div className="flex items-center gap-2 mb-4">
//                   <span className="w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
//                   <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider font-['Playfair_Display']">
//                     {hero?.badge || 'About Us'}
//                   </span>
//                 </div>
//                 <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#2D1B2E] leading-tight mb-4 font-['Playfair_Display']">
//                   {hero?.title || 'Redefining Beauty'}
//                   <br />
//                   <span className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] bg-clip-text text-transparent">
//                     {hero?.highlightedText || 'for Everyone'}
//                   </span>
//                 </h1>
//                 <p className="text-base lg:text-lg text-[#8B7A8C] leading-relaxed mb-6 max-w-lg font-['Inter']">
//                   {hero?.description || 'We believe beauty is for everyone. Our mission is to bring you the finest beauty products with expert care, fast delivery, and a touch of luxury.'}
//                 </p>
//                 <div className="flex flex-wrap gap-4">
//                   <Link 
//                     href={hero?.buttonLink || '/products'} 
//                     className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/30 transition-all font-medium text-sm font-['Inter']"
//                   >
//                     {hero?.buttonText || 'Explore Products'}
//                     <FaArrowRight className="w-4 h-4" />
//                   </Link>
//                   <Link 
//                     href={hero?.secondaryButtonLink || '/contact'} 
//                     className="inline-flex items-center gap-2 px-6 py-3 border border-[#FFD2DB]/50 text-[#2D1B2E] rounded-xl hover:bg-[#FFF5F6] transition-all font-medium text-sm font-['Inter']"
//                   >
//                     {hero?.secondaryButtonText || 'Get in Touch'}
//                   </Link>
//                 </div>
//               </motion.div>

//               {/* Right Side - Overlapping Images */}
//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeInRight}
//                 className="relative"
//               >
//                 <div className="relative flex justify-center items-center -ml-20">
//                   {/* Background decorative circle */}
//                   <div className="absolute w-[90%] h-[90%] bg-gradient-to-br from-[#EE4275]/5 to-[#FF6B9D]/5 rounded-full"></div>
                  
//                   {/* Main Image */}
//                   <div className="relative w-full max-w-[420px] z-10">
//                     <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
//                       <img 
//                         src={hero?.image || '/images/bg1.png'} 
//                         alt="Beauty products" 
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.src = '/images/bg1.png';
//                         }}
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B2E]/20 to-transparent"></div>
                      
//                       {/* Badge */}
//                       <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
//                         <GiSparkles className="w-3 h-3 text-[#EE4275]" />
//                         <span className="text-xs font-medium text-[#2D1B2E] font-['Inter']">Premium Collection</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Overlapping Image */}
//                   <div className="absolute -top-8 -right-8 w-[55%] max-w-[280px] z-20">
//                     <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white rotate-6 hover:rotate-0 transition-transform duration-500">
//                       <img 
//                         src={hero?.overlayImage || '/images/bg2.jpg'} 
//                         alt="Beauty product" 
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.src = 'https://via.placeholder.com/400x400/FFF5F6/EE4275?text=Beauty';
//                         }}
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B2E]/10 to-transparent"></div>
                      
//                       {/* Small badge */}
//                       <div className="absolute top-3 right-3 bg-[#EE4275] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg font-['Inter']">
//                         NEW
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Stats Section */}
//         <section className="py-12 relative overflow-hidden">
//           <div className="absolute inset-0 z-0">
//             <div 
//               className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//               style={{
//                 backgroundImage: `url('${stats?.backgroundImage || '/images/bg5.PNG'}')`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 backgroundAttachment: 'fixed'
//               }}
//             ></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-[#ed2f78]/10 via-white/25 to-[#ed2f78]/20"></div>
//             <div className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/5 via-transparent to-[#FF6B9D]/5"></div>
//           </div>
          
//           <div className="container mx-auto px-4 relative z-10">
//             <motion.div 
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={staggerContainer}
//               className="grid grid-cols-2 lg:grid-cols-4 gap-6"
//             >
//               {statsItems.map((stat, index) => {
//                 const Icon = getIcon(stat.icon);
//                 return (
//                   <motion.div
//                     key={index}
//                     variants={scaleUp}
//                     className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center border border-[#FFD2DB]/30 hover:shadow-xl hover:shadow-[#EE4275]/10 transition-all duration-300 group hover:-translate-y-1 hover:bg-white/95"
//                   >
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FF6B9D]/10 flex items-center justify-center mx-auto mb-3 text-[#EE4275] group-hover:from-[#EE4275] group-hover:to-[#FF6B9D] group-hover:text-white transition-all duration-300">
//                       <Icon className="w-5 h-5" />
//                     </div>
//                     <p className="text-2xl lg:text-3xl font-bold text-[#EE4275] group-hover:scale-105 transition-transform duration-300 font-['Playfair_Display']">{stat.value}</p>
//                     <p className="text-xs lg:text-sm text-[#8B7A8C] mt-1 font-['Inter']">{stat.label}</p>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>
//           </div>
//         </section>

//         {/* Our Story Section - ✅ Using storyData */}
//         <section className="py-20 bg-white">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 variants={fadeInLeft}
//               >
//                 <div className="flex items-center gap-2 mb-4">
//                   <span className="w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
//                   <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider font-['Playfair_Display']">
//                     {storyData.badge}
//                   </span>
//                 </div>
//                 <h2 className="text-3xl lg:text-4xl font-bold text-[#2D1B2E] mt-2 mb-6 font-['Playfair_Display']">
//                   {storyData.title}
//                 </h2>
//                 <div className="space-y-4 text-[#8B7A8C] leading-relaxed font-['Inter']">
//                   {storyData.paragraphs.map((paragraph, index) => (
//                     <p key={index} className="text-base">{paragraph}</p>
//                   ))}
//                 </div>
                
//                 {/* Trust Indicators */}
//                 <div className="grid grid-cols-2 gap-3 mt-8">
//                   {storyData.trustIndicators.map((indicator, index) => {
//                     const Icon = getIcon(indicator.icon);
//                     return (
//                       <div key={index} className="flex items-center gap-2 bg-[#FFF5F6] rounded-xl px-4 py-3 border border-[#FFD2DB]/20 hover:border-[#EE4275]/30 transition-colors">
//                         <Icon className="w-4 h-4 text-[#EE4275]" />
//                         <span className="text-xs font-medium text-[#2D1B2E] font-['Inter']">{indicator.label}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </motion.div>

//               {/* Sliding Images */}
//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 variants={fadeInRight}
//                 className="relative"
//               >
//                 <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#FFD2DB]/30 bg-[#FFF5F6]">
//                   <div className="relative w-full h-full">
//                     {storyData.images.map((image, index) => (
//                       <div
//                         key={index}
//                         className={`absolute inset-0 transition-all duration-700 ease-in-out ${
//                           index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
//                         }`}
//                       >
//                         <img
//                           src={image.src}
//                           alt={image.alt || 'Story image'}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.src = `https://via.placeholder.com/800x600/FFF5F6/EE4275?text=${image.alt || 'Image'}`;
//                           }}
//                         />
//                       </div>
//                     ))}
                    
//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B2E]/20 via-transparent to-transparent"></div>
                    
//                     {/* Slide Indicators */}
//                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
//                       {storyData.images.map((_, index) => (
//                         <button
//                           key={index}
//                           onClick={() => goToSlide(index)}
//                           className={`transition-all duration-300 ${
//                             index === currentSlide
//                               ? 'w-6 h-2 bg-[#EE4275] rounded-full'
//                               : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/80'
//                           }`}
//                         />
//                       ))}
//                     </div>
                    
//                     {/* Navigation Arrows */}
//                     <button
//                       onClick={prevSlide}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
//                     >
//                       <FaChevronLeft className="w-4 h-4 text-[#2D1B2E]" />
//                     </button>
//                     <button
//                       onClick={nextSlide}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
//                     >
//                       <FaChevronRight className="w-4 h-4 text-[#2D1B2E]" />
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Values Section */}
//         <section className="py-20 bg-gradient-to-b from-[#FFF5F6]/20 to-white -mt-20">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={fadeInUp}
//               className="text-center max-w-3xl mx-auto mb-12"
//             >
//               <div className="flex items-center justify-center gap-2 mb-4">
//                 <span className="w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
//                 <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider font-['Playfair_Display']">Our Values</span>
//                 <span className="w-10 h-0.5 bg-gradient-to-l from-[#EE4275] to-[#FF6B9D]"></span>
//               </div>
//               <h2 className="text-3xl lg:text-4xl font-bold text-[#2D1B2E] mt-2 mb-4 font-['Playfair_Display']">
//                 What We Stand For
//               </h2>
//               <p className="text-[#8B7A8C] font-['Inter']">
//                 These core values guide everything we do — from product selection to customer service.
//               </p>
//             </motion.div>

//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={staggerContainer}
//               className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
//             >
//               {(values || []).map((value, index) => {
//                 const Icon = getIcon(value.icon);
//                 return (
//                   <motion.div
//                     key={index}
//                     variants={scaleUp}
//                     className="group bg-white rounded-2xl p-5 lg:p-6 text-center border border-[#FFD2DB]/20 hover:shadow-xl hover:shadow-[#EE4275]/5 transition-all duration-300 hover:-translate-y-1"
//                   >
//                     <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FF6B9D]/10 flex items-center justify-center mx-auto mb-3 text-[#EE4275] group-hover:from-[#EE4275] group-hover:to-[#FF6B9D] group-hover:text-white transition-all duration-300">
//                       <Icon className="w-6 h-6" />
//                     </div>
//                     <h3 className="text-sm lg:text-lg font-semibold text-[#2D1B2E] mb-1 lg:mb-2 font-['Playfair_Display']">{value.title}</h3>
//                     <p className="text-[10px] lg:text-sm text-[#8B7A8C] leading-relaxed font-['Inter']">{value.description}</p>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>
//           </div>
//         </section>

//         {/* Milestone Section */}
//         <section className="py-20 bg-white -mt-20">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={fadeInUp}
//               className="text-center max-w-3xl mx-auto mb-12"
//             >
//               <div className="flex items-center justify-center gap-2 mb-4">
//                 <span className="w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
//                 <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider font-['Playfair_Display']">Our Journey</span>
//                 <span className="w-10 h-0.5 bg-gradient-to-l from-[#EE4275] to-[#FF6B9D]"></span>
//               </div>
//               <h2 className="text-3xl lg:text-4xl font-bold text-[#2D1B2E] mt-2 mb-4 font-['Playfair_Display']">
//                 Milestones
//               </h2>
//               <p className="text-[#8B7A8C] font-['Inter']">
//                 From our humble beginnings to where we are today — every step has been a beautiful journey.
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
//               {(milestones || []).map((milestone, index) => {
//                 const Icon = getIcon(milestone.icon);
//                 return (
//                   <motion.div
//                     key={index}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true }}
//                     variants={scaleUp}
//                     transition={{ delay: index * 0.08 }}
//                     className="relative group"
//                   >
//                     <div className="bg-gradient-to-b from-white to-[#FFF5F6]/30 rounded-2xl p-6 text-center border border-[#FFD2DB] hover:border-[#EE4275]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#EE4275]/10 h-full flex flex-col items-center">
//                       <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg font-['Inter']">
//                         {milestone.year}
//                       </div>
                      
//                       <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FF6B9D]/10 flex items-center justify-center text-[#EE4275] mt-4 mb-3 group-hover:from-[#EE4275] group-hover:to-[#FF6B9D] group-hover:text-white transition-all duration-300">
//                         <Icon className="w-6 h-6" />
//                       </div>
                      
//                       <h4 className="text-base font-semibold text-[#2D1B2E] mb-2 font-['Playfair_Display']">{milestone.title}</h4>
//                       <p className="text-xs text-[#8B7A8C] leading-relaxed font-['Inter']">{milestone.description}</p>
                      
//                       <div className="mt-4 w-8 h-8 rounded-full border-2 border-[#FFD2DB]/30 flex items-center justify-center text-xs font-bold text-[#8B7A8C] group-hover:border-[#EE4275]/50 group-hover:text-[#EE4275] group-hover:bg-[#FFF5F6] transition-all duration-300 font-['Inter']">
//                         {String(index + 1).padStart(2, '0')}
//                       </div>
//                     </div>
                    
//                     {index < (milestones || []).length - 1 && (
//                       <div className="hidden xl:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#FFD2DB] to-transparent"></div>
//                     )}
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="relative py-20 overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-[#EE4275] to-[#FF6B9D]"></div>
//           <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
          
//           <div className="container mx-auto px-4 relative z-10">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={fadeInUp}
//               className="text-center max-w-2xl mx-auto"
//             >
//               <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <GiSparkles className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-['Playfair_Display']">
//                 {cta?.title || 'Ready to Start Your Beauty Journey?'}
//               </h2>
//               <p className="text-white/80 text-lg mb-8 font-['Inter']">
//                 {cta?.description || 'Explore our curated collection of premium beauty products and find your perfect match.'}
//               </p>
//               <div className="flex flex-wrap gap-4 justify-center">
//                 <Link 
//                   href={cta?.buttonLink || '/products'} 
//                   className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#EE4275] rounded-xl hover:shadow-lg hover:shadow-black/25 transition-all font-medium hover:-translate-y-0.5 font-['Inter']"
//                 >
//                   {cta?.buttonText || 'Shop Now'}
//                   <FaArrowRight className="w-4 h-4" />
//                 </Link>
//                 <Link 
//                   href={cta?.secondaryButtonLink || '/contact'} 
//                   className="inline-flex items-center gap-2 px-8 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all font-medium hover:-translate-y-0.5 font-['Inter']"
//                 >
//                   {cta?.secondaryButtonText || 'Contact Us'}
//                 </Link>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//       </main>

//       <Footer />
//     </>
//   );
// }

// app/about/AboutClient.js
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
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
  FaChevronLeft,
  FaChevronRight,
  FaGem,
  FaHands,
  FaSeedling,
  FaCalendarAlt,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { GiLipstick, GiSparkles } from 'react-icons/gi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Font family constants
const FONT_FAMILY = "'Courgette', cursive";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";
const FONT_FAMILY_INTER = "'Inter', sans-serif";

// Icon mapping for dynamic rendering
const ICON_MAP = {
  FaHeart,
  FaLeaf,
  FaShippingFast,
  FaShieldAlt,
  FaStar,
  FaUsers,
  FaAward,
  FaGlobe,
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
  GiLipstick,
  GiSparkles
};

const getIcon = (iconName) => {
  const Icon = ICON_MAP[iconName];
  return Icon || FaStar;
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Helper function to ensure story data has all required fields
const getStoryData = (story) => {
  return {
    badge: story?.badge || 'Our Story',
    title: story?.title || 'A Journey of Beauty & Trust',
    paragraphs: story?.paragraphs?.length > 0 ? story.paragraphs : [
      'BeautyBucket was founded with a simple yet powerful vision: to make premium beauty products accessible to everyone in Bangladesh. What started as a passion project has grown into a trusted destination for beauty enthusiasts.',
      'We carefully curate each product in our collection, ensuring only the highest quality, authentic, and effective products make it to our shelves. From skincare to makeup, we bring you the best from around the world.',
      'Our commitment to quality, transparency, and customer satisfaction has made us a beloved brand among thousands of customers across the country.'
    ],
    trustIndicators: story?.trustIndicators?.length > 0 ? story.trustIndicators : [
      { icon: 'FaCheckCircle', label: 'Quality Assured' },
      { icon: 'FaShippingFast', label: 'Fast Delivery' },
      { icon: 'FaGift', label: 'Shipping Across the Country' },
      { icon: 'FaSmile', label: '100% Satisfaction' }
    ],
    images: story?.images?.length > 0 ? story.images : [
      { src: '/images/about1.jpg', alt: 'Happy customer' },
      { src: '/images/bg6.png', alt: 'Beauty products display' },
      { src: '/images/bg9.PNG', alt: 'Product curation' },
      { src: '/images/bg8.png', alt: 'Beauty team' }
    ]
  };
};

export default function AboutClient() {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch about data from backend
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        const response = await fetch(`${apiUrl}/api/about/page`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch about data: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          console.log('📊 About data received:', result.data);
          setAboutData(result.data);
        } else {
          setAboutData(getDefaultData());
        }
      } catch (err) {
        console.error('Error fetching about data:', err);
        setAboutData(getDefaultData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Auto-slide for story images
  useEffect(() => {
    if (!aboutData?.story?.images?.length) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % aboutData.story.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [aboutData?.story?.images?.length]);

  const nextSlide = () => {
    if (!aboutData?.story?.images?.length) return;
    setCurrentSlide((prev) => (prev + 1) % aboutData.story.images.length);
  };

  const prevSlide = () => {
    if (!aboutData?.story?.images?.length) return;
    setCurrentSlide((prev) => (prev - 1 + aboutData.story.images.length) % aboutData.story.images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getDefaultData = () => ({
    hero: {
      image: '/images/bg1.png',
      overlayImage: '/images/bg2.jpg',
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
      backgroundImage: '/images/bg5.PNG',
      items: [
        { icon: 'FaAward', value: '50+', label: 'Premium Brands' },
        { icon: 'FaUsers', value: '5K+', label: 'Happy Customers' },
        { icon: 'GiLipstick', value: '500+', label: 'Products' },
        { icon: 'FaStar', value: '98%', label: 'Satisfaction Rate' }
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
        { icon: 'FaCheckCircle', label: 'Quality Assured' },
        { icon: 'FaShippingFast', label: 'Fast Delivery' },
        { icon: 'FaGift', label: 'Shipping Across the Country' },
        { icon: 'FaSmile', label: '100% Satisfaction' }
      ],
      images: [
        { src: '/images/about1.jpg', alt: 'Happy customer' },
        { src: '/images/bg6.png', alt: 'Beauty products display' },
        { src: '/images/bg9.PNG', alt: 'Product curation' },
        { src: '/images/bg8.png', alt: 'Beauty team' }
      ]
    },
    values: [
      {
        icon: 'FaHeart',
        title: 'Passion for Beauty',
        description: 'We believe every individual deserves to feel beautiful and confident in their own skin.'
      },
      {
        icon: 'FaLeaf',
        title: 'Natural & Safe',
        description: 'We prioritize natural ingredients and safety in every product we curate.'
      },
      {
        icon: 'FaShieldAlt',
        title: '100% Authentic',
        description: 'Every product is sourced directly from trusted brands and verified for authenticity.'
      },
      {
        icon: 'FaUsers',
        title: 'Community First',
        description: 'We build a community of beauty enthusiasts who support and inspire each other.'
      }
    ],
    milestones: [
      { year: '2020', title: 'Founded', description: 'BeautyBucket was born with a vision to bring premium beauty products to Bangladesh.', icon: 'FaRocket' },
      { year: '2021', title: 'First Store', description: 'Opened our first physical store in Dhaka, bringing beauty closer to our customers.', icon: 'FaStore' },
      { year: '2022', title: 'Online Launch', description: 'Launched our e-commerce platform to serve customers nationwide with ease.', icon: 'FaGlobe' },
      { year: '2023', title: '50+ Brands', description: 'Partnered with over 50 premium beauty brands from around the world.', icon: 'FaTrophy' },
      { year: '2024', title: '5K+ Customers', description: 'Served over 5,000 happy customers across Bangladesh with love and care.', icon: 'FaUsers' }
    ],
    cta: {
      title: 'Ready to Start Your Beauty Journey?',
      description: 'Explore our curated collection of premium beauty products and find your perfect match.',
      buttonText: 'Shop Now',
      buttonLink: '/products',
      secondaryButtonText: 'Contact Us',
      secondaryButtonLink: '/contact'
    }
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center -mt-24">
          <div className="text-center">
            <div className="inline-block w-6 h-6 sm:w-8 sm:h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm sm:text-base mt-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Loading about page...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const data = aboutData || getDefaultData();
  const { hero, stats, story, values, milestones, cta } = data;
  
  const storyData = getStoryData(story);
  const statsItems = stats?.items || stats || [];

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white overflow-hidden -mt-24">
        
    {/* Hero Section - Text on top for mobile, side by side for desktop */}
<section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#FFF5F6]/30 to-white">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
      {/* Left Content - Shows first on mobile (top) */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInLeft}
        className="text-center lg:text-left order-1 lg:order-1"
      >
        <div className="flex items-center gap-2 mb-3 sm:mb-4 justify-center lg:justify-start">
          <span className="w-8 sm:w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] hidden sm:block"></span>
          <span className="text-xs sm:text-sm font-medium text-[#EE4275] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>
            {hero?.badge || 'About Us'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#2D1B2E] leading-tight mb-3 sm:mb-4" style={{ fontFamily: FONT_FAMILY }}>
          {hero?.title || 'Redefining Beauty'}
          <br />
          <span className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] bg-clip-text text-transparent">
            {hero?.highlightedText || 'for Everyone'}
          </span>
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-[#8B7A8C] leading-relaxed mb-4 sm:mb-6 max-w-lg mx-auto lg:mx-0" style={{ fontFamily: FONT_FAMILY_INTER }}>
          {hero?.description || 'We believe beauty is for everyone. Our mission is to bring you the finest beauty products with expert care, fast delivery, and a touch of luxury.'}
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
          <Link 
            href={hero?.buttonLink || '/products'} 
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/30 transition-all font-medium text-xs sm:text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}
          >
            {hero?.buttonText || 'Explore Products'}
            <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
          <Link 
            href={hero?.secondaryButtonLink || '/contact'} 
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-[#FFD2DB]/50 text-[#2D1B2E] rounded-xl hover:bg-[#FFF5F6] transition-all font-medium text-xs sm:text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}
          >
            {hero?.secondaryButtonText || 'Get in Touch'}
          </Link>
        </div>
      </motion.div>

      {/* Right Side - Overlapping Images - Shows second on mobile (bottom) */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInRight}
        className="relative order-2 lg:order-2"
      >
        <div className="relative flex justify-center items-center">
          {/* Background decorative circle - hidden on small devices */}
          <div className="absolute w-[80%] sm:w-[90%] h-[80%] sm:h-[90%] bg-gradient-to-br from-[#EE4275]/5 to-[#FF6B9D]/5 rounded-full hidden sm:block"></div>
          
          {/* Main Image */}
          <div className="relative w-full max-w-[320px] sm:max-w-[420px] z-10">
            <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white">
              <img 
                src={hero?.image || '/images/bg1.png'} 
                alt="Beauty products" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/images/bg1.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B2E]/20 to-transparent"></div>
              
              {/* Badge */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white/95 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-1.5 shadow-lg">
                <GiSparkles className="w-2 h-2 sm:w-3 sm:h-3 text-[#EE4275]" />
                <span className="text-[8px] sm:text-xs font-medium text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_INTER }}>Premium Collection</span>
              </div>
            </div>
          </div>
          
          {/* Overlapping Image */}
          <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-[45%] sm:w-[55%] max-w-[180px] sm:max-w-[280px] z-20">
            <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl border-2 sm:border-4 border-white rotate-3 sm:rotate-6 hover:rotate-0 transition-transform duration-500">
              <img 
                src={hero?.overlayImage || '/images/bg2.jpg'} 
                alt="Beauty product" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400/FFF5F6/EE4275?text=Beauty';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B2E]/10 to-transparent"></div>
              
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#EE4275] text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-lg" style={{ fontFamily: FONT_FAMILY_INTER }}>
                NEW
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

        {/* Stats Section - Responsive */}
        <section className="py-8 sm:py-10 md:py-12 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${stats?.backgroundImage || '/images/bg5.PNG'}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ed2f78]/10 via-white/25 to-[#ed2f78]/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/5 via-transparent to-[#FF6B9D]/5"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
            >
              {statsItems.map((stat, index) => {
                const Icon = getIcon(stat.icon);
                return (
                  <motion.div
                    key={index}
                    variants={scaleUp}
                    className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center border border-[#FFD2DB]/30 hover:shadow-xl hover:shadow-[#EE4275]/10 transition-all duration-300 group hover:-translate-y-1 hover:bg-white/95"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FF6B9D]/10 flex items-center justify-center mx-auto mb-2 sm:mb-3 text-[#EE4275] group-hover:from-[#EE4275] group-hover:to-[#FF6B9D] group-hover:text-white transition-all duration-300">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#EE4275] group-hover:scale-105 transition-transform duration-300" style={{ fontFamily: FONT_FAMILY }}>{stat.value}</p>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-[#8B7A8C] mt-0.5 sm:mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>{stat.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

       {/* Our Story Section - Text on top for mobile, side by side for desktop */}
<section className="py-12 sm:py-16 md:py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
      {/* Text Content - Shows first on mobile (top) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInLeft}
        className="order-1 lg:order-1"
      >
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <span className="w-8 sm:w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
          <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>
            {storyData.badge}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D1B2E] mt-2 mb-4 sm:mb-6" style={{ fontFamily: FONT_FAMILY }}>
          {storyData.title}
        </h2>
        <div className="space-y-3 sm:space-y-4 text-[#8B7A8C] leading-relaxed" style={{ fontFamily: FONT_FAMILY_INTER }}>
          {storyData.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-sm sm:text-base">{paragraph}</p>
          ))}
        </div>
        
        {/* Trust Indicators - Responsive */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-6 sm:mt-8">
          {storyData.trustIndicators.map((indicator, index) => {
            const Icon = getIcon(indicator.icon);
            return (
              <div key={index} className="flex items-center gap-2 bg-[#FFF5F6] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-[#FFD2DB]/20 hover:border-[#EE4275]/30 transition-colors">
                <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#EE4275]" />
                <span className="text-[10px] sm:text-xs font-medium text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_INTER }}>{indicator.label}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Sliding Images - Shows second on mobile (bottom) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInRight}
        className="relative order-2 lg:order-2"
      >
        <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border border-[#FFD2DB]/30 bg-[#FFF5F6]">
          <div className="relative w-full h-full">
            {storyData.images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt || 'Story image'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/800x600/FFF5F6/EE4275?text=${image.alt || 'Image'}`;
                  }}
                />
              </div>
            ))}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B2E]/20 via-transparent to-transparent"></div>
            
            {/* Slide Indicators - Responsive */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
              {storyData.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-4 sm:w-6 h-1.5 sm:h-2 bg-[#EE4275] rounded-full'
                      : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 rounded-full hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
            
            {/* Navigation Arrows - Responsive */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
            >
              <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-[#2D1B2E]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
            >
              <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#2D1B2E]" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

        {/* Values Section - Responsive */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#FFF5F6]/20 to-white -mt-12 sm:-mt-16 md:-mt-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12"
            >
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <span className="w-6 sm:w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
                <span className="text-xs sm:text-sm font-medium text-[#EE4275] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>Our Values</span>
                <span className="w-6 sm:w-10 h-0.5 bg-gradient-to-l from-[#EE4275] to-[#FF6B9D]"></span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D1B2E] mt-2 mb-3 sm:mb-4" style={{ fontFamily: FONT_FAMILY }}>
                What We Stand For
              </h2>
              <p className="text-sm sm:text-base text-[#8B7A8C] px-2" style={{ fontFamily: FONT_FAMILY_INTER }}>
                These core values guide everything we do — from product selection to customer service.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
            >
              {(values || []).map((value, index) => {
                const Icon = getIcon(value.icon);
                return (
                  <motion.div
                    key={index}
                    variants={scaleUp}
                    className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center border border-[#FFD2DB]/20 hover:shadow-xl hover:shadow-[#EE4275]/5 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FF6B9D]/10 flex items-center justify-center mx-auto mb-2 sm:mb-3 text-[#EE4275] group-hover:from-[#EE4275] group-hover:to-[#FF6B9D] group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-xs sm:text-sm lg:text-lg font-semibold text-[#2D1B2E] mb-1 sm:mb-2" style={{ fontFamily: FONT_FAMILY }}>{value.title}</h3>
                    <p className="text-[9px] sm:text-[10px] lg:text-sm text-[#8B7A8C] leading-relaxed px-1" style={{ fontFamily: FONT_FAMILY_INTER }}>{value.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Milestone Section - Responsive */}
        <section className="py-12 sm:py-16 md:py-20 bg-white -mt-8 sm:-mt-12 md:-mt-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12"
            >
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <span className="w-6 sm:w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
                <span className="text-xs sm:text-sm font-medium text-[#EE4275] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>Our Journey</span>
                <span className="w-6 sm:w-10 h-0.5 bg-gradient-to-l from-[#EE4275] to-[#FF6B9D]"></span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D1B2E] mt-2 mb-3 sm:mb-4" style={{ fontFamily: FONT_FAMILY }}>
                Milestones
              </h2>
              <p className="text-sm sm:text-base text-[#8B7A8C] px-2" style={{ fontFamily: FONT_FAMILY_INTER }}>
                From our humble beginnings to where we are today — every step has been a beautiful journey.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {(milestones || []).map((milestone, index) => {
                const Icon = getIcon(milestone.icon);
                return (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={scaleUp}
                    transition={{ delay: index * 0.08 }}
                    className="relative group"
                  >
                    <div className="bg-gradient-to-b from-white to-[#FFF5F6]/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-[#FFD2DB] hover:border-[#EE4275]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#EE4275]/10 h-full flex flex-col items-center">
                      <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[8px] sm:text-xs font-bold px-2 sm:px-4 py-0.5 sm:py-1 rounded-full shadow-lg" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        {milestone.year}
                      </div>
                      
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FF6B9D]/10 flex items-center justify-center text-[#EE4275] mt-3 sm:mt-4 mb-2 sm:mb-3 group-hover:from-[#EE4275] group-hover:to-[#FF6B9D] group-hover:text-white transition-all duration-300">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </div>
                      
                      <h4 className="text-xs sm:text-sm lg:text-base font-semibold text-[#2D1B2E] mb-1 sm:mb-2" style={{ fontFamily: FONT_FAMILY }}>{milestone.title}</h4>
                      <p className="text-[9px] sm:text-xs text-[#8B7A8C] leading-relaxed" style={{ fontFamily: FONT_FAMILY_INTER }}>{milestone.description}</p>
                      
                      <div className="mt-3 sm:mt-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#FFD2DB]/30 flex items-center justify-center text-[9px] sm:text-xs font-bold text-[#8B7A8C] group-hover:border-[#EE4275]/50 group-hover:text-[#EE4275] group-hover:bg-[#FFF5F6] transition-all duration-300" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    
                    {index < (milestones || []).length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#FFD2DB] to-transparent"></div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section - Responsive */}
        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EE4275] to-[#FF6B9D]"></div>
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full filter blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <GiSparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-2" style={{ fontFamily: FONT_FAMILY }}>
                {cta?.title || 'Ready to Start Your Beauty Journey?'}
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 mb-6 sm:mb-8 px-4" style={{ fontFamily: FONT_FAMILY_INTER }}>
                {cta?.description || 'Explore our curated collection of premium beauty products and find your perfect match.'}
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                <Link 
                  href={cta?.buttonLink || '/products'} 
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-[#EE4275] rounded-xl hover:shadow-lg hover:shadow-black/25 transition-all font-medium text-sm sm:text-base hover:-translate-y-0.5" style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  {cta?.buttonText || 'Shop Now'}
                  <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
                <Link 
                  href={cta?.secondaryButtonLink || '/contact'} 
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all font-medium text-sm sm:text-base hover:-translate-y-0.5" style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  {cta?.secondaryButtonText || 'Contact Us'}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}