import { MediaItem } from "hybrid-types/DBTypes";

const SingleView = (props: {
  item: MediaItem | undefined;
  setSelectedItem: (item: MediaItem | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  return (
    // TODO: Add JSX for displaying a mediafile here
    // - use e.g. a <dialog> element for creating a modal
    // - use item prop to render the media item details
    // - use img tag for displaying images
    // - use video tag for displaying videos
    <dialog open>
      <h2>{item?.title}</h2>
      <p>{item?.description}</p>
      {item?.media_type.startsWith('image') && (
        <img src={item?.filename} alt={item.title} />
      )}
      {item?.media_type.startsWith('video') && (
        <video controls>
          <source src={item?.filename} type={item?.media_type} />
          Your browser does not support the video tag.
        </video>
      )}
      <button onClick={() => setSelectedItem(undefined)}>Close</button>
    </dialog>
  );
};
export default SingleView;
