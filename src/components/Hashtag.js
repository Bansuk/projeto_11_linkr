import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/userContext";
import { Content, Heading } from "../styles/MainPage";
import { getHashtagPostsList } from "../services/api.services";
import Post from "./Post";
import styled from "styled-components";
import TrendingHashtag from "./Trending";
import Loading from "./Loading";

export default function Hashtag() {
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
    }, [idHashtag, token]);

    return (
        <Content>
            <div className="posts">
                <div>
                    {idHashtag.length <= 10 ? (
                        <Heading>#{idHashtag}</Heading>
                    ) : (
                        <Heading>#{idHashtag.substring(0, 7)}...</Heading>
                    )}
                    {postsList[0] ? (
                        postsList.map(post => (
                            <Post key={post.id} post={post}></Post>
                        ))
                    ) : statusMessage !== "Loading" ? (
                        <Message>{statusMessage}</Message>
                    ) : (
                        <Loading />
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
