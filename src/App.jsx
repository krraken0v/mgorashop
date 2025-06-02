import Home from './pages/Home/Home';
import Social from './pages/Social/Social';
import NotFound from './pages/NotFound/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound></NotFound>}></Route>
        <Route path="/social" element={<Social />} />
      </Routes>
    </>
  );
}

export default App;
