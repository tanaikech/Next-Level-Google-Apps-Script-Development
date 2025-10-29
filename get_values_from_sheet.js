/**
 * Google Apps Script
 * @param {Object} object
 */
function myFunction(object = {}) {
  const { spreadsheetId, sheetName, range } = object;
  if (spreadsheetId && sheetName) {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(sheetName);
    const values = range
      ? sheet.getRange(range).getDisplayValues()
      : sheet.getDataRange().getDisplayValues();
    console.log(values);
  } else {
    console.error("error: Spreadsheet ID or Sheet name were not found.");
  }
}

/**
 * The variable name "args" is always fixed. Always use the name "args" when you use arguments.
 * You can freely use the function name.
 */
myFunction(args);
