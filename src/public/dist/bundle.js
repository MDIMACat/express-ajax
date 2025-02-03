/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/visitorDomHandler.js":
/*!******************************************!*\
  !*** ./src/scripts/visitorDomHandler.js ***!
  \******************************************/
/***/ (() => {

eval("const fixedValues = {\n  classes: {\n    tableHead: \"#table_head\",\n    tableBody: \"#table_body\",\n    table: \"#visitor_table\",\n    deletePopUp: \".delete_pop_up\",\n    cancelButton: \".cancel_button\",\n    deleteButton: \".delete_button\",\n    newVisitor: \".new_visitor\",\n    updateCancelButton: \".Update-cancel\",\n    updatePopUp: \".update-pop-up\",\n    visitorName: \"#visitor_name\",\n    assistedBy: \"#assisted_by\",\n    visitorAge: \"#visitor_age\",\n    dateOfVisit: \"#date_of_visit\",\n    timeOfVisit: \"#time_of_visit\",\n    comments: \"#comments\",\n    updateError: \".update_errors_pop_up\",\n    returnButton: \".return_button\",\n    errorMsg: \".error-msg\",\n  },\n};\n\nconst apiEndPoints = {\n  getVisitorList: \"http://localhost:5000/app/visitors\",\n  deleteVisitor: (id) => {\n    return `http://localhost:5000/app/visitors/${id}`;\n  },\n  getVisitorInformation: (id) => {\n    return `http://localhost:5000/app/visitors/${id}`;\n  },\n  updateVisitor: (id) => {\n    return `http://localhost:5000/app/visitors/${id}`;\n  },\n  addVisitor: \"http://localhost:5000/app/visitors\",\n};\n\nclass Visitor {\n  constructor() {\n    this.domElements = {};\n    this.visitorsList = [];\n  }\n\n  initializeVisitor() {\n    this.initializeElements();\n    this.addList();\n    this.newVisitor();\n    this.userButtons();\n  }\n\n  initializeElements() {\n    this.domElements.tableHead = document.querySelector(\n      fixedValues.classes.tableHead\n    );\n    this.domElements.tableBody = document.querySelector(\n      fixedValues.classes.tableBody\n    );\n    this.domElements.deletePopUp = document.querySelector(\n      fixedValues.classes.deletePopUp\n    );\n    this.domElements.deleteButton = document.querySelector(\n      fixedValues.classes.deleteButton\n    );\n    this.domElements.cancelButton = document.querySelector(\n      fixedValues.classes.cancelButton\n    );\n    this.domElements.newVisitor = document.querySelector(\n      fixedValues.classes.newVisitor\n    );\n    this.domElements.updateCancelButton = document.querySelector(\n      fixedValues.classes.updateCancelButton\n    );\n    this.domElements.updatePopUp = document.querySelector(\n      fixedValues.classes.updatePopUp\n    );\n    this.domElements.visitorName = document.querySelector(\n      fixedValues.classes.visitorName\n    );\n    this.domElements.assistedBy = document.querySelector(\n      fixedValues.classes.assistedBy\n    );\n    this.domElements.visitorAge = document.querySelector(\n      fixedValues.classes.visitorAge\n    );\n    this.domElements.dateOfVisit = document.querySelector(\n      fixedValues.classes.dateOfVisit\n    );\n    this.domElements.timeOfVisit = document.querySelector(\n      fixedValues.classes.timeOfVisit\n    );\n    this.domElements.comments = document.querySelector(\n      fixedValues.classes.comments\n    );\n    this.domElements.updateError = document.querySelector(\n      fixedValues.classes.updateError\n    );\n    this.domElements.returnButton = document.querySelector(\n      fixedValues.classes.returnButton\n    );\n    this.domElements.errorMsg = document.querySelector(\n      fixedValues.classes.errorMsg\n    );\n  }\n\n  newVisitor() {\n    this.domElements.newVisitor.addEventListener(\"click\", () => {\n      const updatePopUp = this.domElements.updatePopUp;\n      const form = updatePopUp.querySelector(\"form\");\n\n      form.reset();\n      const clonedForm = form.cloneNode(true);\n      form.replaceWith(clonedForm);\n\n      const title = updatePopUp.querySelector(\"legend\");\n      title.textContent = \"Visitor Information\";\n\n      updatePopUp.style.display = \"flex\";\n    });\n    this.domElements.updateCancelButton.addEventListener(\"click\", () => {\n      this.domElements.updatePopUp.style.display = \"none\";\n    });\n  }\n\n  addList() {\n    const xhr = new XMLHttpRequest();\n    xhr.open(\"GET\", apiEndPoints.getVisitorList);\n    xhr.responseType = \"json\";\n    xhr.send();\n\n    const self = this;\n\n    xhr.onload = function () {\n      if (xhr.status === 200) {\n        self.visitorsList = xhr.response;\n        self.domElements.tableBody.innerHTML = \"\";\n        self.renderVisitorList(self.visitorsList);\n      } else {\n        console.error(`Error: ${xhr.status}`);\n      }\n    };\n  }\n\n  renderVisitorList(visitorsList) {\n    for (let i = 0; i < visitorsList.length; i++) {\n      const treeRow = document.createElement(\"tr\");\n      const name = document.createElement(\"td\");\n      const visitorAge = document.createElement(\"td\");\n      const dateOfVisit = document.createElement(\"td\");\n      const timeOfVisit = document.createElement(\"td\");\n      const assistedBy = document.createElement(\"td\");\n      const comment = document.createElement(\"td\");\n      const deleteButton = document.createElement(\"button\");\n      const updateButton = document.createElement(\"button\");\n\n      name.textContent = visitorsList[i].visitor_name;\n      visitorAge.textContent = visitorsList[i].visitor_age;\n      dateOfVisit.textContent = visitorsList[i].date_of_visit.slice(0, 10);\n      timeOfVisit.textContent = visitorsList[i].time_of_visit;\n      assistedBy.textContent = visitorsList[i].assisted_by;\n      comment.textContent = visitorsList[i].comments;\n\n      name.style.paddingRight = \"45px\";\n      visitorAge.style.paddingRight = \"45px\";\n      dateOfVisit.style.paddingRight = \"45px\";\n      timeOfVisit.style.paddingRight = \"45px\";\n      assistedBy.style.paddingRight = \"45px\";\n      comment.style.paddingRight = \"45px\";\n\n      deleteButton.textContent = \"Delete\";\n      deleteButton.style.padding = \"8px\";\n      deleteButton.style.backgroundColor = \"#007BFF\";\n      deleteButton.style.color = \"#fff\";\n      deleteButton.style.borderRadius = \"4px\";\n      deleteButton.style.border = \"none\";\n      deleteButton.style.cursor = \"pointer\";\n      deleteButton.style.marginLeft = \"30px\";\n\n      updateButton.textContent = \"Update\";\n      updateButton.style.padding = \"8px\";\n      updateButton.style.backgroundColor = \"#007BFF\";\n      updateButton.style.color = \"#fff\";\n      updateButton.style.borderRadius = \"4px\";\n      updateButton.style.border = \"none\";\n      updateButton.style.cursor = \"pointer\";\n      updateButton.style.marginLeft = \"30px\";\n\n      deleteButton.id = visitorsList[i].id;\n      updateButton.id = visitorsList[i].id;\n      updateButton.className = \"update-user\";\n      treeRow.id = visitorsList[i].id;\n\n      treeRow.appendChild(name);\n      treeRow.appendChild(visitorAge);\n      treeRow.appendChild(dateOfVisit);\n      treeRow.appendChild(timeOfVisit);\n      treeRow.appendChild(assistedBy);\n      treeRow.appendChild(comment);\n      treeRow.appendChild(deleteButton);\n      treeRow.appendChild(updateButton);\n      this.domElements.tableBody.appendChild(treeRow);\n    }\n  }\n\n  userButtons() {\n    this.domElements.tableBody.addEventListener(\"click\", (event) => {\n      if (\n        event.target.tagName === \"BUTTON\" &&\n        event.target.textContent === \"Delete\"\n      ) {\n        const visitorId = event.target.id;\n        this.domElements.deletePopUp.style.display = \"flex\";\n        this.domElements.cancelButton.addEventListener(\"click\", () => {\n          this.domElements.deletePopUp.style.display = \"none\";\n          return;\n        });\n        const xhr = new XMLHttpRequest();\n        const self = this;\n        this.domElements.deleteButton.addEventListener(\"click\", async () => {\n          xhr.open(\"DELETE\", apiEndPoints.deleteVisitor(visitorId));\n          xhr.responseType = \"json\";\n          xhr.send();\n\n          xhr.onload = () => {\n            if (xhr.status === 200) {\n              const rows = self.domElements.tableBody.querySelectorAll(\n                `${fixedValues.classes.tableBody} tr`\n              );\n              const rowsToDelete = Array.from(rows).filter(\n                (row) => row.id === visitorId\n              );\n              rowsToDelete.forEach((row) => row.remove());\n              self.domElements.deletePopUp.style.display = \"none\";\n            } else {\n              console.error(`Error: ${xhr.status}`);\n            }\n          };\n        });\n      } else if (\n        event.target.tagName === \"BUTTON\" &&\n        event.target.textContent === \"Update\"\n      ) {\n        const visitorId = event.target.id;\n        const updatePopUp = this.domElements.updatePopUp;\n        const form = updatePopUp.querySelector(\"form\");\n\n        form.reset();\n        const clonedForm = form.cloneNode(true);\n        form.replaceWith(clonedForm);\n\n        const newForm = updatePopUp.querySelector(\"form\");\n        const title = updatePopUp.querySelector(\"legend\");\n        title.textContent = \"Update Information\";\n\n        this.getCurrentUserInformation(visitorId, newForm);\n\n        updatePopUp.style.display = \"flex\";\n\n        newForm.addEventListener(\"submit\", (e) => {\n          e.preventDefault();\n          const formData = new FormData(newForm);\n          const data = {};\n          formData.forEach((value, key) => {\n            data[key] = value;\n          });\n\n          const self = this;\n\n          const xhrUpdate = new XMLHttpRequest();\n          xhrUpdate.open(\"PUT\", apiEndPoints.updateVisitor(visitorId));\n          xhrUpdate.setRequestHeader(\"Content-Type\", \"application/json\");\n          xhrUpdate.onload = () => {\n            if (xhrUpdate.status === 200) {\n              updatePopUp.style.display = \"none\";\n              self.addList();\n            } else {\n              const response = JSON.parse(xhrUpdate.responseText);\n              self.domElements.updateError.style.display = \"flex\";\n\n              self.domElements.returnButton.addEventListener(\"click\", () => {\n                self.domElements.updateError.style.display = \"none\";\n              });\n\n              if (typeof response.error === \"string\") {\n                self.domElements.errorMsg.textContent = response.error;\n              } else {\n                self.domElements.errorMsg.textContent = response.error[0].msg;\n              }\n            }\n          };\n          xhrUpdate.send(JSON.stringify(data));\n        });\n\n        this.domElements.updateCancelButton.addEventListener(\"click\", () => {\n          this.domElements.updatePopUp.style.display = \"none\";\n          return;\n        });\n      }\n    });\n  }\n\n  getCurrentUserInformation(id, form) {\n    const self = this;\n    const xhrGetUserInformation = new XMLHttpRequest();\n    xhrGetUserInformation.open(\"GET\", apiEndPoints.getVisitorInformation(id));\n    xhrGetUserInformation.send();\n\n    xhrGetUserInformation.onload = () => {\n      if (xhrGetUserInformation.status === 200) {\n        const visitorData = JSON.parse(xhrGetUserInformation.response);\n        self.populateUpdateForm(visitorData, form);\n      } else {\n        console.error(`Error: ${xhrGetUserInformation.status}`);\n      }\n    };\n  }\n\n  populateUpdateForm(data, form) {\n    form.querySelector('input[name=\"visitor_name\"]').value = data.visitor_name;\n    form.querySelector('input[name=\"assisted_by\"]').value = data.assisted_by;\n    form.querySelector('input[name=\"visitor_age\"]').value = data.visitor_age;\n    form.querySelector('input[name=\"date_of_visit\"]').value =\n      data.date_of_visit.slice(0, 10);\n    form.querySelector('input[name=\"time_of_visit\"]').value =\n      data.time_of_visit;\n    form.querySelector('textarea[name=\"comments\"]').value = data.comments;\n  }\n}\n\nif (typeof document !== \"undefined\") {\n  const visitorOne = new Visitor();\n  visitorOne.initializeVisitor();\n}\n\n\n//# sourceURL=webpack://siduduzile-mdima-282-node-sql-assignment-javascript/./src/scripts/visitorDomHandler.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/visitorDomHandler.js"]();
/******/ 	
/******/ })()
;