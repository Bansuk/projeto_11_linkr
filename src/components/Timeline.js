import { useContext, useEffect, useState } from "react";
import { getPostsList, getFollowingList, getMorePostsList, getEarlierPostsList } from "../services/api.services";
import Post from "./Post";
import { Content, Heading } from "../styles/MainPage";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import PublishPost from "./PublishPost";
import TrendingHashtag from "./Trending";
import useInterval from "react-useinterval";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";
import Loading from "./Loading";

export default function Timeline() {
    const [statusMessage, setStatusMessage] = useState("Loading");
    const [postsList, setPostsList] = useState([]);
    const { token } = useContext(UserContext);
    const [lastId, setLastId] = useState("")
    const [firstId, setFirstId] = useState("")
    const [hasMorePosts, setHasMorePosts] = useState(true)

    useEffect(()=>{
        getPostsList(token)
        .then(res => {
            setPostsList(res.data.posts);
            setStatusMessage("Nenhum post encontrado");
            setLastId(res.data.posts[res.data.posts.length-1].id)
            setFirstId(res.data.posts[0].id)
            if(res.data.posts.length < 10){
                setHasMorePosts(false)
            }
        })
        .catch(err => {
            setStatusMessage(
                "Houve uma falha ao obter os posts, por favor atualize a página"
            );
        });  
    },[])

    function refresh() {
        getFollowingList(token).then(res => {
            if (!res.data.users[0]) {
                setStatusMessage(
                    "você não segue ninguém ainda, procure por perfis na busca"
                );
            } else {
                getEarlierPostsList(token,firstId)
                    .then(res => {
                        setPostsList([...res.data.posts, ...postsList]);
                        setStatusMessage("Nenhum post encontrado");
                        setLastId(res.data.posts[res.data.posts.length-1].id)
                    })
                    .catch(err => {
                        setStatusMessage(
                            "Houve uma falha ao obter os posts, por favor atualize a página"
                        );
                    });
            }
        });
    }
    function postsInfiniteScroll() {
        getMorePostsList(token,lastId)
        .then(res => {
            setLastId(res.data.posts[res.data.posts.length-1].id)
            setPostsList([...postsList, ...res.data.posts])
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

    useEffect(refresh, []);
    useInterval(refresh, 15000);

    return (
        <Content>
            <Heading>timeline</Heading>
            <div className="posts">
                <div>
                    <PublishPost />
                    {postsList.length ?  (
                    <InfiniteScroll
                    dataLength={postsList.length}
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
                        {postsList.map(post => (
                            <Post
                                key={post.id}
                                post={post}
                                repostedBy={setRepostedBy(post)}
                            ></Post>
                        ))}
                    </InfiniteScroll>
                    ) : (statusMessage !== "Loading" ? (
                        <Message>{statusMessage}</Message>
                        ) : (<Loading />) )
                    }
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
