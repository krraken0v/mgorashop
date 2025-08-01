import styles from './Navbar.module.sass';
import { useNavigate } from 'react-router-dom';
import Login from '../../Login/Login';
import { useState, useEffect } from 'react';
import Register from '../../Register/Register';
import axios from 'axios';
export default function Navbar({ onClickCategory }) {
  const menu = ['ГОЛОВНА', 'КОНТАКТИ', 'ВЕСЬ ОДЯГ', 'ФУТБОЛКИ', 'ШТАНИ', 'КУРТКИ'];
  const navigate = useNavigate();
  const [modalReg, setModalReg] = useState(false);
  const [modalLog, setModalLog] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [modalAcc, setModalAcc] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };
  useEffect(() => {
    const handleAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth', {
          withCredentials: true,
        });
        if (response.status == 200) {
          setRegistered(true);
        }
        console.log(response);
      } catch (err) {
        console.log(err);
        setRegistered(false);
      } finally {
        setIsLoading(false);
      }
    };

    handleAuth();
  }, []);
  const handleExit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/authexit',
        {},
        { withCredentials: true }
      );
      if (response.status == 200) {
        setRegistered(false);
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
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
      <div>
        <input
          type="text"
          placeholder="ПОИСК"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => handleSearch()} className={styles.buttonsearch}>
          ПОИСК
        </button>
      </div>
      {registered && (
        <div>
          <img
            className={styles.accountIcon}
            onClick={() => setModalAcc(true)}
            src="../../../../public/assets/accountIcon.png"
            alt="accountIcon"
          />
        </div>
      )}
      {!registered && !isLoading && (
        <div>
          <button onClick={() => setModalReg(true)} className={styles.registerbutton}>
            РЕГИСТРАЦИЯ
          </button>
          <button onClick={() => setModalLog(true)} className={styles.loginbutton}>
            ВОЙТИ
          </button>
        </div>
      )}
      <div className={styles.cartimagecontainer} onClick={() => navigate('/cart')}>
        <img className={styles.cartimage} src="/assets/cartimage.png" alt="cartimage" />
        <p className={styles.counternumber}>
          {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        </p>
      </div>
      {modalAcc && registered && (
        <div className={styles.modalAccContainer}>
          <div className={styles.favoriteText} onClick={() => navigate('/favorites')}>
            <img src="../../../../public/assets/favoriteButton.png" alt="favoriteButton" />
            <p>Избранное</p>
          </div>
          <div className={styles.accExit}>
            <button onClick={() => handleExit()}>Выйти</button>
          </div>
        </div>
      )}
      {modalReg && <Register setModalReg={setModalReg}></Register>}
      {modalLog && <Login setModalLog={setModalLog}></Login>}
    </div>
  );
}
