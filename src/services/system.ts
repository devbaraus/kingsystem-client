import fetcher from "@/lib/api";
import { CreateSystemDto, FilterSystemDto, System, UpdateSystemDto } from "@/types/system";
import { toast } from "@/components/ui/use-toast";
import { Pagination } from "@/types/pagination";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CanceledError } from "axios";

class SystemService {
  private basePath: string = "/system";

  public async create(dto: CreateSystemDto, options?: AxiosRequestConfig) {
    try {
      const { data } = await fetcher.post<System>(this.basePath, dto, options);
      toast({
        title: "Sistema criado.",
        description: "O sistema foi criado com sucesso.",
        variant: "success",
      });
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err instanceof CanceledError) return null;

        const { response, message } = err as AxiosError;
        const { status } = response as AxiosResponse;

        status === 409 &&
          toast({
            title: "Erro ao criar sistema.",
            description: "Já existe um sistema com essa sigla.",
            variant: "error",
          });

        status === 400 &&
          toast({
            title: "Erro ao criar sistema.",
            description: message,
            variant: "error",
          });

        status === 401 &&
          toast({
            title: "Erro ao criar sistema.",
            description: "Você não tem permissão para criar sistemas.",
            variant: "error",
          });

        return null;
      }
      toast({
        title: "Erro ao criar sistema.",
        description: "Ocorreu um erro ao criar sistema.",
        variant: "error",
      });

      return null;
    }
  }

  public async update(id = 0, dto: UpdateSystemDto, options?: AxiosRequestConfig) {
    try {
      const { data } = await fetcher.put<System>(`${this.basePath}/${id}`, dto, {
        ...options,
      });

      toast({
        title: "Sistema atualizado.",
        description: "O sistema foi atualizado com sucesso.",
        variant: "success",
      });

      return data;
    } catch (err) {
      const toastTitle = "Erro ao atualizar sistema.";

      if (axios.isAxiosError(err)) {
        if (err instanceof CanceledError) return null;

        const { response, message } = err as AxiosError;
        const { status } = response as AxiosResponse;

        status === 400 &&
          toast({
            title: toastTitle,
            description: message,
            variant: "error",
          });

        status === 401 &&
          toast({
            title: toastTitle,
            description: "Você não tem permissão para atualizar sistema.",
            variant: "error",
          });

        status === 404 &&
          toast({
            title: toastTitle,
            description: "Sistema não encontrado.",
            variant: "error",
          });

        return null;
      }

      toast({
        title: toastTitle,
        description: "Ocorreu um erro ao atualizar o sistema.",
        variant: "error",
      });

      return null;
    }
  }

  public async get(id = 0, options?: AxiosRequestConfig) {
    try {
      const { data } = await fetcher.get<System>(`${this.basePath}/${id}`, {
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
            title: "Erro ao buscar sistema.",
            description: message,
            variant: "error",
          });

        status === 401 &&
          toast({
            title: "Erro ao buscar sistema.",
            description: "Você não tem permissão para buscar sistema.",
            variant: "error",
          });

        status === 404 &&
          toast({
            title: "Erro ao buscar sistema.",
            description: "Sistema não encontrado.",
            variant: "error",
          });

        return null;
      }

      toast({
        title: "Erro ao criar sistema.",
        description: "Ocorreu um erro ao buscar sistema.",
        variant: "error",
      });

      return null;
    }
  }

  public async list(
    page = 0,
    orderBy: string = "id",
    where?: FilterSystemDto,
    options?: AxiosRequestConfig,
  ) {
    try {
      const { data } = await fetcher.get<Pagination<System>>(this.basePath, {
        ...options,
        params: {
          page,
          orderBy,
          where,
        },
      });

      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err instanceof CanceledError) return null;

        const { response, message } = err as AxiosError;
        const { status } = response as AxiosResponse;

        status === 400 &&
          toast({
            title: "Erro ao buscar sistemas.",
            description: message,
            variant: "error",
          });

        status === 401 &&
          toast({
            title: "Erro ao buscar sistemas.",
            description: "Você não tem permissão para buscar sistemas.",
            variant: "error",
          });

        return null;
      }

      toast({
        title: "Erro ao criar sistema.",
        description: "Ocorreu um erro ao buscar sistema.",
        variant: "error",
      });

      return null;
    }
  }
}

export default new SystemService();
