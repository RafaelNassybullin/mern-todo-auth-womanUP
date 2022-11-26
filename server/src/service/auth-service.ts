import { AuthModel } from "../model/auth-model"
import bcrypt from "bcrypt"
import TokenService from "./token-service"
import ApiError from "../exception/apiErrors"
import { DataTemplate } from "../exception/dataTemplate";
import { initData } from "../config";
import { TodoModels } from "../model/todo-model"


export default class AuthService {

  static async registration(name: string, email: string, password: string) {
    const candidate = await AuthModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await AuthModel.create({ name, email, password: hashPassword });
    const userDT = new DataTemplate(user);
    const tokens = TokenService.generateTokens({ ...userDT });
    await TokenService.saveToken(userDT.id, tokens.refreshToken);
    const initialData = initData(`${userDT.id}`)
    await TodoModels.insertMany(initialData)
    return { ...tokens };
  }

  static async login(email: string, password: string) {
    const user = await AuthModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDT = new DataTemplate(user);
    const tokens = TokenService.generateTokens({ ...userDT });
    await TokenService.saveToken(userDT.id, tokens.refreshToken);
    return { ...tokens };
  }

  static async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  static async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError("Ошибка авторизации!!!");
    }
    const userData: any = await TokenService.validateRefreshToken(refreshToken);
    
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError("Ошибка авторизации!!!");
    }
    const user = await AuthModel.findById(userData.id);
    const userDT = new DataTemplate(user);
    const tokens = TokenService.generateTokens({ ...userDT });
    await TokenService.saveToken(userDT.id, tokens.refreshToken);
    return { ...tokens };
  }
}