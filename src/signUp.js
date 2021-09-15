import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUp(){
    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        username: '',
        pictureUrl: ''
    })
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function register(e){
        e.preventDefault();
        setLoading(true)
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up', newUser)
            .then((resp) => history.push('/'))
            .catch((err) => {
                    alert('O e-mail inserido já está cadastrado!');
                    setLoading(false);    
            })
    }

    return (
        <MainContainer>
            <LogoContainer>
                <h1>linkr</h1>
                <p>save, share and discover
                the best links on the web</p>
            </LogoContainer>
            <FormContainer>
                <InputWrapper onSubmit={register}>
                    <input type='email' placeholder='e-mail' value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})} required ></input>
                    <input type='password' placeholder='password' value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} required ></input>
                    <input type='text' placeholder='username'
                    value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} required ></input>
                    <input type='url' placeholder='picture url'
                    value={newUser.pictureUrl} onChange={(e) => setNewUser({...newUser, pictureUrl: e.target.value})} required ></input>
                    <button type='submit' disabled={loading}>Sign Up</button>
                </InputWrapper>
                <Anchor to='/'>
                    <span>Switch back to log in</span>
                </Anchor>
            </FormContainer>
        </MainContainer>
    );
}

const MainContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    @media(max-width: 900px){
        flex-direction: column;
    }
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

    @media(max-width: 900px){
        width: 100vw;
        height: 25vh;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
       
        
        h1{
            font-size: 76px;
        }

        p{
            font-size: 23px;
            text-align: justify;
        }
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

    @media(max-width: 900px){
        width: 100vw;
        height: 75vh;
    }
`

const InputWrapper = styled.form`
    width: 85%;

    input{
        width: 100%;
        height: 18%;
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
    margin-top: 20px;
`

export {
    MainContainer,
    LogoContainer,
    FormContainer,
    InputWrapper,
    Anchor,
}