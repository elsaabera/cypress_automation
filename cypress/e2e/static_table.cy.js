describe("table", () => {
  it("html table", () => {
    cy.visit("https://testautomationpractice.blogspot.com/");
    // table visiblity;
    cy.get("table[name=BookTable]").should("be.visible");
    //validate any location value
    cy.get("table[name=BookTable]")
      .contains("td", "Learn Selenium")
      .should("be.visible");
    //specific path
    cy.get("table[name=BookTable] > tbody > tr:nth-child(2)>td:nth-child(1)")
      .contains("Learn Selenium")
      .should("be.visible");

    cy.get("table[name=BookTable] > tbody > tr td:nth-child(2)").each(
      ($e, index, $list) => {
        const author = $e.text();

        if (author.includes("Amod")) {
          cy.get("table[name=BookTable] > tbody > tr td:nth-child(1)")
            .eq(index)
            .then(function (name) {
              const bname = name.text();
              expect(bname).to.eq("Master In Java");
            });
        }
      }
    );
  });

  it("should type in the search input, click the search button, and display results", () => {
    // Visit the page containing the search input
    cy.visit("https://testautomationpractice.blogspot.com/");

    // Type "Amod" into the search input box
    cy.get("#Wikipedia1_wikipedia-search-input")
      .type("Amod") // Typing the search term
      .should("have.value", "Amod"); // Validate the input field contains the correct text

    // Click the search button
    cy.get("input.wikipedia-search-button").click();

    // Wait for the search results to load
    cy.wait(2000); // Wait for 2 seconds

    // Ensure that the search results container is visible
    cy.get("#Wikipedia1_wikipedia-search-results").should("be.visible");

    // Validate that at least one search result is displayed
    cy.get("#wikipedia-search-result-link").should(
      "have.length.greaterThan",
      0
    ); // Check that at least one search result is shown

    // Optionally, check if the search term 'Amod' exists within the results
    cy.contains("Amod").should("exist"); // Check if 'Amod' appears in the results

    // You can also verify that a specific result (like "Amod") is clickable
    cy.get("#wikipedia-search-result-link")
      .contains("Amod")
      .should("have.attr", "href")
      .and("include", "Amod"); // Check if the href contains the expected result
  });
  it("should verify table data is sorted ascending when column is clicked", () => {
    cy.visit("https://kitchen.applitools.com/ingredients/table");

    // Get the initial unsorted table data
    let initialTableData = [];
    cy.get("#fruits-vegetables tbody tr")
      .each(($row, rowIndex) => {
        const rowData = [];
        cy.wrap($row)
          .find("td")
          .each(($cell, cellIndex) => {
            rowData.push($cell.text());
          })
          .then(() => {
            initialTableData.push(rowData);
          });
      })
      .then(() => {
        // Now that we have the data, sort the table by clicking the column header
        cy.get("#column-button-name").click(); // Clicking on the "Name" column header to sort the table

        // Wait for the table to update after sorting
        cy.wait(1000); // Adjust wait time as necessary to ensure the table has sorted

        // Get the table data again after sorting
        let sortedTableData = [];
        cy.get("#fruits-vegetables tbody tr")
          .each(($row, rowIndex) => {
            const rowData = [];
            cy.wrap($row)
              .find("td")
              .each(($cell, cellIndex) => {
                rowData.push($cell.text());
              })
              .then(() => {
                sortedTableData.push(rowData);
              });
          })
          .then(() => {
            // Verify the table is sorted in ascending order based on column clicked
            const sortedAscending = initialTableData.slice().sort(); // Create a sorted version of the initial data
            expect(sortedTableData).to.deep.equal(sortedAscending); // Compare sorted data with the table data after sorting
          });
      });
  });

  it("should verify table data is sorted descending when column is clicked again", () => {
    cy.visit("https://kitchen.applitools.com/ingredients/table");

    // Get the initial unsorted table data
    let initialTableData = [];
    cy.get("#fruits-vegetables tbody tr")
      .each(($row, rowIndex) => {
        const rowData = [];
        cy.wrap($row)
          .find("td")
          .each(($cell, cellIndex) => {
            rowData.push($cell.text());
          })
          .then(() => {
            initialTableData.push(rowData);
          });
      })
      .then(() => {
        // Sort ascending by clicking the column header
        cy.get("#column-button-name").click();

        // Wait for the table to update
        cy.wait(1000);

        // Now click the column header again to sort descending
        cy.get("#column-button-name").click();

        // Wait for the table to update again
        cy.wait(1000);

        // Get the table data after sorting descending
        let sortedDescTableData = [];
        cy.get("#fruits-vegetables tbody tr")
          .each(($row, rowIndex) => {
            const rowData = [];
            cy.wrap($row)
              .find("td")
              .each(($cell, cellIndex) => {
                rowData.push($cell.text());
              })
              .then(() => {
                sortedDescTableData.push(rowData);
              });
          })
          .then(() => {
            // Verify the table is sorted in descending order based on column clicked
            const sortedDescending = initialTableData.slice().sort().reverse(); // Create a reversed sorted version of the initial data
            expect(sortedDescTableData).to.deep.equal(sortedDescending); // Compare sorted data with the table data after sorting
          });
      });
  });

  it("should verify table data is unsorted after clicking the column header three times", () => {
    cy.visit("https://kitchen.applitools.com/ingredients/table");

    // Get the initial unsorted table data
    let initialTableData = [];
    cy.get("#fruits-vegetables tbody tr")
      .each(($row, rowIndex) => {
        const rowData = [];
        cy.wrap($row)
          .find("td")
          .each(($cell, cellIndex) => {
            rowData.push($cell.text());
          })
          .then(() => {
            initialTableData.push(rowData);
          });
      })
      .then(() => {
        // Sort ascending by clicking the column header
        cy.get("#column-button-name").click();

        // Wait for the table to update
        cy.wait(1000);

        // Sort descending by clicking the column header again
        cy.get("#column-button-name").click();

        // Wait for the table to update
        cy.wait(1000);

        // Now click the column header again to return to the unsorted state
        cy.get("#column-button-name").click();

        // Wait for the table to update again
        cy.wait(1000);

        // Get the table data after clicking the column header three times
        let unsortedTableData = [];
        cy.get("#fruits-vegetables tbody tr")
          .each(($row, rowIndex) => {
            const rowData = [];
            cy.wrap($row)
              .find("td")
              .each(($cell, cellIndex) => {
                rowData.push($cell.text());
              })
              .then(() => {
                unsortedTableData.push(rowData);
              });
          })
          .then(() => {
            // Verify the table is in its original unsorted state
            expect(unsortedTableData).to.deep.equal(initialTableData);
          });
      });
  });
});
