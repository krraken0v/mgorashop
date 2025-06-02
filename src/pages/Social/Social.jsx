import styles from './Social.module.sass';

export default function Social() {
  return (
    <div className={styles.socialcontainer}>
      <h2 className={styles.socialtitle}>НАШІ СОЦМЕРЕЖІ</h2>
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
    </div>
  );
}
