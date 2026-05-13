import { useState, type ComponentProps, type ReactNode } from 'react';

import { Button } from '@shared/ui';

import type { TicketMatch } from '../../model/types';

import { TicketRequestModal } from './TicketRequestModal';

type TicketRequestButtonProps = Omit<
  ComponentProps<typeof Button>,
  'children' | 'onClick'
> & {
  match: TicketMatch;
  children?: ReactNode;
};

export function TicketRequestButton({
  match,
  children = 'Купить билет',
  ...buttonProps
}: TicketRequestButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button {...buttonProps} onClick={() => setIsModalOpen(true)}>
        {children}
      </Button>

      <TicketRequestModal
        match={match}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
