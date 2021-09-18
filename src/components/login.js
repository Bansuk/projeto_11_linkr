import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { MainContainer, LogoContainer, FormContainer, InputWrapper, Anchor } from './signUp'
import { signInUser } from "../services/api.services";


export default function Login({setUser}){
    const [loading, setLoading] = useState(false);
    const [logUser, setLogUser] = useState({
        email: '',
        password: ''
    })
    const history = useHistory();
    let persistUser = {};

    useEffect(() => {
        let loggedUser = localStorage.getItem('user');
        loggedUser = JSON.parse(loggedUser);
        
        if(loggedUser && loggedUser.token){
            setUser({...loggedUser})
            history.push('/timeline');
        }
    }, [])
    

    function signIn(e){
        e.preventDefault();
        setLoading(true);

        signInUser(logUser)
            .then((resp) => {
                setUser({...resp.data});
                persistUser = JSON.stringify(resp.data);
                localStorage.setItem('user', persistUser);
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
                    <input type='email' placeholder='e-mail' value={logUser.email}
                    onChange={(e) => setLogUser({...logUser, email: e.target.value})} required ></input>

                    <input type='password' placeholder='password' value={logUser.password} onChange={(e) => setLogUser({...logUser, password: e.target.value})} required ></input>
                    
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