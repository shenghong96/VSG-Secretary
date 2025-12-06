
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqData = [
    // === Company Incorporation ===
    {
        q: 'What is a "Sdn. Bhd." company?',
        a: <p>A "Sdn. Bhd." (Sendirian Berhad) is a private limited company in Malaysia. It is treated as a separate legal entity from its owners, meaning it can own property, enter into contracts, and be sued. The key benefit is that shareholders' liability is limited to the amount of their investment in shares.</p>,
        category: 'Company Incorporation'
    },
    {
        q: 'How long does incorporation take?',
        a: <p>The incorporation process typically takes between 3-7 working days. This timeframe is subject to the processing speed and approval by the Companies Commission of Malaysia (SSM).</p>,
        category: 'Company Incorporation'
    },
    {
        q: 'What do I need to get started?',
        a: (
            <div className="space-y-4">
                <p>To begin, you will need to provide the following:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Proposed company names (at least 3 options).</li>
                    <li>Description of your principal business activities.</li>
                    <li>Identification and address documents for all directors and shareholders.</li>
                </ul>
                <p className="mt-4 font-semibold">Document Checklist:</p>
                <div>
                    <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">1. Identity Verification</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Malaysian Nationals:</strong> Copy of both front and back of NRIC.</li>
                        <li><strong>Foreign Nationals:</strong> Clear copy of passport information page.</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">2. Proof of Residential Address</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Malaysians & Foreigners:</strong> A recent personal bank statement or utility bill showing your full name and residential address.</li>
                    </ul>
                    <p className="mt-2 text-xs italic">Note: If your current address differs from your ID, please provide an additional proof of residence.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">3. Online Identity Verification</h4>
                    <p>A brief online meeting (e.g., Zoom) will be arranged for identity verification, where you'll need to show your original NRIC/passport.</p>
                </div>
            </div>
        ),
        category: 'Company Incorporation'
    },
    {
        q: 'Who can be a company director?',
        a: <p>A director must be a natural person who is at least 18 years of age. They must not be an undischarged bankrupt or have been convicted of any offenses related to fraud or dishonesty. At least one director must be "ordinarily resident" in Malaysia.</p>,
        category: 'Company Incorporation'
    },
    {
        q: 'Is a local resident director required?',
        a: (
            <div className="space-y-4">
                <p>Yes. Under the Companies Act 2016, every Sdn. Bhd. must have at least one director who is "ordinarily resident in Malaysia".</p>
                <div>
                    <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">How to prove "Ordinarily Resident":</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>For Malaysian Directors:</strong> The residential address stated in their NRIC is sufficient.</li>
                        <li><strong>For Foreign Directors:</strong> Must provide a valid long-term residence pass or work visa in Malaysia, along with proof of a local residential address, to show that Malaysia is their primary place of residence.</li>
                    </ul>
                </div>
            </div>
        ),
        category: 'Company Incorporation'
    },
    {
        q: 'How many directors are required?',
        a: <p>A Sdn. Bhd. requires a minimum of one director. This director can also be the sole shareholder of the company, making it easy to set up a one-person company.</p>,
        category: 'Company Incorporation'
    },
    {
        q: 'Can foreigners own a Malaysian company?',
        a: <p>Yes, foreigners can own 100% of a Malaysian Sdn. Bhd. in most industries. However, the company must still fulfill the requirement of having at least one director who is ordinarily resident in Malaysia.</p>,
        category: 'Company Incorporation'
    },
    {
        q: 'What is the minimum share capital?',
        a: <p>You can start a company with a share capital as low as RM1. However, we generally recommend a minimum of RM1,000 to facilitate bank account opening and meet initial operational needs.</p>,
        category: 'Company Incorporation'
    },
    {
        q: 'Can I convert my Enterprise into a Sdn. Bhd.?',
        a: <p>While you cannot directly "convert" an enterprise or partnership, the standard procedure is to incorporate a new Sdn. Bhd. company and then transfer the business assets and operations from your old entity to the new one. We can guide you through this process.</p>,
        category: 'Company Incorporation'
    },

    // === Secretarial Services ===
    {
        q: 'Do I need to appoint a company secretary?',
        a: <p>Yes, it is a mandatory requirement under the Companies Act 2016. Every company must appoint at least one licensed company secretary within 30 days of its incorporation date. Our packages include this service.</p>,
        category: 'Secretarial Services'
    },
    {
        q: 'What are my annual compliance duties?',
        a: <p>Every year, your company must prepare and file its Financial Statements and an Annual Return with the Companies Commission of Malaysia (SSM). Our secretarial services ensure these deadlines are tracked and met to avoid penalties.</p>,
        category: 'Secretarial Services'
    },
    {
        q: 'Is an annual audit required?',
        a: <p>Not always. Small companies that meet certain criteria (such as low revenue, minimal assets, and few employees) may be exempted from audit. We can help you determine if your company qualifies for audit exemption.</p>,
        category: 'Secretarial Services'
    },
    {
        q: 'What is MBRS?',
        a: <p>MBRS (Malaysian Business Reporting System) is an online submission platform based on the XBRL format. It is mandatory for filing Annual Returns and Financial Statements. We handle MBRS submissions as part of our annual compliance service.</p>,
        category: 'Secretarial Services'
    },

    // === Billing & Payments ===
    {
        q: 'What payment methods do you accept?',
        a: <p>We accept all major credit cards (Visa, MasterCard, American Express) as well as online bank transfers. All payments are processed securely.</p>,
        category: 'Billing & Payments'
    },

    // === General ===
    {
        q: 'Do you provide a nominee director service?',
        a: <p>Yes, we offer nominee director services to help you fulfill the statutory requirement for a local resident director. This service includes the necessary legal agreements. Please contact us for more details.</p>,
        category: 'General'
    },
    {
        q: 'When does my company need to file taxes?',
        a: <p>A company is required to file its first tax return within 7 months of its financial year-end. Tax filing is mandatory even if the company is dormant or has not generated income.</p>,
        category: 'General'
    },
    {
        q: 'Can my company hire foreign employees?',
        a: <p>Yes. Once your company is incorporated and meets specific paid-up capital requirements, it can apply for Employment Passes to hire foreign workers. We can provide assistance with this process.</p>,
        category: 'General'
    },
    {
        q: 'Do you provide post-incorporation support?',
        a: <p>Absolutely. Our support doesn't end after registration. We offer ongoing secretarial services, compliance reminders, and expert advice to help you manage and grow your company effectively.</p>,
        category: 'General'
    }
];


