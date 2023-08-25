import "./TrackList.css";
import Track from "../Track/Track";
const TrackList = ({ tracks, onAdd, isRemoval }) => {
  return (
    <div className="TrackList">
      {tracks &&
        tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            onAdd={onAdd}
            isRemoval={isRemoval}
          />
        ))}
    </div>
  );
};
export default TrackList;
