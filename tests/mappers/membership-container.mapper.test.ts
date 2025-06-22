import { CreateMembershipDto } from "../../src/modern/models/dtos/create-membership.dto";
import { MembershipContainerMapper } from "../../src/modern/models/mappers/membership-container.mapper";

jest.mock('uuid', () => ({
    v4: () => 'mocked-uuid'
}));


jest
    .useFakeTimers()
    .setSystemTime(new Date('2025-03-01'));

describe('MembershipContainerMapper', () => {

    const baseDate = new Date('2025-01-01');

    it('should return "active" when dates are current', () => {
        const result = MembershipContainerMapper.mapState(baseDate, 'monthly', 1);
        expect(result).toBe('expired');
    })

    it('should return "active" when dates are current', () => {
        const result = MembershipContainerMapper.mapState(baseDate, 'monthly', 8);
        expect(result).toBe('active');
    })

    it('should return "pending" when validFrom is in the future', () => {
        const future = new Date('2025-06-01');
        const result = MembershipContainerMapper.mapState(future, 'monthly', 1);
        expect(result).toBe('pending');
    });

it('should map CreateMembershipDto to MembershipContainer with periods', () => {
      const dto: CreateMembershipDto = {
        name: 'Pro Plan',
        billingInterval: 'monthly',
        billingPeriods: 2,
        recurringPrice: 10,
        paymentMethod: 'credit card',
        validFrom: '2025-01-01',
      };

      const container = MembershipContainerMapper.toDomain(dto, 42);

      expect(container.membership).toMatchObject({
        id: 0,
        uuid: 'mocked-uuid',
        name: 'Pro Plan',
        user: 42,
        state: 'active',
        billingInterval: 'monthly',
        billingPeriods: 2,
        validFrom: new Date('2025-01-01'),
        validUntil: new Date('2025-03-01'),
      });

      expect(container.periods.length).toBe(2);
      expect(container.periods[0].start.toISOString()).toBe('2025-01-01T00:00:00.000Z');
      expect(container.periods[1].start.toISOString()).toBe('2025-02-01T00:00:00.000Z');
      expect(container.periods[0].state).toBe('planned');
    });

})