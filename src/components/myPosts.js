import { useContext, useEffect, useState } from "react";
import { getMyPostsList } from "../services/api.services";
import Post from "./Post";
import { Content, Heading } from "../styles/MainPage";
import styled from "styled-components";
import UserContext from "../contexts/userContext";

export default function MyPosts() {
    const [statusMessage, setStatusMessage] = useState("Loading");
    const [myPostsList, setMyPostsList] = useState([]);
    const { token, user } = useContext(UserContext);

    useEffect(() => {
        getMyPostsList(token, user)
            .then(res => {
                setMyPostsList(res.data.posts);
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
            <Heading onClick={() => console.log(myPostsList[0], statusMessage)}>my posts</Heading>
            {myPostsList && myPostsList[0] ? (
                myPostsList.map(post => <Post key={post.id} post={post}></Post>)
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
