"use client";

import { HTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateSystemDto, CreateSystemSchema } from "@/types/system-type";
import { Button } from "@/components/ui/button";
import { Asterisk } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import SystemService from "@/services/system-service";
import { useRouter } from "next/navigation";

type Props = {} & HTMLAttributes<HTMLFormElement>;

export default function CreateFormSystem({ ...props }: Props) {
  const router = useRouter();

  const form = useForm<CreateSystemDto>({
    resolver: zodResolver(CreateSystemSchema),
  });

  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const service = SystemService;

  function onSubmit(data: CreateSystemDto) {
    return service.create(data);
  }

  return (
    <Form
      {...props}
      {...form}
    >
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <fieldset className="space-y-4">
          <legend className="text-lg font-medium text-gray-900">Dados do sistema</legend>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Descrição <Asterisk className="inline-block text-destructive" />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acronym"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Sigla <Asterisk className="inline-block text-destructive" />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail de atendimento do sistema</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

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
            type="submit"
          >
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
