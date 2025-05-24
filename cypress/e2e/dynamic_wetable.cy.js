describe("webtable", () => {

    // Verifying the total number of rows and columns in the table
    it("verifying total table", () => {
      cy.visit("https://testautomationpractice.blogspot.com/");
      cy.get("table#productTable").scrollIntoView();
      cy.get("table#productTable tr").should('have.length', 6); // Table rows (header + 5 data rows)
      cy.get("table#productTable tr th").should('have.length', 4); // Column headers
      cy.get("table#productTable tr td").should('have.length', 20); // Total data cells
    });
  
    // Verifying specific cell value (checking that the second column in the third row contains 'Tablet')
    it("specific cell value", () => {
      cy.visit("https://testautomationpractice.blogspot.com/");
      cy.get("table#productTable").scrollIntoView();
      cy.get("table#productTable tr:nth-child(3) td:nth-child(2)")
        .contains('Tablet');
    });
  
    // Get all row values and log them
    it("get all row values", () => {
      cy.visit("https://testautomationpractice.blogspot.com/");
      cy.get("table#productTable").scrollIntoView();
      cy.get("table#productTable tbody tr")
        .each(($row, index, $rows) => {
          cy.wrap($row).within(() => {
            cy.get('td').each(($cell, index, $cells) => {
              cy.log($cell.text());
            });
          });
        });
    });
  
    // Pagination functionality
    it.only("pagination", () => {
      cy.visit("https://testautomationpractice.blogspot.com/");
      cy.get("table#productTable").scrollIntoView();
      let pageNumbers = 4; // Assuming there are 4 pages in the pagination
      for (let p = 1; p <= pageNumbers; p++) {
        if (pageNumbers > 1) {
          cy.log("active page Number::;", p);
          cy.get('ul#pagination li:nth-child(' + p + ') a').click(); // Click the pagination link
          cy.wait(3000); // Wait for page data to load
          cy.get("table#productTable tbody tr")
            .each(($row, index, $rows) => {
              cy.wrap($row).within(() => {
                cy.get('td').each(($cell, index, $cells) => {
                  cy.log($cell.text());
                });
              });
            });
        }
      }
    });
    
  });
  