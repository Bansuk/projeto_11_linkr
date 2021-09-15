import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUp(){
    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        username: '',
        pictureUrl: ''
    })

    function register(e){
        e.preventDefault();
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up', newUser)
            .then((resp) => console.log(resp.data))
    }

    return (
        <SignUpContainer>
            <LogoContainer>
                <h1>linkr</h1>
                <p>save, share and discover
                the best links on the web</p>
            </LogoContainer>
            <FormContainer>
                <InputWrapper onSubmit={register}>
                    <input type='email' placeholder='e-mail' value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}></input>
                    <input type='password' placeholder='password' value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} ></input>
                    <input type='text' placeholder='username'
                    value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} ></input>
                    <input type='url' placeholder='picture url'
                    value={newUser.pictureUrl} onChange={(e) => setNewUser({...newUser, pictureUrl: e.target.value})} ></input>
                    <button type='submit'>Sign Up</button>
                </InputWrapper>
                <Anchor to='/'>
                    <span>Switch back to log in</span>
                </Anchor>
            </FormContainer>
        </SignUpContainer>
    );
}

const SignUpContainer = styled.div`
    display: flex;
`

const LogoContainer = styled.div`
    background-color: #151515;
    color: white;
    width: 66vw;
    height: 100vh;
    padding: 10%;

    h1{
        font-family: 'Passion One', cursive;
        font-size: 106px;
    }

    p{
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        font-weight: bold;
        width: 70%;
    }
`

const FormContainer = styled.div`
    background-color: #333333;
    width: 34vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const InputWrapper = styled.form`
    width: 85%;

    input{
        width: 100%;
        height: 65px;
        margin-bottom: 13px;
        border: none;
        outline: none;
        border-radius: 6px;
        padding: 12px 17px;
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        font-weight: bold;
    }

    button{
        width: 100%;
        background-color: #1877F2;
        color: white;
        border: none;
        outline: none;
        border-radius: 6px;
        height: 65px;
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        font-weight: bold;
        margin-bottom: 14px;
    }
`

const Anchor = styled(Link)`
    color: white;
    font-size: 20px;
`