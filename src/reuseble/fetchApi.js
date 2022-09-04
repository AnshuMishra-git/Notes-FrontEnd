import axios from 'axios';
const url = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL : 'http://localhost:50111/';


const userToken = localStorage.getItem('userToken');
let val;
if (userToken) {
  val = {
    headers: {
      'authorization': userToken,
      'Content-Type': 'application/json',
    },
  };
}

const fetchApi = async (serviceType) => {
  if (serviceType.method === 'post') {
    return axios
      .post(`${url}${serviceType.reqUrl}`, serviceType.data, val)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          return err.response;
        } else {
          return err.response;
        }
      });
  }
};
export default fetchApi;
