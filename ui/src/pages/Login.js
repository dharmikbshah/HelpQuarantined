import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonToast, IonLoading } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import AuthService from '../auth/AuthService';
import { Link } from 'react-router-dom';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
      status: null,
      showToast: false,
      showLoading: false
    }
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideToast = this.hideToast.bind(this);
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

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ showLoading: true, message: '' })
    const { email, password } = this.state;
    if (!email || !password) {
      return this.setState({
        showToast: true,
        showLoading: false,
        message: 'Please fill in both Email and Password'
      });
    } else {
      // await this.props.setIsLoggedIn(true);
      // await this.props.setUsername(username);
      try {
        let res = await this.Auth.login(email, password);
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
    const { email, password, showLoading, showToast, message } = this.state;
    return (
      <IonPage id="login-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

          <div className="login-logo">
            <img src="assets/img/appicon.png" alt="HelpQ logo" />
          </div>
          <form noValidate onSubmit={(e) => this.handleSubmit(e)}>
            <IonList>
              <IonItem>
                <IonLabel position="stacked" color="primary">Email</IonLabel>
                <IonInput
                  name="email"
                  type="email"
                  value={email}
                  onIonChange={e => this.setState({ email: e.detail.value })}
                  required
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked" color="primary">Password</IonLabel>
                <IonInput
                  name="password"
                  type="password"
                  value={password}
                  onIonChange={e => this.setState({ password: e.detail.value })}
                  required
                />
              </IonItem>
            </IonList>

            <IonRow>
              <IonCol size='6'>
                <IonButton type="submit" expand="block">Login</IonButton>
              </IonCol>
              <IonCol size='6'>
                <Link style={{textDecoration: 'none'}} to="/signup">
                  <IonButton expand="block" color='light' >Signup</IonButton>
                </Link>
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
  component: Login
})
