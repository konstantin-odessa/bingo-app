import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { TileContainer, TileInnerContent, TileUsers } from './tile.style';
import { noop } from '../../helpers/helpers';
import { TileSelectionStateEnum } from '../../enums/tile-selection-state.enum';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { updateStrategies } from '../../redux/strategies.slice';
import { TTile } from '../../types/types';
import { updateUsers } from '../../redux/users.slice';
import { updateTiles } from '../../redux/tiles.slice';

type TTileProps = {
  title: string;
  id: number;
  canSelect?: boolean;
};

export const Tile: FC<TTileProps> = ({ title, id, canSelect }) => {
  const tiles = useSelector<RootState, RootState['tilesReducer']>(
    (state) => state.tilesReducer,
  );
  const { activeUserId, users } = useSelector<RootState, RootState['usersReducer']>(
    (state) => state.usersReducer,
  );
  const strategies = useSelector<RootState, RootState['strategiesReducer']>(
    (state) => state.strategiesReducer,
  );
  const dispatch = useDispatch<AppDispatch>();

  const updateTile = useCallback(
    (tileId: TTile['id']) => {
      dispatch(updateStrategies({ tileId, activeUserId }));
      dispatch(updateUsers({ tileId, activeUserId }));
    },
    [activeUserId, dispatch],
  );

  useEffect(() => {
    dispatch(updateTiles({ strategies, users }));
  }, [dispatch, strategies, users]);

  const selectionState = tiles.find((tile) => tile.id === id)
    ?.state as TileSelectionStateEnum;

  const names = useMemo(() => {
    return users
      .filter((user) => user.selectedTilesIds.includes(id))
      .map((user) => user.name)
      .join(', ');
  }, [id, users]);

  return (
    <TileContainer>
      <TileInnerContent
        onClick={() => (canSelect ? updateTile(id) : noop())}
        selectionState={selectionState}
      >
        {!!names.length && <TileUsers>{names}</TileUsers>}
        {title}
      </TileInnerContent>
    </TileContainer>
  );
};
