import axios, { AxiosError } from "axios";
import https from "https";
import fs from "fs";

const getRequestWithCertificate = async () => {
  try {
    const cert = fs.readFileSync("certs/client.crt");
    const key = fs.readFileSync("certs/client.key");
    const hostName = "192.168.0.20";
    const httpsAgent = new https.Agent({
      cert,
      key,
      rejectUnauthorized: false,
    });

    const response = await axios.get(`https://${hostName}/api/v1/mtls`, {
      httpsAgent,
    });
    console.log(response.data);
  } catch (e: any) {
    const error = e as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      console.log("native error");
      console.log(error);
    } else {
      if (error.request) {
        console.log("request error");
        console.log(error.request);
      }
      if (error.response) {
        console.log("response error");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  }
};

setTimeout(() => {
  getRequestWithCertificate();
}, 1000);
