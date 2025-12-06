import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC<{ logoUrl: string | null }> = ({ logoUrl }) => {
    return (
        <footer className="bg-slate-900 text-slate-200 border-t border-slate-800">
            <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2">
                            {logoUrl ? (
                                <img src={logoUrl} alt="VSG Secretary Logo" className="h-10 w-auto" />
                            ) : (
                                <>
                                    <div className="size-8 text-primary">
                                        <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" d="M24 2L46 24L24 46L2 24L24 2ZM24 10L34 20L24 30L14 20L24 10Z" fillRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-white text-xl tracking-tight">VSG Secretary</h3>
                                </>
                            )}
                        </div>
                        <p className="mt-6 text-sm leading-relaxed text-slate-400">The easiest way to start and manage your business compliance. Professional, reliable, and digital-first.</p>
                        <div className="mt-8 space-y-2 text-xs text-slate-500">
                            <p className="font-bold uppercase tracking-wider text-slate-400">VENTURE SYNERGIZE GROUP SDN. BHD.</p>
                            <p>Registration No. : 202301020217 (1514139-K)</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">Services</h3>
                        <ul className="mt-6 space-y-4 text-sm">
                            <li><Link className="text-slate-400 transition-colors hover:text-primary hover:pl-1" to="/services">Company Incorporation</Link></li>
                            <li><Link className="text-slate-400 transition-colors hover:text-primary hover:pl-1" to="/services">Secretarial Services</Link></li>
                            <li><Link className="text-slate-400 transition-colors hover:text-primary hover:pl-1" to="/services">Compliance & Governance</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">Company</h3>
                        <ul className="mt-6 space-y-4 text-sm">
                            <li><Link className="text-slate-400 transition-colors hover:text-primary hover:pl-1" to="/about">About Us</Link></li>
                            <li><Link className="text-slate-400 transition-colors hover:text-primary hover:pl-1" to="/pricing">Pricing</Link></li>
                            <li><Link className="text-slate-400 transition-colors hover:text-primary hover:pl-1" to="/blog">Blog</Link></li>
                            <li><Link className="text-slate-400 transition-colors hover:text-primary hover:pl-1" to="/faq">FAQ</Link></li>
                            <li><Link className="text-slate-400 transition-colors hover:text-primary hover:pl-1" to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">Connect</h3>
                        <ul className="mt-6 space-y-4 text-sm">
                            <li><a href="#" className="flex items-center gap-2 text-slate-400 transition-colors hover:text-primary"><span className="material-symbols-outlined !text-lg">public</span> Facebook</a></li>
                            <li><a href="#" className="flex items-center gap-2 text-slate-400 transition-colors hover:text-primary"><span className="material-symbols-outlined !text-lg">work</span> LinkedIn</a></li>
                            <li><a href="#" className="flex items-center gap-2 text-slate-400 transition-colors hover:text-primary"><span className="material-symbols-outlined !text-lg">campaign</span> Twitter</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} VSG Secretary. All rights reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link to="/#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link to="/#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;