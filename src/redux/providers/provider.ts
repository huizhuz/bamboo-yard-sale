import { connect } from 'react-redux';
import { CombinedStore } from '../reducers/reducer';
import datasource from '../../lib/datasource';
import {
  UPDATE_PRODUCT_LIST,
} from '../../lib/constants';
import { YardSaleStore } from '../store';
import { normalizeYardSaleStore } from '../../lib/normalizers';
import { ImageResponse } from '../../lib/types';

export interface YardSaleStateProps {
  yardSaleStore: YardSaleStore;
}
export interface YardSaleActionProps {
  getProductList: () => any;
  getImageUrl: (path: string) => Promise<ImageResponse>;
}

export interface YardSaleProps extends YardSaleStateProps, YardSaleActionProps { }

function mapStateToProps(combinedStore: CombinedStore): YardSaleStateProps {
  return {
    yardSaleStore: combinedStore.yardSaleStore
  };
}

function mapDispatchToProps(dispatch: any): YardSaleActionProps {
  return {
    getProductList: async () => {
      const data = await datasource.getProducts();
      const updatedYardSaleStore = await normalizeYardSaleStore(data);
      dispatch({ type: UPDATE_PRODUCT_LIST, data: updatedYardSaleStore });
    },
    getImageUrl: async (path) => {
      const imageRes = await datasource.getImageUrl(path);
      return imageRes;
    }
  };
}

export default function withStore(
  WrappedComponent: React.FunctionComponent<any>
): React.FunctionComponent<any> {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent) as any;
}
