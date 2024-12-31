import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { CommandRunner } from "./command-runner.js";

// Create server instance
const server = new Server(
  {
    name: "weather",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "run-command",
        description: "Run command on the local OS",
        inputSchema: {
          type: "object",
          properties: {
            command: {
              type: "string",
              description: "Command to run",
            },
          },
          required: ["command"],
        },
      },
    ],
  };
});

// Define Zod schemas for validation
const RunCommandArgumentsSchema = z.object({
  command: z.string(),
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  if (!args) {
    throw new Error("No arguments provided");
  }

  try {
    if (name === "run-command") {
      const { command } = RunCommandArgumentsSchema.parse(args);
      // server.sendLoggingMessage({level: "info", "message": `Running command: ${command}`});

      const runner = new CommandRunner();
      const result = await runner.executeCommand(command);
      
      return {
        content: [
          {
            type: "text",
            text: `
I have ran command "${command}" in local shell. 
The status code returned by the shell was: ${result.code}. \n
The stdout of that command was the following: \n
\`\`\`
${result.stdout}
\`\`\`
The stderr of that command was the following: \n
\`\`\`
${result.stderr}
\`\`\`
            `,
          },
        ],
      };
    }
    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    throw error;
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Run-command MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});