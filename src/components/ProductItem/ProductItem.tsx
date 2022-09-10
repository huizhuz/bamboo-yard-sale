import { FC, useState } from "react";
import styles from './productItem.module.css';
import { ProductListItem } from "../../redux/store";
import ProductDetails from "../ProductDetails/ProductDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { faIcons } from "../../lib/fontAwesome";


export interface ProductListItemProps {
  product: ProductListItem;
}

const ProductItem: FC<ProductListItemProps> = props => {
  const [imageIndex, setImageIndex] = useState(0);
  const [showDetails, toggleDetails] = useState(false);

  const onChange = (index: number) => {
    setImageIndex(index);
  }

  const handleDetailsClick = () => {
    toggleDetails(!showDetails);
  }

  const { product } = props;

  const imgUrls = product.imageUrls;

  return (
    <div className={styles.itemContainer}>
      <Carousel
        draggable={false}
        value={imageIndex}
        slides={imgUrls?.map((url, index) => {
          return (
            <div className={styles.imageWrapper} key={`image-${index}`}>
              <img className={styles.img} src={url}></img>
            </div>
          )
        })}
        onChange={onChange}
      >
      </Carousel>
      <Dots
        value={imageIndex}
        onChange={onChange}
        number={imgUrls?.length}
        thumbnails={imgUrls?.map((url, index) => {
          return (
            <div className={styles.thumbnailsImageWrapper} key={`thumbnail-${index}`}>
              <img className={styles.thumbnailsImage} src={url}></img>
            </div>
          )
        })}
      />

      <h2 className={styles.itemLabel}>{product.displayName}</h2>
      <button
        className={styles.expandButton}
        onClick={handleDetailsClick}
      >
        <FontAwesomeIcon icon={faIcons.angleRight} className={showDetails ? styles.collapsed : styles.expanded}/>
        <span>{'让我瞧瞧'}</span>
      </button>
      {showDetails && <ProductDetails product={product}/>}
      {product.sold && <div className={styles.soldOutOverlay} />}
    </div>
  );
}


export default ProductItem;