import { Request, Response, NextFunction, Router } from "express";
import { getUser, checkUser, createUser } from "../database/account.models";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

const maxAge = 60 * 60 * 24;

const createToken = (user: any) => {
  return jwt.sign({ username: user.username, mail: user.mail }, "secretKey", {
    expiresIn: maxAge,
  });
};

router.route("/login").post(async (req: Request, res: Response) => {
  const { mail, password } = req.body;

  const user = await checkUser(mail);
  if (!user)
    return res
      .status(401)
      .redirect(
        "/login?error=nosuchaccount&message=Böyle Bir Kullanıcı Bulunamadı."
      );

  const auth = await bcrypt.compare(password, user.password);
  if (!auth)
    return res
      .status(401)
      .redirect("/login?error=wrongpassword&message=Şifre Hatalı.");

  const token = createToken(user);
  res.cookie("token", token, { httpOnly: true, maxAge: maxAge});
  
  res.status(200).redirect("/");
});

router.route("/create").post(async (req: Request, res: Response) => {
  const { username, mail, password } = req.body;

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //create user
  const user = await createUser(username, mail, hashedPassword);

  //checking exist user
  if (user === true)
    return res
      .status(401)
      .redirect(
        "/login?error=existaccount&message=Böyle Bir Kullanıcı Zaten Kayıtlı."
      );

  res.status(200).redirect("/login?success=register&message=Kayıt başarılı. Lütfen giriş yapınız.");
});

export default router;
