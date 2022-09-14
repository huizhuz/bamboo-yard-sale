import { FC } from "react";
import styles from './productDetails.module.css';
import { ProductListItem } from "../../redux/store";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import InquireProduct from "../InquireProduct/InquireProduct";


export interface ProductDetailsProps {
  product: ProductListItem;
  retrieveImgUrls: (product: ProductListItem) => Promise<void>;
}

const ProductDetails: FC<ProductDetailsProps> = props => {

  const { product } = props;

  return (
    <div>
      <ImageCarousel
        product={product}
        retrieveImgUrls={props.retrieveImgUrls}
      />
      <p className={styles.price}>{`$${product.adoptionFee}`}</p>
      <p className={styles.details}>{product.description}</p>
      {!!product.description2 && (
        <p className={styles.details}>{product.description2}</p>
      )}
      {!!product.description3 && (
        <p className={styles.details}>{product.description3}</p>
      )}
      <InquireProduct product={product}/>
    </div>
  );
}


export default ProductDetails;