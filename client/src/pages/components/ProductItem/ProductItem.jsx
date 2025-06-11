import styles from './ProductItem.module.sass';
import { CartContext } from '../../../ContextCart';

import { useContext } from 'react';
export default function ProductItem({ id, image, title, price, quantity}) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const addtoCart = () => {
    const existingItem = cartItems.find(item => item.id === id);
    if (existingItem) {
      const updateCart = cartItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updateCart);
    } else {
      setCartItems([...cartItems, { id, title, price, image, quantity: 1 }]);
    }
  };
  return (
    <>
      <div className={styles.productItemcontainer} key={id}>
        <img src={image} className={styles.productimage} alt="product" />
        <h2 className={styles.producttitle}>{title}</h2>
        <p className={styles.productprice}>{price}</p>
        <button
          className={styles.buttoncart}
          onClick={() => {
            addtoCart();
          }}
        >
          Додати в
          <img className={styles.buttoncartimg} src="/public/assets/cartimage.png" alt="cart" />
        </button>
      </div>
    </>
  );
}
