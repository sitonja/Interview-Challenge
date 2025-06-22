import { Database } from "../db/database";
import { Membership } from "../models/domain/membership";
import { MembershipContainer } from "../models/domain/membership-container";
import { MembershipEntity } from "../models/entities/membership.entity";
import { MembershipPeriodMapper } from "../models/mappers/membership-period.mapper";
import { MembershipMapper } from "../models/mappers/membership.mapper";
const { v4: uuidv4 } = require('uuid');

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

    create(membershipContainer: MembershipContainer): Membership {
        const membership = membershipContainer.membership
        const memEntity: MembershipEntity = {
            ...membership,
            id: this.db.membershipsSequence,
            uuid: uuidv4(),
            validFrom: membership.validFrom.toDateString(),
            validUntil: membership.validUntil.toDateString(),
            user: membership.user,
            assignedBy: "Admin"
        }

        this.db.memberships.push(memEntity)

        const periods = membershipContainer.periods
        periods.forEach(period => {
            this.db.periods.push(
                {
                    ...period,
                    id: this.db.periodsSequence,
                    uuid: uuidv4(),
                    start: period.start.toDateString(),
                    end: period.end.toDateString()
                })
        })
        return membership;
    }

}