import { Provider } from 'react-redux';
import { yardSaleStore } from './redux/store';
import ProductList from './screens/productList';

function App() {
  
  return (
    <Provider store={yardSaleStore}>
      <ProductList></ProductList>
    </Provider>
  );
}

export default App;
