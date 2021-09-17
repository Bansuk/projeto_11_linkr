import { useContext, useEffect, useState } from "react";
import { getPostsList } from "../services/api.services";
import Post from "./Post";
import { Content, Heading } from "../styles/MainPage";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import PublishPost from "./PublishPost";
import { useHistory } from "react-router-dom";

export default function Timeline() {
    const [statusMessage, setStatusMessage] = useState("Loading");
    const [postsList, setPostsList] = useState([]);
    const { token, user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        getPostsList(token)
            .then(res => {
                setPostsList(res.data.posts);
                if (postsList === [])
                    setStatusMessage("Nenhum post encontrado");
                else setStatusMessage("OK");
            })
            .catch(err => {
                setStatusMessage(
                    "Houve uma falha ao obter os posts, por favor atualize a página"
                );
            });
    }, [token, postsList]);

    return (
        <Content>
            <Heading onClick={() => history.push('/user/77')}>timeline</Heading>
            <PublishPost />
            {statusMessage === "OK" ? (
                postsList.map(post => <Post key={post.id} post={post}></Post>)
            ) : (
                <Message>{statusMessage}</Message>
            )}
        </Content>
    );
}

const Message = styled.span`
    color: #fff;
    font-weight: 700;
    font-family: "Oswald", sans-serif;
    font-size: 36px;
`;
