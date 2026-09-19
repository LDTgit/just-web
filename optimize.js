const sharp = require('sharp');
const path = require('path');

// Schimbă calea către imaginea ta originală
const inputPath = path.join(__dirname, 'src/assets/images/justice.png');
const outputPath = path.join(__dirname, 'src/assets/images/justice.webp');

sharp(inputPath)
  .resize(538) // Redimensionare optimă pentru Retina displays (269px x 2)
  .webp({ quality: 80 })
  .toFile(outputPath)
  .then(info => console.log('Imagine optimizată cu succes:', info))
  .catch(err => console.error('Eroare la optimizare:', err));