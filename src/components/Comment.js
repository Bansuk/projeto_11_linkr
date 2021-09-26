import { useState } from "react";
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
    const [following, setFollowing] = useState([]);

    getFollowingList(token)
        .then(res => setFollowing(res.data.users))
        .catch(err =>
            alert("Não foi possível obter a lista de usuários que você segue!")
        );

    function authorAdditionalInfo() {
        if (id === authorId) return " • posts's author";

        const numberFollowers = following.filter(e => e.id === id).length;
        if (numberFollowers) return " • following";
    }

    return (
        <Container>
            <Content>
                <img src={avatar} alt="Imagem de perfil do usuário." />
                <div>
                    <span className={"comment__user"}>
                        {username}
                        <span className={"comment__info"}>
                            {authorAdditionalInfo()}
                        </span>
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
            overflow-wrap: break-word;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            hyphens: auto;
            max-width: 645px;
            color: #acacac;
        }
        & .comment__user {
            color: #f3f3f3;
            font-weight: 700;
            margin-bottom: 5px;
        }

        & .comment__info {
            color: #565656;
        }
    }
`;
