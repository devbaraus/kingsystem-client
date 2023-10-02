import fetcher from "@/lib/api";
import { TokenPayload } from "@/types/auth-types";

export function authenticate(email: string, password: string): Promise<TokenPayload> {
  return new Promise((resolve, reject) => {
    const data = {
      email: email,
      password: password
    };

    fetcher
      .Post("auth/signin", data)
      .send()
      .then((res) => {
        console.log(res);
        resolve(res as TokenPayload);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
