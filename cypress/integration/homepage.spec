import { homepage } from '../src/Homepage';


describe('GitHub HomePage', () => {
    before(() => {
        cy.visit('/', { failOnStatusCode: false });
    });

    it('should show a search box in the header panel, with placeholder text of “Search Github”', () => {
        cy.get(homepage.searchBoxDefaultText).should('be.visible');
    });

    describe('Search', () => {
        before(() => {
            cy.get(homepage.searchBox).type('python/cpython').type('{enter}');
        });

        it('should take the user to a new page showing a list of related repos after searching for a text (repo)', () => {
            cy.get(homepage.serchResultCount).should('contain.text', '185 repository results');
        });

        it('should diplay the correct URL fot the first result item', () => {
            cy.get(homepage.searchResultItems).first().should('have.attr', 'href', '/python/cpython');
        });

        it('should open the repo page after clicking on it and display the CI statuses bar', () => {
            cy.get(homepage.searchResultItems).first().click();
            cy.url().should('eq', 'https://github.com/python/cpython');
            cy.get(homepage.CIstatusesBar).should('exist')
        });
    });
});
