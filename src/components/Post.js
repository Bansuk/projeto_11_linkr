import { FaRegHeart, FaHeart, FaRegTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { useHistory } from "react-router";
import ReactHashtag from "react-hashtag";
import {
    Content,
    InnerContent,
    InteractionColumn,
    LinkColumn,
    Hashtag,
    Snippet,
    VideoYoutube
} from "../styles/PostStyle";
import { useContext, useRef, useState, useEffect } from "react";
import { likePost, editPost } from "../services/api.services";
import UserContext from "../contexts/userContext";
import ReactTooltip from "react-tooltip";
import Modal from 'react-modal'
import { deletePost } from "../services/api.services";
import getYouTubeID from "get-youtube-id";

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
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const inputRef = useRef(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [loading, setLoading]= useState(false);
    const idYoutube = getYouTubeID(link);

    useEffect(() => {
        if (isEditing) {
            const e = inputRef.current;
            e.focus();
            //Colocando o cursor ao final do texto ao focar
            e.setSelectionRange(e.value.length, e.value.length);
        }
    }, [isEditing]);

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
    function delPost(){
        setLoading(true);
        deletePost(token,id)
        .then(()=> {
            setLoading(false)
            setIsOpen(false)
        })
        .catch(()=> {
            setLoading(false)
            setIsOpen(false)
            alert("Não foi possível excluir o post")
        })
    }

    function saveModification(event) {
        event.preventDefault();
        setIsDisabled(true);
        editPost(token, id, { text: editedText })
            .then(res => {
                setTimeout(() => {
                    setIsEditing(false);
                    setIsDisabled(false);
                }, 3000);
            })
            .catch(err => {
                alert("Não foi possível salvar as alterações!");
                setIsDisabled(false);
            });
    }

    return (
        <Content>
            <Modal
                onRequestClose={closeModal}
                isOpen={modalIsOpen}
                className="Modal"
            >
                {loading ? (
                    <h2>Excluindo...</h2>
                ):(
                    <>
                        <h2>Tem certeza que deseja excluir essa publicação?</h2>
                        <div className="modal-buttons">
                            <button onClick={closeModal}>Não, voltar</button>
                            <button onClick={delPost}>Sim, excluir</button>
                        </div>
                    </>
                )}
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
                    <div className="post__top">
                        <span
                            className={"post__author"}
                            onClick={() => redirectTo(`/user/${userId}`)}
                        >
                            {username}
                        </span>
                        {user.id === userId ? (
                            <div>
                                <TiPencil
                                    className={"post__edit-button"}
                                    onClick={() => {
                                        setIsEditing(!isEditing);
                                        setEditedText(text);
                                    }}
                                />
                                <FaRegTrashAlt color="white" onClick={openModal}/>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    {isEditing ? (
                        <textarea
                            ref={inputRef}
                            value={editedText}
                            onChange={e => setEditedText(e.target.value)}
                            onKeyDown={e =>
                                e.key === "Escape"
                                    ? setIsEditing(false)
                                    : e.key === "Enter"
                                    ? saveModification(e)
                                    : ""
                            }
                            disabled={isDisabled}
                        />
                    ) : (
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
                    )}
                    
                        
                            
                            {idYoutube ? (
                                <>
                                <VideoYoutube onClick={() => window.open(link)}>
                                    <iframe 
                                        width="500px"
                                        title={linkTitle}
                                        src={`https://www.youtube.com/embed/${idYoutube}`}
                                    />
                                </VideoYoutube>
                                <p onClick={() => window.open(link)}>{link}</p>
                                </>
                            ):( 
                                <Snippet onClick={() => window.open(link)}>
                                    <div>
                                        <h1>{linkTitle}</h1>
                                        <p>{linkDescription}</p>
                                        <span>{link}</span>
                                    </div>
                                    <img src={linkImage} alt="Imagem do post" />
                                </Snippet>
                            )}
                        
                        
                </LinkColumn>
            </InnerContent>
        </Content>
    );
}