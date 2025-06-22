import { BillingInterval } from "./billing-interval"
import { MembershipState } from "./membership-state"
import { PaymentMethod } from "./payment-method"

export interface Membership {
    id: number
    uuid: string
    name: string // name of the membership
    user: number // the user that the membership is assigned to
    recurringPrice: number // price the user has to pay for every period
    validFrom: Date // start of the validity
    validUntil: Date // end of the validity
    state: MembershipState // indicates the state of the membership
    paymentMethod: PaymentMethod  // which payment method will be used to pay for the periods
    billingInterval: BillingInterval // the interval unit of the periods
    billingPeriods: number // the number of periods the membership has
    assignedBy: string    
}