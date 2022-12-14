import { FC, useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem/ProductItem';
import withStore, { AppProps } from '../redux/providers/provider';
import { FilterBy } from '../redux/store';
import styles from './styles/productList.module.css';
import LoadingIcons from 'react-loading-icons';

export interface ProductListPageProps extends AppProps {
}

const ProductList: FC<ProductListPageProps> = props => {
  // <---------------state and hooks---------------->
  const [filterBy, setFilter] = useState<FilterBy>(FilterBy.all);

  useEffect(() => {
    props.getProductList();
  }, []);


  // <---------------redux data---------------->
  const productList = props.yardSaleStore?.productList;
  const filterMap = new Map<FilterBy, number>();
  productList.forEach(product => {
    if (product.filterBy) {
      filterMap.set(product.filterBy, (filterMap.get(product.filterBy) || 0) + 1)
    }
  });


  // <---------------renderers---------------->
  const renderFilterPicker = () => {
    const filterMapKeys = Array.from(filterMap.keys());
    const resetFilter = () => {
      setFilter(FilterBy.all);
    }

    const content = (
      <div className={styles.filterContainer}>
        <>
          <button className={styles.filterButton} onClick={resetFilter}>{FilterBy.all}</button>
          <span style={{ fontFamily: 'ultrathin' }}> | </span>
        </>
        {filterMapKeys.map((filterName, index) => {
          const setFilterOnClick = () => {
            setFilter(filterName);
          }
          return (
            <>
              <button
                className={styles.filterButton}
                key={index}
                onClick={setFilterOnClick}>
                {filterName}
              </button>
              {index !== filterMapKeys.length - 1 && <span style={{ fontFamily: 'ultrathin' }}> | </span>}
            </>
          )
        })}
      </div>
    )
    return content;
  }

  const renderProductByFilter = (filterBy: FilterBy) => {
    return productList
      ?.filter(product => product.filterBy === filterBy || filterBy === FilterBy.all)
      .map((product, index) => {
        return (
          <ProductItem
            product={product}
            key={index}
            retrieveImgUrls={props.retrieveImgUrls}
          />
        )
      })
  }

  const renderContent = () => {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.innerWrapper}>
          {renderFilterPicker()}
          <div className={styles.grid}>
            {renderProductByFilter(filterBy)}
          </div>
        </div>
      </div>
    )
  }

  const showLoading = () => {
    return (
      <div className={styles.loadingIconContainer}>
        <LoadingIcons.Puff stroke="#6F79A7" strokeOpacity={.125} speed={.75} />
      </div>
    )
  }

  const content = props.pageStore.isloading ? showLoading() : renderContent();

  return content;
}


export default withStore(ProductList);