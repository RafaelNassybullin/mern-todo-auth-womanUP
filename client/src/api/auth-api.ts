import { Login, Register } from "../interfaces/auth-types";
import $authInterceptor, { API_URL } from "./auth-axios-interceptor";

//запрос на логин с помощью аксиос перехватчика
export const loginApi = async ({ email, password }: Login) =>
  await $authInterceptor.post(`${API_URL}/login`, { email, password });
//запрос на регистрацию с помощью аксиос перехватчика
export const registerApi = async ({ name, email, password }: Register) =>
  await $authInterceptor.post(`${API_URL}/registration`, { name, email, password });
//запрос на логаут с помощью аксиос перехватчика
export const logOutApi = async () => $authInterceptor.post(`${API_URL}/logout`);
//запрос на обновление jwt токена с помощью аксиос перехватчика
export const refreshTokenApi = async () => {
  try {
    return await $authInterceptor.get(`${API_URL}/refresh`, { withCredentials: true });
  } catch (error) {
    console.log("ошибка обновления токена")
  }
}