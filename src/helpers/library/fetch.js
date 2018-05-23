import axios from 'axios';

const API_URL = 'http://localhost:1313';

export async function fetchJSON(input, opts) {   
    console.log(opts);
    
    try {
        const { data, status, statusText } = await axios({
            url: `${API_URL}${input}`,
            ...opts
        });
        return data;
    } catch(err) {        
        return err;
    }
}

export async function fetchRemoteJSON(input, opts) {
    try {
        const { data } = await axios({
            url: `${input}`,
            ...opts
        });
        return data;
     } catch(err) {
        return er;
     }
}
