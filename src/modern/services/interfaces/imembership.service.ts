import { MembershipContainer } from "../../models/domain/membership-container";
import { CreateMembershipDto } from "../../models/dtos/create-membership.dto";

export interface IMembershipService {
    fetchAllMemberships(): MembershipContainer[]
    createMembership(createMembershipDto: CreateMembershipDto): MembershipContainer
}