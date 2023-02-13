import React from 'react';
import { TilesList } from '../tiles-list/tiles-list';
import { AppContainer } from './app.style';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserRegistration } from '../users-registration/users-registration';
import { ConferenceGuard } from '../conference-guard/conference-guard';
import { UserManager } from '../user-manager/user-manager';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <BrowserRouter>
          <Routes>
            <Route path='/bingo-app' element={<UserRegistration />} />
            <Route
              path='/bingo-app/conference'
              element={
                <ConferenceGuard>
                  <UserManager />
                  <TilesList />
                </ConferenceGuard>
              }
            ></Route>
            <Route path={'*'} element={<ConferenceGuard />}></Route>
          </Routes>
        </BrowserRouter>
        <div id='modal'></div>
      </AppContainer>
    </Provider>
  );
}

export default App;
