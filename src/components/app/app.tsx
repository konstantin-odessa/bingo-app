import React from 'react';
import { TilesList } from '../tiles-list/tiles-list';
import { BingoContextProvider } from '../../contexts/bingo-context';
import { AppContainer } from './app.style';

function App() {
  return (
    <AppContainer>
      <BingoContextProvider>
        <div className='App'>
          <TilesList />
        </div>

        <div id='modal'></div>
      </BingoContextProvider>
    </AppContainer>
  );
}

export default App;
