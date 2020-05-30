import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import MainTabs from './pages/MainTabs';
import { connect } from './data/connect';
import { AppContextProvider } from './data/AppContext';
import { loadConfData } from './data/sessions/sessions.actions';
import { loadUserData } from './data/user/user.actions';
import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Support from './pages/Support';
import Tutorial from './pages/Tutorial';
import HomeOrTutorial from './components/HomeOrTutorial';
import Verification from './pages/Verification';
import AuthService from './auth/AuthService';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  darkMode: boolean;
}

interface DispatchProps { }

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({ darkMode }) => {

  useEffect(() => {
    loadUserData();
    loadConfData();
    // eslint-disable-next-line
  }, []);
  let Auth = new AuthService();
  return (
    <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/tabs" component={MainTabs} />
            <Route path="/account" component={Account} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/support" component={Support} />
            <Route path="/tutorial" component={Tutorial} />
            <Route path="/otp" component={Verification} />
            <Route path="/logout" render={() => {
              Auth.logout();
              return <Redirect to="/tabs/role" />
            }} />
            <Route path="/" component={HomeOrTutorial} exact />
            {/* <Route path="*" component={HomeOrTutorial} /> */}
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode
  }),
  mapDispatchToProps: { },
  component: IonicApp
});
