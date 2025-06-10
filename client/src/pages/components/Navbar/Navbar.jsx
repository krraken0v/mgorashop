import styles from './Navbar.module.sass';
import { useNavigate } from 'react-router-dom';
export default function Navbar({ onClickCategory, counter }) {
  const menu = ['ГОЛОВНА', 'КОНТАКТИ', 'ВЕСЬ ОДЯГ', 'ФУТБОЛКИ', 'ШТАНИ', 'КУРТКИ'];
  const navigate = useNavigate();
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
      <div className={styles.cartimagecontainer} onClick={() => navigate('/cart')}>
        <img className={styles.cartimage} src="/assets/cartimage.png" alt="cartimage" />
        <p className={styles.counternumber}>{counter}</p>
      </div>
    </div>
  );
}
