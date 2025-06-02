import Navbar from '../components/Navbar/Navbar';
import ProductItem from '../components/ProductItem/ProductItem';
import products from '/src/products.js';
import Footer from '../components/Footer/Footer';
import styles from '/src/pages/Home/Home.module.sass';
import { useState } from 'react';
export default function Home() {
  let [selectedCategory, setSelectedCategory] = useState(0);
  return (
    <>
      <Navbar onClickCategory={setSelectedCategory}></Navbar>
      <div className={styles.productscontainer}>
        {products
          .filter(product =>
            selectedCategory == 0 || selectedCategory == 2
              ? true
              : product.category == selectedCategory
          )
          .map(product => (
            <ProductItem
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            ></ProductItem>
          ))}
        ,
      </div>
      <Footer></Footer>
    </>
  );
}
