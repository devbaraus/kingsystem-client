"use client";

import UpdateFormSystem from "@/components/system/update-form-system";
import { useForm } from "react-hook-form";
import { UpdateSystemFormDto, UpdateSystemSchema } from "@/types/system";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import SystemService from "@/services/system";
import UserService from "@/services/user";

enum State {
  LOADING,
  RELOADING,
  DONE,
}

export default function Page() {
  const router = useRouter();
  const { id } = useParams();

  const form = useForm<UpdateSystemFormDto>({
    resolver: zodResolver(UpdateSystemSchema),
  });
  const [state, setState] = useState<State>(State.LOADING);

  const fetchSystem = useCallback(
    async (id: number, state: State = State.LOADING) => {
      setState(state);

      const system = await SystemService.get(id);

      if (!system) return;

      const updatedById = system.updatedById || system.createdById;
      const updatedAt = system.updatedAt || system.createdAt;
      const lastUpdateReason = system.updateReason;
      const updatedBy = await UserService.get(updatedById!);

      form.reset({
        acronym: system.acronym,
        description: system.description,
        email: system.email || "",
        url: system.url || "",
        status: system.status,
        updateReason: "",
        updatedAt,
        lastUpdateReason,
        updatedBy,
      });

      setState(State.DONE);
    },
    [form],
  );

  function onSubmit(data: UpdateSystemFormDto) {
    return SystemService.update(Number(id), data).then(() => {
      return fetchSystem(Number(id), State.RELOADING);
    });
  }

  useEffect(() => {
    fetchSystem(Number(id));
  }, [fetchSystem, id]);

  if (state === State.LOADING) {
    return <div>Carregando...</div>;
  }

  return (
    <UpdateFormSystem
      form={form}
      onSubmit={onSubmit}
    >
      <div className="flex justify-between">
        <Button
          className="uppercase"
          onClick={() => router.back()}
          type="button"
          variant="outline"
        >
          Voltar
        </Button>

        <Button
          className="uppercase"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          Salvar
        </Button>
      </div>
    </UpdateFormSystem>
  );
}
