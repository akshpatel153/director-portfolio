import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Get current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define input and output directories
const inputDir = path.join(__dirname, '..', 'raw_images');
const outputDir = path.join(__dirname, '..', 'public', 'images', 'optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  console.log('🖼️  Starting Image Optimization Pipeline...');
  
  if (!fs.existsSync(inputDir)) {
    console.log('❌ "raw_images" folder not found. Please create it and add your 50MB images.');
    return;
  }

  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.tiff', '.webp'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('⚠️ No images found in "raw_images" folder.');
    console.log('👉 Please drop your high-res photos there and run this command again.');
    return;
  }

  console.log(`⏳ Found ${imageFiles.length} images. Processing...`);

  let successCount = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    // Change extension to .webp
    const outputFilename = path.parse(file).name + '.webp';
    const outputPath = path.join(outputDir, outputFilename);

    try {
      const info = await sharp(inputPath)
        // Resize down to 1920x1080 bounding box, maintaining aspect ratio
        .resize({
          width: 1920,
          height: 1080,
          fit: 'inside',
          withoutEnlargement: true 
        })
        // Convert to WebP format with 80% quality (great for web, huge file size savings)
        .webp({ quality: 80 })
        .toFile(outputPath);

      const originalSize = (fs.statSync(inputPath).size / (1024 * 1024)).toFixed(2);
      const newSize = (info.size / 1024).toFixed(2); // in KB

      console.log(`✅ [Optimized] ${file}`);
      console.log(`   Size: ${originalSize}MB ➡️  ${newSize}KB`);
      successCount++;
    } catch (err) {
      console.error(`❌ [Failed] ${file}:`, err.message);
    }
  }

  console.log('\n🎉 Optimization Complete!');
  console.log(`✅ Successfully optimized ${successCount} out of ${imageFiles.length} images.`);
  console.log(`👉 Optimized images are saved in: public/images/optimized/`);
}

optimizeImages();
