import { Like, MediaItemWithOwner } from "hybrid-types/DBTypes"
import { useEffect, useReducer } from "react";
import { useLike } from "../hooks/apiHooks";

type LikeState = {
  count: number;
  userLike: Like | null;
};

type LikeAction = {
  type: 'setLikeCount' | 'like';
  like?: Like | null;
  count?: number;
};
const likeInitialState: LikeState = {
  count: 0,
  userLike: null,
};

function likeReducer(state: LikeState, action: LikeAction): LikeState {
  switch (action.type) {
    case 'setLikeCount':
      return {...state, count: action.count ?? 0};
    case 'like':
      if (action.like !== undefined) {
        return {...state, userLike: action.like};
      }
      return state; // no change if action.like is undefined
    default:
      return state; // Return the unchanged state if the action type is not recognized
  }
}

const Likes = ({item}: {item:MediaItemWithOwner}) => {
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);
  const {postLike, deleteLike, getUserLike, getCountByMediaId} = useLike()
  // get user like
const getLikes = async () => {
  const token = localStorage.getItem('token');
  if (!item || !token) {
    return;
  }
  try {
    const userLike = await getUserLike(item.media_id, token);
    likeDispatch({type: 'like', like: userLike});
  } catch (e) {
    likeDispatch({type: 'like', like: null});
    console.log('get user like error', (e as Error).message);
  }
};

// get like count
const getLikeCount = async () => {
  // TODO: get like count and dispatch it to the state
  try{
    const countResponse = await getCountByMediaId(item.media_id);
    likeDispatch({type: 'setLikeCount', count: countResponse.count});
  } catch (e) {
    console.log('get like count error', (e as Error).message);
  }
};
useEffect(() => {
  getLikes();
  getLikeCount();
},[item]);

const handleLike = async () => {
  {likeDispatch({type: 'like', like: null })}
  try{
    const token = localStorage.getItem('token');
    if (!item || !token)
    {
      return;
    }
    if (likeState.userLike) {
       await deleteLike(likeState.userLike.like_id, token);
       likeDispatch({type: 'like', like: null});
       likeDispatch({type: 'setLikeCount', count: likeState.count - 1});
    } else {
      await postLike(item.media_id, token);
      getLikes();
      getLikeCount();
    }

  }
  catch (e) {
    console.log('like error', (e as Error).message);
  }
}
  return (
    <>
     <p>Likes: {likeState.count}</p>
     <button onClick={handleLike}>
      {likeState.userLike ? 'unlike' : 'like'}
     </button>
    </>
  )
}

export default Likes
