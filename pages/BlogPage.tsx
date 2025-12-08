

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as contentful from 'contentful';
import contentfulClient from '../lib/contentfulClient';

// Defines the structure of our 'pageBlogPost' content type in Contentful.
type BlogPostSkeleton = contentful.EntrySkeletonType<{
    title: contentful.EntryFieldTypes.Text;
    slug: contentful.EntryFieldTypes.Text; // Added slug for unique URLs
    description: contentful.EntryFieldTypes.Text;
    category?: contentful.EntryFieldTypes.Text; // Added category for filtering
    featuredImage?: contentful.EntryFieldTypes.AssetLink;
}>;

const BlogPage: React.FC = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const ARTICLES_PER_PAGE = 4;

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                // Fetch entries of the 'pageBlogPost' content type, ordered by creation date.
                const response = await contentfulClient.getEntries<BlogPostSkeleton>({ content_type: 'pageBlogPost', order: ['-sys.createdAt'] });

                const formattedArticles = response.items.map((item) => {
                    // Use a type guard to ensure `featuredImage` is a resolved asset before accessing its `fields` property.
                    const featuredImage = item.fields.featuredImage;
                    const imageUrl =
                        featuredImage &&
                            'fields' in featuredImage &&
                            featuredImage.fields.file?.url
                            ? `https:${featuredImage.fields.file.url}`
                            : `https://picsum.photos/seed/${item.sys.id}/400/225`; // Fallback image

                    return {
                        title: item.fields.title,
                        slug: item.fields.slug, // Map the slug field
                        description: item.fields.description,
                        category: item.fields.category || 'General', // Default category
                        date: new Date(item.sys.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                        imageUrl: imageUrl,
                    };
                });
                setArticles(formattedArticles);
                setFilteredArticles(formattedArticles);
            } catch (err) {
                console.error("Failed to fetch articles from Contentful:", err);
                setError("Could not load blog posts. Please ensure your Contentful credentials are correct and that your 'pageBlogPost' content type includes a 'slug' field.");
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    // Filter articles when search query changes
    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const results = articles.filter(article =>
            (article.title?.toLowerCase() || '').includes(query) ||
            (article.description?.toLowerCase() || '').includes(query) ||
            (article.category?.toLowerCase() || '').includes(query)
        );
        setFilteredArticles(results);
        setCurrentPage(1); // Reset to first page on search
    }, [searchQuery, articles]);

    // Derive Dynamic Data
    const uniqueCategories = Array.from(new Set(articles.map(a => a.category))).sort();
    const recentPosts = articles.slice(0, 3); // Get top 3 most recent posts

    // Pagination Logic
    const indexOfLastArticle = currentPage * ARTICLES_PER_PAGE;
    const indexOfFirstArticle = indexOfLastArticle - ARTICLES_PER_PAGE;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));


    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <span className="text-primary font-bold tracking-wide uppercase text-sm">VSG Insights</span>
                        <h1 className="mt-2 text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">News</span>
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">Stay updated with the latest in corporate governance, compliance, and industry trends.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <div className="mb-6">
                            <div className="mb-10">
                                <label className="relative block max-w-lg">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                        <span className="material-symbols-outlined">search</span>
                                    </span>
                                    <input
                                        className="block w-full rounded-2xl border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                        placeholder="Search articles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>

                        {loading && (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-text-secondary-light dark:text-text-secondary-dark">Loading articles...</p>
                            </div>
                        )}

                        {error && (
                            <div className="flex justify-center items-center h-64 bg-red-100 dark:bg-red-900/30 rounded-lg p-4">
                                <p className="text-red-700 dark:text-red-300 text-center">{error}</p>
                            </div>
                        )}

                        {!loading && !error && (
                            <>
                                <div className="grid grid-cols-1 gap-10">
                                    {currentArticles.length > 0 ? currentArticles.map((article, index) => (
                                        <article key={index} className="flex flex-col md:flex-row gap-8 items-start group">
                                            <Link to={`/blog/${article.slug}`} className="w-full md:w-5/12 aspect-video shrink-0 bg-slate-100 rounded-2xl overflow-hidden relative shadow-md">
                                                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            </Link>
                                            <div className="flex-1 py-2">
                                                <div className="flex items-center gap-3 mb-3 text-xs font-bold uppercase tracking-wider text-primary">
                                                    <span>{article.category}</span>
                                                    <span className="size-1 rounded-full bg-slate-300"></span>
                                                    <span className="text-slate-500">5 min read</span>
                                                </div>
                                                <Link to={`/blog/${article.slug}`} className="block">
                                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors leading-tight">{article.title}</h2>
                                                </Link>
                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">{article.description}</p>
                                                <Link to={`/blog/${article.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                                                    Read Article <span className="material-symbols-outlined text-base">arrow_forward</span>
                                                </Link>
                                            </div>
                                        </article>
                                    )) : (
                                        <div className="sm:col-span-2 text-center py-16">
                                            <p className="text-text-secondary-light dark:text-text-secondary-dark">No articles found matching your search.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Pagination Controls */}
                                {filteredArticles.length > ARTICLES_PER_PAGE && (
                                    <div className="mt-12 flex items-center justify-center gap-2">
                                        <button
                                            onClick={goToPrevPage}
                                            disabled={currentPage === 1}
                                            aria-label="Go to previous page"
                                            className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-medium tracking-wide text-text-secondary-light dark:text-text-secondary-dark transition duration-300 hover:bg-slate-200 dark:hover:bg-slate-800 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <span className="material-symbols-outlined">chevron_left</span>
                                            <span>Prev</span>
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                            <button
                                                key={number}
                                                onClick={() => paginate(number)}
                                                aria-current={currentPage === number ? 'page' : undefined}
                                                className={`flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium tracking-wide transition duration-300 focus-visible:outline-none ${currentPage === number ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                                            >
                                                {number}
                                            </button>
                                        ))}
                                        <button
                                            onClick={goToNextPage}
                                            disabled={currentPage === totalPages}
                                            aria-label="Go to next page"
                                            className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-medium tracking-wide text-text-secondary-light dark:text-text-secondary-dark transition duration-300 hover:bg-slate-200 dark:hover:bg-slate-800 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <span>Next</span>
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                    </div>
                    <aside className="lg:col-span-4 space-y-10">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg ring-1 ring-slate-200 dark:ring-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Categories</h3>
                            <ul className="space-y-3">
                                {uniqueCategories.map((cat: any, i) => (
                                    <li key={i}>
                                        <button onClick={() => setSearchQuery(cat)} className="w-full flex items-center justify-between group p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                            <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-primary transition-colors">{cat}</span>
                                            <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg ring-1 ring-slate-200 dark:ring-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Recent Posts</h3>
                            <ul className="space-y-6">
                                {recentPosts.map((post: any, i) => (
                                    <li key={i} className="group">
                                        <Link to={`/blog/${post.slug}`} className="block font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors">{post.title}</Link>
                                        <p className="text-xs text-slate-500 mt-2 font-medium">{post.date}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;