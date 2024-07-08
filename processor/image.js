const axios = require('axios');
const sharp = require('sharp');
const Image = require('../models/image');

const processImageJob = async (productName, imageUrls) => {
  console.log(productName,imageUrls)
  for (const url of imageUrls) {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const originalImageBuffer = Buffer.from(response.data, 'binary');

      const compressedImageBuffer = await sharp(originalImageBuffer).
        resize(500,500)
        .jpeg({ quality: 50 })
        .toBuffer();

      const image = new Image({
        productName,
        url,
        image: compressedImageBuffer,
        reducedPercent: ((originalImageBuffer.byteLength - compressedImageBuffer.byteLength) / originalImageBuffer.byteLength) * 100
      });

      await image.save();
    } catch (error) {
      console.error(`Error processing image from URL: ${url}`, error.message);
    }
  }
};

module.exports = { processImageJob };
