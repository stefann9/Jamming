import "./Playlist.css";
import TrackList from "../TrackList/TrackList";
const Playlist = ({
  playlistName,
  setPlaylistName,
  playlistTracks,
  onRemove,
}) => {
  return (
    <div className="Playlist">
      <input
        defaultValue={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
};
export default Playlist;
