import { Provider } from 'react-redux';
import Header from './components/Header/Header';
import { yardSaleStore } from './redux/store';
import ProductList from './screens/productList';

function App() {

  window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll', (window.pageYOffset / 200).toString());
  }, false);
  
  return (
    <Provider store={yardSaleStore}>
      <Header></Header>
      <ProductList></ProductList>
    </Provider>
  );
}

export default App;
