describe('Checking new offers with skill tags and applying', () => {
  it('Highlights offers, skill tags, and clicks apply on first fully matching offer', () => {
    cy.visit('https://justjoin.it/job-offers/all-locations/testing?experience-level=junior,mid');

    // Poczekaj, aż pojawi się banner cookies, a następnie zamknij go
    cy.get('#cookiescript_reject', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true }); // Wymuszenie kliknięcia przycisku zamykającego banner cookies

    const skills = ['English', 'Polish', 'Testing', 'Postman', 'SQL', 'REST API', 'REST', 'Jira'];
    let offerCount = 0;
    let foundOrangeOffer = false;

    // Pobieramy wszystkie oferty
    cy.get('div[data-index]', { timeout: 10000 }).should('be.visible').each(($offer, index) => {
      if (offerCount >= 20 || foundOrangeOffer) return false;

      cy.wrap($offer).within(() => {
        // Podświetlanie oferty na żółto
        cy.wrap($offer).invoke('css', 'background-color', 'yellow');

        // Pobieramy wszystkie skill-tagi w tej ofercie
        cy.get('div.MuiBox-root.css-vzlxkq').within(() => {
          const skillTags = [];
          let allSkillsMatch = true;

          // Iterujemy przez każdy skill-tag
          cy.get('div.MuiBox-root.css-1qruno6').each(($skillTag) => {
            const skillText = $skillTag.text().trim();
            skillTags.push(skillText);

            if (skills.includes(skillText)) {
              cy.wrap($skillTag).invoke('css', 'background-color', 'blue');
            } else {
              allSkillsMatch = false;
            }
          }).then(() => {
            // Jeśli wszystkie skill-tagi są zgodne, zmieniamy na pomarańczowy
            if (allSkillsMatch && skillTags.length > 0) {
              cy.get('div.MuiBox-root.css-1qruno6').invoke('css', 'background-color', 'orange');
              foundOrangeOffer = true;

              // Kliknięcie w link, aby otworzyć ofertę
              cy.wrap($offer).find('a[target="_parent"]').click();

              // Poczekaj na zmianę URL, aby upewnić się, że strona oferty się załadowała
              cy.url().should('include', '/job-offer');

              // Sprawdzenie obecności tekstów na stronie aplikacji
              cy.contains('Apply for this job', { timeout: 15000 }).should('exist').and('be.visible');
              cy.contains('First and last name').should('exist').and('be.visible');
              cy.contains(/Introduce yourself/i).should('exist').and('be.visible');

              // Wyświetlenie komunikatu w konsoli, że oferta spełnia kryteria
              cy.log('Oferta spełnia kryteria i znaleziono wszystkie wymagane teksty.');
            }
          });
        });

        offerCount++;
      });
    });
  });
});
