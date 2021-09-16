import axios from "axios";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/";

function config(token) {
    return {
        headers: { Authorization: `Bearer ${token}` },
    };
}
function getHashtagsList(token){
    return axios.get(`${URL}/hashtags/trending`, config(token));
}

export { getHashtagsList };