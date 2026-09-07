import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

async function run() {
  try {
    const hubspotToken = process.env.HUBSPOT_MCP_TOKEN;

    if (!hubspotToken) {
      throw new Error("Manca HUBSPOT_MCP_TOKEN nel file .env.local");
    }

    console.log("=== TEST CONNESSIONE MCP HUBSPOT ===");
    console.log("Invocazione introspezione remota su Claude Opus 5...\n");

    const response = await (client.beta.messages as any).create({
      model: "claude-opus-5",
      max_tokens: 2048,
      betas: ["mcp-client-2025-11-20"],
      mcp_servers: [
        {
          type: "url",
          url: "https://mcp.hubspot.com",
          name: "hubspot",
          authorization_token: hubspotToken,
        },
      ],
      tools: [
        {
          type: "mcp_toolset",
          mcp_server_name: "hubspot",
        },
      ],
      messages: [
        {
          role: "user",
          content:
            "Elenca tutti gli strumenti (tools) che il server MCP di HubSpot ti ha appena reso disponibili e descrivi brevemente cosa possono fare.",
        },
      ],
    });

    console.log("=== RISPOSTA INTROSPEZIONE TOOLS HUBSPOT ===");
    for (const block of response.content) {
      if (block.type === "text") {
        console.log(block.text);
      }
    }
  } catch (error) {
    console.error("Errore durante l'esecuzione MCP:", error);
  }
}

run();
