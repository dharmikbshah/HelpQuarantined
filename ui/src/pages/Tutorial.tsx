import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonSlides, IonSlide, IonIcon, useIonViewWillEnter } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import { setMenuEnabled } from '../data/sessions/sessions.actions';
import { setHasSeenTutorial } from '../data/user/user.actions';
import './Tutorial.scss';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {};

interface DispatchProps {
  setHasSeenTutorial: typeof setHasSeenTutorial;
  setMenuEnabled: typeof setMenuEnabled;
}

interface TutorialProps extends OwnProps, DispatchProps { };

const Tutorial: React.FC<TutorialProps> = ({ history, setHasSeenTutorial, setMenuEnabled }) => {
  const [showSkip, setShowSkip] = useState(true);
  const slideRef = useRef<HTMLIonSlidesElement>(null);

  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });
  
  const startApp = async () => { 
    await setHasSeenTutorial(true);
    await setMenuEnabled(true);
    history.push('/tabs/role', { direction: 'none' });
  };

  const handleSlideChangeStart = () => { 
    slideRef.current!.isEnd().then(isEnd => setShowSkip(!isEnd));
  };

  return (
    <IonPage id="tutorial-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && <IonButton color='primary' onClick={startApp}>Skip</IonButton>}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonSlides ref={slideRef} onIonSlideWillChange={handleSlideChangeStart} pager={true}>
          <IonSlide>
            <img src="assets/img/ica-slidebox-img-1.png" alt="" className="slide-image" />
            <h2 className="slide-title">
              Quarantined? Want to Help?
            </h2>
            <p>
              You may list down your essential things, or you may help your nearby quarantined people who need their essentials.
            </p>
          </IonSlide>

          <IonSlide>
            <img src="assets/img/ica-slidebox-img-2.png" alt="" className="slide-image" />
            <h2 className="slide-title">We got your back!</h2>
            <p>
              Quarantined people will list their emergency needs like Milk, Medicine, Vegetables...
            </p>
          </IonSlide>

          <IonSlide>
            <img src="assets/img/ica-slidebox-img-3.png" alt="" className="slide-image" />
            <h2 className="slide-title">Share your Location</h2>
            <p>
              If you want to help, you can find &amp; contact nearby quarantined people.
            </p>
          </IonSlide>

          <IonSlide>
            <img src="assets/img/ica-slidebox-img-4.png" alt="" className="slide-image" />
            <h2 className="slide-title">Stay Home &amp; Stay Safe</h2>
            <p>
              After connecting healthy user can help quarantined by delivering what they need. 
            </p>
            <IonButton fill="clear" onClick={startApp}>
              Continue
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: ({
    setHasSeenTutorial,
    setMenuEnabled
  }),
  component: Tutorial
});