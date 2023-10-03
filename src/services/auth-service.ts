import fetcher from "@/lib/api";
import { SignInPayload } from "@/types/auth-type";

class AuthService {
  private basePath: string = "/auth";

  public async signIn(email: string, password: string): Promise<SignInPayload | null> {
    try {
      const res = await fetcher(`${this.basePath}/signin`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      return res as SignInPayload;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default AuthService;
