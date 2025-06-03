import styles from './Cart.module.sass';
import { useNavigate } from 'react-router-dom';
export default function Cart({ img, title, quantity, price }) {
  const product = {
    img: '/public/assets/notfound.jpg',
    title: 'ФУТБОЛКА',
    quantity: 0,
    price: 799,
  };

  const navigate = useNavigate();
  return (
    <div className={styles.cartcontainer}>
      <h2 className={styles.carttitle}>КОРЗИНА</h2>
      <div className={styles.cartitemcontainer}>
        <div className={styles.cartitem}>
          <img src={product.img} className={styles.cartitemimage} alt="image" />
          <p className={styles.cartitemtitle}>{product.title}</p>
          <div className={styles.buttoncartcontainer}>
            <button className={styles.buttonminus}>-</button>
            <p className={styles.quantity}>{product.quantity}</p>
            <button className={styles.buttonadd}>+</button>
          </div>
          <div className={styles.cartitemprice}>{product.price}</div>
          <div className={styles.buttonttash}>
            <img src="/public/assets/trashicon.png" alt="trash" />
          </div>
        </div>
      </div>
      <div className={styles.allprice}>
        ИТОГО:<span>0</span>
      </div>
      <div className={styles.buttonsforbuycontainer}>
        <button className={styles.buttonback} onClick={() => navigate('/')}>
          ВЕРНУТЬСЯ В КАТАЛОГ
        </button>
        <button className={styles.buttonbuy} onClick={() => navigate('/order')}>
          ОФОРМИТЬ ЗАКАЗ
        </button>
      </div>
    </div>
  );
}
