import React, { FC, useMemo } from 'react';
import { Tile } from '../tile/tile';
import { TileListGrid } from './tile-list.style';
import { VictoryModal } from '../victory-modal/victory-modal';
import { useBingoModalDisplayState } from '../../hooks/hooks';
import { useBingoContext } from '../../contexts/bingo.context';

export const TilesList: FC = () => {
  const context = useBingoContext();
  const { tiles, users, strategies } = context;

  const [modalDisplayState, closeModal] = useBingoModalDisplayState();

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
