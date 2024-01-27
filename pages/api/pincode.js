import pincodes from "../../pincodes";

export default function handler(req, res) {
  res.status(200).json(pincodes);
}
