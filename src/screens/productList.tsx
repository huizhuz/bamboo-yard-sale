import { FC, useEffect } from 'react';
import ProductItem from '../components/ProductItem/ProductItem';
import withStore, { YardSaleProps } from '../redux/providers/provider';

export interface ProductListPageState {
}

export interface ProductListPageProps extends YardSaleProps {
}

const ProductList: FC<ProductListPageProps> = props => {
  useEffect(() => {
    // props.getProductList();
  }, []);

  // const productList = props.yardSaleStore?.productList;
  const productList = [
    {
      "itemId": "ukulele",
      "displayName": "Kala KA-KTG 尤克里里",
      "adoptionFee": 180,
      "imageUrls": [
        "https://firebasestorage.googleapis.com/v0/b/bamboo-yard-sale.appspot.com/o/assets%2Fimages%2Fukulele%2Fukulele_3.jpg?alt=media&token=a0c39d94-2bda-4946-85ff-7cb33edef866",
        "https://firebasestorage.googleapis.com/v0/b/bamboo-yard-sale.appspot.com/o/assets%2Fimages%2Fukulele%2Fukulele_2.jpg?alt=media&token=7c3a4f59-b7ef-4fc1-8dcd-38c8480cca03",
        "https://firebasestorage.googleapis.com/v0/b/bamboo-yard-sale.appspot.com/o/assets%2Fimages%2Fukulele%2Fukulele_5.jpg?alt=media&token=384d7ef3-88e5-4450-a5cf-4f0bca9631e0",
        "https://firebasestorage.googleapis.com/v0/b/bamboo-yard-sale.appspot.com/o/assets%2Fimages%2Fukulele%2Fukulele_1.jpg?alt=media&token=5fca1c94-b25b-48e7-a896-6f4d40d05ce7",
        "https://firebasestorage.googleapis.com/v0/b/bamboo-yard-sale.appspot.com/o/assets%2Fimages%2Fukulele%2Fukulele_4.jpg?alt=media&token=f4a1d50e-7d43-49ae-b341-a466be18daf0"
      ]
    },
    {
      "itemId": "yogurt_maker",
      "displayName": "酸奶机",
      "adoptionFee": 20,
      "imageUrls": []
    }
  ]

  console.log('productList', productList)



  const renderProductList = () => {
    return productList?.map(product => <ProductItem product={product} />)
  }

  return (
    <>
      {renderProductList()}
    </>
  );
}


export default withStore(ProductList);