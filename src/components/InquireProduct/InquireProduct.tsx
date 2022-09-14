import { FC, useState } from "react";
import styles from './inquireProduct.module.css';
import { ProductListItem } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcons } from "../../lib/fontAwesome";
import SubscribeModal from "../SubscribeModal/SubscribeModal";
import { getOS } from "../../lib/helpers";

const os = getOS();

export interface InquireProductProps {
  product: ProductListItem;
}
export type SubscriptionMap = {
  [itemId: string]: boolean
};

export type SubscriptionInfo = SubscriptionMap[];


const InquireProduct: FC<InquireProductProps> = props => {
  const { product } = props;

  const subscriptionInfo: SubscriptionInfo = JSON.parse(window.sessionStorage.getItem('subscriptionInfo') || 'null');
  const subscribed = !!subscriptionInfo?.filter(item => item[product.itemId])?.[0]?.[product.itemId];

  const [showEmailModal, toggleEmailModal] = useState(false);
  const [showAlreadySubscribedModal, toggleAlreadySubscribed] = useState(false);

  const openEmailModal = () => {
    toggleEmailModal(true);
  };
  const closeEmailModal = () => {
    toggleEmailModal(false);
  }
  const openAlreadySubscribedModal = () => {
    toggleAlreadySubscribed(true);
  };
  const closeAlreadySubscribedModal = () => {
    toggleAlreadySubscribed(false);
  }


  return (
    <>
      {(os === 'iOS' || os === 'Android')
        ? (
          <a href={os === 'iOS' ? 'sms/4126137819&body=hi' : 'sms/4126137819?body=hi'} className={styles.link}>
            <FontAwesomeIcon icon={faIcons.sms} className={styles.icon} />
          </a>
        )
        : (
          <button className={styles.button} onClick={subscribed ? openAlreadySubscribedModal : openEmailModal}>
            {subscribed
              ? <FontAwesomeIcon icon={faIcons.emailAfter} className={[styles.icon, styles.after].join(' ')} />
              : <FontAwesomeIcon icon={faIcons.emailBefore} className={styles.icon} />
            }
          </button>
        )}
      {showEmailModal && <SubscribeModal product={product} closeModal={closeEmailModal} />}
      {showAlreadySubscribedModal && <SubscribeModal product={product} closeModal={closeAlreadySubscribedModal} />}
    </>
  );
}


export default InquireProduct;