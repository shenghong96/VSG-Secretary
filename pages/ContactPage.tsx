import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SEO from '../components/SEO';

const ContactPage: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert('Message sent successfully!');
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "VSG Secretary",
        "image": "https://www.vsg-secretary.com/logo.png",
        "telephone": "+60123456789", // Placeholder, replace with real if available
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Level 1, Some Building", // Placeholder
            "addressLocality": "Kuala Lumpur",
            "addressRegion": "Kuala Lumpur",
            "postalCode": "50450",
            "addressCountry": "MY"
        },
        "priceRange": "$$"
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 sm:py-32">
            <SEO
                title="Contact Us"
                description="Get in touch with VSG Secretary for expert company incorporation and secretarial advice."
                canonical="https://www.vsg-secretary.com/contact"
                jsonLd={localBusinessSchema}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                        {t('contactPage.hero.title', 'Contact Us')}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                        {t('contactPage.hero.subtitle', 'We’d love to hear from you. Please fill out this form.')}
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                                {t('contactPage.form.name', 'Name')}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-white dark:bg-slate-900"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                                {t('contactPage.form.email', 'Email')}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-white dark:bg-slate-900"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                                {t('contactPage.form.subject', 'Subject')}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-white dark:bg-slate-900"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                                {t('contactPage.form.message', 'Message')}
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-white dark:bg-slate-900"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                        >
                            {isSubmitting ? t('contactPage.form.submitting', 'Sending...') : t('contactPage.form.submit', 'Send message')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;