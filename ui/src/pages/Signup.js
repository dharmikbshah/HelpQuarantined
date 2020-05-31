import './Login.scss';

import { Geolocation } from '@ionic-native/geolocation';
import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonRow, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React from 'react';

import AuthService from '../auth/AuthService';
import { connect } from '../data/connect';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      contact: '',
      password: '',
      address: '',
      city: '',
      longitude: 0,
      latitude: 0,
      message: '',
      status: null,
      showToast: false,
      showLoading: false
    }
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideToast = this.hideToast.bind(this);
  }

  // handleChange(e: React.FormEvent<HTMLInputElement>) {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  async componentDidMount() {
    //const position = await Geolocation.getCurrentPosition();
    const position = {
      coords: {
        longitude: 72.395402,
        latitude: 23.804874
      }
    }
    this.setState({
      longitude: position.coords.longitude || 0,
      latitude: position.coords.latitude || 0
    })
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
    const { username, email, contact, password, address, city, longitude, latitude } = this.state;
    if (!username || !email || !contact || !password || !address || !city) {
      this.setState({
        showToast: true,
        message: 'Values can\'t be empty',
        showLoading: false
      });
    } else {
      // await this.props.setIsLoggedIn(true);
      // await this.props.setUsername(username);
      try {
        if (!longitude || !latitude) {
          this.setState({
            showToast: true,
            message: 'You must allow access to your location to proceed',
            showLoading: false
          })
          const position = await Geolocation.getCurrentPosition();
          return this.setState({
            longitude: position.coords.longitude || 0,
            latitude: position.coords.latitude || 0
          });
        }
        let res = await this.Auth.signup(username, email, contact, password, address, city, longitude, latitude);
        if (res.status === 200) {
          this.setState({
            message: res.message,
            status: res.status,
            showLoading: false,
            username: '',
            email: '',
            contact: '',
            password: '',
            address: '',
            city: ''
          });
          this.props.history.push('/otp', { email, direction: 'none' });
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
    const { username, email, contact, password, city, address, showToast, showLoading, message } = this.state;
    return (
      <IonPage id="signup-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Signup</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

          <div className="login-logo">
            <img src="assets/img/appicon.png" alt="HelpQ logo" />
          </div>

          <form onSubmit={(e) => this.handleSubmit(e)}>
            <IonList>
              <IonItem>
                <IonLabel position="stacked" color="primary">Full Name</IonLabel>
                <IonInput
                  name="username"
                  type="text"
                  value={username}
                  onIonChange={e => this.setState({ username: e.detail.value })}
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked" color="primary">Phone No.</IonLabel>
                <IonInput
                  name="contact"
                  type="tel"
                  pattern="[1-9]{1}[0-9]{9}"
                  value={contact}
                  placeholder="10 digits"
                  onIonChange={e => {
                    this.setState({
                      contact: e.detail.value && e.detail.value.replace(/[^0-9]/g, '').substring(0, 10)
                    })
                  }}
                  required
                />
              </IonItem>

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

              <IonItem>
                <IonLabel position="stacked" color="primary">Address</IonLabel>
                <IonInput
                  name="address"
                  type="text"
                  value={address}
                  placeholder='Apt/ Building/ Rd'
                  onIonChange={e => this.setState({ address: e.detail.value })}
                  required
                />
              </IonItem>

              <IonItem>
                <IonInput
                  name="address"
                  type="text"
                  value={city}
                  placeholder='City'
                  onIonChange={e => this.setState({ city: e.detail.value })}
                  required
                />
              </IonItem>

            </IonList>

            <IonRow>
              <IonCol>
                <IonButton type="submit" expand="block">Create</IonButton>
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
  component: Signup
})
