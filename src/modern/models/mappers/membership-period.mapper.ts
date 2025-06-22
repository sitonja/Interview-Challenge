import { formatDate } from "../../utils/date.util";
import { MembershipPeriod } from "../domain/membership-period";
import { MembershipPeriodDto } from "../dtos/membership-period.dto";
const { v4: uuidv4 } = require('uuid');
import { MembershipPeriodEntity } from "../entities/membership-period.entity";

export class MembershipPeriodMapper {

    static toDomain(membershipPeriodEntity: MembershipPeriodEntity): MembershipPeriod {
        return {
            id: membershipPeriodEntity.id,
            uuid: membershipPeriodEntity.uuid,
            membershipId: membershipPeriodEntity.membershipId,
            start: new Date(membershipPeriodEntity.start),
            end: new Date(membershipPeriodEntity.end),
            state: membershipPeriodEntity.state
        }
    }
    
    static toDto(membershipPeriodDomain: MembershipPeriod): MembershipPeriodDto {
        return {
                id: membershipPeriodDomain.id,
                uuid: membershipPeriodDomain.uuid,
                membershipId: membershipPeriodDomain.membershipId,
                start: formatDate(membershipPeriodDomain.start),
                end: formatDate(membershipPeriodDomain.end),
                state: membershipPeriodDomain.state,
            }
    }
    
    static toEntity(membershipPeriod: MembershipPeriod, periodId: number, membershipId: number): MembershipPeriodEntity {
       return {
                id: periodId,
                uuid: uuidv4(),
                membershipId: membershipId,
                start: formatDate(membershipPeriod.start),
                end: formatDate(membershipPeriod.end),
                state: membershipPeriod.state,
            }
    }
}