import { useEffect, useState } from "react";
import { getPostsList } from "../Services/api.services";
import Post from "./Post";
import { Content, Heading } from "../Styles/MainPage";
import styled from "styled-components";

export default function Timeline() {
    const [statusMessage, setStatusMessage] = useState("Loading");
    const [postsList, setPostsList] = useState([]);

    function checkIfPostsListIsEmpty() {
        if (postsList === []) setStatusMessage("Nenhum post encontrado");
        else setStatusMessage("OK");
    }

    useEffect(() => {
        getPostsList("2b19cbc1-856a-4d00-9666-2676d198c4bd")
            .then(res => {
                setPostsList(res.data.posts);
                checkIfPostsListIsEmpty();
            })
            .catch(err => {
                setStatusMessage(
                    "Houve uma falha ao obter os posts, por favor atualize a página"
                );
            });
    }, []);

    return (
        <Content>
            <Heading>timeline</Heading>
            {statusMessage === "OK" ? (
                postsList.map(post => (
                    <Post
                        key={post.id}
                        text={post.text}
                        link={post.link}
                        linkTitle={post.linkTitle}
                        linkDescription={post.linkDescription}
                        linkImage={post.linkImage}
                        userId={post.user.id}
                        username={post.user.username}
                        avatar={post.user.avatar}
                        likes={post.likes.length}
                    ></Post>
                ))
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
