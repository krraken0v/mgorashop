import styles from './ItemPage.module.sass'
import Navbar from '../components/Navbar/Navbar'
import axios from 'axios'
import { useState,useEffect} from 'react'
import Footer from '../components/Footer/Footer'
import { useParams } from 'react-router-dom'
export default function ItemPage(){
    const [comment,setComment] = useState()
    const [allComments,setAllComments] = useState([]);
    const [item,setItem] = useState([]);
    const {id} = useParams();
    useEffect(()=>{
         const handleItem = async () =>{
            try{
                const response = await axios.get(`http://localhost:5000/api/itempage/${id}`);
                setItem(response.data)
            } catch(error){
                console.log(error.data.message);
            }
            

         }
         handleItem();
    },[id])
   
  return (<><div className={styles.itemPageContainer}>
    <Navbar></Navbar>
    <div className={styles.itemContainer}>
        <div className={styles.itemImage}>{item.img}</div>
        <h2 className={styles.itemTitle}>{item.title}</h2>
        <div className={styles.buttonscontainer}>
            <p className={styles.itemPrice}>ЦЕНА: {item.price}</p>
            <button className={styles.ItemButtonCart}>ДОДАТИ В КОРЗИНУ</button>
            <button className={styles.itemButtonFavorite}><img src="../../public/assets/favoriteButton.png" alt="itemFavorite" /></button>
        </div>
        <div className={styles.itemDescription}>{item.description}</div>
        <div className={styles.addCommentContainer}>
            <input type="text" value={comment} placeholder='НАПИШІТЬ ВІДГУК' onChange={(e)=>setComment(e.target.value)}/>
            <button className={styles.itemButtonAddComment}>ДОДАТИ КОМЕНТАР</button>
        </div>
        <div className={styles.commentsSection}>{allComments.map((item,i)=>(<li key={i}>{item}</li>))}</div>
        </div>
        </div>
        <Footer></Footer></>)
}