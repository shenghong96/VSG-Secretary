
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TeamMember: React.FC<{ name: string; title: string; imgSrc: string; bio: string; }> = ({ name, title, imgSrc, bio }) => (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-card transition-all hover:shadow-card-hover group hover:-translate-y-1">
        <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-hover opacity-20 blur-md group-hover:opacity-40 transition-opacity"></div>
            <img className="relative size-32 rounded-full object-cover ring-4 ring-white dark:ring-slate-800" alt={`Headshot of ${name}`} src={imgSrc} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{name}</h3>
        <p className="text-primary font-bold mt-1">{title}</p>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{bio}</p>
    </div>
);

const Milestone: React.FC<{ year: string; event: string; }> = ({ year, event }) => (
    <div className="relative pl-8 group">
        <div className="absolute left-0 top-1.5 h-full border-l-2 border-slate-200 dark:border-slate-800 group-last:border-transparent"></div>
        <div className="absolute left-[-9px] top-1.5 size-5 rounded-full bg-slate-200 dark:bg-slate-700 ring-4 ring-white dark:ring-slate-950 transition-colors group-hover:bg-primary"></div>
        <p className="text-xl font-black text-slate-400 transition-colors group-hover:text-primary">{year}</p>
        <p className="mt-1 text-slate-600 dark:text-slate-300 font-medium">{event}</p>
    </div>
);

const AboutPage: React.FC = () => {
    const { t } = useTranslation();

    const missionList = t('aboutPage.mission.list', { returnObjects: true }) as string[];
    const milestones = t('aboutPage.milestones.list', { returnObjects: true }) as Array<{ year: string; event: string }>;
    const teamMembers = t('aboutPage.team.members', { returnObjects: true }) as Array<{ name: string; title: string; bio: string }>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <main className="space-y-32">
                    <section className="text-center max-w-3xl mx-auto">
                        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-6">{t('aboutPage.hero.badge')}</span>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
                            {t('aboutPage.hero.title')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">{t('aboutPage.hero.highlight')}</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">{t('aboutPage.hero.subtitle')}</p>
                    </section>

                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-1 flex-col gap-6 rounded-3xl bg-white dark:bg-slate-900 p-10 shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:-translate-y-1">
                                <div className="flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined !text-4xl">target</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('aboutPage.mission.title')}</h2>
                                <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-300">
                                    {missionList.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-1 text-lg">check_circle</span>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-1 flex-col gap-6 rounded-3xl bg-white dark:bg-slate-900 p-10 shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:-translate-y-1">
                                <div className="flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined !text-4xl">visibility</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('aboutPage.vision.title')}</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{t('aboutPage.vision.text')}</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">{t('aboutPage.story.title')}</h2>
                                <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300">
                                    <p>{t('aboutPage.story.p1')}</p>
                                    <p>{t('aboutPage.story.p2')}</p>
                                    <p>{t('aboutPage.story.p3')}</p>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl skew-y-3 transform transition-all hover:skew-y-0">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                    <img className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700" alt="A modern office environment with professionals collaborating." src="https://picsum.photos/seed/about/500/500" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-1">
                                <h2 className="text-3xl font-bold tracking-[-0.015em] mb-4">{t('aboutPage.milestones.title')}</h2>
                                <div className="space-y-6">
                                    {milestones.map((milestone, i) => (
                                        <Milestone key={i} year={milestone.year} event={milestone.event} />
                                    ))}
                                </div>
                            </div>
                            <div className="lg:col-span-2">
                                <h2 className="text-3xl font-bold tracking-[-0.015em] mb-4">{t('aboutPage.commitment.title')}</h2>
                                <div className="p-6 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 space-y-4">
                                    <h3 className="font-bold text-lg">{t('aboutPage.commitment.licensedTitle')}</h3>
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark">{t('aboutPage.commitment.text1')}</p>
                                    <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">{t('aboutPage.commitment.text2')}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="text-center mb-16">
                            <span className="text-primary font-bold tracking-wide uppercase text-sm">{t('aboutPage.team.badge')}</span>
                            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-white">{t('aboutPage.team.title')}</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">{t('aboutPage.team.subtitle')}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {teamMembers.map((member, i) => (
                                <TeamMember
                                    key={i}
                                    name={member.name}
                                    title={member.title}
                                    imgSrc={`https://picsum.photos/seed/team${i}/200/200`}
                                    bio={member.bio}
                                />
                            ))}
                        </div>
                    </section>

                    <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-24 sm:px-24 xl:py-32 text-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-slate-900 to-slate-900"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('aboutPage.cta.title')}</h2>
                            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">{t('aboutPage.cta.text')}</p>
                            <div className="mt-10 flex justify-center">
                                <Link to="/contact" className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-100 transition-all hover:scale-105">
                                    {t('aboutPage.cta.button')}
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AboutPage;
