import React  from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import MapView from './MapView';
import About from './About';
import RoleSelector from './RoleSelector';
import { connect } from '../data/connect';
import Speaker from './Speaker'
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps { };

interface DispatchProps { }

interface MainTabsProps extends OwnProps, DispatchProps { }

const MainTabs: React.FC<MainTabsProps> = ({ history }) => {
  return (
  
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/role" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        
        <Route path="/tabs/map" render={() => <MapView />} exact={true} />
        <Route path="/tabs/about" render={() => <About />} exact={true} />
        <Route path="/tabs/role" render={() => <RoleSelector />} exact={true} />
        <Route path="/tabs/items" render={() => <Speaker />} exact={true} />
      </IonRouterOutlet>
    
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: ({ }),
  component: MainTabs
});