import styles from '../Admin/Admin.module.sass';
import { useState,useEffect} from 'react';
import axios from 'axios';
export default function Admin() {
    const [orders,setOrders]=useState([]);
    useEffect(()=>{
        const handleOrdersForAdmin = async ()=>{
        try{
            const response = await axios.get("http://localhost:5000/orders");
            setOrders(response.data);
            console.log(response.data);
         }catch (err){
            console.log(err);
        }
    }
    handleOrdersForAdmin();
    },[])
  return (
    <div className={styles.admincontainer}>
        <div>{orders}</div>
        <button className={styles.adminbutton} onClick={()=>console.log(orders)}>Получить заказы</button>
    </div>
  );
}
