import { nanoid } from 'nanoid';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { TTile, TUser } from '../types/types';

type TUserSlice = {
  activeUserId: TUser['id'];
  users: TUser[];
};

export const usersSlice: Slice<TUserSlice> = createSlice({
  name: 'users',
  initialState: {
    activeUserId: '',
    users: [],
  } as TUserSlice,
  reducers: {
    setUsers: {
      reducer: (state, action: PayloadAction<TUser[]>) => {
        state.users = action.payload;
        state.activeUserId = state.users.at(0)?.id as TUser['id'];
      },
      prepare: (users: TUser[]) => {
        return { payload: users.map((user) => ({ ...user, id: nanoid() })) };
      },
    },
    updateUsers(
      state,
      action: PayloadAction<{
        tileId: TTile['id'];
        activeUserId: TUser['id'];
      }>,
    ) {
      const { tileId, activeUserId } = action.payload;

      state.users = state.users.map((user) => {
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
    },
    setActiveUser(state, action: PayloadAction<TUser['id']>) {
      const userId = action.payload;

      state.activeUserId = userId;
    },
  },
});

export const { setUsers, updateUsers, setActiveUser } = usersSlice.actions;

export default usersSlice.reducer;
