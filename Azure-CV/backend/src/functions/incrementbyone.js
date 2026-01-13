const { app } = require("@azure/functions");
const { CosmosClient } = require("@azure/cosmos");

// Load .env FIRST (before reading process.env)
require("dotenv").config();
console.log("ENV CHECK:", {
  COSMOS_ENDPOINT: process.env.COSMOS_ENDPOINT,
  COSMOS_KEY_SET: !!process.env.COSMOS_KEY,
});


const COSMOS_ENDPOINT = process.env.COSMOS_ENDPOINT;
const COSMOS_KEY = process.env.COSMOS_KEY;

if (!COSMOS_ENDPOINT || !COSMOS_KEY) {
  throw new Error(
    "Missing COSMOS_ENDPOINT or COSMOS_KEY. Set them in .env (local) or Function App Configuration (Azure)."
  );
}

const client = new CosmosClient({
  endpoint: COSMOS_ENDPOINT,
  key: COSMOS_KEY,
});

const databaseName = "Counter";
const containerName = "Visitors";
const documentId = "1"; // also used as partition key since your partition key path is /id

app.http("incrementbyone", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const container = client.database(databaseName).container(containerName);

      let item;

      // Read existing document (or create if not found)
      try {
        const { resource } = await container.item(documentId, documentId).read();
        item = resource;
      } catch (err) {
        if (err.code === 404) {
          item = { id: documentId, count: 0 };
        } else {
          throw err;
        }
      }

      const newCount = Number(item.count || 0) + 1;
      item.count = newCount;

      await container.items.upsert(item);

      return {
        status: 200,
        headers: { "Content-Type": "application/json" },
        jsonBody: { count: newCount },
      };
    } catch (err) {
      context.log(`incrementbyone failed: ${err?.message || err}`);

      return {
        status: 500,
        headers: { "Content-Type": "application/json" },
        jsonBody: {
          error: "Failed to update visitor count",
          message: err?.message || String(err),
        },
      };
    }
  },
});
