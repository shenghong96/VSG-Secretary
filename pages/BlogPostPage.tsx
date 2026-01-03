import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as contentful from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document } from '@contentful/rich-text-types';
import contentfulClient from '../lib/contentfulClient';
import SEO from '../components/SEO';

// -- Type Definitions --

// Service Skeleton for related services (assuming a simple structure)
type ServiceSkeleton = contentful.EntrySkeletonType<{
    title: contentful.EntryFieldTypes.Text;
    slug?: contentful.EntryFieldTypes.Text;
    shortDescription?: contentful.EntryFieldTypes.Text;
}>;

// Main Blog Post Skeleton - Updated for SEO Article content model
type BlogPostSkeleton = contentful.EntrySkeletonType<{
    title: contentful.EntryFieldTypes.Text;
    subtitle?: contentful.EntryFieldTypes.Text;
    slug: contentful.EntryFieldTypes.Text;
    seoTitle?: contentful.EntryFieldTypes.Text;
    seoDescription?: contentful.EntryFieldTypes.Text;
    contentBody: contentful.EntryFieldTypes.RichText; // Changed from 'content'
    keyFacts?: contentful.EntryFieldTypes.Text; // Changed from RichText to Text (Long text)
    legalReferences?: contentful.EntryFieldTypes.Text; // Changed from Array to Text (Short text)
    relatedBlogPosts?: contentful.EntryFieldTypes.Array<contentful.EntryFieldTypes.EntryLink<BlogPostSkeleton>>;
    relatedServices?: contentful.EntryFieldTypes.Array<contentful.EntryFieldTypes.EntryLink<ServiceSkeleton>>;
    relatedArticles?: contentful.EntryFieldTypes.Array<contentful.EntryFieldTypes.EntryLink<BlogPostSkeleton>>;
    category?: contentful.EntryFieldTypes.Text;
    tags?: contentful.EntryFieldTypes.Text; // Changed from Array to Text (Short text)
    featuredImage?: contentful.EntryFieldTypes.AssetLink;
    lastReviewedDate?: contentful.EntryFieldTypes.Date;
    publishedDate?: contentful.EntryFieldTypes.Date;
}>;

// Formatted Article State
type FormattedArticle = {
    title: string;
    subtitle?: string;
    slug: string;
    seoTitle?: string;
    seoDescription?: string;
    imageUrl: string;
    content: Document;
    keyFacts?: string;
    legalReferences?: string;
    relatedPosts: Array<{ title: string; slug: string; imageUrl?: string; date: string }>;
    relatedServices: Array<{ title: string; slug?: string; description?: string }>;
    category: string;
    tags?: string;
    publishedDate: string;
    lastReviewedDate?: string;
    isoDate: string;
}

