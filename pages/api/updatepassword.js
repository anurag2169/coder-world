import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method === "POST") {
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    let dbuser = await User.findOne({ email: user.email });
    var bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
    var decryptPassword = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decryptPassword);
    if (
      decryptPassword == req.body.password &&
      req.body.npassword == req.body.cpassword
    ) {
      let dbuser = await User.findOneAndUpdate(
        { email: user.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.cpassword,
            process.env.AES_SECRET
          ).toString(),
        }
      );
      res.status(200).json({ sucess: true });
      return
    }
    res.status(200).json({ sucess: false });
  } else {
    res.status(400).json({ error: "error" });
  }
};
export default connectDb(handler);
