import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBingoContext } from '../../contexts/bingo.context';

export const ConferenceGuard: FC<PropsWithChildren> = ({ children }) => {
  const { users } = useBingoContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!users.length) {
      navigate('/');
    }
  }, [navigate, users.length]);

  return <>{children}</>;
};