const BlogPostPage: React.FC = () => {
    const { t } = useTranslation();
    const { slug } = useParams<{ slug: string }>();
    const [article, setArticle] = useState<FormattedArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // -- Rich Text Options --
    const options = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
                const { file, description } = node.data.target?.fields || {};
                if (file && file.contentType.startsWith('image/')) {
                    return (
                        <figure className="my-8">
                            <img
                                src={`https:${file.url}`}
                                alt={description || ''}
                                className="w-full h-auto rounded-xl shadow-lg"
                                width={file.details.image.width}
                                height={file.details.image.height}
                                loading="lazy"
                            />
                            {description && <figcaption className="mt-3 text-center text-sm text-slate-500 italic">{description}</figcaption>}
                        </figure>
                    );
                }
                return null;
            },
            [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
                // Fallback for Rich Image if used
                if (node.data.target?.sys?.contentType?.sys?.id === 'componentRichImage') {
                    const fields = node.data.target.fields;
                    const image = fields.image?.fields?.file;
                    const caption = fields.caption;
                    if (image) {
                        return (
                            <figure className="my-8">
                                <img src={`https:${image.url}`} alt={caption || ''} className="w-full rounded-xl shadow-lg" />
                                {caption && <figcaption className="mt-2 text-center text-sm text-slate-500">{caption}</figcaption>}
                            </figure>
                        )
                    }
                }
                return null;
            }
        },
    };

    // -- Data Fetching --
    useEffect(() => {
        const fetchArticle = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                const response = await contentfulClient.getEntries<BlogPostSkeleton>({
                    content_type: 'pageBlogPost',
                    'fields.slug': slug,
                    limit: 1,
                    include: 3, // Increased include depth for related items
                });

                if (response.items.length > 0) {
                    const item = response.items[0];
                    const fields = item.fields;

                    // Image Helper
                    const getImageUrl = (img: any) =>
                        (img?.fields?.file?.url) ? `https:${img.fields.file.url}` : null;

                    const heroImage = getImageUrl(fields.featuredImage) || `https://picsum.photos/seed/${item.sys.id}/1200/600`;

                    // Process Related Posts
                    const relatedPosts = (fields.relatedBlogPosts as any[])?.map((p: any) => ({
                        title: p.fields.title,
                        slug: p.fields.slug,
                        imageUrl: getImageUrl(p.fields.featuredImage),
                        date: new Date(p.sys.createdAt).toLocaleDateString()
                    })) || [];

                    // Process Related Services
                    const relatedServices = (fields.relatedServices as any[])?.map((s: any) => ({
                        title: s.fields.title,
                        slug: s.fields.slug,
                        description: s.fields.shortDescription
                    })) || [];

                    setArticle({
                        title: fields.title,
                        subtitle: fields.subtitle,
                        slug: fields.slug,
                        seoTitle: fields.seoTitle,
                        seoDescription: fields.seoDescription,
                        imageUrl: heroImage,
                        content: fields.contentBody as Document, // Changed from 'content' to 'contentBody'
                        keyFacts: fields.keyFacts, // Now a string (Long text)
                        legalReferences: fields.legalReferences, // Now a string (Short text)
                        relatedPosts,
                        relatedServices,
                        category: fields.category || 'General',
                        tags: fields.tags, // Now a string (Short text)
                        publishedDate: fields.publishedDate ? new Date(fields.publishedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : new Date(item.sys.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                        lastReviewedDate: fields.lastReviewedDate ? new Date(fields.lastReviewedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : undefined,
                        isoDate: fields.publishedDate || item.sys.createdAt,
                    });
                } else {
                    setError(`Article not found.`);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load article.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [slug]);

    if (loading) return <div className="min-h-screen grid place-items-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div></div>;
    if (error || !article) return <div className="min-h-screen grid place-items-center text-red-500">{error || 'Page not found'}</div>;

    // -- Schema & SEO --
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.seoTitle || article.title,
        "description": article.seoDescription || article.subtitle,
        "image": article.imageUrl,
        "datePublished": article.isoDate,
        "dateModified": article.lastReviewedDate ? new Date(article.lastReviewedDate).toISOString() : article.isoDate,
        "author": { "@type": "Organization", "name": "VSG Secretary" }
    };

    return (
        <div className="bg-white dark:bg-slate-950 pb-20">
            <SEO
                title={article.seoTitle || article.title}
                description={article.seoDescription || article.subtitle || ''}
                openGraph={{ type: 'article', image: article.imageUrl }}
                jsonLd={articleSchema}
            />

            {/* -- Hero Section -- */}
            <header className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 dark:bg-black/40 z-0"></div>
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="max-w-4xl">
                        {/* Meta Badges */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full">{article.category}</span>
                            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{article.publishedDate}</span>
                            {article.lastReviewedDate && (
                                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-medium bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-md">
                                    <span className="material-symbols-outlined text-sm">verified</span> Updated {article.lastReviewedDate}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6">
                            {article.title}
                        </h1>
                        {article.subtitle && (
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
                                {article.subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </header>

            {/* -- Featured Image (Full Width Container) -- */}
            <div className="container mx-auto px-4 max-w-7xl -mt-8 mb-16 relative z-10">
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full aspect-[21/9] object-cover rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800"
                />
            </div>

            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* -- Main Content (8 cols) -- */}
                    <main className="lg:col-span-8">
                        <div className="prose prose-lg dark:prose-invert max-w-none 
                            prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
                            prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                            prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-8
                            prose-a:text-primary hover:prose-a:underline
                            prose-li:text-slate-600 dark:prose-li:text-slate-300
                            prose-strong:text-slate-900 dark:prose-strong:text-white
                            prose-img:rounded-2xl prose-img:shadow-lg">
                            {documentToReactComponents(article.content, options)}
                        </div>

                        {/* Legal References (Footnotes style) */}
                        {article.legalReferences && article.legalReferences.trim() && (
                            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined">gavel</span> Legal References
                                </h3>
                                <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                                    {article.legalReferences}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        {article.tags && article.tags.trim() && (
                            <div className="mt-8 flex flex-wrap gap-2">
                                {article.tags.split(',').map((tag, i) => (
                                    <Link key={i} to={`/blog?search=${tag.trim()}`} className="text-sm text-primary hover:underline">
                                        #{tag.trim()}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </main>

                    {/* -- Sidebar (4 cols) -- */}
                    <aside className="lg:col-span-4 space-y-8">

                        {/* Key Facts Panel */}
                        {article.keyFacts && article.keyFacts.trim() && (
                            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-32">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">lightbulb</span> Quick Facts
                                </h3>
                                <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                                    {article.keyFacts}
                                </div>
                            </div>
                        )}

                        {/* Related Services / CTAs */}
                        {(article.relatedServices && article.relatedServices.length > 0) && (
                            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recommended Services</h3>
                                <div className="flex flex-col gap-3">
                                    {article.relatedServices.map((service, i) => (
                                        <Link
                                            key={i}
                                            to={service.slug ? `/services` : '/contact'}
                                            className="group flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-700 hover:border-primary dark:hover:border-primary"
                                        >
                                            <span className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{service.title}</span>
                                            <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-6 text-center">
                                    <Link to="/contact" className="inline-block w-full py-3 px-6 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary/20">
                                        Get a Custom Quote
                                    </Link>
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </div>

            {/* -- Related Articles Footer -- */}
            {article.relatedPosts.length > 0 && (
                <section className="bg-slate-50 dark:bg-slate-900/50 py-16 mt-20 border-t border-slate-200 dark:border-slate-800">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {article.relatedPosts.map((post, i) => (
                                <Link key={i} to={`/blog/${post.slug}`} className="group block">
                                    <div className="aspect-video rounded-xl overflow-hidden bg-white shadow-sm mb-4">
                                        {post.imageUrl ? (
                                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">No Image</div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                                    <p className="text-sm text-slate-500">{post.date}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default BlogPostPage;