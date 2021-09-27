import { useContext, useEffect, useState } from "react";
import { getMyLikes } from "../services/api.services";
import Post from "./Post";
import { Content, Heading } from "../styles/MainPage";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import TrendingHashtag from "./Trending";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";

export default function MyLikes() {
    const [statusMessage, setStatusMessage] = useState("Loading");
    const [myPostsList, setMyPostsList] = useState([]);
    const { token, user } = useContext(UserContext);

    useEffect(() => {
        getMyLikes(token, user)
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
            <Heading>my likes</Heading>
            <div className="posts">
                <div>
                {myPostsList.length ? (
                    myPostsList.map(post => (
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