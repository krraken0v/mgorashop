import styles from './Cart.module.sass';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const handleCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/addtocart', {
          withCredentials: true,
        });
        setCartItems(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    handleCartItems();
  }, []);
  const [navigateOrder, setnavigateOrder] = useState(false);
  const handleCartItems = () => {
    if (!cartItems.length) {
      setnavigateOrder(true);
      console.log(navigateOrder);
    } else {
      navigate('/cart/order');
    }
    return;
  };
  const totalPrice = cartItems.reduce((accum, item) => {
    return accum + item.price * (item.quantity || 1);
  }, 0);
  const handleItems = idToRemove =>
    setCartItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
  const incrementQuantity = id => {
    setCartItems(prev =>
      prev.map(item => (item.id == id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };
  const decrementQuantity = id => {
    setCartItems(prev =>
      prev.map(item =>
        item.id == id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
      )
    );
  };

  return (
    <div className={styles.cartcontainer}>
      <h2 className={styles.carttitle}>КОРЗИНА</h2>
      <div className={styles.cartitemcontainer}>
        {cartItems.map((item, index) => (
          <div className={styles.cartitem} key={index}>
            <img src={item.image} className={styles.cartitemimage} alt="image" />
            <p className={styles.cartitemtitle}>{item.title}</p>
            <div className={styles.buttoncartcontainer}>
              <button className={styles.buttonminus} onClick={() => decrementQuantity(item.id)}>
                -
              </button>
              <p className={styles.quantity}>{item.quantity}</p>
              <button className={styles.buttonadd} onClick={() => incrementQuantity(item.id)}>
                +
              </button>
            </div>
            <div className={styles.cartitemprice}>{item.price}$</div>
            <div className={styles.buttonttash} onClick={() => handleItems(item.id)}>
              <img src="/public/assets/trashicon.png" alt="trash" />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.allprice}>ИТОГО: {totalPrice}$</div>
      <div className={styles.buttonsforbuycontainer}>
        <button className={styles.buttonback} onClick={() => navigate('/')}>
          ВЕРНУТЬСЯ В КАТАЛОГ
        </button>
        <button
          className={styles.buttonbuy}
          onClick={() => {
            handleCartItems();
          }}
        >
          ОФОРМИТЬ ЗАКАЗ
        </button>
        {navigateOrder && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <p className={styles.modalText}>
                ВЫ НИЧЕГО НЕ ДОБАВИЛИ В КОРЗИНУ,ЧТОБЫ ОФОРМИТЬ ЗАКАЗ!
              </p>
              <button
                className={styles.modalButton}
                onClick={() => {
                  navigate('/');
                }}
              >
                ВЕРНУТЬСЯ В КАТАЛОГ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
