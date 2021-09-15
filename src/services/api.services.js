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

function signInUser(user){
    return axios.post(`${URL}sign-in`, user)
}

function signUpUser(user){
    return axios.post(`${URL}sign-up`, user)
}

export { getPostsList, signInUser, signUpUser };
