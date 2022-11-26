import jwt from "jsonwebtoken";
import AuthToken from "../model/token-model";

export default class TokenService {

  static generateTokens(payload: {name: string, email: string, id: string}) {

    const accessToken = jwt.sign(payload, process.env["JWT_ACCESS_SECRET"] || "jwt-secret-key", {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(payload, process.env["JWT_ACCESS_SECRET"] || "jwt-secret-key", {
      expiresIn: "24h",
    });
   
    return {
      accessToken,
      refreshToken,
    };
  }

  static validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env["JWT_ACCESS_SECRET"] || "jwt-secret-key");
      return userData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env["JWT_ACCESS_SECRET"] || "jwt-secret-key");
      return userData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async saveToken(userId: string, refreshToken: string) {
    const tokenData = await AuthToken.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return await AuthToken.create({ user: userId, refreshToken });
  }

  static async removeToken(refreshToken: string) {
    return AuthToken.deleteOne({ refreshToken });
  }

  static async findToken(refreshToken: string) {
    return AuthToken.find({ refreshToken });
  }
}