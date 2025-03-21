import axios from 'axios';

import { AuthSession } from '@/services/AuthSession.service';
import { Url } from '@/utils/Url';

export const ssrAxios = axios.create({
    withCredentials: false,
    baseURL: Url.serverURL,

    headers: {
       
        'Content-Type': 'application/json'
    }
  });

  ssrAxios.interceptors.request.use(async (config) => {
    const session = await AuthSession.getSessionToken();
    
    if (session) {
      config.headers.Authorization = session.data ?? "";
    }
    return config;
  });