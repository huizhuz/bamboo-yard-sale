import { FC, useState } from "react";
import { ProductListItem } from "../../redux/store";
import Modal from "../CommonComponents/Modal/Modal";
import { SubscriptionInfo, SubscriptionMap } from "../InquireProduct/InquireProduct";
import styles from './subscribeModal.module.css';

export interface SubscribeModalProps {
  product: ProductListItem;
  messageBody?: string;
  closeModal: () => void;
}

export interface EmailPayload {
  itemName: string;
  adoptionFee: number;
  name: string;
  email: string;
  comments?: string;
}
interface SubscribeModalFormValues {
  name: string;
  email: string;
  comments?: string;
}

const initialFormValues: SubscribeModalFormValues = {
  name: '',
  email: '',
  comments: ''
}

// TODO: form validation

const SubscribeModal: FC<SubscribeModalProps> = props => {
  const { product, closeModal, messageBody } = props;

  const [formValues, setFormValues] = useState({ ...initialFormValues, comments: messageBody || '' });

  const onSubmit = (event: any) => {
    // event.preventDefault();
    const subscriptionInfo: SubscriptionInfo = JSON.parse(window.sessionStorage.getItem('subscriptionInfo') || 'null');
    const updatedSubscriptionInfo: SubscriptionInfo = [];
    subscriptionInfo?.forEach(item => {
      if (!item[product.itemId]) {
        updatedSubscriptionInfo.push(item);
      }
    })
    const updatedItem: SubscriptionMap = {
      [product.itemId]: true
    };
    updatedSubscriptionInfo.push(updatedItem);
    window.sessionStorage.setItem('subscriptionInfo', JSON.stringify(updatedSubscriptionInfo));
    closeModal();
  }

  const updateName = (event: any) => {
    setFormValues({
      ...formValues,
      name: event.target.value
    })
  }

  const updateEmail = (event: any) => {
    setFormValues({
      ...formValues,
      email: event.target.value
    })
  }

  const updateComments = (event: any) => {
    setFormValues({
      ...formValues,
      comments: event.target.value
    })
  }

  const emailBody = `
    ${formValues.comments}%0D%0A
    ---%0D%0A
    ${formValues.name}%0D%0A
    ${formValues.email}%0D%0A
  `

  return (
    <Modal closeModal={closeModal}>
      <form style={{ zIndex: 300 }}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.header}>
            {`??????${product.displayName}?????????`}
          </legend>
          <p className={styles.secondaryTitle}>??????????????????????????????????????????????????????????????????????????????</p>
          <p className={styles.secondaryTitle}>?????????????????????????????????????????????????????????????????????????????????????????????????</p>

          <div className={styles.inputWrapper}>
            <label htmlFor='name'>??????????????????</label>
            <input type='text' id='name' value={formValues.name}
              onChange={updateName}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor='email'>??????????????????</label>
            <input type='text' id='email' value={formValues.email}
              onChange={updateEmail}
            // pattern='\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b'
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor='comments'>Ask anything here</label>
            <textarea id='comments' value={formValues.comments}
              onChange={updateComments}
            />
          </div>

          <div className={styles.buttonWrapper}>
            <a href={`mailto:emailaddress?subject=??????${product.displayName}&body=${emailBody}`}
              className={styles.sendButton}
              onClick={onSubmit}
            >
              ??????
            </a>
            <button className={styles.cancelButton} onClick={closeModal}>??????</button>
          </div>
        </fieldset>
      </form>
    </Modal>
  );
}


export default SubscribeModal;