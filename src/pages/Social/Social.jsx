import styles from './Social.module.sass';
import { useNavigate } from 'react-router-dom';
export default function Social() {
  const navigate = useNavigate();
  return (
    <div className={styles.socialcontainer}>
      <h2 className={styles.socialtitle}>НАШИ СОЦСЕТИ</h2>
      <div className={styles.socialcontainerimages}>
        <a href="#">
          <img
            className={styles.socialimage}
            src="/public/assets/socialinsta.png"
            alt="instagram"
          />
        </a>
        <a href="#">
          <img
            className={styles.socialimage}
            src="/public/assets/socialtelegram.png"
            alt="telegram"
          />
        </a>
        <a href="#">
          <img className={styles.socialimage} src="/public/assets/socialtiktok.png" alt="tiktok" />
        </a>
      </div>
      <button className={styles.buttonSocialBack} onClick={() => navigate('/')}>
        ВЕРНУТЬСЯ В КАТАЛОГ
      </button>
    </div>
  );
}
