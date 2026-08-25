import React from 'react';
import { Language, ActiveModal } from '../types';
import { translations } from '../data/translations';
import { User, Wallet, FileBadge, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface EligibilitySectionProps {
  language: Language;
  onOpenModal: (modal: ActiveModal) => void;
}

export const EligibilitySection: React.FC<EligibilitySectionProps> = ({
  language,
  onOpenModal,
}) => {
  const t = translations[language];

  return (
    <section className="px-4 sm:px-6 pb-12 sm:pb-16 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#5D0016]">
            {t.areYouEligible}
          </h2>
          <p className="text-xs sm:text-sm text-[#8C7071] mt-0.5">
            Key criteria prescribed by Government of Maharashtra
          </p>
        </div>

        <button
          onClick={() => onOpenModal('eligibility-quiz')}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#5D0016] bg-[#FED65B]/40 hover:bg-[#FED65B] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          <span>Self-Check</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Age Criteria */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 soft-shadow border-t-4 border-[#E9C349] hover:translate-y-[-2px] transition-transform">
          <div className="flex items-start gap-4">
            <div className="bg-[#EFEEEA] p-3 rounded-2xl text-[#5D0016] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">person</span>
            </div>
            <div>
              <h3 className="font-serif font-semibold text-lg text-[#1B1C1A] mb-1">
                {t.ageCriteriaTitle}
              </h3>
              <p className="text-sm text-[#584141] leading-relaxed">
                {t.ageCriteriaDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Income Limit */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 soft-shadow border-t-4 border-[#E0BFBF] hover:translate-y-[-2px] transition-transform">
          <div className="flex items-start gap-4">
            <div className="bg-[#EFEEEA] p-3 rounded-2xl text-[#5D0016] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
            </div>
            <div>
              <h3 className="font-serif font-semibold text-lg text-[#1B1C1A] mb-1">
                {t.incomeLimitTitle}
              </h3>
              <p className="text-sm text-[#584141] leading-relaxed">
                {t.incomeLimitDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Simplified Proof */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 soft-shadow border-t-4 border-[#FFB3B5] hover:translate-y-[-2px] transition-transform">
          <div className="flex items-start gap-4">
            <div className="bg-[#EFEEEA] p-3 rounded-2xl text-[#5D0016] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">badge</span>
            </div>
            <div>
              <h3 className="font-serif font-semibold text-lg text-[#1B1C1A] mb-1">
                {t.simplifiedProofTitle}
              </h3>
              <p className="text-sm text-[#584141] leading-relaxed">
                {t.simplifiedProofDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Quiz Trigger Banner */}
      <div className="mt-5 p-4 rounded-xl bg-[#F5F3EF] border border-[#E0BFBF]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-left">
          <div className="w-8 h-8 rounded-full bg-[#5D0016] text-[#FFE088] flex items-center justify-center font-bold text-xs shrink-0">
            ?
          </div>
          <div>
            <div className="font-semibold text-sm text-[#1B1C1A]">
              Not sure if you qualify or which documents are needed?
            </div>
            <div className="text-xs text-[#8C7071]">
              Take our interactive 30-second eligibility quiz with instant verification.
            </div>
          </div>
        </div>

        <button
          id="btn-trigger-eligibility-quiz"
          onClick={() => onOpenModal('eligibility-quiz')}
          className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#5D0016] text-white text-xs font-semibold hover:bg-[#800020] transition-colors whitespace-nowrap cursor-pointer"
        >
          Check My Eligibility
        </button>
      </div>
    </section>
  );
};
