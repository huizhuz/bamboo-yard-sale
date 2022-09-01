import { FC, useEffect } from 'react';
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

  return (
    <>
      {productList?.map(product => {
        const imgUrls = product.imageUrls;
        return (
          <div key={product.itemId}>
            <p key={product.itemId}>{product.displayName}</p>
            {imgUrls?.map((url) => <img src={url}></img>)}
          </div>
        )
      })}
    </>
  );
}


export default withStore(ProductList);