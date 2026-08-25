export type Language = 'en' | 'mr';

export interface ApplicantData {
  id: string;
  applicationNumber: string;
  fullName: string;
  marathiName?: string;
  dob: string;
  age: number;
  maritalStatus: 'married' | 'unmarried' | 'widowed' | 'divorced' | 'abandoned';
  aadhaarNumber: string;
  mobileNumber: string;
  district: string;
  taluka: string;
  village: string;
  pincode: string;
  address: string;
  rationCardType: 'yellow' | 'orange' | 'white' | 'none';
  rationCardNumber: string;
  annualIncome: number;
  hasIncomeCertificate: boolean;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  isAadhaarLinkedToBank: boolean;
  submittedAt: string;
  status: 'Submitted' | 'Under Scrutiny' | 'Aadhaar DBT Linked' | 'Approved' | 'Disbursed';
  statusDescription: string;
  currentInstallmentAmount: number;
  nextDisbursementDate: string;
  documentsUploaded: {
    aadhaarCard: boolean;
    rationCard: boolean;
    domicileCertificate: boolean;
    bankPassbook: boolean;
    photo: boolean;
  };
}

export type ActiveModal = 
  | null 
  | 'apply' 
  | 'status' 
  | 'eligibility-quiz' 
  | 'benefits' 
  | 'how-it-works' 
  | 'app-download' 
  | 'helpdesk' 
  | 'privacy' 
  | 'terms';
