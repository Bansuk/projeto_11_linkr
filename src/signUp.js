import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUp(){
    

    return (
        <SignUpContainer>
            <LogoContainer>
                <h1>linkr</h1>
                <p>save, share and discover
                the best links on the web</p>
            </LogoContainer>
            <FormContainer>
                <InputWrapper>
                    <input type='email' placeholder='e-mail'></input>
                    <input type='password' placeholder='password'></input>
                    <input type='text' placeholder='username'></input>
                    <input type='url' placeholder='picture url'></input>
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
    
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */

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