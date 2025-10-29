import { z } from "zod";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function __gas_fakes({ cliArgs, functionArgs }) {
  try {
    if (Object.keys(functionArgs).length > 0) {
      cliArgs.push(
        `-a '${JSON.stringify(functionArgs).replace(/\\\\'|'/g, "'\\''")}'`
      );
    }
    const command = `gas-fakes ${cliArgs.join(" ")}`;
    const { stdout } = await execAsync(command);
    return {
      content: [{ type: "text", text: stdout || "Execution finished." }],
      isError: false,
    };
  } catch (err) {
    return {
      content: [{ type: "text", text: err.message }],
      isError: true,
    };
  }
}

export const tools = [
  {
    name: "get_sheet_names",
    schema: {
      description:
        "Use this to get the sheet names of all sheets in a Google Spreadsheet.",
      inputSchema: {
        spreadsheetId: z.string().describe("Spreadsheet ID."),
      },
    },
    func: async (functionArgs = {}) => {
      const scriptFile = "get_sheet_names.js"; // A file including GAS script

      /**
       * Please set the arguments for gas-fakes CLI.
       * You can see the help message as follows.
       *
       * $ gas-fakes --help
       */
      const obj = {
        cliArgs: [
          `-f "${scriptFile}"`, // Filename of Google Apps Script
          "-x", // Use sandbox
          `-w "${functionArgs.spreadsheetId}"`, // Spreadsheet is used as read-only access.
        ],
        functionArgs,
      };
      return await __gas_fakes(obj);
    },
  },
  {
    name: "get_values_from_sheet",
    schema: {
      description:
        "Use this to get the values from a specific sheet in a Google Spreadsheet.",
      inputSchema: {
        spreadsheetId: z.string().describe("Spreadsheet ID."),
        sheetName: z.string().describe("Sheet name of a Google Spreadsheet."),
        range: z.string().describe("Cell range as A1Notation.").optional(),
      },
    },
    func: async (functionArgs = {}) => {
      const scriptFile = "get_values_from_sheet.js"; // A file including GAS script

      /**
       * Please set the arguments for gas-fakes CLI.
       * You can see the help message as follows.
       *
       * $ gas-fakes --help
       */
      const obj = {
        cliArgs: [
          `-f "${scriptFile}"`, // Filename of Google Apps Script
          "-x", // Use sandbox
          `-w "${functionArgs.spreadsheetId}"`, // Spreadsheet is used as read-only access.
        ],
        functionArgs,
      };
      return await __gas_fakes(obj);
    },
  },
  {
    name: "set_values_to_sheet",
    schema: {
      description:
        "Use this to put the values in a specific sheet in a Google Spreadsheet.",
      inputSchema: {
        spreadsheetId: z.string().describe("Spreadsheet ID."),
        sheetName: z.string().describe("Sheet name of a Google Spreadsheet."),
        range: z
          .string()
          .describe(
            "Cell range as A1Notation. When the values are append, this is not required to be used."
          )
          .optional(),
        values: z
          .array(z.array(z.union([z.number(), z.string()])))
          .describe("Values for putting into the cells."),
      },
    },
    func: async (functionArgs = {}) => {
      const scriptFile = "set_values_to_sheet.js"; // A file including GAS script

      /**
       * Please set the arguments for gas-fakes CLI.
       * You can see the help message as follows.
       *
       * $ gas-fakes --help
       */
      const obj = {
        cliArgs: [
          `-f "${scriptFile}"`, // Filename of Google Apps Script
          "-x", // Use sandbox
          `--ww "${functionArgs.spreadsheetId}"`, // Spreadsheet is used as read/write access.
        ],
        functionArgs,
      };
      return await __gas_fakes(obj);
    },
  },
];
