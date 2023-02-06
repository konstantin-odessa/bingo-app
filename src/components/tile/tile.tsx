import React, { FC, useMemo } from 'react';
import { TileContainer, TileInnerContent } from './tile.style';
import { useBingoContext } from '../../contexts/bingo-context';
import { getTileState, noop } from '../../helpers/helpers';
import { useUpdateTile } from '../../hooks/hooks';

type TTileProps = {
  title: string;
  id: number;
  canSelect?: boolean;
};

export const Tile: FC<TTileProps> = ({ title, id, canSelect }) => {
  const context = useBingoContext();
  const { bingoStrategies, users } = context;

  const updateTile = useUpdateTile(context);

  const selectionState = useMemo(() => {
    return getTileState(bingoStrategies, users, id);
  }, [bingoStrategies, id, users]);

  return (
    <TileContainer>
      <TileInnerContent
        onClick={() => (canSelect ? updateTile(id) : noop())}
        selectionState={selectionState}
      >
        {title}
      </TileInnerContent>
    </TileContainer>
  );
};
