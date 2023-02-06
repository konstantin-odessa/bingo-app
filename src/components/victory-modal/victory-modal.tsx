import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import {
  CloseButton,
  ModalContainer,
  ModalInnerWrapper,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  Winners,
  ModalFooter,
  ContinueButton,
  ModalControlButtons,
} from './victory-modal.style';

type TModalProps = {
  winners: string[];
  onClose: () => void;
};
export const VictoryModal: FC<TModalProps> = ({ winners, onClose }) => {
  const modalRoot = document.getElementById('modal');

  return createPortal(
    <ModalOverlay>
      <ModalContainer>
        <ModalInnerWrapper>
          <ModalControlButtons>
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </ModalControlButtons>
          <ModalHeader>
            <h2>Congratulations!</h2>
          </ModalHeader>
          <ModalContent>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h4>Today's winners are:</h4>
            <Winners>{winners.join(', ')}</Winners>
          </ModalContent>

          <ModalFooter>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <ContinueButton onClick={onClose}>Let's continue Bingo!</ContinueButton>
          </ModalFooter>
        </ModalInnerWrapper>
      </ModalContainer>
    </ModalOverlay>,
    modalRoot as Element,
  );
};
