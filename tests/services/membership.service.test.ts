import { MembershipContainer } from "../../src/modern/models/domain/membership-container";
import { MembershipPeriod } from "../../src/modern/models/domain/membership-period";
import { CreateMembershipDto } from "../../src/modern/models/dtos/create-membership.dto";
import { MembershipContainerMapper } from "../../src/modern/models/mappers/membership-container.mapper";
import { IMembershipRepository } from "../../src/modern/repositories/interfaces/IMembershipRepository";
import { MembershipService } from "../../src/modern/services/membership.service";

jest.mock('uuid', () => ({
    v4: () => 'mocked-uuid',
}));

describe('MembershipService', () => {
let service: MembershipService;
  let mockRepo: jest.Mocked<IMembershipRepository>;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      findAll: jest.fn()
    };

    service = new MembershipService(mockRepo);
  });


    it('should map dto to domain and call repository create', () => {
      const dto: CreateMembershipDto = {
        name: 'Gold',
        recurringPrice: 100,
        billingPeriods: 1,
        billingInterval: 'monthly',
        paymentMethod: 'credit card',
        validFrom: "2025-01-01"
      };

      const period: MembershipPeriod = {
        end: new Date("2025-02-01"),
        id: 1,
        membershipId: 0,
        start: new Date("2025-01-01"),
        state: "planned",
        uuid: "mocked-uuid",
      }
      const mockMembershipContainer: MembershipContainer = {
        membership: {
          id: 0,
          uuid: 'mocked-uuid',
          name: 'Gold',
          state: 'expired',
          validFrom: new Date("2025-01-01"),
          validUntil: new Date("2025-02-01"),
          user: 2000,
          paymentMethod: 'credit card',
          recurringPrice: 100,
          billingPeriods: 1,
          billingInterval: 'monthly',
          assignedBy: "Admin"
        },
        periods: [period]
      };

      mockRepo.create.mockReturnValue(mockMembershipContainer);

      const result = service.createMembership(dto);

      expect(mockRepo.create).toHaveBeenCalledWith(mockMembershipContainer);
      expect(result).toBe(mockMembershipContainer);
    });

     it('should call repository findAll', () => {
      const containers: MembershipContainer[] = [
        {
          membership: {
            id: 1,
            uuid: 'abc',
            name: 'Basic',
            state: 'active',
            validFrom: new Date(),
            validUntil: new Date(),
            user: 1000,
            paymentMethod: 'cash',
            recurringPrice: 50,
            billingPeriods: 6,
            billingInterval: 'monthly',
            assignedBy: "Admin"
          },
          periods: []
        }
      ];

      mockRepo.findAll.mockReturnValue(containers);

      const result = service.fetchAllMemberships();

      expect(mockRepo.findAll).toHaveBeenCalled();
      expect(result).toBe(containers);
    });
  });