import { FC } from "react";
import styles from './productItem.module.css';
import { ProductListItem } from "../../redux/store";

export interface ProductListItemProps {
  product: ProductListItem;
}

const ProductItem: FC<ProductListItemProps> = props => {
  const { product } = props;

  const imgUrls = product.imageUrls;
  return (
    <div className={styles.itemContainer} key={product.itemId}>
      <div className={styles.imgContainer}>
        {imgUrls?.map((url, index) => <img key={index} className={styles.img} src={url}></img>)}
      </div>
      <p className={styles.itemLabel} key={product.itemId}>{product.displayName}</p>
      <p>{`$${product.adoptionFee}`}</p>
    </div>
  );
}


export default ProductItem;