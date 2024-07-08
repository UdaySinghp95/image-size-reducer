const imageRoute = require('express')();
const { imageQueue } = require('../queue/image');
const Image = require('../models/image');
const csvParser = require('csv-parser');
const fs = require('fs');

const multer = require('multer');
const { processImageJob } = require('../processor/image');
const uploadFile = multer({ dest: "temp/uploads/" });

imageRoute.post('/add-image', async (req, res) => {
    const { productName, imageUrls } = req.body;

    if (!productName || !imageUrls || !Array.isArray(imageUrls)) {
        return res.status(400).json({ error: 'Invalid request data' });
    }

    // const job = await imageQueue.add({ productName, imageUrls }); // For Redis use , for queue 
    processImageJob(productName, imageUrls)
    
    res.status(200).json({ jobId: job.id });
});

imageRoute.post('/upload-csv', uploadFile.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const csvFilePath = req.file.path;
      const results = [];
  
      fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          console.log(results)
          for (const row of results) {
            const data = Object.values(row);
            processImageJob(data[1], data[2].split(','));
          }
          fs.unlinkSync(csvFilePath);
  
          res.status(200).json({ message: 'CSV file processed successfully' });
        });
    } catch (error) {
      console.error('Error processing CSV file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })


imageRoute.get('/job-status/:jobId', async (req, res) => {
    const { jobId } = req.params;

    try {
        const job = await imageQueue.getJob(jobId);

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        const state = await job.getState();

        res.status(200).json({ jobId, state });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

imageRoute.get('/images/:productName', async (req, res) => {
    const { productName } = req.params;

    try {
        const images = await Image.find({ productName });

        if (!images || images.length === 0) {
            return res.status(404).json({ error: 'No images found for this product' });
        }

        const responseImages = images.map(image => ({
            productName: image.productName,
            url: image.url,
            image: image.image.toString('base64'),
            reducedPercent:image.reducedPercent
        })).reverse();

        res.render('images', { productName, images: responseImages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = imageRoute;
