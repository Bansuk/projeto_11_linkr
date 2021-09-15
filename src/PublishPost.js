import {ButtonPublishPost, SecondInputPublishPost, FirstInputPublishPost, SpanPublishPost, InfoPublishPost,
    StyledProfileImg, CardPublishPost} from "./Styles/PublishPost"
import { useState, useEffect } from 'react';
import axios from "axios";
export default function PublishPost(){
    const[link, setLink] = useState("")
    const[text,setText]= useState("")
    const[button, setButton]= useState(true)
    const[mock, setMock] = useState("")
    
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
        setButton(false);
        const config = {
            headers: {
                "Authorization": `Bearer ${mock.token}`
            }
        }
        axios("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts",config)
        .then(response => console.log(response.data))
        .catch(error => alert("Houve um erro ao publicar seu link"))
    }
    
    if(mock===""){
        return(
            <div>Carregando</div>
        )
    }
    return(
        <CardPublishPost>
            <StyledProfileImg src={mock.user.avatar}/>
            <InfoPublishPost onSubmit={publishContent}>
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
