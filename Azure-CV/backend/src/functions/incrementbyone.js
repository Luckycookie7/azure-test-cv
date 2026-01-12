const { app } = require("@azure/functions");
const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;

if (!endpoint || !key) {
  throw new Error("Missing COSMOS_ENDPOINT or COSMOS_KEY (set in App Settings / local.settings.json).");
}

const client = new CosmosClient({ endpoint, key });

const databaseName = "Counter";
const containerName = "Visitors";
const documentId = "1"; // partition key value too, because your partition key path is /id

app.http("incrementbyone", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const container = client.database(databaseName).container(containerName);

      // Try to read existing document
      let item;
      try {
        const { resource } = await container.item(documentId, documentId).read();
        item = resource;
      } catch (err) {
        if (err.code === 404) {
          // If not found, initialize it
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
      context.log.error("Cosmos counter error:", err);

      return {
        status: 500,
        headers: { "Content-Type": "application/json" },
        jsonBody: { error: "Failed to update visitor count", message: err.message },
      };
    }
  },
});

