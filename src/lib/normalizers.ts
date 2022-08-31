import { ProductListItem, YardSaleStore } from "../redux/store";

export const normalizeYardSaleStore = (data: any): YardSaleStore => {
  const productList = [] as ProductListItem[];
  data.forEach((doc: any) => {
    const item = doc?._delegate?._document?.data?.value?.mapValue?.fields;
    const itemId = item?.itemId?.stringValue || '';
    const displayName = item?.displayName?.stringValue || '';
    const adoptionFee = item?.adoptionFee?.integerValue || 0;

    const productListItem = {
      itemId,
      displayName,
      adoptionFee
    };

    productList.push(productListItem);
  })
  const normalizedStore = {productList} as YardSaleStore;
  return normalizedStore;
}