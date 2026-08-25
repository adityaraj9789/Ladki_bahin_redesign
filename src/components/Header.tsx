import React from 'react';
import { Language, ActiveModal } from '../types';
import { translations } from '../data/translations';
import { Menu, Globe, Search, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenDrawer: () => void;
  onOpenModal: (modal: ActiveModal) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  onOpenDrawer,
  onOpenModal,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F9F5F0]/90 backdrop-blur-md border-b border-[#E0BFBF]/30 shadow-[0_20px_40px_-15px_rgba(93,0,22,0.05)]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between gap-3">
        {/* Left: Drawer Trigger + Brand */}
        <div className="flex items-center gap-3">
          <button
            id="btn-header-menu-drawer"
            onClick={onOpenDrawer}
            aria-label="Open Navigation Menu"
            className="p-2 rounded-full text-[#5D0016] hover:bg-[#EAE8E4] transition-transform active:scale-90 flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <div className="flex flex-col">
            <button 
              onClick={() => onOpenModal(null)}
              className="text-left group cursor-pointer"
            >
              <span className="font-serif italic font-semibold text-xl sm:text-2xl text-[#5D0016] tracking-tight group-hover:opacity-90 transition-opacity">
                {t.portalTitle}
              </span>
              <span className="hidden sm:block text-[11px] font-semibold tracking-wider text-[#8C7071] uppercase">
                {t.portalSubtitle}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Quick Nav */}
        <div className="hidden lg:flex items-center gap-6 text-[14px] font-medium text-[#584141]">
          <button 
            id="nav-link-eligibility"
            onClick={() => onOpenModal('eligibility-quiz')}
            className="hover:text-[#5D0016] transition-colors flex items-center gap-1.5 cursor-pointer py-1"
          >
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            {t.nav.eligibility}
          </button>
          <button 
            id="nav-link-benefits"
            onClick={() => onOpenModal('benefits')}
            className="hover:text-[#5D0016] transition-colors flex items-center gap-1.5 cursor-pointer py-1"
          >
            <span className="material-symbols-outlined text-[18px]">card_giftcard</span>
            {t.nav.benefits}
          </button>
          <button 
            id="nav-link-status"
            onClick={() => onOpenModal('status')}
            className="hover:text-[#5D0016] transition-colors flex items-center gap-1.5 cursor-pointer py-1"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            {t.nav.trackStatus}
          </button>
          <button 
            id="nav-link-help"
            onClick={() => onOpenModal('helpdesk')}
            className="hover:text-[#5D0016] transition-colors flex items-center gap-1.5 cursor-pointer py-1"
          >
            <span className="material-symbols-outlined text-[18px]">contact_support</span>
            {t.nav.helpdesk}
          </button>
        </div>

        {/* Right: Language switch + Track status pill + Apply Now button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            id="btn-language-toggle"
            onClick={onToggleLanguage}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full bg-[#EFEEEA] hover:bg-[#EAE8E4] text-[#5D0016] border border-[#E0BFBF]/40 transition-colors cursor-pointer"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#735C00]" />
            <span>{language === 'en' ? 'मराठी' : 'English'}</span>
          </button>

          {/* Quick Track Status Button (Mobile/Tablet icon) */}
          <button
            id="btn-quick-status-search"
            onClick={() => onOpenModal('status')}
            className="hidden sm:flex md:hidden lg:hidden items-center justify-center p-2 rounded-full bg-[#EFEEEA] text-[#5D0016] hover:bg-[#EAE8E4] transition-colors"
            title="Track Status"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Primary Apply Button */}
          <button
            id="btn-header-apply-now"
            onClick={() => onOpenModal('apply')}
            className="bg-[#5D0016] text-[#FFE088] font-sans font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-[#800020] hover:text-white transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5 tracking-wide"
          >
            <ShieldCheck className="w-4 h-4 text-[#FED65B]" />
            <span>{t.applyNow}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
