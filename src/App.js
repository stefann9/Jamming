import { useState } from "react";
import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import { spotify } from "./core/utils/Spotify";
import "./App.css";



function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("Playlist name");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (newTrack) => {
    playlistTracks.every((track) => track.id !== newTrack.id) &&
      setPlaylistTracks([newTrack, ...playlistTracks]);
  };
  const removeTrack = (removedTrack) => {
    setPlaylistTracks(
      playlistTracks.filter((track) => track.id !== removedTrack.id)
    );
  };
  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    console.log(trackURIs);
  };
  const search = async (searchTerm) => {
    const tracks = await spotify.search(searchTerm);
    setSearchResults([...tracks]);
  };

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            setPlaylistName={setPlaylistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
