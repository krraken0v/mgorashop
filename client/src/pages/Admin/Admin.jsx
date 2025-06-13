import styles from '../Admin/Admin.module.sass';
import { useState } from 'react';
import axios from 'axios';
export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const handleOrdersForAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders');
      setOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(orders);

  return (
    <div className={styles.admincontainer}>
      <input
        type="text"
        placeholder="ПОИСК ПО ЗАКАЗАМ"
        className={styles.adminOrdersInput}
        onChange={e => setSearch(e.target.value)}
      />
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Адрес</th>
            <th>Товары</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .filter(
              item =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.phone.includes(search.toLowerCase) ||
                item.email.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.adress}</td>
                <td>
                  <ul>
                    {item.items.map((product, i) => (
                      <li key={i}>
                        {product.title} == {product.price}$ == {product.quantity} шт
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button className={styles.adminbutton} onClick={() => handleOrdersForAdmin()}>
        Получить заказы
      </button>
    </div>
  );
}
