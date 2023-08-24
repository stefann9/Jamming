import { useState } from "react";
import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: "ASASblabla",
      artist: "sdasdasdas",
      album: "sadasda",
    },
    {
      id: 2,
      name: "blabla",
      artist: "sdasdasdas",
      album: "sadasda",
    },
    {
      id: 3,
      name: "blabla",
      artist: "sdasdasdas",
      album: "sadasda",
    },
    {
      id: 4,
      name: "blabla",
      artist: "sdasdasdas",
      album: "sadasda",
    },
  ]);
  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} />
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;
