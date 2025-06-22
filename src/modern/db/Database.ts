import { MembershipEntity } from "../repositories/entities/MembershipEntity"
import membershipMock from "../../data/memberships.json"
export class Database {
    private _membershipsSequence: number = 0
    private _periodsSequence: number = 0

    memberships: MembershipEntity[] = []
    periods: MembershipPeriodEntity[] = []

    constructor() {
        this.memberships = membershipMock
}

    get membershipsSequence(): number {
        return this._membershipsSequence++
    }
    
    get periodsSequence(): number {
        return this._periodsSequence++
    }
}