import styles from './ProductItem.module.sass';

export default function ProductItem({ id, image, title, price, addCounterCart, addCart }) {
  return (
    <>
      <div className={styles.productItemcontainer} key={id}>
        <img src={image} className={styles.productimage} alt="product" />
        <h2 className={styles.producttitle}>{title}</h2>
        <p className={styles.productprice}>{price}</p>
        <button
          key={id}
          className={styles.buttoncart}
          onClick={() => {
            addCounterCart();
            addCart({ title, price });
          }}
        >
          Додати в
          <img className={styles.buttoncartimg} src="/public/assets/cartimage.png" alt="cart" />
        </button>
      </div>
    </>
  );
}
