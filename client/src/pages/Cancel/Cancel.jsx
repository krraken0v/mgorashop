import styles from './Cancel.module.sass';
import { useNavigate } from 'react-router-dom';
export default function Cancel() {
  const navigate = useNavigate();
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.modalText}>К СОЖАЛЕНИЮ,ВАША КАРТА НЕ ПРОШЛА ОПЛАТУ</p>
        <button
          className={styles.modalButton}
          onClick={() => {
            navigate('/');
          }}
        >
          ВЕРНУТЬСЯ А КАТАЛОГ
        </button>
      </div>
    </div>
  );
}
