import BasePage from './BasePage';

export class Homepage extends BasePage {
    searchBox = '[data-scoped-placeholder="Search"]';

    searchBoxDefaultText = '[aria-label="Search GitHub"]';

    serchResultCount = '.flex-column > h3';

    searchResultItems = 'div.mt-n1.flex-auto > div.d-flex > div.f4.text-normal > a';

    CIstatusesBar = '[alt="CPython build status on Azure DevOps"]';
};

export const homepage = new Homepage();
