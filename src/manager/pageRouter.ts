import { Request, Response, NextFunction, Router } from "express";
import checkAuth from "./checkAuth";
const router = Router();
import jwt from "jsonwebtoken";
import { checkUser } from "../database/account.models";


const paketList = [
  "bronze",
  "silver",
  "gold",
  "platinium",
  "diamond",
  "titanium",
];


const checkUserLogin = async(req: Request) => {
  try {
  const token = req.cookies.token;
    const decodedToken = jwt.verify(token, "secretKey") as any

    const user = await checkUser(decodedToken.mail)
    if(user) return true 
    else return false
  } catch {
    return false
  }
}

//
router.route("/login").get(async (req: Request, res: Response) => {
  let alert = null;

  if (req.query.error) {
    alert = `Hata: ${req.query.message}`;
  } else if (req.query.success) {
    alert = `Başarılı: ${req.query.message}`;
  }

  res.render("login", { alert });
});

//
router.route("/").get(async (req: Request, res: Response) => {
  const user = await checkUserLogin(req)

  res.render("index", { user });
});

//
router.route("/danismanlik").get(async (req: Request, res: Response) => {
  const user = await checkUserLogin(req)

  res.render("danismanlik", { user });
});

//
router.route("/hakkinda").get(async (req: Request, res: Response) => {
  const user = await checkUserLogin(req)

  res.render("hakkinda", { user });
});

//
router.route("/referanslar").get(async (req: Request, res: Response) => {
  const user = await checkUserLogin(req)

  res.render("referanslar", { user });
});

//
router.route("/iletisim").get(async (req: Request, res: Response) => {
  const user = await checkUserLogin(req)

  res.render("iletisim", { user });
});

//
router.route("/odeme").get(checkAuth, async (req: Request, res: Response) => {
  let alert = null;

  if (req.query.paket !== undefined && !paketList.includes(req.query.paket as string))
    return res
      .status(404)
      .send(
        '<p>Boyle bir paket bulunamadi. <a href="/#text">Paketleri görmek için tıklayınız.</a></p>'
      );

      if(req.query.success) {
        alert = req.query.message
      }

      if(req.query.error) {
        alert = req.query.message
      }

  res.render("odeme", { paket: req.query.paket, alert });
});

router.route("*").get(async (req: Request, res: Response) => {
  res
    .status(404)
    .send(
      '<p>Boyle bir sayfa bulunamadi. <a href="/">Ana Sayfaya Gitmek Icin Tiklayiniz.</a></p>'
    );
});

export default router;
