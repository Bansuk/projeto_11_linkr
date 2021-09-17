import { useEffect, useState, useContext, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useHistory } from "react-router";
import { Container, Menu } from "../styles/TopBarStyle";
import UserContext from "../contexts/userContext";

export default function TopBar({ setUser }) {
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
                <div>
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
                        ref={ref}
                        src={user.avatar}
                        alt="Foto de perfil do usuário"
                        onClick={() =>
                            isMenuOpen
                                ? setIsMenuOpen(false)
                                : setIsMenuOpen(true)
                        }
                    />
                </div>
                {isMenuOpen ? (
                    <Menu>
                        <span
                            onClick={() => {
                                redirectTo("/my-posts");
                                setIsMenuOpen(false);
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
                                setIsMenuOpen(false);
                                setUser({});
                                redirectTo("/");
                            }}
                        >
                            Logout
                        </span>
                    </Menu>
                ) : (
                    ""
                )}
            </div>
        </Container>
    );
}
