import { FC, useEffect, useState } from "react";
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import styles from './imageCarousel.module.css';
import { ProductListItem } from "../../redux/store";
import LoadingIcons from "react-loading-icons";

export interface ImageCarouselProps {
  product: ProductListItem;
  retrieveImgUrls: (product: ProductListItem) => Promise<void>;
}

const ImageCarousel: FC<ImageCarouselProps> = props => {
  const { product } = props;
  const [imageIndex, setImageIndex] = useState(0);
  const [isloadingImage, setLoadingImage] = useState(true);
  const imgUrls = product.imageUrls;

  const onChange = (index: number) => {
    setImageIndex(index);
  }

  useEffect(() => {
    if (imgUrls.length === 0) {
      props.retrieveImgUrls(product).then(() => setLoadingImage(false));
    } else {
      setLoadingImage(false);
    }
  }, [])

  const renderCarousel = () => {
    return (
      <div className={styles.detailsContainer}>
        <Carousel
          draggable={false}
          value={imageIndex}
          slides={imgUrls?.filter(url => !url?.includes('_1'))?.map((url, index) => {
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
          thumbnails={imgUrls?.filter(url => !url?.includes('_1'))?.map((url, index) => {
            return (
              <div className={styles.thumbnailsImageWrapper} key={`thumbnail-${index}`}>
                <img className={styles.thumbnailsImage} src={url}></img>
              </div>
            )
          })}
        />
      </div>
    );
  }

  const renderLoading = () => {
    return (
      <div className={styles.loadingIconContainer}>
        <LoadingIcons.Puff stroke="#6F79A7" strokeOpacity={.125} speed={.75} />
      </div>
    )
  }


  return isloadingImage ? renderLoading(): renderCarousel();
}


export default ImageCarousel;
