describe('Test Application Form on Job Offer Page', () => {
    it('Visits the job offer page, checks for specific texts, and fills in the name field', () => {
        // Odwiedzenie strony oferty pracy
        cy.visit('https://justjoin.it/job-offer/montrose-software-polska-sp-z-o-o-software-tester---paid-internship-krakow-testing');
        
        // Poczekaj, aż pojawi się banner cookies, a następnie zamknij go
        cy.get('#cookiescript_reject', { timeout: 20000 })
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

        //Sprawdzenie obecności tekstu "Email"
        cy.contains('Email')
            .should('exist')
            .and('be.visible');

        // Wypełnienie pola z placeholder="Enter your first and last name"
        cy.get('input[placeholder="Enter your first and last name"]')
            .should('be.visible')
            .type('Krzysztof Kośka'); // Wpisanie tekstu z polskim znakiem

        //Wypełnienie pola placeholder="Enter your email adress"
        cy.get('input[placeholder="Enter your email address"]')
            .should('be.visible')
            .type('k.koska94@gmail.com');

            cy.get('textarea#message').type('Sent through Cypress\nhttps://www.linkedin.com/in/krzysztof-ko%C5%9Bka-a381251a5/\nhttps://github.com/FotzsyzrK123/AutomatCypress');

        cy.contains('Add document')
            .should('exist')
            .should('be.visible');

        

        cy.get('input[type="file"][name="attachment"]').attachFile("KrzysztofKoskaCVITEng.pdf");

        cy.contains('Apply').should('exist').click();
        // Wyświetlenie w konsoli, że wszystkie wymagane teksty zostały znalezione i pole zostało wypełnione
        cy.log('Pole imienia zostało wypełnione tekstem: Krzysztof Kośka');
    });
});
