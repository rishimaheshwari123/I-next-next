const Category = require("../models/categoryModel");
const Project = require("../models/projectModel");
const mongoose = require("mongoose");

const migrateCategories = async () => {
  try {
    const defaultCategories = [
      "Web Development",
      "Mobile App Development",
      "Digital Marketing",
      "Social Media Marketing",
      "Lead Generation",
      "UI/UX Design",
      "E-commerce Solutions",
      "Branding & Logo Design",
      "Mobile App",
      "E-commerce",
      "CMS",
      "Custom Software",
      "SEO",
      "Other"
    ];

    // 1. Seed categories
    const categoryMap = {};
    for (const name of defaultCategories) {
      let cat = await Category.findOne({ name });
      if (!cat) {
        cat = await Category.create({ name });
        console.log(`[SEED] Seeded category: ${name}`);
      }
      categoryMap[name] = cat._id;
    }

    // 2. Migrate projects
    const projects = await Project.find({});
    for (const project of projects) {
      let needsMigration = false;
      const newCategories = [];

      const currentCats = Array.isArray(project.category)
        ? project.category
        : [project.category].filter(Boolean);

      for (const catVal of currentCats) {
        // If it's a string, and NOT a valid ObjectId hex string, migrate it
        if (typeof catVal === "string" && !mongoose.Types.ObjectId.isValid(catVal)) {
          needsMigration = true;
          let categoryDoc = await Category.findOne({ name: catVal });
          if (!categoryDoc) {
            categoryDoc = await Category.create({ name: catVal });
            categoryMap[catVal] = categoryDoc._id;
            console.log(`[MIGRATION] Created custom category: ${catVal}`);
          }
          newCategories.push(categoryDoc._id);
        } else {
          // Keep ObjectIds as they are
          newCategories.push(catVal);
        }
      }

      if (needsMigration) {
        project.category = newCategories;
        // Disable validation hook or use updateOne to avoid any schema validator issues if it's strict
        await Project.updateOne({ _id: project._id }, { category: newCategories });
        console.log(`[MIGRATION] Migrated project "${project.projectName}" categories to ObjectIds.`);
      }
    }

    // 3. Migrate services (use raw connection to avoid cast issues with service schema update)
    const servicesCollection = mongoose.connection.db.collection("services");
    const services = await servicesCollection.find({}).toArray();
    for (const service of services) {
      const catVal = service.category;
      // If the category field exists and is a string, and is NOT a valid ObjectId hex string, migrate it
      if (typeof catVal === "string" && !mongoose.Types.ObjectId.isValid(catVal)) {
        let categoryDoc = await Category.findOne({ name: catVal });
        if (!categoryDoc) {
          categoryDoc = await Category.create({ name: catVal });
          categoryMap[catVal] = categoryDoc._id;
          console.log(`[MIGRATION] Created custom service category: ${catVal}`);
        }
        await servicesCollection.updateOne(
          { _id: service._id },
          { $set: { category: categoryDoc._id } }
        );
      }
    }

  } catch (error) {
    console.error("Error running categories migration:", error);
  }
};

module.exports = migrateCategories;
