'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function NewsCreate() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    desc: '',
    category: 'General',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    published: false,
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Auto-generate slug from title
    if (name === 'title') {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Formatting functions
  const insertFormatting = (tag) => {
    const textarea = document.getElementById('desc');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.desc.substring(start, end);
    
    let formattedText = '';
    
    switch(tag) {
      case 'bold':
        formattedText = `<strong>${selectedText || 'bold text'}</strong>`;
        break;
      case 'italic':
        formattedText = `<em>${selectedText || 'italic text'}</em>`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText || 'underlined text'}</u>`;
        break;
      case 'h1':
        formattedText = `<h1>${selectedText || 'Heading 1'}</h1>`;
        break;
      case 'h2':
        formattedText = `<h2>${selectedText || 'Heading 2'}</h2>`;
        break;
      case 'h3':
        formattedText = `<h3>${selectedText || 'Heading 3'}</h3>`;
        break;
      case 'p':
        formattedText = `<p>${selectedText || 'Paragraph text'}</p>`;
        break;
      case 'ul':
        formattedText = `<ul>\n  <li>${selectedText || 'List item 1'}</li>\n  <li>List item 2</li>\n</ul>`;
        break;
      case 'ol':
        formattedText = `<ol>\n  <li>${selectedText || 'List item 1'}</li>\n  <li>List item 2</li>\n</ol>`;
        break;
      case 'link':
        const url = prompt('Enter URL:');
        formattedText = `<a href="${url || '#'}">${selectedText || 'Link text'}</a>`;
        break;
      case 'img':
        const imgUrl = prompt('Enter image URL:');
        formattedText = `<img src="${imgUrl || ''}" alt="${selectedText || 'Image'}" />`;
        break;
      case 'br':
        formattedText = '<br />';
        break;
      default:
        formattedText = selectedText;
    }
    
    const newText = formData.desc.substring(0, start) + formattedText + formData.desc.substring(end);
    setFormData({ ...formData, desc: newText });
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('slug', formData.slug);
      data.append('desc', formData.desc);
      data.append('category', formData.category);
      data.append('metaTitle', formData.metaTitle || formData.title);
      data.append('metaDescription', formData.metaDescription);
      data.append('keywords', formData.keywords);
      data.append('canonicalUrl', formData.canonicalUrl);
      data.append('ogTitle', formData.ogTitle || formData.title);
      data.append('ogDescription', formData.ogDescription);
      data.append('published', formData.published);
      if (image) {
        data.append('image', image);
      }

      const response = await axios.post(
        `${BASE_URL}/blog/create`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success('Blog created successfully!');
        // Reset form
        setFormData({
          title: '',
          slug: '',
          desc: '',
          category: 'General',
          metaTitle: '',
          metaDescription: '',
          keywords: '',
          canonicalUrl: '',
          ogTitle: '',
          ogDescription: '',
          published: false,
        });
        setImage(null);
        setImagePreview('');
        setShowPreview(false);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error(error.response?.data?.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create News/Blog</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter blog title"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="blog-slug-url"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="General">General</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
              </select>
            </div>

            {/* Description with HTML Support */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description * (HTML Supported)
              </label>
              
              {/* Formatting Toolbar */}
              <div className="bg-gray-100 border border-gray-300 rounded-t-lg p-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => insertFormatting('bold')}
                  className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 font-bold"
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('italic')}
                  className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 italic"
                  title="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('underline')}
                  className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 underline"
                  title="Underline"
                >
                  U
                </button>
                <div className="border-l border-gray-400 mx-1"></div>
                <button
                  type="button"
                  onClick={() => insertFormatting('h1')}
                  className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm font-bold"
                  title="Heading 1"
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('h2')}
                  className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm font-bold"
                  title="Heading 2"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('h3')}
                  className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm font-bold"
                  title="Heading 3"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('p')}
                  className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
                  title="Paragraph"
                >
                  P
                </button>
                <div className="border-l border-gray-400 mx-1"></div>
                <button
                  type="button"
                  onClick={() => insertFormatting('ul')}
                  className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
                  title="Unordered List"
                >
                  • List
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('ol')}
                  className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
                  title="Ordered List"
                >
                  1. List
                </button>
                <div className="border-l border-gray-400 mx-1"></div>
                <button
                  type="button"
                  onClick={() => insertFormatting('link')}
                  className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
                  title="Insert Link"
                >
                  🔗 Link
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('img')}
                  className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
                  title="Insert Image"
                >
                  🖼️ Image
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('br')}
                  className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
                  title="Line Break"
                >
                  ↵ Break
                </button>
                <div className="border-l border-gray-400 mx-1"></div>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className={`px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm ${showPreview ? 'bg-blue-100' : 'bg-white'}`}
                  title="Toggle Preview"
                >
                  👁️ Preview
                </button>
              </div>

              <textarea
                id="desc"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                required
                rows="15"
                className="w-full px-4 py-3 border border-gray-300 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter blog description with HTML tags..."
              />

              {/* Preview */}
              {showPreview && (
                <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview:</h3>
                  <div 
                    className="prose prose-lg max-w-none bg-white p-4 rounded"
                    dangerouslySetInnerHTML={{ __html: formData.desc }}
                  />
                </div>
              )}

              {/* HTML Guide */}
              <div className="mt-2 text-xs text-gray-600">
                <details className="cursor-pointer">
                  <summary className="font-medium">HTML Tags Guide</summary>
                  <div className="mt-2 space-y-1 pl-4">
                    <p><code>&lt;h1&gt;Heading 1&lt;/h1&gt;</code> - Main heading</p>
                    <p><code>&lt;h2&gt;Heading 2&lt;/h2&gt;</code> - Sub heading</p>
                    <p><code>&lt;p&gt;Paragraph&lt;/p&gt;</code> - Paragraph</p>
                    <p><code>&lt;strong&gt;Bold&lt;/strong&gt;</code> - Bold text</p>
                    <p><code>&lt;em&gt;Italic&lt;/em&gt;</code> - Italic text</p>
                    <p><code>&lt;u&gt;Underline&lt;/u&gt;</code> - Underlined text</p>
                    <p><code>&lt;a href="url"&gt;Link&lt;/a&gt;</code> - Hyperlink</p>
                    <p><code>&lt;img src="url" alt="text" /&gt;</code> - Image</p>
                    <p><code>&lt;ul&gt;&lt;li&gt;Item&lt;/li&gt;&lt;/ul&gt;</code> - Bullet list</p>
                    <p><code>&lt;ol&gt;&lt;li&gt;Item&lt;/li&gt;&lt;/ol&gt;</code> - Numbered list</p>
                    <p><code>&lt;br /&gt;</code> - Line break</p>
                  </div>
                </details>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-md h-64 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* SEO Section */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Leave empty to use title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="SEO meta description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="text"
                    name="canonicalUrl"
                    value={formData.canonicalUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/blog-post"
                  />
                </div>
              </div>
            </div>

            {/* Open Graph Section */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Open Graph (Social Media)
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OG Title
                  </label>
                  <input
                    type="text"
                    name="ogTitle"
                    value={formData.ogTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Leave empty to use title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OG Description
                  </label>
                  <textarea
                    name="ogDescription"
                    value={formData.ogDescription}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description for social media sharing"
                  />
                </div>
              </div>
            </div>

            {/* Published Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Publish immediately
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
