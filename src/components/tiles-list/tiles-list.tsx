import React, { FC, useMemo } from 'react';
import { Tile } from '../tile/tile';
import { TileListGrid } from './tile-list.style';
import { useBingoContext } from '../../contexts/bingo-context';
import { VictoryModal } from '../victory-modal/victory-modal';
import { useBingoModalDisplayState } from '../../hooks/hooks';

export const TilesList: FC = () => {
  const context = useBingoContext();
  const { tiles, fulfilledStrategiesMap } = context;

  const [modalDisplayState, closeModal] = useBingoModalDisplayState();

  const winners = useMemo(() => {
    return Array.from(new Set([...fulfilledStrategiesMap.values()].flat())).map(
      (u) => u.name,
    );
  }, [fulfilledStrategiesMap]);

  return (
    <TileListGrid>
      {tiles.map(({ title, id, canSelect }) => (
        <Tile key={id} title={title} id={id} canSelect={canSelect} />
      ))}
      {modalDisplayState && <VictoryModal onClose={closeModal} winners={winners} />}
    </TileListGrid>
  );
};
