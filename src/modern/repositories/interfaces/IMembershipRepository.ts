import { MembershipContainer } from "../../models/domain/membership-container";

export interface IMembershipRepository {
  findAll(): MembershipContainer[];
  create(membershipContainer: MembershipContainer): MembershipContainer;
}