import db from "../firebase";

export default class datasource {
  static async getProducts(): Promise<any[]> {
    return (await db.collection("product").get()).docs;
  }
}