import { FC } from "react";
import styles from './header.module.css';

const Header: FC = () => {

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div>
          <h1 className={styles.header1}>{'竹子的旧物'}</h1>
          <h1 className={styles.header2}>{'Bamboo\'s Yard Sale'}</h1>
        </div>
        <h1 className={styles.header3}>{'领养小站'}</h1>
      </div>
    </div>
  );
}


export default Header;