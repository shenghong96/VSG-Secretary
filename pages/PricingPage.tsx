import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Service {
    name: string;
    price: string;
    notes: string;
}

interface PricingCategory {
    category: string;
    icon: string;
    services: Service[];
}

const PricingCategoryTable: React.FC<{ category: string; icon: string; services: Service[] }> = ({ category, icon, services }) => (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden shadow-card transition-all hover:shadow-card-hover">
        <div className="flex items-center gap-4 p-8 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined !text-3xl">{icon}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{category}</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-white dark:bg-slate-900 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    <tr>
                        <th scope="col" className="px-8 py-4 font-semibold w-1/2">Service</th>
                        <th scope="col" className="px-8 py-4 text-right font-semibold w-1/6">Price (RM)</th>
                        <th scope="col" className="px-8 py-4 font-semibold w-1/3">Notes</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {services.map((service, index) => (
                        <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-8 py-5 font-medium text-slate-900 dark:text-slate-200 align-top">{service.name}</td>
                            <td className="px-8 py-5 text-right whitespace-nowrap text-slate-600 dark:text-slate-400 align-top font-bold">{service.price}</td>
                            <td className="px-8 py-5 text-slate-500 dark:text-slate-500 text-xs align-top">{service.notes || '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);


const PricingPage: React.FC = () => {
    const { t } = useTranslation();
    const adhocServices = t('pricingPage.adhoc.list', { returnObjects: true }) as PricingCategory[];
    const oneTimeFeatures = t('pricingPage.oneTime.features', { returnObjects: true }) as string[];
    const terms = t('pricingPage.terms.list', { returnObjects: true }) as string[];
    const disclaimers = t('pricingPage.disclaimers.list', { returnObjects: true }) as string[];
    const notes = t('pricingPage.note.list', { returnObjects: true }) as string[];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 sm:py-32">
            <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-primary font-bold tracking-wide uppercase text-sm">{t('pricingPage.hero.badge')}</span>
                    <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                        {t('pricingPage.hero.title')}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">{t('pricingPage.hero.highlight')}</span>
                    </h1>
                    <p className="mt-6 text-xl text-slate-600 dark:text-slate-300">{t('pricingPage.hero.subtitle')}</p>
                    <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <span className="material-symbols-outlined !text-lg">verified</span>
                        {t('pricingPage.hero.guarantee')}
                    </div>
                </div>

                <div className="mb-20">
                    <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-slate-900 dark:text-white">{t('pricingPage.oneTime.title')}</h2>
                    <div className="max-w-5xl mx-auto rounded-3xl bg-white shadow-xl dark:bg-slate-900 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
                        <div className="flex flex-col md:flex-row">
                            <div className="flex flex-col justify-center items-center p-12 bg-slate-900 text-white md:w-1/3">
                                <p className="text-primary-light font-bold uppercase tracking-wider text-sm">{t('pricingPage.oneTime.badge')}</p>
                                <p className="text-6xl font-black tracking-tight my-4">{t('pricingPage.oneTime.price')}</p>
                                <p className="text-slate-400 text-center">{t('pricingPage.oneTime.desc')}</p>
                            </div>
                            <div className="flex-1 p-12 md:p-16">
                                <p className="text-xl font-medium text-slate-900 dark:text-white mb-8">{t('pricingPage.oneTime.featuresTitle')}</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    {Array.isArray(oneTimeFeatures) && oneTimeFeatures.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                            <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-10">
                                    <Link to="/incorporation" className="inline-flex w-full md:w-auto items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:bg-primary-hover hover:shadow-glow">
                                        {t('pricingPage.oneTime.cta')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-24">
                    <h2 className="text-3xl font-bold tracking-tight text-center mb-4 text-slate-900 dark:text-white">{t('pricingPage.ongoing.title')}</h2>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">{t('pricingPage.ongoing.subtitle')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
                        {/* Basic Plan */}
                        <div className="flex flex-col rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 transition-all hover:scale-[1.01]">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('pricingPage.ongoing.basic.title')}</h3>
                            <p className="mt-2 text-slate-500">{t('pricingPage.ongoing.basic.desc')}</p>
                            <div className="my-8"><span className="text-5xl font-black text-slate-900 dark:text-white">{t('pricingPage.ongoing.basic.price')}</span><span className="text-slate-500">{t('pricingPage.ongoing.basic.unit')}</span></div>
                            <ul className="space-y-4 flex-grow mb-8">
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary">check</span>Registered Office Address</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary">check</span>Licensed Company Secretary</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary">check</span>Basic Compliance Alerts</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary">check</span>Document Storage Portal</li>
                                <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary mt-0.5">check</span>Secure Digital Identity & Signature</li>
                            </ul>
                            <Link to="/incorporation" className="mt-auto flex w-full items-center justify-center rounded-xl bg-slate-100 py-4 text-base font-bold text-slate-900 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                                {t('pricingPage.ongoing.basic.cta')}
                            </Link>
                        </div>

                        {/* Annual Plan (Best Value) */}
                        <div className="relative flex flex-col rounded-3xl bg-white p-8 shadow-2xl ring-2 ring-primary dark:bg-slate-900 transition-all hover:scale-[1.02] hover:shadow-glow">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-6 py-2 text-sm font-bold uppercase text-white shadow-lg">{t('pricingPage.ongoing.annual.badge')}</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('pricingPage.ongoing.annual.title')}</h3>
                            <p className="mt-2 text-slate-500">{t('pricingPage.ongoing.annual.desc')}</p>
                            <div className="my-8"><span className="text-5xl font-black text-slate-900 dark:text-white">{t('pricingPage.ongoing.annual.price')}</span><span className="text-slate-500">{t('pricingPage.ongoing.annual.unit')}</span></div>
                            <ul className="space-y-4 flex-grow mb-8">
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary">check</span>All Features in Basic Plan</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary">check</span>Annual General Meeting (AGM) Preparation</li>
                                <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary mt-0.5">check</span>Annual Filing with SSM (Annual Return, AFS, BO)</li>
                                <li className="flex items-center gap-3 font-bold text-slate-900 dark:text-white"><span className="material-symbols-outlined text-primary">check</span>Priority Compliance Support</li>
                                <li className="flex items-center gap-3 font-bold text-slate-900 dark:text-white"><span className="material-symbols-outlined text-primary">check</span>Priority Support Response</li>
                            </ul>
                            <Link to="/incorporation" className="mt-auto flex w-full items-center justify-center rounded-xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover hover:shadow-glow">
                                {t('pricingPage.ongoing.annual.cta')}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto py-16 px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold">{t('pricingPage.adhoc.title')}</h2>
                        <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">{t('pricingPage.adhoc.subtitle')}</p>
                    </div>
                    <div className="space-y-8">
                        {Array.isArray(adhocServices) && adhocServices.map((categoryData, index) => (
                            <PricingCategoryTable
                                key={index}
                                category={categoryData.category}
                                icon={categoryData.icon}
                                services={categoryData.services}
                            />
                        ))}
                    </div>
                </div>

                <div className="max-w-4xl mx-auto pb-16 px-4">
                    <div className="p-8 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-border-light dark:border-border-dark space-y-8">
                        <div>
                            <h3 className="text-xl font-bold flex items-center gap-2"><span className="material-symbols-outlined text-primary">info</span>{t('pricingPage.note.title')}</h3>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-text-secondary-light dark:text-text-secondary-dark text-sm">
                                {Array.isArray(notes) && notes.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold flex items-center gap-2"><span className="material-symbols-outlined text-primary">gavel</span>{t('pricingPage.terms.title')}</h3>
                            <div className="mt-4 space-y-4 text-text-secondary-light dark:text-text-secondary-dark text-sm">
                                {Array.isArray(terms) && terms.map((item, i) => (
                                    <p key={i} dangerouslySetInnerHTML={{ __html: item }}></p>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold flex items-center gap-2 text-amber-600 dark:text-amber-500"><span className="material-symbols-outlined">warning</span>{t('pricingPage.disclaimers.title')}</h3>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-text-secondary-light dark:text-text-secondary-dark text-sm">
                                {Array.isArray(disclaimers) && disclaimers.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PricingPage;
