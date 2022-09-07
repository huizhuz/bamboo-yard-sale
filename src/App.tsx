import { Provider } from 'react-redux';
import Header from './components/Header/Header';
import { yardSaleStore } from './redux/store';
import ProductList from './screens/productList';

function App() {
  
  return (
    <Provider store={yardSaleStore}>
      <Header></Header>
      <ProductList></ProductList>
    </Provider>
  );
}

export default App;
