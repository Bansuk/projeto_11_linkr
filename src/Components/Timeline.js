import { useContext, useEffect, useState } from "react";
import { getPostsList } from "../Services/api.services";
import Post from "./Post";
import { Content, Heading } from "../Styles/MainPage";
import styled from "styled-components";
import UserContext from "../Context/UserContext";

export default function Timeline() {
    const [statusMessage, setStatusMessage] = useState("Loading");
    const [postsList, setPostsList] = useState([]);
    const { token } = useContext(UserContext);

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
            <Heading>timeline</Heading>
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
