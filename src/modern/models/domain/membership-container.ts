import { Membership } from "./membership";
import { MembershipPeriod } from "./membership-period";

export interface MembershipContainer {
    membership: Membership
    periods: MembershipPeriod[]
}