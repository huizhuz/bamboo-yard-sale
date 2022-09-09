import { connect } from 'react-redux';
import { CombinedStore } from '../reducers/reducer';
import datasource from '../../lib/datasource';
import {
  UPDATE_PRODUCT_LIST,
  SET_LOADING,
  SET_LOADING_DONE
} from '../../lib/constants';
import { PageStore, YardSaleStore } from '../store';
import { normalizeYardSaleStore } from '../../lib/normalizers';
import { ImageResponse } from '../../lib/types';

export interface AppStateProps {
  yardSaleStore: YardSaleStore;
  pageStore: PageStore;
}
export interface AppActionProps {
  getProductList: () => any;
  getImageUrl: (path: string) => Promise<ImageResponse>;
}

export interface AppProps extends AppStateProps, AppActionProps { }

function mapStateToProps(combinedStore: CombinedStore) {
  return {
    yardSaleStore: combinedStore.yardSaleStore,
    pageStore: combinedStore.pageStore
  };
}

function mapDispatchToProps(dispatch: any): AppActionProps {
  return {
    getProductList: async () => {
      dispatch({ type: SET_LOADING });
      const data = await datasource.getProducts();
      const updatedYardSaleStore = await normalizeYardSaleStore(data);
      if (!!updatedYardSaleStore) {
        dispatch({ type: SET_LOADING_DONE });
      }
      dispatch({ type: UPDATE_PRODUCT_LIST, data: updatedYardSaleStore });
    },
    getImageUrl: async (path) => {
      dispatch({ type: SET_LOADING });
      const imageRes = await datasource.getImageUrl(path);
      if (!!imageRes) {
        dispatch({ type: SET_LOADING_DONE });
      }
      return imageRes;
    }
  };
}

export default function withStore(
  WrappedComponent: React.FunctionComponent<any>
): React.FunctionComponent<any> {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent) as any;
}
