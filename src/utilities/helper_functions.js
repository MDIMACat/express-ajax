const { errorMessages } = require("./helper_objects");

const numberAndCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?0-9]+/;

function validateName(visitorName) {
  if (typeof visitorName !== "string" || visitorName === "") {
    throw new Error(errorMessages.visitorName);
  }

  if (visitorName.match(numberAndCharsRegex)) {
    throw new Error(errorMessages.visitorNameNumberAndChars);
  }

  const [name, surname] = visitorName.split(" ");
  if (!surname || !name) {
    throw new Error(errorMessages.visitorNameAndSurname);
  }
}

function validateAge(visitorAge) {
  if (visitorAge < 0) {
    throw new Error(errorMessages.visitorAge);
  }
}

function validateDateOfVisit(dateOfVisit) {
  if (dateOfVisit === "") {
    throw new Error(errorMessages.dateOfVisit);
  }
}

function validateTimeOfVisit(timeOfVisit) {
  if (timeOfVisit === "" || timeOfVisit === null) {
    throw new Error(errorMessages.timeOfVisit);
  }
}

function validateComments(comments) {
  if (comments === "") {
    throw new Error(errorMessages.commentsLength);
  }
}

function validateAssistedBy(assistedBy) {
  if (assistedBy === "") {
    throw new Error(errorMessages.assistedBy);
  }
  if (assistedBy.match(numberAndCharsRegex)) {
    throw new Error(errorMessages.visitorNameNumberAndChars);
  }

  const [name, surname] = assistedBy.split(" ");
  if (!surname || !name) {
    throw new Error(errorMessages.visitorNameAndSurname);
  }
}

module.exports = {
  validateName,
  validateAge,
  validateDateOfVisit,
  validateTimeOfVisit,
  validateComments,
  validateAssistedBy,
};
