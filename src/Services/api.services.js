import axios from "axios";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/";

function config(token) {
    return {
        headers: { Authorization: `Bearer ${token}` },
    };
}

function getPostsList(token) {
    return axios.get(`${URL}/posts`, config(token));
}

export { getPostsList };
