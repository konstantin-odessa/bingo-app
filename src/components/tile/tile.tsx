import React, { FC, useMemo } from 'react';
import { TileContainer, TileInnerContent, TileUsers } from './tile.style';
import { useBingoContext } from '../../contexts/bingo-context';
import { noop } from '../../helpers/helpers';
import { useGetTileSelectionState, useUpdateTile } from '../../hooks/hooks';

type TTileProps = {
  title: string;
  id: number;
  canSelect?: boolean;
};

export const Tile: FC<TTileProps> = ({ title, id, canSelect }) => {
  const { users } = useBingoContext();
  const updateTile = useUpdateTile();

  const selectionState = useGetTileSelectionState(id);

  const names = useMemo(() => {
    return users
      .filter((user) => user.selectedTilesIds.includes(id))
      .map((user) => user.name);
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
