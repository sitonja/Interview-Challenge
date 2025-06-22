import { Membership } from "../models/domain/membership";
import { MembershipPeriod } from "../models/domain/membership-period";
import { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";

export class MembershipService {
    membershipRepo: IMembershipRepository

    constructor(membershipRepository: IMembershipRepository) {
        this.membershipRepo = membershipRepository
    }

    fetchAllMemberships(): {membership: Membership, periods: MembershipPeriod[]}[] {
        return this.membershipRepo.findAll();
    }
}