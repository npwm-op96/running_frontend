import axios from 'axios';
// import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/running/';

class RuningService {
  register_running(draft) {
    return axios.post(API_URL + 'register', {draft});
  }

  save_draft(draft) {
    return axios.post(API_URL + 'save_draft', {draft});
    // return axios.post(API_URL + 'save_draft',);

  }



  // getAdminBoard() {
  //   return axios.get(API_URL + 'admin', { headers: authHeader() });
  // }
}

export default new RuningService();
