import { Membership } from "../models/Membership"

export interface IMembershipRepository {
  findAll(): Membership[];
  create(membership: Membership): Membership;
}