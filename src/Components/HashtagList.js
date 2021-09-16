import styled from "styled-components";
import { Link } from "react-router-dom";
export default function HashtagList({hashtag}){
    return(
        <Link to={`/hashtag/:${hashtag}`}>
            <Hashtag># {hashtag}</Hashtag>
        </Link>
    )
}
const Hashtag = styled.li`
    font-size:19px;
    font-weight:700;
    color: #FFFFFF;
`;