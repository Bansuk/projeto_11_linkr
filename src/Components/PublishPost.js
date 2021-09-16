import {ButtonPublishPost, SecondInputPublishPost, FirstInputPublishPost, SpanPublishPost, InfoPublishPost,
    StyledProfileImg, CardPublishPost} from "../Styles/PublishPostStyle"
import { useState} from 'react';
import axios from "axios";
export default function PublishPost(){
    const[link, setLink] = useState("")
    const[text,setText]= useState("")
    const[button, setButton]= useState(true)

    function publishContent(){
        setButton(false);
        const config = {
            headers: {
                "Authorization": `Bearer ${"2b19cbc1-856a-4d00-9666-2676d198c4bd"}`
            }
        }
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts",config)
        .then(response => console.log(response))
        .catch(() => alert("Houve um erro ao publicar seu link"))
    }
    
    return(
        <CardPublishPost>
            <StyledProfileImg />
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
