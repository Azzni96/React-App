import { MediaItem } from "hybrid-types/DBTypes";

const SingleView = (props: {
  item: MediaItem | undefined;
  setSelectedItem: (item: MediaItem | undefined) => void;
}) => {
  const { item, setSelectedItem } = props;
  return (
    <>
      <div className="overlay"></div>
      <dialog open className="single-view">
        <h2>{item?.title}</h2>
        <p>{item?.description}</p>
        {item?.media_type.startsWith('image') ? (
          <img src={item?.filename} alt={item?.title} />
        ) : item?.media_type.startsWith('video') ? (
          <video controls>
            <source src={item?.filename} type={item?.media_type} />
            Your browser does not support the video tag.
          </video>
        ) : null}
        <button className="goback" onClick={() => setSelectedItem(undefined)}>Close</button>
      </dialog>
    </>
  );
};

export default SingleView;
