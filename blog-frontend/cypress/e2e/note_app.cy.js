describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Blog app made by Leevi Puntanen, Department of Computer Science, University of Helsinki 2023"
    );
  });
  describe("Login", function () {
    it("user can login", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("Matti Luukkainen logged in");
      cy.contains("Wellcome back mluukkai!");
    });
    it("user tries to log with wrong credentials", function () {
      cy.get("#username").type("muukalainen");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("Wrong username or password");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/testing/reset");
      const user = {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.visit("http://localhost:3000");
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
    });
    it("User can create a blog", function () {
      cy.get("#newBlogButton").click();
      cy.get("#title").type("Created with cypress");
      cy.get("#url").type("http://cypress.pun");
      cy.get("#author").type("Cypress");
      cy.get("#Blog-save-button").click();

      cy.contains("Created with cypress By: Cypress");
    });
    it("User can like a blog", function () {
      cy.get("#newBlogButton").click();
      cy.get("#title").type("Created with cypress");
      cy.get("#url").type("http://cypress.pun");
      cy.get("#author").type("Cypress");
      cy.get("#Blog-save-button").click();

      cy.get("#view-button").click();
      cy.get("#like-button").click();
      cy.contains("Likes: 1");
    });
  });
});
