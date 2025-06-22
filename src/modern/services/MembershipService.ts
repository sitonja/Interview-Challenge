import { Membership } from "../models/Membership";
import { IMembershipRepository } from "../repositories/IMembershipRepository";

export class MembershipService {
    membershipRepo: IMembershipRepository

    constructor(membershipRepository: IMembershipRepository) {
        this.membershipRepo = membershipRepository
    }

    fetchAllMemberships(): Membership[] {
        return this.membershipRepo.findAll();
    }
}