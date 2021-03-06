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
    return axios.get(`${URL}following/posts`, config(token));
}
function getMorePostsList(token, lastId){
    return axios.get(`${URL}following/posts?olderThan=${lastId}`, config(token))
}
function getMorePostsHashtagsList(token, lastId,idHashtag){
    return axios.get(`${URL}/hashtags/${idHashtag}/posts?olderThan=${lastId}`, config(token));
}
function getMoreMyLikesPostsList(token, lastId){
    return axios.get(`${URL}posts/liked?olderThan=${lastId}`, config(token));
}
function getMoreMyPostsList(token, user, lastId){
    return axios.get(`${URL}users/${user.id}/posts?olderThan=${lastId}`, config(token));
}
function getEarlierPostsList(token, firstId){
    return axios.get(`${URL}following/posts?earlierThan=${firstId}`, config(token))
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
function getHashtagPostsList(token, idHashtag) {
    return axios.get(`${URL}/hashtags/${idHashtag}/posts`, config(token));
}
function likePost(token, postId, action) {
    return axios.post(`${URL}posts/${postId}/${action}`, "", config(token));
}
function deletePost(token, postId) {
    return axios.delete(`${URL}posts/${postId}`, config(token));
}
function editPost(token, postId, newText) {
    return axios.put(`${URL}posts/${postId}`, newText, config(token));
}
function getMyLikes(token) {
    return axios.get(`${URL}posts/liked`, config(token));
}
function sharePost(token, postId) {
    return axios.post(`${URL}posts/${postId}/share`, "", config(token));
}
function getPostComments(token, postId) {
    return axios.get(`${URL}posts/${postId}/comments`, config(token));
}
function seeFollowersUsers(token) {
    return axios.get(`${URL}users/follows`, config(token));
}
function followUser(token, user) {
    return axios.post(`${URL}users/${user.id}/follow`, "", config(token));
}
function unfollowUser(token, user) {
    return axios.post(`${URL}users/${user.id}/unfollow`, "", config(token));
}
function getFollowingList(token) {
    return axios.get(`${URL}users/follows`, config(token));
}
function publishComment(token, postId, comment) {
    return axios.post(`${URL}posts/${postId}/comment`, comment, config(token));
}

function getSearchOptions(token, string){
    return axios.get(`${URL}users/search?username=${string}`, config(token));
}

function getUserInfo(token, user){
    return axios.get(`${URL}users/${user.id}`, config(token));
}

export {
    signInUser,
    signUpUser,
    getPostsList,
    postNewPost,
    getMyPostsList,
    getHashtagsList,
    likePost,
    getHashtagPostsList,
    deletePost,
    editPost,
    getMyLikes,
    sharePost,
    getPostComments,
    seeFollowersUsers,
    followUser,
    unfollowUser,
    getFollowingList,
    getSearchOptions,
    getUserInfo,
    publishComment,
    getMorePostsList,
    getMorePostsHashtagsList,
    getEarlierPostsList,
    getMoreMyLikesPostsList,
    getMoreMyPostsList
};
