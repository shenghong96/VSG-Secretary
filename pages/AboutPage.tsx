
import React from 'react';
import { Link } from 'react-router-dom';

const TeamMember = ({ name, title, imgSrc, bio }: { name: string; title: string; imgSrc: string; bio: string; }) => (
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

const Milestone = ({ year, event }: { year: string; event: string; }) => (
    <div className="relative pl-8 group">
        <div className="absolute left-0 top-1.5 h-full border-l-2 border-slate-200 dark:border-slate-800 group-last:border-transparent"></div>
        <div className="absolute left-[-9px] top-1.5 size-5 rounded-full bg-slate-200 dark:bg-slate-700 ring-4 ring-white dark:ring-slate-950 transition-colors group-hover:bg-primary"></div>
        <p className="text-xl font-black text-slate-400 transition-colors group-hover:text-primary">{year}</p>
        <p className="mt-1 text-slate-600 dark:text-slate-300 font-medium">{event}</p>
    </div>
);

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <main className="space-y-32">
                    <section className="text-center max-w-3xl mx-auto">
                        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-6">About VSG Secretary</span>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
                            Your Trusted Partner in <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">Corporate Governance</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">We provide expert virtual secretarial and governance services to ensure your company operates with efficiency, integrity, and full compliance.</p>
                    </section>

                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-1 flex-col gap-6 rounded-3xl bg-white dark:bg-slate-900 p-10 shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:-translate-y-1">
                                <div className="flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined !text-4xl">target</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
                                <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-1 text-lg">check_circle</span>To simplify corporate compliance through innovation and digital solutions.</li>
                                    <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-1 text-lg">check_circle</span>To provide accurate, timely, and transparent company secretarial services.</li>
                                    <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-1 text-lg">check_circle</span>To support entrepreneurs and SMEs with expert guidance in governance.</li>
                                </ul>
                            </div>
                            <div className="flex flex-1 flex-col gap-6 rounded-3xl bg-white dark:bg-slate-900 p-10 shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:-translate-y-1">
                                <div className="flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined !text-4xl">visibility</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Vision</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">To become Malaysia’s most trusted and technology-driven company secretary firm, empowering businesses to stay compliant effortlessly while focusing on growth.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Our Story</h2>
                                <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300">
                                    <p>Founded on 1 June 2024, VSG Secretary was established with a clear mission — to make corporate secretarial and compliance services more accessible, transparent, and efficient for Malaysian businesses.</p>
                                    <p>We understand the challenges entrepreneurs face in managing governance and statutory obligations, so we built a system that blends professional expertise with digital convenience.</p>
                                    <p>Within a short time, we have supported dozens of companies in incorporation, compliance, and reporting, growing rapidly through trust, reliability, and innovation. Our story is just beginning.</p>
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
                                <h2 className="text-3xl font-bold tracking-[-0.015em] mb-4">Our Milestones</h2>
                                <div className="space-y-6">
                                    <Milestone year="2024" event="VSG Secretary was formed on 1 June 2024." />
                                    <Milestone year="2025" event="Registered our 50th company in February 2025." />
                                </div>
                            </div>
                            <div className="lg:col-span-2">
                                <h2 className="text-3xl font-bold tracking-[-0.015em] mb-4">Our Commitment</h2>
                                <div className="p-6 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 space-y-4">
                                    <h3 className="font-bold text-lg">Licensed & Accredited</h3>
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark">We are a licensed company secretary firm registered with the Companies Commission of Malaysia (SSM), ensuring our services meet the highest standards of corporate governance and compliance.</p>
                                    <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">Our team comprises qualified and certified professionals with deep experience in company law, governance, and regulatory filings.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="text-center mb-16">
                            <span className="text-primary font-bold tracking-wide uppercase text-sm">Leadership</span>
                            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-white">Meet the Team</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">Our strength lies in our experienced and dedicated professionals.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <TeamMember
                                name="Sheng Hong"
                                title="Chief Executive Officer"
                                imgSrc="https://picsum.photos/seed/teamSH/200/200"
                                bio="Sheng Hong leads the overall operations, strategy, sales, and marketing at VSG. Before founding VSG, he spent over five years at Syarikat Ong, where he gained deep expertise in corporate secretarial practices, and three years at pitchIN as an Investment Analyst, honing his skills in startup investments and corporate governance."
                            />
                            <TeamMember
                                name="Philip George"
                                title="Co-Founder"
                                imgSrc="https://picsum.photos/seed/teamPG/200/200"
                                bio="Philip drives technology, growth, and fundraising at VSG. Prior to VSG, he co-founded several technology ventures spanning healthcare, property, and travel & tourism, gaining broad experience in scaling tech-driven businesses and product innovation."
                            />
                            <TeamMember
                                name="Lam Yao Xiang"
                                title="Company Secretary"
                                imgSrc="https://picsum.photos/seed/teamLYX/200/200"
                                bio="Lam Yao Xiang is a licensed SSM practicing company secretary under MAISCA. He brings extensive corporate governance and compliance experience from his tenure at Boardroom and Syarikat Ong, supporting companies in meeting regulatory standards and best practices."
                            />
                            <TeamMember
                                name="Lau Jun Yan"
                                title="Marketing Lead"
                                imgSrc="https://picsum.photos/seed/teamLJY/200/200"
                                bio="Lau Jun Yan oversees marketing strategy and digital growth at VSG Secretary. Before joining VSG, he co-founded and managed his own marketing agency, leading a team of five. He brings extensive experience in digital marketing, including Facebook and Google advertising, campaign optimization, and social media management across platforms such as Xiao Hong Shu."
                            />
                        </div>
                    </section>

                    <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-24 sm:px-24 xl:py-32 text-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-slate-900 to-slate-900"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to Streamline Your Governance?</h2>
                            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">Let's discuss how VSG Secretary can support your company's success. Reach out to our team today for a complimentary consultation.</p>
                            <div className="mt-10 flex justify-center">
                                <Link to="/contact" className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-100 transition-all hover:scale-105">
                                    Get In Touch
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
