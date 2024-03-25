import { sign } from "jsonwebtoken";
import axios from "axios";

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

export function SendFCM(server, to, title, body, data) {
  return new Promise(async (rs) => {
    try {
      let key;
      if (server === "USER") {
        key = process.env.FCM_SERVER_KEY_USER;
      } else if (server === "SPECIALIST") {
        key = process.env.FCM_SERVER_KEY_SPESIALIST;
      }

      const message = {
        to,
        priority: "high",
        soundName: "default",
        notification: { title, body },
        data,
      };
      const response = await axios.post(
        "https://fcm.googleapis.com/fcm/send",
        message,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `key=${key}`,
          },
        }
      );
      return rs(response.data);
    } catch (error) {
      return rs(error);
    }
  });
}
