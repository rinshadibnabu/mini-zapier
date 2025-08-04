// src/seed.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  users,
  availableTriggers,
  availableActions,
  zaps,
  triggers,
  actions,
  zapRuns,
  zapRunOutBoxes,
} from "./schema";
import { randomUUID } from "crypto";

// Database connection
const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function seed() {
  try {
    console.log("🌱 Starting mini-zapier seeding...");

    // 1. Insert users
    console.log("👤 Inserting users...");
    const userResult = await db
      .insert(users)
      .values([
        {
          name: "John Doe",
          email: "john@example.com",
          password: "hashed_password_1",
        },
        {
          name: "Jane Smith",
          email: "jane@example.com",
          password: "hashed_password_2",
        },
      ])
      .returning({ id: users.id });

    console.log("✅ Users inserted:", userResult);

    // 2. Insert webhook trigger (only one we need)
    console.log("⚡ Inserting webhook trigger...");
    const triggerResult = await db
      .insert(availableTriggers)
      .values([{ id: randomUUID(), name: "Webhook" }])
      .returning({ id: availableTriggers.id, name: availableTriggers.name });

    console.log("✅ Webhook trigger inserted:", triggerResult);

    // 3. Insert available actions (keep it focused)
    console.log("⚙️ Inserting available actions...");
    const actionResult = await db
      .insert(availableActions)
      .values([
        { id: randomUUID(), name: "Send Email" },
        { id: randomUUID(), name: "Send Slack Message" },
        { id: randomUUID(), name: "Make HTTP Request" },
      ])
      .returning({ id: availableActions.id, name: availableActions.name });

    console.log("✅ Available actions inserted:", actionResult);

    // 4. Insert zaps
    console.log("🔗 Inserting zaps...");
    const zapResult = await db
      .insert(zaps)
      .values([
        {
          id: randomUUID(),
          userId: userResult[0].id,
        },
        {
          id: randomUUID(),
          userId: userResult[1].id,
        },
      ])
      .returning({ id: zaps.id, userId: zaps.userId });

    console.log("✅ Zaps inserted:", zapResult);

    // 5. Insert webhook triggers for each zap
    console.log("⚡ Inserting zap triggers...");
    const zapTriggerResult = await db
      .insert(triggers)
      .values([
        {
          id: randomUUID(),
          zapId: zapResult[0].id,
          triggerId: triggerResult[0].id, // Webhook
        },
        {
          id: randomUUID(),
          zapId: zapResult[1].id,
          triggerId: triggerResult[0].id, // Webhook
        },
      ])
      .returning({ id: triggers.id });

    console.log("✅ Triggers inserted:", zapTriggerResult);

    // 6. Insert actions for zaps
    console.log("⚙️ Inserting actions...");
    const actionInstancesResult = await db
      .insert(actions)
      .values([
        {
          id: randomUUID(),
          zapId: zapResult[0].id,
          actionId: actionResult[0].id, // Send Email
        },
        {
          id: randomUUID(),
          zapId: zapResult[1].id,
          actionId: actionResult[1].id, // Send Slack Message
        },
      ])
      .returning({ id: actions.id });

    console.log("✅ Actions inserted:", actionInstancesResult);

    // 7. Insert sample zap runs
    console.log("🏃 Inserting zap runs...");
    const zapRunResult = await db
      .insert(zapRuns)
      .values([
        {
          id: randomUUID(),
          zapId: zapResult[0].id,
          metaData: {
            status: "success",
            timestamp: new Date().toISOString(),
            webhookData: { message: "Hello from webhook!" },
          },
        },
        {
          id: randomUUID(),
          zapId: zapResult[1].id,
          metaData: {
            status: "success",
            timestamp: new Date().toISOString(),
            webhookData: { user: "john", action: "login" },
          },
        },
      ])
      .returning({ id: zapRuns.id });

    console.log("✅ Zap runs inserted:", zapRunResult);

    // 8. Insert zap run outboxes
    console.log("📦 Inserting zap run outboxes...");
    const outboxResult = await db
      .insert(zapRunOutBoxes)
      .values([
        {
          id: randomUUID(),
          zapRunId: zapRunResult[0].id,
        },
        {
          id: randomUUID(),
          zapRunId: zapRunResult[1].id,
        },
      ])
      .returning({ id: zapRunOutBoxes.id });

    console.log("✅ Zap run outboxes inserted:", outboxResult);

    console.log("\n🎉 Mini-zapier seeding completed!");
    console.log("📝 Ready to test webhook → action flows");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await client.end();
  }
}

// Run the seed function
seed();
