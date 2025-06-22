import { MembershipState } from "../domain/membership-state"
import { PeriodState } from "../domain/period-state"

export interface MembershipPeriodDto {
    id: number
    uuid: string
    membershipId: number // membership the period is attached to
    start: string // indicates the start of the period
    end: string // indicates the end of the period
    state: PeriodState
}