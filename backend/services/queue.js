const { Queue, Worker } = require('bullmq');

// Redis Connection config (fallback to local mock connection)
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const connectionConfig = {
  host: REDIS_HOST,
  port: REDIS_PORT
};

// Create Job Queues
let emailQueue, whatsappQueue, receiptQueue;

try {
  emailQueue = new Queue('EmailOutreachQueue', { connection: connectionConfig });
  whatsappQueue = new Queue('WhatsAppNotificationQueue', { connection: connectionConfig });
  receiptQueue = new Queue('PdfReceiptGenerationQueue', { connection: connectionConfig });
  
  console.log(`[Queue System]: BullMQ pipelines configured (Redis: ${REDIS_HOST}:${REDIS_PORT})`);
} catch (err) {
  console.warn(`[Queue System Warning]: Redis offline. Initializing local in-memory fallback queues...`);
}

// In-memory queue fallback for sandbox execution
const memoryQueueJobs = [];

const addJobToQueue = async (queueName, jobName, payload) => {
  try {
    if (emailQueue && queueName === 'email') {
      await emailQueue.add(jobName, payload);
      console.log(`[Queue Success]: Added email job "${jobName}" to BullMQ.`);
    } else if (whatsappQueue && queueName === 'whatsapp') {
      await whatsappQueue.add(jobName, payload);
    } else {
      // In-Memory execution
      memoryQueueJobs.push({ queueName, jobName, payload, timestamp: new Date() });
      console.log(`[Queue System (Memory)]: Scheduled job "${jobName}" in queue "${queueName}". Executing immediately in sandbox worker.`);
      executeJobMock(queueName, jobName, payload);
    }
  } catch (err) {
    console.error(`[Queue Job Error]: Failed scheduling job`, err);
  }
};

// Mock Worker Job Processor
const executeJobMock = (queueName, jobName, payload) => {
  setTimeout(() => {
    console.log(`----------------------------------------`);
    console.log(`⚡ [Worker Executed]: Queue "${queueName}" -> Job "${jobName}"`);
    console.log(`📦 Payload:`, JSON.stringify(payload));
    console.log(`✔ Finished processing!`);
    console.log(`----------------------------------------`);
  }, 1000);
};

module.exports = { addJobToQueue, connectionConfig };
