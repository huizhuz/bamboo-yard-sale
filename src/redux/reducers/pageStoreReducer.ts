import {
  SET_LOADING,
  SET_LOADING_DONE
} from '../../lib/constants';
import { PageStore } from '../store';


const initialState: PageStore = {
  isloading: true
};


export type PageStoreActions = 'SET_LOADING' | 'SET_LOADING_DONE';

const pageStoreReducer = (
  pageStore: PageStore = initialState,
  action: {type: PageStoreActions, data?: any}
): PageStore => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        isloading: true
      }
    }
    case SET_LOADING_DONE: {
      return {
        isloading: false
      }
    }
    default: {
      return pageStore;
    }
  }
}

export default pageStoreReducer;