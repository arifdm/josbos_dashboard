import { sign } from "jsonwebtoken";

export function generateToken({ data }) {
  return sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export function Rupiah(number) {
  let tempNum = String(number).split("").reverse();
  let rupiah = "";

  for (let i = 0; i < tempNum.length; i++) {
    if ((i + 1) % 3 == 0 && i != tempNum.length - 1) {
      tempNum[i] = `.${tempNum[i]}`;
    }
  }
  //   rupiah = `Rp. ${tempNum.reverse().join("")},00`;
  rupiah = tempNum.reverse().join("");
  return rupiah;
}

export function Truncate(str, max, len) {
  return str.length > max ? str.substring(0, len) + "..." : str;
}
