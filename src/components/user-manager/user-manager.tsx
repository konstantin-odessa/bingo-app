import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  Container,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
  UserBlock,
  DropdownBlock,
  ActiveUserTitle,
} from './user-manager.style';
import { TUser } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setActiveUser } from '../../redux/users.slice';

export const UserManager: FC = () => {
  const { activeUserId, users } = useSelector<RootState, RootState['usersReducer']>(
    (state) => state.usersReducer,
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleUserSelect = useCallback(
    (userId: TUser['id']) => {
      dispatch(setActiveUser(userId));
      setIsDropdownOpen(false);
    },
    [dispatch],
  );

  const activeUserName = useMemo(() => {
    return users.find((user) => user.id === activeUserId)?.name;
  }, [activeUserId, users]);

  return (
    <Container>
      <UserBlock>
        Current active user: <ActiveUserTitle>{activeUserName}</ActiveUserTitle>
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
