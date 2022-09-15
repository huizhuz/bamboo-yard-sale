import { ProductListItem, YardSaleStore } from "../redux/store";
import datasource from "./datasource";

export const normalizeYardSaleStore = async (data: any): Promise<YardSaleStore> => {
  const productList = [] as ProductListItem[];
  for (let doc of data) {
    const item = doc?.data();
    const itemId = doc?.id || '';
    const displayName = item?.displayName || '';
    const adoptionFee = item?.adoptionFee || '-.--';
    const description = item?.description || '';
    const description2 = item?.description2 || '';
    const description3 = item?.description3 || '';
    const filterBy = item?.filterBy || '';
    let heroImageUrl: string | undefined;
    const imageUrls: string[] = [];
    const imagePaths = await datasource.getImagePaths(item);


    // Retrieving all images at once is time consuming, so just retrive the hero image instead.
    const heroImagePath = imagePaths.find(path => path.includes('_1'));
    if (heroImagePath) {
      const imageRes = await datasource.getImageUrl(heroImagePath);
      if (imageRes.success && imageRes.url) {
        heroImageUrl = imageRes.url;
      }
    }

    const productListItem = {
      itemId,
      displayName,
      adoptionFee,
      description,
      description2,
      description3,
      imageUrls,
      heroImageUrl,
      imagePaths,
      filterBy
    };

    productList.push(productListItem);
  }
  const normalizedStore = { productList } as YardSaleStore;
  return normalizedStore;
}