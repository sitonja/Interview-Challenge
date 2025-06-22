export interface MembershipEntity {
    id: number
    uuid: string
    name: string // name of the membership
    user: number // the user that the membership is assigned to
    recurringPrice: number // price the user has to pay for every period
    validFrom: string // start of the validity
    validUntil: string // end of the validity
    state: string // indicates the state of the membership
    paymentMethod: string | null // which payment method will be used to pay for the periods
    billingInterval: string // the interval unit of the periods
    billingPeriods: number // the number of periods the membership has
}