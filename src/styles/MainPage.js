import styled from "styled-components";

const Content = styled.div`
    margin: 125px 588px 0 241px;

    @media (max-width: 800px) {
        margin: 90px 0 0 0;
    }
`;

const Heading = styled.h1`
    color: #fff;
    font-weight: 700;
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    margin-bottom: 40px;

    @media (max-width: 800px) {
        margin-left: 15px;
    }
`;

export { Content, Heading };
