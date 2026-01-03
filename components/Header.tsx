
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const Header = ({ logoUrl }: { logoUrl: string | null }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const activeLinkClass = "text-primary dark:text-primary font-bold";
  const inactiveLinkClass = "text-text-primary-light hover:text-primary dark:text-text-primary-dark dark:hover:text-primary";

  const navLinks = [
    { name: t('header.home'), path: '/home' },
    { name: t('header.services'), path: '/services' },
    { name: t('header.pricing'), path: '/pricing' },
    { name: t('header.about'), path: '/about' },
    { name: t('header.blog'), path: '/blog' },
    { name: t('header.faq'), path: '/faq' },
    { name: t('header.contact'), path: '/contact' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: 'Chinese' }
  ];

  const handleLangChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langMenuRef]);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/70 backdrop-blur-md transition-all dark:border-border-dark/50 dark:bg-background-dark/70 supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/home" className="flex items-center gap-2">
          {logoUrl ? (
            <img src={logoUrl} alt="VSG Secretary Logo" className="h-14 w-auto" />
          ) : (
            <>
              <div className="size-6 text-primary">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 2L46 24L24 46L2 24L24 2ZM24 10L34 20L24 30L14 20L24 10Z" fillRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold tracking-tight text-text-primary-light dark:text-text-primary-dark">{t('header.title')}</h2>
            </>
          )}
        </NavLink>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} text-sm font-medium transition-colors`}
              end
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangMenuOpen(prev => !prev)}
              className="flex h-9 items-center justify-center gap-2 rounded-lg bg-slate-200/50 px-3 text-sm font-medium text-text-secondary-light hover:bg-slate-200 dark:bg-slate-800/50 dark:text-text-secondary-dark dark:hover:bg-slate-800"
              aria-haspopup="true"
              aria-expanded={isLangMenuOpen}
            >
              <span className="material-symbols-outlined !text-xl">language</span>
              <span>{languages.find(l => l.code === i18n.language)?.name || 'English'}</span>
              <span className={`material-symbols-outlined !text-base transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {isLangMenuOpen && (
              <div className="absolute right-0 top-full z-10 mt-2 w-48 origin-top-right rounded-xl bg-white/90 p-1 shadow-xl ring-1 ring-black ring-opacity-5 backdrop-blur-xl focus:outline-none dark:bg-section-dark/90 dark:ring-border-dark" role="menu" aria-orientation="vertical">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    className="block w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-text-primary-light transition-colors hover:bg-primary/5 hover:text-primary dark:text-text-primary-dark dark:hover:bg-primary/10"
                    role="menuitem"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link to="/incorporation" className="hidden min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-wide shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primary-hover hover:shadow-primary/40 sm:flex">
            <span className="truncate">{t('header.incorporation')}</span>
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 md:hidden">
            <span className="material-symbols-outlined text-text-primary-light dark:text-text-primary-dark">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute w-full bg-background-light dark:bg-background-dark md:hidden border-t border-border-light dark:border-border-dark">
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} rounded-md px-3 py-2 text-base font-medium`}
                end
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/incorporation" className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] transition-opacity hover:opacity-90">
              <span className="truncate">{t('header.incorporation')}</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
