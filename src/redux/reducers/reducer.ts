import { combineReducers } from 'redux';
import { YardSaleStore } from "../store";
import yardSaleReducer from "./yardSaleReducer";

export interface CombinedStore {
  yardSaleStore: YardSaleStore;
}

const combinedReducers = combineReducers({
  yardSaleStore: yardSaleReducer
});


export default combinedReducers;