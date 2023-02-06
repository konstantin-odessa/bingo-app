import { TTile } from '../types/types';
import { toggleStrategies } from '../helpers/helpers';
import { useCallback, useEffect, useState } from 'react';
import { StrategyStateEnum } from '../enums/strategy-state.enum';
import { useBingoContext } from '../contexts/bingo-context';
import { TileSelectionStateEnum } from '../enums/tile-selection-state.enum';

export const useUpdateTile = () => {
  const context = useBingoContext();

  return useCallback(
    (tileId: TTile['id']) => {
      const { setContext, activeUserId, bingoStrategies, usedStrategiesMap, users } =
        context;

      toggleStrategies(usedStrategiesMap, bingoStrategies, tileId);

      const updatedUsers = users.map((user) => {
        if (user.id === activeUserId) {
          user.selectedTilesIds = user.selectedTilesIds.includes(tileId)
            ? user.selectedTilesIds.filter((tId) => tId !== tileId)
            : [...user.selectedTilesIds, tileId];
        }

        return user;
      });

      const fulfilledStrategies = bingoStrategies.filter(
        (strategy) => strategy.getState() === StrategyStateEnum.FULFILLED,
      );

      const fulfilledStrategiesMap = new Map(
        fulfilledStrategies.map((strategy) => [
          strategy,
          users.filter((user) =>
            strategy
              .getStrategy()
              .every((entry) => user.selectedTilesIds.includes(entry)),
          ),
        ]),
      );

      setContext({
        ...context,
        fulfilledStrategiesMap,
        users: updatedUsers,
      });
    },
    [context],
  );
};

export const useBingoModalDisplayState = (): [boolean, () => void] => {
  const context = useBingoContext();
  const { fulfilledStrategiesMap, usedStrategiesMap, setContext } = context;
  const [modalDisplayState, setModalDisplayState] = useState(false);

  const closeModal = useCallback(() => {
    const updatedUsedStrategiesMap = new Map(fulfilledStrategiesMap.entries());

    setContext({ ...context, usedStrategiesMap: updatedUsedStrategiesMap });

    setModalDisplayState(false);
  }, [context, fulfilledStrategiesMap, setContext]);

  useEffect(() => {
    const usersSet = new Set();

    fulfilledStrategiesMap.forEach((users, strategy) => {
      const usedUsers = usedStrategiesMap.get(strategy) ?? [];
      const filteredUsers = users.filter((user) => !usedUsers.includes(user));

      filteredUsers.forEach((u) => usersSet.add(u));
    });

    const availableUsers = [...usersSet];

    if (availableUsers.length) {
      setModalDisplayState(true);
    }
  }, [fulfilledStrategiesMap, usedStrategiesMap]);

  return [modalDisplayState, closeModal];
};

export const useGetTileSelectionState = (tileId: TTile['id']) => {
  const { users, fulfilledStrategiesMap } = useBingoContext();
  const fulfilledStrategies = [...fulfilledStrategiesMap.keys()];

  const bingoTilesIds = [
    ...new Set(fulfilledStrategies.flatMap((strategy) => strategy.getStrategy())),
  ];

  if (bingoTilesIds.includes(tileId)) {
    return TileSelectionStateEnum.BINGO;
  }

  const allSelectedTilesIds = [
    ...new Set(users.flatMap((user) => user.selectedTilesIds)),
  ];

  return allSelectedTilesIds.includes(tileId)
    ? TileSelectionStateEnum.SELECTED
    : TileSelectionStateEnum.NOT_SELECTED;
};
