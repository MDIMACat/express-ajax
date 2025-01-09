const express = require("express");
const { body } = require("express-validator");
const path = require("path");
const { routingControllers } = require("../controllers/visitorController");

const router = express.Router();

const visitorValidationRules = [
  body("visitor_name")
    .trim()
    .notEmpty()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Visitor name can only contain letters and spaces"),
  body("assisted_by")
    .trim()
    .notEmpty()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Assisted by can only contain letters and spaces"),
  body("visitor_age")
    .isInt({ min: 0 })
    .withMessage("Visitor age must be a positive integer"),
  body("date_of_visit")
    .isISO8601()
    .toDate()
    .withMessage("Date of visit must be a valid date"),
  body("time_of_visit").notEmpty().withMessage("Time of visit is required"),
  body("comment").optional().trim(),
];


router.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public", "visitors.html"));
});

router.get("/visitors", routingControllers.getVisitorsTable);

router.post(
  "/visitors",
  visitorValidationRules,
  routingControllers.createNewVisitor
);

router.get("/visitors/:id", routingControllers.getVisitorById);

router.delete("/visitors/:id", routingControllers.deleteVisitorById);

router.delete("/visitors", routingControllers.deleteAllVisitors);

router.put(
  "/visitors/:id",
  visitorValidationRules,
  routingControllers.updateVisitor
);


module.exports = router;
