import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { db, zapRunOutBoxs, zapRuns, zaps, type Zap } from "@repo/db";
import { randomUUID } from "crypto";

const app = new Hono();

app.get("/hooks/catch/:userId/:zapId", async (c) => {
  const userId = c.req.param("userId");
  const zapId = c.req.param("zapId");
  const numberId = parseInt(userId, 10);
  if (isNaN(numberId)) {
    return c.json({ error: "Invalid userId" }, 400);
  }
  const body = await c.req.parseBody();

  const cleanedMetaData: Record<string, any> = {};
  for (const [key, value] of Object.entries(body)) {
    if (value instanceof File) {
      cleanedMetaData[key] = {
        type: "File",
        name: value.name,
        size: value.size,
      };
    } else {
      cleanedMetaData[key] = value;
    }
  }

  try {
    let zapRunId;
    await db.transaction(async (tsx) => {
      const zapRun = await tsx
        .insert(zapRuns)
        .values({
          id: randomUUID(),
          zapId,
          metaData: cleanedMetaData,
        })
        .returning({ id: zapRuns.id });
      zapRunId = zapRun[0].id;
      await tsx.insert(zapRunOutBoxs).values({
        id: randomUUID(),
        zapRunId,
      });
    });

    return c.json({ success: true, zapRunId, msg: "webhook created" }, 201);
  } catch (error) {
    console.error("Error inserting zap run:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
