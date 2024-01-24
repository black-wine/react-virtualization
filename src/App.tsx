import React, { Children, FC, useState, useEffect } from "react";
import "./App.css";
import { List } from "./components/List";
import { useDictionary } from "./hooks/useDictionary";
import { SearchBar } from "./components/SearchBar";
function App() {
  const dictionary = useDictionary();
  const [searchWord, setSearchWord] = useState("");
  const filteredItems = dictionary.filter((word:string) => word.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()))
  return (
    <div className="app">
      <div className="header">
        <div>Render Virtualized</div>
      </div>
      <div className="content">
        <SearchBar searchWord={searchWord} setSearchWord={setSearchWord}/>
        <List items={filteredItems} searchWord={searchWord}/>
      </div>
    </div>
  );
}

export default App;
