import db, { storage } from "../firebase";
import { ImageResponse } from "./types";

export default class datasource {
  static async getProducts(): Promise<any[]> {
    return (await db.collection("product").get()).docs;
  }

  static async getImagePaths(item: any): Promise<string[]> {
    const imagePaths: string[] = [];
    const imageRes = await item?.images?.get();
    const images = imageRes?.data() || {};
    for (let key in images) {
      imagePaths.push(images[key]);
    }
    return imagePaths;
  }

  static async getImageUrl(path: string): Promise<ImageResponse> {
    const imageRef = await storage.child(path);
    return imageRef.getDownloadURL()
      .then((url) => {
        return {
          success: true,
          url
        };
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            console.log('File doesn\'t exist');
            break;
          case 'storage/unauthorized':
            console.log('User doesn\'t have permission to access the object');
            break;
          case 'storage/unknown':
            console.log('Unknown error');
            break;
        }
        return {
          success: false
        }
      });
  }
}