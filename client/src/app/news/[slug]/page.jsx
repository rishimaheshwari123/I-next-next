'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaCalendar, FaClock, FaShareAlt, FaUser, FaTags, FaChevronDown, FaChevronUp, FaInfoCircle } from 'react-icons/fa';
import { BASE_URL } from '@/config/api';

// Interactive FAQ Accordion Item Component
const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50/30 transition-all duration-300">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left font-bold text-gray-800 hover:bg-gray-50 transition-all focus:outline-none gap-4"
      >
        <span className="text-base sm:text-lg">{faq.question}</span>
        <span className="text-orange-500 font-semibold text-xl flex-shrink-0">
          {isOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
        </span>
      </button>
      {isOpen && (
        <div className="p-5 pt-0 text-sm sm:text-base text-gray-600 border-t border-gray-150 bg-white leading-relaxed animate-fade-in">
          {faq.answer}
        </div>
      )}
    </div>
  );
};

export default function SingleBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      fetchBlog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/blog/slug/${params.slug}`
      );
      if (response.data.success) {
        setBlog(response.data.blog);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Blog not found');
      router.push('/news');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: blog.title,
          text: blog.shortDescription || blog.metaDescription || blog.title,
          url: window.location.href,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const stripHtml = (html) => {
    if (typeof window === 'undefined') return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const calculateReadTime = (text) => {
    const wordsPerMinute = 200;
    const words = stripHtml(text).split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <Link
            href="/news"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  // Schema Markup generation
  const articleLD = blog.articleSchema ? {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": blog.title,
    "description": blog.shortDescription || blog.metaDescription,
    "image": [blog.image],
    "datePublished": blog.createdAt,
    "dateModified": blog.updatedAt,
    "author": {
      "@type": "Person",
      "name": blog.author || "Admin"
    }
  } : null;

  const faqLD = (blog.faqSchema && blog.faqs && blog.faqs.length > 0) ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": blog.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const breadcrumbLD = blog.breadcrumbSchema ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://rentalmeet.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "News & Blogs",
        "item": "https://rentalmeet.com/news"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": `https://rentalmeet.com/news/${blog.slug}`
      }
    ]
  } : null;

  return (
    <div className="min-h-screen bg-slate-50 py-40">
      
      {/* Schema Injection */}
      {articleLD && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLD) }}
        />
      )}
      {faqLD && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
        />
      )}
      {breadcrumbLD && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link
          href="/news"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 px-4 py-2 border border-gray-250 rounded-xl bg-white hover:shadow-sm transition-all"
        >
          <FaArrowLeft className="text-sm" />
          <span className="font-semibold text-sm">Back to All Blogs</span>
        </Link>

        {/* Category & Status */}
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm uppercase tracking-wider">
            {blog.category}
          </span>
          <span className="bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider">
            {calculateReadTime(blog.desc)} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Short Description (Italicized Premium Lead Block) */}
        {blog.shortDescription && (
          <div className="border-l-4 border-orange-500 pl-4 mb-8">
            <p className="text-lg sm:text-xl text-gray-600 italic leading-relaxed font-medium">
              {blog.shortDescription}
            </p>
          </div>
        )}

        {/* Date, Author, and Share */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-6 text-gray-500 font-semibold text-sm">
            <span className="flex items-center gap-2">
              <FaUser className="text-orange-500" />
              By {blog.author || 'Admin'}
            </span>
            <span className="flex items-center gap-2">
              <FaCalendar className="text-blue-500" />
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-2">
              <FaClock className="text-teal-500" />
              Updated: {new Date(blog.updatedAt).toLocaleDateString()}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 text-gray-700 hover:text-orange-600 border border-gray-200 hover:border-orange-200 bg-white px-4 py-2 rounded-xl transition-all shadow-sm font-semibold text-sm"
          >
            <FaShareAlt className="text-sm" />
            Share Post
          </button>
        </div>

        {/* Featured Image */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-slate-100">
          <img
            src={blog.image}
            alt={blog.altText || blog.title}
            className="w-full h-auto object-cover max-h-[480px]"
          />
          {blog.altText && (
            <p className="text-xs text-center text-gray-400 py-3 bg-gray-55/40 border-t font-medium italic">
              Image: {blog.altText}
            </p>
          )}
        </div>

        {/* Blog Rich Text Content */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 sm:p-10 md:p-12 mb-8">
          <div
            className="prose prose-orange max-w-none text-gray-800 leading-relaxed font-sans text-base sm:text-lg"
            dangerouslySetInnerHTML={{ __html: blog.desc }}
          />

          {/* Tags Section */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-gray-100">
              <span className="text-gray-400 font-bold text-xs uppercase flex items-center gap-1.5 mr-2">
                <FaTags /> Tags:
              </span>
              {blog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-orange-50/50 hover:bg-orange-50 text-orange-700 border border-orange-100/60 px-3 py-1 rounded-lg text-xs font-bold transition-all"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* FAQ Section */}
        {blog.faqs && blog.faqs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 sm:p-10 md:p-12 mb-8">
            <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2 border-b pb-4">
              🙋 Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {blog.faqs.map((faq, idx) => (
                <FAQItem key={idx} faq={faq} />
              ))}
            </div>
          </div>
        )}

        {/* Dynamic SEO Audit / Details Box for transparency */}
        {(blog.metaTitle || blog.metaDescription || blog.canonicalUrl) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 sm:p-8 mb-12">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <FaInfoCircle className="text-gray-400" /> Meta Publishing Auditor
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-gray-600 font-medium font-sans">
              {blog.metaTitle && (
                <div>
                  <span className="text-gray-400">Meta Title:</span> {blog.metaTitle}
                </div>
              )}
              {blog.metaDescription && (
                <div>
                  <span className="text-gray-400">Meta Description:</span> {blog.metaDescription}
                </div>
              )}
              {blog.canonicalUrl && (
                <div>
                  <span className="text-gray-400">Canonical URL:</span>{" "}
                  <a href={blog.canonicalUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                    {blog.canonicalUrl}
                  </a>
                </div>
              )}
              {blog.focusKeyword && (
                <div>
                  <span className="text-gray-400">Target Keyword:</span> {blog.focusKeyword}
                </div>
              )}
              <div>
                <span className="text-gray-400">Indexing Status:</span>{" "}
                {blog.noIndex ? (
                  <span className="text-red-500 font-bold">noindex, nofollow (Hidden from search engines)</span>
                ) : (
                  <span className="text-green-600 font-bold">index, follow (SEO discoverable)</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="text-center">
          <Link
            href="/news"
            className="inline-flex items-center space-x-2 bg-gray-950 hover:bg-gray-800 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow hover:shadow-lg text-sm sm:text-base"
          >
            <FaArrowLeft />
            <span>Back to All Blogs</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
