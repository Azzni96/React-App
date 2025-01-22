import { NavigateFunction, useLocation, useNavigate } from "react-router";
import { MediaItem } from "hybrid-types/DBTypes";
const Single = () => {
  const  navigate: NavigateFunction = useNavigate();
  const {state} = useLocation();
  const item: MediaItem = state.item;
  return (
    <>
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
        <button className="goback" onClick={() => {navigate(-1)}}>go back</button>
    </>
  )
}
export  default Single

