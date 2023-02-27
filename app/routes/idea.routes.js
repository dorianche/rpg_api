module.exports = (app) => {
  const ideas = require("../controllers/ideas.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", ideas.create);

  // Retrieve all Tutorials
  router.get("/", ideas.findAll);

  // Retrieve all published Tutorials
  router.get("/published", ideas.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", ideas.findOne);

  // Update a Tutorial with id
  router.put("/:id", ideas.update);

  // Delete a Tutorial with id
  router.delete("/:id", ideas.delete);

  // Delete all Tutorials
  router.delete("/", ideas.deleteAll);

  app.use("/api/ideas", router);
};
