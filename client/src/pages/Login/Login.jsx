import { useState } from 'react';
import styles from './Login.module.sass';
import axios from 'axios';
export default function Login({ setModalLog }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const handleLogin = async () => {
    try {
      const login = await axios.post(
        'http://localhost:5000/api/login',
        { email, password },
        { withCredentials: true }
      );
      setErrors([]);
      setModalLog(false);
      console.log(login.data.message);
    } catch (error) {
      const msg = error.response?.data?.message || 'Ошибка сервера';
      setErrors([msg]);
    }
  };
  return (
    <>
      <div className={styles.registercontainer}>
        <div className={styles.registermodal}>
          <img
            onClick={() => setModalLog(false)}
            src="../../../public/assets/closeModal.png"
            alt="closeModal"
            className={styles.closemodal}
          />
          <h2 className={styles.registertitle}>ВХОД</h2>
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
            placeholder="ВВЕДИТЕ СВОЙ ПАРОЛЬ"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={() => handleLogin()} className={styles.buttonregister}>
            ВОЙТИ
          </button>
          {errors.length > 0 && errors.map((item, i) => <li key={i}>{item.message}</li>)}
        </div>
      </div>
    </>
  );
}
