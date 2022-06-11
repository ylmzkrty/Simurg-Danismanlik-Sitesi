import { NextFunction, Request, Response, Router } from "express";
import { createOrder } from "../database/order.models";
import { createTicket } from "../database/ticket.models";
import checkAuth from "./checkAuth";

const router = Router();

const paketList = [
  "bronze",
  "silver",
  "gold",
  "platinium",
  "diamond",
  "titanium",
];

router
  .route("/odeme")
  .post(checkAuth, async (req: Request, res: Response, next: NextFunction) => {
    let body = req.body;

    if (body.paket === undefined || !paketList.includes(body.paket))
      return res.redirect(
        "/odeme?error=noselectedtype&message=Satın Alma İşlemi Gerçekletirilemedi. Paket türü seçilmemiş."
      );

    const user = await checkAuth(req, res, next);

    createOrder({ body, user: user });

    res.redirect(
      "/odeme?success=successfulpurchase&message=Satın Alma İşlemi Başarıyla Gerçekleşti."
    );
  });


  router.route('/iletisim').post(async (req: Request, res: Response, next: NextFunction) => {
    let body = req.body;
    
    await createTicket(body)
    return res.redirect("/iletisim")
  });


export default router;
