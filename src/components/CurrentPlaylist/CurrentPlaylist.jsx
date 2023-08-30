import "./CurrentPlaylist.css";
const CurrentPlaylist = ({ playlist, getUserPlaylistTracks }) => {
  return (
    <div className="User-Playlist">
      <h3>{playlist.name}</h3>
      <button
        className="Track-action"
        onClick={() => getUserPlaylistTracks(playlist)}
      >
        +
      </button>
    </div>
  );
};

export default CurrentPlaylist;
