import React from 'react';
import { Link } from 'react-router-dom';

// FIX: Refactored to accept a 'content' prop instead of using 'children' to resolve typing errors.
const ServiceCard = ({ icon, title, content }: { icon: string; title: string; content: React.ReactNode }) => (
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
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 sm:py-20 px-4 sm:px-6">
            <main className="container mx-auto max-w-6xl flex flex-col gap-16">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">Services</span>
                    <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                        Comprehensive <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">Corporate Solutions</span>
                    </h1>
                    <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">We provide comprehensive virtual, secretarial, and governance solutions to ensure your business operates smoothly and complies with all regulatory requirements.</p>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="px-4 border-l-4 border-primary pl-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Company Secretarial</h2>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
                        {/* FIX: Refactored to use 'content' prop */}
                        <ServiceCard icon="groups" title="Board Meeting Support" content={<>
                            <p>Comprehensive support for board meetings, including agenda preparation, board pack distribution, and attendance.</p>
                            <p className="mt-2 text-xs italic opacity-80"><span className="font-semibold">Why this matters:</span> Ensures meetings are productive, decisions are well-documented, and director duties are fulfilled.</p>
                        </>} />
                        {/* FIX: Refactored to use 'content' prop */}
                        <ServiceCard icon="folder_shared" title="Statutory Filings" content={<>
                            <p>Ensuring timely and accurate submission of all required statutory documents (like Annual Returns) to SSM.</p>
                            <p className="mt-2 text-xs italic opacity-80"><span className="font-semibold">Why this matters:</span> Avoids late penalties and maintains your company's good standing with regulators.</p>
                        </>} />
                        {/* FIX: Refactored to use 'content' prop */}
                        <ServiceCard icon="edit_document" title="Minute Taking" content={<>
                            <p>Professional and precise minute-taking services to accurately document discussions and decisions.</p>
                            <p className="mt-2 text-xs italic opacity-80"><span className="font-semibold">Case Study:</span> A tech startup saved 10+ executive hours per month by outsourcing minute-taking to us.</p>
                        </>} />
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="px-4 border-l-4 border-primary pl-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Corporate Governance</h2>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
                        {/* FIX: Refactored to use 'content' prop */}
                        <ServiceCard icon="policy" title="Policy Development" content={<>
                            <p>Expert assistance in drafting, reviewing, and implementing corporate policies to ensure best practices.</p>
                            <p className="mt-2 text-xs italic opacity-80"><span className="font-semibold">Why this matters:</span> Creates a strong ethical framework and reduces operational risks.</p>
                        </>} />
                        {/* FIX: Refactored to use 'content' prop */}
                        <ServiceCard icon="fact_check" title="Governance Audits" content={<>
                            <p>Conducting thorough audits of your governance structures to identify areas for improvement and ensure compliance.</p>
                            <p className="mt-2 text-xs italic opacity-80"><span className="font-semibold">Why this matters:</span> Proactively identifies weaknesses before they become legal or financial problems.</p>
                        </>} />
                        {/* FIX: Refactored to use 'content' prop */}
                        <ServiceCard icon="school" title="Director Training" content={<>
                            <p>Providing bespoke training sessions for directors on their duties, responsibilities, and corporate governance.</p>
                            <p className="mt-2 text-xs italic opacity-80"><span className="font-semibold">Why this matters:</span> Empowers your leadership with the knowledge to make informed, compliant decisions.</p>
                        </>} />
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="px-4 border-l-4 border-primary pl-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Compliance Management</h2>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
                        {/* FIX: Refactored to use 'content' prop */}
                        <ServiceCard icon="assessment" title="MBRS & Regulatory Reporting" content={<>
                            <p>Managing and submitting all necessary MBRS and regulatory reports on your behalf, ensuring accuracy and timeliness.</p>
                            <p className="mt-2 text-xs italic opacity-80"><span className="font-semibold">Why this matters:</span> Navigates the complex MBRS system correctly, saving you time and preventing errors.</p>
                        </>} />
                        {/* FIX: Refactored to use 'content' prop */}
                        <ServiceCard icon="gavel" title="Compliance Frameworks" content={<>
                            <p>Developing and implementing robust compliance frameworks tailored to your industry and business needs.</p>
                            <p className="mt-2 text-xs italic opacity-80"><span className="font-semibold">Why this matters:</span> Establishes a systematic approach to managing your legal and regulatory obligations.</p>
                        </>} />
                        {/* FIX: Refactored to use 'content' prop */}
                        <ServiceCard icon="troubleshoot" title="Risk Assessment" content={<>
                            <p>Identifying, assessing, and mitigating potential compliance risks to protect your business's reputation and finances.</p>
                            <p className="mt-2 text-xs italic opacity-80"><span className="font-semibold">Why this matters:</span> A proactive strategy to safeguard your company against unforeseen compliance issues.</p>
                        </>} />
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-24 sm:px-24 xl:py-32">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-slate-900 to-slate-900"></div>
                    <div className="relative mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to Streamline Your Governance?</h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">Let us handle the complexities of corporate governance and compliance so you can focus on what you do best. Contact us for a personalized consultation.</p>
                        <div className="mt-10 flex justify-center">
                            <Link to="/contact" className="flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:scale-105">
                                Book a Free Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ServicesPage;