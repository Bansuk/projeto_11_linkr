import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body{
        background-color: #333;
    }
    .Modal{
        font-size: 34px;
        position: fixed;
        top:20%;
        left:50%;
        height: 260px;
        width: 595px;
        background-color: #333333;
        border-radius: 50px;
        transform: translate(-50%,0%);
        display: flex;
        flex-direction: column;

        &:focus{
            outline: none;
        }
    }
    .Modal h2{
        width: 360px;
        margin: 40px auto;
        font-weight: 700;
        color:#FFFFFF;
    }
    .modal-buttons button{
        width: 134px;
        height: 37px;
    }
    .modal-buttons button:first-child{
        background-color: #FFFFFF;
        color: #1877F2;
        margin: 0 27px 0 159px;
    }
    .modal-buttons button:nth-child(2){
        background-color: #1877F2;
        color: #FFFFFF;
    }
    .preview{
        position: fixed;
        top:50%;
        left:50%;
        height: 70%;
        width: 70%;
        transform: translate(-50%,-50%);
        background-color: #333333;
        border-radius: 20px;

        &:focus{
            outline: none;
        }

        & iframe{
            height: 90%;
            width: 95%;
            position: absolute;
            top:52.5%;
            left:50%;
            transform: translate(-50%,-50%);
        }
        & div{
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            height: 59px;
            padding: 25px;

            & button{
                width: 138px;
                height: 31px;
                font-weight: 700;
                font-size: 14px;
                background-color: #1877F2;
                color: #FFFFFF;
                border-radius: 5px;

                :hover{
                    cursor: pointer;
                }
            }
        }

        & h1{
            font-family: Oswald;
            font-weight: bold;
            font-size: 38px;
            color: #fff;
        }

        & .map{
            height: 100%;
            width: 90%;
            position: absolute;
            top:65%;
            left:44.5%;
            transform: translate(-50%,-50%);
        }
    }

`;

export default GlobalStyle;
