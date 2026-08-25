import React from 'react';
import { Language, ActiveModal } from '../types';
import { translations } from '../data/translations';
import { Landmark, Users, CheckCheck, TrendingUp } from 'lucide-react';

interface StatsSectionProps {
  language: Language;
  onOpenModal: (modal: ActiveModal) => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  language,
  onOpenModal,
}) => {
  const t = translations[language];

  return (
    <section className="px-4 sm:px-6 pb-12 sm:pb-16 max-w-4xl mx-auto">
      {/* Rose Gold Gradient Stat Card from Spec */}
      <div className="bg-rose-gold-gradient rounded-2xl p-6 sm:p-8 text-center soft-shadow relative overflow-hidden border border-white/40">
        {/* Decorative subtle pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            d="M0,50 Q25,25 50,50 T100,50"
            fill="none"
            stroke="#5D0016"
            strokeWidth="1.5"
          />
          <path
            d="M0,70 Q25,45 50,70 T100,70"
            fill="none"
            stroke="#5D0016"
            strokeWidth="1.5"
          />
        </svg>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/50 text-[#5D0016] text-xs font-bold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-[#5D0016]" />
            <span>Statewide Reach</span>
          </div>

          <div className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#5D0016] mb-2 tracking-tight">
            {t.womenBenefittedNumber}
          </div>

          <div className="font-serif font-semibold text-xl sm:text-2xl text-[#1B1C1A] mb-3">
            {t.womenBenefittedTitle}
          </div>

          <p className="font-sans text-sm sm:text-base text-[#584141] max-w-xl mx-auto leading-relaxed mb-6">
            {t.womenBenefittedSubtitle}
          </p>

          {/* Detailed Metric Badges */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-[#5D0016]/15 max-w-lg mx-auto text-left">
            <div className="bg-white/60 backdrop-blur-xs rounded-xl p-2.5 sm:p-3 text-center">
              <div className="font-serif font-bold text-lg sm:text-xl text-[#5D0016]">₹1,500</div>
              <div className="text-[10px] sm:text-xs text-[#584141] font-medium leading-tight">Every Month</div>
            </div>

            <div className="bg-white/60 backdrop-blur-xs rounded-xl p-2.5 sm:p-3 text-center">
              <div className="font-serif font-bold text-lg sm:text-xl text-[#5D0016]">36</div>
              <div className="text-[10px] sm:text-xs text-[#584141] font-medium leading-tight">Districts Active</div>
            </div>

            <div className="bg-white/60 backdrop-blur-xs rounded-xl p-2.5 sm:p-3 text-center">
              <div className="font-serif font-bold text-lg sm:text-xl text-[#5D0016]">100%</div>
              <div className="text-[10px] sm:text-xs text-[#584141] font-medium leading-tight">Direct Bank (DBT)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
