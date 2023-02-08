import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
`;

export const UserBlock = styled.div`
  font-size: 1.2em;
  font-weight: bold;
`;

export const DropdownBlock = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button`
  background-color: #aa4653b5;
  color: white;
  padding: 0.6em 1em;
  font-size: 1em;
  border: none;
  cursor: pointer;
  border-radius: 0.3em;
  text-align: left;
  outline: none;

  &:hover {
    background-color: #80343eb5;
  }
`;

export const DropdownMenu = styled.ul`
  background-color: #fff;
  border: pxToEm(1) solid #ddd;
  border-radius: pxToEm(5);
  box-shadow: 0 pxToEm(2) pxToEm(5) rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 1;
`;

export const DropdownItem = styled.li`
  padding: 0.5em 1em;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;
