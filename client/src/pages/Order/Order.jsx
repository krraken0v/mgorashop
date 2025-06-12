import styles from './Order.module.sass';
import { CartContext } from '../../ContextCart';
import { useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
export default function Order() {
  const { cartItems } = useContext(CartContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [adress, setAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [checkboxChecked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const stripePromise = loadStripe(
    'pk_test_51RVH1L07KLR4Sxkk9s8RB3jzJZww1PPwFgcmAnRYVN19zeh4y0kKNLOsSDpfYkccGeAPUi2uouoEnmGPJ35Harz800by3QLki7'
  );
  const handleStripePayment = async () => {
    try {
      const response = await fetch('http://localhost:5000/payment/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error('Stripe payment error:', error);
    }
  };

  const postOrders = async () => {
    const itemsToSend = cartItems.map(item => ({
      title: item.title,
      price: item.price,
      quantity: item.quantity || 1,
    }));
    const newOrder = {
      name: name,
      email: email,
      adress: adress,
      phone: phone,
      items: itemsToSend,
    };
    try {
      const response = await axios.post('http://localhost:5000/orders', newOrder);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const handleModalShow = async () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Введите имя и фамилию';
    if (!email.trim()) newErrors.email = 'Введите email';
    if (!adress.trim()) newErrors.adress = 'Введите свой адрес';
    if (!phone.trim()) newErrors.phone = 'Введите номер телефона';
    if (!checkboxChecked) newErrors.agree = 'Вы должны согласиться с условиями';
    if (cartItems.length < 1) newErrors.cart = 'ВЫ должны заказать что-нибудь';
    if (!/^[^\s@]+@[^\s@.]+\.[^\s@]+(?:\.[^\s@]+)*$/.test(email)) {
      newErrors.email = 'Некорректный email';
    }
    if (!/^\+?\d{10,15}$/.test(phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await postOrders();
      await handleStripePayment();
      setErrors({});
    } catch (error) {
      console.log(error);
    }
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
          type="tel"
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
        {errors.cart && <p className={styles.errorTextAgree}>{errors.cart}</p>}
        {cartItems.map(item => (
          <p className={styles.submitparagraph} key={item.id}>
            <img className={styles.okicon} src="/public/assets/okicon.png" alt="ok" /> {item.title}{' '}
            == {item.quantity} шт == {item.price * item.quantity}$
          </p>
        ))}
      </div>
      <button
        className={styles.ordersuccess}
        onClick={() => {
          handleModalShow();
        }}
      >
        ПЕРЕЙТИ К ОПЛАТЕ
      </button>
    </div>
  );
}
