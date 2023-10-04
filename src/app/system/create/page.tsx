"use client";

import CreateFormSystem from "@/components/system/create-form-system";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CreateSystemDto, CreateSystemSchema } from "@/types/system";
import { zodResolver } from "@hookform/resolvers/zod";
import SystemService from "@/services/system";
import { Button } from "@/components/ui/button";
import { SaveIcon, Undo2Icon } from "lucide-react";

export default function Page() {
  const router = useRouter();

  const form = useForm<CreateSystemDto>({
    resolver: zodResolver(CreateSystemSchema),
  });

  const service = SystemService;

  function onSubmit(data: CreateSystemDto) {
    return service.create(data);
  }

  return (
    <CreateFormSystem
      form={form}
      onSubmit={onSubmit}
    >
      <div className="flex justify-between">
        <Button
          className="gap-1"
          onClick={() => router.back()}
          type="button"
          variant="outline"
        >
          Voltar
          <Undo2Icon className="inline-block h-5 w-5" />
        </Button>

        <Button
          className="gap-1"
          type="submit"
        >
          Salvar
          <SaveIcon className="inline-block h-5 w-5" />
        </Button>
      </div>
    </CreateFormSystem>
  );
}
