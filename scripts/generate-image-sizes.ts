const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const sizes = [400, 800, 1200];
const inputDir = "public/images";
const outputDir = "public/images/optimized";

async function processImage(inputPath: string, filename: string) {
  const ext = path.extname(filename);
  const name = path.basename(filename, ext);

  // Create output directory if it doesn't exist
  const imageOutputDir = path.join(outputDir, name);
  if (!fs.existsSync(imageOutputDir)) {
    fs.mkdirSync(imageOutputDir, { recursive: true });
  }

  // Process each size
  for (const size of sizes) {
    const outputPath = path.join(imageOutputDir, `${size}.webp`);

    await sharp(inputPath)
      .resize(size)
      .webp({ quality: 90 })
      .toFile(outputPath);

    console.log(`Generated ${outputPath}`);
  }
}

async function main() {
  // Process all images except open-graph
  const images = [
    // Hero images
    "image-center.jpg",
    "image-left.jpeg",
    "image-right.jpeg",

    // Story images
    "story/main.jpeg",
    "story/couple-1.jpeg",
    "story/couple-2.jpeg",
    "story/couple-3.jpeg",
    "story/couple-4.jpeg",

    // Section images
    "location.jpg",
    "home-faqs.jpg",
    "faqs.jpg",
    "dress-code.jpg",
    "countdown.jpg",
    "schedule.jpg",
  ];

  for (const image of images) {
    const inputPath = path.join(inputDir, image);
    if (fs.existsSync(inputPath)) {
      await processImage(inputPath, path.basename(image));
    } else {
      console.warn(`Warning: ${inputPath} does not exist`);
    }
  }
}

main().catch(console.error);
