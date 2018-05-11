import { fetchJSON, fetchRemoteJSON } from './fetch';

export async function fetchGuestList() {
    return await fetchJSON('/guestLists');
}

export async function createRequest(name, dob, gendar, password, email) {
    return await fetchJSON('/guestRequest', {
        method: 'post',
        data: {
            "guestinfos": {
                reason_request: "viewing infos",
                name,
                email,
                dob,
                profile_image: "-"
            }
        }
    });
}










// axios.post('http://localhost:1313/guestRequest', {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'content-type': 'application/x-www-form-urlencoded'
      //   },
      //   "guestinfos": {
      //     reason_request: "viewing infos",
      //     name: "Elynn Chai",
      //     email: "dayrdddl9ddd4seswdddw@gmail.com",
      //     dob: "2017-06-15",
      //     profile_image: "-"
      //   }
      // }).then(function (response) {
      //   console.log(response.data.data);
      // }).catch(function (error) {
      //   if (error.response) {
      //     console.log(error.response.headers);
      //   }
      //   else if (error.request) {
      //     console.log(error.request);
      //   }
      //   else {
      //     console.log(error.message);
      //   }
      //   console.log(error.config);
      // });