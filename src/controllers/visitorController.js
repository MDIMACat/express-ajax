const {
  addNewVisitor,
  deleteAllVisitors,
  listAllVisitors,
  viewAVisitor,
  deleteAVisitor,
  updateAVisitor,
} = require("../visitor");
const { validationResult } = require("express-validator");

const routingControllers = {
  getVisitorsTable: async (_req, res) => {
    try {
      let list = await listAllVisitors();
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({ error: `Unable to fetch visitors: ${error}` });
    }
  },

  createNewVisitor: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("error_input", {
        title: "Input Error",
        stylesheet: "error_input.css",
        issues: errors.array(),
        data: req.body,
        redirectUrl: "/app",
      });
    }

    const data = {
      visitorName: req.body.visitor_name,
      assistedBy: req.body.assisted_by,
      visitorAge: req.body.visitor_age,
      dateOfVisit: new Date(req.body.date_of_visit).toISOString().slice(0, 10),
      timeOfVisit: req.body.time_of_visit,
      comment: req.body.comment,
    };

    if (!data.comment) {
      data.comment = "No Comment";
    }

    try {
      const id = await addNewVisitor(
        data.visitorName,
        data.visitorAge,
        data.dateOfVisit,
        data.timeOfVisit,
        data.comment,
        data.assistedBy
      );
      data.visitorId = id;
      res.status(200).render("thank_you", {
        title: "Thank You",
        stylesheet: "thank_you.css",
        information: data,
        redirectUrl: "/app",
      });
    } catch (error) {
      res.status(500).render("error_database", {
        title: "Database Error",
        stylesheet: "error_database.css",
        message: `Unable to save user into the database ${error}`,
        redirectUrl: "/app",
      });
    }
  },

  getVisitorById: async (req, res) => {
    try {
      const visitorId = req.params.id;
      const visitorInfo = await viewAVisitor(visitorId);
      res.status(200).json(visitorInfo);
    } catch (error) {
      res.status(500).json({ error: `Unable to retrieve visitor: ${error}` });
    }
  },

  deleteVisitorById: async (req, res) => {
    try {
      const visitorId = req.params.id;
      const message = await deleteAVisitor(visitorId);
      res.status(200).json({ success: message });
    } catch (error) {
      res.status(400).json({ error: `Unable to delete visitor: ${error}` });
    }
  },

  deleteAllVisitors: async (_req, res) => {
    try {
      const message = await deleteAllVisitors();
      res.status(200).json({ success: message });
    } catch (error) {
      res
        .status(500)
        .json({ error: `Unable to delete all visitors: ${error}` });
    }
  },

  updateVisitor: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    const id = req.params.id;
    const updateData = {
      visitor_name: req.body.visitor_name,
      assisted_by: req.body.assisted_by,
      visitor_age: req.body.visitor_age,
      date_of_visit: req.body.date_of_visit,
      time_of_visit: req.body.time_of_visit,
      comments: req.body.comments,
    };
    if (!updateData.comments) {
      updateData.comments = "No Comment";
    }
    try {
      const entries = Object.entries(updateData);
      for (let i = 0; i < entries.length; i++) {
        if (entries[i][1] !== undefined) {
          await updateAVisitor(id, entries[i][0], entries[i][1]);
        }
      }
      updateData.visitorId = id;
      res
        .status(200)
        .json({ success: `User id: ${id} has been updated successfully` });
    } catch (error) {
      res.status(500).json({
        error:
          "Please ensure that all fields are in the correct format, as seen on the example.",
      });
    }
  },
};

module.exports = { routingControllers };
