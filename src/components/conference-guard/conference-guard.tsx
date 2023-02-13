import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const ConferenceGuard: FC<PropsWithChildren> = ({ children }) => {
  const { users } = useSelector<RootState, RootState['usersReducer']>(
    (state) => state.usersReducer,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!users.length) {
      navigate('/bingo-app');
    }
  }, [navigate, users.length]);

  return <>{children}</>;
};
