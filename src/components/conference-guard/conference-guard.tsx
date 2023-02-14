import React, { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { RedirectGuard } from '../redirect-guard/redirect-guard';

export const ConferenceGuard: FC<PropsWithChildren> = ({ children }) => {
  const { users } = useSelector<RootState, RootState['usersReducer']>(
    (state) => state.usersReducer,
  );

  if (!users.length) {
    return <RedirectGuard />;
  }

  return <>{children}</>;
};
