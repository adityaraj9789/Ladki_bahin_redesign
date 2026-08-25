import React from 'react';
import { Language } from '../types';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms';
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  type,
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#332F2E]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#F9F5F0] w-full max-w-xl rounded-2xl shadow-2xl border border-[#E0BFBF]/40 overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#5D0016] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFE088] text-[#5D0016] flex items-center justify-center font-bold">
              {type === 'privacy' ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#FFE088]">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service & Government Rules'}
              </h2>
              <p className="text-xs text-white/80">
                Government of Maharashtra DBT Guidelines
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
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-xs text-[#584141] space-y-4 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p>
                The Government of Maharashtra is committed to protecting your personal information and privacy under the <strong>Majhi Ladki Bahin Yojana</strong> portal and Nari Shakti Doot application.
              </p>
              <h4 className="font-bold text-sm text-[#5D0016]">1. Data Collection & Use</h4>
              <p>
                We collect your Aadhaar number, name, date of birth, ration card details, mobile number, and bank account information solely for the purpose of verifying eligibility, Direct Benefit Transfer (DBT) disbursement, and communication.
              </p>
              <h4 className="font-bold text-sm text-[#5D0016]">2. Aadhaar e-KYC & Security</h4>
              <p>
                Aadhaar information is processed securely in compliance with the Aadhaar (Targeted Delivery of Financial and other Subsidies, benefits and services) Act. Biometric or raw UID credentials are never stored in plain text.
              </p>
              <h4 className="font-bold text-sm text-[#5D0016]">3. Zero Commercial Sharing</h4>
              <p>
                Your citizen data is strictly confidential and will never be shared, sold, or distributed to any commercial or third-party marketing entities.
              </p>
            </>
          ) : (
            <>
              <p>
                By applying for and using the <strong>Majhi Ladki Bahin Yojana</strong> portal, the applicant agrees to adhere to the statutory terms and criteria laid down in the official Government Resolutions (GR).
              </p>
              <h4 className="font-bold text-sm text-[#5D0016]">1. Eligibility Terms</h4>
              <p>
                The applicant must be a resident of Maharashtra between 21 and 65 years of age. The family annual income must not exceed ₹2,50,000.
              </p>
              <h4 className="font-bold text-sm text-[#5D0016]">2. Direct Benefit Transfer (DBT)</h4>
              <p>
                Disbursement of the monthly ₹1,500 cash assistance will be executed exclusively to the beneficiary's Aadhaar-seeded active bank account.
              </p>
              <h4 className="font-bold text-sm text-[#5D0016]">3. Penalty for False Information</h4>
              <p>
                Furnishing false information or fraudulent income declarations may lead to cancellation of registration and recovery of transferred benefits under applicable Maharashtra state laws.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EFEEEA] border-t border-[#E0BFBF]/30 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#5D0016] text-[#FFE088] text-xs font-semibold hover:bg-[#800020] transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
