import { useStore } from '../../hooks/useStore';
import HeroCarousel from '../../components/common/HeroCarousel';
import HomeMarquee from './HomeMarquee';
import HomeBuildContent from './HomeBuildContent';
import TestimonialsSection from './TestimonialsPage';
import { Shield, Zap, Clock, Sparkles, ArrowRight, TrendingUp, Award, Users, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import HomePatentSection from './HomePatentSection';

const HomePage = () => {
  const { setPage } = useStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-x-hidden">
      <HeroCarousel />
      
      {/* Full-width section - no container */}
      <HomeBuildContent />
      
      {/* Contained sections */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-6">
        <HomePatentSection/>
      </div>
      
      <TestimonialsSection />
      <HomeMarquee />
    </div>
  );
};
export default HomePage;