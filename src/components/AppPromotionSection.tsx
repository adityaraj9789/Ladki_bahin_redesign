import React from 'react';
import { Language, ActiveModal } from '../types';
import { translations } from '../data/translations';
import { Smartphone, Download, QrCode, CheckCircle, ArrowRight } from 'lucide-react';

interface AppPromotionSectionProps {
  language: Language;
  onOpenModal: (modal: ActiveModal) => void;
}

export const AppPromotionSection: React.FC<AppPromotionSectionProps> = ({
  language,
  onOpenModal,
}) => {
  const t = translations[language];

  const appIconBgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCJSlvZ22s4-1djtfL1-Onxm0HicDCMdCBueus7887N3Wdbs9od09ifb0cLJTY_imboMulwwUu6SZMeHWARayiWzcsYTqh0NWMtQpcgmYs6lrXWRgeI3Agg3FjB79ohH4WUt0eHTK-C5KlDPfnbSfcz8GMAwaAd-L7fX8mef86TxgF8mAles5EaXUDeEwqzm1lti6_1ZpUz9r6X4ZzsouQG1Ay8twWfff2DOFHPwlMp2zpTr162bLc";

  return (
    <section className="px-4 sm:px-6 pb-20 sm:pb-24 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-6 sm:p-10 soft-shadow flex flex-col items-center text-center border border-[#E0BFBF]/20">
        {/* App Icon Container */}
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 bg-[#E4E2DE] rounded-2xl mb-6 flex items-center justify-center shadow-inner relative bg-cover bg-center border border-[#E0BFBF]/40"
          style={{ backgroundImage: `url('${appIconBgUrl}')` }}
        >
          <div className="absolute inset-0 bg-black/10 rounded-2xl" />
          <span className="material-symbols-outlined text-4xl sm:text-5xl text-[#5D0016] relative z-10 drop-shadow-xs">
            smartphone
          </span>
        </div>

        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#5D0016] mb-2">
          {t.applyOnPhoneTitle}
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#584141] mb-6 max-w-lg leading-relaxed">
          {t.applyOnPhoneDesc}
        </p>

        {/* Features badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 text-xs text-[#584141]">
          <span className="inline-flex items-center gap-1 bg-[#F5F3EF] px-3 py-1 rounded-full border border-[#E0BFBF]/30">
            <CheckCircle className="w-3.5 h-3.5 text-[#5D0016]" />
            <span>Document Scan with Camera</span>
          </span>
          <span className="inline-flex items-center gap-1 bg-[#F5F3EF] px-3 py-1 rounded-full border border-[#E0BFBF]/30">
            <CheckCircle className="w-3.5 h-3.5 text-[#5D0016]" />
            <span>Aadhaar e-KYC</span>
          </span>
          <span className="inline-flex items-center gap-1 bg-[#F5F3EF] px-3 py-1 rounded-full border border-[#E0BFBF]/30">
            <CheckCircle className="w-3.5 h-3.5 text-[#5D0016]" />
            <span>Instant DBT Tracking</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            id="btn-download-nari-shakti-app"
            onClick={() => onOpenModal('app-download')}
            className="w-full sm:w-auto bg-transparent border-2 border-[#5D0016] text-[#5D0016] font-sans font-semibold text-sm py-3 px-8 rounded-full hover:bg-[#5D0016] hover:text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{t.downloadAppBtn}</span>
          </button>

          <button
            id="btn-app-guide-details"
            onClick={() => onOpenModal('how-it-works')}
            className="w-full sm:w-auto text-xs text-[#5D0016] font-semibold underline underline-offset-4 py-2 px-4 hover:text-[#800020] transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Step-by-Step Mobile Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
