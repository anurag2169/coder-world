import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    // console.log(req.body);
    const { name, email } = req.body;
    let u = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()
    });
    await u.save();
    res.status(200).json({ success: "successful done" });
  } else {
    res.status(400).json({ error: "This methos is not allowed" });
  }
};
export default connectDb(handler);
