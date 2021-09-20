import { FaRegHeart, FaHeart, FaRegTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router";
import ReactHashtag from "react-hashtag";
import {
    Content,
    InnerContent,
    InteractionColumn,
    LinkColumn,
    Hashtag,
    Snippet
} from "../styles/PostStyle";
import { useContext, useState } from "react";
import { likePost } from "../services/api.services";
import UserContext from "../contexts/userContext";
import ReactTooltip from "react-tooltip";
import Modal from 'react-modal'

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
    const { token, user } = useContext(UserContext);
    const [likesList, setLikesList] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);

    function redirectTo(path) {
        history.push(path);
    }

    function handleLikes() {
        let usersList = "";
        likes.forEach(e => (usersList += `${e["user.username"]} `));
        usersList = usersList.replace(user.username, "");

        if (likes.length === 0) setLikesList("Ninguém curtiu este post ainda.");
        else if (likes.length === 1) {
            if (likes.find(e => e.userId === user.id)) setLikesList("Você");
            else setLikesList(usersList);
        } else if (likes.length === 2) {
            if (likes.find(e => e.userId === user.id))
                setLikesList(`Você e ${usersList}`);
            else
                setLikesList(
                    `${likes[0]["user.username"]} e ${likes[1]["user.username"]}`
                );
        } else {
            let firstUser = usersList.match(/^[^\s]+/);
            console.log(firstUser);
            if (likes.find(e => e.userId === user.id))
                setLikesList(
                    `Você, ${firstUser[0]} e outras ${likes.length - 2} pessoas`
                );
            else
                setLikesList(
                    `${likes[0]["user.username"]}, ${
                        likes[1]["user.username"]
                    } e outras ${likes.length - 2} pessoas`
                );
        }
    }

    function openModal(){
        setIsOpen(true)
    }
    function closeModal(){
        setIsOpen(false)
    }

    return (
        <Content>
            <Modal
                onRequestClose={closeModal}
                isOpen={modalIsOpen}
                className="Modal"
            >
                <h2>Tem certeza que deseja excluir essa publicação?</h2>
                <div className="modal-buttons">
                    <button onClick={closeModal}>Não, voltar</button>
                    <button>Sim, excluir</button>
                </div>
                

            </Modal>
            <InnerContent>
                <InteractionColumn>
                    <img
                        src={avatar}
                        alt="Foto de perfil do usuario"
                        onClick={() => redirectTo(`/user/${userId}`)}
                    />
                    {likes.find(e => e.userId === user.id) ? (
                        <FaHeart
                            className={"post__like-button"}
                            onClick={() => likePost(token, id, "dislike")}
                        />
                    ) : (
                        <FaRegHeart
                            onClick={() => likePost(token, id, "like")}
                        />
                    )}
                    <ReactTooltip place="bottom" type="light" effect="solid" />
                    <span
                        data-tip={likesList}
                        onMouseOver={() => handleLikes()}
                    >
                        {likes.length} likes
                    </span>
                </InteractionColumn>
                <LinkColumn>
                    <div className="user__trash">
                        <span
                            className={"post__author"}
                            onClick={() => redirectTo(`/user/${userId}`)}
                        >
                            {username}
                        </span>
                        {username === user.username ?(
                            <FaRegTrashAlt color="white" onClick={openModal}/>
                        ):(
                            ""
                        )}
                        
                    </div>
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
