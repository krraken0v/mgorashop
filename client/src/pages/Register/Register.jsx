import styles from './Register.module.sass';
import { useState } from 'react';
import axios from 'axios';
export default function Register({ setModalReg }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const handleRegister = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/register',
        { username, email, password },
        { withCredentials: true }
      );
      setModalReg(false);
      console.log(response.data);
    } catch (error) {
      console.log('НЕ УДАЛОСЬ ЗАРЕГЕСТРИРОВАТЬ ПОЛЬЗОВАТЕЛЯ', error);
      setErrors(error.response?.data?.errors || [error.message]);
    }
  };
  return (
    <>
      <div className={styles.registercontainer}>
        <div className={styles.registermodal}>
          <img
            onClick={() => setModalReg(false)}
            src="../../../public/assets/closeModal.png"
            alt="closeModal"
            className={styles.closemodal}
          />
          <h2 className={styles.registertitle}>РЕГИСТРАЦИЯ</h2>
          <input
            className={styles.registerinput}
            type="text"
            placeholder="ВВЕДИТЕ СВОЕ ИМЯ"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className={styles.registerinput}
            type="email"
            placeholder="ВВЕДИТЕ СВОЙ E-MAIL"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className={styles.registerinput}
            type="password"
            placeholder="ПРИДУМАЙТЕ ПАРОЛЬ"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={() => handleRegister()} className={styles.buttonregister}>
            ЗАРЕГЕСТРИРОВАТЬСЯ
          </button>
          {errors.length > 0 && errors.map((item, i) => <li key={i}>{item.message}</li>)}
        </div>
      </div>
    </>
  );
}
