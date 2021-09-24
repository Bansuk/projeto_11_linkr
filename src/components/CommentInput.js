import styled from "styled-components";
import { FiSend } from "react-icons/fi";
import { useState } from "react";
import { publishComment } from "../services/api.services";

export default function CommentInput({ token, postId, avatar }) {
    const [comment, setComment] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    function saveComment() {
        setIsDisabled(true);
        publishComment(token, postId, { text: comment })
            .then(res => {
                setTimeout(() => {
                    setIsDisabled(false);
                }, 3000);
            })
            .catch(err => {
                alert("Não foi possível publicar o comentário!");
                setIsDisabled(false);
            });
    }

    return (
        <Container>
            <Content>
                <img src={avatar} alt="Imagem de perfil do usuário." />
                <input
                    type="text"
                    placeholder={"write a comment..."}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    disabled={isDisabled}
                ></input>
                <FiSend
                    className={"comment__button"}
                    onClick={() => saveComment()}
                />
            </Content>
        </Container>
    );
}

const Container = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 45px;
`;

const Content = styled.div`
    width: 88%;
    display: flex;
    align-items: center;
    height: 70px;
    position: relative;

    & img {
        border-radius: 50%;
        width: 39px;
        height: 39px;
    }

    & input {
        margin-left: 15px;
        background-color: #252525;
        border-radius: 8px;
        border: none;
        height: 40px;
        width: 100%;
        color: #fff;

        ::placeholder {
            color: #575757;
            font-size: 14px;
            font-style: italic;
            padding-left: 15px;
        }
    }

    & .comment__button {
        color: #fff;
        position: absolute;
        right: 15px;

        :hover {
            cursor: pointer;
        }
    }
`;
