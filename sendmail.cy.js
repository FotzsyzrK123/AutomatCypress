describe('Visit justjoin.it and send email', () => {
    it('Visits the page and sends an email', () => {
      // Odwiedzanie strony
      cy.visit('https://justjoin.it');
      cy.log('Visited justjoin.it');
      
      // Wywołanie funkcji do wysyłania e-maila
      cy.task('sendEmail', {
        to: 'k.koska94@gmail.com',
        subject: 'wszedłem',
        text: 'na stronę justjoin.it',
      });
    });
  });
  