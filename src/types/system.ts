import { z } from "zod";
import { User } from "@/types/user";

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
    }),
  url: z
    .string({
      required_error: "Sigla é obrigatória",
    })
    .max(100, {
      message: "URL não pode ter mais que 100 caracteres",
    })
    .url({
      message: "URL inválida",
    }),
  status: z.nativeEnum(SystemStatus, {
    invalid_type_error: "Status inválido",
    required_error: "Status é obrigatório",
  }),
  updateReason: z
    .string({
      required_error: "Justificativa é obrigatória",
    })
    .nonempty({
      message: "Justificativa é obrigatória",
    })
    .max(500, {
      message: "Justificativa não pode ter mais que 100 caracteres",
    }),
};

export const CreateSystemSchema = z.object({
  acronym: BaseFieldsSchema.acronym,
  description: BaseFieldsSchema.description,
  email: BaseFieldsSchema.email.optional().or(z.literal("")),
  url: BaseFieldsSchema.url.optional().or(z.literal("")),
});

export const UpdateSystemSchema = z.object({
  acronym: BaseFieldsSchema.acronym,
  description: BaseFieldsSchema.description,
  email: BaseFieldsSchema.email.optional().or(z.literal("")),
  url: BaseFieldsSchema.url.optional().or(z.literal("")),
  status: BaseFieldsSchema.status,
  updateReason: BaseFieldsSchema.updateReason,
});

export const FindSystemSchema = z.object({
  acronym: BaseFieldsSchema.acronym.optional().or(z.literal("")),
  description: BaseFieldsSchema.description.optional().or(z.literal("")),
  email: BaseFieldsSchema.email.optional().or(z.literal("")),
});

export type CreateSystemDto = z.infer<typeof CreateSystemSchema>;
export type UpdateSystemDto = z.infer<typeof UpdateSystemSchema>;

export type UpdateSystemFormDto = UpdateSystemDto & {
  lastUpdateReason?: string | null;
  updatedAt?: string | null;
  updatedById?: number | null;
  updatedBy: User | null;
};
export type FilterSystemDto = z.infer<typeof FindSystemSchema>;
