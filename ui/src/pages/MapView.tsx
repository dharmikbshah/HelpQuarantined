import React from 'react';
import Map from '../components/Map';
import config from '../config';
import { Geolocation } from '@ionic-native/geolocation';
import AuthService from '../auth/AuthService';
import { IonHeader, IonToolbar, IonFooter, IonButtons, IonMenuButton, IonTitle, IonContent, IonPage } from '@ionic/react';
import './MapView.scss';


class MapView extends React.Component {
  state = {
    longitude: 0,
    latitude: 0,
    locations: [],
    mapCenter: {
      id: 1,
      name: "Manank",
      lat: 43.071584,
      lng: -89.380120
    },
    showToast: false,
    showLoading: false
  }

  async componentDidMount() {
    // Geolocation.watchPosition({}, (position, err) => {
    //   if (!err) {
    //     this.setState({coords: position.coords});
    //     console.log('mycoords: ', this.state.coords);
    //   }
    // })
    // /fetch/nearby-user?longitude=72.381600&latitude=23.800800
    this.setState({
      showLoading: true
    })
    const position = await Geolocation.getCurrentPosition();
    if(!position.coords.longitude || !position.coords.latitude) {
      this.setState({
        showToast: true,
        message: 'You must allow access to your location to proceed',
        showLoading: false
      })
    } else {
      try {
        let Auth = new AuthService();
        const res = await Auth.fetch(`${config.url}/fetch/nearby-user?longitude=${position.coords.longitude}&latitude=${position.coords.latitude}`, {
          method: 'GET'
        });
        let users = res.users;
        let locations: any = [];
        if(users.length > 0){
          users.map((u: any) => {
            locations.push({
              id: u._id,
              lng: u.location.coordinates[0],
              lat: u.location.coordinates[1],
              name: u.user_name,
              contact: u.user_contact,
              address: u.user_address,
              requiredItems: u.required_items,
              navigation_url: u.navigation_url
            })
            return null;
          })
        }
        this.setState({
          locations: locations,
          mapCenter: {
            id: 0,
            name: 'You',
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          showLoading: false
        })
      } catch(e) {
        this.setState({
          locations:[],
          showLoading: false
        })
      }
    }
  }

  render() {
    const { locations, mapCenter } = this.state;
    return (
      <IonPage id="map-view">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Map</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent class="map-page">
          <Map locations={locations} mapCenter={mapCenter} />
        </IonContent>

        <IonFooter className="ion-no-border">
          <IonToolbar>
            People nearby: {locations.length}
          </IonToolbar>
        </IonFooter>
      </IonPage>
    );
  }
}

export default MapView;