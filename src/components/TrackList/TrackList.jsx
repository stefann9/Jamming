import "./TrackList.css";
import Track from "../Track/Track";
const TrackList = ({ tracks }) => {
  return (
    <div className="TrackList">
      {tracks && tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
};
export default TrackList;
