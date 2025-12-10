
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import contentfulClient from './lib/contentfulClient';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage'; // Import the new component
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import IncorporationPage from './pages/IncorporationPage';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout = ({ logoUrl }: { logoUrl: string | null }) => (
  <div className="relative flex min-h-screen w-full flex-col text-text-primary-light dark:text-text-primary-dark">
    <Header logoUrl={logoUrl} />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer logoUrl={logoUrl} />
  </div>
);

const App: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) return storedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        // Updated to look for a Red variant of the logo to match the new theme
        const response = await contentfulClient.getAssets({
          'fields.title': 'Logo - VSG Secretary [Red & Transparent]',
          limit: 1,
        });
        if (response.items.length > 0 && response.items[0].fields.file?.url) {
          setLogoUrl(`https:${response.items[0].fields.file.url}`);
        } else {
          console.warn("Logo asset 'Logo - VSG Secretary [Red & Transparent]' not found in Contentful. Falling back to SVG.");
        }
      } catch (error) {
        console.error("Error fetching logo from Contentful:", error);
      }
    };
    fetchLogo();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout logoUrl={logoUrl} />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} /> {/* Add new route */}
          <Route path="/incorporation" element={<IncorporationPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;