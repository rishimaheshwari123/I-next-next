const express = require("express");
const { createBlogsCtrl, getAllBlogsCtrl, deleteBlogCtrl, getSingleBlogsCtrl, updateBlogCtrl, getBlogBySlugCtrl } = require("../controllers/blogCtrl");
const router = express.Router();

router.post("/create", createBlogsCtrl)
router.get("/getAll", getAllBlogsCtrl)
router.get("/get/:id", getSingleBlogsCtrl)
router.get("/slug/:slug", getBlogBySlugCtrl)
router.put("/update/:id", updateBlogCtrl)
router.delete("/delete/:id", deleteBlogCtrl)


module.exports = router