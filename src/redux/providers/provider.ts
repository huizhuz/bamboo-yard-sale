import { connect } from 'react-redux';
import { CombinedStore } from '../reducers/reducer';
import datasource from '../../lib/datasource';
import {
  UPDATE_PRODUCT_LIST,
  SET_LOADING,
  SET_LOADING_DONE,
  UPDATE_PRODUCT_IMAGE
} from '../../lib/constants';
import { FilterBy, PageStore, ProductListItem, YardSaleStore } from '../store';
import { normalizeYardSaleStore } from '../../lib/normalizers';
import { ImageResponse } from '../../lib/types';

export interface AppStateProps {
  yardSaleStore: YardSaleStore;
  pageStore: PageStore;
}
export interface AppActionProps {
  getProductList: () => any;
  getProductsByFilter: (filter: FilterBy) => any;
  // getImageUrl: (path: string) => Promise<ImageResponse>;
  retrieveImgUrls: (product: ProductListItem) => Promise<void>;
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
    getProductsByFilter: async (filter: FilterBy) => {
      dispatch({ type: SET_LOADING });
      const data = await datasource.getProductsByFilter(filter);
      const updatedYardSaleStore = await normalizeYardSaleStore(data);
      if (!!updatedYardSaleStore) {
        dispatch({ type: SET_LOADING_DONE });
      }
      dispatch({ type: UPDATE_PRODUCT_LIST, data: updatedYardSaleStore });
    },
    // getImageUrl: async (path) => {
    //   dispatch({ type: SET_LOADING });
    //   const imageRes = await datasource.getImageUrl(path);
    //   if (!!imageRes) {
    //     dispatch({ type: SET_LOADING_DONE });
    //   }
    //   return imageRes;
    // }
    retrieveImgUrls: async (product: ProductListItem) => {
      const imagePaths = product.imagePaths || [];
      const imageUrls = [];

      if (imagePaths.length === 0) {
        return;
      }

      for (let imagePath of imagePaths) {
        const imageRes = await datasource.getImageUrl(imagePath);
        if (imageRes.success && imageRes.url) {
          imageUrls.push(imageRes.url);
        }
      }

      product.imageUrls = imageUrls;
      dispatch({ type: UPDATE_PRODUCT_IMAGE, data: product });
    }
  };
}

export default function withStore(
  WrappedComponent: React.FunctionComponent<any>
): React.FunctionComponent<any> {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent) as any;
}
