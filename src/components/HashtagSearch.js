import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function HashtagSearch(){
    const [target, setTarget] = useState('');
    const history = useHistory();

    function search(e){
        e.preventDefault();
        history.push(`/hashtag/${target}`);
    }

    return(
        <InputContainer onSubmit={search}>
        <span>#</span>
        <input type='text'
        placeholder='type a hashtag' 
        onChange={(e) => setTarget(e.target.value)}
        value={target} />
        </InputContainer>
    );
}

const InputContainer = styled.form`
    width: 92%;
    height: 35px;
    background-color: #252525;
    margin: 15px auto;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;
    padding: 0 8px;

    input{
        background-color: inherit;
        border: none;
        outline: none;
        color: white;
    }
`