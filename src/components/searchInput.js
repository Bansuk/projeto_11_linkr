import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Option from "./Option";
import {DebounceInput} from 'react-debounce-input';
import { getSearchOptions } from "../services/api.services";
import UserContext from "../contexts/userContext";
import { useContext, useState } from "react";

export default function SearchInput(){
    const { token } = useContext(UserContext);
    const [searchOptions, setSearchOptions] = useState(null);

    function getOptions(e){
        let target = e.target.value;
        setSearchOptions('');
        getSearchOptions(token, target)
            .then((resp) => {
                setSearchOptions(resp.data.users);
            })
    }

    return (
        <SearchContainer>
            <InputContainer>
                <Input 
                placeholder='Search for people and friends' 
                minLength={3}
                debounceTimeout={300}
                onChange={getOptions}
                />
                <SearchIcon />
            </InputContainer>
            {searchOptions ? (
                <OptionsContainer>
                    {searchOptions.map((user) => {
                        return (
                            <Option user={user}/>
                        );
                    })}
                </OptionsContainer>
            ) : ''}
            
        </SearchContainer>
        
    );
}


const SearchContainer = styled.div`
    z-index: 3;
    position: fixed;
    top: 15px;
    left: calc(50vw - 17%);
    width: 35%;

    @media(max-width: 900px){
        position: relative;
        width: 90vw;
        top: 80px;
        left: 6vw;;
    }
`

const InputContainer = styled.div`
    color: white;
    height: 45px;
    width: 100%;
    background-color: white;
    border-radius: 8px;
    padding-left: 3%;
    display: flex;
    align-items: center;
    z-index: 3;
`

const Input = styled(DebounceInput)`
    height: 100%;
    width: 90%;
    border: none;
    outline: none;
    border-radius: 8px;
`

const SearchIcon = styled(FaSearch)`
    color: #c6c6c6;
    margin-left: 1%;
`
const OptionsContainer = styled.div`
    width: 100%;
    background-color: #E7E7E7;
    border-radius: 0 0 8px 8px;
    position: relative;
    top: -8px;
    z-index: -1;
    padding: 15px 0 10px 15px;
    max-height: 40vh;
    overflow-y: scroll;
    overflow-x: hidden;
`

