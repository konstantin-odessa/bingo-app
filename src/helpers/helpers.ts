import { TileMatrix, TTile, TTileContext } from '../types/types';
import { StrategyHandler } from '../classes/strategy-handler.class';
import { StrategyStateEnum } from '../enums/strategy-state.enum';
import {
  CENTRAL_TILE_POSITION,
  CENTRAL_TILE_TITLE,
  ROWS_COLUMNS_LENGTH,
  titles,
} from '../constants/titles';

export const generateTiles = () => {
  const data = titles
    .slice(0)
    .sort(() => Math.random() - 0.5)
    .map((title, index) => ({
      title,
      id: index,
      canSelect: true,
    }));

  const centralTile = {
    title: CENTRAL_TILE_TITLE,
    id: CENTRAL_TILE_POSITION,
    canSelect: false,
  };

  return [
    ...data.slice(0, CENTRAL_TILE_POSITION),
    centralTile,
    ...data
      .slice(CENTRAL_TILE_POSITION)
      .map(({ id, ...rest }) => ({ ...rest, id: id + 1 })),
  ];
};
export const generateBingoStrategies = (tiles: TTile[]) => {
  const rows: TileMatrix = [];

  for (let i = 0; i < tiles.length; i += ROWS_COLUMNS_LENGTH) {
    const row = tiles.slice(i, i + ROWS_COLUMNS_LENGTH);

    const centralTilePositionIndex = row.findIndex(
      (r) => r.id === CENTRAL_TILE_POSITION,
    );

    if (centralTilePositionIndex !== -1) {
      row.splice(centralTilePositionIndex, 1);
    }

    rows.push(row);
  }

  const columns: TileMatrix = Array.from({ length: ROWS_COLUMNS_LENGTH }, () =>
    Array.from({ length: ROWS_COLUMNS_LENGTH }),
  );

  for (let i = 0; i < tiles.length; i++) {
    const row = i % ROWS_COLUMNS_LENGTH;
    const col = Math.floor(i / ROWS_COLUMNS_LENGTH);

    columns[row][col] = tiles[i];
  }

  const mainDiagonals: TileMatrix = [[], []];
  for (let i = 0; i < columns.length; i++) {
    if (columns[i][i].id === CENTRAL_TILE_POSITION) {
      continue;
    }

    mainDiagonals[0].push(columns[i][i]);
    mainDiagonals[1].push(columns[i][4 - i]);
  }

  const centralColumn = columns.find((column) =>
    column.find((c) => c.id === CENTRAL_TILE_POSITION),
  );

  centralColumn?.splice(
    centralColumn?.findIndex((column) => column.id === CENTRAL_TILE_POSITION),
    1,
  );

  return [
    ...transformStrategies(rows),
    ...transformStrategies(columns),
    ...transformStrategies(mainDiagonals),
  ];
};

const transformStrategies = (matrix: TileMatrix) => {
  return matrix.map((strategy) => {
    return new StrategyHandler(strategy.map((s) => s.id));
  });
};

export const toggleStrategies = (
  usedStrategiesMap: TTileContext['usedStrategiesMap'],
  bingoStrategies: TTileContext['bingoStrategies'],
  entry: TTile['id'],
) => {
  bingoStrategies.forEach((strategy) => {
    strategy.toggleEntry(entry);

    if (
      usedStrategiesMap.has(strategy) &&
      strategy.getState() !== StrategyStateEnum.FULFILLED
    ) {
      usedStrategiesMap.delete(strategy);
    }
  });
};

export const noop = () => void 0;
