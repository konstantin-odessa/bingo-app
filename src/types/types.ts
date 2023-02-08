import { TileSelectionStateEnum } from '../enums/tile-selection-state.enum';
import { StrategyStateEnum } from '../enums/strategy-state.enum';

export type TUser = {
  id: string;
  name: string;
  selectedTilesIds: TTile['id'][];
};

export type TTile = {
  id: number;
  title: string;
  canSelect?: boolean;
  state: TileSelectionStateEnum;
};

export type TileMatrix = TTile[][];

export type TStrategy = {
  strategyType: number;
  userId: TUser['id'];
  selectedTiles: TTile['id'][];
  isFulfilled: boolean;
  isClosed: boolean;
  state: StrategyStateEnum;
};
