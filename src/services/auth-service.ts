import fetcher from "@/lib/api";
import { SignInPayload } from "@/types/auth-types";

export async function authenticate(email: string, password: string): Promise<SignInPayload | null> {
  try {
    const res = await fetcher("/auth/signin", {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    });

    return res as SignInPayload;
  } catch (err) {
    console.log(err);
    return null;
  }
}
