"use client";

import { HTMLAttributes, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormFieldSet,
  FormItem,
  FormLabel,
  FormLegend,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { FilterSystemDto } from "@/types/system";
import { cn } from "@/lib/utils";

type Props = {
  form: UseFormReturn<FilterSystemDto>;
  children?: ReactNode;
  onSubmit: SubmitHandler<FilterSystemDto>;
} & Omit<HTMLAttributes<HTMLFormElement>, "onSubmit">;

export default function FilterFormSystem({ form, children, onSubmit, className, ...props }: Props) {
  return (
    <Form
      {...props}
      {...form}
    >
      <form
        className={cn("space-y-8", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormFieldSet>
          <FormLegend>Filtro de Consulta</FormLegend>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
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
                <FormLabel>Sigla</FormLabel>
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
        </FormFieldSet>
        {children}
      </form>
    </Form>
  );
}
