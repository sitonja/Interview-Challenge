import { MembershipContainer } from "../../models/domain/membership-container";
import { Membership } from "../../models/domain/membership"

export interface IMembershipRepository {
  findAll(): MembershipContainer[];
  create(membershipContainer: MembershipContainer): Membership;
}