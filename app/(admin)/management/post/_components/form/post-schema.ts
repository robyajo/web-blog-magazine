import { z } from "zod";

const requiredString = z.string().trim().min(1, "Harus diisi");

export const postSchema = z.object({
  name: requiredString.max(255, "Maksimal 255 karakter"),
  categori_id: z
    .union([z.string().trim().min(1), z.number()])
    .optional()
    .nullable(),
  status: z.enum(["draft", "published"]).default("draft"),
  tags: z.string().trim().optional().nullable(),
  image_url: z.string().trim().url("URL tidak valid").optional().nullable(),
  content: requiredString,
  description: z.string().trim().optional().nullable(),
});

export type PostFormValues = z.input<typeof postSchema>;
