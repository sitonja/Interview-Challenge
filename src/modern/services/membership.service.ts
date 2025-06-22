import { MembershipContainer } from "../models/domain/membership-container";
import { CreateMembershipDto } from "../models/dtos/create-membership.dto";
import { MembershipContainerMapper } from "../models/mappers/membership-container.mapper";
import { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import { IMembershipService } from "./interfaces/imembership.service";

export class MembershipService implements IMembershipService {
    membershipRepo: IMembershipRepository

    constructor(membershipRepository: IMembershipRepository) {
        this.membershipRepo = membershipRepository
    }

    createMembership(createMembershipDto: CreateMembershipDto): MembershipContainer {
        const userId = 2000;

        const membership = MembershipContainerMapper.toDomain(createMembershipDto, userId)    
        return  this.membershipRepo.create(membership)
    }

    fetchAllMemberships(): MembershipContainer[] {
        return this.membershipRepo.findAll();
    }
}