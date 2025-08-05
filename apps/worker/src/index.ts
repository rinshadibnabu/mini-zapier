import { db, zapRunOutBoxes } from "@repo/db";
import { Kafka } from "kafkajs";
const kafka = new Kafka({
  clientId: "outbox-worker",
  brokers: ["localhost:9092"],
});

const worker = async () => {
  const consumer = kafka.consumer({ groupId: "main-worker" });
  await consumer.connect();

  await consumer.subscribe({ topic: "quickstart-events", fromBeginning: true });

  await consumer.run({
    //the messages/process may fail so if it will poped so we have to prevent the defualt
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value ? message.value.toString() : " ",
      });

      await new Promise((r) => setTimeout(r, 5000));
      consumer.commitOffsets([
        {
          topic: topic,
          partition: partition,
          offset: parseInt(message.offset + 1).toString(),
        },
      ]);
    },

    //process like email or something
    //
  });
};
await worker();
