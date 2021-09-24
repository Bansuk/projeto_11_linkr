import styled from "styled-components";

export default function Comment({
    comment: {
        text,
        user: { id, username, avatar },
    },
}) {
    return (
        <Container>
            <Content>
                <img src={avatar} alt="Imagem de perfil do usuário." />
                <div>
                    <span className={"comment__user"}>{username}</span>
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
        border-radius: 26px;
        width: 39px;
    }

    & div {
        margin-left: 20px;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        border-bottom: none;

        & .comment__user {
            color: #f3f3f3;
            font-weight: 700;
            margin-bottom: 5px;
        }

        & .comment__text {
            color: #acacac;
        }
    }
`;
