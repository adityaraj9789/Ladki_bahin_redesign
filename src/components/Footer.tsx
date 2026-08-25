import React from 'react';
import { Language, ActiveModal } from '../types';
import { translations } from '../data/translations';
import { Phone, Shield, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  language: Language;
  onOpenModal: (modal: ActiveModal) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenModal,
}) => {
  const t = translations[language];

  return (
    <footer className="w-full bg-[#3D1F20] text-white border-t border-[#E0BFBF]/20">
      <div className="max-w-[1200px] mx-auto py-12 sm:py-16 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 pb-8 border-b border-white/10">
          {/* Brand info */}
          <div className="text-center md:text-left">
            <div className="font-serif font-bold text-2xl text-white mb-2 tracking-tight">
              {t.portalTitle}
            </div>
            <p className="text-sm text-white/80 max-w-sm leading-relaxed mb-3">
              Department of Women and Child Development, Government of Maharashtra.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-[#FFE088]">
              <Phone className="w-3.5 h-3.5" />
              <span>Toll Free Women Helpline: <strong>181</strong> | <strong>1800-120-8040</strong></span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 text-sm text-white/80 items-center">
            <button
              id="footer-link-privacy"
              onClick={() => onOpenModal('privacy')}
              className="hover:text-[#FFE088] underline decoration-[#FFE088]/40 hover:decoration-[#FFE088] transition-all cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-white/30 hidden sm:inline">•</span>
            <button
              id="footer-link-terms"
              onClick={() => onOpenModal('terms')}
              className="hover:text-[#FFE088] underline decoration-[#FFE088]/40 hover:decoration-[#FFE088] transition-all cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-white/30 hidden sm:inline">•</span>
            <button
              id="footer-link-helpdesk"
              onClick={() => onOpenModal('helpdesk')}
              className="hover:text-[#FFE088] underline decoration-[#FFE088]/40 hover:decoration-[#FFE088] transition-all cursor-pointer"
            >
              Help Desk & FAQ
            </button>
            <span className="text-white/30 hidden sm:inline">•</span>
            <button
              id="footer-link-app"
              onClick={() => onOpenModal('app-download')}
              className="text-[#FFE088] font-semibold underline decoration-[#FFE088] hover:text-white transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Nari Shakti Doot App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/60">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-1">
            <span>Direct Benefit Transfer (DBT) Portal</span>
            <span>•</span>
            <span>Government of Maharashtra</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
