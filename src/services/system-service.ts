import fetcher from "@/lib/api";
import { CreateSystemDto, System, UpdateSystemDto } from "@/types/system-type";
import { Pagination } from "@/types/pagination-type";

class SystemService {
  private basePath: string = "/system";

  constructor(private token: string) {}

  public async create(system: CreateSystemDto) {
    try {
      const res: System = await fetcher(`${this.basePath}`, {
        method: "POST",
        body: JSON.stringify(system),
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

  public async update(system: UpdateSystemDto) {
    try {
      const res: System = await fetcher(`${this.basePath}`, {
        method: "PUT",
        body: JSON.stringify(system),
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

  public async get(id: number) {
    try {
      const res: System = await fetcher(`${this.basePath}/${id}`, {
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

  public async list(page = 0, orderBy?: string, where?: never) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("orderBy", orderBy || "id");
      where && queryParams.append("where", JSON.stringify(where));

      const res: Pagination<System> = await fetcher(`${this.basePath}?${queryParams.toString()}`, {
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

export default SystemService;
