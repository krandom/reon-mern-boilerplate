/* REQUESET */
// import ConfigStore from '../stores/ConfigStore';

// import request from 'superagent/lib/client';
// import Promise from 'es6-promise';

// import aa from 'async-await';
import axios from 'axios';

// import { mainStore } from '../store/Store';
// const store = mainStore();

// store.subscribe(listener);

// function select(state) {
//   return state.user
// }

// function listener() {
//   let token = select(store.getState())
//   console.log('listener', token)
//   // axios.defaults.headers.common['Authorization'] = token;
// }

export default {

    POST:(endpoint, formData = {}, config) => {
        var self = this;

        console.log('POST ppppppppppppppppppppppppppppppppp', config);

        // const config = store.getState().config;
        console.log('POST', config.api+endpoint);

        var response = null;

        if (!formData.hasOwnProperty('sessionId'))
            formData.sessionId = config.sessionId;

        return response = axios.post(`${config.api}${endpoint}`, formData)
        // .catch(err => {
        //     console.log('err');
        // })
        .then(res => {
            console.log('SUCCESS',res);
            return (res.data);

            // VALIDATE(response);/**/
        })
        .catch(err => {
            console.log('ERROR 12323123213213231',JSON.parse(JSON.stringify(err)));
            return err;
        });


        console.log('response !!!!!!!!!!' , response);
    },


    VALIDATE:(response) => {
        console.log('response VALID', response)
    }
    // GET:(url, call_params) => {
    //     // var params = this.encodeParams( call_params );

    //     var params = '';

    //     var promise = new RSVP.Promise(function(resolve, reject)
    //     {
    //         var client = false;
    //         var host = ConfigStore.getState().api;

    //         if (window.XMLHttpRequest)
    //             client = new XMLHttpRequest();
    //         else
    //             client = new ActiveXObject('Microsoft.XMLHTTP');

    //         if (!client) {
    //             console.log('Giving up :( Cannot create an XMLHTTP instance');
    //             return false;
    //         }

    //         if (client) {

    //             client.open('GET', host + url + params , true);
    //             client.responseType = 'json';
    //             client.setRequestHeader('Accept', 'application/json');
    //             client.send(client);
    //         }
    //     });
    //     return promise;
    // },

    // POST:(url, formData) => {
    //     console.log('formdata', formData);
    //     var host = ConfigStore.getState().api;
    //     formData = ConfigStore.getApiData(formData);

    //     var promise = new Promise((resolve, reject) => {

    //         $.ajax({
    //             type: 'POST',
    //             url: host + url,
    //             data: formData
    //         })
    //         .done(function (data) {
    //             resolve(data);
    //             // alert(data);
    //         })
    //         .fail(function (data) {
    //             console.log('failed to register');
    //         });
    //     });

    //     return promise;
    // },
};
