
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert('Message sent! (Simulation)');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <span className="text-primary font-bold tracking-wide uppercase text-sm">Contact Us</span>
                    <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">Touch</span>
                    </h1>
                    <p className="mt-6 text-xl text-slate-600 dark:text-slate-300">We'd love to hear from you. We typically respond within 2 business hours.</p>
                </div>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
                    <div className="lg:col-span-3">
                        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 sm:p-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2" htmlFor="name">Name</label>
                                        <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className="block w-full rounded-xl border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-primary sm:text-sm" placeholder="Enter your full name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2" htmlFor="email">Email</label>
                                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="block w-full rounded-xl border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-primary sm:text-sm" placeholder="Enter your email address" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2" htmlFor="subject">Subject</label>
                                    <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} required className="block w-full rounded-xl border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-primary sm:text-sm" placeholder="What is your message about?" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2" htmlFor="message">Message</label>
                                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="block w-full rounded-xl border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-primary sm:text-sm" placeholder="Write your message here..."></textarea>
                                </div>
                                <div>
                                    <button type="submit" disabled={loading} className="flex w-full items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] hover:bg-primary-hover hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed">
                                        {loading ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <span className="truncate">Send Message</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="space-y-8">
                            <div className="rounded-3xl bg-slate-100 p-8 dark:bg-slate-800/50">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-md"><span className="material-symbols-outlined text-xl">mail</span></div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Email</p>
                                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="mailto:ryanlau@vsgsecretary.com">ryanlau@vsgsecretary.com</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-md"><span className="material-symbols-outlined text-xl">call</span></div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Phone</p>
                                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="tel:+60137499586">+60-13 749 9586</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-md"><span className="material-symbols-outlined text-xl">location_on</span></div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Office</p>
                                            <address className="not-italic text-slate-600 dark:text-slate-400">33-01-13A, 33rd Floor, Menara Keck Seng, 203, Jalan Bukit Bintang, 55100 Kuala Lumpur, W.P. Kuala Lumpur, Malaysia</address>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;