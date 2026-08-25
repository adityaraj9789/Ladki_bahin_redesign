import React from 'react';
import { Language } from '../types';
import { 
  X, Gift, IndianRupee, ShieldCheck, Landmark, CheckCircle2, 
  Calendar, Zap, HeartHandshake, ArrowRight 
} from 'lucide-react';

interface BenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenApply: () => void;
}

export const BenefitsModal: React.FC<BenefitsModalProps> = ({
  isOpen,
  onClose,
  language,
  onOpenApply,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#332F2E]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#F9F5F0] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E0BFBF]/40 overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#5D0016] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFE088] text-[#5D0016] flex items-center justify-center font-bold">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#FFE088]">
                {language === 'en' ? 'Scheme Benefits & Direct Cash Transfer' : 'योजनेचे फायदे व थेट रोख सन्मान निधी'}
              </h2>
              <p className="text-xs text-white/80">
                ₹1,500 Monthly Financial Assistance for Women in Maharashtra
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
          
          {/* Main Cash Banner */}
          <div className="bg-gradient-to-r from-[#FFF9EB] to-[#FED65B]/30 border border-[#FED65B] p-5 rounded-2xl soft-shadow flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#735C00] bg-[#FED65B]/40 px-2.5 py-0.5 rounded-full">
                Financial Security
              </span>
              <div className="font-serif font-bold text-3xl text-[#5D0016] mt-1">
                ₹1,500 / Month
              </div>
              <p className="text-xs text-[#584141] mt-0.5 font-medium">
                ₹18,000 Annual Direct Financial Aid transferred to Bank Account
              </p>
            </div>

            <div className="text-center bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-[#FED65B]/60 shrink-0">
              <div className="text-xs font-semibold text-[#584141]">Disbursement Date</div>
              <div className="text-base font-bold text-[#5D0016] font-serif">15th of Every Month</div>
            </div>
          </div>

          {/* Key Advantages */}
          <div>
            <h3 className="font-serif font-bold text-base text-[#5D0016] mb-3">
              Key Features & Benefits
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-xl border border-[#E0BFBF]/40 soft-shadow flex gap-3">
                <Landmark className="w-5 h-5 text-[#5D0016] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-[#1B1C1A]">Direct Benefit Transfer (DBT)</h4>
                  <p className="text-[11px] text-[#584141] mt-0.5 leading-relaxed">
                    100% cashless transfer directly via Aadhaar-linked NPCI bank account. Zero middlemen or cash handling.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E0BFBF]/40 soft-shadow flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#735C00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-[#1B1C1A]">No Processing Fee</h4>
                  <p className="text-[11px] text-[#584141] mt-0.5 leading-relaxed">
                    Application on portal, Nari Shakti Doot app, and at Anganwadi centers is 100% free of cost.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E0BFBF]/40 soft-shadow flex gap-3">
                <Zap className="w-5 h-5 text-[#5D0016] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-[#1B1C1A]">Instant SMS Notifications</h4>
                  <p className="text-[11px] text-[#584141] mt-0.5 leading-relaxed">
                    Receive SMS alerts upon application submission, scrutiny verification, and credit of monthly installments.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E0BFBF]/40 soft-shadow flex gap-3">
                <HeartHandshake className="w-5 h-5 text-[#735C00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-[#1B1C1A]">Inclusive Coverage</h4>
                  <p className="text-[11px] text-[#584141] mt-0.5 leading-relaxed">
                    Covers married, unmarried (21+), widowed, divorced, and destitute women across rural and urban Maharashtra.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="p-4 rounded-xl bg-white border border-[#E0BFBF]/40 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#5D0016] mb-2">
              Monthly Disbursement Schedule
            </h4>
            <div className="space-y-1.5 text-[#584141]">
              <div className="flex justify-between py-1 border-b border-[#EFEEEA]">
                <span>Batch Verification:</span>
                <strong>1st to 10th of every month</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EFEEEA]">
                <span>DBT Gateway Processing:</span>
                <strong>11th to 14th of every month</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Bank Credit (SMS Alert):</span>
                <strong className="text-green-700">15th of every month</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EFEEEA] border-t border-[#E0BFBF]/30 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-white border border-[#8C7071] text-xs font-semibold text-[#584141] hover:bg-[#F5F3EF] cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenApply();
            }}
            className="px-5 py-2.5 rounded-full bg-[#5D0016] text-[#FFE088] text-xs font-bold hover:bg-[#800020] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Apply for DBT Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
