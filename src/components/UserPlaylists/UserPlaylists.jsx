import CurrentPlaylist from "../CurrentPlaylist/CurrentPlaylist";
import "./UserPlaylists.css";

const UserPlaylists = ({ userPlaylists }) => {
  return (
    <div className="UserPlaylists">
      <h1>Your playlists</h1>
      <button className="Playlist-select">New Playlist</button>
      {userPlaylists.map((playlist) => (
        <CurrentPlaylist
          key={playlist.id}
          playlist={playlist}
        />
      ))}
    </div>
  );
};

export default UserPlaylists;
