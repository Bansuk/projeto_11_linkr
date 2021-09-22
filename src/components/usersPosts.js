import { useContext, useEffect, useState } from "react";
import { getMyPostsList,seeFollowersUsers,followUser } from "../services/api.services";
import Post from "./Post";
import { Content, Heading } from "../styles/MainPage";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import { useParams } from "react-router-dom";
import TrendingHashtag from "./Trending";

export default function UsersPosts() {
    const [statusMessage, setStatusMessage] = useState("Loading");
    const [myPostsList, setMyPostsList] = useState([]);
    const [targetUser, setTargetUser] = useState('')
    const { token, user } = useContext(UserContext);
    const [ button, setButton]= useState("Follow");
    const [ followersUsers, setFollowersUsers] = useState([])
    const userId = {
        id: useParams().id
    }
    console.log("a")

    useEffect(() => {
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

    useEffect(() => {
        seeFollowersUsers(token)
        .then(resp => {
            setFollowersUsers(resp.data.users)
            let x=followersUsers.find(({id})=> id === userId.id);
            console.log(x)
        })
    }, [token])

    function followUnfollow(){
        if (button === "Follow"){
            setButton("Carregando...")
            followUser(token,userId)
            .then(setButton("Unfollow"))
            .catch(alert("Não Foi possível seguir o usuário"))
        }else {
            setButton("Carregando...")
            followUser(token,userId)
            .then(setButton("Follow"))
            .catch(alert("Não Foi possível seguir o usuário"))
        }
    }

    return (
        <Content>
                <HeadingFollow>
                    <Heading>{`${targetUser}'s posts`}</Heading>
                    {button==="Carregando..." ? (
                        <FollowButton >{`${button}`}</FollowButton>
                    ):(
                        <FollowButton onClick={followUnfollow}>{`${button}`}</FollowButton>
                    )}
                </HeadingFollow>
            <div className="posts"> 
                    <div>
                    {myPostsList && myPostsList[0] ? (
                        myPostsList.map(post => <Post key={post.id} post={post}></Post>)
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
const FollowButton = styled.button`
background-color: #1877F2;
width: 112px;
height: 31px;
`;
const HeadingFollow = styled.div`
display: flex;
justify-content: space-between;
`;