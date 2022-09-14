import { FC } from "react";
import styles from './modal.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcons } from "../../../lib/fontAwesome";

export interface ModalProps {
  children: React.ReactNode; 
  closeModal: () => void;
}


const Modal: FC<ModalProps> = props => {

  return (
    <div className={styles.backdrop}>
      <div className={styles.innerWrapper}>
        <button className={styles.closeButton} onClick={props.closeModal}>
          <FontAwesomeIcon icon={faIcons.close} className={styles.closeIcon} />
        </button>
        <div className={styles.content}>
          {props.children}
        </div>
      </div>
    </div>
  );
}


export default Modal;