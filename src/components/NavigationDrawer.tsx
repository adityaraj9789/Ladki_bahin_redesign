import React from 'react';
import { Language, ActiveModal } from '../types';
import { translations } from '../data/translations';
import { X, Home, ShieldCheck, Gift, ListOrdered, Search, PhoneCall, Smartphone, FileText, CheckCircle2 } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenModal: (modal: ActiveModal) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  language,
  onOpenModal,
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  const handleNavClick = (modal: ActiveModal) => {
    onOpenModal(modal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay Backdrop */}
      <div
        id="drawer-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-[#332F2E]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300 cursor-pointer"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-[#F9F5F0] shadow-2xl flex flex-col border-r border-[#E0BFBF]/40 transform transition-transform duration-300 ease-out z-50">
        {/* Drawer Header */}
        <div className="p-6 bg-gradient-to-b from-[#EFEEEA] to-[#F9F5F0] border-b border-[#E0BFBF]/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#8C7071] tracking-widest uppercase block">
              {t.portalSubtitle}
            </span>
            <h2 className="font-serif font-bold text-2xl text-[#5D0016] mt-0.5">
              {t.portalTitle}
            </h2>
          </div>
          <button
            id="btn-close-drawer"
            onClick={onClose}
            aria-label="Close Drawer"
            className="p-1.5 rounded-full text-[#584141] hover:bg-[#E4E2DE] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <button
            id="drawer-item-home"
            onClick={() => handleNavClick(null)}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-left font-medium text-[#1B1C1A] hover:bg-[#EFEEEA] transition-colors cursor-pointer"
          >
            <Home className="w-5 h-5 text-[#5D0016]" />
            <span>{t.nav.home}</span>
          </button>

          <button
            id="drawer-item-apply"
            onClick={() => handleNavClick('apply')}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-left font-medium bg-[#FED65B]/30 text-[#5D0016] hover:bg-[#FED65B]/50 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-5 h-5 text-[#735C00]" />
            <span className="font-semibold">{t.applyNowDBT}</span>
            <span className="ml-auto text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#5D0016] text-[#FFE088]">
              Active
            </span>
          </button>

          <button
            id="drawer-item-eligibility"
            onClick={() => handleNavClick('eligibility-quiz')}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-left font-medium text-[#584141] hover:bg-[#EFEEEA] hover:text-[#1B1C1A] transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5 text-[#735C00]" />
            <span>{t.nav.eligibility}</span>
          </button>

          <button
            id="drawer-item-benefits"
            onClick={() => handleNavClick('benefits')}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-left font-medium text-[#584141] hover:bg-[#EFEEEA] hover:text-[#1B1C1A] transition-colors cursor-pointer"
          >
            <Gift className="w-5 h-5 text-[#5D0016]" />
            <span>{t.nav.benefits}</span>
          </button>

          <button
            id="drawer-item-how-it-works"
            onClick={() => handleNavClick('how-it-works')}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-left font-medium text-[#584141] hover:bg-[#EFEEEA] hover:text-[#1B1C1A] transition-colors cursor-pointer"
          >
            <ListOrdered className="w-5 h-5 text-[#5D0016]" />
            <span>{t.nav.howItWorks}</span>
          </button>

          <button
            id="drawer-item-status"
            onClick={() => handleNavClick('status')}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-left font-medium text-[#584141] hover:bg-[#EFEEEA] hover:text-[#1B1C1A] transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5 text-[#5D0016]" />
            <span>{t.nav.trackStatus}</span>
          </button>

          <button
            id="drawer-item-app-download"
            onClick={() => handleNavClick('app-download')}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-left font-medium text-[#584141] hover:bg-[#EFEEEA] hover:text-[#1B1C1A] transition-colors cursor-pointer"
          >
            <Smartphone className="w-5 h-5 text-[#735C00]" />
            <span>{t.nav.appDownload}</span>
          </button>

          <button
            id="drawer-item-helpdesk"
            onClick={() => handleNavClick('helpdesk')}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-left font-medium text-[#584141] hover:bg-[#EFEEEA] hover:text-[#1B1C1A] transition-colors cursor-pointer"
          >
            <PhoneCall className="w-5 h-5 text-[#5D0016]" />
            <span>{t.nav.helpdesk}</span>
          </button>
        </nav>

        {/* Drawer Footer info */}
        <div className="p-4 bg-[#EFEEEA] border-t border-[#E0BFBF]/30 text-xs text-[#584141]">
          <div className="flex items-center gap-2 mb-2 text-[#5D0016] font-semibold">
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            <span>Helpline: 181 / 1800-120-8040</span>
          </div>
          <p className="text-[11px] text-[#8C7071] leading-relaxed">
            Women & Child Development Department, Government of Maharashtra
          </p>
        </div>
      </div>
    </div>
  );
};
