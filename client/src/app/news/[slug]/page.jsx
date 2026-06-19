'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaCalendar, FaClock, FaShareAlt } from 'react-icons/fa';
import { BASE_URL } from '@/config/api';

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
          text: blog.metaDescription || blog.title,
          url: window.location.href,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const stripHtml = (html) => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/news"
          className="inline-flex items-center space-x-2 text-gray-700 hover:text-gray-900 mb-6 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-all"
        >
          <FaArrowLeft className="text-sm" />
          <span className="font-medium">Back to Blogs</span>
        </Link>

        {/* Category Badges */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="bg-black text-white px-4 py-1.5 rounded text-sm font-medium">
            {blog.category}
          </span>
          {blog.published && (
            <span className="bg-green-500 text-white px-4 py-1.5 rounded text-sm font-medium">
              Published
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Meta Description */}
        {blog.metaDescription && (
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {blog.metaDescription}
          </p>
        )}

        {/* Date, Read Time, and Share */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <FaCalendar className="text-sm" />
              <span className="text-sm">
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FaClock className="text-sm" />
              <span className="text-sm">{calculateReadTime(blog.desc)} min read</span>
            </div>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FaShareAlt className="text-lg" />
            <span className="font-medium">Share</span>
          </button>
        </div>

        {/* Featured Image */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Blog Content */}
        <article className="bg-white rounded-xl shadow-sm p-8 md:p-12 mb-12">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.desc }}
          />
        </article>

        {/* SEO Information Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
      
          <div className="space-y-6">
            {/* Meta Title */}
            {blog.metaTitle && (
              <div>
              
                <p className="text-gray-900 text-base">{blog.metaTitle}</p>
              </div>
            )}

            {/* Meta Description */}
            {blog.metaDescription && (
              <div>
               
                <p className="text-gray-900 text-base leading-relaxed">
                  {blog.metaDescription}
                </p>
              </div>
            )}

            {/* Keywords */}
            {blog.keywords && (
              <div>
              
                <div className="flex flex-wrap gap-2">
                  {blog.keywords.split(',').map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200"
                    >
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Canonical URL */}
            {blog.canonicalUrl && (
              <div>
               
                <a
                  href={blog.canonicalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline break-all"
                >
                  {blog.canonicalUrl}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Open Graph (Social Media) Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        
          
          <div className="space-y-6">
            {/* OG Title */}
            {blog.ogTitle && (
              <div>
              
                <p className="text-gray-900 text-base">{blog.ogTitle}</p>
              </div>
            )}

            {/* OG Description */}
            {blog.ogDescription && (
              <div>
                
                <p className="text-gray-900 text-base leading-relaxed">
                  {blog.ogDescription}
                </p>
              </div>
            )}

         
          </div>
        </div>

      

      

        {/* Back to Blogs Button */}
        <div className="text-center">
          <Link
            href="/news"
            className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-md"
          >
            <FaArrowLeft />
            <span className="font-medium">Back to All Blogs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
