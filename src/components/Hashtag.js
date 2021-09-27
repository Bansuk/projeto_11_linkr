import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/userContext";
import { Content, Heading } from "../styles/MainPage";
import { getHashtagPostsList, getMorePostsHashtagsList} from '../services/api.services';
import Post from "./Post";
import styled from 'styled-components';
import TrendingHashtag from './Trending';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";
import Loading from "./Loading";

export default function Hashtag(){
const [statusMessage, setStatusMessage] = useState("Loading");
const [postsList, setPostsList] = useState([]);
const { token } = useContext(UserContext);
const { idHashtag } = useParams();
const [lastId, setLastId] = useState("")
const [hasMorePosts, setHasMorePosts] = useState(true)


    useEffect(() => {
        getHashtagPostsList(token, idHashtag)
            .then(res => {
                setPostsList(res.data.posts);
                setStatusMessage("Nenhum post encontrado");
            })
            .catch(err => {
                setStatusMessage(
                    "Houve uma falha ao obter os posts, por favor atualize a página"
                );
            });
    }, [idHashtag, token]);

useEffect(() => {
    getHashtagPostsList(token, idHashtag)
        .then(res => {
            setPostsList(res.data.posts);
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
}, [idHashtag,token]);

function postsInfiniteScroll() {
    getMorePostsHashtagsList(token,lastId,idHashtag)
    .then(res => {
        setLastId(res.data.posts[res.data.posts.length-1].id)
        setPostsList([...postsList, ...res.data.posts])
        console.log(res.data.posts.length)
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
            <div className="posts">
                <div>

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
                    {idHashtag.length <= 10 ? (
                        <Heading>#{idHashtag}</Heading>
                    ) : (
                        <Heading>#{idHashtag.substring(0, 7)}...</Heading>
                    )}
                    {postsList.length ? (postsList.map(post => (
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
