describe('Visit the first offer and highlight matching skills', () => {
  it('Visits the first offer and compares skills with user skills', () => {
    const skills = ['English', 'Polish', 'Testing', 'Postman', 'SQL', 'REST API', 'REST', 'Jira'];

    cy.visit('https://justjoin.it/job-offers/all-locations/testing?experience-level=junior,mid');

    // Odrzucenie cookies
    cy.get('#cookiescript_reject', { timeout: 15000 })
      .should('be.visible')
      .click({ force: true }); // Wymuszenie kliknięcia przycisku zamykającego banner cookies

    // Wejście w pierwszą ofertę
    cy.get('div[data-index="0"][data-item-index="0"]')
      .should('exist')
      .find('a[target="_parent"]') // Znalezienie linku w ofercie
      .click();

    // Poczekanie na załadowanie strony oferty
    cy.url().should('include', '/job-offer');

    // Wyszukiwanie diva z klasą MuiBox-root css-n74wde
    cy.get('div.MuiBox-root.css-n74wde', { timeout: 10000 }).within(() => {
      // Weryfikacja obecności h3 z tekstem "tech stack"
      cy.get('h3.MuiTypography-root.MuiTypography-h3.css-1fp99c3')
        .should('contain.text', 'tech stack');

      // Wyszukiwanie ul z klasą css-vdxqko
      cy.get('ul.css-vdxqko').within(() => {
        // Iteracja przez wszystkie divy z klasą MuiBox-root css-jfr3nf
        cy.get('div.MuiBox-root.css-jfr3nf').each(($skillDiv, index) => {
          if (index >= 6) return false; // Porównaj maksymalnie 6 umiejętności

          // Pobranie nazwy umiejętności z h4
          const skillName = $skillDiv.find('h4.MuiTypography-root.MuiTypography-subtitle2.css-b849nv').text().trim();

          // Sprawdzenie, czy umiejętność jest wśród moich umiejętności
          if (skills.includes(skillName)) {
            cy.wrap($skillDiv).find('h4.MuiTypography-root.MuiTypography-subtitle2.css-b849nv')
              .invoke('css', 'background-color', 'green');
          }
        });
      });
    });
  });
});