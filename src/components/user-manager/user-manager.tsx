import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  Container,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
  UserBlock,
  DropdownBlock,
} from './user-manager.style';
import { TUser } from '../../types/types';
import { useBingoContext } from '../../contexts/bingo.context';

export const UserManager: FC = () => {
  const context = useBingoContext();
  const { activeUserId, users, setContext } = context;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleUserSelect = useCallback(
    (userId: TUser['id']) => {
      setContext({ ...context, activeUserId: userId });
      setIsDropdownOpen(false);
    },
    [context, setContext],
  );

  const activeUserName = useMemo(() => {
    return users.find((user) => user.id === activeUserId)?.name;
  }, [activeUserId, users]);

  return (
    <Container>
      <UserBlock>
        Current active user:{' '}
        <span style={{ color: '#d75f5f', fontWeight: 'bold' }}>
          {activeUserName}
        </span>
      </UserBlock>
      <DropdownBlock>
        <DropdownButton onClick={toggleDropdown}>Choose User</DropdownButton>
        {isDropdownOpen && (
          <DropdownMenu>
            {users.map(({ id, name }) => {
              return (
                <DropdownItem onClick={() => handleUserSelect(id)} key={id}>
                  {name}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        )}
      </DropdownBlock>
    </Container>
  );
};
