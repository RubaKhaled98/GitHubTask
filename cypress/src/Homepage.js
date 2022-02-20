import BasePage from './BasePage';

export class Homepage extends BasePage {
    currencyButton = '[data-testid="Header__CurrencySelector"]';

    contanctButton = '[href="https://wa.me/966554400000"]';

    contanctNumber = '+966554400000 ';

    qitafLogo = '[data-testid="Footer__QitafLogo"]';

    hotelTab = '[data-rb-event-key="hotels"]';

    flightTab = '[data-rb-event-key="flights"]';

    fromDateButton = '[data-testid="FlightSearchBox__FromDateButton"]';

    toDateButton = '[data-testid="FlightSearchBox__ToDateButton"]';
};

export const homepage = new Homepage();
