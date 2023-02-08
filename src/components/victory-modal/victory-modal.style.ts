import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const ModalInnerWrapper = styled.div`
  border-radius: 1em;
  background-color: #ffffff;
  padding: 1em;
  width: 25em;
  height: 25em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1em;
  padding: 1em;
  background-color: rgba(211, 211, 211, 0.42);
  border-radius: 0.5em;

  > h2 {
    margin: 0;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1em;
  padding: 1em;
  background-color: rgba(211, 211, 211, 0.42);
  border-radius: 0.5em;
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1em;
  padding: 1em;
  background-color: rgba(211, 211, 211, 0.42);
  border-radius: 0.5em;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: 0;
  font-size: 1.8em;
  cursor: pointer;
  padding: 0;
`;

export const Winners = styled.h3`
  margin: 0;
  color: orangered;
`;

export const ContinueButton = styled.button`
  background-color: #5692e7;
  color: white;
  padding: 1em 1.5em;
  border-radius: 0.3125em;
  border: 0;
  font-size: 1em;
  cursor: pointer;
`;

export const ModalControlButtons = styled.div`
  display: flex;
  justify-content: end;
`;
