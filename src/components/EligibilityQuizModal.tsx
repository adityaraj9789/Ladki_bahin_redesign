import React, { useState } from 'react';
import { Language } from '../types';
import { 
  X, CheckCircle, XCircle, ArrowRight, ArrowLeft, RotateCcw, 
  HelpCircle, ShieldCheck, FileCheck, Sparkles 
} from 'lucide-react';

interface EligibilityQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onProceedToApply: () => void;
}

export const EligibilityQuizModal: React.FC<EligibilityQuizModalProps> = ({
  isOpen,
  onClose,
  language,
  onProceedToApply,
}) => {
  const [answers, setAnswers] = useState({
    isResident: true,
    ageRange: '21-65',
    incomeUnder25: true,
    rationCard: 'orange' as 'orange' | 'yellow' | 'white' | 'none',
    hasGovtJob: false,
    hasFourWheeler: false,
  });

  const [step, setStep] = useState<number>(1);

  if (!isOpen) return null;

  const isEligible = 
    answers.isResident &&
    answers.ageRange === '21-65' &&
    answers.incomeUnder25 &&
    !answers.hasGovtJob &&
    !answers.hasFourWheeler;

  const isIncomeWaived = answers.rationCard === 'orange' || answers.rationCard === 'yellow';

  const resetQuiz = () => {
    setAnswers({
      isResident: true,
      ageRange: '21-65',
      incomeUnder25: true,
      rationCard: 'orange',
      hasGovtJob: false,
      hasFourWheeler: false,
    });
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#332F2E]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#F9F5F0] w-full max-w-xl rounded-2xl shadow-2xl border border-[#E0BFBF]/40 overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#5D0016] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFE088] text-[#5D0016] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#FFE088]">
                {language === 'en' ? 'Quick Eligibility Self-Assessment' : 'त्वरित पात्रता स्व-तपासणी'}
              </h2>
              <p className="text-xs text-white/80">
                Answer 4 simple questions to verify your eligibility in 30 seconds
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

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-[#1B1C1A]">
          {step < 5 ? (
            <div className="space-y-5">
              
              {/* Question 1: Residency */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-[#8C7071] uppercase tracking-wider">
                    Question 1 of 4
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#5D0016]">
                    Are you a permanent resident of Maharashtra?
                  </h3>
                  <p className="text-xs text-[#584141]">
                    You must have a Maharashtra Domicile certificate, 15-year Ration Card, School Leaving Certificate, or Voter ID from Maharashtra.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => {
                        setAnswers({ ...answers, isResident: true });
                        setStep(2);
                      }}
                      className={`p-4 rounded-xl border-2 font-semibold text-sm transition-all cursor-pointer text-center ${
                        answers.isResident
                          ? 'bg-[#FFF9EB] border-[#5D0016] text-[#5D0016] shadow-xs'
                          : 'bg-white border-[#E0BFBF]/40 text-[#584141] hover:border-[#5D0016]'
                      }`}
                    >
                      Yes, Resident of Maharashtra
                    </button>

                    <button
                      onClick={() => {
                        setAnswers({ ...answers, isResident: false });
                        setStep(2);
                      }}
                      className={`p-4 rounded-xl border-2 font-semibold text-sm transition-all cursor-pointer text-center ${
                        !answers.isResident
                          ? 'bg-[#FFF9EB] border-[#5D0016] text-[#5D0016] shadow-xs'
                          : 'bg-white border-[#E0BFBF]/40 text-[#584141] hover:border-[#5D0016]'
                      }`}
                    >
                      No, Other State
                    </button>
                  </div>
                </div>
              )}

              {/* Question 2: Age */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-[#8C7071] uppercase tracking-wider">
                    Question 2 of 4
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#5D0016]">
                    What is your current age?
                  </h3>
                  <p className="text-xs text-[#584141]">
                    Eligible age group is 21 to 65 years (Married, Unmarried, Widowed, Divorced, or Abandoned women).
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <button
                      onClick={() => {
                        setAnswers({ ...answers, ageRange: 'under-21' });
                        setStep(3);
                      }}
                      className="p-3.5 rounded-xl bg-white border border-[#E0BFBF] hover:border-[#5D0016] text-xs font-semibold text-[#584141] transition-all cursor-pointer"
                    >
                      Below 21 Years
                    </button>

                    <button
                      onClick={() => {
                        setAnswers({ ...answers, ageRange: '21-65' });
                        setStep(3);
                      }}
                      className="p-3.5 rounded-xl bg-[#FFF9EB] border-2 border-[#5D0016] text-xs font-bold text-[#5D0016] transition-all cursor-pointer shadow-xs"
                    >
                      Between 21 and 65 Years (Eligible)
                    </button>

                    <button
                      onClick={() => {
                        setAnswers({ ...answers, ageRange: 'above-65' });
                        setStep(3);
                      }}
                      className="p-3.5 rounded-xl bg-white border border-[#E0BFBF] hover:border-[#5D0016] text-xs font-semibold text-[#584141] transition-all cursor-pointer"
                    >
                      Above 65 Years
                    </button>
                  </div>
                </div>
              )}

              {/* Question 3: Income */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-[#8C7071] uppercase tracking-wider">
                    Question 3 of 4
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#5D0016]">
                    Is your total family annual income up to ₹2.5 Lakh?
                  </h3>
                  <p className="text-xs text-[#584141]">
                    Total combined household income across all sources must not exceed ₹2,50,000 per year.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => {
                        setAnswers({ ...answers, incomeUnder25: true });
                        setStep(4);
                      }}
                      className="p-4 rounded-xl bg-[#FFF9EB] border-2 border-[#5D0016] font-bold text-xs sm:text-sm text-[#5D0016] transition-all cursor-pointer shadow-xs text-center"
                    >
                      Yes, Below ₹2.5 Lakh
                    </button>

                    <button
                      onClick={() => {
                        setAnswers({ ...answers, incomeUnder25: false });
                        setStep(4);
                      }}
                      className="p-4 rounded-xl bg-white border border-[#E0BFBF] hover:border-[#5D0016] font-semibold text-xs sm:text-sm text-[#584141] transition-all cursor-pointer text-center"
                    >
                      No, Above ₹2.5 Lakh
                    </button>
                  </div>
                </div>
              )}

              {/* Question 4: Ration Card */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-[#8C7071] uppercase tracking-wider">
                    Question 4 of 4
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#5D0016]">
                    What color is your family's Ration Card?
                  </h3>
                  <p className="text-xs text-[#584141]">
                    Orange & Yellow ration card holders do NOT require a Tehsildar income certificate.
                  </p>

                  <div className="space-y-2 pt-1">
                    {[
                      { type: 'orange', label: 'Orange Ration Card (केशरी रेशनकार्ड) - Income Proof Waived' },
                      { type: 'yellow', label: 'Yellow Ration Card (पिवळे रेशनकार्ड) - Income Proof Waived' },
                      { type: 'white', label: 'White Ration Card (पांढरे रेशनकार्ड)' },
                      { type: 'none', label: 'No Ration Card (Need Income Certificate)' },
                    ].map((rc) => (
                      <button
                        key={rc.type}
                        onClick={() => {
                          setAnswers({ ...answers, rationCard: rc.type as any });
                          setStep(5);
                        }}
                        className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          answers.rationCard === rc.type
                            ? 'bg-[#FFF9EB] border-[#5D0016] text-[#5D0016]'
                            : 'bg-white border-[#E0BFBF]/40 text-[#584141] hover:border-[#5D0016]'
                        }`}
                      >
                        <span>{rc.label}</span>
                        <ArrowRight className="w-4 h-4 text-[#5D0016]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-5 text-center py-2">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm ${
                  isEligible ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}
              >
                {isEligible ? <CheckCircle className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
              </div>

              <div>
                <h3 className="font-serif font-bold text-2xl text-[#5D0016]">
                  {isEligible ? 'Congratulations! You are Eligible' : 'Eligibility Check Result'}
                </h3>
                <p className="text-xs sm:text-sm text-[#584141] mt-1 max-w-md mx-auto leading-relaxed">
                  {isEligible
                    ? 'You meet the eligibility criteria for Majhi Ladki Bahin Yojana and can receive ₹1,500 direct cash-transfer monthly.'
                    : 'You may not fully meet all standard criteria based on the answers provided. Please check the requirements below.'}
                </p>
              </div>

              {/* Requirement breakdown */}
              <div className="bg-white rounded-2xl p-4 border border-[#E0BFBF]/40 text-left text-xs space-y-2 text-[#584141] soft-shadow">
                <div className="font-bold text-[#5D0016] uppercase tracking-wider text-[11px] mb-2">
                  Criteria Summary
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#EFEEEA]">
                  <span>Maharashtra Resident:</span>
                  <span className={answers.isResident ? 'text-green-700 font-bold' : 'text-red-600 font-bold'}>
                    {answers.isResident ? '✓ Verified' : '✗ Required'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#EFEEEA]">
                  <span>Age Group (21-65 yrs):</span>
                  <span className={answers.ageRange === '21-65' ? 'text-green-700 font-bold' : 'text-red-600 font-bold'}>
                    {answers.ageRange === '21-65' ? '✓ Eligible' : '✗ Not in range'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#EFEEEA]">
                  <span>Family Income ≤ ₹2.5 Lakh:</span>
                  <span className={answers.incomeUnder25 ? 'text-green-700 font-bold' : 'text-red-600 font-bold'}>
                    {answers.incomeUnder25 ? '✓ Under limit' : '✗ Exceeds limit'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span>Income Certificate Requirement:</span>
                  <span className="text-[#5D0016] font-bold">
                    {isIncomeWaived ? '✓ Waived (Orange/Yellow Card)' : 'Certificate Needed'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                {isEligible && (
                  <button
                    onClick={() => {
                      onClose();
                      onProceedToApply();
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#5D0016] text-[#FFE088] text-xs sm:text-sm font-bold hover:bg-[#800020] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#FED65B]" />
                    <span>Proceed to Fill DBT Application</span>
                  </button>
                )}

                <button
                  onClick={resetQuiz}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-white border border-[#8C7071] text-[#584141] text-xs font-semibold hover:bg-[#F5F3EF] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Step buttons */}
        {step < 5 && (
          <div className="p-4 bg-[#EFEEEA] border-t border-[#E0BFBF]/30 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                onClick={() => setStep((prev) => prev - 1)}
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#8C7071] text-xs font-semibold text-[#584141] hover:bg-[#F5F3EF] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}

            <span className="text-xs text-[#8C7071] font-medium">Step {step} of 4</span>
          </div>
        )}
      </div>
    </div>
  );
};
