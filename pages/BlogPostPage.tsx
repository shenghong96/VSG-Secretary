import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as contentful from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document } from '@contentful/rich-text-types';
import contentfulClient from '../lib/contentfulClient';


// Defines the structure of our 'pageBlogPost' content type in Contentful.
type BlogPostSkeleton = contentful.EntrySkeletonType<{
    title: contentful.EntryFieldTypes.Text;
    slug: contentful.EntryFieldTypes.Text;
    description: contentful.EntryFieldTypes.Text;
    featuredImage?: contentful.EntryFieldTypes.AssetLink;
    content: contentful.EntryFieldTypes.RichText; // This will be a Document object from Contentful
}>;

// Type for the formatted article data used in the component's state.
type FormattedArticle = {
    title: string;
    imageUrl: string;
    content: Document; // Use the specific Document type for rich text
    publishedDate: string;
}

const BlogPostPage: React.FC = () => {
    const { t } = useTranslation();
    const { slug } = useParams<{ slug: string }>();
    const [article, setArticle] = useState<FormattedArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Options for the rich text renderer to handle embedded content.
    const options = {
        renderNode: {
            // This handles direct asset embeds (e.g., dropping an image into the rich text editor).
            [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
                const { file, description } = node.data.target?.fields || {};
                if (file && file.contentType.startsWith('image/')) {
                    return (
                        <figure className="my-8">
                            <img
                                src={`https:${file.url} `}
                                alt={description || ''}
                                className="w-full h-auto rounded-lg shadow-md"
                                width={file.details.image.width}
                                height={file.details.image.height}
                            />
                            {description && <figcaption className="mt-2 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">{description}</figcaption>}
                        </figure>
                    );
                }
                return null;
            },
            // This handles embedded entries, like the 'Rich Image' component.
            [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
                const entry = node.data.target;
                if (!entry || !entry.sys || !entry.fields) {
                    return null;
                }

                // Check if the embedded entry is our 'Rich Image' component.
                // Assuming the Content Type ID is 'componentRichImage' based on the component's name.
                if (entry.sys.contentType.sys.id === 'componentRichImage') {
                    const imageAsset = entry.fields.image;
                    const caption = entry.fields.caption;

                    if (imageAsset && imageAsset.fields && imageAsset.fields.file) {
                        const { file } = imageAsset.fields;
                        return (
                            <figure className="my-8">
                                <img
                                    src={`https:${file.url} `}
                                    alt={caption || imageAsset.fields.description || ''}
                                    className="w-full h-auto rounded-lg shadow-md"
                                    width={file.details.image.width}
                                    height={file.details.image.height}
                                />
                                {caption && <figcaption className="mt-2 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">{caption}</figcaption>}
                            </figure>
                        );
                    }
                }

                // Return null for other unhandled embedded entry types.
                return null;
            }
        },
    };

    useEffect(() => {
        const fetchArticle = async () => {
            if (!slug) {
                setError("No blog post specified.");
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const response = await contentfulClient.getEntries<BlogPostSkeleton>({
                    content_type: 'pageBlogPost',
                    'fields.slug': slug,
                    limit: 1,
                    include: 2, // Fetch nested entries (e.g., Rich Image component -> Image asset).
                });

                if (response.items.length > 0) {
                    const item = response.items[0];
                    const featuredImage = item.fields.featuredImage;
                    const imageUrl =
                        featuredImage &&
                            'fields' in featuredImage &&
                            featuredImage.fields.file?.url
                            ? `https:${featuredImage.fields.file.url} `
                            : `https://picsum.photos/seed/${item.sys.id}/1200/600`;

                    setArticle({
                        title: item.fields.title,
                        imageUrl: imageUrl,
                        content: item.fields.content as Document,
                        publishedDate: new Date(item.sys.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        }),
                    });
                } else {
                    setError(`Blog post with slug "${slug}" not found.`);
                }
            } catch (err) {
                console.error("Failed to fetch article from Contentful:", err);
                setError('Could not load the blog post. Please ensure your Contentful setup is correct.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [slug]);

    if (loading) {
        return (
            <div className="container mx-auto max-w-3xl py-10 sm:py-16 px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-text-secondary-light dark:text-text-secondary-dark">{t('blogPost.loading')}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto max-w-3xl py-10 sm:py-16 px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4">
                    <p className="text-red-700 dark:text-red-300">{error}</p>
                </div>
            </div>
        );
    }

    if (!article) {
        return null;
    }

    return (
        <div className="container mx-auto max-w-3xl py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
            <main>
                <div className="mb-8">
                    <Link to="/blog" className="text-primary font-medium hover:underline flex items-center gap-1 w-fit">
                        <span className="material-symbols-outlined">arrow_back</span>
                        {t('blogPost.backToBlog')}
                    </Link>
                </div>
                <article>
                    <h1 className="text-3xl md:text-4xl font-black !mb-2 text-text-primary-light dark:text-text-primary-dark">{article.title}</h1>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-base mb-6">{article.publishedDate}</p>
                    {article.imageUrl && <img src={article.imageUrl} alt={article.title} className="w-full rounded-xl my-8 aspect-video object-cover" />}

                    <div className="prose dark:prose-invert max-w-none prose-headings:text-text-primary-light dark:prose-headings:text-text-primary-dark prose-p:text-text-secondary-light dark:prose-p:text-text-secondary-dark prose-strong:text-text-primary-light dark:prose-strong:text-text-primary-dark prose-em:text-text-secondary-light dark:prose-em:text-text-secondary-dark prose-li:text-text-secondary-light dark:prose-li:text-text-secondary-dark prose-blockquote:text-text-secondary-light dark:prose-blockquote:text-text-secondary-dark">
                        {article.content ? documentToReactComponents(article.content, options) : <p>{t('blogPost.noContent')}</p>}
                    </div>
                </article>
            </main>
        </div>
    );
};

export default BlogPostPage;