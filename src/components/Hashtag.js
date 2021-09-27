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


useEffect(() => {
    getHashtagPostsList(token, idHashtag)
        .then(res => {
            setPostsList(res.data.posts);
            setStatusMessage("Nenhum post encontrado");
        })
        .catch(err => {
            setStatusMessage(
                "Houve uma falha ao obter os posts, por favor atualize a página"
            );
        });
}, [idHashtag,token]);

function setRepostedBy(post) {
    if (post.repostedBy) {
        return {
            repostUserId: post.repostedBy.id,
            repostUsername: post.repostedBy.username,
        };
    } else return { repostUserId: "", repostUsername: "" };
}

return (
    <Content>
            <div className="posts">
                <div>
                    {idHashtag.length <= 10 ? (
                        <Heading>#{idHashtag}</Heading>
                    ):(
                        <Heading>#{idHashtag.substring(0,7)}...</Heading>
                    )}
                    {postsList.length ? (postsList.map(post => (
                            <Post
                                key={post.id}
                                post={post}
                                repostedBy={setRepostedBy(post)}
                            ></Post>
                        ))
                    ) : (
                        <Message>{statusMessage}</Message>
                    )}
                </div>
                <TrendingHashtag />
            </div>
        </Content>
);
}

const Message = styled.span`
    color: #fff;
    font-weight: 700;
    font-family: "Oswald", sans-serif;
    font-size: 36px;
`;