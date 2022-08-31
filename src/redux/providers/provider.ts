import { connect } from 'react-redux';
import { CombinedStore } from '../reducers/reducer';
import datasource from '../../lib/datasource';
import {
  UPDATE_PRODUCT_LIST,
} from '../../lib/constants';
import { YardSaleStore } from '../store';
import { normalizeYardSaleStore } from '../../lib/normalizers';

export interface YardSaleStateProps {
  yardSaleStore: YardSaleStore;
}
export interface YardSaleActionProps {
  getProductList: () => any;
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
      const updatedYardSaleStore = normalizeYardSaleStore(data);
      dispatch({ type: UPDATE_PRODUCT_LIST, data: updatedYardSaleStore });
    }
  };
}

export default function withStore(
  WrappedComponent: React.ComponentClass<any>
): React.ComponentClass<any> {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent) as any;
}
