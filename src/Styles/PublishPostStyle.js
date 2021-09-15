import styled from "styled-components";


const CardPublishPost = styled.div`
    border-radius: 16px;
	width: 611px;
	height: 209px;
	background: #FFFFFF;
    display:flex;
    box-sizing:border-box;
    padding:16px;
    box-shadow: 0px 4px 4px 0px #00000040;
`;
const StyledProfileImg = styled.img`
margin-right:18px;
width:50px;
height:50px;
border-radius:26.5px;
`;
const InfoPublishPost = styled.form`
display: flex;
justify-content: space-between;
flex-direction: column;
width:82%
`;
const SpanPublishPost = styled.span`
font-size:20px
color: #707070;
font-weight:300
`;
const FirstInputPublishPost = styled.input`
width:503px;
height:30px;
`;
const SecondInputPublishPost = styled.input`
width:503px;
height:66px;
`;
const ButtonPublishPost = styled.button`
width:112px;
height:31px;
background-color: #1877F2;
color: #FFFFFF;
border-radius:5px;
margin: 0px 0px 0px 390px;
`;

export {ButtonPublishPost, SecondInputPublishPost, FirstInputPublishPost, SpanPublishPost, InfoPublishPost,
StyledProfileImg, CardPublishPost}