import { useContext, useEffect, useState } from "react";
import { getPostsList, getFollowingList } from "../services/api.services";
import Post from "./Post";
import { Content, Heading } from "../styles/MainPage";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import PublishPost from "./PublishPost";
import TrendingHashtag from "./Trending";
import useInterval from "react-useinterval";
import Loading from "./Loading";

export default function Timeline() {
    const [statusMessage, setStatusMessage] = useState("Loading");
    const [postsList, setPostsList] = useState([]);
    const { token } = useContext(UserContext);

    function refresh() {
        getFollowingList(token).then(res => {
            if (!res.data.users[0]) {
                setStatusMessage(
                    "você não segue ninguém ainda, procure por perfis na busca"
                );
            } else {
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
            }
        });
    }

    function setRepostedBy(post) {
        if (post.repostedBy) {
            return {
                repostUserId: post.repostedBy.id,
                repostUsername: post.repostedBy.username,
            };
        } else return { repostUserId: "", repostUsername: "" };
    }

    useEffect(refresh, []);
    useInterval(refresh, 15000);

    return (
        <Content>
            <Heading>timeline</Heading>
            <div className="posts">
                <div>
                    <PublishPost />
                    {postsList.length ? (
                        postsList.map(post => (
                            <Post
                                key={post.id}
                                post={post}
                                repostedBy={setRepostedBy(post)}
                            ></Post>
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

const Message = styled.p`
    color: #fff;
    font-weight: 700;
    font-family: "Oswald", sans-serif;
    font-size: 36px;
`;
