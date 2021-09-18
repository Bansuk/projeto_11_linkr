import axios from "axios";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/";

function config(token) {
    return {
        headers: { Authorization: `Bearer ${token}` },
    };
}

function signInUser(user) {
    return axios.post(`${URL}sign-in`, user);
}

function signUpUser(user) {
    return axios.post(`${URL}sign-up`, user);
}

function getPostsList(token) {
    return axios.get(`${URL}/posts`, config(token));
}
function postNewPost(post,token) {
    return axios.post(`${URL}/posts`, post,config(token));
}

function getMyPostsList(token, user){
    return axios.get(`${URL}users/${user.id}/posts`, config(token));
}

export { getPostsList, signInUser, signUpUser , postNewPost, getMyPostsList};
