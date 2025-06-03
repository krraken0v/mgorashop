import Home from './pages/Home/Home';
import Social from './pages/Social/Social';
import NotFound from './pages/NotFound/NotFound';
import Order from './pages/Order/Order';
import Cart from './pages/Cart/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound></NotFound>}></Route>
        <Route path="/order" element={<Order></Order>}></Route>
        <Route path="/social" element={<Social />} />
        <Route path="/cart" element={<Cart></Cart>}></Route>
      </Routes>
    </>
  );
}

export default App;
