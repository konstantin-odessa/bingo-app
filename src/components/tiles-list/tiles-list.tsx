import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Tile } from '../tile/tile';
import { TileListGrid } from './tile-list.style';
import { VictoryModal } from '../victory-modal/victory-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  closeFulfilledStrategies,
} from '../../redux/strategies.slice';

export const TilesList: FC = () => {
  const isBingo = useSelector<RootState, boolean>((state) =>
    state.strategiesReducer.some((strategy) => {
      return !strategy.isClosed && strategy.isFulfilled;
    }),
  );

  const dispatch = useDispatch<AppDispatch>();
  const [modalDisplayState, setModalDisplayState] = useState(false);

  const closeModal = useCallback(() => {
    dispatch(closeFulfilledStrategies('closeFulfilledStrategies'));

    setModalDisplayState(false);
  }, [dispatch]);

  useEffect(() => {
    if (isBingo) {
      setModalDisplayState(true);
    }
  }, [isBingo]);

  const strategies = useSelector<RootState, RootState['strategiesReducer']>(
    (state) => state.strategiesReducer,
  );
  const { users } = useSelector<RootState, RootState['usersReducer']>(
    (state) => state.usersReducer,
  );
  const tiles = useSelector<RootState, RootState['tilesReducer']>(
    (state) => state.tilesReducer,
  );

  const winners = useMemo(() => {
    const uIds = strategies
      .filter((strategy) => strategy.isFulfilled)
      .map((strategy) => strategy.userId);

    return users.filter((user) => uIds.includes(user.id)).map((user) => user.name);
  }, [strategies, users]);

  return (
    <TileListGrid>
      {tiles.map(({ title, id, canSelect }) => (
        <Tile key={id} title={title} id={id} canSelect={canSelect} />
      ))}
      {modalDisplayState && <VictoryModal onClose={closeModal} winners={winners} />}
    </TileListGrid>
  );
};
