/**
 * @license
 * Copyright 2025 Tanaike
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tools } from "./tools.js";

const server = new McpServer({
  name: "sample-mcp-server",
  version: "0.0.1",
});

if (tools.length > 0) {
  for (const { name, schema, func } of tools) {
    server.registerTool(name, schema, func);
  }
}

const transport = new StdioServerTransport();
await server.connect(transport);

/**
 * テスト用
{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_sheet_names","arguments":{"spreadsheetId":"1xkf6x6z_n9dpogsjIb0QfbYmASo4H97xBS-OtEIw2Kw"}}}
 */
