import { useEffect, useState, useContext, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useHistory } from "react-router";
import styled from "styled-components";
import UserContext from "../Context/UserContext";

export default function TopBar() {
    const { user } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const history = useHistory();
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = e => {
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    function redirectTo(path) {
        history.push(path);
    }

    return (
        <Container>
            <h1>linkr</h1>
            <div ref={ref}>
                {isMenuOpen ? (
                    <BiChevronUp
                        className={"topbar__icon"}
                        onClick={() => setIsMenuOpen(false)}
                    />
                ) : (
                    <BiChevronDown
                        className={"topbar__icon"}
                        onClick={() => setIsMenuOpen(true)}
                    />
                )}

                <img
                    src={user.avatar}
                    alt="Foto de perfil do usuário"
                    onClick={() =>
                        isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
                    }
                />
            </div>
            {isMenuOpen ? (
                <Menu>
                    <span
                        onClick={() => {
                            redirectTo("/my-posts");
                        }}
                    >
                        My posts
                    </span>
                    <span
                        onClick={() => {
                            redirectTo("/my-likes");
                            setIsMenuOpen(false);
                        }}
                    >
                        My likes
                    </span>
                    <span
                        onClick={() => {
                            redirectTo("/");
                        }}
                    >
                        Logout
                    </span>
                </Menu>
            ) : (
                ""
            )}
        </Container>
    );
}

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
