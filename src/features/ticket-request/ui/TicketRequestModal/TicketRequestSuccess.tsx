import { Button } from '@shared/ui';

import styles from './TicketRequestModal.module.css';

type TicketRequestSuccessProps = {
  onClose: () => void;
};

export function TicketRequestSuccess({ onClose }: TicketRequestSuccessProps) {
  return (
    <div className={styles.success}>
      <h3>Спасибо! Заявка отправлена</h3>
      <p>Мы свяжемся с вами для подтверждения билета на матч.</p>

      <Button onClick={onClose}>Закрыть</Button>
    </div>
  );
}
