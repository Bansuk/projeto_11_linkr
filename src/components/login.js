<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> 820f21fd70e2de1c727e1cc6b4adfbb07d0e9ebf
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { MainContainer, LogoContainer, FormContainer, InputWrapper, Anchor } from './signUp'
import { signInUser } from "../services/api.services";


<<<<<<< HEAD
export default function Login({setUser}){
=======
export default function Login({setUser, isAuth}){
>>>>>>> 820f21fd70e2de1c727e1cc6b4adfbb07d0e9ebf
    const [loading, setLoading] = useState(false);
    const [logUser, setLogUser] = useState({
        email: '',
        password: ''
    })
    const history = useHistory();
<<<<<<< HEAD
=======
    let persistUser = {};

    useEffect(() => {
        if(isAuth){
            history.push('/timeline');
        }
    }, [])
    
>>>>>>> 820f21fd70e2de1c727e1cc6b4adfbb07d0e9ebf

    function signIn(e){
        e.preventDefault();
        setLoading(true);

        signInUser(logUser)
            .then((resp) => {
                setUser({...resp.data});
<<<<<<< HEAD
=======
                persistUser = JSON.stringify(resp.data);
                localStorage.setItem('user', persistUser);
>>>>>>> 820f21fd70e2de1c727e1cc6b4adfbb07d0e9ebf
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