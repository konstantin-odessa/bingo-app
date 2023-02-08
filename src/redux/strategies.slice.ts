import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { TStrategy, TTile, TUser } from '../types/types';
import { StrategyStateEnum } from '../enums/strategy-state.enum';
import { strategiesMap } from '../helpers/helpers';

export const strategiesSlice: Slice<TStrategy[]> = createSlice({
  name: 'strategies',
  initialState: [] as TStrategy[],
  reducers: {
    updateStrategies(
      state,
      action: PayloadAction<{
        tileId: TTile['id'];
        activeUserId: TUser['id'];
      }>,
    ) {
      const { tileId, activeUserId } = action.payload;

      return state.map((strategy) => {
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

        const isFulfilled = updatedState === StrategyStateEnum.FULFILLED;
        const isClosed =
          strategy.isClosed && !isFulfilled ? false : strategy.isClosed;

        return {
          ...strategy,
          selectedTiles: updateSelectedTiles,
          state: updatedState,
          isFulfilled,
          isClosed,
        };
      });
    },

    closeFulfilledStrategies(state) {
      return state.map((strategy) => {
        if (!strategy.isFulfilled) {
          return strategy;
        }

        return { ...strategy, state: StrategyStateEnum.CLOSED, isClosed: true };
      });
    },
    setUserStrategies(state, action: PayloadAction<TUser[]>) {
      const users = action.payload;

      return users.flatMap((user) => {
        const types = [...strategiesMap.keys()];

        return types.map((type) => ({
          userId: user.id,
          strategyType: type,
          selectedTiles: [],
          isClosed: false,
          isFulfilled: false,
          state: StrategyStateEnum.PENDING,
        }));
      });
    },
  },
});

export const { updateStrategies, closeFulfilledStrategies, setUserStrategies } =
  strategiesSlice.actions;

export default strategiesSlice.reducer;
