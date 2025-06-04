import styles from './Order.module.sass';
import { CartContext } from '../../ContextCart';
import { useContext } from 'react';
import { useState } from 'react';
export default function Order() {
  const { cartItems } = useContext(CartContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [adress, setAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [modal, setShowModal] = useState(false);
  const handleModalShow = () => {
    setShowModal(true);
  };
  return (
    <div className={styles.ordercontainer}>
      <h2 className={styles.ordertitle}>ОФОРМИТЕ СВОЙ ЗАКАЗ!</h2>
      <div className={styles.inputscontainer}>
        <input
          className={styles.orderinput}
          type="text"
          placeholder="ИМЯ ФАМИЛИЯ"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className={styles.orderinput}
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className={styles.orderinput}
          type="text"
          placeholder="АДРЕС ДОСТАВКИ (ГОРОД,УЛИЦА, ДОМ)"
          value={adress}
          onChange={e => setAdress(e.target.value)}
        />
        <input
          className={styles.orderinput}
          type="phone"
          placeholder="ТЕЛЕФОН"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>
      <div className={styles.checkcontainer}>
        <input className={styles.ordercheckbox} type="checkbox" name="" id="" />
        <p className={styles.agreeorder}>Я СОГЛАСЕН С УСЛОВИЯМИ</p>
      </div>
      <div className={styles.orderSubmit}>
        ВАШ ЗАКАЗ:
        {cartItems.map(item => (
          <p className={styles.submitparagraph} key={item.id}>
            <img className={styles.okicon} src="/public/assets/okicon.png" alt="ok" /> {item.title}X
            {item.quantity} - {item.price * item.quantity}
          </p>
        ))}
      </div>
      <button className={styles.ordersuccess} onClick={() => handleModalShow()}>
        ОФОРМИТЬ ЗАКАЗ
      </button>
      {modal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>Спасибо за заказ! Мы с вами свяжемся.</p>
            <button onClick={() => setShowModal(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}
