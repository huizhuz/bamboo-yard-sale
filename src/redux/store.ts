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
  filterBy?: FilterBy;
}

export type FilterBy = '乐器' | '玩具' | '厨具' | '电器' | '家具' | '书' | '';