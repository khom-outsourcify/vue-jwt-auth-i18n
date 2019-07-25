import API from './API';

export default {
  login(username, password) {
    return API().post('/checkCredentials/', {
      userName: username,
      password: password
    });
  }
};
