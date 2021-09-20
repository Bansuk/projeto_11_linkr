import axios from "axios";
import { useEffect } from "react";

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
function postNewPost(post, token) {
    return axios.post(`${URL}/posts`, post, config(token));
}
function getHashtagsList(token) {
    return axios.get(`${URL}/hashtags/trending`, config(token));
}
function getMyPostsList(token, user) {
    return axios.get(`${URL}users/${user.id}/posts`, config(token));
}
function getHashtagPostsList(token,idHashtag){
    return axios.get(`${URL}/hashtags/${idHashtag}/posts`, config(token));
}

function likePost(token, postId, action) {
    return axios.post(`${URL}posts/${postId}/${action}`, "", config(token));
}

export {
    signInUser,
    signUpUser,
    getPostsList,
    postNewPost,
    getMyPostsList,
    getHashtagsList,
    likePost,
    getHashtagPostsList
};
