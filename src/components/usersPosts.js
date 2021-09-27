import { useContext, useEffect, useState } from "react";
import {
    getMyPostsList,
    seeFollowersUsers,
    followUser,
    unfollowUser,
    getUserInfo,
    getMoreMyPostsList
} from "../services/api.services";
import Post from "./Post";
import { Content, Heading } from "../styles/MainPage";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import { useParams } from "react-router-dom";
import TrendingHashtag from "./Trending";
import Loader from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";

export default function UsersPosts() {
    const [statusMessage, setStatusMessage] = useState("Loading");
    const [myPostsList, setMyPostsList] = useState([]);
    const [targetUser, setTargetUser] = useState('')
    const { token } = useContext(UserContext);
    const [ button, setButton]= useState("Carregando...");
    const [ followersUsers, setFollowersUsers] = useState([])
    const [lastId, setLastId] = useState("")
    const [hasMorePosts, setHasMorePosts] = useState(true)
    const userId = {
        id: useParams().id
    }

    useEffect(() => {
        getUserInfo(token, userId)
            .then((res) => setTargetUser(res.data.user.username))

        getMyPostsList(token, userId)
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
            seeFollowersUsers(token)
            .then(resp =>{
                if(resp.data.users.find(({id})=> id === Number(userId.id))){
                    setButton("Unfollow")
                }else{
                    setButton("Follow")
                }
            })
        }, [token])

        function postsInfiniteScroll() {
            getMoreMyPostsList(token, userId ,lastId)
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

        function followUnfollow(){
            if (button === "Follow"){
                setButton("Carregando...")
                followUser(token,userId)
                .then(resp => {
                    setButton("Unfollow")
                })
                .catch(err =>{
                    alert("Não Foi possível seguir o usuário")
                    setButton("Follow")
                })
            }else {
                setButton("Carregando...")
                unfollowUser(token,userId)
                .then(resp => {
                    setButton("Follow")
                })
                .catch(err =>{
                    alert("Não Foi possível deixar de seguir o usuário")
                    setButton("Unfollow")
                })
            }
        }
    

    return (
        <Content>
                    <HeadingFollow>
                        <Heading>{`${targetUser}'s posts`}</Heading>
                        {button==="Carregando..." ? (
                            <div> Carregando...</div>
                        ):(
                            <div className={`${button}`}onClick={followUnfollow}>{`${button}`}</div>
                        )}
                    </HeadingFollow>
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
                        {myPostsList[0] ? (
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
const HeadingFollow = styled.div`
    display: flex;
    justify-content: space-between;
    & div{
    width: 112px;
    height: 31px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    font-size: 14px;
    font-weight:700;
    :hover{
        cursor: pointer;
    }
}
& .Follow{
    background-color: #1877F2;
    color: #FFFFFF;
}
& .Unfollow{
    color: #1877F2;
}
`;