import 'cypress-wait-until';

// changeLanguageRandomly selectors
const languageSwitchButton = '[data-testid="Header__LanguageSwitch"]';

// hotelSearchRandomly selectors
let cities;
let ReservationOptions;
const searchHotelInputField = '[data-testid="AutoCompleteInput"]';
const firstSearchHotelItem = '[data-testid="AutoCompleteResultItem0"]';
const ReservationSelectMenu = '[data-testid="HotelSearchBox__ReservationSelect_Select"]';
const searchHotelsButton = '[data-testid="HotelSearchBox__SearchButton"]';

// isSortedByLowerPrice selectors
const prices = [];
const searchResultPrices = '.PriceDisplay__FinalRate .Price__Value';

/**
* changeLanguageRandomly
* @param {string} language
* @returns {void}
*/
Cypress.Commands.add('changeLanguageRandomly', (language) => {
    cy.get(languageSwitchButton).invoke('text').then((text) => {
        if (language === 'en' && text === 'English') {
            cy.get(languageSwitchButton).click();
        } else if (language === 'ar' && text === 'العربية') {
            cy.get(languageSwitchButton).click();
        }
    });
});

/**
* hotelSearchRandomly
* @param {string} language
* @returns {void}
*/
Cypress.Commands.add('hotelSearchRandomly', (language) => {
    if (language === 'ar') {
        cities = ['دبي', 'جدّة'];
        ReservationOptions = ["غرفة واحدة، 2 بالغون، 0 أطفال", "غرفة واحدة، 2 بالغون، 0 أطفال"];
    } else if (language === 'en') {
        cities = ['duba', 'jedda', 'riyadh'];
        ReservationOptions = ["1 Room, 2 Adults, 0 Children", "1 Room, 1 Adult, 0 Children"];
    }
    const randomCity = cities[Math.floor(Math.random()*cities.length)];
    const randomReservationOption = ReservationOptions[Math.floor(Math.random()*ReservationOptions.length)];
    cy.get(searchHotelInputField).type(randomCity);
    cy.get(firstSearchHotelItem).click();
    cy.get(ReservationSelectMenu).select(randomReservationOption);
    cy.get(searchHotelsButton).click();
});

/**
* isSortedByLowerPrice
* @returns {Boolean}
*/
Cypress.Commands.add('isSortedByLowerPrice', () => {
    cy.get(searchResultPrices).each((price) => {
        cy.get(price).invoke('text').then((value) => {
            prices.push(value);
        });
    }).then(() => {
        let second_index;
        for(let first_index = 0; first_index < prices.length; first_index++){
            second_index = first_index + 1;
            if(parseInt(prices[second_index]) - parseInt(prices[first_index]) < 0) {
                return cy.wrap(false);
            }
        }
        return cy.wrap(true);
    });
});
