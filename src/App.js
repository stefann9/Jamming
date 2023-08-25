import { useState } from "react";
import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import "./App.css";

const mocksTracksList = [
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
];

function App() {
  const [searchResults, setSearchResults] = useState(mocksTracksList);
  const [playlistName, setPlaylistName] = useState("Playlist name");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    playlistTracks.every((playlistTrack) => playlistTrack.id !== track.id) &&
      setPlaylistTracks([track, ...playlistTracks]);
  };

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
