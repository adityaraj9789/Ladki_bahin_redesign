import React, { useState } from 'react';
import { Language } from '../types';
import { 
  X, Smartphone, Download, QrCode, Send, CheckCircle2, 
  ShieldCheck, Star, Sparkles, ExternalLink 
} from 'lucide-react';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isSmsSent, setIsSmsSent] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  if (!isOpen) return null;

  const appIconBgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCJSlvZ22s4-1djtfL1-Onxm0HicDCMdCBueus7887N3Wdbs9od09ifb0cLJTY_imboMulwwUu6SZMeHWARayiWzcsYTqh0NWMtQpcgmYs6lrXWRgeI3Agg3FjB79ohH4WUt0eHTK-C5KlDPfnbSfcz8GMAwaAd-L7fX8mef86TxgF8mAles5EaXUDeEwqzm1lti6_1ZpUz9r6X4ZzsouQG1Ay8twWfff2DOFHPwlMp2zpTr162bLc";

  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      setIsSmsSent(true);
      setTimeout(() => setIsSmsSent(false), 5000);
    }
  };

  const handleSimulateDownload = () => {
    setDownloadStarted(true);
    setTimeout(() => {
      setDownloadStarted(false);
      alert('Nari Shakti Doot App installer initiated. For Android, download from Google Play Store or scan QR code on your smartphone.');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#332F2E]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#F9F5F0] w-full max-w-xl rounded-2xl shadow-2xl border border-[#E0BFBF]/40 overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#5D0016] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFE088] text-[#5D0016] flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#FFE088]">
                Nari Shakti Doot App (नारी शक्ती दूत ॲप)
              </h2>
              <p className="text-xs text-white/80">
                Official Mobile Application for Majhi Ladki Bahin Yojana
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-[#1B1C1A] space-y-6">
          
          {/* App Highlight Card */}
          <div className="bg-white rounded-2xl p-5 border border-[#E0BFBF]/40 soft-shadow flex flex-col sm:flex-row items-center gap-5">
            <div
              className="w-20 h-20 bg-[#E4E2DE] rounded-2xl flex items-center justify-center shadow-inner relative bg-cover bg-center shrink-0 border border-[#E0BFBF]/40"
              style={{ backgroundImage: `url('${appIconBgUrl}')` }}
            >
              <div className="absolute inset-0 bg-black/10 rounded-2xl" />
              <span className="material-symbols-outlined text-4xl text-[#5D0016] relative z-10">
                smartphone
              </span>
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                <span className="font-bold text-sm text-[#5D0016]">Nari Shakti Doot</span>
                <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                  Govt of Maharashtra
                </span>
              </div>
              <p className="text-xs text-[#584141] leading-relaxed">
                Scan documents, complete Aadhaar e-KYC, and track monthly ₹1,500 DBT deposits with instant notifications.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-[11px] text-[#8C7071]">
                <span>⭐ 4.6 (1M+ Reviews)</span>
                <span>•</span>
                <span>📦 18 MB</span>
                <span>•</span>
                <span>📥 1 Crore+ Downloads</span>
              </div>
            </div>
          </div>

          {/* QR Code & Direct Download Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* QR Code */}
            <div className="bg-white p-4 rounded-xl border border-[#E0BFBF]/40 soft-shadow flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-[#F9F5F0] p-2 rounded-xl border border-[#E0BFBF]/60 flex items-center justify-center mb-2 shadow-inner">
                {/* Visual SVG QR Representation */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#5D0016]">
                  <rect width="100" height="100" fill="#F9F5F0" />
                  <path d="M10 10h30v30h-30zM15 15h20v20h-20zM60 10h30v30h-30zM65 15h20v20h-20zM10 60h30v30h-30zM15 65h20v20h-20zM22 22h6v6h-6zM72 22h6v6h-6zM22 72h6v6h-6zM45 10h10v10h-10zM45 30h10v10h-10zM10 45h10v10h-10zM30 45h10v10h-10zM45 45h10v10h-10zM60 45h10v10h-10zM75 45h15v10h-15zM45 60h10v10h-10zM60 60h15v10h-15zM45 75h10v15h-10zM60 75h10v15h-10zM75 75h15v15h-15z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-[#5D0016]">Scan with Phone Camera</span>
              <span className="text-[10px] text-[#8C7071]">Instant Android & iOS Install</span>
            </div>

            {/* Direct Install & Google Play */}
            <div className="flex flex-col justify-between gap-3">
              <button
                onClick={handleSimulateDownload}
                className="w-full py-3.5 px-4 rounded-xl bg-[#5D0016] text-[#FFE088] font-bold text-xs sm:text-sm hover:bg-[#800020] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>{downloadStarted ? 'Starting Download...' : 'Download APK Directly'}</span>
              </button>

              {/* SMS Link sender */}
              <div className="bg-white p-3.5 rounded-xl border border-[#E0BFBF]/40">
                <div className="text-[11px] font-bold text-[#584141] mb-1.5">
                  Get App Link via SMS
                </div>
                <form onSubmit={handleSendSms} className="flex gap-1.5">
                  <input
                    type="text"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit mobile"
                    className="flex-1 bg-[#F9F5F0] border border-[#E0BFBF] rounded-lg px-2.5 py-1.5 text-xs text-[#1B1C1A]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-[#735C00] text-white text-xs font-semibold hover:bg-[#574500] transition-colors cursor-pointer"
                  >
                    Send
                  </button>
                </form>
                {isSmsSent && (
                  <p className="text-[11px] text-green-700 font-medium mt-1">
                    ✓ SMS with app link sent to {mobileNumber}!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EFEEEA] border-t border-[#E0BFBF]/30 flex items-center justify-between shrink-0">
          <span className="text-xs text-[#8C7071]">
            Safe & Verified by Mahagov NIC
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#5D0016] text-[#FFE088] text-xs font-semibold hover:bg-[#800020] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
