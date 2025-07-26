import styles from './ProductItem.module.sass';
import { CartContext } from '../../../ContextCart';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
export default function ProductItem({ _id, image, title, price }) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const addtoCart = () => {
    const existingItem = cartItems.find(item => item.id === id);
    if (existingItem) {
      const updateCart = cartItems.map(item =>
        item.id === _id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updateCart);
    } else {
      setCartItems([...cartItems, { _id, title, price, image, quantity: 1 }]);
    }
  };
  return (
    <>
    <Link to={`/itempage/${_id}`}>
      <div className={styles.productItemcontainer} key={_id}>
        <div className={styles.productimage} alt="product" />
        <h2 className={styles.producttitle}>{title}</h2>
        <p className={styles.productprice}>{price}$</p>
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
      </Link>
    </>
  );
}
