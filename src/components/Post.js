import { FaRegHeart, FaHeart, FaRegTrashAlt, FaRetweet } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
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
} from "../styles/PostStyle";
import { useContext, useRef, useState, useEffect } from "react";
import {
    likePost,
    editPost,
    sharePost,
    getPostComments,
} from "../services/api.services";
import UserContext from "../contexts/userContext";
import ReactTooltip from "react-tooltip";
import { deletePost } from "../services/api.services";
import ConfirmationModal from "./ConfirmationModal";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

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
                alert("Não foi possível excluir o post");
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
                alert("Não foi possível salvar as alterações!");
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
                alert("Não foi possível repostar o post");
            });
    }
    function getComments() {
        getPostComments(token, id)
            .then(res => setComments(res.data.comments))
            .catch(err => alert("Erro ao obter os comentários do post!"));
    }

    return (
        <OutterContent>
            {repostCount ? (
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
                                    {repostCount}{" "}
                                    {repostCount === 1 ? "re-post" : "re-posts"}
                                </span>
                            </div>
                            {/* REPOST */}
                        </ButtonsColumn>
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
                                    <FaRegTrashAlt
                                        color="white"
                                        onClick={() => openModal("delete")}
                                    />
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
            {showComments
                ? comments.map(comment => (
                      <Comment
                          key={comment.id}
                          comment={comment}
                          authorId={userId}
                          token={token}
                      />
                  ))
                : ""}
            {showComments ? (
                <CommentInput
                    token={token}
                    postId={id}
                    avatar={user.avatar}
                    getComments={getComments}
                />
            ) : (
                ""
            )}
        </OutterContent>
    );
}
