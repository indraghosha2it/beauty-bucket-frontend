
// app/components/WhyChooseUs.jsx
'use client';

import { motion } from 'framer-motion';
import { 
  Shield, Truck, Leaf, Award, Sparkles, 
  Heart, Star, Clock, Gift, Flower2,
  Droplets, Sun, Moon, ThumbsUp, CheckCircle2, Crown,
  Users, Smile, Gem, Hand
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Font family constants - matching Categories page
const FONT_FAMILY = "'Courgette', cursive";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// Icon mapping for dynamic rendering
const iconMap = {
  Shield, Truck, Leaf, Award, Sparkles,
  Heart, Star, Clock, Gift, Flower2,
  Droplets, Sun, Moon, ThumbsUp, CheckCircle2,
  Crown, Users, Smile, Gem, Hand
};

// State Card Component - Left Side (Glassmorphism Style)
const StateCardLeft = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#EE4275]/50 cursor-default hover:scale-[1.02]"
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#EE4275]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-start gap-3 md:gap-4 relative z-10">
        {/* Icon Container - Glass effect */}
        <div className="flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_30px_rgba(238,66,117,0.3)]">
          <Icon className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#EE4275] group-hover:text-white transition-colors duration-300" />
        </div>
        
        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs md:text-sm font-semibold text-white mb-0.5 text-left" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
            {title}
          </h4>
          <p className="text-[10px] md:text-xs text-white/70 leading-relaxed text-left group-hover:text-white/90 transition-colors duration-300" style={{ fontFamily: FONT_FAMILY }}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// State Card Component - Right Side (Glassmorphism Style)
const StateCardRight = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#EE4275]/50 cursor-default hover:scale-[1.02]"
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#EE4275]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-start gap-3 md:gap-4 relative z-10">
        {/* Icon Container - Glass effect */}
        <div className="flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_30px_rgba(238,66,117,0.3)]">
          <Icon className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#EE4275] group-hover:text-white transition-colors duration-300" />
        </div>
        
        {/* Text Content - Left Aligned */}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs md:text-sm font-semibold text-white mb-0.5 text-left" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
            {title}
          </h4>
          <p className="text-[10px] md:text-xs text-white/70 leading-relaxed text-left group-hover:text-white/90 transition-colors duration-300" style={{ fontFamily: FONT_FAMILY }}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
export default function WhyChooseUs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/why-choose-us/public');
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching why choose us data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-10 md:py-14 lg:py-16 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="w-8 h-8 border-2 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </section>
    );
  }

  // Use data from API or fallback to defaults
  const section = data?.section || {
    badge: 'Why Choose Us',
    title: 'Why Choose Us',
    subtitle: 'Discover why thousands of beauty enthusiasts trust us for their skincare and makeup needs'
  };

  const leftCards = data?.leftCards || [];
  const rightCards = data?.rightCards || [];
  const centerImage = data?.centerImage || '/images/choose.jpg';
  const trustBadges = data?.trustBadges || [];

  // Combine all cards for mobile
  const allCards = [...leftCards, ...rightCards];

  // Get icon component
  const getIcon = (iconName) => {
    const Icon = iconMap[iconName];
    return Icon || Shield;
  };

  return (
    <section className="relative py-10 md:py-14 lg:py-10 overflow-hidden">
      {/* ============================================================
          BACKGROUND IMAGE WITH OVERLAY
          ============================================================ */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/images/wbg-2.png')`,
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Dark Overlay - Black with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75" />
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/10 via-transparent to-[#EE4275]/5" />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glowing orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#EE4275]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#EE4275]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Decorative floating elements */}
        <div className="absolute top-20 left-[10%] opacity-20 hidden lg:block">
          <Flower2 className="w-6 h-6 text-[#EE4275]" />
        </div>
        <div className="absolute bottom-20 right-[10%] opacity-20 hidden lg:block">
          <Droplets className="w-6 h-6 text-[#EE4275]" />
        </div>
        <div className="absolute top-1/2 left-[3%] opacity-10 hidden lg:block">
          <Sun className="w-8 h-8 text-[#EE4275]" />
        </div>
        <div className="absolute top-1/2 right-[3%] opacity-10 hidden lg:block">
          <Moon className="w-8 h-8 text-[#EE4275]" />
        </div>

        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header - White text for dark background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EE4275]/20 backdrop-blur-sm rounded-full mb-3 border border-[#EE4275]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#EE4275]" />
            <span className="text-xs font-medium text-[#EE4275] tracking-wider uppercase" style={{ fontFamily: FONT_FAMILY }}>
              {section.badge}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#EE4275]" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
            {section.title}
          </h2>
          
          <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto mt-2" style={{ fontFamily: FONT_FAMILY }}>
            {section.subtitle}
          </p>
        </motion.div>

        {/* MOBILE VIEW - 2 Columns Grid */}
        <div className="lg:hidden grid grid-cols-2 gap-3 md:gap-4">
          {allCards.map((card, index) => {
            const Icon = getIcon(card.icon);
            return (
              <motion.div
                key={card.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-[#EE4275]/50 cursor-default hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_30px_rgba(238,66,117,0.3)] mb-2">
                    <Icon className="w-4.5 h-4.5 md:w-5 md:h-5 text-[#EE4275] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-xs md:text-sm font-semibold text-white mb-0.5 text-center" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    {card.title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-white/70 leading-relaxed text-center group-hover:text-white/90 transition-colors duration-300" style={{ fontFamily: FONT_FAMILY }}>
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* DESKTOP VIEW - 3 Column Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* LEFT COLUMN */}
          <div className="space-y-3 md:space-y-4">
            {leftCards.map((card, index) => {
              const Icon = getIcon(card.icon);
              return (
                <StateCardLeft
                  key={card.id || index}
                  icon={Icon}
                  title={card.title}
                  description={card.description}
                  delay={0.1 + index * 0.08}
                />
              );
            })}
          </div>

          {/* CENTER COLUMN - Image with glass frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center items-start"
          >
            <div className="relative w-full max-w-xs">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#EE4275]/30 via-transparent to-[#EE4275]/30 blur-xl" />
              
              <div className="relative rounded-t-full overflow-hidden shadow-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm">
                <div className="relative w-full aspect-[3/4] min-h-[300px] md:min-h-[350px] overflow-hidden">
                  <img
                    src={centerImage}
                    alt="Beauty products"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/choose.jpg';
                    }}
                  />
                  
                  {/* Gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Decorative elements on image */}
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md rounded-full p-1.5 shadow-lg border border-white/20">
                    <Sparkles className="w-3.5 h-3.5 text-[#EE4275]" />
                  </div>
                  
                  <div className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 shadow-lg border border-white/20">
                    <span className="text-[10px] font-medium text-white" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      Beauty & Glow
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <div className="space-y-3 md:space-y-4">
            {rightCards.map((card, index) => {
              const Icon = getIcon(card.icon);
              return (
                <StateCardRight
                  key={card.id || index}
                  icon={Icon}
                  title={card.title}
                  description={card.description}
                  delay={0.1 + index * 0.08}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom Trust Badges - White text */}
        {trustBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10 flex flex-wrap justify-center gap-3 md:gap-6"
          >
            {trustBadges.map((badge, index) => {
              const Icon = getIcon(badge.icon);
              return (
                <div key={badge.id || index} className="flex items-center gap-2 group">
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#EE4275] group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-[10px] md:text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300" style={{ fontFamily: FONT_FAMILY }}>
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}