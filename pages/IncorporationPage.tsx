
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FeeCalculator from '../components/FeeCalculator';

const features = [
    {
        title: "Expert Guidance",
        text: "Our team of experienced company secretaries ensures compliance and provides proactive advice.",
        icon: "school"
    },
    {
        title: "Seamless Online Process",
        text: "Complete your incorporation and secretarial tasks entirely online, anytime, anywhere.",
        icon: "laptop_mac"
    },
    {
        title: "Transparent Pricing",
        text: "No hidden fees, clear breakdowns for all services, and competitive rates.",
        icon: "payments"
    },
    {
        title: "Dedicated Support",
        text: "Get personalized assistance from our friendly and knowledgeable customer support team.",
        icon: "support_agent"
    },
    {
        title: "Efficiency & Speed",
        text: "We leverage technology to make your business setup and compliance fast and hassle-free.",
        icon: "rocket_launch"
    }
];

const steps = [
    {
        num: 1,
        title: "Choose Your Package",
        text: "Select the incorporation plan that best fits your business needs."
    },
    {
        num: 2,
        title: "Submit Information",
        text: "Fill out our secure online forms with your company and director details."
    },
    {
        num: 3,
        title: "Verification & Filing",
        text: "We verify your documents and submit the application to SSM on your behalf."
    },
    {
        num: 4,
        title: "Receive Documents",
        text: "Once approved, you'll receive all official incorporation documents digitally."
    }
];

const checklistItems = {
    immediate: [
        { item: "Appoint Company Secretary", desc: "We provide this" },
        { item: "Open Corporate Bank Account", desc: "We prepare documents" },
        { item: "Set Up Accounting System", desc: "We can recommend partners" },
        { item: "Register with Tax Authorities (LHDN)", desc: "We guide you" },
        { item: "Set Up EPF/SOCSO/EIS", desc: "We assist with registration" }
    ],
    ongoing: [
        { item: "Monthly", desc: "Bookkeeping, payroll, tax estimates" },
        { item: "Annually", desc: "Financial statements, audit, tax returns" },
        { item: "Continuous", desc: "SSM compliance, license renewals" }
    ]
};



const faqs = [
    {
        category: "Services",
        question: "Do you provide accounting or audit services?",
        answer: "No, we specialize exclusively in corporate secretarial services to ensure the highest level of expertise in compliance and governance. However, we have a network of trusted partners we can recommend for your accounting, audit, and tax needs."
    },
    {
        category: "Services",
        question: "What's the difference between secretarial, accounting, and audit services?",
        answer: "It's simple: We handle SSM filings, ensure compliance with the Companies Act, and manage corporate documents. Accountants record your financial transactions and prepare financial statements. Auditors independently verify those financial statements. Tax agents handle your tax calculations and submissions to LHDN."
    },
    {
        category: "Services",
        question: "Can you help me find reliable service providers?",
        answer: "Absolutely! This is one of the key benefits of working with us. We maintain a curated network of trusted and vetted auditors, accountants, and tax professionals. We can make introductions based on your business needs and budget, saving you time and uncertainty."
    },
    {
        category: "Costs",
        question: "How much should I budget for accounting services?",
        answer: "For most startups and small businesses, a typical budget is between RM300-800 per month for basic bookkeeping. This can vary based on your company's transaction volume and complexity. We provide transparent cost guidance and can connect you with partners who fit your budget."
    },
    {
        category: "Compliance",
        question: "What specific compliance services do you provide?",
        answer: "We manage all your company's requirements with the Suruhanjaya Syarikat Malaysia (SSM). This includes filing annual returns, preparing AGM minutes, updating company information, managing beneficial owner registrations, maintaining statutory records, and ensuring all corporate documents are in order."
    },
    {
        category: "Incorporation",
        question: "What is a “Sdn. Bhd.” company?",
        answer: "“Sdn. Bhd.” (Sendirian Berhad) means a private limited company in Malaysia. It’s a separate legal entity, and shareholders’ liabilities are limited to their share capital."
    },
    {
        category: "Incorporation",
        question: "How long does it take to register?",
        answer: "Usually 3–7 working days, depending on the Companies Commission of Malaysia (SSM) approval time."
    },
    {
        category: "Incorporation",
        question: "What do I need to get started?",
        answer: "You’ll need your proposed company names, business activities, and identification documents for all directors and shareholders. (Refer to our checklist for full details.)"
    },
    {
        category: "Incorporation",
        question: "Who can be a company director?",
        answer: "Any person aged 18 and above, ordinarily residing in Malaysia, and not bankrupt or convicted of any offence can be a director."
    },
    {
        category: "Incorporation",
        question: "Do I need to appoint a company secretary?",
        answer: "Yes. Under the Companies Act 2016, every company must appoint a licensed company secretary within 30 days of incorporation."
    },
    {
        category: "Incorporation",
        question: "Can foreigners register a company in Malaysia?",
        answer: "Yes. Foreigners can set up a Sdn. Bhd., but at least one director must be a Malaysian resident or a foreigner with a valid work visa."
    },
    {
        category: "Incorporation",
        question: "What is the minimum capital required?",
        answer: "You can start from as low as RM1, though most companies use RM1,000–RM10,000 to open a bank account and operate smoothly."
    },
    {
        category: "Compliance",
        question: "Is audit required?",
        answer: "Some small companies may be exempted from audit, depending on SSM’s latest criteria. We can help you check if you qualify."
    },
    {
        category: "Services",
        question: "Can you provide a nominee director?",
        answer: "Yes. Nominee director services are available from RM1,000/month, including the required legal agreement."
    },
    {
        category: "Compliance",
        question: "Do I need to file taxes right away?",
        answer: "Not immediately. If your company has no income in the first 18 months, you can delay filing. After that, tax filing is mandatory."
    },
    {
        category: "Services",
        question: "Can my company hire foreign employees?",
        answer: "Yes. You can apply for an Employment Pass or Work Permit once your company meets the capital and compliance requirements. We can assist with the process."
    },
];

