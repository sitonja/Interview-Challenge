import { Request, Response } from "express"
import { MembershipService } from "../services/membership.service";
import { MembershipMapper } from "../models/mappers/membership.mapper";
import { MembershipPeriodMapper } from "../models/mappers/membership-period.mapper";
import { membershipSchema } from "../schema/membership.schema";

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
    const result = membershipSchema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({message: result.error.issues[0].message})
    } 
    const mem = this.membershipService.createMembership(req.body)  
    return res.status(201).json(mem);
  }
}  
