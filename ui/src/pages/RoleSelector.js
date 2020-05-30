import React from 'react';
import { Link } from 'react-router-dom';
import { IonContent, IonPage, IonChip, IonLabel } from '@ionic/react';
import './About.scss';

class RoleSelector extends React.Component {
  state = {
    location: 'madison'
  }

  render() {
    return (
      <IonPage id="about-page">
        <IonContent>
          <div className="about-header">
            {/* Instead of loading an image each time the select changes, use opacity to transition them */}
            <div className="about-image about" style={{ 'opacity': this.state.location === 'madison' ? '1' : undefined }}></div>
          </div>
          <div className="about-info">
            <h3 className="ion-padding-top ion-padding-start">Select your Role</h3>

            <p className="ion-padding-start ion-padding-end">
              The whole purpose of this app is to help someone who is quarantined. You may choose the appropriate option based on your situation or willingness to help. 
            </p>
            <br />
            <Link style={{textDecoration: 'none'}} to="/tabs/items">
              <IonChip className="wide-chip" color="danger">
                <IonLabel color="danger"><strong>I need Help</strong></IonLabel>
              </IonChip>
            </Link>
            <br />
            <br />
            <Link style={{textDecoration: 'none'}} to="/tabs/map">
              <IonChip className="wide-chip" color="primary">
                <IonLabel color="primary"><strong>I can Help</strong></IonLabel>
              </IonChip>
            </Link>
          </div>
        </IonContent>
      </IonPage>
    )
  }
}

export default RoleSelector;