/**
 * Google Apps Script
 * @param {Object} object
 */
function myFunction(object = {}) {
  const { spreadsheetId, sheetName, range, values } = object;
  if (spreadsheetId && sheetName && values) {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(sheetName);
    let rng;
    if (range) {
      const r = sheet.getRange(range);
      rng = sheet.getRange(
        r.getRow(),
        r.getColumn(),
        values.length,
        values[0].length
      );
    } else {
      rng = sheet.getRange(
        sheet.getLastRow() + 1,
        1,
        values.length,
        values[0].length
      );
    }
    rng.setValues(values);
    console.log(
      `${JSON.stringify(
        values
      )} were put from the cell "${rng.getA1Notation()}".`
    );
  } else {
    console.error(
      "error: Spreadsheet ID or Sheet name or values were not found."
    );
  }
}

/**
 * The variable name "args" is always fixed. Always use the name "args" when you use arguments.
 * You can freely use the function name.
 */
myFunction(args);
