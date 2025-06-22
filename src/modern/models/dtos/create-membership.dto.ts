import { BillingInterval } from "../domain/billing-interval"
import { PaymentMethod } from "../domain/payment-method"

export interface CreateMembershipDto {
    name: string
    recurringPrice: number
    paymentMethod: PaymentMethod,
    billingInterval: BillingInterval
    billingPeriods: number
    validFrom: string
}