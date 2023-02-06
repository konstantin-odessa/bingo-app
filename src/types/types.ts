import { StrategyHandler } from '../classes/strategy-handler.class';

export type TTileContext = {
  activeUserId: TUser['id'];
  users: TUser[];
  tiles: TTile[];
  bingoStrategies: StrategyHandler[];
  usedStrategiesMap: Map<StrategyHandler, TUser[]>;
  fulfilledStrategiesMap: Map<StrategyHandler, TUser[]>;
};

export type TExtendedTileContext = TTileContext & {
  setContext: (context: TTileContext) => void;
};

export type TUser = {
  id: number;
  name: string;
  selectedTilesIds: TTile['id'][];
};

export type TTile = {
  id: number;
  title: string;
  canSelect?: boolean;
};

export type TileMatrix = TTile[][];
