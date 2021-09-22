import { useContext, useEffect, useState } from "react";
import { getMyPostsList,seeFollowersUsers,followUser, unfollowUser } from "../services/api.services";
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
    const [ button, setButton]= useState("Carregando...");
    const [ followersUsers, setFollowersUsers] = useState([])
    const userId = {
        id: useParams().id
    }

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
            seeFollowersUsers(token)
            .then(resp =>{
                if(resp.data.users.find(({id})=> id === Number(userId.id))){
                    setButton("Unfollow")
                }else{
                    setButton("Follow")
                }
            })
    }, [token]);
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
const y="FollowButton onClick={followUnfollow}>UnFollow</FollowButton>"
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


& div{
    width: 112px;
    height: 31px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    cursor: pointer;
}
& .Follow{
    background-color: #1877F2;
    color: #FFFFFF;
    
}
& .Unfollow{
    color: #1877F2;
}
`;