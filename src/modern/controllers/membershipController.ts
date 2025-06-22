import { Request, Response } from "express"
import { MembershipService } from "../services/MembershipService";

export class MembershipController {
  constructor(private membershipService: MembershipService) {}

  getMemberships = (req: Request, res: Response) => {
    const mems = this.membershipService.fetchAllMemberships()
    return  res.status(200).json(mems);
  }
  
 createMembership = (req: Request, res: Response) => {
    throw new Error('not implemented')
  }
}  
