import React from 'react';
import { Language, ActiveModal } from '../types';
import { translations } from '../data/translations';
import { ArrowRight, CheckCircle, Search, Sparkles, ShieldCheck, IndianRupee } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  onOpenModal: (modal: ActiveModal) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenModal,
}) => {
  const t = translations[language];

  const heroImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuA1LDSqD8ht-TYSDanmCgaB7jorKDdPEl2uSLn1xmXkXDSVflo4vQk449iRTj4hNpttaaL5-1zJhlgBH0kMVjYS6ao-nEl2qqDD8kZScNa7EsbxQ2ZvG3DHy-O1N-U508H4NjkgNvbu0UFaZ6F-CRaWR_2gBmQ5XGBsfa302E31-XfdBqetuBPU3E64HL5eyPsIGynAzlhFlje0uq-7CjKZkWLjwCp0iIKqW24fH_p5HbEpA3RDQWc";

  return (
    <section className="relative pt-4 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6 max-w-[1200px] mx-auto">
      {/* Main Hero Card */}
      <div className="bg-white rounded-2xl soft-shadow-lg overflow-hidden border border-[#E0BFBF]/20 max-w-4xl mx-auto">
        {/* Banner with hotlinked image and dark gradient overlay */}
        <div 
          className="h-64 sm:h-80 md:h-96 bg-[#E4E2DE] relative bg-cover bg-center transition-all"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
        >
          {/* Subtle gradient overlay to enhance text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#332F2E]/90 via-[#332F2E]/40 to-black/20" />

          {/* Top Pill Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 bg-[#800020]/90 backdrop-blur-md text-[#FF828A] font-bold text-xs sm:text-sm px-3.5 py-1 rounded-full border border-white/10 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FFE088]" />
              <span>{t.portalSubtitle}</span>
            </span>

            <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md text-[#FFE088] font-semibold text-xs px-3 py-1 rounded-full border border-white/10">
              <IndianRupee className="w-3.5 h-3.5" />
              <span>₹18,000 / Year</span>
            </span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
            <h1 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight drop-shadow-md">
              {t.schemeName}
            </h1>
          </div>
        </div>

        {/* Hero Card Body */}
        <div className="p-6 sm:p-8">
          <p className="font-sans text-base sm:text-lg text-[#584141] leading-relaxed mb-6">
            {language === 'en' ? (
              <>
                A dignified direct cash-transfer of <strong className="text-[#5D0016] font-bold">₹1,500 monthly</strong> to support and empower the women of Maharashtra.
              </>
            ) : (
              <>
                महाराष्ट्रातील माता-भगिनींना स्वावलंबी व सक्षम करण्यासाठी <strong className="text-[#5D0016] font-bold">दरमहा ₹१,५००</strong> चा थेट सन्मान निधी (DBT).
              </>
            )}
          </p>

          {/* Primary Action Button */}
          <button
            id="btn-hero-apply-dbt"
            onClick={() => onOpenModal('apply')}
            className="w-full bg-[#5D0016] text-[#FFE088] font-sans font-bold text-sm sm:text-base py-4 px-6 rounded-full flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg hover:bg-[#800020] active:scale-[0.99] transition-all group cursor-pointer"
          >
            <span className="tracking-wide">{t.applyNowDBT}</span>
            <ArrowRight className="w-5 h-5 text-[#FED65B] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Deadline / Notice */}
          <p className="text-center mt-4 text-xs sm:text-sm text-[#584141]/80 font-medium">
            {t.deadline}
          </p>

          {/* Quick Utility Actions Row */}
          <div className="mt-6 pt-5 border-t border-[#E0BFBF]/30 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              id="btn-hero-check-eligibility"
              onClick={() => onOpenModal('eligibility-quiz')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#F5F3EF] hover:bg-[#EFEEEA] text-[#5D0016] font-semibold text-xs sm:text-sm border border-[#E0BFBF]/40 transition-colors cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 text-[#735C00]" />
              <span>{t.quickActionCheckEligibility}</span>
            </button>

            <button
              id="btn-hero-track-status"
              onClick={() => onOpenModal('status')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#F5F3EF] hover:bg-[#EFEEEA] text-[#5D0016] font-semibold text-xs sm:text-sm border border-[#E0BFBF]/40 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#5D0016]" />
              <span>{t.quickActionTrackStatus}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
