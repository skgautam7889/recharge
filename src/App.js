import { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import { HashRouter, Route, Redirect, useHistory } from "react-router-dom";
import { userService } from './components/Services';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
// import OrderSummary from './components/OrderSummary';
// import Payment from './components/Payment';
// import PaymentSuccess from './components/PaymentSuccess';
function App() {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [url, setUrl] = useState('');
  useEffect(() => {
    async function getCategories() {
      const endPoint = 'GetHomePageData';
      const categorylists = await userService.getCategoriesList(endPoint);
      setCategories(categorylists);
      const newurl = '/' + categorylists[0].slug;
      setUrl(newurl);
      setData(data);
      setIsLoading(false);
      if (!isLoading && data) {
        history.push('/dth');
      }
    }
    getCategories();
  }, []);

  if (isLoading) {
    return <div id="preloader">
      <div data-loader="dual-ring"></div>
    </div>;
  }
  return (
    <HashRouter>
      <Header />
      <Route exact path="/:slug" categorylists={categories} component={Home} />
      <Route exact path='/home' component={Home} />
      {/* <Route exact path="/order-summary" component={OrderSummary} />
      <Route exact path="/payment" component={Payment} />
      <Route exact path= '/payment-success' component={PaymentSuccess} /> */}
      <Redirect to='/home' />
      <Footer/>
    </HashRouter>
  );
}
export default App;
