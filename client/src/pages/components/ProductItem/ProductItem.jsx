import styles from './ProductItem.module.sass';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function ProductItem({ _id, image, title, price }) {
  const handleCartItem = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/addtocart/${_id}`,
        {},
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={styles.productItemcontainer} key={_id}>
        <Link to={`/itempage/${_id}`}>
          <div className={styles.productimage} alt="product" />
          <h2 className={styles.producttitle}>{title}</h2>
        </Link>
        <p className={styles.productprice}>{price}$</p>
        <button
          className={styles.buttoncart}
          onClick={() => {
            handleCartItem();
          }}
        >
          Додати в
          <img className={styles.buttoncartimg} src="/public/assets/cartimage.png" alt="cart" />
        </button>
      </div>
    </>
  );
}
