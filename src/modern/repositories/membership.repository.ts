import { Database } from "../db/database";
import { MembershipContainer } from "../models/domain/membership-container";
import { MembershipEntity } from "../models/entities/membership.entity";
import { MembershipPeriodMapper } from "../models/mappers/membership-period.mapper";
import { MembershipMapper } from "../models/mappers/membership.mapper";

import { IMembershipRepository } from "./interfaces/IMembershipRepository"

export class MembershipRepository implements IMembershipRepository {
    constructor(private db: Database) {}

    findAll(): MembershipContainer[] {
        return this.db.memberships.map(mem => {
            return {
                membership: MembershipMapper.toDomain(mem),
                periods: this.db.periods
                    .filter(p => p.membershipId === mem.id)
                    .map(period => MembershipPeriodMapper.toDomain(period))
            }
        })
    }

    create(membershipContainer: MembershipContainer): MembershipContainer {
        const membership = membershipContainer.membership
        const memEntity: MembershipEntity = MembershipMapper.toEntity(membership)

        this.db.memberships.push(memEntity)

        const periods = membershipContainer.periods
        periods.forEach(period => {
            const periodEntity = MembershipPeriodMapper.toEntity(period)
            this.db.periods.push(periodEntity)
        })
        return {membership, periods: periods};
    }

}