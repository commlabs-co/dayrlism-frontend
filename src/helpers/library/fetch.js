import axios from 'axios';

const API_URL = 'http://localhost:1313';

export async function fetchJSON(input, opts) {
    const { data, status, statusText } = await axios({
        url: `${API_URL}${input}`,
        ...opts
    });
    
    if (status !== 200 && statusText !== "OK") {
      const err = new Error("network status error");
      err.status = data.response;
      throw err;
    }
    if (data === null) {
      const err = new Error("result code");
      err.data = data;
      throw err;
    }
    return data;
}

export async function fetchRemoteJSON(input, opts) {
    const { data } = await axios({
        url: `${input}`,
        ...opts
    });

    if (data.response !== 200) {
        const err = new Error('network status error');
        err.status = data.response;
        throw err;
    }
    if (data.data === null) {
        const err = new Error('result code');
        err.data = data.data;
        throw err;
    }
    return data;
}
