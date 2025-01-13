import { z } from "zod";

export const PaymentStatus = z.enum(["pending", "approved", "rejected"]);
export type PaymentStatus = z.infer<typeof PaymentStatus>;

export const createPaymentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z
    .number()
    .min(0.5, "Amount must be at least $0.50")
    .max(999999.99, "Amount must be less than $1,000,000"),
});

export const paymentSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string(),
  amount: z.number(),
  status: PaymentStatus,
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  stripe_payment_intent_id: z.string().optional(),
  clientSecret: z.string().optional(),
});

export type Payment = z.infer<typeof paymentSchema>;