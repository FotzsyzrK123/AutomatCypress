describe('Test Application Form on Job Offer Page', () => {
    it('Visits the job offer page, checks for specific texts, and fills in the name field', () => {
        // Odwiedzenie strony oferty pracy
        cy.visit('https://justjoin.it/job-offer/fluke-corporation-v-v-test-engineer-wroclaw-testing');
        
        // Poczekaj, aż pojawi się banner cookies, a następnie zamknij go
        cy.get('#cookiescript_reject', { timeout: 10000 })
            .should('be.visible')
            .click({ force: true }); // Wymuszenie kliknięcia przycisku zamykającego banner cookies
        
        // Sprawdzenie obecności tekstu "Apply for this job"
        cy.contains('Apply for this job', { timeout: 15000 })
            .should('exist')
            .and('be.visible');
        
        // Sprawdzenie obecności tekstu "First and last name"
        cy.contains('First and last name')
            .should('exist')
            .and('be.visible');

        // Sprawdzenie obecności tekstu zawierającego "Introduce yourself"
        cy.contains(/Introduce yourself/i)
            .should('exist')
            .and('be.visible');

        // Wypełnienie pola z placeholder="Enter your first and last name"
        cy.get('input[placeholder="Enter your first and last name"]')
            .should('be.visible')
            .type('Krzysztof Kośka'); // Wpisanie tekstu z polskim znakiem

        // Wyświetlenie w konsoli, że wszystkie wymagane teksty zostały znalezione i pole zostało wypełnione
        cy.log('Pole imienia zostało wypełnione tekstem: Krzysztof Kośka');
    });
});