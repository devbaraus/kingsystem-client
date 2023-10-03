import fetcher from "@/lib/api";
import { CreateSystemDto } from "@/types/system-type";
import { toast } from "@/components/ui/use-toast";

class SystemService {
  private basePath: string = "/system";

  public async create(system: CreateSystemDto) {
    return fetcher
      .post(`${this.basePath}`, system)
      .then(({ data }) => {
        toast({
          title: "Sistema criado.",
          description: "O sistema foi criado com sucesso.",
          variant: "success",
        });
        return data;
      })
      .catch(({ response: { status }, message }) => {
        if (status === 409) {
          return toast({
            title: "Erro ao criar sistema.",
            description: "Já existe um sistema com essa sigla.",
            variant: "error",
          });
        }
        return toast({
          title: "Erro ao criar sistema.",
          description: message,
          variant: "error",
        });
      });
  }

  // public async update(system: UpdateSystemDto) {
  //   try {
  //     const res: System = await fetcher(`${this.basePath}`, {
  //       method: "PUT",
  //       body: JSON.stringify(system),
  //       headers: {
  //         Authorization: `Bearer ${this.token}`,
  //       },
  //     });
  //
  //     return res;
  //   } catch (err) {
  //     console.log(err);
  //     return null;
  //   }
  // }
  //
  // public async get(id: number) {
  //   try {
  //     const res: System = await fetcher(`${this.basePath}/${id}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${this.token}`,
  //       },
  //     });
  //
  //     return res;
  //   } catch (err) {
  //     console.log(err);
  //     return null;
  //   }
  // }
  //
  // public async list(page = 0, orderBy?: string, where?: never) {
  //   try {
  //     const queryParams = new URLSearchParams();
  //     queryParams.append("page", page.toString());
  //     queryParams.append("orderBy", orderBy || "id");
  //     where && queryParams.append("where", JSON.stringify(where));
  //
  //     const res: Pagination<System> = await fetcher(`${this.basePath}?${queryParams.toString()}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${this.token}`,
  //       },
  //     });
  //
  //     return res;
  //   } catch (err) {
  //     console.log(err);
  //     return null;
  //   }
  // }
}

export default new SystemService();
