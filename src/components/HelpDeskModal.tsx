import React, { useState } from 'react';
import { Language } from '../types';
import { 
  X, PhoneCall, HelpCircle, Mail, MessageSquare, ChevronDown, 
  ChevronUp, CheckCircle2, ShieldCheck, MapPin, Send 
} from 'lucide-react';

interface HelpDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const HelpDeskModal: React.FC<HelpDeskModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);
  const [grievanceData, setGrievanceData] = useState({
    name: '',
    phone: '',
    district: 'Pune',
    issueType: 'Aadhaar DBT Linking Issue',
    message: '',
  });

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'Is an Income Certificate mandatory if I have an Orange or Yellow Ration Card?',
      a: 'No! As per the official Government Resolution (GR), holding an Orange or Yellow Ration card waives the requirement for a separate income certificate from the Tehsildar office.',
    },
    {
      q: 'Can unmarried women (21+ years) apply for Majhi Ladki Bahin Yojana?',
      a: 'Yes, unmarried women aged 21 years and above residing in Maharashtra who satisfy the family income threshold of ₹2.5 Lakh are fully eligible.',
    },
    {
      q: 'What if my bank account is not linked to Aadhaar (NPCI Seeded)?',
      a: 'Since all ₹1,500 disbursements are transferred strictly through Aadhaar-based DBT (Direct Benefit Transfer), you must visit your bank branch and submit the Aadhaar-seeding consent form, or open an India Post Payments Bank (IPPB) DBT-enabled account.',
    },
    {
      q: 'On which date of the month will the ₹1,500 benefit be credited?',
      a: 'The sanctioned benefit of ₹1,500 is directly credited to your Aadhaar-linked bank account on the 15th of every month. You will receive an official SMS notification from the treasury.',
    },
    {
      q: 'Is there any application fee or registration charge?',
      a: 'No! The application process is 100% free of cost on this web portal, on the Nari Shakti Doot mobile app, and at Anganwadi / Setu Suvidha Kendras.',
    },
  ];

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (grievanceData.name && grievanceData.phone) {
      setGrievanceSubmitted(true);
      setTimeout(() => {
        setGrievanceSubmitted(false);
        setGrievanceData({
          name: '',
          phone: '',
          district: 'Pune',
          issueType: 'Aadhaar DBT Linking Issue',
          message: '',
        });
      }, 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#332F2E]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#F9F5F0] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E0BFBF]/40 overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#5D0016] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFE088] text-[#5D0016] flex items-center justify-center font-bold">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#FFE088]">
                {language === 'en' ? 'Help Desk & Grievance Redressal' : 'मदत केंद्र व तक्रार निवारण कक्ष'}
              </h2>
              <p className="text-xs text-white/80">
                24x7 Citizen Support • Toll Free Helplines • FAQ
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
          
          {/* Helplines Callout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl border border-[#E0BFBF]/40 soft-shadow flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#5D0016] text-[#FFE088] flex items-center justify-center font-bold shrink-0">
                181
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#8C7071]">24x7 Toll Free Helpline</div>
                <div className="font-bold text-base text-[#5D0016]">181</div>
                <div className="text-[11px] text-[#584141]">Women Helpline (Maharashtra)</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#E0BFBF]/40 soft-shadow flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#735C00] text-white flex items-center justify-center font-bold shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#8C7071]">Yojana Support Desk</div>
                <div className="font-bold text-base text-[#735C00]">1800-120-8040</div>
                <div className="text-[11px] text-[#584141]">Mon-Sat (9:00 AM - 6:00 PM)</div>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div>
            <h3 className="font-serif font-bold text-base text-[#5D0016] mb-3">
              Frequently Asked Questions (FAQ)
            </h3>

            <div className="space-y-2.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-[#E0BFBF]/40 overflow-hidden soft-shadow"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left font-semibold text-xs sm:text-sm text-[#1B1C1A] flex items-center justify-between gap-3 hover:bg-[#F5F3EF] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#5D0016] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8C7071] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 pt-1 text-xs text-[#584141] leading-relaxed border-t border-[#EFEEEA] bg-[#FDFBF7]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lodge a Query / Grievance */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E0BFBF]/40 soft-shadow">
            <h3 className="font-serif font-bold text-base text-[#5D0016] mb-1">
              Submit Grievance / Query
            </h3>
            <p className="text-xs text-[#584141] mb-4">
              Have an issue with registration, DBT linkage, or scrutiny? Submit below and get a response within 48 hours.
            </p>

            {grievanceSubmitted ? (
              <div className="p-4 bg-green-50 rounded-xl border border-green-200 text-center text-xs text-green-800 space-y-1">
                <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" />
                <div className="font-bold">Grievance Ticket Generated! Ticket #GRV-MH-84920</div>
                <div>Your request has been forwarded to the District Nodal Officer.</div>
              </div>
            ) : (
              <form onSubmit={handleGrievanceSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#584141] mb-1">Applicant Name *</label>
                    <input
                      type="text"
                      required
                      value={grievanceData.name}
                      onChange={(e) => setGrievanceData({ ...grievanceData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-[#F9F5F0] border border-[#E0BFBF] rounded-lg px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#584141] mb-1">Mobile Number *</label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={grievanceData.phone}
                      onChange={(e) => setGrievanceData({ ...grievanceData, phone: e.target.value.replace(/\D/g, '') })}
                      placeholder="10-digit mobile"
                      className="w-full bg-[#F9F5F0] border border-[#E0BFBF] rounded-lg px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#584141] mb-1">Issue Category *</label>
                  <select
                    value={grievanceData.issueType}
                    onChange={(e) => setGrievanceData({ ...grievanceData, issueType: e.target.value })}
                    className="w-full bg-[#F9F5F0] border border-[#E0BFBF] rounded-lg px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Aadhaar DBT Linking Issue">Aadhaar DBT Linking / NPCI Mapper Issue</option>
                    <option value="Ration Card Verification Delay">Ration Card Verification Delay</option>
                    <option value="Installment Not Credited">Monthly ₹1,500 Installment Not Received</option>
                    <option value="Application Correction">Correction in Submitted Application</option>
                    <option value="Other">Other Query</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#584141] mb-1">Details of Query / Grievance *</label>
                  <textarea
                    rows={2}
                    required
                    value={grievanceData.message}
                    onChange={(e) => setGrievanceData({ ...grievanceData, message: e.target.value })}
                    placeholder="Describe your issue with application number if any..."
                    className="w-full bg-[#F9F5F0] border border-[#E0BFBF] rounded-lg px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#5D0016] text-[#FFE088] font-bold text-xs hover:bg-[#800020] transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Official Grievance</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EFEEEA] border-t border-[#E0BFBF]/30 flex items-center justify-between shrink-0">
          <span className="text-xs text-[#8C7071]">
            Department of Women & Child Development, Mantralaya, Mumbai
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
