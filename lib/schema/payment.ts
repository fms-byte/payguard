import { z } from "zod";

export const PaymentStatus = z.enum(["pending", "approved", "rejected"]);
export type PaymentStatus = z.infer<typeof PaymentStatus>;

export const createPaymentSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  amount: z.number().min(1, "Amount must be greater than 0"),
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
});

export type Payment = z.infer<typeof paymentSchema>;