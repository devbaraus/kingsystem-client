import fetcher from "@/lib/api";
import { SignInPayload } from "@/types/auth";

class AuthService {
  private basePath: string = "/auth";

  public async signIn(email: string, password: string): Promise<SignInPayload | null> {
    try {
      const { data } = await fetcher.post(`${this.basePath}/signin`, {
        email,
        password,
      });

      return data as SignInPayload;
    } catch (err) {
      return null;
    }
  }
}

export default AuthService;
