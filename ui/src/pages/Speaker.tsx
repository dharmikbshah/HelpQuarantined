import React, { useRef } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton } from '@ionic/react';
import Items from './Items';
import { connect } from '../data/connect';
// import './SpeakerList.scss';

interface OwnProps { };

interface StateProps {
  speakers: any;
  speakerSessions: { [key: string]: any };
  history: any;
};

interface DispatchProps { };

interface SpeakerListProps extends OwnProps, StateProps, DispatchProps { };

const SpeakerList: React.FC<SpeakerListProps> = ({ history }) => {
  const pageRef = useRef(null);
  return (
    <IonPage id="speaker-list" ref={pageRef}>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Items</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Items</IonTitle>
          </IonToolbar>
        </IonHeader>

          {/* <IonGrid fixed>
            <IonRow>
              {speakers.map(speaker => (
                <IonCol size="12" size-md="6" key={speaker.id}>
                  <SpeakerItem
                    key={speaker.id}
                    speaker={speaker}
                    sessions={speakerSessions[speaker.name]}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid> */}
        <Items pageRef={pageRef} history={history} />
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  component: React.memo(SpeakerList)
});