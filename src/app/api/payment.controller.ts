import { Controller, Get, Param, Post, Redirect, Render } from '@nestjs/common';
import { json } from 'express';
import fetch from "node-fetch";

@Controller()
export class PaymentController { 
    
    @Post('api/orders')
    async create(): Promise<any> {
        const order = await createOrder();
        return order;

    }


    @Post("/api/orders/:orderID")
    async findOne(@Param('orderID') orderId: string) {
        const captureData = await capturePayment(orderId);
        return captureData;

    }
}

const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com"
};

// generate an access token using client id and app secret
async function generateAccessToken() {
  const auth = Buffer.from(process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_APP_SECRET).toString("base64")
  const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
    method: "POST",
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

  return fetch ("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "purchase_units": [
        {
          "amount": {
            "currency_code": "USD",
            "value": "1.00"
          }
        }
      ],
      "intent": "CAPTURE",
      "payment_source": {
        "paypal": {
          "experience_context": {
            "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
            "payment_method_selected": "PAYPAL",
            "brand_name": "SOFAS & COUCHES",
            "locale": "en-US",
            "landing_page": "LOGIN",
            "user_action": "PAY_NOW",
          }
        }
      }
    })
  }).then((response) => response.json());
}

async function capturePayment(orderId: string) {

  const accessToken = await generateAccessToken();
  return fetch( `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => response.json());
 
}

