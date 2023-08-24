import "./TrackList.css";
import Track from "../Track/Track";
const TrackList = ({ searchResults }) => {
  return (
    <div className="TrackList">
      {searchResults && searchResults.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
};
export default TrackList;
