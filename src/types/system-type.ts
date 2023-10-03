import { z } from "zod";

export enum SystemStatus {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
}

export type System = {
  id: number;
  acronym: string;
  description: string;
  email: string | null;
  url: string | null;
  status: SystemStatus;
  updateReason: string | null;
  createdAt: string;
  updatedAt: string;
  createdById: number | null;
  updatedById: number | null;
};

const BaseFieldsSchema = {
  id: z.number({
    required_error: "ID é obrigatório",
  }),
  acronym: z
    .string({
      required_error: "Sigla é obrigatória",
    })
    .max(10, {
      message: "Sigla não pode ter mais que 10 caracteres",
    }),
  description: z
    .string({
      required_error: "Descrição é obrigatória",
    })
    .max(100, {
      message: "Descrição não pode ter mais que 100 caracteres",
    }),
  email: z
    .string({
      required_error: "E-mail é obrigatório",
    })
    .max(100, {
      message: "E-mail não pode ter mais que 100 caracteres",
    })
    .email({
      message: "E-mail inválido",
    })
    .optional(),
  url: z
    .string({
      required_error: "Sigla é obrigatória",
    })
    .max(100, {
      message: "URL não pode ter mais que 100 caracteres",
    })
    .url({
      message: "URL inválida",
    })
    .optional(),
  status: z.nativeEnum(SystemStatus, {
    invalid_type_error: "Status inválido",
    required_error: "Status é obrigatório",
  }),
  updateReason: z
    .string({
      required_error: "Sigla é obrigatória",
    })
    .max(100)
    .optional(),
};

export const CreateSystemSchema = z.object({
  acronym: BaseFieldsSchema.acronym,
  description: BaseFieldsSchema.description,
  email: BaseFieldsSchema.email,
  url: BaseFieldsSchema.url,
});

export const UpdateSystemSchema = z.object({
  acronym: BaseFieldsSchema.acronym,
  description: BaseFieldsSchema.description,
  email: BaseFieldsSchema.email,
  url: BaseFieldsSchema.url,
  status: BaseFieldsSchema.status,
  updateReason: BaseFieldsSchema.updateReason,
});

export type CreateSystemDto = z.infer<typeof CreateSystemSchema>;
export type UpdateSystemDto = z.infer<typeof UpdateSystemSchema>;
