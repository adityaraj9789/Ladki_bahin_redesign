import React, { useState } from 'react';
import { Language, ApplicantData } from '../types';
import { MAHARASHTRA_DISTRICTS } from '../data/districts';
import { 
  X, Check, AlertCircle, ShieldCheck, ArrowLeft, ArrowRight, 
  FileText, Landmark, User, Home, Award, Printer, Copy, CheckCircle2, Search 
} from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSaveApplication: (applicant: ApplicantData) => void;
  onOpenStatusTracker: (appNumber: string) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  language,
  onSaveApplication,
  onOpenStatusTracker,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>('');
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedApp, setSubmittedApp] = useState<ApplicantData | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    marathiName: '',
    dob: '1992-05-15',
    maritalStatus: 'married' as 'married' | 'unmarried' | 'widowed' | 'divorced' | 'abandoned',
    aadhaarNumber: '',
    mobileNumber: '',
    district: 'Pune',
    taluka: 'Haveli',
    village: '',
    pincode: '',
    address: '',
    rationCardType: 'orange' as 'yellow' | 'orange' | 'white' | 'none',
    rationCardNumber: '',
    annualIncome: '120000',
    hasIncomeCertificate: false,
    bankName: 'State Bank of India',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: 'SBIN0001234',
    isAadhaarLinkedToBank: true,
    agreedToTerms: false,
    docAadhaar: true,
    docRation: true,
    docDomicile: true,
    docBank: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const calculateAge = (dobString: string): number => {
    const birthday = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  };

  const calculatedAge = calculateAge(formData.dob);

  const handleSendOtp = () => {
    if (!formData.aadhaarNumber || formData.aadhaarNumber.replace(/\D/g, '').length !== 12) {
      setErrors((prev) => ({ ...prev, aadhaarNumber: 'Please enter a valid 12-digit Aadhaar number.' }));
      return;
    }
    if (!formData.mobileNumber || formData.mobileNumber.replace(/\D/g, '').length !== 10) {
      setErrors((prev) => ({ ...prev, mobileNumber: 'Please enter a valid 10-digit mobile number.' }));
      return;
    }
    setErrors({});
    setIsOtpSent(true);
    setOtpValue('4582'); // auto-fill demo hint
  };

  const handleVerifyOtp = () => {
    if (otpValue === '4582' || otpValue.length === 4 || otpValue.length === 6) {
      setIsOtpVerified(true);
      setOtpError('');
    } else {
      setOtpError('Invalid OTP. Please enter 4582 or 4-digit code.');
    }
  };

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Full name as per Aadhaar is required.';
      if (calculatedAge < 21 || calculatedAge > 65) {
        errs.dob = `Age must be between 21 and 65 years. Current age: ${calculatedAge} years.`;
      }
      if (!formData.aadhaarNumber || formData.aadhaarNumber.replace(/\D/g, '').length !== 12) {
        errs.aadhaarNumber = '12-digit Aadhaar number is required.';
      }
      if (!formData.mobileNumber || formData.mobileNumber.replace(/\D/g, '').length !== 10) {
        errs.mobileNumber = '10-digit mobile number is required.';
      }
      if (!isOtpVerified) {
        errs.otp = 'Please verify OTP sent to Aadhaar-linked mobile.';
      }
    } else if (step === 2) {
      if (!formData.district) errs.district = 'District is required.';
      if (!formData.taluka.trim()) errs.taluka = 'Taluka is required.';
      if (!formData.village.trim()) errs.village = 'Village / City / Ward is required.';
      if (!formData.pincode.trim() || formData.pincode.length !== 6) errs.pincode = 'Valid 6-digit Pincode required.';
      if (!formData.address.trim()) errs.address = 'Full address is required.';
    } else if (step === 3) {
      if (!formData.rationCardNumber.trim()) errs.rationCardNumber = 'Ration card number is required.';
      const income = Number(formData.annualIncome);
      if (isNaN(income) || income <= 0) errs.annualIncome = 'Valid annual family income required.';
      if (income > 250000) errs.annualIncome = 'Family income must be below ₹2.5 Lakh (₹2,50,000).';
    } else if (step === 4) {
      if (!formData.bankName.trim()) errs.bankName = 'Bank name is required.';
      if (!formData.accountNumber.trim()) errs.accountNumber = 'Bank account number is required.';
      if (formData.accountNumber !== formData.confirmAccountNumber) {
        errs.confirmAccountNumber = 'Account numbers do not match.';
      }
      if (!formData.ifscCode.trim() || formData.ifscCode.length < 8) errs.ifscCode = 'Valid IFSC code required.';
      if (!formData.isAadhaarLinkedToBank) {
        errs.isAadhaarLinkedToBank = 'Aadhaar seeding is mandatory for DBT cash transfer.';
      }
    } else if (step === 5) {
      if (!formData.agreedToTerms) {
        errs.agreedToTerms = 'You must accept the self-declaration to submit.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const appNumber = `MLBY-2024-MH-${randomNum}`;

      const newApp: ApplicantData = {
        id: `app-${Date.now()}`,
        applicationNumber: appNumber,
        fullName: formData.fullName,
        marathiName: formData.marathiName || formData.fullName,
        dob: formData.dob,
        age: calculatedAge,
        maritalStatus: formData.maritalStatus,
        aadhaarNumber: `XXXX-XXXX-${formData.aadhaarNumber.slice(-4)}`,
        mobileNumber: formData.mobileNumber,
        district: formData.district,
        taluka: formData.taluka,
        village: formData.village,
        pincode: formData.pincode,
        address: formData.address,
        rationCardType: formData.rationCardType,
        rationCardNumber: formData.rationCardNumber,
        annualIncome: Number(formData.annualIncome),
        hasIncomeCertificate: formData.hasIncomeCertificate || formData.rationCardType === 'orange' || formData.rationCardType === 'yellow',
        bankName: formData.bankName,
        accountNumber: `XXXXXX${formData.accountNumber.slice(-4)}`,
        ifscCode: formData.ifscCode.toUpperCase(),
        isAadhaarLinkedToBank: formData.isAadhaarLinkedToBank,
        submittedAt: new Date().toISOString().split('T')[0],
        status: 'Submitted',
        statusDescription: 'Application successfully received. Scheduled for Anganwadi & District Committee scrutiny.',
        currentInstallmentAmount: 1500,
        nextDisbursementDate: '15th of Next Month',
        documentsUploaded: {
          aadhaarCard: formData.docAadhaar,
          rationCard: formData.docRation,
          domicileCertificate: formData.docDomicile,
          bankPassbook: formData.docBank,
          photo: true,
        }
      };

      onSaveApplication(newApp);
      setSubmittedApp(newApp);
      setIsSubmitting(false);
      setCurrentStep(6);
    }, 1200);
  };

  const copyAppNumber = () => {
    if (submittedApp) {
      navigator.clipboard.writeText(submittedApp.applicationNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#332F2E]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#F9F5F0] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#E0BFBF]/40 overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#5D0016] to-[#3D000F] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFE088] text-[#5D0016] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#FFE088]">
                {language === 'en' ? 'Majhi Ladki Bahin Yojana - Online DBT Application' : 'माझी लाडकी बहीण योजना - थेट डीबीटी अर्ज'}
              </h2>
              <p className="text-xs text-white/80">
                Government of Maharashtra • Monthly ₹1,500 Cash Transfer
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

        {/* Progress Stepper (Steps 1 to 5) */}
        {currentStep <= 5 && (
          <div className="bg-[#EFEEEA] px-4 py-3 border-b border-[#E0BFBF]/30 shrink-0">
            <div className="flex items-center justify-between max-w-xl mx-auto text-xs font-semibold">
              {[
                { num: 1, label: 'Identity & Aadhaar' },
                { num: 2, label: 'Address' },
                { num: 3, label: 'Ration & Income' },
                { num: 4, label: 'Bank DBT' },
                { num: 5, label: 'Verify' },
              ].map((step) => (
                <div key={step.num} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep === step.num
                        ? 'bg-[#5D0016] text-[#FFE088] ring-2 ring-[#5D0016]/30'
                        : currentStep > step.num
                        ? 'bg-[#735C00] text-white'
                        : 'bg-[#E4E2DE] text-[#8C7071]'
                    }`}
                  >
                    {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
                  </div>
                  <span
                    className={`hidden sm:inline text-[10px] ${
                      currentStep === step.num ? 'text-[#5D0016] font-bold' : 'text-[#8C7071]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-[#1B1C1A]">
          
          {/* STEP 1: Identity & Aadhaar */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="bg-[#FFF9EB] p-3 rounded-xl border border-[#FED65B]/60 text-xs text-[#735C00] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  Women aged between <strong>21 and 65 years</strong> residing in Maharashtra are eligible. Aadhaar authentication is mandatory.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                  Full Name of Woman Applicant (As per Aadhaar Card) *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Smt. Sunita Rajesh Kadam"
                  className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none focus:bg-[#FFF9EB]"
                />
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2 text-sm focus:outline-none"
                  />
                  <p className="text-[11px] text-[#8C7071] mt-1">
                    Calculated Age: <strong>{calculatedAge} years</strong> (Must be 21-65)
                  </p>
                  {errors.dob && <p className="text-xs text-red-600 mt-1">{errors.dob}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    Marital Status *
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value as any })}
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none"
                  >
                    <option value="married">Married (विवाहित)</option>
                    <option value="unmarried">Unmarried (अविवाहित - 21+ yrs)</option>
                    <option value="widowed">Widowed (विधवा)</option>
                    <option value="divorced">Divorced (घटस्फोटित)</option>
                    <option value="abandoned">Destitute / Abandoned (परित्यक्त्या)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    12-Digit Aadhaar Number *
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    value={formData.aadhaarNumber}
                    onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value.replace(/\D/g, '') })}
                    placeholder="e.g. 589234819012"
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none tracking-widest font-mono"
                  />
                  {errors.aadhaarNumber && <p className="text-xs text-red-600 mt-1">{errors.aadhaarNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    Mobile Number (Aadhaar-Linked) *
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })}
                    placeholder="e.g. 9823456789"
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none font-mono"
                  />
                  {errors.mobileNumber && <p className="text-xs text-red-600 mt-1">{errors.mobileNumber}</p>}
                </div>
              </div>

              {/* OTP Simulation Block */}
              <div className="bg-[#EFEEEA] p-4 rounded-xl border border-[#E0BFBF]/40">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-[#5D0016]">Aadhaar e-KYC Verification</div>
                    <div className="text-[11px] text-[#584141]">
                      Click below to receive instant verification OTP on your mobile number.
                    </div>
                  </div>

                  {!isOtpVerified ? (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-4 py-1.5 rounded-full bg-[#5D0016] text-[#FFE088] text-xs font-semibold hover:bg-[#800020] transition-colors cursor-pointer"
                    >
                      {isOtpSent ? 'Resend OTP' : 'Send OTP'}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4" /> Aadhaar Verified
                    </span>
                  )}
                </div>

                {isOtpSent && !isOtpVerified && (
                  <div className="mt-3 pt-3 border-t border-[#E0BFBF]/40 flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value)}
                      placeholder="Enter OTP (demo: 4582)"
                      className="bg-white border border-[#8C7071] rounded-lg px-3 py-1.5 text-xs w-44 tracking-widest font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="px-3 py-1.5 rounded-lg bg-green-700 text-white text-xs font-semibold hover:bg-green-800 transition-colors cursor-pointer"
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
                {otpError && <p className="text-xs text-red-600 mt-1">{otpError}</p>}
                {errors.otp && <p className="text-xs text-red-600 mt-1">{errors.otp}</p>}
              </div>
            </div>
          )}

          {/* STEP 2: Address & Location */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    Maharashtra District *
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none"
                  >
                    {MAHARASHTRA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    Taluka / Tehsil *
                  </label>
                  <input
                    type="text"
                    value={formData.taluka}
                    onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                    placeholder="e.g. Haveli, Baramati, Karvir..."
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none"
                  />
                  {errors.taluka && <p className="text-xs text-red-600 mt-1">{errors.taluka}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    Village / Town / Ward *
                  </label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder="e.g. Wagholi, Ward No. 4"
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none"
                  />
                  {errors.village && <p className="text-xs text-red-600 mt-1">{errors.village}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    6-Digit Pincode *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                    placeholder="e.g. 412207"
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none font-mono"
                  />
                  {errors.pincode && <p className="text-xs text-red-600 mt-1">{errors.pincode}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                  Full Residential Address in Maharashtra *
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House number, building/chawl, landmark..."
                  className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2 text-sm focus:outline-none"
                />
                {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
              </div>
            </div>
          )}

          {/* STEP 3: Ration Card & Income */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="bg-[#FFF9EB] p-3 rounded-xl border border-[#FED65B]/60 text-xs text-[#735C00] leading-relaxed">
                <strong>Government GR Rule:</strong> If you hold an <strong>Orange (केशरी)</strong> or <strong>Yellow (पिवळे)</strong> Ration Card, you do NOT need to submit a separate Tehsildar Income Certificate!
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    Ration Card Type *
                  </label>
                  <select
                    value={formData.rationCardType}
                    onChange={(e) => setFormData({ ...formData, rationCardType: e.target.value as any })}
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none font-semibold"
                  >
                    <option value="orange">Orange Ration Card (केशरी रेशनकार्ड) - Income Proof Waived</option>
                    <option value="yellow">Yellow Ration Card (पिवळे रेशनकार्ड / BPL) - Income Proof Waived</option>
                    <option value="white">White Ration Card (पांढरे रेशनकार्ड - Requires Income Cert)</option>
                    <option value="none">No Ration Card (Requires Tehsildar Income Certificate)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    Ration Card Number / SRC No. *
                  </label>
                  <input
                    type="text"
                    value={formData.rationCardNumber}
                    onChange={(e) => setFormData({ ...formData, rationCardNumber: e.target.value })}
                    placeholder="e.g. 272048910293"
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none font-mono"
                  />
                  {errors.rationCardNumber && <p className="text-xs text-red-600 mt-1">{errors.rationCardNumber}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    Total Annual Family Income (in ₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.annualIncome}
                    onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                    placeholder="e.g. 120000"
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none font-mono"
                  />
                  <p className="text-[11px] text-[#8C7071] mt-1">Must be equal to or less than ₹2,50,000 / year.</p>
                  {errors.annualIncome && <p className="text-xs text-red-600 mt-1">{errors.annualIncome}</p>}
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs text-[#584141] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasIncomeCertificate || formData.rationCardType === 'orange' || formData.rationCardType === 'yellow'}
                      onChange={(e) => setFormData({ ...formData, hasIncomeCertificate: e.target.checked })}
                      className="rounded text-[#5D0016] focus:ring-[#5D0016]"
                    />
                    <span>Income Certificate available or waived via Orange/Yellow ration card</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Bank Account & DBT */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="bg-[#FFF9EB] p-3 rounded-xl border border-[#FED65B]/60 text-xs text-[#735C00] leading-relaxed">
                <strong>Direct Benefit Transfer (DBT) Mandate:</strong> Funds will be transferred directly to the woman applicant's Aadhaar-seeded bank account. Joint accounts with husband/relatives are permitted if woman is primary holder.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    placeholder="e.g. State Bank of India, Bank of Maharashtra"
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none"
                  />
                  {errors.bankName && <p className="text-xs text-red-600 mt-1">{errors.bankName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    Bank IFSC Code *
                  </label>
                  <input
                    type="text"
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                    placeholder="e.g. SBIN0001234"
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none font-mono uppercase"
                  />
                  {errors.ifscCode && <p className="text-xs text-red-600 mt-1">{errors.ifscCode}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    Bank Account Number *
                  </label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, '') })}
                    placeholder="e.g. 30894218901"
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none font-mono"
                  />
                  {errors.accountNumber && <p className="text-xs text-red-600 mt-1">{errors.accountNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#584141] mb-1 uppercase tracking-wider">
                    Re-Enter Account Number *
                  </label>
                  <input
                    type="text"
                    value={formData.confirmAccountNumber}
                    onChange={(e) => setFormData({ ...formData, confirmAccountNumber: e.target.value.replace(/\D/g, '') })}
                    placeholder="Re-enter to confirm"
                    className="w-full bg-white border-b-2 border-[#5D0016] rounded-t-lg px-3 py-2.5 text-sm focus:outline-none font-mono"
                  />
                  {errors.confirmAccountNumber && (
                    <p className="text-xs text-red-600 mt-1">{errors.confirmAccountNumber}</p>
                  )}
                </div>
              </div>

              <div className="p-3.5 bg-[#EFEEEA] rounded-xl border border-[#E0BFBF]/40">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAadhaarLinkedToBank}
                    onChange={(e) => setFormData({ ...formData, isAadhaarLinkedToBank: e.target.checked })}
                    className="mt-0.5 rounded text-[#5D0016] focus:ring-[#5D0016]"
                  />
                  <div className="text-xs text-[#1B1C1A]">
                    <strong>My Bank Account is Aadhaar-Seeded (NPCI Mapped)</strong>
                    <p className="text-[11px] text-[#584141] mt-0.5">
                      I confirm that my Aadhaar is linked to this bank account to receive the ₹1,500 direct cash-transfer every month.
                    </p>
                  </div>
                </label>
                {errors.isAadhaarLinkedToBank && (
                  <p className="text-xs text-red-600 mt-1 ml-6">{errors.isAadhaarLinkedToBank}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: Verification & Documents */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-[#5D0016]">
                Application Summary & Self-Declaration
              </h3>

              <div className="bg-white rounded-xl p-4 border border-[#E0BFBF]/40 text-xs space-y-2 text-[#584141]">
                <div className="flex justify-between py-1 border-b border-[#EFEEEA]">
                  <span>Applicant Name:</span>
                  <strong className="text-[#1B1C1A]">{formData.fullName}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EFEEEA]">
                  <span>Age & Marital Status:</span>
                  <strong className="text-[#1B1C1A]">{calculatedAge} yrs • {formData.maritalStatus}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EFEEEA]">
                  <span>Aadhaar Number:</span>
                  <strong className="text-[#1B1C1A]">XXXX-XXXX-{formData.aadhaarNumber.slice(-4)} (Verified)</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EFEEEA]">
                  <span>District & Taluka:</span>
                  <strong className="text-[#1B1C1A]">{formData.district}, {formData.taluka}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EFEEEA]">
                  <span>Ration Card & Income:</span>
                  <strong className="text-[#1B1C1A]">{formData.rationCardType.toUpperCase()} • ₹{Number(formData.annualIncome).toLocaleString()}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span>Bank & DBT Account:</span>
                  <strong className="text-[#1B1C1A]">{formData.bankName} (XXXXXX{formData.accountNumber.slice(-4)})</strong>
                </div>
              </div>

              {/* Document Checklist */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#5D0016] uppercase tracking-wider">
                  Mandatory Enclosures (Self-Attested)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E0BFBF]/30">
                    <input
                      type="checkbox"
                      checked={formData.docAadhaar}
                      onChange={(e) => setFormData({ ...formData, docAadhaar: e.target.checked })}
                      className="rounded text-[#5D0016]"
                    />
                    <span>Aadhaar Card Copy</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E0BFBF]/30">
                    <input
                      type="checkbox"
                      checked={formData.docRation}
                      onChange={(e) => setFormData({ ...formData, docRation: e.target.checked })}
                      className="rounded text-[#5D0016]"
                    />
                    <span>Ration Card Copy (Orange/Yellow)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E0BFBF]/30">
                    <input
                      type="checkbox"
                      checked={formData.docDomicile}
                      onChange={(e) => setFormData({ ...formData, docDomicile: e.target.checked })}
                      className="rounded text-[#5D0016]"
                    />
                    <span>Maharashtra Domicile / 15yr Proof</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E0BFBF]/30">
                    <input
                      type="checkbox"
                      checked={formData.docBank}
                      onChange={(e) => setFormData({ ...formData, docBank: e.target.checked })}
                      className="rounded text-[#5D0016]"
                    />
                    <span>Bank Passbook Front Page</span>
                  </label>
                </div>
              </div>

              {/* Self Declaration Checkbox */}
              <div className="p-3.5 bg-[#EFEEEA] rounded-xl border border-[#E0BFBF]/40">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                    className="mt-0.5 rounded text-[#5D0016] focus:ring-[#5D0016]"
                  />
                  <span className="text-[11px] text-[#1B1C1A] leading-relaxed">
                    I solemnly affirm that all details submitted by me under <strong>Majhi Ladki Bahin Yojana</strong> are true and correct to the best of my knowledge. My family annual income does not exceed ₹2.5 Lakh, and I am a resident of Maharashtra.
                  </span>
                </label>
                {errors.agreedToTerms && <p className="text-xs text-red-600 mt-1 ml-5">{errors.agreedToTerms}</p>}
              </div>
            </div>
          )}

          {/* STEP 6: Submission Success Slip */}
          {currentStep === 6 && submittedApp && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  Application Submitted Successfully
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#5D0016] mt-2">
                  धन्यवाद / Thank You!
                </h3>
                <p className="text-xs sm:text-sm text-[#584141] mt-1 max-w-md mx-auto">
                  Your application for <strong>Majhi Ladki Bahin Yojana</strong> has been registered. Please save your application number for status tracking.
                </p>
              </div>

              {/* Application ID Card */}
              <div className="bg-white rounded-2xl p-5 border-2 border-[#5D0016]/20 max-w-md mx-auto soft-shadow text-left">
                <div className="text-[11px] font-bold text-[#8C7071] uppercase tracking-wider">
                  Official Application Number
                </div>
                <div className="flex items-center justify-between gap-2 mt-1 mb-3">
                  <span className="font-mono font-bold text-lg sm:text-xl text-[#5D0016] tracking-wider">
                    {submittedApp.applicationNumber}
                  </span>
                  <button
                    onClick={copyAppNumber}
                    className="p-1.5 rounded-lg bg-[#EFEEEA] hover:bg-[#E4E2DE] text-[#5D0016] transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
                    title="Copy Application Number"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-[#EFEEEA] text-xs space-y-1 text-[#584141]">
                  <div><strong>Applicant:</strong> {submittedApp.fullName}</div>
                  <div><strong>District:</strong> {submittedApp.district}</div>
                  <div><strong>Status:</strong> <span className="text-amber-700 font-semibold">{submittedApp.status}</span></div>
                  <div><strong>Expected Monthly DBT:</strong> <strong className="text-green-700">₹1,500 / Month</strong></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenStatusTracker(submittedApp.applicationNumber);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#5D0016] text-[#FFE088] text-xs sm:text-sm font-semibold hover:bg-[#800020] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>Track Status Now</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white border border-[#5D0016] text-[#5D0016] text-xs sm:text-sm font-semibold hover:bg-[#F5F3EF] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {currentStep <= 5 && (
          <div className="p-4 bg-[#EFEEEA] border-t border-[#E0BFBF]/30 flex items-center justify-between shrink-0">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 rounded-full bg-white border border-[#8C7071] text-[#584141] text-xs font-semibold hover:bg-[#F5F3EF] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-[#5D0016] text-[#FFE088] text-xs sm:text-sm font-bold hover:bg-[#800020] flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-full bg-[#5D0016] text-[#FFE088] text-xs sm:text-sm font-bold hover:bg-[#800020] flex items-center gap-1.5 transition-colors cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#FED65B]" />
                    <span>Submit Official Application</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
