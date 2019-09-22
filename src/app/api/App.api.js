import Axios from '../utils/Axios.utils';
import { endPoints as AppEndpoints } from '../constants/App.constants';

// fetch("/login", {
//   method: "POST",
//   body: form
// })

class AppApi {

  static validateCookie(formData, config) {
    return Axios.POST(AppEndpoints.VALIDATE_COOKIE, formData, config);
  }
}

export default AppApi;
