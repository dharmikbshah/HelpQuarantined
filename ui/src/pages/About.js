import React from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle
} from '@ionic/react';
import './About.scss';
import ShareSocialFab from '../components/ShareSocialFab';

class About extends React.Component {
  state = {
    location: 'madison'
  }

  render() {
    return (
      <IonPage id="about-page">
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>About</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="about-header">
            {/* Instead of loading an image each time the select changes, use opacity to transition them */}
            <div className="about-image about" style={{ 'opacity': this.state.location === 'madison' ? '1' : undefined }}></div>
          </div>
          <div className="about-info">
            <h3 className="ion-padding-top ion-padding-start">About Us</h3>

            <p className="ion-padding-start ion-padding-end">
              The whole purpose of this app is to help someone who is quarantined. You may choose the appropriate option based on your situation or willingness to help.
            </p>
            <br />
          </div>
        </IonContent>
        <ShareSocialFab />
      </IonPage>
    )
  }
}

export default About;