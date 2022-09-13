import db, { storage } from "../firebase";
import { FilterBy } from "../redux/store";
import { ImageResponse } from "./types";

export default class datasource {
  static async getProducts(startAt?: number, endAt?: number): Promise<any[]> {
    const productRef = db.collection("product")
      .where('show', '==', true)
      .orderBy("itemId").startAt(startAt || 0).endAt(endAt || 10);
    const productCollection = await productRef.get();
    const docs = productCollection.docs;

    return docs;
  }

  static async getProductsByFilter(filter: FilterBy): Promise<any[]> {
    const productRef = db.collection("product").where("filterBy", "==", filter);
    const productCollection = await productRef.get();
    const docs = productCollection.docs;

    // console.log('productRef', productRef);
    // console.log('productCollection', productCollection);
    // console.log('docs', docs);

    return docs;
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