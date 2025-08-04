import { db, zapRunOutBoxes } from "@repo/db";
import { inArray } from "drizzle-orm";
import { Kafka } from "kafkajs";
const kafka = new Kafka({
  clientId: "outbox-worker",
  brokers: ["localhost:9092"],
});

const worker = async () => {
  const producer = kafka.producer();
  await producer.connect();

  while (1) {
    const pendingRow = await db.select().from(zapRunOutBoxes).limit(10);

    let i = await producer.send({
      topic: "quickstart-events",
      messages: pendingRow.map((r) => ({
        value: r.id,
      })),
    });

    await db.delete(zapRunOutBoxes).where(
      inArray(
        zapRunOutBoxes.id,
        pendingRow.map((r) => r.id),
      ),
    );
  }
};

await worker();
