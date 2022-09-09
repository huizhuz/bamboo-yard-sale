import { FC, useEffect } from 'react';
import ProductItem from '../components/ProductItem/ProductItem';
import withStore, { YardSaleProps } from '../redux/providers/provider';
import styles from './styles/productList.module.css';

export interface ProductListPageState {
}

export interface ProductListPageProps extends YardSaleProps {
}

const ProductList: FC<ProductListPageProps> = props => {
  useEffect(() => {
    props.getProductList();
  }, []);

  const productList = props.yardSaleStore?.productList;

  console.log('productList', productList)



  const renderProductList = () => {
    return productList?.map((product, index) => <ProductItem product={product} key={index}/>)
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.grid}>
        {renderProductList()}
      </div>
    </div>
  );
}


export default withStore(ProductList);