import { FC, useState } from "react";
import styles from './productItem.module.css';
import { ProductListItem } from "../../redux/store";
import ProductDetails from "../ProductDetails/ProductDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faIcons } from "../../lib/fontAwesome";


export interface ProductListItemProps {
  product: ProductListItem;
  retrieveImgUrls: (product: ProductListItem) => Promise<void>;
}

const ProductItem: FC<ProductListItemProps> = props => {
  const [showDetails, toggleDetails] = useState(false);

  const handleDetailsClick = () => {
    toggleDetails(!showDetails);
  }

  const { product } = props;

  return (
    <div className={styles.itemContainer}>
      {product.heroImageUrl && (
        <div className={styles.imageWrapper}>
          <img src={product.heroImageUrl} className={styles.heroImage}/>
        </div>
      )}

      <h2 className={styles.itemLabel}>{product.displayName}</h2>
      <button
        className={styles.expandButton}
        onClick={handleDetailsClick}
      >
        <FontAwesomeIcon icon={faIcons.angleRight} className={showDetails ? styles.collapsed : styles.expanded}/>
        <span>{'让我瞧瞧'}</span>
      </button>
      {showDetails && (
        <ProductDetails
          product={product}
          retrieveImgUrls={props.retrieveImgUrls}
        />
      )}
    </div>
  );
}


export default ProductItem;