import { ProductListItem, YardSaleStore } from "../redux/store";
import datasource from "./datasource";

export const normalizeYardSaleStore = async (data: any): Promise<YardSaleStore> => {
  const productList = [] as ProductListItem[];
  for (let doc of data) {
    const item = doc?.data();
    const itemId = doc?.id|| '';
    const displayName = item?.displayName || '';
    const adoptionFee = item?.adoptionFee || 0;
    const description = item?.description || '';
    const description2 = item?.description2 || '';
    const description3 = item?.description3 || '';
    const sold = !!item?.sold;
    const imageUrls: string[] = [];
    const imagePaths = await datasource.getImagePaths(item);
    for (let imagePath of imagePaths) {
      const imageRes = await datasource.getImageUrl(imagePath);
      if (imageRes.success && imageRes.url) {
        imageUrls.push(imageRes.url);
      }
    }

    const productListItem = {
      itemId,
      displayName,
      adoptionFee,
      description,
      description2,
      description3,
      sold,
      imageUrls
    };

    productList.push(productListItem);
  }
  const normalizedStore = {productList} as YardSaleStore;
  return normalizedStore;
}