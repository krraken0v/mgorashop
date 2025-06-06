import styles from './Order.module.sass';
import { CartContext } from '../../ContextCart';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Order() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [adress, setAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [modal, setShowModal] = useState(false);
  const [checkboxChecked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const handleModalShow = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Введите имя и фамилию';
    if (!email.trim()) newErrors.email = 'Введите email';
    if (!adress.trim()) newErrors.adress = 'Введите свой адрес';
    if (!phone.trim()) newErrors.phone = 'Введите номер телефона';
    if (!checkboxChecked) newErrors.agree = 'Вы должны согласиться с условиями';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setShowModal(true);
  };
  return (
    <div className={styles.ordercontainer}>
      <h2 className={styles.ordertitle}>ОФОРМИТЕ СВОЙ ЗАКАЗ!</h2>
      <div className={styles.inputscontainer}>
        <input
          className={`${styles.orderinput} ${errors.name ? styles.error : ' '}`}
          type="text"
          placeholder="ИМЯ ФАМИЛИЯ"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        <input
          className={`${styles.orderinput} ${errors.email ? styles.error : ' '}`}
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        <input
          className={`${styles.orderinput} ${errors.adress ? styles.error : ' '}`}
          type="text"
          placeholder="АДРЕС ДОСТАВКИ (ГОРОД,УЛИЦА, ДОМ)"
          value={adress}
          onChange={e => setAdress(e.target.value)}
          required
        />
        {errors.adress && <span className={styles.errorText}>{errors.adress}</span>}
        <input
          className={`${styles.orderinput} ${errors.phone ? styles.error : ' '}`}
          type="phone"
          placeholder="ТЕЛЕФОН"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
        {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
      </div>
      <div className={styles.checkcontainer}>
        <input
          className={styles.ordercheckbox}
          type="checkbox"
          name="checkboxCheck"
          id="1"
          checked={checkboxChecked}
          onChange={e => setChecked(e.target.checked)}
          required
        />
        <p className={styles.agreeorder}>Я СОГЛАСЕН С УСЛОВИЯМИ</p>
      </div>
      {errors.agree && <span className={styles.errorTextAgree}>{errors.agree}</span>}
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
            <p className={styles.modalText}>Ваш заказ успешно оформлен!</p>{' '}
            <button
              className={styles.modalButton}
              onClick={() => {
                navigate('/');
              }}
            >
              Вернуться в каталог
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
