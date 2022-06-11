import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { checkUser } from "../database/account.models";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, "secretKey") as any

    const user = await checkUser(decodedToken.mail)

    if(user === null) return res
    .status(401)
    .redirect(
      "/login?error=baduserlogin&message=Bunu yapabilmek için giriş yapmanız gereklidir."
    );

    next();

    return decodedToken
  } catch (e) {
    return res
      .status(401)
      .redirect(
        "/login?error=baduserlogin&message=Bunu yapabilmek için giriş yapmanız gereklidir."
      );
  }
};

export default checkAuth;
