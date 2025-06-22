export interface Membership {
    id: number
    uuid: string
    name: string // name of the membership
    user: number // the user that the membership is assigned to
    recurringPrice: number // price the user has to pay for every period
    validFrom: Date // start of the validity
    validUntil: Date // end of the validity
    state: "pending" | "active" | "expired" // indicates the state of the membership
    paymentMethod: "cash" | "credit card" | null  // which payment method will be used to pay for the periods
    billingInterval: "yearly" | "monthly" | "weekly" // the interval unit of the periods
    billingPeriods: number // the number of periods the membership has
    assignedBy: string    
}