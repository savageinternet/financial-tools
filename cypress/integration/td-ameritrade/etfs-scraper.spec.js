describe('TD Ameritrade ETFs Scraper', () => {
  it('can scrape ETFs', () => {
    const etfData = [];

    cy.visit('https://research.tdameritrade.com/grid/public/etfs/categories/categories.asp');

    cy.get('table#table-fundCategoriesTable > tbody > tr')
      .each(($tr) => {
        const $tds = $tr.find('td');
        const symbol = $tds[0].innerText;
        const name = $tds[2].innerText;
        const expenseRatio = $tds[6].innerText;

        etfData.push({ symbol, name, expenseRatio });
      });

    // TODO: get next page

    cy.task('writeCsvFile', { filename: 'td-ameritrade-etfs.csv', data: etfData });
  });
});
