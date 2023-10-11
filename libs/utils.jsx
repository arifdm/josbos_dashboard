import { sign } from "jsonwebtoken";

export function generateToken({ user }) {
  return sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });
}
