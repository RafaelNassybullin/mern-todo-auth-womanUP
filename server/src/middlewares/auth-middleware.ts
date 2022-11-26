import { Response, Request, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../exception/apiErrors";
import TokenService from "../service/token-service";

export function AuthMiddleware(req: Request, _: Response, next: NextFunction) {
  try {
    //переменная заголовка авторизации, токен 
    const authorizationHeader: string | undefined = req.headers.authorization;
    //если нет заголовка авторизации то выводим ошибку авторизации
    if (!authorizationHeader) {
      next(ApiError.UnauthorizedError("Ошибка авторизации!!!"));
      return 
    }
    //делим тип от токена, например строку Bearer 34nbhur45befhcnjfd63jnven.ndjsnfj 
    const accessToken: string | undefined = authorizationHeader.split(" ")[1];
    //если токена нет, то выводим ошибку 
    if (!accessToken) {
      next(ApiError.UnauthorizedError("Ошибка авторизации!!!"));
      return 
    }
    //проверяем валидность access токена с помощью метода validateAccessToken
    const user: string | JwtPayload | null = TokenService.validateAccessToken(accessToken);
    //если токен не валиден выводим ошибку
    if (!user) {
      next(ApiError.UnauthorizedError("Ошибка авторизации!!!"));
      return 
    }
    //создаем в обьекте реквест поле юзер и вводим туда валидный access token
    req.user = user;
    
    next()
    return
  } catch {
    //отлавливаем ошибку
    next(ApiError.BadRequest("Непредвиденная ошибка"));
    return 
  }
};
