import { useState, useEffect } from "react";
import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import UserPlaylists from "./components/UserPlaylists/UserPlaylists";
import { spotify } from "./core/utils/Spotify";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("Playlist name");
  const [playlistID, setPlaylistID] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    spotify.getUserPlaylists().then((playlists) => {
      setUserPlaylists(
        playlists.items.map((playlist) => ({
          name: playlist.name,
          id: playlist.id,
        }))
      );
    });
  }, []);

  const addTrack = (newTrack) => {
    playlistTracks.every((track) => track.id !== newTrack.id) &&
      setPlaylistTracks([newTrack, ...playlistTracks]);
  };
  const removeTrack = (removedTrack) => {
    setPlaylistTracks(
      playlistTracks.filter((track) => track.id !== removedTrack.id)
    );
  };
  const savePlaylist = async () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    await spotify.savePlaylist(playlistName, trackURIs, playlistID);
    if (!playlistID) {
      const playlists = await spotify.getUserPlaylists();
      setUserPlaylists(
        playlists.items.map((playlist) => ({
          name: playlist.name,
          id: playlist.id,
        }))
      );
    }
    onNewPlaylist();
  };
  const search = async (searchTerm) => {
    const response = await spotify.search(searchTerm);
    let tracks;
    if (!response?.tracks.items) tracks = [];
    else {
      tracks = response.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    }
    setSearchResults(tracks);
  };

  const getUserPlaylistTracks = async (playlist) => {
    const tracks = await spotify.getUserPlaylistTracks(playlist.id);

    setPlaylistTracks(
      tracks.items.map((item) => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        uri: item.track.uri,
      }))
    );
    setPlaylistName(playlist.name);
    setPlaylistID(playlist.id);
  };
  const onNewPlaylist = () => {
    setPlaylistName("Playlist name");
    setPlaylistTracks([]);
    setPlaylistID(null);
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
          <UserPlaylists
            userPlaylists={userPlaylists}
            getUserPlaylistTracks={getUserPlaylistTracks}
            onNewPlaylist={onNewPlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
