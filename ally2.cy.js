describe('Checking new offers', () => {
    it('Finds offers marked as "New", dismisses cookies banner, and navigates to the first matching offer within 20 listings', () => {
      cy.visit('https://justjoin.it/job-offers/all-locations/testing?experience-level=junior,mid');
  
      // Poczekaj, aż pojawi się banner cookies, a następnie zamknij go
      cy.get('#cookiescript_reject', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true }); // Wymuszenie kliknięcia przycisku zamykającego banner cookies
  
      // Definiujemy licznik, aby ograniczyć pętlę do 20 ofert i zatrzymać się na pierwszej nowej ofercie
      let foundFirstNewOffer = false;
      let offerCount = 0;
  
      cy.get('div.MuiBox-root.css-5szq2p').each(($offer) => {
        if (foundFirstNewOffer || offerCount >= 20) return false; // Zatrzymaj pętlę, gdy znaleziono pierwszą ofertę lub osiągnięto limit 20
  
        // Sprawdź, czy oferta ma znacznik "New"
        cy.wrap($offer).find('div.MuiBox-root.css-1qruno6').contains('New').then(($newTag) => {
          if ($newTag) {
            // Jeśli oferta ma znacznik "New", zmień kolor tła
            cy.wrap($offer).invoke('css', 'background-color', 'yellow');
  
            // Przejdź do pierwszej nowej oferty i oznacz ją jako znalezioną
            cy.wrap($offer).click({ force: true }); // Wymuszenie kliknięcia oferty
            foundFirstNewOffer = true;
          }
        });
  
        offerCount++; // Zwiększ licznik po każdej ofercie
      });
    });
  });
  
  