const Queue = require('bull');
const { processImageJob } = require('../processor/image');

const imageQueue = new Queue('image processing', {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

imageQueue.process(async (job) => {
  const { productName, imageUrls } = job.data;
  await processImageJob(productName, imageUrls);
});

module.exports = { imageQueue };
