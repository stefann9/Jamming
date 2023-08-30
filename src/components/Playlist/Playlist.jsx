import "./Playlist.css";
import TrackList from "../TrackList/TrackList";
const Playlist = ({
  playlistName,
  setPlaylistName,
  playlistTracks,
  onRemove,
  onSave
}) => {
  return (
    <div className="Playlist">
      <input
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
};
export default Playlist;
