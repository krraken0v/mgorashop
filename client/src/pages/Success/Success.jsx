import styles from './Success.module.sass';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.modalText}>Ваш заказ успешно оформлен!</p>
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
  );
}
