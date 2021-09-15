import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import { useHistory } from "react-router";
import ReactHashtag from "react-hashtag";

export default function Post({
    text,
    link,
    linkTitle,
    linkDescription,
    linkImage,
    userId,
    username,
    avatar,
    likes,
}) {
    const history = useHistory();

    function redirectTo(path) {
        history.push(path);
    }

    return (
        <Content>
            <InnerContent>
                <InteractionColumn>
                    <img
                        src={avatar}
                        alt="Foto de perfil do usuario"
                        onClick={() => redirectTo(`/user/${userId}`)}
                    />
                    <FaRegHeart />
                    <span>{likes} likes</span>
                </InteractionColumn>
                <LinkColumn>
                    <span
                        className={"post__author"}
                        onClick={() => redirectTo(`/user/${userId}`)}
                    >
                        {username}
                    </span>
                    <p className={"post__text"}>
                        <ReactHashtag>{text}</ReactHashtag>
                    </p>
                    <Snippet onClick={() => window.open(link)}>
                        <div>
                            <h1>{linkTitle}</h1>
                            <p>{linkDescription}</p>
                            <span>{link}</span>
                        </div>
                        <img src={linkImage} alt="Imagem do post" />
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
    margin-bottom: 15px;
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

        :hover {
            cursor: pointer;
        }
    }

    & span {
        font-size: 11px;
    }
`;

const LinkColumn = styled.div`
    width: 90%;
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
    width: 92%;
    margin-top: 10px;

    & div {
        margin: 23px 20px;
        word-wrap: break-word;
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

    :hover {
        cursor: pointer;
    }
`;

const Hashtag = styled.span`
    color: green;
`;
