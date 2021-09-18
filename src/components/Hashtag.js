import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/userContext";
import { Content, Heading } from "../styles/MainPage";
import { getHashtagPostsList } from '../services/api.services';
import Post from "./Post";
import styled from 'styled-components';
import TrendingHashtag from './Trending';
export default function Hashtag(){
const [statusMessage, setStatusMessage] = useState("Loading");
const [postsList, setPostsList] = useState([]);
const { token } = useContext(UserContext);
const { idHashtag } = useParams();

console.log(idHashtag);

useEffect(() => {
    getHashtagPostsList(token, idHashtag)
        .then(res => {
            setPostsList(res.data.posts);
            setStatusMessage("OK");
        })
        .catch(err => {
            setStatusMessage(
                "Houve uma falha ao obter os posts, por favor atualize a página"
            );
        });
}, [token]);

return (
    <Content>
            <div>
            <Heading>#hashtag</Heading>
                {statusMessage === "OK" ? (
                    postsList.map(post => <Post key={post.id} post={post}></Post>)
                ) : (
                    <Message>{statusMessage}</Message>
                )}
            </div>
            <TrendingHashtag />
        </Content>
);
}

const Message = styled.span`
    color: #fff;
    font-weight: 700;
    font-family: "Oswald", sans-serif;
    font-size: 36px;
`;