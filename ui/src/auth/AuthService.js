import config from '../config';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export default class AuthService {
  constructor(domain) {
    this.domain = domain || config.url;
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    // this.getProfile = this.getProfile.bind(this);
  }

  async login(email, password) {
    try {
      const res = await this.fetch(`${this.domain}/user/login`, {
        method: 'POST',
        body: JSON.stringify({
          user_email: email,
          hashed_password: password
        })
      });
      if (res.token) await this.setToken(res.token);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async signup(username, email, contact, password, address, city, longitude, latitude) {
    try {
      const res = await this.fetch(`${this.domain}/user/signup`, {
        method: 'POST',
        body: JSON.stringify({
          user_name: username,
          user_contact: contact,
          user_email: email,
          hashed_password: password,
          user_address: address,
          user_city: city,
          location: {
            type: 'Point',
            coordinates: [longitude, latitude]
          }
        })
      });
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async lostPassword(email) {
    try {
      const res = await this.fetch(`${this.domain}/user/forgot-password`, {
        method: 'POST',
        body: JSON.stringify({
          email
        })
      });
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async changePassword(token, password) {
    try {
      const res = await this.fetch(`${this.domain}/user/change-password/${token}`, {
        method: 'POST',
        body: JSON.stringify({
          password
        })
      });
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async verification(email, otp) {
    try {
      const res = await this.fetch(`${this.domain}/user/verification`, {
        method: 'POST',
        body: JSON.stringify({
          user_email: email,
          otp
        })
      });
      if (res.token) this.setToken(res.token);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async resendOTP(email) {
    try {
      const res = await this.fetch(`${this.domain}/user/resendOTP`, {
        method: 'POST',
        body: JSON.stringify({
          user_email: email
        })
      });
      return res;
    } catch (e) {
      console.log(e);
    }
  }


  async contactUs(name, email, contact, comment) {
    try {
      const res = await this.fetch(`${this.domain}/user/contact-us`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          contact,
          comment
        })
      });
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = await this.getToken(); // GEtting token from localstorage
    return !!token; // && !this.isTokenExpired(token) // handwaiving here
  }

  // isTokenExpired(token) {
  //   try {
  //     const decoded = decode(token);
  //     if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
  //       return true;
  //     }
  //     else
  //       return false;
  //   }
  //   catch (err) {
  //     return false;
  //   }
  // }

  async setToken(token) {
    await Storage.set({ key: 'id_token', value: token });
    await Storage.set({ key: 'hasLoggedIn', value: true });
    // localStorage.setItem('id_token', token);
    // localStorage.setItem('id_email', email);
  }

  async getToken() {
    // Retrieves the user token from localStorage
    // return localStorage.getItem('id_token')
    const res = await Storage.get({ key: 'id_token' });
    console.log('token res:', res,  res.value);
    return res.value;
  }

  async logout() {
    // Clear user token and profile data from localStorage
    // localStorage.removeItem('id_token');
    return await Storage.remove({ key: 'id_token' });
    // localStorage.removeItem('id_email');
  }

  // getEmail() {
  //   return localStorage.getItem('id_email');
  // }
  // getProfile() {
  //   // Using jwt-decode npm package to decode the token
  //   return decode(this.getToken());
  // }


  async fetch(url, options) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (await this.loggedIn()) {
      headers['Authorization'] = await this.getToken();
    }
    try {
      let res = await fetch(url, {
        headers,
        ...options
      });
      let status = res.status;
      let json = await res.json();
      let response = {
        ...json,
        status
      }
      return response;
    } catch (e) {
      console.log(e);
    }
    // return fetch(url, {
    //   headers,
    //   ...options
    // })
    //   .then(this._checkStatus)
    //   .then(response => response.json())
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response;
      throw error;
    }
  }
}