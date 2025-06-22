import express, { Request, Response } from "express"
import { MembershipController } from "../controllers/membershipController";
import { MembershipService } from "../services/MembershipService";
import { Database } from "../db/Database";
import { MembershipRepository } from "../repositories/MembershipRepository";
const router = express.Router();

const db = new Database()
const membershipRepository = new MembershipRepository(db)
const membershipService = new MembershipService(membershipRepository)
const membershipController = new MembershipController(membershipService)

router.get("/", membershipController.getMemberships)

router.post("/", membershipController.createMembership)

export default router;
