import styles from './Navbar.module.sass';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Login from '../../Login/Login';
import { CartContext } from '../../../ContextCart';
import { useState } from 'react';
import Register from '../../Register/Register';
export default function Navbar({ onClickCategory}) {
  const menu = ['ГОЛОВНА', 'КОНТАКТИ', 'ВЕСЬ ОДЯГ', 'ФУТБОЛКИ', 'ШТАНИ', 'КУРТКИ'];
  const navigate = useNavigate();
  const [modalReg, setModalReg] = useState(false);
  const [modalLog,setModalLog] = useState(false);
  const [search,setSearch] = useState('');
  const { cartItems } = useContext(CartContext);
  const handleSearch = () =>{
    if(search.trim()){
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  }
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
      <input type="text" placeholder="ПОИСК" value={search} onChange={e => setSearch(e.target.value)} />
      <button onClick={()=>handleSearch()} className={styles.buttonsearch}>ПОИСК</button>
      <button onClick={() => setModalReg(true)} className={styles.registerbutton}>
        РЕГИСТРАЦИЯ
      </button>
      <button onClick={()=>setModalLog(true)} className={styles.loginbutton}>ВОЙТИ</button>
      <div className={styles.cartimagecontainer} onClick={() => navigate('/cart')}>
        <img className={styles.cartimage} src="/assets/cartimage.png" alt="cartimage" />
        <p className={styles.counternumber}>
          {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        </p>
      </div>
      {modalReg && <Register setModalReg={setModalReg}></Register>}
      {modalLog && <Login setModalLog={setModalLog}></Login>}
    </div>
  );
}
