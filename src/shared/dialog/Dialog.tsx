import { Typography } from '@maxhub/max-ui';
import { useRef, useEffect, useId, type MouseEvent } from 'react';

import styles from './style.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export function Dialog({ isOpen, onClose, title, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const headingId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

	function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
		if (event.target === dialogRef.current) {
			onClose();
		}
	}

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
			onClick={handleBackdropClick}
      aria-labelledby={headingId}
			className={styles.dialog}
		>
      <Typography.Headline className={styles.dialogTitle} id={headingId}>
        {title}
      </Typography.Headline>
      {children}
    </dialog>
  );
}
