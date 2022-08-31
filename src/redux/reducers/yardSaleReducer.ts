import {
  UPDATE_PRODUCT_LIST
} from '../../lib/constants';
import { YardSaleStore } from '../store';


const initialState: YardSaleStore = {
  productList: []
};


export type YardSaleAction = 'UPDATE_PRODUCT_LIST';

// tslint:disable-next-line:cyclomatic-complexity
const yardSaleReducer = (
  yardSaleStore: YardSaleStore = initialState,
  action: {type: YardSaleAction, data?: YardSaleStore}
): YardSaleStore => {
  switch (action.type) {
    case UPDATE_PRODUCT_LIST: {
      if (action.data) {
        return action.data;
      }
      return yardSaleStore;
    }
    default: {
      return yardSaleStore;
    }
  }
}

export default yardSaleReducer;