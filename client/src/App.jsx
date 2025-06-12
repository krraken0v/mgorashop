import Home from './pages/Home/Home';
import Social from './pages/Social/Social';
import NotFound from './pages/NotFound/NotFound';
import Order from './pages/Order/Order';
import Cart from './pages/Cart/Cart';
import Success from './pages/Success/Success';
import Cancel from './pages/Cancel/Cancel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartContext } from './ContextCart';
import { useState } from 'react';
function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <>
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound></NotFound>}></Route>
          <Route path="/cart/order" element={<Order></Order>}></Route>
          <Route path="/social" element={<Social />} />
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/success" element={<Success></Success>}></Route>
          <Route path="/cancel" element={<Cancel></Cancel>}></Route>
        </Routes>
      </CartContext.Provider>
    </>
  );
}

export default App;
