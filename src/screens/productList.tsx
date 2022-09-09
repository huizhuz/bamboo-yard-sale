import { FC, useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem/ProductItem';
import withStore, { YardSaleProps } from '../redux/providers/provider';
import { FilterBy } from '../redux/store';
import styles from './styles/productList.module.css';

export interface ProductListPageProps extends YardSaleProps {
}

const ProductList: FC<ProductListPageProps> = props => {
  useEffect(() => {
    props.getProductList();
  }, []);

  const productList = props.yardSaleStore?.productList;
  const [filterBy, setFilter] = useState<FilterBy>('');

  // console.log('productList', productList);

  const renderProductList = () => {
    return productList?.map((product, index) => <ProductItem product={product} key={index}/>)
  }

  const renderProductByFilter = (filterBy: FilterBy) => {
    return productList
      ?.filter(product => product.filterBy == filterBy)
      .map((product, index) => <ProductItem product={product} key={index}/>)
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.grid}>
        {filterBy === '' ? renderProductList() : renderProductByFilter(filterBy)}
      </div>
    </div>
  );
}


export default withStore(ProductList);