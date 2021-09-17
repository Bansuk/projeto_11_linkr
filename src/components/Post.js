import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useHistory } from "react-router";
import ReactHashtag from "react-hashtag";
import {
    Content,
    InnerContent,
    InteractionColumn,
    LinkColumn,
    Hashtag,
    Snippet,
} from "../styles/PostStyle";
import { useState, useContext } from "react";
import { likePost } from "../services/api.services";
import UserContext from "../contexts/userContext";

export default function Post({
    post: {
        id,
        text,
        link,
        linkTitle,
        linkDescription,
        linkImage,
        user: { id: userId, username, avatar },
        likes,
    },
}) {
    const history = useHistory();
    const [isPostLiked, setIsPostLiked] = useState(false);
    const { token } = useContext(UserContext);

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
                    {isPostLiked ? (
                        <FaHeart
                            className={"post__like-button"}
                            onClick={() => {
                                setIsPostLiked(false);
                                likePost(token, id, "dislike");
                            }}
                        />
                    ) : (
                        <FaRegHeart
                            onClick={() => {
                                setIsPostLiked(true);
                                likePost(token, id, "like");
                            }}
                        />
                    )}
                    <span>{likes.length} likes</span>
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
                                    key={hashtagValue}
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
