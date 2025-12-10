
import React from 'react';
import { Link } from 'react-router-dom';

const adhocServices = [
    {
        category: 'Annual Submission Service',
        icon: 'event_note',
        services: [
            { name: 'Annual Return Filing', price: '400', notes: 'up to 5 directors/shareholders, +50 per additional (excl. SSM fees)' },
            { name: 'Unaudited/Audited Financial Statement Submission', price: '300', notes: 'Excl. SSM filing fees and online data entry' },
            { name: 'Beneficial Owner (BO) Submission/Update', price: '300', notes: 'Up to 3 Beneficiary Owner, +100 each additional' },
            { name: 'SSM Fees for Annual Submission', price: '200', notes: 'Government filing fees' },
        ],
    },
    {
        category: 'Company Updates & Changes',
        icon: 'change_circle',
        services: [
            { name: 'Change of Business/Branch Address', price: '100', notes: 'each' },
            { name: 'Company Name Reservation', price: '100', notes: 'each (incl. SSM fees)' },
            { name: 'Change of Accounting Records Address', price: '100', notes: 'each' },
            { name: 'Change of Company Name', price: '400', notes: 'Include SSM fees' },
            { name: 'Application for EPC (Exempt Private Company)', price: '800', notes: 'incl. SSM fees' },
            { name: 'Change of Nature of Business', price: '250', notes: '' },
        ],
    },
    {
        category: 'Constitution & Share Capital',
        icon: 'account_balance',
        services: [
            { name: 'Preparation of Term Sheet', price: 'From 1,500', notes: 'Drafting key investment terms' },
            { name: 'Preparation of Shareholder Agreement', price: 'From 3,000', notes: 'Custom agreement for rights & protections' },
            { name: 'Preparation of Constitution', price: 'From 2,000', notes: 'Drafting the company\'s governing rules' },
            { name: 'Adoption of Constitution', price: '100', notes: '' },
            { name: 'Amendment/Abolition of M&A', price: '500', notes: 'include SSM Fees' },
            { name: 'Share Allotment (first 3 allotments)', price: '300', notes: '+50/additional allotment, for existing Shareholder only' },
            { name: 'Transfer of Shares', price: '300/transfer', notes: 'Excl. stamp duty' },
            { name: 'Capital Reduction/Conversion/Subdivision of Shares', price: 'From 1,000', notes: '' },
        ],
    },
    {
        category: 'Directors & Shareholders',
        icon: 'groups',
        services: [
            { name: 'Update Director/Shareholder Particulars', price: '100', notes: 'each' },
            { name: 'Appointment of Corporate Representative & Authorized Representatives', price: '200', notes: '' },
            { name: 'Appointment of Director', price: '100', notes: 'each' },
            { name: 'Resignation of Director', price: '100', notes: 'each' },
            { name: 'Removal of Director', price: '200', notes: 'excl. meeting/notice costs' },
            { name: 'Update BO Details', price: '50', notes: 'per BO' },
            { name: 'Cease as BO', price: '50', notes: 'per BO' },
        ],
    },
    {
        category: 'Auditor, Tax Agent & Financial Year',
        icon: 'monitoring',
        services: [
            { name: 'Fixing of 1st FYE & Appointment of Auditor/Tax Agent', price: '200', notes: '' },
            { name: 'Change of Auditor', price: '150', notes: '' },
            { name: 'Change of Tax Agent', price: '100', notes: '' },
            { name: 'Change of FYE', price: '150', notes: '' },
            { name: 'Extension of Time for FS (EOT)', price: '350', notes: 'incl. SSM fees' },
        ],
    },
    {
        category: 'Dividends, Resolutions & Certifications',
        icon: 'payments',
        services: [
            { name: 'Dividend Declaration', price: '300', notes: 'for first, then +50 for 2nd onwards' },
            { name: 'Purchase of SSM Profile/Form', price: '50', notes: 'Include SSM Fees' },
            { name: 'Bank Resolutions (Open/Close/Change Signatories)', price: '150/account', notes: 'incl. CTC' },
            { name: 'Certified True Copy (CTC) Documents', price: '5', notes: 'per form' },
        ],
    },
    {
        category: 'Meetings, Delivery & Misc.',
        icon: 'local_shipping',
        services: [
            { name: 'Secretary Meeting Attendance', price: '700 per day', notes: 'AGM / EGM' },
            { name: 'Attending Matters Outside Office', price: '300/hour/pax', notes: 'Other than AGM / EGM, excl. travel' },
            { name: 'Courier Service', price: '10', notes: '+ delivery fee' },
            { name: 'Instant Delivery', price: 'From 50', notes: '+ delivery fee' },
            { name: 'Virtual Business Address (mail notification & scanning)', price: '1,800/year', notes: '' },
        ],
    },
    {
        category: 'Termination, Strike-Off & Winding Up',
        icon: 'cancel',
        services: [
            { name: 'Strike-Off Application (Dormant Co.)', price: 'From 3,000', notes: 'excl. SSM fees' },
            { name: 'Members\' Voluntary Winding Up', price: 'From 10,000', notes: '' },
        ],
    },
    {
        category: 'Business & Corporate Services',
        icon: 'business_center',
        services: [
            { name: 'LLP Registration', price: '1,888', notes: 'incl. SSM fee, complete registration package' },
            { name: 'Business License', price: 'Quote', notes: 'Various license types available' },
            { name: 'Accounting & Bookkeeping', price: 'Quote', notes: 'Dormant: 800, Monthly: 1,800' },
            { name: 'Tax Filing', price: 'From 1,500', notes: 'Corporate tax preparation' },
            { name: 'Audit', price: 'From 1,500/report', notes: 'Professional audit services' },
            { name: 'Employment Pass (Expatriates)', price: 'From 10,000', notes: 'Complete EP application' },
            { name: 'HR & Employment', price: 'From 1,500', notes: 'HR consultation & setup' },
            { name: 'Payroll Outsourcing', price: 'From 80', notes: 'per headcount, monthly management' },
            { name: 'Trademark Registration', price: 'Quote', notes: 'Intellectual property protection' },
            { name: 'Corporate Website', price: 'From 4,500', notes: 'Professional web development' },
        ],
    },
    {
        category: 'Other Services',
        icon: 'build_circle',
        services: [
            { name: 'Confirmation Letter – No Constitution', price: '100', notes: '' },
            { name: 'Confirmation Letter (General)', price: 'From 150', notes: '' },
            { name: 'Self-Ink Rubber Stamp', price: '100/unit', notes: '' },
            { name: 'Common Seal (ø38mm)', price: 'From 100', notes: '' },
            { name: 'Other Resolution/Letter Preparation', price: '100/letter', notes: '' },
        ],
    },
];

