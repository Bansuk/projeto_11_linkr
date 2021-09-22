import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { getHashtagsList } from "../services/api.services"
import UserContext from "../contexts/userContext";
import HashtagList from "./HashtagList";
export default function TrendingHashtag(){
    const [hashtagsList, setHashtagsList]= useState("");
    const { token} = useContext(UserContext);
    
    useEffect(() => {
        getHashtagsList(token)
        .then(response =>{
            setHashtagsList(response.data.hashtags)
        })
    },[token])

    if(hashtagsList !== ""){
        return(
            <CardTrendingHashtag>
                <Trending>trending</Trending>
                <Divider></Divider>
                <ul>
                    {hashtagsList.map((hashtags) => <HashtagList key={hashtags.id} hashtag={hashtags.name}/>)}
                </ul>  
            </CardTrendingHashtag>
        )
    }return ("")
   
}



const CardTrendingHashtag = styled.section`
    border-radius: 16px;
	width: 301px;
	height: 406px;
	background: #171717;
    display:flex;
    flex-direction: column;
    position: sticky;
    margin-top: 80px;
    top: 100px;
    
    ul{
        margin: 22px 0 0 16px;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        height:72%;
    }

    @media(max-width: 900px){
        display:none;
    }
`;
const Divider = styled.div`
    width: 100%;
    height:1px;
    background-color: #484848;
`;
const Trending = styled.span`
    font-weight:700;
    font-family:Oswald;
    font-size:27px;
    color:#FFFFFF;
    margin: 10px 0px 12px 16px;
`;