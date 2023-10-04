import fetcher from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CanceledError } from "axios";
import { User } from "@/types/user";

class UserService {
  private basePath: string = "/user";

  public async get(id = 0, options?: AxiosRequestConfig) {
    try {
      const { data } = await fetcher.get<User>(`${this.basePath}/${id}`, {
        ...options,
      });

      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err instanceof CanceledError) return null;

        const { response, message } = err as AxiosError;
        const { status } = response as AxiosResponse;

        status === 400 &&
          toast({
            title: "Erro ao buscar usuário.",
            description: message,
            variant: "error",
          });

        status === 401 &&
          toast({
            title: "Erro ao buscar usuário.",
            description: "Você não tem permissão para buscar usuário.",
            variant: "error",
          });

        status === 404 &&
          toast({
            title: "Erro ao buscar usuário.",
            description: "Usuário não encontrado.",
            variant: "error",
          });

        return null;
      }

      toast({
        title: "Erro ao criar usuário.",
        description: "Ocorreu um erro ao criar o usuário.",
        variant: "error",
      });

      return null;
    }
  }
}

export default new UserService();
