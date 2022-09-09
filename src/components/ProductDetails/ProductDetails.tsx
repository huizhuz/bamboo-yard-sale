import { FC } from "react";
import styles from './productDetails.module.css';
import { ProductListItem } from "../../redux/store";


export interface ProductDetailsProps {
  product: ProductListItem;
}

const ProductDetails: FC<ProductDetailsProps> = props => {

  const { product } = props;

  return (
    <div className={styles.detailsContainer}>
      <p className={styles.price}>{`$${product.adoptionFee}`}</p>
      <p className={styles.details}>{product.description}</p>
      {!!product.description2 && (
        <p className={styles.details}>{product.description2}</p>
      )}
    </div>
  );
}


export default ProductDetails;