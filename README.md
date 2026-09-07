# Claude Opus 5 + HubSpot MCP (RevOps Automation)

Enterprise proof-of-concept demonstrating dynamic tool introspection and agentic execution using Anthropic's Model Context Protocol (MCP) client connected to HubSpot's MCP infrastructure.

## Architecture Overview
- Authentication: OAuth 2.1 with PKCE targeting HubSpot MCP connector.
- Dynamic Introspection: Zero manual JSON schemas; Claude discovers tools at runtime.
- Core Tools Mapped: HubSQL (`query_crm_data`), Object Management, Attribution Reporting, AEO metrics.

## Running the Project
```bash
npm install
cp .env.example .env.local
npx tsx --env-file=.env.local src/test-hubspot-mcp.ts
