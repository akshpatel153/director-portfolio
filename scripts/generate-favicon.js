import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgPath = path.join(__dirname, '..', 'public', 'favicon.svg');
const pngPath = path.join(__dirname, '..', 'public', 'favicon.png');

async function generatePng() {
  try {
    if (!fs.existsSync(svgPath)) {
      console.error('❌ favicon.svg not found!');
      return;
    }

    console.log('⏳ Rendering favicon.svg to favicon.png via sharp...');
    await sharp(svgPath)
      .resize(192, 192)
      .png()
      .toFile(pngPath);

    console.log('✅ favicon.png generated successfully at 192x192!');
  } catch (err) {
    console.error('❌ Failed to render PNG favicon:', err.message);
  }
}

generatePng();
