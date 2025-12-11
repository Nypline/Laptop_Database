import { z } from "zod";

export const brandSchema = z.object({
  name: z.string().min(1, "Nama brand wajib diisi"),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi"),
});

export const laptopSchema = z.object({
  brand_id: z.number().int().positive(),
  category_id: z.number().int().positive(),
  model: z.string().min(1),
  price: z.number().int().positive(),
  release_year: z.number().int().optional(),
  description: z.string().optional(),
});
