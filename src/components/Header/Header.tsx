import { FC } from "react";
import styles from './header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faIcons } from "../../lib/fontAwesome";

const Header: FC = () => {

  return (
    <div className={[styles.container, styles.collapse].join(' ')} id={'page-header'}>
      <div className={styles.navContainer}>
        <div className={styles.innerContainer}>
          <div>
            <h1 className={[styles.header1, styles.zoom].join(' ')}>{'竹子的旧物'}</h1>
            <h1 className={[styles.header2, styles.zoom2].join(' ')}>{'Bamboo\'s Yard Sale'}</h1>
          </div>
          <h1 className={[styles.header3, styles.zoom2].join(' ')}>{'领养小站'}</h1>
        </div>
        <button className={styles.navButton} onClick={()=>{console.log('clicked')}}>
          <FontAwesomeIcon icon={faIcons.bars} className={[styles.bars, styles.appear].join(' ')} />
        </button>
      </div>
    </div>
  );
}


export default Header;