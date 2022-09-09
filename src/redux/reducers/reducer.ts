import { combineReducers } from 'redux';
import { PageStore, YardSaleStore } from "../store";
import pageStoreReducer from './pageStoreReducer';
import yardSaleReducer from "./yardSaleReducer";

export interface CombinedStore {
  yardSaleStore: YardSaleStore;
  pageStore: PageStore;
}

const combinedReducers = combineReducers({
  yardSaleStore: yardSaleReducer,
  pageStore: pageStoreReducer
});


export default combinedReducers;