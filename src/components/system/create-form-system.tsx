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
import { CreateSystemDto } from "@/types/system";
import { AsteriskIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  form: UseFormReturn<CreateSystemDto>;
  children?: ReactNode;
  onSubmit: SubmitHandler<CreateSystemDto>;
} & Omit<HTMLAttributes<HTMLFormElement>, "onSubmit">;

export default function CreateFormSystem({ form, children, onSubmit, className, ...props }: Props) {
  return (
    <Form
      {...props}
      {...form}
    >
      <form
        className={cn("space-y-8", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormFieldSet className="space-y-4">
          <FormLegend className="text-lg font-medium text-gray-900">Dados do sistema</FormLegend>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Descrição <AsteriskIcon className="inline-block h-3 w-3 text-destructive" />
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
                  Sigla <AsteriskIcon className="inline-block h-3 w-3 text-destructive" />
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
        </FormFieldSet>

        {children}
      </form>
    </Form>
  );
}
