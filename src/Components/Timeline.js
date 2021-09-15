import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPostsList } from "../Services/api.services";
import Post from "./Post";

export default function Timeline() {
    const [statusMessage, setStatusMessage] = useState("Loading");
    const [postsList, setPostsList] = useState([]);

    function checkIfPostsListIsEmpty() {
        if (postsList === []) setStatusMessage("Nenhum post encontrado");
        else setStatusMessage("OK");
    }

    useEffect(() => {
        getPostsList("2b19cbc1-856a-4d00-9666-2676d198c4bd")
            .then(res => {
                setPostsList(res.data.posts);
                checkIfPostsListIsEmpty();
            })
            .catch(err => {
                setStatusMessage(
                    "Houve uma falha ao obter os posts, por favor atualize a página"
                );
            });
    }, []);

    return (
        <>
            <h1>Timeline</h1>
            {statusMessage === "OK" ? <Post></Post> : statusMessage}
        </>
    );
}
