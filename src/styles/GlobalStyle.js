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
        top:20%;
        left:50%;
        height: 500px;
        width: 595px;

        & iframe{
            width:500px;
            height:500px;
        }
    }

`;

export default GlobalStyle;
