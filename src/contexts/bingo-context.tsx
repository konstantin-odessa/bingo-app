import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { TExtendedTileContext, TTileContext } from '../types/types';
import { generateBingoStrategies, generateTiles, noop } from '../helpers/helpers';

const tiles = generateTiles();

const BingoContext = createContext<TExtendedTileContext>({
  tiles,
  activeUserId: 0,
  users: [],
  bingoStrategies: generateBingoStrategies(tiles),
  fulfilledStrategiesMap: new Map(),
  usedStrategiesMap: new Map(),
  setContext: noop,
});

export const useBingoContext = () => {
  return useContext(BingoContext);
};

export const BingoContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<TTileContext>({
    ...useBingoContext(),
  });

  return (
    <BingoContext.Provider value={{ ...state, setContext: setState }}>
      {children}
    </BingoContext.Provider>
  );
};
