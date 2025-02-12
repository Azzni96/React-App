import {ChangeEvent, useRef, useState} from 'react';
import {useForm} from '../src/hooks/formHooks';
import {useFile, useMedia} from '../src/hooks/apiHooks';
//import {useNavigate} from 'react-router';

const Upload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<string>('');
  const [file, setFile] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null);
  //const navigate = useNavigate();
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    setUploading(true);

    console.log(inputs);
    try {
      const token = localStorage.getItem('token');
      if (!file || !token) {
        return;
      }
      // upload the file to fileserver and post metadata to media api server
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);

      // redirect to Home
      //navigate('/');

      // OR notify user & clear inputs
      setUploadResult('Media file uploaded!');
      resetForm();
    } catch (e) {
      console.log((e as Error).message);
      setUploadResult((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doUpload,
    initValues,
  );

  const resetForm = () => {
    setInputs(initValues);
    setFile(null);
    // use fileRef to clear file input field
    if (fileRef.current){
      fileRef.current.value = '';
    }
  };

  return (
    <>
      <h1 className='text-center mb-5 mt-5'>Upload</h1>
      <form className='flex flex-col items-center bg-stone-500 ' onSubmit={handleSubmit}>
        <div>
          <label className='flex flex-col items-center mb-5' htmlFor="title">Title</label>
          <input className='border-[1px] rounded-[5px] p-[10px] mb-5'
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
          />
        </div>
        <div className='text-center mb-5 mt-5'>
          <label className='flex flex-col items-center mb-5' htmlFor="description">Description</label>
          <textarea className='border-[1px] rounded-[5px] p-[10px] mb-5'
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>
        <div className='text-center mb-5 mt-5'>
          <label className='flex flex-col items-center mb-5' htmlFor="file">File</label>
          <input className='border-[1px] rounded-[5px] p-[10px] mb-5 bg-stone-400'
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            // refrerence to file input element
            ref={fileRef}
          />
        </div>
        <img className='mb-5'
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://place-hold.it/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button className="block bg-sky-500 p-2 rounded-3xl text-center w-63 transition-all duration-500 mt-10 ease-in-out hover:bg-sky-700"
          type="submit"
          disabled={
            file && inputs.title.length > 3 && inputs.description.length > 0
              ? false
              : true
          }
        >
          {uploading ? 'Uploading..' : 'Upload'}
        </button>
        <button className="block bg-red-500 p-2 rounded-3xl text-center mt-5 mb-5 w-63 transition-all duration-500 ease-in-out hover:bg-red-700" type="reset" onClick={resetForm} >Reset</button>
        <p>{uploadResult}</p>
      </form>
    </>
  );
};

export default Upload;
