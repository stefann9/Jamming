import "./Playlist.css"
import TrackList from "../TrackList/TrackList"
const Playlist = ({playlistName,playlistTracks}) => {
  return (
    <div className="Playlist">
      <input defaultValue={playlistName} />
      <TrackList tracks = {playlistTracks} />
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
};
export default Playlist;