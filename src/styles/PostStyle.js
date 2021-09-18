import styled from "styled-components";

const Content = styled.div`
    align-items: center;
    background-color: #171717;
    border-radius: 16px;
    display: flex;
    height: 276px;
    justify-content: center;
    width: 800px;
    margin-bottom: 15px;
    font-family: "Lato", sans-serif;
    

    @media (max-width: 900px) {
        border-radius: 0;
        width: 100%;
        max-width: none;
    }
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
        height: 50px;
        width: 50px;
        border-radius: 26px;
        margin-bottom: 20px;

        :hover {
            cursor: pointer;
        }
    }

    & span {
        font-size: 11px;
    }
`;

const LinkColumn = styled.div`
    width: 90vw;
    margin-left: 20px;
    word-wrap: break-word;
    overflow: hidden;

    & .post__author {
        font-size: 19px;
        color: #fff;
    }

    & .post__text {
        font-size: 19px;
        color: #b7b7b7;
        margin: 5px 0 5px 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        max-width: 90%;
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
    width: 100%;
    margin-top: 10px;

    & div {
        margin: 23px 20px;
        width: 70%;
    }

    & h1 {
        font-size: 16px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-word;
    }

    & p {
        color: #9b9595;
        margin: 5px 0 13px 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    & img {
        border-radius: 0px 12px 13px 0px;
        width: calc(70% - 220px);
        object-fit: cover;
        min-width: 130px;
    }

    & span {
        word-break: break-word;
    }
    :hover {
        cursor: pointer;
    }
`;

const Hashtag = styled.span`
    color: #fff;
    font-weight: 700;
`;

export {
    Content,
    InnerContent,
    InteractionColumn,
    LinkColumn,
    Snippet,
    Hashtag,
};
