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
  setState: (state: TTileContext) => void;
};

export type TColor = string;

export type TUser = {
  id: number;
  color: TColor;
  name: string;
  selectedTilesIds: TTile['id'][];
};

export type TTile = {
  id: number;
  title: string;
  canSelect?: boolean;
  isBingo?: boolean;
};

export type TileMatrix = TTile[][];
