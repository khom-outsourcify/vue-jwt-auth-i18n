import API from './API';

export default {
  login(username, password) {
    // Edit to Auth route
    return API().post('/posts', {
      userName: username,
      password: password
    });
  }
};
