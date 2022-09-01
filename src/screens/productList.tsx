import { FC, useEffect } from 'react';
import ProductItem from '../components/ProductItem/ProductItem';
import withStore, { YardSaleProps } from '../redux/providers/provider';

export interface ProductListPageState {
}

export interface ProductListPageProps extends YardSaleProps {
}

const ProductList: FC<ProductListPageProps> = props => {
  useEffect(() => {
    props.getProductList();
  }, []);

  const productList = props.yardSaleStore?.productList;


  const renderProductList = () => {
    return productList?.map(product => <ProductItem product={product} />)
  }

  return (
    <>
      {renderProductList()}
    </>
  );
}


export default withStore(ProductList);