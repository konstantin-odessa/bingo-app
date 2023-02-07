import { TTile } from '../types/types';
import { useCallback, useEffect, useState } from 'react';
import { TileSelectionStateEnum } from '../enums/tile-selection-state.enum';
import { StrategyStateEnum } from '../enums/strategy-state.enum';
import { strategiesMap, useBingoContext } from '../contexts/bingo.context';

export const useUpdateTile = () => {
  const context = useBingoContext();
  const { activeUserId, users, strategies, tiles, setContext } = context;

  return useCallback(
    (tileId: TTile['id']) => {
      const updatedStrategies = strategies.map((strategy) => {
        if (strategy.userId !== activeUserId) {
          return strategy;
        }

        const bingoTiles = strategiesMap.get(strategy.strategyType);

        if (!bingoTiles?.includes(tileId)) {
          return strategy;
        }

        const updateSelectedTiles = strategy.selectedTiles.includes(tileId)
          ? strategy.selectedTiles.filter((tId) => tId !== tileId)
          : [...strategy.selectedTiles, tileId];
        const updatedState = bingoTiles.every((tId) =>
          updateSelectedTiles.includes(tId),
        )
          ? StrategyStateEnum.FULFILLED
          : StrategyStateEnum.PENDING;

        return {
          ...strategy,
          selectedTiles: updateSelectedTiles,
          state: updatedState,
          isFulfilled: updatedState === StrategyStateEnum.FULFILLED,
        };
      });

      updatedStrategies
        .filter((strategy) => strategy.isClosed && !strategy.isFulfilled)
        .forEach((strategy) => (strategy.isClosed = false));

      const updatedUsers = users.map((user) => {
        if (user.id !== activeUserId) {
          return user;
        }

        return user.selectedTilesIds.includes(tileId)
          ? {
              ...user,
              selectedTilesIds: user.selectedTilesIds.filter(
                (tId) => tId !== tileId,
              ),
            }
          : { ...user, selectedTilesIds: [...user.selectedTilesIds, tileId] };
      });

      const updatedTiles = tiles.map((tile) => {
        const isBingo = updatedStrategies.some(
          (strategy) =>
            strategy.isFulfilled && strategy.selectedTiles.includes(tile.id),
        );
        const isSelected = updatedUsers.some((user) =>
          user.selectedTilesIds.includes(tile.id),
        );

        return {
          ...tile,
          state: isBingo
            ? TileSelectionStateEnum.BINGO
            : isSelected
            ? TileSelectionStateEnum.SELECTED
            : TileSelectionStateEnum.NOT_SELECTED,
        };
      });

      setContext({
        ...context,
        users: updatedUsers,
        tiles: updatedTiles,
        strategies: updatedStrategies,
      });
    },
    [activeUserId, context, setContext, strategies, tiles, users],
  );
};

export const useBingoModalDisplayState = (): [boolean, () => void] => {
  const [modalDisplayState, setModalDisplayState] = useState(false);

  const context = useBingoContext();
  const { setContext, strategies } = context;

  useEffect(() => {
    const isBingo = strategies.some((strategy) => {
      return !strategy.isClosed && strategy.isFulfilled;
    });
    if (isBingo) {
      setModalDisplayState(true);
    }
  }, [strategies]);

  const closeModal = () => {
    const updatedStrategies = strategies.map((strategy) => {
      if (!strategy.isFulfilled) {
        return strategy;
      }

      return { ...strategy, state: StrategyStateEnum.CLOSED, isClosed: true };
    });

    setContext({ ...context, strategies: updatedStrategies });

    setModalDisplayState(false);
  };

  return [modalDisplayState, closeModal];
};
