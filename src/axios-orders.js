import axios from "axios";

const instance = axios.create({
  baseURL: "https://myburger-fb283.firebaseio.com/"
});

export default instance;
