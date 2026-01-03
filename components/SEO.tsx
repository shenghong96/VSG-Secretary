import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    canonical?: string;
    openGraph?: {
        title?: string;
        description?: string;
        url?: string;
        image?: string;
        type?: 'website' | 'article' | 'profile';
    };
    twitter?: {
        card?: 'summary' | 'summary_large_image';
        site?: string;
        creator?: string;
    };
    jsonLd?: Record<string, any> | Record<string, any>[];
}

const DEFAULT_TITLE = 'VSG Secretary | Corporate Secretarial Services in Malaysia';
const DEFAULT_DESCRIPTION = 'Your trusted partner for company incorporation, governance, and compliance in Malaysia. Focus on your business, we\'ll handle the rest.';
const DOMAIN = 'https://www.vsg-secretary.com';

const SEO: React.FC<SEOProps> = ({
    title,
    description = DEFAULT_DESCRIPTION,
    canonical,
    openGraph,
    twitter,
    jsonLd
}) => {
    const metaTitle = title ? `${title} | VSG Secretary` : DEFAULT_TITLE;
    const metaDescription = description;
    const canonicalUrl = canonical ? canonical : openGraph?.url || DOMAIN;

    // Ensure JSON-LD is always an array or wrapped in one if specifically requested, 
    // but Helmet handles script tags well. We'll simply map if it's an array.
    const schemas = Array.isArray(jsonLd) ? jsonLd : (jsonLd ? [jsonLd] : []);

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={openGraph?.type || 'website'} />
            <meta property="og:url" content={openGraph?.url || canonicalUrl} />
            <meta property="og:title" content={openGraph?.title || metaTitle} />
            <meta property="og:description" content={openGraph?.description || metaDescription} />
            {openGraph?.image && <meta property="og:image" content={openGraph?.image} />}

            {/* Twitter */}
            <meta name="twitter:card" content={twitter?.card || 'summary_large_image'} />
            <meta name="twitter:title" content={openGraph?.title || metaTitle} />
            <meta name="twitter:description" content={openGraph?.description || metaDescription} />
            {openGraph?.image && <meta name="twitter:image" content={openGraph?.image} />}

            {/* Structured Data (JSON-LD) */}
            {schemas.map((schema, index) => (
                <script type="application/ld+json" key={index}>
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEO;
