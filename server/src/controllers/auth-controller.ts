import { Response, Request, NextFunction } from "express";
import AuthService from "../service/auth-service";

export default class AuthController {

  static async registration(req: Request<{}, {}, { name: string, email: string, password: string }>, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      const user = await AuthService.registration(name, email, password);
      res.cookie("refreshToken", user.refreshToken, { maxAge: 5 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.status(200).json(user);
    } catch (e) {
      next(e)
      return
    }
  }

  static async login(req: Request<{}, {}, { email: string, password: string }>, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await AuthService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, { maxAge: 5 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.status(200).json(user);
    } catch (e) {
      next(e)
      return
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      const token = await AuthService.logout(refreshToken);
      res.clearCookie("refreshToken");

      return res.json(token);
    } catch (e) {
      next(e)
      return
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      const user = await AuthService.refresh(refreshToken);
      res.cookie("refreshToken", user.refreshToken, { maxAge: 1.5 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.json(user);
    } catch (e) {
      next(e)
      return;
    }
  }
}