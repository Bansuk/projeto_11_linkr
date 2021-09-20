import { useContext, useEffect, useState } from "react";
import { getPostsList } from "../services/api.services";
import Post from "./Post";
import { Content, Heading } from "../styles/MainPage";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import PublishPost from "./PublishPost";
import TrendingHashtag from "./Trending";

export default function Timeline() {
    const [statusMessage, setStatusMessage] = useState("Loading");
    const [postsList, setPostsList] = useState([]);
    const { token } = useContext(UserContext);

    useEffect(() => {
        getPostsList(token)
            .then(res => {
                setPostsList(res.data.posts);
                setStatusMessage("Nenhum post encontrado");
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
                <Heading>timeline</Heading>
                <PublishPost />
                {postsList && postsList[0] ? (
                    postsList.map(post => (
                        <Post key={post.id} post={post}></Post>
                    ))
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
