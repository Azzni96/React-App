import {MediaItem} from 'hybrid-types/DBTypes';
import MediaRow from '../src/components/MediaRow';
import SingleView from '../src/components/SingleView';
import { useState, useEffect } from 'react';
import { fetchData } from '../src/utils/functions';
const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItem | undefined>(
    undefined,
  );

  useEffect(() =>{

    const getMedia = async () => {

  try {
      const json = await fetchData<MediaItem[]>('test.json');
      setMediaArray(json);
   } catch (error) {
      console.log((error as Error).message);
    }
  };
    getMedia();
  }, [])


  console.log(mediaArray);

  return (
    <> {selectedItem &&
    <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
}
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (

            <MediaRow key={item.media_id}
            item={item}
            setSelectedItem={setSelectedItem} />
            ))}
        </tbody>
      </table>

    </>
  );
};
export default Home;

