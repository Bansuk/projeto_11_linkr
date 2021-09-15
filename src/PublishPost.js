import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from "axios";
export default function PublishPost(){
    const[link, setLink] = useState("")
    const[text,setText]= useState("")
    const[mock, setMock] = useState({})
    console.log(mock)
    
    useEffect((() => {
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in",{
            email:"teste213@gmail.com",
            password:"teste213"
        })
        .then(response => {
            setMock(response.data);
        })
    }),[])

    function publishContent(){
        
    }
    

    return(
        <CardPublishPost>
            <StyledProfileImg src={mock.user.avatar}/>
            <InfoPublishPost>
                <SpanPublishPost>O que vocẽ tem para favoritar hoje?</SpanPublishPost>
                <FirstInputPublishPost 
                type="url" 
                placeholder="https://" 
                value={link} 
                onChange={e => setLink(e.target.value)}
                />
                <SecondInputPublishPost 
                type="text" 
                placeholder="Muito irado esse link falando de #javascript" 
                value={text}
                onChange={e=> setText(e.target.value)}
                />
                <ButtonPublishPost onClick={publishContent}>Publicar</ButtonPublishPost>
            </InfoPublishPost>
        </CardPublishPost>
    )
}

const CardPublishPost = styled.div`
    border-radius: 16px;
	width: 611px;
	height: 209px;
	background: red;
    display:flex;
    box-sizing:border-box;
    padding:16px;
    box-shadow: 0px 4px 4px 0px #00000040;
`;
const StyledProfileImg = styled.img`
margin-right:18px;
width:50px;
height:50px;
border-radius:26.5px;
`;
const InfoPublishPost = styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;
width:82%
`;
const SpanPublishPost = styled.span`
font-size:20px
color: #707070;
font-weight:300
`;
const FirstInputPublishPost = styled.input`
width:503px;
height:30px;
`;
const SecondInputPublishPost = styled.input`
width:503px;
height:66px;
`;
const ButtonPublishPost = styled.button`
width:112px;
height:31px;
background-color: #1877F2;
color: #FFFFFF;
border-radius:5px;
margin: 0px 0px 0px 390px;
`;