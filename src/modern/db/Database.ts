import { MembershipEntity } from "../models/entities/membership.entity"
import { MembershipPeriodEntity } from "../models/entities/membership-period.entity"
import membershipMock from "../../data/memberships.json"
import membershipPeriodsMock from "../../data/membership-periods.json"

export class Database {
    membershipsSequenceIndex: number = 0
    periodsSequenceIndex: number = 0

    memberships: MembershipEntity[] = []
    periods: MembershipPeriodEntity[] = []

    constructor() {
        this.memberships = membershipMock as MembershipEntity[] 
        this.periods = membershipPeriodsMock as MembershipPeriodEntity[]
        this.membershipsSequenceIndex = this.memberships.length
        this.periodsSequenceIndex = this.periods.length
    }

}