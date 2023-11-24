import { sign } from "jsonwebtoken";

export function generateToken({ data }) {
  return sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });
}
