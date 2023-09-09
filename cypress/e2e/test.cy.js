/// <reference types= "cypress" />

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

let webstites = [
  "https://www.almosafer.com/ar",
  "https://www.almosafer.com/en",
];
let randomIndex = Math.floor(Math.random() * webstites.length);
let TargetedWebsite = webstites[randomIndex];

Cypress.Commands.add("URLHandle", () => {
  cy.visit("https://www.almosafer.com/ar");

  cy.get(".cta__saudi").click();
});

Cypress.Commands.add("randomlanguage", () => {
  cy.visit(TargetedWebsite);

  cy.get(".cta__saudi").click();

  cy.log(TargetedWebsite);
});
describe("almosafer website", () => {
  it.skip("check the currency", () => {
    cy.URLHandle();

    cy.get('[data-testid="Header__CurrencySelector"]')
      .invoke("text")
      .should("include", "SAR");
  });
  it.skip("check the website language", () => {
    cy.URLHandle();

    cy.get("html").should("have.attr", "lang", "ar");
  });

  it.skip("check that the flight tab is clicked by default", () => {
    cy.URLHandle();

    // cy.get('#uncontrolled-tab-example-tab-flights').should('have.attr',"aria-selected","true")

    // cy.get('#uncontrolled-tab-example-tab-flights').should("have.class","active")
    cy.get("#uncontrolled-tab-example-tab-hotels")
      .invoke("attr", "aria-selected")
      .should("be.oneOf", ["true", "false"]);
  });

  it("visit the website, randomly select the lagnauge", () => {
    cy.randomlanguage();
    cy.get("#uncontrolled-tab-example-tab-hotels").click();

    if (TargetedWebsite.includes("ar")) {
      let arabicCities = ["دبي", "جدة"];

      let RandomArabic = Math.floor(Math.random() * arabicCities.length);
      cy.get('[data-testid="AutoCompleteInput"]').type(
        arabicCities[RandomArabic]
      );
      cy.get('[data-testid="AutoCompleteResultsList"]')
        .find("li")
        .eq(1)
        .click();
      let random = Math.floor(Math.random() * 2);

      cy.get('[data-testid="HotelSearchBox__ReservationSelect_Select"]').select(
        random
      );
      cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()

    } else {
      let englishCities = ["dubai", "jeddah", "riyadh"];
      let RandomEnglish = Math.floor(Math.random() * englishCities.length);

      cy.get('[data-testid="AutoCompleteInput"]').type(
        englishCities[RandomEnglish]
      );
      cy.get('[data-testid="AutoCompleteResultsList"]')
        .find("li")
        .eq(1)
        .click();
      let random = Math.floor(Math.random() * 2);
      cy.get('[data-testid="HotelSearchBox__ReservationSelect_Select"]').select(
        random
      );
      cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()
    }
  });
});
