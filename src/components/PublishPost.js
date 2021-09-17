import styled from "styled-components";
import { useContext, useState } from 'react';
import axios from "axios";
import UserContext from "../contexts/userContext";
import { postNewPost } from "../services/api.services";

export default function PublishPost(){
    const[link, setLink] = useState("")
    const[text,setText]= useState("")
    const[button, setButton]= useState(true)
    const { user, token} = useContext(UserContext);
    let post = {link,text};
    console.log(post)
    function publishContent(){
        setButton(false);
        postNewPost(post,token)
        .then(response => {
            console.log("response")
            setButton(true)
        })
        .catch(() => {
            alert("Houve um erro ao publicar seu link")
            setButton(true)
        })
    }
    
    return(
        <CardPublishPost>
            <StyledProfileImg src={user.avatar}/>
            <InfoPublishPost onSubmit={publishContent, false}>
                    <SpanPublishPost>O que vocẽ tem para favoritar hoje?</SpanPublishPost>
                    <FirstInputPublishPost 
                    type="url" 
                    placeholder="https://" 
                    value={link} 
                    onChange={e => setLink(e.target.value)}
                    required
                    disabled={!button}
                    />
                    <SecondInputPublishPost 
                    type="text" 
                    placeholder="Muito irado esse link falando de #javascript" 
                    value={text}
                    onChange={e=> setText(e.target.value)}
                    disabled={!button}
                    />
                    {button ?
                        <ButtonPublishPost type="submit">Publicar</ButtonPublishPost>
                        :
                        <ButtonPublishPost>Publishing...</ButtonPublishPost>
                    }
                
            </InfoPublishPost>
        </CardPublishPost>
    )
}


const CardPublishPost = styled.div`
    max-width: 1000px;
    min-width: 400px;
    width: 100%;
    border-radius: 16px;
	height: 209px;
	background: #FFFFFF;
    display:flex;
    box-sizing:border-box;
    padding:16px;
    box-shadow: 0px 4px 4px 0px #00000040;
    margin-bottom: 15px;
`;
const StyledProfileImg = styled.img`
margin-right:18px;
width:50px;
height:50px;
border-radius:26.5px;
`;
const InfoPublishPost = styled.form`
display: flex;
justify-content: space-around;
flex-direction: column;
width:82%;
position: relative;
`;
const SpanPublishPost = styled.span`
font-size:20px
color: #707070;
font-weight:300
`;
const FirstInputPublishPost = styled.input`
height:30px;
`;
const SecondInputPublishPost = styled.input`
height:66px;
margin-bottom: 31px;
`;
const ButtonPublishPost = styled.button`
width:112px;
height:31px;
background-color: #1877F2;
color: #FFFFFF;
border-radius:5px;
position: absolute;
right:0px;
bottom:0px;
`;