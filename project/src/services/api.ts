import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { getUser } from './user';
import { toast } from 'react-toastify';
import { Offer } from '../types/offer';
import { Comment } from '../types/comment';
import { APIRoute, AppRoute } from '../const';
import { NavigateFunction } from 'react-router-dom';

const BACKEND_URL = 'https://11.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getUser().token;

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if (error.response) {
        toast.warn(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};

const api = createAPI();

export const fetchOfferData = async (id: string, navigate: NavigateFunction) => {
  try {
    const firstResponse = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    const [secondResponse, thirdResponse] = await Promise.all(
      [api.get<Comment[]>(`${APIRoute.Comments}/${id}`),
        api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`),
      ]);
    return {firstResponse, secondResponse, thirdResponse};
  } catch {
    navigate(AppRoute.NoProperty);
  }
};
