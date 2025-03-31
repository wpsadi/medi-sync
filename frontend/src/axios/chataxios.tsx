import axios from 'axios';

import { AuthSession } from '@/services/AuthSession.service';
import { Url } from '@/utils/Url';

export const chatAxios = axios.create({
    withCredentials: false,
    baseURL: Url.chatURL,
  });

  chatAxios.interceptors.request.use(async (config) => {
    const session = await AuthSession.getSessionToken();
        console.log(Url.chatURL);
    if (session) {
      config.headers.Authorization = session.data ?? "";
    }
    return config;
  });