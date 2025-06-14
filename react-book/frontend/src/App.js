import axios from 'axios';
import {
  useEffect, useMemo, useReducer, useState,
} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import DetailItem from './components/DetailItem';
import Cart from './components/Cart';
import Details from './components/Details';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { cartReducer, CartTypes, initialCartState } from './reducers/cartReducer';
import CurrentUserContext from './contexts/CurrentUserContext';
import Login from './components/Login';
import Orders from './components/Orders';
import Footer from './components/Footer';
import CareerQuiz from './components/Quiz';
import Signup from './components/Signup';

function App() {
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [cartSynced, setCartSynced] = useState(false);
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const addToCart = (itemId) => {
    const newCart = cartReducer(cart, { type: CartTypes.ADD, itemId });
    dispatch({ type: CartTypes.ADD, itemId });
    if (currentUser?.username) {
      console.log('🚀 Immediately saving new cart to DB:', newCart);
      axios.post('/api/cart', { cartItems: newCart }).catch(console.error);
    }
  };

  useEffect(() => {
    axios.get('/api/items')
      .then((result) => setItems(result.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    axios.get('/api/auth/current-user')
      .then(async (result) => {
        setCurrentUser(result.data);
        if (result.data?.username) {
          const cartRes = await axios.get('/api/cart');
          dispatch({ type: CartTypes.SYNC_FROM_SERVER, payload: cartRes.data });
          setCartSynced(true);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (currentUser?.username && cartSynced) {
      console.log('CART STATE (about to save):', cart);
      axios.post('/api/cart', { cartItems: cart }).catch(console.error);
    }
  }, [cart, currentUser?.username, cartSynced]);

  const currentUserContextValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser],
  );

  return (
    <Router>
      <CurrentUserContext.Provider
        value={currentUserContextValue}
      >
        <Header cart={cart} dispatch={dispatch} />
        {items.length === 0
          ? <div>Loading...</div>
          : (
            <Routes>
              <Route
                path="/cart"
                element={<Cart cart={cart} dispatch={dispatch} items={items} />}
              />
              <Route path="/details" element={<Details items={items} />}>
                <Route
                  path=":id"
                  element={<DetailItem items={items} addToCart={addToCart} />}
                />
                <Route index element={<div>No Item Selected</div>} />
              </Route>
              <Route path="/" element={<Home items={items} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/orders" element={<Orders items={items} />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/Quiz" element={<CareerQuiz />} />
            </Routes>
          )}
      </CurrentUserContext.Provider>
      <Footer />
    </Router>
  );
}

export default App;
