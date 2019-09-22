import Axios from '../utils/Axios.utils';
import { endPoints as UserEndpoints } from '../constants/User.constants';

// fetch("/login", {
//   method: "POST",
//   body: form
// })

class UserApi {
  static getProfile(formData, config) {
    console.log('we are in api', config)
    return Axios.POST(UserEndpoints.GET_PROFILE, formData, config);
  }

  static getAllCats() {

    return { name : 'David' };
    
    // return fetch('http://localhost:5000/api/v1/cats').then(response => {
    //   return response.json();
    // }).catch(error => {
    //   return error;
    // });
  }

  static updateCat(cat) {
    const request = new Request(`http://localhost:5000/api/v1/cats/${cat.id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: JSON.stringify({cat: cat})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createCat(cat) {
    const request = new Request('http://localhost:5000/api/v1/cats/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: JSON.stringify({cat: cat})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteCat(cat) {
    const request = new Request(`http://localhost:5000/api/v1/cats/${cat.id}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default UserApi;
