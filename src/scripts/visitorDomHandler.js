const fixedValues = {
  classes: {
    tableHead: "#table_head",
    tableBody: "#table_body",
    table: "#visitor_table",
    deletePopUp: ".delete_pop_up",
    cancelButton: ".cancel_button",
    deleteButton: ".delete_button",
    newVisitor: ".new_visitor",
    updateCancelButton: ".Update-cancel",
    updatePopUp: ".update-pop-up",
    visitorName: "#visitor_name",
    assistedBy: "#assisted_by",
    visitorAge: "#visitor_age",
    dateOfVisit: "#date_of_visit",
    timeOfVisit: "#time_of_visit",
    comments: "#comments",
    updateError: ".update_errors_pop_up",
    returnButton: ".return_button",
    errorMsg: ".error-msg",
  },
};

const apiEndPoints = {
  getVisitorList: "http://localhost:5000/app/visitors",
  deleteVisitor: (id) => {
    return `http://localhost:5000/app/visitors/${id}`;
  },
  getVisitorInformation: (id) => {
    return `http://localhost:5000/app/visitors/${id}`;
  },
  updateVisitor: (id) => {
    return `http://localhost:5000/app/visitors/${id}`;
  },
};

class Visitor {
  constructor() {
    this.domElements = {};
    this.visitorsList = [];
  }

  initializeVisitor() {
    this.initializeElements();
    this.addList();
    this.newVisitor();
    this.userButtons();
  }

  initializeElements() {
    this.domElements.tableHead = document.querySelector(
      fixedValues.classes.tableHead
    );
    this.domElements.tableBody = document.querySelector(
      fixedValues.classes.tableBody
    );
    this.domElements.deletePopUp = document.querySelector(
      fixedValues.classes.deletePopUp
    );
    this.domElements.deleteButton = document.querySelector(
      fixedValues.classes.deleteButton
    );
    this.domElements.cancelButton = document.querySelector(
      fixedValues.classes.cancelButton
    );
    this.domElements.newVisitor = document.querySelector(
      fixedValues.classes.newVisitor
    );
    this.domElements.updateCancelButton = document.querySelector(
      fixedValues.classes.updateCancelButton
    );
    this.domElements.updatePopUp = document.querySelector(
      fixedValues.classes.updatePopUp
    );
    this.domElements.visitorName = document.querySelector(
      fixedValues.classes.visitorName
    );
    this.domElements.assistedBy = document.querySelector(
      fixedValues.classes.assistedBy
    );
    this.domElements.visitorAge = document.querySelector(
      fixedValues.classes.visitorAge
    );
    this.domElements.dateOfVisit = document.querySelector(
      fixedValues.classes.dateOfVisit
    );
    this.domElements.timeOfVisit = document.querySelector(
      fixedValues.classes.timeOfVisit
    );
    this.domElements.comments = document.querySelector(
      fixedValues.classes.comments
    );
    this.domElements.updateError = document.querySelector(
      fixedValues.classes.updateError
    );
    this.domElements.returnButton = document.querySelector(
      fixedValues.classes.returnButton
    );
    this.domElements.errorMsg = document.querySelector(
      fixedValues.classes.errorMsg
    );
  }

