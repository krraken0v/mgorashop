import styles from './Footer.module.sass';

export default function Footer() {
  return (
    <div className={styles.footercontainer}>
      <div className={styles.socialcontainer}>
        <img className={styles.socialimage} src="/public/assets/telegram.png" alt="telegram" />
        <img className={styles.socialimagetok} src="/public/assets/tiktok.png" alt="tiktok" />
        <img className={styles.socialimage} src="/public/assets/instagram.png" alt="instagram" />
      </div>
      <div className={styles.navbarfootercontainer}>
        <p>
          <a className={styles.navbarfootertitle} href="#">
            Політика конфіденційності
          </a>
        </p>
        <p>
          <a className={styles.navbarfootertitle} href="#">
            Політика конфіденційності
          </a>
        </p>
        <p>
          <a className={styles.navbarfootertitle} href="#">
            Контакти
          </a>
        </p>
      </div>
      <div className={styles.yearshopcontainer}>
        <p className={styles.yearshoptitle}>©2025 MGORASHOP</p>
      </div>
    </div>
  );
}
