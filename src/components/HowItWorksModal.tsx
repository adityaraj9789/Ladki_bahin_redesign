import React from 'react';
import { Language } from '../types';
import { 
  X, ListOrdered, Smartphone, Globe, Building, CheckCircle, 
  ArrowRight, FileText, UserCheck, CreditCard 
} from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenApply: () => void;
  onOpenAppDownload: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  language,
  onOpenApply,
  onOpenAppDownload,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#332F2E]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#F9F5F0] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E0BFBF]/40 overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#5D0016] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFE088] text-[#5D0016] flex items-center justify-center font-bold">
              <ListOrdered className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#FFE088]">
                {language === 'en' ? 'How to Apply - Step by Step Guide' : 'अर्ज कसा करावा - सविस्तर मार्गदर्शक'}
              </h2>
              <p className="text-xs text-white/80">
                Choose from 3 easy ways to apply for Majhi Ladki Bahin Yojana
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
          
          {/* 3 Channels */}
          <div>
            <h3 className="font-serif font-bold text-base text-[#5D0016] mb-3">
              3 Convenient Application Modes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-xl border-t-4 border-[#5D0016] soft-shadow text-center">
                <Globe className="w-6 h-6 text-[#5D0016] mx-auto mb-2" />
                <h4 className="font-bold text-xs text-[#1B1C1A]">1. Online Portal</h4>
                <p className="text-[11px] text-[#584141] mt-1">Directly fill and submit through this web portal in 3 minutes.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border-t-4 border-[#735C00] soft-shadow text-center">
                <Smartphone className="w-6 h-6 text-[#735C00] mx-auto mb-2" />
                <h4 className="font-bold text-xs text-[#1B1C1A]">2. Mobile App</h4>
                <p className="text-[11px] text-[#584141] mt-1">Install Nari Shakti Doot App from Google Play Store.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border-t-4 border-[#8C7071] soft-shadow text-center">
                <Building className="w-6 h-6 text-[#8C7071] mx-auto mb-2" />
                <h4 className="font-bold text-xs text-[#1B1C1A]">3. Assisted Help</h4>
                <p className="text-[11px] text-[#584141] mt-1">Visit your local Anganwadi Sevika, Gram Panchayat, or Setu Kendra.</p>
              </div>
            </div>
          </div>

          {/* 4 Step Process Timeline */}
          <div>
            <h3 className="font-serif font-bold text-base text-[#5D0016] mb-3">
              Application to Money in Bank Process
            </h3>

            <div className="space-y-3">
              {[
                {
                  step: 'Step 1',
                  title: 'Aadhaar e-KYC & Profile Registration',
                  desc: 'Provide your 12-digit Aadhaar number and verify with mobile OTP. Upload your photograph.',
                },
                {
                  step: 'Step 2',
                  title: 'Ration Card & Domicile Verification',
                  desc: 'Select Orange/Yellow ration card (no separate income certificate required) or upload Tehsildar income proof.',
                },
                {
                  step: 'Step 3',
                  title: 'Bank & Aadhaar DBT Seeding',
                  desc: 'Provide bank account details. The system checks NPCI Aadhaar seeding for uninterrupted monthly credit.',
                },
                {
                  step: 'Step 4',
                  title: 'Approval & Monthly ₹1,500 Cash Transfer',
                  desc: 'District scrutiny committee clears application and monthly DBT installment begins.',
                },
              ].map((item, idx) => (
                <div key={item.step} className="flex items-start gap-3.5 bg-white p-3.5 rounded-xl border border-[#E0BFBF]/40">
                  <div className="w-7 h-7 rounded-full bg-[#5D0016] text-[#FFE088] font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#1B1C1A]">
                      {item.step}: {item.title}
                    </h4>
                    <p className="text-[11px] text-[#584141] mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Checklist Box */}
          <div className="bg-[#FFF9EB] p-4 rounded-xl border border-[#FED65B]/60 text-xs">
            <div className="font-bold text-[#735C00] mb-2 uppercase tracking-wider">
              Documents to Keep Ready
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#584141]">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-green-700 shrink-0" />
                <span>Aadhaar Card copy</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-green-700 shrink-0" />
                <span>Orange/Yellow Ration Card or Domicile</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-green-700 shrink-0" />
                <span>Bank Passbook front page (Aadhaar linked)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-green-700 shrink-0" />
                <span>Passport size photograph</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EFEEEA] border-t border-[#E0BFBF]/30 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenAppDownload();
            }}
            className="px-4 py-2 rounded-full bg-white border border-[#5D0016] text-[#5D0016] text-xs font-semibold hover:bg-[#F5F3EF] cursor-pointer flex items-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Nari Shakti Doot App</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenApply();
            }}
            className="px-5 py-2.5 rounded-full bg-[#5D0016] text-[#FFE088] text-xs font-bold hover:bg-[#800020] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Start Online Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
