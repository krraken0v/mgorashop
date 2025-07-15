import styles from './Navbar.module.sass';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../../ContextCart';
import { useState } from 'react';
import Register from '../../Register/Register';
export default function Navbar({ onClickCategory, products, onSearch }) {
  const menu = ['ГОЛОВНА', 'КОНТАКТИ', 'ВЕСЬ ОДЯГ', 'ФУТБОЛКИ', 'ШТАНИ', 'КУРТКИ'];
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [modalReg, setModalReg] = useState(false);
  const { cartItems } = useContext(CartContext);
  const handleSearch = e => {
    const value = e.target.value;
    setSearch(value);
    const filtered = products.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    onSearch(filtered);
  };

  return (
    <div className={styles.navbarcontainer}>
      <div className={styles.logoimagecontainer}>
        <img className={styles.logoimage} src="/assets/mgoralogo.png" alt="mgoralogo" />
      </div>
      <ul className={styles.navbarmodule}>
        {menu.map((menuitem, i) => (
          <li
            className={styles.navbaroption}
            key={i}
            onClick={() => {
              i == 1 ? navigate('/social') : navigate('/'), onClickCategory(i);
            }}
          >
            {menuitem}
          </li>
        ))}
      </ul>
      <input type="text" placeholder="ПОИСК" onChange={e => handleSearch(e)} />
      <button onClick={() => setModalReg(true)} className={styles.registerbutton}>
        РЕГИСТРАЦИЯ
      </button>
      <div className={styles.cartimagecontainer} onClick={() => navigate('/cart')}>
        <img className={styles.cartimage} src="/assets/cartimage.png" alt="cartimage" />
        <p className={styles.counternumber}>
          {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        </p>
      </div>
      {modalReg && <Register setModalReg={setModalReg}></Register>}
    </div>
  );
}
