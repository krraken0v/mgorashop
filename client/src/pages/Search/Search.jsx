import Navbar from '../components/Navbar/Navbar';
import ProductItem from '../components/ProductItem/ProductItem';
import Footer from '../components/Footer/Footer';
import styles from '/src/pages/Home/Home.module.sass';
import Skeleton from '../components/Skeleton/Skeleton';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
export default function Search() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  let [selectedCategory, setSelectedCategory] = useState(0);
  
  useEffect(() => {
    const fetchProductsSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
        setProducts(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(`Ошибка при загрузке товаров: ${err}`);
      }
    };
    fetchProductsSearch();
  }, [query]);
  return (
    <>
      <Navbar
        onClickCategory={setSelectedCategory}
        products={products}
      ></Navbar>
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
                  key={product.id}
                  id={product.id}
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