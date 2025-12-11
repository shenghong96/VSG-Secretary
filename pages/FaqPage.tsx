import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Simple fix for lint errors - explicit type for component
const FaqItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300 hover:shadow-md">
        <button
            onClick={onClick}
            className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
        >
            <span className="text-lg font-bold text-slate-900 dark:text-white">{question}</span>
            <span className={`material - symbols - outlined text - slate - 400 transition - transform duration - 300 ${isOpen ? 'rotate-180' : ''} `}>
                expand_more
            </span>
        </button>
        <div
            className={`grid transition - all duration - 300 ease -in -out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} `}
        >
            <div className="overflow-hidden">
                <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed text-[15px] faq-content" dangerouslySetInnerHTML={{ __html: answer }}></div>
            </div>
        </div>
    </div>
);

const FaqPage: React.FC = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', 'Company Incorporation', 'Secretarial Services', 'Billing & Payments', 'General'];

    // Retrieve FAQ items from translation file
    // Type assertion to help Typescript understand the structure
    const faqData = t('faqPage.items', { returnObjects: true }) as Array<{ q: string; a: string; category: string }>;

    const filteredFaqs = selectedCategory === 'All'
        ? faqData
        : faqData.filter(faq => faq.category === selectedCategory);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-6">{t('faqPage.hero.badge')}</span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
                        {t('faqPage.hero.title')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">{t('faqPage.hero.highlight')}</span>
                    </h1>
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat
                                    ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {filteredFaqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            question={faq.q}
                            answer={faq.a}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>

                <div className="mt-20 rounded-3xl bg-slate-900 p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/20 via-slate-900 to-slate-900"></div>
                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <h3 className="text-2xl font-bold text-white">Can't find an answer?</h3>
                        <p className="max-w-md text-lg text-slate-300">Our team is ready to assist you. We respond within 2 business hours.</p>
                        <Link to="/contact" className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-base font-bold text-slate-900 shadow-lg transition-all hover:scale-105 hover:bg-slate-50">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