const PricingCategoryTable: React.FC<{ category: string; icon: string; services: { name: string; price: string; notes?: string }[] }> = ({ category, icon, services }) => (
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
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 sm:py-32">
            <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-primary font-bold tracking-wide uppercase text-sm">Transparent Pricing</span>
                    <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                        Clear & Simple<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">Pricing for Growth</span>
                    </h1>
                    <p className="mt-6 text-xl text-slate-600 dark:text-slate-300">Find the right plan for your business. No hidden fees, ever. We believe in transparency and providing value from day one.</p>
                    <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <span className="material-symbols-outlined !text-lg">verified</span>
                        30-Day Money-Back Guarantee
                    </div>
                </div>

                <div className="mb-20">
                    <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-slate-900 dark:text-white">One-time Fee</h2>
                    <div className="max-w-5xl mx-auto rounded-3xl bg-white shadow-xl dark:bg-slate-900 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
                        <div className="flex flex-col md:flex-row">
                            <div className="flex flex-col justify-center items-center p-12 bg-slate-900 text-white md:w-1/3">
                                <p className="text-primary-light font-bold uppercase tracking-wider text-sm">All-Inclusive Package</p>
                                <p className="text-6xl font-black tracking-tight my-4">RM1899</p>
                                <p className="text-slate-400 text-center">One-time fee to get your company registered.</p>
                            </div>
                            <div className="flex-1 p-12 md:p-16">
                                <p className="text-xl font-medium text-slate-900 dark:text-white mb-8">Everything you need to kickstart your business in Malaysia:</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>Company Name Registration</li>
                                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>SSM Filing Fees Included</li>
                                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>1 set Bank Account Opening Resolution</li>
                                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>First Board Resolution</li>
                                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>24/7 Access to Client Portal</li>
                                </ul>
                                <div className="mt-10">
                                    <Link to="/incorporation" className="inline-flex w-full md:w-auto items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:bg-primary-hover hover:shadow-glow">
                                        Incorporate Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-24">
                    <h2 className="text-3xl font-bold tracking-tight text-center mb-4 text-slate-900 dark:text-white">Ongoing Secretarial Services</h2>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">Keep your company compliant with our hassle-free annual plan.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
                        {/* Basic Plan */}
                        <div className="flex flex-col rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 transition-all hover:scale-[1.01]">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Basic</h3>
                            <p className="mt-2 text-slate-500">Essential services to keep you compliant.</p>
                            <div className="my-8"><span className="text-5xl font-black text-slate-900 dark:text-white">RM89</span><span className="text-slate-500">/ month</span></div>
                            <ul className="space-y-4 flex-grow mb-8">
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary">check</span>Registered Office Address</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary">check</span>Licensed Company Secretary</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary">check</span>Basic Compliance Alerts</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary">check</span>Document Storage Portal</li>
                                <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary mt-0.5">check</span>Secure Digital Identity & Signature</li>
                            </ul>
                            <Link to="/incorporation" className="mt-auto flex w-full items-center justify-center rounded-xl bg-slate-100 py-4 text-base font-bold text-slate-900 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                                Select Basic Plan
                            </Link>
                        </div>

                        {/* Annual Plan (Best Value) */}
                        <div className="relative flex flex-col rounded-3xl bg-white p-8 shadow-2xl ring-2 ring-primary dark:bg-slate-900 transition-all hover:scale-[1.02] hover:shadow-glow">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-6 py-2 text-sm font-bold uppercase text-white shadow-lg">Most Popular</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Annual Package</h3>
                            <p className="mt-2 text-slate-500">Best value for long-term peace of mind.</p>
                            <div className="my-8"><span className="text-5xl font-black text-slate-900 dark:text-white">RM1500</span><span className="text-slate-500">/ year</span></div>
                            <ul className="space-y-4 flex-grow mb-8">
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary">check</span>All Features in Basic Plan</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary">check</span>Annual General Meeting (AGM) Preparation</li>
                                <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-primary mt-0.5">check</span>Annual Filing with SSM (Annual Return, AFS, BO)</li>
                                <li className="flex items-center gap-3 font-bold text-slate-900 dark:text-white"><span className="material-symbols-outlined text-primary">check</span>Priority Compliance Support</li>
                                <li className="flex items-center gap-3 font-bold text-slate-900 dark:text-white"><span className="material-symbols-outlined text-primary">check</span>Priority Support Response</li>
                            </ul>
                            <Link to="/incorporation" className="mt-auto flex w-full items-center justify-center rounded-xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover hover:shadow-glow">
                                Choose Annual Plan
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto py-16 px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold">Ad-hoc Services & Rates</h2>
                        <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">Need something specific? We offer a wide range of ad-hoc services. Contact us for a personalized quote.</p>
                    </div>
                    <div className="space-y-8">
                        {adhocServices.map(categoryData => (
                            <PricingCategoryTable
                                key={categoryData.category}
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
                            <h3 className="text-xl font-bold flex items-center gap-2"><span className="material-symbols-outlined text-primary">info</span>Please Note</h3>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-text-secondary-light dark:text-text-secondary-dark text-sm">
                                <li>All professional fees listed exclude government/agency charges (e.g., SSM, LHDN, local councils).</li>
                                <li>Fees may vary depending on complexity; additional charges will be communicated and agreed in advance.</li>
                                <li>Disbursements such as courier, printing, and stamping are billed separately unless otherwise stated.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold flex items-center gap-2"><span className="material-symbols-outlined text-primary">gavel</span>Terms and Conditions</h3>
                            <div className="mt-4 space-y-4 text-text-secondary-light dark:text-text-secondary-dark text-sm">
                                <p><strong>Taxes and Fees:</strong> All government fees, agency charges, and disbursements (e.g., printing, courier, stationery) are borne by the client.</p>
                                <p><strong>Payment Terms:</strong> Payment is due within 7 days from invoice date. Late payments may incur interest at 1.5% per month (calculated daily).</p>
                                <p><strong>Turnaround Time:</strong> Normal service is 3–7 business days. Urgent requests may be processed within 1–2 business days, subject to RM150 express fee per request.</p>
                                <p><strong>Confidentiality:</strong> All client information will be kept confidential, except where disclosure is required by law, regulation, or court order.</p>
                                <p><strong>Limitation of Liability:</strong> Our liability for any claim shall not exceed the total fees paid by the client for the specific service giving rise to the claim. We are not liable for indirect or consequential damages.</p>
                                <p><strong>Governing Law:</strong> These terms are governed by the laws of Malaysia, and disputes shall be resolved in Malaysian courts.</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold flex items-center gap-2 text-amber-600 dark:text-amber-500"><span className="material-symbols-outlined">warning</span>Disclaimers</h3>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-text-secondary-light dark:text-text-secondary-dark text-sm">
                                <li>Advice and recommendations are based solely on information provided by the client.</li>
                                <li>Clients are responsible for all business decisions made based on our advice or recommendations.</li>
                                <li>Our services are limited to the agreed scope outlined in the invoice/engagement letter. Any additional services will require separate agreement and may incur additional fees.</li>
                                <li>We do not guarantee approval by authorities, nor exemption from fines or penalties arising from regulatory non-compliance.</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PricingPage;
