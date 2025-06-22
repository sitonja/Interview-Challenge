import { MembershipEntity } from "../models/entities/membership.entity"
import { MembershipPeriodEntity } from "../models/entities/membership-period.entity"
import membershipMock from "../../data/memberships.json"
import membershipPeriodsMock from "../../data/membership-periods.json"

export class Database {
    private _membershipsSequence: number = 0
    private _periodsSequence: number = 0

    memberships: MembershipEntity[] = []
    periods: MembershipPeriodEntity[] = []

    constructor() {
        this.memberships = membershipMock as MembershipEntity[] 
        this.periods = membershipPeriodsMock as MembershipPeriodEntity[]
    }

    get membershipsSequence(): number {
        return this._membershipsSequence++
    }
    
    get periodsSequence(): number {
        return this._periodsSequence++
    }
}