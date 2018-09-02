import axios from 'axios';

export async function fetchJSON(input, opts) {
    console.log(opts);

    try {
        const { data, status, statusText } = await axios({
            url: `${__APIURL__}${input}`,
            ...opts
        });
        return data;
    } catch(err) {
        return err;
    }
}

export async function fetchRemoteJSON(input, opts) {
    try {
        const { data, status, statusText  } = await axios({
            url: `${input}`,
            ...opts
        });
        return data;
     } catch(err) {
        return er;
     }
}
