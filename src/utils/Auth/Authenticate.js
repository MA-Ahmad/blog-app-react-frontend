import axios from "axios";

const Authenticate = async url => {
  let auth = { isAuth: false, user: {} };
  await axios
    .get(`${url}/sessions/logged_in`, {
      withCredentials: true
    })
    .then(response => {
      auth = { isAuth: response.data.logged_in, user: response.data.user };
      return auth;
    })
    .catch(err => console.log(err));
  return auth;
};

export default Authenticate;
