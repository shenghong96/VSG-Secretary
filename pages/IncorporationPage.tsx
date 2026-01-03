import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FeeCalculator from '../components/FeeCalculator';
import SEO from '../components/SEO';

interface Feature {
    title: string;
    text: string;
    icon: string;
}

interface Step {
    num: number;
    title: string;
    text: string;
}

interface ChecklistItem {
    item: string;
    desc: string;
}

interface Faq {
    category: string;
    question: string;
    answer: string;
}

const IncorporationPage: React.FC = () => {
    const { t } = useTranslation();
    const [faqFilter, setFaqFilter] = useState("All");

    const features = t('incorporationPage.features.list', { returnObjects: true }) as Feature[];
    const steps = t('incorporationPage.steps.list', { returnObjects: true }) as Step[];

    // Checklist items need to be handled carefully as they are nested
    const checklistImmediate = t('incorporationPage.checklist.immediate.items', { returnObjects: true }) as ChecklistItem[];
    const checklistOngoing = t('incorporationPage.checklist.ongoing.items', { returnObjects: true }) as ChecklistItem[];

    const checklistItems = {
        immediate: Array.isArray(checklistImmediate) ? checklistImmediate : [],
        ongoing: Array.isArray(checklistOngoing) ? checklistOngoing : []
    };

    const faqs = t('incorporationPage.faq.list', { returnObjects: true }) as Faq[];

    const pricingItems = t('incorporationPage.pricing.items', { returnObjects: true }) as string[];

    // Ensure faqs is an array to avoid errors if translation fails or returns object
    const safeFaqs = Array.isArray(faqs) ? faqs : [];

    const filteredFaqs = faqFilter === "All" ? safeFaqs : safeFaqs.filter(f => f.category === faqFilter);
    const categories = ["All", ...new Set(safeFaqs.map(f => f.category))];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": safeFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <SEO
                title="Company Incorporation in Malaysia"
                description="Fast and reliable Sdn Bhd company incorporation services. 100% online process available."
                canonical="https://www.vsg-secretary.com/incorporation"
                jsonLd={faqSchema}
            />
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-6xl mb-6">
                        {t('incorporationPage.hero.title')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">{t('incorporationPage.hero.highlight')}</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10">
                        {t('incorporationPage.hero.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/incorporation#pricing" className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:bg-primary-hover hover:shadow-glow">
                            {t('incorporationPage.hero.cta')}
                        </Link>
                        <Link to="/contact" className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 border border-slate-200 px-8 py-4 text-base font-bold shadow-sm transition-all hover:bg-slate-50 dark:bg-slate-900 dark:text-white dark:border-slate-800 dark:hover:bg-slate-800">
                            {t('incorporationPage.hero.consultation')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose VSG */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('incorporationPage.features.title')}</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t('incorporationPage.features.subtitle')}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.isArray(features) && features.map((feature, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700">
                                <span className="material-symbols-outlined text-4xl text-primary mb-4">{feature.icon}</span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto rounded-3xl bg-white shadow-xl dark:bg-slate-900 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800 flex flex-col md:flex-row">
                        <div className="flex flex-col justify-center items-center p-12 bg-slate-900 text-white md:w-2/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">PROMO</div>
                            <h3 className="text-2xl font-bold mb-2">{t('incorporationPage.pricing.title')}</h3>
                            <p className="text-slate-400 text-center text-sm mb-6">{t('incorporationPage.pricing.description')}</p>

                            <div className="text-center mb-6">
                                <span className="line-through text-slate-500 text-lg">{t('incorporationPage.pricing.origPrice')}</span>
                                <div className="text-5xl font-black tracking-tight mt-1 text-white">{t('incorporationPage.pricing.price')}</div>
                            </div>

                            <Link to="/contact" className="w-full text-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover hover:scale-105">
                                {t('incorporationPage.pricing.cta')}
                            </Link>
                        </div>
                        <div className="flex-1 p-12 bg-white dark:bg-slate-900">
                            <ul className="grid grid-cols-1 gap-4 text-sm">
                                {Array.isArray(pricingItems) && pricingItems.map((item, idx) => (
                                    <li key={idx} className="flex gap-3 text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Secretary Services Add-on (Reused from Pricing) */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Our Secretary Services Package</h2>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Can be selected if you choose on the pricing page earlier.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Basic Plan */}
                        <div className="flex flex-col rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200 dark:bg-slate-800/50 dark:ring-slate-700">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Basic</h3>
                            <p className="mt-2 text-slate-500">Essential services to keep you compliant.</p>
                            <div className="my-8"><span className="text-4xl font-black text-slate-900 dark:text-white">RM89</span><span className="text-slate-500">/ month</span></div>
                            <ul className="space-y-4 flex-grow mb-8 text-sm">
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary text-lg">check</span>Registered Office Address</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary text-lg">check</span>Licensed Company Secretary</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary text-lg">check</span>Basic Compliance Alerts</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary text-lg">check</span>Document Storage Portal</li>
                                <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary text-lg mt-0.5">check</span>Secure Digital Identity & Signature</li>
                            </ul>
                        </div>

                        {/* Annual Plan */}
                        <div className="flex flex-col rounded-3xl bg-slate-900 p-8 text-white shadow-xl ring-1 ring-slate-800">
                            <h3 className="text-xl font-bold">Annual Package</h3>
                            <p className="mt-2 text-slate-400">Best value for long-term peace of mind.</p>
                            <div className="my-8"><span className="text-4xl font-black">RM1,500</span><span className="text-slate-400">/ year</span></div>
                            <ul className="space-y-4 flex-grow mb-8 text-sm">
                                <li className="flex items-center gap-3 text-slate-300"><span className="material-symbols-outlined text-primary text-lg">check</span>All Features in Basic Plan</li>
                                <li className="flex items-center gap-3 text-slate-300"><span className="material-symbols-outlined text-primary text-lg">check</span>AGM Preparation</li>
                                <li className="flex items-start gap-3 text-slate-300"><span className="material-symbols-outlined text-primary text-lg mt-0.5">check</span>Annual Filing with SSM</li>
                                <li className="flex items-center gap-3 text-white font-semibold"><span className="material-symbols-outlined text-primary text-lg">check</span>Priority Compliance Support</li>
                                <li className="flex items-center gap-3 text-white font-semibold"><span className="material-symbols-outlined text-primary text-lg">check</span>Priority Support Response</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Process */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-16">{t('incorporationPage.steps.title')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Array.isArray(steps) && steps.map((step) => (
                            <div key={step.num} className="relative flex flex-col items-center text-center">
                                <div className="size-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-primary/25 z-10">
                                    {step.num}
                                </div>
                                {step.num !== 4 && (
                                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-0"></div>
                                )}
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Post Incorporation Checklist */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-slate-900 dark:text-white">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">{t('incorporationPage.checklist.title')}</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-8">{t('incorporationPage.checklist.subtitle')}</p>

                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-100 dark:border-slate-700">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">checklist</span>
                                    {t('incorporationPage.checklist.boxTitle')}
                                </h3>

                                <div className="mb-6">
                                    <h4 className="font-bold text-lg mb-3 text-primary">{t('incorporationPage.checklist.immediate.title')}</h4>
                                    <ul className="space-y-3">
                                        {Array.isArray(checklistItems.immediate) && checklistItems.immediate.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm">
                                                <span className="material-symbols-outlined text-green-500 text-lg">check</span>
                                                <span><strong>{item.item}</strong> - <span className="text-slate-500">{item.desc}</span></span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-3 text-primary">{t('incorporationPage.checklist.ongoing.title')}</h4>
                                    <ul className="space-y-3">
                                        {Array.isArray(checklistItems.ongoing) && checklistItems.ongoing.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm">
                                                <span className="material-symbols-outlined text-blue-500 text-lg">schedule</span>
                                                <span><strong>{item.item}:</strong> <span className="text-slate-500">{item.desc}</span></span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <FeeCalculator />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Partner */}
            <section className="py-20 bg-slate-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">{t('incorporationPage.partner.title')}</h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
                        {t('incorporationPage.partner.text')}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {["Corporate Governance", "Document Preparation", "Compliance Management", "Business Advisory", "Equity Crowdfunding Advisory"].map((item) => (
                            <div key={item} className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full text-sm font-bold backdrop-blur-sm">
                                <span className="material-symbols-outlined text-primary">check_circle</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('incorporationPage.faq.title')}</h2>
                        <p className="text-slate-600 dark:text-slate-400">{t('incorporationPage.faq.subtitle')}</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFaqFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${faqFilter === cat
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {filteredFaqs.map((faq, idx) => (
                            <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/30">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary mt-1">help</span>
                                    {faq.question}
                                </h3>
                                <p className="mt-3 text-slate-600 dark:text-slate-300 ml-9 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IncorporationPage;
