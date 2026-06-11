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

// Helper to normalize subfolder names to clean kebab-case url-friendly segments
function cleanDirectorySegment(segment) {
  return segment
    .toLowerCase()
    .replace(/'/g, '') // Remove apostrophes
    .replace(/[^a-z0-9]+/g, '-') // Replace spaces and special characters with hyphens
    .replace(/-images$/g, '') // Remove trailing -images suffix
    .replace(/(^-|-$)/g, ''); // Trim hyphens
}

// Recursive function to get all files in a folder
function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

async function optimizeImages() {
  console.log('🖼️  Starting Image Optimization Pipeline...');
  
  if (!fs.existsSync(inputDir)) {
    console.log('❌ "raw_images" folder not found. Please create it.');
    return;
  }

  const allFiles = getFilesRecursively(inputDir);
  const imageFiles = allFiles.filter(filePath => {
    const ext = path.extname(filePath).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.tiff', '.webp'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('⚠️ No images found in "raw_images" folder.');
    return;
  }

  console.log(`⏳ Found ${imageFiles.length} images. Processing...`);

  let successCount = 0;

  for (const filePath of imageFiles) {
    const relativePath = path.relative(inputDir, filePath);
    const pathParts = relativePath.split(path.sep);
    
    // Process directory parts
    const dirParts = pathParts.slice(0, -1).map(cleanDirectorySegment);
    const filename = pathParts[pathParts.length - 1];
    
    // Target output subfolder
    const outputSubdir = path.join(outputDir, ...dirParts);
    if (!fs.existsSync(outputSubdir)) {
      fs.mkdirSync(outputSubdir, { recursive: true });
    }

    const outputFilename = path.parse(filename).name + '.webp';
    const outputPath = path.join(outputSubdir, outputFilename);

    try {
      const info = await sharp(filePath)
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

      const originalSize = (fs.statSync(filePath).size / (1024 * 1024)).toFixed(2);
      const newSize = (info.size / 1024).toFixed(2); // in KB
      const displayPath = path.join(...dirParts, outputFilename);

      console.log(`✅ [Optimized] ${displayPath}`);
      console.log(`   Size: ${originalSize}MB ➡️  ${newSize}KB`);
      successCount++;
    } catch (err) {
      console.error(`❌ [Failed] ${filename}:`, err.message);
    }
  }

  console.log('\n🎉 Optimization Complete!');
  console.log(`✅ Successfully optimized ${successCount} out of ${imageFiles.length} images.`);
}

optimizeImages();
