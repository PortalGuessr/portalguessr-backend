import { encode, isBlurhashValid } from "blurhash";
import getPixels from "get-pixels";

export async function convertToHash(src) {
  return new Promise((resolve, reject) => {
    getPixels(src, (err, pixels) => {
      if (err) {
        reject(new Error(err));
        return;
      }
      const imageData = new Uint8ClampedArray(pixels.data);
      const width = pixels.shape[0];
      const height = pixels.shape[1];
      const result = encode(imageData, width, height, 4, 4);
      if (!isBlurhashValid(result)) {
        reject(new Error("Blurhash string is not valid!"));
        return;
      }
      resolve(result);
    });
  });
}
