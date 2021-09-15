import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { MainContainer, LogoContainer, FormContainer, InputWrapper, Anchor } from "./signUp";


export default function Login({user, setUser}){
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function signIn(e){
        e.preventDefault();
        setLoading(true);

        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in', user)
            .then((resp) => {
                setUser({...resp.data});
                history.push('/timeline');
            })
            .catch((err) => {
                setLoading(false);
                alert('Usuário ou senha estão incorretos!');
            })
        
    }

    return(
        <MainContainer>
            <LogoContainer>
                <h1>linkr</h1>
                <p>save, share and discover
                the best links on the web</p>
            </LogoContainer>
            <FormContainer>
                <Inputs onSubmit={signIn}>
                    <input type='email' placeholder='e-mail' value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})} required ></input>
                    <input type='password' placeholder='password' value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} required ></input>
                    <button type='submit' disabled={loading}>Log in</button>
                </Inputs>
                <Anchor to='/sign-up'>
                    <span>First time? Create an account!</span>
                </Anchor>
            </FormContainer>
        </MainContainer>
    );
}

const Inputs = styled(InputWrapper)`
    input{
        height: 60px;
    }
`