import { FaRegHeart } from "react-icons/fa";
import { useHistory } from "react-router";
import ReactHashtag from "react-hashtag";
import {
    Content,
    InnerContent,
    InteractionColumn,
    LinkColumn,
    Snippet,
    Hashtag,
} from "./PostStyle";

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
                        <ReactHashtag
                            renderHashtag={hashtagValue => (
                                <Hashtag
                                    onClick={hashtagValue => {
                                        let hashtag =
                                            hashtagValue.target.innerText;
                                        hashtag = hashtag.slice(1);
                                        redirectTo(`/hashtag/${hashtag}`);
                                    }}
                                >
                                    {hashtagValue}
                                </Hashtag>
                            )}
                        >
                            {text}
                        </ReactHashtag>
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
