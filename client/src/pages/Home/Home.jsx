import Navbar from '../components/Navbar/Navbar';
import ProductItem from '../components/ProductItem/ProductItem';
import Footer from '../components/Footer/Footer';
import styles from '/src/pages/Home/Home.module.sass';
import Skeleton from '../components/Skeleton/Skeleton';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [selectedCategory, setSelectedCategory] = useState(0);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(`Ошибка при загрузке товаров: ${err}`);
      }
    };
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products?sort=${selectedCategory}`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilteredProducts();
    fetchProducts();
  }, [selectedCategory]);
  return (
    <>
      <Navbar onClickCategory={setSelectedCategory} products={products}></Navbar>
      <BurgerMenu onClickCategory={setSelectedCategory}></BurgerMenu>
      <div className={styles.productscontainer}>
        {isLoading
          ? Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className={styles.divskeleton}>
                <Skeleton key={index}></Skeleton>
              </div>
            ))
          : products
              .filter(product =>
                selectedCategory == 0 || selectedCategory == 2
                  ? true
                  : product.category == selectedCategory
              )
              .map(product => (
                <ProductItem
                  key={product._id}
                  _id={product._id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  quantity={product.quantity}
                ></ProductItem>
              ))}
      </div>
      <Footer></Footer>
    </>
  );
}
