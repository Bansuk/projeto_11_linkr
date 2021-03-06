import { useContext, useEffect, useState } from "react";
import { getMyPostsList, getMoreMyPostsList } from "../services/api.services";
import Post from "./Post";
import { Content, Heading } from "../styles/MainPage";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import TrendingHashtag from "./Trending";
import Loader from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";

export default function MyPosts() {
    const [statusMessage, setStatusMessage] = useState("Loading");
    const [myPostsList, setMyPostsList] = useState([]);
    const { token, user } = useContext(UserContext);
    const [lastId, setLastId] = useState("")
    const [hasMorePosts, setHasMorePosts] = useState(true)

    useEffect(() => {
        getMyPostsList(token, user)
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
        getMoreMyPostsList(token, user ,lastId)
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
            <Heading>my posts</Heading>
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
                {myPostsList && myPostsList[0] ? (
                        myPostsList.map(post => (
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
