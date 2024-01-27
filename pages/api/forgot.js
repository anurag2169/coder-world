import Forgot from "@/models/Forgot";
export default function handler(req, res) {
  // Check if the user exists in the Database
  // Send an email to the user
  if(req.body.email){

  
  let token = 'efrfer467asihsadbhfs3654'
  let forgot  = new Forgot({
    email: req.body.email,
    token : token
  })
  let email = `We  have sent you this email in response to your request to reset your password on
    Codeswear.com

    To reset your password, please follow the link below:
    <a href="http://codewear.com/forgot?token=${token}">Click here to rest your password </a>

    <br/><br/>

    We recommend that you keep your password secure and not share it with anyone. If you feel your password
    has been compromised, you can change it by going to your My Account Page and change your password.
    <br/><br/>`;
  }else{
    // reset user password
  }
  res.status(200).json({ success: true});
}
