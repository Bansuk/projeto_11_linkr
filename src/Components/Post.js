import styled from "styled-components";
import logo from "../Components/unnamed.jpg";
import a from "../Components/image 4.png";
import { FaRegHeart } from "react-icons/fa";

export default function Post() {
    return (
        <Content>
            <InnerContent>
                <InteractionColumn>
                    <img src={logo} alt="Foto de perfil do usuario" />
                    <FaRegHeart />
                    <span>13 likes</span>
                </InteractionColumn>
                <LinkColumn>
                    <span className={"post__author"}>Josenal Juvencio</span>
                    <p className={"post__text"}>
                        Muito maneiro esse tutorial de Material UI com React,
                        deem uma olhada! #react #material
                    </p>
                    <Snippet>
                        <div>
                            <h1>
                                Como aplicar o Material UI em um projeto React
                                sadasdsadasddsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                            </h1>
                            <p>
                                Hey! I have moved this tutorial to my personal
                                blog. Same content, new location. Sorry about
                                making you click through to another page.
                            </p>
                            <span>
                                https://medium.com/@pshrmn/a-simple-react-router
                            </span>
                        </div>
                        <img src={a} alt="" />
                    </Snippet>
                </LinkColumn>
            </InnerContent>
        </Content>
    );
}

const Content = styled.div`
    align-items: center;
    background-color: #171717;
    border-radius: 16px;
    display: flex;
    height: 276px;
    justify-content: center;
    max-width: 611px;
    min-width: 375px;
    width: calc(100% - 611px);
`;

const InnerContent = styled.div`
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    display: flex;
`;

const InteractionColumn = styled.div`
    align-items: center;
    color: #fff;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 9.5%;

    & img {
        max-height: 50px;
        min-height: 40px;
        max-width: 50px;
        min-width: 50px;
        height: 50px;
        width: 50px;
        border-radius: 26px;
        margin-bottom: 20px;
    }

    & span {
        font-size: 11px;
    }
`;

const LinkColumn = styled.div`
    width: 100%;
    margin-left: 20px;
    word-wrap: break-word;

    & .post__author {
        font-size: 19px;
        color: #fff;
    }

    & .post__text {
        font-size: 19px;
        color: #b7b7b7;
        margin: 5px 0 5px 0;
    }
`;

const Snippet = styled.div`
    height: 170px;
    border: 1px solid #4d4d4d;
    box-sizing: border-box;
    border-radius: 11px;
    display: flex;
    color: #cecece;
    font-size: 11px;
    word-wrap: break-word;
    width: 90%;
    background-color: blue;

    & div {
        margin: 23px 20px;
        word-wrap: break-word;
        background-color: red;
        width: 350px;
    }

    & h1 {
        font-size: 16px;
        word-wrap: break-word;
    }

    & p {
        color: #9b9595;
        margin: 5px 0 13px 0;
    }

    & img {
        border-radius: 0px 12px 13px 0px;
        width: 153px;
    }
`;
