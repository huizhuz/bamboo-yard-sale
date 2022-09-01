import { FC, useState } from "react";
import styles from './productItem.module.css';
import { ProductListItem } from "../../redux/store";
import Carousel, { Dots, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';


export interface ProductListItemProps {
  product: ProductListItem;
}

const ProductItem: FC<ProductListItemProps> = props => {
  const [imageIndex, setImageIndex] = useState(0);
  const onChange = (index: number) => {
    setImageIndex(index);
  }
  const { product } = props;

  const imgUrls = product.imageUrls;
  return (
    <div className={styles.itemContainer} key={product.itemId}>
      <Carousel
        plugins={['infinite']}
        value={imageIndex}
        slides={imgUrls?.map((url, index) => {
          return (
            <div className={styles.imageWrapper} key={index}>
              <img className={styles.img} src={url}></img>
            </div>
          )
        })}
        onChange={onChange}
      >
      </Carousel>
      <Dots value={imageIndex} onChange={onChange} number={imgUrls?.length} />
      <p className={styles.itemLabel} key={product.itemId}>{product.displayName}</p>
      <p className={styles.itemPrice}>{`$${product.adoptionFee}`}</p>
    </div>
  );
}


export default ProductItem;