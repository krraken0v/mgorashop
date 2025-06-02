import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './NotFound.module.sass';
export default function NotFound() {
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.notfoundcontainer}>
        <img className={styles.notfoundimage} src="/public/assets/notfound.jpg" alt="notfound" />
        <h2 className={styles.notfoundtitle}>К СОЖАЛЕНИЮ,НИЧЕГО НЕ НАЙДЕНО</h2>
      </div>
      <Footer></Footer>
    </>
  );
}
