/**
 * Google Apps Script
 * @param {Object} object
 */
function myFunction(object = {}) {
  if (object.spreadsheetId) {
    const spreadsheet = SpreadsheetApp.openById(object.spreadsheetId);
    const sheetNames = spreadsheet.getSheets().map((sheet) => sheet.getName());
    console.log(sheetNames);
  } else {
    console.error("error: Spreadsheet ID was not found.");
  }
}

/**
 * The variable name "args" is always fixed. Always use the name "args" when you use arguments.
 * You can freely use the function name.
 */
myFunction(args);
