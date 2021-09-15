import { useEffect, useState } from "react";
import styled from "styled-components";
import { getHashtagsList } from "../Services/api.services"
export default function TrendingHashtag(){
    const [hashtagsList, setHashtagsList]= useState([]);
    console.log(hashtagsList)

    useEffect(() => {
        getHashtagsList("2b19cbc1-856a-4d00-9666-2676d198c4bd")
        .then(response =>{
            setHashtagsList(response.data)
        })
    },[])
    return(
        <CardTrendingHashtag>
            <Trending>trending</Trending>
            <Divider></Divider>
        </CardTrendingHashtag>
    )
}

const CardTrendingHashtag = styled.div`
    border-radius: 16px;
	width: 301px;
	height: 406px;
	background: #171717;
    display:flex;
    flex-direction: column;
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