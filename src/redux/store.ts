import { legacy_createStore as createStore } from 'redux';
import combinedReducers from './reducers/reducer';

export const yardSaleStore = createStore(combinedReducers);

export interface YardSaleStore {
  productList: ProductListItem[];
}

export interface ProductListItem {
  itemId: string;
  displayName: string;
  adoptionFee: number;
  description: string;
  description2?: string;
  description3?: string;
  sold: boolean;
  imageUrls?: string[];
}