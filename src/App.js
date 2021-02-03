import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './default.scss';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import HomepageLayout from './layouts/HomepageLayout';
import Registration from './pages/Registration';

function App() {
  return (
    <div className="App">
      {/* render the first matched */}
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          exact
          path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
