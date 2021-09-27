import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FaCircle, FaDotCircle } from "react-icons/fa";

export default function Option(target){
    const history = useHistory();

    return (
        <OptionContainer onClick={() => {
            history.push(`/user/${target.user.id}`)
            window.location.reload();
            }}>
            <img src={target.user.avatar} alt=''/>
            <User>{target.user.username}</User>
            {target.user.isFollowingLoggedUser ? (
                <>
                    <Circle />
                    <span>following</span>
                </>
            ) : ''}            
        </OptionContainer>
    );
}

const OptionContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    cursor: pointer;

    img{
        width: 39px;
        height: 39px;
        border-radius: 50px;
    }

    span{
        font-size: 15px;
        color: #c5c5c5;
    }
`

const User = styled.p`
    font-size: 19px;
    color: #515151;
    margin: 0 15px 0 8px;
    max-width: 15ch;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Circle = styled(FaCircle)`
    color: #c5c5c5;
    width: 10px;
    margin-right: 8px;
`