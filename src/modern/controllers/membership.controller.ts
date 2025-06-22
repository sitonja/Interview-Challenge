import { Request, Response } from "express"
import { MembershipService } from "../services/membership.service";
import { MembershipMapper } from "../models/mappers/membership.mapper";
import { MembershipPeriodMapper } from "../models/mappers/membership-period.mapper";

export class MembershipController {
  constructor(private membershipService: MembershipService) {}

  getMemberships = (req: Request, res: Response) => {
    let mems = this.membershipService.fetchAllMemberships()
    
    const membershipDto = mems.map(me => {
      return {
        membership: MembershipMapper.toDto(me.membership),
        periods: me.periods.map( period => MembershipPeriodMapper.toDto(period))
      }
    })

    return  res.status(200).json(membershipDto);
  }
  
 createMembership = (req: Request, res: Response) => {
    throw new Error('not implemented')
  }
}  
