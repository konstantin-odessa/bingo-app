import styled, { css } from 'styled-components';
import { TileSelectionStateEnum } from '../../enums/tile-selection-state.enum';
import { pxToEm } from '../../helpers/helpers';

export const TileContainer = styled.div`
  border: ${pxToEm(1)} dashed;
  aspect-ratio: 1/1;
  cursor: pointer;
  padding: 0.4em;
  border-radius: 0.2em;
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
        backgroundColor = '#c5ee72';
        lineDecoration = 'line-through';
        break;
      }
      case TileSelectionStateEnum.NOT_SELECTED:
      default:
        backgroundColor = 'rgba(209,209,209,0.27)';
        lineDecoration = 'revert';
    }

    return css`
      position: relative;
      display: flex;
      place-items: center;
      place-content: center;
      height: 100%;
      width: 100%;
      text-decoration-line: ${lineDecoration};
      background-color: ${backgroundColor};
      line-height: 1.3em;
      border-radius: 0.2em;
      padding: 0.2em;
      box-sizing: border-box;
      font-size: 0.8em;
    `;
  }}
`;

export const TileUsers = styled.div`
  position: absolute;
  color: #ff00c6;
  top: 0;
  left: 0.4em;
  font-size: 0.7em;
`;
