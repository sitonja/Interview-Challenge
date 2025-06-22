export interface CreateMembershipDto {
    name: string
    recurringPrice: number
    paymentMethod: string,
    billingInterval: string
    billingPeriods: number
    validFrom: string
}