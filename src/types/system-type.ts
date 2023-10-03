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
  id: z.number(),
  acronym: z
    .string()
    .max(100)
    .regex(/^[a-zA-Z0-9]+$/),
  description: z.string().max(100),
  email: z.string().max(100).email().optional(),
  url: z.string().max(100).url().optional(),
  status: z.nativeEnum(SystemStatus),
  updateReason: z.string().max(100).optional(),
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
