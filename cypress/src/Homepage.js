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

    hotelSearchResult = '[data-testid="HotelSearchResult__resultsFoundCount"]';

    sortResultByLowestPriceButton = '[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]';

    roundTripButton = '[data-testid="FlightSearchBox__RoundTripButton"]';

    oneWayTripButton = '[data-testid="FlightSearchBox__OneWayButton"]';

    multiCityTripButton = '[data-testid="FlightSearchBox__MultiCityButton"]';

    addReturnButton = '[data-testid="FlightSearchBox__AddReturnButton"]';

    removeReturnButton = '[data-testid="FlightSearchBox__RemoveReturnButton"]';

    multiCityTrip1FromDateButton = '[data-testid="FlightSearchBox__Flight2FromDateButton"]';

    multiCityTrip2FromDateButton = '[data-testid="FlightSearchBox__Flight3FromDateButton"]';

    addFlightButton = '[data-testid="FlightSearchBox__AddFlightButton"]';

    multiCityRemoveTrip2Button = '[data-testid="FlightSearchBox__Flight3RemoveFlightButton"]';

    firstSearchItem = '[data-testid="HotelSearchResult__Hotel0__TitleLabel"]';

    hotelName = '[data-testid="HotelDetails__hotelName"]';

    mapViewButton = '[data-testid="HotelSearchResult__list&mapViewToggler"]';

    resultList = '[data-testid="HotelSearchResult__ResultsList"]';

    resultLisViewtButton = '[data-testid="HotelSearchResult__list&mapViewToggler"]';
};

export const homepage = new Homepage();
