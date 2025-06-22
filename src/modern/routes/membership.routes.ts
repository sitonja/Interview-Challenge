import express from "express"
import { MembershipController } from "../controllers/membership.controller";
import { MembershipService } from "../services/membership.service";
import { MembershipRepository } from "../repositories/membership.repository";
import { Database } from "../db/database";

const router = express.Router();

// Depencdency injection done manually, I was thinking to take a library, but ended to do it this way 
const db = new Database()
const membershipRepository = new MembershipRepository(db)
const membershipService = new MembershipService(membershipRepository)
const membershipController = new MembershipController(membershipService)

router.get("/", membershipController.getMemberships)

router.post("/", membershipController.createMembership)

export default router;
