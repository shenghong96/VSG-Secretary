import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const currentLanguage = i18n.language;

    // Simple style for the switcher
    const buttonStyle = (lng: string) => ({
        fontWeight: currentLanguage?.startsWith(lng) ? 'bold' : 'normal',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        color: 'inherit',
        padding: '0 5px',
        marginLeft: '5px',
        fontSize: '0.9rem',
        opacity: currentLanguage?.startsWith(lng) ? 1 : 0.6,
    });

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
                onClick={() => changeLanguage('en')}
                style={buttonStyle('en')}
                aria-label="Switch to English"
            >
                EN
            </button>
            <span style={{ opacity: 0.5 }}>|</span>
            <button
                onClick={() => changeLanguage('zh')}
                style={buttonStyle('zh')}
                aria-label="Switch to Chinese"
            >
                中文
            </button>
        </div>
    );
};

export default LanguageSwitcher;
