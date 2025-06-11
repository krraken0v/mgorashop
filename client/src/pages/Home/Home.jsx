import Navbar from '../components/Navbar/Navbar';
import ProductItem from '../components/ProductItem/ProductItem';
import Footer from '../components/Footer/Footer';
import styles from '/src/pages/Home/Home.module.sass';
import { useState,useEffect} from 'react';
import axios from 'axios';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
export default function Home() {
  const [products,setProducts] = useState([]);
  let [selectedCategory, setSelectedCategory] = useState(0);
  useEffect(()=>{
    const fetchProducts = async () =>{
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data)
      } catch(err){
        console.error(`Ошибка при загрузке товаров: ${err}`);
      }
    }
    fetchProducts()
  },[]);
  return (
    <>
      <Navbar onClickCategory={setSelectedCategory}></Navbar>
      <BurgerMenu onClickCategory={setSelectedCategory}></BurgerMenu>
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
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              quantity={product.quantity}
            ></ProductItem>
          ))}
        ,
      </div>
      <Footer></Footer>
    </>
  );
}
