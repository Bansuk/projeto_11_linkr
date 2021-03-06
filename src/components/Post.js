import {
    FaRegHeart,
    FaHeart,
    FaRegTrashAlt,
    FaRetweet,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { AiOutlineComment, AiOutlineClose } from "react-icons/ai";
import { TiPencil } from "react-icons/ti";
import { useHistory } from "react-router";
import ReactHashtag from "react-hashtag";
import {
    Content,
    RepostInfo,
    InnerContent,
    InteractionColumn,
    LinkColumn,
    Hashtag,
    Snippet,
    ButtonsColumn,
    OutterContent,
    VideoYoutube,
} from "../styles/PostStyle";
import { useContext, useRef, useState, useEffect } from "react";
import {
    likePost,
    editPost,
    sharePost,
    getPostComments,
    deletePost,
} from "../services/api.services";
import UserContext from "../contexts/userContext";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import ConfirmationModal from "./ConfirmationModal";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import getYouTubeID from "get-youtube-id";
import LocationModal from "./LocationModal";

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
        geolocation,
        repostCount,
        commentCount,
    },
    repostedBy: { repostUserId, repostUsername },
}) {
    const history = useHistory();
    const { token, user } = useContext(UserContext);
    const [likesList, setLikesList] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const inputRef = useRef(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalType, setModalType] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [previewIsOpen, setPreviewIsOpen] = useState(false);
    const idYoutube = getYouTubeID(link);
    const [locationIsOpen, setLocationIsOpen] = useState(false);

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

        if (likes.length === 0) setLikesList("Ningu??m curtiu este post ainda.");
        else if (likes.length === 1) {
            if (likes.find(e => e.userId === user.id)) setLikesList("Voc??");
            else setLikesList(usersList);
        } else if (likes.length === 2) {
            if (likes.find(e => e.userId === user.id))
                setLikesList(`Voc?? e ${usersList}`);
            else
                setLikesList(
                    `${likes[0]["user.username"]} e ${likes[1]["user.username"]}`
                );
        } else {
            let firstUser = usersList.match(/^[^\s]+/);
            console.log(firstUser);
            if (likes.find(e => e.userId === user.id))
                setLikesList(
                    `Voc??, ${firstUser[0]} e outras ${likes.length - 2} pessoas`
                );
            else
                setLikesList(
                    `${likes[0]["user.username"]}, ${
                        likes[1]["user.username"]
                    } e outras ${likes.length - 2} pessoas`
                );
        }
    }

    function openModal(type) {
        setIsOpen(true);
        setModalType(type);
    }
    function closeModal() {
        setIsOpen(false);
    }
    function delPost() {
        setLoading(true);
        deletePost(token, id)
            .then(() => {
                setLoading(false);
                setIsOpen(false);
            })
            .catch(() => {
                setLoading(false);
                setIsOpen(false);
                alert("N??o foi poss??vel excluir o post");
            });
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
                alert("N??o foi poss??vel salvar as altera????es!");
                setIsDisabled(false);
            });
    }
    function repost() {
        setLoading(true);
        sharePost(token, id)
            .then(() => {
                setLoading(false);
                setIsOpen(false);
            })
            .catch(() => {
                setLoading(false);
                setIsOpen(false);
                alert("N??o foi poss??vel repostar o post");
            });
    }
    function getComments() {
        getPostComments(token, id)
            .then(res => setComments(res.data.comments))
            .catch(err => alert("Erro ao obter os coment??rios do post!"));
    }

    return (
        <OutterContent>
            {repostCount && repostUserId ? (
                <RepostInfo>
                    <FaRetweet className={"post__button"} />
                    <span>
                        Re-posted by{" "}
                        {repostUserId === user.id ? "you" : repostUsername}
                    </span>
                </RepostInfo>
            ) : (
                ""
            )}
            <Content showComments={showComments}>
                <ConfirmationModal
                    closeModal={closeModal}
                    modalIsOpen={modalIsOpen}
                    loading={loading}
                    delPost={delPost}
                    sharePost={repost}
                    modalType={modalType}
                />
                <Modal
                    onRequestClose={() => setPreviewIsOpen(false)}
                    isOpen={previewIsOpen}
                    className="preview"
                >
                    <div>
                        <button onClick={() => window.open(link)}>
                            Open in new tab
                        </button>
                        <AiOutlineClose
                            color="white"
                            fontSize="21px"
                            cursor="pointer"
                            onClick={() => setPreviewIsOpen(false)}
                        />
                    </div>
                    <iframe src={link} />
                </Modal>
                <Modal
                    onRequestClose={() => setLocationIsOpen(false)}
                    isOpen={locationIsOpen}
                    className="preview"
                >
                    <div>
                        <h1>Localiza????o de {username}</h1>
                        <AiOutlineClose
                            color="white"
                            fontSize="21px"
                            cursor="pointer"
                            onClick={() => setLocationIsOpen(false)}
                        />
                    </div>
                    <div className={"map"}>
                        <LocationModal coords={geolocation} />
                    </div>
                </Modal>
                <InnerContent>
                    <InteractionColumn>
                        <img
                            src={avatar}
                            alt="Foto de perfil do usuario"
                            onClick={() => redirectTo(`/user/${userId}`)}
                        />
                        <ButtonsColumn>
                            {/* LIKES */}
                            <div>
                                {likes.find(e => e.userId === user.id) ? (
                                    <FaHeart
                                        className={
                                            "post__like-button post__button"
                                        }
                                        onClick={() =>
                                            likePost(token, id, "dislike")
                                        }
                                    />
                                ) : (
                                    <FaRegHeart
                                        className={"post__button"}
                                        onClick={() =>
                                            likePost(token, id, "like")
                                            .then(()=> handleLikes())
                                        }
                                    />
                                )}
                                <ReactTooltip
                                    place="bottom"
                                    type="light"
                                    effect="solid"
                                />
                                <span
                                    data-tip={likesList}
                                    onMouseOver={() => handleLikes()}
                                >
                                    {likes.length} likes
                                </span>
                            </div>
                            {/* LIKES */}
                            {/* COMMENTS */}
                            <div>
                                <AiOutlineComment
                                    className={"post__button"}
                                    onClick={() => {
                                        if (showComments === true)
                                            setShowComments(false);
                                        else {
                                            getComments();
                                            setShowComments(true);
                                        }
                                    }}
                                />
                                <span>
                                    {commentCount}{" "}
                                    {commentCount === 1
                                        ? "comment"
                                        : "comments"}
                                </span>
                            </div>
                            {/* COMMENTS */}
                            {/* REPOST */}
                            <div>
                                <FaRetweet
                                    className={"post__button"}
                                    onClick={() => openModal("repost")}
                                />
                                <span>
                                    {repostCount && !repostUserId
                                        ? repostCount - 1
                                        : repostCount}
                                    {" re-posts"}
                                </span>
                            </div>
                            {/* REPOST */}
                        </ButtonsColumn>
                    </InteractionColumn>
                    <LinkColumn>
                        <div className="post__top">
                            <div>
                                <span
                                    className={"post__author"}
                                    onClick={() =>
                                        redirectTo(`/user/${userId}`)
                                    }
                                >
                                    {username}
                                </span>
                                {geolocation && (
                                    <FaMapMarkerAlt
                                        className={"post__location"}
                                        onClick={() => setLocationIsOpen(true)}
                                    />
                                )}
                            </div>
                            {user.id === userId && (
                                <div>
                                    <TiPencil
                                        className={"post__edit-button"}
                                        onClick={() => {
                                            setIsEditing(!isEditing);
                                            setEditedText(text);
                                        }}
                                    />
                                    <FaRegTrashAlt
                                        color="white"
                                        onClick={() => openModal("delete")}
                                    />
                                </div>
                            )}
                        </div>
                        {isEditing ? (
                            <textarea
                                ref={inputRef}
                                value={editedText}
                                onChange={e => setEditedText(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === "Escape") setIsEditing(false);
                                    if (e.key === "Enter") saveModification(e);
                                }}
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
                                                    hashtagValue.target
                                                        .innerText;
                                                hashtag = hashtag.slice(1);
                                                redirectTo(
                                                    `/hashtag/${hashtag}`
                                                );
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
                        ) : (
                            <Snippet onClick={() => setPreviewIsOpen(true)}>
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
            {showComments &&
                comments.map(comment => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        authorId={userId}
                        token={token}
                    />
                ))}
            {showComments && (
                <CommentInput
                    token={token}
                    postId={id}
                    avatar={user.avatar}
                    getComments={getComments}
                />
            )}
        </OutterContent>
    );
}
