import { useNavigate } from 'react-router-dom';
import styles from '../BurgerMenu/BurgerMenu.module.sass';
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../../ContextCart';
export default function BurgerMenu({ onClickCategory }) {
  const menu = ['ГОЛОВНА', 'КОНТАКТИ', 'ВЕСЬ ОДЯГ', 'ФУТБОЛКИ', 'ШТАНИ', 'КУРТКИ'];
  const navigate = useNavigate();
  const [opened, setOpen] = useState(false);
  const { cartItems } = useContext(CartContext);

  return (
    <>
      <div className={styles.burgercontainer}>
        <div className={styles.logoimagecontainer}>
          <img className={styles.logoimage} src="/assets/mgoralogo.png" alt="mgoralogo" />
        </div>
        <div onClick={() => setOpen(true)} className={styles.burgerimg}>
          <div className={styles.cartimagecontainer} onClick={() => navigate('/cart')}>
            <img className={styles.cartimage} src="/assets/cartimage.png" alt="cartimage" />
            <p className={styles.counternumber}>
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </p>
          </div>
          <img src="/public/assets/burgermenu.png" alt="burgermenuimg" />
        </div>
        {opened && (
          <div className={styles.burgermenuContainer}>
            <img
              className={styles.closeBurgerImg}
              onClick={() => setOpen(false)}
              src="/assets/closeicon.png"
              alt="mgoralogo"
            />
            <ul className={styles.burgeritemsmodule}>
              {menu.map((menuitem, i) => (
                <li
                  className={styles.burgeroption}
                  key={i}
                  onClick={() => {
                    i == 1 ? navigate('/social') : navigate('/'), onClickCategory(i);
                  }}
                >
                  {menuitem}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
