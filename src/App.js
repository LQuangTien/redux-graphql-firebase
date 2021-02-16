import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './default.scss';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import HomepageLayout from './layouts/HomepageLayout';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { auth, handleUserProfile } from './firebase/utils';
import Recovery from './pages/Recovery';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/User/user.actions';
import WithAuth from './hoc/WithAuth';
const App = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })
          );
        });
      }
      dispatch(setCurrentUser(userAuth));
    });

    return () => {
      authListener();
    };
  });

  return (
    <div className="App">
      {/* render the first matched  */}
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
        <Route
          exact
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/forgotpassword"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
