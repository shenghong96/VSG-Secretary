import React from 'react';
import { Link } from 'react-router-dom';

const TrustIndicator = ({ icon, text, value }: { icon: string; text: string; value: string }) => (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover dark:bg-slate-800 hover:shadow-glow">
        <div className="absolute -right-4 -top-4 size-24 rounded-full bg-primary/5 transition-all group-hover:scale-150"></div>
        <div className="relative">
            <div className="flex items-center justify-center size-14 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined !text-3xl">{icon}</span>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{value}</p>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{text}</p>
        </div>
    </div>
);

const TestimonialCard = ({ quote, name, title, imgSrc }: { quote: string; name: string; title: string; imgSrc: string }) => (
    <div className="flex flex-col gap-6 rounded-2xl border border-slate-100 bg-white p-8 shadow-card transition-all hover:scale-[1.02] hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-800">
        <div className="flex text-primary">
            {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined !text-xl filled">star</span>
            ))}
        </div>
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">"{quote}"</p>
        <div className="mt-auto flex items-center gap-4">
            <img src={imgSrc} alt={`Photo of ${name}`} className="size-12 rounded-full object-cover ring-2 ring-primary/20" />
            <div>
                <p className="font-bold text-slate-900 dark:text-white">{name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            </div>
        </div>
    </div>
);

const HomePage: React.FC = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background-light pt-20 pb-32 dark:bg-slate-950 sm:pt-32 sm:pb-40">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50 dark:opacity-20"></div>
                <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl filter dark:bg-blue-500/5"></div>

                <div className="container relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-8">
                        The #1 Corporate Secretary in Malaysia
                    </span>
                    <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl md:text-7xl lg:leading-tight">
                        Corporate Secretarial Services <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">Made Simple</span>
                    </h1>
                    <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-slate-600 dark:text-slate-300">
                        Your trusted partner for company incorporation, governance, and compliance in Malaysia. Focus on your business, we'll handle the rest.
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-x-8">
                        <Link
                            to="/pricing"
                            className="group flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:bg-primary-hover hover:shadow-glow"
                        >
                            Get Started Now
                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </Link>
                        <Link to="/services" className="flex items-center gap-2 text-base font-semibold leading-6 text-slate-900 transition-colors hover:text-primary dark:text-white">
                            Our Services <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Indicators Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <TrustIndicator icon="rocket_launch" value="100+" text="Companies Registered" />
                        <TrustIndicator icon="schedule" value="1-3 Days" text="Fast Incorporation" />
                        <TrustIndicator icon="sentiment_satisfied" value="99%" text="Client Satisfaction" />
                        <TrustIndicator icon="workspace_premium" value="10+ Years" text="Combined Experience" />
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Why Partner with VSG Secretary?</h2>
                        <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">We simplify compliance so you can focus on growth.</p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
                        <div className="text-center p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 transition-colors hover:bg-primary/5">
                            <div className="flex items-center justify-center size-16 mx-auto rounded-full bg-white text-primary shadow-sm dark:bg-slate-800"><span className="material-symbols-outlined !text-3xl">groups</span></div>
                            <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">Expert Team</h3>
                            <p className="mt-4 text-slate-600 dark:text-slate-400">Our licensed professionals provide accurate, reliable guidance tailored to your business needs.</p>
                        </div>
                        <div className="text-center p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 transition-colors hover:bg-primary/5">
                            <div className="flex items-center justify-center size-16 mx-auto rounded-full bg-white text-primary shadow-sm dark:bg-slate-800"><span className="material-symbols-outlined !text-3xl">speed</span></div>
                            <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">Efficient Process</h3>
                            <p className="mt-4 text-slate-600 dark:text-slate-400">Leveraging technology, we streamline incorporation and compliance, saving you time and effort.</p>
                        </div>
                        <div className="text-center p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 transition-colors hover:bg-primary/5">
                            <div className="flex items-center justify-center size-16 mx-auto rounded-full bg-white text-primary shadow-sm dark:bg-slate-800"><span className="material-symbols-outlined !text-3xl">visibility</span></div>
                            <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">Transparent Pricing</h3>
                            <p className="mt-4 text-slate-600 dark:text-slate-400">No hidden fees. Our clear, upfront pricing ensures you know exactly what you're paying for.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 sm:py-24 bg-background-light dark:bg-background-dark">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-text-primary-light dark:text-text-primary-dark sm:text-4xl">What Our Clients Say</h2>
                        <p className="mt-4 text-lg text-text-secondary-light dark:text-text-secondary-dark">We're proud to have earned the trust of businesses across Malaysia.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <TestimonialCard
                            quote="VSG Secretary made the entire incorporation process seamless and stress-free. Their team was professional, responsive, and incredibly knowledgeable. Highly recommended!"
                            name="Ahmad Zulkifli"
                            title="Founder, TechNova Solutions"
                            imgSrc="https://picsum.photos/seed/client1/100/100"
                        />
                        <TestimonialCard
                            quote="Switching to VSG for our secretarial services was the best decision we made. They handle all our compliance needs efficiently, allowing us to focus completely on our operations."
                            name="Chen Wei Ling"
                            title="CEO, Urban Bites Cafe"
                            imgSrc="https://picsum.photos/seed/client2/100/100"
                        />
                        <TestimonialCard
                            quote="The expertise and guidance from VSG have been invaluable. They are more than just a service provider; they are a true partner in our company's growth and success."
                            name="Suresh Ramachandran"
                            title="Managing Director, Global Exports Sdn Bhd"
                            imgSrc="https://picsum.photos/seed/client3/100/100"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/20 via-slate-900 to-slate-900"></div>
                <div className="container relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Ready to Start and Grow Your Business?</h2>
                    <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-400">Let us handle the complexities of corporate governance and compliance. Contact us today for a personalized consultation.</p>
                    <Link to="/contact" className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-lg transition-all hover:scale-105 hover:bg-slate-100">
                        Book a Free Consultation
                    </Link>
                </div>
            </section>
        </>
    );
};

export default HomePage;
