import { encode } from "blurhash";
import { loadImage, createCanvas } from "canvas";

export async function convertToHash(src) {
  try {
    const image = await loadImage(src);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, image.width, image.height).data;

    return encode(imageData, image.width, image.height, 4, 4);
  } catch (error) {
    throw new Error(`Converting to hash failed! Cause: ${error}`);
  }
}
