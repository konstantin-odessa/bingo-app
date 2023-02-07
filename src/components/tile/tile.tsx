import React, { FC, useMemo } from 'react';
import { TileContainer, TileInnerContent, TileUsers } from './tile.style';
import { noop } from '../../helpers/helpers';
import { TileSelectionStateEnum } from '../../enums/tile-selection-state.enum';
import { useUpdateTile } from '../../hooks/hooks';
import { useBingoContext } from '../../contexts/bingo.context';

type TTileProps = {
  title: string;
  id: number;
  canSelect?: boolean;
};

export const Tile: FC<TTileProps> = ({ title, id, canSelect }) => {
  const { users, tiles } = useBingoContext();
  const updateTile = useUpdateTile();

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
