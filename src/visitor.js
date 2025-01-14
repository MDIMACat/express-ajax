const { pool } = require("./db/connection-pool");
const {
  errorMessages,
  messages,
  queries,
} = require("./utilities/helper_objects");
const {
  validateName,
  validateAge,
  validateDateOfVisit,
  validateTimeOfVisit,
  validateComments,
  validateAssistedBy,
} = require("./utilities/helper_functions");

async function validateInput(visitor) {
  validateName(visitor.visitorName);
  validateAge(visitor.visitorAge);
  validateDateOfVisit(visitor.dateOfVisit);
  validateTimeOfVisit(visitor.timeOfVisit);
  validateComments(visitor.comments);
  validateAssistedBy(visitor.assistedBy);
}

async function createTable() {
  const query = queries.createTable;
  await pool.query(query);
  return messages.tableSuccess;
}

async function addNewVisitor(
  visitorName,
  visitorAge,
  dateOfVisit,
  timeOfVisit,
  comments,
  assistedBy
) {
  const visitor = {
    visitorName,
    visitorAge,
    dateOfVisit,
    timeOfVisit,
    comments,
    assistedBy,
  };

  await validateInput(visitor);

  const query = queries.addNewVisitor;
  const values = [
    visitor.visitorName,
    visitor.visitorAge,
    visitor.dateOfVisit,
    visitor.timeOfVisit,
    visitor.assistedBy,
    visitor.comments,
  ];

  const result = await pool.query(query, values);
  return result.rows[0].id;
}

async function listAllVisitors() {
  const query = queries.listAllVisitors;
  const result = await pool.query(query);

  return result.rows.map((visitor) => {
    return visitor;
  });
}

async function deleteAVisitor(id) {
  const query = queries.deleteAVisitor;
  const value = [id];

  const idExists = await viewAVisitor(id);
  if (!idExists) {
    throw new Error(errorMessages.nonExistentId);
  }

  await pool.query(query, value);
  return messages.deleteSuccess;
}

async function updateAVisitor(id, column, newValue) {
  const tableColumns = [
    "visitor_name",
    "visitor_age",
    "date_of_visit",
    "time_of_visit",
    "assisted_by",
    "comments",
  ];
  if (!tableColumns.includes(column)) {
    throw new Error(errorMessages.invalidColumn);
  }

  if (column === "visitor_name") {
    validateName(newValue);
  } else if (column === "visitor_age") {
    validateAge(newValue);
  } else if (column === "date_of_visit") {
    validateDateOfVisit(newValue);
  } else if (column === "time_of_visit") {
    validateTimeOfVisit(newValue);
  } else if (column === "comments") {
    validateComments(newValue);
  } else if (column === "assisted_by") {
    validateAssistedBy(newValue);
  }

  const query = queries.updateAVisitor.replace("{{column}}", column);
  const values = [newValue, id];

  const idExists = await viewAVisitor(id);
  if (!idExists) {
    throw new Error(errorMessages.nonExistentId);
  }

  await pool.query(query, values);
  return messages.updateSuccess;
}

async function viewAVisitor(id) {
  const query = queries.viewAVisitor;
  const value = [id];
  const result = await pool.query(query, value);

  if (result.rows.length === 0) {
    throw new Error(errorMessages.nonExistentId);
  }
  return result.rows[0];
}

async function deleteAllVisitors() {
  const query = queries.deleteAllVisitors;
  await pool.query(query);
  return messages.deleteAllSuccess;
}

async function viewLastVisitor() {
  const query = queries.viewLastVisitor;
  const result = await pool.query(query);
  return result.rows[0].id;
}

module.exports = {
  createTable,
  addNewVisitor,
  listAllVisitors,
  deleteAVisitor,
  updateAVisitor,
  viewAVisitor,
  deleteAllVisitors,
  viewLastVisitor,
  validateInput,
};
