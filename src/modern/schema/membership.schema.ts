import { z } from "zod";

export const membershipSchema = z.object({
  name: z.string(),
  recurringPrice: z.number().positive(),
  paymentMethod: z.enum(["cash", "credit card"]).optional(),
  billingInterval: z.enum(["weekly", "monthly", "yearly"], {
    message: "invalidBillingPeriods"
  }),
  billingPeriods: z.number().positive(),
  validFrom: z.string().optional()
}).refine((data) => !(data.paymentMethod === "cash" && data.recurringPrice < 100), {
    message: "cashPriceBelow100"
}).refine((data) => !(data.billingInterval === "monthly" && data.billingPeriods < 6), {
    message: "billingPeriodsLessThan6Months"
}).refine((data) => !(data.billingInterval === "yearly" && data.billingPeriods > 10), {
    message: "billingPeriodsMoreThan10Years"
}).refine((data) => !(data.billingInterval === "yearly" && data.billingPeriods < 3), {
    message: "billingPeriodsLessThan3Years"
});