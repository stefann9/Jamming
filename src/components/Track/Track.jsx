import "./Track.css";

const Track = ({ track, onAdd, isRemoval }) => {
  const renderAction = () => {
    return (
      <button
        className="Track-action"
        onClick={() => {
          onAdd(track);
        }}
      >
        {isRemoval ? "-" : "+"}
      </button>
    );
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      {renderAction()}
    </div>
  );
};
export default Track;
