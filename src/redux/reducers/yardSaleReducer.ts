import {
  UPDATE_PRODUCT_IMAGE,
  UPDATE_PRODUCT_LIST
} from '../../lib/constants';
import { YardSaleStore, ProductListItem } from '../store';


const initialState: YardSaleStore = {
  productList: []
};


export type YardSaleAction = 'UPDATE_PRODUCT_LIST' | 'UPDATE_PRODUCT_IMAGE';

const yardSaleReducer = (
  yardSaleStore: YardSaleStore = initialState,
  action: { type: YardSaleAction, data?: any }
): YardSaleStore => {
  switch (action.type) {
    case UPDATE_PRODUCT_LIST: {
      if (action.data) {
        return action.data;
      }
      return yardSaleStore;
    }
    case UPDATE_PRODUCT_IMAGE: {
      const updatedProductList: ProductListItem[] = [];
      yardSaleStore.productList.forEach(product => {
        if (product.itemId === action.data.itemId) {
          updatedProductList.push(action.data);
        } else {
          updatedProductList.push(product);
        }
      });

      return {
        productList: updatedProductList
      }
    }
    default: {
      return yardSaleStore;
    }
  }
}

export default yardSaleReducer;