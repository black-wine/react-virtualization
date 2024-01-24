import styled from "@emotion/styled";
import React, { FC } from "react";

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
`;
export interface SearchBarProps {
    searchWord: string;
    setSearchWord:(value:string) => void;
}
export const SearchBar:FC<SearchBarProps> = ({searchWord, setSearchWord}) => {
    return (
        <SearchInput
            type="text"
            placeholder="Search..."
            onChange = {(e) => setSearchWord(e.target.value)}
            value={searchWord}
        />
    )
}
