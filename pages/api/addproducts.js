import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = new Product({
        title: req.body[i].title,
        slug: req.body[i].slug,
        desc: req.body[i].desc,
        img: req.body[i].img,
        category: req.body[i].category,
        color: req.body[i].color,
        size: req.body[i].size,
        price: req.body[i].price,
        brandname: req.body[i].brandname,
        availableQty: req.body[i].availableQty,
      });
      await p.save();
    }
    res.status(200).json({ success: "sucessfully done from api" });
  } else {
    res.status(400).json({ error: "This methos is not allowed" });
  }
};
export default connectDb(handler);
