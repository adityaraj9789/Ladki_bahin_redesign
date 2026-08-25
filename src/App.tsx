import React, { useState, useEffect } from 'react';
import { Language, ActiveModal, ApplicantData } from './types';
import { INITIAL_APPLICATIONS } from './data/districts';
import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { EligibilitySection } from './components/EligibilitySection';
import { SisterhoodQuoteSection } from './components/SisterhoodQuoteSection';
import { AppPromotionSection } from './components/AppPromotionSection';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { StatusTrackerModal } from './components/StatusTrackerModal';
import { EligibilityQuizModal } from './components/EligibilityQuizModal';
import { BenefitsModal } from './components/BenefitsModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { AppDownloadModal } from './components/AppDownloadModal';
import { HelpDeskModal } from './components/HelpDeskModal';
import { LegalModal } from './components/LegalModals';

const STORAGE_KEY = 'mlby_applications_v1';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [statusSearchQuery, setStatusSearchQuery] = useState<string>('');
  
  // Applications list in state + localStorage persistence
  const [applications, setApplications] = useState<ApplicantData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved applications', e);
    }
    return INITIAL_APPLICATIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    } catch (e) {
      console.error('Failed to save applications', e);
    }
  }, [applications]);

  const handleSaveApplication = (newApp: ApplicantData) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  const handleOpenStatusTracker = (appNumber: string) => {
    setStatusSearchQuery(appNumber);
    setActiveModal('status');
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F5F0] text-[#1B1C1A] selection:bg-[#FED65B] selection:text-[#5D0016]">
      {/* Top App Bar Header */}
      <Header
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenModal={setActiveModal}
      />

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        language={language}
        onOpenModal={setActiveModal}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          language={language}
          onOpenModal={setActiveModal}
        />

        {/* 2. Stats Section (1 Crore+ Benefitted) */}
        <StatsSection
          language={language}
          onOpenModal={setActiveModal}
        />

        {/* 3. Eligibility Section (Bento Grid) */}
        <EligibilitySection
          language={language}
          onOpenModal={setActiveModal}
        />

        {/* 4. Sisterhood Emotional Promise Section */}
        <SisterhoodQuoteSection
          language={language}
        />

        {/* 5. Nari Shakti Doot App Promotion */}
        <AppPromotionSection
          language={language}
          onOpenModal={setActiveModal}
        />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenModal={setActiveModal}
      />

      {/* Modals & Dialogs */}
      <ApplicationModal
        isOpen={activeModal === 'apply'}
        onClose={() => setActiveModal(null)}
        language={language}
        onSaveApplication={handleSaveApplication}
        onOpenStatusTracker={handleOpenStatusTracker}
      />

      <StatusTrackerModal
        isOpen={activeModal === 'status'}
        onClose={() => {
          setActiveModal(null);
          setStatusSearchQuery('');
        }}
        language={language}
        applications={applications}
        initialSearchQuery={statusSearchQuery}
        onOpenApply={() => setActiveModal('apply')}
      />

      <EligibilityQuizModal
        isOpen={activeModal === 'eligibility-quiz'}
        onClose={() => setActiveModal(null)}
        language={language}
        onProceedToApply={() => setActiveModal('apply')}
      />

      <BenefitsModal
        isOpen={activeModal === 'benefits'}
        onClose={() => setActiveModal(null)}
        language={language}
        onOpenApply={() => setActiveModal('apply')}
      />

      <HowItWorksModal
        isOpen={activeModal === 'how-it-works'}
        onClose={() => setActiveModal(null)}
        language={language}
        onOpenApply={() => setActiveModal('apply')}
        onOpenAppDownload={() => setActiveModal('app-download')}
      />

      <AppDownloadModal
        isOpen={activeModal === 'app-download'}
        onClose={() => setActiveModal(null)}
        language={language}
      />

      <HelpDeskModal
        isOpen={activeModal === 'helpdesk'}
        onClose={() => setActiveModal(null)}
        language={language}
      />

      <LegalModal
        type={activeModal === 'privacy' ? 'privacy' : 'terms'}
        isOpen={activeModal === 'privacy' || activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        language={language}
      />
    </div>
  );
}
