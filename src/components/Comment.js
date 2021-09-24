import styled from "styled-components";
import { getFollowingList } from "../services/api.services";

export default function Comment({
    comment: {
        text,
        user: { id, username, avatar },
    },
    authorId,
    token,
}) {
    getFollowingList(token).then(res => console.log(res.data));
    return (
        <Container>
            <Content>
                <img src={avatar} alt="Imagem de perfil do usuário." />
                <div>
                    <span className={"comment__user"}>
                        {username}
                        {id === authorId ? " • posts's author" : ""}
                    </span>

                    <span className={"comment__text"}>{text}</span>
                </div>
            </Content>
            <div></div>
        </Container>
    );
}

const Container = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;

    & div {
        border-bottom: 1px solid #353535;
    }
`;

const Content = styled.div`
    width: 88%;
    display: flex;
    align-items: center;
    height: 70px;

    & img {
        border-radius: 50%;
        width: 39px;
        height: 39px;
    }

    & div {
        margin-left: 20px;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        border-bottom: none;

        & .comment__text {
            color: #acacac;
        }

        & .comment__text {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 650px;
        }
        & .comment__user {
            color: #f3f3f3;
            font-weight: 700;
            margin-bottom: 5px;
        }
    }
`;
