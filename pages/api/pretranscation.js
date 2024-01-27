import { resolve } from "path";
const https = require("https");
const PaytmChecksum = require("paytmchecksum");
import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
import pincodes from "../../pincodes";

const handler = async (req, res) => {
  if (req.method == "POST") {
    // check the pincode is servicable or not
    if (!Object.keys(pincodes).includes(req.body.pincode)) {
      res.status(200).json({
        success: false,
        error: "The pincode you have enter is not serviceable",

      });
      return;
    }

    // Check if the cart is tampered with -
    let product,
      sumTotal = 0;
    let cart = req.body.cart;
    if (req.body.subTotal <= 0) {
      res.status(200).json({
        success: false,
        error: "Cart Empty! Please build your cart and try again!",
      });
      return;
    }
    for (let item in cart) {
      sumTotal += cart[item].price * cart[item].qty;
      product = await Product.findOne({ slug: item });
      // Check if the cart items are out of stock
      if (product.availableQty < cart[item].qty) {
        res.status(200).json({
          success: false,
          error: "Some items in your cart went out of stock. Please try again!",
        });
      }
      if (product.price != cart[item].price) {
        res.status(200).json({
          success: false,
          error:
            "The price of some items in your cart have changed. Please try again",
        });
        return;
      }
      if (sumTotal !== req.body.subTotal) {
        res.status(200).json({
          success: false,
          error:
            "The price of some items in your cart have changed.  Please try again",
        });
        return;
      }
      // chheck if the details are valid --
      if (
        req.body.phone.length !== 10 ||
        !Number.isInteger(Number(req.body.phone))
      ) {
        res.status(200).json({
          success: false,
          error: "Please enter your 10 digit phone number",
        });
        return;
      }
      if (
        req.body.pincode.length !== 6 ||
        !Number.isInteger(Number(req.body.pincode))
      ) {
        res.status(200).json({
          success: false,
          error: "Please enter your 6 digit pincode",
        });
        return;
      }

      // initiating an order corresponding to this order
      let order = new Order({
        email: req.body.email,
        orderId: req.body.oid,
        address: req.body.address,
        city: req.body.ciity,
        pincode: req.body.pincode,
        name: req.body.name,
        phone: req.body.phone,
        amount: req.body.subTotal,
        product: req.body.cart,
      });
      await order.save();
      var paytmParams = {};

      paytmParams.body = {
        requestType: "Payment",
        mid: process.env.NEXT_PUBLIC_PAYTM_MID,
        websiteName: "YOUR_WEBSITE_NAME",
        orderId: req.body.oid,
        callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttranscation`,
        txnAmount: {
          value: "1.00",
          currency: "INR",
        },
        userInfo: {
          custId: req.body.email,
        },
      };

      /*
       * Generate checksum by parameters we have in body
       * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
       */
      const checksum = await PaytmChecksum.generateSignature(
        JSON.stringify(paytmParams.body),
        process.env.PAYTM_MKEY
      );
      paytmParams.head = {
        signature: checksum,
      };

      var post_data = JSON.stringify(paytmParams);

      const requestAsync = () => {
        var options = {
          /* for Staging */
          // hostname: "securegw-stage.paytm.in"
          /* for Production */
          hostname: "securegw.paytm.in",

          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            console.log("Response: ", response);
            resolve(JSON.parse(response).body);
          });
        });

        post_req.write(post_data);
        post_req.end();
      };

      let myr = await requestAsync();
      res.status(200).json(myr);
    }
  }
};
export default connectDb(handler);
