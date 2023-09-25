describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
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
      cy.get(".add").contains("Wellcome back mluukkai!");
    });
    it("user tries to log with wrong credentials", function () {
      cy.get("#username").type("muukalainen");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.get(".error").contains("Wrong username or password");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });
    it("User can create a blog", function () {
      cy.get("#newBlogButton").click();
      cy.get("#title").type("Created with cypress");
      cy.get("#url").type("http://cypress.pun");
      cy.get("#author").type("Cypress");
      cy.get("#Blog-save-button").click();

      cy.contains("Created with cypress By: Cypress");
    });
    beforeEach(function () {
      cy.createBlog({
        title: "Created with cypress",
        url: "http://cypress.pun",
        author: "Cypress",
      });
    });
    it("User can like a blog", function () {
      cy.get("#view-button").click();
      cy.get("#like-button").click();
      cy.contains("Likes: 1");
    });
    it("User can delete a blog", function () {
      cy.get("#view-button").click();
      cy.contains("Delete");
      cy.get("#delete-button").click();
    });
  });
});
describe("With diffrend accounts", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Leevi Puntanen",
      username: "Leepu",
      password: "Pihla",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("http://localhost:3000");
  });
  it("Only while the right user is there is there a delete button", function () {
    cy.login({ username: "Leepu", password: "Pihla" });
    cy.createBlog({
      title: "Created with cypress",
      url: "http://cypress.pun",
      author: "Cypress",
    });
    cy.get("#logout-button").click();
    const seconduser = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, seconduser);
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();
    cy.get("#view-button").click();
    cy.get("html").should("not.contain", "#delete-button");
  });
});
