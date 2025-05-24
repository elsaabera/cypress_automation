import "cypress-file-upload";

describe("File Upload", () => {
  it("Single File Upload", () => {
    cy.visit("http://the-internet.herokuapp.com/upload");
    cy.get("#file-upload").attachFile("test1.pdf");
    cy.get("#file-submit").click();
    cy.get("div[class='example'] h3").should("have.text", "File Uploaded!");
  });

  it("File Upload By Drag and Drop", () => {
    cy.visit("http://the-internet.herokuapp.com/upload");
    cy.get("#drag-drop-upload").attachFile("test1.pdf", {
      subjectType: "drag-n-drop",
    });
    cy.get(
      "#drag-drop-upload > .dz-preview > .dz-details > .dz-filename > span"
    ).contains("test1.pdf");
  });

  it("Multiple File Upload", () => {
    cy.visit("https://davidwalsh.name/demo/multiple-file-upload.php");
    cy.get("#filesToUpload").attachFile(["test1.pdf", "test2.pdf"]);
    cy.get(":nth-child(6) > strong").should(
      "contain.text",
      "Files You Selected:"
    );
  });
});
