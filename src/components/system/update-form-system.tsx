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
import { SystemStatus, UpdateSystemFormDto } from "@/types/system";
import { AsteriskIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format, parseISO } from "date-fns";

type Props = {
  form: UseFormReturn<UpdateSystemFormDto>;
  children?: ReactNode;
  onSubmit: SubmitHandler<UpdateSystemFormDto>;
} & Omit<HTMLAttributes<HTMLFormElement>, "onSubmit">;

export default function UpdateFormSystem({ form, children, onSubmit, className, ...props }: Props) {
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
          <FormLegend>Dados do sistema</FormLegend>
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
        <FormFieldSet className="space-y-4">
          <FormLegend className="text-lg font-medium text-gray-900">Controle do sistema</FormLegend>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Status <AsteriskIcon className="inline-block h-3 w-3 text-destructive" />
                </FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(SystemStatus).map(([key, value]) => (
                        <SelectItem
                          key={key}
                          value={key}
                        >
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="updatedBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário responsável pela última alteração</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    readOnly
                    value={field.value?.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="updatedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data da última alteração</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    readOnly
                    value={
                      field.value ? format(parseISO(field.value as string), "dd/MM/yyyy HH:mm") : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastUpdateReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Justificativa da última alteração</FormLabel>
                <FormControl>
                  <Textarea
                    disabled
                    readOnly
                    value={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="updateReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nova justificativa de alteração{" "}
                  <AsteriskIcon className="inline-block h-3 w-3 text-destructive" />
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
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
