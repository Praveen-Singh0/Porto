'use client'
import { useState } from 'react';

interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void | Promise<void>;
  variant?: 'danger' | 'warning' | 'info';
}

export function useConfirmModal() {
  const [modalState, setModalState] = useState<ConfirmModalState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    variant: 'danger',
  });

  const openConfirm = (config: {
    title?: string;
    message: string;
    onConfirm: () => void | Promise<void>;
    variant?: 'danger' | 'warning' | 'info';
  }) => {
    setModalState({
      isOpen: true,
      title: config.title || 'Confirm Action',
      message: config.message,
      onConfirm: config.onConfirm,
      variant: config.variant || 'danger',
    });
  };

  const closeConfirm = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    modalState,
    openConfirm,
    closeConfirm,
  };
}
