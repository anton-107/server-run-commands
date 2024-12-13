# server-run-commands
MCP server to run commands on the local OS

Code written following the official MCP guide:
- https://modelcontextprotocol.io/quickstart

## Tools
- **run-command**
  - Run a command on the local OS
  - Input: `command` (string)
  - Passes the process exit code and stdout back to the LLM


## Installation
- `git clone https://github.com/anton-107/server-run-commands.git`
- `cd server-run-commands`
- `npm install`
- `npm run build`

## Usage with Claude Desktop
Add this to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "<PATH TO LOCAL NODE>",
      "args": [
        "<PATH TO GIT CLONE FOLDER>/server-run-commands/build"
      ]
    }
  }
}