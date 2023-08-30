import CurrentPlaylist from "../CurrentPlaylist/CurrentPlaylist";
import "./UserPlaylists.css";

const UserPlaylists = ({ userPlaylists, getUserPlaylistTracks, onNewPlaylist }) => {
  return (
    <div className="UserPlaylists">
      <h2>Your playlists</h2>
      <button className="Playlist-select" onClick={onNewPlaylist}>New Playlist</button>
      {userPlaylists.map((playlist) => (
        <CurrentPlaylist
          key={playlist.id}
          playlist={playlist}
          getUserPlaylistTracks={getUserPlaylistTracks}
        />
      ))}
    </div>
  );
};

export default UserPlaylists;
