import styled from "styled-components";
import { useContext, useState } from "react";
import UserContext from "../contexts/userContext";
import { postNewPost } from "../services/api.services";
import { BiMap } from "react-icons/bi";

export default function PublishPost() {
    const [link, setLink] = useState("");
    const [text, setText] = useState("");
    const [button, setButton] = useState(true);
    const { user, token } = useContext(UserContext);
    const [isLocationActive, setIsLocationActive] = useState(false);
    let post = { link, text };
    function publishContent() {
        if (link === "") {
            alert("Favor preencher o link");
        } else {
            setButton(false);
            postNewPost(post, token)
                .then(response => {
                    setButton(true);
                    setLink("");
                    setText("");
                })
                .catch(() => {
                    alert("Houve um erro ao publicar seu link");
                    setButton(true);
                });
        }
    }

    return (
        <CardPublishPost>
            <StyledProfileImg src={user.avatar} />
            <InfoPublishPost>
                <SpanPublishPost>
                    O que você tem para favoritar hoje?
                </SpanPublishPost>
                <FirstInputPublishPost
                    type="url"
                    placeholder="https://"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    required
                    disabled={!button}
                />
                <SecondInputPublishPost
                    type="text"
                    placeholder="Muito irado esse link falando de #javascript"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    disabled={!button}
                />
                <LowerBarPublishPost
                    isLocationActive={isLocationActive}
                    onClick={() => {
                        setIsLocationActive(!isLocationActive);
                        navigator.geolocation.getCurrentPosition(() =>
                            alert("a")
                        );
                    }}
                >
                    <BiMap className={"publishpost__icon"} />
                    <span>
                        Localização{" "}
                        {isLocationActive ? "ativada" : "desativada"}
                    </span>
                </LowerBarPublishPost>
                {button ? (
                    <ButtonPublishPost onClick={publishContent}>
                        Publicar
                    </ButtonPublishPost>
                ) : (
                    <ButtonPublishPost>Publishing...</ButtonPublishPost>
                )}
            </InfoPublishPost>
        </CardPublishPost>
    );
}

const CardPublishPost = styled.div`
    max-width: 1000px;
    min-width: 400px;
    width: 100%;
    border-radius: 16px;
    height: 209px;
    background: #ffffff;
    display: flex;
    box-sizing: border-box;
    padding: 16px;
    box-shadow: 0px 4px 4px 0px #00000040;
    margin-bottom: 15px;
    @media (max-width: 900px) {
        border-radius: 0;
        width: 100%;
        max-width: none;
    }
`;
const StyledProfileImg = styled.img`
    margin: 0px 4.25% 0 4.25%;
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
`;
const InfoPublishPost = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    width: 82%;
    position: relative;
`;
const SpanPublishPost = styled.span`
    font-family: Lato, sans-serif;
    font-size: 20px;
    color: #707070;
    font-weight: 300;
`;
const FirstInputPublishPost = styled.input`
    height: 30px;
    border-radius: 5px;
    background-color: #efefef;
    border: inherit;
    ::placeholder {
        color: #949494;
    }
`;
const SecondInputPublishPost = styled.input`
    height: 66px;
    margin-bottom: 15px;
    border-radius: 5px;
    background-color: #efefef;
    border: inherit;

    ::placeholder {
        color: #949494;
    }
`;

const LowerBarPublishPost = styled.div`
    display: inherit;
    align-items: center;
    width: 25%;
    color: ${props => (props.isLocationActive ? "#238700" : "#949494")};
    & span {
        font-size: 13px;
        font-weight: 300;
    }

    & .publishpost__icon {
        font-size: 20px;
    }

    :hover {
        cursor: pointer;
    }
`;

const ButtonPublishPost = styled.button`
    width: 112px;
    height: 31px;
    background-color: #1877f2;
    color: #ffffff;
    border-radius: 5px;
    position: absolute;
    right: 0px;
    bottom: 0px;
    border: none;
`;
