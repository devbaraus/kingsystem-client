import fetcher from "@/lib/api";
import { User } from "@/types/user-type";

class UserService {
  private basePath: string = "/user";

  constructor(private token: string) {}

  public async profile(): Promise<User | null> {
    try {
      const res: User = await fetcher(`${this.basePath}/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      return res;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default UserService;
