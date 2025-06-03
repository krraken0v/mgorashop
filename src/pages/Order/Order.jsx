import styles from './Order.module.sass';
export default function Order() {
  return (
    <div className={styles.ordercontainer}>
      <h2 className={styles.ordertitle}>ОФОРМИТЕ СВОЙ ЗАКАЗ!</h2>
      <div className={styles.inputscontainer}>
        <input className={styles.orderinput} type="text" placeholder="ИМЯ ФАМИЛИЯ" />
        <input className={styles.orderinput} type="email" placeholder="EMAIL" />
        <input
          className={styles.orderinput}
          type="text"
          placeholder="АДРЕС ДОСТАВКИ (ГОРОД,УЛИЦА, ДОМ)"
        />
        <input className={styles.orderinput} type="phone" placeholder="ТЕЛЕФОН" />
      </div>
      <div className={styles.checkcontainer}>
        <input className={styles.ordercheckbox} type="checkbox" name="" id="" />
        <p className={styles.agreeorder}>Я СОГЛАСЕН С УСЛОВИЯМИ</p>
      </div>
      <button className={styles.ordersuccess}>ОФОРМИТЬ ЗАКАЗ</button>
    </div>
  );
}
