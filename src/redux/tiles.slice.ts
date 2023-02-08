import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { TStrategy, TTile, TUser } from '../types/types';
import { TileSelectionStateEnum } from '../enums/tile-selection-state.enum';
import { tiles } from '../helpers/helpers';

export const tilesSlice: Slice<TTile[]> = createSlice({
  name: 'tiles',
  initialState: tiles,
  reducers: {
    updateTiles(
      state,
      action: PayloadAction<{ strategies: TStrategy[]; users: TUser[] }>,
    ) {
      const { strategies, users } = action.payload;

      return state.map((tile) => {
        const isBingo = strategies.some(
          (strategy) =>
            strategy.isFulfilled && strategy.selectedTiles.includes(tile.id),
        );
        const isSelected = users.some((user) =>
          user.selectedTilesIds.includes(tile.id),
        );

        let tileState = TileSelectionStateEnum.NOT_SELECTED;

        if (isBingo) {
          tileState = TileSelectionStateEnum.BINGO;
        } else if (isSelected) {
          tileState = TileSelectionStateEnum.SELECTED;
        }

        return {
          ...tile,
          state: tileState,
        };
      });
    },
  },
});
export const { updateTiles } = tilesSlice.actions;
export default tilesSlice.reducer;
