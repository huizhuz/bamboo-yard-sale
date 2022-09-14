import { FC, useState } from "react";
import { ProductListItem } from "../../redux/store";
import Modal from "../CommonComponents/Modal/Modal";
import { SubscriptionInfo, SubscriptionMap } from "../InquireProduct/InquireProduct";
import styles from './subscribeModal.module.css';

export interface SubscribeModalProps {
  product: ProductListItem;
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
  const { product, closeModal } = props;

  const [formValues, setFormValues] = useState(initialFormValues);

  const sendEmail = async (emailPayload: EmailPayload) => {
    // TODO: integrate email service
    setTimeout(() => { console.log('emailPayload', emailPayload) }, 200);
  }

  const onSubmit = (event: any) => {
    event.preventDefault();
    sendEmail({
      itemName: product.displayName,
      adoptionFee: product.adoptionFee,
      name: formValues.name,
      email: formValues.email,
      comments: formValues.comments
    }).then(res => {
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
    })
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

  return (
    <Modal closeModal={closeModal}>
      <form style={{ zIndex: 300 }}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.header}>
            {`订阅${product.displayName}的通知`}
          </legend>
          <p className={styles.secondaryTitle}>很开心您喜欢我的东西！请留下您的信息，我会联系您哒！</p>
          <p className={styles.secondaryTitle}>所有旧物在交给下一任主人之前都会清洁消毒。每一样都是先到先得哦😯</p>

          <div className={styles.inputWrapper}>
            <label htmlFor='name'>怎么称呼您呢</label>
            <input type='text' id='name' value={formValues.name}
              onChange={updateName}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor='email'>您的邮箱地址</label>
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
            <button className={styles.sendButton} onClick={onSubmit}>发送</button>
            <button className={styles.cancelButton} onClick={closeModal}>取消</button>
          </div>
        </fieldset>
      </form>
    </Modal>
  );
}


export default SubscribeModal;