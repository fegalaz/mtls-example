import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
const port = 3000;
const host = "127.0.0.1";
const app = express();

app.use(cors());

app.get("/api/v1/mtls", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Certificado verificado",
  });
});

app.listen(port, host, () => {
  console.log("Corriendo en el puerto",port);
});
