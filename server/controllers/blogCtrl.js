const { uploadImageToCloudinary } = require("../config/imageUploader");
const blogModel = require("../models/blogModel")

const createBlogsCtrl = async (req, res) => {
    try {
        const { 
            title, 
            slug, 
            desc, 
            category, 
            metaTitle, 
            metaDescription, 
            keywords, 
            canonicalUrl,
            ogTitle,
            ogDescription,
            published = false,
            type, // for backward compatibility
            shortDescription,
            author,
            tags,
            altText,
            focusKeyword,
            noIndex = false,
            faqs,
            articleSchema = true,
            faqSchema = false,
            breadcrumbSchema = true
        } = req.body;
        const image = req.files?.image;

        if (!title || !slug || !desc) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields (title, slug, desc)"
            })
        }

        let imageUrl = "";
        if (image) {
            const thumnailImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME)
            imageUrl = thumnailImage.secure_url;
        } else {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        }

        // Safe parsing for array and objects
        let parsedTags = [];
        if (tags) {
            try {
                parsedTags = JSON.parse(tags);
            } catch (e) {
                if (typeof tags === 'string') {
                    parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);
                } else if (Array.isArray(tags)) {
                    parsedTags = tags;
                }
            }
        }

        let parsedFaqs = [];
        if (faqs) {
            try {
                parsedFaqs = JSON.parse(faqs);
            } catch (e) {
                if (Array.isArray(faqs)) {
                    parsedFaqs = faqs;
                }
            }
        }

        const blog = await blogModel.create({
            title,
            slug: slug.toLowerCase().trim(),
            desc,
            category: category || 'General',
            image: imageUrl,
            metaTitle: metaTitle || title,
            metaDescription: metaDescription || desc.substring(0, 160),
            keywords: keywords || '',
            canonicalUrl: canonicalUrl || '',
            ogTitle: ogTitle || title,
            ogDescription: ogDescription || desc.substring(0, 160),
            ogImage: imageUrl, // Use uploaded image for OG
            published: published === 'true' || published === true,
            type: type || category, // backward compatibility
            shortDescription: shortDescription || '',
            author: author || 'Admin',
            tags: parsedTags,
            altText: altText || '',
            focusKeyword: focusKeyword || '',
            noIndex: noIndex === 'true' || noIndex === true,
            faqs: parsedFaqs,
            articleSchema: articleSchema === 'true' || articleSchema === true || articleSchema === undefined,
            faqSchema: faqSchema === 'true' || faqSchema === true,
            breadcrumbSchema: breadcrumbSchema === 'true' || breadcrumbSchema === true || breadcrumbSchema === undefined
        })

        return res.status(201).json({
            success: true,
            message: "Blog created successfully!",
            blog
        })

    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Blog with this slug already exists!"
            })
        }
        return res.status(500).send({
            success: false,
            message: "Error in create blog api!"
        })
    }
}


const getAllBlogsCtrl = async (req, res) => {
    try {

        const blogs = await blogModel.find({}).sort({ createdAt: -1 });
        if (!blogs) {
            return res.status(400).json({
                success: false,
                message: "No blog found"
            })
        }
        return res.status(200).json({
            success: true,
            totalBlogs: blogs.length,
            blogs
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in getting blog api!"
        })
    }
}
const getSingleBlogsCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "No blog found"
            })
        }
        return res.status(200).json({
            success: true,

            blog
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in getting single  blog api!"
        })
    }
}

const getBlogBySlugCtrl = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await blogModel.findOne({ slug: slug.toLowerCase() });
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }
        return res.status(200).json({
            success: true,
            blog
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in getting blog by slug!"
        })
    }
}
const deleteBlogCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        await blogModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Blog delete successfully!"
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in deleting blog api!"
        })
    }
}

const updateBlogCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            title, 
            slug, 
            desc, 
            category, 
            metaTitle, 
            metaDescription, 
            keywords, 
            canonicalUrl,
            ogTitle,
            ogDescription,
            ogImage,
            published,
            type, // for backward compatibility
            shortDescription,
            author,
            tags,
            altText,
            focusKeyword,
            noIndex,
            faqs,
            articleSchema,
            faqSchema,
            breadcrumbSchema
        } = req.body;
        const image = req.files?.image;

        const updateData = {};

        if (title) updateData.title = title;
        if (slug) updateData.slug = slug.toLowerCase().trim();
        if (desc) updateData.desc = desc;
        if (category) updateData.category = category;
        if (metaTitle) updateData.metaTitle = metaTitle;
        if (metaDescription) updateData.metaDescription = metaDescription;
        if (typeof keywords !== 'undefined') updateData.keywords = keywords;
        if (typeof canonicalUrl !== 'undefined') updateData.canonicalUrl = canonicalUrl;
        if (ogTitle) updateData.ogTitle = ogTitle;
        if (ogDescription) updateData.ogDescription = ogDescription;
        if (ogImage) updateData.ogImage = ogImage;
        if (typeof published !== 'undefined') {
            updateData.published = published === 'true' || published === true;
        }
        if (type) updateData.type = type;

        // Extract and assign new fields if provided
        if (typeof shortDescription !== 'undefined') updateData.shortDescription = shortDescription;
        if (typeof author !== 'undefined') updateData.author = author;
        if (typeof altText !== 'undefined') updateData.altText = altText;
        if (typeof focusKeyword !== 'undefined') updateData.focusKeyword = focusKeyword;
        if (typeof noIndex !== 'undefined') {
            updateData.noIndex = noIndex === 'true' || noIndex === true;
        }
        if (typeof articleSchema !== 'undefined') {
            updateData.articleSchema = articleSchema === 'true' || articleSchema === true;
        }
        if (typeof faqSchema !== 'undefined') {
            updateData.faqSchema = faqSchema === 'true' || faqSchema === true;
        }
        if (typeof breadcrumbSchema !== 'undefined') {
            updateData.breadcrumbSchema = breadcrumbSchema === 'true' || breadcrumbSchema === true;
        }

        if (tags) {
            try {
                updateData.tags = JSON.parse(tags);
            } catch (e) {
                if (typeof tags === 'string') {
                    updateData.tags = tags.split(',').map(t => t.trim()).filter(Boolean);
                } else if (Array.isArray(tags)) {
                    updateData.tags = tags;
                }
            }
        }

        if (faqs) {
            try {
                updateData.faqs = JSON.parse(faqs);
            } catch (e) {
                if (Array.isArray(faqs)) {
                    updateData.faqs = faqs;
                }
            }
        }

        if (image) {
            const thumnailImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME)
            updateData.image = thumnailImage.secure_url;
            updateData.ogImage = thumnailImage.secure_url;
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        return res.status(200).json({ success: true, message: "Blog updated successfully!", blog: updatedBlog });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Blog with this slug already exists!"
            })
        }
        return res.status(500).json({ success: false, message: "Error in updating blog api!" });
    }
};

module.exports = { createBlogsCtrl, getAllBlogsCtrl, deleteBlogCtrl, getSingleBlogsCtrl, updateBlogCtrl, getBlogBySlugCtrl };