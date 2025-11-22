// export * from './Middlewares';
import Axios from 'axios';

import { env } from '@/config';

import { authRequestInterceptor, rejectErrorInterceptor } from './interceptors';

export const axios = Axios.create({
  baseURL: env.API_BASE_URL,
});

axios.interceptors.request.use(authRequestInterceptor, rejectErrorInterceptor);
axios.interceptors.response.use(undefined);
