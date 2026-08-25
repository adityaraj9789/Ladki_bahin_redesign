import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { HeartHandshake, Sparkles } from 'lucide-react';

interface SisterhoodQuoteSectionProps {
  language: Language;
}

export const SisterhoodQuoteSection: React.FC<SisterhoodQuoteSectionProps> = ({
  language,
}) => {
  const t = translations[language];

  return (
    <section className="px-4 sm:px-6 pb-12 sm:pb-16 max-w-4xl mx-auto">
      <div className="bg-[#FED65B]/20 rounded-2xl p-6 sm:p-10 text-center relative border border-[#FED65B]/40 soft-shadow">
        {/* Central Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FED65B]/40 text-[#735C00] mb-4 shadow-xs">
          <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
        </div>

        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#5D0016] mb-4">
          {t.sisterhoodPromiseTitle}
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#584141] italic max-w-2xl mx-auto leading-relaxed">
          {t.sisterhoodPromiseQuote}
        </p>

        {/* Small cultural motif badge */}
        <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#735C00] uppercase tracking-wider">
          <span className="w-8 h-[1px] bg-[#735C00]/40"></span>
          <span>Shasan Aplya Dari • Matru-Bandhu Sanman</span>
          <span className="w-8 h-[1px] bg-[#735C00]/40"></span>
        </div>
      </div>
    </section>
  );
};
