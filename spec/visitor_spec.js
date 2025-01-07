const { pool } = require("../src/db/connection-pool");
const {
  validateName,
  validateAssistedBy,
  validateAge,
  validateComments,
  validateDateOfVisit,
  validateTimeOfVisit,
} = require("../utilities/helper_functions");
const { errorMessages, messages, queries } = require("../utilities/helper_objects");
const visitorModule = require("../src/visitor");

const mockFullName = "Smanga Mthethwa";
const mockAge = 30;
const mockDateOfVisit = "2023-06-25";
const mockTimeOfVisit = "10:00:00";
const mockComments = "No comments";
const mockAssistor = "Jane Smith";

describe("Database Management", () => {
  describe("Create Table", () => {
    beforeEach(() => {
      spyOn(pool, "query").and.callFake(async () => {});
    });

    it("should create table successfully", async () => {
      await visitorModule.createTable();
      expect(pool.query).toHaveBeenCalledOnceWith(queries.createTable);
    });
  });

  describe("Validate Input", () => {
    it("should throw an error if visitor fullname is not a string", () => {
      const mockFullName = 123;
      expect(() => {
        validateName(mockFullName);
      }).toThrowError(errorMessages.visitorName);
    });

    it("should throw an error if visitor name does not contain a name and surname", () => {
      const mockFullName = "Smanga";
      expect(() => {
        validateName(mockFullName);
      }).toThrowError(errorMessages.visitorNameAndSurname);
    });

    it("should throw an error if visitor name contains numbers or special characters", () => {
      const mockFullName = "Smanga 123";
      expect(() => {
        validateName(mockFullName);
      }).toThrowError(errorMessages.visitorNameNumberAndChars);
    });

    it("should throw an error if visitor age is less than 0", () => {
      const mockAge = -1;
      expect(() => {
        validateAge(mockAge);
      }).toThrowError(errorMessages.visitorAge);
    });

    it("should throw an error if date of visit is empty", () => {
      const mockDateOfVisit = "";
      expect(() => {
        validateDateOfVisit(mockDateOfVisit);
      }).toThrowError(errorMessages.dateOfVisit);
    });

    it("should throw an error if time of visit is empty", () => {
      const mockTimeOfVisit = "";
      expect(() => {
        validateTimeOfVisit(mockTimeOfVisit);
      }).toThrowError(errorMessages.timeOfVisit);
    });

    it("should throw an error if comments are empty", () => {
      const mockComments = "";
      expect(() => {
        validateComments(mockComments);
      }).toThrowError(errorMessages.commentsLength);
    });

    it("should throw an error if assisted by is empty", () => {
      const mockAssistor = "";
      expect(() => {
        validateAssistedBy(mockAssistor);
      }).toThrowError(errorMessages.assistedBy);
    });

    it("should throw an error if assisted by contains numbers or special characters", () => {
      const mockAssistor = "Jane 123";
      expect(() => {
        validateAssistedBy(mockAssistor);
      }).toThrowError(errorMessages.visitorNameNumberAndChars);
    });

    it("should throw an error if assisted by does not contain a name and surname", () => {
      const mockAssistor = "Jane";
      expect(() => {
        validateAssistedBy(mockAssistor);
      }).toThrowError(errorMessages.visitorNameAndSurname);
    });
  });

  describe("Add New Visitor", () => {
    beforeEach(() => {
      spyOn(visitorModule, "validateInput").and.returnValue();
      spyOn(pool, "query").and.callFake(async (query) => {
        if (query === queries.addNewVisitor) {
          return { rows: [{ id: 1 }] };
        }
        return {};
      });
    });
  
    it("should add a new visitor successfully", async () => {
      const visitorId = await visitorModule.addNewVisitor(
        mockFullName,
        mockAge,
        mockDateOfVisit,
        mockTimeOfVisit,
        mockComments,
        mockAssistor
      );
  
      expect(visitorId).toBe(1);
      expect(pool.query).toHaveBeenCalledOnceWith(queries.addNewVisitor, [
        mockFullName,
        mockAge,
        mockDateOfVisit,
        mockTimeOfVisit,
        mockAssistor,
        mockComments,
      ]);
    });
  });

  describe("List All Visitors", () => {
    it("should return all visitors", async () => {
      const mockQueryResult = {
        rows: [{ id: 1, visitor_name: "Smanga Mthethwa" }],
      };
      const expectedOutput = [{ 1: "Smanga Mthethwa" }];

      spyOn(pool, "query").and.callFake(async () => mockQueryResult);

      const result = await visitorModule.listAllVisitors();
      expect(result).toEqual(expectedOutput);
      expect(pool.query).toHaveBeenCalledOnceWith(queries.listAllVisitors);
    });

    it("should throw an error if there are no visitors", async () => {
      spyOn(pool, "query").and.throwError(new Error(errorMessages.queryError));
      await expectAsync(visitorModule.listAllVisitors()).toBeRejectedWithError(
        errorMessages.queryError
      );
    });
  });

  describe("Delete a Visitor", () => {
    it("should throw an error if the visitor id doesn't exist", async () => {
      spyOn(pool, "query").and.throwError(
        new Error(errorMessages.nonExistentId)
      );
      await expectAsync(visitorModule.deleteAVisitor(1)).toBeRejectedWithError(
        errorMessages.nonExistentId
      );
    });

    it("should throw an error if visitor is not deleted", async () => {
      spyOn(pool, "query").and.throwError(new Error(errorMessages.queryError));
      await expectAsync(visitorModule.deleteAVisitor(1)).toBeRejectedWithError(
        errorMessages.queryError
      );
    });
  });

  describe("Delete All Visitors", () => {
    it("should delete all visitors successfully", async () => {
      spyOn(pool, "query").and.callFake(async () => {});
      const result = await visitorModule.deleteAllVisitors();
      expect(result).toBe(messages.deleteAllSuccess);
      expect(pool.query).toHaveBeenCalledOnceWith(queries.deleteAllVisitors);
    });

    it("should throw an error if all visitors are not deleted", async () => {
      spyOn(pool, "query").and.throwError(new Error(errorMessages.queryError));
      await expectAsync(
        visitorModule.deleteAllVisitors()
      ).toBeRejectedWithError(errorMessages.queryError);
    });
  });

  describe("Update a Visitor", () => {
    beforeEach(() => {
      spyOn(visitorModule, "validateInput").and.returnValue();
    });

    it("should update a visitor successfully", async () => {
      const updatedName = "Sally Smith";
      const column = "visitor_name";

      spyOn(pool, "query").and.callFake(async () => {
        await visitorModule.updateAVisitor(1, column, updatedName);
        expect(pool.query).toHaveBeenCalledOnceWith(queries.updateAVisitor, [
          updatedName,
          1,
        ]);
      });
    });

    it("should throw an error if the visitor does not exist", async () => {
      const updatedName = "Sally Smith";
      const column = "visitor_name";

      spyOn(pool, "query").and.throwError(
        new Error(`${errorMessages.queryError}`)
      );
      try {
        await visitorModule.updateAVisitor(5, column, updatedName);
      } catch (error) {
        expect(error.message).toBe(`${error.message}`);
      }
    });
  });

  describe("View a Visitor", () => {
    it("should return a single visitor", async () => {
      const mockQueryResult = {
        rows: [
          {
            id: 1,
            visitor_name: "Smanga Mthethwa",
            visitor_age: 30,
            date_of_visit: "2023-06-25",
            time_of_visit: "10:00:00",
            assisted_by: "Jane Smith",
            comments: "No comments",
          },
        ],
      };
      const expectedOutput = mockQueryResult.rows[0];

      spyOn(pool, "query").and.callFake(async () => mockQueryResult);

      const result = await visitorModule.viewAVisitor(1);
      expect(result).toEqual(expectedOutput);
      expect(pool.query).toHaveBeenCalledOnceWith(queries.viewAVisitor, [1]);
    });

    it("should throw an error if visitor does not exist", async () => {
      spyOn(pool, "query").and.throwError(new Error(errorMessages.queryError));
      await expectAsync(visitorModule.viewAVisitor(1)).toBeRejectedWithError(
        errorMessages.queryError
      );
    });
  });
});
