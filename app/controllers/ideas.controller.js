const db = require("../models");
const { body, validationResult } = require("express-validator");
const Idea = require("../models/ideas.model");

// Create and Save a new Idea
exports.create = (req, res, next) => {
  //   Validate request
  //   if (!req.body.title) {
  //     res.status(400).send({ message: "Content can not be empty!" });
  //     return;
  //   }

  body("name", "Idea name required").trim().isLength({ min: 1 }).escape();
  const errors = validationResult(req);

  // Create an Idea
  const idea = new Idea({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    published: req.body.published ? req.body.published : false,
  });

  // Save Tutorial in the database
  idea
    .save(idea)
    .then((data) => {
      console.log("hello: ", req.body);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Idea.",
      });
    });
};

// Retrieve all Ideas from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Idea.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ideas.",
      });
    });
};

// Find a single Idea with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Idea.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Did not find Idea with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Idea with id=" + id });
    });
};

// Update an Idea by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Idea.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

// Delete an Idea with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Idea.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Idea with id=${id}. It is possible Idea was not found!`,
        });
      } else {
        res.send({
          message: "Ideal was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Idea with id=" + id,
      });
    });
};

// Delete all Ideas from the database.
exports.deleteAll = (req, res) => {
  Idea.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Idea were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all ideas.",
      });
    });
};

// Find all published Ideas
exports.findAllPublished = (req, res) => {
  Idea.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
