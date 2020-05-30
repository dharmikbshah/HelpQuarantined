import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonToast, IonLoading, IonIcon } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import AuthService from '../auth/AuthService';
import { arrowBack } from 'ionicons/icons';
import { Link } from 'react-router-dom';
class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      message: '',
      status: null,
      showToast: false,
      showLoading: false
    }
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideToast = this.hideToast.bind(this);
    this.resendOTP = this.resendOTP.bind(this);
    this.hideLoading = this.hideLoading.bind(this);
  }


  hideToast() {
    this.setState({
      showToast: false
    })
  }

  hideLoading() {
    this.setState({
      showLoading: false
    })
  }

  // /user/resendOTP
  async resendOTP() {
    this.setState({ showLoading: true, message: '' });
    try {
      let res = await this.Auth.resendOTP(this.props.location.state.email);
      return this.setState({
        message: res.message,
        status: res.status,
        showLoading: false,
        showToast: true
      });
    } catch(e) {
      this.setState({
        message: 'Internal Server Error',
        showToast: true,
        showLoading: false
      })
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ showLoading: true, message: '' })
    const { otp } = this.state;
    if (!otp || otp.length !== 6) {
      return this.setState({
        showToast: true,
        showLoading: false,
        message: 'OTP should have 6 digits'
      });
    } else {
      // await this.props.setIsLoggedIn(true);
      // await this.props.setUsername(username);
      try {
        let res = await this.Auth.verification(this.props.location.state.email, otp);
        if (res.status === 200 && res.token) {
          this.setState({
            message: res.message,
            status: res.status,
            showLoading: false,
            otp: ''
          });
          return this.props.history.push('/tabs/items', { direction: 'none' });
        }

        return this.setState({
          message: res.message,
          showToast: true,
          showLoading: false
        })
      } catch (e) {
        this.setState({
          message: 'Internal Server Error',
          showToast: true,
          showLoading: false
        })
        // alert(e);
      }
    }
  }

  render() {
    const { otp, showLoading, showToast, message } = this.state;
    return (
      <IonPage id="signup-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>OTP Verification</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

          <div className="login-logo">
            <img src="assets/img/appicon.png" alt="HelpQ logo" />
          </div>
          <p style={{margin: '10px'}}>We have sent an OTP to your email address, please verify it below.</p>
          <form noValidate onSubmit={(e) => this.handleSubmit(e)}>
            <IonList>
              <IonItem>
                <IonLabel position="stacked" color="primary">OTP</IonLabel>
                <IonInput
                  name="otp"
                  type="text"
                  value={otp}
                  onIonChange={e => this.setState({ otp: e.detail.value })}
                  required
                />
              </IonItem>
            </IonList>

            <IonRow>
              <IonCol>
                <IonButton type="submit" expand="block">Verify</IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol style={{textAlign:'center'}} size='6'>
                <Link style={{textDecoration: 'none'}} to="/signup">
                  <IonButton fill="clear">
                    <IonIcon slot="start" icon={arrowBack}></IonIcon>Back
                  </IonButton>
                </Link>
              </IonCol>
              <IonCol size='6'>
                <IonButton fill="clear" onClick={() => this.resendOTP()}>
                  Resend OTP
                </IonButton>
              </IonCol>
            </IonRow>
             
          </form>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => this.hideToast()}
            message={message}
            duration={1000}
            position="top"
          />
          <IonLoading
            isOpen={showLoading}
            onDidDismiss={() => this.hideLoading()}
            message={'Please wait...'}
          />
        </IonContent>

      </IonPage>
    )
  }
}

export default connect({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Verification
})
