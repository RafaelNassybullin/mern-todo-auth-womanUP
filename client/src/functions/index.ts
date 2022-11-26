import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { JWT_Decoded } from "../interfaces/auth-types";

//функция для получения id пользоватия из токена
export async function GetIdFromJWT() {
  //токен из кукис
  const token: string | undefined = await Cookies.get('accessToken');
  if (token) {
    const decodedToken: JWT_Decoded = await jwt_decode(token);
    const { id } = decodedToken
    //функция возвращает расшифрованный id из токена
    return id
  }
  return null
}

//получаем уникальные обьекты в массиве данных, 
//классическая проблема со сдвигами пагинации и повторениями 
//супер быстрая, олдовая, с++ ная функция-3000!
export function unique(arr: any[]) {
  let len = arr.length;
  let i = -1;
  while (i++ < len) {
    let j = i + 1;
    for (; j < arr.length; ++j) {
      if (arr[i]._id === arr[j]._id) {
        arr.splice(j--, 1);
      }
    }
  }
  return arr;
}