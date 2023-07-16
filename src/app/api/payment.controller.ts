import { Controller, Param, Post, RawBodyRequest, Req } from '@nestjs/common';
import fetch from "node-fetch";

@Controller()
export class PaymentController { 
    //Make the order
    @Post('api/orders')
    async create(@Req() req : RawBodyRequest<Request> ): Promise<any> {
      console.log(req.body);
      const order = await createOrder(req.body);
      return order;
    }

    //Returns orderID
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

//Returns the orderId for button works
async function createOrder(body) {
  const accessToken = await generateAccessToken();

  const value = parseFloat(body.value).toFixed(2)

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
            "value": value.toString()
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
      },
      "payer":{
        "email_addres": body.email.toString(),
        "name": {
          "given_name":body.firstName.toString(),
          "surname": body.lastName.toString()
        },
        "address": {
          "address_line_1": body.address1.toString(),
          "address_line_2": body.address2.toString(),
          "admin_area_1": body.state.toString(),
          "postal_code": body.zip.toString(),
          "country_code": body.country.toString()
        }
      }

    })
  }).then((response) => response.json());
}

//Returs payment info
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

