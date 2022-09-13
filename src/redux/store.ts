import { legacy_createStore as createStore } from 'redux';
import combinedReducers from './reducers/reducer';

export const yardSaleStore = createStore(combinedReducers);

export interface YardSaleStore {
  productList: ProductListItem[];
}

export interface PageStore {
  isloading: boolean;
}

export interface ProductListItem {
  itemId: string;
  displayName: string;
  adoptionFee: number;
  description: string;
  description2?: string;
  description3?: string;
  sold: boolean;
  imageUrls: string[];
  imagePaths?: string[];
  heroImageUrl?: string;
  filterBy?: FilterBy;
}

export enum FilterBy {
  instruments = '乐器',
  toys = '玩具',
  kitchenUtil = '厨具',
  appliances = '电器',
  furniture = '家具',
  books = '书',
  all = '全部'
}