import { useContext, useEffect, useState } from "react";
import { getMyLikes, getMoreMyLikesPostsList } from "../services/api.services";
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
    const [lastId, setLastId] = useState("")
    const [hasMorePosts, setHasMorePosts] = useState(true)

    useEffect(() => {
        getMyLikes(token, user)
            .then(res => {
            setMyPostsList(res.data.posts);
            setStatusMessage("Nenhum post encontrado");
            setLastId(res.data.posts[res.data.posts.length-1].id)
            if(res.data.posts.length < 10){
                setHasMorePosts(false)
            }
            })
            .catch(err => {
                setStatusMessage(
                    "Houve uma falha ao obter os posts, por favor atualize a página"
                );
            });
    }, [token]);


    function postsInfiniteScroll() {
        getMoreMyLikesPostsList(token,lastId)
        .then(res => {
            setLastId(res.data.posts[res.data.posts.length-1].id)
            setMyPostsList([...myPostsList, ...res.data.posts])
            if(res.data.posts.length < 10){
                setHasMorePosts(false)
            }
            
        })
        .catch(err => {
            setStatusMessage(
                "Houve uma falha ao obter os posts, por favor atualize a página"
            );
        })
    }

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
                <InfiniteScroll
                    dataLength={myPostsList.length}
                    pageStart={0}
                    next={postsInfiniteScroll}
                    hasMore={hasMorePosts}
                    loader={
                        <div style={{ textAlign: 'center', color: '#6D6D6D' }}>
                            <Loader 
                                type="Oval" height={36} width={36} color="#6D6D6D"
                            />
                            <h4>Loading...</h4>
                        </div>}
                    endMessage={
                        <h5 style={{ textAlign: 'center' }}>
                          <b>Yay! Você já viu tudo!</b>
                        </h5>
                      }
                    >
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
                </InfiniteScroll>
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
