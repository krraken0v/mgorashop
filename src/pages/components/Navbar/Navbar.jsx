import styles from './Navbar.module.sass';
import { useNavigate } from 'react-router-dom';
export default function Navbar({ onClickCategory }) {
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
              i == 1 ? navigate('/social') : onClickCategory(i);
            }}
          >
            {menuitem}
          </li>
        ))}
      </ul>
      <div className={styles.cartimagecontainer}>
        <a href="#">
          <img className={styles.cartimage} src="/assets/cartimage.png" alt="cartimage" />
        </a>
      </div>
    </div>
  );
}
