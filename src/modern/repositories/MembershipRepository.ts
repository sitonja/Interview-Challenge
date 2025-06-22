import { Database } from "../db/Database";
import { Membership } from "../models/Membership";
import { MembershipEntity } from "./entities/MembershipEntity";
const { v4: uuidv4 } = require('uuid');

import {IMembershipRepository} from "./IMembershipRepository"

export class MembershipRepository implements IMembershipRepository {
    constructor(private db: Database) {

    }

    findAll(): Membership[] {
        return this.db.memberships.map(mem => {
            const periods = this.db.periods.filter(p => p.membershipId === mem.id)
            return {
                ...mem, membershipPeriods: periods,
                id: this.db.membershipsSequence,
            uuid: uuidv4(),
            validFrom: new Date(mem.validFrom),
            validUntil: new Date(mem.validUntil),
            state: mem.state as "pending" | "active" | "expired" ,
            paymentMethod: mem.paymentMethod as "cash",
            billingInterval: "weekly",
            userId: mem.user
            }
        })
    }

    create(membership: Membership): Membership {
        const memEntity: MembershipEntity = {
            ...membership,
            id: this.db.membershipsSequence,
            uuid: uuidv4(),
            validFrom: membership.validFrom.toUTCString(),
            validUntil: membership.validUntil.toUTCString(),
            user: membership.userId
        }

        this.db.memberships.push(memEntity)
        membership.membershipPeriods.forEach(period => {
            this.db.periods.push(
            {
                id: this.db.periodsSequence,
                uuid : uuidv4(),
                ...period
            })
        
        }) 
        return membership;    
    }

}