import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SEO from '../components/SEO';

// FIX: Refactored to accept a 'content' prop instead of using 'children' to resolve typing errors.
const ServiceCard: React.FC<{ icon: string; title: string; content: React.ReactNode }> = ({ icon, title, content }) => (
    <div className="flex flex-1 flex-col gap-6 rounded-2xl border border-slate-100 bg-white p-8 shadow-card transition-all hover:-translate-y-2 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900 group">
        <div className="flex items-center justify-center size-16 rounded-2xl bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            <span className="material-symbols-outlined !text-4xl">{icon}</span>
        </div>
        <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold leading-tight text-slate-900 dark:text-white">{title}</h3>
            <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{content}</div>
        </div>
    </div>
);

const ServicesPage: React.FC = () => {
    const { t } = useTranslation();

    const secretarialItems = t('servicesPage.secretarial.items', { returnObjects: true }) as Array<{ title: string; content: string; subtext: string }>;
    const governanceItems = t('servicesPage.governance.items', { returnObjects: true }) as Array<{ title: string; content: string; subtext: string }>;
    const complianceItems = t('servicesPage.compliance.items', { returnObjects: true }) as Array<{ title: string; content: string; subtext: string }>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 sm:py-20 px-4 sm:px-6">
            <SEO
                title="Our Services"
                description="Comprehensive corporate secretarial, governance, and compliance services tailored for Malaysian businesses."
                canonical="https://www.vsg-secretary.com/services"
            />
            <main className="container mx-auto max-w-6xl flex flex-col gap-16">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">{t('servicesPage.hero.badge')}</span>
                    <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                        {t('servicesPage.hero.title')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">{t('servicesPage.hero.highlight')}</span>
                    </h1>
                    <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">{t('servicesPage.hero.subtitle')}</p>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="px-4 border-l-4 border-primary pl-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('servicesPage.secretarial.title')}</h2>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
                        {secretarialItems.map((item, index) => (
                            <ServiceCard
                                key={index}
                                icon={index === 0 ? "groups" : index === 1 ? "folder_shared" : "edit_document"}
                                title={item.title}
                                content={<>
                                    <p>{item.content}</p>
                                    <p className="mt-2 text-xs italic opacity-80"><span className="font-semibold">{item.subtext.split(':')[0]}:</span>{item.subtext.split(':')[1]}</p>
                                </>}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="px-4 border-l-4 border-primary pl-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('servicesPage.governance.title')}</h2>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
                        {governanceItems.map((item, index) => (
                            <ServiceCard
                                key={index}
                                icon={index === 0 ? "policy" : index === 1 ? "fact_check" : "school"}
                                title={item.title}
                                content={<>
                                    <p>{item.content}</p>
                                    <p className="mt-2 text-xs italic opacity-80"><span className="font-semibold">{item.subtext.split(':')[0]}:</span>{item.subtext.split(':')[1]}</p>
                                </>}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="px-4 border-l-4 border-primary pl-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('servicesPage.compliance.title')}</h2>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
                        {complianceItems.map((item, index) => (
                            <ServiceCard
                                key={index}
                                icon={index === 0 ? "assessment" : index === 1 ? "gavel" : "troubleshoot"}
                                title={item.title}
                                content={<>
                                    <p>{item.content}</p>
                                    <p className="mt-2 text-xs italic opacity-80"><span className="font-semibold">{item.subtext.split(':')[0]}:</span>{item.subtext.split(':')[1]}</p>
                                </>}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-24 sm:px-24 xl:py-32">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-slate-900 to-slate-900"></div>
                    <div className="relative mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('servicesPage.cta.title')}</h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">{t('servicesPage.cta.text')}</p>
                        <div className="mt-10 flex justify-center">
                            <Link to="/contact" className="flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:scale-105">
                                {t('servicesPage.cta.button')}
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ServicesPage;