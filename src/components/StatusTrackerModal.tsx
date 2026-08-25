import React, { useState, useEffect } from 'react';
import { Language, ApplicantData } from '../types';
import { 
  X, Search, CheckCircle2, Clock, AlertTriangle, ArrowRight, 
  Building2, Landmark, ShieldCheck, UserCheck, Calendar, IndianRupee, FileCheck 
} from 'lucide-react';

interface StatusTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  applications: ApplicantData[];
  initialSearchQuery?: string;
  onOpenApply: () => void;
}

export const StatusTrackerModal: React.FC<StatusTrackerModalProps> = ({
  isOpen,
  onClose,
  language,
  applications,
  initialSearchQuery = '',
  onOpenApply,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [selectedApp, setSelectedApp] = useState<ApplicantData | null>(null);
  const [searched, setSearched] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
      handleSearch(initialSearchQuery);
    } else if (applications.length > 0 && !selectedApp) {
      setSelectedApp(applications[0]);
      setSearched(true);
    }
  }, [initialSearchQuery, isOpen]);

  if (!isOpen) return null;

  const handleSearch = (queryToSearch?: string) => {
    const q = (queryToSearch !== undefined ? queryToSearch : searchQuery).trim().toLowerCase();
    setSearched(true);

    if (!q) {
      setSelectedApp(null);
      setNotFound(false);
      return;
    }

    const cleanQ = q.replace(/\D/g, '');

    const match = applications.find((app) => {
      const matchId = app.applicationNumber.toLowerCase().includes(q) || app.id.toLowerCase() === q;
      const matchName = app.fullName.toLowerCase().includes(q) || (app.marathiName && app.marathiName.includes(q));
      const matchMobile = app.mobileNumber.includes(q) || (cleanQ.length > 0 && app.mobileNumber.includes(cleanQ));
      const matchAadhaar = app.aadhaarNumber.replace(/\D/g, '').includes(cleanQ) || (cleanQ.length === 4 && app.aadhaarNumber.endsWith(cleanQ));

      return matchId || matchName || matchMobile || matchAadhaar;
    });

    if (match) {
      setSelectedApp(match);
      setNotFound(false);
    } else {
      setSelectedApp(null);
      setNotFound(true);
    }
  };

  const getStageStatus = (currentStatus: ApplicantData['status'], stepIdx: number) => {
    const statusOrder: ApplicantData['status'][] = [
      'Submitted',
      'Under Scrutiny',
      'Aadhaar DBT Linked',
      'Approved',
      'Disbursed'
    ];
    const currentIndex = statusOrder.indexOf(currentStatus);

    if (currentIndex > stepIdx) return 'completed';
    if (currentIndex === stepIdx) return 'current';
    return 'upcoming';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#332F2E]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#F9F5F0] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#E0BFBF]/40 overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#5D0016] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFE088] text-[#5D0016] flex items-center justify-center font-bold">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#FFE088]">
                {language === 'en' ? 'Track Application & DBT Status' : 'अर्जाची व डीबीटी सन्मान निधीची स्थिती तपासा'}
              </h2>
              <p className="text-xs text-white/80">
                Enter your Application ID, Mobile Number or Aadhaar Last 4 digits
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

        {/* Search Bar & Quick Demo Pickers */}
        <div className="p-4 sm:p-6 bg-[#EFEEEA] border-b border-[#E0BFBF]/30 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C7071] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by MLBY Application No. (e.g. MLBY-2024-MH-10824), Mobile or Aadhaar..."
                className="w-full bg-white rounded-full pl-10 pr-4 py-2.5 text-sm border border-[#E0BFBF] focus:outline-none focus:border-[#5D0016] text-[#1B1C1A]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#5D0016] text-[#FFE088] text-sm font-semibold hover:bg-[#800020] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Search Status</span>
            </button>
          </form>

          {/* Quick Demo Selector */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-[#584141]">
            <span className="font-semibold text-[#8C7071]">Demo Applications:</span>
            {applications.slice(0, 3).map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  setSearchQuery(app.applicationNumber);
                  handleSearch(app.applicationNumber);
                }}
                className="px-2.5 py-1 rounded-full bg-white border border-[#E0BFBF]/60 hover:border-[#5D0016] hover:text-[#5D0016] transition-colors cursor-pointer text-[11px]"
              >
                {app.fullName.split(' ')[0]} ({app.status})
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-[#1B1C1A]">
          {notFound ? (
            <div className="text-center py-10">
              <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="font-serif font-bold text-lg text-[#5D0016]">
                No Application Found
              </h3>
              <p className="text-xs sm:text-sm text-[#584141] max-w-md mx-auto mt-1 mb-6">
                We could not find an application matching "<strong>{searchQuery}</strong>". Please check the number or submit a fresh DBT application.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenApply();
                }}
                className="px-6 py-2.5 rounded-full bg-[#5D0016] text-[#FFE088] text-xs sm:text-sm font-semibold hover:bg-[#800020] transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Apply for Majhi Ladki Bahin Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : selectedApp ? (
            <div className="space-y-6">
              
              {/* Applicant Card Summary */}
              <div className="bg-white rounded-2xl p-5 border border-[#E0BFBF]/40 soft-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-[#8C7071] bg-[#EFEEEA] px-2 py-0.5 rounded-md">
                      {selectedApp.applicationNumber}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      selectedApp.status === 'Approved' || selectedApp.status === 'Disbursed'
                        ? 'bg-green-100 text-green-800'
                        : selectedApp.status === 'Aadhaar DBT Linked'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      ● {selectedApp.status}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#5D0016]">
                    {selectedApp.fullName} {selectedApp.marathiName && <span className="font-normal text-base text-[#584141]">({selectedApp.marathiName})</span>}
                  </h3>
                  <div className="text-xs text-[#584141] mt-0.5">
                    District: <strong>{selectedApp.district}</strong> • Taluka: <strong>{selectedApp.taluka}</strong> • Ration Card: <strong>{selectedApp.rationCardType.toUpperCase()}</strong>
                  </div>
                </div>

                {/* Monthly Amount Badge */}
                <div className="bg-gradient-to-br from-[#FFF9EB] to-[#FED65B]/30 border border-[#FED65B] p-3 rounded-xl text-center sm:text-right shrink-0 w-full sm:w-auto">
                  <div className="text-[10px] font-bold text-[#735C00] uppercase tracking-wider">
                    Monthly Cash Transfer
                  </div>
                  <div className="font-serif font-bold text-xl text-[#5D0016]">
                    ₹{selectedApp.currentInstallmentAmount.toLocaleString()} / Month
                  </div>
                  <div className="text-[10px] text-[#735C00] font-medium">
                    Next: {selectedApp.nextDisbursementDate}
                  </div>
                </div>
              </div>

              {/* Multi-Stage Visual Stepper */}
              <div>
                <h4 className="text-xs font-bold text-[#5D0016] uppercase tracking-wider mb-4">
                  Application & DBT Progress Tracker
                </h4>

                <div className="space-y-3">
                  {[
                    {
                      title: '1. Online Application Received',
                      desc: `Registered on ${selectedApp.submittedAt} with verified Aadhaar e-KYC.`,
                      icon: FileCheck,
                      stageIdx: 0,
                    },
                    {
                      title: '2. Local Scrutiny & Field Verification',
                      desc: 'Checked by Anganwadi Sevika / Ward Officer & Gram Panchayat Committee.',
                      icon: UserCheck,
                      stageIdx: 1,
                    },
                    {
                      title: '3. Aadhaar NPCI DBT Linkage Verified',
                      desc: `Bank Account (${selectedApp.bankName} - ${selectedApp.accountNumber}) seeded with Aadhaar.`,
                      icon: Landmark,
                      stageIdx: 2,
                    },
                    {
                      title: '4. District Sanction & Approval',
                      desc: 'Approved by District Collectorate under Women & Child Development Department.',
                      icon: Building2,
                      stageIdx: 3,
                    },
                    {
                      title: '5. Direct Cash Benefit Disbursed',
                      desc: '₹1,500 monthly installment released directly via PFMS/DBT gateway.',
                      icon: IndianRupee,
                      stageIdx: 4,
                    },
                  ].map((stage) => {
                    const state = getStageStatus(selectedApp.status, stage.stageIdx);
                    const IconComp = stage.icon;

                    return (
                      <div
                        key={stage.title}
                        className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all ${
                          state === 'completed'
                            ? 'bg-white border-green-200'
                            : state === 'current'
                            ? 'bg-[#FFF9EB] border-[#FED65B] ring-1 ring-[#FED65B]'
                            : 'bg-[#EFEEEA]/60 border-[#E4E2DE] opacity-60'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            state === 'completed'
                              ? 'bg-green-600 text-white'
                              : state === 'current'
                              ? 'bg-[#5D0016] text-[#FFE088] animate-pulse'
                              : 'bg-[#E4E2DE] text-[#8C7071]'
                          }`}
                        >
                          {state === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <IconComp className="w-4 h-4" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs sm:text-sm text-[#1B1C1A]">
                              {stage.title}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                state === 'completed'
                                  ? 'bg-green-100 text-green-700'
                                  : state === 'current'
                                  ? 'bg-[#FED65B] text-[#735C00]'
                                  : 'bg-[#E4E2DE] text-[#8C7071]'
                              }`}
                            >
                              {state === 'completed'
                                ? 'Completed'
                                : state === 'current'
                                ? 'In Progress'
                                : 'Pending'}
                            </span>
                          </div>
                          <p className="text-xs text-[#584141] mt-0.5 leading-relaxed">
                            {stage.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Remarks */}
              <div className="p-4 rounded-xl bg-white border border-[#E0BFBF]/40 text-xs">
                <div className="font-bold text-[#5D0016] mb-1">Official Remark:</div>
                <p className="text-[#584141] leading-relaxed">
                  {selectedApp.statusDescription}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#EFEEEA] border-t border-[#E0BFBF]/30 flex items-center justify-between shrink-0">
          <div className="text-xs text-[#8C7071]">
            Need help regarding your status? Call <strong>181</strong>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#5D0016] text-[#FFE088] text-xs font-semibold hover:bg-[#800020] transition-colors cursor-pointer"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
