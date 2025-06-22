import { MembershipController } from "../../src/modern/controllers/membership.controller";
import { Membership } from "../../src/modern/models/domain/membership";
import { MembershipPeriod } from "../../src/modern/models/domain/membership-period";
import { MembershipPeriodMapper } from "../../src/modern/models/mappers/membership-period.mapper";
import { MembershipMapper } from "../../src/modern/models/mappers/membership.mapper";
import { membershipSchema } from "../../src/modern/schema/membership.schema";

describe("Membership Controller", () => {
    let mockService: any
    let controller: MembershipController;
    let req: any;
    let res: any;

    beforeEach(() => {
        mockService = {
            fetchAllMemberships: jest.fn(),
            createMembership: jest.fn(),
        };
        controller = new MembershipController(mockService);

        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    })

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return memberships with mapped DTOs', () => {
        let membership = {
            "id": 1,
            "uuid": "123e4567-e89b-12d3-a456-426614174000",
            "name": "Platinum Plan",
            "user": 2000,
            "recurringPrice": 150,
            "validFrom": new Date(),
            "validUntil": new Date(),
            "state": "active",
            "paymentMethod": "credit card",
            "billingInterval": "monthly",
            "billingPeriods": 12,
            "assignedBy": "Admin"
        } as Membership

        const period = {
            "end": new Date(),
            "id": 1,
            "membershipId": 1,
            "start": new Date(),
            "state": "issued",
            "uuid": "123e4567-e89b-12d3-a456-426614174000"
        } as MembershipPeriod

        mockService.fetchAllMemberships.mockReturnValue([
            {
                membership,
                periods: [period],
            },
        ]);

        controller.getMemberships(req, res);

        expect(mockService.fetchAllMemberships).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ membership: MembershipMapper.toDto(membership), periods: [MembershipPeriodMapper.toDto(period)] }])
    });


    it('should return 400 if input is invalid', () => {
        req.body = {};
        const safeParse = membershipSchema.safeParse({});
        jest.spyOn(membershipSchema, 'safeParse').mockReturnValue({
            success: false,
            error: {
                issues: [{ message: 'Invalid input' }],
            },
        } as any);

        controller.createMembership(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid input' });
    });


    it('should create a membership and return 201', () => {
        req.body = { name: 'Bachata July' };

        jest.spyOn(membershipSchema, 'safeParse').mockReturnValue({
            success: true,
            data: req.body,
        } as any);

        const newMembership = { id: 1, name: 'Gold' };
        mockService.createMembership.mockReturnValue(newMembership);

        controller.createMembership(req, res);

        expect(mockService.createMembership).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newMembership);
    });
})