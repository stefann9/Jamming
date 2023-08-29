import CurrentPlaylist from "../CurrentPlaylist/CurrentPlaylist";
import "./UserPlaylists.css";

const UserPlaylists = () => {
  return (
    <div className="UserPlaylists">
      <h1>Your playlists</h1>
      <CurrentPlaylist />
      <button className="Playlist-select">New Playlist</button>
    </div>
  );
};

export default UserPlaylists;
