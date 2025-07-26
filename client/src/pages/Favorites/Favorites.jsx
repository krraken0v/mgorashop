import styles from './Favorites.module.sass'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
import Skeleton from '../components/Skeleton/Skeleton';
import ProductItem from '../components/ProductItem/ProductItem';
export default function Favorites(){
    const [isLoading, setIsLoading] = useState(true);
    let [selectedCategory, setSelectedCategory] = useState(0);
    const [favorites,setFavorites] = useState([]);
    useEffect(()=>{
        const handleFavorites = async () =>{
        try{
            const response = await axios.get('http://localhost:5000/api/favorites',{},{withCredentials:true});
        setFavorites(response.data);
        setIsLoading(false);
        console.log(favorites);

        } catch(error){
            console.log(error);
        }
        
    } 
    handleFavorites();
    },[favorites])
    return(
    <>
      <Navbar
        onClickCategory={setSelectedCategory}
      ></Navbar>
      <BurgerMenu onClickCategory={setSelectedCategory}></BurgerMenu>
      <div className={styles.productscontainer}>
        {isLoading
          ? Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className={styles.divskeleton}>
                <Skeleton key={index}></Skeleton>
              </div>
            ))
          : favorites
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
    <Footer></Footer></>)
}