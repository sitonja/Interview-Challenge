import { formatDate } from "../../utils/date.util";
import { Membership } from "../domain/membership";
import { MembershipDto } from "../dtos/membership.dto";
import { MembershipEntity } from "../entities/membership.entity";
const { v4: uuidv4 } = require('uuid');

export class MembershipMapper {

    static toDomain(membershipEntity: MembershipEntity): Membership {
        return {
            id: membershipEntity.id,
            uuid: membershipEntity.uuid,
            name: membershipEntity.name,
            user: membershipEntity.user,
            recurringPrice: membershipEntity.recurringPrice,
            validFrom: new Date(membershipEntity.validFrom),
            validUntil: new Date(membershipEntity.validUntil),
            state: membershipEntity.state,
            paymentMethod: membershipEntity.paymentMethod,
            billingInterval: membershipEntity.billingInterval,
            billingPeriods: membershipEntity.billingPeriods,
            assignedBy: membershipEntity.assignedBy
        }
    }
    
    static toDto(membershipDomain: Membership): MembershipDto {
          return {
            id: membershipDomain.id,
            uuid: membershipDomain.uuid,
            name: membershipDomain.name,
            user: membershipDomain.user,
            recurringPrice: membershipDomain.recurringPrice,
            validFrom: formatDate(membershipDomain.validFrom),
            validUntil: formatDate(membershipDomain.validUntil),
            state: membershipDomain.state,
            paymentMethod: membershipDomain.paymentMethod,
            billingInterval: membershipDomain.billingInterval,
            billingPeriods: membershipDomain.billingPeriods,
            assignedBy: membershipDomain.assignedBy
        }
    }
    
    static toEntity(membership: Membership, id: number): MembershipEntity {
        return {
            id: id,
            uuid: uuidv4(),
            name: membership.name,
            validFrom: formatDate(membership.validFrom),
            validUntil: formatDate(membership.validUntil),
            user: membership.user,
            recurringPrice: membership.recurringPrice,
            state: membership.state,
            paymentMethod: membership.paymentMethod,
            billingInterval: membership.billingInterval,
            billingPeriods: membership.billingPeriods,
            assignedBy: "Admin"
        }
    }

}