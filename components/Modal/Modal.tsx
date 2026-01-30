"use client"

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  onClose?: () => void | undefined;
  children: React.ReactNode | React.ReactElement<{ onClose?: () => void }>;
}

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', onEsc);

    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
}
