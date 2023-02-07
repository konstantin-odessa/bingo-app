import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { TExtendedBingoContext, TBingoContext } from '../types/types';
import { generateStrategies, generateTiles, noop } from '../helpers/helpers';

const tiles = generateTiles();

export const strategiesMap = generateStrategies(tiles);

const BingoContext = createContext<TExtendedBingoContext>({
  activeUserId: 0,
  users: [],
  strategies: [],
  tiles,
  setContext: noop,
});

export const useBingoContext = () => {
  return useContext(BingoContext);
};

export const BingoContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<TBingoContext>({ ...useBingoContext() });

  return (
    <BingoContext.Provider value={{ ...state, setContext: setState }}>
      {children}
    </BingoContext.Provider>
  );
};
