import { writeHTable } from "./HTableWriter";
import { exampleHTableConfig } from "./exampleData";

// Main function to test the report generation
const main = () => {
  const fs = require("fs");

  // Generate the report HTML
  const reportHtml = writeHTable(exampleHTableConfig);

  // Write to file
  fs.writeFileSync("testoutput.html", reportHtml);
  console.log("Report written to testoutput.html");
};

// Run if this file is executed directly
if (require.main === module) {
  main();
}
