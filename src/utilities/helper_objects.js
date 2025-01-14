const errorMessages = {
  visitorName: "Invalid input: Please make sure you enter a valid fullname",
  visitorNameLength:
    "Invalid input: Please make sure the visitor name does not exceed 50 Characters",
  visitorAge:
    "Invalid input: Please make sure you enter a valid age, using an integer",
  dateOfVisit:
    "Invalid input: Please enter the correct date in this format yyyy-mm-dd",
  timeOfVisit:
    "Invalid input: Please enter the correct time in this format hh:mm:ss",
  commentsLength:
    "Invalid input: Please make sure the comment does not exceed 200 characters",
  assistedBy:
    "Invalid input: Please make sure that the name of the person who assisted doesn't exceed 50 characters",
  unsavedVisitor: "Unable to save visitor: ",
  queryError: "Query failed: ",
  table: "Table creation failed: ",
  nonExistentId: "The visitor with the given ID does not exist",
  invalidColumn: "Invalid column name",
  visitorNameNumberAndChars:
    "Invalid input: Please make sure the visitor name does not contain numbers or special characters",
  visitorNameAndSurname:
    "Invalid input: Please make sure you enter a valid name and surname",
};

const messages = {
  userSuccessfulSave: "User has been added successfully",
  tableSuccess: "Table created successfully",
  deleteSuccess: "Visitor has been deleted successfully",
  updateSuccess: "Visitor has been updated successfully",
  deleteAllSuccess: "All visitors have been deleted successfully",
};

const queries = {
  createTable: `CREATE TABLE IF NOT EXISTS visitors(
      id SERIAL PRIMARY KEY,
      visitor_name TEXT NOT NULL,
      visitor_age INT NOT NULL,
      date_of_visit DATE NOT NULL,
      time_of_visit TIME NOT NULL,
      assisted_by TEXT NOT NULL,
      comments TEXT NOT NULL
    )`,

  addNewVisitor: `INSERT INTO visitors 
      (visitor_name, visitor_age, date_of_visit, time_of_visit, assisted_by, comments) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,

  viewLastVisitor: `SELECT * FROM visitors ORDER BY id DESC LIMIT 1`,

  listAllVisitors: `SELECT id, visitor_name, visitor_age, date_of_visit, time_of_visit, assisted_by, comments FROM visitors`,

  deleteAVisitor: `DELETE FROM visitors WHERE id = $1`,

  deleteAllVisitors: `DELETE FROM visitors`,

  updateAVisitor: `UPDATE visitors SET {{column}} = $1 WHERE id = $2`,

  viewAVisitor: `SELECT * FROM visitors WHERE id = $1`,
};

module.exports = { errorMessages, messages, queries };
