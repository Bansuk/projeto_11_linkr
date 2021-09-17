import styled from "styled-components";

const Container = styled.div`
    align-items: center;
    background-color: #151515;
    display: flex;
    height: 72px;
    justify-content: space-between;
    left: 0;
    padding: 0 20px 0 20px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;

    & h1 {
        font-size: 49px;
        color: #fff;
        font-family: "Passion One", cursive;
    }

    .topbar__icon {
        color: #fff;
        font-size: 3em;
    }

    & img {
        border-radius: 26px;
        width: 50px;
        height: 50px;
        margin-left: 5px;
    }

    @media (max-width: 800px) {
        & .topbar__icon {
            font-size: 2.5em;
        }
        & img {
            width: 44px;
            height: 44px;
        }
    }
`;

const Menu = styled.div`
    align-items: center;
    background-color: #171717;
    border-radius: 0px 0px 0px 20px;
    color: #fff;
    display: flex;
    flex-direction: column;
    font-family: "Lato", sans-serif;
    font-size: 17px;
    font-weight: 700;
    height: 120px;
    justify-content: space-evenly;
    margin-top: 170px;
    position: absolute;
    right: 0;
    width: 120px;
`;

export { Container, Menu };
