import { z } from "zod";

export const patientQuerySchema = z.object({
  department: z.string().trim().min(1).optional(),
  status: z.string().trim().min(1).optional(),
  search: z.string().trim().min(1).optional(),
});
