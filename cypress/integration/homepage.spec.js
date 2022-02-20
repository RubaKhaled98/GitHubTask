import { homepage } from '../src/Homepage';
const dayjs = require('dayjs');

describe('Seera HomePage', () => {
    before(() => {
        cy.visit('/', { failOnStatusCode: false });
    });

    describe('Header', () => {
        it('should display the correct default language', () => {
            cy.url().should('eq', `${Cypress.config().baseUrl}ar`);
        });

        it('should display the correct default currency', () => {
            cy.get(homepage.currencyButton).should('have.text', 'SAR ');
        });

        it('should display the correct contact numbers', () => {
            cy.get(homepage.contanctButton).first().should('have.text', homepage.contanctNumber);
        });
    });

    describe('Footer', () => {
        it('should display the “qitaf” logo', () => {
            cy.get(homepage.qitafLogo).should('be.visible');
        });
    });

    describe('Tabs', () => {
        it('should display the flights search tab by default', () => {
            cy.get(homepage.flightTab).should('have.attr', 'aria-selected', 'true');
        });

        it('should NOT display the Hotels search tab by default', () => {
            cy.get(homepage.hotelTab).should('have.attr', 'aria-selected', 'false');
        });

        it('should display the correct flight departure date', () => {
            cy.get(homepage.fromDateButton).should('contain.text', dayjs().add('1', 'day').format('DD'));
        });

        it('should display the correct flight return date', () => {
            cy.get(homepage.toDateButton).should('contain.text', dayjs().add('2', 'day').format('DD'));
        });
    });

    // describe('Search', () => {
    //     before(() => {
    //         cy.get(homepage.searchBox).type('python/cpython').type('{enter}');
    //     });

    //     it('should take the user to a new page showing a list of related repos after searching for a text (repo)', () => {
    //         cy.get(homepage.serchResultCount).should('contain.text', '185 repository results');
    //     });

    //     it('should diplay the correct URL fot the first result item', () => {
    //         cy.get(homepage.searchResultItems).first().should('have.attr', 'href', '/python/cpython');
    //     });

    //     it('should open the repo page after clicking on it and display the CI statuses bar', () => {
    //         cy.get(homepage.searchResultItems).first().click();
    //         cy.url().should('eq', 'https://github.com/python/cpython');
    //         cy.get(homepage.CIstatusesBar).should('exist')
    //     });
    // });
});
