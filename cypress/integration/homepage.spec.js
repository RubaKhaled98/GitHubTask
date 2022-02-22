import { homepage } from '../src/Homepage';
const dayjs = require('dayjs');

describe('Seera HomePage', () => {
    let randomLanguage = homepage.languages[Math.floor(Math.random()*homepage.languages.length)];

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

    describe('Languages', () => {
        it('should change the language randomly', () => {
            cy.changeLanguageRandomly(randomLanguage);
            cy.url().should('eq', `${Cypress.config().baseUrl}${randomLanguage}`);
        });
    });

    describe('Tabs', () => {
        it('should display the flights search tab by default', () => {
            cy.get(homepage.flightTab).should('have.attr', 'aria-selected', 'true');
        });

        it('should NOT display the Hotels search tab by default', () => {
            cy.get(homepage.hotelTab).should('have.attr', 'aria-selected', 'false');
        });

        describe('Flights Search Tab', () => {
            it('should display the round trip tab by default', () => {
                cy.get(homepage.roundTripButton).should('have.css', 'background-color').and('eq', 'rgba(255, 255, 255, 0.15)');
            });

            describe('Round Trip Tab', () => {
                it('should display the correct flight departure date', () => {
                    cy.get(homepage.fromDateButton).should('contain.text', dayjs().add('1', 'day').format('DD'));
                });
        
                it('should display the correct flight return date', () => {
                    cy.get(homepage.toDateButton).should('contain.text', dayjs().add('2', 'day').format('DD'));
                });
            });

            describe('One Way Trip Tab', () => {
                before(() => {
                    cy.get(homepage.oneWayTripButton).click();
                });

                it('should Not display the return date button by default', () => {
                    cy.get(homepage.toDateButton).should('not.exist');
                });

                it('should add the return date button', () => {
                    cy.get(homepage.addReturnButton).click();
                    cy.get(homepage.toDateButton).should('be.visible');
                    cy.get(homepage.removeReturnButton).click();
                });

                it('should remove the return date button', () => {
                    cy.get(homepage.addReturnButton).click();
                    cy.get(homepage.removeReturnButton).click();
                    cy.get(homepage.toDateButton).should('not.exist');
                });

            });

            describe('Multi Cities Trip Tab', () => {
                before(() => {
                    cy.get(homepage.multiCityTripButton).click();
                });

                it('should display the correct flight date for the first trip', () => {
                    cy.get(homepage.fromDateButton).should('contain.text', dayjs().add('1', 'day').format('DD'));
                });
        
                it('should display the correct flight date for the second trip', () => {
                    cy.get(homepage.multiCityTrip1FromDateButton).should('contain.text', dayjs().add('2', 'day').format('DD'));
                });

                it('should add a flight', () => {
                    cy.get(homepage.addFlightButton).click();
                    cy.get(homepage.multiCityTrip2FromDateButton).should('be.visible').should('contain.text', dayjs().add('3', 'day').format('DD'));
                    cy.get(homepage.multiCityRemoveTrip2Button).click();
                });

                it('should remove the added flight', () => {
                    cy.get(homepage.addFlightButton).click();
                    cy.get(homepage.multiCityRemoveTrip2Button).click();
                    cy.get(homepage.multiCityTrip2FromDateButton).should('not.exist');
                });
            });
        });

        describe('Hotel Search Tab', () => {
            before(() => {
                cy.get(homepage.hotelTab).click();
                cy.hotelSearchRandomly(randomLanguage);
            });
    
            it('should load the result successfully', () => {
                cy.waitUntil(() => cy.get(homepage.hotelSearchResult).its('length').should('eq', 1));
            });
        
            it('should hide the result list after clicking on map view button', () => {
                cy.get(homepage.mapViewButton).click();
                cy.get(homepage.resultList).should('not.be.visible');
                cy.get(homepage.resultLisViewtButton).click();
            });

            it('should sort the result by the lowest price', () => {
                cy.get(homepage.sortResultByLowestPriceButton).click();
                cy.isSortedByLowerPrice().then(isSorted => expect(isSorted).to.be.true);
            });

            it('should open the first search result after clicking on it', () => {
                let searchItemTitle;
                cy.get(homepage.firstSearchItem).invoke('text').then((title) => {
                    searchItemTitle = title;
                }).then(() => {
                    cy.get(homepage.firstSearchItem).parent().invoke('removeAttr', 'target').click();
                }).then(() => {
                    cy.get(homepage.hotelName).should('have.text', searchItemTitle);
                });
            });
        });
    });
});
