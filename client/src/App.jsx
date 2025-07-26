import Home from './pages/Home/Home';
import Social from './pages/Social/Social';
import NotFound from './pages/NotFound/NotFound';
import Order from './pages/Order/Order';
import Cart from './pages/Cart/Cart';
import Success from './pages/Success/Success';
import ItemPage from './pages/ItemPage/ItemPage';
import Search from './pages/Search/Search';
import Admin from './pages/Admin/Admin';
import Cancel from './pages/Cancel/Cancel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favorites from './pages/Favorites/Favorites';
import { CartContext } from './ContextCart';
import { useState } from 'react';
function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <>
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <Routes>
          <Route path='/favorites' element={<Favorites></Favorites>}></Route>
          <Route path="/itempage/:id" element={<ItemPage></ItemPage>}></Route>
          <Route path="/" element={<Home />} />
          <Route path='/search' element={<Search></Search>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
          <Route path="/cart/order" element={<Order></Order>}></Route>
          <Route path="/social" element={<Social />} />
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/success" element={<Success></Success>}></Route>
          <Route path="admin" element={<Admin></Admin>}></Route>
          <Route path="/cancel" element={<Cancel></Cancel>}></Route>
        </Routes>
      </CartContext.Provider>
    </>
  );
}

export default App;
