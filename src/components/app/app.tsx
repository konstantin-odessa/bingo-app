import React from 'react';
import { TilesList } from '../tiles-list/tiles-list';
import { AppContainer } from './app.style';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserRegistration } from '../users-registration/users-registration';
import { ConferenceGuard } from '../conference-guard/conference-guard';
import { UserManager } from '../user-manager/user-manager';
import { BingoContextProvider } from '../../contexts/bingo.context';

function App() {
  return (
    <AppContainer>
      <BingoContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<UserRegistration />} />
            <Route
              path='/conference'
              element={
                <ConferenceGuard>
                  <UserManager />
                  <TilesList />
                </ConferenceGuard>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
        <div id='modal'></div>
      </BingoContextProvider>
    </AppContainer>
  );
}

export default App;
