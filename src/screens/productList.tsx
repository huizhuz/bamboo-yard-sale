import { Component } from 'react';
import withStore, { YardSaleProps } from '../redux/providers/provider';

export interface ProductListPageState {
}

export interface ProductListPageProps extends YardSaleProps {
}

class ProductList extends Component<ProductListPageProps, ProductListPageState> {
  componentDidMount() {
    this.props.getProductList();
  }
  render(): JSX.Element {
    
    const productList = this.props.yardSaleStore?.productList;
    return (
      <>
        {productList?.map(product => {
          return (
            <p key={product.itemId}>{product.displayName}</p>
          )
        })}
      </>
    );
  }
}


export default withStore(ProductList);