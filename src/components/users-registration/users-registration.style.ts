import styled from 'styled-components';
import { pxToEm } from '../../helpers/helpers';

export const NameInputField = styled.input`
  border-radius: ${pxToEm(5)};
  padding: ${pxToEm(10)};
  font-size: ${pxToEm(16)};
  width: ${pxToEm(200)};
  margin-bottom: ${pxToEm(10)};
`;

export const UsersList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const User = styled.li`
  margin: ${pxToEm(10)} 0;
  padding: ${pxToEm(10)};
  border-radius: ${pxToEm(5)};
  background-color: #fffcfc82;
  font-size: ${pxToEm(16)};
  color: orangered;
  font-weight: bold;
  text-align: left;
  padding-left: 2em;
`;

export const ErrorBlock = styled.div`
  color: red;
`;
