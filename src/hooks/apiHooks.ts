import {
  MediaItem,
  MediaItemWithOwner,
  UserWithNoPassword,
} from 'hybrid-types/DBTypes';
import { useEffect, useState } from 'react';
import { fetchData } from '../utils/functions';
import { Credentials, RegisterCredentials } from '../types/LocalTypes';
import { LoginResponse, UserResponse } from 'hybrid-types/MessageTypes';


const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const media = await fetchData<MediaItem[]>(
          import.meta.env.VITE_MEDIA_API + '/media',
        );
        const mediaWithOwner: MediaItemWithOwner[] = await Promise.all(
          media.map(async (item) => {
            const owner = await fetchData<UserWithNoPassword>(
              import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
            );

            const mediaItem: MediaItemWithOwner = {
              ...item,
              username: owner.username,
            };
            return mediaItem;
          }),
        );

        console.log(mediaWithOwner);

        setMediaArray(mediaWithOwner);
      } catch (error) {
        console.error((error as Error).message);
      }
    };

    getMedia();
  }, []);

  return { mediaArray };
};

const useAuthentication = () => {
  const postLogin = async (credentials: Credentials) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      return await fetchData<LoginResponse>(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        options,
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token: string) => {
    const options = {
      headers: { Authorization: 'Bearer ' + token },
    };
    return await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users/token',
      options,
    );
  };

  const postRegister = async (credentials: RegisterCredentials) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      return await fetchData<UserResponse>(
        import.meta.env.VITE_AUTH_API + '/users',
        options,
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return { getUserByToken, postRegister };
};

const useComments = () => {
  // TODO: implement media/comments resource API connections here
};

const postFile = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('https://media2.edu.metropolia.fi/upload-api/api/v1/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();
  return data; // The type is UploadResponse
};

const postMedia = async ( inputs: Record<string, string>, token: string) => {
  const mediaData = {
    title: inputs.title,
    description: inputs.description,
    app_id: process.env.REACT_APP_APP_ID,
  };

  const response = await fetch('https://media2.edu.metropolia.fi/media-api/api/v1/media', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mediaData),
  });

  const data = await response.json();
  return data; // The type is MediaResponse
};

export { useMedia, useAuthentication, useUser, useComments, postFile, postMedia };
