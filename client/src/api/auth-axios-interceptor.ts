import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

//ссылка на сервер
export const API_URL: string = "http://localhost:1337/api"

//создание конфига для перехватчика аксиос
const $authInterceptor: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

//каждый раз при любом запросе обновляем из куки токен доступа в конфиг перехватчика 
$authInterceptor.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${Cookies.get('accessToken')}`
  }
  return config;
})

//получаем ответ с конфигом для аксиос, получаем рефреш снова
$authInterceptor.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originRequest._isRetry = true;
    try {
      const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
      Cookies.set('accessToken', response.data.accessToken);
      return $authInterceptor.request(originRequest);
    } catch (e) {
      console.log('ошибка авторизации', e)
    }
  }
  throw error;
})

export default $authInterceptor;