  addList() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiEndPoints.getVisitorList);
    xhr.responseType = "json";
    xhr.send();

    const self = this;

    xhr.onload = function () {
      if (xhr.status === 200) {
        self.visitorsList = xhr.response;
        self.domElements.tableBody.innerHTML = "";
        self.renderVisitorList(self.visitorsList);
      } else {
        console.error(`Error: ${xhr.status}`);
      }
    };
  }

  renderVisitorList(visitorsList) {
    const namesList = visitorsList.map((visitor) => Object.values(visitor));
    let idx = 0;
    const namesId = visitorsList.map((visitor) => Object.keys(visitor));
    for (let i = 0; i < namesList.length; i++) {
      const treeRow = document.createElement("tr");
      const nameTableData = document.createElement("td");
      const surnameTableData = document.createElement("td");
      const deleteButton = document.createElement("button");
      const updateButton = document.createElement("button");

      const [name, surname] = namesList[i][0].split(" ");
      nameTableData.textContent = name;
      surnameTableData.textContent = surname;

      deleteButton.textContent = "Delete";
      deleteButton.style.padding = "8px";
      deleteButton.style.backgroundColor = "#007BFF";
      deleteButton.style.color = "#fff";
      deleteButton.style.borderRadius = "4px";
      deleteButton.style.border = "none";
      deleteButton.style.cursor = "pointer";
      deleteButton.style.marginLeft = "30px";

      updateButton.textContent = "Update";
      updateButton.style.padding = "8px";
      updateButton.style.backgroundColor = "#007BFF";
      updateButton.style.color = "#fff";
      updateButton.style.borderRadius = "4px";
      updateButton.style.border = "none";
      updateButton.style.cursor = "pointer";
      updateButton.style.marginLeft = "30px";

      deleteButton.id = namesId[idx];
      updateButton.id = namesId[idx];
      updateButton.className = "update-user";
      treeRow.id = namesId[idx];
      idx++;

      treeRow.appendChild(nameTableData);
      treeRow.appendChild(surnameTableData);
      treeRow.appendChild(deleteButton);
      treeRow.appendChild(updateButton);
      this.domElements.tableBody.appendChild(treeRow);
    }
  }

  userButtons() {
    this.domElements.tableBody.addEventListener("click", (event) => {
      if (
        event.target.tagName === "BUTTON" &&
        event.target.textContent === "Delete"
      ) {
        const visitorId = event.target.id;
        this.domElements.deletePopUp.style.display = "flex";
        this.domElements.cancelButton.addEventListener("click", () => {
          this.domElements.deletePopUp.style.display = "none";
          return;
        });
        const xhr = new XMLHttpRequest();
        const self = this;
        this.domElements.deleteButton.addEventListener("click", async () => {
          xhr.open("DELETE", apiEndPoints.deleteVisitor(visitorId));
          xhr.responseType = "json";
          xhr.send();

          xhr.onload = () => {
            if (xhr.status === 200) {
              const rows = self.domElements.tableBody.querySelectorAll(
                `${fixedValues.classes.tableBody} tr`
              );
              const rowsToDelete = Array.from(rows).filter(
                (row) => row.id === visitorId
              );
              rowsToDelete.forEach((row) => row.remove());
              self.domElements.deletePopUp.style.display = "none";
            } else {
              console.error(`Error: ${xhr.status}`);
            }
          };
        });
      } else if (
        event.target.tagName === "BUTTON" &&
        event.target.textContent === "Update"
      ) {
        const visitorId = event.target.id;
        const updatePopUp = this.domElements.updatePopUp;
        const form = updatePopUp.querySelector("form");

        form.reset();
        const clonedForm = form.cloneNode(true);
        form.replaceWith(clonedForm);

        const newForm = updatePopUp.querySelector("form");
        const title = updatePopUp.querySelector("legend");
        title.textContent = "Update Information";

        updatePopUp.style.display = "flex";

        newForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const formData = new FormData(newForm);
          const data = {};
          formData.forEach((value, key) => {
            data[key] = value;
          });

          const self = this;

          const xhrUpdate = new XMLHttpRequest();
          xhrUpdate.open("PUT", apiEndPoints.updateVisitor(visitorId));
          xhrUpdate.setRequestHeader("Content-Type", "application/json");
          xhrUpdate.onload = () => {
            if (xhrUpdate.status === 200) {
              updatePopUp.style.display = "none";
              self.addList();
            } else {
              const response = JSON.parse(xhrUpdate.responseText);
              self.domElements.updateError.style.display = "flex";

              self.domElements.returnButton.addEventListener("click", () => {
                self.domElements.updateError.style.display = "none";
              });

              if (typeof response.error === "string") {
                self.domElements.errorMsg.textContent = response.error;
              } else {
                self.domElements.errorMsg.textContent = response.error[0].msg;
              }
            }
          };
          xhrUpdate.send(JSON.stringify(data));
        });

        this.domElements.updateCancelButton.addEventListener("click", () => {
          this.domElements.updatePopUp.style.display = "none";
          return;
        });
      }
    });
  }

  getCurrentUserInformation(id) {
    const self = this;
    const xhrGetUserInformation = new XMLHttpRequest();
    xhrGetUserInformation.open("GET", apiEndPoints.getVisitorInformation(id));
    xhrGetUserInformation.send();

    xhrGetUserInformation.onload = () => {
      if (xhrGetUserInformation.status === 200) {
        const visitorData = JSON.parse(xhrGetUserInformation.response);
        self.domElements.visitorName.value = visitorData.visitor_name;
        self.domElements.assistedBy.value = visitorData.assisted_by;
        self.domElements.visitorAge.value = visitorData.visitor_age;
        self.domElements.dateOfVisit.value = visitorData.date_of_visit.slice(
          0,
          10
        );
        self.domElements.timeOfVisit.value = visitorData.time_of_visit.slice(
          0,
          5
        );
        self.domElements.comments.value = visitorData.comments;
      } else {
        console.error(`Error: ${xhrGetUserInformation.status}`);
      }
    };
  }

  newVisitor() {
    this.domElements.newVisitor.addEventListener("click", () => {
      const updatePopUp = this.domElements.updatePopUp;
      const form = updatePopUp.querySelector("form");

      form.reset();
      const clonedForm = form.cloneNode(true);
      form.replaceWith(clonedForm);

      const title = updatePopUp.querySelector("legend");
      title.textContent = "Visitor Information";

      updatePopUp.style.display = "flex";
    });
    this.domElements.updateCancelButton.addEventListener("click", () => {
      this.domElements.updatePopUp.style.display = "none";
    });
  }
}

if (typeof document !== "undefined") {
  const visitorOne = new Visitor();
  visitorOne.initializeVisitor();
}
