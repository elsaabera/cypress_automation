describe('File Download Tests', () => {
    it.only('should generate and download both .txt and .pdf files', () => {
      // Visit the page
      cy.visit('https://testautomationpractice.blogspot.com/');
  
      // Navigate to the download page
      cy.get('a[href="https://testautomationpractice.blogspot.com/p/download-files_25.html"]').click();
  
      // Ensure the new page URL is correct
      cy.url().should('include', 'download-files_25.html');
  
      // Click the "Generate Text File" button
      cy.get('#generateTxt').should('exist').click(); // Click to generate the text file
  
      // Wait for the "Download Text File" link to appear
      cy.get('a#txtDownloadLink', { timeout: 10000 }).should('exist').click();  // Click the "Download Text File" link
  
      // Wait for the download to complete
      cy.wait(10000);  // Wait to ensure the file is downloaded
  
      // Verify that the .txt file has been downloaded
      const txtFilePath = 'cypress/downloads/info.txt';
      cy.readFile(txtFilePath).should('exist'); // Ensure the .txt file exists in the downloads folder
  
      // Click the "Generate PDF File" button
      cy.get('#generatePdf').should('exist').click(); // Click to generate the PDF file
  
      // Wait for the "Download PDF File" link to appear
      cy.get('a#pdfDownloadLink', { timeout: 10000 }).should('exist').click();  // Click the "Download PDF File" link
  
      // Wait for the download to complete
      cy.wait(10000);  // Wait to ensure the file is downloaded
  
      // Verify that the .pdf file has been downloaded
      const pdfFilePath = 'cypress/downloads/info.pdf';
      cy.readFile(pdfFilePath).should('exist'); // Ensure the .pdf file exists in the downloads folder
    });
  });
  