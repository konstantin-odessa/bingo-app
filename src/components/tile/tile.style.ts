import styled, { css } from 'styled-components';
import { TileSelectionStateEnum } from '../../enums/tile-selection-state.enum';

export const TileContainer = styled.div`
  border: 1px dashed;
  aspect-ratio: 1/1;
  cursor: pointer;
  padding: 0.4em;
`;

export const TileInnerContent = styled.div<{
  selectionState: TileSelectionStateEnum;
}>`
  ${({ selectionState }) => {
    let backgroundColor: string;
    let lineDecoration: string;

    switch (selectionState) {
      case TileSelectionStateEnum.SELECTED: {
        backgroundColor = 'grey';
        lineDecoration = 'line-through';
        break;
      }
      case TileSelectionStateEnum.BINGO: {
        backgroundColor = 'yellowgreen';
        lineDecoration = 'line-through';
        break;
      }
      case TileSelectionStateEnum.NOT_SELECTED:
      default:
        backgroundColor = '#d1d1d129';
        lineDecoration = 'revert';
    }

    return css`
      display: flex;
      place-items: center;
      place-content: center;
      height: 100%;
      width: 100%;
      text-decoration-line: ${lineDecoration};
      background-color: ${backgroundColor};
    `;
  }}
`;