const IncorporationPage: React.FC = () => {
    const [faqFilter, setFaqFilter] = useState("All");

    const filteredFaqs = faqFilter === "All" ? faqs : faqs.filter(f => f.category === faqFilter);
    const categories = ["All", ...new Set(faqs.map(f => f.category))];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-6xl mb-6">
                        100% Online Company Registration <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">No Hidden Fees</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10">
                        Get your company fully registered with SSM from the comfort of your home. We handle the paperwork, you focus on your business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/incorporation#pricing" className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:bg-primary-hover hover:shadow-glow">
                            Incorporate Now
                        </Link>
                        <Link to="/contact" className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 border border-slate-200 px-8 py-4 text-base font-bold shadow-sm transition-all hover:bg-slate-50 dark:bg-slate-900 dark:text-white dark:border-slate-800 dark:hover:bg-slate-800">
                            Book a Consultation
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose VSG */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Choose VSG Secretary</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">We simplify the incorporation process with expert support every step of the way.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
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
                            <h3 className="text-2xl font-bold mb-2">Incorporation Package</h3>
                            <p className="text-slate-400 text-center text-sm mb-6">The complete package to get your company registered and ready to operate.</p>

                            <div className="text-center mb-6">
                                <span className="line-through text-slate-500 text-lg">RM1,800</span>
                                <div className="text-5xl font-black tracking-tight mt-1 text-white">RM1,499</div>
                            </div>

                            <Link to="/contact" className="w-full text-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover hover:scale-105">
                                Get Incorporated Now
                            </Link>
                        </div>
                        <div className="flex-1 p-12 bg-white dark:bg-slate-900">
                            <ul className="grid grid-cols-1 gap-4 text-sm">
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    Includes RM1,010 SSM Incorporation Fee
                                </li>
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    Up to 3 company name searches with expert advice
                                </li>
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    Full document preparation & submission to SSM
                                </li>
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    Bank account opening resolution
                                </li>
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    Follow-up until registration is complete
                                </li>
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    Appointment of licensed company secretary (within 30 days)
                                </li>
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    24/7 online access to documents
                                </li>
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    1-time free update within 30 days
                                </li>
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    Free business and equity consultation
                                </li>
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    Equity crowdfunding consultation
                                </li>
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    50% off company constitution / term sheet / shareholder agreement
                                </li>
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
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-16">Incorporation Just in 4 Simple Steps</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step) => (
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
                            <h2 className="text-3xl font-bold mb-6">After Incorporation: What's Next?</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-8">We specialize in corporate secretarial services. For other professional services, we partner with trusted providers and can provide referrals.</p>

                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-100 dark:border-slate-700">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">checklist</span>
                                    Your Post-Incorporation Checklist
                                </h3>

                                <div className="mb-6">
                                    <h4 className="font-bold text-lg mb-3 text-primary">Immediate Actions (First 30 Days)</h4>
                                    <ul className="space-y-3">
                                        {checklistItems.immediate.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm">
                                                <span className="material-symbols-outlined text-green-500 text-lg">check</span>
                                                <span><strong>{item.item}</strong> - <span className="text-slate-500">{item.desc}</span></span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-3 text-primary">Ongoing Compliance</h4>
                                    <ul className="space-y-3">
                                        {checklistItems.ongoing.map((item, i) => (
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
                    <h2 className="text-3xl font-bold mb-4">Why Partner With VSG Secretary?</h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
                        🎯 We Specialize in Corporate Compliance. While we don't provide audit or accounting services directly, we excel at what we do. Our focus ensures your business stays compliant and well-governed.
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
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-600 dark:text-slate-400">Quick answers to common questions about our services.</p>
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
