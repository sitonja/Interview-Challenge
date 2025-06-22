import { BillingInterval } from "../domain/billing-interval";
import { Membership } from "../domain/membership";
import { MembershipContainer } from "../domain/membership-container";
import { MembershipPeriod } from "../domain/membership-period";
import { MembershipState } from "../domain/membership-state";
import { PaymentMethod } from "../domain/payment-method";
import { CreateMembershipDto } from "../dtos/create-membership.dto";
const { v4: uuidv4 } = require('uuid');

export class MembershipContainerMapper {

    static mapValidUntilForMembership: {[key:string]: (validFrom: Date, billingPeriods: number) => Date} = {
        "monthly": (validFrom: Date, billingPeriods: number) => {
            const validUntil = new Date(validFrom);
            validUntil.setMonth(validFrom.getMonth() + billingPeriods)
            return validUntil
        },
        "yearly": (validFrom: Date, billingPeriods: number) => {
            const validUntil = new Date(validFrom);
            validUntil.setMonth(validFrom.getMonth() + billingPeriods * 12);
            return validUntil
        }, 
        "weeky": (validFrom: Date, billingPeriods: number) => {
            const validUntil = new Date(validFrom);
            validUntil.setDate(validFrom.getDate() + billingPeriods * 7);
            return validUntil
        },  
    } 

        static mapValidUntilForPeriod: {[key:string]: (validFrom: Date) => Date} = {
        "monthly": (validFrom: Date) => {
            const validUntil = new Date(validFrom);
            validUntil.setMonth(validFrom.getMonth() + 1)
            return validUntil
        },
        "yearly": (validFrom: Date) => {
            const validUntil = new Date(validFrom);
            validUntil.setMonth(validFrom.getMonth() + 12);
            return validUntil
        }, 
        "weeky": (validFrom: Date) => {
            const validUntil = new Date(validFrom);
            validUntil.setDate(validFrom.getDate() + 7);
            return validUntil
        },  
    } 

    static mapState(validFrom: Date, billingInterval: string, billingPeriods: number): MembershipState {
        let state: MembershipState = "active"
           if (validFrom > new Date()) {
            state = 'pending'
        }

        const mappingFun = MembershipContainerMapper.mapValidUntilForMembership[billingInterval];
        const validUntil = mappingFun(validFrom, billingPeriods)

        if (validUntil < new Date()) {
            state = 'expired'
        }
        return state;
    }

    static toDomain(createMembershipDto: CreateMembershipDto, userId: number): MembershipContainer {
        const validFrom = createMembershipDto.validFrom ? new Date(createMembershipDto.validFrom) : new Date()
        const mappingFun = MembershipContainerMapper.mapValidUntilForMembership[createMembershipDto.billingInterval];
        const validUntil = mappingFun(validFrom, createMembershipDto.billingPeriods)

        let state = this.mapState(validFrom, createMembershipDto.billingInterval, createMembershipDto.billingPeriods)

        const newMembership: Membership = {
            id: 0,
            uuid: uuidv4(),
            name: createMembershipDto.name,
            state,
            validFrom: validFrom,
            validUntil: validUntil,
            user: userId,
            paymentMethod: createMembershipDto.paymentMethod as  PaymentMethod,
            recurringPrice:createMembershipDto.recurringPrice,
            billingPeriods: createMembershipDto.billingPeriods,
            billingInterval: createMembershipDto.billingInterval as BillingInterval,
            assignedBy: "Admin" 
        };


         const membershipPeriods: MembershipPeriod[] = []
          let periodStart = validFrom
          for (let i = 0; i < createMembershipDto.billingPeriods; i++) {
            const validFrom = periodStart
            const mappingFun = MembershipContainerMapper.mapValidUntilForPeriod[createMembershipDto.billingInterval];
            const validUntil = mappingFun(validFrom)

            const period: MembershipPeriod = {
              id: i + 1,
              uuid: uuidv4(),
              membershipId: newMembership.id,
              start: validFrom,
              end: validUntil,
              state: 'planned'
            }
            membershipPeriods.push(period)
            periodStart = validUntil
          }

          return {membership: newMembership, periods: membershipPeriods}

    }
}