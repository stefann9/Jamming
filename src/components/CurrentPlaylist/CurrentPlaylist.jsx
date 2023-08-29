import "./CurrentPlaylist.css";
const CurrentPlaylist = ({playlist}) => {
  return (
    <div className="User-Playlist">
      <h3>{playlist.name}</h3>
      <button className="Track-action">+</button>
    </div>
  );
};

export default CurrentPlaylist;
