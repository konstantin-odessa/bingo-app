import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useBingoContext } from '../../contexts/bingo-context';
import { useNavigate } from 'react-router-dom';

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