// FIX: Explicitly typed FaqItem as a React.FC and updated 'answer' prop to accept ReactNode for rich content.
// FIX: Explicitly typed FaqItem as a React.FC and updated 'answer' prop to accept ReactNode for rich content.
const FaqItem: React.FC<{ question: string; answer: React.ReactNode }> = ({ question, answer }) => (
    <details className="group rounded-2xl bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden transition-all hover:shadow-md open:shadow-md open:ring-primary/20 dark:open:ring-primary/20">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <p className="text-lg font-bold text-slate-900 dark:text-white">{question}</p>
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 transition-all group-open:bg-primary group-open:text-white group-open:rotate-180">
                <span className="material-symbols-outlined">expand_more</span>
            </div>
        </summary>
        <div className="px-6 pb-6 pt-2">
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed text-base">{answer}</div>
        </div>
    </details>
);

const FaqPage: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Company Incorporation', 'Secretarial Services', 'General', 'Billing & Payments'];
    const filteredFaqs = filter === 'All' ? faqData : faqData.filter(faq => faq.category === filter);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-wide uppercase text-sm">Help & Support</span>
                    <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                        Frequently Asked <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">Questions</span>
                    </h1>
                    <p className="mt-6 text-xl text-slate-600 dark:text-slate-300">Have a question? We're here to help. Find answers to common questions below.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setFilter(cat)}
                            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 text-sm font-bold transition-all ${filter === cat ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    {/* FIX: Use unique question as key instead of index */}
                    {filteredFaqs.map((faq) => <FaqItem key={faq.q} question={faq.q} answer={faq.a} />)}
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
