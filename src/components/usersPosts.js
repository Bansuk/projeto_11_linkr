import { useContext, useEffect, useState } from "react";
import { getMyPostsList } from "../services/api.services";
import Post from "./Post";
import { Content, Heading } from "../styles/MainPage";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import { useParams } from "react-router-dom";

export default function UsersPosts() {
    const [statusMessage, setStatusMessage] = useState("Loading");
    const [myPostsList, setMyPostsList] = useState([]);
    const [targetUser, setTargetUser] = useState('')
    const { token } = useContext(UserContext);
    const userId = {
        id: useParams().id
    }
    

    useEffect(() => {
        console.log(userId);
        getMyPostsList(token, userId)
            .then(res => {
                setMyPostsList(res.data.posts);
                setStatusMessage("Nenhum post encontrado");
                setTargetUser(res.data.posts[0].user.username);
            })
            .catch(err => {
                setStatusMessage(
                    "Houve uma falha ao obter os posts, por favor atualize a página"
                );
            });
    }, [token]);

    return (
        <Content>
            <Heading onClick={() => console.log(targetUser)}>{`${targetUser}'s posts`}</Heading>
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