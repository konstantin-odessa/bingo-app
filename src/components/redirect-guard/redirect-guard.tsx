import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const RedirectGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/bingo-app');
  }, [navigate]);

  return null;
};
