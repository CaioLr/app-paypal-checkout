import { Controller, Param, Post } from '@nestjs/common';
import { json } from 'express';

@Controller('payment.controller')
export class PaymentController {
    
    @Post('api/orders')
    async create(): Promise<any[]> {
        const order = await createOrder();
        return [json(order)];

    }


    // @Post("/api/orders/:orderID/capture")
    // findOne(@Param() params:string[])
    // async capture(): Promise<any[]> {
    //     const captureData = await capturePayment(order_id);
    //     return [json(captureData)];

    // }
}

const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com"
};

// generate an access token using client id and app secret
async function generateAccessToken() {
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_APP_SECRET).toString("base64")
  const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = await response.json();
  return data.access_token;
}

async function createOrder() {
  const accessToken = await generateAccessToken();
  return accessToken ;
}
  