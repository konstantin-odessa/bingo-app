import { TExtendedTileContext, TTile } from '../types/types';
import { toggleStrategies } from '../helpers/helpers';
import { users } from '../constants/users';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { StrategyStateEnum } from '../enums/strategy-state.enum';
import { useBingoContext } from '../contexts/bingo-context';

export const useUpdateTile = (context: TExtendedTileContext) => {
  return useCallback(
    (tileId: TTile['id']) => {
      const { setState, activeUserId, bingoStrategies, usedStrategiesMap } = context;

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

      setState({
        ...context,
        fulfilledStrategiesMap,
        users: updatedUsers,
      });
    },
    [context],
  );
};

export const useBingoModalDisplayState = (): [
  boolean,
  () => void,
] => {
  const context = useBingoContext();
  const { fulfilledStrategiesMap, usedStrategiesMap, setState } = context;
  const [modalDisplayState, setModalDisplayState] = useState(false);

  const closeModal = useCallback(() => {
    const updatedUsedStrategiesMap = new Map(fulfilledStrategiesMap.entries());

    setState({ ...context, usedStrategiesMap: updatedUsedStrategiesMap });

    setModalDisplayState(false);
  }, [context, fulfilledStrategiesMap, setState]);

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
